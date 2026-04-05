---
title: MwSt.-Anzeige
description: Konfiguration der Brutto- und Nettopreisanzeige, MwSt.-Satz und Steuerbefreiung nach Art. 113 des polnischen MwSt.-Gesetzes in WooCommerce.
---

Polnisches Recht verlangt, dass der Shop klar informiert, ob der Preis MwSt. enthaelt. Polski for WooCommerce zeigt die MwSt.-Information an - von einfacher "brutto/netto"-Kennzeichnung bis zu Steuersatz und Befreiungsgrundlage.

## Rechtliche Anforderungen

Gemaess dem Gesetz ueber die Preisinformation fuer Waren und Dienstleistungen und dem MwSt.-Gesetz muss ein Onlineshop:

- klar informieren, ob der Preis die MwSt. enthaelt
- den MwSt.-Satz angeben, wenn sowohl an Privat- als auch an Firmenkunden verkauft wird
- bei Steuerbefreiung - die Rechtsgrundlage der Befreiung angeben

Verkaeufer, die die Kleinunternehmerregelung (Art. 113 MwSt.-Gesetz) nutzen, muessen den Kunden informieren, dass der Preis wegen der Befreiung keine MwSt. enthaelt.

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Preise** und konfigurieren Sie den Abschnitt "MwSt.-Anzeige".

### Anzeigemodi

| Modus | Beschreibung | Beispiel |
|------|------|---------|
| Brutto (mit MwSt.) | Preis enthaelt Steuer | 123,00 PLN brutto |
| Netto (ohne MwSt.) | Preis ohne Steuer | 100,00 PLN netto |
| Beide | Beide Preise gleichzeitig | 100,00 PLN netto (123,00 PLN brutto) |

### Detaillierte Einstellungen

- **MwSt.-Satz anzeigen** - zeigt den prozentualen Steuersatz neben dem Preis an (z.B. "inkl. 23% MwSt.")
- **MwSt.-Info im Listing anzeigen** - steuert die Sichtbarkeit auf Kategorie- und Suchergebnisseiten
- **MwSt.-Info im Warenkorb anzeigen** - steuert die Sichtbarkeit im Warenkorb und der Bestelluebersicht
- **Benutzerdefinierter Text** - ermoeglicht das Ueberschreiben des Standard-MwSt.-Informationstextes

## MwSt.-Befreiung (Art. 113)

Verkaeufer, die von der MwSt. auf Basis von Art. 113 Abs. 1 oder Abs. 9 des Umsatzsteuergesetzes befreit sind, koennen eine entsprechende Meldung konfigurieren.

### Befreiungskonfiguration

1. Gehen Sie zu **WooCommerce > Einstellungen > Polski > Preise**
2. Aktivieren Sie die Option **MwSt.-Befreiung (Art. 113)**
3. Waehlen Sie die Befreiungsgrundlage:
   - **Art. 113 Abs. 1** - Befreiung fuer Umsaetze bis 200.000 PLN jaehrlich
   - **Art. 113 Abs. 9** - Befreiung fuer Steuerpflichtige, die im laufenden Jahr beginnen
4. Passen Sie optional den Meldungstext an

Standardmeldung: "Der Preis enthaelt keine MwSt. - der Verkaeufer nutzt die Befreiung gemaess Art. 113 Abs. 1 des MwSt.-Gesetzes."

### MwSt. in WooCommerce deaktivieren

Bei MwSt.-Befreiung stellen Sie in WooCommerce ein:

1. **WooCommerce > Einstellungen > Steuern** - Steuerberechnung deaktivieren ODER Satz auf 0% setzen
2. Das Plugin fuegt automatisch die entsprechende Anmerkung zu den Preisen hinzu

## Shortcode

Verwenden Sie den Shortcode `[polski_tax_notice]`, um die MwSt.-Information an einer beliebigen Stelle anzuzeigen.

### Parameter

| Parameter | Typ | Standard | Beschreibung |
|----------|-----|----------|------|
| `product_id` | int | aktuell | Produkt-ID |
| `type` | string | `auto` | Informationstyp: `auto`, `gross`, `net`, `exempt` |
| `show_rate` | bool | `true` | Ob der Prozentsatz angezeigt werden soll |
| `wrapper` | string | `span` | Umschliessendes HTML-Element |

### Verwendungsbeispiele

Automatische Erkennung auf der Produktseite:

```html
[polski_tax_notice]
```

Befreiungsinformation erzwingen:

```html
[polski_tax_notice type="exempt"]
```

Ohne Prozentsatz:

```html
[polski_tax_notice show_rate="false"]
```

Im PHP-Template:

```php
echo do_shortcode('[polski_tax_notice product_id="' . $product->get_id() . '"]');
```

## Konfiguration fuer B2B- und B2C-Shops

Shops, die sowohl Privatkunden (B2C) als auch Firmenkunden (B2B) bedienen, koennen unterschiedliche Preisansichten je nach Benutzerrolle konfigurieren.

### Nettopreise fuer Firmen

Das Plugin arbeitet mit dem WooCommerce-Rollensystem zusammen. Um Nettopreise fuer Firmenkunden anzuzeigen:

1. Erstellen Sie eine dedizierte Rolle (z.B. "firmenkunde") oder verwenden Sie eine vorhandene
2. Weisen Sie in den Plugin-Einstellungen die Nettoanzeige der gewaehlten Rolle zu
3. Firmenkunden sehen Preise ohne MwSt., Privatkunden mit MwSt.

### Doppelte Preise auf der Produktseite

Die Aktivierung des Modus "Beide" zeigt Netto- und Bruttopreis gleichzeitig an. Praesentationsformat:

```
100,00 PLN netto
123,00 PLN brutto (inkl. 23% MwSt.)
```

Reihenfolge und Format koennen in den Einstellungen angepasst werden.

## MwSt.-Saetze fuer verschiedene Produktkategorien

In Polen gelten vier MwSt.-Saetze:

| Satz | Anwendung |
|--------|-------------|
| 23% | Standardsatz - die meisten Waren und Dienstleistungen |
| 8% | Ermaessigter Satz - Wohnungsbau, Gastronomie |
| 5% | Ermaessigter Satz - Lebensmittel, Buecher, Zeitschriften |
| 0% | Nullsatz - Export, innergemeinschaftliche Lieferung |

Das Plugin erkennt automatisch den dem Produkt in WooCommerce zugewiesenen Satz und zeigt die entsprechende Information an.

## MwSt.-Information in E-Mails

Das Plugin fuegt die MwSt.-Information auch zu WooCommerce-Transaktions-E-Mails hinzu:

- Bestellbestaetigung
- Rechnung
- Statusaenderung der Bestellung

Der Meldungsinhalt ist konsistent mit den Shop-Einstellungen.

## CSS-Styling

Die MwSt.-Information ist in Elemente mit dedizierten CSS-Klassen eingebettet:

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

## Haeufige Probleme

### MwSt.-Information wird doppelt angezeigt

Pruefen Sie, ob das Theme nicht seine eigene MwSt.-Information hinzufuegt. Einige fuer den polnischen Markt dedizierte Themes haben eine eingebaute MwSt.-Unterstuetzung - deaktivieren Sie in diesem Fall eine der Implementierungen.

### MwSt.-Satz wird falsch angezeigt

Stellen Sie sicher, dass die Steuerklassen unter **WooCommerce > Einstellungen > Steuern > Standardsaetze** korrekt konfiguriert sind. Das Plugin liest den Satz direkt aus der WooCommerce-Konfiguration.

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
