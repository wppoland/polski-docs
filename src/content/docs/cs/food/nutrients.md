---
title: Výživové hodnoty
description: Tabulka výživových hodnot ve formátu JSON na 100 g nebo 100 ml se shortcodem pro zobrazení na stránce produktu WooCommerce.
---

Obchod s potravinami musí zobrazovat tabulku výživových hodnot (nařízení EU č. 1169/2011). Plugin Polski for WooCommerce umožňuje přidat tabulku ke každému produktu ve formátu v souladu s předpisy.

## Povinné živiny

Tabulka výživových hodnot musí obsahovat alespoň:

| Složka | Jednotka | Klíč JSON |
|----------|-----------|------------|
| Energetická hodnota | kJ / kcal | `energy_kj`, `energy_kcal` |
| Tuky | g | `fat` |
| z toho nasycené mastné kyseliny | g | `saturated_fat` |
| Sacharidy | g | `carbohydrates` |
| z toho cukry | g | `sugars` |
| Bílkoviny | g | `protein` |
| Sůl | g | `salt` |

## Volitelné živiny

Dodatečně můžete uvést:

| Složka | Jednotka | Klíč JSON |
|----------|-----------|------------|
| Mononenasycené mastné kyseliny | g | `monounsaturated_fat` |
| Polynenasycené mastné kyseliny | g | `polyunsaturated_fat` |
| Polyalkoholy (polyoly) | g | `polyols` |
| Škrob | g | `starch` |
| Vláknina | g | `fibre` |
| Vitamin A | µg | `vitamin_a` |
| Vitamin D | µg | `vitamin_d` |
| Vitamin E | mg | `vitamin_e` |
| Vitamin K | µg | `vitamin_k` |
| Vitamin C | mg | `vitamin_c` |
| Thiamin (B1) | mg | `thiamine` |
| Riboflavin (B2) | mg | `riboflavin` |
| Niacin (B3) | mg | `niacin` |
| Vitamin B6 | mg | `vitamin_b6` |
| Kyselina listová | µg | `folic_acid` |
| Vitamin B12 | µg | `vitamin_b12` |
| Biotin | µg | `biotin` |
| Kyselina pantothenová | mg | `pantothenic_acid` |
| Draslík | mg | `potassium` |
| Chlor | mg | `chloride` |
| Vápník | mg | `calcium` |
| Fosfor | mg | `phosphorus` |
| Hořčík | mg | `magnesium` |
| Železo | mg | `iron` |
| Zinek | mg | `zinc` |
| Měď | mg | `copper` |
| Mangan | mg | `manganese` |
| Fluorid | mg | `fluoride` |
| Selen | µg | `selenium` |
| Chrom | µg | `chromium` |
| Molybden | µg | `molybdenum` |
| Jod | µg | `iodine` |

## Konfigurace

### Zapnutí modulu

Přejděte do **WooCommerce > Nastavení > Polski > Potraviny** a aktivujte podmodul "Výživové hodnoty".

### Nastavení

| Nastavení | Výchozí | Popis |
|------------|----------|------|
| Referenční jednotka | na 100 g | Výchozí jednotka: na 100 g nebo na 100 ml |
| Zobrazit % RHP | Ano | Referenční hodnota příjmu (% denní potřeby) |
| Pozice tabulky | Záložka | Kde zobrazovat tabulku na stránce produktu |
| Volitelné složky | Vláknina, vitaminy | Které volitelné složky zobrazovat |

## Zadávání dat v editoru produktu

V záložce "Potraviny" editoru produktu vyplňte formulář výživových hodnot. Zadávejte číselné hodnoty na 100 g nebo 100 ml.

### Referenční jednotka na produkt

Každý produkt může mít vlastní jednotku. Nápoje nastavte na "na 100 ml", tuhé produkty na "na 100 g". Bez nastavení plugin použije výchozí hodnotu.

### Porce

Volitelně uveďte velikost porce a hodnoty na porci:

| Pole | Popis |
|------|------|
| Velikost porce | např. "30 g", "250 ml", "1 plátek (25 g)" |
| Počet porcí v balení | např. "10" |

## Formát JSON

Výživové hodnoty jsou uloženy v databázi jako JSON v meta poli `_polski_nutrients`. Formát:

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

### Pravidla validace

- Hodnoty musí být čísla (int nebo float)
- Oddělovač desetinných míst v JSON: tečka (např. `9.5`)
- Hodnoty nesmí být záporné
- `energy_kj` a `energy_kcal` by měly být konzistentní (1 kcal = 4.184 kJ)
- Podsložky nesmí překročit nadřazenou složku (např. `saturated_fat` <= `fat`)

## Shortcode

Použijte shortcode `[polski_nutrients]` pro zobrazení tabulky výživových hodnot.

### Parametry

