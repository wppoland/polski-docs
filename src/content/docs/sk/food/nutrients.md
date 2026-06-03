---
title: Výživové hodnoty
description: Tabuľka výživových hodnôt vo formáte JSON per 100 g alebo 100 ml so shortcódom na zobrazenie na stránke produktu WooCommerce.
---

Potravinový obchod musí zobrazovať tabuľku výživových hodnôt (nariadenie EÚ č. 1169/2011). Plugin Polski for WooCommerce umožňuje pridať tabuľku ku každému produktu vo formáte v súlade s predpismi.

## Povinné výživové zložky

Tabuľka výživových hodnôt musí obsahovať aspoň:

| Zložka | Jednotka | JSON kľúč |
|----------|-----------|------------|
| Energetická hodnota | kJ / kcal | `energy_kj`, `energy_kcal` |
| Tuk | g | `fat` |
| z toho nasýtené mastné kyseliny | g | `saturated_fat` |
| Sacharidy | g | `carbohydrates` |
| z toho cukry | g | `sugars` |
| Bielkoviny | g | `protein` |
| Soľ | g | `salt` |

## Voliteľné výživové zložky

Dodatočne môžeš uviesť:

| Zložka | Jednotka | JSON kľúč |
|----------|-----------|------------|
| Mononenasýtené mastné kyseliny | g | `monounsaturated_fat` |
| Polynenasýtené mastné kyseliny | g | `polyunsaturated_fat` |
| Viacatómové alkoholy (polyoly) | g | `polyols` |
| Škrob | g | `starch` |
| Vláknina | g | `fibre` |
| Vitamín A | µg | `vitamin_a` |
| Vitamín D | µg | `vitamin_d` |
| Vitamín E | mg | `vitamin_e` |
| Vitamín K | µg | `vitamin_k` |
| Vitamín C | mg | `vitamin_c` |
| Tiamín (B1) | mg | `thiamine` |
| Riboflavín (B2) | mg | `riboflavin` |
| Niacín (B3) | mg | `niacin` |
| Vitamín B6 | mg | `vitamin_b6` |
| Kyselina listová | µg | `folic_acid` |
| Vitamín B12 | µg | `vitamin_b12` |
| Biotín | µg | `biotin` |
| Kyselina pantoténová | mg | `pantothenic_acid` |
| Draslík | mg | `potassium` |
| Chlór | mg | `chloride` |
| Vápnik | mg | `calcium` |
| Fosfor | mg | `phosphorus` |
| Horčík | mg | `magnesium` |
| Železo | mg | `iron` |
| Zinok | mg | `zinc` |
| Meď | mg | `copper` |
| Mangán | mg | `manganese` |
| Fluorid | mg | `fluoride` |
| Selén | µg | `selenium` |
| Chróm | µg | `chromium` |
| Molybdén | µg | `molybdenum` |
| Jód | µg | `iodine` |

## Konfigurácia

### Zapnutie modulu

Prejdi na **WooCommerce > Nastavenia > Polski > Potraviny** a aktivuj podmodul "Výživové hodnoty".

### Nastavenia

| Nastavenie | Predvolené | Popis |
|------------|----------|------|
| Referenčná jednotka | na 100 g | Predvolená jednotka: na 100 g alebo na 100 ml |
| Zobrazuj % RHP | Áno | Referenčná hodnota príjmu (% denného odporúčaného príjmu) |
| Pozícia tabuľky | Záložka | Kde zobrazovať tabuľku na stránke produktu |
| Voliteľné zložky | Vláknina, vitamíny | Ktoré voliteľné zložky zobrazovať |

## Zadávanie údajov v editore produktu

V záložke "Potraviny" editora produktu vyplň formulár výživových hodnôt. Zadávaj číselné hodnoty na 100 g alebo 100 ml.

### Referenčná jednotka per produkt

Každý produkt môže mať vlastnú jednotku. Nápoje nastav na "na 100 ml", pevné produkty na "na 100 g". Bez nastavenia plugin použije predvolenú hodnotu.

### Porcia

Voliteľne uveď veľkosť porcie a hodnoty na porciu:

| Pole | Popis |
|------|------|
| Veľkosť porcie | napr. "30 g", "250 ml", "1 plátok (25 g)" |
| Počet porcií v balení | napr. "10" |

## Formát JSON

Výživové hodnoty sú uložené v databáze ako JSON v meta poli `_polski_nutrients`. Formát:

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

### Pravidlá validácie

- Hodnoty musia byť čísla (int alebo float)
- Desatinný oddeľovač v JSON: bodka (napr. `9.5`)
- Hodnoty nesmú byť záporné
- `energy_kj` a `energy_kcal` by mali byť konzistentné (1 kcal = 4.184 kJ)
- Podzložky nesmú prekročiť nadradenú zložku (napr. `saturated_fat` <= `fat`)

## Shortcód

Použi shortcód `[polski_nutrients]` na zobrazenie tabuľky výživových hodnôt.

