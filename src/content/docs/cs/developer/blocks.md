---
title: Bloky Gutenberg
description: Bloky Gutenberg v Polski for WooCommerce - AJAX vyhledávač, AJAX filtry a slider produktů s náhledem v editoru.
---

Tři bloky Gutenberg pro vkládání modulů obchodu. Každý blok má náhled v editoru (server-side render) a konfiguraci v bočním panelu.

## Požadavky

- WordPress 6.0 nebo novější
- Blokový editor Gutenberg (ne klasický editor)
- Aktivní příslušný modul v nastavení Polski for WooCommerce

## Vkládání bloků

Bloky najdete v inserteru (tlačítko **+**) v kategorii **Polski for WooCommerce**. Nebo je vyhledejte zadáním "Polski".

## Blok: AJAX vyhledávač

**Název bloku:** `polski/ajax-search`

Pole vyhledávání s AJAX našeptáváním. Výsledky se zobrazují v dropdownu během psaní.

### Atributy bloku

| Atribut        | Typ    | Výchozí             | Popis                          |
| -------------- | ------ | ------------------- | ----------------------------- |
| `placeholder`  | string | `Szukaj produktów…` | Zástupný text v poli          |
| `width`        | string | `100%`              | Šířka pole                    |
| `showIcon`     | bool   | `true`              | Ikona lupy                    |
| `showCategory` | bool   | `false`             | Dropdown filtrování po kategorii |
| `limit`        | number | `8`                 | Limit našeptávání             |
| `minChars`     | number | `3`                 | Min. znaků k vyhledání        |
| `style`        | string | `default`           | Styl: default, rounded, flat  |

### Boční panel (Inspector Controls)

Boční panel bloku obsahuje sekce:

**Nastavení vyhledávání:**
- Zástupný text (placeholder)
- Minimální počet znaků
- Limit výsledků
- Filtr kategorií (ano/ne)

**Vzhled:**
- Šířka pole
- Styl (výchozí, zaoblený, plochý)
- Ikona lupy (ano/ne)
- Ohraničení (ano/ne)
- Stín (ano/ne)

**Pokročilé:**
- Doplňkové CSS třídy
- HTML anchor (kotva)

### Příklad registrace bloku (interní implementace)

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

### Filtr renderování

```php
add_filter('polski/blocks/ajax_search/output', function (string $html, array $attributes): string {
    // Modyfikacja HTML bloku
    return $html;
}, 10, 2);
```

## Blok: AJAX filtry

**Název bloku:** `polski/ajax-filters`

AJAX filtry pro filtrování produktů bez znovunačtení stránky.

### Atributy bloku

| Atribut      | Typ    | Výchozí    | Popis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | array  | `['category', 'price', 'stock']` | Aktivní filtry |
| `style`      | string | `expanded` | Styl: expanded, compact, accordion |
| `showCount`  | bool   | `true`     | Počítadla produktů            |
| `showReset`  | bool   | `true`     | Tlačítko resetování           |
| `columns`    | number | `1`        | Sloupce filtrů                |
| `collapsible`| bool   | `true`     | Sbalitelné sekce              |

### Boční panel

**Výběr filtrů:**
- Zaškrtávací políčka pro každý typ filtru
- Drag & drop řazení pořadí filtrů
- Konfigurace per filtr (např. cenové rozsahy)

**Vzhled:**
- Styl zobrazení (rozbalený, kompaktní, akordeon)
- Počet sloupců
- Počítadla (ano/ne)
- Tlačítko resetování (ano/ne)
- Výchozí sbaleno/rozbaleno

**Pokročilé:**
- Režim AJAX / GET fallback
- Doplňkové CSS třídy

### Dostupné filtry

Blok automaticky detekuje dostupné filtry na základě dat produktů:

