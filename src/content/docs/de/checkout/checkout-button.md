---
title: Bestellbutton mit Zahlungspflicht
description: Konfiguration des Buttons "Zahlungspflichtig bestellen" gemaess polnischem Verbraucherrecht in WooCommerce.
---

Polnisches Recht verlangt, dass der Bestellbutton den Text "Bestellung mit Zahlungspflicht" oder eine gleichbedeutende Formulierung enthaelt. Polski for WooCommerce aendert den Standard-Buttontext automatisch.

## Rechtliche Anforderungen

Der Button muss klar auf die Zahlungspflicht hinweisen. Akzeptierte Varianten:

- "Zamawiam z obowiazkiem zaplaty" (Zahlungspflichtig bestellen)
- "Zamawiam i place" (Bestellen und bezahlen)
- "Kupuje i place" (Kaufen und bezahlen)

Texte wie "Bestellung aufgeben", "Bestellen" oder "Bestaetigen" erfuellen die Anforderungen nicht und koennen zu Strafen fuehren.

![Kassenseite mit rechtlichen Checkboxen und Bestellbutton](../../../../assets/screenshots/screenshot-3-checkout-checkboxes.png)

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Kasse** und konfigurieren Sie den Abschnitt "Bestellbutton".

### Einstellungen

| Einstellung | Standardwert | Beschreibung |
|------------|-----------------|------|
| Button-Text | Zamawiam z obowiazkiem zaplaty | Auf dem Button angezeigter Text |
| Fuer alle Zahlungsmethoden ueberschreiben | Ja | Ob der Text unabhaengig von der gewaehlten Methode angewendet wird |
| Text der Zahlungsanbieter ueberschreiben | Ja | Ob die von Zahlungsanbieter-Plugins gesetzten Texte ueberschrieben werden |

### Texte pro Zahlungsmethode

Einige Zahlungsanbieter (z.B. PayPal, Przelewy24) setzen eigene Button-Texte. Das Plugin ermoeglicht die Wahl, ob:

1. **Alle ueberschreiben** - zeigt immer den eingestellten Text an (empfohlen)
2. **Anbieter-Texte beibehalten** - erlaubt Anbietern, eigene Texte zu setzen (stellen Sie sicher, dass diese den rechtlichen Anforderungen entsprechen)

## Technische Implementierung

Das Plugin aendert den Button-Text ueber den WooCommerce-Filter:

```php
add_filter('woocommerce_order_button_text', function (): string {
    return 'Zamawiam z obowiazkiem zaplaty';
});
```

### Kompatibilitaet mit Block Checkout

Das Plugin unterstuetzt sowohl den klassischen Checkout (Shortcode) als auch den neuen Block Checkout (Gutenberg). Beim Block Checkout erfolgt die Aenderung ueber:

- Filter `woocommerce_order_button_text` (klassisch)
- Store API Endpoint (Block Checkout)

### Kompatibilitaet mit beliebten Plugins

Das Plugin ist kompatibel mit beliebten Zahlungsanbietern auf dem polnischen Markt:

- Przelewy24
- PayU
- Tpay
- Stripe
- PayPal
- BLIK (ueber verschiedene Anbieter)

## Text anpassen

### Text in den Einstellungen aendern

Der einfachste Weg - aendern Sie den Text unter **WooCommerce > Einstellungen > Polski > Kasse**. Beachten Sie, dass der neue Text weiterhin die Information ueber die Zahlungspflicht enthalten muss.

### Text programmatisch aendern

```php
add_filter('woocommerce_order_button_text', function (string $text): string {
    return 'Kupuje i place';
}, 20);
```

Die Prioritaet `20` stellt sicher, dass der Filter nach dem Plugin-Filter (Prioritaet `10`) ausgefuehrt wird.

### Text abhaengig von der Zahlungsmethode

```php
add_filter('woocommerce_order_button_text', function (string $text): string {
    $chosen_payment = WC()->session->get('chosen_payment_method');

    if ($chosen_payment === 'bacs') {
        return 'Zamawiam z obowiazkiem zaplaty przelewem';
    }

    if ($chosen_payment === 'cod') {
        return 'Zamawiam z obowiazkiem zaplaty przy odbiorze';
    }

    return 'Zamawiam z obowiazkiem zaplaty';
}, 20);
```

## Button-Styling

Der Button behaelt die Standard-CSS-Klassen von WooCommerce bei. Sie koennen sein Aussehen anpassen:

```css
#place_order {
    background-color: #2e7d32;
    font-size: 1.1em;
    font-weight: 700;
    padding: 0.8em 2em;
    text-transform: none;
}

#place_order:hover {
    background-color: #1b5e20;
}
```

Fuer Block Checkout:

```css
.wc-block-components-checkout-place-order-button {
    background-color: #2e7d32;
    font-weight: 700;
}
```

## Testen

Pruefen Sie den Button nach der Konfiguration in folgenden Szenarien:

1. Checkout mit verschiedenen Zahlungsmethoden
2. Checkout als Gast und angemeldeter Benutzer
3. Checkout mit Rabattgutschein (Coupon)
4. Checkout mit Abonnement (bei WooCommerce Subscriptions)
5. Mobiler Checkout - stellen Sie sicher, dass der Text nicht abgeschnitten wird

## Haeufige Probleme

### Button-Text kehrt zum Standard "Place order" zurueck

Pruefen Sie, ob:

1. Das Plugin aktiv und das Kasse-Modul aktiviert ist
2. Kein anderes Plugin den Filter mit hoeherer Prioritaet ueberschreibt
3. Das Theme den Button-Text nicht im Template fest codiert

### Text wird auf mobilen Geraeten abgeschnitten

Der lange Text "Zamawiam z obowiazkiem zaplaty" passt moeglicherweise nicht auf schmale Bildschirme. Erwaegen Sie:

- Verwendung einer kuerzeren Variante: "Kupuje i place"
- CSS-Anpassung: `white-space: normal` auf dem Button

### Block Checkout aendert den Text nicht

Stellen Sie sicher, dass Sie die neueste Plugin-Version verwenden. Aeltere Versionen unterstuetzen moeglicherweise den Block Checkout nicht. Pruefen Sie auch, ob WooCommerce Blocks aktualisiert ist.

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
