---
title: Inventory forecasting
description: Documentation for the inventory forecasting module in Polski PRO for WooCommerce - stock depletion prediction, dashboard with status cards and suggested order quantities.
---

The inventory forecasting module analyzes sales velocity from the last 90 days and predicts the stock depletion date for each product. The dashboard lets you quickly identify products that need restocking.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## How it works

1. The plugin fetches sales data from the last 90 days (orders with completed and processing status)
2. It calculates the average daily sales (sales velocity) for each product
3. Based on the current stock level and average sales, it predicts the depletion date
4. Products are classified by restocking urgency
5. Results are cached in a transient for 1 hour

## Dashboard

Go to **WooCommerce > Inventory forecast** to open the forecasting dashboard.

### Summary cards

Three status cards are displayed at the top of the dashboard:

| Card | Condition | Color |
|------|-----------|-------|
| Critical | Depletion within 7 days | Red |
| Warning | Depletion within 30 days | Yellow |
| Healthy | Depletion in 30+ days | Green |

Each card shows the number of products in that category.

### Products table

Below the cards a table is displayed with details for each product:

| Column | Description |
|--------|-------------|
| Product | Product name with a link to the editor |
| Current stock | Current quantity in stock |
| Average daily sales | Average number of units sold per day (over 90 days) |
| Days to depletion | Estimated number of days until zero stock |
| Forecast date | Predicted stock depletion date |
| Suggested order | Recommended quantity to order (30-day coverage) |

The table is sorted by default on the "Days to depletion" column (ascending), so the products that need restocking soonest appear at the top.

### Suggested order quantity

The suggested order quantity is calculated using the formula:

```
suggested_order = average_daily_sales * 30
```

This value represents the quantity covering 30 days of demand.

## Column in the products list

The module adds a **Forecast** column to the products list (**Products > All products**). The column displays the estimated number of days to stock depletion with a colored indicator:

- Red (critical): fewer than 7 days
- Yellow (warning): 7-30 days
- Green (healthy): more than 30 days

Products without stock tracking or with stock management disabled do not display a forecast.

## Data source

Sales data is fetched directly from the database using a SQL query on the tables:

- `{prefix}woocommerce_order_items` - order line items
- `{prefix}woocommerce_order_itemmeta` - line item metadata (quantity, product_id)

Only orders with `wc-completed` and `wc-processing` status from the last 90 days are taken into account.

## Cache

Forecasting results are stored in the WordPress transient cache with a lifetime of 1 hour:

- Transient key: `polski_pro_inventory_forecast`
- Expiration time: 3600 seconds (1 hour)
- The cache is automatically refreshed after expiration

This avoids slow SQL queries on every dashboard load.

## Enabling the module

The module is controlled by a toggle:

```
WooCommerce > Settings > Polski PRO > Modules > inventory_forecast
```

After enabling the module, the **Inventory forecast** item appears automatically in the WooCommerce menu.

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Polski PRO for WooCommerce is commercial software provided without warranty.</div>
