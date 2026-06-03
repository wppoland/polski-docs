---
title: Bestellexport
description: Modul zum Bestellexport in Polski for WooCommerce - CSV-Export mit über 30 konfigurierbaren Feldern, Datums- und Statusfilter.
---

Das Modul Bestellexport ermöglicht das Erzeugen von CSV-Dateien mit den Daten von WooCommerce-Bestellungen. Es unterstützt über 30 konfigurierbare Felder, Filter für Datumsbereiche und Bestellstatus. Die Konfiguration der Feldauswahl wird in den WordPress-Optionen gespeichert.

## Aktivierung des Moduls

Gehen Sie zu **WooCommerce > Polski > Werkzeuge** und aktivieren Sie **Bestellexport** (Modul-ID: `order_export`).

## Export-Panel

Das Export-Panel ist unter **WooCommerce > Polski > Werkzeuge > Bestellexport** verfügbar (`admin.php?page=polski-order-export`).

### Filter

#### Datumsbereich

Wählen Sie den Zeitraum, aus dem Sie Bestellungen exportieren möchten:

- **Datum von** - Beginn des Bereichs (Datumsauswahlfeld)
- **Datum bis** - Ende des Bereichs (Datumsauswahlfeld)
- Vordefinierte Bereiche: **Heute**, **Letzte 7 Tage**, **Letzte 30 Tage**, **Laufender Monat**, **Vormonat**, **Laufendes Jahr**

Die Daten beziehen sich auf das Erstellungsdatum der Bestellung (`date_created`).

#### Bestellstatus

Wählen Sie die zu exportierenden Bestellstatus (Mehrfachauswahl):

- Zahlung ausstehend (`pending`)
- In Bearbeitung (`processing`)
- In Wartestellung (`on-hold`)
- Abgeschlossen (`completed`)
- Storniert (`cancelled`)
- Erstattet (`refunded`)
- Fehlgeschlagen (`failed`)

Standardmäßig ausgewählt sind: **In Bearbeitung** und **Abgeschlossen**.

### Feldauswahl

Wählen Sie die Felder aus, die in der CSV-Datei enthalten sein sollen. Die Feldkonfiguration wird in den WordPress-Optionen gespeichert und zwischen den Exporten gemerkt.

#### Bestellfelder

| Feld                     | CSV-Spalte               | Beschreibung                   |
| ------------------------ | ------------------------ | ------------------------------ |
| Bestell-ID               | `order_id`               | Bestellnummer                  |
| Bestelldatum             | `order_date`             | Datum und Uhrzeit der Erstellung |
| Status                   | `order_status`           | Bestellstatus                  |
| Währung                  | `currency`               | Währungscode (z. B. PLN)       |
| Zahlungsmethode          | `payment_method`         | Name der Zahlungsmethode       |
| Titel der Zahlungsmethode| `payment_method_title`   | Angezeigter Name der Zahlung   |
| Bestellsumme             | `order_total`            | Gesamtbetrag                   |
| Produktsumme             | `order_subtotal`         | Produktbetrag (ohne Versand)   |
| Steuerbetrag             | `order_tax`              | Gesamter Steuerbetrag          |
| Versandkosten            | `shipping_total`         | Versandkosten                  |
| Versandmethode           | `shipping_method`        | Name der Versandmethode        |
| Rabatt                   | `discount_total`         | Gesamtbetrag der Rabatte       |
| Gutscheincode            | `coupon_codes`           | Verwendete Gutscheincodes      |
| Kundennotiz              | `customer_note`          | Anmerkungen des Kunden zur Bestellung |
| Kunden-IP                | `customer_ip`            | IP-Adresse des Kunden          |

#### Adressfelder - Rechnung

| Feld                     | CSV-Spalte               |
| ------------------------ | ------------------------ |
| Vorname (Rechnung)       | `billing_first_name`     |
| Nachname (Rechnung)      | `billing_last_name`      |
| Firma                    | `billing_company`        |
| NIP                      | `billing_nip`            |
| Adresszeile 1            | `billing_address_1`      |
| Adresszeile 2            | `billing_address_2`      |
| Stadt                    | `billing_city`           |
| Postleitzahl             | `billing_postcode`       |
| Woiwodschaft             | `billing_state`          |
| Land                     | `billing_country`        |
| E-Mail                   | `billing_email`          |
| Telefon                  | `billing_phone`          |

