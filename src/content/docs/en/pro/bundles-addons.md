---
title: Bundles, add-ons and "frequently bought together"
description: Product bundle, product add-on and "frequently bought together" recommendation modules in Polski PRO for WooCommerce.
---

Polski PRO for WooCommerce offers three complementary sales modules: product bundles, product add-ons and "frequently bought together" recommendations. Each module works independently and can be enabled separately.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Product bundles

The bundles module allows creating configurable product sets with a shared discount. The customer purchases a bundle as a single product, and the individual components are visible in the order details.

### Configuration

Go to **WooCommerce > Settings > Polski PRO > Bundles** and enable the module (option `polski_bundles`).

| Setting | Default value | Description |
|---------|---------------|-------------|
| Enable bundles | No | Activates the bundle functionality |
| Discount type | Percent | `percent` (percentage) or `fixed` (fixed amount) |
| Default discount | 10% | Discount applied to new bundles |
| Show savings | Yes | Displays the savings amount to the customer |

### Creating a bundle

1. Go to **Products > Add New**
2. In the **Product data** section, select the "Polski PRO Bundle" type
3. In the **Bundle components** tab, add products
4. Set the quantity for each component
5. Configure the discount (overrides the default)

### Discount calculation

The bundle price is calculated automatically:

```
Cena pakietu = Suma cen składników - Rabat

Przykład (rabat 15%):
Produkt A: 100 zł x 1 = 100 zł
Produkt B:  50 zł x 2 = 100 zł
Suma:                    200 zł
Rabat (15%):              30 zł
Cena pakietu:            170 zł
```

If a bundle component is on sale, the sale price is used in the calculations.

### Bundle shortcode

```
[polski_bundle product_id="456" show_savings="yes" layout="grid"]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `product_id` | Yes | Bundle product ID |
| `show_savings` | No | Display savings amount (`yes`/`no`) |
| `layout` | No | Layout: `grid`, `list`, `compact` |

### Bundle hooks

```php
/**
 * Filtruje obliczoną cenę pakietu.
 *
 * @param float $bundle_price Obliczona cena pakietu
 * @param array $items        Składniki pakietu z cenami
 * @param float $discount     Wartość rabatu
 */
apply_filters('polski_pro/bundles/price', float $bundle_price, array $items, float $discount): float;
```

**Example - minimum bundle price:**

```php
add_filter('polski_pro/bundles/price', function (float $bundle_price, array $items, float $discount): float {
    $minimum_price = 49.99;
    return max($bundle_price, $minimum_price);
}, 10, 3);
```

```php
/**
 * Akcja wywoływana po dodaniu pakietu do koszyka.
 *
 * @param string $cart_item_key Klucz pozycji w koszyku
 * @param int    $bundle_id    ID produktu-pakietu
 * @param array  $items        Składniki pakietu
 */
do_action('polski_pro/bundles/added_to_cart', string $cart_item_key, int $bundle_id, array $items);
```

## Product add-ons

The add-ons module allows displaying optional upsell products directly on the product page. The customer can select additional products and purchase them with a single click alongside the main product.

### Configuration

Go to **WooCommerce > Settings > Polski PRO > Add-ons** and enable the module (option `polski_addons`).

| Setting | Default value | Description |
|---------|---------------|-------------|
| Enable add-ons | No | Activates the add-on functionality |
| Display position | After cart button | Where to display the add-ons section |
| Section heading | "Dodaj do zamówienia" | Heading text above the add-on list |
| Maximum count | 5 | Limit of add-ons displayed per product |

### Assigning add-ons

Add-ons are configured in the product editor, in the **Polski PRO Add-ons** tab:

1. Click "Add add-on"
2. Select a product from the catalog
3. Set the add-on price (defaults to the product price)
4. Optionally set a promotional add-on price
5. Set the display order

Add-ons can have a different price than the source product - this allows offering special "with product" pricing.

### Selection validation

The module validates:

- Stock availability of each selected add-on
- Price correctness (whether they were not modified client-side)
- Quantity limits

### Add-on hooks

```php
/**
 * Filtruje listę dodatków dla produktu.
 *
 * @param array       $addons  Tablica dodatków z cenami
 * @param \WC_Product $product Produkt główny
 */
