---
title: Alergény
description: Deklarácia alergénov pomocou taxonómie polski_allergen, automatické zvýrazňovanie v zložkách a shortcód zobrazovania vo WooCommerce.
---

Predpisy EÚ vyžadujú označovanie 14 alergénov na etikete potravinárskeho produktu. V internetovom obchode musí byť informácia o alergénoch viditeľná pred nákupom. Plugin Polski for WooCommerce spravuje alergény cez taxonómiu WordPress.

## 14 hlavných alergénov

Povinná deklarácia zahŕňa:

| Č. | Alergén | Slug taxonómie | Ikona |
|----|---------|----------------|-------|
| 1 | Obilniny obsahujúce lepok | `gluten` | gluten |
| 2 | Kôrovce | `crustaceans` | kôrovce |
| 3 | Vajcia | `eggs` | vajcia |
| 4 | Ryby | `fish` | ryby |
| 5 | Arašidy (búrske oriešky) | `peanuts` | arašidy |
| 6 | Sója | `soy` | sója |
| 7 | Mlieko (laktóza) | `milk` | mlieko |
| 8 | Orechy | `nuts` | orechy |
| 9 | Zeler | `celery` | zeler |
| 10 | Horčica | `mustard` | horčica |
| 11 | Sezamové semená | `sesame` | sezam |
| 12 | Oxid siričitý a siričitany | `sulphites` | siričitany |
| 13 | Vlčí bôb (lupina) | `lupin` | lupina |
| 14 | Mäkkýše | `molluscs` | mäkkýše |

## Taxonómia polski_allergen

Plugin vytvára taxonómiu `polski_allergen` prepojenú s produktmi. Pri aktivácii automaticky pridá 14 hlavných alergénov.

### Správa alergénov

Prejdi na **Produkty > Alergény** na správu zoznamu. 14 alergénov sa vytvorí automaticky. Môžeš pridávať vlastné, špecifické pre tvoj sortiment.

Každý alergén obsahuje:

| Pole | Popis |
|------|------|
| Názov | Zobrazovaný názov alergénu (napr. "Mlieko a produkty z neho") |
| Slug | Identifikátor URL (napr. `milk`) |
| Popis | Doplnkové informácie o alergéne |
| Ikona | Voliteľná ikona (miniatúra taxonómie) |

### Priraďovanie alergénov k produktu

V editore produktu, v záložke "Potraviny" alebo v bočnom paneli "Alergény", zaškrtni príslušné alergény zo zoznamu checkbox.

Dostupné sú tri režimy deklarácie:

| Režim | Popis | Príklad |
|------|------|---------|
| Obsahuje | Produkt obsahuje daný alergén | "Obsahuje: mlieko, vajcia" |
| Môže obsahovať | Riziko krížovej kontaminácie | "Môže obsahovať: orechy" |
| Neobsahuje | Výslovná deklarácia neprítomnosti (voliteľné) | "Neobsahuje: lepok" |

### Režim "Môže obsahovať"

Režim "Môže obsahovať" označuje riziko stopových množstiev alergénu z výrobného procesu. Každý alergén označíš ako:

- **Obsahuje** - alergén je zložkou produktu
- **Môže obsahovať** - riziko stopových množstiev

## Konfigurácia

Prejdi na **WooCommerce > Nastavenia > Polski > Potraviny** a nakonfiguruj sekciu "Alergény".

| Nastavenie | Predvolené | Popis |
|------------|----------|------|
| Zapni deklaráciu alergénov | Áno | Aktivuje systém alergénov |
| Zvýrazňuj v zložkách | Áno | Automatické zvýraznenie alergénov v zozname zložiek |
| Zobraz ikony | Nie | Zobrazuje ikony alergénov |
| Pozícia na stránke | Záložka potraviny | Kde zobrazovať alergény |
| Režim "Môže obsahovať" | Áno | Zapína možnosť deklarácie stopových množstiev |
| Formát zobrazenia | Zoznam | `zoznam`, `ikony`, `inline` |

## Automatické zvýrazňovanie v zložkách

