---
title: Export der Lagerbestände
description: Modul zum Export der Lagerbestände in Polski for WooCommerce - CSV-Export mit Schwellenwertfilter, Unterstützung von Variationen, HTML-Vorschau und Excel-Format.
---

Das Modul zum Export der Lagerbestände erzeugt CSV-Dateien mit Daten zu den Lagerbeständen von WooCommerce-Produkten. Es unterstützt 10 konfigurierbare Felder, das Filtern nach Mengenschwelle, die vollständige Unterstützung variabler Produkte sowie einen Vorschaumodus in einer HTML-Tabelle.

## Modul aktivieren

Gehe zu **WooCommerce > Polski > Werkzeuge** und aktiviere **Export der Lagerbestände** (Modul-ID: `stock_export`).

## Export-Panel

Das Export-Panel ist unter **Produkte > Export der Lagerbestände** verfügbar (`edit.php?post_type=product&page=polski-stock-export`).

### Schwellenwertfilter

Filtere Produkte nach der Menge im Lager:

| Operator | Beschreibung                    | Beispiel                        |
| -------- | ------------------------------- | ------------------------------- |
| `<=`     | Kleiner oder gleich             | `<= 5` - Produkte mit einem Bestand bis 5 Stück |
| `>=`     | Größer oder gleich              | `>= 100` - Produkte mit großem Bestand |
| `=`      | Genau gleich                    | `= 0` - Produkte ohne Bestand   |

Der Schwellenwertfilter ermöglicht es, Produkte, die nachbestellt werden müssen, oder Produkte mit übermäßigem Bestand schnell zu identifizieren.

Lasse das Schwellenwertfeld leer, um alle Produkte unabhängig vom Lagerbestand zu exportieren.

### Feldauswahl

Markiere die Felder, die im Export enthalten sein sollen. Die Konfiguration wird in den WordPress-Optionen gespeichert.

| Feld                     | CSV-Spalte               | Beschreibung                              |
| ------------------------ | ------------------------ | ----------------------------------------- |
| Produkt-ID               | `product_id`             | ID des Produkteintrags (Post-ID)          |
| SKU                      | `sku`                    | SKU-Code des Produkts                     |
| Produktname              | `product_name`           | Vollständiger Produktname                 |
| Lagerstatus             | `stock_status`           | `instock`, `outofstock`, `onbackorder`    |
| Menge im Lager           | `stock_quantity`         | Aktuelle Menge (null, wenn nicht verwaltet) |
| Lagerverwaltung          | `manage_stock`           | `yes` oder `no`                           |
| Schwelle für niedrigen Bestand | `low_stock_threshold` | Schwelle für die Benachrichtigung bei niedrigem Bestand |
| Erlaubte Nachbestellungen | `backorders`            | `no`, `notify`, `yes`                     |
| Kategorie                | `category`               | Produktkategorien (durch Komma getrennt)  |
| Preis                    | `price`                  | Aktueller Produktpreis                    |

## Unterstützung von Variationen

Variable Produkte (variable products) werden mit voller Unterstützung der Variationen exportiert:

- **Übergeordnetes Produkt** - exportiert mit dem aggregierten Lagerbestand (wenn die Lagerverwaltung auf Produktebene erfolgt)
- **Variationen** - jede Variation wird als eigene Zeile mit ihren eigenen Lagerdaten exportiert

Der Variationsname enthält die Attribute in Klammern, z. B. `Poloshirt (Rot, XL)`.

Wenn die Lagerverwaltung auf Variationsebene eingestellt ist, zeigt das übergeordnete Produkt den Gesamtbestand aller Variationen an.

## Vorschaumodus

Klicke auf **Vorschau** statt auf **Exportieren**, um die Daten in einer HTML-Tabelle direkt im Admin-Panel anzuzeigen. Die Vorschau ermöglicht es:

- Die Daten vor dem Export zu prüfen
- Die Korrektheit der Filter zu überprüfen
- Die Lagerbestände schnell durchzusehen, ohne eine Datei herunterzuladen

Die Vorschautabelle ist nach jeder Spalte sortierbar (klicke auf die Überschrift). Zeilen mit einem Lagerbestand von null sind rot hervorgehoben. Zeilen mit niedrigem Bestand (unter der Schwelle) sind gelb hervorgehoben.

## Format der CSV-Datei

Die CSV-Datei ist für das Öffnen in Microsoft Excel mit polnischen Regionaleinstellungen optimiert:

- **BOM (Byte Order Mark)** - die Datei beginnt mit einer UTF-8-BOM-Markierung (`\xEF\xBB\xBF`), wodurch Excel die Kodierung korrekt erkennt
- **Trennzeichen**: Semikolon (`;`) - Excel mit polnischen Regionaleinstellungen erkennt das Semikolon standardmäßig als Spaltentrennzeichen
- **Kodierung**: UTF-8
- **Texttrennzeichen**: doppeltes Anführungszeichen (`"`)
- **Zeilenenden**: `\r\n` (Windows)

Dank BOM und Semikolon kann die CSV-Datei in Excel mit einem Doppelklick geöffnet werden - ohne dass ein Import mit Kodierungseinstellung nötig ist.

## Export

Klicke nach dem Konfigurieren der Filter und Felder auf **Nach CSV exportieren**. Die Datei wird vom Browser mit dem Namen `stock-export-YYYY-MM-DD.csv` heruntergeladen.

## WP-CLI

Exportiere die Lagerbestände über die Kommandozeile:

```bash
wp polski export stock --threshold="<=5" --output=/tmp/low-stock.csv
```

Parameter:

- `--threshold` - Schwellenwertfilter (z. B. `<=5`, `>=100`, `=0`)
- `--fields` - Liste der Felder (durch Komma getrennt)
- `--include-variations` - Variationen einbeziehen (standardmäßig `yes`)
- `--output` - Pfad der Ausgabedatei

## Hooks

```php
// Eigenes Feld zum Export hinzufügen
add_filter('polski/stock_export/fields', function (array $fields): array {
    $fields['warehouse_location'] = [
        'label'    => 'Lokalizacja w magazynie',
        'callback' => function (\WC_Product $product): string {
            return $product->get_meta('_warehouse_location');
        },
    ];
    return $fields;
});

// Produktabfrage anpassen
add_filter('polski/stock_export/query_args', function (array $args): array {
    $args['category'] = ['elektronika'];
    return $args;
});

// CSV-Trennzeichen ändern
add_filter('polski/stock_export/csv_separator', function (): string {
    return ','; // przecinek zamiast średnika
});
```

## Fehlerbehebung

**Excel zeigt polnische Zeichen als Kauderwelsch an** - stelle sicher, dass der Export eine Datei mit BOM erzeugt (standardmäßig aktiviert). In älteren Excel-Versionen (vor 2016) verwende die Datenimport-Funktion mit manueller Einstellung der UTF-8-Kodierung.

**Variationen erscheinen nicht im Export** - prüfe, ob die Variationen den Status "Veröffentlicht" haben. Variationen im Entwurfsstatus werden übersprungen.

**Der Schwellenwertfilter funktioniert nicht** - der Filter wirkt nur auf Produkte mit aktivierter Lagerverwaltung (`manage_stock = yes`). Produkte ohne Lagerverwaltung haben `stock_quantity = null`.

**Die Vorschau lädt zu lange** - bei mehr als 5.000 Produkten kann die Vorschau langsam sein. Verwende den Schwellenwertfilter, um die Anzahl der Ergebnisse zu begrenzen, oder exportiere direkt nach CSV.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
