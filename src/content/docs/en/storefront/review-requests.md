---
title: Automatic review requests
description: Module for automatically sending review request emails after purchase in Polski for WooCommerce.
---

The module automatically sends a review request email to customers after an order is completed. Each email contains links to review the purchased products.

## Configuration

Go to **Polski > Modules** and enable the **Review requests** module.

| Setting | Description | Default |
|------------|------|-----------|
| Delay (days) | How many days after completion to send the email | 7 |
| Email subject | Message title (tokens: `{first_name}`, `{order_number}`) | How would you rate your purchase? Leave a review |
| Intro text | Welcome text (token: `{first_name}`) | Hi {first_name}, thank you for your recent purchase... |
| Button text | CTA next to each product | Leave a review |
| Opt-out text | Opt-out link at the bottom of the email | Unsubscribe from review requests |

## How it works

1. The order changes its status to **Completed**
2. The system schedules the email to be sent X days later (7 by default)
3. A daily cron checks the scheduled requests
4. The email is sent with a product list and "Leave a review" buttons
5. Products the customer has already reviewed are skipped

## Email content

The email contains:
- A personalized greeting
- A list of products with photo thumbnails
- A CTA button per product leading to the reviews section
- An opt-out link at the bottom

## Opt-out

The customer can click the "Unsubscribe from review requests" link in the email. After clicking:
- The `_polski_review_optout` meta is set on the user's account
- No future requests will be sent
- A confirmation appears in WooCommerce notices

:::note
Opt-out requires being logged in. Guests (without an account) do not see the opt-out link.
:::

## Integration with Verified Review

The review requests module works independently of the **Verified purchase** module (badge). Both can be enabled at the same time:

- **Review requests** - sends emails encouraging reviews
- **Verified purchase** - adds a "Verified purchase" badge to reviews from people who bought the product

## Avoiding duplicates

The system checks whether the customer has already left a review for a given product. If so, the product does not appear in the email. If all products have already been reviewed, the email is not sent.
