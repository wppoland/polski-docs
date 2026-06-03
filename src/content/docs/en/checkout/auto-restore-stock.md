---
title: Automatic stock restoration
description: Restores product stock when an order is cancelled, refunded, or unpaid.
---

WooCommerce reduces stock when an order is placed, but does not always restore it on cancellation. This module automatically restores the stock.

## Enabling

Go to **WooCommerce > Polski > Modules** and enable the **Auto Restore Stock** module in the "Stock & Cart" section.

## Supported status transitions

| From status | To status | Restoration |
|-----------|-----------|-------------|
| Processing | Cancelled | Yes |
| Completed | Cancelled | Yes |
| On-hold | Cancelled | Yes |
| Processing | Refunded | Yes |
| Completed | Refunded | Yes |
| On-hold | Refunded | Yes |
| Processing | Failed | Yes |
| On-hold | Failed | Yes |

## How it works

1. The order changes its status to cancelled/refunded/unpaid
2. The module checks each product in the order
3. For products with stock management enabled, it restores the quantity
4. It adds a note to the order: "Stock restored: Product name (5 -> 8)"
5. It sets the `_polski_stock_restored` meta to prevent double restoration

## Requirements

- The WooCommerce **Manage stock** option must be enabled
- Products must have stock management enabled

## Hook

| Hook | Type | Description |
|------|-----|------|
| `polski/stock/restored` | action | After stock is restored for a product |
