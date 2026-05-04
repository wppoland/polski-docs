---
title: B2B checkout fields
description: Optional "Buying as a company" toggle plus NIP, REGON, and IBAN fields in the WooCommerce checkout. Polish NIP checksum validation, saved to standard order meta consumed by KSeF and the invoice module.
---

Polski 1.13.0 adds an optional set of B2B fields to the WooCommerce checkout: a "Buying as a company" toggle and NIP, REGON, and IBAN fields. The fields appear in the classic WooCommerce checkout (`woocommerce_billing_fields` filter), are saved to standard order meta, and are read by the KSeF module and the pro invoice module without further configuration.

## "Buying as a company" toggle

Checkbox `polski_buying_as_company` placed at the top of the billing section. Unchecked by default - the NIP, REGON, and IBAN rows are hidden until the customer ticks it. The toggle state is saved to order meta `_polski_buying_as_company` (`yes` / `no`).

The show/hide logic is implemented as inline JavaScript - no build pipeline or extra frontend dependency. The script also listens for the jQuery `updated_checkout` event, so it works after asynchronous fragment refreshes of the checkout block.

## NIP

`billing_nip` field validated against the Polish NIP checksum algorithm (10 digits, weights 6, 5, 7, 2, 3, 4, 5, 6, 7, modulo 11). Accepted input formats: `1234567890`, `123-456-78-90`, `123 456 78 90`, and `PL1234567890` (the prefix is stripped before validation). The value is stored in normalized form (10 digits) under the `_billing_nip` order meta.

Validation in PHP uses the new static utility `Polski\Util\NipValidator`:

```php
use Polski\Util\NipValidator;

NipValidator::isValid('5260250274');           // true
NipValidator::isValid('PL 526-025-02-74');     // true
NipValidator::normalize('PL 526-025-02-74');   // '5260250274'
NipValidator::format('5260250274');            // '526-025-02-74'
```

When polski-pro's `Polski\Pro\Validation\NipValidator` is active, FREE skips its own NIP registration to avoid a duplicate billing_nip field. REGON and IBAN are always added by FREE.

## REGON

Optional `billing_regon` field (off by default). Accepts 9 or 14 digits (short / long REGON). Regex check: `/^\d{9}$|^\d{14}$/`. Saved to `_billing_regon` order meta.

## IBAN

Optional `billing_iban` field (off by default). Structural sanity check: 2-letter country prefix + 2 check digits + 11-30 alphanumeric body characters, total length 15-34. Strict mod-97 verification is intentionally left to integrators (for example a payment gateway plugin). Saved to `_billing_iban` order meta.

## Settings (`polski_b2b`)

| Key | Default | Description |
|---|---|---|
| `enabled` | `true` | Master switch for the module |
| `show_company_toggle` | `true` | Whether to show the "Buying as a company" checkbox |
| `nip` | `true` | Whether to add the NIP field (skipped when polski-pro NipValidator is active) |
| `regon` | `false` | Whether to add the REGON field |
| `iban` | `false` | Whether to add the IBAN field |

Enable REGON and IBAN via `update_option`:

```php
update_option('polski_b2b', array_merge(
    (array) get_option('polski_b2b', []),
    ['regon' => true, 'iban' => true]
));
```

## Integration with other modules

- **KSeF module (FREE)** reads `_billing_nip` from the order and automatically detects orders that require an e-invoice.
- **Invoice module (PRO)** reads `_billing_nip` as `nipBuyer` when generating Faktura VAT and correction invoices.
- **AI Feed for invoices (PRO)** exposes invoices as Markdown with NIP fields in the "Parties" block.

## Admin display

NIP, REGON, and IBAN are added to the "Billing details" block on the order screen (`woocommerce_admin_billing_fields`). They are edited in the same place as the customer's billing address.

## Block checkout compatibility

In this iteration the fields work only in the **classic WooCommerce checkout**. Block checkout (Cart & Checkout Blocks) support is planned for a follow-up release - the fields will be exposed via Store API in the same way as the existing legal checkbox registration (`Polski\Block\StoreApi\CheckoutValidation`).
