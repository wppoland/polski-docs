---
title: "Promotions and dynamic pricing"
description: "Free dynamic pricing module in Polski for WooCommerce - automatic cart discounts: a quantity (bulk) discount on a product line and a percentage off when the cart subtotal reaches a threshold. Off by default."
---

The **Promotions / dynamic pricing** module adds two automatic cart discounts, configured in the module settings. It is part of Polski for WooCommerce: free, optional, and off by default.

## What the module does

Once enabled, the module applies discounts automatically while the cart recalculates, with no coupon codes:

- **Bulk (quantity) discount** - a percentage off a product line when its quantity reaches a threshold.
- **Cart subtotal discount** - a percentage off when the cart subtotal reaches a threshold (applied as a negative cart fee).

Discounts are recomputed from the regular price each time, idempotently, so they are safe across WooCommerce's repeated total calculations.

## Enabling the module

The module is free, optional, and off by default.

Go to `WooCommerce › Polski › Modules`, the **Merchandising** group, and turn on the **Promotions / dynamic pricing** toggle.

## Settings

The module settings live on its card in the `Modules` section:

| Setting | Description |
|---------|-------------|
| **Bulk discount: minimum quantity per product** | Quantity threshold per line that triggers the bulk discount. `0` disables the bulk discount. |
| **Bulk discount: percent off (%)** | Percentage off a line once the quantity reaches the threshold. |
| **Cart discount: subtotal threshold** | Cart subtotal that triggers the cart discount. `0` disables it. |
| **Cart discount: percent off (%)** | Percentage off the cart subtotal once the threshold is reached. |

## How the discounts work

### Bulk discount

When a line's quantity reaches the **minimum quantity per product** threshold, that line's price is reduced by the configured percentage. The discount applies to each qualifying line on its own.

Example: threshold `10`, discount `15%`. A customer with 10 units of a product gets 15% off that line; with 9 units no discount applies.

### Cart subtotal discount

When the cart subtotal reaches the **subtotal threshold**, a negative fee equal to the configured percentage of the subtotal is added to the cart.

Example: threshold `500`, discount `10%`. A cart of 500 or more gets 10% off, applied as a cart discount.

## Combining discounts

Both discounts work independently and can apply at the same time: the bulk discount lowers line prices, and the cart discount adds a further reduction based on the subtotal. To disable either one, set its threshold to `0`.
