---
title: Vyzivove hodnoty
description: Tabulka vyzivovych hodnot ve formatu JSON na 100 g nebo 100 ml se shortcodem pro zobrazeni na strance produktu WooCommerce.
---

Narizeni (EU) c. 1169/2011 vyzaduje, aby na obalu (a v internetovem obchode) potravinoveho produktu byla tabulka vyzivovych hodnot. Plugin Polski for WooCommerce umoznuje zadani uplne tabulky vyzivovych hodnot pro kazdy produkt a jeji zobrazeni v prehlednem formatu v souladu s regulacemi.

## Povinne zivy

Podle cl. 30 narizeni FIC musi tabulka vyzivovych hodnot obsahovat alespon:

| Slozka | Jednotka | Klic JSON |
|----------|-----------|------------|
| Energeticka hodnota | kJ / kcal | `energy_kj`, `energy_kcal` |
| Tuky | g | `fat` |
| z toho nasycene mastne kyseliny | g | `saturated_fat` |
| Sacharidy | g | `carbohydrates` |
| z toho cukry | g | `sugars` |
| Bilkoviny | g | `protein` |
| Sul | g | `salt` |

## Volitelne zivy

Doplnkove lze uvest (cl. 30 odst. 2 FIC):

| Slozka | Jednotka | Klic JSON |
|----------|-----------|------------|
| Mononenasycene mastne kyseliny | g | `monounsaturated_fat` |
| Polynenasycene mastne kyseliny | g | `polyunsaturated_fat` |
| Polyoly | g | `polyols` |
| Skrob | g | `starch` |
| Vlaknina | g | `fibre` |
| Vitamin A | ug | `vitamin_a` |
| Vitamin D | ug | `vitamin_d` |
| Vitamin E | mg | `vitamin_e` |
| Vitamin K | ug | `vitamin_k` |
| Vitamin C | mg | `vitamin_c` |
| Thiamin (B1) | mg | `thiamine` |
| Riboflavin (B2) | mg | `riboflavin` |
| Niacin (B3) | mg | `niacin` |
| Vitamin B6 | mg | `vitamin_b6` |
| Kyselina listova | ug | `folic_acid` |
| Vitamin B12 | ug | `vitamin_b12` |
| Biotin | ug | `biotin` |
| Kyselina pantothenova | mg | `pantothenic_acid` |
| Draslk | mg | `potassium` |
| Chlor | mg | `chloride` |
| Vapnik | mg | `calcium` |
| Fosfor | mg | `phosphorus` |
| Horczk | mg | `magnesium` |
| Zelezo | mg | `iron` |
| Zinek | mg | `zinc` |
| Med | mg | `copper` |
| Mangan | mg | `manganese` |
| Fluorid | mg | `fluoride` |
| Selen | ug | `selenium` |
| Chrom | ug | `chromium` |
| Molybden | ug | `molybdenum` |
| Jod | ug | `iodine` |

## Konfigurace

### Aktivace modulu

Prejdete do **WooCommerce > Nastaveni > Polski > Potraviny** a aktivujte podmodul "Vyzivove hodnoty".

### Nastaveni

| Nastaveni | Vychozi | Popis |
|------------|----------|------|
| Referencni jednotka | na 100 g | Vychozi jednotka: na 100 g nebo na 100 ml |
| Zobrazit % RHP | Ano | Referencni hodnota prijmu (% denniho doporuceneho prijmu) |
| Pozice tabulky | Zalozka | Kde zobrazit tabulku na strance produktu |
| Volitelne slozky | Vlaknina, vitaminy | Ktere volitelne slozky zobrazovat |

## Zadavani dat v editoru produktu

V zalozce "Potraviny" v editoru produktu je formular vyzivovych hodnot. Vyplnte pole ciselnymi hodnotami na 100 g nebo 100 ml.

### Referencni jednotka na produkt

Kazdy produkt muze mit individualni referencni jednotku. Napoje by mely mit nastaveno "na 100 ml", tuhe produkty - "na 100 g". Pokud nenastavite, bude pouzita vychozi hodnota z nastaveni.

### Porce

Volitelne muzete uvest take velikost porce a vyzivove hodnoty na porci:

| Pole | Popis |
|------|------|
| Velikost porce | napr. "30 g", "250 ml", "1 platek (25 g)" |
| Pocet porci v baleni | napr. "10" |

## Format JSON

