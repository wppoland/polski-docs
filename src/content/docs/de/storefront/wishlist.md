---
title: Wunschliste
description: Wunschlistenmodul in Polski for WooCommerce - Unterstuetzung fuer Gaeste und angemeldete Benutzer, Kundenkonto, AJAX und Shortcode.
---

Die Wunschliste ermoeglicht es Kunden, Produkte fuer spaeter zu speichern. Funktioniert fuer angemeldete Kunden und Gaeste.

![Wunschliste, Produktvergleich und Schnellansicht auf der Shop-Seite](../../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie **Wunschliste**. Auf jedem Produkt erscheint ein Herzsymbol.

## Unterstuetzung fuer Gaeste und angemeldete Benutzer

### Gaeste (nicht angemeldet)

Fuer Gaeste wird die Wunschliste im `localStorage` des Browsers gespeichert. Daten sind sofort ohne Serveranfragen verfuegbar. Nach dem Anmelden wird die Liste aus dem `localStorage` automatisch mit der Datenbank synchronisiert - Produkte gehen nicht verloren.

### Angemeldete Benutzer

Fuer angemeldete Kunden werden Daten in der Tabelle `wp_usermeta` mit dem Schluessel `_polski_wishlist` gespeichert. Dadurch ist die Liste nach dem Anmelden auf jedem Geraet verfuegbar.

## Kundenkonto

Das Modul fuegt einen Tab **Wunschliste** in **Mein Konto** hinzu. Der Kunde sieht dort:

- Produktminiatur
- Name mit Link zur Produktseite
- Preis (aktuell, unter Beruecksichtigung von Aktionen)
- Verfuegbarkeitsstatus (auf Lager / nicht verfuegbar)
- Button **In den Warenkorb**
- Button **Von der Liste entfernen**

Der Tab ist nur sichtbar, wenn das Modul aktiv ist. Endpoint in der URL: `wishlist` - z.B. `ihrshop.pl/mein-konto/wishlist/`.

## AJAX-Funktionsweise

Hinzufuegen und Entfernen funktioniert per AJAX - die Seite wird nicht neu geladen. Nach Klick auf das Herzsymbol:

1. Symbol wechselt den Zustand (leer/gefuellt) mit CSS-Animation
2. AJAX-Anfrage wird an `admin-ajax.php` gesendet
3. Zaehler am Symbol im Header aktualisiert sich in Echtzeit

Vom Modul verarbeitete AJAX-Aktionen:

| Aktion                          | Beschreibung                        |
| ------------------------------ | --------------------------- |
| `polski_wishlist_add`          | Produkt zur Liste hinzufuegen   |
| `polski_wishlist_remove`       | Produkt von der Liste entfernen  |
| `polski_wishlist_get`          | Gesamte Liste abrufen        |
| `polski_wishlist_clear`        | Gesamte Liste leeren   |

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

### Verwendung im PHP-Template

```php
echo do_shortcode('[polski_wishlist columns="image,name,price,add_to_cart"]');
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

## Button auf der Produktliste

Auf Kategorie- und Archivseiten erscheint der Herzbutton in der Ecke des Miniaturbilds. Deaktivieren Sie ihn in den Moduleinstellungen.

## Header-Symbol

Das Modul fuegt ein Herzsymbol mit Zaehler zum Header hinzu (neben dem Warenkorb). Klick oeffnet ein Dropdown mit gespeicherten Produkten. Position per Hook aendern:

```php
add_action('polski/wishlist/header_icon', function (): void {
    // Eigene Position des Symbols im Header
});
```

## CSS-Styling

- `.polski-wishlist-button` - Hinzufuegen-/Entfernen-Button
- `.polski-wishlist-button--active` - Aktiver Zustand (Produkt auf der Liste)
- `.polski-wishlist-table` - Listentabelle
- `.polski-wishlist-count` - Zaehler im Header
- `.polski-wishlist-empty` - Meldung bei leerer Liste

## Leistung

Listendaten fuer angemeldete Kunden werden im Object Cache gecacht (falls verfuegbar). Der Button-HTML wird per `wp_cache_set()` mit der Gruppe `polski_wishlist` gecacht. Der Cache leert sich automatisch beim Hinzufuegen oder Entfernen eines Produkts.

## Fehlerbehebung

**Button erscheint nicht am Produkt** - stellen Sie sicher, dass das Theme den Hook `woocommerce_single_product_summary` unterstuetzt.

**Liste synchronisiert sich nach dem Anmelden nicht** - pruefen Sie, ob kein Caching-Plugin die Anmeldeseite aggressiv puffert. Deaktivieren Sie den Cache fuer die Seite "Mein Konto".

**Symbol im Header wird nicht angezeigt** - das Theme muss den Hook `wp_nav_menu_items` oder `storefront_header` unterstuetzen.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
