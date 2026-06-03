---
title: Preisverlaufsdiagramm
description: Modul für das Preisverlaufsdiagramm in Polski for WooCommerce - SVG-Sparkline-Diagramm, das die Preisänderungen eines Produkts im Zeitverlauf zeigt.
---

Das Preisverlaufsdiagramm visualisiert die Preisänderungen eines Produkts in Form eines kompakten SVG-Sparkline-Diagramms. Kunden sehen, wie sich der Preis im gewählten Zeitraum (30, 90 oder 180 Tage) verändert hat, was Transparenz und Vertrauen in Aktionen schafft.

## Modul aktivieren

Gehe zu **WooCommerce > Polski > Shop-Module** und aktiviere **Preisverlaufsdiagramm**. Das Diagramm erscheint automatisch auf den Produktseiten, für die ein Preisverlauf gespeichert ist.

:::caution[Voraussetzung]
Das Modul erfordert das aktivierte Modul **Omnibus** (Omnibus-Richtlinie), das den Preisverlauf in der Datenbank speichert. Ohne dieses hat das Diagramm keine Daten zur Anzeige.
:::

## Funktionen

- Sparkline-Diagramm als SVG gerendert (keine Abhängigkeit von JS-Bibliotheken)
- Konfigurierbare Zeiträume: 30, 90 oder 180 Tage
- Anzeige des Mindest- und Höchstpreises im Zeitraum
- Verlaufsfüllung unter der Diagrammlinie
- Punkt, der den aktuellen Preis kennzeichnet
- In den Einstellungen konfigurierbare Diagrammfarben
- Automatischer Datenabruf aus dem Omnibus-Repository

## Einstellungen

Konfiguration unter **WooCommerce > Polski > Shop-Module > Preisverlaufsdiagramm**.

| Einstellung | Standard | Beschreibung |
|---|---|---|
| `days` | `30` | Diagrammzeitraum in Tagen: `30`, `90` oder `180` |
| `show_min_max` | `true` | Mindest- und Höchstpreis unter dem Diagramm anzeigen |
| `color` | `#2563eb` | Farbe der Diagrammlinie und des Verlaufs |

Option in der Datenbank: `polski_price_history`.

## Aussehen des Diagramms

Das Diagramm besteht aus folgenden Elementen:

- **Linie** - Preisverlauf im Zeitverlauf (SVG-Stroke)
- **Verlauf** - halbtransparente Füllung von der Linie bis zum unteren Diagrammrand
- **Punkt** - aktueller Produktpreis (letzter Punkt im Diagramm)
- **Min/Max** - Beschriftungen mit Mindest- und Höchstpreis (optional)

Die Diagrammgröße passt sich dem Container an. Die Standardhöhe beträgt 60 px.

## Technische Details

### Datenquelle

Das Diagramm bezieht die Daten aus der Klasse `OmnibusPriceRepository`, die den Verlauf der Preisänderungen speichert, der von der Omnibus-Richtlinie gefordert wird. Jeder Datenpunkt enthält Datum und Preis des Produkts.

Bei variablen Produkten wird das Diagramm für die aktuell ausgewählte Variante erzeugt (Aktualisierung per JavaScript nach Variantenwechsel).

### SVG-Rendering

Das Diagramm wird serverseitig als Inline-SVG gerendert, keine externen Bibliotheken, keine HTTP-Anfragen, kein JavaScript zum Zeichnen. Dadurch wird das Diagramm:

- Sofort angezeigt (kein Flash of unstyled content)
- Für Screenreader zugänglich (aria-label)
- Beeinflusst die Core Web Vitals nicht

### Hooks

```php
// Diagrammzeitraum dynamisch ändern
add_filter('polski/price_history/days', function (int $days, int $product_id): int {
    // Längerer Zeitraum für saisonale Produkte
    if (has_term('saisonal', 'product_cat', $product_id)) {
        return 180;
    }
    return $days;
}, 10, 2);

// Position des Diagramms auf der Produktseite ändern
add_filter('polski/price_history/hook', function (): string {
    return 'woocommerce_single_product_summary'; // Standard: woocommerce_product_meta_start
});

// Priorität des Hooks ändern
add_filter('polski/price_history/hook_priority', function (): int {
    return 25;
});

// Diagrammdaten filtern
add_filter('polski/price_history/data', function (array $prices, int $product_id): array {
    return $prices;
}, 10, 2);
```

### CSS-Klassen

- `.polski-price-history` - Hauptcontainer
- `.polski-price-history__chart` - SVG-Element
- `.polski-price-history__label` - Min/Max-Beschriftungen
- `.polski-price-history__min` - Mindestpreis
- `.polski-price-history__max` - Höchstpreis

```css
.polski-price-history {
    margin: 1rem 0;
    padding: 0.75rem;
    background: #f9fafb;
    border-radius: 0.5rem;
}
```

### Modul-ID

`price_history_chart`

## Fehlerbehebung

**Das Diagramm wird nicht angezeigt** - prüfe, ob das Omnibus-Modul aktiviert ist und ob für das Produkt ein Preisverlauf gespeichert ist. Neue Produkte haben bis zur ersten Preisänderung kein Diagramm.

**Das Diagramm ist leer/flach** - wenn sich der Preis im gewählten Zeitraum nicht geändert hat, zeigt das Diagramm eine flache Linie. Das ist korrektes Verhalten.

**Die Diagrammfarben passen nicht zum Theme** - ändere die Farbe in den Moduleinstellungen oder überschreibe sie im CSS: `.polski-price-history__chart path { stroke: #deine-farbe; }`.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
