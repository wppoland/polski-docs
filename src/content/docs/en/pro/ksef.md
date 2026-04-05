---
title: KSeF integration
description: Documentation of the Polski PRO for WooCommerce integration with the National e-Invoice System (KSeF) - invoice submission, status tracking, API configuration and error handling.
---

The KSeF module sends electronic invoices to the National e-Invoice System (Ministry of Finance). Invoices are sent in the background, with automatic retries on errors.

## What is KSeF

The National e-Invoice System (KSeF) is a platform by the Ministry of Finance for issuing, storing and receiving structured invoices in XML format. The plugin provides tools to integrate WooCommerce with KSeF - it generates invoices in the required XML format and submits them to the system.

## Configuration

Go to **WooCommerce > Settings > Polski > PRO Modules > KSeF**.

### Connection settings

| Setting | Description |
|---------|-------------|
| Enable KSeF integration | Activates the module |
| Environment | Test (sandbox) or Production |
| API key (token) | Authorization token generated in the KSeF portal |
| Issuer VAT ID (NIP) | VAT ID associated with the KSeF account |

### Test environment

KSeF provides a test environment (sandbox) for verifying integration. The test environment:

- does not require a real authorization key
- accepts invoices in the same format as the production environment
- does not transmit data to the Tax Office
- is recommended for initial integration testing

After successful verification in the test environment, switch to the production environment and enter the proper API key.

### Obtaining the API token

1. Log in to the KSeF portal: https://ksef.mf.gov.pl/
2. Navigate to the token management section
3. Generate a new token with invoice issuing permissions
4. Copy the token and paste it in the plugin settings

## Invoice submission

### Automatic submission

After enabling the **Automatic submission to KSeF** option, the plugin sends the invoice to KSeF automatically when its status changes to "Issued". Submission is handled asynchronously via Action Scheduler.

### Manual submission

In the order panel, the "Invoices" meta box contains a **Send to KSeF** button. Clicking it adds a submission task to the Action Scheduler queue.

### Asynchronous processing

The plugin uses Action Scheduler (built into WooCommerce) for asynchronous invoice submission. This means that:

- submission does not block order processing
- invoices are sent in a queue, one after another
- when there is a large number of invoices, the system processes them gradually

## XML generation

The plugin generates invoices in XML format compliant with the KSeF schema (FA(2)). The XML document contains:

- header with date and invoice type
- seller data (VAT ID, name, address)
- buyer data (VAT ID, name, address)
- invoice line items (name, quantity, net price, VAT rate, value)
- summary with VAT rate breakdown
- payment information

The XML is validated before submission. If validation detects errors, the invoice will not be sent, and a detailed message will appear in the log.

## Status tracking

After submitting an invoice to KSeF, the plugin tracks its status:

| Status | Description |
|--------|-------------|
| Queued | Invoice added to the submission queue |
| Submitted | Invoice submitted to KSeF, awaiting processing |
| Accepted | Invoice accepted by KSeF, KSeF number assigned |
| Rejected | Invoice rejected - check the error message |
| Error | Communication error with the KSeF API |

After an invoice is accepted, the plugin saves the KSeF reference number in the invoice metadata. This number is visible in the order panel and on the PDF printout.

### Status polling

The plugin automatically checks the status of submitted invoices. After submitting an invoice to KSeF, the plugin queries the API for status every few minutes (via Action Scheduler) until it receives an "Accepted" or "Rejected" response.

## Error handling and retries

In case of a communication error with the KSeF API, the plugin applies an exponential backoff mechanism:

| Attempt | Delay |
|---------|-------|
| 1st retry | 5 minutes |
| 2nd retry | 25 minutes |
| 3rd retry | 125 minutes |

After three failed attempts, the invoice receives the "Error" status and requires manual intervention. The administrator receives an email notification about the failed submission.

Typical causes of errors:

- invalid or expired API token
- XML validation errors (e.g. missing buyer data)
- temporary unavailability of the KSeF API
- mismatch between issuer VAT ID and token

## Hooks

### `polski_pro_ksef_submit`

Action fired before submitting an invoice to KSeF.

```php
/**
 * @param int    $invoice_id ID faktury
 * @param string $xml        Wygenerowany XML faktury
 */
do_action('polski_pro_ksef_submit', int $invoice_id, string $xml);
```

**Example:**

```php
add_action('polski_pro_ksef_submit', function (int $invoice_id, string $xml): void {
    // Zapisanie kopii XML przed wysyłką
    $upload_dir = wp_upload_dir();
    $xml_path = $upload_dir['basedir'] . '/polski-pro/ksef-xml/';
    
    if (! is_dir($xml_path)) {
        wp_mkdir_p($xml_path);
    }
    
    file_put_contents(
        $xml_path . "invoice-{$invoice_id}.xml",
        $xml
    );
}, 10, 2);
```

### `polski_pro_ksef_check_status`

Action fired after checking an invoice status in KSeF.

```php
/**
 * @param int    $invoice_id    ID faktury
 * @param string $status        Nowy status (accepted, rejected, error)
 * @param string $ksef_number   Numer referencyjny KSeF (tylko dla accepted)
 */
do_action('polski_pro_ksef_check_status', int $invoice_id, string $status, string $ksef_number);
```

**Example:**

```php
add_action('polski_pro_ksef_check_status', function (int $invoice_id, string $status, string $ksef_number): void {
    if ($status === 'accepted') {
        // Powiadomienie zewnętrznego systemu o zaakceptowaniu faktury
        wp_remote_post('https://erp.example.com/api/ksef-update', [
            'body' => wp_json_encode([
                'invoice_id'  => $invoice_id,
                'ksef_number' => $ksef_number,
            ]),
            'headers' => ['Content-Type' => 'application/json'],
        ]);
    }
}, 10, 3);
```

## Diagnostics

### Logs

The plugin logs all KSeF operations in the WooCommerce log. Go to **WooCommerce > Status > Logs** and select the `polski-pro-ksef` source.

Logged events:

- invoice submission (request/response)
- status check
- XML validation errors
- API communication errors
- submission retries

### Testing the connection

In the KSeF module settings, a **Test Connection** button is available. It sends a test request to the KSeF API and verifies:

- token validity
- connectivity with the KSeF server
- VAT ID match with the token

## Common issues

### Invoice rejected by KSeF

1. Check the error message in the WooCommerce log
2. Most common causes: missing buyer VAT ID, invalid VAT rate, incomplete address data
3. Fix the data and resubmit

### API token not working

1. Make sure the token has not expired
2. Check if the token has permissions for issuing invoices
3. Verify that the VAT ID in the plugin settings matches the one associated with the token

### Action Scheduler not processing the queue

1. Check if WP-Cron is working properly
2. Go to **Tools > Scheduled Actions** and check the queue status
3. Verify that there are no stuck tasks

## Related resources

- [Invoice system](/pro/invoices/)
- [KSeF information](/compliance/ksef/)
- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
