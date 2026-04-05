---
title: AJAX filters
description: AJAX filters module in Polski for WooCommerce - filtering by categories, brands, price, stock status, sale, attributes, GET fallback, Gutenberg block and shortcode.
---

AJAX filters let customers narrow the product list without page reload. Products update live after selecting filters.

## Enabling the module

Go to **WooCommerce > Polski > Storefront Modules** and activate the **AJAX Filters** option. The module will provide filters as a Gutenberg block, shortcode and widget.

## Available filter types

### Categories

Hierarchical filter with an expandable category tree. Product count is displayed next to each category. Empty categories are hidden by default.

Options:
- Display as tree or flat list
- Multiple selection (checkboxes) or single (radio)
- Collapsing/expanding subcategories

### Brands (manufacturers)

Filter by manufacturer/brand. Requires the active **Manufacturer** module in Polski for WooCommerce. Displays a brand list with product counts.

### Price

Price range slider with min/max fields. The range automatically adjusts to currently displayed products.

Options:
- Slider
- Text fields min/max
- Price ranges (e.g. 0-50 PLN, 50-100 PLN, 100+ PLN)

Price range configuration:

```php
add_filter('polski/ajax_filters/price_ranges', function (): array {
    return [
        ['min' => 0, 'max' => 50, 'label' => 'Up to 50 PLN'],
        ['min' => 50, 'max' => 100, 'label' => '50 - 100 PLN'],
        ['min' => 100, 'max' => 200, 'label' => '100 - 200 PLN'],
        ['min' => 200, 'max' => 0, 'label' => 'Above 200 PLN'],
    ];
});
```

### Stock status

Filter allowing display of only products available in stock. Options:

- **In stock** - products with `stock_status = instock`
- **On backorder** - products with `stock_status = onbackorder`
- **Out of stock** - products with `stock_status = outofstock` (hidden by default)

### Sale

**Only products on sale** checkbox - filters only products with an active sale price.

### Product attributes

Dynamic filters generated automatically based on WooCommerce attributes (color, size, material, etc.). Each global attribute can be used as a filter.

Attribute display types:
- **Checkbox list** - default
- **Color swatches** - for attributes with set colors
- **Buttons** - compact selection (e.g. sizes S, M, L, XL)
- **Dropdown** - dropdown list

## AJAX behavior

After changing any filter:

1. An AJAX request is sent with the selected parameters
2. A subtle spinner/skeleton is displayed on the product list
3. The product list updates without page reload
4. Product counts in filters update
5. Unavailable filter options are grayed out (but not hidden)
6. The URL in the browser updates with GET parameters (History API)

## GET fallback (without JavaScript)

The module supports a fallback mode without JavaScript. When JS is disabled or unavailable:

- Filters work as a standard HTML form with GET parameters
- After submission, the page reloads with the filtered product list
- Filter parameters are saved in the URL, e.g.: `?pa_color=red&min_price=50&max_price=200`
- Filtered URLs are SEO-friendly and can be indexed by search engines

The fallback mode works automatically - no additional configuration is required.

## Gutenberg block

The **Polski - AJAX Filters** block is available in the Gutenberg editor. Place it in the sidebar of the shop page.

Block options:

- **Filter types** - choose which filters to display
- **Filter order** - drag & drop sorting
- **Style** - compact, expanded, accordion
- **Reset button** - show/hide "Clear filters" button
- **Counters** - show/hide product count for each option
- **Collapsing** - sections collapsed/expanded by default

## Shortcode `[polski_ajax_filters]`

### Parameters

| Parameter     | Type   | Default    | Description                                   |
| ------------ | ------ | ---------- | --------------------------------------------- |
| `filters`    | string | `all`      | Filter types (comma-separated)                |
| `style`      | string | `expanded` | Style: `expanded`, `compact`, `accordion`     |
| `show_count` | string | `yes`      | Show product counters                         |
| `show_reset` | string | `yes`      | Show reset button                             |
| `columns`    | int    | `1`        | Number of filter columns                      |
| `ajax`       | string | `yes`      | AJAX mode (no = GET only)                     |

### Usage example

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion" show_count="yes"]
```

### Filtering by attributes only

```html
[polski_ajax_filters filters="pa_color,pa_size,pa_material" style="compact"]
```

### Placing in the theme sidebar

In the `sidebar.php` file or in widgets:

```php
echo do_shortcode('[polski_ajax_filters filters="category,price,stock,sale"]');
```

## Pagination integration

AJAX filters work with WooCommerce pagination. After changing a filter, the user returns to page 1 of results. Pagination also works in AJAX mode - navigating between pages does not reset selected filters.

## Active filters

Active filters are displayed above the product list as tags (chips). Each tag has an X button to remove a single filter. The **Clear all** button resets all filters simultaneously.

```php
// Change active filters bar position
add_filter('polski/ajax_filters/active_position', function (): string {
    return 'above_products'; // or 'below_filters', 'both'
});
```

## Performance

Filter queries use WooCommerce database indexes (`product_meta_lookup`). For stores with a large number of products (10,000+), using object cache (Redis/Memcached) is recommended.

Filtering results are cached in the transient API with a key based on the filter parameter hash. Cache is cleared when a product's price, stock status or attributes change.

## CSS styling

- `.polski-ajax-filters` - filters container
- `.polski-ajax-filters__section` - single filter section
- `.polski-ajax-filters__title` - section header
- `.polski-ajax-filters__option` - filter option (checkbox/radio)
- `.polski-ajax-filters__count` - product counter
- `.polski-ajax-filters__reset` - reset button
- `.polski-ajax-filters__active` - active filters bar

## Troubleshooting

**Filters do not update the product list** - make sure the product list CSS selector is correct. By default, the module looks for `.products` or `ul.products`. Custom themes may use a different selector.

**Counters show 0** - check that products have assigned attributes, categories and stock status. An empty attribute will not be counted.

**Price slider does not work** - check if there is a jQuery UI conflict with another plugin on the page.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
