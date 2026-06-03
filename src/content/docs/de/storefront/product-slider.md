---
title: Produkt-Slider
description: Produkt-Slider-Modul in Polski for WooCommerce - Scroll-Snap, ähnliche, reduzierte und empfohlene Produkte, Gutenberg-Block und Shortcode.
---

Der Slider zeigt ein Produktkarussell mit flüssigem Scrollen auf Basis von CSS Scroll-Snap. Er benötigt keine externen JS-Bibliotheken (Slick, Swiper) und nutzt die nativen Mechanismen des Browsers.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie **Produkt-Slider**.

## Scroll-Snap-Technologie

Der Slider nutzt CSS `scroll-snap-type: x mandatory` anstelle von Karussell-Bibliotheken. Vorteile:

- **Kein JavaScript zum Scrollen** - flüssiges natives Scrollen
- **Keine Abhängigkeiten** - kein Laden von Slick, Swiper oder Owl Carousel nötig
- **Vollständig responsiv** - automatische Anpassung an die Bildschirmbreite
- **Touch und Maus** - native Unterstützung für Swipe auf Touch-Geräten
- **Leistung** - kein Reflow/Repaint beim Scrollen, 60 FPS

Snap-Konfiguration:

```css
/* Der Slider verwendet standardmäßig diese Werte */
.polski-slider {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
}

.polski-slider__item {
    scroll-snap-align: start;
}
```

## Slider-Typen

### Ähnliche Produkte (related)

Produkte, die mit dem aktuell betrachteten verwandt sind, ausgewählt anhand von Kategorien und Tags.

```html
[polski_product_slider type="related" product_id="123"]
```

### Reduzierte Produkte (sale)

Produkte mit aktivem Aktionspreis.

```html
[polski_product_slider type="sale" limit="12"]
```

### Empfohlene Produkte (featured)

Produkte, die als empfohlen markiert sind (Stern im WooCommerce-Panel).

```html
[polski_product_slider type="featured" limit="8"]
```

### Bestseller

Produkte sortiert nach Verkaufszahl.

```html
[polski_product_slider type="bestsellers" limit="10"]
```

### Neueste

Produkte sortiert nach Hinzufügedatum.

```html
[polski_product_slider type="latest" limit="10"]
```

### Aus einer ausgewählten Kategorie

Produkte aus einer bestimmten Kategorie.

```html
[polski_product_slider type="category" category="elektronika" limit="12"]
```

### Ausgewählte Produkte

Bestimmte Produkte, angegeben über ID.

```html
[polski_product_slider type="ids" ids="12,34,56,78,90"]
```

## Gutenberg-Block

Der Block **Polski - Produkt-Slider** ist im Gutenberg-Editor verfügbar. Die Vorschau ist sofort im Editor sichtbar.

Block-Optionen:

| Option              | Beschreibung                                     | Standard      |
| ------------------- | ---------------------------------------- | ------------- |
| Typ                 | Produktquelle (related/sale/featured/usw.) | latest    |
| Limit               | Maximale Anzahl an Produkten              | 8             |
| Spalten             | Anzahl der sichtbaren Produkte (Desktop)    | 4             |
| Spalten Tablet      | Sichtbare Produkte auf dem Tablet            | 2             |
| Spalten Mobil       | Sichtbare Produkte auf dem Telefon           | 1             |
| Pfeile              | Navigationspfeile anzeigen                 | Ja           |
| Punkte              | Paginierungspunkte anzeigen                   | Nein           |
| Automatisches Scrollen | Automatisches Scrollen                 | Nein           |
| Abstand (gap)       | Abstand zwischen Produkten                 | 16px          |
| Überschrift            | Titel über dem Slider                       | (leer)       |

## Shortcode `[polski_product_slider]`

### Parameter

