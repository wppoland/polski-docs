---
title: Allergene
description: Allergendeklaration mittels Taxonomie polski_allergen, automatische Hervorhebung in den Zutaten und Anzeige-Shortcode in WooCommerce.
---

EU-Vorschriften verlangen die Kennzeichnung von 14 Allergenen auf Lebensmitteletiketten. Im Onlineshop muss die Allergeninformation vor dem Kauf sichtbar sein. Polski for WooCommerce verwaltet Allergene ueber eine WordPress-Taxonomie.

## 14 Hauptallergene

Gemaess Anhang II der LMIV umfasst die obligatorische Deklaration:

| Nr | Allergen | Taxonomie-Slug | Symbol |
|----|---------|----------------|-------|
| 1 | Glutenhaltiges Getreide | `gluten` | gluten |
| 2 | Krebstiere | `crustaceans` | Krebstiere |
| 3 | Eier | `eggs` | Eier |
| 4 | Fisch | `fish` | Fisch |
| 5 | Erdnuesse | `peanuts` | Erdnuesse |
| 6 | Soja | `soy` | Soja |
| 7 | Milch (Laktose) | `milk` | Milch |
| 8 | Schalenfruechte | `nuts` | Nuesse |
| 9 | Sellerie | `celery` | Sellerie |
| 10 | Senf | `mustard` | Senf |
| 11 | Sesamsamen | `sesame` | Sesam |
| 12 | Schwefeldioxid und Sulfite | `sulphites` | Sulfite |
| 13 | Lupine | `lupin` | Lupine |
| 14 | Weichtiere | `molluscs` | Weichtiere |

## Taxonomie polski_allergen

Das Plugin registriert die Taxonomie `polski_allergen`, die mit dem Post-Typ `product` verknuepft ist. Bei der Plugin-Aktivierung wird die Taxonomie automatisch mit den 14 Hauptallergenen gefuellt.

### Allergenverwaltung

Gehen Sie zu **Produkte > Allergene**, um die Allergenliste zu verwalten. Die 14 Standardallergene werden automatisch erstellt. Sie koennen eigene Allergene hinzufuegen, die spezifisch fuer Ihr Sortiment sind.

Jedes Allergen enthaelt:

| Feld | Beschreibung |
|------|------|
| Name | Angezeigter Allergenname (z.B. "Milch und Milcherzeugnisse") |
| Slug | URL-Kennung (z.B. `milk`) |
| Beschreibung | Zusaetzliche Allergeninformationen |
| Symbol | Optionales Symbol (Taxonomie-Thumbnail) |

### Allergene zum Produkt zuweisen

Im Produkteditor, im Tab "Lebensmittel" oder im Seitenpanel "Allergene", kreuzen Sie die entsprechenden Allergene aus der Checkbox-Liste an.

Drei Deklarationsmodi sind verfuegbar:

| Modus | Beschreibung | Beispiel |
|------|------|---------|
| Enthaelt | Produkt enthaelt das Allergen | "Enthaelt: Milch, Eier" |
| Kann enthalten | Kreuzkontaminationsrisiko | "Kann enthalten: Nuesse" |
| Enthaelt nicht | Ausdrueckliche Deklaration des Fehlens (optional) | "Enthaelt nicht: Gluten" |

### Modus "Kann enthalten"

Der Modus "Kann enthalten" (may contain) dient zur Kennzeichnung des Risikos von Allergenspuren, die aus Produktionsprozessen resultieren. Im Produkteditor kann jedes Allergen markiert werden als:

- **Enthaelt** - Allergen ist Produktbestandteil
- **Kann enthalten** - Risiko von Spuren

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Lebensmittel** und konfigurieren Sie den Abschnitt "Allergene".

| Einstellung | Standard | Beschreibung |
|------------|----------|------|
| Allergendeklaration aktivieren | Ja | Aktiviert das Allergensystem |
| In Zutaten hervorheben | Ja | Automatische Fettschrift der Allergene im Zutatenverzeichnis |
| Symbole anzeigen | Nein | Zeigt Allergensymbole an |
| Position auf der Seite | Lebensmittel-Tab | Wo Allergene angezeigt werden |
| Modus "Kann enthalten" | Ja | Aktiviert die Spurendeklarationsoption |
| Anzeigeformat | Liste | `liste`, `symbole`, `inline` |

## Automatische Hervorhebung in Zutaten

Gemaess Art. 21 der LMIV muessen Allergene im Zutatenverzeichnis hervorgehoben werden - ueblicherweise durch Fettschrift oder Grossbuchstaben. Das Plugin sucht automatisch nach Allergennamen im Feld "Zutaten" und umschliesst sie mit dem Tag `<strong>`.

