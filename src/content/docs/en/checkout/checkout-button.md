---
title: Order button with obligation to pay
description: Configuration of the "Order with obligation to pay" button required by Polish consumer law in WooCommerce.
---

The Polish Consumer Rights Act (Article 17 paragraph 3) requires that the button finalizing an order in an online store be clearly labeled with the words "order with obligation to pay" or an equivalent phrase. The Polski for WooCommerce plugin automatically changes the default WooCommerce button text to one compliant with Polish law.

## Legal requirements

According to Article 17 paragraph 3 of the Consumer Rights Act, which implements Directive 2011/83/EU:

> "The entrepreneur shall ensure that the consumer, at the moment of placing the order, explicitly acknowledges that the order entails an obligation to pay."

The button must contain a phrase clearly indicating the obligation to pay. Accepted variants:

- "Zamawiam z obowiazkiem zaplaty" (Order with obligation to pay)
- "Zamawiam i place" (I order and pay)
- "Kupuje i place" (I buy and pay)

Using text such as "Place order", "Order" or "Confirm" is non-compliant with the law and may result in penalties.

## Configuration

Go to **WooCommerce > Settings > Polski > Checkout** and configure the "Order Button" section.

### Settings

| Setting | Default value | Description |
|---------|---------------|-------------|
| Button text | Zamawiam z obowiazkiem zaplaty | Text displayed on the button |
| Override for all payment methods | Yes | Whether to apply text regardless of selected method |
| Override payment gateway texts | Yes | Whether to override texts set by payment gateway plugins |

### Texts per payment method

Some payment gateways (e.g. PayPal, Przelewy24) set their own button texts. The plugin allows you to choose whether to:

1. **Override all** - always display the set text (recommended)
2. **Keep gateway texts** - allow gateways to set their own texts (make sure they meet legal requirements)

## Technical implementation

The plugin modifies the button text using a WooCommerce filter:

```php
add_filter('woocommerce_order_button_text', function (): string {
    return 'Zamawiam z obowiazkiem zaplaty';
});
```

### Block Checkout compatibility

The plugin supports both the classic checkout (shortcode) and the new Block Checkout (Gutenberg). For Block Checkout, modification is done through:

- `woocommerce_order_button_text` filter (classic)
- Store API endpoint (Block Checkout)

### Compatibility with popular plugins

The plugin is compatible with popular payment gateways on the Polish market:

- Przelewy24
- PayU
- Tpay
- Stripe
- PayPal
- BLIK (through various gateways)

## Customizing the text

### Changing text in settings

The simplest way - change the text in **WooCommerce > Settings > Polski > Checkout**. Remember that the new text must still contain information about the obligation to pay.

### Changing text programmatically

```php
add_filter('woocommerce_order_button_text', function (string $text): string {
    return 'Kupuje i place';
}, 20);
```

Priority `20` ensures that the filter runs after the plugin's filter (priority `10`).

### Text dependent on payment method

```php
add_filter('woocommerce_order_button_text', function (string $text): string {
    $chosen_payment = WC()->session->get('chosen_payment_method');

    if ($chosen_payment === 'bacs') {
        return 'Zamawiam z obowiazkiem zaplaty przelewem';
    }

    if ($chosen_payment === 'cod') {
        return 'Zamawiam z obowiazkiem zaplaty przy odbiorze';
    }

    return 'Zamawiam z obowiazkiem zaplaty';
}, 20);
```

## Button styling

The button retains default WooCommerce CSS classes. You can customize its appearance:

```css
#place_order {
    background-color: #2e7d32;
    font-size: 1.1em;
    font-weight: 700;
    padding: 0.8em 2em;
    text-transform: none;
}

#place_order:hover {
    background-color: #1b5e20;
}
```

For Block Checkout:

```css
.wc-block-components-checkout-place-order-button {
    background-color: #2e7d32;
    font-weight: 700;
}
```

## Testing

After configuration, check the button in the following scenarios:

1. Checkout with various payment methods
2. Checkout as a guest and logged-in user
3. Checkout with a coupon
4. Checkout with a subscription (if you use WooCommerce Subscriptions)
5. Mobile checkout - make sure the text is not truncated

## Common issues

### Button text reverts to the default "Place order"

Check that:

1. The plugin is active and the checkout module is enabled
2. No other plugin overrides the filter with a higher priority
3. The theme does not hardcode the button text in the template

### Text is truncated on mobile devices

The long text "Zamawiam z obowiazkiem zaplaty" may not fit on narrow screens. Consider:

- using a shorter variant: "Kupuje i place"
- adjusting CSS: `white-space: normal` on the button

### Block Checkout does not change the text

Make sure you are using the latest plugin version. Older versions may not support Block Checkout. Also check that WooCommerce Blocks is updated.

## Related resources

- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
