---
title: Request for quote (RFQ)
description: Polski PRO for WooCommerce request for quote module - replacing the cart button with a quote form, consent logging, admin panel and email notifications.
---

The RFQ module replaces "Add to cart" with "Ask for price". Customers submit quote requests instead of buying directly. Useful for B2B stores and products with individual pricing.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Configuration

Go to **WooCommerce > Settings > Polski PRO > Request for quote** and enable the module.

### Basic settings

| Setting | Database option | Default value | Description |
|---------|----------------|---------------|-------------|
| Enable module | `polski_quote` | No | Activates the request for quote functionality |
| Button text | `polski_quote_button_text` | "Zapytaj o cenę" | Text displayed on the button |
| Show on listings | `polski_quote_show_on_loops` | No | Displays the quote button on archive and category pages |
| Require login | `polski_quote_require_login` | No | Requires login before submitting a request |
| Processing consent | `polski_quote_consent` | Yes | Adds a GDPR consent checkbox to the form |

### Form fields

The quote request form contains by default:

- **First and last name** - required
- **Email address** - required, format validation
- **Phone** - optional
- **Quantity** - required, numeric validation
- **Message** - optional, textarea
- **GDPR consent** - checkbox, required if enabled

## Frontend behavior

### Button replacement

After enabling the module, the "Add to cart" button is replaced with the quote request button. This applies to:

- Single product page
- Archive and category pages (if the `polski_quote_show_on_loops` option is enabled)
- Product widgets and shortcodes

### Shortcode

The quote request button can be placed anywhere using the shortcode:

```
[polski_quote_button product_id="123" text="Zapytaj o cenę" class="custom-class"]
```

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `product_id` | No | Product ID (defaults to current product) |
| `text` | No | Button text |
| `class` | No | Additional CSS classes |

### Form submission (AJAX)

The form is submitted asynchronously (AJAX) without page reload. After submission, the customer sees a confirmation message with the request number.

```php
/**
 * Filtruje dane zapytania ofertowego przed zapisem.
 *
 * @param array    $quote_data Dane zapytania
 * @param int      $product_id ID produktu
 * @param \WP_User $user       Obiekt zalogowanego użytkownika lub pusty
 */
apply_filters('polski_pro/quote/before_save', array $quote_data, int $product_id, $user): array;
```

**Example - adding a custom field:**

```php
add_filter('polski_pro/quote/before_save', function (array $quote_data, int $product_id, $user): array {
    $quote_data['meta']['company_nip'] = sanitize_text_field($_POST['company_nip'] ?? '');
    return $quote_data;
}, 10, 3);
```

## Consent logging

Each quote request saves consent information:

- Timestamp of consent given
- Client IP address (SHA-256 hashed)
- Consent content at the time of granting
- Form version

This data is stored in the `{prefix}_polski_quote_consents` table and can be exported for GDPR audit purposes.

```php
/**
 * Akcja wywoływana po zapisaniu zgody.
 *
 * @param int    $quote_id   ID zapytania ofertowego
 * @param array  $consent    Dane zgody
 * @param string $ip_hash    Zahashowany adres IP
 */
do_action('polski_pro/quote/consent_logged', int $quote_id, array $consent, string $ip_hash);
```

## Admin panel

### Request list

Quote requests are available in the **WooCommerce > Quote requests** menu. The list contains:

- Request number
- Customer data (name, email, phone)
- Product and quantity
- Status (new, in progress, replied, closed)
- Submission date

### Request statuses

| Status | Description |
|--------|-------------|
| `new` | New request, unprocessed |
| `in_progress` | Quote being prepared |
| `replied` | Quote sent to the customer |
| `accepted` | Customer accepted the quote |
| `rejected` | Customer rejected the quote |
| `closed` | Request closed |

### Responding to a request

From the panel, the administrator can:

1. Review request details
2. Add an internal note
3. Set the quoted price
4. Send an email response to the customer
5. Convert the request into a WooCommerce order

## Email notifications

The module registers the following email templates in WooCommerce:

| Email | Recipient | Trigger |
|-------|-----------|---------|
| New quote request | Administrator | Customer submits a request |
| Request confirmation | Customer | Request submission |
| Quote response | Customer | Administrator sends a quote |
| Request status change | Customer | Request status change |

Email templates can be overridden in the theme in the `woocommerce/emails/` directory:

- `polski-pro-quote-new.php`
- `polski-pro-quote-confirmation.php`
- `polski-pro-quote-reply.php`
- `polski-pro-quote-status.php`

## Hooks

### Form filter

```php
/**
 * Filtruje pola formularza zapytania ofertowego.
 *
 * @param array $fields Tablica pól formularza
 * @param int   $product_id ID produktu
 */
apply_filters('polski_pro/quote/form_fields', array $fields, int $product_id): array;
```

**Example - adding a VAT ID field:**

```php
add_filter('polski_pro/quote/form_fields', function (array $fields, int $product_id): array {
    $fields['company_nip'] = [
        'type'     => 'text',
        'label'    => 'NIP firmy',
        'required' => false,
        'priority' => 35,
    ];
    return $fields;
}, 10, 2);
```

### Post-submission action

```php
/**
 * Akcja wywoływana po zapisaniu zapytania ofertowego.
 *
 * @param int   $quote_id   ID zapytania
 * @param array $quote_data Dane zapytania
 */
do_action('polski_pro/quote/submitted', int $quote_id, array $quote_data);
```

**Example - sending to CRM:**

```php
add_action('polski_pro/quote/submitted', function (int $quote_id, array $quote_data): void {
    $crm_api = new MyCrmApi();
    $crm_api->create_lead([
        'name'    => $quote_data['name'],
        'email'   => $quote_data['email'],
        'product' => $quote_data['product_name'],
        'qty'     => $quote_data['quantity'],
    ]);
}, 10, 2);
```

## Troubleshooting

**"Add to cart" button still displays**
Check if the `polski_quote` option is enabled. Clear the cache of caching plugins (WP Super Cache, W3 Total Cache, LiteSpeed Cache).

**Form does not submit (AJAX error)**
Check the browser console for JavaScript errors. Make sure the `polski-pro-quote.js` script is loaded. Conflicts with other plugins may block AJAX - disable other plugins to identify the conflict.

**Emails are not being sent**
Check the email configuration in **WooCommerce > Settings > Emails**. Make sure the Polski PRO templates are enabled.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Integration with catalog mode: [B2B catalog mode](/pro/catalog-mode)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
