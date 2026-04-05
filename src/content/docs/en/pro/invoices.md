---
title: Invoice system
description: Documentation of the Polski PRO for WooCommerce invoice system - VAT invoice, correction, receipt, packing slip, PDF generation, numbering and REST API.
---

The invoice module in Polski PRO for WooCommerce enables generating sales documents directly from WooCommerce. It supports four document types, automatic numbering, PDF generation and the full invoice lifecycle.

## Document types

### VAT invoice

A standard VAT invoice containing:

- seller and buyer data (including VAT IDs for both parties)
- line items with name, quantity, net price, VAT rate, VAT amount and gross price
- summary with VAT rate breakdown
- invoice number, issue date and sale date
- payment terms and payment method

### Correction invoice

A correction document for a previously issued invoice. It contains:

- number and date of the corrected invoice
- line items before and after correction
- value difference
- reason for correction

A correction invoice can be issued from the order panel or via the REST API.

### Receipt

A simplified sales document for individual customers (without buyer VAT ID). Contains line items with gross prices and a summary.

### Packing slip

An external release document attached to the shipment. Contains a list of products, quantities and any order notes. Does not include prices.

## Configuration

Go to **WooCommerce > Settings > Polski > PRO Modules > Invoices**.

### Seller data

| Field | Description |
|-------|-------------|
| Company name | Full name of the seller company |
| VAT ID (NIP) | Tax identification number of the seller |
| Address | Street, number, postal code, city |
| Bank account number | Account number for wire transfers |
| Contact email | Email address displayed on the invoice |

### Numbering

The plugin offers several invoice numbering strategies:

| Strategy | Format | Example |
|----------|--------|---------|
| Annual | `FV/{number}/{year}` | FV/1/2026 |
| Monthly | `FV/{number}/{month}/{year}` | FV/1/04/2026 |
| Continuous | `FV/{number}` | FV/1 |
| Custom pattern | User-defined | FV/2026/04/001 |

Available tokens in the custom format:

- `{numer}` - sequential invoice number (reset according to strategy)
- `{rok}` - four-digit year
- `{miesiac}` - two-digit month
- `{dzien}` - two-digit day
- `{id_zamowienia}` - WooCommerce order ID

### Automatic generation

The plugin can automatically generate an invoice when the order status changes to "Completed". Enable the **Automatic invoice generation** option in the module settings.

You can also configure automatic sending of the invoice PDF as an attachment to the WooCommerce "Order completed" email.

## PDF generation

Invoice PDFs are generated using the TCPDF library. The PDF template includes:

- company logo (optional, configurable in settings)
- seller and buyer data
- line items table with VAT columns
- summary with VAT rate breakdown
- footer with company data

### Fonts

The plugin uses the DejaVu Sans font, which supports Polish diacritical characters. No additional configuration is required.

## Invoice status

Each invoice goes through a status lifecycle:

```
Draft (Szkic) → Issued (Wystawiona) → Sent (Wysłana) → Paid (Opłacona)
                                                      → Cancelled (Anulowana)
```

| Status | Description |
|--------|-------------|
| Draft | Invoice created but not yet issued. Can be edited |
| Issued | Invoice issued with an assigned number. Cannot be edited |
| Sent | Invoice sent to the customer (email or KSeF) |
| Paid | Invoice paid |
| Cancelled | Invoice cancelled. Requires issuing a correction |

## Order panel

In the WooCommerce order admin panel, the module adds an "Invoices" meta box with the following functions:

- **Issue invoice** - generates an invoice based on order data
- **Download PDF** - downloads the invoice in PDF format
- **Send to customer** - sends the invoice via email
- **Issue correction** - creates a correction invoice
- **History** - list of all documents associated with the order

## VAT on line items

Each invoice line item contains detailed VAT data:

- unit net price
- VAT rate (23%, 8%, 5%, 0%, exempt, not applicable, reverse charge)
- unit VAT amount
- net value
- gross value

