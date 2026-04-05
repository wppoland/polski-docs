---
title: Výživové hodnoty
description: Tabuľka výživových hodnôt vo formáte JSON per 100 g alebo 100 ml so shortcódom na zobrazenie na stránke produktu WooCommerce.
---

Nariadenie (EÚ) č. 1169/2011 vyžaduje, aby na obale (a v internetovom obchode) potravinárskeho produktu bola tabuľka výživových hodnôt. Plugin Polski for WooCommerce umožňuje zadanie úplnej tabuľky výživových hodnôt pre každý produkt a jej zobrazenie v prehľadnom formáte v súlade s reguláciami.

## Povinné výživové zložky

V súlade s čl. 30 nariadenia FIC musí tabuľka výživových hodnôt obsahovať minimálne:

| Zložka | Jednotka | Kľúč JSON |
|----------|-----------|------------|
| Energetická hodnota | kJ / kcal | `energy_kj`, `energy_kcal` |
| Tuky | g | `fat` |
| z toho nasýtené mastné kyseliny | g | `saturated_fat` |
| Sacharidy | g | `carbohydrates` |
| z toho cukry | g | `sugars` |
| Bielkoviny | g | `protein` |
| Soľ | g | `salt` |

## Voliteľné výživové zložky

Dodatočne je možné uviesť (čl. 30 ods. 2 FIC):

| Zložka | Jednotka | Kľúč JSON |
|----------|-----------|------------|
| Mononenasýtené mastné kyseliny | g | `monounsaturated_fat` |
| Polynenasýtené mastné kyseliny | g | `polyunsaturated_fat` |
| Polyoly | g | `polyols` |
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

Prejdite do **WooCommerce > Nastavenia > Polski > Potraviny** a aktivujte podmodul "Výživové hodnoty".

### Nastavenia

| Nastavenie | Predvolené | Popis |
|------------|----------|------|
| Referenčná jednotka | per 100 g | Predvolená jednotka: per 100 g alebo per 100 ml |
| Zobrazovať % RHP | Áno | Referenčný príjem (% dennej potreby) |
| Pozícia tabuľky | Záložka | Kde zobrazovať tabuľku na stránke produktu |
| Voliteľné zložky | Vláknina, vitamíny | Ktoré voliteľné zložky zobrazovať |

## Zadávanie údajov v editore produktu

V záložke "Potraviny" v editore produktu sa nachádza formulár výživových hodnôt. Vyplňte polia číselnými hodnotami per 100 g alebo 100 ml.

### Referenčná jednotka per produkt

Každý produkt môže mať individuálnu referenčnú jednotku. Nápoje by mali mať nastavené "per 100 ml", pevné produkty - "per 100 g". Ak nenastavíte, použije sa predvolená hodnota z nastavení.

### Porcia

Voliteľne môžete uviesť aj veľkosť porcie a výživové hodnoty per porciu:

| Pole | Popis |
|------|------|
| Veľkosť porcie | napr. "30 g", "250 ml", "1 plátok (25 g)" |
| Počet porcií v balení | napr. "10" |

## Formát JSON

Výživové hodnoty sú ukladané v databáze ako JSON v meta poli `_polski_nutrients`. Formát:

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
- Podzložky nesmú prekračovať nadriadenú zložku (napr. `saturated_fat` <= `fat`)

## Shortcód

Použite shortcód `[polski_nutrients]` na zobrazenie tabuľky výživových hodnôt.

### Parametre

| Parameter | Typ | Predvolený | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuálny | ID produktu |
| `show_rws` | bool | `true` | Či zobrazovať % RHP |
| `show_serving` | bool | `false` | Či zobrazovať stĺpec per porciu |
| `fields` | string | `all` | Zložky na zobrazenie (oddelené čiarkami) |
| `layout` | string | `table` | Rozloženie: `table`, `list`, `compact` |
| `wrapper` | string | `div` | Obaľujúci HTML prvok |

### Príklady použitia

Úplná tabuľka výživových hodnôt:

```html
[polski_nutrients]
```

S hodnotami per porciu:

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

## Referenčný príjem (RHP)

Plugin vypočíta % RHP automaticky na základe referenčných hodnôt z prílohy XIII nariadenia FIC:

| Zložka | Referenčná hodnota |
|----------|---------------------|
| Energia | 8400 kJ / 2000 kcal |
| Tuky | 70 g |
| Nasýtené mastné kyseliny | 20 g |
| Sacharidy | 260 g |
| Cukry | 90 g |
| Bielkoviny | 50 g |
| Soľ | 6 g |
| Vláknina | 25 g |

## Programový prístup

### Získanie výživových hodnôt

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
    // Zaokrúhľovanie hodnôt podľa usmernení EÚ
    if (isset($nutrients['energy_kcal'])) {
        $nutrients['energy_kcal'] = round($nutrients['energy_kcal']);
    }

    return $nutrients;
}, 10, 2);
```

## Import CSV

Stĺpec `polski_nutrients` v CSV by mal obsahovať hodnoty vo formáte JSON:

```csv
"Musli owocowe","{""energy_kj"":1590,""energy_kcal"":380,""fat"":8.2,""saturated_fat"":1.5,""carbohydrates"":64.0,""sugars"":22.0,""fibre"":7.5,""protein"":9.8,""salt"":0.05,""ref_unit"":""100g""}"
```

Úvodzovky vnútri JSON musia byť zdvojené (`""`) v CSV súbore.

## Štýlovanie CSS

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

1. Skontrolujte, či podmodul výživových hodnôt je zapnutý
2. Uistite sa, že produkt má vyplnené pole `_polski_nutrients` so správnym JSON
3. Overte formát JSON - použite validátor (napr. jsonlint.com)

### Hodnoty sa zobrazujú s bodkou namiesto čiarky

Plugin automaticky formátuje čísla podľa poľských nastavení (desatinná čiarka). Ak vidíte bodku, skontrolujte, či locale WordPress je nastavený na `pl_PL`.

### % RHP sa nezobrazuje

Skontrolujte, či možnosť "Zobrazovať % RHP" je zapnutá v nastaveniach a či parameter `show_rws` v shortcóde nie je nastavený na `false`.

## Súvisiace zdroje

- [Modul potravinárskych produktov](/sk/food/food-overview/)
- [Alergény](/sk/food/allergens/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