### Parametre

| Parameter | Typ | Predvolený | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuálny | ID produktu |
| `show_rws` | bool | `true` | Či zobrazovať % RHP |
| `show_serving` | bool | `false` | Či zobrazovať stĺpec na porciu |
| `fields` | string | `all` | Zložky na zobrazenie (oddelené čiarkami) |
| `layout` | string | `table` | Rozloženie: `table`, `list`, `compact` |
| `wrapper` | string | `div` | Obaľujúci HTML element |

### Príklady použitia

Plná tabuľka výživových hodnôt:

```html
[polski_nutrients]
```

S hodnotami na porciu:

```html
[polski_nutrients show_serving="true"]
```

Len základné zložky:

```html
[polski_nutrients fields="energy_kcal,fat,carbohydrates,protein,salt"]
```

Kompaktné rozloženie (bez tabuľky):

```html
[polski_nutrients layout="compact"]
```

Pre konkrétny produkt:

```html
[polski_nutrients product_id="123" show_rws="true" show_serving="true"]
```

V PHP šablóne:

```php
echo do_shortcode('[polski_nutrients product_id="' . $product->get_id() . '"]');
```

## Vygenerovaná HTML tabuľka

Shortcód generuje tabuľku v súlade so štandardom EÚ:

```html
<div class="polski-nutrients">
    <table class="polski-nutrients__table">
        <thead>
            <tr>
                <th>Výživová hodnota</th>
                <th>na 100 g</th>
                <th>% RHP*</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Energetická hodnota</td>
                <td>1046 kJ / 250 kcal</td>
                <td>13%</td>
            </tr>
            <tr>
                <td>Tuk</td>
                <td>9,5 g</td>
                <td>14%</td>
            </tr>
            <tr class="polski-nutrients__sub">
                <td>z toho nasýtené mastné kyseliny</td>
                <td>3,2 g</td>
                <td>16%</td>
            </tr>
            <!-- ... -->
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">
                    * Referenčná hodnota príjmu pre priemernú dospelú osobu (8400 kJ / 2000 kcal)
                </td>
            </tr>
        </tfoot>
    </table>
</div>
```

## Referenčná hodnota príjmu (RHP)

Plugin počíta % RHP automaticky na základe týchto referenčných hodnôt:

| Zložka | Referenčná hodnota |
|----------|---------------------|
| Energia | 8400 kJ / 2000 kcal |
| Tuk | 70 g |
| Nasýtené mastné kyseliny | 20 g |
| Sacharidy | 260 g |
| Cukry | 90 g |
| Bielkoviny | 50 g |
| Soľ | 6 g |
| Vláknina | 25 g |

## Programátorský prístup

### Načítanie výživových hodnôt

```php
$nutrients_json = get_post_meta($product_id, '_polski_nutrients', true);
$nutrients = json_decode($nutrients_json, true);

if ($nutrients) {
    $energy_kcal = $nutrients['energy_kcal'] ?? 0;
    $protein = $nutrients['protein'] ?? 0;
}
```

### Uloženie výživových hodnôt

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

### Filter hodnôt pred zobrazením

```php
add_filter('polski/nutrients/values', function (array $nutrients, int $product_id): array {
    // Zaokrúhľovanie hodnôt v súlade s usmerneniami EÚ
    if (isset($nutrients['energy_kcal'])) {
        $nutrients['energy_kcal'] = round($nutrients['energy_kcal']);
    }

    return $nutrients;
}, 10, 2);
```

## CSV import

Stĺpec `polski_nutrients` v CSV obsahuje hodnoty ako JSON:

```csv
"Ovocné musli","{""energy_kj"":1590,""energy_kcal"":380,""fat"":8.2,""saturated_fat"":1.5,""carbohydrates"":64.0,""sugars"":22.0,""fibre"":7.5,""protein"":9.8,""salt"":0.05,""ref_unit"":""100g""}"
```

Úvodzovky vnútri JSON musia byť zdvojené (`""`) v CSV súbore.

## CSS štýlovanie

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

## Najčastejšie problémy

### Tabuľka výživových hodnôt sa nezobrazuje

1. Skontroluj, či je podmodul výživových hodnôt zapnutý
2. Uisti sa, že produkt má vyplnené pole `_polski_nutrients` so správnym JSON
3. Over formát JSON - použi validátor (napr. jsonlint.com)

### Hodnoty sa zobrazujú s bodkou namiesto čiarky

Plugin automaticky formátuje čísla so slovenskou čiarkou. Ak vidíš bodku, skontroluj, či je locale WordPress nastavené na `sk_SK`.

### % RHP sa nezobrazuje

Skontroluj, či je možnosť "Zobrazuj % RHP" zapnutá v nastaveniach a či parameter `show_rws` v shortcóde nie je nastavený na `false`.

## Súvisiace zdroje

- [Modul potravinárskych produktov](food/food-overview/)
- [Alergény](food/allergens/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
