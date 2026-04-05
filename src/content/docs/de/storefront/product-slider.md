---
title: Produktslider
description: Produktslider-Modul in Polski for WooCommerce - scroll-snap, verwandte, Sale- und empfohlene Produkte, Gutenberg-Block und Shortcode.
---

Der Produktslider zeigt ein Produktkarussell mit fluessigem, CSS-scroll-snap-basiertem Scrollen an. Das Modul benoetigt keine externen JavaScript-Bibliotheken (Slick, Swiper) - es nutzt ausschliesslich native Browser-Mechanismen.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie die Option **Produktslider**.

## Scroll-snap-Technologie

Der Slider nutzt CSS `scroll-snap-type: x mandatory` statt traditioneller Karussell-Bibliotheken. Vorteile:

- **Null JavaScript fuer das Scrollen** - fluessiges natives Scrollen
- **Keine Abhaengigkeiten** - kein Laden von Slick, Swiper oder Owl Carousel
- **Volle Responsivitaet** - automatische Anpassung an die Bildschirmbreite
- **Touch und Maus** - nativer Swipe-Support auf Touchgeraeten
- **Leistung** - kein Reflow/Repaint beim Scrollen, 60 FPS

## Slider-Typen

### Verwandte Produkte (related)

```html
[polski_product_slider type="related" product_id="123"]
```

### Produkte im Angebot (sale)

```html
[polski_product_slider type="sale" limit="12"]
```

### Empfohlene Produkte (featured)

```html
[polski_product_slider type="featured" limit="8"]
```

### Bestseller

```html
[polski_product_slider type="bestsellers" limit="10"]
```

### Neueste

```html
[polski_product_slider type="latest" limit="10"]
```

### Aus gewaehlter Kategorie

```html
[polski_product_slider type="category" category="elektronik" limit="12"]
```

### Ausgewaehlte Produkte

```html
[polski_product_slider type="ids" ids="12,34,56,78,90"]
```

## Shortcode `[polski_product_slider]`

### Parameter

| Parameter        | Typ    | Standard  | Beschreibung                                      |
| --------------- | ------ | ---------- | ----------------------------------------- |
| `type`          | string | `latest`   | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | int    | `8`        | Maximale Produktanzahl               |
| `columns`       | int    | `4`        | Spalten auf Desktop                      |
| `columns_tablet`| int    | `2`        | Spalten auf Tablet                       |
| `columns_mobile`| int    | `1`        | Spalten auf Telefon                      |
| `category`      | string | (leer)    | Kategorie-Slug (fuer type=category)        |
| `ids`           | string | (leer)    | Produkt-IDs (fuer type=ids)               |
| `arrows`        | string | `yes`      | Navigationspfeile anzeigen                            |
| `dots`          | string | `no`       | Paginierungspunkte anzeigen                    |
| `autoplay`      | string | `no`       | Automatisches Scrollen                       |
| `autoplay_speed`| int    | `5000`     | Pause zwischen Slides (ms)              |
| `gap`           | string | `16px`     | Abstand zwischen Produktkarten           |
| `title`         | string | (leer)    | Ueberschrift ueber dem Slider                     |
| `orderby`       | string | `date`     | Sortierung: date, price, rating, rand     |
| `order`         | string | `DESC`     | Richtung: ASC oder DESC                    |

### Beispiele

Slider mit Sale-Produkten und Ueberschrift:

```html
[polski_product_slider type="sale" limit="12" columns="4" title="Aktuelle Angebote" arrows="yes"]
```

Kategorie-Slider auf der Startseite:

```html
[polski_product_slider type="category" category="neuheiten" limit="8" columns="3" dots="yes"]
```

Automatisch scrollender Bestseller-Slider:

```html
[polski_product_slider type="bestsellers" limit="10" autoplay="yes" autoplay_speed="4000"]
```

## Integration mit Modulen

Produktkarten im Slider enthalten Elemente aus anderen Modulen:

- **Labels** - Sale-, Neuheits-, Bestseller-Badges
- **Wunschliste** - Herz-Symbol
- **Produktvergleich** - Vergleichsbutton
- **Schnellansicht** - Augen-Symbol
- **Omnibus-Preis** - niedrigster Preis der letzten 30 Tage

## CSS-Styling

- `.polski-slider` - Slider-Container
- `.polski-slider__track` - Scroll-Track
- `.polski-slider__item` - Produktkarte
- `.polski-slider__arrow` - Navigationspfeil
- `.polski-slider__arrow--prev` - Pfeil nach links
- `.polski-slider__arrow--next` - Pfeil nach rechts
- `.polski-slider__dots` - Paginierungspunkte-Container
- `.polski-slider__dot` - Einzelner Punkt
- `.polski-slider__dot--active` - Aktiver Punkt
- `.polski-slider__title` - Ueberschrift

## Fehlerbehebung

**Slider scrollt nicht fluessig** - stellen Sie sicher, dass der Browser `scroll-snap-type` unterstuetzt. Alle modernen Browser (Chrome 69+, Firefox 68+, Safari 11+) unterstuetzen diese Eigenschaft.

**Pfeile funktionieren nicht** - pruefen Sie, ob auf der Seite kein CSS-Konflikt mit einem anderen Slider besteht.

**Autoplay stoppt nicht** - stellen Sie sicher, dass JavaScript nicht von einem Optimierungs-Plugin blockiert wird.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
