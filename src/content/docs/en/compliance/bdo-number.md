---
title: BDO number
description: Display your BDO registration number (Baza Danych o Odpadach) in Polski for WooCommerce using the [polski_bdo] shortcode or block.
---

BDO (Baza Danych o Odpadach) is the Polish waste database register. Businesses that introduce products or packaging onto the Polish market are commonly registered in the BDO and present their BDO registration number on their website, for example in the footer, and on documents.

Polski for WooCommerce gives you a simple place to store your BDO number and a shortcode and block to display it. It only displays the number you provide. It does not file BDO reports and it does not determine whether your business must register, that is for you and your accountant to confirm.

## Enable the module

1. Open **Polski → Modules** and find **BDO number** under Legal & Compliance.
2. Enable the module.
3. Enter your **BDO number** in the module settings and save.

## Display the number

Use either:

- The shortcode `[polski_bdo]`
- The **BDO number** block (search for "BDO" in the block inserter)

Both output your BDO number with a "BDO:" label.

### Shortcode attributes

| Attribute | Default | Description |
|---|---|---|
| `show_label` | `1` | Set to `0` to hide the "BDO:" label and show only the number. |
| `label` | empty | Override the label text. |

Examples:

```text
[polski_bdo]
[polski_bdo show_label="0"]
[polski_bdo label="BDO no."]
```

## Show it in the footer with your business data

If you use the **Business identification** module, you can include the BDO number alongside your company name, address and NIP. Add `show_bdo="1"` to the business info shortcode:

```text
[polski_business_info show_bdo="1"]
```

## Notes

- The BDO number is stored once and reused everywhere it is displayed.
- If the field is empty, the shortcode and block output nothing.
