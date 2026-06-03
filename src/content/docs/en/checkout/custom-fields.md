---
title: Custom checkout fields
description: Adding, modifying, and reorganizing order form fields with validation and display in the admin panel and emails.
---

The Custom Checkout Fields module lets you add custom fields to the WooCommerce checkout form.

## Enabling

Go to **WooCommerce > Polski > Modules** and enable the **Custom Checkout Fields** module in the "Checkout" section.

## Managing fields

Once the module is enabled, go to **WooCommerce > Checkout Fields** to add and edit fields.

## Available field types

| Type | Description |
|-----|------|
| Text | Text field |
| Textarea | Multi-line text field |
| Select | Drop-down list |
| Checkbox | Checkbox |
| Radio | Radio buttons |
| Number | Numeric field |
| Email | Email field with format validation |
| Date | Date field |
| Phone | Phone field |

## Field configuration

| Option | Description |
|-------|------|
| Enabled | Whether the field is active |
| Name (meta key) | The meta key under which the value is saved |
| Label | The label text shown above the field |
| Type | Field type (from the list above) |
| Section | Billing, Shipping, or Order notes |
| Required | Whether the field is mandatory |
| Priority | Display order (lower = earlier) |
| Placeholder | Hint text inside the field |
| Options | For select/radio: one option per line (value\|label) |
| CSS class | CSS classes (e.g. form-row-wide, form-row-first) |
| Show in emails | The field value in order emails |
| Show in admin | The field value in the order panel |
| Show in My Account | The field value on the customer's order page |
| Conditional shipping | Show the field only for a specific shipping method |

## Options for Select/Radio

Enter the options one per line in the format:
```
value|Label
```

Example:
```
company|Company
individual|Private individual
```

## Displaying values

Custom field values are displayed automatically:
- In the order admin panel (below the billing/shipping address)
- In order emails
- On the "My account > Order details" page

## Validation

- Required fields - validated when the order is placed
- Email fields - address format validation
- The value is saved as sanitized text in the order meta
