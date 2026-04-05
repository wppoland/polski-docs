---
title: Naehrwerte
description: Naehrwerttabelle im JSON-Format pro 100 g oder 100 ml mit Shortcode zur Anzeige auf der WooCommerce-Produktseite.
---

Die Verordnung (EU) Nr. 1169/2011 verlangt, dass auf der Verpackung (und im Onlineshop) eines Lebensmittels eine Naehrwerttabelle vorhanden ist. Das Plugin Polski for WooCommerce ermoeglicht die Eingabe einer vollstaendigen Naehrwerttabelle fuer jedes Produkt und deren Anzeige in einem uebersichtlichen, verordnungskonformen Format.

## Obligatorische Naehrstoffe

Gemaess Art. 30 der LMIV muss die Naehrwerttabelle mindestens enthalten:

| Naehrstoff | Einheit | JSON-Schluessel |
|----------|-----------|------------|
| Energiewert | kJ / kcal | `energy_kj`, `energy_kcal` |
| Fett | g | `fat` |
| davon gesaettigte Fettsaeuren | g | `saturated_fat` |
| Kohlenhydrate | g | `carbohydrates` |
| davon Zucker | g | `sugars` |
| Protein | g | `protein` |
| Salz | g | `salt` |

## Optionale Naehrstoffe

Zusaetzlich koennen angegeben werden (Art. 30 Abs. 2 LMIV):

| Naehrstoff | Einheit | JSON-Schluessel |
|----------|-----------|------------|
| Einfach ungesaettigte Fettsaeuren | g | `monounsaturated_fat` |
| Mehrfach ungesaettigte Fettsaeuren | g | `polyunsaturated_fat` |
| Mehrwertige Alkohole (Polyole) | g | `polyols` |
| Staerke | g | `starch` |
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
| Folsaeure | µg | `folic_acid` |
| Vitamin B12 | µg | `vitamin_b12` |
| Biotin | µg | `biotin` |
| Pantothensaeure | mg | `pantothenic_acid` |
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
| Molybdaen | µg | `molybdenum` |
| Jod | µg | `iodine` |

## Konfiguration

### Modul aktivieren

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Lebensmittel** und aktivieren Sie das Untermodul "Naehrwerte".

### Einstellungen

| Einstellung | Standard | Beschreibung |
|------------|----------|------|
| Referenzeinheit | pro 100 g | Standardeinheit: pro 100 g oder pro 100 ml |
| % NRV anzeigen | Ja | Naehrstoffbezugswert (% Tagesbedarf) |
| Tabellenposition | Tab | Wo die Tabelle auf der Produktseite angezeigt wird |
| Optionale Naehrstoffe | Ballaststoffe, Vitamine | Welche optionalen Naehrstoffe angezeigt werden |

## Dateneingabe im Produkteditor

Im Tab "Lebensmittel" im Produkteditor finden Sie das Naehrwertformular. Fuellen Sie die Felder mit Zahlenwerten pro 100 g oder 100 ml aus.

### Referenzeinheit pro Produkt

Jedes Produkt kann eine individuelle Referenzeinheit haben. Getraenke sollten "pro 100 ml" eingestellt haben, feste Produkte "pro 100 g". Wenn nicht gesetzt, wird der Standardwert aus den Einstellungen verwendet.

### Portion

Optional koennen Sie auch die Portionsgroesse und Naehrwerte pro Portion angeben:

| Feld | Beschreibung |
|------|------|
| Portionsgroesse | z.B. "30 g", "250 ml", "1 Scheibe (25 g)" |
| Portionen pro Verpackung | z.B. "10" |

## JSON-Format

Naehrwerte werden in der Datenbank als JSON im Meta-Feld `_polski_nutrients` gespeichert. Format:

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

- Werte muessen Zahlen sein (int oder float)
- Dezimaltrennzeichen in JSON: Punkt (z.B. `9.5`)
- Werte duerfen nicht negativ sein
- `energy_kj` und `energy_kcal` sollten konsistent sein (1 kcal = 4,184 kJ)
- Unter-Naehrstoffe duerfen den uebergeordneten nicht uebersteigen (z.B. `saturated_fat` <= `fat`)