| Parameter       | Typ    | Standard   | Beschreibung                              |
| --------------- | ------ | ---------- | ----------------------------------------- |
| `type`          | string | `latest`   | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | int    | `8`        | Maximale Anzahl an Produkten              |
| `columns`       | int    | `4`        | Spalten auf dem Desktop                   |
| `columns_tablet`| int    | `2`        | Spalten auf dem Tablet                    |
| `columns_mobile`| int    | `1`        | Spalten auf dem Telefon                   |
| `category`      | string | (leer)     | Kategorie-Slug (für type=category)        |
| `ids`           | string | (leer)     | Produkt-IDs (für type=ids)                |
| `product_id`    | int    | (aktuell)  | Produkt-ID (für type=related)             |
| `arrows`        | string | `yes`      | Pfeile anzeigen                           |
| `dots`          | string | `no`       | Paginierungspunkte anzeigen               |
| `autoplay`      | string | `no`       | Automatisches Scrollen                    |
| `autoplay_speed`| int    | `5000`     | Pause zwischen Folien (ms)                |
| `gap`           | string | `16px`     | Abstand zwischen Produktkarten            |
| `title`         | string | (leer)     | Überschrift über dem Slider               |
| `orderby`       | string | `date`     | Sortierung: date, price, rating, rand     |
| `order`         | string | `DESC`     | Richtung: ASC oder DESC                   |

### Beispiele

Slider mit reduzierten Produkten und Überschrift:

```html
[polski_product_slider type="sale" limit="12" columns="4" title="Aktualne promocje" arrows="yes"]
```

Slider mit Produkten aus einer Kategorie auf der Startseite:

```html
[polski_product_slider type="category" category="nowosci" limit="8" columns="3" dots="yes"]
```

Automatisch scrollender Bestseller-Slider:

```html
[polski_product_slider type="bestsellers" limit="10" autoplay="yes" autoplay_speed="4000"]
```

## Automatisches Scrollen

Bei `autoplay="yes"` scrollt der Slider die Produkte automatisch. Das Scrollen stoppt beim Überfahren mit dem Mauszeiger oder bei Berührung auf dem Mobilgerät. Nach Verlassen des Sliders wird es fortgesetzt.

```php
// Standard-Autoplay-Zeit global ändern
add_filter('polski/product_slider/autoplay_speed', function (): int {
    return 3000; // 3 Sekunden
});
```

## Integration mit Modulen

Die Produktkarten im Slider enthalten Elemente anderer Module:

- **Etiketten** - Abzeichen für Ausverkauf, Neuheit, Bestseller
- **Wunschliste** - Herz-Symbol
- **Vergleich** - Vergleichsschaltfläche
- **Schnellansicht** - Augen-Symbol
- **Omnibus-Preis** - niedrigster Preis der letzten 30 Tage

## Lazy Loading von Bildern

Bilder werden verzögert geladen - Bilder außerhalb des sichtbaren Bereichs werden erst beim Scrollen abgerufen. Es kommen natives `loading="lazy"` und der `Intersection Observer` für ältere Browser zum Einsatz.

## CSS-Gestaltung

- `.polski-slider` - Slider-Container
- `.polski-slider__track` - Scroll-Track
- `.polski-slider__item` - Produktkarte
- `.polski-slider__arrow` - Navigationspfeil
- `.polski-slider__arrow--prev` - Pfeil nach links
- `.polski-slider__arrow--next` - Pfeil nach rechts
- `.polski-slider__dots` - Container der Paginierungspunkte
- `.polski-slider__dot` - einzelner Punkt
- `.polski-slider__dot--active` - aktiver Punkt
- `.polski-slider__title` - Überschrift

## Fehlerbehebung

**Der Slider scrollt nicht flüssig** - prüfen Sie die Browser-Unterstützung für `scroll-snap-type` (Chrome 69+, Firefox 68+, Safari 11+).

**Die Pfeile funktionieren nicht** - möglicher CSS-Konflikt mit einem anderen Slider. Theme-Styles können die Klassen `.polski-slider__arrow` überschreiben.

**Autoplay stoppt nicht** - prüfen Sie, ob ein Optimierungs-Plugin JavaScript blockiert. Das Slider-Skript muss geladen sein.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
