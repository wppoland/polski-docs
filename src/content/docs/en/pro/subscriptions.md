---
title: Subscriptions
description: Documentation of the Polski PRO for WooCommerce subscriptions module - recurring products, renewals, email reminders, cron and My Account panel.
---

The subscriptions module adds products with recurring payments. Customers buy subscriptions with manual renewal, and the administrator manages them in WooCommerce.

## How it works

1. The administrator creates a "Subscription" product type with a cycle and price
2. The customer purchases a subscription and pays the first order
3. The plugin creates a subscription with "Active" status
4. Before the renewal date, the customer receives a reminder email
5. On the renewal date, the plugin creates a renewal order
6. The customer pays the renewal order (manual renewal)
7. The cycle repeats until the subscription is cancelled

## Configuration

Go to **WooCommerce > Settings > Polski > PRO Modules > Subscriptions**.

The module is controlled by the option:

```
polski_subscriptions
```

### General settings

| Setting | Description |
|---------|-------------|
| Enable subscriptions | Activates the module |
| Renewal mode | Manual (customer pays the order) |
| Reminder days | How many days before renewal to send a reminder (default 3) |
| Grace period | How many days after the renewal date the subscription stays active (default 7) |
| Automatic suspension | Suspend subscription after the grace period expires |

### Creating a subscription product

1. Go to **Products > Add New**
2. Select product type: **Subscription**
3. Configure the price and cycle:

| Field | Description |
|-------|-------------|
| Subscription price | Amount per billing period |
| Billing period | Day / Week / Month / Year |
| Period length | Number of periods (e.g. 1 month, 3 months) |
| Initial price | Optional - different price for the first period |
| Activation fee | Optional - one-time fee on the first order |
| Renewal limit | 0 = no limit, or number of renewals |

4. Publish the product

### Initial price vs renewal price

The plugin supports scenarios where the price for the first period differs from the price for subsequent periods. Typical use cases:

- free trial or reduced-price trial period
- promotional introductory price
- activation fee + lower recurring price

The initial price is applied only to the first order. Subsequent renewal orders use the standard subscription price.

## Subscription lifecycle

```
Pending → Active → On Hold → Active → ...
                  → Expired
                  → Cancelled
```

| Status | Description |
|--------|-------------|
| Pending | Awaiting payment of the first order |
| Active | Active - customer has access to the product |
| On Hold | Suspended - renewal order awaiting payment |
| Expired | Expired - renewal count reached the limit or grace period passed |
| Cancelled | Cancelled by the customer or administrator |

## Renewals

### Manual renewal

In the current version, the plugin supports manual renewals. This means that:

1. The plugin creates a renewal order with "Pending payment" status
2. The customer receives an email with a link to pay the order
3. The customer pays the order using their chosen payment method
4. After payment, the subscription is renewed for the next period

### Renewal process

The plugin checks subscriptions due for renewal daily using WP cron:

```
polski_daily_maintenance
```

The cron task runs once daily and performs:

- checking subscriptions whose renewal date falls on today or earlier
- creating renewal orders for subscriptions requiring renewal
- suspending subscriptions that have exceeded the grace period
- expiring subscriptions that have reached the renewal limit

### Email reminders

The plugin sends email reminders before the renewal date:

| Email | When | Content |
|-------|------|---------|
| Renewal reminder | X days before renewal | Information about the upcoming renewal, amount, link to the panel |
| Renewal order | On the renewal date | Order to pay with a payment link |
| Subscription suspended | After payment due date passes | Information about suspension, link to pay |
| Subscription expired | After grace period passes | Information about expiration, link to repurchase |

Email templates can be customized in **WooCommerce > Settings > Emails**.

## My Account panel

The module adds a `/polski-subscriptions` endpoint to the customer's My Account panel. The endpoint is available at:

```
/moje-konto/polski-subscriptions/
```

### Subscription list

The customer sees a table with subscriptions:

| Column | Description |
|--------|-------------|
| Product | Subscription product name |
| Status | Current subscription status |
| Price | Amount per period |
| Next renewal | Next renewal date |
| Actions | Cancel / Pay renewal |

### Subscription details

After clicking on a subscription, the customer sees:

- full subscription data (product, price, cycle, dates)
- renewal history (list of associated orders)
- subscription cancellation button
- button to pay a pending renewal (if applicable)

### Cancelling a subscription

The customer can cancel an active subscription from the My Account panel. Cancellation:

- changes the subscription status to "Cancelled"
- the subscription remains active until the end of the current paid period
- the customer is informed about the access end date

## Hooks

### `polski_pro/subscription/status_changed`

Action fired after a subscription status change.

```php
/**
 * @param int    $subscription_id ID subskrypcji
 * @param string $new_status      Nowy status
 * @param string $old_status      Poprzedni status
 */
do_action('polski_pro/subscription/status_changed', int $subscription_id, string $new_status, string $old_status);
```

**Example:**

```php
add_action('polski_pro/subscription/status_changed', function (int $subscription_id, string $new_status, string $old_status): void {
    if ($new_status === 'cancelled') {
        $subscription = polski_pro_get_subscription($subscription_id);
        // Wysłanie ankiety o powód rezygnacji
        wp_mail(
            $subscription->get_customer_email(),
            'Szkoda, że odchodzisz',
            'Powiedz nam, dlaczego anulujesz subskrypcję: https://example.com/ankieta'
        );
    }
}, 10, 3);
```

### `polski_pro/subscription/renewal_created`

Action fired after a renewal order is created.

```php
/**
 * @param int $order_id        ID zamówienia odnowienia
 * @param int $subscription_id ID subskrypcji
 */
do_action('polski_pro/subscription/renewal_created', int $order_id, int $subscription_id);
```

**Example:**

```php
add_action('polski_pro/subscription/renewal_created', function (int $order_id, int $subscription_id): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Zamówienie odnowienia dla subskrypcji #%d', $subscription_id)
    );
}, 10, 2);
```

### `polski_pro/subscription/renewal_paid`

Action fired after a renewal order is paid.

```php
/**
 * @param int $order_id        ID zamówienia odnowienia
 * @param int $subscription_id ID subskrypcji
 */
do_action('polski_pro/subscription/renewal_paid', int $order_id, int $subscription_id);
```

## Admin panel

### Subscription list

Go to **WooCommerce > Subscriptions**. The table contains:

- subscription ID
- customer (first name, last name, email)
- product
- status
- price and cycle
- next renewal date
- creation date

Available filters: status, product, creation date.

### Editing a subscription

The administrator can:

- change the subscription status
- change the next renewal date
- change the price (affects subsequent renewals)
- add a note
- browse status history and associated orders

## Common issues

### Renewal orders are not being created

1. Check if WP-Cron is working properly (`wp_cron` is being called)
2. Go to **Tools > Scheduled Actions** and check if the `polski_daily_maintenance` task is scheduled
3. Verify that the subscription has "Active" status and a correct renewal date

### Customer does not receive reminders

1. Check the WooCommerce email configuration
2. Verify that the reminder email template is enabled
3. Check the "Reminder days" setting - whether it is greater than 0

### Subscription does not change status after payment

1. Check if the renewal order has a correct association with the subscription
2. Verify WooCommerce logs for errors
3. Check if the payment gateway correctly changes the order status

## Related resources

- [PRO overview](/pro/overview/)
- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