## Shortcode

Verwenden Sie den Shortcode `[polski_nutrients]`, um die Naehrwerttabelle anzuzeigen.

### Parameter

| Parameter | Typ | Standard | Beschreibung |
|----------|-----|----------|------|
| `product_id` | int | aktuell | Produkt-ID |
| `show_rws` | bool | `true` | Ob % NRV angezeigt wird |
| `show_serving` | bool | `false` | Ob die Spalte pro Portion angezeigt wird |
| `fields` | string | `all` | Anzuzeigende Naehrstoffe (durch Komma getrennt) |
| `layout` | string | `table` | Layout: `table`, `list`, `compact` |
| `wrapper` | string | `div` | Umschliessendes HTML-Element |

### Verwendungsbeispiele

Vollstaendige Naehrwerttabelle:

```html
[polski_nutrients]
```

Mit Werten pro Portion:

```html
[polski_nutrients show_serving="true"]
```

Nur grundlegende Naehrstoffe:

```html
[polski_nutrients fields="energy_kcal,fat,carbohydrates,protein,salt"]
```

Im PHP-Template:

```php
echo do_shortcode('[polski_nutrients product_id="' . $product->get_id() . '"]');
```

## Naehrstoffbezugswerte (NRV)

Das Plugin berechnet den % NRV automatisch basierend auf den Referenzwerten aus Anhang XIII der LMIV:

| Naehrstoff | Referenzwert |
|----------|---------------------|
| Energie | 8400 kJ / 2000 kcal |
| Fett | 70 g |
| Gesaettigte Fettsaeuren | 20 g |
| Kohlenhydrate | 260 g |
| Zucker | 90 g |
| Protein | 50 g |
| Salz | 6 g |
| Ballaststoffe | 25 g |

## Programmatischer Zugriff

### Naehrwerte abrufen

```php
$nutrients_json = get_post_meta($product_id, '_polski_nutrients', true);
$nutrients = json_decode($nutrients_json, true);

if ($nutrients) {
    $energy_kcal = $nutrients['energy_kcal'] ?? 0;
    $protein = $nutrients['protein'] ?? 0;
}
```

### Naehrwerte speichern

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

## CSV-Import

Die Spalte `polski_nutrients` in der CSV-Datei sollte Werte im JSON-Format enthalten:

```csv
"Fruechtemuesli","{""energy_kj"":1590,""energy_kcal"":380,""fat"":8.2,""saturated_fat"":1.5,""carbohydrates"":64.0,""sugars"":22.0,""fibre"":7.5,""protein"":9.8,""salt"":0.05,""ref_unit"":""100g""}"
```

Anfuehrungszeichen innerhalb von JSON muessen in der CSV-Datei verdoppelt werden (`""`).

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

## Haeufige Probleme

### Naehrwerttabelle wird nicht angezeigt

1. Pruefen Sie, ob das Naehrwertmodul aktiviert ist
2. Stellen Sie sicher, dass das Produkt ein ausgefuelltes Feld `_polski_nutrients` mit gueltigem JSON hat
3. Ueberpruefen Sie das JSON-Format - verwenden Sie einen Validator (z.B. jsonlint.com)

### Werte werden mit Punkt statt Komma angezeigt

Das Plugin formatiert Zahlen automatisch gemaess polnischen Einstellungen (Dezimalkomma). Wenn Sie einen Punkt sehen, pruefen Sie, ob die WordPress-Locale auf `pl_PL` eingestellt ist.

### % NRV wird nicht angezeigt

Pruefen Sie, ob die Option "% NRV anzeigen" in den Einstellungen aktiviert ist und der Parameter `show_rws` im Shortcode nicht auf `false` gesetzt ist.

## Verwandte Ressourcen

- [Lebensmittelmodul](/de/food/food-overview/)
- [Allergene](/de/food/allergens/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
