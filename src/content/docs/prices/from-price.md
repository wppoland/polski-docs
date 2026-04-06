---
title: Cena "od" dla produktow z wariantami
description: Modul wyswietlania ceny "od XX PLN" zamiast zakresu cenowego dla produktow WooCommerce z wariantami.
---

Modul "Cena od" zastepuje domyslny zakres cenowy WooCommerce (np. "19,99 - 49,99 PLN") czytelniejszym formatem **"od 19,99 PLN"** dla produktow z wariantami.

## Dlaczego to wazne

Domyslny wyswietlacz cen WooCommerce dla produktow z wariantami pokazuje pelny zakres: "19,99 PLN - 49,99 PLN". To moze byc mylace dla klientow i zajmuje duzo miejsca na listach produktow.

Format "od 19,99 PLN":
- Jest bardziej czytelny na urzadzeniach mobilnych
- Jasno komunikuje najnizsza cene
- Jest standardem w wiekszosci sklepow internetowych
- Dziala zarowno na stronach archiwow, jak i na stronie produktu

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Polski > Ceny**.

| Ustawienie | Opis | Domyslnie |
|------------|------|-----------|
| Wlacz cene "od" | Pokazuj "od {cena}" zamiast zakresu cenowego | Tak |
| Tekst ceny "od" | Szablon tekstu z tokenem `{price}` | `od {price}` |

### Przyklady szablonow

| Szablon | Wynik |
|---------|-------|
| `od {price}` | od 19,99 PLN |
| `Cena od {price}` | Cena od 19,99 PLN |
| `ab {price}` | ab 19,99 PLN (dla DE) |
| `from {price}` | from 19,99 PLN (dla EN) |

## Jak to dziala

1. Modul filtruje hook `woocommerce_get_price_html`
2. Sprawdza, czy produkt to `WC_Product_Variable`
3. Pobiera ceny wariantow i sprawdza, czy istnieje zakres (min != max)
4. Jesli tak, zastepuje zakres cenowy formatem "od {najnizsza_cena}"
5. Jesli wszystkie warianty maja te sama cene, wyswietla normalna cene

## Filtr

```php
// Dostosuj HTML ceny "od"
add_filter('polski/price/from_price_html', function (string $html, WC_Product $product): string {
    // Dodaj klase CSS lub zmien format
    return '<span class="my-from-price">' . $html . '</span>';
}, 10, 2);
```

## Wylaczenie dla wybranych produktow

Jesli chcesz wylaczyc "od" dla konkretnych produktow, uzyj filtra:

```php
add_filter('polski/price/from_price_html', function (string $html, WC_Product $product): string {
    if ($product->get_id() === 123) {
        return $product->get_price_html(); // Oryginalny zakres
    }
    return $html;
}, 10, 2);
```