Beispiel:

Eingegebener Text:
```
Weizenmehl, Zucker, Butter, Huehnereier, Magermilchpulver, Salz
```

Angezeigter Text:
```
Weizenmehl (Gluten), Zucker, Butter (Milch), Huehnereier, Magermilchpulver, Salz
```

Mit HTML-Hervorhebung:
```html
Mehl <strong>Weizen (Gluten)</strong>, Zucker, Butter (<strong>Milch</strong>), 
<strong>Eier</strong>, <strong>Milch</strong>pulver, Salz
```

### Hervorhebung konfigurieren

Das Plugin durchsucht das Zutatenverzeichnis nach Allergen-Synonymen. Die Synonym-Liste ist konfigurierbar:

```php
add_filter('polski/allergens/synonyms', function (array $synonyms): array {
    $synonyms['gluten'] = ['pszenica', 'pszenna', 'żyto', 'żytnia', 'owies', 'owsiana', 'jęczmień', 'orkisz'];
    $synonyms['milk'] = ['mleko', 'mleczny', 'mleczna', 'masło', 'śmietana', 'jogurt', 'ser', 'laktoza'];
    $synonyms['eggs'] = ['jaja', 'jajka', 'jajeczny', 'jajeczna'];

    return $synonyms;
});
```

## Shortcode

Verwenden Sie den Shortcode `[polski_allergens]`, um die Allergendeklaration anzuzeigen.

### Parameter

| Parameter | Typ | Standard | Beschreibung |
|----------|-----|----------|------|
| `product_id` | int | aktuell | Produkt-ID |
| `format` | string | `list` | Format: `list`, `icons`, `inline`, `table` |
| `show_may_contain` | bool | `true` | Ob der Abschnitt "Kann enthalten" angezeigt wird |
| `show_icons` | bool | `false` | Ob Allergensymbole angezeigt werden |
| `label` | string | `"Allergene: "` | Label vor der Liste |
| `wrapper` | string | `div` | Umschliessendes HTML-Element |

### Verwendungsbeispiele

Grundlegende Allergenliste:

```html
[polski_allergens]
```

Ergebnis:
```
Allergene: Milch, Eier, Gluten
Kann enthalten: Nuesse
```

Inline-Format mit Symbolen:

```html
[polski_allergens format="inline" show_icons="true"]
```

Ohne "Kann enthalten"-Abschnitt:

```html
[polski_allergens show_may_contain="false"]
```

Im PHP-Template:

```php
echo do_shortcode('[polski_allergens product_id="' . $product->get_id() . '"]');
```

## Programmatischer Zugriff

### Produktallergene abrufen

```php
// Allergene "Enthaelt"
$allergens = wp_get_object_terms($product_id, 'polski_allergen');

foreach ($allergens as $allergen) {
    echo $allergen->name; // z.B. "Milch und Milcherzeugnisse"
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
// Allergene "Enthaelt" setzen
wp_set_object_terms($product_id, ['gluten', 'milk', 'eggs'], 'polski_allergen');

// Allergene "Kann enthalten" setzen
update_post_meta($product_id, '_polski_may_contain_allergens', ['nuts', 'soy']);
```

## CSV-Import

Allergene koennen per CSV importiert werden:

| CSV-Spalte | Beschreibung | Format |
|-------------|------|--------|
| `polski_allergens` | Allergene "Enthaelt" | Slugs durch Komma getrennt |
| `polski_may_contain` | Allergene "Kann enthalten" | Slugs durch Komma getrennt |

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

## Haeufige Probleme

### Allergene werden auf der Produktseite nicht angezeigt

1. Pruefen Sie, ob das Allergenmodul aktiviert ist
2. Stellen Sie sicher, dass dem Produkt Allergene im Editor zugewiesen sind
3. Ueberpruefen Sie, ob die Taxonomie `polski_allergen` korrekt registriert ist (Produkte > Allergene)

### Automatische Hervorhebung funktioniert nicht

1. Pruefen Sie, ob die Option "In Zutaten hervorheben" aktiviert ist
2. Stellen Sie sicher, dass Allergennamen oder deren Synonyme dem Text im Zutatenverzeichnis entsprechen
3. Erweitern Sie die Synonymliste mit dem Filter `polski/allergens/synonyms`

### Standardallergene fehlen nach der Aktivierung

Wenn die Liste der 14 Allergene nicht automatisch erstellt wurde, gehen Sie zu **WooCommerce > Einstellungen > Polski > Lebensmittel** und klicken Sie auf "Standardallergene erstellen".

## Verwandte Ressourcen

- [Lebensmittelmodul](/de/food/food-overview/)
- [Naehrwerte](/de/food/nutrients/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
