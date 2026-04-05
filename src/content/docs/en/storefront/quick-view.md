---
title: Product quick view
description: Quick view module in Polski for WooCommerce - lightbox, variants, gallery with up to 4 images.
---

Quick view allows customers to see product details without leaving the category page or search results. The product opens in a lightbox window with the ability to add to cart.

## Enabling the module

Go to **WooCommerce > Polski > Storefront Modules** and activate the **Quick View** option. An eye icon or **Quick View** button will appear on product cards.

## Lightbox

Quick view opens in a modal window (lightbox) with a dimmed background. The window is responsive - on desktop it takes up about 70% of the screen width, on mobile devices it stretches to full width.

Lightbox contents:

- Image gallery (left side)
- Product name
- Price (including Omnibus promotions)
- Short description
- Variant selection (for variable products)
- Quantity field
- **Add to cart** button
- **View full details** link leading to the product page

The lightbox closes by:
- Clicking the X button
- Clicking outside the window (on the overlay)
- Pressing the Escape key
- Browser back button (History API)

## Variant support

For variable products, quick view displays attribute dropdowns, just like on the product page. After selecting a variant:

- Price updates to the variant price
- Image changes to the variant image
- Availability status updates
- **Add to cart** button becomes active only after selecting all required attributes

Variant data is loaded once with the lightbox - changing the variant does not generate additional server requests.

## Image gallery (up to 4 images)

The lightbox displays up to **4 images** of the product - the main image and up to 3 gallery images. This limit ensures fast loading and a clean interface in the preview window.

Gallery navigation:

- Clicking thumbnails below the main image
- Left/right arrows on the main image
- Swipe on touch devices
- Arrow keys on keyboard

The gallery image limit can be changed with a filter:

```php
add_filter('polski/quick_view/gallery_limit', function (): int {
    return 6;
});
```

## Configuration

Options available in module settings:

| Option               | Description                                         | Default       |
| -------------------- | --------------------------------------------------- | ------------- |
| Button position      | Where to display the button on the product card     | On thumbnail  |
| Button type          | Eye icon or **Quick View** text                     | Icon          |
| Gallery              | How many images to show in the lightbox             | 4             |
| Description          | Whether to show the short description               | Yes           |
| Ratings              | Whether to show star rating                         | Yes           |
| Delivery time        | Whether to show estimated delivery time             | Yes           |
| Animation            | Opening animation type (fade/slide/zoom)            | fade          |

## AJAX content loading

Lightbox content is loaded via AJAX after clicking the button. A spinner is displayed during loading. Product data is cached client-side - reopening the same product does not generate another request.

```php
// Change the lightbox template
add_filter('polski/quick_view/template', function (string $template): string {
    return get_stylesheet_directory() . '/polski/quick-view-custom.php';
});
```

## Integration with other modules

Quick view integrates with other Polski for WooCommerce modules:

- **Wishlist** - heart button visible in the lightbox
- **Compare** - compare button visible in the lightbox
- **Badges** - badges (sale, new, bestseller) displayed on the image
- **Omnibus price** - lowest price from 30 days visible next to the promotional price

## Accessibility

The lightbox supports full keyboard navigation:

- **Tab** - navigating between interactive elements
- **Escape** - closing the window
- **Arrows** - gallery navigation
- Focus trap - focus does not leave the lightbox while it is open
- ARIA attributes: `role="dialog"`, `aria-modal="true"`, `aria-label`

## CSS styling

Module CSS classes:

- `.polski-quick-view-overlay` - background dimming
- `.polski-quick-view-modal` - lightbox window
- `.polski-quick-view-gallery` - image gallery
- `.polski-quick-view-content` - product content
- `.polski-quick-view-close` - close button
- `.polski-quick-view-trigger` - trigger button on the product card

## Performance

The lightbox script and styles are lazy-loaded - only when there is at least one product with a quick view button on the page. JavaScript code weighs about 8 KB (gzip) and does not block page rendering.

## Troubleshooting

**Lightbox does not open** - check the browser console. The most common cause is a conflict with another lightbox plugin (e.g. WooCommerce Lightbox, FancyBox). Disable the default WooCommerce lightbox.

**Variants do not load** - make sure the variable product has correctly configured variants with prices. Empty variants are skipped.

**Gallery shows only 1 image** - add images to the product gallery in the WooCommerce editor (**Product Gallery** section, not just **Product Image**).

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
