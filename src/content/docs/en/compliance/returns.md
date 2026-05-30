---
title: Returns and complaints (RMA)
description: Handling returns and complaints in Polski for WooCommerce - customer request form in My Account, eligibility window, email confirmations and the admin queue.
---

The Returns and complaints (RMA) module lets customers submit a complaint (reklamacja) or a return (zwrot) directly from their account. It mirrors the existing right-of-withdrawal request flow and gives the store a single queue to track and resolve each case. The module provides tools and templates, not legal advice.

This is a free module in Polski for WooCommerce. It is optional and turned off by default.

## What it does

- Adds a "Complaint / return" action to eligible orders in the customer account.
- Lets the customer choose a request type (complaint or return) and describe the reason.
- Stores each request and shows its current status on the order details page.
- Sends confirmation emails to the customer and to the shop.
- Collects all requests in one admin queue where the shop changes the status.

## Enabling the module

The module is off by default. To enable it:

1. Go to **WooCommerce > Polski > Modules**.
2. Find the **Consumer Rights** group.
3. Turn on the **Returns & complaints (RMA)** toggle.

Once enabled, the "Complaint / return" action appears for eligible orders and the admin queue becomes available.

## Customer process

### Step 1 - action in My Account

A logged-in customer opens a request from **My Account > Orders**. On an eligible order, a **Complaint / return** action is shown. Clicking it opens the request form.

### Step 2 - request form

The form has two fields:

- **Type** - Complaint (reklamacja) or Return (zwrot).
- **Reason** - a text field describing the issue or the reason for the return.

### Step 3 - email confirmation

After the customer submits the form, the system:

1. Stores the request.
2. Sends the customer an email confirming the request was received.
3. Sends the shop a notification about the new request.

Existing requests and their current status are shown on the order details page, so the customer can follow progress without contacting the shop.

## Eligibility

The "Complaint / return" action appears only when both conditions are met:

- The order belongs to the logged-in customer.
- The order is within the eligibility window - a configurable number of days counted from the order date (default 365).

Orders outside the window, or orders that belong to another customer, do not show the action.

## Admin queue and statuses

Find all requests in **WooCommerce > Polski > Returns & complaints**. The queue lists every submitted complaint and return so the shop can work through them in one place.

The shop changes the status of each request as it is handled:

- **Submitted** - the request has been received.
- **In progress** - the shop is working on the request.
- **Resolved** - the request has been handled.
- **Rejected** - the request was declined.

The current status is reflected on the order details page in the customer account.

## Settings

The module has two settings:

- **Eligibility window** - the number of days, counted from the order date, during which a customer can open a request. Default is 365.
- **Notification email** - the admin address that receives the notification when a new request is submitted.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Discussions and questions: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
