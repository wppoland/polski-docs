---
title: Mehrstufiger Checkout
description: Dokumentation des mehrstufigen Checkouts von Polski PRO for WooCommerce - Aufteilung des Bestellvorgangs in Schritte, Konfiguration, React Checkout Blocks und klassischer Fallback.
---

Das Modul teilt die Kasse in vier Schritte: Adresse, Versand, Zahlung und Zusammenfassung. Der Kunde sieht einen Fortschrittsbalken und durchlaeuft jeden Schritt nacheinander.

## Checkout-Schritte

Der mehrstufige Checkout besteht aus vier Schritten:

| Schritt | Standardname | Inhalt |
|------|----------------|-----------|
| 1 | Adresse | Formular fuer Rechnungsdaten und Lieferadresse |
| 2 | Versand | Auswahl der Versandmethode und Versandoptionen |
| 3 | Zahlung | Auswahl der Zahlungsmethode und Zahlungsdaten |
| 4 | Zusammenfassung | Bestelluebersicht, rechtliche Checkboxen, Schaltflaeche "Kaufen und bezahlen" |

Der Kunde kann zu vorherigen Schritten zurueckkehren, ohne eingegebene Daten zu verlieren. Der Wechsel zum naechsten Schritt erfordert das korrekte Ausfuellen des aktuellen Formulars.

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > PRO-Module > Checkout**.

### Modul aktivieren

Der mehrstufige Checkout wird ueber folgende Option gesteuert:

```
polski_pro_checkout[multistep_enabled]
```

Der Wert `1` aktiviert das mehrstufige Layout, `0` stellt den Standard-WooCommerce-Checkout wieder her.

### Schrittnamen

Die Standardnamen der Schritte koennen in den Einstellungen geaendert werden:

| Einstellung | Standardwert |
|------------|-----------------|
| Titel Schritt 1 | Adresse |
| Titel Schritt 2 | Versand |
| Titel Schritt 3 | Zahlung |
| Titel Schritt 4 | Zusammenfassung |

Die Schrittnamen werden im Fortschrittsbalken ueber dem Checkout-Formular angezeigt.

### Validierung zwischen Schritten

Das Plugin validiert die Daten nach jedem Schritt, bevor der Wechsel zum naechsten erlaubt wird:

- **Schritt 1 (Adresse)** - erforderliche Felder: Vorname, Nachname, Adresse, Stadt, Postleitzahl, Telefon, E-Mail
- **Schritt 2 (Versand)** - Auswahl einer Versandmethode erforderlich
- **Schritt 3 (Zahlung)** - Auswahl einer Zahlungsmethode erforderlich
- **Schritt 4 (Zusammenfassung)** - Pflicht-Checkboxen fuer rechtliche Einwilligungen muessen aktiviert sein

Validierungsmeldungen erscheinen inline unter dem entsprechenden Feld.

## Technische Implementierung

### WooCommerce Checkout Blocks (React)

Fuer Shops, die WooCommerce Checkout Blocks (Block-Editor) verwenden, nutzt das Modul React zum Rendern der Schritte. Die Komponenten integrieren sich mit der WooCommerce Store API und sind vollstaendig kompatibel mit Checkout-Blocks-Erweiterungen.

Das Rendering erfolgt clientseitig. Das Plugin registriert sich als Checkout-Blocks-Erweiterung und modifiziert das Formularlayout, ohne in die WooCommerce-Logik einzugreifen.

### Klassischer Fallback (Shortcode)

Fuer Shops, die den klassischen Checkout (Shortcode `[woocommerce_checkout]`) verwenden, bietet das Modul einen JavaScript-Fallback. Das Skript teilt das vorhandene Formular in Abschnitte auf und fuegt eine Navigation zwischen ihnen hinzu.

Der klassische Fallback:

- erfordert kein React
- funktioniert mit bestehenden Themes und Checkout-Anpassungen
- unterstuetzt dieselben vier Schritte wie die Blocks-Version
- verwendet jQuery zur DOM-Manipulation

### Modus-Erkennung

Das Plugin erkennt automatisch, ob der Checkout Checkout Blocks oder den klassischen Shortcode verwendet, und laedt die entsprechende Implementierung. Eine manuelle Konfiguration des Modus ist nicht erforderlich.

## Styling

### CSS-Klasse am Body

Wenn der mehrstufige Checkout aktiv ist, wird dem `<body>`-Element die Klasse hinzugefuegt:

