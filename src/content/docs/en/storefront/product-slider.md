---
title: Product slider
description: Product slider module in Polski for WooCommerce - scroll-snap, related products, sale, featured, Gutenberg block and shortcode.
---

The slider displays a product carousel with smooth scrolling based on CSS scroll-snap. It does not require external JS libraries (Slick, Swiper) - it uses native browser mechanisms.

## Enabling the module

Go to **WooCommerce > Polski > Storefront Modules** and activate the **Product Slider** option.

## Scroll-snap technology

The slider uses CSS `scroll-snap-type: x mandatory` instead of traditional carousel libraries. Advantages:

- **Zero JavaScript for scrolling** - smooth native scrolling
- **No dependencies** - no need to load Slick, Swiper or Owl Carousel
- **Full responsiveness** - automatic adaptation to screen width
- **Touch and mouse** - native swipe support on touch devices
- **Performance** - no reflow/repaint during scrolling, 60 FPS

Snap configuration:

```css
/* The slider applies these values by default */
.polski-slider {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
}

.polski-slider__item {
    scroll-snap-align: start;
}
```

## Slider types

### Related products

The slider displays products related to the currently viewed product. Related products are selected based on categories and tags.

```html
[polski_product_slider type="related" product_id="123"]
```

### Sale products

Displays products with an active sale price.

```html
[polski_product_slider type="sale" limit="12"]
```

### Featured products

Displays products marked as featured (star in the WooCommerce panel).

```html
[polski_product_slider type="featured" limit="8"]
```

### Bestsellers

Products sorted by total sales count.

```html
[polski_product_slider type="bestsellers" limit="10"]
```

### Latest

Products sorted by date added.

```html
[polski_product_slider type="latest" limit="10"]
```

### From a specific category

Products from a specific category.

```html
[polski_product_slider type="category" category="electronics" limit="12"]
```

### Selected products

Specific products given by ID.

```html
[polski_product_slider type="ids" ids="12,34,56,78,90"]
```

## Gutenberg block

The **Polski - Product Slider** block is available in the Gutenberg editor. Slider preview is visible directly in the editor.

Block options:

| Option              | Description                                  | Default       |
| ------------------- | -------------------------------------------- | ------------- |
| Type                | Product source (related/sale/featured/etc.)  | latest        |
| Limit               | Maximum number of products                   | 8             |
| Columns             | Visible products (desktop)                   | 4             |
| Columns tablet      | Visible products on tablet                   | 2             |
| Columns mobile      | Visible products on phone                    | 1             |
| Arrows              | Show navigation arrows                       | Yes           |
| Dots                | Show pagination dots                         | No            |
| Auto scroll         | Automatic scrolling                          | No            |
| Gap                 | Spacing between products                     | 16px          |
| Title               | Title above the slider                       | (empty)       |

## Shortcode `[polski_product_slider]`

### Parameters

| Parameter        | Type   | Default    | Description                                   |
| --------------- | ------ | ---------- | --------------------------------------------- |
| `type`          | string | `latest`   | Type: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | int    | `8`        | Maximum number of products                    |
| `columns`       | int    | `4`        | Desktop columns                               |
| `columns_tablet`| int    | `2`        | Tablet columns                                |
| `columns_mobile`| int    | `1`        | Mobile columns                                |
| `category`      | string | (empty)    | Category slug (for type=category)             |
| `ids`           | string | (empty)    | Product IDs (for type=ids)                    |
| `product_id`    | int    | (current)  | Product ID (for type=related)                 |
| `arrows`        | string | `yes`      | Show arrows                                   |
| `dots`          | string | `no`       | Show pagination dots                          |
| `autoplay`      | string | `no`       | Automatic scroll                              |
| `autoplay_speed`| int    | `5000`     | Pause between slides (ms)                     |
| `gap`           | string | `16px`     | Spacing between product cards                 |
| `title`         | string | (empty)    | Title above the slider                        |
| `orderby`       | string | `date`     | Sort by: date, price, rating, rand            |
| `order`         | string | `DESC`     | Direction: ASC or DESC                        |

### Examples

Sale products slider with title:

```html
[polski_product_slider type="sale" limit="12" columns="4" title="Current promotions" arrows="yes"]
```

Category products slider on the homepage:

```html
[polski_product_slider type="category" category="new-arrivals" limit="8" columns="3" dots="yes"]
```

Auto-scrolling bestsellers slider:

```html
[polski_product_slider type="bestsellers" limit="10" autoplay="yes" autoplay_speed="4000"]
```

## Automatic scrolling

When `autoplay="yes"`, the slider automatically scrolls products at the specified interval. Scrolling stops when the user hovers over the slider or touches it on a mobile device. After leaving the slider, automatic scrolling resumes.

```php
// Change default autoplay time globally
add_filter('polski/product_slider/autoplay_speed', function (): int {
    return 3000; // 3 seconds
});
```

## Integration with modules

Product cards in the slider contain elements from other modules:

- **Badges** - sale, new, bestseller badges
- **Wishlist** - heart icon
- **Compare** - compare button
- **Quick view** - eye icon
- **Omnibus price** - lowest price from 30 days

## Lazy loading images

Product images in the slider are lazy-loaded - images outside the visible area are not fetched until scrolling. The native `loading="lazy"` attribute and `Intersection Observer` for older browsers are used.

## CSS styling

- `.polski-slider` - slider container
- `.polski-slider__track` - scroll track
- `.polski-slider__item` - product card
- `.polski-slider__arrow` - navigation arrow
- `.polski-slider__arrow--prev` - left arrow
- `.polski-slider__arrow--next` - right arrow
- `.polski-slider__dots` - pagination dots container
- `.polski-slider__dot` - single dot
- `.polski-slider__dot--active` - active dot
- `.polski-slider__title` - title

## Troubleshooting

**Slider does not scroll smoothly** - make sure the browser supports `scroll-snap-type`. All modern browsers (Chrome 69+, Firefox 68+, Safari 11+) support this property.

**Arrows do not work** - check if there is a CSS conflict with another slider on the page. The `.polski-slider__arrow` classes may be overridden by theme styles.

**Autoplay does not stop** - make sure JavaScript is not blocked by an optimization plugin. The slider script must be loaded.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
