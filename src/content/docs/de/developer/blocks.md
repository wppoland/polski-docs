---
title: Gutenberg-Bloecke
description: Gutenberg-Bloecke in Polski for WooCommerce - AJAX-Suche, AJAX-Filter und Produktslider mit Vorschau im Editor.
---

Polski for WooCommerce stellt drei Gutenberg-Bloecke zum Einfuegen von Shop-Modulen im Block-Editor bereit. Jeder Block bietet eine Vorschau im Editor (Server-Side Render) und vollstaendige Konfiguration im Seitenpanel.

## Anforderungen

- WordPress 6.0 oder neuer
- Block-Editor Gutenberg (nicht der klassische Editor)
- Aktives entsprechendes Modul in den Einstellungen von Polski for WooCommerce

## Bloecke einfuegen

Die Bloecke von Polski for WooCommerce finden Sie im Block-Inserter (Button **+**) in der Kategorie **Polski for WooCommerce**. Sie koennen sie auch nach Namen suchen, indem Sie "Polski" oder den Modulnamen eingeben.

## Block: AJAX-Suche

**Blockname:** `polski/ajax-search`

Fuegt ein Suchfeld mit AJAX-Vorschlaegen ein. Ergebnisse erscheinen waehrend der Eingabe in einem Dropdown.

### Block-Attribute

| Attribut        | Typ    | Standard          | Beschreibung                          |
| -------------- | ------ | ------------------- | ----------------------------- |
| `placeholder`  | string | `Produkte suchen...` | Platzhaltertext im Feld        |
| `width`        | string | `100%`              | Feldbreite                |
| `showIcon`     | bool   | `true`              | Lupensymbol                    |
| `showCategory` | bool   | `false`             | Kategoriefilter-Dropdown |
| `limit`        | number | `8`                 | Vorschlagslimit             |
| `minChars`     | number | `3`                 | Min. Zeichen zum Suchen     |
| `style`        | string | `default`           | Stil: default, rounded, flat  |

### Render-Filter

```php
add_filter('polski/blocks/ajax_search/output', function (string $html, array $attributes): string {
    // Block-HTML aendern
    return $html;
}, 10, 2);
```

## Block: AJAX-Filter

**Blockname:** `polski/ajax-filters`

Fuegt einen Satz AJAX-Filter zum Filtern der Produktliste ohne Seitenneuladung ein.

### Block-Attribute

| Attribut      | Typ    | Standard  | Beschreibung                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | array  | `['category', 'price', 'stock']` | Aktive Filter |
| `style`      | string | `expanded` | Stil: expanded, compact, accordion |
| `showCount`  | bool   | `true`     | Produktzaehler            |
| `showReset`  | bool   | `true`     | Reset-Button          |
| `columns`    | number | `1`        | Filterspalten               |
| `collapsible`| bool   | `true`     | Zuklappbare Abschnitte                |

### Platzierung in der Seitenleiste

Der AJAX-Filterblock eignet sich am besten in der Seitenleiste der Shopseite. In einem Block-Theme (FSE) fuegen Sie ihn zum Template **Archiv: Produkt** in der Seitenspalte hinzu.

## Block: Produktslider

**Blockname:** `polski/product-slider`

Fuegt ein Produktkarussell mit Pfeilnavigation und optionalen Paginierungspunkten ein.

### Block-Attribute

| Attribut         | Typ    | Standard | Beschreibung                          |
| --------------- | ------ | --------- | ----------------------------- |
| `type`          | string | `latest`  | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | number | `8`       | Produktlimit               |
| `columns`       | number | `4`       | Desktop-Spalten               |
| `columnsTablet` | number | `2`       | Tablet-Spalten                |
| `columnsMobile` | number | `1`       | Mobile-Spalten                |
| `showArrows`    | bool   | `true`    | Navigationspfeile            |
| `showDots`      | bool   | `false`   | Paginierungspunkte              |
| `autoplay`      | bool   | `false`   | Automatisches Scrollen      |
| `autoplaySpeed` | number | `5000`    | Pause zwischen Slides (ms)  |
| `gap`           | string | `16px`    | Abstand zwischen Karten         |
| `title`         | string | ``        | Ueberschrift                      |

### Vorschau im Editor

Der Block rendert eine Slider-Vorschau direkt im Gutenberg-Editor (Server-Side Render). Die Vorschau zeigt echte Produkte aus der Datenbank.

### Render-Filter

```php
add_filter('polski/blocks/product_slider/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);

// Produktabfrage aendern
add_filter('polski/blocks/product_slider/query_args', function (array $args, array $attributes): array {
    // Produkte aus der Kategorie "versteckt" ausschliessen
    $args['tax_query'][] = [
        'taxonomy' => 'product_cat',
        'field'    => 'slug',
        'terms'    => 'ukryte',
        'operator' => 'NOT IN',
    ];
    return $args;
}, 10, 2);
```

## Kompatibilitaet mit Block-Themes (FSE)

Die Bloecke von Polski for WooCommerce funktionieren vollstaendig mit Block-Themes (Full Site Editing). Sie koennen eingefuegt werden in:

- Seitenvorlagen (Page Templates)
- Produktarchiv-Vorlagen
- Vorlagenteilen (Template Parts) - Header, Footer, Sidebar
- Mustern (Patterns)

## Fehlerbehebung

**Bloecke erscheinen nicht im Inserter** - stellen Sie sicher, dass das entsprechende Modul unter **WooCommerce > Polski > Shop-Module** aktiv ist.

**Block-Vorschau ist leer** - pruefen Sie, ob der Shop Produkte hat, die zum gewaehlten Typ passen.

**Bloecke funktionieren nicht in Elementor** - diese Bloecke sind fuer den Gutenberg-Editor gedacht. Fuer Elementor verwenden Sie Shortcodes oder dedizierte Elementor-Widgets.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
