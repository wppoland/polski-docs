---
title: Accounting integrations
description: Integrations with wFirma, Fakturownia and iFirma accounting systems in Polski PRO for WooCommerce - invoice synchronization, retry logic and per-provider configuration.
---

The accounting integrations module connects WooCommerce with popular Polish invoicing systems: wFirma, Fakturownia and iFirma. Invoices are sent automatically after an order is placed, with a retry mechanism and exponential backoff in case of API errors.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Additionally, an active account in the selected accounting system with API access is required.
:::

## Supported systems

| System | API format | API version | Authentication |
|--------|-----------|-------------|----------------|
| wFirma | XML | v2 | API key + API secret |
| Fakturownia | JSON | v3 | API token |
| iFirma | JSON | v1 | Login + API key (invoice key) |

Only one accounting integration can be active at a time.

## Configuration

Go to **WooCommerce > Settings > Polski PRO > Accounting**.

### Provider selection

Select the accounting system and provide authentication credentials.

#### wFirma

| Setting | Description |
|---------|-------------|
| API key | API key from the wFirma panel |
| API secret | API secret |
| Company ID | Company identifier in wFirma |
| Invoice series | Numbering series (e.g. "FV", "FVS") |

#### Fakturownia

| Setting | Description |
|---------|-------------|
| Subdomain | Subdomain name (e.g. `mojafirma.fakturownia.pl`) |
| API token | API token from account settings |
| Department ID | Optional - ID of the department issuing invoices |
| Invoice language | `pl` or `en` |

#### iFirma

| Setting | Description |
|---------|-------------|
| Login | iFirma account login |
| Invoice API key | API key for issuing invoices |
| Subscriber API key | Subscriber API key (for fetching data) |

### Common settings

| Setting | Default value | Description |
|---------|---------------|-------------|
| Automatic issuing | Yes | Issue invoice automatically after order payment |
| Trigger status | `processing` | Order status that triggers invoice issuance |
| Document type | VAT invoice | VAT invoice, Proforma invoice, Receipt |
| Add to email | Yes | Attach invoice PDF to the order email |
| Retry on error | Yes | Retry on API error |
| Maximum attempts | 5 | Retry attempt limit |

## Invoice synchronization

### Automatic flow

1. WooCommerce order changes status to `processing` (or another configured status)
2. The module collects order data and maps it to the provider format
3. Data is sent asynchronously to the accounting system API
4. After successful creation, the invoice ID is saved in order meta
5. The invoice PDF is downloaded and attached to the customer email

### Data mapping

The module automatically maps WooCommerce order data to the required API format:

| WooCommerce data | wFirma (XML) | Fakturownia (JSON) | iFirma (JSON) |
|------------------|-------------|-------------------|---------------|
| Company name | `<contractor><name>` | `buyer_name` | `Kontrahent.Nazwa` |
| VAT ID (NIP) | `<contractor><nip>` | `buyer_tax_no` | `Kontrahent.NIP` |
| Address | `<contractor><street>` | `buyer_street` | `Kontrahent.Ulica` |
| Order items | `<invoicecontents>` | `positions` | `Pozycje` |
| VAT rate | `<vat_code>` | `tax` | `StawkaVat` |
| Payment method | `<paymentmethod>` | `payment_type` | `SposobZaplaty` |

### XML format (wFirma)

```xml
<api>
  <invoices>
    <invoice>
      <contractor>
        <name>Firma Testowa Sp. z o.o.</name>
        <nip>1234567890</nip>
        <street>ul. Testowa 1</street>
        <city>Warszawa</city>
        <zip>00-001</zip>
      </contractor>
      <invoicecontents>
        <invoicecontent>
          <name>Produkt testowy</name>
          <unit>szt.</unit>
          <count>2</count>
          <price>100.00</price>
          <vat_code>23</vat_code>
        </invoicecontent>
      </invoicecontents>
      <paymentmethod>transfer</paymentmethod>
      <paymentdate>2026-04-12</paymentdate>
    </invoice>
  </invoices>
</api>
```

### JSON format (Fakturownia)

```json
{
  "invoice": {
    "kind": "vat",
    "number": null,
    "buyer_name": "Firma Testowa Sp. z o.o.",
    "buyer_tax_no": "1234567890",
    "buyer_street": "ul. Testowa 1",
    "buyer_city": "Warszawa",
    "buyer_post_code": "00-001",
    "positions": [
      {
        "name": "Produkt testowy",
        "quantity": 2,
        "total_price_gross": "246.00",
        "tax": "23"
      }
    ],
    "payment_type": "transfer",
    "payment_to": "2026-04-12"
  }
}
```

## Retry mechanism

### Exponential backoff

When the API returns an error (HTTP 5xx, timeout, connection error), the module automatically schedules a retry with exponential backoff:

