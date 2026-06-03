---
title: Gutenberg-Blöcke
description: Gutenberg-Blöcke in Polski for WooCommerce - AJAX-Suche, AJAX-Filter und Produkt-Slider mit Vorschau im Editor.
---

Drei Gutenberg-Blöcke zum Einfügen von Shop-Modulen. Jeder Block hat eine Vorschau im Editor (server-side render) und eine Konfiguration im Seitenpanel.

## Anforderungen

- WordPress 6.0 oder neuer
- Gutenberg-Blockeditor (nicht der klassische Editor)
- Aktives entsprechendes Modul in den Einstellungen von Polski for WooCommerce

## Blöcke einfügen

Finden Sie die Blöcke im Inserter (Schaltfläche **+**) in der Kategorie **Polski for WooCommerce**. Oder suchen Sie, indem Sie "Polski" eingeben.

## Block: AJAX-Suche

**Blockname:** `polski/ajax-search`

Suchfeld mit AJAX-Vorschlägen. Die Ergebnisse erscheinen während der Eingabe in einem Dropdown.

### Blockattribute

| Attribut        | Typ    | Standard          | Beschreibung                          |
| -------------- | ------ | ------------------- | ----------------------------- |
| `placeholder`  | string | `Produkte suchen…` | Platzhaltertext im Feld        |
| `width`        | string | `100%`              | Breite des Feldes                |
| `showIcon`     | bool   | `true`              | Lupensymbol                    |
| `showCategory` | bool   | `false`             | Dropdown zum Filtern nach Kategorie |
| `limit`        | number | `8`                 | Limit der Vorschläge             |
| `minChars`     | number | `3`                 | Min. Zeichen für die Suche     |
| `style`        | string | `default`           | Stil: default, rounded, flat  |

### Seitenpanel (Inspector Controls)

Das Seitenpanel des Blocks enthält Abschnitte:

**Sucheinstellungen:**
- Platzhaltertext (placeholder)
- Minimale Zeichenanzahl
- Ergebnislimit
- Kategoriefilter (ja/nein)

**Aussehen:**
- Breite des Feldes
- Stil (Standard, abgerundet, flach)
- Lupensymbol (ja/nein)
- Rahmen (ja/nein)
- Schatten (ja/nein)

**Erweitert:**
- Zusätzliche CSS-Klassen
- HTML-Anchor (Anker)

### Beispiel für die Blockregistrierung (interne Implementierung)

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
            'default' => __('Produkte suchen…', 'polski'),
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

### Render-Filter

```php
add_filter('polski/blocks/ajax_search/output', function (string $html, array $attributes): string {
    // Modifikation des Block-HTML
    return $html;
}, 10, 2);
```

## Block: AJAX-Filter

**Blockname:** `polski/ajax-filters`

AJAX-Filter zum Filtern von Produkten ohne Neuladen der Seite.

### Blockattribute

| Attribut      | Typ    | Standard  | Beschreibung                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | array  | `['category', 'price', 'stock']` | Aktive Filter |
| `style`      | string | `expanded` | Stil: expanded, compact, accordion |
| `showCount`  | bool   | `true`     | Produktzähler            |
| `showReset`  | bool   | `true`     | Reset-Schaltfläche          |
| `columns`    | number | `1`        | Filterspalten               |
| `collapsible`| bool   | `true`     | Einklappbare Abschnitte                |

### Seitenpanel

**Filterauswahl:**
- Checkboxen für jeden Filtertyp
- Drag & Drop zum Sortieren der Filterreihenfolge
- Konfiguration pro Filter (z. B. Preisbereiche)

**Aussehen:**
- Anzeigestil (ausgeklappt, kompakt, Akkordeon)
- Anzahl der Spalten
- Zähler (ja/nein)
- Reset-Schaltfläche (ja/nein)
- Standardmäßig eingeklappt/ausgeklappt

**Erweitert:**
- AJAX-Modus / GET-Fallback
- Zusätzliche CSS-Klassen

### Verfügbare Filter

Der Block erkennt die verfügbaren Filter automatisch anhand der Produktdaten:

| Filter       | Typ          | Beschreibung                          |
| ----------- | ------------ | ----------------------------- |
| `category`  | Hierarchie   | Produktkategorien           |
| `price`     | Range-Slider | Preisbereich                 |
| `stock`     | Checkbox     | Lagerstatus             |
| `sale`      | Checkbox     | Nur im Angebot              |
| `brand`     | Liste        | Hersteller/Marke               |
| `pa_*`      | Liste/Swatch | Produktattribute            |
| `rating`    | Sterne       | Kundenbewertung                 |

