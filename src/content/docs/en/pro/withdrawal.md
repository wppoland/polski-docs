---
title: Withdrawal from contract - Pro features
description: Pro extensions of the Polski for WooCommerce withdrawal module - auto-refund, A4 declaration PDF, audit log with CSV, reporting dashboard, Subscriptions and Bundles support, multi-lang Annex I(B).
---

The Pro version extends the free withdrawal module with operator-driven refund handling, declaration PDFs, an audit log, reports and integrations with subscriptions / product bundles. It assumes you have the free version of Polski for WooCommerce active and that you are familiar with the [basic withdrawal module](/compliance/withdrawal/).

## Auto-refund (with operator confirmation)

Never automatic, a refund requires an explicit operator action on the order screen. In `Edit order › Polski - withdrawal refund` (metabox on the right) the operator sees:

- The calculated refund amount based on the selected declaration line items
- A **Process refund now** button (with a JS `confirm()` for double confirmation)
- After processing: the WooCommerce refund number, amount and date

Logic:

1. Fetches the lines from `polski_withdrawal_items` for the given declaration
2. Maps them to the `wc_create_refund()` format (`qty`, `refund_total`, `refund_tax`)
3. Adds the shipping cost **only** if the withdrawal covers all order lines
4. Calls the gateway refund (`refund_payment => true`) and restock (`restock_items => true`)
5. Saves `refund_id` and `refund_amount` in `polski_withdrawals`
6. Triggers `polski_pro/withdrawal/refund_processed` and `WithdrawalService::complete()`

The `polski_pro/withdrawal/refund_payload` filter lets you modify the payload before `wc_create_refund()` (for example to add shipping in specific cases or change taxes).

## A4 declaration PDF - durable medium

`Polski\Pro\Service\WithdrawalPdfGenerator` uses TCPDF to generate an A4 PDF with:

- A declaration number `POL-WD-NNNNNN` and the filing date
- The addressee (store data from `polski_general` or `woocommerce_store_*`)
- The consumer (billing first/last name, address, email)
- The declaration text with a reference to art. 27 of the Consumer Rights Act
- A line item table (name + variation attributes, quantity, value)
- The order value
- The order date
- The reason (if the customer provided one)
- A space for a signature (paper version only)
- A note about the durable medium

Saved to `wp-content/uploads/polski-withdrawals/YYYY/MM/POL-WD-NNNNNN.pdf` (protected with `.htaccess deny from all`).

Auto-generated on every requested/guest_requested/manual_registered event, attached to the consumer email via the `woocommerce_email_attachments` filter. The path is stored in the order meta `_polski_withdrawal_pdf`, subsequent `ensurePdf()` calls are idempotent (regeneration only if the file is gone).

## Download count verification (Art. 16(m) relaxation)

For 100% digital orders, even when you collected Art. 16(m) consent, the consumer retains the right of withdrawal if they have **downloaded no file**. The `DigitalDownloadVerifier` service:

1. Hooks into the `polski/withdrawal/eligible` filter at priority 30 (after DigitalConsentService=20)
2. Iterates the order line items, for each downloadable/virtual item it sums the downloads from `wc_get_customer_download_log` per permission
3. If no item has `count > 0`, it restores eligibility (returns `true` instead of `false`)
4. If at least one was downloaded, it leaves `false`

Enabled via `polski_withdrawal['digital_download_verification'] = '1'` in the settings (default off, opt-in according to the store policy).

## WooCommerce Subscriptions

By default subscriptions are **not** excluded from withdrawals (unless the storefront sets the filter `polski_pro/subscriptions/treat_as_exempt => true` for legacy behavior). Logic:

- When a declaration completes (`polski/withdrawal/completed`), the service iterates the subscriptions linked to the order through `wcs_get_subscriptions_for_order` and sets the status to `cancelled` (with a note)
- The refund payload is **proportional to the unused part of the current billing period** in line with Art. 9(2)(b)(iii) of the directive
- Formula: `ratio = 1 - (elapsed / total_period_length)`, applied per line to `refund_total` and `refund_tax`
- It takes the minimum `ratio` across all subscriptions linked to the order

## Product Bundles

Three refund strategies (`bundle_refund_mode` in the settings or the `polski_pro/withdrawal/bundle_refund_mode` filter):

