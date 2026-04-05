---
title: Alergény
description: Deklarácia alergénov pomocou taxonómie polski_allergen, automatické zvýrazňovanie v zložkách a shortcód zobrazovania vo WooCommerce.
---

Nariadenie (EÚ) č. 1169/2011 (príloha II) určuje 14 látok spôsobujúcich alergie alebo reakcie neznášanlivosti, ktoré musia byť zreteľne označené na etikete potravinárskeho produktu. Pri internetovom predaji musí byť informácia o alergénoch dostupná pred nákupom. Plugin Polski for WooCommerce poskytuje systém deklarácie alergénov založený na taxonómii WordPress.

## 14 hlavných alergénov

V súlade s prílohou II nariadenia FIC povinná deklarácia zahŕňa:

| Č. | Alergén | Slug taxonómie | Ikona |
|----|---------|----------------|-------|
| 1 | Obilniny obsahujúce lepok | `gluten` | gluten |
| 2 | Kôrovce | `crustaceans` | kôrovce |
| 3 | Vajcia | `eggs` | vajcia |
| 4 | Ryby | `fish` | ryby |
| 5 | Arašidy | `peanuts` | arašidy |
| 6 | Sója | `soy` | sója |
| 7 | Mlieko (laktóza) | `milk` | mlieko |
| 8 | Orechy | `nuts` | orechy |
| 9 | Zeler | `celery` | zeler |
| 10 | Horčica | `mustard` | horčica |
| 11 | Sezamové semienka | `sesame` | sezam |
| 12 | Oxid siričitý a siričitany | `sulphites` | siričitany |
| 13 | Vlčí bôb | `lupin` | vlčí bôb |
| 14 | Mäkkýše | `molluscs` | mäkkýše |

## Taxonómia polski_allergen

Plugin registruje taxonómiu `polski_allergen` prepojenú s typom príspevku `product`. Počas aktivácie pluginu je taxonómia automaticky vyplnená 14 hlavnými alergénmi.

### Správa alergénov

Prejdite do **Produkty > Alergény** na správu zoznamu alergénov. Predvolených 14 alergénov je vytvorených automaticky. Môžete pridávať vlastné alergény špecifické pre váš sortiment.

Každý alergén obsahuje:

| Pole | Popis |
|------|------|
| Názov | Zobrazovaný názov alergénu (napr. "Mlieko a výrobky z mlieka") |
| Slug | URL identifikátor (napr. `milk`) |
| Popis | Ďalšie informácie o alergéne |
| Ikona | Voliteľná ikona (miniatúra taxonómie) |

### Priradenie alergénov k produktu

V editore produktu, v záložke "Potraviny" alebo v bočnom paneli "Alergény", zaškrtnite príslušné alergény zo zoznamu checkbox.

Dostupné sú tri režimy deklarácie:

| Režim | Popis | Príklad |
|------|------|---------|
| Obsahuje | Produkt obsahuje daný alergén | "Obsahuje: mlieko, vajcia" |
| Môže obsahovať | Riziko krížovej kontaminácie | "Môže obsahovať: orechy" |
| Neobsahuje | Výslovná deklarácia neprítomnosti (voliteľné) | "Neobsahuje: lepok" |

### Režim "Môže obsahovať"

Režim "Môže obsahovať" (may contain) slúži na označenie rizika stopových množstiev alergénu vyplývajúcich z výrobných procesov. V editore produktu je možné každý alergén označiť ako:

- **Obsahuje** - alergén je zložkou produktu
- **Môže obsahovať** - riziko stopových množstiev

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Potraviny** a nakonfigurujte sekciu "Alergény".

| Nastavenie | Predvolené | Popis |
|------------|----------|------|
| Zapnúť deklaráciu alergénov | Áno | Aktivuje systém alergénov |
| Zvýrazňovať v zložkách | Áno | Automatické tučné písmo alergénov v zozname zložiek |
| Zobrazovať ikony | Nie | Zobrazuje ikony alergénov |
| Pozícia na stránke | Záložka potraviny | Kde zobrazovať alergény |
| Režim "Môže obsahovať" | Áno | Zapína možnosť deklarácie stopových množstiev |
| Formát zobrazovania | Zoznam | `zoznam`, `ikony`, `inline` |

## Automatické zvýrazňovanie v zložkách

V súlade s čl. 21 nariadenia FIC musia byť alergény v zozname zložiek zvýraznené - zvyčajne tučným písmom alebo veľkými písmenami. Plugin automaticky vyhľadáva názvy alergénov v poli "Zloženie" a obaľuje ich tagom `<strong>`.

Príklad:

Zadaný text:
```
Mąka pszenna, cukier, masło, jaja kurze, mleko odtłuszczone w proszku, sól
```

Zobrazený text:
```
Mąka pszenna (gluten), cukier, masło (mleko), jaja kurze, mleko odtłuszczone w proszku, sól
```

S HTML zvýraznením:
```html
Mąka <strong>pszenna (gluten)</strong>, cukier, masło (<strong>mleko</strong>), 
<strong>jaja</strong> kurze, <strong>mleko</strong> odtłuszczone w proszku, sól
```

### Konfigurácia zvýrazňovania

Plugin prehľadáva zoznam zložiek na synonymá alergénov. Zoznam synoným je konfigurovateľný:

