---
title: Tpay Integration
description: Tpay (Transferuj.pl) payment gateway - bank transfers, BLIK, payment cards.
---

The Tpay module integrates WooCommerce with one of the most popular Polish payment gateways.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. A Tpay account.
:::

## Supported methods

| Method | Description |
|--------|------|
| Bank transfers | All Polish online banks |
| BLIK | Payment with a 6-digit code |
| Payment cards | Visa, Mastercard |

## Configuration

Go to **WooCommerce > Settings > Payments > Tpay**.

| Setting | Description |
|------------|------|
| Merchant ID | Tpay merchant ID (4-5 digits) |
| Security code | Security code |
| API key | 40-character API key (for refunds) |
| API password | API password |
| BLIK | Enable BLIK payments |
| Bank list | Show at checkout or redirect to Tpay |

## Payment surcharge

You can configure a surcharge for using the gateway:
- Fixed amount (PLN)
- Percentage of the order value

## IPN verification

IPN notifications are verified through:
1. MD5 checksum: `md5(merchant_id + transaction_id + amount + crc + security_code)`
2. Tpay IP allowlist (5 addresses)

## Refunds

Refunds are processed through the Tpay Transaction API. Requires an API key and password.
