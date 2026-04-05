---
title: DSA - Digital Services Act
description: DSA (Digital Services Act) tools in Polski for WooCommerce - report form, admin panel, status tracking and email notifications.
---

The Digital Services Act (DSA, EU 2022/2065) requires online platforms to allow reporting of illegal content. The plugin adds a report form, admin panel for managing reports, status tracking and automatic email notifications.

## DSA requirements for online stores

From February 17, 2024, stores with user-generated content (reviews, comments, photos) must:

1. Provide a mechanism for reporting illegal content
2. Confirm receipt of the report
3. Process the report within a reasonable timeframe
4. Inform the reporter of the decision
5. Allow an appeal against the decision

This applies to stores where users can publish content - primarily product reviews.

## Report form

### Shortcode

Embed the DSA report form on any page using the shortcode:

```
[polski_dsa_report]
```

### With parameters

```
[polski_dsa_report product_id="123" category="illegal_content"]
```

### Shortcode parameters

| Parameter | Description | Default value |
|-----------|-------------|---------------|
| `product_id` | ID of the product the report concerns | None (user selects) |
| `category` | Pre-selected report category | None |

![DSA report form on the store page](../../../../assets/screenshots/screenshot-6-dsa-report-form.png)

### Form fields

The form contains the following fields:

- **Report category** - selection from a list (illegal content, copyright infringement, fake review, hate speech, personal data, other)
- **URL or content identifier** - link to the reported content or review ID
- **Description** - detailed description of the problem
- **Legal basis** - optional reference to legislation
- **Contact details** - name, email address of the reporter
- **Declaration** - checkbox confirming that the report is made in good faith

### Embedding example

Create a "Report Content" page and add the shortcode:

```
[polski_dsa_report]
```

Add a link to this page in the store footer so it is easily accessible.

## Admin panel

Manage DSA reports in **WooCommerce > DSA Reports**.

### Report list

The list displays all reports with columns:

- Report ID
- Submission date
- Category
- Status (new, in progress, resolved, rejected)
- Reporter (name, email)
- Content link

### Report details

After clicking a report you see:

- Full form data
- Preview of the reported content (if it is a review - direct link)
- Status change history
- Internal note field
- Action buttons (change status, remove content, reject)

### Report statuses

| Status | Description |
|--------|-------------|
| `new` | New report, awaiting processing |
| `in_progress` | Report under analysis |
| `resolved` | Report processed, content removed or other action taken |
| `rejected` | Report rejected as unfounded |
| `appealed` | Reporter filed an appeal against the decision |

## Email notifications

The plugin sends automatic emails in these situations:

| Event | Recipient | Content |
|-------|-----------|---------|
| New report | Administrator | Information about the new report with data |
| Confirmation | Reporter | Confirmation of report receipt with ID number |
| Status change | Reporter | Information about status change with justification |
| Resolution | Reporter | Decision with justification and information about the right to appeal |

Email templates can be customized in **WooCommerce > Settings > Emails**.

## Hook

### polski/dsa/report_created

Triggered after creating a new DSA report.

```php
/**
 * @param int    $report_id   DSA report ID.
 * @param array  $report_data Report data.
 * @param string $category    Report category.
 */
add_action('polski/dsa/report_created', function (int $report_id, array $report_data, string $category): void {
    // Example: send notification to the legal team via Slack
    $webhook_url = 'https://hooks.slack.com/services/XXXX/YYYY/ZZZZ';
    
    wp_remote_post($webhook_url, [
        'body' => wp_json_encode([
            'text' => sprintf(
                'New DSA report #%d (category: %s) - %s',
                $report_id,
                $category,
                $report_data['description']
            ),
        ]),
        'headers' => ['Content-Type' => 'application/json'],
    ]);
}, 10, 3);
```

### Example - automatically hiding reviews of a specific category

```php
add_action('polski/dsa/report_created', function (int $report_id, array $report_data, string $category): void {
    // Automatically hold reviews reported as hate speech
    if ($category !== 'hate_speech') {
        return;
    }
    
    $comment_id = $report_data['content_id'] ?? 0;
    if ($comment_id > 0) {
        wp_set_comment_status($comment_id, 'hold');
        
        // Log the automatic action
        update_post_meta($report_id, '_auto_action', 'comment_held');
    }
}, 10, 3);
```

## Reporting

DSA requires maintaining a report register. Export all reports to CSV via **WooCommerce > DSA Reports > Export**. The export includes:

- Report ID
- Submission date and time
- Category
- Status and resolution date
- Processing time (in hours)
- Action taken

## Configuration

DSA module settings are in **WooCommerce > Settings > Polski > DSA**.

| Option | Description | Default value |
|--------|-------------|---------------|
| Enable DSA form | Activates the module | Yes |
| Form page | WordPress page with the shortcode | None |
| Administrator email | Email address for notifications | WordPress administrator email |
| Processing deadline | Number of business days for processing | 7 |
| Report categories | List of available categories | Default list |

## Troubleshooting

**The form does not display on the page**
Check that the shortcode `[polski_dsa_report]` is on the page and the DSA module is enabled in settings.

**Email notifications do not arrive**
Check your SMTP configuration. The default `wp_mail()` function does not work on all servers. Install an SMTP plugin (e.g. WP Mail SMTP).

**Reports do not appear in the panel**
Check user permissions. Managing DSA reports requires the `shop_manager` or `administrator` role.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Discussions and questions: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
