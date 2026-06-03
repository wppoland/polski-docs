---
title: Side cart (live cart)
description: Side cart module in Polski for WooCommerce - a slide-in cart panel with a free shipping bar and real-time updates.
---

The side cart is a slide-in panel (drawer) that appears after a product is added to the cart. The customer sees the cart contents without leaving the product page, which shortens the purchase path and reduces cart abandonment.

## Enabling the module

Go to **WooCommerce > Polski > Store modules** and enable **Side cart**. After a product is added to the cart, the panel slides in automatically from the chosen side of the screen.

## Features

- Slide-in cart panel after a product is added (slide-in drawer)
- Real-time updates via WooCommerce Cart Fragments
- Animated free shipping progress bar
- Change product quantities without reloading the page
- Remove products from the cart in the panel
- Cart value summary
- Overlay that dims the page background
- Choice of display side (left/right)

## Settings

Configuration in **WooCommerce > Polski > Store modules > Side cart**.

| Setting | Default | Description |
|---|---|---|
| `auto_open` | `true` | Automatically open the panel after a product is added |
| `show_subtotal` | `true` | Display the cart value summary |
| `show_shipping_notice` | `true` | Display the free shipping progress bar |
| `free_shipping_threshold` | `200` | Free shipping threshold in the store currency |
| `position` | `right` | Side of the screen: `right` or `left` |
| `overlay` | `true` | Dim the background when the panel is open |

Database option: `polski_live_cart`.

## Free shipping bar

The bar shows how much is left until free shipping. Once the threshold is exceeded, it displays a confirmation message. The threshold is taken from the `free_shipping_threshold` setting or automatically from the WooCommerce shipping method (if configured).

Example messages:

- "You are **45.00 zl** away from free shipping"
- "Congratulations! Your order qualifies for **free shipping**"

## Technical details

### Files

- CSS: `assets/css/live-cart.css`
- JavaScript: `assets/js/live-cart.js`

Both files are loaded conditionally, only when the module is active. The script depends on `jquery` and `wc-cart-fragments`.

### Cart Fragments

The module uses the WooCommerce Cart Fragments mechanism to update the panel contents in real time. After every cart change (add, remove, change quantity) the panel refreshes without reloading the page.

### Hooks

```php
// Change the free shipping threshold dynamically
add_filter('polski/live_cart/free_shipping_threshold', function (float $threshold): float {
    return 300.00;
});

// Add your own content below the product list
add_action('polski/live_cart/after_items', function (): void {
    echo '<p class="live-cart-promo">Discount code: WELCOME10</p>';
});

// Disable auto-open on mobile
add_filter('polski/live_cart/auto_open', function (bool $auto_open): bool {
    if (wp_is_mobile()) {
        return false;
    }
    return $auto_open;
});
```

### CSS classes

- `.polski-live-cart` - main panel container
- `.polski-live-cart--open` - open state
- `.polski-live-cart--left` / `.polski-live-cart--right` - position
- `.polski-live-cart__overlay` - background overlay
- `.polski-live-cart__header` - panel header
- `.polski-live-cart__items` - product list
- `.polski-live-cart__item` - single product
- `.polski-live-cart__subtotal` - summary
- `.polski-live-cart__shipping-bar` - free shipping bar
- `.polski-live-cart__shipping-progress` - bar fill

### Module ID

`live_cart`

## Troubleshooting

**The panel does not open after a product is added** - check whether AJAX add to cart is enabled in **WooCommerce > Settings > Products > Enable AJAX add to cart buttons**. Also check that there is no conflict with another cart plugin.

**The free shipping bar does not display** - make sure you have a shipping method configured with free shipping above a defined threshold, or set the threshold manually in the module settings.

**The panel displays on the wrong side** - change the `position` setting to `left` or `right`.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
