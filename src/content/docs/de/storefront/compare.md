---
title: Produktvergleich
description: Produktvergleichsmodul in Polski for WooCommerce - Eigenschaftstabelle, Produktlimit, automatischer Austausch und Shortcode.
---

Der Produktvergleich ermoeglicht es Kunden, mehrere Produkte nebeneinander in einer Eigenschaftstabelle zu vergleichen. Dies erleichtert die Kaufentscheidung, besonders in Shops mit breitem Sortiment.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie die Option **Produktvergleich**. Auf den Produkten erscheint ein Vergleichsbutton.

## Eigenschaftstabelle

Nach dem Hinzufuegen von Produkten zum Vergleich sieht der Kunde eine Tabelle mit Spalten fuer jedes Produkt. Die Tabellenzeilen enthalten:

- Produktbild
- Name mit Link
- Preis (unter Beruecksichtigung von Aktionen und der Omnibus-Richtlinie)
- Bewertung (Sterne)
- Kurzbeschreibung
- Verfuegbarkeitsstatus
- Produktattribute (Farbe, Groesse usw.)
- Lieferzeit (falls gesetzt)
- Button **In den Warenkorb**

Zeilen, in denen alle Werte identisch sind, koennen automatisch ausgeblendet werden - aktivieren Sie die Option **Identische Eigenschaften ausblenden** in den Moduleinstellungen.

## Maximale Produktanzahl

Standardmaessig kann der Kunde bis zu **4 Produkte** gleichzeitig vergleichen. Das Limit kann in den Einstellungen oder per Filter geaendert werden:

```php
add_filter('polski/compare/max_items', function (): int {
    return 6;
});
```

## Automatischer Austausch

Wenn die Option **Automatischer Austausch** aktiv ist, ersetzt das Hinzufuegen eines Produkts ueber dem Limit automatisch das aelteste Produkt im Vergleich. Der Kunde erhaelt eine Toast-Benachrichtigung ueber den Austausch.

```php
add_filter('polski/compare/auto_replace', '__return_true');
```

## Shortcode `[polski_compare]`

### Parameter

| Parameter        | Typ    | Standard | Beschreibung                                          |
| --------------- | ------ | --------- | --------------------------------------------- |
| `columns`       | string | `all`     | Anzuzeigende Eigenschaften (durch Komma getrennt) |
| `hide_similar`  | string | `no`      | Zeilen mit identischen Werten ausblenden      |
| `show_remove`   | string | `yes`     | Produktentfernungsbutton anzeigen             |

### Verwendungsbeispiel

```html
[polski_compare columns="image,name,price,rating,stock" hide_similar="yes"]
```

## Vergleichsbutton

Der Button wird auf der Produktkarte (Kategorieseite) und auf der Einzelproduktseite angezeigt. Die Position steuern Sie per Filter:

```php
add_filter('polski/compare/button_position', function (): string {
    return 'after_add_to_cart';
});
```

Verfuegbare Positionen: `before_add_to_cart`, `after_add_to_cart`, `after_summary`.

## Vergleichsleiste (Floating Bar)

Nach dem Hinzufuegen des ersten Produkts zum Vergleich erscheint am unteren Bildschirmrand eine Leiste mit Miniaturen der gewaehlten Produkte und dem Button **Vergleichen**. Die Leiste ist responsiv - auf mobilen Geraeten zeigt sie die Anzahl der gewaehlten Produkte statt Miniaturen.

## CSS-Styling

CSS-Klassen des Moduls:

- `.polski-compare-button` - Button zum Hinzufuegen zum Vergleich
- `.polski-compare-button--active` - Produkt ist im Vergleich
- `.polski-compare-table` - Vergleichstabelle
- `.polski-compare-bar` - Leiste am unteren Bildschirmrand
- `.polski-compare-empty` - Meldung bei leerem Vergleich

## Fehlerbehebung

**Tabelle zeigt keine Attribute** - stellen Sie sicher, dass Produktattribute als **Sichtbar auf der Produktseite** in der Produktbearbeitung (Tab Attribute) eingestellt sind.

**Button reagiert nicht auf Klick** - pruefen Sie die Browser-Konsole auf JavaScript-Konflikte. Haeufigste Ursache ist dupliziertes jQuery oder ein Konflikt mit einem JS-Optimierungs-Plugin.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
