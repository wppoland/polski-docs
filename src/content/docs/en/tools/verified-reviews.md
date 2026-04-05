---
title: Verified reviews
description: Verified review system in Polski for WooCommerce - purchase badge, email matching and review credibility.
---

The verified reviews module strengthens review credibility in a WooCommerce store. Reviews from customers who actually purchased the product are marked with a badge confirming the purchase. This system supports compliance with the Omnibus Directive and unfair commercial practices regulations.

## Enabling the module

Go to **WooCommerce > Polski > Tools > Verified Reviews** and activate the module. The module requires enabled reviews in WooCommerce (**WooCommerce > Settings > Products > General > Enable product reviews**).

## How verification works

### Purchase badge

After enabling the module, reviews from customers who purchased the product receive a **Verified Purchase** badge. The badge displays next to the reviewer's name.

The badge is awarded when:

1. The review author is logged in as a customer
2. The customer has at least 1 order containing the reviewed product
3. The order has `completed` or `processing` status

### Email matching

For guests (not logged in), the system compares the email address provided in the review with email addresses from orders. If the address matches an order containing the reviewed product, the review receives the verification badge.

Email matching works in modes:

| Mode          | Description                                   | Security       |
| ------------ | --------------------------------------------- | -------------- |
| Exact        | Email must be identical                       | High           |
| Normalized   | Ignores case and Gmail aliases (+)            | Medium         |

Mode configuration: **WooCommerce > Polski > Verified Reviews > Email Matching Mode**.

```php
// Change mode programmatically
add_filter('polski/verified_reviews/email_matching', function (): string {
    return 'exact'; // 'exact' or 'normalized'
});
```

### Verification process

```
Customer submits a review
        |
System checks:
  1. Is the customer logged in?
     -> YES: check orders by user_id
     -> NO: check orders by email
        |
  2. Does an order containing this product exist?
     -> YES: check order status
     -> NO: no badge
        |
  3. Is the order status "completed" or "processing"?
     -> YES: award "Verified Purchase" badge
     -> NO: no badge
```

## Badge configuration

### Appearance

Badge configuration options:

| Option          | Description                       | Default                |
| --------------- | --------------------------------- | ---------------------- |
| Text            | Badge content                     | Verified Purchase      |
| Icon            | Icon next to text                 | Checkmark              |
| Background color| Badge background color            | Green (#059669)        |
| Text color      | Text color                        | White (#ffffff)        |
| Position        | Position relative to author name  | After name             |
| Size            | Badge size                        | Small                  |

### CSS styling

```css
.polski-verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    background-color: #059669;
    color: #ffffff;
}

.polski-verified-badge__icon {
    width: 14px;
    height: 14px;
}
```

CSS classes:
- `.polski-verified-badge` - badge container
- `.polski-verified-badge__icon` - icon
- `.polski-verified-badge__text` - badge text
- `.polski-verified-badge--large` - large variant

## Review filtering

The module adds a filter on the product page allowing customers to display:

- **All reviews** - default view
- **Verified only** - reviews with badge
- **Unverified only** - reviews without badge

The filter displays as a set of buttons above the review list.

```php
// Disable the filter
add_filter('polski/verified_reviews/show_filter', '__return_false');
```

## Review sorting

Verified reviews can be prioritized in sorting. Options:

- **Chronologically** - default WooCommerce sorting
- **Verified first** - reviews with badge on top
- **Rating descending** - from highest rating
- **Rating ascending** - from lowest rating

```php
add_filter('polski/verified_reviews/default_sort', function (): string {
    return 'verified_first'; // 'date', 'verified_first', 'rating_desc', 'rating_asc'
});
```

## Verification statistics

The admin panel (**WooCommerce > Polski > Verified Reviews > Statistics**) displays:

- **Total reviews** - all reviews in the store
- **Verified** - reviews with badge (count and percentage)
- **Unverified** - reviews without badge
- **Average verified rating** - star average of badged reviews
- **Average unverified rating** - star average of non-badged reviews
- **Monthly chart** - verified vs unverified review trend

## Fake review protection

The module offers additional protection mechanisms:

### Review limit

A customer can submit a maximum of 1 review per product. Attempting to add a second review displays a message that a review has already been submitted.

### Minimum time

A review can be submitted only X days after delivery. Default **3 days** - to give the customer time to test the product.

```php
add_filter('polski/verified_reviews/min_days_after_delivery', function (): int {
    return 7; // 7 days after delivery
});
```

### Moderation

Reviews may require moderation before publication. Options:

- **No moderation** - reviews published immediately
- **Moderate unverified** - only reviews without badge require approval
- **Moderate all** - all reviews require approval

Configuration: **WooCommerce > Polski > Verified Reviews > Moderation**.

### Suspicious review detection

The system automatically flags suspicious reviews:

| Signal                              | Description                              |
| ------------------------------------ | ---------------------------------------- |
| Multiple reviews from one IP        | More than 3 reviews from the same IP/day |
| Review immediately after purchase   | Review submitted within minutes of order |
| Identical text                      | Same review text on different products   |
| Suspicious email                    | Email address from a temporary domain    |

Suspicious reviews go to the moderation queue with the **Needs review** label.

## Schema.org integration

Verified reviews generate `Review` structured data with an additional field:

```json
{
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Jan K."
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "datePublished": "2025-05-20",
  "reviewBody": "Excellent quality, highly recommend.",
  "publisher": {
    "@type": "Organization",
    "name": "My Store"
  }
}
```

Google prefers reviews from confirmed purchases in rich snippets.

## Review request email

The module can automatically send an email to the customer requesting a review X days after delivery.

Configuration:

| Option              | Description                     | Default   |
| ------------------- | ------------------------------- | --------- |
| Enabled            | Whether to send email           | No        |
| Delay              | Days after delivery             | 7         |
| Template           | Email template                  | Default   |
| Limit              | Max 1 email per order           | Yes       |

```php
// Change email delay
add_filter('polski/verified_reviews/email_delay_days', function (): int {
    return 14;
});
```

## Shortcode

```html
[polski_verified_badge text="Confirmed order" icon="shield"]
```

The shortcode displays a verification badge. Useful in custom review templates.

## Troubleshooting

**Badge does not display despite a purchase** - check the order status. Only orders with `completed` or `processing` status qualify for verification. Also check whether the email in the review matches the email from the order.

**All reviews are unverified** - make sure the module is active and that WooCommerce requires an email address when adding reviews.

**Review request email does not arrive** - check the WordPress mail configuration. Use an SMTP plugin for reliable email sending.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
