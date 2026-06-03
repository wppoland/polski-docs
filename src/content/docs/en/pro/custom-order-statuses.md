---
title: Custom order statuses
description: Create custom order statuses with colors, icons and email notifications.
---

This module lets you create any WooCommerce order statuses with a configurable appearance and automatic emails.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Configuration

Go to **WooCommerce > Order Statuses**.

## Creating a status

| Field | Description |
|------|------|
| Slug | Status identifier (max 17 characters, e.g. quality_check) |
| Label | Displayed name (e.g. "Quality check") |
| Color | Background color of the status badge (hex) |
| Icon | Dashicon class (e.g. dashicons-yes) |
| Email | Whether to send an email when changing to this status |
| Email subject | Email subject (supports tokens) |
| Email body | HTML email content (supports tokens) |

## Tokens in emails

| Token | Description |
|-------|------|
| `{order_id}` | Order ID |
| `{order_number}` | Order number |
| `{first_name}` | Customer first name |
| `{last_name}` | Customer last name |
| `{status_from}` | Previous status |
| `{status_to}` | New status |
| `{site_title}` | Store name |

## Features

- Statuses visible in the order status change dropdown
- Colored badges in the order list
- Bulk actions for each status
- Automatic WooCommerce emails (wrapped in a template)
- Unlimited number of statuses
