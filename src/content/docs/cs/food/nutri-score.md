---
title: Nutri-Score
description: Zobrazovani odznaku Nutri-Score A-E s CSS tridami pro kazdy stupen na strance produktu WooCommerce.
---

Nutri-Score je system znaceni potravin vyvinuty organizaci Sante publique France, ktery hodnotí vyzivovou kvalitu produktu v petistupnove skale od A (nejlepsi) do E (nejhorsi). Ackoliv v Polsku je pouzivani Nutri-Score dobrovolne, stale vice vyrobcu se rozhoduje pro jeho umisteni na obalech. Plugin Polski for WooCommerce umoznuje zobrazovani odznaku Nutri-Score na strance produktu.

## Co je Nutri-Score

System Nutri-Score klasifikuje potraviny na zaklade algoritmu zohlednujiciho:

**Negativni slozky (zaporne body):**
- energeticka hodnota
- cukry
- nasycene mastne kyseliny
- sul (sodik)

**Pozitivni slozky (kladne body):**
- ovoce, zelenina, orechy, oleje (repkovy, orechovy, olivovy)
- vlaknina
- bilkoviny

Na zaklade bilance bodu produkt obdrzi hodnoceni:

| Stupen | Barva | Rozsah bodu (tuha strava) | Popis |
|--------|-------|-------------------------------|------|
| A | Tmave zelena (#038141) | od -15 do -1 | Nejvyssi vyzivova kvalita |
| B | Svetle zelena (#85BB2F) | od 0 do 2 | Dobra vyzivova kvalita |
| C | Zluta (#FECB02) | od 3 do 10 | Stredni vyzivova kvalita |
| D | Oranzova (#EE8100) | od 11 do 18 | Nizka vyzivova kvalita |
| E | Cervena (#E63E11) | od 19 do 40 | Nejnizsi vyzivova kvalita |

## Konfigurace

### Aktivace modulu

Prejdete do **WooCommerce > Nastaveni > Polski > Potraviny** a aktivujte podmodul "Nutri-Score".

### Nastaveni

| Nastaveni | Vychozi | Popis |
|------------|----------|------|
| Aktivovat Nutri-Score | Ne | Aktivuje zobrazeni odznaku |
| Pozice na strance produktu | Pod cenou | Kde zobrazit odznak |
| Zobrazit na listingu | Ano | Zda zobrazit na strankach kategorii |
| Velikost odznaku | Normalni | `maly`, `normalni`, `velky` |
| Styl odznaku | Uplny | `uplny` (vsechna pismena), `kompaktni` (pouze aktivni pismeno) |

### Prirazeni Nutri-Score k produktu

V editoru produktu, v zalozce "Potraviny", vyberte uroven Nutri-Score z rozbalovacieho seznamu:

- A - Nejvyssi vyzivova kvalita
- B - Dobra vyzivova kvalita
- C - Stredni vyzivova kvalita
- D - Nizka vyzivova kvalita
- E - Nejnizsi vyzivova kvalita

Plugin nepocita Nutri-Score automaticky - musite znat hodnoceni sveho produktu. Pro vypocet muzete pouzit oficialni kalkulator nebo data od vyrobce.

## Vygenerovany HTML

Odznak Nutri-Score je renderovan jako sada HTML elementu s vyhrazenymi CSS tridami:

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

## CSS tridy pro kazdy stupen

Plugin generuje CSS tridy pro kazdy stupen, coz umoznuje plnou kontrolu nad stylovanim:

### Tridy na kontejneru

| Trida | Popis |
|-------|------|
| `.polski-nutri-score` | Hlavni kontejner |
| `.polski-nutri-score--active-a` | Aktivni stupen A |
| `.polski-nutri-score--active-b` | Aktivni stupen B |
| `.polski-nutri-score--active-c` | Aktivni stupen C |
| `.polski-nutri-score--active-d` | Aktivni stupen D |
| `.polski-nutri-score--active-e` | Aktivni stupen E |
| `.polski-nutri-score--small` | Mala velikost |
| `.polski-nutri-score--normal` | Normalni velikost |
| `.polski-nutri-score--large` | Velka velikost |

### Tridy na odznacich

| Trida | Popis |
|-------|------|
| `.polski-nutri-score__badge` | Kazdy odznak (pismeno) |
| `.polski-nutri-score__badge--a` | Odznak A |
| `.polski-nutri-score__badge--b` | Odznak B |
| `.polski-nutri-score__badge--c` | Odznak C |
| `.polski-nutri-score__badge--d` | Odznak D |
| `.polski-nutri-score__badge--e` | Odznak E |
| `.polski-nutri-score__badge--active` | Aktivni (vybrany) odznak |

## Vychozi CSS styly

Plugin obsahuje vestavene CSS styly pro odznak Nutri-Score:

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

/* Barvy pro kazdy stupen */
.polski-nutri-score__badge--a { background-color: #038141; }
.polski-nutri-score__badge--b { background-color: #85BB2F; }
.polski-nutri-score__badge--c { background-color: #FECB02; color: #333; }
.polski-nutri-score__badge--d { background-color: #EE8100; }
.polski-nutri-score__badge--e { background-color: #E63E11; }

/* Velikosti */
.polski-nutri-score--small .polski-nutri-score__badge { width: 1.5em; height: 1.5em; font-size: 0.7em; }
.polski-nutri-score--large .polski-nutri-score__badge { width: 2.5em; height: 2.5em; font-size: 1em; }
```

## Programaticky pristup

### Ziskani Nutri-Score produktu

```php
$nutri_score = get_post_meta($product_id, '_polski_nutri_score', true);
// Vraci: 'a', 'b', 'c', 'd', 'e' nebo '' (prazdny)
```

### Nastaveni Nutri-Score

```php
update_post_meta($product_id, '_polski_nutri_score', 'b');
```

### Filtr HTML odznaku

```php
add_filter('polski/nutri_score/html', function (string $html, string $score, int $product_id): string {
    // Uprava HTML odznaku
    return $html;
}, 10, 3);
```

## CSV import

| Sloupec CSV | Popis | Hodnoty |
|-------------|------|---------|
| `polski_nutri_score` | Stupen Nutri-Score | `a`, `b`, `c`, `d`, `e` |

Priklad:

```csv
"Jabłko",a
"Chipsy ziemniaczane",d
"Cola",e
"Jogurt naturalny",b
```

## Schema.org

Plugin pridava Nutri-Score do strukturovanych dat produktu:

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

## Pristupnost (a11y)

Odznak Nutri-Score obsahuje ARIA atributy pro ctecky obrazovky:

```html
<div class="polski-nutri-score" role="img" aria-label="Nutri-Score: C - średnia jakość odżywcza">
```

Kazdy neaktivni odznak ma `aria-hidden="true"` a aktivni obsahuje `aria-current="true"`.

## Nejcastejsi problemy

### Odznak se nezobrazuje

1. Zkontrolujte, zda je podmodul Nutri-Score aktivovan
2. Ujistete se, ze produkt ma prirazeny stupen Nutri-Score
3. Overite, zda CSS pluginu je nactene (bez konfliktu s optimalizacnimi pluginy)

### Barvy odznaku jsou jine nez ocekavane

Motiv muze prepisovat barvy pozadi. Pouzijte specifictejsi CSS selektory nebo pridejte `!important`.

### Odznak je prilis velky nebo prilis maly

Zmente velikost v nastaveních nebo prepiste CSS tridu velikosti.

## Souvisejici zdroje

- [Modul potravinovych produktu](/cs/food/food-overview/)
- [Vyzivove hodnoty](/cs/food/nutrients/)
- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
