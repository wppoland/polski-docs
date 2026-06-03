---
title: CSV-Import und -Export
description: Import und Export von CSV-Daten in Polski for WooCommerce - GPSR-Felder, Greenwashing und Produktdaten.
---

Erweiterung des CSV-Importers/-Exporters von WooCommerce um Spalten für Rechtsdaten, GPSR, Umweltaussagen und andere Felder, die das polnische und EU-Recht erfordern.

## Unterstützte CSV-Felder

### GPSR-Felder (General Product Safety Regulation)

| CSV-Spalte                      | Meta-Key                         | Typ    | Beschreibung                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `gpsr_manufacturer_name`         | `_polski_gpsr_manufacturer_name` | string | Name des Herstellers               |
| `gpsr_manufacturer_address`      | `_polski_gpsr_manufacturer_address` | string | Adresse des Herstellers            |
| `gpsr_manufacturer_email`        | `_polski_gpsr_manufacturer_email`| string | E-Mail des Herstellers              |
| `gpsr_manufacturer_phone`        | `_polski_gpsr_manufacturer_phone`| string | Telefon des Herstellers             |
| `gpsr_manufacturer_url`          | `_polski_gpsr_manufacturer_url`  | string | Website des Herstellers          |
| `gpsr_authorized_rep_name`       | `_polski_gpsr_auth_rep_name`     | string | Name des bevollmächtigten Vertreters |
| `gpsr_authorized_rep_address`    | `_polski_gpsr_auth_rep_address`  | string | Adresse des bevollmächtigten Vertreters |
| `gpsr_authorized_rep_email`      | `_polski_gpsr_auth_rep_email`    | string | E-Mail des bevollmächtigten Vertreters |
| `gpsr_safety_info`               | `_polski_gpsr_safety_info`       | string | Sicherheitsinformationen    |
| `gpsr_warnings`                  | `_polski_gpsr_warnings`          | string | Produktwarnungen  |
| `gpsr_barcode_type`              | `_polski_gpsr_barcode_type`      | string | Codetyp: EAN, UPC, GTIN       |
| `gpsr_barcode_value`             | `_polski_gpsr_barcode_value`     | string | Barcode-Wert         |
| `gpsr_product_type`              | `_polski_gpsr_product_type`      | string | Produkttyp gemäß GPSR            |
| `gpsr_country_of_origin`         | `_polski_gpsr_country_origin`    | string | Ursprungsland (ISO-Code)      |

### Greenwashing-Felder (Anti-Greenwashing)

| CSV-Spalte                      | Meta-Key                         | Typ    | Beschreibung                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `green_claim_text`               | `_polski_green_claim`            | string | Inhalt der Umweltaussage |
| `green_claim_evidence`           | `_polski_green_evidence`         | string | Belege / Begründung          |
| `green_certification_name`       | `_polski_green_cert_name`        | string | Name des Zertifikats              |
| `green_certification_number`     | `_polski_green_cert_number`      | string | Zertifikatsnummer              |
| `green_certification_url`        | `_polski_green_cert_url`         | string | Link zum Zertifikat            |
| `green_carbon_footprint`         | `_polski_green_carbon`           | float  | CO2-Fußabdruck (kg CO2)          |
| `green_recyclable`               | `_polski_green_recyclable`       | bool   | Ob das Produkt recycelbar ist |
| `green_durability_years`         | `_polski_green_durability`       | int    | Haltbarkeit des Produkts in Jahren     |

### Produktdatenfelder

| CSV-Spalte                      | Meta-Key                         | Typ    | Beschreibung                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `unit_price`                     | `_polski_unit_price`             | float  | Grundpreis               |
| `unit_price_unit`                | `_polski_unit_price_unit`        | string | Einheit: kg, l, m, Stk       |
| `unit_price_base`                | `_polski_unit_price_base`        | float  | Umrechnungsbasis            |
| `delivery_time_min`              | `_polski_delivery_min`           | int    | Min. Lieferzeit (Tage)        |
| `delivery_time_max`              | `_polski_delivery_max`           | int    | Max. Lieferzeit (Tage)        |
| `manufacturer_name`              | `_polski_manufacturer`           | string | Name des Herstellers               |
| `manufacturer_url`               | `_polski_manufacturer_url`       | string | URL des Herstellers                 |
| `gtin`                           | `_polski_gtin`                   | string | GTIN/EAN-Code                   |
| `withdrawal_excluded`            | `_polski_withdrawal_excluded`    | bool   | Vom Widerrufsrecht ausgeschlossen  |
| `withdrawal_reason`              | `_polski_withdrawal_reason`      | string | Grund des Ausschlusses vom Widerruf |

### Felder für Lebensmittelprodukte

| CSV-Spalte                      | Meta-Key                         | Typ    | Beschreibung                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `energy_kcal`                    | `_polski_energy_kcal`            | float  | Energie (kcal/100g)            |
| `energy_kj`                      | `_polski_energy_kj`              | float  | Energie (kJ/100g)              |
| `fat`                            | `_polski_fat`                    | float  | Fett (g/100g)              |
| `saturated_fat`                  | `_polski_saturated_fat`          | float  | Gesättigte Fettsäuren      |
| `carbohydrates`                  | `_polski_carbohydrates`          | float  | Kohlenhydrate (g/100g)          |
| `sugars`                         | `_polski_sugars`                 | float  | Zucker (g/100g)                |
| `protein`                        | `_polski_protein`                | float  | Eiweiß (g/100g)               |
| `salt`                           | `_polski_salt`                   | float  | Salz (g/100g)                  |
| `fiber`                          | `_polski_fiber`                  | float  | Ballaststoffe (g/100g)              |
| `allergens`                      | `_polski_allergens`              | string | Allergene (durch Komma getrennt) |
| `nutri_score`                    | `_polski_nutri_score`            | string | Nutri-Score: A, B, C, D, E     |

