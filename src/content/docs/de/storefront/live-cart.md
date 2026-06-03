---
title: Seitlicher Warenkorb (Live Cart)
description: Modul für den seitlichen Warenkorb in Polski for WooCommerce - ausfahrendes Warenkorb-Panel mit Fortschrittsbalken für kostenlosen Versand und Echtzeit-Aktualisierung.
---

Der seitliche Warenkorb ist ein ausfahrendes Panel (Drawer), das nach dem Hinzufügen eines Produkts zum Warenkorb erscheint. Der Kunde sieht den Inhalt des Warenkorbs, ohne die Produktseite zu verlassen, was den Kaufweg verkürzt und Warenkorbabbrüche reduziert.

## Modul aktivieren

Gehe zu **WooCommerce > Polski > Shop-Module** und aktiviere **Seitlicher Warenkorb**. Nach dem Hinzufügen eines Produkts zum Warenkorb fährt das Panel automatisch von der gewählten Bildschirmseite aus.

## Funktionen

- Ausfahrendes Warenkorb-Panel nach dem Hinzufügen eines Produkts (Slide-in-Drawer)
- Echtzeit-Aktualisierung über WooCommerce Cart Fragments
- Fortschrittsbalken für kostenlosen Versand mit Animation
- Mengenänderung der Produkte ohne Neuladen der Seite
- Entfernen von Produkten aus dem Warenkorb im Panel
- Zusammenfassung des Warenkorbwerts
- Overlay, das den Seitenhintergrund abdunkelt
- Auswahl der Anzeigeseite (links/rechts)

## Einstellungen

Konfiguration unter **WooCommerce > Polski > Shop-Module > Seitlicher Warenkorb**.

| Einstellung | Standard | Beschreibung |
|---|---|---|
| `auto_open` | `true` | Panel nach dem Hinzufügen eines Produkts automatisch öffnen |
| `show_subtotal` | `true` | Zusammenfassung des Warenkorbwerts anzeigen |
| `show_shipping_notice` | `true` | Fortschrittsbalken für kostenlosen Versand anzeigen |
| `free_shipping_threshold` | `200` | Schwellenwert für kostenlosen Versand in der Shop-Währung |
| `position` | `right` | Bildschirmseite: `right` oder `left` |
| `overlay` | `true` | Hintergrund abdunkeln, wenn das Panel geöffnet ist |

Option in der Datenbank: `polski_live_cart`.

## Fortschrittsbalken für kostenlosen Versand

Der Balken zeigt, wie viel zum kostenlosen Versand fehlt. Nach Überschreiten des Schwellenwerts wird eine Bestätigungsmeldung angezeigt. Der Schwellenwert wird aus der Einstellung `free_shipping_threshold` oder automatisch aus der WooCommerce-Versandmethode übernommen (falls konfiguriert).

Beispielmeldungen:

- "Bis zum kostenlosen Versand fehlen noch **45,00 zł**"
- "Glückwunsch! Deine Bestellung qualifiziert sich für **kostenlosen Versand**"

## Technische Details

### Dateien

- CSS: `assets/css/live-cart.css`
- JavaScript: `assets/js/live-cart.js`

Beide Dateien werden bedingt geladen, nur wenn das Modul aktiv ist. Das Skript hängt von `jquery` und `wc-cart-fragments` ab.

### Cart Fragments

Das Modul nutzt den Mechanismus WooCommerce Cart Fragments, um den Inhalt des Panels in Echtzeit zu aktualisieren. Nach jeder Änderung des Warenkorbs (Hinzufügen, Entfernen, Mengenänderung) wird das Panel ohne Neuladen der Seite aktualisiert.

### Hooks

```php
// Schwellenwert für kostenlosen Versand dynamisch ändern
add_filter('polski/live_cart/free_shipping_threshold', function (float $threshold): float {
    return 300.00;
});

// Eigenen Inhalt unter der Produktliste hinzufügen
add_action('polski/live_cart/after_items', function (): void {
    echo '<p class="live-cart-promo">Rabattcode: WELCOME10</p>';
});

// Automatisches Öffnen auf Mobilgeräten deaktivieren
add_filter('polski/live_cart/auto_open', function (bool $auto_open): bool {
    if (wp_is_mobile()) {
        return false;
    }
    return $auto_open;
});
```

### CSS-Klassen

- `.polski-live-cart` - Hauptcontainer des Panels
- `.polski-live-cart--open` - geöffneter Zustand
- `.polski-live-cart--left` / `.polski-live-cart--right` - Position
- `.polski-live-cart__overlay` - Hintergrund-Overlay
- `.polski-live-cart__header` - Panel-Kopfzeile
- `.polski-live-cart__items` - Produktliste
- `.polski-live-cart__item` - einzelnes Produkt
- `.polski-live-cart__subtotal` - Zusammenfassung
- `.polski-live-cart__shipping-bar` - Fortschrittsbalken für kostenlosen Versand
- `.polski-live-cart__shipping-progress` - Füllung des Balkens

### Modul-ID

`live_cart`

## Fehlerbehebung

**Das Panel öffnet sich nach dem Hinzufügen eines Produkts nicht** - prüfe, ob das AJAX-Hinzufügen zum Warenkorb unter **WooCommerce > Einstellungen > Produkte > Hinzufügen zum Warenkorb per AJAX-Schaltfläche aktivieren** aktiviert ist. Prüfe auch, ob ein Konflikt mit einem anderen Warenkorb-Plugin besteht.

**Der Fortschrittsbalken für kostenlosen Versand wird nicht angezeigt** - stelle sicher, dass du eine Versandmethode mit kostenlosem Versand ab einem bestimmten Schwellenwert konfiguriert hast, oder lege den Schwellenwert manuell in den Moduleinstellungen fest.

**Das Panel erscheint auf der falschen Seite** - ändere die Einstellung `position` auf `left` oder `right`.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