Vyzivove hodnoty jsou uchovavany v databazi jako JSON v meta poli `_polski_nutrients`. Format:

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

- Hodnoty musi byt cisla (int nebo float)
- Oddelovac desetinnych mist v JSON: tecka (napr. `9.5`)
- Hodnoty nesmi byt zaporne
- `energy_kj` a `energy_kcal` by mely byt konzistentni (1 kcal = 4.184 kJ)
- Podslozky nesmi prekrocit nadrazenou slozku (napr. `saturated_fat` <= `fat`)

## Shortcode

Pouzijte shortcode `[polski_nutrients]` pro zobrazeni tabulky vyzivovych hodnot.

### Parametry

| Parametr | Typ | Vychozi | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktualni | ID produktu |
| `show_rws` | bool | `true` | Zda zobrazit % RHP |
| `show_serving` | bool | `false` | Zda zobrazit sloupec na porci |
| `fields` | string | `all` | Slozky k zobrazeni (oddelene carkami) |
| `layout` | string | `table` | Rozlozeni: `table`, `list`, `compact` |
| `wrapper` | string | `div` | Obalujici HTML element |

### Priklady pouziti

Uplna tabulka vyzivovych hodnot:

```html
[polski_nutrients]
```

S hodnotami na porci:

```html
[polski_nutrients show_serving="true"]
```

Pouze zakladni slozky:

```html
[polski_nutrients fields="energy_kcal,fat,carbohydrates,protein,salt"]
```

Kompaktni rozlozeni (bez tabulky):

```html
[polski_nutrients layout="compact"]
```

Pro konkretni produkt:

```html
[polski_nutrients product_id="123" show_rws="true" show_serving="true"]
```

V sablone PHP:

```php
echo do_shortcode('[polski_nutrients product_id="' . $product->get_id() . '"]');
```

## Vygenerovana tabulka HTML

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

## Referencni hodnota prijmu (RHP)

Plugin pocita % RHP automaticky na zaklade referencnich hodnot z prilohy XIII narizeni FIC:

| Slozka | Referencni hodnota |
|----------|---------------------|
| Energie | 8400 kJ / 2000 kcal |
| Tuky | 70 g |
| Nasycene mastne kyseliny | 20 g |
| Sacharidy | 260 g |
| Cukry | 90 g |
| Bilkoviny | 50 g |
| Sul | 6 g |
| Vlaknina | 25 g |

## Programaticky pristup

### Ziskani vyzivovych hodnot

```php
$nutrients_json = get_post_meta($product_id, '_polski_nutrients', true);
$nutrients = json_decode($nutrients_json, true);

if ($nutrients) {
    $energy_kcal = $nutrients['energy_kcal'] ?? 0;
    $protein = $nutrients['protein'] ?? 0;
}
```

### Ukladani vyzivovych hodnot

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

## CSV import

Sloupec `polski_nutrients` v CSV by mel obsahovat hodnoty ve formatu JSON:

```csv
"Musli owocowe","{""energy_kj"":1590,""energy_kcal"":380,""fat"":8.2,""saturated_fat"":1.5,""carbohydrates"":64.0,""sugars"":22.0,""fibre"":7.5,""protein"":9.8,""salt"":0.05,""ref_unit"":""100g""}"
```

Uvozovky uvnitr JSON musi byt zdvojene (`""`) v souboru CSV.

## Stylovani CSS

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

## Nejcastejsi problemy

### Tabulka vyzivovych hodnot se nezobrazuje

1. Zkontrolujte, zda je podmodul vyzivovych hodnot aktivovan
2. Ujistete se, ze produkt ma vyplnene pole `_polski_nutrients` se spravnym JSON
3. Overite format JSON - pouzijte validator (napr. jsonlint.com)

### Hodnoty se zobrazuji s teckou misto carky

Plugin automaticky formatuje cisla v souladu s polskymi regionalnmi nastavenimi (desetinna carka). Pokud vidite tecku, zkontrolujte, zda locale WordPress je nastaven na `pl_PL`.

### % RHP se nezobrazuje

Zkontrolujte, zda moznost "Zobrazit % RHP" je aktivovana v nastaveních a zda parametr `show_rws` v shortcode neni nastaven na `false`.

## Souvisejici zdroje

- [Modul potravinovych produktu](/cs/food/food-overview/)
- [Alergeny](/cs/food/allergens/)
- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