| Filtr       | Typ          | Popis                          |
| ----------- | ------------ | ----------------------------- |
| `category`  | Hierarchie   | Kategorie produktů            |
| `price`     | Range slider | Cenový rozsah                 |
| `stock`     | Checkbox     | Stav skladu                   |
| `sale`      | Checkbox     | Pouze v akci                  |
| `brand`     | Seznam       | Výrobce/značka                |
| `pa_*`      | Seznam/Swatch | Atributy produktů            |
| `rating`    | Hvězdičky    | Hodnocení zákazníků           |

### Filtr renderování

```php
add_filter('polski/blocks/ajax_filters/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);
```

### Umístění v sidebaru

Nejlépe funguje v sidebaru. V blokovém motivu (FSE) jej přidejte do šablony **Archive: Product**. V klasických motivech jej použijte ve widgetech **Sidebar obchodu**.

## Blok: slider produktů

**Název bloku:** `polski/product-slider`

Karusel produktů s navigací šipkami a volitelnými tečkami stránkování.

### Atributy bloku

| Atribut         | Typ    | Výchozí   | Popis                          |
| --------------- | ------ | --------- | ----------------------------- |
| `type`          | string | `latest`  | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | number | `8`       | Limit produktů                |
| `columns`       | number | `4`       | Sloupce desktop               |
| `columnsTablet` | number | `2`       | Sloupce tablet                |
| `columnsMobile` | number | `1`       | Sloupce mobile                |
| `category`      | string | ``        | Slug kategorie                |
| `productIds`    | array  | `[]`      | ID produktů                   |
| `showArrows`    | bool   | `true`    | Šipky navigace                |
| `showDots`      | bool   | `false`   | Tečky stránkování             |
| `autoplay`      | bool   | `false`   | Automatické přehrávání        |
| `autoplaySpeed` | number | `5000`    | Pauza mezi snímky (ms)        |
| `gap`           | string | `16px`    | Mezera mezi kartami           |
| `title`         | string | ``        | Nadpis                        |
| `orderby`       | string | `date`    | Řazení                        |
| `order`         | string | `DESC`    | Směr                          |

### Boční panel

**Zdroj produktů:**
- Typ slideru (dropdown s možnostmi)
- Výběr kategorie (pro type=category)
- Výběr produktů (pro type=ids) - vyhledávač s automatickým doplňováním
- Limit produktů
- Řazení

**Zobrazení:**
- Sloupce (desktop / tablet / mobile)
- Mezera (gap)
- Šipky (ano/ne)
- Tečky (ano/ne)
- Nadpis

**Animace:**
- Autoplay (ano/ne)
- Rychlost autoplay (slider 1000-10000 ms)
- Pauza při hover

### Náhled v editoru

Náhled v editoru zobrazuje skutečné produkty z databáze. Bez odpovídajících produktů blok zobrazí placeholder.

### Filtr renderování

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

## Kompatibilita s blokovými motivy (FSE)

Bloky plně podporují blokové motivy (FSE). Vkládejte je do:

- Šablon stránek (Page Templates)
- Šablon archivů produktů
- Částí šablon (Template Parts) - hlavička, patička, sidebar
- Vzorců (Patterns)

## Stylování bloků

CSS třídy v souladu s konvencí BEM. Bloky podporují nativní nastavení stylů Gutenberg:

- Barvy (text, pozadí)
- Typografie (velikost, tloušťka, rodina fontu)
- Okraje a paddingy (spacing)
- Ohraničení (border)

## Řešení problémů

**Bloky se neobjevují v inserteru** - ujistěte se, že je příslušný modul aktivní v **WooCommerce > Polski > Moduly obchodu**. Bloky vyžadují aktivaci příslušného modulu.

**Náhled bloku je prázdný** - zkontrolujte, zda má obchod produkty odpovídající zvolenému typu. Prázdná databáze produktů nevygeneruje náhled.

**Bloky nefungují v Elementoru** - tyto bloky jsou určeny pro editor Gutenberg. Pro Elementor použijte shortcody nebo dedikované widgety Elementor (dostupné pro AJAX vyhledávač).

Nahlašování problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
