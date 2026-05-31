---
title: Store health monitor
description: Continuous, passive monitoring of front-end fatal errors, checkout failures and sales anomalies in Polski for WooCommerce, with email and webhook alerts.
---

The store health monitor is an optional module that watches your store's operational signals in the background and alerts you when something stops working. Unlike the site audit (on-demand compliance checks) and the incidents register (a manual log), this module runs on a schedule and evaluates three signals on its own: front-end fatal errors, the checkout failure rate, and a sales anomaly ("traffic but no orders").

Detection is passive: the module observes real WooCommerce events and order history. It never places synthetic orders, so it cannot create fake orders or charge cards. The trade-off is that a payment problem is detected once a real customer hits it, not proactively.

## Enabling the module

The module is **off by default**. Enable it under **WooCommerce > Polski > Modules** ("Store health monitor"). Once enabled, checks run every 5 minutes via WP-Cron. The dashboard is under **WooCommerce > Polski > Reports & Tools > Store health**. It requires the `manage_woocommerce` permission.

## Sensors

| Sensor                   | What it watches                                                              |
| ------------------------ | --------------------------------------------------------------------------- |
| Fatal errors (front-end) | Fatal PHP errors on storefront pages (`shutdown` handler). Admin and cron fatals are ignored. Considered active for 15 minutes after they occur. |
| Checkout / payments      | The share of failed checkouts over the last 2 hours. Observes classic checkout, block checkout (Store API), and the "failed" order status. |
| Sales anomaly            | Compares orders in the previous full hour against the typical count for the same weekday and hour over the past 8 weeks. Evaluated at most once per hour. |

### Statuses

| Status   | Meaning                                                  | Color  |
| -------- | -------------------------------------------------------- | ------ |
| OK       | Everything is within normal range                        | green  |
| Degraded | A threshold was crossed, but it is not a full outage     | orange |
| Down     | A serious problem (e.g. a fatal error or no sales)       | red    |

The overall status is the worst status across the sensors.

### How thresholds work

- **Checkout / payments:** an alert is raised when the failure rate reaches the threshold (30% by default). Above 1.5x the threshold the status escalates from "Degraded" to "Down". The rate is ignored until a minimum number of checkouts is observed (5 by default).
- **Sales anomaly:** "Down" is reported only when at least the threshold number of orders (3 by default) is typical for that hour but none arrived in the last full hour.

## Alerts

When the status worsens compared to the previous check, the module sends an alert. For an ongoing problem the alert repeats only after a cooldown (60 minutes by default), so you are not notified every 5 minutes.

| Channel | Details                                                                  |
| ------- | ------------------------------------------------------------------------ |
| Email   | Sent to the alert address (defaults to the site admin email).            |
| Webhook | Optional. Sends a JSON `{"text": ...}` payload (Slack/Discord-compatible).|

On a "Down" status the event is also recorded in the **security incidents register**, if that module is enabled, so the outage has an audit trail alongside manually logged incidents.

## Dashboard

The "Store health" dashboard shows the overall status, the time of the last check (UTC), and a table with each sensor, its status, and a detail line. The **Run check now** button forces an immediate evaluation. When the status is not "OK", an admin notice appears with a link to the dashboard.

## Settings

Settings live on the module card under **WooCommerce > Polski > Modules**.

| Setting                          | Default                | Description                                                       |
| -------------------------------- | ---------------------- | ----------------------------------------------------------------- |
| Alert email                      | site admin email       | Where to send health alerts.                                      |
| Alert webhook URL                | (empty)                | Optional JSON webhook (Slack/Discord).                            |
| Checkout failure threshold (%)   | 30                     | Alert when this share of checkouts fails within the last 2 hours. |
| Minimum checkout sample          | 5                      | Ignore the failure rate until at least this many checkouts occur. |
| Sales anomaly threshold          | 3                      | Alert only when this many orders are typical for the hour but none arrive. |
| Alert cooldown (minutes)         | 60                     | Minimum time between repeat alerts for an ongoing problem.        |

## REST API

```
GET /wp-json/polski/v1/store-health
```

Returns the current state (overall status, sensors, check timestamp). Requires the `manage_woocommerce` permission.

## Troubleshooting

**Alerts do not arrive** - check the WordPress email configuration. Consider an SMTP plugin (e.g. WP Mail SMTP) instead of the default `wp_mail()`.

**The checkout sensor shows "insufficient data"** - this is normal for low-traffic stores. The rate is only evaluated once the minimum checkout sample is reached.

**The sales anomaly never triggers** - the module needs order history from previous weeks for that hour. In a new store the typical value is low and the threshold is not reached.

**Checks do not run** - WP-Cron runs on site traffic. On low-traffic stores consider a system cron (`wp-cron.php` triggered by the server's cron).

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