```
polski-multistep-checkout
```

Dies ermoeglicht das gezielte Anwenden von CSS-Stilen nur auf Seiten mit dem mehrstufigen Checkout:

```css
body.polski-multistep-checkout .woocommerce-checkout {
    max-width: 720px;
    margin: 0 auto;
}
```

### Schritt-Klassen

Jeder Schritt erhaelt eigene CSS-Klassen:

```css
.polski-checkout-step { /* gemeinsame Schritt-Stile */ }
.polski-checkout-step--active { /* aktiver Schritt */ }
.polski-checkout-step--completed { /* abgeschlossener Schritt */ }
.polski-checkout-step--address { /* Adressschritt */ }
.polski-checkout-step--shipping { /* Versandschritt */ }
.polski-checkout-step--payment { /* Zahlungsschritt */ }
.polski-checkout-step--review { /* Zusammenfassungsschritt */ }
```

### Fortschrittsbalken

Der Fortschrittsbalken wird als `<ol>`-Element mit der Klasse `.polski-checkout-progress` gerendert. Jedes Listenelement entspricht einem Schritt:

```css
.polski-checkout-progress { /* Container des Balkens */ }
.polski-checkout-progress__step { /* einzelner Schritt im Balken */ }
.polski-checkout-progress__step--active { /* aktiver Schritt im Balken */ }
.polski-checkout-progress__step--done { /* abgeschlossener Schritt im Balken */ }
```

## Kompatibilitaet mit anderen Modulen

### Rechtliche Checkboxen

Rechtliche Checkboxen aus der kostenlosen Version von Polski for WooCommerce werden automatisch in Schritt 4 (Zusammenfassung) verschoben. Der Kunde muss sie vor der Bestellaufgabe aktivieren.

### NIP-Feld

Das NIP-Feld wird in Schritt 1 (Adresse) angezeigt, gemaess der Konfiguration der bedingten Anzeige aus dem NIP-Modul.

### Benutzerdefinierte Felder

Felder, die von anderen Plugins hinzugefuegt werden (z. B. ueber den Hook `woocommerce_checkout_fields`), werden automatisch dem entsprechenden Schritt basierend auf ihrer Sektion zugewiesen:

- `billing_*` - Schritt 1
- `shipping_*` - Schritt 2
- `order_*` - Schritt 4

## Barrierefreiheit (a11y)

Der mehrstufige Checkout unterstuetzt:

- Tastaturnavigation (Tab, Enter, Escape)
- ARIA-Attribute (`aria-current`, `aria-label`, `role="tablist"`)
- Ankuendigung von Schrittwechseln durch Screenreader
- Sichtbaren Fokus auf interaktiven Elementen

## Leistung

Das Modul laedt Skripte und Stile nur auf der Checkout-Seite. Auf anderen Shopseiten werden keine zusaetzlichen Ressourcen hinzugefuegt. Skripte werden mit dem Attribut `defer` geladen, um das Rendern der Seite nicht zu blockieren.

## Haeufige Probleme

### Checkout wird nicht in Schritte aufgeteilt

1. Pruefen Sie, ob die Option `polski_pro_checkout[multistep_enabled]` auf `1` gesetzt ist
2. Leeren Sie den Cache (Cache-Plugins, CDN, Browser-Cache)
3. Pruefen Sie die Browserkonsole auf JavaScript-Fehler
4. Ueberpruefen Sie, ob kein Konflikt mit anderen Plugins besteht, die den Checkout modifizieren

### Formular wechselt nicht zum naechsten Schritt

1. Pruefen Sie, ob alle erforderlichen Felder ausgefuellt sind
2. Ueberpruefen Sie die Validierungsmeldungen unter den Feldern
3. Pruefen Sie die Browserkonsole - AJAX-Fehler koennen die Validierung blockieren

### Stile funktionieren nicht korrekt

1. Pruefen Sie, ob die Klasse `polski-multistep-checkout` auf dem `<body>`-Element vorhanden ist
2. Ueberpruefen Sie, ob Plugin-Stile nicht vom Theme ueberschrieben werden (verwenden Sie den Inspektor)
3. Fuegen Sie eigene Stile mit hoeherer Selektor-Spezifizitaet hinzu

## Verwandte Ressourcen

- [Rechtliche Checkboxen](/checkout/legal-checkboxes/)
- [NIP im Checkout](/checkout/nip-lookup/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
