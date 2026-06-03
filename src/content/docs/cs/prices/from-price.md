---
title: Cena "od" pro produkty s variantami
description: 'Modul zobrazování ceny "od XX PLN" místo cenového rozpětí pro produkty WooCommerce s variantami.'
---

Modul "Cena od" nahrazuje výchozí cenové rozpětí WooCommerce (např. "19,99 - 49,99 PLN") čitelnějším formátem **"od 19,99 PLN"** pro produkty s variantami.

## Proč je to důležité

Výchozí zobrazení cen WooCommerce pro produkty s variantami ukazuje celé rozpětí: "19,99 PLN - 49,99 PLN". To může být pro zákazníky matoucí a zabírá hodně místa ve výpisech produktů.

Formát "od 19,99 PLN":
- Je čitelnější na mobilních zařízeních
- Jasně komunikuje nejnižší cenu
- Je standardem ve většině internetových obchodů
- Funguje jak na stránkách archivů, tak na stránce produktu

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Ceny**.

| Nastavení | Popis | Výchozí |
|------------|------|-----------|
| Zapnout cenu "od" | Zobrazovat "od {cena}" místo cenového rozpětí | Ano |
| Text ceny "od" | Šablona textu s tokenem `{price}` | `od {price}` |

### Příklady šablon

| Šablona | Výsledek |
|---------|-------|
| `od {price}` | od 19,99 PLN |
| `Cena od {price}` | Cena od 19,99 PLN |
| `ab {price}` | ab 19,99 PLN (pro DE) |
| `from {price}` | from 19,99 PLN (pro EN) |

## Jak to funguje

1. Modul filtruje hook `woocommerce_get_price_html`
2. Kontroluje, zda je produkt typu `WC_Product_Variable`
3. Získá ceny variant a zkontroluje, zda existuje rozpětí (min != max)
4. Pokud ano, nahradí cenové rozpětí formátem "od {nejnizsi_cena}"
5. Pokud mají všechny varianty stejnou cenu, zobrazí normální cenu

## Filtr

```php
// Přizpůsobte HTML ceny "od"
add_filter('polski/price/from_price_html', function (string $html, WC_Product $product): string {
    // Přidejte CSS třídu nebo změňte formát
    return '<span class="my-from-price">' . $html . '</span>';
}, 10, 2);
```

## Vypnutí pro vybrané produkty

Pokud chcete vypnout "od" pro konkrétní produkty, použijte filtr:

```php
add_filter('polski/price/from_price_html', function (string $html, WC_Product $product): string {
    if ($product->get_id() === 123) {
        return $product->get_price_html(); // Původní rozpětí
    }
    return $html;
}, 10, 2);
```
