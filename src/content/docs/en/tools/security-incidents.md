---
title: Security incidents register
description: Security incidents register (CRA) in Polski for WooCommerce - event recording, CSV export and compliance with the Cyber Resilience Act.
---

The incidents register lets you document security events in the store. It supports compliance with the Cyber Resilience Act (CRA) - an EU regulation requiring an incident register for products with digital elements.

## What is CRA

The Cyber Resilience Act (CRA) is a European Union regulation establishing cybersecurity requirements for products with digital elements. Sellers are obliged to:

- Maintain a security incidents register
- Report incidents to supervisory authorities within 24 hours
- Inform customers about discovered security vulnerabilities
- Document corrective actions

## Accessing the register

Go to **WooCommerce > Polski > Tools > Security Incidents**. The register is available to users with the `manage_woocommerce` permission.

## Recording an incident

Click **Add Incident** and fill in the form:

### Form fields

| Field                   | Type       | Required | Description                             |
| ----------------------- | --------- | -------- | --------------------------------------- |
| Title                   | text      | Yes      | Short incident description              |
| Detection date          | datetime  | Yes      | When the incident was detected          |
| Occurrence date         | datetime  | No       | When the incident actually occurred     |
| Category                | select    | Yes      | Incident type                           |
| Priority                | select    | Yes      | Critical / High / Medium / Low          |
| Description             | textarea  | Yes      | Detailed event description              |
| Affected products       | multiselect| No      | WooCommerce products affected           |
| Impact scope            | select    | Yes      | Number of affected customers            |
| Actions taken           | textarea  | No       | Description of corrective actions       |
| Status                  | select    | Yes      | New / In Progress / Resolved / Closed   |
| Responsible person      | select    | No       | Assigned WordPress user                 |
| Reported to authority   | checkbox  | No       | Whether reported to supervisory authority|
| Report date             | datetime  | No       | When reported to authority              |
| Customers notified      | checkbox  | No       | Whether customers were notified         |
| Notification date       | datetime  | No       | When customers were notified            |
| Attachments             | file      | No       | Logs, screenshots, reports              |

### Incident categories

| Category                 | Description                                  |
| ------------------------ | -------------------------------------------- |
| Data breach              | Unauthorized access to personal data         |
| Malware                  | Malware, skimmer, backdoor                   |
| DDoS attack              | Denial of service attack                     |
| Unauthorized access      | Admin or customer account breach             |
| Software vulnerability   | Discovered vulnerability in plugin or theme  |
| Phishing                 | Phishing attack targeting store customers    |
| Data manipulation        | Unauthorized data change (prices, orders)    |
| Other                    | Other security events                        |

### Impact scale

| Scope                   | Description                                   |
| ----------------------- | --------------------------------------------- |
| No impact               | Incident detected and blocked                 |
| Single customer         | Affects 1 customer                            |
| Several customers       | Affects 2-10 customers                        |
| Many customers          | Affects 11-100 customers                      |
| Mass                    | Affects over 100 customers                    |

## Incident list

The register displays a table of all incidents with columns:

- **ID** - incident number
- **Date** - detection date
- **Title** - short description
- **Category** - incident type
- **Priority** - colored label (red/orange/yellow/gray)
- **Status** - current state
- **Responsible** - assigned person
- **Report** - whether reported to supervisory authority

### Filtering and sorting

The list allows filtering incidents by:
- Category
- Priority
- Status
- Date (date range)
- Responsible person

Sorting by any column (ascending/descending).

### Search

The search field searches incident titles and descriptions.

## Incident timeline

Each incident has a timeline documenting the chronology of actions:

```
2025-06-15 08:30 - Incident detected by monitoring system
2025-06-15 08:45 - Incident assigned to Jan Kowalski
2025-06-15 09:00 - Log analysis started
2025-06-15 10:30 - Source identified - unauthorized access through vulnerability in plugin X
2025-06-15 11:00 - Plugin X updated to latest version
2025-06-15 11:30 - All administrator passwords changed
2025-06-15 12:00 - Incident reported to UODO
2025-06-15 14:00 - Notification sent to affected customers
2025-06-15 15:00 - Status changed to "Resolved"
```

Timeline entries are added automatically (status changes, assignments) and manually (notes, actions).

## CSV export

Click **Export CSV** above the incidents table. The export includes:

### Export columns

| Column                  | Description                         |
| ----------------------- | ----------------------------------- |
| `incident_id`           | Incident number                     |
| `title`                 | Title                               |
| `detection_date`        | Detection date                      |
| `occurrence_date`       | Occurrence date                     |
| `category`              | Category                            |
| `priority`              | Priority                            |
| `description`           | Description                         |
| `affected_products`     | Affected product IDs                |
| `impact_scope`          | Impact scope                        |
| `actions_taken`         | Actions taken                       |
| `status`                | Status                              |
| `responsible_person`    | Responsible person                  |
| `reported_to_authority` | Whether reported to authority       |
| `report_date`           | Report date                         |
| `customers_notified`    | Whether customers notified          |
| `notification_date`     | Notification date                   |
| `resolution_date`       | Resolution date                     |

### Export filtering

The export can be limited to:
- A selected date range
- A selected category
- A selected status

```php
// Hook to modify export data
add_filter('polski/security_incidents/export_data', function (array $data): array {
    // Add a custom column
    foreach ($data as &$row) {
        $row['custom_field'] = 'value';
    }
    return $data;
});
```

## Notifications

The system sends automatic notifications:

| Event                              | Recipients              | Channel |
| ---------------------------------- | ----------------------- | ------- |
| New critical incident              | All administrators      | Email   |
| Incident status change             | Responsible person      | Email   |
| Incident without action > 24h     | Responsible person      | Email   |
| Approaching report deadline        | Administrators          | Email   |

Notification configuration: **WooCommerce > Polski > Tools > Incidents > Notifications**.

## Automatic detection

The module can automatically register certain events:

- **Failed logins** - series of failed login attempts (brute force)
- **Core file changes** - modification of WordPress core files
- **New admin user** - creation of an account with administrator role
- **Permission changes** - elevation of existing account permissions

Automatically detected events are registered with a category and priority but require manual verification (status "New").

```php
// Disable automatic detection
add_filter('polski/security_incidents/auto_detect', '__return_false');
```

## Programmatic incident creation

```php
do_action('polski/security_incidents/create', [
    'title'          => 'SQL injection attempt detected',
    'category'       => 'unauthorized_access',
    'priority'       => 'high',
    'description'    => 'SQL injection attempt detected in the product_id parameter.',
    'detection_date' => current_time('mysql'),
    'status'         => 'new',
]);
```

## Troubleshooting

**Notifications do not arrive** - check the WordPress email configuration. Using an SMTP plugin (e.g. WP Mail SMTP) is recommended instead of the default `wp_mail()` function.

**CSV export returns an empty file** - check filtering. If filters are set too restrictively, the result may be empty.

**Automatic detection generates too many alerts** - adjust thresholds in module settings. The default threshold for failed logins is 5 within 15 minutes - this may be too low for stores with many users.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