### Render-Filter

```php
add_filter('polski/blocks/ajax_filters/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);
```

### Platzierung in der Sidebar

Funktioniert am besten in der Sidebar. In einem Block-Theme (FSE) fügen Sie ihn dem Template **Archive: Product** hinzu. In klassischen Themes verwenden Sie ihn in den Widgets der **Shop-Sidebar**.

## Block: Produkt-Slider

**Blockname:** `polski/product-slider`

Produktkarussell mit Pfeilnavigation und optionalen Paginierungspunkten.

### Blockattribute

| Attribut         | Typ    | Standard | Beschreibung                          |
| --------------- | ------ | --------- | ----------------------------- |
| `type`          | string | `latest`  | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | number | `8`       | Produktlimit               |
| `columns`       | number | `4`       | Spalten Desktop               |
| `columnsTablet` | number | `2`       | Spalten Tablet                |
| `columnsMobile` | number | `1`       | Spalten Mobil                |
| `category`      | string | ``        | Kategorie-Slug                |
| `productIds`    | array  | `[]`      | Produkt-IDs                  |
| `showArrows`    | bool   | `true`    | Navigationspfeile            |
| `showDots`      | bool   | `false`   | Paginierungspunkte             |
| `autoplay`      | bool   | `false`   | Automatisches Scrollen      |
| `autoplaySpeed` | number | `5000`    | Pause zwischen den Slides (ms)  |
| `gap`           | string | `16px`    | Abstand zwischen den Karten         |
| `title`         | string | ``        | Überschrift                      |
| `orderby`       | string | `date`    | Sortierung                    |
| `order`         | string | `DESC`    | Richtung                      |

### Seitenpanel

**Produktquelle:**
- Slider-Typ (Dropdown mit Optionen)
- Kategorieauswahl (für type=category)
- Produktauswahl (für type=ids) - Suche mit Autovervollständigung
- Produktlimit
- Sortierung

**Anzeige:**
- Spalten (Desktop / Tablet / Mobil)
- Abstand (gap)
- Pfeile (ja/nein)
- Punkte (ja/nein)
- Überschrift

**Animation:**
- Autoplay (ja/nein)
- Autoplay-Geschwindigkeit (Slider 1000-10000 ms)
- Pause bei Hover

### Vorschau im Editor

Die Vorschau im Editor zeigt echte Produkte aus der Datenbank. Ohne passende Produkte zeigt der Block einen Platzhalter an.

### Render-Filter

```php
add_filter('polski/blocks/product_slider/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);

// Modifikation der Produktabfrage
add_filter('polski/blocks/product_slider/query_args', function (array $args, array $attributes): array {
    // Produkte aus der Kategorie "versteckt" ausschließen
    $args['tax_query'][] = [
        'taxonomy' => 'product_cat',
        'field'    => 'slug',
        'terms'    => 'ukryte',
        'operator' => 'NOT IN',
    ];
    return $args;
}, 10, 2);
```

## Kompatibilität mit Block-Themes (FSE)

Die Blöcke unterstützen Block-Themes (FSE) vollständig. Fügen Sie sie ein in:

- Seitenvorlagen (Page Templates)
- Vorlagen für Produktarchive
- Vorlagenteilen (Template Parts) - Kopfzeile, Fußzeile, Sidebar
- Mustern (Patterns)

## Styling der Blöcke

CSS-Klassen gemäß BEM-Konvention. Die Blöcke unterstützen die nativen Stileinstellungen von Gutenberg:

- Farben (Text, Hintergrund)
- Typografie (Größe, Stärke, Schriftfamilie)
- Außen- und Innenabstände (spacing)
- Rahmen (border)

## Fehlerbehebung

**Die Blöcke erscheinen nicht im Inserter** - stellen Sie sicher, dass das entsprechende Modul unter **WooCommerce > Polski > Shop-Module** aktiv ist. Die Blöcke erfordern die Aktivierung des entsprechenden Moduls.

**Die Blockvorschau ist leer** - prüfen Sie, ob der Shop Produkte hat, die zum gewählten Typ passen. Eine leere Produktdatenbank erzeugt keine Vorschau.

**Die Blöcke funktionieren nicht in Elementor** - diese Blöcke sind für den Gutenberg-Editor bestimmt. Für Elementor verwenden Sie Shortcodes oder dedizierte Elementor-Widgets (verfügbar für die AJAX-Suche).

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
