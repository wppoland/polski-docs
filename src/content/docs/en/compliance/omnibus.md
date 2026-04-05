---
title: Omnibus Directive - price tracking
description: Omnibus Directive implementation in Polski for WooCommerce - automatic lowest price tracking over 30 days, display configuration and shortcode.
---

The Omnibus Directive (EU 2019/2161), implemented in Poland from January 1, 2023, obliges sellers to inform consumers about the lowest price of a product from the last 30 days before a discount. Polski for WooCommerce automatically tracks price history and displays the required information with every promotion.

## How price tracking works

The plugin records every price change of a WooCommerce product (including variable products) and stores the history in the database. When a product is marked as "on sale", the system automatically calculates the lowest price from the last 30 days and displays it to customers.

Tracking starts from the moment the module is activated. If a product does not have price history yet, the plugin displays an appropriate placeholder message.

## Configuration

Go to **WooCommerce > Settings > Polski > Omnibus** and configure the available options.

### Tracking period

| Option | Description | Default value |
|--------|-------------|---------------|
| `days` | Number of days back for calculating the lowest price | `30` |
| `prune_after_days` | After how many days to delete old history entries | `90` |

The `prune_after_days` setting allows you to control the size of the price history table in the database. A value of `90` means that data older than 90 days is automatically deleted by WP-Cron.

### Taxes

| Option | Description | Default value |
|--------|-------------|---------------|
| `include_tax` | Whether the displayed Omnibus price should include VAT | `true` |

This option should match the price display settings in WooCommerce. If prices in the store are displayed gross, set to `true`.

### Display locations

| Option | Description | Default value |
|--------|-------------|---------------|
| `display_on_sale_only` | Display only for products on sale | `true` |
| `show_on_single` | Single product page | `true` |
| `show_on_loop` | Product list (category, shop) | `false` |
| `show_on_related` | Related products | `false` |
| `show_on_cart` | Cart | `false` |

Recommendation: enable display at least on the product page (`show_on_single`). Displaying on the product list (`show_on_loop`) may take up a lot of space, but is required by some interpretations of the regulations.

### Regular price

| Option | Description | Default value |
|--------|-------------|---------------|
| `show_regular_price` | Also display the regular price alongside the Omnibus price | `false` |

### Text template

| Option | Description | Default value |
|--------|-------------|---------------|
| `display_text` | Template for the displayed message | `Lowest price from {days} days before the discount: {price}` |
| `no_history_text` | Text when there is no price history | `No previous price data available` |

Available variables in the `display_text` template:

- `{price}` - lowest price from the given period
- `{days}` - number of days (default 30)
- `{date}` - date of the lowest price
- `{regular_price}` - regular product price (before promotion)

#### Template examples

```
Lowest price from {days} days before the discount: {price}
```

```
Lowest price from the last {days} days: {price} (regular price: {regular_price})
```

```
Omnibus: {price} (from {date})
```

### Price calculation method

| Option | Description | Default value |
|--------|-------------|---------------|
| `price_count_from` | When to start counting 30 days | `sale_start` |

Available values:

- `sale_start` - from the sale start date (recommended by UOKiK)
- `current_date` - from the current date

### Variable products

| Option | Description | Default value |
|--------|-------------|---------------|
| `variable_tracking` | Variant tracking method | `per_variation` |

Available values:

- `per_variation` - separate tracking for each variant (recommended)
- `parent_only` - tracking only the parent product price

The `per_variation` setting provides more accurate data, since each variant can have a different price and discount history.

## Shortcode

Use the shortcode `[polski_omnibus_price]` to display the lowest price information anywhere on the site.

### Basic usage

```
[polski_omnibus_price]
```

Displays the Omnibus price for the current product.

### With parameters

```
[polski_omnibus_price product_id="456" days="30"]
```

### Shortcode parameters

| Parameter | Description | Default value |
|-----------|-------------|---------------|
| `product_id` | Product ID | Current product |
| `days` | Number of days | Value from settings |

### Example usage in a PHP template

```php
echo do_shortcode('[polski_omnibus_price product_id="' . $product_id . '"]');
```

## Automatic history cleanup

The plugin registers a WP-Cron task that daily removes price history entries older than the `prune_after_days` value. This prevents the database table from growing without limits.

To manually force cleanup, you can use WP-CLI:

```bash
wp cron event run polski_omnibus_prune
```

## Compliance with UOKiK guidelines

The Office of Competition and Consumer Protection (UOKiK) indicates that:

1. The lowest price information must be displayed **with every discount announcement**
2. The reference period is **30 days before applying the discount**
3. For products sold for less than 30 days - provide the lowest price since the date of introduction to sale
4. For perishable products - the period may be shortened

The plugin follows these guidelines by default. The `price_count_from` option set to `sale_start` ensures counting from the sale start date, as recommended by UOKiK.

## Troubleshooting

**Omnibus price does not display**
Check that the product is marked as "on sale" in WooCommerce (a sale price must be set). If the `display_on_sale_only` option is enabled, the message will only appear during an active promotion.

**A no-history message displays**
Price tracking starts from module activation. Wait for the first price change or manually save the product to initialize a history entry.

**Omnibus price is the same as the sale price**
This is correct behavior if the product has not had a lower price in the last 30 days.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Discussions and questions: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
