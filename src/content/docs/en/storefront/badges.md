---
title: Product badges
description: Badges module in Polski for WooCommerce - automatic badges (sale, new, low stock, bestseller) and manual labels per product.
---

Badges are colored labels on product images. They help customers quickly spot sales, new arrivals, bestsellers and low-stock products.

## Enabling the module

Go to **WooCommerce > Polski > Storefront Modules** and activate the **Product Badges** option. The module will replace the default WooCommerce "Sale!" badge with custom, configurable badges.

## Automatic badges

Automatic badges are generated based on product data. They do not require manual configuration - after enabling they work immediately on all products.

### Sale

Displayed when the product has a sale price set. By default shows the discount percentage (e.g. **-25%**) instead of the standard "Sale!" text.

Format configuration:

| Option          | Description                      | Example       |
| -------------- | -------------------------------- | ------------- |
| Percentage     | Discount percentage              | -25%          |
| Amount         | Savings amount                   | -50 PLN       |
| Text           | Custom text                      | Promotion     |
| Percentage + amount | Both values                 | -25% (-50 PLN)|

```php
// Change sale badge format
add_filter('polski/badges/sale_format', function (): string {
    return 'percentage'; // 'percentage', 'amount', 'text', 'both'
});
```

For variable products, the percentage is calculated based on the variant with the largest discount.

### New

Displayed on products added within the last X days. Default **14 days**.

```php
// Change the new period
add_filter('polski/badges/new_days', function (): int {
    return 30; // products added within the last 30 days
});
```

### Low stock

Displayed when the product stock quantity drops below the set threshold. The default threshold is the value set in WooCommerce (**WooCommerce > Settings > Products > Inventory > Low stock threshold**).

Badge content: **Last X items!** (where X is the current quantity).

```php
// Custom low stock badge text
add_filter('polski/badges/low_stock_text', function (string $text, int $stock): string {
    if ($stock <= 3) {
        return 'Last items!';
    }
    return sprintf('%d left', $stock);
}, 10, 2);
```

### Bestseller

Displayed on products with the highest number of sales. Default top **10 products** in the store.

```php
// Change bestseller limit
add_filter('polski/badges/bestseller_limit', function (): int {
    return 20;
});
```

Bestseller calculation is cached in the transient API (default 24 hours).

## Manual badges (per product)

In addition to automatic badges, you can add custom badges to individual products. In the product editor under **Product Data** you will find the **Badges** tab.

Manual badge options:

- **Text** - content displayed on the badge (e.g. "Recommended", "Eco", "Free shipping")
- **Background color** - badge color (color picker)
- **Text color** - text color on the badge
- **Position** - top left, top right, bottom left, bottom right
- **Priority** - display order when a product has multiple badges

The maximum number of badges on a single product is **4** (automatic + manual combined). This limit prevents cluttering the thumbnail.

```php
// Change the per-product badge limit
add_filter('polski/badges/max_per_product', function (): int {
    return 3;
});
```

## Badge positioning

Automatic badges have default positions:

| Badge        | Default position |
| ------------ | ---------------- |
| Sale         | Top left         |
| New          | Top right        |
| Low stock    | Bottom left      |
| Bestseller   | Top right        |

Positions are configured in module settings. If two badges have the same position, they are stacked vertically.

## Badge shapes

Available shapes:

- **Rectangle** - default
- **Rounded rectangle** - border-radius
- **Circle** - for short text (e.g. "-25%")
- **Ribbon** - decorative shape with a slant

Configuration in settings: **WooCommerce > Polski > Storefront Modules > Badges > Shape**.

## Badge visibility

Badges display on:

- Category and archive pages (product cards)
- Single product page (main image)
- Product slider (slider module)
- Quick view (quick view module)
- Search results

You can disable badges for selected locations:

```php
// Disable badges on the single product page
add_filter('polski/badges/show_on_single', '__return_false');
```

## Badges for variable products

For variable products:

- **Sale** - shows the largest discount percentage among all variants
- **Low stock** - shows when at least one variant has low stock
- **New** - based on the product add date (not the variant)

## CSS styling

CSS classes:

- `.polski-badge` - base badge class
- `.polski-badge--sale` - sale
- `.polski-badge--new` - new
- `.polski-badge--low-stock` - low stock
- `.polski-badge--bestseller` - bestseller
- `.polski-badge--custom` - manual badge
- `.polski-badge--top-left` - top left position
- `.polski-badge--top-right` - top right position
- `.polski-badge--bottom-left` - bottom left position
- `.polski-badge--bottom-right` - bottom right position
- `.polski-badge--rectangle` - rectangular shape
- `.polski-badge--circle` - circle shape
- `.polski-badge--ribbon` - ribbon shape

Styling example:

```css
.polski-badge--sale {
    background-color: #dc2626;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.75rem;
    padding: 4px 8px;
}
```

## Performance

Automatic badges are cached in product meta (`_polski_badges_cache`) and updated on each product save. Bestseller calculation is performed once every 24 hours via the transient API.

## Troubleshooting

**Sale badge does not show percentage** - check that the product's regular price is set. Without a regular price, the percentage cannot be calculated.

**Manual badge does not appear** - check the per-product badge limit. If the product already has 4 automatic badges, the manual one will not be displayed.

**Badges cover the quick view button** - change the badge position or quick view button position in the module settings.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
