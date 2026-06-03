---
title: Order export
description: Order export module in Polski for WooCommerce - CSV export with over 30 configurable fields, date and status filters.
---

The order export module lets you generate CSV files with WooCommerce order data. It supports over 30 configurable fields, date range filters and order status filters. The field selection configuration is saved in WordPress options.

## Enabling the module

Go to **WooCommerce > Polski > Tools** and enable **Order export** (module ID: `order_export`).

## Export panel

The export panel is available in **WooCommerce > Polski > Tools > Order export** (`admin.php?page=polski-order-export`).

### Filters

#### Date range

Select the period from which you want to export orders:

- **Date from** - start of the range (date picker field)
- **Date to** - end of the range (date picker field)
- Predefined ranges: **Today**, **Last 7 days**, **Last 30 days**, **Current month**, **Previous month**, **Current year**

The dates refer to the order creation date (`date_created`).

#### Order status

Select the order statuses to export (multiple selection):

- Pending payment (`pending`)
- Processing (`processing`)
- On hold (`on-hold`)
- Completed (`completed`)
- Cancelled (`cancelled`)
- Refunded (`refunded`)
- Failed (`failed`)

By default, **Processing** and **Completed** are selected.

### Field selection

Select the fields to include in the CSV file. The field configuration is saved in WordPress options and remembered between exports.

#### Order fields

| Field                    | CSV column               | Description                    |
| ------------------------ | ------------------------ | ------------------------------ |
| Order ID                 | `order_id`               | Order number                   |
| Order date               | `order_date`             | Creation date and time         |
| Status                   | `order_status`           | Order status                   |
| Currency                 | `currency`               | Currency code (e.g. PLN)       |
| Payment method           | `payment_method`         | Payment method name            |
| Payment method title     | `payment_method_title`   | Displayed payment name         |
| Order total              | `order_total`            | Total amount                   |
| Products subtotal        | `order_subtotal`         | Products amount (excl. shipping) |
| Tax amount               | `order_tax`              | Total tax amount               |
| Shipping cost            | `shipping_total`         | Shipping cost                  |
| Shipping method          | `shipping_method`        | Shipping method name           |
| Discount                 | `discount_total`         | Total discount amount          |
| Coupon code              | `coupon_codes`           | Coupon codes used              |
| Customer note            | `customer_note`          | Customer notes on the order    |
| Customer IP              | `customer_ip`            | Customer IP address            |

#### Address fields - billing

| Field                    | CSV column               |
| ------------------------ | ------------------------ |
| First name (billing)     | `billing_first_name`     |
| Last name (billing)      | `billing_last_name`      |
| Company                  | `billing_company`        |
| NIP                      | `billing_nip`            |
| Address line 1           | `billing_address_1`      |
| Address line 2           | `billing_address_2`      |
| City                     | `billing_city`           |
| Postcode                 | `billing_postcode`       |
| State                    | `billing_state`          |
| Country                  | `billing_country`        |
| Email                    | `billing_email`          |
| Phone                    | `billing_phone`          |

#### Address fields - shipping

| Field                    | CSV column               |
| ------------------------ | ------------------------ |
| First name (shipping)    | `shipping_first_name`    |
| Last name (shipping)     | `shipping_last_name`     |
| Company (shipping)       | `shipping_company`       |
| Address line 1           | `shipping_address_1`     |
| Address line 2           | `shipping_address_2`     |
| City                     | `shipping_city`          |
| Postcode                 | `shipping_postcode`      |
| State                    | `shipping_state`         |
| Country                  | `shipping_country`       |

#### Product fields

| Field                    | CSV column               | Description                    |
| ------------------------ | ------------------------ | ------------------------------ |
| Product name             | `product_name`           | Product name in the order      |
| SKU                      | `product_sku`            | Product SKU code               |
| Quantity                 | `product_qty`            | Quantity ordered               |
| Unit price               | `product_price`          | Price per item                 |
| Line total               | `line_total`             | Total amount for the line item |

When an order contains multiple products, each product is exported as a separate row with the order data repeated.

## CSV file format

- **Encoding**: UTF-8 with BOM (for correct display of Polish characters in Excel)
- **Separator**: semicolon (`;`) - the standard for Polish Excel
- **Text qualifier**: double quote (`"`)
- **Line endings**: `\r\n` (Windows)

## Export

After configuring the filters and fields, click **Export to CSV**. The file will be downloaded by the browser.

For large data sets (over 10,000 orders), the export runs in the background with a progress bar. Once finished, the file is available for download for 24 hours.

## WP-CLI

Export orders from the command line:

```bash
wp polski export orders --date-from=2025-01-01 --date-to=2025-12-31 --status=completed --output=/tmp/orders.csv
```

Parameters:

- `--date-from` - start date (YYYY-MM-DD)
- `--date-to` - end date (YYYY-MM-DD)
- `--status` - order status (comma separated)
- `--fields` - list of fields (comma separated)
- `--output` - output file path

## Hooks

```php
// Add a custom field to the export
add_filter('polski/order_export/fields', function (array $fields): array {
    $fields['custom_field'] = [
        'label'    => 'Custom field',
        'callback' => function (\WC_Order $order): string {
            return $order->get_meta('_custom_field');
        },
    ];
    return $fields;
});

// Modify the orders query
add_filter('polski/order_export/query_args', function (array $args): array {
    $args['meta_key']   = '_billing_nip';
    $args['meta_compare'] = 'EXISTS';
    return $args;
});
```

## Troubleshooting

**Polish characters display incorrectly in Excel** - make sure the BOM option is enabled (it is by default). In older versions of Excel, use the data import with the UTF-8 encoding setting.

**The export takes too long** - with a very large number of orders, use WP-CLI instead of the web interface. Consider narrowing the date range.

**The NIP field is missing from the export** - the `billing_nip` field is available only when the NIP at checkout module is active.

Reporting issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