| Parametr | Typ | Výchozí | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuální | ID produktu |
| `show_rws` | bool | `true` | Zda zobrazit % RHP |
| `show_serving` | bool | `false` | Zda zobrazit sloupec na porci |
| `fields` | string | `all` | Složky k zobrazení (oddělené čárkami) |
| `layout` | string | `table` | Rozložení: `table`, `list`, `compact` |
| `wrapper` | string | `div` | Obalující HTML element |

### Příklady použití

Úplná tabulka výživových hodnot:

```html
[polski_nutrients]
```

S hodnotami na porci:

```html
[polski_nutrients show_serving="true"]
```

Pouze základní složky:

```html
[polski_nutrients fields="energy_kcal,fat,carbohydrates,protein,salt"]
```

Kompaktní rozložení (bez tabulky):

```html
[polski_nutrients layout="compact"]
```

Pro konkrétní produkt:

```html
[polski_nutrients product_id="123" show_rws="true" show_serving="true"]
```

V šabloně PHP:

```php
echo do_shortcode('[polski_nutrients product_id="' . $product->get_id() . '"]');
```

## Vygenerovaná tabulka HTML

Shortcode generuje tabulku v souladu se standardem EU:

```html
<div class="polski-nutrients">
    <table class="polski-nutrients__table">
        <thead>
            <tr>
                <th>Wartość odżywcza</th>
                <th>per 100 g</th>
                <th>% RWS*</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Wartość energetyczna</td>
                <td>1046 kJ / 250 kcal</td>
                <td>13%</td>
            </tr>
            <tr>
                <td>Tłuszcz</td>
                <td>9,5 g</td>
                <td>14%</td>
            </tr>
            <tr class="polski-nutrients__sub">
                <td>w tym kwasy tłuszczowe nasycone</td>
                <td>3,2 g</td>
                <td>16%</td>
            </tr>
            <!-- ... -->
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">
                    * Referencyjna wartość spożycia dla przeciętnej osoby dorosłej (8400 kJ / 2000 kcal)
                </td>
            </tr>
        </tfoot>
    </table>
</div>
```

## Referenční hodnota příjmu (RHP)

Plugin počítá % RHP automaticky na základě těchto referenčních hodnot:

| Složka | Referenční hodnota |
|----------|---------------------|
| Energie | 8400 kJ / 2000 kcal |
| Tuky | 70 g |
| Nasycené mastné kyseliny | 20 g |
| Sacharidy | 260 g |
| Cukry | 90 g |
| Bílkoviny | 50 g |
| Sůl | 6 g |
| Vláknina | 25 g |

## Programatický přístup

### Získání výživových hodnot

```php
$nutrients_json = get_post_meta($product_id, '_polski_nutrients', true);
$nutrients = json_decode($nutrients_json, true);

if ($nutrients) {
    $energy_kcal = $nutrients['energy_kcal'] ?? 0;
    $protein = $nutrients['protein'] ?? 0;
}
```

### Ukládání výživových hodnot

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

### Filtr hodnot před zobrazením

```php
add_filter('polski/nutrients/values', function (array $nutrients, int $product_id): array {
    // Zaokrouhlení hodnot v souladu s pokyny EU
    if (isset($nutrients['energy_kcal'])) {
        $nutrients['energy_kcal'] = round($nutrients['energy_kcal']);
    }

    return $nutrients;
}, 10, 2);
```

## Import CSV

Sloupec `polski_nutrients` v CSV obsahuje hodnoty jako JSON:

```csv
"Musli owocowe","{""energy_kj"":1590,""energy_kcal"":380,""fat"":8.2,""saturated_fat"":1.5,""carbohydrates"":64.0,""sugars"":22.0,""fibre"":7.5,""protein"":9.8,""salt"":0.05,""ref_unit"":""100g""}"
```

Uvozovky uvnitř JSON musí být zdvojené (`""`) v souboru CSV.

## Stylování CSS

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

## Nejčastější problémy

### Tabulka výživových hodnot se nezobrazuje

1. Zkontrolujte, zda je podmodul výživových hodnot zapnutý
2. Ujistěte se, že produkt má vyplněné pole `_polski_nutrients` se správným JSON
3. Ověřte formát JSON - použijte validátor (např. jsonlint.com)

### Hodnoty se zobrazují s tečkou místo čárky

Plugin automaticky formátuje čísla s polskou čárkou. Pokud vidíte tečku, zkontrolujte, zda je locale WordPress nastaveno na `pl_PL`.

### % RHP se nezobrazuje

Zkontrolujte, zda je možnost "Zobrazit % RHP" zapnutá v nastavení a zda parametr `show_rws` v shortcode není nastaven na `false`.

## Související zdroje

- [Modul potravinových produktů](food/food-overview/)
- [Alergeny](food/allergens/)
- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
