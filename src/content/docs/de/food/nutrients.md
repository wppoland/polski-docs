---
title: Nährwerte
description: Nährwerttabelle im JSON-Format pro 100 g oder 100 ml mit Shortcode zur Anzeige auf der WooCommerce-Produktseite.
---

Ein Lebensmittelshop muss eine Nährwerttabelle anzeigen (EU-Verordnung Nr. 1169/2011). Das Plugin Polski for WooCommerce ermöglicht es, jedem Produkt eine Tabelle in einem vorschriftskonformen Format hinzuzufügen.

## Verpflichtende Nährstoffe

Die Nährwerttabelle muss mindestens enthalten:

| Nährstoff | Einheit | JSON-Schlüssel |
|-----------|---------|----------------|
| Energiewert | kJ / kcal | `energy_kj`, `energy_kcal` |
| Fett | g | `fat` |
| davon gesättigte Fettsäuren | g | `saturated_fat` |
| Kohlenhydrate | g | `carbohydrates` |
| davon Zucker | g | `sugars` |
| Eiweiß | g | `protein` |
| Salz | g | `salt` |

## Optionale Nährstoffe

Zusätzlich kannst du angeben:

| Nährstoff | Einheit | JSON-Schlüssel |
|-----------|---------|----------------|
| Einfach ungesättigte Fettsäuren | g | `monounsaturated_fat` |
| Mehrfach ungesättigte Fettsäuren | g | `polyunsaturated_fat` |
| Mehrwertige Alkohole (Polyole) | g | `polyols` |
| Stärke | g | `starch` |
| Ballaststoffe | g | `fibre` |
| Vitamin A | µg | `vitamin_a` |
| Vitamin D | µg | `vitamin_d` |
| Vitamin E | mg | `vitamin_e` |
| Vitamin K | µg | `vitamin_k` |
| Vitamin C | mg | `vitamin_c` |
| Thiamin (B1) | mg | `thiamine` |
| Riboflavin (B2) | mg | `riboflavin` |
| Niacin (B3) | mg | `niacin` |
| Vitamin B6 | mg | `vitamin_b6` |
| Folsäure | µg | `folic_acid` |
| Vitamin B12 | µg | `vitamin_b12` |
| Biotin | µg | `biotin` |
| Pantothensäure | mg | `pantothenic_acid` |
| Kalium | mg | `potassium` |
| Chlorid | mg | `chloride` |
| Calcium | mg | `calcium` |
| Phosphor | mg | `phosphorus` |
| Magnesium | mg | `magnesium` |
| Eisen | mg | `iron` |
| Zink | mg | `zinc` |
| Kupfer | mg | `copper` |
| Mangan | mg | `manganese` |
| Fluorid | mg | `fluoride` |
| Selen | µg | `selenium` |
| Chrom | µg | `chromium` |
| Molybdän | µg | `molybdenum` |
| Jod | µg | `iodine` |

## Konfiguration

### Aktivierung des Moduls

Gehe zu **WooCommerce > Einstellungen > Polski > Lebensmittel** und aktiviere das Submodul "Nährwerte".

### Einstellungen

| Einstellung | Standard | Beschreibung |
|-------------|----------|--------------|
| Referenzeinheit | pro 100 g | Standardeinheit: pro 100 g oder pro 100 ml |
| % RM anzeigen | Ja | Referenzmenge (% des Tagesbedarfs) |
| Position der Tabelle | Reiter | Wo die Tabelle auf der Produktseite angezeigt wird |
| Optionale Nährstoffe | Ballaststoffe, Vitamine | Welche optionalen Nährstoffe angezeigt werden |

## Dateneingabe im Produkteditor

Fülle im Reiter "Lebensmittel" des Produkteditors das Nährwertformular aus. Trage die Zahlenwerte pro 100 g oder 100 ml ein.

### Referenzeinheit pro Produkt

Jedes Produkt kann eine eigene Einheit haben. Stelle Getränke auf "pro 100 ml" und feste Produkte auf "pro 100 g" ein. Ohne Einstellung verwendet das Plugin den Standardwert.

### Portion

Optional gibst du die Portionsgröße und die Werte pro Portion an:

| Feld | Beschreibung |
|------|--------------|
| Portionsgröße | z. B. "30 g", "250 ml", "1 Scheibe (25 g)" |
| Anzahl der Portionen pro Verpackung | z. B. "10" |

## JSON-Format

Die Nährwerte werden in der Datenbank als JSON im Meta-Feld `_polski_nutrients` gespeichert. Format:

```json
{
    "energy_kj": 1046,
    "energy_kcal": 250,
    "fat": 9.5,
    "saturated_fat": 3.2,
    "carbohydrates": 31.0,
    "sugars": 5.4,
    "fibre": 2.1,
    "protein": 8.7,
    "salt": 1.2,
    "ref_unit": "100g",
    "serving_size": "30g",
    "servings_per_package": 10
}
```

### Validierungsregeln

- Die Werte müssen Zahlen sein (int oder float)
- Dezimaltrennzeichen im JSON: Punkt (z. B. `9.5`)
- Die Werte dürfen nicht negativ sein
- `energy_kj` und `energy_kcal` sollten konsistent sein (1 kcal = 4.184 kJ)
- Unterbestandteile dürfen den übergeordneten Bestandteil nicht überschreiten (z. B. `saturated_fat` <= `fat`)

## Shortcode

Verwende den Shortcode `[polski_nutrients]`, um die Nährwerttabelle anzuzeigen.

### Parameter