#### Adressfelder - Versand

| Feld                     | CSV-Spalte               |
| ------------------------ | ------------------------ |
| Vorname (Versand)        | `shipping_first_name`    |
| Nachname (Versand)       | `shipping_last_name`     |
| Firma (Versand)          | `shipping_company`       |
| Adresszeile 1            | `shipping_address_1`     |
| Adresszeile 2            | `shipping_address_2`     |
| Stadt                    | `shipping_city`          |
| Postleitzahl             | `shipping_postcode`      |
| Woiwodschaft             | `shipping_state`         |
| Land                     | `shipping_country`       |

#### Produktfelder

| Feld                     | CSV-Spalte               | Beschreibung                   |
| ------------------------ | ------------------------ | ------------------------------ |
| Produktname              | `product_name`           | Name des Produkts in der Bestellung |
| SKU                      | `product_sku`            | SKU-Code des Produkts          |
| Menge                    | `product_qty`            | Bestellte Menge                |
| Einzelpreis              | `product_price`          | Preis pro Stück                |
| Positionssumme           | `line_total`             | Gesamtbetrag der Position      |

Wenn eine Bestellung mehrere Produkte enthält, wird jedes Produkt als separate Zeile mit wiederholten Bestelldaten exportiert.

## Format der CSV-Datei

- **Kodierung**: UTF-8 mit BOM (für die korrekte Anzeige polnischer Zeichen in Excel)
- **Trennzeichen**: Semikolon (`;`) - Standard für das polnische Excel
- **Texttrennzeichen**: doppeltes Anführungszeichen (`"`)
- **Zeilenenden**: `\r\n` (Windows)

## Export

Klicken Sie nach der Konfiguration der Filter und Felder auf **In CSV exportieren**. Die Datei wird vom Browser heruntergeladen.

Für große Datenmengen (über 10.000 Bestellungen) wird der Export im Hintergrund mit Fortschrittsbalken ausgeführt. Nach Abschluss steht die Datei 24 Stunden lang zum Herunterladen bereit.

## WP-CLI

Exportieren Sie Bestellungen über die Kommandozeile:

```bash
wp polski export orders --date-from=2025-01-01 --date-to=2025-12-31 --status=completed --output=/tmp/orders.csv
```

Parameter:

- `--date-from` - Anfangsdatum (YYYY-MM-DD)
- `--date-to` - Enddatum (YYYY-MM-DD)
- `--status` - Bestellstatus (durch Komma getrennt)
- `--fields` - Liste der Felder (durch Komma getrennt)
- `--output` - Pfad der Ausgabedatei

## Hooks

```php
// Eigenes Feld zum Export hinzufügen
add_filter('polski/order_export/fields', function (array $fields): array {
    $fields['custom_field'] = [
        'label'    => 'Benutzerdefiniertes Feld',
        'callback' => function (\WC_Order $order): string {
            return $order->get_meta('_custom_field');
        },
    ];
    return $fields;
});

// Bestellabfrage modifizieren
add_filter('polski/order_export/query_args', function (array $args): array {
    $args['meta_key']   = '_billing_nip';
    $args['meta_compare'] = 'EXISTS';
    return $args;
});
```

## Fehlerbehebung

**Polnische Zeichen werden in Excel falsch angezeigt** - stellen Sie sicher, dass die BOM-Option aktiviert ist (standardmäßig ja). In älteren Excel-Versionen verwenden Sie den Datenimport mit der Kodierungseinstellung UTF-8.

**Der Export dauert zu lange** - bei einer sehr großen Anzahl von Bestellungen verwenden Sie WP-CLI statt der Weboberfläche. Erwägen Sie, den Datumsbereich einzugrenzen.

**Kein NIP-Feld im Export** - das Feld `billing_nip` ist nur verfügbar, wenn das Modul NIP an der Kasse aktiv ist.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
