---
title: Social-Proof-Benachrichtigungen
description: Social-Proof-Benachrichtigungsmodul in Polski for WooCommerce - eingeblendete Benachrichtigungen über kürzliche Käufe, die das Vertrauen der Kunden stärken.
---

Social-Proof-Benachrichtigungen sind schwebende Hinweise (Toast-Benachrichtigungen), die Besucher über kürzliche Käufe anderer Kunden informieren. Dieser Mechanismus des sozialen Beweises regt zum Kauf an, indem er zeigt, dass andere Kunden aktiv im Shop einkaufen.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie **Social Proof**. Die Benachrichtigungen erscheinen automatisch auf Basis der letzten WooCommerce-Bestellungen.

## Funktionen

- Schwebende Benachrichtigungen über kürzliche Käufe
- Daten werden per AJAX aus echten WooCommerce-Bestellungen bezogen
- Transient-API-Cache (5 Minuten) für die Leistung
- Anonymisierung von Kundennamen (z. B. "Jan K.")
- Konfigurierbare Häufigkeit und Anzeigedauer
- Auswahl der Bildschirmposition (4 Ecken)
- Option zum Ausblenden auf Mobilgeräten
- Produktminiatur in der Benachrichtigung

## Einstellungen

Konfiguration unter **WooCommerce > Polski > Shop-Module > Social Proof**.

| Einstellung | Standard | Beschreibung |
|---|---|---|
| `display_interval` | `30` | Abstand zwischen Benachrichtigungen (Sekunden) |
| `display_duration` | `5` | Anzeigedauer einer einzelnen Benachrichtigung (Sekunden) |
| `position` | `bottom-left` | Position auf dem Bildschirm: `bottom-left`, `bottom-right`, `top-left`, `top-right` |
| `anonymize_name` | `true` | Kundennamen anonymisieren (Jan Kowalski -> Jan K.) |
| `hide_on_mobile` | `false` | Benachrichtigungen auf Mobilgeräten ausblenden |

Option in der Datenbank: `polski_social_proof`.

## Format der Benachrichtigung

Jede Benachrichtigung enthält:

- Eine Produktminiatur
- Den Kundennamen (mit optionaler Anonymisierung)
- Den Produktnamen mit Link
- Den Zeitpunkt des Kaufs (z. B. "vor 2 Stunden")

Beispiel: **Jan K.** hat **Poloshirt** gekauft - vor 2 Stunden

## Technische Details

### Datenquelle

Die Benachrichtigungen werden aus den letzten WooCommerce-Bestellungen mit dem Status `completed` oder `processing` erzeugt. Das Modul ruft bis zu 20 der letzten Bestellungen ab und rotiert sie zufällig in den Benachrichtigungen.

### Cache

Die Bestelldaten werden in der Transient API mit einer Ablaufzeit von 5 Minuten zwischengespeichert (`polski_social_proof_data`). Dadurch erzeugen die Benachrichtigungen nicht bei jeder Anzeige Datenbankabfragen.

### Dateien

- JavaScript: `assets/js/social-proof.js`

Das Skript wird bedingt geladen und ruft die Daten über einen AJAX-Endpunkt ab.

### Hooks

```php
// In der Benachrichtigung angezeigte Daten filtern
add_filter('polski/social_proof/notification_data', function (array $data): array {
    // Produkte einer bestimmten Kategorie ausblenden
    if (has_term('vip', 'product_cat', $data['product_id'])) {
        return [];
    }
    return $data;
});

// Anzahl der für die Rotation abgerufenen Bestellungen ändern
add_filter('polski/social_proof/orders_limit', function (): int {
    return 50;
});

// Cache-Zeit ändern
add_filter('polski/social_proof/cache_expiration', function (): int {
    return 10 * MINUTE_IN_SECONDS;
});
```

### CSS-Klassen

- `.polski-social-proof` - Container der Benachrichtigung
- `.polski-social-proof--visible` - sichtbarer Zustand (mit Animation)
- `.polski-social-proof__image` - Produktminiatur
- `.polski-social-proof__content` - Inhalt der Benachrichtigung
- `.polski-social-proof__name` - Kundenname
- `.polski-social-proof__product` - Produktname
- `.polski-social-proof__time` - Zeitpunkt des Kaufs
- `.polski-social-proof__close` - Schließen-Schaltfläche

### Modul-ID

`social_proof`

## Fehlerbehebung

**Die Benachrichtigungen erscheinen nicht** - prüfen Sie, ob der Shop Bestellungen mit dem Status `completed` oder `processing` hat. Das Modul benötigt mindestens eine Bestellung, um Benachrichtigungen anzuzeigen.

**Die Benachrichtigungen erscheinen zu häufig/zu selten** - passen Sie die Einstellungen `display_interval` und `display_duration` an.

**Die Benachrichtigungen verdecken andere Elemente** - ändern Sie die Position in den Einstellungen oder passen Sie den `z-index` im CSS an: `.polski-social-proof { z-index: 9999; }`.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
