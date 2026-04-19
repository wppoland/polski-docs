---
title: AJAX Dodaj do koszyka
description: Dodawanie produktow do koszyka bez przeladowania strony, wlacznie z produktami wariantowymi.
---

Modul AJAX Add to Cart umozliwia dodawanie produktow do koszyka bez przeladowania strony.

## Funkcje

- Obsluga produktow prostych i wariantowych na stronach produktowych
- Powiadomienie toast z linkiem do koszyka
- Automatyczna aktualizacja fragmentow koszyka (mini-cart)
- Animacja przycisku (loading -> added)
- Kompatybilnosc z WooCommerce AJAX fragments

## Wlaczenie

Przejdz do **WooCommerce > Polski > Moduły** i wlacz modul **AJAX Add to Cart** w sekcji "Stock & Cart".

## Jak to dziala

1. Klient klika "Dodaj do koszyka" na stronie produktu
2. Formularz jest wysylany przez AJAX (bez przeladowania)
3. Przycisk pokazuje animacje ladowania
4. Po dodaniu pojawia sie zielone powiadomienie "Dodano do koszyka!" z linkiem "Zobacz koszyk"
5. Mini-cart w naglowku aktualizuje sie automatycznie

## Zdarzenia JavaScript

| Zdarzenie | Kiedy |
|-----------|-------|
| `polski_adding_to_cart` | Przed wyslaniem AJAX |
| `polski_added_to_cart` | Po udanym dodaniu |
| `added_to_cart` | Standardowe zdarzenie WooCommerce |

## Styl powiadomienia

Powiadomienie toast wyswietla sie w prawym gornym rogu ekranu i znika po 4 sekundach. Mozna je dostosowac przez CSS klase `.polski-ajax-cart-notice`.
