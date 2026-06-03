---
title: Bloky Gutenberg
description: Bloky Gutenberg v Polski for WooCommerce - AJAX vyhľadávač, AJAX filtre a slider produktov s náhľadom v editore.
---

Tri bloky Gutenberg na vkladanie obchodných modulov. Každý blok má náhľad v editore (server-side render) a konfiguráciu v bočnom paneli.

## Požiadavky

- WordPress 6.0 alebo novší
- Blokový editor Gutenberg (nie klasický editor)
- Aktívny príslušný modul v nastaveniach Polski for WooCommerce

## Vkladanie blokov

Bloky nájdete v inserteri (tlačidlo **+**) v kategórii **Polski for WooCommerce**. Alebo vyhľadajte zadaním "Polski".

## Blok: AJAX vyhľadávač

**Názov bloku:** `polski/ajax-search`

Vyhľadávacie pole s AJAX návrhmi. Výsledky sa zobrazujú v dropdowne počas písania.

### Atribúty bloku

| Atribút        | Typ    | Predvolene          | Popis                          |
| -------------- | ------ | ------------------- | ----------------------------- |
| `placeholder`  | string | `Szukaj produktów…` | Zástupný text v poli        |
| `width`        | string | `100%`              | Šírka poľa                |
| `showIcon`     | bool   | `true`              | Ikona lupy                    |
| `showCategory` | bool   | `false`             | Dropdown filtrovania podľa kategórie |
| `limit`        | number | `8`                 | Limit návrhov             |
| `minChars`     | number | `3`                 | Min. znakov na vyhľadanie     |
| `style`        | string | `default`           | Štýl: default, rounded, flat  |

### Bočný panel (Inspector Controls)

Bočný panel bloku obsahuje sekcie:

**Nastavenia vyhľadávania:**
- Zástupný text (placeholder)
- Minimálny počet znakov
- Limit výsledkov
- Filter kategórií (áno/nie)

**Vzhľad:**
- Šírka poľa
- Štýl (predvolený, zaoblený, plochý)
- Ikona lupy (áno/nie)
- Orámovanie (áno/nie)
- Tieň (áno/nie)

**Pokročilé:**
- Doplnkové CSS triedy
- HTML anchor (kotva)

### Príklad registrácie bloku (interná implementácia)

```php
register_block_type('polski/ajax-search', [
    'api_version'     => 3,
    'editor_script'   => 'polski-blocks-editor',
    'editor_style'    => 'polski-blocks-editor-style',
    'style'           => 'polski-blocks-style',
    'render_callback' => [AjaxSearchBlock::class, 'render'],
    'attributes'      => [
        'placeholder' => [
            'type'    => 'string',
            'default' => __('Szukaj produktów…', 'polski'),
        ],
        'width' => [
            'type'    => 'string',
            'default' => '100%',
        ],
        'showIcon' => [
            'type'    => 'boolean',
            'default' => true,
        ],
        'showCategory' => [
            'type'    => 'boolean',
            'default' => false,
        ],
        'limit' => [
            'type'    => 'number',
            'default' => 8,
        ],
    ],
]);
```

### Filter vykresľovania

```php
add_filter('polski/blocks/ajax_search/output', function (string $html, array $attributes): string {
    // Modyfikacja HTML bloku
    return $html;
}, 10, 2);
```

## Blok: AJAX filtre

**Názov bloku:** `polski/ajax-filters`

AJAX filtre na filtrovanie produktov bez prenačítania stránky.

### Atribúty bloku

| Atribút      | Typ    | Predvolene  | Popis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | array  | `['category', 'price', 'stock']` | Aktívne filtre |
| `style`      | string | `expanded` | Štýl: expanded, compact, accordion |
| `showCount`  | bool   | `true`     | Počítadlá produktov            |
| `showReset`  | bool   | `true`     | Tlačidlo resetovania          |
| `columns`    | number | `1`        | Stĺpce filtrov               |
| `collapsible`| bool   | `true`     | Zbaliteľné sekcie                |

### Bočný panel

**Výber filtrov:**
- Checkboxy pre každý typ filtra
- Drag & drop usporiadanie poradia filtrov
- Konfigurácia na filter (napr. cenové rozpätia)

**Vzhľad:**
- Štýl zobrazenia (rozbalený, kompaktný, akordeón)
- Počet stĺpcov
- Počítadlá (áno/nie)
- Tlačidlo resetovania (áno/nie)
- Predvolene zbalené/rozbalené

**Pokročilé:**
- Režim AJAX / GET fallback
- Doplnkové CSS triedy

