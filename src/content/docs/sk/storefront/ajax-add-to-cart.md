---
title: AJAX Pridať do košíka
description: Pridávanie produktov do košíka bez načítania stránky, vrátane variabilných produktov.
---

Modul AJAX Add to Cart umožňuje pridávanie produktov do košíka bez načítania stránky.

## Funkcie

- Podpora jednoduchých a variabilných produktov na stránkach produktov
- Toast notifikácia s odkazom na košík
- Automatická aktualizácia fragmentov košíka (mini-cart)
- Animácia tlačidla (loading -> added)
- Kompatibilita s WooCommerce AJAX fragments

## Zapnutie

Prejdite do **WooCommerce > Polski > Moduly** a zapnite modul **AJAX Add to Cart** v sekcii "Stock & Cart".

## Ako to funguje

1. Zákazník klikne na "Pridať do košíka" na stránke produktu
2. Formulár sa odošle cez AJAX (bez načítania)
3. Tlačidlo zobrazí animáciu načítavania
4. Po pridaní sa objaví zelená notifikácia "Pridané do košíka!" s odkazom "Zobraziť košík"
5. Mini-cart v hlavičke sa aktualizuje automaticky

## JavaScript udalosti

| Udalosť | Kedy |
|-----------|-------|
| `polski_adding_to_cart` | Pred odoslaním AJAX |
| `polski_added_to_cart` | Po úspešnom pridaní |
| `added_to_cart` | Štandardná udalosť WooCommerce |

## Štýl notifikácie

Toast notifikácia sa zobrazuje v pravom hornom rohu obrazovky a zmizne po 4 sekundách. Je možné ju prispôsobiť cez CSS triedu `.polski-ajax-cart-notice`.
