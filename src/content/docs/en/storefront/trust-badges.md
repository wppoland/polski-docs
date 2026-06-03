---
title: Trust badges
description: Trust badges module in Polski for WooCommerce - configurable trust signals on the product, cart and checkout pages.
---

Trust badges are graphic elements that inform customers about secure payments, fast delivery, the option to return, and a quality guarantee. They help increase conversion by building trust at key moments of the buying journey.

## Enabling the module

Go to **WooCommerce > Polski > Storefront modules** and enable **Trust badges**. The icons will appear automatically on the product, cart and checkout pages.

## Features

- Configurable trust signals with inline SVG icons
- Display on the product, cart and order summary pages
- 7 icon types: lock, truck, refresh, shield, star, check, heart
- Custom text under each badge
- Pure CSS with no external dependencies
- Responsive layout on mobile devices

## Settings

Configuration in **WooCommerce > Polski > Storefront modules > Trust badges**.

| Setting | Default | Description |
|---|---|---|
| `show_on_product` | `true` | Display badges on the product page |
| `show_on_cart` | `true` | Display badges on the cart page |
| `show_on_checkout` | `true` | Display badges on the checkout page |

Each badge can be individually enabled/disabled and configured:

- **Icon** - choose from 7 available types
- **Title** - short text under the icon (e.g. "Secure payment")
- **Order** - position relative to other badges

Database option: `polski_trust_badges`.

## Default badges

After enabling the module, 4 predefined badges are available:

| Badge | Icon | Default text |
|---|---|---|
| Secure payment | lock | Encrypted SSL connection |
| Fast delivery | truck | Shipped within 24h |
| Returns | refresh | 14 days to return |
| Quality guarantee | shield | Genuine products |

## Technical details

### SVG icons

All icons are rendered as inline SVG - no HTTP requests, no dependency on icon libraries. Each icon is 32x32px in size and inherits its color from the CSS.

### Hooks

```php
// Filter the list of badges
add_filter('polski/trust_badges/items', function (array $badges): array {
    // Add a custom badge
    $badges[] = [
        'icon'  => 'star',
        'title' => 'Over 1000 reviews',
    ];
    return $badges;
});

// Change the position on the product page
add_filter('polski/trust_badges/product_hook', function (): string {
    return 'woocommerce_after_add_to_cart_form'; // default: woocommerce_product_meta_end
});
```

### CSS classes

- `.polski-trust-badges` - main container
- `.polski-trust-badge` - single badge
- `.polski-trust-badge__icon` - SVG icon
- `.polski-trust-badge__title` - text under the icon

```css
.polski-trust-badges {
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding: 1rem 0;
    border-top: 1px solid #e5e7eb;
}
```

### Module ID

`trust_badges`

## Troubleshooting

**Badges do not appear** - check that the theme supports the WooCommerce hooks on the product page (`woocommerce_product_meta_end`) and the cart (`woocommerce_after_cart_totals`).

**Icons are too small / too large** - override the size in CSS: `.polski-trust-badge__icon svg { width: 40px; height: 40px; }`.

Reporting issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
