---
title: Nutri-Score
description: Zobrazenie odznaku Nutri-Score A-E s CSS triedami per úroveň na stránke produktu WooCommerce.
---

Nutri-Score hodnotí výživovú kvalitu produktu v škále od A (najlepšia) po E (najhoršia). V Poľsku je dobrovoľný, ale čoraz populárnejší. Plugin Polski for WooCommerce zobrazuje odznak Nutri-Score na stránke produktu.

## Čo je Nutri-Score

Systém Nutri-Score klasifikuje potravinárske produkty na základe algoritmu zohľadňujúceho:

**Negatívne zložky (záporné body):**
- energetická hodnota
- cukry
- nasýtené mastné kyseliny
- soľ (sodík)

**Pozitívne zložky (kladné body):**
- ovocie, zelenina, orechy, oleje (repkový, orechový, olivový)
- vláknina
- bielkoviny

Na základe bilancie bodov produkt dostáva hodnotenie:

| Úroveň | Farba | Rozsah bodov (pevná strava) | Popis |
|--------|-------|-------------------------------|------|
| A | Tmavozelená (#038141) | od -15 do -1 | Najvyššia výživová kvalita |
| B | Svetlozelená (#85BB2F) | od 0 do 2 | Dobrá výživová kvalita |
| C | Žltá (#FECB02) | od 3 do 10 | Stredná výživová kvalita |
| D | Oranžová (#EE8100) | od 11 do 18 | Nízka výživová kvalita |
| E | Červená (#E63E11) | od 19 do 40 | Najnižšia výživová kvalita |

## Konfigurácia

### Zapnutie modulu

Prejdite do **WooCommerce > Nastavenia > Polski > Potraviny** a aktivujte podmodul "Nutri-Score".

### Nastavenia

| Nastavenie | Predvolené | Popis |
|------------|----------|------|
| Zapnúť Nutri-Score | Nie | Aktivuje zobrazovanie odznaku |
| Pozícia na stránke produktu | Pod cenou | Kde zobrazovať odznak |
| Zobraziť v zozname | Áno | Či zobrazovať na stránkach kategórií |
| Veľkosť odznaku | Normálna | `malá`, `normálna`, `veľká` |
| Štýl odznaku | Úplný | `úplný` (všetky písmená), `kompaktný` (len aktívne písmeno) |

### Priradenie Nutri-Score k produktu

V editore produktu, v záložke "Potraviny", vyberte úroveň Nutri-Score z rozbaľovacieho zoznamu:

- A - Najvyššia výživová kvalita
- B - Dobrá výživová kvalita
- C - Stredná výživová kvalita
- D - Nízka výživová kvalita
- E - Najnižšia výživová kvalita

Plugin nepočíta Nutri-Score automaticky - musíte poznať hodnotenie svojho produktu. Na výpočet môžete použiť oficiálnu kalkulačku alebo údaje od výrobcu.

## Vygenerované HTML

Odznak Nutri-Score je renderovaný ako súbor HTML prvkov s vyhradenými CSS triedami:

```html
<div class="polski-nutri-score polski-nutri-score--active-c">
    <span class="polski-nutri-score__label">Nutri-Score</span>
    <div class="polski-nutri-score__badges">
        <span class="polski-nutri-score__badge polski-nutri-score__badge--a">A</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--b">B</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--c polski-nutri-score__badge--active">C</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--d">D</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--e">E</span>
    </div>
</div>
```

## CSS triedy per úroveň

Plugin generuje CSS triedy pre každú úroveň, čo umožňuje plnú kontrolu nad štýlovaním:

### Triedy na kontajneri

| Trieda | Popis |
|-------|------|
| `.polski-nutri-score` | Hlavný kontajner |
| `.polski-nutri-score--active-a` | Aktívna úroveň A |
| `.polski-nutri-score--active-b` | Aktívna úroveň B |
| `.polski-nutri-score--active-c` | Aktívna úroveň C |
| `.polski-nutri-score--active-d` | Aktívna úroveň D |
| `.polski-nutri-score--active-e` | Aktívna úroveň E |
| `.polski-nutri-score--small` | Malá veľkosť |
| `.polski-nutri-score--normal` | Normálna veľkosť |
| `.polski-nutri-score--large` | Veľká veľkosť |

### Triedy na odznakoch

| Trieda | Popis |
|-------|------|
| `.polski-nutri-score__badge` | Každý odznak (písmeno) |
| `.polski-nutri-score__badge--a` | Odznak A |
| `.polski-nutri-score__badge--b` | Odznak B |
| `.polski-nutri-score__badge--c` | Odznak C |
| `.polski-nutri-score__badge--d` | Odznak D |
| `.polski-nutri-score__badge--e` | Odznak E |
| `.polski-nutri-score__badge--active` | Aktívny (vybraný) odznak |

## Predvolené CSS štýly

Plugin obsahuje vstavané CSS štýly pre odznak Nutri-Score:

```css
.polski-nutri-score {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0.5em 0;
}

.polski-nutri-score__label {
    font-size: 0.75em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #666;
    margin-bottom: 0.3em;
}

.polski-nutri-score__badges {
    display: inline-flex;
    gap: 2px;
    border-radius: 4px;
    overflow: hidden;
}

.polski-nutri-score__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    font-weight: 700;
    font-size: 0.85em;
    color: #fff;
    opacity: 0.35;
    transition: opacity 0.2s, transform 0.2s;
}

.polski-nutri-score__badge--active {
    opacity: 1;
    transform: scale(1.15);
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

/* Farby per úroveň */
.polski-nutri-score__badge--a {
    background-color: #038141;
}

.polski-nutri-score__badge--b {
    background-color: #85BB2F;
}

.polski-nutri-score__badge--c {
    background-color: #FECB02;
    color: #333;
}

.polski-nutri-score__badge--d {
    background-color: #EE8100;
}

.polski-nutri-score__badge--e {
    background-color: #E63E11;
}

/* Veľkosti */
.polski-nutri-score--small .polski-nutri-score__badge {
    width: 1.5em;
    height: 1.5em;
    font-size: 0.7em;
}

.polski-nutri-score--large .polski-nutri-score__badge {
    width: 2.5em;
    height: 2.5em;
    font-size: 1em;
}
```

### Prepísanie štýlov

Na prispôsobenie vzhľadu odznaku vo vašej téme prepíšte CSS triedy v súbore `style.css` témy:

```css
/* Príklad: štvorcové odznaky so zaoblenými rohmi */
.polski-nutri-score__badges {
    gap: 4px;
    border-radius: 0;
}

.polski-nutri-score__badge {
    border-radius: 6px;
    width: 2.2em;
    height: 2.2em;
}

/* Príklad: tmavá téma */
.polski-nutri-score__label {
    color: #ccc;
}

.polski-nutri-score__badge {
    opacity: 0.25;
}
```

## Programový prístup

### Získanie Nutri-Score produktu

```php
$nutri_score = get_post_meta($product_id, '_polski_nutri_score', true);
// Vracia: 'a', 'b', 'c', 'd', 'e' alebo '' (prázdne)
```

### Nastavenie Nutri-Score

```php
update_post_meta($product_id, '_polski_nutri_score', 'b');
```

### Filter HTML odznaku

```php
add_filter('polski/nutri_score/html', function (string $html, string $score, int $product_id): string {
    // Úprava HTML odznaku
    return $html;
}, 10, 3);
```

### Podmienené zobrazovanie

```php
add_filter('polski/nutri_score/display', function (bool $display, int $product_id): bool {
    // Skryť Nutri-Score pre produkty bez vyplnených výživových hodnôt
    $nutrients = get_post_meta($product_id, '_polski_nutrients', true);

    if (empty($nutrients)) {
        return false;
    }

    return $display;
}, 10, 2);
```

## Import CSV

| Stĺpec CSV | Popis | Hodnoty |
|-------------|------|---------|
| `polski_nutri_score` | Úroveň Nutri-Score | `a`, `b`, `c`, `d`, `e` |

Príklad:

```csv
"Jabłko",a
"Chipsy ziemniaczane",d
"Cola",e
"Jogurt naturalny",b
```

## Schema.org

Plugin pridáva Nutri-Score do štrukturovaných údajov produktu:

```json
{
    "@type": "Product",
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "Nutri-Score",
            "value": "B"
        }
    ]
}
```

## Prístupnosť (a11y)

Odznak Nutri-Score obsahuje ARIA atribúty pre čítačky obrazovky:

```html
<div class="polski-nutri-score" role="img" aria-label="Nutri-Score: C - średnia jakość odżywcza">
```

Každý neaktívny odznak má `aria-hidden="true"` a aktívny obsahuje `aria-current="true"`.

## Najčastejšie problémy

### Odznak sa nezobrazuje

1. Skontrolujte, či podmodul Nutri-Score je zapnutý
2. Uistite sa, že produkt má priradenú úroveň Nutri-Score
3. Overte, či CSS pluginu je načítané (žiadny konflikt s optimalizačnými pluginmi)

### Farby odznaku sú iné ako očakávané

Téma môže prepísať farby pozadia. Použite špecifickejšie CSS selektory alebo pridajte `!important`:

```css
.polski-nutri-score__badge--a {
    background-color: #038141 !important;
}
```

### Odznak je príliš veľký alebo príliš malý

Zmeňte veľkosť v nastaveniach (**WooCommerce > Nastavenia > Polski > Potraviny > Nutri-Score > Veľkosť odznaku**) alebo prepíšte CSS triedu veľkosti.

## Súvisiace zdroje

- [Modul potravinárskych produktov](/sk/food/food-overview/)
- [Výživové hodnoty](/sk/food/nutrients/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
