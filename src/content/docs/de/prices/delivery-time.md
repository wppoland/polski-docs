---
title: Lieferzeit
description: Konfiguration der Lieferzeit pro Produkt und Variante, Standard-Fallback-Wert sowie Taxonomie polski_delivery_time in WooCommerce.
---

Polnisches Recht verlangt, dass der Shop vor der Bestellung ueber die Lieferzeit informiert. Polski for WooCommerce ermoeglicht die Einstellung der Lieferzeit global, pro Produkt und pro Variante.

## Rechtliche Anforderungen

Der Verkaeufer muss den Verbraucher ueber den voraussichtlichen Liefertermin spaetestens zum Zeitpunkt der Willenserklaerung zum Vertragsabschluss informieren (also vor dem Klick auf den Bestellbutton). Diese Information sollte:

- klar und verstaendlich sein
- in Werk- oder Kalendertagen angegeben werden
- auf der Produktseite sichtbar sein

Fehlende Lieferzeitinformationen koennen zu Strafen durch die Aufsichtsbehoerde fuehren und stellen eine Verletzung der Verbraucherrechte dar.

## Taxonomie polski_delivery_time

Das Plugin registriert eine dedizierte Taxonomie `polski_delivery_time`, die es ermoeglicht, vordefinierte Lieferzeiten zu erstellen und Produkten zuzuweisen.

### Verwaltung der Lieferzeiten

Gehen Sie zu **Produkte > Lieferzeit**, um die verfuegbaren Termine zu verwalten.

Beispieltermine:

| Name | Slug | Beschreibung |
|-------|------|------|
| 1-2 Werktage | 1-2-werktage | Produkte auf Lager |
| 3-5 Werktage | 3-5-werktage | Produkte vom Lieferanten bestellt |
| 7-14 Werktage | 7-14-werktage | Produkte auf Bestellung |
| Innerhalb von 24 Stunden | innerhalb-24-stunden | Digitale Produkte / Express |
| Sofort verfuegbar | sofort-verfuegbar | Sofortige Bearbeitung |

Lieferzeiten funktionieren wie eine WordPress-Taxonomie - Sie koennen sie im Administrationspanel erstellen, bearbeiten und loeschen.

## Konfiguration

### Globale Einstellungen

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Preise** und konfigurieren Sie den Abschnitt "Lieferzeit".

| Einstellung | Beschreibung |
|------------|------|
| Lieferzeit aktivieren | Aktiviert die Anzeige auf der Produktseite |
| Standard-Lieferzeit | Fallback-Wert fuer Produkte ohne zugewiesenen Termin |
| Im Listing anzeigen | Zeigt die Lieferzeit auf Kategorieseiten an |
| Im Warenkorb anzeigen | Zeigt die Lieferzeit im Warenkorb an |
| Label | Text vor der Lieferzeit (Standard: "Lieferzeit:") |

### Standard-Fallback

Die Standard-Lieferzeit (Fallback) wird angezeigt, wenn ein Produkt keinen individuellen Termin zugewiesen hat. Dies ermoeglicht eine schnelle Implementierung ohne Bearbeitung jedes einzelnen Produkts.

Anzeigehierarchie:

1. Lieferzeit der Variante (falls gesetzt)
2. Lieferzeit des Hauptprodukts (falls gesetzt)
3. Standard-Lieferzeit aus den globalen Einstellungen (Fallback)

Wenn keiner der oben genannten Werte gesetzt ist, wird keine Lieferzeitinformation angezeigt.

### Zuweisung zum Produkt

Im Produkteditor, im Tab "Versand", finden Sie das Feld **Lieferzeit**. Waehlen Sie einen vorhandenen Termin aus der Liste oder erstellen Sie einen neuen.

### Zuweisung zur Variante

Fuer variable Produkte kann jede Variante eine eigene Lieferzeit haben. Erweitern Sie den Variantenabschnitt und legen Sie einen individuellen Termin fest. Varianten ohne gesetzten Termin erben den Wert vom Hauptprodukt.

## Shortcode

