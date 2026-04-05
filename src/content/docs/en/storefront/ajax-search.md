---
title: AJAX search
description: AJAX search module in Polski for WooCommerce - search by SKU, manufacturer, GTIN, REST endpoint, Gutenberg block, Elementor widget and shortcode.
---

The AJAX search replaces the default WooCommerce search with an intelligent search bar with real-time suggestions. Results appear instantly while typing - without page reload.

## Enabling the module

Go to **WooCommerce > Polski > Storefront Modules** and activate the **AJAX Search** option. The module will automatically replace the default WooCommerce search widget.

## Searched fields

The search bar searches multiple product fields simultaneously:

### SKU (catalog number)

The customer can enter a product SKU or its fragment. SKU search is particularly useful in B2B stores where customers order products by catalog numbers.

### Manufacturer

If the **Manufacturer** module is active, the search includes the manufacturer name in results. Typing e.g. "Samsung" will show all products from that manufacturer.

### GTIN (EAN/UPC)

Searching by GTIN/EAN/UPC barcodes. The customer can enter a full barcode or its fragment to find a product.

### Additional fields

- Product name
- Short description
- Categories
- Tags
- Attributes (color, size, etc.)

Searched fields configuration: **WooCommerce > Polski > Storefront Modules > AJAX Search > Search Fields**.

## Search results

The results dropdown displays:

- Product thumbnail
- Product name (with matching fragment highlighting)
- Price
- Category
- Rating (stars)
- Availability status

By default, up to **8 suggestions** are displayed. The limit can be changed:

```php
add_filter('polski/ajax_search/results_limit', function (): int {
    return 12;
});
```

The minimum number of characters to start searching is **3**. To change:

```php
add_filter('polski/ajax_search/min_chars', function (): int {
    return 2;
});
```

## REST API endpoint

The search uses its own REST API endpoint instead of `admin-ajax.php`, which provides better performance.

**Endpoint:** `GET /wp-json/polski/v1/search`

**Parameters:**

| Parameter | Type   | Required | Description                   |
| --------- | ------ | -------- | ----------------------------- |
| `q`       | string | Yes      | Search phrase                 |
| `limit`   | int    | No       | Results limit (default 8)     |
| `cat`     | int    | No       | Category ID for filtering     |

**Example request:**

```bash
curl "https://yourstore.com/wp-json/polski/v1/search?q=t-shirt&limit=5"
```

**Example response:**

```json
{
  "results": [
    {
      "id": 123,
      "title": "Cotton T-shirt",
      "url": "https://yourstore.com/product/cotton-t-shirt/",
      "image": "https://yourstore.com/wp-content/uploads/tshirt.jpg",
      "price_html": "<span class=\"amount\">49.00&nbsp;PLN</span>",
      "category": "Clothing",
      "in_stock": true,
      "rating": 4.5
    }
  ],
  "total": 1,
  "query": "t-shirt"
}
```

## Gutenberg block

The module provides a **Polski - AJAX Search** block in the Gutenberg editor. The block can be placed in any post, page or widget.

Block options:

- **Placeholder** - placeholder text in the search field
- **Width** - field width (auto, full, custom in px)
- **Icon** - show/hide magnifying glass icon
- **Category filter** - show category filtering dropdown next to the search field
- **Style** - rounded corners, border, shadow

To insert the block: in the Gutenberg editor click **+** and search for **Polski** or **AJAX Search**.

## Elementor widget

For Elementor users, a dedicated **Polski AJAX Search** widget is available. The widget is in the **Polski for WooCommerce** category in the Elementor sidebar.

Widget options include all Gutenberg block settings plus:

- Typography controls (font family, size, weight)
- Colors (background, text, border, hover)
- Margins and paddings
- Results appearance animation
- Responsiveness (settings per breakpoint)

## Shortcode `[polski_ajax_search]`

### Parameters

| Parameter      | Type   | Default             | Description                    |
| ------------- | ------ | ------------------- | ------------------------------ |
| `placeholder` | string | `Search products...`| Placeholder text               |
| `width`       | string | `100%`              | Field width                    |
| `show_icon`   | string | `yes`               | Display magnifying glass icon  |
| `show_cat`    | string | `no`                | Display category filter        |
| `limit`       | int    | `8`                 | Maximum number of suggestions  |

### Usage example

```html
[polski_ajax_search placeholder="What are you looking for?" show_cat="yes" limit="10"]
```

### Inserting in the theme header

```php
// In the theme's functions.php
add_action('wp_body_open', function (): void {
    echo do_shortcode('[polski_ajax_search placeholder="Search..." width="400px"]');
});
```

## Debouncing and performance

The search uses 300 ms debouncing - the request to the server is sent only 300 ms after the last key press. This prevents excessive queries during fast typing.

Results are cached client-side in the browser session. Re-entering the same phrase does not generate a server request.

On the server side, results are cached in the WordPress transient API (default 1 hour). Cache is automatically cleared when a product is saved, added or deleted.

```php
// Change cache time
add_filter('polski/ajax_search/cache_ttl', function (): int {
    return 1800; // 30 minutes in seconds
});
```

## CSS styling

Module CSS classes:

- `.polski-ajax-search` - search container
- `.polski-ajax-search__input` - text field
- `.polski-ajax-search__results` - results dropdown
- `.polski-ajax-search__item` - single result
- `.polski-ajax-search__item--active` - highlighted result (keyboard navigation)
- `.polski-ajax-search__highlight` - matching fragment highlight
- `.polski-ajax-search__loading` - loading spinner

## Accessibility

The search supports full keyboard navigation:

- **Down/Up arrow** - navigating results
- **Enter** - going to the selected product
- **Escape** - closing the dropdown
- ARIA attributes: `role="combobox"`, `aria-expanded`, `aria-activedescendant`

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
