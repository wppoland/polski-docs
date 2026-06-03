---
title: AJAX Pridat do kosiku
description: Pridavani produktu do kosiku bez znovunacteni stranky, vcetne variabilnich produktu.
---

Modul AJAX Add to Cart umoznuje pridavat produkty do kosiku bez znovunacteni stranky.

## Funkce

- Podpora jednoduchych a variabilnich produktu na strankach produktu
- Toast oznameni s odkazem na kosik
- Automaticka aktualizace fragmentu kosiku (mini-cart)
- Animace tlacitka (loading -> added)
- Kompatibilita s WooCommerce AJAX fragments

## Zapnuti

Prejdete do **WooCommerce > Polski > Moduly** a zapnete modul **AJAX Add to Cart** v sekci "Stock & Cart".

## Jak to funguje

1. Zakaznik kliknete na "Pridat do kosiku" na strance produktu
2. Formular je odeslan pres AJAX (bez znovunacteni)
3. Tlacitko zobrazi animaci nacitani
4. Po pridani se objevi zelene oznameni "Pridano do kosiku!" s odkazem "Zobrazit kosik"
5. Mini-cart v zahlavi se aktualizuje automaticky

## JavaScript udalosti

| Udalost | Kdy |
|-----------|-------|
| `polski_adding_to_cart` | Pred odeslanim AJAX |
| `polski_added_to_cart` | Po uspesnem pridani |
| `added_to_cart` | Standardni udalost WooCommerce |

## Styl oznameni

Toast oznameni se zobrazi v pravem hornim rohu obrazovky a zmizi po 4 sekundach. Lze ho prizpusobit pres CSS tridu `.polski-ajax-cart-notice`.
