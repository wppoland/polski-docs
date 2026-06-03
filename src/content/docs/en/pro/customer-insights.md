---
title: Customer Insights
description: Documentation for the Customer Insights module in Polski PRO for WooCommerce - RFM segmentation, customer lifetime value CLV, analytics dashboard and action recommendations.
---

The Customer Insights module provides advanced analysis of your customer base using RFM segmentation (Recency, Frequency, Monetary). The dashboard presents key metrics, customer segments and recommended marketing actions.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## How it works

1. The plugin analyzes the order history of all customers
2. For each customer it calculates three RFM scores:
   - **Recency (R)** - how many days have passed since the last order
   - **Frequency (F)** - total number of orders
   - **Monetary (M)** - total value of orders
3. Based on these scores, the customer is assigned to one of 7 segments
4. Results are cached in a transient for 1 hour

## Dashboard

Go to **WooCommerce > Customer Insights** to open the dashboard.

### Summary cards

Four metrics are displayed at the top of the dashboard:

| Metric | Description |
|---------|------|
| Total number of customers | All customers with at least one order |
| Average CLV | Average Customer Lifetime Value |
| Average number of orders | Average number of orders per customer |
| Churn risk | Percentage of customers with no order in the last 30 days |

### RFM segments

The module classifies customers into 7 segments:

| Segment | Characteristics | Recommendation |
|---------|----------------|--------------|
| Champions | High R, F and M - they buy often, a lot and recently | Reward with exclusive offers, propose a VIP program |
| Loyal | High F - they buy regularly | Upselling, propose subscriptions |
| Potential Loyal | Medium F, high R - bought several times recently | Encourage further purchases, build loyalty |
| New Customers | High R, low F - fresh customer with 1-2 orders | Welcome them, offer a discount on their next purchases |
| At Risk | Low R, high F - they used to buy often, now they have stopped | Reactivation campaign, ask for the reason |
| Hibernating | Low R, medium F - have not bought for a long time | Aggressive win-back offer, time-limited discounts |
| Lost | Very low R, low F - one-time customers from a long time ago | Last contact attempt or remove from active campaigns |

### Segment table

The dashboard displays a table summarizing each segment:

| Column | Description |
|---------|------|
| Segment | Segment name with a colored marker |
| Number of customers | Number of customers in the segment |
| Share % | Percentage share of the segment in the whole base |
| Average revenue | Average order value of customers in the segment |
| Average number of orders | Average number of orders per customer in the segment |
| Recommendation | Suggested marketing action |

### Top customers

Below the segment table, a list of the most valuable customers (Top Customers) is displayed, sorted in descending order by total order value. The table contains:

- Customer first and last name
- Email address
- RFM segment
- Number of orders
- Total order value
- Date of the last order

## Performance

The module uses direct SQL queries instead of WP_Query for optimal performance with large customer bases:

- Queries are run against the WooCommerce order tables
- Data aggregation happens at the database level
- Results are cached in a WordPress transient for 1 hour
- Transient key: `polski_pro_customer_insights`
- Expiration time: 3600 seconds

## Enabling the module

The module is controlled by a toggle in the PRO module settings:

```
WooCommerce > Settings > Polski PRO > Modules > Customer Insights
```

After enabling the module, the **Customer Insights** item appears automatically in the WooCommerce menu.

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Polski PRO for WooCommerce is commercial software provided without warranty.</div>
