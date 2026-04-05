---
title: AJAX-Filter
description: AJAX-Filtermodul in Polski for WooCommerce - Filterung nach Kategorien, Marken, Preis, Lagerbestand, Sale, Attributen, GET-Fallback, Gutenberg-Block und Shortcode.
---

AJAX-Filter ermoeglichen es Kunden, die Produktliste ohne Seitenneuladung einzugrenzen. Die Filterung erfolgt sofort - Produkte aktualisieren sich in Echtzeit nach Auswahl der Kriterien.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie die Option **AJAX-Filter**. Das Modul stellt Filter als Gutenberg-Block, Shortcode und Widget bereit.

## Verfuegbare Filtertypen

### Kategorien

Hierarchischer Filter mit aufklappbarem Kategoriebaum. Die Produktanzahl wird neben jeder Kategorie angezeigt. Leere Kategorien sind standardmaessig ausgeblendet.

Optionen:
- Anzeige als Baum oder flache Liste
- Mehrfachauswahl (Checkboxen) oder Einzelauswahl (Radio)
- Auf-/Zuklappen von Unterkategorien

### Marken (Hersteller)

Filter nach Hersteller/Marke. Erfordert aktives Modul **Hersteller** in Polski for WooCommerce. Zeigt eine Markenliste mit Produktanzahl an.

### Preis

Preisspannen-Schieberegler (Range Slider) mit Min/Max-Feldern. Der Bereich passt sich automatisch an die aktuell angezeigten Produkte an.

Optionen:
- Schieberegler (Slider)
- Textfelder Min/Max
- Preisintervalle (z.B. 0-50 PLN, 50-100 PLN, 100+ PLN)

Konfiguration der Preisintervalle:

```php
add_filter('polski/ajax_filters/price_ranges', function (): array {
    return [
        ['min' => 0, 'max' => 50, 'label' => 'Bis 50 PLN'],
        ['min' => 50, 'max' => 100, 'label' => '50 - 100 PLN'],
        ['min' => 100, 'max' => 200, 'label' => '100 - 200 PLN'],
        ['min' => 200, 'max' => 0, 'label' => 'Ueber 200 PLN'],
    ];
});
```

### Lagerbestand

Filter zur Anzeige nur verfuegbarer Produkte. Optionen:

- **Auf Lager** - Produkte mit `stock_status = instock`
- **Auf Bestellung** - Produkte mit `stock_status = onbackorder`
- **Nicht verfuegbar** - Produkte mit `stock_status = outofstock` (standardmaessig ausgeblendet)

### Sale

Checkbox **Nur Produkte im Angebot** - filtert ausschliesslich Produkte mit aktivem Aktionspreis.

### Produktattribute

Dynamische Filter, automatisch generiert basierend auf WooCommerce-Attributen (Farbe, Groesse, Material usw.). Jedes globale Attribut kann als Filter verwendet werden.

Anzeigetypen der Attribute:
- **Checkbox-Liste** - Standard
- **Farbfelder** - fuer Attribute mit eingestellten Farben
- **Buttons** - kompakte Auswahl (z.B. Groessen S, M, L, XL)
- **Dropdown** - Auswahlliste

## AJAX-Funktionsweise

Nach Aenderung eines beliebigen Filters:

1. Eine AJAX-Anfrage mit den gewaehlten Parametern wird gesendet
2. Ein dezenter Spinner/Skeleton wird auf der Produktliste angezeigt
3. Die Produktliste aktualisiert sich ohne Seitenneuladung
4. Produktzaehler in den Filtern aktualisieren sich
5. Nicht verfuegbare Filteroptionen werden ausgegraut (aber nicht ausgeblendet)
6. Die URL im Browser aktualisiert sich mit GET-Parametern (History API)

## GET-Fallback (ohne JavaScript)

Das Modul unterstuetzt einen Fallback-Modus ohne JavaScript. Wenn JS deaktiviert oder nicht verfuegbar ist:

- Filter funktionieren als Standard-HTML-Formular mit GET-Parametern
- Nach Absenden wird die Seite mit gefilterter Produktliste neu geladen
- Filterparameter werden in der URL gespeichert, z.B.: `?pa_color=red&min_price=50&max_price=200`
- Gefilterte URLs sind SEO-freundlich und koennen von Suchmaschinen indexiert werden

Der Fallback-Modus funktioniert automatisch - keine zusaetzliche Konfiguration erforderlich.

## Gutenberg-Block

Der Block **Polski - AJAX-Filter** ist im Gutenberg-Editor verfuegbar. Platzieren Sie ihn in der Seitenleiste (Sidebar) der Shop-Seite.

Blockoptionen:

- **Filtertypen** - Auswahl, welche Filter angezeigt werden
- **Reihenfolge** - Drag & Drop Sortierung
- **Stil** - kompakt, erweitert, Akkordeon
- **Reset-Button** - Zeige/Verberge "Filter zuruecksetzen"-Button
- **Zaehler** - Zeige/Verberge Produktanzahl bei jeder Option
- **Zuklappen** - Standardmaessig zu-/aufgeklappt

## Shortcode `[polski_ajax_filters]`

### Parameter

| Parameter     | Typ    | Standard | Beschreibung                                          |
| ------------ | ------ | --------- | --------------------------------------------- |
| `filters`    | string | `all`     | Filtertypen (durch Komma getrennt)          |
| `style`      | string | `expanded`| Stil: `expanded`, `compact`, `accordion`      |
| `show_count` | string | `yes`     | Produktzaehler anzeigen                      |
| `show_reset` | string | `yes`     | Reset-Button anzeigen                    |
| `columns`    | int    | `1`       | Anzahl der Filterspalten                          |
| `ajax`       | string | `yes`     | AJAX-Modus (no = nur GET)                     |

### Verwendungsbeispiel

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion" show_count="yes"]
```

## Leistung

Filterabfragen nutzen WooCommerce-Datenbankindizes (`product_meta_lookup`). Fuer Shops mit vielen Produkten (10.000+) wird die Verwendung von Object Cache (Redis/Memcached) empfohlen.

Filterergebnisse werden in der Transient API mit einem auf dem Hash der Filterparameter basierenden Schluessel gecacht. Der Cache wird bei Preis-, Lagerbestands- oder Attributaenderungen geleert.

## CSS-Styling

- `.polski-ajax-filters` - Filtercontainer
- `.polski-ajax-filters__section` - Einzelner Filterabschnitt
- `.polski-ajax-filters__title` - Abschnittstitel
- `.polski-ajax-filters__option` - Filteroption (Checkbox/Radio)
- `.polski-ajax-filters__count` - Produktzaehler
- `.polski-ajax-filters__reset` - Reset-Button
- `.polski-ajax-filters__active` - Leiste aktiver Filter

## Fehlerbehebung

**Filter aktualisieren die Produktliste nicht** - stellen Sie sicher, dass der CSS-Selektor der Produktliste korrekt ist. Standardmaessig sucht das Modul nach `.products` oder `ul.products`. Benutzerdefinierte Themes verwenden moeglicherweise einen anderen Selektor.

**Zaehler zeigen 0** - pruefen Sie, ob Produkten Attribute, Kategorien und Lagerbestand zugewiesen sind. Ein leeres Attribut wird nicht gezaehlt.

**Preisschieberegler funktioniert nicht** - pruefen Sie, ob auf der Seite kein Konflikt mit jQuery UI aus einem anderen Plugin besteht.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
