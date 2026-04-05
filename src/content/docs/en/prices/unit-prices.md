---
title: Unit price
description: Displaying price per kilogram, liter, meter or piece in WooCommerce in accordance with Polish consumer law.
---

Directive 98/6/EC and the Polish Act on Informing about Prices of Goods and Services require online stores to present the unit price of a product - i.e. the price per kilogram, liter, running meter or piece. The Polski for WooCommerce plugin automates this obligation by adding unit price information on the product page, in listings and in the cart.

## When is a unit price required

The obligation to provide unit prices applies to products sold by weight, volume or length. In practice this includes:

- food products (price per kg or liter)
- cosmetics and cleaning products (price per 100 ml or liter)
- construction materials (price per running meter or square meter)
- bulk products (price per kg)

The unit price must be visible everywhere the product price is presented - on the product page, in search results, in price comparisons and in the cart.

## Configuration

Go to **WooCommerce > Settings > Polski > Prices** and enable the unit price module. After activation, a new section will appear in the product editor under the "General" tab.

### Fields in the product editor

| Field | Description | Example |
|-------|-------------|---------|
| Base quantity | Product quantity in the package | `500` |
| Base unit | Product unit of measurement | `g` |
| Reference quantity | Reference quantity for the unit price | `1` |
| Reference unit | Unit for which the price is given | `kg` |

For a product weighing 500 g with a price of 12.99 PLN, the plugin will automatically calculate the unit price as 25.98 PLN/kg.

### Supported units

The plugin supports the following units of measurement:

- **Weight:** g, kg, mg
- **Volume:** ml, l, cl
- **Length:** mm, cm, m
- **Pieces:** pcs (piece)

Conversion between units is automatic. If a product has weight in grams and the reference unit is kilogram, the plugin will calculate the value automatically.

## Product variants

For variable products, the unit price can be set at two levels:

1. **At the parent product level** - value inherited by all variants
2. **At the variant level** - overrides parent product settings

For variants with different weights (e.g. 250 g and 500 g packages), set the unit price separately for each variant. The plugin will automatically update the displayed price when the customer changes the variant (AJAX).

## Shortcode

Use the shortcode `[polski_unit_price]` to display the unit price anywhere.

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product_id` | int | current | Product ID |
| `before` | string | `""` | Text before the price |
| `after` | string | `""` | Text after the price |
| `wrapper` | string | `span` | Wrapping HTML element |

### Usage examples

Basic usage on the product page:

```html
[polski_unit_price]
```

With a custom product ID and text:

```html
[polski_unit_price product_id="123" before="Price per kg: " after=" gross"]
```

In a PHP template:

```php
echo do_shortcode('[polski_unit_price product_id="' . $product->get_id() . '"]');
```

## Hook: polski/price/unit_price_html

This filter allows you to modify the unit price HTML before display.

### Signature

```php
apply_filters('polski/price/unit_price_html', string $html, float $unit_price, WC_Product $product, array $args): string
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `$html` | string | Generated unit price HTML |
| `$unit_price` | float | Calculated unit price |
| `$product` | WC_Product | WooCommerce product object |
| `$args` | array | Array with keys: `base_qty`, `base_unit`, `ref_qty`, `ref_unit` |

### Example: adding a CSS class

```php
add_filter('polski/price/unit_price_html', function (string $html, float $unit_price, WC_Product $product, array $args): string {
    $category_class = '';
    if (has_term('napoje', 'product_cat', $product->get_id())) {
        $category_class = ' polski-unit-price--beverage';
    }

    return sprintf(
        '<span class="polski-unit-price%s">%s/%s</span>',
        esc_attr($category_class),
        wc_price($unit_price),
        esc_html($args['ref_unit'])
    );
}, 10, 4);
```

### Example: hiding unit price for selected categories

```php
add_filter('polski/price/unit_price_html', function (string $html, float $unit_price, WC_Product $product): string {
    if (has_term('uslugi', 'product_cat', $product->get_id())) {
        return '';
    }

    return $html;
}, 10, 3);
```

## CSV import

Unit prices can be imported using the standard WooCommerce importer. Add the following columns to the CSV file:

| CSV column | Description |
|------------|-------------|
| `polski_unit_base_qty` | Base quantity |
| `polski_unit_base_unit` | Base unit |
| `polski_unit_ref_qty` | Reference quantity |
| `polski_unit_ref_unit` | Reference unit |

Example CSV row:

```csv
"Ground coffee 500g",29.99,500,g,1,kg
```

## Common issues

### Unit price does not display

Check that:

1. The unit price module is enabled in settings
2. The product has the base quantity and unit fields filled in
3. The theme supports the `woocommerce_after_shop_loop_item_title` hook (listing) and the `woocommerce_single_product_summary` hook (product page)

### Incorrect conversion

Make sure the base unit and reference unit belong to the same category (e.g. both weight or both volume). The plugin does not convert between categories - you cannot convert grams to liters.

## Related resources

- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
