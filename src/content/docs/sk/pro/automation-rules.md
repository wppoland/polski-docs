---
title: Pravidlá automatizácie
description: Engine pravidiel automatizácie s trigger-filter-action, REST API, dry run, auditným denníkom a geografickými filtrami (PL/EÚ/EHP).
---

Modul **Pravidlá automatizácie** spúšťa akcie (e-mail, SMS, zmena stavu, poznámka, tag zákazníka, webhook) na základe udalostí v obchode. Pravidlá definujete v paneli **WooCommerce > Automation Rules** cez React SPA a engine ich vykonáva ako reakciu na trigger.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.6.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Architektúra

| Prvok                | Popis                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Trigger**          | Udalosť WooCommerce spúšťajúca pravidlo (`new_order`, `order_status_changed`, ...)     |
| **Filter**           | Logická podmienka (`order_total > 100`, `geo_scope in eu`, ...)                        |
| **Action**           | Operácia na vykonanie (`send_email`, `add_order_note`, `webhook`, ...)                 |
| **Match mode**       | `all` - všetky filtre splnené, `any` - stačí jeden                                     |
| **Priority**         | Poradie vykonávania (menšie = skôr)                                                    |

Pravidlá sa ukladajú v tabuľke `wp_polski_pro_automation_rules`. Vykonania (matched/skipped, dry run, výsledok akcie, chyba) sa zapisujú do `wp_polski_pro_automation_logs`.

## Triggery

| Hodnota                 | Kedy sa spúšťa                                       |
| ----------------------- | ---------------------------------------------------- |
| `new_order`             | `woocommerce_new_order`                              |
| `order_status_changed`  | `woocommerce_order_status_changed`                   |
| `new_customer`          | `user_register`                                      |
| `cart_abandoned`        | (rezerva - integrácia s `AbandonedCartService`)      |
| `product_saved`         | `save_post_product`                                  |

## Filtre

Polia dostupné vo filtroch (`FilterField`):

| Pole                | Zdroj                                          | Operátory                          |
| ------------------- | ---------------------------------------------- | ---------------------------------- |
| `order_total`       | `WC_Order::get_total()`                        | `equals`, `gt`, `lt`, `not_equals` |
| `order_status`      | `WC_Order::get_status()`                       | `equals`, `in`, `not_in`           |
| `item_count`        | `WC_Order::get_item_count()`                   | `gt`, `lt`, `equals`               |
| `billing_country`   | ISO 3166-1 alpha-2                             | `equals`, `in`, `not_in`           |
| `shipping_country`  | ISO 3166-1 alpha-2 (fallback na billing)       | `equals`, `in`, `not_in`           |
| `geo_scope`         | `pl`, `eu`, `eea`, `non_eu`                    | `equals`                           |
| `customer_email`    | `WC_Order::get_billing_email()`                | `equals`, `contains`               |
| `payment_method`    | `WC_Order::get_payment_method()`               | `equals`, `in`                     |
| `shipping_method`   | Zoznam metód z položiek dopravy                | `in`, `not_in`                     |
| `product_id`        | Zoznam ID produktov v objednávke               | `in`, `not_in`                     |
| `category`          | Zoznam ID `product_cat` z položiek objednávky  | `in`, `not_in`                     |

Operátor `in` / `not_in` prijíma zoznam oddelený čiarkami (`PL,DE,FR`).

### Geografické filtre

Pole `geo_scope` vracia jednu zo štyroch hodnôt pre objednávku/používateľa:

| Hodnota  | Rozsah                                        |
| -------- | --------------------------------------------- |
| `pl`     | Poľsko (PL)                                   |
| `eu`     | Krajiny EÚ (27 členských štátov)              |
| `eea`    | EHP = EÚ + Nórsko, Island, Lichtenštajnsko    |
| `non_eu` | Zvyšok sveta                                  |

Príklad použitia: pravidlo odosiela inú šablónu marketingového e-mailu zákazníkom z EÚ (s GDPR poznámkou) než mimo EÚ.

## Akcie

| Typ                  | Parametre                                                                            |
| -------------------- | ------------------------------------------------------------------------------------ |
| `send_email`         | `to` (voliteľné), `subject`, `body`, `marketing` (boolean vynucujúci súhlas)         |
| `send_sms`           | Delegované na `polski_pro/automation/send_sms` (vyžaduje `SmsNotificationService`)   |
| `change_order_status`| `status`, `note`                                                                     |
| `add_order_note`     | `note`, `customer_note` (boolean)                                                    |
| `add_customer_tag`   | `tag` (ukladá do user_meta `polski_customer_tags`)                                   |
| `webhook`            | `url` - POST s `{subject_type, subject_id}`                                          |

### Marketingový súhlas

Akcie s `params.marketing = true` sa preskočia, ak zákazník nemá platný marketingový súhlas v `polski_consent_log`. Filter `polski_pro/automation/has_marketing_consent` umožňuje nahradiť predvolenú logiku kontroly súhlasu.

### Rozšírenie akcií

Ak chcete pridať vlastnú akciu (napr. integráciu s FreshMail/GetResponse), použite filter:

```php
add_filter('polski_pro/automation/action', function ($override, $action, $subject, $dryRun) {
    if ($action->type->value === 'send_email' && ($action->params['provider'] ?? '') === 'freshmail') {
        if ($dryRun) {
            return ['dry_run' => true, 'provider' => 'freshmail'];
        }
        // ... wywolanie API FreshMail ...
        return ['provider' => 'freshmail', 'sent' => true];
    }

    return $override;
}, 10, 4);
```

## REST API

Všetky endpointy vyžadujú `manage_woocommerce` + hlavičku `X-WP-Nonce`.

| Metóda  | Cesta                                            | Popis                           |
| ------- | ------------------------------------------------ | ------------------------------- |
| GET     | `/polski-pro/v1/automation/rules`                | Zoznam pravidiel                |
| POST    | `/polski-pro/v1/automation/rules`                | Vytvorenie pravidla             |
| GET     | `/polski-pro/v1/automation/rules/{id}`           | Získanie jedného pravidla       |
| PUT     | `/polski-pro/v1/automation/rules/{id}`           | Aktualizácia pravidla           |
| DELETE  | `/polski-pro/v1/automation/rules/{id}`           | Odstránenie + čistenie logov    |
| POST    | `/polski-pro/v1/automation/rules/{id}/dry-run`   | Simulácia na objednávke/používateľovi (`order_id` alebo `user_id`) |
| GET     | `/polski-pro/v1/automation/logs?limit=200`       | Auditný denník (max 500)        |
| GET     | `/polski-pro/v1/automation/schema`               | Schéma triggerov/filtrov/akcií  |

## Dry run

V editore pravidla zadajte `Order ID` a kliknite **Run dry run**. Engine:

1. Vyhodnotí filtre voči zadanej objednávke.
2. Skontroluje marketingový súhlas.
3. Vykoná akcie v režime dry-run (nemodifikuje stav) a vráti plánovaný výsledok.
4. Zapíše záznam do auditného denníka s príznakom `dry_run = 1`.

## Limity a výkon

- Indexy na `enabled`, `trigger_type`, `priority`, `group_label` - engine načítava len pravidlá zodpovedajúce triggeru.
- `recent($limit)` v `AutomationLogRepository` je obmedzené na 500 záznamov na dotaz.
- Webhooky majú timeout 10 s.
