---
title: Complaint template (formularz reklamacyjny)
description: Ready-to-print complaint form compatible with the Polish Consumer Rights Act. Seller section auto-filled from the setup wizard, buyer / product / defect / remedy sections left blank for the customer.
---

The **Complaint template** module renders a ready-to-print complaint form (formularz reklamacyjny). The structure follows the expectations of the Polish Consumer Rights Act and the commonly-used UOKiK (Office of Competition and Consumer Protection) template. The seller section is auto-populated from your setup wizard data; the buyer, product, defect and remedy sections are left blank for the customer to complete.

:::caution
This is a generic starter template, not legal advice. For shop-specific clauses (digital services, subscriptions, industry rules) consult a lawyer.
:::

## Sections

1. **Seller** - name, address, NIP, email (from `polski_general`)
2. **Customer** - name, address, email, phone (blank fields)
3. **Order and product** - order number, purchase date, product name
4. **Defect / non-conformity** - description, date detected
5. **Requested remedy** - checkbox list: repair / replacement / price reduction / withdrawal
6. **Refund bank account** - IBAN
7. **Date and signature**

## Three delivery channels

| Channel    | How to use                                                                        |
| ---------- | --------------------------------------------------------------------------------- |
| Shortcode  | `[polski_complaint_template]` on any page or post                                 |
| Admin page | **Polski > Complaint template** - preview + one-click HTML download              |
| Frontend   | Embed via the shortcode in a "Complaints" page linked from the Regulamin         |

## Admin download

**Polski > Complaint template > Download as HTML** serves:

```
Content-Type: text/html; charset=utf-8
Content-Disposition: attachment; filename="polski-complaint-template-YYYYMMDD.html"
```

The downloaded file is a standalone HTML document with an embedded print-friendly stylesheet. Opening it in a browser and using **Print > Save as PDF** produces a PDF the customer can fill in digitally or on paper.

## Layout

Print-friendly CSS:
- Max width 780 px
- 14 px base font size
- `@media print` removes page margins so the form fits on A4
- Checkboxes rendered via Unicode `&#9744;` - no images, no external assets

## Legal framing

The template embeds a short header:

> Submit this form within the statutory warranty period. The seller is required to respond within 14 days.

The 14-day response clock is the standard response period under the Consumer Rights Act - after which the customer's claim is deemed accepted if no reply is sent.

## Customisation

Override the entire template by copying the shortcode output into your theme:

```php
remove_shortcode('polski_complaint_template');
add_shortcode('polski_complaint_template', function (): string {
    ob_start();
    include get_stylesheet_directory() . '/complaint-template.php';
    return (string) ob_get_clean();
});
```

The bundled version is intentionally minimal so you can extend it (add logo, digital signature box, QR-code link to the online complaint form).

## Permissions

- Shortcode rendering: public
- Admin download: `manage_woocommerce`
- Download nonce: `polski_complaint_download`

## Limitations

- Single language (Polish by default, English via WordPress translations)
- Does not link to the ODR platform - add manually if relevant
- No CRM / HelpDesk integration - the customer still returns the form by email or post
- Not a substitute for a tailored complaint policy in your Regulamin
