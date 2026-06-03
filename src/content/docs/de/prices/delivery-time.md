---
title: Lieferzeit
description: Konfiguration der Lieferzeit pro Produkt und Variante, Standard-Fallback-Wert sowie die Taxonomie polski_delivery_time in WooCommerce.
---

Das polnische Recht verlangt, dass der Shop vor der Aufgabe der Bestellung ueber die Lieferzeit informiert. Das Plugin Polski for WooCommerce ermoeglicht es, die Lieferzeit global, pro Produkt und pro Variante festzulegen.

## Rechtliche Anforderungen

Gib die Lieferzeit an, bevor der Kunde auf den Bestellbutton klickt. Die Information sollte sein:

- klar und verstaendlich
- in Werk- oder Kalendertagen angegeben
- auf der Produktseite sichtbar

Das Fehlen dieser Information kann zu Strafen durch das UOKiK fuehren.

## Taxonomie polski_delivery_time

Das Plugin erstellt die Taxonomie `polski_delivery_time`, in der du Lieferzeiten definierst und sie Produkten zuweist.

### Verwaltung der Lieferzeiten

Gehe zu **Produkte > Lieferzeit**, um die verfuegbaren Lieferzeiten zu verwalten.

Beispielhafte Lieferzeiten:

| Name | Slug | Beschreibung |
|-------|------|------|
| 1-2 Werktage | 1-2-dni-robocze | Produkte auf Lager |
| 3-5 Werktage | 3-5-dni-roboczych | Beim Lieferanten bestellte Produkte |
| 7-14 Werktage | 7-14-dni-roboczych | Produkte auf Bestellung |
| Bis zu 24 Stunden | do-24-godzin | Digitale Produkte / Express |
| Sofort verfuegbar | dostepny-od-reki | Sofortige Bearbeitung |

Lieferzeiten sind eine WordPress-Taxonomie - du erstellst, bearbeitest und loeschst sie im Admin-Panel.

## Konfiguration

### Globale Einstellungen

Gehe zu **WooCommerce > Einstellungen > Polski > Preise** und konfiguriere den Bereich "Lieferzeit".

| Einstellung | Beschreibung |
|------------|------|
| Lieferzeit aktivieren | Aktiviert die Anzeige auf der Produktseite |
| Standardlieferzeit | Fallback-Wert fuer Produkte ohne zugewiesene Lieferzeit |
| Im Listing anzeigen | Zeigt die Lieferzeit auf den Kategorieseiten an |
| Im Warenkorb anzeigen | Zeigt die Lieferzeit im Warenkorb an |
| Bezeichnung | Text vor der Lieferzeit (standardmaessig: "Lieferzeit:") |

### Standard-Fallback

Die Standardlieferzeit (Fallback) erscheint, wenn ein Produkt keine eigene Lieferzeit hat. Dadurch musst du nicht jedes Produkt einzeln bearbeiten.

Anzeigehierarchie:

1. Lieferzeit der Variante (falls festgelegt)
2. Lieferzeit des Hauptprodukts (falls festgelegt)
3. Standardlieferzeit aus den globalen Einstellungen (Fallback)

Wenn nichts festgelegt ist, erscheint die Lieferzeit nicht.

### Zuweisung zu einem Produkt

Oeffne im Produkteditor den Reiter "Versand". Waehle im Feld **Lieferzeit** eine Lieferzeit aus der Liste oder fuege eine neue hinzu.

### Zuweisung zu einer Variante

Jede Variante kann ihre eigene Lieferzeit haben. Klappe den Variantenbereich auf und lege die Lieferzeit fest. Varianten ohne Lieferzeit erben den Wert des Hauptprodukts.

## Shortcode

Verwende den Shortcode `[polski_delivery_time]`, um die Lieferzeit an beliebiger Stelle anzuzeigen.

### Parameter

| Parameter | Typ | Standard | Beschreibung |
|----------|-----|----------|------|
| `product_id` | int | aktuell | Produkt-ID |
| `label` | string | `"Lieferzeit: "` | Bezeichnung vor dem Wert |
| `show_label` | bool | `true` | Ob die Bezeichnung angezeigt wird |
| `wrapper` | string | `span` | Umschliessendes HTML-Element |
| `fallback` | string | `""` | Text, wenn keine Lieferzeit vorhanden ist |

### Anwendungsbeispiele

Grundlegende Verwendung:

```html
[polski_delivery_time]
```

Ergebnis: `Lieferzeit: 1-2 Werktage`

Ohne Bezeichnung:

```html
[polski_delivery_time show_label="false"]
```

Ergebnis: `1-2 Werktage`

Mit benutzerdefinierter Bezeichnung und Fallback:

```html
[polski_delivery_time label="Versand: " fallback="Verfuegbarkeit anfragen"]
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

### Zuweisung einer Lieferzeit zu einem Produkt

```php
wp_set_object_terms($product_id, '1-2-dni-robocze', 'polski_delivery_time');
```

### Abrufen der Lieferzeit eines Produkts

```php
$terms = wp_get_object_terms($product_id, 'polski_delivery_time');
if (!empty($terms) && !is_wp_error($terms)) {
    $delivery_time = $terms[0]->name;
}
```

### Erstellen einer neuen Lieferzeit

```php
wp_insert_term(
    '2-3 dni robocze',
    'polski_delivery_time',
    [
        'slug'        => '2-3-dni-robocze',
        'description' => 'Standardowy czas realizacji',
    ]
);
```

## CSV-Import

Zum Import der Lieferzeit per CSV verwende die Spalte:

| CSV-Spalte | Beschreibung | Wert |
|-------------|------|--------|
| `polski_delivery_time` | Name der Lieferzeit | `1-2 dni robocze` |

Wenn eine Lieferzeit mit dem angegebenen Namen nicht existiert, wird sie waehrend des Imports automatisch erstellt.

Beispiel:

```csv
"Laptop Dell XPS 15",5499.00,"3-5 dni roboczych"
"Mysz Logitech MX",299.00,"1-2 dni robocze"
```

## Dynamische Lieferzeit

Du kannst die Lieferzeit programmatisch auf Basis des Lagerbestands oder des Bestelldatums aendern.

```php
add_filter('polski/delivery_time/display', function (string $delivery_time, WC_Product $product): string {
    if ($product->get_stock_quantity() > 0) {
        return '1-2 dni robocze';
    }

    return '7-14 dni roboczych';
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

### Die Lieferzeit wird nicht angezeigt

1. Pruefe, ob das Modul in den Einstellungen aktiviert ist
2. Stelle sicher, dass dem Produkt eine Lieferzeit zugewiesen ist oder ein Standard-Fallback festgelegt ist
3. Pruefe, ob das Theme den Hook `woocommerce_single_product_summary` unterstuetzt

### Die Lieferzeit der Variante aendert sich nicht nach der Auswahl

Pruefe, ob das JavaScript des Plugins geladen ist. Oeffne die Browser-Konsole und suche nach JS-Fehlern. Das Plugin aktualisiert die Lieferzeit der Variante per AJAX.

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschliesslich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist eine Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
