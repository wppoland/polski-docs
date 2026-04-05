---
title: CSV-Import und -Export
description: CSV-Datenimport und -export in Polski for WooCommerce - GPSR-Felder, Greenwashing und Produktdaten.
---

Erweiterung des WooCommerce-CSV-Importers/Exporters um Spalten fuer rechtliche Daten, GPSR, Umwelterklaerungen und andere Felder des polnischen und EU-Rechts.

## Unterstuetzte CSV-Felder

### GPSR-Felder (General Product Safety Regulation)

| CSV-Spalte                      | Meta-Schluessel                         | Typ    | Beschreibung                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `gpsr_manufacturer_name`         | `_polski_gpsr_manufacturer_name` | string | Herstellername               |
| `gpsr_manufacturer_address`      | `_polski_gpsr_manufacturer_address` | string | Herstelleradresse            |
| `gpsr_manufacturer_email`        | `_polski_gpsr_manufacturer_email`| string | Hersteller-E-Mail              |
| `gpsr_manufacturer_phone`        | `_polski_gpsr_manufacturer_phone`| string | Herstellertelefon             |
| `gpsr_manufacturer_url`          | `_polski_gpsr_manufacturer_url`  | string | Herstellerwebsite          |
| `gpsr_authorized_rep_name`       | `_polski_gpsr_auth_rep_name`     | string | Name des bevollmaechtigten Vertreters |
| `gpsr_authorized_rep_address`    | `_polski_gpsr_auth_rep_address`  | string | Adresse des bevollmaechtigten Vertreters |
| `gpsr_authorized_rep_email`      | `_polski_gpsr_auth_rep_email`    | string | E-Mail des bevollmaechtigten Vertreters |
| `gpsr_safety_info`               | `_polski_gpsr_safety_info`       | string | Sicherheitsinformationen    |
| `gpsr_warnings`                  | `_polski_gpsr_warnings`          | string | Produktwarnhinweise  |
| `gpsr_barcode_type`              | `_polski_gpsr_barcode_type`      | string | Code-Typ: EAN, UPC, GTIN       |
| `gpsr_barcode_value`             | `_polski_gpsr_barcode_value`     | string | Barcode-Wert         |
| `gpsr_country_of_origin`         | `_polski_gpsr_country_origin`    | string | Herkunftsland (ISO-Code)      |

### Greenwashing-Felder (Anti-Greenwashing)

| CSV-Spalte                      | Meta-Schluessel                         | Typ    | Beschreibung                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `green_claim_text`               | `_polski_green_claim`            | string | Text der Umwelterklaerung |
| `green_claim_evidence`           | `_polski_green_evidence`         | string | Nachweise / Begruendung          |
| `green_certification_name`       | `_polski_green_cert_name`        | string | Zertifikatsname              |
| `green_certification_number`     | `_polski_green_cert_number`      | string | Zertifikatsnummer              |
| `green_certification_url`        | `_polski_green_cert_url`         | string | Link zum Zertifikat            |
| `green_carbon_footprint`         | `_polski_green_carbon`           | float  | CO2-Fussabdruck (kg CO2)          |
| `green_recyclable`               | `_polski_green_recyclable`       | bool   | Ob das Produkt recycelbar ist |
| `green_durability_years`         | `_polski_green_durability`       | int    | Produkthaltbarkeit in Jahren     |

### Lebensmittelfelder

| CSV-Spalte                      | Meta-Schluessel                         | Typ    | Beschreibung                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `energy_kcal`                    | `_polski_energy_kcal`            | float  | Energie (kcal/100g)            |
| `energy_kj`                      | `_polski_energy_kj`              | float  | Energie (kJ/100g)              |
| `fat`                            | `_polski_fat`                    | float  | Fett (g/100g)              |
| `saturated_fat`                  | `_polski_saturated_fat`          | float  | Gesaettigte Fettsaeuren      |
| `carbohydrates`                  | `_polski_carbohydrates`          | float  | Kohlenhydrate (g/100g)          |
| `sugars`                         | `_polski_sugars`                 | float  | Zucker (g/100g)                |
| `protein`                        | `_polski_protein`                | float  | Protein (g/100g)               |
| `salt`                           | `_polski_salt`                   | float  | Salz (g/100g)                  |
| `fiber`                          | `_polski_fiber`                  | float  | Ballaststoffe (g/100g)              |
| `allergens`                      | `_polski_allergens`              | string | Allergene (durch Komma getrennt) |
| `nutri_score`                    | `_polski_nutri_score`            | string | Nutri-Score: A, B, C, D, E     |

## CSV-Import

### Ueber das Admin-Panel

1. Gehen Sie zu **WooCommerce > Produkte > Import**
2. Waehlen Sie die CSV-Datei
3. Bei der Spaltenzuordnung erscheinen die Polski-for-WooCommerce-Spalten automatisch im Abschnitt **Polski for WooCommerce**
4. Ordnen Sie die CSV-Spalten den entsprechenden Feldern zu
5. Starten Sie den Import

### Ueber WP-CLI

```bash
wp wc product_csv_importer run /pfad/zur/datei.csv --user=admin
```

## CSV-Export

### Ueber das Admin-Panel

1. Gehen Sie zu **WooCommerce > Produkte > Export**
2. Waehlen Sie im Abschnitt **Zu exportierende Spalten** die Spalten aus der Gruppe **Polski for WooCommerce**
3. Optional nach Kategorie, Status oder Produkttyp filtern
4. Klicken Sie auf **CSV generieren**

## Import-Validierung

Der Import validiert Daten automatisch:

- **GTIN/EAN** - Pruefziffer (Modulo-10-Algorithmus)
- **E-Mail** - Format-Validierung
- **URL** - Format-Validierung
- **Land** - ISO-3166-1-Alpha-2-Codepruefung
- **Allergene** - Pruefung ob Werte zur definierten Liste gehoeren (14 EU-Allergene)
- **Nutri-Score** - Pruefung ob Wert A, B, C, D oder E ist

Ungueltige Werte werden protokolliert und uebersprungen (blockieren den Import nicht).

## Fehlerbehebung

**Polski-Spalten erscheinen nicht in der Zuordnung** - stellen Sie sicher, dass das Plugin Polski for WooCommerce aktiv ist.

**Import endet mit Timeout** - erhoehen Sie `max_execution_time` in PHP oder verwenden Sie WP-CLI fuer den Import grosser Dateien.

**Sonderzeichen sind beschaedigt** - stellen Sie sicher, dass die CSV-Datei in UTF-8-Codierung (ohne BOM) gespeichert ist.

**Zahlenwerte werden nicht importiert** - das Dezimaltrennzeichen in der CSV-Datei sollte ein Punkt (.) sein, kein Komma.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
