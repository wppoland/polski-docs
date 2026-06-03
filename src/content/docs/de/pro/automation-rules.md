---
title: Automatisierungsregeln
description: Regel-Engine für Automatisierung mit Trigger-Filter-Action, REST API, Dry Run, Audit-Log und geografischen Filtern (PL/EU/EWR).
---

Das Modul **Automatisierungsregeln** führt Aktionen (E-Mail, SMS, Statusänderung, Notiz, Kunden-Tag, Webhook) auf Grundlage von Ereignissen im Shop aus. Regeln definieren Sie im Panel **WooCommerce > Automation Rules** über eine React-SPA, und die Engine führt sie als Reaktion auf einen Trigger aus.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.6.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Architektur

| Element              | Beschreibung                                                                          |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Trigger**          | WooCommerce-Ereignis, das eine Regel auslöst (`new_order`, `order_status_changed`, ...) |
| **Filter**           | Logische Bedingung (`order_total > 100`, `geo_scope in eu`, ...)                       |
| **Action**           | Auszuführende Operation (`send_email`, `add_order_note`, `webhook`, ...)               |
| **Match mode**       | `all` - alle Filter erfüllt, `any` - einer genügt                                     |
| **Priority**         | Ausführungsreihenfolge (kleiner = früher)                                             |

Die Regeln werden in der Tabelle `wp_polski_pro_automation_rules` gespeichert. Ausführungen (matched/skipped, Dry Run, Aktionsergebnis, Fehler) gelangen in `wp_polski_pro_automation_logs`.

## Trigger

| Wert                    | Wann ausgelöst                                       |
| ----------------------- | ---------------------------------------------------- |
| `new_order`             | `woocommerce_new_order`                              |
| `order_status_changed`  | `woocommerce_order_status_changed`                   |
| `new_customer`          | `user_register`                                      |
| `cart_abandoned`        | (Reserve - Integration mit `AbandonedCartService`)   |
| `product_saved`         | `save_post_product`                                  |

## Filter

Verfügbare Felder in den Filtern (`FilterField`):

| Feld                | Quelle                                         | Operatoren                         |
| ------------------- | ---------------------------------------------- | ---------------------------------- |
| `order_total`       | `WC_Order::get_total()`                        | `equals`, `gt`, `lt`, `not_equals` |
| `order_status`      | `WC_Order::get_status()`                       | `equals`, `in`, `not_in`           |
| `item_count`        | `WC_Order::get_item_count()`                   | `gt`, `lt`, `equals`               |
| `billing_country`   | ISO 3166-1 alpha-2                             | `equals`, `in`, `not_in`           |
| `shipping_country`  | ISO 3166-1 alpha-2 (Fallback auf billing)      | `equals`, `in`, `not_in`           |
| `geo_scope`         | `pl`, `eu`, `eea`, `non_eu`                    | `equals`                           |
| `customer_email`    | `WC_Order::get_billing_email()`                | `equals`, `contains`               |
| `payment_method`    | `WC_Order::get_payment_method()`               | `equals`, `in`                     |
| `shipping_method`   | Liste der Methoden aus der Versandposition     | `in`, `not_in`                     |
| `product_id`        | Liste der Produkt-IDs in der Bestellung        | `in`, `not_in`                     |
| `category`          | Liste der `product_cat`-IDs aus den Positionen | `in`, `not_in`                     |

Der Operator `in` / `not_in` akzeptiert eine durch Kommas getrennte Liste (`PL,DE,FR`).

### Geografische Filter

Das Feld `geo_scope` gibt für eine Bestellung/einen Benutzer einen von vier Werten zurück:

| Wert     | Bereich                                       |
| -------- | --------------------------------------------- |
| `pl`     | Polen (PL)                                    |
| `eu`     | EU-Länder (27 Mitgliedstaaten)                |
| `eea`    | EWR = EU + Norwegen, Island, Liechtenstein    |
| `non_eu` | Rest der Welt                                 |