## Beispiel-CSV-Datei

```csv
ID,SKU,Name,gpsr_manufacturer_name,gpsr_manufacturer_address,gpsr_manufacturer_email,gpsr_barcode_type,gpsr_barcode_value,gpsr_country_of_origin,unit_price,unit_price_unit,delivery_time_min,delivery_time_max,manufacturer_name
123,SKU-001,"Baumwoll-T-Shirt","Producent XYZ Sp. z o.o.","ul. Fabryczna 1, 00-001 Warszawa","kontakt@xyz.pl","EAN","5901234123457","PL",49.99,"Stk",2,5,"XYZ"
456,SKU-002,"Rapsöl 1L","Olejarnia ABC","ul. Polna 5, 60-001 Poznań","info@abc.pl","EAN","5901234567890","PL",12.99,"l",1,3,"ABC"
```

## CSV-Import

### Über den Admin-Bereich

1. Gehen Sie zu **WooCommerce > Produkte > Import**
2. Wählen Sie die CSV-Datei aus
3. Im Schritt der Spaltenzuordnung erscheinen die Spalten von Polski for WooCommerce automatisch im Abschnitt **Polski for WooCommerce**
4. Ordnen Sie die CSV-Spalten den entsprechenden Feldern zu
5. Starten Sie den Import

### Über WP-CLI

```bash
wp wc product_csv_importer run /pfad/zur/datei.csv --user=admin
```

### Programmatisch

```php
// Hook zur Modifikation der importierten Daten
add_filter('polski/csv/import_data', function (array $data, array $raw_row): array {
    // Validierung des GTIN-Codes
    if (!empty($data['gpsr_barcode_value'])) {
        $gtin = $data['gpsr_barcode_value'];
        if (strlen($gtin) !== 13 && strlen($gtin) !== 8) {
            $data['gpsr_barcode_value'] = ''; // Ungültigen Code verwerfen
        }
    }
    return $data;
}, 10, 2);
```

## CSV-Export

### Über den Admin-Bereich

1. Gehen Sie zu **WooCommerce > Produkte > Export**
2. Markieren Sie im Abschnitt **Zu exportierende Spalten** die Spalten aus der Gruppe **Polski for WooCommerce**
3. Filtern Sie optional nach Kategorie, Status oder Produkttyp
4. Klicken Sie auf **CSV generieren**

### Über WP-CLI

```bash
wp wc product_csv_exporter run --filename=produkty-polski.csv --user=admin
```

### Filtern der Exportspalten

```php
// Hinzufügen eigener Spalten zum Export
add_filter('polski/csv/export_columns', function (array $columns): array {
    $columns['custom_field'] = 'Eigenes Feld';
    return $columns;
});

// Wert der eigenen Spalte
add_filter('polski/csv/export_column_value', function ($value, string $column, WC_Product $product) {
    if ($column === 'custom_field') {
        return $product->get_meta('_my_custom_field');
    }
    return $value;
}, 10, 3);
```

## Validierung des Imports

Der Import validiert die Daten automatisch:

- **GTIN/EAN** - Prüfung der Prüfziffer (Modulo-10-Algorithmus)
- **E-Mail** - Validierung des E-Mail-Adressformats
- **URL** - Validierung des URL-Formats
- **Land** - Prüfung des ISO 3166-1 alpha-2 Codes
- **Allergene** - Prüfung, ob die Werte zur definierten Liste gehören (14 EU-Allergene)
- **Nutri-Score** - Prüfung, ob der Wert A, B, C, D oder E ist

Ungültige Werte werden übersprungen und protokolliert (blockieren den Import nicht). Das Protokoll ist in den Importergebnissen verfügbar.

## Massenimport von GPSR-Daten

Für Shops mit vielen Produkten desselben Herstellers:

```bash
# CSV mit Minimaldaten vorbereiten
# ID,gpsr_manufacturer_name,gpsr_manufacturer_address,gpsr_manufacturer_email
```

Legen Sie Standardwerte für GPSR unter **WooCommerce > Polski > Rechtskonformität > GPSR > Standardwerte** fest. Der Import ergänzt nur Produkte mit leeren GPSR-Feldern.

## Fehlerbehebung

**Die Polski-Spalten erscheinen nicht in der Zuordnung** - stellen Sie sicher, dass das Plugin Polski for WooCommerce aktiv ist. Die Spalten werden über den Hook `woocommerce_csv_product_import_mapping_options` registriert.

**Der Import endet mit einem Timeout** - erhöhen Sie die PHP-Einstellung `max_execution_time` oder verwenden Sie WP-CLI für den Import großer Dateien.

**Sonderzeichen sind beschädigt** - stellen Sie sicher, dass die CSV-Datei in der Kodierung UTF-8 (ohne BOM) gespeichert ist.

**Numerische Werte werden nicht importiert** - das Dezimaltrennzeichen in der CSV-Datei sollte ein Punkt (.) sein, kein Komma.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
