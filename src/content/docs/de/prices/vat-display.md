---
title: MwSt.-Anzeige
description: Konfiguration der Brutto- und Nettopreisanzeige, MwSt.-Satz und Steuerbefreiung nach Art. 113 des polnischen MwSt.-Gesetzes in WooCommerce.
---

Das polnische Recht verlangt, dass ein Shop klar darüber informiert, ob ein Preis die MwSt. enthält. Das Plugin Polski for WooCommerce ermöglicht die Anzeige von MwSt.-Informationen, von der einfachen Kennzeichnung "brutto/netto" bis hin zum Steuersatz und zur Grundlage der Befreiung.

## Rechtliche Anforderungen

Ein Onlineshop muss:

- deutlich darüber informieren, ob der Preis die Umsatzsteuer (MwSt.) enthält
- den MwSt.-Satz angeben, wenn er sowohl an Privatkunden als auch an Unternehmen verkauft
- im Fall einer MwSt.-Befreiung die rechtliche Grundlage der Befreiung angeben

Wenn Sie die MwSt.-Befreiung nutzen (Art. 113), informieren Sie den Kunden darüber, dass der Preis keine MwSt. enthält.

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Preise** und konfigurieren Sie den Abschnitt "MwSt.-Anzeige".

### Anzeigemodi

| Modus | Beschreibung | Beispiel |
|------|------|---------|
| Brutto (mit MwSt.) | Preis enthält die Steuer | 123,00 zł brutto |
| Netto (ohne MwSt.) | Preis ohne Steuer | 100,00 zł netto |
| Beide | Beide Preise gleichzeitig | 100,00 zł netto (123,00 zł brutto) |

### Detaileinstellungen

- **MwSt.-Satz anzeigen** - zeigt den prozentualen Steuersatz neben dem Preis an (z. B. "darin 23% MwSt.")
- **MwSt.-Information in der Auflistung anzeigen** - steuert die Sichtbarkeit auf Kategorieseiten und in den Suchergebnissen
- **MwSt.-Information im Warenkorb anzeigen** - steuert die Sichtbarkeit im Warenkorb und in der Bestellzusammenfassung
- **Benutzerdefinierter Text** - ermöglicht das Überschreiben des Standardtexts der MwSt.-Information

## MwSt.-Befreiung (Art. 113)

Wenn Sie auf Grundlage von Art. 113 Abs. 1 oder Abs. 9 von der MwSt. befreit sind, konfigurieren Sie die entsprechende Mitteilung.

### Konfiguration der Befreiung

1. Gehen Sie zu **WooCommerce > Einstellungen > Polski > Preise**
2. Aktivieren Sie die Option **MwSt.-Befreiung (Art. 113)**
3. Wählen Sie die Grundlage der Befreiung:
   - **Art. 113 Abs. 1** - Befreiung für Umsätze bis 200 000 zł pro Jahr
   - **Art. 113 Abs. 9** - Befreiung für Steuerpflichtige, die ihre Tätigkeit im Laufe des Jahres aufnehmen
4. Passen Sie optional den Text der Mitteilung an

Standardmitteilung: "Der Preis enthält keine Umsatzsteuer (MwSt.) - der Verkäufer nutzt die Befreiung auf Grundlage von Art. 113 Abs. 1 des Umsatzsteuergesetzes."

### MwSt. in WooCommerce deaktivieren

Stellen Sie bei einer MwSt.-Befreiung in WooCommerce Folgendes ein:

1. **WooCommerce > Einstellungen > Steuern** - deaktivieren Sie die Steuerberechnung ODER setzen Sie den Satz auf 0%
2. Das Plugin fügt den Preisen automatisch die entsprechende Anmerkung hinzu

## Shortcode

Verwenden Sie den Shortcode `[polski_tax_notice]`, um die MwSt.-Information an einer beliebigen Stelle anzuzeigen.

### Parameter

| Parameter | Typ | Standard | Beschreibung |
|----------|-----|----------|------|
| `product_id` | int | aktuell | Produkt-ID |
| `type` | string | `auto` | Art der Information: `auto`, `gross`, `net`, `exempt` |
| `show_rate` | bool | `true` | Ob der prozentuale Satz angezeigt werden soll |
| `wrapper` | string | `span` | Umschließendes HTML-Element |

### Anwendungsbeispiele

Automatische Erkennung auf der Produktseite:

```html
[polski_tax_notice]
```

Erzwingen der Befreiungsinformation:

```html
[polski_tax_notice type="exempt"]
```

Ohne prozentualen Satz:

```html
[polski_tax_notice show_rate="false"]
```

In einer PHP-Vorlage:

```php
echo do_shortcode('[polski_tax_notice product_id="' . $product->get_id() . '"]');
```

## Konfiguration für B2B- und B2C-Shops

Wenn Sie sowohl Privatkunden (B2C) als auch Geschäftskunden (B2B) bedienen, konfigurieren Sie separate Preisansichten für jede Rolle.

### Nettopreise für Unternehmen

Das Plugin nutzt das Rollensystem von WooCommerce. Um Unternehmen Nettopreise anzuzeigen:

1. Erstellen Sie eine dedizierte Rolle (z. B. "klient_firmowy") oder verwenden Sie eine bestehende
2. Weisen Sie in den Plugin-Einstellungen die Nettoanzeige der gewählten Rolle zu
3. Geschäftskunden sehen Preise ohne MwSt., Privatkunden mit MwSt.

### Doppelte Preise auf der Produktseite

Der Modus "Beide" zeigt den Netto- und den Bruttopreis gleichzeitig an. Format:

```
100,00 zł netto
123,00 zł brutto (darin 23% MwSt.)
```

Reihenfolge und Format lassen sich in den Einstellungen anpassen.

## MwSt.-Sätze für verschiedene Produktkategorien

In Polen gelten vier MwSt.-Sätze:

| Satz | Anwendung |
|--------|-------------|
| 23% | Regelsatz - die meisten Waren und Dienstleistungen |
| 8% | Ermäßigter Satz - Wohnungsbau, Gastronomiedienstleistungen |
| 5% | Ermäßigter Satz - Lebensmittel, Bücher, Zeitschriften |
| 0% | Nullsatz - Export, innergemeinschaftliche Lieferung von Waren |

Das Plugin liest automatisch den dem Produkt zugewiesenen Satz aus und zeigt die korrekte Information an.

## MwSt.-Information in E-Mails

Das Plugin fügt den WooCommerce-E-Mails MwSt.-Informationen hinzu:

- Bestellbestätigung
- Rechnung
- Änderung des Bestellstatus

Der Inhalt der Mitteilung entspricht den Shop-Einstellungen.

## CSS-Styling

Die MwSt.-Information ist in Elemente mit CSS-Klassen eingebettet:

```css
.polski-tax-notice {
    font-size: 0.85em;
    color: #666;
}

.polski-tax-notice--exempt {
    color: #c00;
    font-weight: 600;
}

.polski-tax-notice__rate {
    white-space: nowrap;
}
```

## Häufige Probleme

### Die MwSt.-Information wird doppelt angezeigt

Prüfen Sie, ob das Theme nicht eine eigene MwSt.-Information hinzufügt. Einige polnische Themes haben eine eingebaute MwSt.-Unterstützung, deaktivieren Sie eine davon.

### Der MwSt.-Satz wird falsch angezeigt

Prüfen Sie, ob die Steuerklassen unter **WooCommerce > Einstellungen > Steuern > Standardsätze** korrekt eingestellt sind. Das Plugin liest den Satz aus der WooCommerce-Konfiguration.

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
