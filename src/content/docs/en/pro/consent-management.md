---
title: Consent management
description: Documentation of advanced consent management in Polski PRO for WooCommerce - versioning, audit trail, GDPR export, My Account integration.
---

The consent management module adds consent versioning, audit trail, data export and GDPR integration. It tracks customer consent history and responds to changes in terms and conditions content.

## Consent versioning

### Automatic change detection

The plugin monitors the content of legal checkbox labels. Each time settings are saved, it calculates a hash (SHA-256) of the label content. If the hash has changed - the plugin automatically creates a new consent version.

Each consent version contains:

- version number (auto-increment)
- label content hash
- full label content
- version creation date
- ID of the user who made the change

### Version history

In the legal checkbox settings, a **Version history** button is available next to each checkbox. It displays a list of all versions with dates and content preview.

### Re-consent

When consent content changes (new version), the plugin can require customers to give their consent again. Configuration:

| Setting | Description |
|---------|-------------|
| Require re-consent | Enables a prompt for re-consent after content change |
| Display prompt | On checkout page / In My Account panel / Both |
| Message content | Text informing the customer about the terms change |

The customer sees a message about the content change and must check the checkbox again. The previous consent remains in the history with a version label.

## Audit trail

### Recorded events

The plugin records all consent-related operations:

| Event | Data |
|-------|------|
| Consent granted | User ID, consent ID, version, date, IP, user agent |
| Consent revoked | User ID, consent ID, date, source (customer/admin) |
| Consent content changed | Consent ID, old version, new version, date, admin ID |
| Re-consent prompt | User ID, consent ID, date |
| Re-consent given | User ID, consent ID, new version, date |

### Browsing history

Go to **WooCommerce > Settings > Polski > PRO Modules > Consents > Audit trail**. The table contains all events with filters:

- user ID or email
- event type
- date range
- specific consent

### Data export

The audit trail can be exported in two formats:

- **CSV** - for opening in a spreadsheet application
- **JSON** - for programmatic processing or import into another system

Export is available from the Audit trail panel. You can export the full history or filtered results.

## My Account panel integration

### Revoking consent

In the customer's **My Account** panel, a "My consents" section appears with a list of granted consents. The customer can:

- browse currently granted consents
- see the date each consent was granted
- revoke consent with the "Revoke" button

Consent revocation is recorded in the audit trail. The administrator receives an email notification about the revocation (configurable).

### Re-consent prompt

If the consent content has changed, the customer sees a message in the My Account panel asking them to review the new version and give their consent again.

## GDPR integration

### Personal data export

The plugin integrates with the WordPress personal data export mechanism (`wp_privacy_personal_data_exporters`). When a customer data export is requested, the plugin includes:

- list of granted consents with dates and versions
- full consent change history (grants, revocations, re-consents)
- IP addresses and dates associated with each consent

```php
/**
 * Rejestracja eksportera danych osobowych.
 */
add_filter('wp_privacy_personal_data_exporters', function (array $exporters): array {
    $exporters['polski-pro-consents'] = [
        'exporter_friendly_name' => 'Polski PRO - Zgody',
        'callback'               => [PolskiPro\Privacy\Exporter::class, 'export'],
    ];
    return $exporters;
});
```

### Personal data erasure

The plugin integrates with the WordPress data erasure mechanism (`wp_privacy_personal_data_erasers`). When a data deletion is requested:

- personal data in the audit trail is anonymized (IP, user agent)
- consent entries are marked as deleted
- the fact of granting/revoking consent itself remains (without identifying data) for accountability purposes

```php
/**
 * Rejestracja erasera danych osobowych.
 */
add_filter('wp_privacy_personal_data_erasers', function (array $erasers): array {
    $erasers['polski-pro-consents'] = [
        'eraser_friendly_name' => 'Polski PRO - Zgody',
        'callback'             => [PolskiPro\Privacy\Eraser::class, 'erase'],
    ];
    return $erasers;
});
```

## REST API

The module provides a REST API endpoint for browsing consents (available to administrators):

### User consent list

```
GET /wp-json/polski-pro/v1/consents?user_id={id}
```

Returns a list of user consents with current status and version.

### Change history

```
GET /wp-json/polski-pro/v1/consents/audit?user_id={id}
```

Query parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `user_id` | int | User ID |
| `consent_id` | string | Specific consent ID |
| `event_type` | string | Event type (granted, revoked, re_consented) |
| `date_from` | string | Date from (YYYY-MM-DD) |
| `date_to` | string | Date to (YYYY-MM-DD) |
| `per_page` | int | Number of results (default 50) |

### Export

```
GET /wp-json/polski-pro/v1/consents/export?format={csv|json}
```

Returns a full audit trail export in the selected format.

## Hooks

### `polski_pro/consent/granted`

Action fired after consent is granted.

```php
/**
 * @param int    $user_id    ID użytkownika
 * @param string $consent_id ID zgody
 * @param int    $version    Numer wersji zgody
 */
do_action('polski_pro/consent/granted', int $user_id, string $consent_id, int $version);
```

**Example:**

```php
add_action('polski_pro/consent/granted', function (int $user_id, string $consent_id, int $version): void {
    // Synchronizacja z zewnętrznym CRM
    if ($consent_id === 'marketing') {
        wp_remote_post('https://crm.example.com/api/consent', [
            'body' => wp_json_encode([
                'email'   => get_userdata($user_id)->user_email,
                'consent' => 'marketing',
                'status'  => 'granted',
                'version' => $version,
            ]),
            'headers' => ['Content-Type' => 'application/json'],
        ]);
    }
}, 10, 3);
```

### `polski_pro/consent/revoked`

Action fired after consent is revoked.

```php
/**
 * @param int    $user_id    ID użytkownika
 * @param string $consent_id ID zgody
 * @param string $source     Źródło wycofania (customer, admin)
 */
do_action('polski_pro/consent/revoked', int $user_id, string $consent_id, string $source);
```

**Example:**

```php
add_action('polski_pro/consent/revoked', function (int $user_id, string $consent_id, string $source): void {
    if ($consent_id === 'newsletter' && $source === 'customer') {
        // Wypisanie z newslettera
        do_action('newsletter_unsubscribe', get_userdata($user_id)->user_email);
    }
}, 10, 3);
```

## Common issues

### Re-consent prompt not displaying

1. Check if the "Require re-consent" option is enabled
2. Verify that the consent content has actually changed (check version history)
3. Clear the checkout page and My Account panel cache

### GDPR export does not contain consent data

1. Make sure the consent management module is active
2. Check if the `polski-pro-consents` exporter is registered in **Tools > Export Personal Data**
3. Verify logs for PHP errors

### Audit trail growing too fast

The plugin stores consent history in a separate database table. With a large number of customers, the table can grow. Consider:

- regularly exporting and archiving older entries
- setting up automatic cleanup of entries older than a specified number of months (option in settings)

## Related resources

- [Legal checkboxes](/checkout/legal-checkboxes/)
- [GDPR](/compliance/gdpr/)
- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