apply_filters('polski_pro/addons/items', array $addons, \WC_Product $product): array;
```

**Example - filtering add-ons based on user role:**

```php
add_filter('polski_pro/addons/items', function (array $addons, \WC_Product $product): array {
    if (current_user_can('wholesale_customer')) {
        foreach ($addons as &$addon) {
            $addon['price'] = $addon['price'] * 0.8; // 20% rabatu hurtowego
        }
    }
    return $addons;
}, 10, 2);
```

## Frequently bought together

The recommendations module displays products most frequently purchased together with the viewed product, with the ability to add multiple products to the cart with a single click.

### Configuration

Go to **WooCommerce > Settings > Polski PRO > Frequently bought together** and enable the module (option `polski_fbt`).

| Setting | Default value | Description |
|---------|---------------|-------------|
| Enable module | No | Activates recommendations |
| Data source | Manual | `manual` or `auto` (based on order history) |
| Product limit | 3 | Maximum number of recommended products |
| Section heading | "Często kupowane razem" | Section heading text |
| Position | Below short description | Where to display the section |

### Manual assignment

In the product editor, **Frequently bought together** tab:

1. Search and add related products
2. Set the display order
3. Optionally set a discount for purchasing together

### Automatic recommendations

When the data source is set to `auto`, the module analyzes order history and identifies products most frequently purchased together. The analysis runs once daily via WP-Cron.

### Adding to cart

The "Frequently bought together" section displays:

- Checkboxes next to each recommended product
- Thumbnails and product names
- Individual product prices
- Total price of selected products
- "Add all to cart" button

The customer checks the desired products and adds them with a single click. All products are added to the cart as separate items.

### Shortcode

```
[polski_fbt product_id="789" limit="4" show_prices="yes"]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `product_id` | No | Main product ID (defaults to current) |
| `limit` | No | Maximum number of recommendations |
| `show_prices` | No | Display prices (`yes`/`no`) |

### FBT hooks

```php
/**
 * Filtruje listę rekomendowanych produktów.
 *
 * @param array $product_ids Tablica ID rekomendowanych produktów
 * @param int   $product_id  ID produktu głównego
 * @param string $source     Źródło: 'manual' lub 'auto'
 */
apply_filters('polski_pro/fbt/products', array $product_ids, int $product_id, string $source): array;
```

**Example - excluding products from a specific category:**

```php
add_filter('polski_pro/fbt/products', function (array $product_ids, int $product_id, string $source): array {
    $excluded_category_id = 42;
    return array_filter($product_ids, function (int $id) use ($excluded_category_id): bool {
        return ! has_term($excluded_category_id, 'product_cat', $id);
    });
}, 10, 3);
```

## Module interplay

All three modules can work simultaneously on the same product:

- A **bundle** with assigned **add-ons** and a **frequently bought together** section
- Bundle components can have their own add-ons
- FBT recommendations can point to bundles

The display order on the product page is configurable via WooCommerce hook priorities.

## Troubleshooting

**Bundle price does not update after changing component prices**
The bundle price is calculated dynamically. Clear the Object Cache and WooCommerce transients.

**Add-ons do not display on the product page**
Check if the theme supports the `woocommerce_after_add_to_cart_button` hook. Some custom themes skip standard WooCommerce hooks.

**Automatic recommendations are empty**
The module needs historical data - automatic recommendations appear after collecting a sufficient number of orders. Check if the `polski_pro_fbt_analyze` WP-Cron task is scheduled.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Related modules: [Pre-orders](/pro/preorders), [Catalog mode](/pro/catalog-mode)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
