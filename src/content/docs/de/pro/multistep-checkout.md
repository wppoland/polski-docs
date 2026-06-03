---
title: Mehrstufiger Checkout
description: Dokumentation des mehrstufigen Checkouts von Polski PRO for WooCommerce - Aufteilung des Bestellvorgangs in Schritte, Konfiguration, React Checkout Blocks und klassischer Fallback.
---

Das Modul teilt die Kasse in vier Schritte auf: Adresse, Versand, Zahlung und Zusammenfassung. Der Kunde sieht eine Fortschrittsleiste und durchläuft die Schritte nacheinander.

## Kassenschritte

Der mehrstufige Checkout besteht aus vier Schritten:

| Schritt | Standardname | Inhalt |
|------|----------------|-----------|
| 1 | Adresse | Formular mit Rechnungsdaten und Lieferadresse |
| 2 | Versand | Auswahl der Versandmethode und Versandoptionen |
| 3 | Zahlung | Auswahl der Zahlungsmethode und Zahlungsdaten |
| 4 | Zusammenfassung | Bestellübersicht, rechtliche Checkboxen, Button "Kaufen und bezahlen" |

Der Kunde kann ohne Datenverlust zurückgehen. Der Übergang zum nächsten Schritt erfordert das korrekte Ausfüllen des aktuellen Formulars.

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > PRO-Module > Kasse**.

### Modul aktivieren

Der mehrstufige Checkout wird über folgende Option gesteuert:

```
polski_pro_checkout[multistep_enabled]
```

Der Wert `1` aktiviert das mehrstufige Layout, `0` stellt die Standard-Kasse von WooCommerce wieder her.

### Schrittnamen

Die Standardnamen der Schritte lassen sich in den Einstellungen ändern:

| Einstellung | Standardwert |
|------------|-----------------|
| Titel von Schritt 1 | Adresse |
| Titel von Schritt 2 | Versand |
| Titel von Schritt 3 | Zahlung |
| Titel von Schritt 4 | Zusammenfassung |

Die Schrittnamen werden in der Fortschrittsleiste über dem Kassenformular angezeigt.

### Validierung zwischen den Schritten

Das Plugin prüft die Daten nach jedem Schritt vor dem Übergang zum nächsten:

- **Schritt 1 (Adresse)** - Pflichtfelder: Vorname, Nachname, Adresse, Stadt, Postleitzahl, Telefon, E-Mail
- **Schritt 2 (Versand)** - Auswahl der Versandmethode erforderlich
- **Schritt 3 (Zahlung)** - Auswahl der Zahlungsmethode erforderlich
- **Schritt 4 (Zusammenfassung)** - Aktivierung der verpflichtenden rechtlichen Checkboxen erforderlich

Fehlermeldungen erscheinen unter den Feldern.

## Technische Umsetzung

### WooCommerce Checkout Blocks (React)

Für Shops mit WooCommerce Checkout Blocks nutzt das Modul React. Es integriert sich in die WooCommerce Store API und greift nicht in die WooCommerce-Logik ein.

### Klassischer Fallback (Shortcode)

Für die klassische Kasse (Shortcode `[woocommerce_checkout]`) nutzt das Modul einen JavaScript-Fallback - es teilt das Formular in Abschnitte auf und ergänzt eine Navigation.

Der klassische Fallback:

- erfordert kein React
- funktioniert mit bestehenden Themes und Kassen-Anpassungen
- unterstützt dieselben vier Schritte wie die Blocks-Version
- nutzt jQuery zur DOM-Manipulation

### Modus-Erkennung

Das Plugin erkennt den Kassentyp (Blocks oder Shortcode) selbst und lädt die passende Version. Es muss nichts manuell eingestellt werden.

## Gestaltung

### CSS-Klasse am Body

Wenn der mehrstufige Checkout aktiv ist, erhält `<body>` die Klasse:

```
polski-multistep-checkout
```

