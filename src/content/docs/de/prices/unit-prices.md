---
title: Grundpreis
description: Anzeige des Preises pro Kilogramm, Liter, Meter oder Stueck in WooCommerce gemaess dem polnischen Verbraucherrecht.
---

Das polnische Recht verlangt, dass der Onlineshop den Grundpreis eines Produkts anzeigt - z. B. den Preis pro Kilogramm, Liter oder Meter. Das Plugin Polski for WooCommerce fuegt diese Information automatisch auf der Produktseite, im Listing und im Warenkorb hinzu.

## Wann ein Grundpreis erforderlich ist

Den Grundpreis gibst du fuer Produkte an, die nach Gewicht, Volumen oder Laenge verkauft werden. Das betrifft u. a.:

- Lebensmittelprodukte (Preis pro kg oder Liter)
- Kosmetika und Reinigungsmittel (Preis pro 100 ml oder Liter)
- Baumaterialien (Preis pro laufenden Meter oder Quadratmeter)
- Schuettgut (Preis pro kg)

Der Grundpreis muss ueberall sichtbar sein, wo du den Produktpreis anzeigst - auf der Produktseite, in den Suchergebnissen, in Vergleichen und im Warenkorb.

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski > Preise** und aktiviere das Grundpreis-Modul. Nach der Aktivierung erscheint im Produkteditor ein neuer Bereich im Reiter "Allgemein".

### Felder im Produkteditor

| Feld | Beschreibung | Beispiel |
|------|------|---------|
| Basismenge | Produktmenge in der Verpackung | `500` |
| Basiseinheit | Masseinheit des Produkts | `g` |
| Referenzmenge | Referenzmenge fuer den Grundpreis | `1` |
| Referenzeinheit | Einheit, fuer die der Preis angegeben wird | `kg` |

Fuer ein Produkt mit einem Gewicht von 500 g und einem Preis von 12,99 zl berechnet das Plugin automatisch den Grundpreis als 25,98 zl/kg.

### Unterstuetzte Einheiten

Das Plugin unterstuetzt diese Masseinheiten:

- **Gewicht:** g, kg, mg
- **Volumen:** ml, l, cl
- **Laenge:** mm, cm, m
- **Stueck:** szt (piece)

Das Plugin rechnet die Einheiten automatisch um. Wenn ein Produkt ein Gewicht in Gramm hat und die Referenzeinheit Kilogramm ist - wird der Wert umgerechnet.

## Produktvarianten

Bei variablen Produkten legst du den Grundpreis auf zwei Ebenen fest:

1. **Auf der Ebene des Hauptprodukts** - der Wert wird von allen Varianten geerbt
2. **Auf der Ebene der Variante** - ueberschreibt die Einstellungen des Hauptprodukts

Wenn die Varianten ein unterschiedliches Gewicht haben (z. B. 250 g und 500 g), lege den Grundpreis fuer jede Variante separat fest. Das Plugin aktualisiert den Preis automatisch, wenn der Kunde die Variante wechselt (AJAX).

## Shortcode

Verwende den Shortcode `[polski_unit_price]`, um den Grundpreis an beliebiger Stelle anzuzeigen.

### Parameter

| Parameter | Typ | Standard | Beschreibung |
|----------|-----|----------|------|
| `product_id` | int | aktuell | Produkt-ID |
| `before` | string | `""` | Text vor dem Preis |
| `after` | string | `""` | Text nach dem Preis |
| `wrapper` | string | `span` | Umschliessendes HTML-Element |

### Anwendungsbeispiele

Grundlegende Verwendung auf der Produktseite:

```html
[polski_unit_price]
```

Mit benutzerdefinierter Produkt-ID und Text:

```html
[polski_unit_price product_id="123" before="Preis pro kg: " after=" brutto"]
```

Im PHP-Template:

```php
echo do_shortcode('[polski_unit_price product_id="' . $product->get_id() . '"]');
```

## Hook: polski/price/unit_price_html

Der Filter ermoeglicht es, das HTML des Grundpreises vor der Anzeige zu aendern.

### Signatur

```php
apply_filters('polski/price/unit_price_html', string $html, float $unit_price, WC_Product $product, array $args): string
```

### Parameter

| Parameter | Typ | Beschreibung |
|----------|-----|------|
| `$html` | string | Generiertes HTML des Grundpreises |
| `$unit_price` | float | Berechneter Grundpreis |
| `$product` | WC_Product | WooCommerce-Produktobjekt |
| `$args` | array | Array mit den Schluesseln: `base_qty`, `base_unit`, `ref_qty`, `ref_unit` |

### Beispiel: Hinzufuegen einer CSS-Klasse

```php
add_filter('polski/price/unit_price_html', function (string $html, float $unit_price, WC_Product $product, array $args): string {
    $category_class = '';
    if (has_term('napoje', 'product_cat', $product->get_id())) {
        $category_class = ' polski-unit-price--beverage';
    }

    return sprintf(
        '<span class="polski-unit-price%s">%s/%s</span>',
        esc_attr($category_class),
        wc_price($unit_price),
        esc_html($args['ref_unit'])
    );
}, 10, 4);
```

### Beispiel: Ausblenden des Grundpreises fuer ausgewaehlte Kategorien

```php
add_filter('polski/price/unit_price_html', function (string $html, float $unit_price, WC_Product $product): string {
    if (has_term('uslugi', 'product_cat', $product->get_id())) {
        return '';
    }

    return $html;
}, 10, 3);
```

## CSV-Import

Den Grundpreis importierst du ueber den standardmaessigen WooCommerce-Importer. Fuege diese Spalten zur CSV-Datei hinzu:

| CSV-Spalte | Beschreibung |
|-------------|------|
| `polski_unit_base_qty` | Basismenge |
| `polski_unit_base_unit` | Basiseinheit |
| `polski_unit_ref_qty` | Referenzmenge |
| `polski_unit_ref_unit` | Referenzeinheit |

Beispielhafte CSV-Zeile:

```csv
"Kawa mielona 500g",29.99,500,g,1,kg
```

## Haeufige Probleme

### Der Grundpreis wird nicht angezeigt

Pruefe, ob:

1. Das Grundpreis-Modul in den Einstellungen aktiviert ist
2. Das Produkt ausgefuellte Felder fuer Basismenge und Einheit hat
3. Das Theme die Hooks `woocommerce_after_shop_loop_item_title` (Listing) sowie `woocommerce_single_product_summary` (Produktseite) unterstuetzt

### Fehlerhafte Umrechnung

Pruefe, ob die Basis- und die Referenzeinheit aus derselben Kategorie stammen (z. B. beide Gewicht oder beide Volumen). Das Plugin rechnet keine Gramm in Liter um.

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschliesslich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist eine Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
