---
title: Abandoned Cart Recovery
description: A module for automatic tracking, recovery, and analysis of abandoned WooCommerce carts in Polski PRO.
---

The abandoned cart module tracks active WooCommerce carts, detects abandonment, and automatically sends recovery emails with a link to restore the cart in a single click.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## How it works

1. The customer adds products to the cart, the system starts tracking the cart
2. If the customer leaves the store and does not return within 1 hour, the cart is marked as **abandoned**
3. The system sends up to 3 recovery emails (after 1h, 24h, and 72h)
4. The customer clicks the link in the email, the cart is restored with its products and coupons
5. If the customer completes the order, the cart is marked as **converted** or **recovered**

## Configuration

Go to **Polski PRO > Modules** and enable the **Abandoned Carts** module.

### General settings

| Setting | Description | Default |
|------------|------|-----------|
| Abandonment timeout | After how long (seconds) a cart is considered abandoned | 3600 (1h) |
| Recovery emails | Enable/disable automatic emails | Yes |
| Data cleanup | After how many days to remove old carts | 90 |
| Hide IP | Do not store customer IP addresses (GDPR) | No |

### Email settings

Each of the 3 emails has the following configurable options:

| Field | Email 1 | Email 2 | Email 3 |
|------|---------|---------|---------|
| Delay | 1 hour | 24 hours | 72 hours |
| Subject | Did you forget about your cart? | Your cart is still waiting | Last chance |
| Content | Configurable | Configurable | Configurable |

The emails include:
- A summary of products in the cart (images, names, quantities, prices)
- The total cart value
- A CTA button with the recovery link

## Cart statuses

| Status | Description |
|--------|------|
| Active | The customer is actively browsing the store |
| Abandoned | The customer left the store and did not return after the timeout |
| Converted | The customer placed an order (without a recovery email) |
| Recovered | The customer returned via the recovery link and placed an order |

## Admin panel

The panel is available under **WooCommerce > Abandoned Carts**.

### Tab: Cart list

- Filtering by status
- Columns: ID, email, status, products, value, last activity, emails sent
- Cart details: full product list, recovery link, customer data
- Action: **Create order from cart** (for abandoned carts)

### Tab: Analytics

Metrics:
- **Total number of carts** - all tracked carts
- **Abandonment rate** - % of carts that were abandoned
- **Conversion rate** - % of carts that turned into orders
- **Recovery rate** - % of abandoned carts recovered through emails
- **Recovered revenue** - total value of orders from recovered carts

## Recovery link

Each abandoned cart has a unique 32-character recovery key. The link:

```
https://yourstore.com/cart/?recover_cart={key}
```

After clicking:
1. The current cart is cleared
2. The products from the abandoned cart are added
3. Coupons are restored
4. The customer is redirected to checkout
5. The cart changes status to **recovered**

## Schedule (Cron)

The module uses its own cron, run every 15 minutes (`polski_abandoned_cart_cron`):

1. Marks carts as abandoned (after the timeout)
2. Sends recovery emails (according to the schedule)
3. Removes old carts (after X days)

## GDPR / Privacy

- Option to hide customer IP addresses
- Automatic cleanup of old data (configurable)
- Recovery emails can be disabled globally
- Cart data is removed when the plugin is uninstalled (if the data removal option is enabled)

## Database

The module creates two tables:

- `wp_polski_carts` - cart data (status, value, email, recovery key)
- `wp_polski_cart_contents` - content snapshots (JSON with change history)

The tables are created automatically during the 1.8.0 migration.
