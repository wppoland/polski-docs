---
title: '"Ab"-Preis fuer Produkte mit Varianten'
description: Modul zur Anzeige des Preises "ab XX PLN" anstelle einer Preisspanne fuer WooCommerce-Produkte mit Varianten.
---

Das Modul "Ab-Preis" ersetzt die standardmaessige WooCommerce-Preisspanne (z. B. "19,99 - 49,99 PLN") durch das uebersichtlichere Format **"ab 19,99 PLN"** fuer Produkte mit Varianten.

## Warum das wichtig ist

Die standardmaessige Preisanzeige von WooCommerce zeigt bei Produkten mit Varianten die volle Spanne: "19,99 PLN - 49,99 PLN". Das kann fuer Kunden verwirrend sein und nimmt in Produktlisten viel Platz ein.

Das Format "ab 19,99 PLN":
- Ist auf Mobilgeraeten besser lesbar
- Kommuniziert klar den niedrigsten Preis
- Ist Standard in den meisten Onlineshops
- Funktioniert sowohl auf Archivseiten als auch auf der Produktseite

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski > Preise**.

| Einstellung | Beschreibung | Standard |
|------------|------|-----------|
| "Ab"-Preis aktivieren | Zeigt "ab {Preis}" anstelle der Preisspanne | Ja |
| Text des "Ab"-Preises | Textvorlage mit dem Token `{price}` | `od {price}` |

### Beispielvorlagen

| Vorlage | Ergebnis |
|---------|-------|
| `od {price}` | od 19,99 PLN |
| `Cena od {price}` | Cena od 19,99 PLN |
| `ab {price}` | ab 19,99 PLN (fuer DE) |
| `from {price}` | from 19,99 PLN (fuer EN) |

## Wie es funktioniert

1. Das Modul filtert den Hook `woocommerce_get_price_html`
2. Es prueft, ob das Produkt ein `WC_Product_Variable` ist
3. Es ruft die Preise der Varianten ab und prueft, ob eine Spanne existiert (min != max)
4. Falls ja, ersetzt es die Preisspanne durch das Format "ab {niedrigster_preis}"
5. Wenn alle Varianten denselben Preis haben, zeigt es den normalen Preis an

## Filter

```php
// HTML des "Ab"-Preises anpassen
add_filter('polski/price/from_price_html', function (string $html, WC_Product $product): string {
    // CSS-Klasse hinzufuegen oder Format aendern
    return '<span class="my-from-price">' . $html . '</span>';
}, 10, 2);
```

## Deaktivierung fuer ausgewaehlte Produkte

Wenn du "ab" fuer bestimmte Produkte deaktivieren willst, verwende den Filter:

```php
add_filter('polski/price/from_price_html', function (string $html, WC_Product $product): string {
    if ($product->get_id() === 123) {
        return $product->get_price_html(); // Originale Spanne
    }
    return $html;
}, 10, 2);
```
