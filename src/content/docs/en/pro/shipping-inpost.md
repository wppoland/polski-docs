---
title: InPost integration (Paczkomaty)
description: Polski PRO for WooCommerce InPost ShipX API integration module - Paczkomaty, label generation, pickup point map and shipment tracking.
---

The InPost module integrates WooCommerce with the ShipX API. Generate labels, let customers choose a Paczkomat on the map and track shipments from the admin panel.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Additionally, an active InPost ShipX API token is required (obtained from the InPost Manager panel).
:::

## Configuration

Go to **WooCommerce > Settings > Polski PRO > InPost**.

### API authentication

| Setting | Description |
|---------|-------------|
| API token | Authorization token from the InPost Manager panel |
| Organization ID | Organization identifier in the InPost system |
| Sandbox mode | Uses the ShipX API test environment |

The API token is passed in the `Authorization: Bearer {token}` header with every ShipX API request. The token should have permissions for creating shipments and generating labels.

### Shipping method settings

After configuring the API, create a new shipping method:

1. Go to **WooCommerce > Settings > Shipping > Shipping zones**
2. Edit the "Poland" zone
3. Click "Add shipping method"
4. Select "InPost Paczkomat" or "InPost Courier"

| Method setting | Default value | Description |
|----------------|---------------|-------------|
| Method title | "InPost Paczkomat" | Name displayed to the customer |
| Cost | 0 | Shipping cost (0 = free) |
| Free shipping from | "" | Order amount from which shipping is free |
| Default parcel size | A | Size: `A`, `B`, `C` |
| Insurance | No | Add insurance to the shipment |

## Pickup point map

### Map widget

On the checkout page, after selecting the "InPost Paczkomat" shipping method, an interactive map widget is displayed allowing the customer to select a Paczkomat.

The widget offers:

- **Map** with Paczkomat pins
- **City search** - type a city name to center the map
- **Coordinate search** - automatic geolocation (with user consent)
- **Postal code search** - find nearest Paczkomaty
- **Paczkomat list** - sorted from nearest
- **Point details** - address, opening hours, available locker sizes

### City search

The widget sends a request to the ShipX API endpoint:

```
GET /v1/points?type=parcel_locker&city={city}&per_page=25
```

Results are cached for 24 hours in WordPress transients to minimize the number of API requests.

### Coordinate search

When the customer consents to geolocation:

```
GET /v1/points?type=parcel_locker&relative_point={lat},{lng}&per_page=10
```

### Point filtering

```php
/**
 * Filtruje listę punktów odbioru InPost.
 *
 * @param array  $points  Tablica punktów odbioru z API
 * @param string $city    Wyszukiwane miasto
 * @param array  $coords  Współrzędne [lat, lng] lub pusta tablica
 */
apply_filters('polski_pro/inpost/points', array $points, string $city, array $coords): array;
```

**Example - excluding temporarily unavailable points:**

```php
add_filter('polski_pro/inpost/points', function (array $points, string $city, array $coords): array {
    $excluded_points = ['KRA123', 'WAW456']; // Tymczasowo wyłączone
    return array_filter($points, function (array $point) use ($excluded_points): bool {
        return ! in_array($point['name'], $excluded_points, true);
    });
}, 10, 3);
```

## Label generation

### From the order panel

On the order edit page, the **InPost** panel provides the following options:

1. **Generate label** - creates a shipment in the ShipX API and generates a PDF label
2. **Download label** - downloads the generated label
3. **Print label** - opens a print preview

### Bulk generation

On the orders list, select multiple orders and choose the bulk action "Generate InPost labels". Labels are generated asynchronously - after completion, a notification with a link to download the ZIP file appears.

### Shipment data

The label is generated based on:

| Field | Source | Description |
|-------|--------|-------------|
| Sender | Store settings | Address and company data from WooCommerce |
| Recipient | Order data | First name, last name, phone, email |
| Pickup point | Customer selection | Paczkomat ID selected at checkout |
| Parcel size | Method setting | Or override in the order |
| COD amount | COD order | Only for cash on delivery orders |

### Label generation hook

```php
/**
 * Filtruje dane przesyłki przed wysłaniem do API ShipX.
 *
 * @param array     $shipment_data Dane przesyłki
 * @param \WC_Order $order         Zamówienie WooCommerce
 */
apply_filters('polski_pro/inpost/shipment_data', array $shipment_data, \WC_Order $order): array;
```

**Example - adding order reference:**

```php
add_filter('polski_pro/inpost/shipment_data', function (array $shipment_data, \WC_Order $order): array {
    $shipment_data['reference'] = sprintf('ORDER-%s', $order->get_order_number());
    return $shipment_data;
}, 10, 2);
```

## Shipment tracking

### Automatic tracking

After a label is generated, the module automatically checks the shipment status every 2 hours (WP-Cron). Statuses are mapped to WooCommerce order statuses:

| InPost status | WooCommerce status | Description |
|---------------|-------------------|-------------|
| `created` | `processing` | Shipment created |
| `dispatched_by_sender` | `processing` | Dispatched by sender |
| `collected_from_sender` | `shipped` | Collected from sender |
| `out_for_delivery` | `shipped` | Out for delivery |
| `ready_to_pickup` | `shipped` | Ready for pickup at Paczkomat |
| `delivered` | `completed` | Delivered / picked up |

### Customer notifications

The customer receives an email with a tracking link to the InPost tracking page. The tracking link is added to:

- "Order processing" email
- "My Account > Orders > Details" page
- Order notes (visible to the customer)

### Tracking hook

```php
/**
 * Akcja wywoływana po aktualizacji statusu przesyłki.
 *
 * @param int      $order_id      ID zamówienia
 * @param string   $tracking_number Numer śledzenia
 * @param string   $old_status    Poprzedni status InPost
 * @param string   $new_status    Nowy status InPost
 */
do_action('polski_pro/inpost/status_updated', int $order_id, string $tracking_number, string $old_status, string $new_status);
```

**Example - SMS notification about pickup readiness:**

```php
add_action('polski_pro/inpost/status_updated', function (
    int $order_id,
    string $tracking_number,
    string $old_status,
    string $new_status
): void {
    if ($new_status === 'ready_to_pickup') {
        $order = wc_get_order($order_id);
        $phone = $order->get_billing_phone();
        send_sms($phone, sprintf(
            'Twoja paczka %s czeka w Paczkomacie. Kod odbioru w e-mailu.',
            $tracking_number
        ));
    }
}, 10, 4);
```

## Parcel sizes

| Size | Dimensions (cm) | Max weight |
|------|-----------------|------------|
| A | 8 x 38 x 64 | 25 kg |
| B | 19 x 38 x 64 | 25 kg |
| C | 41 x 38 x 64 | 25 kg |

The parcel size can be set globally, per shipping method or overridden manually in the order.

## Troubleshooting

**Paczkomat map does not load**
Check if the API token is valid and active. Check the browser console for CORS or JavaScript errors. Make sure the `polski-pro-inpost-map.js` script is loaded.

**Label generation error "Unauthorized"**
The API token has expired or does not have permissions for creating shipments. Generate a new token in the InPost Manager panel.

**Shipment status does not update**
Check if WP-Cron is working properly. Run manually: `wp cron event run polski_pro_inpost_tracking`.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- ShipX API documentation: [https://docs.inpost24.com/](https://docs.inpost24.com/)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
