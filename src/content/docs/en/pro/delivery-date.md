---
title: Delivery date selection
description: A module for selecting a preferred delivery date at WooCommerce checkout in Polski PRO.
---

The module adds a calendar field (flatpickr) on the checkout page, allowing customers to select a preferred delivery date.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Configuration

Go to **Polski PRO > Modules** and enable the **Delivery date selection** module.

| Setting | Description | Default |
|------------|------|-----------|
| Field label | Text displayed above the calendar | Preferred delivery date |
| Required field | Whether the customer must select a date | No |
| Min. days | Earliest possible date (days from today) | 1 |
| Max. days | Latest possible date (days from today) | 30 |
| Blocked days of the week | Which days are unavailable (0=Sun, 6=Sat) | 0 (Sundays) |
| Blocked dates | Specific unavailable dates (format: YYYY-MM-DD, comma-separated) | empty |
| Display format | Date format on the order | d.m.Y (l) |

## How it works

1. A field with a calendar icon appears at checkout
2. The customer clicks and selects a date from flatpickr
3. Blocked days (weekends, holidays) are grayed out
4. The date is validated on the server side
5. It is saved in the order meta (`_polski_delivery_date`)

## Where the date is shown

- Admin panel (below the shipping address)
- Order details page (My Account)
- Order emails (HTML and plain text)

## Handling holidays

To block holidays (e.g. Christmas, Easter), add dates in the YYYY-MM-DD format separated by commas:

```
2026-12-25,2026-12-26,2026-04-05,2026-04-06,2026-05-01,2026-05-03
```

## WooCommerce Blocks

The module also supports the block-based WooCommerce checkout. The date is passed through the Store API in `extensions.polski-pro.delivery_date`.
