---
title: DPD Polska Integration
description: DPD Polska integration module in Polski PRO for WooCommerce - generate labels, track shipments and DPD Pickup points.
---

The DPD module integrates WooCommerce with the DPD Polska API. Generate shipping labels, track shipments and let customers choose a DPD Pickup point.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. An active login and password for the DPD Web Service API are also required.
:::

## Configuration

Go to **WooCommerce > Settings > Polski PRO > Shipping**.

### API authentication

| Setting | Description |
|------------|------|
| DPD login | Login for the DPD Web Service API |
| DPD password | Password for the DPD Web Service API |
| Master FID | Sender FID number (DPD customer identifier) |

You can obtain the access credentials from the DPD customer panel or from your account manager.

### Enabling the module

1. Go to **Polski PRO > Modules**
2. Enable the **DPD Polska** module
3. Fill in the API credentials in the shipping settings

## Generating labels

You generate labels from the order editor:

1. Open an order in **WooCommerce > Orders**
2. In the **Shipment Tracking** section, select the **DPD** carrier
3. Click **Generate label**
4. The system creates a shipment through the DPD SOAP API and returns a waybill number

The label is assigned to the order automatically. The tracking number and tracking link are shown in the order panel and in the email to the customer.

### Shipment data

The module automatically retrieves from the order:

- Recipient first and last name / company name
- Delivery address (street, city, postal code)
- Phone and email
- Weight (from product data or default)

### Bulk generation

Select multiple orders in the list and use the **Generate DPD labels** bulk action to process several orders at once.

## DPD Pickup points

The module lets you search for DPD Pickup points near the customer:

- Search by city
- Search by GPS coordinates (5 km radius)
- Returned data: name, address, postal code, coordinates

## Shipment tracking

After a label is generated, the tracking number is saved automatically in the order. The DPD tracking link is generated automatically.

The customer receives an email with the tracking number and link when the order status changes to **Shipped**.

## Error codes

| Code | Description | Solution |
|-----|------|-------------|
| HTTP 401 | Invalid login credentials | Check the login and password in the settings |
| HTTP 500 | DPD server error | Try again in a few minutes |
| Validation error | Invalid address data | Check the postal code format (XX-XXX) |

## Filters and actions

```php
// Filter shipment data before sending it to DPD
add_filter('polski_pro/shipping/dpd/parcel_data', function (array $data, WC_Order $order): array {
    $data['weight'] = 2.5; // Set a fixed weight
    return $data;
}, 10, 2);
```
