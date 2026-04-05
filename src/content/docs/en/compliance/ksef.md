---
title: KSeF - National e-Invoice System
description: KSeF readiness in Polski for WooCommerce - automatic detection of orders with NIP, status column, developer hooks and integration with invoicing systems.
---

The National e-Invoice System (KSeF) is a Polish Ministry of Finance platform for issuing and receiving structured invoices. Polski for WooCommerce prepares a WooCommerce store for KSeF integration through automatic detection of orders requiring a VAT invoice, a status column in the admin panel and hooks enabling integration with external invoicing systems.

## KSeF legal status

KSeF is currently in the implementation phase. The Polski for WooCommerce plugin does not issue invoices directly in KSeF, but provides infrastructure facilitating integration with systems that do (e.g. Fakturownia, iFirma, wFirma, InFakt).

Main KSeF module features:

1. Automatic detection of orders with a NIP number
2. KSeF status column on the orders list
3. Hooks for integration with external invoicing systems
4. Order meta data ready for passing to the KSeF system

## Detecting orders with NIP

When a customer provides a NIP number during order placement (the NIP field is part of the plugin's Checkout module), the system automatically:

1. Validates the NIP format (10 digits, checksum verification)
2. Marks the order as requiring a VAT invoice
3. Saves the NIP in order meta data
4. Optionally retrieves company data from the GUS/CEIDG API

### NIP validation

The plugin checks NIP correctness at two levels:

- **Format** - 10 digits, correct checksum (weights: 6, 5, 7, 2, 3, 4, 5, 6, 7)
- **Online verification** - optional check in the VIES database (for EU NIPs) or GUS API

## KSeF status column

On the orders list (**WooCommerce > Orders**) the plugin adds a **KSeF** column with status icons:

| Icon | Status | Description |
|------|--------|-------------|
| Gray | Not applicable | Order without NIP, invoice not required |
| Blue | Pending | Order with NIP, invoice to be issued |
| Green | Issued | Invoice has been issued (status set by hook) |
| Red | Error | A problem occurred with issuing the invoice |

The status can be filtered - use the filter on the orders list to display e.g. only orders waiting for an invoice.

### Bulk actions

A bulk action "Mark as issued in KSeF" is available on the orders list, allowing you to update the status of many orders at once.

## Hooks

### polski/ksef/invoice_ready

Triggered when an order with NIP has been paid and is ready for invoice issuance. This is the main hook for integration with external invoicing systems.

```php
/**
 * @param int      $order_id   WooCommerce order ID.
 * @param WC_Order $order      Order object.
 * @param string   $nip        Customer NIP number.
 * @param array    $invoice_data Invoice data (company name, address, NIP).
 */
add_action('polski/ksef/invoice_ready', function (int $order_id, WC_Order $order, string $nip, array $invoice_data): void {
    // Example: send data to the Fakturownia API
    $api_token = get_option('fakturownia_api_token');
    $account = get_option('fakturownia_account');
    
    $invoice_payload = [
        'invoice' => [
            'kind'             => 'vat',
            'number'           => null, // auto-numbering
            'sell_date'        => $order->get_date_paid()->format('Y-m-d'),
            'issue_date'       => current_time('Y-m-d'),
            'payment_type'     => 'transfer',
            'seller_name'      => get_option('woocommerce_store_name'),
            'buyer_name'       => $invoice_data['company_name'],
            'buyer_tax_no'     => $nip,
            'buyer_street'     => $invoice_data['address'],
            'buyer_city'       => $invoice_data['city'],
            'buyer_post_code'  => $invoice_data['postcode'],
            'positions'        => [],
        ],
    ];
    
    foreach ($order->get_items() as $item) {
        $invoice_payload['invoice']['positions'][] = [
            'name'       => $item->get_name(),
            'quantity'   => $item->get_quantity(),
            'total_price_gross' => $item->get_total() + $item->get_total_tax(),
            'tax'        => round(($item->get_total_tax() / $item->get_total()) * 100),
        ];
    }
    
    $response = wp_remote_post("https://{$account}.fakturownia.pl/invoices.json", [
        'body'    => wp_json_encode($invoice_payload),
        'headers' => [
            'Content-Type' => 'application/json',
            'Authorization' => 'Token token=' . $api_token,
        ],
    ]);
    
    if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 201) {
        $body = json_decode(wp_remote_retrieve_body($response), true);
        update_post_meta($order_id, '_ksef_status', 'issued');
        update_post_meta($order_id, '_ksef_invoice_id', $body['id'] ?? '');
    } else {
        update_post_meta($order_id, '_ksef_status', 'error');
    }
}, 10, 4);
```

### polski/ksef/is_required

Filter allowing you to programmatically determine whether an order requires a KSeF invoice.

```php
/**
 * @param bool     $is_required Whether a KSeF invoice is required.
 * @param WC_Order $order       Order object.
 * @return bool
 */
add_filter('polski/ksef/is_required', function (bool $is_required, WC_Order $order): bool {
    // Example: require KSeF invoice for orders above 450 PLN
    if ($order->get_total() > 450) {
        return true;
    }
    
    return $is_required;
}, 10, 2);
```

### Example - automatic status marking after integration

```php
/**
 * Update KSeF status after receiving a response from the invoicing system.
 */
add_action('my_invoicing/invoice_created', function (int $order_id, string $ksef_number): void {
    $order = wc_get_order($order_id);
    if (!$order) {
        return;
    }
    
    $order->update_meta_data('_ksef_status', 'issued');
    $order->update_meta_data('_ksef_number', $ksef_number);
    $order->add_order_note(
        sprintf('Invoice issued in KSeF. KSeF number: %s', $ksef_number)
    );
    $order->save();
}, 10, 2);
```

## Order meta data

The KSeF module saves the following meta data in the order:

| Meta key | Description |
|----------|-------------|
| `_billing_nip` | Customer NIP number |
| `_billing_company` | Company name |
| `_ksef_required` | Whether the order requires an invoice (`yes`/`no`) |
| `_ksef_status` | Invoice status (`pending`, `issued`, `error`) |
| `_ksef_number` | KSeF invoice number (after issuance) |
| `_ksef_invoice_id` | Invoice ID in the external system |

## Configuration

KSeF module settings: **WooCommerce > Settings > Polski > KSeF**.

| Option | Description | Default value |
|--------|-------------|---------------|
| Enable KSeF module | Activates detection and tracking | Yes |
| Online NIP validation | Check NIP in GUS/VIES API | No |
| Auto-fetch company data | Fetch data from GUS after entering NIP | No |
| Hook trigger status | Order status at which to trigger `invoice_ready` | `processing` |

## Troubleshooting

**KSeF column does not display on the orders list**
Click "Screen Options" and check the KSeF column. Make sure the module is enabled in settings.

**NIP is not saved in the order**
Check that the NIP field is enabled in the Checkout module (**WooCommerce > Settings > Polski > Checkout**). The NIP field must be active for the customer to fill it in.

**The invoice_ready hook is not triggered**
Check the "Hook trigger status" setting. By default, the hook is triggered when the order status changes to "Processing". If you use custom statuses, change this option.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Discussions and questions: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
