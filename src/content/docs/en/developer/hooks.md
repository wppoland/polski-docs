---
title: Hooks (actions and filters)
description: Complete hooks documentation for Polski for WooCommerce - 25 actions and filters with signatures, parameters and code examples.
---

Hooks (actions and filters) for extending and modifying plugin behavior. All use the `polski/` namespace.

## Withdrawal hooks

### `polski/withdrawal/days`

Filters the number of days for contract withdrawal.

```php
/**
 * @param int $days Number of days for withdrawal (default 14)
 */
apply_filters('polski/withdrawal/days', int $days): int;
```

**Example:**

```php
add_filter('polski/withdrawal/days', function (int $days): int {
    return 30; // Extend to 30 days
});
```

### `polski/withdrawal/excluded_categories`

Filters product categories excluded from the right of withdrawal.

```php
/**
 * @param array $categories Array of category IDs
 */
apply_filters('polski/withdrawal/excluded_categories', array $categories): array;
```

**Example:**

```php
add_filter('polski/withdrawal/excluded_categories', function (array $categories): array {
    $categories[] = 15; // "Digital products" category ID
    $categories[] = 22; // "Hygiene products" category ID
    return $categories;
});
```

### `polski/withdrawal/form_fields`

Filters the withdrawal form fields.

```php
/**
 * @param array $fields Array of form fields
 */
apply_filters('polski/withdrawal/form_fields', array $fields): array;
```

**Example:**

```php
add_filter('polski/withdrawal/form_fields', function (array $fields): array {
    $fields['reason'] = [
        'type'     => 'textarea',
        'label'    => 'Withdrawal reason',
        'required' => false,
    ];
    return $fields;
});
```

### `polski/withdrawal/email_sent`

Action triggered after sending the withdrawal confirmation email.

```php
/**
 * @param int   $order_id  Order ID
 * @param array $form_data Form data
 */
do_action('polski/withdrawal/email_sent', int $order_id, array $form_data): void;
```

**Example:**

```php
add_action('polski/withdrawal/email_sent', function (int $order_id, array $form_data): void {
    // Log withdrawals to external system
    wp_remote_post('https://api.crm.pl/withdrawals', [
        'body' => wp_json_encode([
            'order_id' => $order_id,
            'date'     => current_time('mysql'),
        ]),
    ]);
}, 10, 2);
```

## Price hooks

### `polski/price/unit_format`

Filters the unit price display format.

```php
/**
 * @param string $format     Unit price format
 * @param float  $unit_price Unit price
 * @param string $unit       Unit of measurement (kg, l, m, pcs)
 * @param int    $product_id Product ID
 */
apply_filters('polski/price/unit_format', string $format, float $unit_price, string $unit, int $product_id): string;
```

**Example:**

```php
add_filter('polski/price/unit_format', function (string $format, float $unit_price, string $unit, int $product_id): string {
    return sprintf('%s / %s', wc_price($unit_price), $unit);
}, 10, 4);
```

### `polski/price/vat_label`

Filters the VAT label displayed next to the price.

```php
/**
 * @param string $label      Label text
 * @param string $tax_status Product tax status
 */
apply_filters('polski/price/vat_label', string $label, string $tax_status): string;
```

**Example:**

```php
add_filter('polski/price/vat_label', function (string $label, string $tax_status): string {
    if ($tax_status === 'taxable') {
        return 'gross (incl. VAT)';
    }
    return 'VAT exempt';
}, 10, 2);
```

## Omnibus hooks

### `polski/omnibus/lowest_price`

Filters the lowest price from the last 30 days (Omnibus Directive).

```php
/**
 * @param float $price      Lowest price
 * @param int   $product_id Product ID
 * @param int   $days       Number of days back
 */
apply_filters('polski/omnibus/lowest_price', float $price, int $product_id, int $days): float;
```

**Example:**

```php
add_filter('polski/omnibus/lowest_price', function (float $price, int $product_id, int $days): float {
    // Skip products from the "Outlet" category
    if (has_term('outlet', 'product_cat', $product_id)) {
        return 0.0; // Do not display Omnibus price
    }
    return $price;
}, 10, 3);
```

### `polski/omnibus/display_format`

Filters the Omnibus price display format.

```php
/**
 * @param string $html       HTML with price
 * @param float  $price      Lowest price
 * @param int    $product_id Product ID
 */
apply_filters('polski/omnibus/display_format', string $html, float $price, int $product_id): string;
```

**Example:**

```php
add_filter('polski/omnibus/display_format', function (string $html, float $price, int $product_id): string {
    return sprintf(
        '<small class="omnibus-price">Lowest price from 30 days: %s</small>',
        wc_price($price)
    );
}, 10, 3);
```

### `polski/omnibus/price_recorded`

Action triggered after saving a price to the Omnibus history.

```php
/**
 * @param int   $product_id Product ID
 * @param float $price      Saved price
 */
do_action('polski/omnibus/price_recorded', int $product_id, float $price): void;
```

## KSeF hooks

### `polski/ksef/invoice_data`

Filters invoice data before sending to KSeF.

```php
/**
 * @param array    $data  Invoice data
 * @param WC_Order $order Order object
 */
apply_filters('polski/ksef/invoice_data', array $data, WC_Order $order): array;
```

**Example:**

```php
add_filter('polski/ksef/invoice_data', function (array $data, WC_Order $order): array {
    $data['additional_info'] = 'Automatically generated invoice';
    return $data;
}, 10, 2);
```

### `polski/ksef/invoice_sent`

Action triggered after successfully sending an invoice to KSeF.

