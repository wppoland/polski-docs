---
title: Conditional Payment Methods
description: Hiding and showing payment methods based on shipping method, cart value, user role, and product categories.
---

The conditional payment methods module lets you control the availability of payment gateways based on rules.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Configuration

Go to **WooCommerce > Settings > Polski PRO > Conditional Payments**.

## Condition types

| Condition | Description |
|---------|------|
| Shipping method | Hide/show a gateway for a specific shipping method |
| Cart value (min) | Hide a gateway when the cart is below an amount |
| Cart value (max) | Hide a gateway when the cart is above an amount |
| User role | Gateway only for a specific role (e.g. wholesale) |
| Product category | Gateway available when the cart contains products from a category |

## Rules

Each rule consists of:
- **Payment gateway** - which gateway the rule applies to
- **Action** - `hide` (hide when the condition is met) or `show_only` (show only when met)
- **Condition type** - one of the above
- **Condition value** - e.g. shipping method ID, amount, role slug

### Examples

| Gateway | Action | Condition | Value | Effect |
|--------|-------|---------|---------|-------|
| Cash on delivery (COD) | hide | Shipping method | inpost_locker | Hide COD for InPost lockers |
| Bank transfer | show_only | Cart value min | 200 | Bank transfer available from 200 PLN |
| PayPal | hide | User role | wholesale | Wholesalers do not see PayPal |

## Payment method fees

You can add an extra fee for a chosen payment method:

| Setting | Description |
|------------|------|
| Enabled | Activates the fee for this gateway |
| Fee title | Text shown in the cart |
| Type | Fixed amount or percentage |
| Amount | The fee value |
| Min. order | Fee only above an amount |
| Max. order | Fee only below an amount |
| Subject to VAT | Whether to charge VAT on the fee |
| Tax class | The VAT class for the fee |

The fee is automatically recalculated when the payment method changes at checkout (AJAX).

## WooCommerce filter

The module uses the `woocommerce_available_payment_gateways` filter with priority 100, and `woocommerce_cart_calculate_fees` for fees.