Anwendungsbeispiel: Eine Regel sendet Kunden aus der EU (mit DSGVO-Hinweis) eine andere Marketing-E-Mail-Vorlage als Kunden außerhalb der EU.

## Aktionen

| Typ                  | Parameter                                                                            |
| -------------------- | ------------------------------------------------------------------------------------ |
| `send_email`         | `to` (optional), `subject`, `body`, `marketing` (boolean erzwingt Einwilligung)      |
| `send_sms`           | Delegiert an `polski_pro/automation/send_sms` (erfordert `SmsNotificationService`)   |
| `change_order_status`| `status`, `note`                                                                     |
| `add_order_note`     | `note`, `customer_note` (boolean)                                                    |
| `add_customer_tag`   | `tag` (speichert in user_meta `polski_customer_tags`)                                |
| `webhook`            | `url` - POST mit `{subject_type, subject_id}`                                        |

### Marketing-Einwilligung

Aktionen mit `params.marketing = true` werden übersprungen, wenn der Kunde keine gültige Marketing-Einwilligung in `polski_consent_log` hat. Der Filter `polski_pro/automation/has_marketing_consent` erlaubt es, die Standardlogik zur Einwilligungsprüfung zu ersetzen.

### Aktionen erweitern

Um eine benutzerdefinierte Aktion hinzuzufügen (z. B. eine Integration mit FreshMail/GetResponse), verwenden Sie den Filter:

```php
add_filter('polski_pro/automation/action', function ($override, $action, $subject, $dryRun) {
    if ($action->type->value === 'send_email' && ($action->params['provider'] ?? '') === 'freshmail') {
        if ($dryRun) {
            return ['dry_run' => true, 'provider' => 'freshmail'];
        }
        // ... FreshMail-API-Aufruf ...
        return ['provider' => 'freshmail', 'sent' => true];
    }

    return $override;
}, 10, 4);
```

## REST API

Alle Endpunkte erfordern `manage_woocommerce` + den Header `X-WP-Nonce`.

| Methode | Pfad                                             | Beschreibung                    |
| ------- | ------------------------------------------------ | ------------------------------- |
| GET     | `/polski-pro/v1/automation/rules`                | Liste der Regeln                |
| POST    | `/polski-pro/v1/automation/rules`                | Regel erstellen                 |
| GET     | `/polski-pro/v1/automation/rules/{id}`           | Einzelne Regel abrufen          |
| PUT     | `/polski-pro/v1/automation/rules/{id}`           | Regel aktualisieren             |
| DELETE  | `/polski-pro/v1/automation/rules/{id}`           | Löschen + Bereinigung der Logs  |
| POST    | `/polski-pro/v1/automation/rules/{id}/dry-run`   | Simulation an Bestellung/Benutzer (`order_id` oder `user_id`) |
| GET     | `/polski-pro/v1/automation/logs?limit=200`       | Audit-Log (max 500)             |
| GET     | `/polski-pro/v1/automation/schema`               | Schema der Trigger/Filter/Aktionen |

## Dry Run

Geben Sie im Regeleditor eine `Order ID` ein und klicken Sie auf **Run dry run**. Die Engine:

1. Wertet die Filter gegen die angegebene Bestellung aus.
2. Prüft die Marketing-Einwilligung.
3. Führt die Aktionen im Dry-Run-Modus aus (ändert keinen Zustand) und gibt das geplante Ergebnis zurück.
4. Speichert einen Eintrag im Audit-Log mit dem Flag `dry_run = 1`.

## Limits und Performance

- Indizes auf `enabled`, `trigger_type`, `priority`, `group_label` - die Engine ruft nur die zum Trigger passenden Regeln ab.
- `recent($limit)` im `AutomationLogRepository` ist auf 500 Datensätze pro Abfrage begrenzt.
- Webhooks haben ein Timeout von 10 s.
