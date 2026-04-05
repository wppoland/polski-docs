---
title: Produktvergleich
description: Produktvergleichsmodul in Polski for WooCommerce - Eigenschaftstabelle, Produktlimit, automatischer Austausch und Shortcode.
---

Der Produktvergleich ermoeglicht es Kunden, mehrere Produkte nebeneinander in einer Eigenschaftstabelle zu vergleichen. Erleichtert die Auswahl, besonders in Shops mit grossem Sortiment.

![Produktvergleich, Wunschliste und Filter auf der Shop-Seite](../../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

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

Zeilen mit identischen Werten koennen automatisch ausgeblendet werden - aktivieren Sie **Identische Eigenschaften ausblenden** in den Einstellungen. Der Kunde sieht dann nur die Unterschiede zwischen den Produkten.

## Maximale Produktanzahl

Standardmaessig kann der Kunde bis zu **4 Produkte** gleichzeitig vergleichen. Das Limit kann in den Einstellungen oder per Filter geaendert werden:

```php
add_filter('polski/compare/max_items', function (): int {
    return 6;
});
```

Nach Erreichen des Limits wird der Button **Zum Vergleich hinzufuegen** inaktiv. Der Kunde muss zuerst ein Produkt entfernen.

## Automatischer Austausch

Wenn **Automatischer Austausch** aktiv ist, ersetzt ein neues Produkt ueber dem Limit das aelteste. Der Kunde erhaelt eine Toast-Benachrichtigung.

Aktivierung in den Einstellungen: **WooCommerce > Polski > Shop-Module > Produktvergleich > Automatischer Austausch**.

Oder programmatisch:

```php
add_filter('polski/compare/auto_replace', '__return_true');
```

## AJAX-Funktionsweise

Der Vergleich arbeitet ohne Seitenneuladung. Verfuegbare AJAX-Aktionen:

| Aktion                        | Beschreibung                           |
| ---------------------------- | ------------------------------ |
| `polski_compare_add`         | Produkt hinzufuegen               |
| `polski_compare_remove`      | Produkt entfernen             |
| `polski_compare_get`         | Produktliste abrufen       |
| `polski_compare_clear`       | Vergleich leeren       |

Daten werden in der WooCommerce-Session (`WC()->session`) gespeichert. Funktioniert fuer Gaeste und angemeldete Kunden.

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

### Verwendung auf einer dedizierten Seite

Erstellen Sie eine Seite z.B. **Produktvergleich** und fuegen Sie den Shortcode ein:

```html
[polski_compare]
```

In den Moduleinstellungen geben Sie diese Seite als **Vergleichsseite** an. Der Button **Vergleich ansehen** leitet dorthin weiter.

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

## Vergleich innerhalb einer Kategorie

Standardmaessig koennen Produkte aus verschiedenen Kategorien verglichen werden. Um den Vergleich auf dieselbe Kategorie einzuschraenken:

```php
add_filter('polski/compare/same_category_only', '__return_true');
```

Der Kunde sieht eine Meldung, wenn er ein Produkt aus einer anderen Kategorie hinzufuegen moechte.

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
