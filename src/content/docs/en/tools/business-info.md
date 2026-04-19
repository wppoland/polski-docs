---
title: Business identification - footer and shortcode
description: Display the shop's legally-required business identification (name, address, NIP, REGON, email, phone) as a footer block, shortcode or Gutenberg block. Pulls data from the setup wizard.
---

The **Business identification** module centralises the output of the shop's business data (name, address, NIP, REGON, email, phone). Polish consumer law (Art. 12 of the Consumer Rights Act and Art. 206 of the Commercial Companies Code) requires e-commerce sellers to publish this information so the customer can identify the counterparty. This module helps you place the data consistently across the footer, order confirmations and legal pages.

## Data source

All fields come from the `polski_general` option, populated by the setup wizard:

| Field              | Key                 |
| ------------------ | ------------------- |
| Company name       | `company_name`      |
| Address            | `company_address`   |
| NIP (Polish tax ID)| `company_nip`       |
| REGON (statistical)| `company_regon`     |
| Email              | `company_email`     |
| Phone              | `company_phone`     |

Update them under **Polski > Setup wizard > Business data**.

## Configuration

Go to **Polski > Modules** and enable "Business identification". There is no dedicated settings screen. Rendering is controlled per-usage via shortcode attributes or Gutenberg block settings.

## Shortcode

```
[polski_business_info]
[polski_business_info format="inline" separator=" - " show_regon="1" show_label="0"]
```

| Attribute   | Default  | Values                | Description                                                           |
| ----------- | -------- | --------------------- | --------------------------------------------------------------------- |
| `format`    | `block`  | `block`, `inline`     | Block format = one line per field in `<div>`. Inline = single `<span>`|
| `separator` | ` \| `   | any string            | Separator used in `inline` format between fields                      |
| `show_label`| `1`      | `1`, `0`              | Whether to prefix NIP / REGON with "NIP:" / "REGON:"                  |
| `show_regon`| `0`      | `1`, `0`              | Whether to render the REGON line (many shops keep it hidden)          |

## Gutenberg block

Block name: `polski/business-info`. Category: Widgets. Supports wide/full alignment. Attributes match the shortcode. Rendering is dynamic (server-side render_callback), so updating business data in the wizard propagates without re-saving the page.

## Email signature

Email templates can reuse the shortcode through WooCommerce filters:

```php
add_filter('woocommerce_email_footer_text', function (string $text): string {
    return do_shortcode('[polski_business_info format="inline"]');
});
```

## Email obfuscation

The email address is wrapped in `antispambot()` before rendering, so crawlers see an HTML-entity encoded version instead of a parseable `mailto`.

## Permissions

- Reading: public (shortcode / block are frontend-safe)
- Editing the source data: `manage_options` (setup wizard)

## Limitations

- Only one business entity - no multi-brand or per-language override
- No structured-data output (schema.org/Organization) yet - planned for 2.2.0
- Phone is rendered as plain text, not `tel:` (avoids unintended click-to-dial on desktop)
- No per-country conditional rendering (the same data is shown to all visitors)
