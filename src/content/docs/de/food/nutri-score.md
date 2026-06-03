---
title: Nutri-Score
description: Anzeige der Nutri-Score-Bewertung A-E mit CSS-Klassen pro Stufe auf der WooCommerce-Produktseite.
---

Der Nutri-Score bewertet die Nährwertqualität eines Produkts auf einer Skala von A (am besten) bis E (am schlechtesten). In Polen ist er freiwillig, wird aber immer beliebter. Das Plugin Polski for WooCommerce zeigt das Nutri-Score-Abzeichen auf der Produktseite an.

## Was ist der Nutri-Score

Der Nutri-Score klassifiziert Produkte auf Basis von:

**Negative Bestandteile (Minuspunkte):**
- Energiewert
- Zucker
- gesättigte Fettsäuren
- Salz (Natrium)

**Positive Bestandteile (Pluspunkte):**
- Obst, Gemüse, Nüsse, Öle (Raps-, Nuss-, Olivenöl)
- Ballaststoffe
- Eiweiß

Auf Basis der Punktebilanz erhält das Produkt eine Bewertung:

| Stufe | Farbe | Punktebereich (feste Lebensmittel) | Beschreibung |
|-------|-------|------------------------------------|--------------|
| A | Dunkelgrün (#038141) | von -15 bis -1 | Höchste Nährwertqualität |
| B | Hellgrün (#85BB2F) | von 0 bis 2 | Gute Nährwertqualität |
| C | Gelb (#FECB02) | von 3 bis 10 | Mittlere Nährwertqualität |
| D | Orange (#EE8100) | von 11 bis 18 | Geringe Nährwertqualität |
| E | Rot (#E63E11) | von 19 bis 40 | Niedrigste Nährwertqualität |

## Konfiguration

### Aktivierung des Moduls

Gehe zu **WooCommerce > Einstellungen > Polski > Lebensmittel** und aktiviere das Submodul "Nutri-Score".

### Einstellungen

| Einstellung | Standard | Beschreibung |
|-------------|----------|--------------|
| Nutri-Score aktivieren | Nein | Aktiviert die Anzeige des Abzeichens |
| Position auf der Produktseite | Unter dem Preis | Wo das Abzeichen angezeigt wird |
| Im Listing anzeigen | Ja | Ob auf den Kategorieseiten angezeigt wird |
| Größe des Abzeichens | Normal | `klein`, `normal`, `groß` |
| Stil des Abzeichens | Voll | `voll` (alle Buchstaben), `kompakt` (nur der aktive Buchstabe) |

### Nutri-Score einem Produkt zuweisen

Wähle im Produkteditor, im Reiter "Lebensmittel", die Nutri-Score-Stufe aus der Dropdown-Liste:

- A - Höchste Nährwertqualität
- B - Gute Nährwertqualität
- C - Mittlere Nährwertqualität
- D - Geringe Nährwertqualität
- E - Niedrigste Nährwertqualität

Das Plugin berechnet den Nutri-Score nicht automatisch. Verwende den offiziellen Rechner oder die Daten des Herstellers.

## Generiertes HTML

Das Nutri-Score-Abzeichen besteht aus einer Reihe von HTML-Elementen mit CSS-Klassen:

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

Das Plugin generiert CSS-Klassen für jede Stufe, was die volle Kontrolle über das Styling ermöglicht:

### Klassen am Container

| Klasse | Beschreibung |
|--------|--------------|
| `.polski-nutri-score` | Hauptcontainer |
| `.polski-nutri-score--active-a` | Aktive Stufe A |
| `.polski-nutri-score--active-b` | Aktive Stufe B |
| `.polski-nutri-score--active-c` | Aktive Stufe C |
| `.polski-nutri-score--active-d` | Aktive Stufe D |
| `.polski-nutri-score--active-e` | Aktive Stufe E |
| `.polski-nutri-score--small` | Kleine Größe |
| `.polski-nutri-score--normal` | Normale Größe |
| `.polski-nutri-score--large` | Große Größe |

### Klassen an den Abzeichen

| Klasse | Beschreibung |
|--------|--------------|
| `.polski-nutri-score__badge` | Jedes Abzeichen (Buchstabe) |
| `.polski-nutri-score__badge--a` | Abzeichen A |
| `.polski-nutri-score__badge--b` | Abzeichen B |
| `.polski-nutri-score__badge--c` | Abzeichen C |
| `.polski-nutri-score__badge--d` | Abzeichen D |
| `.polski-nutri-score__badge--e` | Abzeichen E |
| `.polski-nutri-score__badge--active` | Aktives (ausgewähltes) Abzeichen |

## Standard-CSS-Stile

Das Plugin enthält integrierte CSS-Stile:

```css
.polski-nutri-score {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0.5em 0;
}

.polski-nutri-score__label {
    font-size: 0.75em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #666;
    margin-bottom: 0.3em;
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
.polski-nutri-score__badge--a {
    background-color: #038141;
}

.polski-nutri-score__badge--b {
    background-color: #85BB2F;
}

.polski-nutri-score__badge--c {
    background-color: #FECB02;
    color: #333;
}

.polski-nutri-score__badge--d {
    background-color: #EE8100;
}

.polski-nutri-score__badge--e {
    background-color: #E63E11;
}

/* Größen */
.polski-nutri-score--small .polski-nutri-score__badge {
    width: 1.5em;
    height: 1.5em;
    font-size: 0.7em;
}

.polski-nutri-score--large .polski-nutri-score__badge {
    width: 2.5em;
    height: 2.5em;
    font-size: 1em;
}
```

### Überschreiben der Stile

Überschreibe die CSS-Klassen in der `style.css` deines Themes:

```css
/* Beispiel: quadratische Abzeichen mit abgerundeten Ecken */
.polski-nutri-score__badges {
    gap: 4px;
    border-radius: 0;
}

.polski-nutri-score__badge {
    border-radius: 6px;
    width: 2.2em;
    height: 2.2em;
}

/* Beispiel: dunkles Theme */
.polski-nutri-score__label {
    color: #ccc;
}

.polski-nutri-score__badge {
    opacity: 0.25;
}
```

## Programmatischer Zugriff

### Nutri-Score eines Produkts abrufen

```php
$nutri_score = get_post_meta($product_id, '_polski_nutri_score', true);
// Gibt zurück: 'a', 'b', 'c', 'd', 'e' oder '' (leer)
```

### Nutri-Score setzen

```php
update_post_meta($product_id, '_polski_nutri_score', 'b');
```

### Filter für das HTML des Abzeichens

```php
add_filter('polski/nutri_score/html', function (string $html, string $score, int $product_id): string {
    // Anpassung des HTML des Abzeichens
    return $html;
}, 10, 3);
```

### Bedingte Anzeige

```php
add_filter('polski/nutri_score/display', function (bool $display, int $product_id): bool {
    // Nutri-Score für Produkte ohne ausgefüllte Nährwerte ausblenden
    $nutrients = get_post_meta($product_id, '_polski_nutrients', true);

    if (empty($nutrients)) {
        return false;
    }

    return $display;
}, 10, 2);
```

## CSV-Import

| CSV-Spalte | Beschreibung | Werte |
|------------|--------------|-------|
| `polski_nutri_score` | Nutri-Score-Stufe | `a`, `b`, `c`, `d`, `e` |

Beispiel:

```csv
"Apfel",a
"Kartoffelchips",d
"Cola",e
"Naturjoghurt",b
```

## Schema.org

Das Plugin fügt den Nutri-Score den strukturierten Daten des Produkts hinzu:

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

Das Abzeichen enthält ARIA-Attribute für Screenreader:

```html
<div class="polski-nutri-score" role="img" aria-label="Nutri-Score: C - mittlere Nährwertqualität">
```

Jedes inaktive Abzeichen hat `aria-hidden="true"`, und das aktive enthält `aria-current="true"`.

## Häufige Probleme

### Das Abzeichen wird nicht angezeigt

1. Prüfe, ob das Submodul Nutri-Score aktiviert ist
2. Stelle sicher, dass dem Produkt eine Nutri-Score-Stufe zugewiesen ist
3. Überprüfe, ob das CSS des Plugins geladen ist (kein Konflikt mit Optimierungs-Plugins)

### Die Farben des Abzeichens sind anders als erwartet

Das Theme kann die Farben überschreiben. Verwende spezifischere CSS-Selektoren oder füge `!important` hinzu:

```css
.polski-nutri-score__badge--a {
    background-color: #038141 !important;
}
```

### Das Abzeichen ist zu groß oder zu klein

Ändere die Größe in den Einstellungen (**WooCommerce > Einstellungen > Polski > Lebensmittel > Nutri-Score > Größe des Abzeichens**) oder überschreibe die CSS-Klasse der Größe.

## Verwandte Ressourcen

- [Lebensmittelmodul](food/food-overview/)
- [Nährwerte](food/nutrients/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
