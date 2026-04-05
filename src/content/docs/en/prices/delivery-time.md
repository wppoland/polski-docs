---
title: Delivery time
description: Delivery time configuration per product and variant, default fallback value and the polski_delivery_time taxonomy in WooCommerce.
---

Polish law requires the store to inform about delivery time before placing an order. Polski for WooCommerce lets you set delivery time globally, per product and per variant.

## Legal requirements

The seller must inform the consumer about the delivery deadline no later than the moment the consumer expresses the will to be bound by the contract (i.e. before clicking the order button). This information should be:

- clear and understandable
- given in business days or calendar days
- visible on the product page

Lack of delivery time information may result in penalties from UOKiK and constitutes a violation of consumer rights.

## The polski_delivery_time taxonomy

The plugin registers a dedicated taxonomy `polski_delivery_time` that allows creating predefined delivery times and assigning them to products.

### Managing delivery terms

Go to **Products > Delivery Time** to manage available terms.

Example terms:

| Name | Slug | Description |
|------|------|-------------|
| 1-2 business days | 1-2-business-days | Products in stock |
| 3-5 business days | 3-5-business-days | Products ordered from supplier |
| 7-14 business days | 7-14-business-days | Made-to-order products |
| Within 24 hours | within-24-hours | Digital products / express |
| Available immediately | available-immediately | Immediate fulfillment |

Delivery terms work like a WordPress taxonomy - you can create, edit and delete them in the admin panel.

## Configuration

### Global settings

Go to **WooCommerce > Settings > Polski > Prices** and configure the "Delivery Time" section.

| Setting | Description |
|---------|-------------|
| Enable delivery time | Activates display on the product page |
| Default delivery time | Fallback value for products without an assigned term |
| Show on listing | Displays delivery time on category pages |
| Show in cart | Displays delivery time in the cart |
| Label | Text before the delivery time (default: "Delivery time:") |

### Default fallback

The default delivery time (fallback) is displayed when a product does not have an individual term assigned. This allows quick deployment without editing each product separately.

Display hierarchy:

1. Variant delivery time (if set)
2. Parent product delivery time (if set)
3. Default delivery time from global settings (fallback)

If none of the above is set, delivery time information will not be displayed.

### Assigning to a product

In the product editor, in the "Shipping" tab, you will find a **Delivery Time** field. Select an existing term from the list or create a new one.

### Assigning to a variant

For variable products, each variant can have its own delivery time. Expand the variant section and set an individual term. Variants without a set term inherit the value from the parent product.

## Shortcode

Use the shortcode `[polski_delivery_time]` to display delivery time anywhere.

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product_id` | int | current | Product ID |
| `label` | string | `"Delivery time: "` | Label before the value |
| `show_label` | bool | `true` | Whether to display the label |
| `wrapper` | string | `span` | Wrapping HTML element |
| `fallback` | string | `""` | Text when no delivery time is set |

### Usage examples

Basic usage:

```html
[polski_delivery_time]
```

Result: `Delivery time: 1-2 business days`

Without label:

```html
[polski_delivery_time show_label="false"]
```

Result: `1-2 business days`

With custom label and fallback:

```html
[polski_delivery_time label="Shipping: " fallback="Ask about availability"]
```

For a specific product:

```html
[polski_delivery_time product_id="456"]
```

In a PHP template:

```php
echo do_shortcode('[polski_delivery_time product_id="' . $product->get_id() . '"]');
```

## Programmatic delivery time management

### Assigning a term to a product

```php
wp_set_object_terms($product_id, '1-2-business-days', 'polski_delivery_time');
```

### Getting a product's term

```php
$terms = wp_get_object_terms($product_id, 'polski_delivery_time');
if (!empty($terms) && !is_wp_error($terms)) {
    $delivery_time = $terms[0]->name;
}
```

### Creating a new term

```php
wp_insert_term(
    '2-3 business days',
    'polski_delivery_time',
    [
        'slug'        => '2-3-business-days',
        'description' => 'Standard fulfillment time',
    ]
);
```

## CSV import

To import delivery time via CSV, use the column:

| CSV column | Description | Value |
|------------|-------------|-------|
| `polski_delivery_time` | Delivery term name | `1-2 business days` |

If a term with the given name does not exist, it will be automatically created during import.

Example:

```csv
"Dell XPS 15 Laptop",5499.00,"3-5 business days"
"Logitech MX Mouse",299.00,"1-2 business days"
```

## Dynamic delivery time

For products with long fulfillment times, you can programmatically modify the displayed delivery time based on stock levels or order date.

```php
add_filter('polski/delivery_time/display', function (string $delivery_time, WC_Product $product): string {
    if ($product->get_stock_quantity() > 0) {
        return '1-2 business days';
    }

    return '7-14 business days';
}, 10, 2);
```

## CSS styling

```css
.polski-delivery-time {
    display: inline-block;
    margin-top: 0.5em;
    font-size: 0.9em;
    color: #2e7d32;
}

.polski-delivery-time__label {
    font-weight: 600;
}

.polski-delivery-time__value {
    color: #333;
}
```

## Common issues

### Delivery time does not display

1. Check that the module is enabled in settings
2. Make sure the product has an assigned term or a default fallback is set
3. Verify that the theme supports the `woocommerce_single_product_summary` hook

### Variant delivery time does not change after selection

Make sure the plugin JavaScript is loaded. Check the browser console for JS errors. The plugin updates variant delivery time via AJAX when options change.

## Related resources

- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