```php
/**
 * @param int    $order_id   Order ID
 * @param string $ksef_id    KSeF reference number
 * @param array  $response   KSeF API response
 */
do_action('polski/ksef/invoice_sent', int $order_id, string $ksef_id, array $response): void;
```

**Example:**

```php
add_action('polski/ksef/invoice_sent', function (int $order_id, string $ksef_id, array $response): void {
    update_post_meta($order_id, '_ksef_reference', $ksef_id);
    $order = wc_get_order($order_id);
    $order->add_order_note(sprintf('Invoice sent to KSeF: %s', $ksef_id));
}, 10, 3);
```

## DSA hooks

### `polski/dsa/report_fields`

Filters DSA report form fields.

```php
/**
 * @param array $fields Form fields
 */
apply_filters('polski/dsa/report_fields', array $fields): array;
```

**Example:**

```php
add_filter('polski/dsa/report_fields', function (array $fields): array {
    $fields['screenshot'] = [
        'type'     => 'file',
        'label'    => 'Screenshot',
        'required' => false,
        'accept'   => '.jpg,.png,.pdf',
    ];
    return $fields;
});
```

### `polski/dsa/report_submitted`

Action triggered after submitting a DSA report.

```php
/**
 * @param int   $report_id Report ID
 * @param array $data      Report data
 */
do_action('polski/dsa/report_submitted', int $report_id, array $data): void;
```

## DOI hooks - double opt-in

### `polski/doi/verification_email`

Filters the DOI verification email content.

```php
/**
 * @param string $message Email content
 * @param string $email   Email address to verify
 * @param string $url     Verification URL
 */
apply_filters('polski/doi/verification_email', string $message, string $email, string $url): string;
```

**Example:**

```php
add_filter('polski/doi/verification_email', function (string $message, string $email, string $url): string {
    return sprintf(
        'Hello! Confirm your registration by clicking: <a href="%s">Confirm account</a>',
        esc_url($url)
    );
}, 10, 3);
```

### `polski/doi/verified`

Action triggered after successful DOI verification.

```php
/**
 * @param int    $user_id User ID
 * @param string $email   Email address
 */
do_action('polski/doi/verified', int $user_id, string $email): void;
```

## Cache hooks

### `polski/cache/should_flush`

Filters the decision about flushing plugin cache.

```php
/**
 * @param bool   $should_flush Whether to flush cache
 * @param string $group        Cache group (omnibus, badges, search)
 */
apply_filters('polski/cache/should_flush', bool $should_flush, string $group): bool;
```

**Example:**

```php
add_filter('polski/cache/should_flush', function (bool $should_flush, string $group): bool {
    // Do not flush search cache during import
    if ($group === 'search' && defined('WP_IMPORTING') && WP_IMPORTING) {
        return false;
    }
    return $should_flush;
}, 10, 2);
```

### `polski/cache/ttl`

Filters the cache time-to-live (TTL) in seconds.

```php
/**
 * @param int    $ttl   Time in seconds
 * @param string $group Cache group
 */
apply_filters('polski/cache/ttl', int $ttl, string $group): int;
```

## Checkbox hooks

### `polski/checkboxes/render`

Filters the rendered checkbox HTML.

```php
/**
 * @param string $html     Checkbox HTML
 * @param array  $checkbox Checkbox data
 * @param string $location Location (checkout, registration, contact)
 */
apply_filters('polski/checkboxes/render', string $html, array $checkbox, string $location): string;
```

### `polski/checkboxes/validated`

Action triggered after checkbox validation.

```php
/**
 * @param array $checkboxes Validated checkboxes
 * @param bool  $valid      Validation result
 */
do_action('polski/checkboxes/validated', array $checkboxes, bool $valid): void;
```

## Email hooks

### `polski/email/template`

Filters the email template path.

```php
/**
 * @param string $template Template path
 * @param string $type     Email type (withdrawal, doi, waitlist)
 */
apply_filters('polski/email/template', string $template, string $type): string;
```

**Example:**

```php
add_filter('polski/email/template', function (string $template, string $type): string {
    if ($type === 'withdrawal') {
        return get_stylesheet_directory() . '/polski/emails/withdrawal.php';
    }
    return $template;
}, 10, 2);
```

### `polski/email/headers`

Filters email headers.

```php
/**
 * @param array  $headers Email headers
 * @param string $type    Email type
 */
apply_filters('polski/email/headers', array $headers, string $type): array;
```

## Legal page hooks

### `polski/legal_page/template_data`

Filters data inserted into the legal page template.

```php
/**
 * @param array  $data Template data
 * @param string $type Page type (terms, privacy, withdrawal, dsa_report)
 */
apply_filters('polski/legal_page/template_data', array $data, string $type): array;
```

**Example:**

```php
add_filter('polski/legal_page/template_data', function (array $data, string $type): array {
    if ($type === 'terms') {
        $data['delivery_info'] = 'Delivery within 2-5 business days.';
    }
    return $data;
}, 10, 2);
```

### `polski/legal_page/generated`

Action triggered after generating a legal page.

```php
/**
 * @param int    $page_id Page ID
 * @param string $type    Page type
 */
do_action('polski/legal_page/generated', int $page_id, string $type): void;
```

## Best practices

1. **Use types** - declare parameter types and return values in callbacks
2. **Priority** - default priority is 10, use higher (e.g. 20) to override default behavior
3. **Namespace** - do not create hooks in the `polski/` namespace in your plugins to avoid conflicts
4. **Compatibility** - check hook existence before use: `has_filter('polski/omnibus/lowest_price')`
5. **Documentation** - document your callbacks with PHPDoc comments

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
