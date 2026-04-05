---
title: AJAX-Suche
description: AJAX-Suchmodul in Polski for WooCommerce - Suche nach SKU, Hersteller, GTIN, REST-Endpunkt, Gutenberg-Block, Elementor-Widget und Shortcode.
---

Die AJAX-Suche ersetzt die Standard-WooCommerce-Suche durch eine intelligente Suche mit Echtzeit-Vorschlaegen. Ergebnisse erscheinen sofort waehrend der Eingabe - ohne Seitenneuladung.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie die Option **AJAX-Suche**. Das Modul ersetzt automatisch das Standard-WooCommerce-Such-Widget.

## Durchsuchte Felder

Die Suche durchsucht mehrere Produktfelder gleichzeitig:

### SKU (Artikelnummer)

Kunden koennen die SKU-Nummer eines Produkts oder einen Teil davon eingeben. Die SKU-Suche ist besonders nuetzlich in B2B-Shops, in denen Kunden Produkte nach Katalognummern bestellen.

### Hersteller

Wenn das Modul **Hersteller** aktiv ist, beruecksichtigt die Suche den Herstellernamen in den Ergebnissen.

### GTIN (EAN/UPC)

Suche nach GTIN/EAN/UPC-Barcodes. Kunden koennen den vollstaendigen Barcode oder einen Teil davon eingeben.

### Zusaetzliche Felder

- Produktname
- Kurzbeschreibung
- Kategorien
- Tags
- Attribute (Farbe, Groesse usw.)

## Suchergebnisse

Das Dropdown mit Ergebnissen zeigt:

- Produktminiatur
- Produktname (mit Hervorhebung passender Fragmente)
- Preis
- Kategorie
- Bewertung (Sterne)
- Verfuegbarkeitsstatus

Standardmaessig werden bis zu **8 Vorschlaege** angezeigt. Das Limit kann geaendert werden:

```php
add_filter('polski/ajax_search/results_limit', function (): int {
    return 12;
});
```

Minimale Zeichenzahl zum Start der Suche ist **3**. Aenderung:

```php
add_filter('polski/ajax_search/min_chars', function (): int {
    return 2;
});
```

## REST-API-Endpunkt

Die Suche nutzt einen eigenen REST-API-Endpunkt statt `admin-ajax.php`, was bessere Leistung gewaehrleistet.

**Endpunkt:** `GET /wp-json/polski/v1/search`

**Parameter:**

| Parameter | Typ    | Erforderlich | Beschreibung                          |
| -------- | ------ | -------- | ----------------------------- |
| `q`      | string | Ja      | Suchbegriff            |
| `limit`  | int    | Nein      | Ergebnislimit (Standard 8)   |
| `cat`    | int    | Nein      | Kategorie-ID zum Filtern   |

**Beispielanfrage:**

```bash
curl "https://ihrshop.pl/wp-json/polski/v1/search?q=tshirt&limit=5"
```

**Beispielantwort:**

```json
{
  "results": [
    {
      "id": 123,
      "title": "Baumwoll-T-Shirt",
      "url": "https://ihrshop.pl/produkt/baumwoll-tshirt/",
      "image": "https://ihrshop.pl/wp-content/uploads/tshirt.jpg",
      "price_html": "<span class=\"amount\">49,00&nbsp;PLN</span>",
      "category": "Bekleidung",
      "in_stock": true,
      "rating": 4.5
    }
  ],
  "total": 1,
  "query": "tshirt"
}
```

## Gutenberg-Block

Das Modul stellt den Block **Polski - AJAX-Suche** im Gutenberg-Editor bereit. Der Block kann in jedem Beitrag, jeder Seite oder jedem Widget platziert werden.

## Shortcode `[polski_ajax_search]`

### Parameter

| Parameter      | Typ    | Standard          | Beschreibung                               |
| ------------- | ------ | ------------------- | ---------------------------------- |
| `placeholder` | string | `Produkte suchen...` | Platzhaltertext                    |
| `width`       | string | `100%`              | Feldbreite                     |
| `show_icon`   | string | `yes`               | Lupensymbol anzeigen                |
| `show_cat`    | string | `no`                | Kategoriefilter anzeigen           |
| `limit`       | int    | `8`                 | Maximale Vorschlaege      |

### Verwendungsbeispiel

```html
[polski_ajax_search placeholder="Was suchen Sie?" show_cat="yes" limit="10"]
```

## Debouncing und Leistung

Die Suche verwendet ein Debouncing von 300 ms - die Anfrage an den Server wird erst 300 ms nach dem letzten Tastendruck gesendet. Dies verhindert uebermassig viele Anfragen beim schnellen Tippen.

Ergebnisse werden clientseitig in der Browser-Sitzung gecacht. Erneute Eingabe desselben Begriffs generiert keine Serveranfrage.

Serverseitig werden Ergebnisse in der WordPress Transient API gecacht (Standard 1 Stunde). Der Cache wird nach dem Speichern, Hinzufuegen oder Loeschen eines Produkts automatisch geleert.

```php
// Cache-Zeit aendern
add_filter('polski/ajax_search/cache_ttl', function (): int {
    return 1800; // 30 Minuten in Sekunden
});
```

## CSS-Styling

CSS-Klassen des Moduls:

- `.polski-ajax-search` - Suchcontainer
- `.polski-ajax-search__input` - Textfeld
- `.polski-ajax-search__results` - Ergebnis-Dropdown
- `.polski-ajax-search__item` - Einzelnes Ergebnis
- `.polski-ajax-search__item--active` - Hervorgehobenes Ergebnis (Tastaturnavigation)
- `.polski-ajax-search__highlight` - Hervorhebung des passenden Fragments
- `.polski-ajax-search__loading` - Lade-Spinner

## Barrierefreiheit

Die Suche unterstuetzt vollstaendige Tastaturnavigation:

- **Pfeil runter/hoch** - Navigation durch Ergebnisse
- **Enter** - Zum gewaehlten Produkt gehen
- **Escape** - Dropdown schliessen
- ARIA-Attribute: `role="combobox"`, `aria-expanded`, `aria-activedescendant`

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
