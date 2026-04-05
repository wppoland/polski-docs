---
title: Legal checkboxes
description: Configuration, validation and customization of mandatory legal checkboxes on the WooCommerce checkout page.
---

Polish law requires the consumer to accept the store terms and conditions and privacy policy before placing an order. The Polski for WooCommerce plugin provides a flexible system for managing legal checkboxes - from configuring content and labels to validation and error messages.

## Legal requirements

According to the Consumer Rights Act and the Act on Providing Services by Electronic Means, an online store must obtain explicit consent from the consumer for:

- store terms and conditions (sales contract terms)
- privacy policy (personal data processing)
- right of withdrawal from the contract (information about the 14-day period)

Consents must be given actively (the checkbox must not be pre-checked) and separately for each purpose.

## Configuration

Go to **WooCommerce > Settings > Polski > Checkout** and configure the "Legal Checkboxes" section.

### Default checkboxes

The plugin adds the following checkboxes:

| Checkbox | Required | Default content |
|----------|----------|-----------------|
| Terms and conditions | Yes | I have read the [terms and conditions] and accept their provisions. |
| Privacy policy | Yes | I have read the [privacy policy] and consent to the processing of my personal data. |
| Right of withdrawal | Yes | I have been informed about the right of withdrawal from the contract within 14 days. |
| Marketing consent | No | I consent to receiving commercial information by electronic means. |

### Adding a custom checkbox

In the configuration panel, click **Add checkbox** and fill in the form:

| Field | Description |
|-------|-------------|
| Name | Internal identifier (e.g. `newsletter_consent`) |
| Label | Text displayed next to the checkbox |
| Required | Whether the checkbox must be checked to place an order |
| Position | Display order (number) |
| Description | Additional text below the checkbox (optional) |
| Error message | Text displayed when a required checkbox is not checked |

### Label formatting

In the label content you can use:

- `[regulamin]` - automatic link to the terms and conditions page
- `[polityka-prywatnosci]` - automatic link to the privacy policy
- `[odstapienie]` - link to the withdrawal rights page
- `<a href="URL">text</a>` - custom link
- `<strong>text</strong>` - bold

Terms and conditions and privacy policy pages are pulled from WooCommerce settings (**WooCommerce > Settings > Advanced > Page setup**).

## Validation

### Server-side validation

The plugin validates checkboxes on the server side using the `woocommerce_checkout_process` hook. If a required checkbox is not checked, the order will not be placed and the customer will see an error message.

### Client-side validation

Optional JavaScript validation displays an error message immediately after clicking the order button, without page reload. Enable it in settings:

**WooCommerce > Settings > Polski > Checkout > JS checkbox validation**

### Error messages

Each checkbox has a configurable error message. Default messages:

| Checkbox | Error message |
|----------|---------------|
| Terms and conditions | To place an order, you must accept the store terms and conditions. |
| Privacy policy | To place an order, you must accept the privacy policy. |
| Right of withdrawal | You must confirm that you have read the withdrawal rights information. |

## Consent storage

The plugin saves consent information:

- as order metadata (`_polski_consent_*`)
- with the date and time of consent
- with the terms/privacy policy version (if version tracking is enabled)

This information is visible in the admin panel order view and can be exported on request (GDPR).

### Viewing consents in an order

In the order view in the admin panel, in the "Legal Consents" section, you will find a list of given consents with dates.

## Programmatic checkbox management

### Adding a checkbox programmatically

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    $checkboxes['custom_consent'] = [
        'label'         => 'I consent to data processing for complaint handling purposes.',
        'required'      => true,
        'position'      => 50,
        'error_message' => 'You must consent to data processing.',
        'description'   => '',
    ];

    return $checkboxes;
});
```

### Removing a checkbox

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    unset($checkboxes['marketing_consent']);

    return $checkboxes;
});
```

### Modifying an existing checkbox

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    if (isset($checkboxes['terms'])) {
        $checkboxes['terms']['label'] = 'I accept the <a href="/terms">terms and conditions</a> of the store.';
    }

    return $checkboxes;
});
```

### Conditional checkbox display

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    $cart_total = WC()->cart->get_total('edit');

    if ($cart_total > 500) {
        $checkboxes['high_value_consent'] = [
            'label'         => 'I confirm the order with a value above 500 PLN.',
            'required'      => true,
            'position'      => 60,
            'error_message' => 'You must confirm the high-value order.',
        ];
    }

    return $checkboxes;
});
```

## CSS styling

```css
.polski-legal-checkboxes {
    margin: 1.5em 0;
    padding: 1em;
    background: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
}

.polski-legal-checkbox {
    margin-bottom: 0.8em;
}

.polski-legal-checkbox label {
    font-size: 0.9em;
    line-height: 1.5;
    cursor: pointer;
}

.polski-legal-checkbox__description {
    margin-top: 0.3em;
    font-size: 0.8em;
    color: #666;
}

.polski-legal-checkbox--error label {
    color: #c00;
}
```

## Block Checkout compatibility

The plugin supports legal checkboxes in both classic checkout and Block Checkout. For Block Checkout, checkboxes are rendered using the `woocommerce/checkout-terms-block` block.

## Common issues

### Checkboxes do not display

1. Check that the module is enabled in settings
2. Make sure the terms and conditions and privacy policy pages are set in WooCommerce
3. Verify that another plugin is not removing the checkboxes

### Link in label does not work

Check that the target page is published (not a draft) and that the shortcut (e.g. `[regulamin]`) is correctly entered.

### Order goes through despite an unchecked checkbox

Check that the checkbox is marked as "Required". Verify the browser console for JavaScript errors that may block client-side validation.

## Related resources

- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
