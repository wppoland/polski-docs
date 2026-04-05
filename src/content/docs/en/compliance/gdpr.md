---
title: GDPR - personal data protection
description: GDPR consent configuration in Polski for WooCommerce - 7 checkboxes, consent logging, shortcode API and compliance with the General Data Protection Regulation.
---

The General Data Protection Regulation (GDPR) requires online stores to obtain explicit consent for personal data processing. Polski for WooCommerce provides 7 configurable checkboxes on the order page, a consent logging system and tools for managing customer consents.

## Required consents in Polish e-commerce

According to the GDPR, the Consumer Rights Act and the Act on Providing Services by Electronic Means, an online store should collect consents for:

1. Acceptance of store terms and conditions
2. Acknowledgment of the privacy policy
3. Right of withdrawal from the contract (confirmation of acknowledgment)
4. Consent to deliver digital content before the withdrawal period expires
5. Delivery notifications (SMS/email)
6. Review reminders
7. Marketing (newsletter, commercial offers)

## Checkbox configuration

Go to **WooCommerce > Settings > Polski > GDPR** to configure individual consents.

### 1. Store terms and conditions

Mandatory checkbox linking to the terms and conditions page.

| Setting | Description |
|---------|-------------|
| Text | Configurable, default: "I have read the [terms and conditions] and accept their terms" |
| Required | Yes (always) |
| Terms page | Select from WordPress pages |

### 2. Privacy policy

Mandatory checkbox linking to the privacy policy.

| Setting | Description |
|---------|-------------|
| Text | Default: "I have read the [privacy policy]" |
| Required | Yes (always) |
| Policy page | Select from WordPress pages |

### 3. Right of withdrawal from the contract

Information about acknowledgment of withdrawal conditions.

| Setting | Description |
|---------|-------------|
| Text | Default: "I have read the [withdrawal from contract] conditions" |
| Required | Yes |
| Withdrawal page | Select from WordPress pages |

### 4. Digital content

Consent required when selling digital content (e.g. e-books, downloadable files).

| Setting | Description |
|---------|-------------|
| Text | Default: "I consent to the delivery of digital content before the withdrawal period expires and acknowledge the loss of the right of withdrawal" |
| Required | Yes (when cart contains digital products) |
| Condition | Display only when cart contains virtual or downloadable products |

### 5. Delivery notifications

Consent to receive SMS/email notifications about shipment status.

| Setting | Description |
|---------|-------------|
| Text | Default: "I consent to receiving delivery status notifications" |
| Required | No |
| Channel | Email, SMS or both |

### 6. Review reminder

Consent to receive an email requesting a review after purchase.

| Setting | Description |
|---------|-------------|
| Text | Default: "I consent to receiving an email requesting a review of the purchased product" |
| Required | No |
| Delay | Number of days after delivery (default 7) |

### 7. Marketing

Consent to marketing communication.

| Setting | Description |
|---------|-------------|
| Text | Default: "I consent to receiving commercial information by electronic means" |
| Required | No |
| Scope | Newsletter, offers, promotions |

## Consent logging

Every consent given is recorded in the database with the following information:

| Field | Description |
|-------|-------------|
| User ID | WordPress customer ID (or 0 for guests) |
| Order ID | WooCommerce order number |
| Consent type | Checkbox identifier (e.g. `terms`, `privacy`, `marketing`) |
| Value | `granted` or `denied` |
| IP address | Anonymized customer IP address |
| User Agent | Browser and operating system |
| Timestamp | Date and time of consent (UTC) |
| Document version | Hash of the terms/policy version at the time of consent |

### Viewing consent logs

Consent logs are available in:

- **WooCommerce order** - "GDPR Consents" tab in the order side panel
- **User profile** - "Consent History" section in the customer profile in the admin panel
- **Export** - ability to export logs to CSV (**WooCommerce > Settings > Polski > GDPR > Export logs**)

### IP anonymization

By default, the plugin anonymizes the last octet of IPv4 addresses (e.g. `192.168.1.xxx`) and the last group of IPv6. This maintains GDPR compliance while preserving minimal log usability.

## Shortcode API

### Displaying customer consent status

```
[polski_consent_status]
```

Displays a list of given consents to the logged-in customer with the ability to withdraw them (where legally permissible - e.g. marketing consent).

### Marketing consent withdrawal form

```
[polski_consent_withdraw type="marketing"]
```

Displays a form allowing the customer to withdraw marketing consent. After withdrawal, the system automatically updates the consent status in the database.

### Shortcode parameters

| Parameter | Description | Available values |
|-----------|-------------|------------------|
| `type` | Consent type | `terms`, `privacy`, `withdrawal_right`, `digital_content`, `delivery_notifications`, `review_reminder`, `marketing` |

## Integration with WooCommerce Blocks

Consent checkboxes are automatically added to the block checkout form (WooCommerce Blocks Checkout). No additional configuration is required.

## Right to be forgotten

The plugin integrates with the WordPress personal data deletion tool (**Tools > Erase Personal Data**). After approving a deletion request, the system automatically:

1. Anonymizes data in consent logs
2. Deletes personal data from withdrawal forms
3. Preserves anonymized entries for accountability purposes

## Right to data portability

The plugin integrates with the WordPress data export tool (**Tools > Export Personal Data**). The export includes:

- Consent history
- Form data (anonymized)
- Communication preferences

## Troubleshooting

**Checkboxes do not display on the order page**
Check that the GDPR module is enabled in **WooCommerce > Settings > Polski > Modules**. If you use the block checkout form, make sure WooCommerce is updated to version 8.0+.

**Customer reports inability to place an order**
Check that required checkboxes are not duplicated by another plugin (e.g. Germanized, WPML). Disable other plugins adding consents and use only the Polski for WooCommerce module.

**Consent logs do not record the IP address**
Check that the server correctly passes the IP address. Behind a reverse proxy (e.g. Cloudflare) it may be necessary to configure the `X-Forwarded-For` header in WordPress.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Discussions and questions: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
