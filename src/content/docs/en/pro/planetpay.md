---
title: PlanetPay integration
description: PlanetPay payment gateway in Polski PRO - BLIK, cards, bank transfers, Google Pay, Apple Pay.
---

The PlanetPay module integrates WooCommerce with the PlanetPay payment gateway. It supports BLIK, payment cards, bank transfers, Google Pay and Apple Pay.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. A PlanetPay account.
:::

## Configuration

Go to **WooCommerce > Settings > Payments > PlanetPay**.

### Access credentials

| Setting | Description |
|---------|-------------|
| Merchant ID | Merchant identifier |
| Merchant Secret | Merchant secret key |
| Signing key | SHA256 HMAC key for verifying webhooks |
| Sandbox mode | Testing without real transactions |

### Payment methods

| Method | Description |
|--------|-------------|
| BLIK | Payment with a 6-digit code, instant |
| Cards | Visa, Mastercard, others |
| Bank transfers | Przelewy24 and traditional transfers |
| Google Pay | Google Pay payment |
| Apple Pay | Apple Pay payment |

## Payment flow

### BLIK
1. The customer selects BLIK and enters a 6-digit code
2. The payment is processed instantly through the API
3. The order is marked as paid

### Other methods
1. The customer selects a payment method
2. Redirect to the PlanetPay paywall
3. A webhook updates the order status

## Refunds

Refunds can be initiated from the WooCommerce order panel. The PlanetPay API processes the refund and sends a webhook notification.

## Webhooks

| Endpoint | Description |
|----------|-------------|
| `/wp-json/polski-pro/v1/planetpay/payment` | Payment status notifications |
| `/wp-json/polski-pro/v1/planetpay/refund` | Refund status notifications |

Webhooks are verified with a SHA256 HMAC signature in the `X-Planetpay-Signature` header.
