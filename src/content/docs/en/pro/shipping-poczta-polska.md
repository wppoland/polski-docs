---
title: Poczta Polska Integration (eNadawca)
description: Poczta Polska eNadawca integration module in Polski PRO for WooCommerce - generate labels, track shipments and parcel machines.
---

The Poczta Polska module integrates WooCommerce with the eNadawca API. Generate shipping labels, track shipments and search for parcel machines.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+ with the SOAP extension. A login and password for eNadawca are also required.
:::

## Configuration

Go to **WooCommerce > Settings > Polski PRO > Shipping**.

### Authentication

| Setting | Description |
|------------|------|
| eNadawca login | Login for the eNadawca system |
| eNadawca password | Password for the eNadawca system |
| Environment | Production or Sandbox (test) |

You can obtain the access credentials by registering in the eNadawca system at poczta-polska.pl.

## Available services

| Service type | Description |
|------------|------|
| POCZTEX_KURIER_48 | Pocztex courier - delivery in 48h (default) |
| PACZKA_POCZTOWA_GABARYT_A | Postal parcel size A |

## Generating labels

1. Open an order in **WooCommerce > Orders**
2. In the **Shipment Tracking** section, select the **Poczta Polska** carrier
3. Click **Generate label**
4. The system creates a shipment through the eNadawca SOAP API

Recipient details (name, address, city, postal code, phone, email) are retrieved automatically from the order.

## Shipment tracking

After a label is generated, the tracking number is saved in the order. Tracking link:

```
https://emonitoring.poczta-polska.pl/?numer={number}
```

## Parcel machines

The module lets you search for parcel machines and Poczta Polska branches by city.

## Technical requirements

The module requires the PHP SOAP extension (`ext-soap`). Check whether it is active:

```php
phpinfo(); // Look for the "soap" section
```

Most PHP hosting providers have SOAP enabled by default.
