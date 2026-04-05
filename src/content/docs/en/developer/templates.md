---
title: Template overrides
description: Overriding Polski for WooCommerce templates in your theme - file list, directory structure and examples.
---

Polski for WooCommerce uses a template system modeled after WooCommerce. You can override any plugin template by copying it to the `yourtheme/polski/` directory in your theme.

## How to override a template

1. Find the original template in the plugin directory: `wp-content/plugins/polski/templates/`
2. Copy the file to your theme directory: `wp-content/themes/your-theme/polski/`
3. Preserve the subdirectory structure
4. Modify the copied file

The plugin will automatically detect the template in your theme and use it instead of the default.

**Example:** to override the Omnibus price template, copy:

```
wp-content/plugins/polski/templates/omnibus/price-display.php
```

to:

```
wp-content/themes/your-theme/polski/omnibus/price-display.php
```

## Child theme

If you use a child theme, place templates in the child theme directory. The plugin searches for templates in the following order:

1. `wp-content/themes/child-theme/polski/`
2. `wp-content/themes/parent-theme/polski/`
3. `wp-content/plugins/polski/templates/`

## Template list

### Legal compliance

| Template file                            | Description                             |
| ---------------------------------------- | --------------------------------------- |
| `omnibus/price-display.php`              | Omnibus price display                   |
| `omnibus/price-history.php`              | Price history (table)                   |
| `gpsr/product-info.php`                  | GPSR information on product page        |
| `gpsr/safety-sheet.php`                  | Product safety data sheet               |
| `withdrawal/form.php`                    | Contract withdrawal form                |
| `withdrawal/confirmation.php`            | Withdrawal submission confirmation      |
| `withdrawal/email.php`                   | Confirmation email template             |
| `dsa/report-form.php`                    | DSA report form                         |
| `dsa/report-confirmation.php`            | DSA report confirmation                 |
| `gdpr/consent-checkboxes.php`            | GDPR consent checkboxes                 |
| `ksef/invoice-template.php`              | KSeF invoice template                   |
| `greenwashing/product-claims.php`        | Product environmental claims            |
| `legal-pages/terms-template.php`         | Store terms and conditions template     |
| `legal-pages/privacy-template.php`       | Privacy policy template                 |
| `legal-pages/withdrawal-template.php`    | Withdrawal information template         |

### Prices and product information

| Template file                            | Description                             |
| ---------------------------------------- | --------------------------------------- |
| `prices/unit-price.php`                  | Unit price                              |
| `prices/vat-notice.php`                  | VAT and delivery information            |
| `prices/delivery-time.php`               | Estimated delivery time                 |
| `manufacturer/info.php`                  | Manufacturer information                |
| `manufacturer/logo.php`                  | Manufacturer logo                       |

### Food products

| Template file                            | Description                             |
| ---------------------------------------- | --------------------------------------- |
| `food/nutrients-table.php`               | Nutrition facts table                   |
| `food/allergens-list.php`                | Allergens list                          |
| `food/nutri-score.php`                   | Nutri-Score badge                       |

### Checkout and orders

| Template file                            | Description                             |
| ---------------------------------------- | --------------------------------------- |
| `checkout/button-label.php`              | Order button label                      |
| `checkout/legal-checkboxes.php`          | Legal checkboxes at checkout            |
| `checkout/nip-field.php`                 | NIP field with auto-completion          |
| `checkout/doi-notice.php`                | Double opt-in message                   |

### Storefront modules

| Template file                            | Description                             |
| ---------------------------------------- | --------------------------------------- |
| `wishlist/table.php`                     | Wishlist table                          |
| `wishlist/button.php`                    | Add to list button                      |
| `wishlist/header-icon.php`               | Header icon                             |
| `compare/table.php`                      | Comparison table                        |
| `compare/button.php`                     | Compare button                          |
| `compare/floating-bar.php`               | Comparison bar (bottom of screen)       |
| `quick-view/modal.php`                   | Quick view lightbox window              |
| `quick-view/button.php`                  | Quick view button                       |
| `ajax-search/form.php`                   | AJAX search field                       |
| `ajax-search/results.php`               | Search results dropdown                 |
| `ajax-search/result-item.php`           | Single search result                    |
| `ajax-filters/container.php`            | AJAX filters container                  |
| `ajax-filters/filter-category.php`      | Category filter                         |
| `ajax-filters/filter-price.php`         | Price filter (slider)                   |
| `ajax-filters/filter-attribute.php`     | Attribute filter                        |
| `ajax-filters/active-filters.php`       | Active filters bar                      |
| `product-slider/slider.php`             | Slider container                        |
| `product-slider/item.php`               | Product card in slider                  |
| `badges/badge.php`                       | Single badge                            |
| `badges/container.php`                   | Badge container on product              |
| `waitlist/form.php`                      | Waitlist form                           |
| `waitlist/email.php`                     | Availability notification email         |

### Tools

| Template file                            | Description                             |
| ---------------------------------------- | --------------------------------------- |
| `tools/compliance-checklist.php`         | Compliance checklist                    |
| `tools/audit-report.php`                | Audit report                            |
| `tools/security-incident-form.php`      | Security incident form                  |
| `tools/verified-review-badge.php`       | Verified review badge                   |

## Available variables in templates

Each template receives a set of variables. Example for `omnibus/price-display.php`:

```php
<?php
/**
 * Omnibus price display template
 *
 * Available variables:
 * @var float  $lowest_price  Lowest price from the period
 * @var int    $days          Number of days
 * @var int    $product_id    Product ID
 * @var string $price_html    Formatted price HTML
 * @var string $date          Lowest price date
 *
 * @package Polski
 */

defined('ABSPATH') || exit;
?>

<div class="polski-omnibus-price">
    <span class="polski-omnibus-label">
        <?php printf(
            esc_html__('Lowest price from %d days before the discount:', 'polski'),
            $days
        ); ?>
    </span>
    <span class="polski-omnibus-amount">
        <?php echo wp_kses_post($price_html); ?>
    </span>
</div>
```

## Checking template version

Each template contains a `@version` comment in the header. After updating the plugin, check if your overridden templates need updating.

The plugin displays a warning in the admin panel (**WooCommerce > Status > Polski**) if it detects outdated templates in the theme.

```php
/**
 * @version 1.5.0
 */
```

## Hook for changing template path

If you want to change the default template location in the theme:

```php
add_filter('polski/template/path', function (string $path): string {
    return 'custom-polski-templates/'; // instead of 'polski/'
});
```

Then templates will be searched in: `wp-content/themes/your-theme/custom-polski-templates/`

## Debugging templates

To check which template is currently being loaded, enable debug mode:

```php
// In wp-config.php
define('POLSKI_TEMPLATE_DEBUG', true);
```

In debug mode, each template is surrounded by HTML comments indicating the path:

```html
<!-- polski template: /themes/your-theme/polski/omnibus/price-display.php -->
...
<!-- /polski template -->
```

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
