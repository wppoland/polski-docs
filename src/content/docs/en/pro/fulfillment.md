---
title: Order fulfillment and tracking
description: Order fulfillment status module in Polski PRO - Packed/Shipped/Delivered statuses, tracking number field and automatic email notifications.
---

The order fulfillment module extends the default WooCommerce statuses with three additional stages: **Packed**, **Shipped** and **Delivered**. Each status change sends an automatic email to the customer with tracking information.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## New order statuses

Once the module is enabled, orders can move through the following statuses:

```
Pending > Processing > Packed > Shipped > Delivered > Completed
```

| Status | Color | Description |
|--------|-------|-------------|
| Packed | Blue | Order has been packed and is waiting for courier pickup |
| Shipped | Yellow | Parcel handed to the courier, in transit |
| Delivered | Green | Parcel delivered to the customer |

The statuses appear in the orders panel between "Processing" and "Completed".

## Configuration

1. Go to **Polski PRO > Modules**
2. Enable the **Order fulfillment** module

The module requires no additional configuration, the statuses, tracking field and emails are ready to use right away.

## Shipment tracking field

In the order editor, below the shipping address, a **Shipment Tracking** section appears:

| Field | Description |
|-------|-------------|
| Carrier | Choice of: InPost, DPD, DHL, Poczta Polska, Other |
| Tracking number | Waybill number |
| Tracking URL | Generated automatically based on the carrier and number |

After selecting a carrier and entering a tracking number, the tracking link is generated automatically. You can also enter your own URL manually.

### Automatic tracking links

| Carrier | URL format |
|---------|-----------|
| InPost | `inpost.pl/sledzenie-przesylek?number={number}` |
| DPD | `tracktrace.dpd.com.pl/findPackage?q={number}` |
| DHL | `dhl.com/pl-pl/home/sledzenie-przesylek.html?tracking-id={number}` |
| Poczta Polska | `emonitoring.poczta-polska.pl/?numer={number}` |

## Email notifications

On each status change the system sends an email to the customer with:

- Order number
- New status
- Carrier name (if set)
- Tracking number (if set)
- Shipment tracking link
- Link to the order view in My Account

Emails are sent automatically, no manual action is required.

## Bulk actions

The orders list provides bulk actions:

- **Change status to Packed**
- **Change status to Shipped**
- **Change status to Delivered**

Select multiple orders and choose an action from the dropdown menu.

## Compatibility

The module works with:

- WooCommerce HPOS (Custom Order Tables)
- WooCommerce classic orders (posts)
- All WooCommerce themes
- Polski PRO courier integrations (InPost, DPD, DHL)

The statuses are also visible in the WooCommerce REST API and in reports.