Dadurch zielt CSS nur auf Seiten mit mehrstufiger Kasse ab:

```css
body.polski-multistep-checkout .woocommerce-checkout {
    max-width: 720px;
    margin: 0 auto;
}
```

### Schritt-Klassen

Jeder Schritt erhält eine eigene CSS-Klasse:

```css
.polski-checkout-step { /* wspólne style kroków */ }
.polski-checkout-step--active { /* aktywny krok */ }
.polski-checkout-step--completed { /* ukończony krok */ }
.polski-checkout-step--address { /* krok adresowy */ }
.polski-checkout-step--shipping { /* krok dostawy */ }
.polski-checkout-step--payment { /* krok płatności */ }
.polski-checkout-step--review { /* krok podsumowania */ }
```

### Fortschrittsleiste

Die Fortschrittsleiste ist ein `<ol>`-Element mit der Klasse `.polski-checkout-progress`:

```css
.polski-checkout-progress { /* kontener paska */ }
.polski-checkout-progress__step { /* pojedynczy krok w pasku */ }
.polski-checkout-progress__step--active { /* aktywny krok w pasku */ }
.polski-checkout-progress__step--done { /* ukończony krok w pasku */ }
```

## Kompatibilität mit anderen Modulen

### Rechtliche Checkboxen

Die rechtlichen Checkboxen aus der kostenlosen Version landen in Schritt 4 (Zusammenfassung). Der Kunde aktiviert sie vor der Bestellaufgabe.

### NIP-Feld

Das NIP-Feld wird in Schritt 1 (Adresse) angezeigt, gemäß den Einstellungen des NIP-Moduls.

### Benutzerdefinierte Felder

Von anderen Plugins hinzugefügte Felder (z. B. über den Hook `woocommerce_checkout_fields`) werden anhand des Abschnitts den Schritten zugeordnet:

- `billing_*` - Schritt 1
- `shipping_*` - Schritt 2
- `order_*` - Schritt 4

## Barrierefreiheit (a11y)

Der mehrstufige Checkout unterstützt:

- Tastaturnavigation (Tab, Enter, Escape)
- ARIA-Attribute (`aria-current`, `aria-label`, `role="tablist"`)
- Ansage von Schrittwechseln durch Screenreader
- sichtbaren Fokus auf interaktiven Elementen

## Performance

Skripte und Styles werden nur auf der Kassenseite geladen. Auf anderen Seiten fügt das Modul keine Ressourcen hinzu. Die Skripte haben das Attribut `defer` und blockieren das Rendering nicht.

## Häufige Probleme

### Die Kasse wird nicht in Schritte aufgeteilt

1. Prüfen Sie, ob die Option `polski_pro_checkout[multistep_enabled]` auf `1` gesetzt ist
2. Leeren Sie den Cache (Cache-Plugins, CDN, Browser-Cache)
3. Prüfen Sie die Browser-Konsole auf JavaScript-Fehler
4. Überprüfen Sie, ob kein Konflikt mit anderen Plugins besteht, die die Kasse verändern

### Das Formular geht nicht zum nächsten Schritt über

1. Prüfen Sie, ob alle Pflichtfelder ausgefüllt sind
2. Überprüfen Sie die Validierungsmeldungen unter den Feldern
3. Prüfen Sie die Browser-Konsole, AJAX-Fehler können die Validierung blockieren

### Styles funktionieren nicht korrekt

1. Prüfen Sie, ob die Klasse `polski-multistep-checkout` am `<body>`-Element vorhanden ist
2. Überprüfen Sie, ob die Plugin-Styles nicht vom Theme überschrieben werden (nutzen Sie den Inspektor)
3. Fügen Sie eigene Styles mit höherer Selektor-Spezifität hinzu

## Verwandte Ressourcen

- [Rechtliche Checkboxen](/checkout/legal-checkboxes/)
- [NIP an der Kasse](/checkout/nip-lookup/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
