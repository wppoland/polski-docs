---
title: '"From" price for products with variations'
description: A module that displays a "from XX PLN" price instead of a price range for WooCommerce products with variations.
---

The "From price" module replaces the default WooCommerce price range (e.g. "19.99 - 49.99 PLN") with a more readable format, **"from 19.99 PLN"**, for products with variations.

## Why it matters

The default WooCommerce price display for products with variations shows the full range: "19.99 PLN - 49.99 PLN". This can be confusing for customers and takes up a lot of space in product listings.

The "from 19.99 PLN" format:
- Is more readable on mobile devices
- Clearly communicates the lowest price
- Is a standard in most online stores
- Works both on archive pages and on the product page

## Configuration

Go to **WooCommerce > Settings > Polski > Prices**.

| Setting | Description | Default |
|------------|------|-----------|
| Enable "from" price | Show "from {price}" instead of a price range | Yes |
| "From" price text | Text template with the `{price}` token | `from {price}` |

### Template examples

| Template | Result |
|---------|-------|
| `from {price}` | from 19.99 PLN |
| `Price from {price}` | Price from 19.99 PLN |
| `ab {price}` | ab 19.99 PLN (for DE) |
| `from {price}` | from 19.99 PLN (for EN) |

## How it works

1. The module filters the `woocommerce_get_price_html` hook
2. It checks whether the product is a `WC_Product_Variable`
3. It fetches the variation prices and checks whether a range exists (min != max)
4. If so, it replaces the price range with the "from {lowest_price}" format
5. If all variations have the same price, it displays the normal price

## Filter

```php
// Customize the "from" price HTML
add_filter('polski/price/from_price_html', function (string $html, WC_Product $product): string {
    // Add a CSS class or change the format
    return '<span class="my-from-price">' . $html . '</span>';
}, 10, 2);
```

## Disabling for selected products

If you want to disable "from" for specific products, use the filter:

```php
add_filter('polski/price/from_price_html', function (string $html, WC_Product $product): string {
    if ($product->get_id() === 123) {
        return $product->get_price_html(); // Original range
    }
    return $html;
}, 10, 2);
```
