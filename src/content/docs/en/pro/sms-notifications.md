---
title: SMS Notifications
description: Order status text messages via SMSAPI.pl and SerwerSMS.pl.
---

The module sends automatic text messages to customers when an order status changes.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. An account at SMSAPI.pl or SerwerSMS.pl.
:::

## Supported providers

| Provider | API |
|----------|-----|
| SMSAPI.pl | REST API with a Bearer token |
| SerwerSMS.pl | REST API with a Bearer token |

## Configuration

Go to **WooCommerce > Settings > Polski PRO > SMS**.

| Setting | Description |
|------------|------|
| Provider | SMSAPI.pl or SerwerSMS.pl |
| API token | Authorization key |
| Sender name | FROM field (max 11 characters) |
| Statuses | Which statuses trigger an SMS |
| Message template | SMS content with tokens |

## Tokens in the message

| Token | Description |
|-------|------|
| `{order_id}` | Order ID |
| `{order_number}` | Order number |
| `{first_name}` | Customer first name |
| `{last_name}` | Customer last name |
| `{status}` | Name of the new status |
| `{tracking_number}` | Tracking number (if available) |
| `{tracking_url}` | Tracking URL |
| `{total}` | Order amount |
| `{site_name}` | Store name |

## Admin notifications

Optionally, you can enable SMS notifications to the administrator about new orders, with a separate template.

## Number normalization

The system automatically normalizes Polish phone numbers to the international format (48XXXXXXXXX).

## GDPR

Phone numbers are masked in order notes (e.g. 501***789).
