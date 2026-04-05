---
title: Store audit
description: Store audit tool in Polski for WooCommerce - verification of legal pages, dark patterns, DPA, DSA, KSeF, greenwashing and security.
---

The audit automatically scans the store for Polish and EU e-commerce law. Unlike the compliance dashboard, the audit analyzes page content, interface and technical configuration.

## Running an audit

Go to **WooCommerce > Polski > Tools > Store Audit** and click **Run Audit**. The audit takes from a few seconds to several minutes, depending on the number of products and pages.

The audit can also be run from WP-CLI:

```bash
wp polski smoke-test --module=audit --verbose
```

## Audit scope

### Legal pages

The audit analyzes legal page content for:

**Store terms and conditions:**
- Presence of required sections (company data, order procedure, payments, delivery, withdrawal, complaints)
- Seller contact details (name, address, NIP, email, phone)
- Information about out-of-court dispute resolution
- Information about the ODR (Online Dispute Resolution) platform
- Data currency (NIP comparison with the register)

**Privacy policy:**
- Personal data controller information
- Data processing purposes
- Legal bases for processing
- Information about data subject rights (access, rectification, erasure)
- Cookie information
- DPO contact details (if required)

**Withdrawal information:**
- Withdrawal form template
- Withdrawal period (14 days)
- Procedure instructions
- Information about return costs

**Delivery information:**
- Available delivery methods
- Delivery costs
- Estimated delivery times
- Information about delivery to EU countries

### Dark patterns

The audit detects design patterns considered manipulative (dark patterns) according to the DSA Directive and Polish law:

| Pattern                    | Description                                    | Level   |
| -------------------------- | ---------------------------------------------- | ------- |
| Preselected checkboxes     | Pre-checked consent checkboxes                 | FAIL    |
| Hidden costs               | Costs appearing only at checkout               | FAIL    |
| Countdown timers           | Fake countdown timers                          | WARN    |
| Fake scarcity              | Artificial low stock messages                  | WARN    |
| Forced account creation    | Forcing registration before purchase           | WARN    |
| Difficult unsubscribe      | Complicated newsletter unsubscribe process     | FAIL    |
| Confusing button placement | Misleading accept/reject button placement      | WARN    |
| Nagging popups             | Repetitive, hard-to-close popups               | WARN    |

The audit checks:
- Checkout form - default checkbox states
- Cookie popup - whether the decline button is as visible as accept
- Registration form - required vs optional fields
- Cart - whether the final price is visible from the start
- Newsletter - whether unsubscribing is easy

### DPA (Data Processing Agreement)

The audit verifies data processing agreements:

- Whether the store uses external services processing data (analytics, email marketing, payment gateways)
- Whether appropriate DPA agreements exist for detected services
- List of detected services: Google Analytics, Facebook Pixel, Mailchimp, GetResponse, PayU, Przelewy24, Stripe

The audit scans page code (JavaScript, tracking pixels) and identifies external services.

### DSA (Digital Services Act)

The audit checks DSA requirements:

- Illegal content report form - availability and field correctness
- Contact point - whether contact email is published
- Content moderation information - review moderation policy
- Terms of service - availability and completeness
- Report register - whether the system records and archives reports

### KSeF (National e-Invoice System)

The audit verifies KSeF integration readiness:

- Company NIP - format correctness and register verification
- KSeF API connection - connectivity test
- Invoice data - required field completeness
- NIP field at checkout - availability for business customers
- Automatic invoice generation - module configuration

### Greenwashing

The audit analyzes environmental claims on products:

- **Claims without evidence** - texts like "ecological", "green", "natural" without certification or justification
- **General claims** - overly general statements without details (e.g. "environmentally friendly")
- **Missing certificates** - referencing a certificate without number or link
- **Inconsistent data** - recyclability claim without material information
- **Offsetting** - climate neutrality claims based solely on offset

The audit scans product names, descriptions, short descriptions and greenwashing module meta data.

### Security

The audit checks basic security aspects:

| Check                            | Description                           |
| -------------------------------- | ------------------------------------- |
| SSL/HTTPS                        | Whether the entire store runs on HTTPS|
| WordPress version                | Whether it is current                 |
| WooCommerce version              | Whether it is current                 |
| PHP version                      | Whether it is not end-of-life (EOL)   |
| Debug mode                       | Whether `WP_DEBUG_DISPLAY` is off in production |
| Default admin account            | Whether a user "admin" exists         |
| XML-RPC                          | Whether it is disabled (recommended)  |
| REST API exposure                | Whether user endpoints are not public |
| File editing                     | Whether file editing from panel is disabled |

## Audit report

After the audit completes, a report with results is displayed:

### Summary

- **Overall grade** - from A (excellent) to F (critical issues)
- **Critical requirements** - FAIL count
- **Warnings** - WARN count
- **Passed** - OK count
- **Audit date** - timestamp

### Details

Each found issue contains:

- **Category** - which audit section it belongs to
- **Priority** - FAIL (critical), WARN (warning), INFO (information)
- **Description** - what was found
- **Location** - where the issue occurs (URL, page, product)
- **Recommended action** - what to do to fix it
- **Legal basis** - reference to the regulation

### Report export

The report can be exported in formats:

- **PDF** - report for printing or sharing with a lawyer
- **CSV** - tabular data for spreadsheets
- **JSON** - machine-readable data

```php
// Hook after audit completion
add_action('polski/audit/completed', function (array $results): void {
    if ($results['grade'] === 'F') {
        wp_mail(
            get_option('admin_email'),
            'Store audit - critical grade',
            'The audit revealed critical issues. Check the compliance dashboard.'
        );
    }
});
```

## Audit schedule

The audit can be run automatically at set intervals:

- **Weekly** - recommended for active stores
- **Monthly** - minimum for every store
- **Manual** - on demand

Configuration: **WooCommerce > Polski > Tools > Store Audit > Schedule**.

Results of automatic audits are saved in history and emailed to the administrator.

## Troubleshooting

**Audit takes too long** - in stores with a large number of products (10,000+), the greenwashing audit may take longer. Use WP-CLI with the `--module` option to run selected audit sections.

**Audit does not detect an external service** - the list of detected services is limited. Report the missing service on GitHub.

**False dark patterns alarm** - some themes may generate false alarms (e.g. a timer counting down to the end of a business day, not an "offer expiration"). Report the false alarm, and in the meantime you can disable the specific check.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
