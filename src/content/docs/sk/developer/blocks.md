---
title: Gutenberg bloky
description: Gutenberg bloky v Polski for WooCommerce - AJAX vyhľadávanie, AJAX filtre a slider produktov s náhľadom v editore.
---

Tri Gutenberg bloky na vkladanie obchodných modulov. Každý blok má náhľad v editore (server-side render) a konfiguráciu v bočnom paneli.

## Požiadavky

- WordPress 6.0 alebo novší
- Blokový editor Gutenberg (nie klasický editor)
- Aktívny príslušný modul v nastaveniach Polski for WooCommerce

## Vkladanie blokov

Bloky Polski for WooCommerce nájdete v insertéri blokov (tlačidlo **+**) v kategórii **Polski for WooCommerce**. Môžete ich tiež vyhľadať podľa názvu zadaním "Polski" alebo názvu modulu.

## Blok: AJAX vyhľadávanie

**Názov bloku:** `polski/ajax-search`

Vkladá pole vyhľadávania s AJAX návrhmi. Výsledky sa zobrazujú v dropdowne počas zadávania frázy.

### Atribúty bloku

| Atribút        | Typ    | Predvolené          | Popis                          |
| -------------- | ------ | ------------------- | ----------------------------- |
| `placeholder`  | string | `Szukaj produktów…` | Zástupný text v poli           |
| `width`        | string | `100%`              | Šírka poľa                     |
| `showIcon`     | bool   | `true`              | Ikona lupy                     |
| `showCategory` | bool   | `false`             | Dropdown filtrovania podľa kategórie |
| `limit`        | number | `8`                 | Limit návrhov                  |
| `minChars`     | number | `3`                 | Min. znakov na vyhľadanie      |
| `style`        | string | `default`           | Štýl: default, rounded, flat  |

## Blok: AJAX filtre

**Názov bloku:** `polski/ajax-filters`

Vkladá súbor AJAX filtrov na filtrovanie zoznamu produktov bez opätovného načítania stránky.

### Atribúty bloku

| Atribút      | Typ    | Predvolené  | Popis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | array  | `['category', 'price', 'stock']` | Aktívne filtre |
| `style`      | string | `expanded` | Štýl: expanded, compact, accordion |
| `showCount`  | bool   | `true`     | Počítadlá produktov            |
| `showReset`  | bool   | `true`     | Tlačidlo resetovania           |
| `columns`    | number | `1`        | Stĺpce filtrov                 |
| `collapsible`| bool   | `true`     | Zbaľovateľné sekcie            |

## Blok: slider produktov

**Názov bloku:** `polski/product-slider`

Vkladá karusel produktov s navigáciou šípkami a voliteľnými paginačnými bodkami.

### Atribúty bloku

| Atribút         | Typ    | Predvolené | Popis                          |
| --------------- | ------ | --------- | ----------------------------- |
| `type`          | string | `latest`  | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | number | `8`       | Limit produktov                |
| `columns`       | number | `4`       | Stĺpce desktop                |
| `columnsTablet` | number | `2`       | Stĺpce tablet                 |
| `columnsMobile` | number | `1`       | Stĺpce mobile                 |
| `showArrows`    | bool   | `true`    | Navigačné šípky                |
| `showDots`      | bool   | `false`   | Paginačné bodky                |
| `autoplay`      | bool   | `false`   | Automatické posúvanie          |
| `autoplaySpeed` | number | `5000`    | Pauza medzi slajdmi (ms)       |
| `title`         | string | ``        | Hlavička                       |

### Náhľad v editore

Blok renderuje náhľad slidera priamo v editore Gutenberg (server-side render). Náhľad zobrazuje skutočné produkty z databázy, čo umožňuje posúdiť vzhľad pred publikovaním.

### Filter renderovania

```php
add_filter('polski/blocks/product_slider/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);

// Úprava dopytu produktov
add_filter('polski/blocks/product_slider/query_args', function (array $args, array $attributes): array {
    // Vylúčiť produkty z kategórie "skryté"
    $args['tax_query'][] = [
        'taxonomy' => 'product_cat',
        'field'    => 'slug',
        'terms'    => 'ukryte',
        'operator' => 'NOT IN',
    ];
    return $args;
}, 10, 2);
```

## Kompatibilita s blokovými témami (FSE)

Bloky Polski for WooCommerce fungujú plne s blokovými témami (Full Site Editing). Je možné ich vkladať do:

- Šablón stránok (Page Templates)
- Šablón archívov produktov
- Častí šablón (Template Parts) - hlavička, pätička, sidebar
- Vzorov (Patterns)

## Štýlovanie blokov

Každý blok generuje CSS triedy v súlade s konvenciou BEM. Bloky tiež podporujú natívne nastavenia štýlov Gutenberg:

- Farby (text, pozadie)
- Typografia (veľkosť, hrúbka, rodina fontu)
- Okraje a paddingy (spacing)
- Orámovanie (border)

## Riešenie problémov

**Bloky sa nezobrazujú v insertéri** - uistite sa, že príslušný modul je aktívny v **WooCommerce > Polski > Obchodné moduly**. Bloky vyžadujú aktiváciu príslušného modulu.

**Náhľad bloku je prázdny** - skontrolujte, či obchod má produkty zodpovedajúce vybranému typu. Prázdna databáza produktov nevygeneruje náhľad.

**Bloky nefungujú v Elementore** - tieto bloky sú určené pre editor Gutenberg. Pre Elementor použite shortcódy alebo špeciálne Elementor widgety (dostupné pre AJAX vyhľadávanie).

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
