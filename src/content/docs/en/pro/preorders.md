---
title: Pre-orders
description: Polski PRO for WooCommerce pre-order module - marking products as pre-order, release date, custom button text and cart validation.
---

The pre-order module allows marking products as available for pre-order, displaying the release date, changing the purchase button text and controlling the mixing of pre-order products with standard ones in the cart. It is useful for stores selling electronics, books, games and any inventory where products are offered before the official availability date.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Global configuration

Go to **WooCommerce > Settings > Polski PRO > Pre-orders**.

| Setting | Default value | Description |
|---------|---------------|-------------|
| Button text | "Zamów w przedsprzedaży" | Global button text for pre-order products |
| Availability text | "Dostępne od {date}" | Template text displayed instead of stock status |
| Date format | `d.m.Y` | Display format for the release date |
| Block mixed cart | Yes | Prevents adding standard products to a cart with pre-orders |
| Block message | "Produkty w przedsprzedaży muszą być zamawiane osobno." | Message displayed when attempting to mix |

## Product configuration

### Meta fields

Pre-order settings are located in the product editor, in the **General** tab of the product data panel.

| Meta field | Key | Type | Description |
|------------|-----|------|-------------|
| Enable pre-order | `_polski_preorder_enabled` | `bool` | Marks the product as pre-order |
| Release date | `_polski_preorder_release_date` | `string` (Y-m-d) | Date from which the product is available as standard |
| Button text | `_polski_preorder_button_text` | `string` | Overrides the global button text for this product |
| Availability text | `_polski_preorder_availability_text` | `string` | Overrides the global availability text |

### Setting via WP-CLI

```bash
wp post meta update 123 _polski_preorder_enabled "yes"
wp post meta update 123 _polski_preorder_release_date "2026-06-15"
wp post meta update 123 _polski_preorder_button_text "Zamów teraz - premiera 15 czerwca"
```

### Programmatic setting

```php
update_post_meta($product_id, '_polski_preorder_enabled', 'yes');
update_post_meta($product_id, '_polski_preorder_release_date', '2026-06-15');
```

## Frontend display

### Purchase button

When a product is marked as pre-order, the "Add to cart" button text changes to the configured pre-order text. This applies to:

- Single product page
- Archive, category and tag pages
- Search results
- WooCommerce blocks (Product Grid, Product Collection)

### Availability text

Instead of the standard stock status ("In stock", "Out of stock"), the availability text with the release date is displayed. The `{date}` placeholder is replaced with the formatted date.

**Display example:**

> Dostępne od 15.06.2026

### Automatic deactivation

After the release date passes, the product automatically reverts to standard mode. Deactivation is handled by a WP-Cron task that runs daily at 00:01.

```php
/**
 * Akcja wywoływana po automatycznej dezaktywacji przedsprzedaży.
 *
 * @param int    $product_id   ID produktu
 * @param string $release_date Data premiery (Y-m-d)
 */
do_action('polski_pro/preorder/deactivated', int $product_id, string $release_date);
```

**Example - notifying customers about availability:**

```php
add_action('polski_pro/preorder/deactivated', function (int $product_id, string $release_date): void {
    $subscribers = get_post_meta($product_id, '_polski_preorder_subscribers', true);
    if (is_array($subscribers)) {
        foreach ($subscribers as $email) {
            wp_mail(
                $email,
                'Produkt jest już dostępny!',
                sprintf('Produkt %s jest teraz dostępny do zakupu.', get_the_title($product_id))
            );
        }
    }
}, 10, 2);
```

## Cart validation

### Mixed product blocking

When the "Block mixed cart" option is enabled, the customer cannot add to the cart simultaneously:

- Pre-order products and standard products
- Pre-order products with different release dates (optionally)

When attempting to add a different product type, the block message is displayed and the product is not added.

### Validation hook

```php
/**
 * Filtruje, czy koszyk może zawierać mieszane typy produktów.
 *
 * @param bool $allow       Czy pozwolić na mieszanie (domyślnie false)
 * @param int  $product_id  ID dodawanego produktu
 * @param array $cart_items  Aktualne produkty w koszyku
 */
apply_filters('polski_pro/preorder/allow_mixed_cart', bool $allow, int $product_id, array $cart_items): bool;
```

**Example - allowing mixing for VIP users:**

```php
add_filter('polski_pro/preorder/allow_mixed_cart', function (bool $allow, int $product_id, array $cart_items): bool {
    if (current_user_can('manage_woocommerce')) {
        return true;
    }
    return $allow;
}, 10, 3);
```

## Shortcode

Displaying a countdown to the release date:

```
[polski_preorder_countdown product_id="123" format="days" label="Do premiery pozostało:"]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `product_id` | No | Product ID (defaults to current) |
| `format` | No | Format: `days`, `full` (days, hours, minutes) |
| `label` | No | Label text before the countdown |

## Hooks

### Button text filter

```php
/**
 * Filtruje tekst przycisku przedsprzedaży.
 *
 * @param string      $text    Tekst przycisku
 * @param \WC_Product $product Obiekt produktu
 */
apply_filters('polski_pro/preorder/button_text', string $text, \WC_Product $product): string;
```

**Example - dynamic text with price:**

```php
add_filter('polski_pro/preorder/button_text', function (string $text, \WC_Product $product): string {
    return sprintf('Zamów za %s - premiera wkrótce', $product->get_price_html());
}, 10, 2);
```

### Availability text filter

```php
/**
 * Filtruje tekst dostępności przedsprzedaży.
 *
 * @param string      $text         Tekst dostępności
 * @param string      $release_date Data premiery (Y-m-d)
 * @param \WC_Product $product      Obiekt produktu
 */
apply_filters('polski_pro/preorder/availability_text', string $text, string $release_date, \WC_Product $product): string;
```

## Variant compatibility

The pre-order module works with variable products. Each variant can have independent pre-order settings:

- Variant A - standard (available immediately)
- Variant B - pre-order (release in 2 weeks)

Mixing pre-order and standard variants within a single product is allowed - cart validation only applies to mixing different products.

## Troubleshooting

**Product does not switch automatically after the release date**
Check if WP-Cron is working properly. If you use an external CRON, make sure `wp-cron.php` is called regularly. Alternatively, run manually: `wp cron event run polski_pro_preorder_check`.

**Customer added pre-order and regular products to the cart**
Check if the "Block mixed cart" option is enabled. Clear cache if you use caching plugins that cache cart fragments.

**Release date displays in the wrong format**
Check the "Date format" setting in the module configuration. The format uses standard PHP `date()` placeholders.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Related modules: [Bundles and add-ons](/pro/bundles-addons)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
