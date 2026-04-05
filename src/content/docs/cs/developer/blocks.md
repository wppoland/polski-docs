---
title: Gutenberg bloky
description: Gutenberg bloky v Polski for WooCommerce - AJAX vyhledavac, AJAX filtry a slider produktu s nahledem v editoru.
---

Tri Gutenberg bloky pro vkladani modulu obchodu. Kazdy blok ma nahled v editoru (server-side render) a konfiguraci v bocnim panelu.

## Pozadavky

- WordPress 6.0 nebo novejsi
- Blokovy editor Gutenberg (ne klasicky editor)
- Aktivni prislusny modul v nastaveních Polski for WooCommerce

## Vkladani bloku

Bloky Polski for WooCommerce naleznete v inserteru bloku (tlacitko **+**) v kategorii **Polski for WooCommerce**. Muzete je take vyhledat po nazvu zadanim "Polski" nebo nazvu modulu.

## Blok: AJAX vyhledavac

**Nazev bloku:** `polski/ajax-search`

Vlozi pole vyhledavani s AJAX naseptavanim. Vysledky se zobrazuji v dropdown behem psani fraze.

### Atributy bloku

| Atribut | Typ | Vychozi | Popis |
| -------------- | ------ | ------------------- | ----------------------------- |
| `placeholder` | string | `Szukaj produktów…` | Zastupny text v poli |
| `width` | string | `100%` | Sirka pole |
| `showIcon` | bool | `true` | Ikona lupy |
| `showCategory` | bool | `false` | Dropdown filtrovani po kategorii |
| `limit` | number | `8` | Limit napovedi |
| `minChars` | number | `3` | Min. znaku k vyhledani |
| `style` | string | `default` | Styl: default, rounded, flat |

### Priklad registrace bloku (interni implementace)

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

### Filtr renderovani

```php
add_filter('polski/blocks/ajax_search/output', function (string $html, array $attributes): string {
    // Uprava HTML bloku
    return $html;
}, 10, 2);
```

## Blok: AJAX filtry

**Nazev bloku:** `polski/ajax-filters`

Vlozi sadu AJAX filtru pro filtrovani seznamu produktu bez znovunacteni stranky.

### Atributy bloku

| Atribut | Typ | Vychozi | Popis |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters` | array | `['category', 'price', 'stock']` | Aktivni filtry |
| `style` | string | `expanded` | Styl: expanded, compact, accordion |
| `showCount` | bool | `true` | Pocitadla produktu |
| `showReset` | bool | `true` | Tlacitko resetovani |
| `columns` | number | `1` | Sloupce filtru |
| `collapsible`| bool | `true` | Sbalitelne sekce |

### Filtr renderovani

```php
add_filter('polski/blocks/ajax_filters/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);
```

## Blok: slider produktu

**Nazev bloku:** `polski/product-slider`

Vlozi karusel produktu s sipkovou navigaci a volitelnymi teckami strankovani.

### Atributy bloku

| Atribut | Typ | Vychozi | Popis |
| --------------- | ------ | --------- | ----------------------------- |
| `type` | string | `latest` | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit` | number | `8` | Limit produktu |
| `columns` | number | `4` | Sloupce desktop |
| `columnsTablet` | number | `2` | Sloupce tablet |
| `columnsMobile` | number | `1` | Sloupce mobile |
| `showArrows` | bool | `true` | Sipky navigace |
| `showDots` | bool | `false` | Tecky strankovani |
| `autoplay` | bool | `false` | Automaticke scrollovani |
| `autoplaySpeed` | number | `5000` | Pauza mezi slajdy (ms) |
| `gap` | string | `16px` | Mezera mezi kartami |
| `title` | string | `` | Hlavicka |

### Filtr renderovani

```php
add_filter('polski/blocks/product_slider/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);

// Uprava dotazu produktu
add_filter('polski/blocks/product_slider/query_args', function (array $args, array $attributes): array {
    $args['tax_query'][] = [
        'taxonomy' => 'product_cat',
        'field'    => 'slug',
        'terms'    => 'ukryte',
        'operator' => 'NOT IN',
    ];
    return $args;
}, 10, 2);
```

## Kompatibilita s blokovymi motivy (FSE)

Bloky Polski for WooCommerce funguji plne s blokovymi motivy (Full Site Editing). Lze je vkladat do sablon stranek, sablon archivu produktu, casti sablon a vzorcu (Patterns).

## Reseni problemu

**Bloky se nezobrazuji v inserteru** - ujistete se, ze prislusny modul je aktivni v **WooCommerce > Polski > Moduly obchodu**.

**Nahled bloku je prazdny** - zkontrolujte, zda obchod ma produkty odpovidajici zvolenemu typu.

**Bloky nefunguji v Elementoru** - tyto bloky jsou urceny pro editor Gutenberg. Pro Elementor pouzijte shortcody.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