| Mode | Behavior |
|---|---|
| `whole_bundle` (default) | The refund covers the whole bundle + all components (extends the payload with the parent and siblings) |
| `proportional` | Refund only for the selected component (a share of the bundle price proportional to the number of items) |
| `remove_discount` | Refund for the component at the standalone price (without the bundle discount) |

Bundle detection through the `_bundled_by` order item meta or the `bundle` product type.

## Annex I(B) in 8 languages

`AnnexMultiLanguageService` extends the `polski/annex/form_html` filter with translations for the locales: `pl`, `de`, `de_AT`, `fr`, `nl`, `it`, `es` + generic `eu` (English fallback). Each translation contains the correct wording from the official version of the directive + a national legal reference (BGB §355 DE, KSchG §11 AT, Code de la consommation art. L221-18 FR, Burgerlijk Wetboek 6:230o NL, Codice del Consumo art. 52 IT, TRLGDCU art. 102 ES, Consumer Rights Act art. 27 PL).

Language selection:

- The `polski_withdrawal['annex_locale']` setting (global override)
- Auto-detection from `get_locale()` if the setting is empty
- Shortcode attribute: `[polski_withdrawal_form_template_pro lang="de"]`
- The `polski/annex/locale` filter

## Reporting dashboard

`Polski Pro › Withdrawal reports` - scorecards + breakdown with a date-range filter:

- **Filed** - total number of submitted declarations
- **Completed** - finalized
- **In progress** - requested + confirmed
- **Rejected** - rejected
- **Average processing time** - `requested_at → completed_at` (seconds, formatted via `human_time_diff`)
- **Refunded** - count × amount
- **Top reasons** - top 10 unique reasons (group by reason)
- **Channel breakdown** - online / guest / phone / email / letter / in_store

Cached for 5 minutes per filter tuple (transient).

REST endpoints (parity for older WP):

- `GET /polski-pro/v1/withdrawals/reports/scorecards?from=...&to=...`
- `GET /polski-pro/v1/withdrawals/reports/reasons?limit=10`
- `GET /polski-pro/v1/withdrawals/reports/channels`

All gated by `manage_woocommerce`.

## Audit log with CSV export

`polski_pro_withdrawal_audit` (Migration 2.5.0) records every event in the declaration lifecycle:

| Field | Content |
|---|---|
| `withdrawal_id` | Declaration ID |
| `order_id` | Order ID |
| `action` | `requested` / `confirmed` / `completed` / `rejected` / `guest_requested` / `manual_registered` / `refunded` |
| `actor_user_id` | WP user ID (or NULL for a guest) |
| `actor_role` | The user's first WP role |
| `actor_login` | user_login |
| `ip_address` | From `HTTP_CF_CONNECTING_IP` → `X_FORWARDED_FOR` → `REMOTE_ADDR` |
| `user_agent` | Truncated to 1000 characters |
| `payload_json` | Event snapshot (channel, reason, refund_amount, email, etc.) |
| `created_at` | datetime UTC |

Admin `Polski Pro › Withdrawal audit` - a table with filters (action, date range, withdrawal_id, order_id) + an **Export to CSV** button (streamed through admin-post.php with a nonce).

REST:

- `GET /polski-pro/v1/withdrawals/audit` - paginated list
- `GET /polski-pro/v1/withdrawals/audit/export` - streamed CSV

## Pro abilities API (WP 6.9+)

4 additional abilities in the `polski-pro/withdrawal` category:

| ID | What it does |
|---|---|
| `polski-pro/withdrawal-process-refund` | Builds and runs the refund for a declaration |
| `polski-pro/withdrawal-generate-pdf` | Generates (or returns a cached) declaration PDF |
| `polski-pro/withdrawal-audit-list` | Lists audit log entries with filters |
| `polski-pro/withdrawal-report-scorecards` | KPI dashboard |

All gated by `manage_woocommerce`, described with JSON Schema (input/output).

## PRO hooks

```php
do_action('polski_pro/withdrawal/refund_processed', int $withdrawalId, WC_Order_Refund $refund);
do_action('polski/pro/withdrawal/pdf_generated', int $withdrawalId, string $filepath);

apply_filters('polski_pro/withdrawal/refund_payload', array $payload, WC_Order, int $withdrawalId);
apply_filters('polski_pro/withdrawal/download_verification_enabled', bool $enabled);
apply_filters('polski_pro/withdrawal/bundle_refund_mode', string $mode);
apply_filters('polski_pro/subscriptions/treat_as_exempt', bool $exempt, WC_Order $order);
```