```php
add_filter('polski/allergens/synonyms', function (array $synonyms): array {
    $synonyms['gluten'] = ['pszenica', 'pszenna', 'żyto', 'żytnia', 'owies', 'owsiana', 'jęczmień', 'orkisz'];
    $synonyms['milk'] = ['mleko', 'mleczny', 'mleczna', 'masło', 'śmietana', 'jogurt', 'ser', 'laktoza'];
    $synonyms['eggs'] = ['jaja', 'jajka', 'jajeczny', 'jajeczna'];

    return $synonyms;
});
```

## Shortcód

Použite shortcód `[polski_allergens]` na zobrazenie deklarácie alergénov.

### Parametre

| Parameter | Typ | Predvolený | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuálny | ID produktu |
| `format` | string | `list` | Formát: `list`, `icons`, `inline`, `table` |
| `show_may_contain` | bool | `true` | Či zobrazovať sekciu "Môže obsahovať" |
| `show_icons` | bool | `false` | Či zobrazovať ikony alergénov |
| `label` | string | `"Alergeny: "` | Štítok pred zoznamom |
| `wrapper` | string | `div` | Obaľujúci HTML prvok |

### Príklady použitia

Základný zoznam alergénov:

```html
[polski_allergens]
```

Výsledok:
```
Alergeny: mleko, jaja, gluten
Może zawierać: orzechy
```

Formát inline s ikonami:

```html
[polski_allergens format="inline" show_icons="true"]
```

Bez sekcie "Môže obsahovať":

```html
[polski_allergens show_may_contain="false"]
```

Formát tabuľky:

```html
[polski_allergens format="table"]
```

Pre konkrétny produkt:

```html
[polski_allergens product_id="456"]
```

V PHP šablóne:

```php
echo do_shortcode('[polski_allergens product_id="' . $product->get_id() . '"]');
```

## Programový prístup

### Získanie alergénov produktu

```php
// Alergény "Obsahuje"
$allergens = wp_get_object_terms($product_id, 'polski_allergen');

foreach ($allergens as $allergen) {
    echo $allergen->name; // napr. "Mleko i produkty pochodne"
}

// Alergény "Môže obsahovať"
$may_contain = get_post_meta($product_id, '_polski_may_contain_allergens', true);
if ($may_contain) {
    $may_contain_terms = get_terms([
        'taxonomy' => 'polski_allergen',
        'slug'     => $may_contain,
    ]);
}
```

### Priradenie alergénov programovo

```php
// Nastavenie alergénov "Obsahuje"
wp_set_object_terms($product_id, ['gluten', 'milk', 'eggs'], 'polski_allergen');

// Nastavenie alergénov "Môže obsahovať"
update_post_meta($product_id, '_polski_may_contain_allergens', ['nuts', 'soy']);
```

### Kontrola, či produkt obsahuje alergén

```php
if (has_term('gluten', 'polski_allergen', $product_id)) {
    // Produkt obsahuje lepok
}
```

## Import CSV

Alergény je možné importovať cez CSV:

| Stĺpec CSV | Popis | Formát |
|-------------|------|--------|
| `polski_allergens` | Alergény "Obsahuje" | Slugy oddelené čiarkami |
| `polski_may_contain` | Alergény "Môže obsahovať" | Slugy oddelené čiarkami |

Príklad:

```csv
"Ciastka maślane","gluten,milk,eggs","nuts,soy"
"Sok pomarańczowy","",""
```

## Štýlovanie CSS

```css
.polski-allergens {
    margin: 1em 0;
    padding: 0.8em;
    background: #fff3e0;
    border: 1px solid #ffcc02;
    border-radius: 4px;
}

.polski-allergens__label {
    font-weight: 700;
    color: #e65100;
}

.polski-allergens__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
}

.polski-allergens__item {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    padding: 0.2em 0.6em;
    background: #fff;
    border: 1px solid #ffcc02;
    border-radius: 3px;
    font-size: 0.9em;
}

.polski-allergens__may-contain {
    margin-top: 0.5em;
    font-style: italic;
    color: #666;
}

.polski-allergens__icon {
    width: 20px;
    height: 20px;
}
```

## Najčastejšie problémy

### Alergény sa nezobrazujú na stránke produktu

1. Skontrolujte, či modul alergénov je zapnutý
2. Uistite sa, že produkt má priradené alergény v editore
3. Overte, či taxonómia `polski_allergen` je správne zaregistrovaná (Produkty > Alergény)

### Automatické zvýrazňovanie nefunguje

1. Skontrolujte, či možnosť "Zvýrazňovať v zložkách" je zapnutá
2. Uistite sa, že názvy alergénov alebo ich synonymá zodpovedajú textu v zozname zložiek
3. Rozšírte zoznam synoným filtrom `polski/allergens/synonyms`

### Chýbajú predvolené alergény po aktivácii

Ak zoznam 14 alergénov nebol vytvorený automaticky, prejdite do **WooCommerce > Nastavenia > Polski > Potraviny** a kliknite na "Vytvoriť predvolené alergény".

## Súvisiace zdroje

- [Modul potravinárskych produktov](/sk/food/food-overview/)
- [Výživové hodnoty](/sk/food/nutrients/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
