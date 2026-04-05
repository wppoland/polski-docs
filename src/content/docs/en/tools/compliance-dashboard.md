---
title: Compliance dashboard
description: Legal requirements control panel in Polski for WooCommerce - checklist with color-coded status for each requirement.
---

The compliance dashboard is the central place for checking store legal requirements. It displays a checklist with status for each requirement - from terms and conditions to GPSR and DSA.

## Accessing the dashboard

Go to **WooCommerce > Polski > Compliance Dashboard**. The dashboard is available to users with the `manage_woocommerce` permission (Administrator and Shop Manager roles).

## Checklist

The dashboard displays a list of legal requirements grouped into categories. Each requirement has a visual status:

### Statuses

| Status | Color   | Icon | Description                               |
| ------ | ------- | ---- | ----------------------------------------- |
| OK     | Green   | ✓    | Requirement met                           |
| WARN   | Yellow  | !    | Partially met, needs attention            |
| FAIL   | Red     | ✗    | Not met, requires immediate action        |
| OFF    | Gray    | -    | Module disabled                           |

### Category: legal pages

| Check                                | Green status when                       |
| ------------------------------------ | --------------------------------------- |
| Store terms and conditions           | Page published and assigned             |
| Privacy policy                       | Page published and assigned             |
| Withdrawal information               | Page published with form                |
| Cookie policy                        | Page published                          |
| Delivery and payment information     | Page published                          |

### Category: legal checkboxes

| Check                                | Green status when                       |
| ------------------------------------ | --------------------------------------- |
| Terms acceptance (checkout)          | Checkbox active and required            |
| Privacy policy (checkout)            | Checkbox active and required            |
| Terms acceptance (registration)      | Checkbox active and required            |
| Marketing consent                    | Checkbox active (optional)              |

### Category: Omnibus Directive

| Check                                | Green status when                       |
| ------------------------------------ | --------------------------------------- |
| Omnibus module active                | Module enabled in settings              |
| Price history recording              | Price history table exists and works    |
| Lowest price displayed               | Price visible on sale products          |
| 30-day period                        | Period set to at least 30 days          |

### Category: GPSR

| Check                                | Green status when                       |
| ------------------------------------ | --------------------------------------- |
| GPSR module active                   | Module enabled                          |
| Manufacturer data completed          | At least 80% of products have GPSR data|
| Representative data                  | Completed for non-EU products           |
| Safety information                   | Completed for products requiring it     |

### Category: DSA (Digital Services Act)

| Check                                | Green status when                       |
| ------------------------------------ | --------------------------------------- |
| DSA report form                      | Form available on a page                |
| DSA contact point                    | Contact email set                       |
| Report register                      | Reports table exists                    |

### Category: checkout

| Check                                | Green status when                       |
| ------------------------------------ | --------------------------------------- |
| Order button label                   | Text compliant with EU directive        |
| Order summary                        | Visible before the payment button       |
| VAT and delivery information         | Displayed next to product prices        |

### Category: KSeF

| Check                                | Green status when                       |
| ------------------------------------ | --------------------------------------- |
| KSeF module active                   | Module enabled                          |
| Company NIP set                      | NIP configured in settings              |
| KSeF connection                      | Connection test completed successfully  |

### Category: greenwashing

| Check                                | Green status when                       |
| ------------------------------------ | --------------------------------------- |
| Anti-greenwashing module active      | Module enabled                          |
| Claims with evidence                 | All claims have justification           |
| Certificates with links             | Certificates have numbers and URLs      |

## Summary

At the top of the dashboard, a summary is displayed:

- **Overall score** - percentage of met requirements (e.g. 85%)
- **Progress bar** - visual representation of the score
- **Critical requirements** - number of unmet FAIL requirements
- **Warnings** - number of partially met WARN requirements
- **Last check date** - when the dashboard was last refreshed

## Requirement details

Clicking a requirement expands the section with details:

- **Description** - what exactly is being checked
- **Legal basis** - reference to the regulation
- **Status** - detailed status description
- **Recommended action** - what to do to meet the requirement
- **Settings link** - direct link to the relevant settings page

## Refreshing statuses

The dashboard checks statuses in real time on each opening. Checks include:

- Page existence and status (published / draft / deleted)
- Checkbox existence and configuration
- Product meta data correctness (sampling - random sample of 100 products)
- Module operation (activity, configuration correctness)
- External API connection tests (KSeF)

## Report export

The dashboard allows exporting a compliance report:

- **PDF** - report for download or printing
- **JSON** - machine-readable data (e.g. for a monitoring system)

```php
// Hook after report generation
add_action('polski/compliance/report_generated', function (array $results, string $format): void {
    // Log the report generation date
    update_option('polski_last_compliance_report', current_time('mysql'));
}, 10, 2);
```

## Notifications

The dashboard can send email notifications to the administrator:

- **Weekly report** - status summary sent once a week
- **Critical alert** - immediate notification when status changes to FAIL

Notification configuration: **WooCommerce > Polski > Compliance Dashboard > Notifications**.

```php
// Change report frequency
add_filter('polski/compliance/report_frequency', function (): string {
    return 'daily'; // 'daily', 'weekly', 'monthly'
});
```

## Requirements filter

You can add custom checks to the dashboard:

```php
add_filter('polski/compliance/checks', function (array $checks): array {
    $checks[] = [
        'id'       => 'custom_ssl',
        'category' => 'security',
        'label'    => 'SSL Certificate',
        'callback' => function (): array {
            $is_ssl = is_ssl();
            return [
                'status'  => $is_ssl ? 'ok' : 'fail',
                'message' => $is_ssl ? 'SSL active' : 'SSL certificate missing',
            ];
        },
    ];
    return $checks;
});
```

## Troubleshooting

**Dashboard shows outdated data** - click the **Refresh** button at the top of the dashboard. Checks are performed live, but some data (e.g. GPSR sampling) may be cached.

**FAIL status for a legal page** - check that the page is published (not a draft) and assigned in **WooCommerce > Settings > Advanced > Page setup**.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
