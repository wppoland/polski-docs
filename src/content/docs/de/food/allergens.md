---
title: Allergene
description: Allergendeklaration mittels Taxonomie polski_allergen, automatische Hervorhebung in den Zutaten und Anzeige-Shortcode in WooCommerce.
---

EU-Vorschriften verlangen die Kennzeichnung von 14 Allergenen auf dem Etikett eines Lebensmittelprodukts. Im Onlineshop muss die Allergeninformation vor dem Kauf sichtbar sein. Das Plugin Polski for WooCommerce verwaltet Allergene über eine WordPress-Taxonomie.

## Die 14 Hauptallergene

Die verpflichtende Deklaration umfasst:

| Nr | Allergen | Taxonomie-Slug | Symbol |
|----|----------|----------------|--------|
| 1 | Glutenhaltiges Getreide | `gluten` | gluten |
| 2 | Krebstiere | `crustaceans` | krebstiere |
| 3 | Eier | `eggs` | eier |
| 4 | Fisch | `fish` | fisch |
| 5 | Erdnüsse | `peanuts` | erdnuesse |
| 6 | Soja | `soy` | soja |
| 7 | Milch (Laktose) | `milk` | milch |
| 8 | Schalenfrüchte (Nüsse) | `nuts` | nuesse |
| 9 | Sellerie | `celery` | sellerie |
| 10 | Senf | `mustard` | senf |
| 11 | Sesamsamen | `sesame` | sesam |
| 12 | Schwefeldioxid und Sulfite | `sulphites` | sulfite |
| 13 | Lupinen | `lupin` | lupinen |
| 14 | Weichtiere | `molluscs` | weichtiere |

## Taxonomie polski_allergen

Das Plugin erstellt die mit Produkten verknüpfte Taxonomie `polski_allergen`. Bei der Aktivierung fügt es automatisch die 14 Hauptallergene hinzu.

### Verwaltung der Allergene

Gehe zu **Produkte > Allergene**, um die Liste zu verwalten. Die 14 Allergene werden automatisch erstellt. Du kannst eigene, für dein Sortiment spezifische Allergene hinzufügen.

Jedes Allergen enthält:

| Feld | Beschreibung |
|------|--------------|
| Name | Angezeigter Name des Allergens (z. B. "Milch und daraus gewonnene Erzeugnisse") |
| Slug | URL-Kennung (z. B. `milk`) |
| Beschreibung | Zusätzliche Informationen zum Allergen |
| Symbol | Optionales Symbol (Miniaturbild der Taxonomie) |

### Allergene einem Produkt zuweisen

Markiere im Produkteditor, im Reiter "Lebensmittel" oder in der Seitenleiste "Allergene", die entsprechenden Allergene aus der Checkbox-Liste.

Es stehen drei Deklarationsmodi zur Verfügung:

| Modus | Beschreibung | Beispiel |
|-------|--------------|----------|
| Enthält | Das Produkt enthält das jeweilige Allergen | "Enthält: Milch, Eier" |
| Kann enthalten | Risiko einer Kreuzkontamination | "Kann enthalten: Nüsse" |
| Enthält nicht | Ausdrückliche Deklaration des Nichtvorhandenseins (optional) | "Enthält nicht: Gluten" |

### Modus "Kann enthalten"

Der Modus "Kann enthalten" kennzeichnet das Risiko von Spuren eines Allergens aus dem Produktionsprozess. Jedes Allergen markierst du als:

- **Enthält** - das Allergen ist ein Bestandteil des Produkts
- **Kann enthalten** - Risiko von Spuren

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski > Lebensmittel** und konfiguriere den Abschnitt "Allergene".

| Einstellung | Standard | Beschreibung |
|-------------|----------|--------------|
| Allergendeklaration aktivieren | Ja | Aktiviert das Allergensystem |
| In den Zutaten hervorheben | Ja | Automatische Fettschrift der Allergene im Zutatenverzeichnis |
| Symbole anzeigen | Nein | Zeigt Allergensymbole an |
| Position auf der Seite | Reiter Lebensmittel | Wo die Allergene angezeigt werden |
| Modus "Kann enthalten" | Ja | Aktiviert die Option zur Deklaration von Spuren |
| Anzeigeformat | Liste | `liste`, `symbole`, `inline` |

## Automatische Hervorhebung in den Zutaten

Allergene im Zutatenverzeichnis müssen hervorgehoben werden - meist durch Fettschrift. Das Plugin sucht automatisch die Allergennamen im Feld "Zutaten" und schließt sie in `<strong>` ein.

Beispiel:

Eingegebener Text:
```
Weizenmehl, Zucker, Butter, Hühnereier, Magermilchpulver, Salz
```

Angezeigter Text:
```
Weizenmehl (Gluten), Zucker, Butter (Milch), Hühnereier, Magermilchpulver, Salz
```

Mit HTML-Hervorhebung:
```html
<strong>Weizen</strong>mehl (Gluten), Zucker, Butter (<strong>Milch</strong>), 
Hühner<strong>eier</strong>, Mager<strong>milch</strong>pulver, Salz
```

### Konfiguration der Hervorhebung

Das Plugin sucht nach Synonymen der Allergene im Zutatenverzeichnis. Die Synonymliste änderst du mit einem Filter:

