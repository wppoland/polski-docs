---
title: Nutri-Score
description: Zobrazení odznaku Nutri-Score A-E s CSS třídami pro každou úroveň na stránce produktu WooCommerce.
---

Nutri-Score hodnotí výživovou kvalitu produktu ve škále od A (nejlepší) do E (nejhorší). V Polsku je dobrovolný, ale stále populárnější. Plugin Polski for WooCommerce zobrazuje odznak Nutri-Score na stránce produktu.

## Co je Nutri-Score

Nutri-Score klasifikuje produkty na základě:

**Negativní složky (záporné body):**
- energetická hodnota
- cukry
- nasycené mastné kyseliny
- sůl (sodík)

**Pozitivní složky (kladné body):**
- ovoce, zelenina, ořechy, oleje (řepkový, ořechový, olivový)
- vláknina
- bílkoviny

Na základě bilance bodů produkt dostane hodnocení:

| Úroveň | Barva | Rozsah bodů (tuhá strava) | Popis |
|--------|-------|-------------------------------|------|
| A | Tmavě zelená (#038141) | od -15 do -1 | Nejvyšší výživová kvalita |
| B | Světle zelená (#85BB2F) | od 0 do 2 | Dobrá výživová kvalita |
| C | Žlutá (#FECB02) | od 3 do 10 | Střední výživová kvalita |
| D | Oranžová (#EE8100) | od 11 do 18 | Nízká výživová kvalita |
| E | Červená (#E63E11) | od 19 do 40 | Nejnižší výživová kvalita |

## Konfigurace

### Zapnutí modulu

Přejděte do **WooCommerce > Nastavení > Polski > Potraviny** a aktivujte podmodul "Nutri-Score".

### Nastavení

| Nastavení | Výchozí | Popis |
|------------|----------|------|
| Zapnout Nutri-Score | Ne | Aktivuje zobrazení odznaku |
| Pozice na stránce produktu | Pod cenou | Kde zobrazovat odznak |
| Zobrazit v listingu | Ano | Zda zobrazovat na stránkách kategorií |
| Velikost odznaku | Normální | `malý`, `normální`, `velký` |
| Styl odznaku | Úplný | `úplný` (všechna písmena), `kompaktní` (pouze aktivní písmeno) |

### Přiřazení Nutri-Score k produktu

V editoru produktu, v záložce "Potraviny", vyberte úroveň Nutri-Score z rozbalovacího seznamu:

- A - Nejvyšší výživová kvalita
- B - Dobrá výživová kvalita
- C - Střední výživová kvalita
- D - Nízká výživová kvalita
- E - Nejnižší výživová kvalita

Plugin nepočítá Nutri-Score automaticky. Použijte oficiální kalkulátor nebo data od výrobce.

## Vygenerovaný HTML

Odznak Nutri-Score je sada HTML elementů s CSS třídami:

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

## CSS třídy pro každou úroveň

Plugin generuje CSS třídy pro každou úroveň, což dává plnou kontrolu nad stylováním:

### Třídy na kontejneru

| Třída | Popis |
|-------|------|
| `.polski-nutri-score` | Hlavní kontejner |
| `.polski-nutri-score--active-a` | Aktivní úroveň A |
| `.polski-nutri-score--active-b` | Aktivní úroveň B |
| `.polski-nutri-score--active-c` | Aktivní úroveň C |
| `.polski-nutri-score--active-d` | Aktivní úroveň D |
| `.polski-nutri-score--active-e` | Aktivní úroveň E |
| `.polski-nutri-score--small` | Malá velikost |
| `.polski-nutri-score--normal` | Normální velikost |
| `.polski-nutri-score--large` | Velká velikost |

### Třídy na odznacích

| Třída | Popis |
|-------|------|
| `.polski-nutri-score__badge` | Každý odznak (písmeno) |
| `.polski-nutri-score__badge--a` | Odznak A |
| `.polski-nutri-score__badge--b` | Odznak B |
| `.polski-nutri-score__badge--c` | Odznak C |
| `.polski-nutri-score__badge--d` | Odznak D |
| `.polski-nutri-score__badge--e` | Odznak E |
| `.polski-nutri-score__badge--active` | Aktivní (vybraný) odznak |

## Výchozí CSS styly

Plugin obsahuje vestavěné CSS styly:

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

/* Barvy pro každou úroveň */
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

/* Velikosti */
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

### Přepsání stylů

Přepište CSS třídy v souboru `style.css` motivu:

```css
/* Příklad: čtvercové odznaky se zaoblenými rohy */
.polski-nutri-score__badges {
    gap: 4px;
    border-radius: 0;
}

.polski-nutri-score__badge {
    border-radius: 6px;
    width: 2.2em;
    height: 2.2em;
}

/* Příklad: tmavý motiv */
.polski-nutri-score__label {
    color: #ccc;
}

.polski-nutri-score__badge {
    opacity: 0.25;
}
```

## Programatický přístup

### Získání Nutri-Score produktu

```php
$nutri_score = get_post_meta($product_id, '_polski_nutri_score', true);
// Vrací: 'a', 'b', 'c', 'd', 'e' nebo '' (prázdný)
```

### Nastavení Nutri-Score

```php
update_post_meta($product_id, '_polski_nutri_score', 'b');
```

### Filtr HTML odznaku

```php
add_filter('polski/nutri_score/html', function (string $html, string $score, int $product_id): string {
    // Úprava HTML odznaku
    return $html;
}, 10, 3);
```

### Podmíněné zobrazení

```php
add_filter('polski/nutri_score/display', function (bool $display, int $product_id): bool {
    // Skryj Nutri-Score pro produkty bez vyplněných výživových hodnot
    $nutrients = get_post_meta($product_id, '_polski_nutrients', true);

    if (empty($nutrients)) {
        return false;
    }

    return $display;
}, 10, 2);
```

## Import CSV

| Sloupec CSV | Popis | Hodnoty |
|-------------|------|---------|
| `polski_nutri_score` | Úroveň Nutri-Score | `a`, `b`, `c`, `d`, `e` |

Příklad:

```csv
"Jabłko",a
"Chipsy ziemniaczane",d
"Cola",e
"Jogurt naturalny",b
```

## Schema.org

Plugin přidává Nutri-Score do strukturovaných dat produktu:

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

## Přístupnost (a11y)

Odznak obsahuje atributy ARIA pro čtečky obrazovky:

```html
<div class="polski-nutri-score" role="img" aria-label="Nutri-Score: C - střední výživová kvalita">
```

Každý neaktivní odznak má `aria-hidden="true"` a aktivní obsahuje `aria-current="true"`.

## Nejčastější problémy

### Odznak se nezobrazuje

1. Zkontrolujte, zda je podmodul Nutri-Score zapnutý
2. Ujistěte se, že produkt má přiřazenou úroveň Nutri-Score
3. Ověřte, zda je CSS pluginu načtené (bez konfliktu s optimalizačními pluginy)

### Barvy odznaku jsou jiné než očekávané

Motiv může přepisovat barvy. Použijte specifičtější CSS selektory nebo přidejte `!important`:

```css
.polski-nutri-score__badge--a {
    background-color: #038141 !important;
}
```

### Odznak je příliš velký nebo příliš malý

Změňte velikost v nastavení (**WooCommerce > Nastavení > Polski > Potraviny > Nutri-Score > Velikost odznaku**) nebo přepište CSS třídu velikosti.

## Související zdroje

- [Modul potravinových produktů](food/food-overview/)
- [Výživové hodnoty](food/nutrients/)
- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
