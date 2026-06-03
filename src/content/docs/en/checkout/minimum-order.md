---
title: Minimum order value and quantity
description: A module that enforces a minimum cart value and a minimum number of products in a WooCommerce order.
---

The minimum order module blocks proceeding to checkout if the cart does not meet the required thresholds, that is, a minimum value or a minimum number of products.

## Configuration

Go to **WooCommerce > Settings > Polski > Modules** and enable the **Minimum order** module.

Then configure the thresholds in **WooCommerce > Settings > Polski > Checkout**:

| Setting | Description | Default |
|------------|------|-----------|
| Minimum order value | Amount in PLN (0 = disabled) | 0 |
| Minimum number of products | Number of items (0 = disabled) | 0 |
| Exclude products on sale | Do not count products on sale toward the minimum value | No |
| Value message | Error text with the `{min_value}` and `{current_value}` tokens | The minimum order value is {min_value}. Current cart value: {current_value}. |
| Quantity message | Error text with the `{min_quantity}` and `{current_quantity}` tokens | The minimum number of products in an order is {min_quantity}. Current quantity: {current_quantity}. |

## How it works

The module validates the cart in two places:

1. **Cart page** (`woocommerce_check_cart_items`) - displays an error message
2. **Checkout page** (`woocommerce_checkout_process`) - blocks order placement

If the cart does not meet the requirement, the customer sees a red error message and cannot proceed to payment.

### Message examples

**Minimum value:**
> The minimum order value is 50.00 PLN. Current cart value: 29.99 PLN.

**Minimum quantity:**
> The minimum number of products in an order is 3. Current quantity: 1.

## Excluding products on sale

The "Exclude products on sale" option lets you avoid counting the value of discounted products toward the minimum cart value. Useful when you want the minimum to apply only to full-price products.

## Use cases

| Scenario | Configuration |
|------------|-------------|
| Wholesale store (B2B) | Min. value 200 PLN, min. quantity 5 |
| Free shipping above an amount | Min. value 100 PLN (an alternative to a free shipping threshold) |
| Preventing micro-orders | Min. value 20 PLN |
| Products sold in packs | Min. quantity 3 |

## Compatibility

The module works with:
- WooCommerce Checkout Blocks
- Classic checkout (shortcode)
- All payment methods
- Multi-step checkout (Polski PRO)