| Parameter | Typ | Standard | Beschreibung |
|-----------|-----|----------|--------------|
| `product_id` | int | aktuell | Produkt-ID |
| `show_rws` | bool | `true` | Ob % RM angezeigt wird |
| `show_serving` | bool | `false` | Ob die Spalte pro Portion angezeigt wird |
| `fields` | string | `all` | Anzuzeigende Nährstoffe (durch Kommas getrennt) |
| `layout` | string | `table` | Layout: `table`, `list`, `compact` |
| `wrapper` | string | `div` | Umschließendes HTML-Element |

### Verwendungsbeispiele

Vollständige Nährwerttabelle:

```html
[polski_nutrients]
```

Mit Werten pro Portion:

```html
[polski_nutrients show_serving="true"]
```

Nur die grundlegenden Nährstoffe:

```html
[polski_nutrients fields="energy_kcal,fat,carbohydrates,protein,salt"]
```

Kompaktes Layout (ohne Tabelle):

```html
[polski_nutrients layout="compact"]
```

Für ein bestimmtes Produkt:

```html
[polski_nutrients product_id="123" show_rws="true" show_serving="true"]
```

Im PHP-Template:

```php
echo do_shortcode('[polski_nutrients product_id="' . $product->get_id() . '"]');
```

## Generierte HTML-Tabelle

Der Shortcode generiert eine dem EU-Standard entsprechende Tabelle:

```html
<div class="polski-nutrients">
    <table class="polski-nutrients__table">
        <thead>
            <tr>
                <th>Nährstoff</th>
                <th>pro 100 g</th>
                <th>% RM*</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Energiewert</td>
                <td>1046 kJ / 250 kcal</td>
                <td>13%</td>
            </tr>
            <tr>
                <td>Fett</td>
                <td>9,5 g</td>
                <td>14%</td>
            </tr>
            <tr class="polski-nutrients__sub">
                <td>davon gesättigte Fettsäuren</td>
                <td>3,2 g</td>
                <td>16%</td>
            </tr>
            <!-- ... -->
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">
                    * Referenzmenge für einen durchschnittlichen Erwachsenen (8400 kJ / 2000 kcal)
                </td>
            </tr>
        </tfoot>
    </table>
</div>
```

## Referenzmenge (RM)

Das Plugin berechnet die % RM automatisch auf Basis dieser Referenzwerte:

| Nährstoff | Referenzwert |
|-----------|--------------|
| Energie | 8400 kJ / 2000 kcal |
| Fett | 70 g |
| Gesättigte Fettsäuren | 20 g |
| Kohlenhydrate | 260 g |
| Zucker | 90 g |
| Eiweiß | 50 g |
| Salz | 6 g |
| Ballaststoffe | 25 g |

## Programmatischer Zugriff

### Nährwerte abrufen

```php
$nutrients_json = get_post_meta($product_id, '_polski_nutrients', true);
$nutrients = json_decode($nutrients_json, true);

if ($nutrients) {
    $energy_kcal = $nutrients['energy_kcal'] ?? 0;
    $protein = $nutrients['protein'] ?? 0;
}
```

### Nährwerte speichern

```php
$nutrients = [
    'energy_kj'     => 1046,
    'energy_kcal'   => 250,
    'fat'           => 9.5,
    'saturated_fat' => 3.2,
    'carbohydrates' => 31.0,
    'sugars'        => 5.4,
    'protein'       => 8.7,
    'salt'          => 1.2,
    'ref_unit'      => '100g',
];

update_post_meta($product_id, '_polski_nutrients', wp_json_encode($nutrients));
```

### Filter für die Werte vor der Anzeige

```php
add_filter('polski/nutrients/values', function (array $nutrients, int $product_id): array {
    // Rundung der Werte gemäß den EU-Richtlinien
    if (isset($nutrients['energy_kcal'])) {
        $nutrients['energy_kcal'] = round($nutrients['energy_kcal']);
    }

    return $nutrients;
}, 10, 2);
```

## CSV-Import

Die Spalte `polski_nutrients` im CSV enthält die Werte als JSON:

```csv
"Früchtemüsli","{""energy_kj"":1590,""energy_kcal"":380,""fat"":8.2,""saturated_fat"":1.5,""carbohydrates"":64.0,""sugars"":22.0,""fibre"":7.5,""protein"":9.8,""salt"":0.05,""ref_unit"":""100g""}"
```

Anführungszeichen innerhalb des JSON müssen in der CSV-Datei verdoppelt werden (`""`).

## CSS-Styling

```css
.polski-nutrients__table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
}

.polski-nutrients__table th,
.polski-nutrients__table td {
    padding: 0.4em 0.8em;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
}

.polski-nutrients__sub td:first-child {
    padding-left: 1.5em;
    font-style: italic;
}

.polski-nutrients__table tfoot td {
    font-size: 0.8em;
    color: #666;
    padding-top: 0.8em;
}
```

## Häufige Probleme

### Die Nährwerttabelle wird nicht angezeigt

1. Prüfe, ob das Submodul Nährwerte aktiviert ist
2. Stelle sicher, dass das Produkt ein ausgefülltes Feld `_polski_nutrients` mit korrektem JSON hat
3. Überprüfe das JSON-Format - verwende einen Validator (z. B. jsonlint.com)

### Die Werte werden mit Punkt statt Komma angezeigt

Das Plugin formatiert die Zahlen automatisch mit dem polnischen Komma. Wenn du einen Punkt siehst, prüfe, ob das WordPress-Locale auf `pl_PL` eingestellt ist.

### % RM wird nicht angezeigt

Prüfe, ob die Option "% RM anzeigen" in den Einstellungen aktiviert ist und ob der Parameter `show_rws` im Shortcode nicht auf `false` gesetzt ist.

## Verwandte Ressourcen

- [Lebensmittelmodul](food/food-overview/)
- [Allergene](food/allergens/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
