---
title: Email address verification
description: Double opt-in at registration - activation link, login blocking and message configuration in WooCommerce.
---

Double opt-in confirms that the provided email actually belongs to the person creating the account. Polski for WooCommerce sends an activation link and blocks login until the link is clicked.

## Why use double opt-in

Polish law does not require double opt-in, but it is worth enabling because of:

- **GDPR** - you confirm the email owner's identity
- **Bot protection** - blocks fake accounts
- **Database quality** - you are sure emails are real
- **Deliverability** - fewer bounced messages and spam flags
- **Electronic services act** - confirmation of intent to use the service

## Configuration

Go to **WooCommerce > Settings > Polski > Checkout** and configure the "Email Verification" section.

### Basic settings

| Setting | Default value | Description |
|---------|---------------|-------------|
| Enable email verification | No | Activates the double opt-in mechanism |
| Link validity period | 48 hours | How long the activation link is active |
| Auto-delete unverified | 7 days | After how many days to delete unverified accounts |
| Allow purchases without verification | No | Whether an unverified user can place orders |

### Advanced settings

| Setting | Description |
|---------|-------------|
| Redirect after activation | URL where the user is redirected after clicking the link |
| Waiting page | Page displayed instead of "My Account" for unverified users |
| Resend link | Whether to display a "Resend activation link" button |
| Resend limit | Maximum number of link resends (abuse protection) |

## Verification process

### Step by step

1. Customer registers an account (via "My Account" or when placing an order)
2. The plugin generates an activation token and saves it in the database
3. An email with an activation link is sent to the provided address
4. The account has "unverified" status - login is blocked
5. Customer clicks the activation link in the email
6. The plugin verifies the token, activates the account and logs the user in
7. Customer is redirected to the "My Account" page or configured URL

### Registration when placing an order

If the "Allow purchases without verification" option is disabled:

- the order will not be placed until the customer verifies the email
- the customer will see a message with instructions to check their inbox

If the option is enabled:

- the order will be placed normally
- the account will require verification at the next login
- the activation email will be sent in parallel with the order confirmation

## Login blocking

Unverified users cannot log in. They see a message:

> "Your account has not been verified yet. Check your email inbox and click the activation link. [Resend link]"

### Blocking message configuration

Change the message in plugin settings. Available variables:

| Variable | Description |
|----------|-------------|
| `{email}` | User email address |
| `{resend_link}` | Link to resend the activation email |
| `{expiry}` | Link validity period |

Custom message example:

```
Account {email} requires verification. Click the link in the email we sent. 
Didn't receive the message? {resend_link}
```

## Email configuration

### Activation email template

The plugin adds a new email type in **WooCommerce > Settings > Emails > Email Address Verification**.

Available settings:

| Setting | Description |
|---------|-------------|
| Enable/disable | Activates email sending |
| Subject | Message subject (default: "Confirm your email address") |
| Header | Header in the email body |
| Content | Additional text above the activation link |
| Email type | HTML or plain text |

### Template variables

| Variable | Description |
|----------|-------------|
| `{site_title}` | Store name |
| `{customer_name}` | Customer first name |
| `{activation_link}` | Activation link (full URL) |
| `{activation_button}` | Activation button (HTML) |
| `{expiry_hours}` | Link validity period in hours |

### Overriding the email template

To customize the HTML template, copy the file:

```
wp-content/plugins/polski/templates/emails/email-verification.php
```

to:

```
wp-content/themes/your-theme/woocommerce/emails/email-verification.php
```

## Programmatic extensions

### Hook before verification

```php
add_action('polski/email_verification/before_verify', function (int $user_id, string $token): void {
    // Logic before account activation
    // e.g. event logging
    error_log(sprintf('Email verification for user #%d', $user_id));
}, 10, 2);
```

### Hook after verification

```php
add_action('polski/email_verification/verified', function (int $user_id): void {
    // Logic after account activation
    // e.g. role assignment, welcome email
    $user = new WP_User($user_id);
    $user->set_role('customer');
}, 10, 1);
```

### Redirect URL filter

```php
add_filter('polski/email_verification/redirect_url', function (string $url, int $user_id): string {
    return wc_get_page_permalink('myaccount') . 'edit-account/';
}, 10, 2);
```

### Token validity filter

```php
add_filter('polski/email_verification/token_expiry', function (int $hours): int {
    return 72; // 72 hours instead of the default 48
});
```

### Checking verification status

```php
$is_verified = get_user_meta($user_id, '_polski_email_verified', true);

if ($is_verified !== 'yes') {
    // Account not verified
}
```

## Abuse protection

### Resend limiting

The plugin allows resending the activation link up to 5 times per hour per email. Change the limit in settings.

### Token protection

- Tokens are generated using `wp_generate_password(32, false)` - cryptographically secure
- Each token can only be used once
- Tokens expire after the configured time
- Expired tokens are automatically deleted by WP-Cron

## Common issues

### Activation email does not arrive

1. Check the spam/junk folder
2. Verify SMTP configuration (recommended: WP Mail SMTP or similar plugin)
3. Check email logs in **WooCommerce > Status > Logs**
4. Make sure the email is not blocked by the mail server

### Activation link does not work

1. Check whether the link has expired (default 48 hours)
2. Verify that the WordPress permalink is correctly configured
3. Check whether a security plugin is blocking the URL with token

### Customer verified the email but cannot log in

1. Check whether the meta `_polski_email_verified` has the value `yes` in the user profile
2. Verify that another plugin is not blocking login
3. Check whether the account has been marked as spam by anti-spam

## Related resources

- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
