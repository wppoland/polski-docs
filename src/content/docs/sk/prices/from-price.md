---
title: Cena "od" pre produkty s variantmi
description: 'Modul zobrazovania ceny "od XX PLN" namiesto cenového rozsahu pre produkty WooCommerce s variantmi.'
---

Modul "Cena od" nahrádza predvolený cenový rozsah WooCommerce (napr. "19,99 - 49,99 PLN") čitateľnejším formátom **"od 19,99 PLN"** pre produkty s variantmi.

## Prečo je to dôležité

Predvolené zobrazovanie cien WooCommerce pre produkty s variantmi ukazuje úplný rozsah: "19,99 PLN - 49,99 PLN". To môže byť pre zákazníkov mätúce a zaberá veľa miesta v zoznamoch produktov.

Formát "od 19,99 PLN":
- Je čitateľnejší na mobilných zariadeniach
- Jasne komunikuje najnižšiu cenu
- Je štandardom vo väčšine internetových obchodov
- Funguje na archívnych stránkach aj na stránke produktu

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Ceny**.

| Nastavenie | Popis | Predvolene |
|------------|------|-----------|
| Zapnúť cenu "od" | Zobrazovať "od {cena}" namiesto cenového rozsahu | Áno |
| Text ceny "od" | Šablóna textu s tokenom `{price}` | `od {price}` |

### Príklady šablón

| Šablóna | Výsledok |
|---------|-------|
| `od {price}` | od 19,99 PLN |
| `Cena od {price}` | Cena od 19,99 PLN |
| `ab {price}` | ab 19,99 PLN (pre DE) |
| `from {price}` | from 19,99 PLN (pre EN) |

## Ako to funguje

1. Modul filtruje hook `woocommerce_get_price_html`
2. Skontroluje, či je produkt `WC_Product_Variable`
3. Získa ceny variantov a skontroluje, či existuje rozsah (min != max)
4. Ak áno, nahradí cenový rozsah formátom "od {najnizsia_cena}"
5. Ak majú všetky varianty rovnakú cenu, zobrazí normálnu cenu

## Filter

```php
// Prispôsob HTML ceny "od"
add_filter('polski/price/from_price_html', function (string $html, WC_Product $product): string {
    // Pridaj CSS triedu alebo zmeň formát
    return '<span class="my-from-price">' . $html . '</span>';
}, 10, 2);
```

## Vypnutie pre vybrané produkty

Ak chcete vypnúť "od" pre konkrétne produkty, použite filter:

```php
add_filter('polski/price/from_price_html', function (string $html, WC_Product $product): string {
    if ($product->get_id() === 123) {
        return $product->get_price_html(); // Originálny rozsah
    }
    return $html;
}, 10, 2);
```