Alergény v zozname zložiek musia byť zvýraznené - najčastejšie tučným písmom. Plugin automaticky vyhľadáva názvy alergénov v poli "Zloženie" a obaľuje ich do `<strong>`.

Príklad:

Zadaný text:
```
Pšeničná múka, cukor, maslo, slepačie vajcia, sušené odstredené mlieko, soľ
```

Zobrazovaný text:
```
Pšeničná múka (lepok), cukor, maslo (mlieko), slepačie vajcia, sušené odstredené mlieko, soľ
```

So zvýraznením HTML:
```html
<strong>Pšeničná múka (lepok)</strong>, cukor, maslo (<strong>mlieko</strong>), 
slepačie <strong>vajcia</strong>, sušené odstredené <strong>mlieko</strong>, soľ
```

### Konfigurácia zvýrazňovania

Plugin hľadá synonymá alergénov v zozname zložiek. Zoznam synoným zmeníš filtrom:

```php
add_filter('polski/allergens/synonyms', function (array $synonyms): array {
    $synonyms['gluten'] = ['pšenica', 'pšeničná', 'raž', 'ražná', 'ovos', 'ovsená', 'jačmeň', 'špalda'];
    $synonyms['milk'] = ['mlieko', 'mliečny', 'mliečna', 'maslo', 'smotana', 'jogurt', 'syr', 'laktóza'];
    $synonyms['eggs'] = ['vajcia', 'vajíčka', 'vaječný', 'vaječná'];

    return $synonyms;
});
```

## Shortcód

Použi shortcód `[polski_allergens]` na zobrazenie deklarácie alergénov.

### Parametre

| Parameter | Typ | Predvolený | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuálny | ID produktu |
| `format` | string | `list` | Formát: `list`, `icons`, `inline`, `table` |
| `show_may_contain` | bool | `true` | Či zobrazovať sekciu "Môže obsahovať" |
| `show_icons` | bool | `false` | Či zobrazovať ikony alergénov |
| `label` | string | `"Alergény: "` | Označenie pred zoznamom |
| `wrapper` | string | `div` | Obaľujúci HTML element |

### Príklady použitia

Základný zoznam alergénov:

```html
[polski_allergens]
```

Výsledok:
```
Alergény: mlieko, vajcia, lepok
Môže obsahovať: orechy
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

## Programátorský prístup

### Načítanie alergénov produktu

```php
// Alergény "Obsahuje"
$allergens = wp_get_object_terms($product_id, 'polski_allergen');

foreach ($allergens as $allergen) {
    echo $allergen->name; // napr. "Mlieko a produkty z neho"
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

### Priraďovanie alergénov programátorsky

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

## CSV import

Alergény importuješ cez CSV:

| CSV stĺpec | Popis | Formát |
|-------------|------|--------|
| `polski_allergens` | Alergény "Obsahuje" | Slugy oddelené čiarkami |
| `polski_may_contain` | Alergény "Môže obsahovať" | Slugy oddelené čiarkami |

Príklad:

```csv
"Maslové sušienky","gluten,milk,eggs","nuts,soy"
"Pomarančový džús","",""
```

## CSS štýlovanie

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

1. Skontroluj, či je modul alergénov zapnutý
2. Uisti sa, že produkt má priradené alergény v editore
3. Over, či je taxonómia `polski_allergen` správne zaregistrovaná (Produkty > Alergény)

### Automatické zvýrazňovanie nefunguje

1. Skontroluj, či je možnosť "Zvýrazňuj v zložkách" zapnutá
2. Uisti sa, že názvy alergénov alebo ich synonymá zodpovedajú textu v zozname zložiek
3. Rozšír zoznam synoným filtrom `polski/allergens/synonyms`

### Chýbajú predvolené alergény po aktivácii

Ak sa 14 alergénov neobjavilo automaticky, prejdi na **WooCommerce > Nastavenia > Polski > Potraviny** a klikni na "Vytvoriť predvolené alergény".

## Súvisiace zdroje

- [Modul potravinárskych produktov](food/food-overview/)
- [Výživové hodnoty](food/nutrients/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
