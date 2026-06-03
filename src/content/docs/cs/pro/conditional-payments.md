---
title: Podmíněné platební metody
description: Skrývání a zobrazování platebních metod na základě metody dopravy, hodnoty košíku, role uživatele a kategorie produktů.
---

Modul podmíněných platebních metod umožňuje řídit dostupnost platebních bran na základě pravidel.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfigurace

Přejděte na **WooCommerce > Nastavení > Polski PRO > Podmíněné platby**.

## Typy podmínek

| Podmínka | Popis |
|---------|------|
| Metoda dopravy | Skrýt/zobrazit bránu pro konkrétní metodu dopravy |
| Hodnota košíku (min) | Skrýt bránu, když je košík pod částkou |
| Hodnota košíku (max) | Skrýt bránu, když je košík nad částkou |
| Role uživatele | Brána pouze pro určenou roli (např. wholesale) |
| Kategorie produktu | Brána dostupná, když jsou v košíku produkty z kategorie |

## Pravidla

Každé pravidlo se skládá z:
- **Platební brána** - která brána je pravidlem dotčena
- **Akce** - `hide` (skrýt, když je podmínka splněna) nebo `show_only` (zobrazit pouze, když je splněna)
- **Typ podmínky** - jedna z výše uvedených
- **Hodnota podmínky** - např. ID metody dopravy, částka, slug role

### Příklady

| Brána | Akce | Podmínka | Hodnota | Efekt |
|--------|-------|---------|---------|-------|
| Dobírka (COD) | hide | Metoda dopravy | inpost_locker | Skrýt dobírku pro Paczkomaty |
| Převod | show_only | Hodnota košíku min | 200 | Převod dostupný od 200 PLN |
| PayPal | hide | Role uživatele | wholesale | Velkoobchodníci nevidí PayPal |

## Poplatky za platební metodu

Můžete přidat dodatečný poplatek za vybranou platební metodu:

| Nastavení | Popis |
|------------|------|
| Zapnuto | Aktivuje poplatek pro tuto bránu |
| Název poplatku | Text viditelný v košíku |
| Typ | Pevná částka nebo procento |
| Částka | Hodnota poplatku |
| Min. objednávka | Poplatek pouze nad částkou |
| Max. objednávka | Poplatek pouze pod částkou |
| Podléhá DPH | Zda účtovat DPH z poplatku |
| Daňová třída | Třída DPH pro poplatek |

Poplatek je automaticky přepočítán při změně platební metody na pokladně (AJAX).

## Filtr WooCommerce

Modul používá filtr `woocommerce_available_payment_gateways` s prioritou 100 a `woocommerce_cart_calculate_fees` pro poplatky.
