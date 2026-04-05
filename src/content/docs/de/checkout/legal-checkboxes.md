---
title: Rechtliche Checkboxen
description: Konfiguration, Validierung und Personalisierung der obligatorischen rechtlichen Checkboxen auf der WooCommerce-Kassenseite.
---

Vor der Bestellung muss der Kunde die AGB und die Datenschutzerklaerung akzeptieren. Polski for WooCommerce fuegt rechtliche Checkboxen mit konfigurierbarem Inhalt, Validierung und Fehlermeldungen hinzu.

## Rechtliche Anforderungen

Der Shop muss eine ausdrueckliche Einwilligung des Kunden einholen zu:

- AGB (Kaufvertragsbedingungen)
- Datenschutzerklaerung (Verarbeitung personenbezogener Daten)
- Widerrufsrecht (Information ueber die 14-Tage-Frist)

Die Einwilligungen muessen aktiv erteilt werden (Checkbox darf nicht vorausgewaehlt sein) und fuer jeden Zweck einzeln erfolgen.

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Kasse** und konfigurieren Sie den Abschnitt "Rechtliche Checkboxen".

### Standard-Checkboxen

Das Plugin fuegt folgende Checkboxen hinzu:

| Checkbox | Erforderlich | Standard-Text |
|----------|----------|----------------|
| AGB | Ja | Ich habe die [AGB] gelesen und akzeptiere deren Bestimmungen. |
| Datenschutzerklaerung | Ja | Ich habe die [Datenschutzerklaerung] gelesen und stimme der Verarbeitung meiner personenbezogenen Daten zu. |
| Widerrufsrecht | Ja | Ich wurde ueber das Widerrufsrecht innerhalb von 14 Tagen informiert. |
| Marketing-Einwilligung | Nein | Ich stimme dem Erhalt kommerzieller Informationen auf elektronischem Wege zu. |

### Benutzerdefinierte Checkbox hinzufuegen

Klicken Sie im Konfigurationspanel auf **Checkbox hinzufuegen** und fuellen Sie das Formular aus:

| Feld | Beschreibung |
|------|------|
| Name | Interne Kennung (z.B. `newsletter_consent`) |
| Label | Neben der Checkbox angezeigter Text |
| Erforderlich | Ob die Checkbox fuer die Bestellung angekreuzt werden muss |
| Position | Anzeigereihenfolge (Zahl) |
| Beschreibung | Zusaetzlicher Text unter der Checkbox (optional) |
| Fehlermeldung | Text bei nicht angekreuzter Pflicht-Checkbox |

### Label-Formatierung

Im Label-Text koennen Sie verwenden:

- `[regulamin]` - automatischer Link zur AGB-Seite
- `[polityka-prywatnosci]` - automatischer Link zur Datenschutzerklaerung
- `[odstapienie]` - Link zur Widerrufsseite
- `<a href="URL">Text</a>` - benutzerdefinierter Link
- `<strong>Text</strong>` - Fettschrift

AGB- und Datenschutzseiten werden aus den WooCommerce-Einstellungen geladen (**WooCommerce > Einstellungen > Erweitert > Seiteneinstellungen**).

## Validierung

### Serverseitige Validierung

Das Plugin validiert Checkboxen serverseitig ueber den Hook `woocommerce_checkout_process`. Wenn eine Pflicht-Checkbox nicht angekreuzt ist, wird die Bestellung nicht aufgegeben und der Kunde sieht eine Fehlermeldung.

### Clientseitige Validierung

Optionale JavaScript-Validierung zeigt die Fehlermeldung sofort nach Klick auf den Bestellbutton an, ohne Seitenneuladung. Aktivieren Sie sie in den Einstellungen:

**WooCommerce > Einstellungen > Polski > Kasse > JS-Checkbox-Validierung**

### Fehlermeldungen

Jede Checkbox hat eine konfigurierbare Fehlermeldung. Standard-Meldungen:

| Checkbox | Fehlermeldung |
|----------|----------------|
| AGB | Um eine Bestellung aufzugeben, muessen Sie die AGB akzeptieren. |
| Datenschutzerklaerung | Um eine Bestellung aufzugeben, muessen Sie die Datenschutzerklaerung akzeptieren. |
| Widerrufsrecht | Sie muessen die Kenntnisnahme der Widerrufsbelehrung bestaetigen. |

## Einwilligungsspeicherung

Das Plugin speichert Informationen ueber erteilte Einwilligungen:

- als Bestellmetadaten (`_polski_consent_*`)
- mit Datum und Uhrzeit der Einwilligung
- mit der Version der AGB/Datenschutzerklaerung (bei aktivierter Versionsverfolgung)

Diese Informationen sind im Administrationspanel der Bestellung sichtbar und koennen auf Anfrage exportiert werden (DSGVO).

### Einwilligungsansicht in der Bestellung

In der Bestellansicht im Administrationspanel, im Abschnitt "Rechtliche Einwilligungen", finden Sie die Liste der erteilten Einwilligungen mit Daten.

## Programmatische Checkbox-Verwaltung

### Checkbox programmatisch hinzufuegen

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    $checkboxes['custom_consent'] = [
        'label'         => 'Ich stimme der Datenverarbeitung zum Zweck der Reklamationsbearbeitung zu.',
        'required'      => true,
        'position'      => 50,
        'error_message' => 'Sie muessen der Datenverarbeitung zustimmen.',
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

### Vorhandene Checkbox aendern

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    if (isset($checkboxes['terms'])) {
        $checkboxes['terms']['label'] = 'Ich akzeptiere die <a href="/agb">AGB</a> des Shops.';
    }

    return $checkboxes;
});
```

### Bedingte Checkbox-Anzeige

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    $cart_total = WC()->cart->get_total('edit');

    if ($cart_total > 500) {
        $checkboxes['high_value_consent'] = [
            'label'         => 'Ich bestatige die Bestellung im Wert von ueber 500 PLN.',
            'required'      => true,
            'position'      => 60,
            'error_message' => 'Sie muessen die Bestellung mit hohem Wert bestaetigen.',
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

## Kompatibilitaet mit Block Checkout

Das Plugin unterstuetzt rechtliche Checkboxen sowohl im klassischen Checkout als auch im Block Checkout. Beim Block Checkout werden Checkboxen ueber den Block `woocommerce/checkout-terms-block` gerendert.

## Haeufige Probleme

### Checkboxen werden nicht angezeigt

1. Pruefen Sie, ob das Modul in den Einstellungen aktiviert ist
2. Stellen Sie sicher, dass AGB- und Datenschutzseiten in WooCommerce eingestellt sind
3. Ueberpruefen Sie, ob ein anderes Plugin die Checkboxen entfernt

### Link im Label funktioniert nicht

Pruefen Sie, ob die Zielseite veroeffentlicht ist (nicht im Entwurfsmodus) und ob der Shortcut (z.B. `[regulamin]`) korrekt eingegeben ist.

### Bestellung geht trotz nicht angekreuzter Checkbox durch

Pruefen Sie, ob die Checkbox als "Erforderlich" markiert ist. Ueberpruefen Sie die Browser-Konsole auf JavaScript-Fehler, die die clientseitige Validierung blockieren koennten.

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
