---
title: Affiliate program
description: Documentation of the Polski PRO for WooCommerce affiliate program - referral links, commission tracking, affiliate registration and My Account panel.
---

The affiliate program module lets you run a referral program in the store. Affiliates share referral links, and the plugin tracks conversions and calculates commissions.

## How it works

1. A customer registers as an affiliate in the My Account panel
2. The administrator activates the affiliate account
3. The affiliate receives a unique token and referral link
4. The affiliate shares the link (e.g. on social media, on a blog)
5. A visitor clicks the link - the token is saved in a cookie
6. The visitor places an order - the plugin associates the order with the affiliate
7. After the order is paid, the plugin calculates the commission

## Configuration

Go to **WooCommerce > Settings > Polski > PRO Modules > Affiliate program**.

The module is controlled by the option:

```
polski_affiliates
```

### General settings

| Setting | Description |
|---------|-------------|
| Enable affiliate program | Activates the module |
| Commission rate (%) | Percentage commission on order value (default 10%) |
| Commission basis | Net amount / Gross amount / Net amount excluding shipping |
| Cookie duration (days) | How many days the token cookie is valid (default 30) |
| Automatic activation | Automatically activate new affiliates (default: disabled) |
| Minimum payout | Minimum commission amount for payout |
| URL parameter | Name of the parameter in the referral link (default `poleca`) |

### Per-product commission rates

In addition to the global commission rate, the administrator can set an individual rate for a specific product. In the product editor, under the "Affiliate program" section:

- **Commission rate (%)** - overrides the global rate
- **Exclude from program** - the product does not generate commissions

Per-category commission rates are also supported - a setting on a category applies to all products in that category, unless a product has its own rate.

## Referral links

### Link format

The referral link contains a URL parameter with the affiliate token:

```
https://example.com/?poleca=abc123def456
```

The `poleca` parameter is configurable. The token is a unique affiliate identifier generated upon registration.

### Cookie tracking

After clicking a referral link, the plugin sets a cookie:

| Parameter | Value |
|-----------|-------|
| Cookie name | `polski_affiliate_token` |
| Value | Affiliate token |
| Lifetime | Configurable (default 30 days) |
| Path | `/` |
| SameSite | `Lax` |

The cookie is set server-side (PHP) with the `HttpOnly` flag. On subsequent visits, the plugin checks for the cookie and associates any order with the affiliate.

### Order attribution

The plugin uses a "last click" attribution model - if a customer clicked links from multiple affiliates, the commission goes to the last one. The cookie is overwritten with each new link click.

## Affiliate registration and activation

### Registration

A customer can register as an affiliate in the My Account panel at `/moje-konto/polski-affiliates/`. The registration form contains:

- first and last name (fetched automatically from the account)
- commission payment method (bank transfer / discount code)
- bank account number (for bank transfer)
- consent to the affiliate program terms

### Activation

By default, new affiliate accounts require manual activation by the administrator. The administrator receives an email notification about a new registration and can:

- activate the account in the **WooCommerce > Affiliates** panel
- reject the registration with a reason

Optionally, automatic activation can be enabled - new accounts become active immediately after registration.

### Affiliate statuses

| Status | Description |
|--------|-------------|
| Pending | Awaiting activation |
| Active | Active - can generate links and earn commissions |
| Suspended | Suspended by the administrator |
| Rejected | Rejected - registration denied |

## Commission tracking

### Commission calculation

Commissions are calculated automatically after a paid order is associated with an affiliate. Commissions are not calculated for:

- cancelled or refunded orders
- orders placed by the affiliate themselves (self-referral)
- products excluded from the program

### Commission statuses

| Status | Description |
|--------|-------------|
| Pending | Calculated, awaiting approval |
| Approved | Approved, ready for payout |
| Paid | Paid out |
| Rejected | Rejected (e.g. order refunded) |

### Automatic approval

Commissions change status from "Pending" to "Approved" after a configurable period (default 14 days). The delay protects against commissions from orders that may be refunded.

If an order is cancelled or refunded during the waiting period, the commission is automatically rejected.

## My Account panel

The module adds a `/polski-affiliates` endpoint to the My Account panel. The endpoint is available at:

```
/moje-konto/polski-affiliates/
```

### Affiliate dashboard

