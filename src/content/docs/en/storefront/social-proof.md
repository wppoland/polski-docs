---
title: Social proof notifications
description: Social proof notifications module in Polski for WooCommerce - pop-up notifications about recent purchases that build customer trust.
---

Social proof notifications are floating messages (toast notifications) that inform visitors about recent purchases made by other customers. This social proof mechanism encourages purchases by showing that other customers are actively buying from the store.

## Enabling the module

Go to **WooCommerce > Polski > Storefront modules** and enable **Social proof**. The notifications will start appearing automatically based on recent WooCommerce orders.

## Features

- Floating notifications about recent purchases
- Data pulled from real WooCommerce orders via AJAX
- Transient API cache (5 minutes) for performance
- Anonymization of customer names (e.g. "John K.")
- Configurable frequency and display time
- Choice of on-screen position (4 corners)
- Option to hide on mobile devices
- Product thumbnail in the notification

## Settings

Configuration in **WooCommerce > Polski > Storefront modules > Social proof**.

| Setting | Default | Description |
|---|---|---|
| `display_interval` | `30` | Interval between notifications (seconds) |
| `display_duration` | `5` | Display time of a single notification (seconds) |
| `position` | `bottom-left` | On-screen position: `bottom-left`, `bottom-right`, `top-left`, `top-right` |
| `anonymize_name` | `true` | Anonymize customer names (John Smith -> John S.) |
| `hide_on_mobile` | `false` | Hide notifications on mobile devices |

Database option: `polski_social_proof`.

## Notification format

Each notification contains:

- A product thumbnail
- The customer's name (with optional anonymization)
- The product name with a link
- The purchase time (e.g. "2 hours ago")

Example: **John K.** bought **Polo shirt** - 2 hours ago

## Technical details

### Data source

Notifications are generated from recent WooCommerce orders with the `completed` or `processing` status. The module fetches up to the 20 most recent orders and rotates them randomly in the notifications.

### Cache

Order data is cached in the transient API with an expiration time of 5 minutes (`polski_social_proof_data`). This way the notifications do not generate database queries on every display.

### Files

- JavaScript: `assets/js/social-proof.js`

The script is loaded conditionally and fetches data via an AJAX endpoint.

### Hooks

```php
// Filter the data shown in the notification
add_filter('polski/social_proof/notification_data', function (array $data): array {
    // Hide products from a specific category
    if (has_term('vip', 'product_cat', $data['product_id'])) {
        return [];
    }
    return $data;
});

// Change the number of orders fetched for rotation
add_filter('polski/social_proof/orders_limit', function (): int {
    return 50;
});

// Change the cache time
add_filter('polski/social_proof/cache_expiration', function (): int {
    return 10 * MINUTE_IN_SECONDS;
});
```

### CSS classes

- `.polski-social-proof` - notification container
- `.polski-social-proof--visible` - visible state (with animation)
- `.polski-social-proof__image` - product thumbnail
- `.polski-social-proof__content` - notification content
- `.polski-social-proof__name` - customer name
- `.polski-social-proof__product` - product name
- `.polski-social-proof__time` - purchase time
- `.polski-social-proof__close` - close button

### Module ID

`social_proof`

## Troubleshooting

**Notifications do not appear** - check that the store has orders with the `completed` or `processing` status. The module requires at least one order to display notifications.

**Notifications appear too often / too rarely** - adjust the `display_interval` and `display_duration` settings.

**Notifications cover other elements** - change the position in the settings or adjust the `z-index` in CSS: `.polski-social-proof { z-index: 9999; }`.

Reporting issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
