---
title: Wunschliste
description: Wunschlistenmodul in Polski for WooCommerce - Unterstuetzung fuer Gaeste und angemeldete Benutzer, Kundenkonto, AJAX und Shortcode.
---

Die Wunschliste ermoeglicht es Kunden, Produkte fuer einen spaeteren Kauf zu speichern. Das Modul von Polski for WooCommerce bietet eine vollstaendige Wishlist-Implementierung - sowohl fuer angemeldete Benutzer als auch fuer Gaeste.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie die Option **Wunschliste**. Nach der Aktivierung erscheint bei jedem Produkt ein Herzsymbol zum Hinzufuegen zur Liste.

## Unterstuetzung fuer Gaeste und angemeldete Benutzer

### Gaeste (nicht angemeldet)

Fuer Gaeste wird die Wunschliste im `localStorage` des Browsers gespeichert. Daten sind sofort ohne Serveranfragen verfuegbar. Nach dem Anmelden wird die Liste aus dem `localStorage` automatisch mit der Datenbank synchronisiert - Produkte gehen nicht verloren.

### Angemeldete Benutzer

Fuer angemeldete Kunden werden Daten in der Tabelle `wp_usermeta` mit dem Schluessel `_polski_wishlist` gespeichert. Dadurch ist die Liste nach dem Anmelden auf jedem Geraet verfuegbar.

## Kundenkonto

Das Modul fuegt einen neuen Tab **Wunschliste** im Abschnitt **Mein Konto** von WooCommerce hinzu. Der Kunde sieht dort:

- Produktminiatur
- Name mit Link zur Produktseite
- Preis (aktuell, unter Beruecksichtigung von Aktionen)
- Verfuegbarkeitsstatus (auf Lager / nicht verfuegbar)
- Button **In den Warenkorb**
- Button **Von der Liste entfernen**

## AJAX-Funktionsweise

Hinzufuegen und Entfernen von Produkten funktioniert per AJAX - die Seite wird nicht neu geladen. Nach Klick auf das Herzsymbol:

1. Symbol wechselt den Zustand (leer/gefuellt) mit CSS-Animation
2. AJAX-Anfrage wird an `admin-ajax.php` gesendet
3. Zaehler am Symbol im Header aktualisiert sich in Echtzeit

## Shortcode `[polski_wishlist]`

Der Shortcode zeigt die Wunschlistentabelle an einer beliebigen Stelle im Shop an.

### Parameter

| Parameter    | Typ    | Standard | Beschreibung                                        |
| ----------- | ------ | --------- | -------------------------------------------- |
| `columns`   | string | `all`     | Anzuzeigende Spalten (durch Komma getrennt) |
| `max_items` | int    | `50`      | Maximale Produktanzahl auf der Liste        |
| `show_empty`| string | `yes`     | Meldung bei leerer Liste anzeigen |

### Verwendungsbeispiel

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### Verfuegbare Spalten

- `image` - Produktminiatur
- `name` - Produktname mit Link
- `price` - Preis
- `stock` - Lagerstatus
- `add_to_cart` - Button zum Hinzufuegen in den Warenkorb
- `remove` - Button zum Entfernen von der Liste
- `date_added` - Hinzufuegedatum

## Button auf der Produktseite

Der Wunschlistenbutton wird standardmaessig unter dem Button **In den Warenkorb** auf der Produktseite angezeigt. Die Position kann per Filter geaendert werden:

```php
add_filter('polski/wishlist/button_position', function (): string {
    return 'before_add_to_cart'; // oder 'after_add_to_cart', 'after_summary'
});
```

## Header-Symbol

Das Modul fuegt ein Herzsymbol mit Zaehler zum Shop-Header hinzu (neben dem Warenkorb). Klick oeffnet ein Dropdown mit Vorschau der gespeicherten Produkte.

## CSS-Styling

- `.polski-wishlist-button` - Hinzufuegen-/Entfernen-Button
- `.polski-wishlist-button--active` - Aktiver Zustand (Produkt auf der Liste)
- `.polski-wishlist-table` - Listentabelle
- `.polski-wishlist-count` - Zaehler im Header
- `.polski-wishlist-empty` - Meldung bei leerer Liste

## Fehlerbehebung

**Button erscheint nicht am Produkt** - stellen Sie sicher, dass das Theme den Hook `woocommerce_single_product_summary` unterstuetzt.

**Liste synchronisiert sich nach dem Anmelden nicht** - pruefen Sie, ob kein Caching-Plugin die Anmeldeseite aggressiv puffert. Deaktivieren Sie den Cache fuer die Seite "Mein Konto".

**Symbol im Header wird nicht angezeigt** - das Theme muss den Hook `wp_nav_menu_items` oder `storefront_header` unterstuetzen.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
