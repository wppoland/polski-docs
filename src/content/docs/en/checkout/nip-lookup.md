---
title: NIP at checkout
description: NIP number validation with checksum, verification in the GUS REGON API and automatic company data retrieval on the WooCommerce checkout page.
---

Business customers need a NIP field at checkout to receive a VAT invoice. Polski for WooCommerce adds a NIP field with checksum validation and GUS REGON verification. Company data fills in automatically.

## Features

The NIP module verifies the number at three levels:

1. **Format validation** - checking that the number consists of 10 digits
2. **Checksum validation** - NIP check digit verification algorithm
3. **GUS REGON verification** - checking in the Central Statistical Office database with automatic company data retrieval

## Configuration

Go to **WooCommerce > Settings > Polski > Checkout** and configure the "NIP" section.

### Basic settings

| Setting | Default value | Description |
|---------|---------------|-------------|
| Enable NIP field | Yes | Adds NIP field to the checkout page |
| Field required | No | Whether NIP is mandatory |
| Field position | After company field | Where to display the NIP field |
| Checksum validation | Yes | Checks NIP number correctness |
| GUS REGON verification | No | Verifies NIP in the GUS database |
| Automatic completion | Yes | Retrieves company data from GUS |

### Conditional display

The NIP field can be displayed:

- **Always** - visible to all customers
- **After checking "I want an invoice"** - appears after checking
- **After entering a company name** - appears when the "Company" field is filled

The recommended option is displaying after checking "I want an invoice" - this is the clearest for the customer.

## Checksum validation

The NIP validation algorithm is based on a weight system. The check digit (last, tenth digit) is calculated based on the nine preceding digits.

### Algorithm

Weights for consecutive NIP digits: `6, 5, 7, 2, 3, 4, 5, 6, 7`

```
NIP: 1234567890
Sum = 1*6 + 2*5 + 3*7 + 4*2 + 5*3 + 6*4 + 7*5 + 8*6 + 9*7 = 214
Remainder = 214 mod 11
If remainder == last NIP digit -> NIP is valid
```

The plugin validates both client-side (JavaScript) and server-side (PHP). Server-side validation is always active.

### Input format handling

The plugin accepts NIP in various formats:

- `1234567890` - digits only
- `123-456-78-90` - with hyphens
- `123 456 78 90` - with spaces
- `PL1234567890` - with country prefix

All formats are normalized to 10 digits before validation.

## GUS REGON verification

### API configuration

The GUS REGON API requires an access key. The plugin supports two environments:

| Environment | URL | Key | Use |
|-------------|-----|-----|-----|
| Test | `https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnwordbir.svc` | `abcde12345abcde12345` (public test key) | Development and testing |
| Production | `https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnetrzny.svc` | Your own key from GUS | Live store |

### Obtaining a production key

1. Go to: https://api.stat.gov.pl/Home/BirIndex
2. Register and log in
3. Submit a request for REGON API access
4. The key will be sent to the provided email address (wait time: 1-3 business days)

### Plugin configuration

1. Go to **WooCommerce > Settings > Polski > Checkout > NIP**
2. Enable **GUS REGON verification**
3. Select environment: **Test** or **Production**
4. Paste the API key (for the production environment)
5. Save settings

### Test mode

In test mode, the plugin uses the public GUS test key. The test database contains fictitious data. Use it only during development and testing.

## Automatic company data retrieval

After verifying NIP in GUS REGON, the plugin automatically completes form fields:

| WooCommerce field | GUS data |
|-------------------|----------|
| Company | Company name |
| Address 1 | Street and number |
| City | City |
| Postal code | Postal code |
| State/Province | Province |

The customer sees the completed data and can correct them before placing the order.

### Auto-completion behavior

- Fields are completed only if they are empty or contain previously retrieved GUS data
- If the customer manually changed the data, the plugin does not overwrite changes
- The customer is informed with a message about the data retrieval

## NIP storage

The NIP number is saved as order metadata:

- key: `_billing_nip`
- visible in the admin panel order view
- available in email templates
- exportable in reports

### Displaying NIP in the order

NIP is automatically displayed:

- in order details (admin panel)
- in the order confirmation email
- on the "My Account > Orders" page

## Programmatic access

### Getting NIP from an order

```php
$order = wc_get_order($order_id);
$nip = $order->get_meta('_billing_nip');
```

### NIP validation in PHP

```php
function validate_nip(string $nip): bool {
    $nip = preg_replace('/[^0-9]/', '', $nip);

    if (strlen($nip) !== 10) {
        return false;
    }

    $weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    $sum = 0;

    for ($i = 0; $i < 9; $i++) {
        $sum += (int) $nip[$i] * $weights[$i];
    }

    return ($sum % 11) === (int) $nip[9];
}
```

### Validation hook

```php
add_filter('polski/checkout/validate_nip', function (bool $is_valid, string $nip): bool {
    // Additional validation logic
    // e.g. checking against a blocked NIP list
    $blocked_nips = ['0000000000'];

    if (in_array($nip, $blocked_nips, true)) {
        return false;
    }

    return $is_valid;
}, 10, 2);
```

## Common issues

### GUS verification returns an error

1. Check that the API key is correct and active
2. Verify that the server can establish an HTTPS connection to api.stat.gov.pl
3. The GUS API can be unavailable - the plugin handles timeouts and displays an appropriate message
4. Make sure the PHP SOAP extension is installed on the server

### NIP field does not display

1. Check that the NIP module is enabled
2. Verify the conditional display setting
3. Clear cache (caching plugins may cache the checkout form)

### Company data does not auto-complete

1. Check the browser console for AJAX errors
2. Verify that the plugin REST API endpoint is accessible
3. Make sure the NIP is correct and the company exists in the GUS database

## Related resources

- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
