---
title: Flexible Shipping (Table Rate)
description: Pokročilé pravidlá doručenia založené na hmotnosti, hodnote košíka, počte produktov a cieľovej krajine.
---

Spôsob doručenia Flexible Shipping umožňuje definovať zložité pravidlá nákladov na doručenie.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Doručenie > [Zóna] > Pridať spôsob > Flexible Shipping**.

## Podmienky pravidiel

| Podmienka | Popis |
|---------|------|
| Min/max hodnota košíka | Náklad závisí od hodnoty objednávky |
| Min/max hmotnosť | Náklad závisí od hmotnosti košíka (kg) |
| Min/max počet produktov | Náklad závisí od množstva |
| Krajiny | Pravidlo len pre určené krajiny |

## Režimy výpočtu nákladu

| Režim | Popis |
|------|------|
| fixed | Pevná suma za objednávku |
| per_item | Suma x počet produktov |
| per_kg | Suma x hmotnosť v kg |
| percent | Percento hodnoty košíka |

## Dodatočný náklad za hmotnosť

Možno nakonfigurovať dodatočný náklad za každý kg nad prahom:
- `extra_kg_above`: Hmotnostný prah (kg)
- `extra_kg_cost`: Náklad za dodatočný kg

## Doprava zadarmo

Pole "Free shipping above" - po prekročení hodnoty košíka je doručenie zadarmo.

## Pravidlá JSON

Pravidlá sú uložené ako JSON. Príklad:

```json
[
  {
    "label": "Standard (do 5 kg)",
    "min_weight": 0,
    "max_weight": 5,
    "cost_type": "fixed",
    "cost": 12.99
  },
  {
    "label": "Ciezka paczka",
    "min_weight": 5,
    "max_weight": 30,
    "cost_type": "fixed",
    "cost": 19.99,
    "extra_kg_above": 10,
    "extra_kg_cost": 2
  }
]
```
