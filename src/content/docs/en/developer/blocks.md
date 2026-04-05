---
title: Gutenberg blocks
description: Gutenberg blocks in Polski for WooCommerce - AJAX search, AJAX filters and product slider with editor preview.
---

Polski for WooCommerce provides three Gutenberg blocks for inserting storefront modules in the block editor. Each block offers an editor preview (server-side render) and full configuration in the sidebar panel.

## Requirements

- WordPress 6.0 or newer
- Gutenberg block editor (not the classic editor)
- The corresponding module active in Polski for WooCommerce settings

## Inserting blocks

Polski for WooCommerce blocks can be found in the block inserter (the **+** button) in the **Polski for WooCommerce** category. You can also search for them by name by typing "Polski" or the module name.

## Block: AJAX search

**Block name:** `polski/ajax-search`

Inserts a search field with AJAX suggestions. Results appear in a dropdown while typing a phrase.

### Block attributes

| Attribute        | Type   | Default             | Description                   |
| -------------- | ------ | ------------------- | ----------------------------- |
| `placeholder`  | string | `Search products...` | Placeholder text in the field |
| `width`        | string | `100%`              | Field width                   |
| `showIcon`     | bool   | `true`              | Magnifying glass icon         |
| `showCategory` | bool   | `false`             | Category filtering dropdown   |
| `limit`        | number | `8`                 | Suggestion limit              |
| `minChars`     | number | `3`                 | Min. characters to search     |
| `style`        | string | `default`           | Style: default, rounded, flat |

### Sidebar panel (Inspector Controls)

The block sidebar contains sections:

**Search settings:**
- Placeholder text
- Minimum number of characters
- Results limit
- Category filter (yes/no)

**Appearance:**
- Field width
- Style (default, rounded, flat)
- Magnifying glass icon (yes/no)
- Border (yes/no)
- Shadow (yes/no)

**Advanced:**
- Additional CSS classes
- HTML anchor

### Block registration example (internal implementation)

```php
register_block_type('polski/ajax-search', [
    'api_version'     => 3,
    'editor_script'   => 'polski-blocks-editor',
    'editor_style'    => 'polski-blocks-editor-style',
    'style'           => 'polski-blocks-style',
    'render_callback' => [AjaxSearchBlock::class, 'render'],
    'attributes'      => [
        'placeholder' => [
            'type'    => 'string',
            'default' => __('Search products...', 'polski'),
        ],
        'width' => [
            'type'    => 'string',
            'default' => '100%',
        ],
        'showIcon' => [
            'type'    => 'boolean',
            'default' => true,
        ],
        'showCategory' => [
            'type'    => 'boolean',
            'default' => false,
        ],
        'limit' => [
            'type'    => 'number',
            'default' => 8,
        ],
    ],
]);
```

### Render filter

```php
add_filter('polski/blocks/ajax_search/output', function (string $html, array $attributes): string {
    // Modify block HTML
    return $html;
}, 10, 2);
```

## Block: AJAX filters

**Block name:** `polski/ajax-filters`

Inserts a set of AJAX filters for filtering the product list without page reload.

### Block attributes

| Attribute      | Type   | Default    | Description                   |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | array  | `['category', 'price', 'stock']` | Active filters |
| `style`      | string | `expanded` | Style: expanded, compact, accordion |
| `showCount`  | bool   | `true`     | Product counters              |
| `showReset`  | bool   | `true`     | Reset button                  |
| `columns`    | number | `1`        | Filter columns                |
| `collapsible`| bool   | `true`     | Collapsible sections          |

### Sidebar panel

**Filter selection:**
- Checkboxes for each filter type
- Drag & drop order sorting
- Per-filter configuration (e.g. price ranges)

**Appearance:**
- Display style (expanded, compact, accordion)
- Number of columns
- Counters (yes/no)
- Reset button (yes/no)
- Collapsed/expanded by default

**Advanced:**
- AJAX / GET fallback mode
- Additional CSS classes

### Available filters

The block automatically detects available filters based on product data:

