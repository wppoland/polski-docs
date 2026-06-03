---
title: Rechtliche Checkboxen
description: Konfiguration, Validierung und Anpassung der obligatorischen rechtlichen Checkboxen auf der WooCommerce-Checkout-Seite.
---

Vor der Bestellaufgabe muss der Kunde die AGB und die Datenschutzerklärung akzeptieren. Das Plugin Polski for WooCommerce fügt rechtliche Checkboxen mit konfigurierbaren Inhalten, Validierung und Fehlermeldungen hinzu.

## Rechtliche Anforderungen

Der Shop muss die ausdrückliche Zustimmung des Kunden einholen zu:

- den AGB des Shops (Bedingungen des Kaufvertrags)
- der Datenschutzerklärung (Verarbeitung personenbezogener Daten)
- dem Widerrufsrecht (Information über die 14-Tage-Frist)

Jede Zustimmung erfordert eine eigene Checkbox. Die Checkbox darf nicht standardmäßig angehakt sein.

![Rechtliche Checkboxen auf der WooCommerce-Checkout-Seite](../../../../assets/screenshots/screenshot-3-checkout-checkboxes.png)

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski > Checkout** und konfiguriere den Bereich "Rechtliche Checkboxen".

### Standard-Checkboxen

Das Plugin fügt diese Checkboxen hinzu:

| Checkbox | Erforderlich | Standardinhalt |
|----------|----------|----------------|
| AGB | Ja | Ich habe die [AGB] gelesen und akzeptiere deren Bestimmungen. |
| Datenschutzerklärung | Ja | Ich habe die [Datenschutzerklärung] gelesen und stimme der Verarbeitung meiner personenbezogenen Daten zu. |
| Widerrufsrecht | Ja | Ich wurde über das Recht informiert, vom Vertrag innerhalb von 14 Tagen zurückzutreten. |
| Marketing-Einwilligung | Nein | Ich willige ein, kommerzielle Informationen auf elektronischem Weg zu erhalten. |

### Hinzufügen einer benutzerdefinierten Checkbox

Klicke im Konfigurationspanel auf **Checkbox hinzufügen** und fülle das Formular aus:

| Feld | Beschreibung |
|------|------|
| Name | Interner Bezeichner (z. B. `newsletter_consent`) |
| Beschriftung | Der neben der Checkbox angezeigte Text |
| Erforderlich | Ob die Checkbox zur Bestellaufgabe angehakt sein muss |
| Position | Anzeigereihenfolge (Zahl) |
| Beschreibung | Zusätzlicher Text unter der Checkbox (optional) |
| Fehlermeldung | Text, der angezeigt wird, wenn eine erforderliche Checkbox nicht angehakt ist |

### Formatierung der Beschriftungen

Im Beschriftungstext kannst du Folgendes verwenden:

- `[regulamin]` - automatischer Link zur AGB-Seite
- `[polityka-prywatnosci]` - automatischer Link zur Datenschutzerklärung
- `[odstapienie]` - Link zur Seite über das Widerrufsrecht
- `<a href="URL">Text</a>` - benutzerdefinierter Link
- `<strong>Text</strong>` - Fettschrift

Die Seiten der AGB und der Datenschutzerklärung werden aus **WooCommerce > Einstellungen > Erweitert > Seiten-Konfiguration** bezogen.

## Validierung

### Validierung serverseitig

Das Plugin prüft die Checkboxen serverseitig über den Hook `woocommerce_checkout_process`. Wenn eine erforderliche Checkbox nicht angehakt ist, wird die Bestellung nicht durchgeführt und der Kunde sieht einen Fehler.

### Validierung clientseitig

Eine optionale JavaScript-Validierung zeigt den Fehler sofort nach dem Klick auf den Button an, ohne die Seite neu zu laden. Aktiviere sie unter:

**WooCommerce > Einstellungen > Polski > Checkout > JS-Validierung der Checkboxen**

### Fehlermeldungen

Jede Checkbox hat eine konfigurierbare Fehlermeldung. Standardmeldungen:

