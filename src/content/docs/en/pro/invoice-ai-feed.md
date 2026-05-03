---
title: AI Feed for invoices
description: REST endpoint that serves a single invoice as Markdown, designed for accounting agents and customer-service AI built on LLMs.
---

Polski Pro 1.10.0 adds a REST endpoint that returns a single invoice as **Markdown**. AI agents (accounting bots, customer service, buyer assistants) receive structured invoice data without parsing the PDF.

## Endpoint

```
GET /wp-json/polski-pro/v1/invoices/{id}/markdown
Accept: text/markdown
```

Response:

```
Content-Type: text/markdown; charset=UTF-8
Cache-Control: private, no-store
```

Body is Markdown with YAML front matter, a parties block (NIP), a Markdown items table, and totals.

## Authentication

| Role | Access |
|---|---|
| Administrator / `manage_woocommerce` | any invoice |
| Authenticated order owner | their own invoices only |
| Anonymous / other users | 401 / 403 |

Invoices contain personal and tax data, so the endpoint is intentionally closed to anonymous callers. Authenticate with a WordPress session cookie or an application password (REST application password).

## What the response contains

**YAML front matter**

```yaml
---
number: "FV/2026/05/001"
type: "faktura_vat"
status: "issued"
order_id: "555"
currency: "PLN"
net_total: "200.00"
vat_total: "46.00"
gross_total: "246.00"
issued_at: "2026-05-01T10:00:00+00:00"
nip_seller: "5260250274"
nip_buyer: "7010019999"
ksef_reference: "KSEF-123"
ksef_status: "sent"
---
```

**Parties block**

- Seller NIP / Buyer NIP

**Items table** (Markdown)

| # | Description | Qty | Unit | Net price | VAT % | VAT amount | Gross price |

**Totals**

- Net total / VAT total / Gross total with currency

**Additional details** (when present)

- KSeF reference / status
- Correction reason (for correction invoices)

## Developer filter

```php
add_filter('polski-pro/ai_feed/invoice_markdown', static function (string $document, \Polski\Pro\Invoice\Model\Invoice $invoice): string {
    if ($invoice->type === \Polski\Pro\Invoice\Model\InvoiceType::FakturaVAT) {
        $document .= "\n\n## Internal note\n\n- Auto-issued on order payment.\n";
    }
    return $document;
}, 10, 2);
```

## Example with curl (authenticated admin)

```bash
curl -u admin:apppassword \
  -H "Accept: text/markdown" \
  https://shop.test/wp-json/polski-pro/v1/invoices/42/markdown
```

## Related

- [AI Feed (FREE)](/en/tools/ai-feed/) - module that serves posts, pages, and WooCommerce products as Markdown
- [PDF invoices](/en/pro/invoices/) - generating and sending invoices as PDF
- [KSeF](/en/pro/ksef/) - integration with the Polish national e-invoicing system

## FAQ

**Does the endpoint work without authentication?**

No. Invoices contain personal data and tax IDs. Anonymous clients receive 401.

**Can I use a REST application password?**

Yes. WordPress 5.6+ supports application passwords. Generate one under **Users > Edit > Application Passwords** and pass it via `Authorization: Basic`.

**Can I download an invoice's Markdown from wp-admin?**

There is no separate button. The URL is stable - `/wp-json/polski-pro/v1/invoices/<id>/markdown` - so you can bookmark it or embed it in accounting tools.

**What about correction invoices?**

Correction invoices are also supported. The front matter includes `original_invoice_id`, and the "Additional details" block contains `correction_reason`.
