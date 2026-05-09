---
title: Reguly automatyzacji
description: Silnik regul automatyzacji z trigger-filter-action, REST API, dry run, dziennikiem audytu i filtrami geograficznymi (PL/UE/EOG).
---

Modul **Reguly automatyzacji** uruchamia akcje (email, SMS, zmiana statusu, notatka, tag klienta, webhook) na podstawie zdarzen w sklepie. Reguly definiujesz w panelu **WooCommerce > Automation Rules** poprzez React SPA, a silnik wykonuje je w odpowiedzi na trigger.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.6.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Architektura

| Element              | Opis                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Trigger**          | Zdarzenie WooCommerce uruchamiajace regule (`new_order`, `order_status_changed`, ...) |
| **Filter**           | Warunek logiczny (`order_total > 100`, `geo_scope in eu`, ...)                        |
| **Action**           | Operacja do wykonania (`send_email`, `add_order_note`, `webhook`, ...)                |
| **Match mode**       | `all` — wszystkie filtry spelnione, `any` — wystarczy jeden                           |
| **Priority**         | Kolejnosc wykonywania (mniejsze = wczesniej)                                          |

Reguly sa zapisywane w tabeli `wp_polski_pro_automation_rules`. Wykonania (matched/skipped, dry run, wynik akcji, blad) trafiaja do `wp_polski_pro_automation_logs`.

## Triggery

| Wartosc                 | Kiedy wystrzeliwane                                  |
| ----------------------- | ---------------------------------------------------- |
| `new_order`             | `woocommerce_new_order`                              |
| `order_status_changed`  | `woocommerce_order_status_changed`                   |
| `new_customer`          | `user_register`                                      |
| `cart_abandoned`        | (rezerwa - integracja z `AbandonedCartService`)      |
| `product_saved`         | `save_post_product`                                  |

## Filtry

Pola dostepne w filtrach (`FilterField`):

| Pole                | Zrodlo                                         | Operatory                          |
| ------------------- | ---------------------------------------------- | ---------------------------------- |
| `order_total`       | `WC_Order::get_total()`                        | `equals`, `gt`, `lt`, `not_equals` |
| `order_status`      | `WC_Order::get_status()`                       | `equals`, `in`, `not_in`           |
| `item_count`        | `WC_Order::get_item_count()`                   | `gt`, `lt`, `equals`               |
| `billing_country`   | ISO 3166-1 alpha-2                             | `equals`, `in`, `not_in`           |
| `shipping_country`  | ISO 3166-1 alpha-2 (fallback do billing)       | `equals`, `in`, `not_in`           |
| `geo_scope`         | `pl`, `eu`, `eea`, `non_eu`                    | `equals`                           |
| `customer_email`    | `WC_Order::get_billing_email()`                | `equals`, `contains`               |
| `payment_method`    | `WC_Order::get_payment_method()`               | `equals`, `in`                     |
| `shipping_method`   | Lista metod z pozycji wysylki                  | `in`, `not_in`                     |
| `product_id`        | Lista ID produktow w zamowieniu                | `in`, `not_in`                     |
| `category`          | Lista ID `product_cat` z pozycji zamowienia    | `in`, `not_in`                     |

Operator `in` / `not_in` przyjmuje liste rozdzielona przecinkami (`PL,DE,FR`).

### Filtry geograficzne

Pole `geo_scope` zwraca jedna z czterech wartosci dla zamowienia/uzytkownika:

| Wartosc  | Zakres                                        |
| -------- | --------------------------------------------- |
| `pl`     | Polska (PL)                                   |
| `eu`     | Kraje UE (27 panstw czlonkowskich)            |
| `eea`    | EOG = UE + Norwegia, Islandia, Liechtenstein  |
| `non_eu` | Reszta swiata                                 |

Przyklad uzycia: regula wysyla inny szablon emaila marketingowego klientom z UE (z notka RODO) niz spoza UE.

## Akcje

| Typ                  | Parametry                                                                            |
| -------------------- | ------------------------------------------------------------------------------------ |
| `send_email`         | `to` (opcjonalne), `subject`, `body`, `marketing` (boolean wymuszajace zgode)        |
| `send_sms`           | Delegowane do `polski_pro/automation/send_sms` (wymaga `SmsNotificationService`)     |
| `change_order_status`| `status`, `note`                                                                     |
| `add_order_note`     | `note`, `customer_note` (boolean)                                                    |
| `add_customer_tag`   | `tag` (zapisuje do user_meta `polski_customer_tags`)                                 |
| `webhook`            | `url` — POST z `{subject_type, subject_id}`                                          |

### Zgoda marketingowa

Akcje z `params.marketing = true` sa pomijane, jesli klient nie ma waznej zgody marketingowej w `polski_consent_log`. Filtr `polski_pro/automation/has_marketing_consent` pozwala zastapic domyslna logike sprawdzania zgody.

### Rozszerzanie akcji

Aby dodac niestandardowa akcje (np. integracje z FreshMail/GetResponse), uzyj filtru:

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

Wszystkie endpointy wymagaja `manage_woocommerce` + naglowka `X-WP-Nonce`.

| Metoda  | Sciezka                                          | Opis                            |
| ------- | ------------------------------------------------ | ------------------------------- |
| GET     | `/polski-pro/v1/automation/rules`                | Lista regul                     |
| POST    | `/polski-pro/v1/automation/rules`                | Utworzenie reguly               |
| GET     | `/polski-pro/v1/automation/rules/{id}`           | Pobranie pojedynczej reguly     |
| PUT     | `/polski-pro/v1/automation/rules/{id}`           | Aktualizacja reguly             |
| DELETE  | `/polski-pro/v1/automation/rules/{id}`           | Usuniecie + czyszczenie logow   |
| POST    | `/polski-pro/v1/automation/rules/{id}/dry-run`   | Symulacja na zamowieniu/uzytkowniku (`order_id` lub `user_id`) |
| GET     | `/polski-pro/v1/automation/logs?limit=200`       | Dziennik audytu (max 500)       |
| GET     | `/polski-pro/v1/automation/schema`               | Schemat triggerow/filtrow/akcji |

## Dry run

W edytorze reguly podaj `Order ID` i kliknij **Run dry run**. Silnik:

1. Ewaluuje filtry wzgledem podanego zamowienia.
2. Sprawdza zgode marketingowa.
3. Wykonuje akcje w trybie dry-run (nie modyfikuje stanu) i zwraca planowany rezultat.
4. Zapisuje wpis w dzienniku audytu z flaga `dry_run = 1`.

## Limity i wydajnosc

- Indeksy na `enabled`, `trigger_type`, `priority`, `group_label` — silnik pobiera tylko reguly pasujace do triggera.
- `recent($limit)` w `AutomationLogRepository` jest ograniczone do 500 rekordow na zapytanie.
- Webhooki maja timeout 10s.
