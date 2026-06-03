---
title: Flexible Shipping (Table Rate)
description: Pokročilá pravidla dopravy založená na hmotnosti, hodnotě košíku, počtu produktů a cílové zemi.
---

Metoda dopravy Flexible Shipping umožňuje definovat složitá pravidla nákladů na dopravu.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Doprava > [Zóna] > Přidat metodu > Flexible Shipping**.

## Podmínky pravidel

| Podmínka | Popis |
|---------|------|
| Min/max hodnota košíku | Náklad závisí na hodnotě objednávky |
| Min/max hmotnost | Náklad závisí na hmotnosti košíku (kg) |
| Min/max počet produktů | Náklad závisí na množství |
| Země | Pravidlo pouze pro určité země |

## Režimy výpočtu nákladu

| Režim | Popis |
|------|------|
| fixed | Pevná částka za objednávku |
| per_item | Částka x počet produktů |
| per_kg | Částka x hmotnost v kg |
| percent | Procento hodnoty košíku |

## Dodatečný náklad za hmotnost

Lze nakonfigurovat dodatečný náklad za každý kg nad prahem:
- `extra_kg_above`: Hmotnostní práh (kg)
- `extra_kg_cost`: Náklad za dodatečný kg

## Doprava zdarma

Pole "Free shipping above" - po překročení hodnoty košíku je doprava zdarma.

## Pravidla JSON

Pravidla jsou ukládána jako JSON. Příklad:

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