The plugin automatically recognizes the VAT rate from the WooCommerce Tax configuration. It supports multiple VAT rates on a single invoice with correct totals.

## REST API

The module provides REST API endpoints for managing invoices programmatically.

### List invoices

```
GET /wp-json/polski-pro/v1/invoices
```

Query parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `order_id` | int | Filter by order ID |
| `status` | string | Filter by status (draft, issued, sent, paid, cancelled) |
| `type` | string | Filter by type (invoice, correction, receipt, packing_slip) |
| `date_from` | string | Date from (YYYY-MM-DD) |
| `date_to` | string | Date to (YYYY-MM-DD) |
| `per_page` | int | Results per page (default 20) |
| `page` | int | Page number |

### Create invoice

```
POST /wp-json/polski-pro/v1/invoices
```

```json
{
    "order_id": 123,
    "type": "invoice",
    "auto_number": true
}
```

### Download PDF

```
GET /wp-json/polski-pro/v1/invoices/{id}/pdf
```

Returns a PDF file as `application/pdf` with a `Content-Disposition: attachment` header.

### Issue correction

```
POST /wp-json/polski-pro/v1/invoices/{id}/correction
```

```json
{
    "reason": "Zmiana danych nabywcy",
    "items": [
        {
            "product_id": 45,
            "quantity": 1,
            "net_price": 100.00,
            "vat_rate": 23
        }
    ]
}
```

### Statistics

```
GET /wp-json/polski-pro/v1/invoices/stats
```

Returns invoice statistics: total count, net/gross values, breakdown by status.

## Hooks

### `polski_pro/invoices/before_generate`

Action fired before generating an invoice.

```php
/**
 * @param int    $order_id ID zamówienia
 * @param string $type     Typ dokumentu (invoice, correction, receipt, packing_slip)
 */
do_action('polski_pro/invoices/before_generate', int $order_id, string $type);
```

**Example:**

```php
add_action('polski_pro/invoices/before_generate', function (int $order_id, string $type): void {
    if ($type === 'invoice') {
        // Logowanie generowania faktury
        error_log("Generowanie faktury dla zamówienia #{$order_id}");
    }
}, 10, 2);
```

### `polski_pro/invoices/number_format`

Filters the invoice number format.

```php
/**
 * @param string $number    Wygenerowany numer faktury
 * @param string $type      Typ dokumentu
 * @param int    $order_id  ID zamówienia
 */
apply_filters('polski_pro/invoices/number_format', string $number, string $type, int $order_id): string;
```

**Example:**

```php
add_filter('polski_pro/invoices/number_format', function (string $number, string $type, int $order_id): string {
    if ($type === 'correction') {
        return 'KOR/' . $number;
    }
    return $number;
}, 10, 3);
```

### `polski_pro/invoices/pdf_content`

Filters the data passed to the PDF template.

```php
/**
 * @param array  $data     Dane faktury (seller, buyer, items, totals)
 * @param int    $invoice_id ID faktury
 */
apply_filters('polski_pro/invoices/pdf_content', array $data, int $invoice_id): array;
```

**Example:**

```php
add_filter('polski_pro/invoices/pdf_content', function (array $data, int $invoice_id): array {
    $data['footer_note'] = 'Dziękujemy za zakupy!';
    return $data;
}, 10, 2);
```

## Common issues

### PDF generates blank pages

1. Check if the PHP `mbstring` extension is installed
2. Make sure the `wp-content/uploads/polski-pro/invoices/` directory has write permissions (755)
3. Verify that the seller data is filled in the settings

### Numbering resets

Numbering resets according to the selected strategy - annual resets on January 1st, monthly on the 1st of each month. If you want continuous numbering, select the "Continuous" strategy.

### No VAT on line items

Check the WooCommerce Tax configuration. The plugin retrieves VAT rates from WooCommerce tax settings. Make sure the rates are correctly configured for Poland.

## Related resources

- [KSeF integration](/pro/ksef/)
- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
