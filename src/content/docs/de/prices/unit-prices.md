---
title: Grundpreis
description: Anzeige des Preises pro Kilogramm, Liter, Meter oder Stueck in WooCommerce gemaess polnischem Verbraucherrecht.
---

Die Richtlinie 98/6/EG und das polnische Gesetz ueber die Preisinformation fuer Waren und Dienstleistungen verlangen, dass ein Onlineshop den Grundpreis eines Produkts anzeigt - also den Preis pro Kilogramm, Liter, Laufmeter oder Stueck. Das Plugin Polski for WooCommerce automatisiert diese Pflicht, indem es die Grundpreisinformation auf der Produktseite, in Listings und im Warenkorb hinzufuegt.

## Wann ist der Grundpreis erforderlich

Die Pflicht zur Angabe des Grundpreises gilt fuer Produkte, die nach Gewicht, Volumen oder Laenge verkauft werden. In der Praxis umfasst dies:

- Lebensmittel (Preis pro kg oder Liter)
- Kosmetika und Reinigungsmittel (Preis pro 100 ml oder Liter)
- Baumaterialien (Preis pro Laufmeter oder Quadratmeter)
- Schuettgueter (Preis pro kg)

Der Grundpreis muss ueberall sichtbar sein, wo der Produktpreis angezeigt wird - auf der Produktseite, in Suchergebnissen, in Preisvergleichsportalen und im Warenkorb.

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Preise** und aktivieren Sie das Grundpreismodul. Nach der Aktivierung erscheint ein neuer Abschnitt im Tab "Allgemein" des Produkteditors.

### Felder im Produkteditor

| Feld | Beschreibung | Beispiel |
|------|------|---------|
| Basismenge | Produktmenge in der Verpackung | `500` |
| Basiseinheit | Mengeneinheit des Produkts | `g` |
| Referenzmenge | Referenzmenge fuer den Grundpreis | `1` |
| Referenzeinheit | Einheit, fuer die der Preis angegeben wird | `kg` |

Fuer ein Produkt mit 500 g Gewicht und einem Preis von 12,99 PLN berechnet das Plugin den Grundpreis automatisch als 25,98 PLN/kg.

### Unterstuetzte Einheiten

Das Plugin unterstuetzt folgende Mengeneinheiten:

- **Gewicht:** g, kg, mg
- **Volumen:** ml, l, cl
- **Laenge:** mm, cm, m
- **Stueck:** Stk. (piece)

Die Umrechnung zwischen Einheiten erfolgt automatisch. Wenn das Produkt ein Gewicht in Gramm hat und die Referenzeinheit Kilogramm ist, rechnet das Plugin den Wert selbst um.

## Produktvarianten

Fuer variable Produkte kann der Grundpreis auf zwei Ebenen festgelegt werden:

1. **Auf Hauptproduktebene** - Wert wird von allen Varianten geerbt
2. **Auf Variantenebene** - ueberschreibt die Einstellungen des Hauptprodukts

Bei Varianten mit unterschiedlichem Gewicht (z.B. 250 g und 500 g Verpackung) setzen Sie den Grundpreis fuer jede Variante separat. Das Plugin aktualisiert den angezeigten Preis automatisch bei Variantenauswahl durch den Kunden (AJAX).

## Shortcode

Verwenden Sie den Shortcode `[polski_unit_price]`, um den Grundpreis an einer beliebigen Stelle anzuzeigen.

### Parameter

| Parameter | Typ | Standard | Beschreibung |
|----------|-----|----------|------|
| `product_id` | int | aktuell | Produkt-ID |
| `before` | string | `""` | Text vor dem Preis |
| `after` | string | `""` | Text nach dem Preis |
| `wrapper` | string | `span` | Umschliessendes HTML-Element |

### Verwendungsbeispiele

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

Dieser Filter ermoeglicht die Aenderung des Grundpreis-HTML vor der Anzeige.

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
| `$args` | array | Array mit Schluesseln: `base_qty`, `base_unit`, `ref_qty`, `ref_unit` |

### Beispiel: CSS-Klasse hinzufuegen

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

### Beispiel: Grundpreis fuer bestimmte Kategorien ausblenden

```php
add_filter('polski/price/unit_price_html', function (string $html, float $unit_price, WC_Product $product): string {
    if (has_term('uslugi', 'product_cat', $product->get_id())) {
        return '';
    }

    return $html;
}, 10, 3);
```

## CSV-Import

Der Grundpreis kann ueber den Standard-WooCommerce-Importer importiert werden. Fuegen Sie folgende Spalten zur CSV-Datei hinzu:

| CSV-Spalte | Beschreibung |
|-------------|------|
| `polski_unit_base_qty` | Basismenge |
| `polski_unit_base_unit` | Basiseinheit |
| `polski_unit_ref_qty` | Referenzmenge |
| `polski_unit_ref_unit` | Referenzeinheit |

Beispiel-CSV-Zeile:

```csv
"Gemahlener Kaffee 500g",29.99,500,g,1,kg
```

## Haeufige Probleme

### Grundpreis wird nicht angezeigt

Pruefen Sie, ob:

1. Das Grundpreismodul in den Einstellungen aktiviert ist
2. Das Produkt die Felder Basismenge und Einheit ausgefuellt hat
3. Das Theme den Hook `woocommerce_after_shop_loop_item_title` (Listing) und `woocommerce_single_product_summary` (Produktseite) unterstuetzt

### Falsche Umrechnung

Stellen Sie sicher, dass Basiseinheit und Referenzeinheit zur gleichen Kategorie gehoeren (z.B. beide Gewicht oder beide Volumen). Das Plugin rechnet nicht zwischen Kategorien um - Gramm koennen nicht in Liter umgerechnet werden.

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
