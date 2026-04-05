---
title: VAT display
description: Configuration of gross and net price display, VAT rate and Article 113 VAT Act exemption in WooCommerce.
---

Polish law obliges online sellers to clearly inform whether the displayed price includes VAT. The Polski for WooCommerce plugin enables flexible management of VAT information display - from a simple "gross/net" label to full information about the tax rate and exemption basis.

## Legal requirements

According to the Act on Informing about Prices of Goods and Services and the VAT Act, an online store must:

- clearly inform whether the price includes VAT
- provide the VAT rate if selling to both individual and business customers
- in case of VAT exemption - indicate the legal basis for the exemption

Sellers using the entity exemption (Article 113 of the VAT Act) must inform the customer that the price does not include VAT due to the exemption.

## Configuration

Go to **WooCommerce > Settings > Polski > Prices** and configure the "VAT Display" section.

### Display modes

| Mode | Description | Example |
|------|-------------|---------|
| Gross (with VAT) | Price includes tax | 123.00 PLN gross |
| Net (without VAT) | Price without tax | 100.00 PLN net |
| Both | Both prices simultaneously | 100.00 PLN net (123.00 PLN gross) |

### Detailed settings

- **Show VAT rate** - displays the percentage tax rate next to the price (e.g. "including 23% VAT")
- **Show VAT information on listing** - controls visibility on category pages and search results
- **Show VAT information in cart** - controls visibility in the cart and order summary
- **Custom text** - allows overriding the default VAT information text

## VAT exemption (Article 113)

Sellers exempt from VAT under Article 113 paragraph 1 or paragraph 9 of the Goods and Services Tax Act can configure an appropriate message.

### Exemption configuration

1. Go to **WooCommerce > Settings > Polski > Prices**
2. Check the **VAT exemption (Art. 113)** option
3. Select the exemption basis:
   - **Art. 113 para. 1** - exemption for sales up to 200,000 PLN annually
   - **Art. 113 para. 9** - exemption for taxpayers starting business during the year
4. Optionally customize the message content

Default message: "Price does not include VAT - the seller uses an exemption under Article 113 paragraph 1 of the VAT Act."

### Disabling VAT in WooCommerce

With a VAT exemption, set in WooCommerce:

1. **WooCommerce > Settings > Tax** - disable tax calculations OR set a 0% rate
2. The plugin will automatically add the appropriate annotation to prices

## Shortcode

Use the shortcode `[polski_tax_notice]` to display VAT information anywhere.

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product_id` | int | current | Product ID |
| `type` | string | `auto` | Information type: `auto`, `gross`, `net`, `exempt` |
| `show_rate` | bool | `true` | Whether to display the percentage rate |
| `wrapper` | string | `span` | Wrapping HTML element |

### Usage examples

Automatic detection on the product page:

```html
[polski_tax_notice]
```

Forcing exemption information:

```html
[polski_tax_notice type="exempt"]
```

Without percentage rate:

```html
[polski_tax_notice show_rate="false"]
```

In a PHP template:

```php
echo do_shortcode('[polski_tax_notice product_id="' . $product->get_id() . '"]');
```

## Configuration for B2B and B2C stores

Stores serving both individual (B2C) and business (B2B) customers can configure different price views depending on the user role.

### Net prices for businesses

The plugin works with the WooCommerce roles system. To display net prices for business customers:

1. Create a dedicated role (e.g. "business_customer") or use an existing one
2. In plugin settings, assign net display to the selected role
3. Business customers will see prices without VAT, and individual customers - with VAT

### Dual prices on the product page

Activating "Both" mode displays net and gross prices simultaneously. Presentation format:

```
100.00 PLN net
123.00 PLN gross (including 23% VAT)
```

The order and format can be customized in settings.

## VAT rates for different product categories

Four VAT rates apply in Poland:

| Rate | Application |
|------|-------------|
| 23% | Standard rate - most goods and services |
| 8% | Reduced rate - residential construction, catering services |
| 5% | Reduced rate - food, books, periodicals |
| 0% | Zero rate - exports, intra-community supply of goods |

The plugin automatically recognizes the rate assigned to the product in WooCommerce and displays the appropriate information.

## VAT information in emails

The plugin also adds VAT information to WooCommerce transactional emails:

- order confirmation
- invoice
- order status change

The message content is consistent with the store settings.

## CSS styling

VAT information is wrapped in elements with dedicated CSS classes:

```css
.polski-tax-notice {
    font-size: 0.85em;
    color: #666;
}

.polski-tax-notice--exempt {
    color: #c00;
    font-weight: 600;
}

.polski-tax-notice__rate {
    white-space: nowrap;
}
```

## Common issues

### VAT information displays twice

Check whether the theme adds its own VAT information. Some themes dedicated to the Polish market have built-in VAT support - in that case, disable one of the implementations.

### VAT rate displays incorrectly

Make sure the tax classes in **WooCommerce > Settings > Tax > Standard rates** are correctly configured. The plugin reads the rate directly from the WooCommerce configuration.

## Related resources

- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
