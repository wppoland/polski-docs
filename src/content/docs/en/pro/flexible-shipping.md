---
title: Flexible Shipping (Table Rate)
description: Advanced shipping rules based on weight, cart value, number of products and destination country.
---

The Flexible Shipping shipping method lets you define complex shipping cost rules.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Configuration

Go to **WooCommerce > Settings > Shipping > [Zone] > Add method > Flexible Shipping**.

## Rule conditions

| Condition | Description |
|---------|------|
| Min/max cart value | Cost depends on order value |
| Min/max weight | Cost depends on cart weight (kg) |
| Min/max number of products | Cost depends on quantity |
| Countries | Rule applies only to specific countries |

## Cost calculation modes

| Mode | Description |
|------|------|
| fixed | Fixed amount per order |
| per_item | Amount x number of products |
| per_kg | Amount x weight in kg |
| percent | Percentage of cart value |

## Additional cost per weight

You can configure an additional cost for each kg above a threshold:
- `extra_kg_above`: Weight threshold (kg)
- `extra_kg_cost`: Cost per additional kg

## Free shipping

The "Free shipping above" field - once the cart value is exceeded, shipping is free.

## JSON rules

Rules are stored as JSON. Example:

```json
[
  {
    "label": "Standard (up to 5 kg)",
    "min_weight": 0,
    "max_weight": 5,
    "cost_type": "fixed",
    "cost": 12.99
  },
  {
    "label": "Heavy parcel",
    "min_weight": 5,
    "max_weight": 30,
    "cost_type": "fixed",
    "cost": 19.99,
    "extra_kg_above": 10,
    "extra_kg_cost": 2
  }
]
```
