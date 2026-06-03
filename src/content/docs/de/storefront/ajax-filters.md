---
title: AJAX Filter
description: AJAX-Filter-Modul in Polski for WooCommerce - Filtern nach Kategorien, Marken, Preis, Lagerbestaenden, Sale, Attributen, GET-Fallback, Gutenberg-Block und Shortcode.
---

AJAX Filter ermoeglichen es Kunden, die Produktliste ohne Neuladen der Seite einzugrenzen. Die Produkte aktualisieren sich live nach der Auswahl der Filter.

## Aktivierung des Moduls

Gehe zu **WooCommerce > Polski > Shop-Module** und aktiviere **AJAX Filter**. Die Filter sind als Gutenberg-Block, Shortcode und Widget verfuegbar.

![AJAX Filter, Wunschliste und Vergleich auf der Shop-Seite](../../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

## Verfuegbare Filtertypen

### Kategorien

Aufklappbarer Kategorienbaum mit der Produktanzahl neben jeder Kategorie. Leere Kategorien sind standardmaessig ausgeblendet.

Optionen:
- Anzeige als Baum oder flache Liste
- Mehrfachauswahl (Checkboxen) oder Einzelauswahl (Radio)
- Ein-/Ausklappen von Unterkategorien

### Marken (Hersteller)

Filter nach Marke. Erfordert das aktive Modul **Hersteller**. Zeigt eine Liste der Marken mit der Produktanzahl.

### Preis

Preisbereichs-Schieberegler mit Min-/Max-Feldern. Der Bereich passt sich an die aktuell sichtbaren Produkte an.

Optionen:
- Schieberegler (Slider)
- Textfelder Min/Max
- Preisbereiche (z. B. 0-50 zl, 50-100 zl, 100+ zl)

Konfiguration der Preisbereiche:

```php
add_filter('polski/ajax_filters/price_ranges', function (): array {
    return [
        ['min' => 0, 'max' => 50, 'label' => 'Bis 50 zl'],
        ['min' => 50, 'max' => 100, 'label' => '50 - 100 zl'],
        ['min' => 100, 'max' => 200, 'label' => '100 - 200 zl'],
        ['min' => 200, 'max' => 0, 'label' => 'Ueber 200 zl'],
    ];
});
```

### Lagerbestand

Filtern nach Verfuegbarkeit. Optionen:

- **Auf Lager** - Produkte mit `stock_status = instock`
- **Auf Bestellung** - Produkte mit `stock_status = onbackorder`
- **Nicht verfuegbar** - Produkte mit `stock_status = outofstock` (standardmaessig ausgeblendet)

### Sale

Checkbox **Nur Produkte im Angebot** - zeigt ausschliesslich Produkte mit Angebotspreis.

### Produktattribute

Filter werden automatisch aus den WooCommerce-Attributen generiert (Farbe, Groesse, Material usw.). Jedes globale Attribut kann ein Filter sein.

Anzeigetypen der Attribute:
- **Liste mit Checkboxen** - Standard
- **Farb-Swatches** - fuer Attribute mit eingestellten Farben
- **Buttons** - kompakte Auswahl (z. B. Groessen S, M, L, XL)
- **Dropdown** - aufklappbare Liste

## AJAX-Funktionsweise

Nach der Aenderung eines beliebigen Filters:

1. Eine AJAX-Anfrage mit den ausgewaehlten Parametern wird gesendet
2. Ein dezenter Spinner/Skeleton wird auf der Produktliste angezeigt
3. Die Produktliste aktualisiert sich ohne Neuladen der Seite
4. Die Produktzaehler in den Filtern aktualisieren sich
5. Nicht verfuegbare Filteroptionen werden ausgegraut (aber nicht ausgeblendet)
6. Die URL im Browser aktualisiert sich mit GET-Parametern (History API)

## GET-Fallback (ohne JavaScript)

Wenn JavaScript deaktiviert ist, funktionieren die Filter als normales HTML-Formular mit GET-Parametern. Die Seite laedt mit der gefilterten Liste neu. Die Parameter werden in der URL gespeichert (z. B. `?pa_color=red&min_price=50&max_price=200`), was SEO-freundlich ist.

Der Fallback-Modus funktioniert automatisch - ohne zusaetzliche Konfiguration.

## Gutenberg-Block

Der Block **Polski - AJAX Filter** ist im Gutenberg-Editor verfuegbar. Platziere ihn in der Seitenleiste (Sidebar) der Shop-Seite.

Optionen des Blocks:

- **Filtertypen** - Auswahl, welche Filter angezeigt werden
- **Reihenfolge der Filter** - Drag-and-Drop-Sortierung
- **Stil** - kompakt, erweitert, Akkordeon
- **Reset-Button** - Schaltflaeche "Filter zuruecksetzen" anzeigen/ausblenden
- **Zaehler** - Produktanzahl bei jeder Option anzeigen/ausblenden
- **Einklappen** - Abschnitte standardmaessig eingeklappt/ausgeklappt

## Shortcode `[polski_ajax_filters]`

### Parameter

| Parameter     | Typ    | Standard | Beschreibung                                  |
| ------------ | ------ | --------- | --------------------------------------------- |
| `filters`    | string | `all`     | Filtertypen (durch Komma getrennt)             |
| `style`      | string | `expanded`| Stil: `expanded`, `compact`, `accordion`      |
| `show_count` | string | `yes`     | Produktzaehler anzeigen                       |
| `show_reset` | string | `yes`     | Reset-Button anzeigen                         |
| `columns`    | int    | `1`       | Anzahl der Filterspalten                       |
| `ajax`       | string | `yes`     | AJAX-Modus (no = nur GET)                     |

### Anwendungsbeispiel

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion" show_count="yes"]
```

### Filtern nur nach Attributen

```html
[polski_ajax_filters filters="pa_color,pa_size,pa_material" style="compact"]
```

### Platzierung in der Theme-Sidebar

In der Datei `sidebar.php` oder in den Widgets:

```php
echo do_shortcode('[polski_ajax_filters filters="category,price,stock,sale"]');
```

## Integration mit der Paginierung

Die Filter arbeiten mit der WooCommerce-Paginierung zusammen. Nach der Aenderung eines Filters wird zu Seite 1 zurueckgekehrt. Der Wechsel zwischen Seiten setzt die Filter nicht zurueck.

## Aktive Filter

Ueber der Produktliste werden die aktiven Filter als Tags (Chips) angezeigt. Klicke auf das X eines Tags, um den Filter zu entfernen. Die Schaltflaeche **Alle zuruecksetzen** setzt alle Filter auf einmal zurueck.

```php
// Aenderung der Position der Leiste mit aktiven Filtern
add_filter('polski/ajax_filters/active_position', function (): string {
    return 'above_products'; // oder 'below_filters', 'both'
});
```

## Leistung

Die Filter nutzen die Datenbankindizes von WooCommerce (`product_meta_lookup`). Fuer Shops mit 10 000+ Produkten wird ein Object Cache (Redis/Memcached) empfohlen.

Die Ergebnisse werden in der Transient API zwischengespeichert. Der Cache wird bei Aenderung von Preis, Lagerbestand oder Produktattributen geleert.

## CSS-Styling

- `.polski-ajax-filters` - Container der Filter
- `.polski-ajax-filters__section` - Abschnitt eines einzelnen Filters
- `.polski-ajax-filters__title` - Ueberschrift des Abschnitts
- `.polski-ajax-filters__option` - Filteroption (Checkbox/Radio)
- `.polski-ajax-filters__count` - Produktzaehler
- `.polski-ajax-filters__reset` - Reset-Button
- `.polski-ajax-filters__active` - Leiste der aktiven Filter

## Fehlerbehebung

**Die Filter aktualisieren die Produktliste nicht** - pruefe den CSS-Selektor der Produktliste. Das Modul sucht nach `.products` oder `ul.products`. Dein Theme verwendet moeglicherweise einen anderen Selektor.

**Die Zaehler zeigen 0** - pruefe, ob den Produkten Attribute, Kategorien und Lagerbestand zugewiesen sind.

**Der Preis-Schieberegler funktioniert nicht** - moeglicher Konflikt mit jQuery UI aus einem anderen Plugin.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschliesslich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
