---
title: Loyalty program (Points)
description: Loyalty points system in Polski PRO - customers earn points for purchases and redeem them for discounts.
---

The loyalty program module lets you reward customers with points for their purchases and allows points to be redeemed for cart discounts.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Configuration

Go to **WooCommerce > Settings > Polski PRO > Loyalty**.

### Basic settings

| Setting | Description | Default |
|---------|-------------|---------|
| Enabled | Activates the loyalty program | No |
| Points per 1 PLN | How many points for each zloty | 1 |
| Value of 1 point | Discount value of a single point | 0.01 PLN |
| Min. points to redeem | Minimum number of points to redeem | 100 |
| Max. discount % | Maximum percentage discount from points | 50% |
| Points expiration | After how many days points expire | 365 |
| Rounding | floor (down) or ceil (up) | floor |

## Earning points

Customers automatically receive points after a completed order.

### Accrual priorities

1. **Per-product setting** - the "Loyalty points per unit" field in the product editor
2. **Per-category setting** - the field in the product category editor
3. **Default calculation** - product price x points per 1 PLN

### Information on the product page

The product page automatically displays the information:
> Earn **X points** for purchasing this product

## Redeeming points

Customers can redeem points for a discount on the cart or checkout page:
1. The system shows the current balance and the discount value
2. The customer enters the number of points to redeem
3. A one-time coupon with the discount is created
4. The coupon is applied automatically to the cart

### Redemption limits

- Minimum number of points to redeem (configurable)
- Maximum discount as a % of the cart value
- Coupon valid for 24 hours

## My Account panel

In the **My account** section a **Loyalty program** tab appears with:
- Current points balance and its value in PLN
- Total points earned
- Total points used
- Transaction history with dates, types and details

## Points expiration

Points expire automatically after the configured period (365 days by default). The `polski_daily_maintenance` cron checks for expired points daily and deducts them from the balance.

Setting it to 0 = points never expire.

## Refunds and cancellations

- On order cancellation/refund, awarded points are automatically deducted
- Protection against double accrual and deduction

## Order emails

In order confirmation emails the customer sees information about the number of points earned.

## Hooks

| Hook | Type | Description |
|------|------|-------------|
| `polski/loyalty/points_awarded` | action | After points are awarded for an order |
| `polski/loyalty/order_points` | filter | Modify the number of points for an order |
