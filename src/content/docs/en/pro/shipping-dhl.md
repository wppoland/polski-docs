---
title: DHL Parcel Poland Integration
description: DHL Parcel Poland integration module in Polski PRO for WooCommerce - generate labels, track shipments and search for ServicePoint locations.
---

The DHL module integrates WooCommerce with the DHL Parcel Poland REST API. Generate labels, track shipments and offer ServicePoint locations at checkout.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. A DHL API key and DHL account number are also required.
:::

## Configuration

Go to **WooCommerce > Settings > Polski PRO > Shipping**.

### API authentication

| Setting | Description |
|------------|------|
| DHL API key | Bearer token from the DHL Developer Portal |
| DHL account number | DHL Parcel Poland customer account number |

You can obtain the API key by registering at [developer.dhl.com](https://developer.dhl.com) and creating an application with access to the DHL Parcel Poland API.

### Enabling the module

1. Go to **Polski PRO > Modules**
2. Enable the **DHL Parcel Poland** module
3. Fill in the API key and account number in the shipping settings

## Generating labels

You generate labels from the order editor:

1. Open an order in **WooCommerce > Orders**
2. In the **Shipment Tracking** section, select the **DHL** carrier
3. Click **Generate label**
4. The system creates a shipment through the DHL REST API and returns a tracking number plus a link to the PDF label

### Service types

| Type | Description |
|-----|------|
| AH | Standard delivery to an address (default) |
| AP | Delivery to a DHL ServicePoint / parcel locker |

For AP (ServicePoint) services, you must provide the pickup point ID.

### Shipment data

The module automatically retrieves the recipient details and product weight from the order. Default parcel dimensions: 40x30x20 cm.

## DHL ServicePoint

The module lets you search for ServicePoint locations (DHL POPs and parcel lockers):

- Search by city
- Search by GPS coordinates (5 km radius)
- Returned data: name, address, type (POP/parcel locker), coordinates

## Shipment tracking

After a label is generated, the tracking number is saved automatically. The DHL tracking link is generated in the following format:

```
https://www.dhl.com/pl-pl/home/sledzenie-przesylek.html?tracking-id={number}
```

The customer receives an email with the tracking number when the status changes to **Shipped**.

## Error codes

| Code | Description | Solution |
|-----|------|-------------|
| HTTP 401 | Invalid API key | Check the Bearer token in the settings |
| HTTP 400 | Invalid shipment data | Check the address, postal code and account number |
| HTTP 429 | API request limit | Wait a moment and try again |

## Filters and actions

```php
// Filter shipment data before sending it to DHL
add_filter('polski_pro/shipping/dhl/parcel_data', function (array $data, WC_Order $order): array {
    $data['service_type'] = 'AP'; // Force delivery to a ServicePoint
    $data['servicepoint_id'] = 'PL-12345';
    return $data;
}, 10, 2);
```