### Dostupné filtre

Blok automaticky rozpoznáva dostupné filtre na základe údajov produktov:

| Filter       | Typ          | Popis                          |
| ----------- | ------------ | ----------------------------- |
| `category`  | Hierarchia   | Kategórie produktov           |
| `price`     | Range slider | Cenové rozpätie                 |
| `stock`     | Checkbox     | Stav zásob             |
| `sale`      | Checkbox     | Iba v akcii              |
| `brand`     | Zoznam        | Výrobca/značka               |
| `pa_*`      | Zoznam/Swatch | Atribúty produktov            |
| `rating`    | Hviezdičky     | Hodnotenie zákazníkov           |

### Filter vykresľovania

```php
add_filter('polski/blocks/ajax_filters/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);
```

### Umiestnenie v sidebare

Najlepšie funguje v sidebare. V blokovej téme (FSE) ho pridajte do šablóny **Archive: Product**. V klasických témach použite vo widgetoch **Sidebar obchodu**.

## Blok: slider produktov

**Názov bloku:** `polski/product-slider`

Karusel produktov s navigáciou šípkami a voliteľnými bodkami stránkovania.

### Atribúty bloku

| Atribút         | Typ    | Predvolene | Popis                          |
| --------------- | ------ | --------- | ----------------------------- |
| `type`          | string | `latest`  | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | number | `8`       | Limit produktov               |
| `columns`       | number | `4`       | Stĺpce desktop               |
| `columnsTablet` | number | `2`       | Stĺpce tablet                |
| `columnsMobile` | number | `1`       | Stĺpce mobil                |
| `category`      | string | ``        | Slug kategórie                |
| `productIds`    | array  | `[]`      | ID produktov                  |
| `showArrows`    | bool   | `true`    | Navigačné šípky            |
| `showDots`      | bool   | `false`   | Bodky stránkovania             |
| `autoplay`      | bool   | `false`   | Automatické posúvanie      |
| `autoplaySpeed` | number | `5000`    | Prestávka medzi slajdmi (ms)  |
| `gap`           | string | `16px`    | Odstup medzi kartami         |
| `title`         | string | ``        | Nadpis                      |
| `orderby`       | string | `date`    | Triedenie                    |
| `order`         | string | `DESC`    | Smer                      |

### Bočný panel

**Zdroj produktov:**
- Typ slidera (dropdown s možnosťami)
- Výber kategórie (pre type=category)
- Výber produktov (pre type=ids) - vyhľadávač s automatickým dopĺňaním
- Limit produktov
- Triedenie

**Zobrazenie:**
- Stĺpce (desktop / tablet / mobil)
- Odstup (gap)
- Šípky (áno/nie)
- Bodky (áno/nie)
- Nadpis

**Animácia:**
- Autoplay (áno/nie)
- Rýchlosť autoplay (slider 1000-10000 ms)
- Pauza pri hover

### Náhľad v editore

Náhľad v editore zobrazuje skutočné produkty z databázy. Bez vyhovujúcich produktov blok zobrazí placeholder.

### Filter vykresľovania

```php
add_filter('polski/blocks/product_slider/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);

// Modyfikacja zapytania produktów
add_filter('polski/blocks/product_slider/query_args', function (array $args, array $attributes): array {
    // Wyklucz produkty z kategorii "ukryte"
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

Bloky plne podporujú blokové témy (FSE). Vkladajte ich v:

- Šablónach stránok (Page Templates)
- Šablónach archívov produktov
- Častiach šablón (Template Parts) - hlavička, päta, sidebar
- Vzoroch (Patterns)

## Štýlovanie blokov

CSS triedy podľa konvencie BEM. Bloky podporujú natívne nastavenia štýlov Gutenberg:

- Farby (text, pozadie)
- Typografia (veľkosť, hrúbka, rodina fontu)
- Okraje a paddingy (spacing)
- Orámovanie (border)

## Riešenie problémov

**Bloky sa nezobrazujú v inserteri** - uistite sa, že príslušný modul je aktívny v **WooCommerce > Polski > Obchodné moduly**. Bloky vyžadujú aktiváciu príslušného modulu.

**Náhľad bloku je prázdny** - skontrolujte, či má obchod produkty vyhovujúce vybranému typu. Prázdna databáza produktov nevygeneruje náhľad.

**Bloky nefungujú v Elementore** - tieto bloky sú určené pre editor Gutenberg. Pre Elementor použite shortcody alebo dedikované widgety Elementor (dostupné pre AJAX vyhľadávač).

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
