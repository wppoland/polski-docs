---
title: Pravidla automatizace
description: Engine pravidel automatizace s trigger-filter-action, REST API, dry run, auditním deníkem a geografickými filtry (PL/EU/EHP).
---

Modul **Pravidla automatizace** spouští akce (e-mail, SMS, změna stavu, poznámka, štítek zákazníka, webhook) na základě událostí v obchodě. Pravidla definujete v panelu **WooCommerce > Automation Rules** prostřednictvím React SPA a engine je vykonává v reakci na trigger.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.6.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Architektura

| Prvek                | Popis                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Trigger**          | Událost WooCommerce spouštějící pravidlo (`new_order`, `order_status_changed`, ...) |
| **Filter**           | Logická podmínka (`order_total > 100`, `geo_scope in eu`, ...)                        |
| **Action**           | Operace k provedení (`send_email`, `add_order_note`, `webhook`, ...)                |
| **Match mode**       | `all` - splněny všechny filtry, `any` - stačí jeden                           |
| **Priority**         | Pořadí vykonávání (menší = dříve)                                          |

Pravidla jsou ukládána v tabulce `wp_polski_pro_automation_rules`. Vykonání (matched/skipped, dry run, výsledek akce, chyba) putují do `wp_polski_pro_automation_logs`.

## Triggery

| Hodnota                 | Kdy se spouští                                  |
| ----------------------- | ---------------------------------------------------- |
| `new_order`             | `woocommerce_new_order`                              |
| `order_status_changed`  | `woocommerce_order_status_changed`                   |
| `new_customer`          | `user_register`                                      |
| `cart_abandoned`        | (rezerva - integrace s `AbandonedCartService`)      |
| `product_saved`         | `save_post_product`                                  |

## Filtry

Pole dostupná ve filtrech (`FilterField`):

| Pole                | Zdroj                                         | Operátory                          |
| ------------------- | ---------------------------------------------- | ---------------------------------- |
| `order_total`       | `WC_Order::get_total()`                        | `equals`, `gt`, `lt`, `not_equals` |
| `order_status`      | `WC_Order::get_status()`                       | `equals`, `in`, `not_in`           |
| `item_count`        | `WC_Order::get_item_count()`                   | `gt`, `lt`, `equals`               |
| `billing_country`   | ISO 3166-1 alpha-2                             | `equals`, `in`, `not_in`           |
| `shipping_country`  | ISO 3166-1 alpha-2 (fallback na billing)       | `equals`, `in`, `not_in`           |
| `geo_scope`         | `pl`, `eu`, `eea`, `non_eu`                    | `equals`                           |
| `customer_email`    | `WC_Order::get_billing_email()`                | `equals`, `contains`               |
| `payment_method`    | `WC_Order::get_payment_method()`               | `equals`, `in`                     |
| `shipping_method`   | Seznam metod z položek dopravy                  | `in`, `not_in`                     |
| `product_id`        | Seznam ID produktů v objednávce                | `in`, `not_in`                     |
| `category`          | Seznam ID `product_cat` z položek objednávky    | `in`, `not_in`                     |

Operátor `in` / `not_in` přijímá seznam oddělený čárkami (`PL,DE,FR`).

### Geografické filtry

Pole `geo_scope` vrací jednu ze čtyř hodnot pro objednávku/uživatele:

| Hodnota  | Rozsah                                        |
| -------- | --------------------------------------------- |
| `pl`     | Polsko (PL)                                   |
| `eu`     | Země EU (27 členských států)            |
| `eea`    | EHP = EU + Norsko, Island, Lichtenštejnsko  |
| `non_eu` | Zbytek světa                                 |

Příklad použití: pravidlo odešle zákazníkům z EU jinou šablonu marketingového e-mailu (s poznámkou o GDPR) než zákazníkům mimo EU.

## Akce

| Typ                  | Parametry                                                                            |
| -------------------- | ------------------------------------------------------------------------------------ |
| `send_email`         | `to` (volitelné), `subject`, `body`, `marketing` (boolean vynucující souhlas)        |
| `send_sms`           | Delegováno na `polski_pro/automation/send_sms` (vyžaduje `SmsNotificationService`)     |
| `change_order_status`| `status`, `note`                                                                     |
| `add_order_note`     | `note`, `customer_note` (boolean)                                                    |
| `add_customer_tag`   | `tag` (ukládá do user_meta `polski_customer_tags`)                                 |
| `webhook`            | `url` - POST s `{subject_type, subject_id}`                                          |

### Marketingový souhlas

Akce s `params.marketing = true` jsou přeskočeny, pokud zákazník nemá platný marketingový souhlas v `polski_consent_log`. Filtr `polski_pro/automation/has_marketing_consent` umožňuje nahradit výchozí logiku kontroly souhlasu.

### Rozšiřování akcí

Chcete-li přidat vlastní akci (např. integraci s FreshMail/GetResponse), použijte filtr:

```php
add_filter('polski_pro/automation/action', function ($override, $action, $subject, $dryRun) {
    if ($action->type->value === 'send_email' && ($action->params['provider'] ?? '') === 'freshmail') {
        if ($dryRun) {
            return ['dry_run' => true, 'provider' => 'freshmail'];
        }
        // ... volání API FreshMail ...
        return ['provider' => 'freshmail', 'sent' => true];
    }

    return $override;
}, 10, 4);
```

## REST API

Všechny endpointy vyžadují `manage_woocommerce` + hlavičku `X-WP-Nonce`.

| Metoda  | Cesta                                          | Popis                            |
| ------- | ------------------------------------------------ | ------------------------------- |
| GET     | `/polski-pro/v1/automation/rules`                | Seznam pravidel                     |
| POST    | `/polski-pro/v1/automation/rules`                | Vytvoření pravidla               |
| GET     | `/polski-pro/v1/automation/rules/{id}`           | Načtení jednotlivého pravidla     |
| PUT     | `/polski-pro/v1/automation/rules/{id}`           | Aktualizace pravidla             |
| DELETE  | `/polski-pro/v1/automation/rules/{id}`           | Odstranění + čištění logů   |
| POST    | `/polski-pro/v1/automation/rules/{id}/dry-run`   | Simulace na objednávce/uživateli (`order_id` nebo `user_id`) |
| GET     | `/polski-pro/v1/automation/logs?limit=200`       | Auditní deník (max 500)       |
| GET     | `/polski-pro/v1/automation/schema`               | Schéma triggerů/filtrů/akcí |

## Dry run

V editoru pravidla zadejte `Order ID` a klikněte na **Run dry run**. Engine:

1. Vyhodnotí filtry vůči zadané objednávce.
2. Zkontroluje marketingový souhlas.
3. Vykoná akce v režimu dry-run (nemodifikuje stav) a vrátí plánovaný výsledek.
4. Zapíše záznam do auditního deníku s příznakem `dry_run = 1`.

## Limity a výkon

- Indexy na `enabled`, `trigger_type`, `priority`, `group_label` - engine načítá pouze pravidla odpovídající triggeru.
- `recent($limit)` v `AutomationLogRepository` je omezeno na 500 záznamů na dotaz.
- Webhooky mají timeout 10s.
