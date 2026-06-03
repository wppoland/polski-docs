---
title: Podmienené platobné metódy
description: Skrývanie a zobrazovanie platobných metód na základe spôsobu dopravy, hodnoty košíka, roly používateľa a kategórie produktov.
---

Modul podmienených platobných metód umožňuje riadiť dostupnosť platobných brán na základe pravidiel.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Podmienené platby**.

## Typy podmienok

| Podmienka | Popis |
|---------|------|
| Spôsob dopravy | Skry/zobraz bránu pre konkrétny spôsob dopravy |
| Hodnota košíka (min) | Skry bránu, keď je košík pod sumou |
| Hodnota košíka (max) | Skry bránu, keď je košík nad sumou |
| Rola používateľa | Brána len pre určenú rolu (napr. wholesale) |
| Kategória produktu | Brána dostupná, keď sú v košíku produkty z kategórie |

## Pravidlá

Každé pravidlo sa skladá z:
- **Platobná brána** - ktorej brány sa pravidlo týka
- **Akcia** - `hide` (skry, keď je podmienka splnená) alebo `show_only` (zobraz len, keď je splnená)
- **Typ podmienky** - jeden z vyššie uvedených
- **Hodnota podmienky** - napr. ID spôsobu dopravy, suma, slug roly

### Príklady

| Brána | Akcia | Podmienka | Hodnota | Efekt |
|--------|-------|---------|---------|-------|
| Dobierka (COD) | hide | Spôsob dopravy | inpost_locker | Skry dobierku pre Paczkomaty |
| Prevod | show_only | Hodnota košíka min | 200 | Prevod dostupný od 200 PLN |
| PayPal | hide | Rola používateľa | wholesale | Veľkoobchodníci nevidia PayPal |

## Poplatky za platobnú metódu

Môžete pridať dodatočný poplatok za vybranú platobnú metódu:

| Nastavenie | Popis |
|------------|------|
| Zapnuté | Aktivuje poplatok pre túto bránu |
| Názov poplatku | Text viditeľný v košíku |
| Typ | Pevná suma alebo percento |
| Suma | Hodnota poplatku |
| Min. objednávka | Poplatok len nad sumou |
| Max. objednávka | Poplatok len pod sumou |
| Podlieha DPH | Či účtovať DPH z poplatku |
| Daňová trieda | Trieda DPH pre poplatok |

Poplatok sa automaticky prepočíta pri zmene platobnej metódy na pokladni (AJAX).

## Filter WooCommerce

Modul používa filter `woocommerce_available_payment_gateways` s prioritou 100 a `woocommerce_cart_calculate_fees` pre poplatky.