| Filter       | Type          | Description                   |
| ----------- | ------------ | ----------------------------- |
| `category`  | Hierarchy    | Product categories            |
| `price`     | Range slider | Price range                   |
| `stock`     | Checkbox     | Stock status                  |
| `sale`      | Checkbox     | On sale only                  |
| `brand`     | List         | Manufacturer/brand            |
| `pa_*`      | List/Swatch  | Product attributes            |
| `rating`    | Stars        | Customer rating               |

### Render filter

```php
add_filter('polski/blocks/ajax_filters/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);
```

### Placement in sidebar

The AJAX filters block works best in the shop page sidebar. In a block theme (FSE), add it to the **Archive: Product** template in the side column.

In classic themes, use the block in the **Shop Sidebar** widget area.

## Block: product slider

**Block name:** `polski/product-slider`

Inserts a product carousel with arrow navigation and optional pagination dots.

### Block attributes

| Attribute         | Type   | Default   | Description                   |
| --------------- | ------ | --------- | ----------------------------- |
| `type`          | string | `latest`  | Type: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | number | `8`       | Product limit                 |
| `columns`       | number | `4`       | Desktop columns               |
| `columnsTablet` | number | `2`       | Tablet columns                |
| `columnsMobile` | number | `1`       | Mobile columns                |
| `category`      | string | ``        | Category slug                 |
| `productIds`    | array  | `[]`      | Product IDs                   |
| `showArrows`    | bool   | `true`    | Navigation arrows             |
| `showDots`      | bool   | `false`   | Pagination dots               |
| `autoplay`      | bool   | `false`   | Automatic scrolling           |
| `autoplaySpeed` | number | `5000`    | Pause between slides (ms)     |
| `gap`           | string | `16px`    | Card spacing                  |
| `title`         | string | ``        | Title                         |
| `orderby`       | string | `date`    | Sort by                       |
| `order`         | string | `DESC`    | Direction                     |

### Sidebar panel

**Product source:**
- Slider type (dropdown with options)
- Category selection (for type=category)
- Product selection (for type=ids) - search with auto-complete
- Product limit
- Sorting

**Display:**
- Columns (desktop / tablet / mobile)
- Gap
- Arrows (yes/no)
- Dots (yes/no)
- Title

**Animation:**
- Autoplay (yes/no)
- Autoplay speed (slider 1000-10000 ms)
- Pause on hover

### Editor preview

The block renders a slider preview directly in the Gutenberg editor (server-side render). The preview shows real products from the database, allowing you to evaluate the appearance before publishing.

If the store has no products matching the selected type (e.g. no sale products), the block displays a placeholder with a message.

### Render filter

```php
add_filter('polski/blocks/product_slider/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);

// Modify the product query
add_filter('polski/blocks/product_slider/query_args', function (array $args, array $attributes): array {
    // Exclude products from the "hidden" category
    $args['tax_query'][] = [
        'taxonomy' => 'product_cat',
        'field'    => 'slug',
        'terms'    => 'hidden',
        'operator' => 'NOT IN',
    ];
    return $args;
}, 10, 2);
```

## Compatibility with block themes (FSE)

Polski for WooCommerce blocks work fully with block themes (Full Site Editing). They can be inserted in:

- Page templates
- Product archive templates
- Template parts - header, footer, sidebar
- Patterns

## Block styling

Each block generates CSS classes following the BEM convention. Additionally, blocks support native Gutenberg style settings:

- Colors (text, background)
- Typography (size, weight, font family)
- Margins and paddings (spacing)
- Border

## Troubleshooting

**Blocks do not appear in the inserter** - make sure the corresponding module is active in **WooCommerce > Polski > Storefront Modules**. Blocks require activation of the corresponding module.

**Block preview is empty** - check that the store has products matching the selected type. An empty product database will not generate a preview.

**Blocks do not work in Elementor** - these blocks are designed for the Gutenberg editor. For Elementor, use shortcodes or dedicated Elementor widgets (available for AJAX search).

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
