---
title: B2B catalog mode
description: Polski PRO for WooCommerce catalog mode module - hiding prices, blocking purchases, redirecting to quote requests and RFQ module integration.
---

Catalog mode turns the store into a catalog without the ability to purchase. Hide prices, replace buttons with messages or redirect to a quote request. Designed for B2B stores with individual pricing.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Configuration

Go to **WooCommerce > Settings > Polski PRO > Catalog mode** and enable the module (option `polski_catalog`).

### Main settings

| Setting | Database option | Default value | Description |
|---------|----------------|---------------|-------------|
| Enable catalog mode | `polski_catalog` | No | Activates catalog mode |
| Hide prices | `polski_catalog_hide_prices` | Yes | Removes price display |
| Hide cart button | `polski_catalog_hide_cart` | Yes | Removes the "Add to cart" button |
| Price replacement text | `polski_catalog_price_text` | "Zapytaj o cenę" | Text displayed instead of the price |
| Product notice | `polski_catalog_notice` | "" | Notice displayed on the product page |
| Redirect to RFQ | `polski_catalog_redirect_rfq` | No | Redirects to the quote request form |
| Conditional mode | `polski_catalog_conditional` | `all` | `all`, `guests`, `roles` |

### Conditional mode

Catalog mode can be active:

- **For everyone** (`all`) - everyone sees a catalog without prices
- **Only for guests** (`guests`) - logged-in customers see prices and can purchase
- **For selected roles** (`roles`) - catalog active only for selected WordPress roles

The "Only for guests" conditional mode is popular in B2B models where the wholesaler requires account registration before revealing prices.

```php
// Przykład: własna logika warunkowa
add_filter('polski_pro/catalog/is_active', function (bool $is_active): bool {
    // Wyłącz tryb katalogowy dla klientów z co najmniej 5 zamówieniami
    if (is_user_logged_in()) {
        $order_count = wc_get_customer_order_count(get_current_user_id());
        if ($order_count >= 5) {
            return false;
        }
    }
    return $is_active;
});
```

## How it works

### Hiding prices

The module hooks into the `woocommerce_get_price_html` filter and replaces the price HTML with the configured replacement text.

```php
/**
 * Filtruje tekst zastępczy ceny w trybie katalogowym.
 *
 * @param string      $replacement Tekst zastępczy
 * @param \WC_Product $product     Obiekt produktu
 */
apply_filters('polski_pro/catalog/price_replacement', string $replacement, \WC_Product $product): string;
```

**Example - different text for categories:**

```php
add_filter('polski_pro/catalog/price_replacement', function (string $replacement, \WC_Product $product): string {
    if (has_term('premium', 'product_cat', $product->get_id())) {
        return '<span class="price-inquiry">Cena ustalana indywidualnie</span>';
    }
    return $replacement;
}, 10, 2);
```

### Purchase blocking

The module uses the `woocommerce_is_purchasable` filter to block the ability to purchase:

```php
/**
 * Filtruje, czy produkt jest dostępny do zakupu w trybie katalogowym.
 *
 * @param bool        $purchasable Czy produkt jest dostępny do zakupu
 * @param \WC_Product $product     Obiekt produktu
 */
apply_filters('polski_pro/catalog/is_purchasable', bool $purchasable, \WC_Product $product): bool;
```

**Example - allowing purchase of selected products:**

```php
add_filter('polski_pro/catalog/is_purchasable', function (bool $purchasable, \WC_Product $product): bool {
    $always_purchasable = [101, 102, 103]; // ID produktów zawsze dostępnych
    if (in_array($product->get_id(), $always_purchasable, true)) {
        return true;
    }
    return $purchasable;
}, 10, 2);
```

### Product page notice

When the `polski_catalog_notice` option is set, a notice is displayed on the single product page informing the customer about catalog mode.

Example notice:

> To learn the price of this product, contact our sales team or fill out the quote request form.

## Integration with the quote request module

When the `polski_catalog_redirect_rfq` option is enabled, the replacement button on the product page directs to the quote request form ([RFQ module](/pro/quotes)). The integration includes:

1. "Ask for price" button instead of "Add to cart"
2. Automatic passing of product ID to the RFQ form
3. Pre-filling the product name in the form
4. Return to the product after submitting the request

For the integration to work, both modules - catalog and RFQ - must be active.

## Hidden elements

Besides prices and the cart button, the module automatically hides:

| Element | WooCommerce hook | Effect |
|---------|-----------------|--------|
| "Add to cart" button | `woocommerce_is_purchasable` | Product marked as not purchasable |
| Price | `woocommerce_get_price_html` | Price HTML replaced with text |
| Cart icon in header | `polski_pro/catalog/hide_cart_icon` | Hides the mini-cart icon |
| Cart page | `template_redirect` | Redirect from /cart/ to the homepage |
| Checkout page | `template_redirect` | Redirect from /checkout/ to the homepage |

### Selective hiding

Not all elements need to be hidden at once. Each option can be enabled or disabled independently. For example:

- Hide prices but keep the cart button (customer buys at "unknown price" - contact after order)
- Hide the cart button but show prices (customer sees prices but must ask to purchase)
- Hide everything (full catalog mode)

## Excluding products and categories

### Excluding products

Selected products can be excluded from catalog mode in the product editor, **Polski PRO > Catalog mode** tab, by checking the "Exclude from catalog mode" option.

### Excluding categories

```php
/**
 * Filtruje kategorie wykluczone z trybu katalogowego.
 *
 * @param array $excluded_categories Tablica ID kategorii
 */
apply_filters('polski_pro/catalog/excluded_categories', array $excluded_categories): array;
```

**Example:**

```php
add_filter('polski_pro/catalog/excluded_categories', function (array $excluded_categories): array {
    $excluded_categories[] = 15; // "Akcesoria" - zawsze dostępne do zakupu
    $excluded_categories[] = 28; // "Outlet"
    return $excluded_categories;
});
```

## CSS helper classes

The module adds CSS classes to `<body>` to facilitate styling:

| Class | When added |
|-------|-----------|
| `polski-catalog-mode` | Catalog mode is active |
| `polski-catalog-prices-hidden` | Prices are hidden |
| `polski-catalog-cart-hidden` | Cart button is hidden |

**CSS example:**

```css
.polski-catalog-mode .price {
    display: none; /* Dodatkowe ukrycie ceny, jeśli motyw nie respektuje filtra */
}

.polski-catalog-mode .single_add_to_cart_button {
    background-color: #0073aa;
    content: "Zapytaj o cenę";
}
```

## Troubleshooting

**Prices still display despite catalog mode being enabled**
Some themes use non-standard methods to display prices, bypassing the `woocommerce_get_price_html` filter. Use the CSS classes `.polski-catalog-prices-hidden .price { display: none; }` as a safeguard.

**Customer can add product to cart via direct URL**
The module blocks this at the `woocommerce_is_purchasable` filter level. If the issue persists, check whether another plugin is overriding this filter with a higher priority.

**Conditional mode does not work properly with cache**
Caching plugins may serve the cached version regardless of the login state. Configure the caching plugin to separate cache for logged-in and guest users.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Related modules: [Request for quote](/pro/quotes)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