After account activation, the affiliate sees a dashboard with:

- **Statistics** - total clicks, orders, commissions
- **Referral link** - full link with a copy button
- **Commissions** - list of commissions with dates, amounts and statuses
- **Payouts** - payout history
- **Monthly statistics** - clicks and conversions chart

### Link generation

The affiliate can generate a referral link to:

- the store homepage
- a specific product
- a product category
- any page within the store domain

Each link contains the `poleca` parameter with the affiliate token.

## Admin panel

### Affiliate list

Go to **WooCommerce > Affiliates**. The table contains:

- first and last name
- email
- status
- registration date
- number of referrals
- total commission
- payout balance

### Commission management

Go to **WooCommerce > Affiliates > Commissions**. The administrator can:

- browse the commission list with filters (affiliate, status, date)
- approve or reject commissions
- mark commissions as paid
- export commissions to CSV

### Report

Go to **WooCommerce > Affiliates > Report**. The report contains:

- total value of referred orders
- total commission amount
- conversion rate (clicks -> orders)
- top 10 affiliates
- monthly trend

## Hooks

### `polski_pro/affiliate/commission_created`

Action fired after a commission is calculated.

```php
/**
 * @param int   $commission_id ID prowizji
 * @param int   $affiliate_id  ID afilianta
 * @param int   $order_id      ID zamówienia
 * @param float $amount        Kwota prowizji
 */
do_action('polski_pro/affiliate/commission_created', int $commission_id, int $affiliate_id, int $order_id, float $amount);
```

**Example:**

```php
add_action('polski_pro/affiliate/commission_created', function (int $commission_id, int $affiliate_id, int $order_id, float $amount): void {
    // Powiadomienie afilianta o nowej prowizji
    $affiliate = get_userdata($affiliate_id);
    wp_mail(
        $affiliate->user_email,
        'Nowa prowizja w programie afiliacyjnym',
        sprintf(
            'Otrzymałeś prowizję %.2f zł za zamówienie #%d.',
            $amount,
            $order_id
        )
    );
}, 10, 4);
```

### `polski_pro/affiliate/registered`

Action fired after a new affiliate registers.

```php
/**
 * @param int $user_id ID użytkownika
 * @param string $token Wygenerowany token afilianta
 */
do_action('polski_pro/affiliate/registered', int $user_id, string $token);
```

**Example:**

```php
add_action('polski_pro/affiliate/registered', function (int $user_id, string $token): void {
    // Przypisanie roli WordPress
    $user = get_userdata($user_id);
    $user->add_role('affiliate');
}, 10, 2);
```

### `polski_pro/affiliate/validate_referral`

Filters the referral validation before commission calculation.

```php
/**
 * @param bool $is_valid     Czy polecenie jest prawidłowe
 * @param int  $affiliate_id ID afilianta
 * @param int  $order_id     ID zamówienia
 */
apply_filters('polski_pro/affiliate/validate_referral', bool $is_valid, int $affiliate_id, int $order_id): bool;
```

**Example:**

```php
add_filter('polski_pro/affiliate/validate_referral', function (bool $is_valid, int $affiliate_id, int $order_id): bool {
    $order = wc_get_order($order_id);
    
    // Blokowanie self-referral po adresie e-mail
    $affiliate_email = get_userdata($affiliate_id)->user_email;
    if ($order->get_billing_email() === $affiliate_email) {
        return false;
    }
    
    return $is_valid;
}, 10, 3);
```

## Common issues

### Commission is not being calculated

1. Check if the affiliate has "Active" status
2. Verify that the `polski_affiliate_token` cookie is set (browser developer tools)
3. Check if the order was not placed by the affiliate themselves
4. Verify that the products in the order are not excluded from the program

### Cookie is not being set after clicking the link

1. Check if the URL parameter is correct (default `poleca`)
2. Verify that the affiliate token exists and is active
3. Check if caching plugins are caching the page with URL parameters - add the `poleca` parameter to the cache exclusion list

### Affiliate does not see the panel in My Account

1. Check if the affiliate module is enabled
2. Go to **Settings > Permalinks** and click "Save" (refreshes rewrite rules)
3. Verify that the `polski-affiliates` endpoint is registered

## Related resources

- [PRO overview](/pro/overview/)
- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
