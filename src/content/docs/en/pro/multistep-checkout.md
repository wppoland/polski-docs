---
title: Multi-step checkout
description: Documentation of the Polski PRO for WooCommerce multi-step checkout - splitting the order process into steps, configuration, React Checkout Blocks and classic fallback.
---

The module splits checkout into four steps: address, shipping, payment and summary. The customer sees a progress bar and goes through each step.

## Checkout steps

The multi-step checkout consists of four steps:

| Step | Default name | Content |
|------|-------------|---------|
| 1 | Address | Billing data form and shipping address |
| 2 | Shipping | Shipping method and delivery options selection |
| 3 | Payment | Payment method selection and payment details |
| 4 | Summary | Order review, legal checkboxes, "Place order" button |

The customer can go back to previous steps without losing entered data. Proceeding to the next step requires correctly filling in the current form.

## Configuration

Go to **WooCommerce > Settings > Polski > PRO Modules > Checkout**.

### Enabling the module

The multi-step checkout is controlled by the option:

```
polski_pro_checkout[multistep_enabled]
```

A value of `1` enables the multi-step layout, `0` restores the default WooCommerce checkout.

### Step names

Default step names can be changed in the settings:

| Setting | Default value |
|---------|--------------|
| Step 1 title | Address |
| Step 2 title | Shipping |
| Step 3 title | Payment |
| Step 4 title | Summary |

Step names are displayed in the progress bar above the checkout form.

### Inter-step validation

The plugin validates data after each step before allowing progression to the next one:

- **Step 1 (Address)** - required fields: first name, last name, address, city, postal code, phone, email
- **Step 2 (Shipping)** - shipping method selection required
- **Step 3 (Payment)** - payment method selection required
- **Step 4 (Summary)** - mandatory legal checkboxes must be checked

Validation messages appear inline below the corresponding field.

## Technical implementation

### WooCommerce Checkout Blocks (React)

For stores using WooCommerce Checkout Blocks (block editor), the module uses React to render steps. The components integrate with the WooCommerce Store API and maintain full compatibility with Checkout Blocks extensions.

Rendering happens on the client side. The plugin registers itself as a Checkout Blocks extension and modifies the form layout without interfering with WooCommerce logic.

### Classic fallback (shortcode)

For stores using the classic checkout (shortcode `[woocommerce_checkout]`), the module provides a JavaScript fallback. The script divides the existing form into sections and adds navigation between them.

The classic fallback:

- does not require React
- works with existing themes and checkout customizations
- supports the same four steps as the Blocks version
- uses jQuery for DOM manipulation

### Mode detection

The plugin automatically detects whether the checkout uses Checkout Blocks or the classic shortcode and loads the appropriate implementation. No manual mode configuration is required.

## Styling

### CSS body class

When the multi-step checkout is active, a class is added to the `<body>` element:

```
polski-multistep-checkout
```

This allows targeting CSS styles exclusively to pages with the multi-step checkout:

```css
body.polski-multistep-checkout .woocommerce-checkout {
    max-width: 720px;
    margin: 0 auto;
}
```

### Step classes

Each step receives its own CSS class:

```css
.polski-checkout-step { /* common step styles */ }
.polski-checkout-step--active { /* active step */ }
.polski-checkout-step--completed { /* completed step */ }
.polski-checkout-step--address { /* address step */ }
.polski-checkout-step--shipping { /* shipping step */ }
.polski-checkout-step--payment { /* payment step */ }
.polski-checkout-step--review { /* summary step */ }
```

### Progress bar

The progress bar is rendered as an `<ol>` element with the `.polski-checkout-progress` class. Each list item corresponds to one step:

```css
.polski-checkout-progress { /* bar container */ }
.polski-checkout-progress__step { /* single step in bar */ }
.polski-checkout-progress__step--active { /* active step in bar */ }
.polski-checkout-progress__step--done { /* completed step in bar */ }
```

## Compatibility with other modules

### Legal checkboxes

Legal checkboxes from the free version of Polski for WooCommerce are automatically moved to step 4 (Summary). The customer must check them before placing the order.

### VAT ID field

The VAT ID field is displayed in step 1 (Address), according to the conditional display configuration from the VAT ID module.

### Custom fields

Fields added by other plugins (e.g. via the `woocommerce_checkout_fields` hook) are automatically assigned to the appropriate step based on their section:

- `billing_*` - step 1
- `shipping_*` - step 2
- `order_*` - step 4

## Accessibility (a11y)

The multi-step checkout supports:

- keyboard navigation (Tab, Enter, Escape)
- ARIA attributes (`aria-current`, `aria-label`, `role="tablist"`)
- step change announcements by screen readers
- visible focus on interactive elements

## Performance

The module loads scripts and styles only on the checkout page. On other store pages, it adds no resources. Scripts are loaded with the `defer` attribute to avoid blocking page rendering.

## Common issues

### Checkout does not split into steps

1. Check if the `polski_pro_checkout[multistep_enabled]` option is set to `1`
2. Clear cache (caching plugins, CDN, browser cache)
3. Check the browser console for JavaScript errors
4. Verify there is no conflict with other plugins modifying the checkout

### Form does not advance to the next step

1. Check if all required fields are filled in
2. Verify validation messages below the fields
3. Check the browser console - AJAX errors may block validation

### Styles not working properly

1. Check if the `polski-multistep-checkout` class is present on the `<body>` element
2. Verify that plugin styles are not being overridden by the theme (use the inspector)
3. Add custom styles with higher selector specificity

## Related resources

- [Legal checkboxes](/checkout/legal-checkboxes/)
- [VAT ID at checkout](/checkout/nip-lookup/)
- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
