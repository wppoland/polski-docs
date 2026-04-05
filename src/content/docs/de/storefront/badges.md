---
title: Produktlabels
description: Label-Modul in Polski for WooCommerce - automatische Badges (Sale, Neu, Niedriger Bestand, Bestseller) und manuelle Labels pro Produkt.
---

Labels (Badges) sind farbige Abzeichen, die auf Produktbildern angezeigt werden. Sie helfen Kunden, Produkte im Angebot, Neuheiten, Bestseller und Produkte mit niedrigem Lagerbestand schnell zu identifizieren.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie die Option **Produktlabels**. Das Modul ersetzt das Standard-WooCommerce-Badge "Sale!" durch eigene, konfigurierbare Labels.

## Automatische Labels

Automatische Labels werden basierend auf Produktdaten generiert. Sie erfordern keine manuelle Konfiguration - nach der Aktivierung funktionieren sie sofort auf allen Produkten.

### Sale

Wird angezeigt, wenn das Produkt einen Aktionspreis hat. Zeigt standardmaessig den Rabattprozentsatz (z.B. **-25%**) statt des Standardtexts "Sale!".

Formatkonfiguration:

| Option          | Beschreibung                             | Beispiel      |
| -------------- | -------------------------------- | ------------- |
| Prozent        | Rabattprozentsatz                   | -25%          |
| Betrag          | Ersparnis                               | -50 PLN        |
| Text          | Eigener Text                     | Aktion      |
| Prozent + Betrag| Beide Werte                    | -25% (-50 PLN) |

```php
// Format des Sale-Badges aendern
add_filter('polski/badges/sale_format', function (): string {
    return 'percentage'; // 'percentage', 'amount', 'text', 'both'
});
```

### Neu

Wird auf Produkten angezeigt, die innerhalb der letzten X Tage hinzugefuegt wurden. Standard **14 Tage**.

```php
// Neuheitszeitraum aendern
add_filter('polski/badges/new_days', function (): int {
    return 30; // in den letzten 30 Tagen hinzugefuegte Produkte
});
```

### Niedriger Lagerbestand

Wird angezeigt, wenn die Produktmenge im Lager unter einen festgelegten Schwellenwert faellt. Standardmaessig der in WooCommerce eingestellte Wert (**WooCommerce > Einstellungen > Produkte > Lager > Schwelle fuer niedrigen Bestand**).

Label-Text: **Letzte X Stueck!** (wobei X die aktuelle Menge ist).

```php
// Eigener Text fuer das Label "Niedriger Bestand"
add_filter('polski/badges/low_stock_text', function (string $text, int $stock): string {
    if ($stock <= 3) {
        return 'Letzte Stuecke!';
    }
    return sprintf('%d Stueck uebrig', $stock);
}, 10, 2);
```

### Bestseller

Wird auf Produkten mit den hoechsten Verkaufszahlen angezeigt. Standardmaessig die **Top 10 Produkte** im Shop.

```php
// Bestseller-Limit aendern
add_filter('polski/badges/bestseller_limit', function (): int {
    return 20;
});
```

## Manuelle Labels (pro Produkt)

Neben automatischen Labels koennen Sie eigene Badges zu einzelnen Produkten hinzufuegen. Im Produkteditor im Panel **Produktdaten** finden Sie den Tab **Labels**.

Optionen fuer manuelle Labels:

- **Text** - auf dem Badge angezeigter Inhalt (z.B. "Empfohlen", "Eco", "Kostenloser Versand")
- **Hintergrundfarbe** - Badge-Farbe (Color Picker)
- **Textfarbe** - Textfarbe auf dem Badge
- **Position** - Oben links, Oben rechts, Unten links, Unten rechts
- **Prioritaet** - Anzeigereihenfolge bei mehreren Labels

Maximale Anzahl von Labels pro Produkt: **4** (automatisch + manuell zusammen).

```php
// Label-Limit pro Produkt aendern
add_filter('polski/badges/max_per_product', function (): int {
    return 3;
});
```

## Labelformen

Verfuegbare Formen:

- **Rechteck** - Standard
- **Rechteck mit abgerundeten Ecken** - border-radius
- **Kreis** - fuer kurze Texte (z.B. "-25%")
- **Band** - dekorative Form mit Schraege

## CSS-Styling

CSS-Klassen:

- `.polski-badge` - Basisklasse des Labels
- `.polski-badge--sale` - Sale
- `.polski-badge--new` - Neu
- `.polski-badge--low-stock` - Niedriger Bestand
- `.polski-badge--bestseller` - Bestseller
- `.polski-badge--custom` - Manuelles Label
- `.polski-badge--top-left` - Position oben links
- `.polski-badge--top-right` - Position oben rechts
- `.polski-badge--bottom-left` - Position unten links
- `.polski-badge--bottom-right` - Position unten rechts
- `.polski-badge--rectangle` - Rechteckige Form
- `.polski-badge--circle` - Kreisform
- `.polski-badge--ribbon` - Bandform

Styling-Beispiel:

```css
.polski-badge--sale {
    background-color: #dc2626;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.75rem;
    padding: 4px 8px;
}
```

## Fehlerbehebung

**Sale-Label zeigt keinen Prozentsatz** - pruefen Sie, ob der regulaere Preis des Produkts gesetzt ist. Ohne regulaeren Preis kann der Prozentsatz nicht berechnet werden.

**Manuelles Label erscheint nicht** - pruefen Sie das Label-Limit pro Produkt. Wenn das Produkt bereits 4 automatische Labels hat, wird das manuelle nicht angezeigt.

**Labels verdecken den Schnellansicht-Button** - aendern Sie die Position der Labels oder des Quick-View-Buttons in den Moduleinstellungen.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