Verwenden Sie den Shortcode `[polski_delivery_time]`, um die Lieferzeit an einer beliebigen Stelle anzuzeigen.

### Parameter

| Parameter | Typ | Standard | Beschreibung |
|----------|-----|----------|------|
| `product_id` | int | aktuell | Produkt-ID |
| `label` | string | `"Lieferzeit: "` | Label vor dem Wert |
| `show_label` | bool | `true` | Ob das Label angezeigt werden soll |
| `wrapper` | string | `span` | Umschliessendes HTML-Element |
| `fallback` | string | `""` | Text, wenn keine Lieferzeit vorhanden |

### Verwendungsbeispiele

Grundlegende Verwendung:

```html
[polski_delivery_time]
```

Ergebnis: `Lieferzeit: 1-2 Werktage`

Ohne Label:

```html
[polski_delivery_time show_label="false"]
```

Ergebnis: `1-2 Werktage`

Mit benutzerdefiniertem Label und Fallback:

```html
[polski_delivery_time label="Versand: " fallback="Bitte Verfuegbarkeit anfragen"]
```

Fuer ein bestimmtes Produkt:

```html
[polski_delivery_time product_id="456"]
```

Im PHP-Template:

```php
echo do_shortcode('[polski_delivery_time product_id="' . $product->get_id() . '"]');
```

## Programmatische Verwaltung der Lieferzeit

### Termin zum Produkt zuweisen

```php
wp_set_object_terms($product_id, '1-2-werktage', 'polski_delivery_time');
```

### Produkttermin abrufen

```php
$terms = wp_get_object_terms($product_id, 'polski_delivery_time');
if (!empty($terms) && !is_wp_error($terms)) {
    $delivery_time = $terms[0]->name;
}
```

### Neuen Termin erstellen

```php
wp_insert_term(
    '2-3 Werktage',
    'polski_delivery_time',
    [
        'slug'        => '2-3-werktage',
        'description' => 'Standard-Bearbeitungszeit',
    ]
);
```

## CSV-Import

Fuer den CSV-Import der Lieferzeit verwenden Sie die Spalte:

| CSV-Spalte | Beschreibung | Wert |
|-------------|------|--------|
| `polski_delivery_time` | Name des Liefertermins | `1-2 Werktage` |

Wenn der Termin mit dem angegebenen Namen nicht existiert, wird er beim Import automatisch erstellt.

Beispiel:

```csv
"Laptop Dell XPS 15",5499.00,"3-5 Werktage"
"Maus Logitech MX",299.00,"1-2 Werktage"
```

## Dynamische Lieferzeit

Bei Produkten mit langer Bearbeitungszeit kann die angezeigte Lieferzeit programmatisch auf Basis von Lagerbestaenden oder Bestelldatum angepasst werden.

```php
add_filter('polski/delivery_time/display', function (string $delivery_time, WC_Product $product): string {
    if ($product->get_stock_quantity() > 0) {
        return '1-2 Werktage';
    }

    return '7-14 Werktage';
}, 10, 2);
```

## CSS-Styling

```css
.polski-delivery-time {
    display: inline-block;
    margin-top: 0.5em;
    font-size: 0.9em;
    color: #2e7d32;
}

.polski-delivery-time__label {
    font-weight: 600;
}

.polski-delivery-time__value {
    color: #333;
}
```

## Haeufige Probleme

### Lieferzeit wird nicht angezeigt

1. Pruefen Sie, ob das Modul in den Einstellungen aktiviert ist
2. Stellen Sie sicher, dass dem Produkt ein Termin zugewiesen oder ein Standard-Fallback gesetzt ist
3. Ueberpruefen Sie, ob das Theme den Hook `woocommerce_single_product_summary` unterstuetzt

### Variantenlieferzeit aendert sich bei Auswahl nicht

Stellen Sie sicher, dass das Plugin-JavaScript geladen ist. Pruefen Sie die Browser-Konsole auf JS-Fehler. Das Plugin aktualisiert die Variantenlieferzeit per AJAX bei Optionsaenderung.

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