| Checkbox | Fehlermeldung |
|----------|----------------|
| AGB | Um die Bestellung aufzugeben, musst du die AGB des Shops akzeptieren. |
| Datenschutzerklärung | Um die Bestellung aufzugeben, musst du die Datenschutzerklärung akzeptieren. |
| Widerrufsrecht | Du musst bestätigen, dass du die Information über das Widerrufsrecht gelesen hast. |

## Speicherung der Zustimmungen

Das Plugin speichert Informationen über die Zustimmungen:

- als Bestellmetadaten (`_polski_consent_*`)
- mit Datum und Uhrzeit der Zustimmungserteilung
- mit der Version der AGB/Datenschutzerklärung (falls Versionsverfolgung aktiviert ist)

Diese Daten sind im Admin-Panel der Bestellung sichtbar. Sie können für DSGVO-Zwecke exportiert werden.

### Anzeige der Zustimmungen in der Bestellung

In der Bestellansicht im Administrationspanel findest du im Bereich "Rechtliche Zustimmungen" eine Liste der erteilten Zustimmungen mit Daten.

## Programmatische Verwaltung der Checkboxen

### Checkbox programmatisch hinzufügen

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    $checkboxes['custom_consent'] = [
        'label'         => 'Ich willige in die Verarbeitung der Daten zur Bearbeitung von Reklamationen ein.',
        'required'      => true,
        'position'      => 50,
        'error_message' => 'Du musst der Datenverarbeitung zustimmen.',
        'description'   => '',
    ];

    return $checkboxes;
});
```

### Checkbox entfernen

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    unset($checkboxes['marketing_consent']);

    return $checkboxes;
});
```

### Bestehende Checkbox ändern

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    if (isset($checkboxes['terms'])) {
        $checkboxes['terms']['label'] = 'Ich akzeptiere die <a href="/regulamin">AGB</a> des Shops.';
    }

    return $checkboxes;
});
```

### Bedingte Anzeige einer Checkbox

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    $cart_total = WC()->cart->get_total('edit');

    if ($cart_total > 500) {
        $checkboxes['high_value_consent'] = [
            'label'         => 'Ich bestätige eine Bestellung im Wert von über 500 zł.',
            'required'      => true,
            'position'      => 60,
            'error_message' => 'Du musst die hochwertige Bestellung bestätigen.',
        ];
    }

    return $checkboxes;
});
```

## CSS-Styling

```css
.polski-legal-checkboxes {
    margin: 1.5em 0;
    padding: 1em;
    background: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
}

.polski-legal-checkbox {
    margin-bottom: 0.8em;
}

.polski-legal-checkbox label {
    font-size: 0.9em;
    line-height: 1.5;
    cursor: pointer;
}

.polski-legal-checkbox__description {
    margin-top: 0.3em;
    font-size: 0.8em;
    color: #666;
}

.polski-legal-checkbox--error label {
    color: #c00;
}
```

## Kompatibilität mit dem Block-Checkout

Das Plugin unterstützt Checkboxen im klassischen Checkout und im Block-Checkout. Im Block-Checkout funktionieren die Checkboxen über den Block `woocommerce/checkout-terms-block`.

## Häufige Probleme

### Die Checkboxen werden nicht angezeigt

1. Prüfe, ob das Modul in den Einstellungen aktiviert ist
2. Stelle sicher, dass die Seiten für AGB und Datenschutzerklärung in WooCommerce gesetzt sind
3. Verifiziere, ob ein anderes Plugin die Checkboxen nicht entfernt

### Der Link in der Beschriftung funktioniert nicht

Prüfe, ob die Zielseite veröffentlicht ist (nicht im Entwurfsstatus) und ob das Kürzel (z. B. `[regulamin]`) korrekt eingegeben wurde.

### Die Bestellung wird trotz nicht angehakter Checkbox durchgeführt

Prüfe, ob die Checkbox als "Erforderlich" markiert ist. Verifiziere die Browser-Konsole auf JavaScript-Fehler, die die clientseitige Validierung blockieren könnten.

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), bereitgestellt ohne Gewährleistung.</div>