```php
add_filter('polski/allergens/synonyms', function (array $synonyms): array {
    $synonyms['gluten'] = ['pszenica', 'pszenna', 'żyto', 'żytnia', 'owies', 'owsiana', 'jęczmień', 'orkisz'];
    $synonyms['milk'] = ['mleko', 'mleczny', 'mleczna', 'masło', 'śmietana', 'jogurt', 'ser', 'laktoza'];
    $synonyms['eggs'] = ['jaja', 'jajka', 'jajeczny', 'jajeczna'];

    return $synonyms;
});
```

## Shortcode

Verwende den Shortcode `[polski_allergens]`, um die Allergendeklaration anzuzeigen.

### Parameter

| Parameter | Typ | Standard | Beschreibung |
|-----------|-----|----------|--------------|
| `product_id` | int | aktuell | Produkt-ID |
| `format` | string | `list` | Format: `list`, `icons`, `inline`, `table` |
| `show_may_contain` | bool | `true` | Ob der Abschnitt "Kann enthalten" angezeigt wird |
| `show_icons` | bool | `false` | Ob Allergensymbole angezeigt werden |
| `label` | string | `"Allergene: "` | Label vor der Liste |
| `wrapper` | string | `div` | Umschließendes HTML-Element |

### Verwendungsbeispiele

Grundlegende Allergenliste:

```html
[polski_allergens]
```

Ergebnis:
```
Allergene: Milch, Eier, Gluten
Kann enthalten: Nüsse
```

Inline-Format mit Symbolen:

```html
[polski_allergens format="inline" show_icons="true"]
```

Ohne Abschnitt "Kann enthalten":

```html
[polski_allergens show_may_contain="false"]
```

Tabellenformat:

```html
[polski_allergens format="table"]
```

Für ein bestimmtes Produkt:

```html
[polski_allergens product_id="456"]
```

Im PHP-Template:

```php
echo do_shortcode('[polski_allergens product_id="' . $product->get_id() . '"]');
```

## Programmatischer Zugriff

### Allergene eines Produkts abrufen

```php
// Allergene "Enthält"
$allergens = wp_get_object_terms($product_id, 'polski_allergen');

foreach ($allergens as $allergen) {
    echo $allergen->name; // z. B. "Milch und daraus gewonnene Erzeugnisse"
}

// Allergene "Kann enthalten"
$may_contain = get_post_meta($product_id, '_polski_may_contain_allergens', true);
if ($may_contain) {
    $may_contain_terms = get_terms([
        'taxonomy' => 'polski_allergen',
        'slug'     => $may_contain,
    ]);
}
```

### Allergene programmatisch zuweisen

```php
// Allergene "Enthält" setzen
wp_set_object_terms($product_id, ['gluten', 'milk', 'eggs'], 'polski_allergen');

// Allergene "Kann enthalten" setzen
update_post_meta($product_id, '_polski_may_contain_allergens', ['nuts', 'soy']);
```

### Prüfen, ob ein Produkt ein Allergen enthält

```php
if (has_term('gluten', 'polski_allergen', $product_id)) {
    // Das Produkt enthält Gluten
}
```

## CSV-Import

Allergene importierst du per CSV:

| CSV-Spalte | Beschreibung | Format |
|------------|--------------|--------|
| `polski_allergens` | Allergene "Enthält" | Durch Kommas getrennte Slugs |
| `polski_may_contain` | Allergene "Kann enthalten" | Durch Kommas getrennte Slugs |

Beispiel:

```csv
"Butterkekse","gluten,milk,eggs","nuts,soy"
"Orangensaft","",""
```

## CSS-Styling

```css
.polski-allergens {
    margin: 1em 0;
    padding: 0.8em;
    background: #fff3e0;
    border: 1px solid #ffcc02;
    border-radius: 4px;
}

.polski-allergens__label {
    font-weight: 700;
    color: #e65100;
}

.polski-allergens__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
}

.polski-allergens__item {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    padding: 0.2em 0.6em;
    background: #fff;
    border: 1px solid #ffcc02;
    border-radius: 3px;
    font-size: 0.9em;
}

.polski-allergens__may-contain {
    margin-top: 0.5em;
    font-style: italic;
    color: #666;
}

.polski-allergens__icon {
    width: 20px;
    height: 20px;
}
```

## Häufige Probleme

### Allergene werden auf der Produktseite nicht angezeigt

1. Prüfe, ob das Allergenmodul aktiviert ist
2. Stelle sicher, dass dem Produkt im Editor Allergene zugewiesen sind
3. Überprüfe, ob die Taxonomie `polski_allergen` korrekt registriert ist (Produkte > Allergene)

### Die automatische Hervorhebung funktioniert nicht

1. Prüfe, ob die Option "In den Zutaten hervorheben" aktiviert ist
2. Stelle sicher, dass die Allergennamen oder ihre Synonyme dem Text im Zutatenverzeichnis entsprechen
3. Erweitere die Synonymliste mit dem Filter `polski/allergens/synonyms`

### Keine Standardallergene nach der Aktivierung

Wenn die 14 Allergene nicht automatisch erschienen sind, gehe zu **WooCommerce > Einstellungen > Polski > Lebensmittel** und klicke auf "Standardallergene erstellen".

## Verwandte Ressourcen

- [Lebensmittelmodul](food/food-overview/)
- [Nährwerte](food/nutrients/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