| Attempt | Delay | Time from first attempt |
|---------|-------|------------------------|
| 1 | Immediately | 0 s |
| 2 | 30 s | 30 s |
| 3 | 2 min | 2 min 30 s |
| 4 | 8 min | 10 min 30 s |
| 5 | 32 min | 42 min 30 s |

The delay is calculated with the formula: `delay = base_delay * 2^(attempt - 1)`, where `base_delay = 30 seconds`.

### Errors not subject to retry

Client errors (HTTP 4xx) are not retried automatically because they indicate a data problem, not an API problem:

- `400 Bad Request` - invalid data
- `401 Unauthorized` - incorrect API token
- `403 Forbidden` - insufficient permissions
- `422 Unprocessable Entity` - data validation

These errors are logged and require administrator intervention.

### Asynchronous sending

Invoices are sent asynchronously using `WC_Action_Scheduler`, meaning they do not block the order placement process. The customer sees the order confirmation immediately, and the invoice is generated in the background.

```php
/**
 * Akcja wywoływana po pomyślnym wystawieniu faktury.
 *
 * @param int    $order_id   ID zamówienia
 * @param string $invoice_id ID faktury w systemie księgowym
 * @param string $provider   Nazwa dostawcy ('wfirma', 'fakturownia', 'ifirma')
 */
do_action('polski_pro/accounting/invoice_created', int $order_id, string $invoice_id, string $provider);
```

**Example - logging to an external system:**

```php
add_action('polski_pro/accounting/invoice_created', function (
    int $order_id,
    string $invoice_id,
    string $provider
): void {
    error_log(sprintf(
        '[Polski PRO] Faktura %s wystawiona w %s dla zamówienia #%d',
        $invoice_id,
        $provider,
        $order_id
    ));
}, 10, 3);
```

### Error hook

```php
/**
 * Akcja wywoływana po wyczerpaniu prób wysłania faktury.
 *
 * @param int    $order_id   ID zamówienia
 * @param string $provider   Nazwa dostawcy
 * @param string $error      Komunikat błędu
 * @param int    $attempts   Liczba wykonanych prób
 */
do_action('polski_pro/accounting/invoice_failed', int $order_id, string $provider, string $error, int $attempts);
```

**Example - administrator notification:**

```php
add_action('polski_pro/accounting/invoice_failed', function (
    int $order_id,
    string $provider,
    string $error,
    int $attempts
): void {
    $admin_email = get_option('admin_email');
    wp_mail(
        $admin_email,
        sprintf('Błąd wystawienia faktury - zamówienie #%d', $order_id),
        sprintf(
            "Nie udało się wystawić faktury w %s po %d próbach.\n\nBłąd: %s\n\nSprawdź zamówienie: %s",
            $provider,
            $attempts,
            $error,
            admin_url(sprintf('post.php?post=%d&action=edit', $order_id))
        )
    );
}, 10, 4);
```

## Invoice data filter

```php
/**
 * Filtruje dane faktury przed wysłaniem do API.
 *
 * @param array     $invoice_data Dane faktury w formacie dostawcy
 * @param \WC_Order $order        Zamówienie WooCommerce
 * @param string    $provider     Nazwa dostawcy
 */
apply_filters('polski_pro/accounting/invoice_data', array $invoice_data, \WC_Order $order, string $provider): array;
```

**Example - adding notes to the invoice:**

```php
add_filter('polski_pro/accounting/invoice_data', function (
    array $invoice_data,
    \WC_Order $order,
    string $provider
): array {
    if ($provider === 'fakturownia') {
        $invoice_data['invoice']['description'] = sprintf(
            'Zamówienie internetowe #%s',
            $order->get_order_number()
        );
    }
    return $invoice_data;
}, 10, 3);
```

## Admin panel

### Synchronization status

On the WooCommerce orders list, an "Invoice" column is added showing:

- Green icon - invoice issued successfully
- Yellow icon - sending in progress / retry
- Red icon - error (click to see details)
- Gray icon - not applicable (no automatic issuing)

### Manual issuing

On the order edit page, in the **Invoice** panel, the administrator can:

1. Issue an invoice manually (if automatic issuing failed)
2. Download the invoice PDF
3. Retry sending the invoice
4. View the attempt and error log

## Troubleshooting

**Invoice is not issued automatically**
Check if the trigger status is correct. Make sure Action Scheduler is running (WooCommerce > Status > Scheduled Actions). Check the error log in **WooCommerce > Status > Logs**.

**"Unauthorized" error when connecting to API**
Verify the authentication credentials. For wFirma, check if the API key and secret are from the main account (not a sub-account). For Fakturownia, make sure the subdomain is correct.

**Duplicate invoices**
The module prevents duplicates by checking the `_polski_pro_invoice_id` meta before issuing. If duplicates occur, check whether another plugin is triggering the same order hook.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Related: [PRO REST API](/pro/pro-api)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
