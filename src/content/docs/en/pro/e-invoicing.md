---
title: "E-invoicing: PEPPOL/UBL and JPK_FA"
description: "Export invoices in Polski PRO for WooCommerce to PEPPOL/UBL (EN 16931) from the order screen, and generate a JPK_FA(3) report for a date range for accounting."
---

Polski PRO offers two invoice export formats alongside KSeF: **PEPPOL / UBL** (a structured invoice compliant with EN 16931, for B2B and public-sector trade in the EU) and **JPK_FA(3)** (an invoice report for the Polish tax administration).

:::caution
Files are generated from the invoice data stored in your shop. Before production use, validate the PEPPOL/UBL file with the official PEPPOL validator, and the JPK_FA file against the Ministry of Finance XSD schema. The module provides the export, not accounting or legal advice.
:::

## PEPPOL / UBL (export from an order)

The UBL export lets you download an invoice as an XML file compliant with **EN 16931 / PEPPOL BIS Billing 3.0** - the format used for structured B2B and public-sector invoicing across the European Union.

### How to download

On the order edit screen (`WooCommerce › Orders › [order]`) a **PEPPOL / UBL (XML)** meta box appears. If an invoice already exists for the order, the box offers a download button:

- the **UBL: [invoice number]** button downloads the invoice XML file,
- if no invoice has been issued yet, the box shows **No invoice yet** - generate the invoice first.

### What the file contains

The UBL file maps the invoice: the transaction parties (seller and buyer with their tax IDs), VAT subtotals broken down per rate, monetary totals, and invoice lines.

## JPK_FA (report for a period)

The **JPK_FA(3)** report generates an XML file of the invoices issued within a selected date range, in the structure required by the Polish tax administration.

### How to generate

Go to `WooCommerce › Polski › JPK_FA report`. The form has:

- **From** - the start date of the period,
- **To** - the end date of the period,
- the **Download JPK_FA XML** button downloads the report.

The report covers invoices issued in the selected period, with a header, entity data, invoices with per-rate VAT breakdown, control sums, and line items.

### Seller data

The seller data in the report is read from the plugin's general settings (company tax ID, name, and address). Fill these in before generating the report so the file contains the correct entity data.

:::note
JPK_FA is an invoice report. It is not the same as JPK_V7 (VAT records) or sending to KSeF - those are handled separately.
:::
