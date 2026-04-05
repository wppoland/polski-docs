---
title: Nutri-Score
description: Anzeige der Nutri-Score-Bewertung A-E mit CSS-Klassen pro Stufe auf der WooCommerce-Produktseite.
---

Nutri-Score bewertet die Naehrwertqualitaet auf einer Skala von A (beste) bis E (schlechteste). In Polen freiwillig, aber immer beliebter. Polski for WooCommerce zeigt das Nutri-Score-Badge auf der Produktseite an.

## Was ist Nutri-Score

Das Nutri-Score-System klassifiziert Lebensmittel anhand eines Algorithmus, der beruecksichtigt:

**Negative Bestandteile (Minuspunkte):**
- Energiewert
- Zucker
- Gesaettigte Fettsaeuren
- Salz (Natrium)

**Positive Bestandteile (Pluspunkte):**
- Obst, Gemuese, Nuesse, Oele (Raps-, Walnuss-, Olivenoel)
- Ballaststoffe
- Protein

Basierend auf der Punktebilanz erhaelt das Produkt eine Bewertung:

| Stufe | Farbe | Punktebereich (feste Nahrung) | Beschreibung |
|--------|-------|-------------------------------|------|
| A | Dunkelgruen (#038141) | -15 bis -1 | Hoechste Naehrwertqualitaet |
| B | Hellgruen (#85BB2F) | 0 bis 2 | Gute Naehrwertqualitaet |
| C | Gelb (#FECB02) | 3 bis 10 | Mittlere Naehrwertqualitaet |
| D | Orange (#EE8100) | 11 bis 18 | Niedrige Naehrwertqualitaet |
| E | Rot (#E63E11) | 19 bis 40 | Niedrigste Naehrwertqualitaet |

## Konfiguration

### Modul aktivieren

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Lebensmittel** und aktivieren Sie das Untermodul "Nutri-Score".

### Einstellungen

| Einstellung | Standard | Beschreibung |
|------------|----------|------|
| Nutri-Score aktivieren | Nein | Aktiviert die Badge-Anzeige |
| Position auf der Produktseite | Unter dem Preis | Wo das Badge angezeigt wird |
| Im Listing anzeigen | Ja | Ob auf Kategorieseiten angezeigt |
| Badge-Groesse | Normal | `klein`, `normal`, `gross` |
| Badge-Stil | Voll | `voll` (alle Buchstaben), `kompakt` (nur aktiver Buchstabe) |

### Nutri-Score zum Produkt zuweisen

Im Produkteditor, im Tab "Lebensmittel", waehlen Sie die Nutri-Score-Stufe aus der Dropdown-Liste:

- A - Hoechste Naehrwertqualitaet
- B - Gute Naehrwertqualitaet
- C - Mittlere Naehrwertqualitaet
- D - Niedrige Naehrwertqualitaet
- E - Niedrigste Naehrwertqualitaet

Das Plugin berechnet den Nutri-Score nicht automatisch - Sie muessen die Bewertung Ihres Produkts kennen. Zur Berechnung koennen Sie den offiziellen Rechner oder Herstellerangaben verwenden.

## Generiertes HTML

Das Nutri-Score-Badge wird als Satz von HTML-Elementen mit dedizierten CSS-Klassen gerendert:

```html
<div class="polski-nutri-score polski-nutri-score--active-c">
    <span class="polski-nutri-score__label">Nutri-Score</span>
    <div class="polski-nutri-score__badges">
        <span class="polski-nutri-score__badge polski-nutri-score__badge--a">A</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--b">B</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--c polski-nutri-score__badge--active">C</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--d">D</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--e">E</span>
    </div>
</div>
```

## CSS-Klassen pro Stufe

Das Plugin generiert CSS-Klassen fuer jede Stufe, was volle Kontrolle ueber das Styling ermoeglicht:

### Klassen auf dem Container

| Klasse | Beschreibung |
|-------|------|
| `.polski-nutri-score` | Hauptcontainer |
| `.polski-nutri-score--active-a` | Aktive Stufe A |
| `.polski-nutri-score--active-b` | Aktive Stufe B |
| `.polski-nutri-score--active-c` | Aktive Stufe C |
| `.polski-nutri-score--active-d` | Aktive Stufe D |
| `.polski-nutri-score--active-e` | Aktive Stufe E |
| `.polski-nutri-score--small` | Kleine Groesse |
| `.polski-nutri-score--normal` | Normale Groesse |
| `.polski-nutri-score--large` | Grosse Groesse |

### Standard-CSS-Stile

Das Plugin enthaelt integrierte CSS-Stile fuer das Nutri-Score-Badge:

```css
.polski-nutri-score {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0.5em 0;
}

.polski-nutri-score__badges {
    display: inline-flex;
    gap: 2px;
    border-radius: 4px;
    overflow: hidden;
}

.polski-nutri-score__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    font-weight: 700;
    font-size: 0.85em;
    color: #fff;
    opacity: 0.35;
    transition: opacity 0.2s, transform 0.2s;
}

.polski-nutri-score__badge--active {
    opacity: 1;
    transform: scale(1.15);
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

/* Farben pro Stufe */
.polski-nutri-score__badge--a { background-color: #038141; }
.polski-nutri-score__badge--b { background-color: #85BB2F; }
.polski-nutri-score__badge--c { background-color: #FECB02; color: #333; }
.polski-nutri-score__badge--d { background-color: #EE8100; }
.polski-nutri-score__badge--e { background-color: #E63E11; }
```

## Programmatischer Zugriff

### Nutri-Score des Produkts abrufen

```php
$nutri_score = get_post_meta($product_id, '_polski_nutri_score', true);
// Gibt zurueck: 'a', 'b', 'c', 'd', 'e' oder '' (leer)
```

### Nutri-Score setzen

```php
update_post_meta($product_id, '_polski_nutri_score', 'b');
```

## CSV-Import

| CSV-Spalte | Beschreibung | Werte |
|-------------|------|---------|
| `polski_nutri_score` | Nutri-Score-Stufe | `a`, `b`, `c`, `d`, `e` |

## Schema.org

Das Plugin fuegt den Nutri-Score zu den strukturierten Produktdaten hinzu:

```json
{
    "@type": "Product",
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "Nutri-Score",
            "value": "B"
        }
    ]
}
```

## Barrierefreiheit (a11y)

Das Nutri-Score-Badge enthaelt ARIA-Attribute fuer Screenreader:

```html
<div class="polski-nutri-score" role="img" aria-label="Nutri-Score: C - mittlere Naehrwertqualitaet">
```

## Verwandte Ressourcen

- [Lebensmittelmodul](/de/food/food-overview/)
- [Naehrwerte](/de/food/nutrients/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
