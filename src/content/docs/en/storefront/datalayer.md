---
title: GA4 DataLayer / GTM
description: The GA4 DataLayer module in Polski for WooCommerce - ecommerce events, integration with Google Tag Manager and gtag.js, measurement configuration.
---

The DataLayer module automatically sends GA4 ecommerce events to the data layer (dataLayer). It supports both Google Tag Manager (GTM) and direct gtag.js integration. Scripts are loaded with the `defer` attribute for minimal impact on Web Vitals.

## Enabling the module

Go to **WooCommerce > Polski > Storefront modules** and enable **GA4 DataLayer / GTM** (module ID: `datalayer`).

## Configuration

The module settings are stored in the `polski_datalayer` option. Go to **WooCommerce > Polski > Storefront modules > GA4 DataLayer / GTM**.

### Available settings

| Setting                | Format          | Description                                             |
| ---------------------- | --------------- | ------------------------------------------------------- |
| `gtm_container_id`     | `GTM-XXXXXXX`  | Google Tag Manager container identifier                  |
| `ga4_measurement_id`   | `G-XXXXXXXXXX` | GA4 measurement identifier (for gtag.js mode)           |
| `use_sku_as_id`        | boolean         | Use the SKU instead of the product ID as `item_id`      |

### Operating modes

**Google Tag Manager** - enter `gtm_container_id`. The module injects the GTM container snippet (a script in `<head>` and a noscript in `<body>`). Ecommerce events go to `window.dataLayer`.

**gtag.js** - enter `ga4_measurement_id` (without GTM). The module loads the gtag.js script directly from Google and sends events via `gtag('event', ...)`.

You can use both modes at the same time, then events go both to the dataLayer (GTM) and directly to GA4.

## Ecommerce events

The module sends the following events compliant with the GA4 Enhanced Ecommerce specification:

### view_item_list

A product list view (category page, search results, shop page).

```javascript
dataLayer.push({
  event: 'view_item_list',
  ecommerce: {
    item_list_id: 'category_koszulki',
    item_list_name: 'Koszulki',
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Koszulka polo',
        item_category: 'Koszulki',
        price: 89.99,
        index: 0
      }
    ]
  }
});
```

### view_item

A single product page view.

```javascript
dataLayer.push({
  event: 'view_item',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Koszulka polo',
        item_category: 'Koszulki',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### add_to_cart

Adding a product to the cart. The event is sent via AJAX after clicking the **Add to cart** button (both on the product page and in the list).

```javascript
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Koszulka polo',
        item_category: 'Koszulki',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### remove_from_cart

Removing a product from the cart.

```javascript
dataLayer.push({
  event: 'remove_from_cart',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Koszulka polo',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### begin_checkout

The start of the checkout process (landing on the checkout page).

```javascript
dataLayer.push({
  event: 'begin_checkout',
  ecommerce: {
    currency: 'PLN',
    value: 179.98,
    items: [/* products from the cart */]
  }
});
```

### purchase

Order completion (thank you page). The event is sent only once per order (protected by a cookie).

```javascript
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: '12345',
    currency: 'PLN',
    value: 179.98,
    tax: 33.55,
    shipping: 9.99,
    items: [/* products from the order */]
  }
});
```

## GTM container snippet

After entering `gtm_container_id`, the module automatically injects the GTM container code:

**In the `<head>` section** (hook `wp_head`, priority 1):

```html
<script defer>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
```

**After the opening `<body>`** (hook `wp_body_open`):

```html
<noscript>
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

## Performance and Web Vitals

The module is optimized for Core Web Vitals:

- **Defer** - the GTM and gtag.js scripts are loaded with the `defer` attribute, they do not block page rendering
- **Inline dataLayer** - ecommerce data is injected as inline JSON, without additional HTTP requests
- **Lazy events** - the `add_to_cart` and `remove_from_cart` events are registered through event delegation (a single listener on the document)
- **No layout shift** - the GTM noscript snippet has zero dimensions, it does not cause CLS

## Product identifier

By default the WooCommerce product ID (post ID) is used as `item_id`. Enable the **Use SKU as ID** option (`use_sku_as_id`) to send the product SKU instead.

When a product has no SKU assigned, the module uses the product ID as a fallback.

## Variable product data

For variable products the module sends the data of the selected variation:

- `item_id` - the variation SKU (or variation ID)
- `item_variant` - the name of the selected attributes (e.g. "Red / XL")
- `price` - the variation price

## Hooks

```php
// Modify the product data before sending it to the dataLayer
add_filter('polski/datalayer/item_data', function (array $item_data, \WC_Product $product): array {
    $item_data['item_brand'] = $product->get_attribute('marka');
    return $item_data;
}, 10, 2);

// Disable a specific event
add_filter('polski/datalayer/event_enabled', function (bool $enabled, string $event_name): bool {
    if ($event_name === 'view_item_list') {
        return false;
    }
    return $enabled;
}, 10, 2);

// Modify the data of the purchase event
add_filter('polski/datalayer/purchase_data', function (array $data, \WC_Order $order): array {
    $data['ecommerce']['coupon'] = implode(',', $order->get_coupon_codes());
    return $data;
}, 10, 2);
```

## Debugging

### GTM preview mode

Use [Tag Assistant](https://tagassistant.google.com/) to preview events in real time. Open Tag Assistant, connect to the store domain and go through the entire purchase process.

### Browser console

Check the dataLayer contents in the console:

```javascript
console.table(window.dataLayer);
```

### GA4 DebugView

In Google Analytics 4 go to **Admin > DebugView** to see real-time events from a device with debug mode enabled.

## Troubleshooting

**The purchase event does not fire** - check whether the thank you page is cached. Disable caching for the `order-received` endpoint.

**No add_to_cart events** - make sure WooCommerce AJAX works correctly. Check the browser console for JavaScript errors.

**Duplicate purchase events** - the module sets a `polski_datalayer_order_{id}` cookie after sending the event. If the cookie is blocked, the event may repeat.

**The GTM snippet does not load** - check whether the theme calls `wp_head()` and `wp_body_open()`.

Reporting issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
