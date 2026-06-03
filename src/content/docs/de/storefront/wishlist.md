---
title: Wunschliste (wishlist)
description: Wunschlistenmodul in Polski for WooCommerce - Unterstützung für Gäste und angemeldete Nutzer, Kundenkonto, AJAX und Shortcode.
---

Mit der Wunschliste können Kunden Produkte für später speichern. Sie funktioniert sowohl für angemeldete Kunden als auch für Gäste.

![Wunschliste, Vergleich und Schnellansicht auf der Shopseite](../../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie **Wunschliste**. Bei jedem Produkt erscheint ein Herz-Symbol.

## Unterstützung für Gäste und angemeldete Nutzer

### Gäste (nicht angemeldet)

Die Liste wird im `localStorage` des Browsers gespeichert. Die Daten sind sofort verfügbar, ohne Serveranfragen. Nach der Anmeldung synchronisiert sich die Liste automatisch mit der Datenbank - die Produkte verschwinden nicht.

### Angemeldete Nutzer

Die Daten werden in der Tabelle `wp_usermeta` mit dem Schlüssel `_polski_wishlist` gespeichert. Die Liste ist nach der Anmeldung auf jedem Gerät verfügbar.

## Kundenkonto

Das Modul fügt unter **Mein Konto** einen Tab **Wunschliste** hinzu. Dort sieht der Kunde:

- Eine Produktminiatur
- Den Namen mit Link zur Produktseite
- Den Preis (aktuell, unter Berücksichtigung von Aktionen)
- Den Verfügbarkeitsstatus (auf Lager / nicht verfügbar)
- Die Schaltfläche **In den Warenkorb**
- Die Schaltfläche **Von der Liste entfernen**

Der Tab ist nur sichtbar, wenn das Modul aktiv ist. Endpunkt in der URL: `wishlist` - z. B. `ihrshop.de/mein-konto/wishlist/`.

## AJAX-Funktionsweise

Das Hinzufügen und Entfernen von Produkten läuft per AJAX - die Seite wird nicht neu geladen. Nach Klick auf das Herz-Symbol:

1. ändert das Symbol seinen Zustand (leer/gefüllt) mit einer CSS-Animation
2. wird eine AJAX-Anfrage an `admin-ajax.php` gesendet
3. aktualisiert sich der Zähler am Symbol im Header in Echtzeit

Vom Modul unterstützte AJAX-Aktionen:

| Aktion                          | Beschreibung                |
| ------------------------------ | --------------------------- |
| `polski_wishlist_add`          | Produkt zur Liste hinzufügen   |
| `polski_wishlist_remove`       | Produkt von der Liste entfernen  |
| `polski_wishlist_get`          | Gesamte Liste abrufen        |
| `polski_wishlist_clear`        | Gesamte Liste leeren   |

## Shortcode `[polski_wishlist]`

Zeigt die Tabelle der Wunschliste an beliebiger Stelle im Shop an.

### Parameter

| Parameter   | Typ    | Standard  | Beschreibung                                 |
| ----------- | ------ | --------- | -------------------------------------------- |
| `columns`   | string | `all`     | Anzuzeigende Spalten (durch Komma getrennt)  |
| `max_items` | int    | `50`      | Maximale Anzahl der Produkte auf der Liste   |
| `show_empty`| string | `yes`     | Ob eine Meldung angezeigt wird, wenn die Liste leer ist |

### Anwendungsbeispiel

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### Verwendung im PHP-Template

```php
echo do_shortcode('[polski_wishlist columns="image,name,price,add_to_cart"]');
```

### Verfügbare Spalten

- `image` - Produktminiatur
- `name` - Produktname mit Link
- `price` - Preis
- `stock` - Lagerstatus
- `add_to_cart` - Schaltfläche zum Hinzufügen in den Warenkorb
- `remove` - Schaltfläche zum Entfernen von der Liste
- `date_added` - Datum des Hinzufügens

## Schaltfläche auf der Produktseite

Die Schaltfläche wird standardmäßig unter **In den Warenkorb** angezeigt. Ändern Sie die Position per Filter:

```php
add_filter('polski/wishlist/button_position', function (): string {
    return 'before_add_to_cart'; // oder 'after_add_to_cart', 'after_summary'
});
```

## Schaltfläche in der Produktliste

Auf Kategorie- und Archivseiten erscheint das Herz-Symbol in der Ecke der Miniatur. Deaktivieren Sie es in den Moduleinstellungen.

## Shop-Header

Das Modul fügt dem Header ein Herz-Symbol mit Zähler hinzu (neben dem Warenkorb). Ein Klick öffnet ein Dropdown mit den gespeicherten Produkten. Ändern Sie die Position des Symbols per Hook:

```php
add_action('polski/wishlist/header_icon', function (): void {
    // Eigene Position des Symbols im Header
});
```

## CSS-Gestaltung

Die CSS-Klassen tragen das Präfix `.polski-wishlist-`. Wichtige Klassen:

- `.polski-wishlist-button` - Schaltfläche zum Hinzufügen/Entfernen
- `.polski-wishlist-button--active` - aktiver Zustand (Produkt auf der Liste)
- `.polski-wishlist-table` - Tabelle der Liste
- `.polski-wishlist-count` - Zähler im Header
- `.polski-wishlist-empty` - Meldung bei leerer Liste

## Leistung

Die Listendaten für angemeldete Kunden werden im Object Cache zwischengespeichert (sofern verfügbar). Das HTML der Schaltfläche wird über `wp_cache_set()` mit der Gruppe `polski_wishlist` zwischengespeichert. Der Cache wird nach dem Hinzufügen oder Entfernen eines Produkts automatisch geleert.

## Fehlerbehebung

**Die Schaltfläche erscheint nicht beim Produkt** - prüfen Sie, ob Ihr Theme den Hook `woocommerce_single_product_summary` unterstützt. Manche Themes überschreiben die WooCommerce-Templates.

**Die Liste synchronisiert sich nach der Anmeldung nicht** - prüfen Sie, ob ein Cache-Plugin die Login-Seite zwischenspeichert. Deaktivieren Sie den Cache für die Seite `mein-konto`.

**Das Symbol im Header wird nicht angezeigt** - das Theme muss den Hook `wp_nav_menu_items` oder `storefront_header` unterstützen. Fügen Sie das Symbol in einem benutzerdefinierten Theme manuell im Template hinzu.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
