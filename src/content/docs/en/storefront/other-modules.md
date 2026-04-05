---
title: Other storefront modules
description: Additional modules in Polski for WooCommerce - tab manager, featured video, gallery zoom, waitlist, infinite scroll, popup.
---

Polski for WooCommerce offers a range of additional modules that enhance store functionality. Each module can be enabled independently in **WooCommerce > Polski > Storefront Modules**.

## Tab manager

The tab manager allows controlling tabs displayed on the product page (Description, Additional Information, Reviews, etc.).

### Capabilities

- **Reorder** - drag and drop tabs in the desired order
- **Hide tabs** - hide a selected tab without deleting content
- **Rename** - give tabs custom names (e.g. "Details" instead of "Description")
- **Add tabs** - create custom tabs with your own content
- **Global tabs** - tabs visible on all products
- **Per product tabs** - tabs visible only on a selected product
- **Per category tabs** - tabs visible on products from a specific category

### Adding a custom tab

In the tab manager settings, click **Add tab** and fill in:

- **Name** - tab title
- **Content** - supports WYSIWYG editor, shortcodes and HTML
- **Priority** - tab position (lower = more to the left)
- **Visibility** - global, selected category or selected product

Programmatically:

```php
add_filter('woocommerce_product_tabs', function (array $tabs): array {
    $tabs['custom_tab'] = [
        'title'    => 'Warranty',
        'priority' => 25,
        'callback' => function (): void {
            echo '<p>Product covered by 24-month manufacturer warranty.</p>';
        },
    ];
    return $tabs;
});
```

## Featured video

The module allows replacing or supplementing the main product image with a video.

### Supported sources

- **YouTube** - paste the video URL
- **Vimeo** - paste the video URL
- **Custom video** - upload an MP4 file to the media library
- **External URL** - link to an MP4/WebM file

### Configuration

In the product editor, in the **Product Image** section, an additional **Product Video** field appears. Paste a video URL or select from the media library.

Display options:

| Option           | Description                           | Default   |
| ---------------- | ------------------------------------- | --------- |
| Position         | First in gallery / last               | First     |
| Autoplay         | Automatic playback                    | No        |
| Muted            | Muted by default                      | Yes       |
| Loop             | Loop playback                         | No        |
| Aspect ratio     | 16:9 / 4:3 / 1:1                     | 16:9      |
| Play icon        | Play icon on thumbnail                | Yes       |

### Lazy loading

YouTube and Vimeo videos are lazy-loaded - the player iframe is inserted only after clicking the thumbnail with the play icon. This prevents the product page from being slowed down by external player scripts.

## Gallery zoom

The module adds product image zoom on hover or click.

### Zoom modes

- **Hover** - magnification displayed inside the image on hover
- **Lens** - magnifying lens following the cursor
- **Lightbox** - fullscreen preview on click

### Configuration

```php
// Change zoom type
add_filter('polski/gallery_zoom/type', function (): string {
    return 'lens'; // 'hover', 'lens', 'lightbox'
});

// Change magnification scale
add_filter('polski/gallery_zoom/scale', function (): float {
    return 2.5; // default 2.0
});
```

Image requirements: for zoom to look good, product images should have a resolution of at least 1200x1200 px. At lower resolutions, the magnified image will be blurry.

## Waitlist

The module allows customers to sign up for an email notification about product availability when it is temporarily out of stock.

### How it works

1. Customer visits an out-of-stock product page
2. Instead of the **Add to cart** button, a form with an email field appears
3. Customer enters their email address and clicks **Notify me**
4. When the product is back in stock, the system automatically sends a notification

### List management

In the admin panel (**WooCommerce > Polski > Waitlist**) you can see:

- Product list with number of waiting customers
- Email addresses of registered customers
- Notification status (sent / pending)
- Button for manually sending notifications

### GDPR consent

The signup form includes a consent checkbox for personal data processing in accordance with GDPR. The checkbox text is configurable in module settings.

```php
add_filter('polski/waitlist/consent_text', function (): string {
    return 'I consent to receiving a one-time notification about product availability.';
});
```

### Automatic cleanup

Email addresses are removed from the list after:
- Sending the notification
- 90 days from signup (configurable period)
- Manual deletion by administrator

## Infinite scroll

The module replaces traditional pagination with automatic loading of additional product pages when scrolling.

### Modes

- **Automatic** - next page loads automatically when the user reaches the end of the list
- **Button** - displays a **Load more** button instead of automatic loading

### Configuration

| Option              | Description                       | Default       |
| ------------------- | --------------------------------- | ------------- |
| Mode                | Automatic or button               | Automatic     |
| Distance            | Distance from bottom of list (px) | 300           |
| Button text         | Text on the button                | Load more     |
| Spinner             | Loading animation type            | Dots          |
| Page limit          | Maximum number of pages           | 10            |

### SEO

Infinite scroll supports the `?paged=N` URL parameter (History API). Search engines still see classic pagination - the module serves paginated URLs to bots.

```php
// Disable infinite scroll on mobile devices
add_filter('polski/infinite_scroll/enabled', function (): bool {
    return ! wp_is_mobile();
});
```

## Popup

The module displays a configurable popup (modal window) on the store page.

### Popup types

- **Newsletter** - newsletter signup form
- **Informational** - any HTML content/shortcodes
- **Product** - promoting a selected product
- **Exit** - displayed when attempting to leave the page (exit intent)

### Triggers

| Trigger          | Description                                 |
| ---------------- | ------------------------------------------- |
| Time             | After X seconds from page entry             |
| Scroll           | After scrolling X% of the page              |
| Exit intent      | When the cursor leaves the browser window   |
| Click            | After clicking an element with a CSS class   |
| Visit count      | After the Nth visit to the page             |

### Display restrictions

- **Once per session** - popup displays once during the visit
- **Once per X days** - popup does not show again for X days (cookie)
- **New visitors only** - popup visible only to new visitors
- **Selected pages** - popup visible only on specified pages

### Configuration in the panel

Go to **WooCommerce > Polski > Storefront Modules > Popup** and configure:

- Popup content (WYSIWYG editor with shortcode support)
- Trigger and display conditions
- Style (colors, size, animation)
- Position (center, bottom, side)
- Close button

### Legal compliance

Popups should not hinder store usage (dark patterns). The module enforces:
- Visible close button (X)
- Ability to close by clicking the background
- Escape key closing
- No blocking of page scrolling under the popup

## Troubleshooting

**Tab manager does not save the order** - clear browser cache and WordPress cache. The problem may also be caused by a conflict with a tab plugin.

**Zoom does not work on mobile** - hover and lens modes do not work on touch devices. Use lightbox mode for mobile.

**Infinite scroll does not load additional pages** - check if the theme uses standard WooCommerce pagination (`woocommerce_pagination()`).

**Popup does not display** - check cookie settings. If the popup has already been displayed, a cookie blocks re-display. Clear cookies or set a different frequency.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
