---
title: Automation Rules
description: An automation rules engine with trigger-filter-action, REST API, dry run, audit log, and geographic filters (PL/EU/EEA).
---

The **Automation Rules** module runs actions (email, SMS, status change, note, customer tag, webhook) based on events in the store. You define rules in the **WooCommerce > Automation Rules** panel through a React SPA, and the engine executes them in response to a trigger.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.6.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Architecture

| Element              | Description                                                                           |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Trigger**          | A WooCommerce event that runs the rule (`new_order`, `order_status_changed`, ...)     |
| **Filter**           | A logical condition (`order_total > 100`, `geo_scope in eu`, ...)                     |
| **Action**           | An operation to perform (`send_email`, `add_order_note`, `webhook`, ...)              |
| **Match mode**       | `all` - all filters met, `any` - one is enough                                        |
| **Priority**         | Execution order (lower = earlier)                                                     |

Rules are stored in the `wp_polski_pro_automation_rules` table. Executions (matched/skipped, dry run, action result, error) go to `wp_polski_pro_automation_logs`.

## Triggers

| Value                   | When fired                                          |
| ----------------------- | ---------------------------------------------------- |
| `new_order`             | `woocommerce_new_order`                              |
| `order_status_changed`  | `woocommerce_order_status_changed`                   |
| `new_customer`          | `user_register`                                      |
| `cart_abandoned`        | (reserved - integration with `AbandonedCartService`) |
| `product_saved`         | `save_post_product`                                  |

## Filters

Fields available in filters (`FilterField`):

| Field               | Source                                         | Operators                          |
| ------------------- | ---------------------------------------------- | ---------------------------------- |
| `order_total`       | `WC_Order::get_total()`                        | `equals`, `gt`, `lt`, `not_equals` |
| `order_status`      | `WC_Order::get_status()`                       | `equals`, `in`, `not_in`           |
| `item_count`        | `WC_Order::get_item_count()`                   | `gt`, `lt`, `equals`               |
| `billing_country`   | ISO 3166-1 alpha-2                             | `equals`, `in`, `not_in`           |
| `shipping_country`  | ISO 3166-1 alpha-2 (fallback to billing)       | `equals`, `in`, `not_in`           |
| `geo_scope`         | `pl`, `eu`, `eea`, `non_eu`                    | `equals`                           |
| `customer_email`    | `WC_Order::get_billing_email()`                | `equals`, `contains`               |
| `payment_method`    | `WC_Order::get_payment_method()`               | `equals`, `in`                     |
| `shipping_method`   | List of methods from the shipping line item    | `in`, `not_in`                     |
| `product_id`        | List of product IDs in the order               | `in`, `not_in`                     |
| `category`          | List of `product_cat` IDs from the order items | `in`, `not_in`                     |

The `in` / `not_in` operator accepts a comma-separated list (`PL,DE,FR`).

### Geographic filters

The `geo_scope` field returns one of four values for an order/user:

| Value    | Scope                                         |
| -------- | --------------------------------------------- |
| `pl`     | Poland (PL)                                   |
| `eu`     | EU countries (27 member states)               |
| `eea`    | EEA = EU + Norway, Iceland, Liechtenstein     |
| `non_eu` | The rest of the world                         |

Usage example: a rule sends a different marketing email template to customers from the EU (with a GDPR note) than to those outside the EU.

## Actions

| Type                 | Parameters                                                                           |
| -------------------- | ------------------------------------------------------------------------------------ |
| `send_email`         | `to` (optional), `subject`, `body`, `marketing` (boolean enforcing consent)          |
| `send_sms`           | Delegated to `polski_pro/automation/send_sms` (requires `SmsNotificationService`)    |
| `change_order_status`| `status`, `note`                                                                     |
| `add_order_note`     | `note`, `customer_note` (boolean)                                                    |
| `add_customer_tag`   | `tag` (saves to the `polski_customer_tags` user_meta)                                |
| `webhook`            | `url` - a POST with `{subject_type, subject_id}`                                     |

### Marketing consent

Actions with `params.marketing = true` are skipped if the customer does not have valid marketing consent in `polski_consent_log`. The `polski_pro/automation/has_marketing_consent` filter lets you replace the default consent-checking logic.

### Extending actions

To add a custom action (e.g. integration with FreshMail/GetResponse), use the filter:

```php
add_filter('polski_pro/automation/action', function ($override, $action, $subject, $dryRun) {
    if ($action->type->value === 'send_email' && ($action->params['provider'] ?? '') === 'freshmail') {
        if ($dryRun) {
            return ['dry_run' => true, 'provider' => 'freshmail'];
        }
        // ... FreshMail API call ...
        return ['provider' => 'freshmail', 'sent' => true];
    }

    return $override;
}, 10, 4);
```

## REST API

All endpoints require `manage_woocommerce` + the `X-WP-Nonce` header.

| Method  | Path                                             | Description                     |
| ------- | ------------------------------------------------ | ------------------------------- |
| GET     | `/polski-pro/v1/automation/rules`                | List of rules                   |
| POST    | `/polski-pro/v1/automation/rules`                | Create a rule                   |
| GET     | `/polski-pro/v1/automation/rules/{id}`           | Retrieve a single rule          |
| PUT     | `/polski-pro/v1/automation/rules/{id}`           | Update a rule                   |
| DELETE  | `/polski-pro/v1/automation/rules/{id}`           | Delete + clean up logs          |
| POST    | `/polski-pro/v1/automation/rules/{id}/dry-run`   | Simulate on an order/user (`order_id` or `user_id`) |
| GET     | `/polski-pro/v1/automation/logs?limit=200`       | Audit log (max 500)             |
| GET     | `/polski-pro/v1/automation/schema`               | Schema of triggers/filters/actions |

## Dry run

In the rule editor, provide an `Order ID` and click **Run dry run**. The engine:

1. Evaluates the filters against the given order.
2. Checks marketing consent.
3. Executes the actions in dry-run mode (does not modify state) and returns the planned result.
4. Writes an entry to the audit log with the flag `dry_run = 1`.

## Limits and performance

- Indexes on `enabled`, `trigger_type`, `priority`, `group_label` - the engine fetches only rules matching the trigger.
- `recent($limit)` in `AutomationLogRepository` is limited to 500 records per query.
- Webhooks have a 10s timeout.
