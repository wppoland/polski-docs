---
title: Watermarking of downloadable files
description: Documentation for the watermarking module in Polski PRO for WooCommerce - automatic PDF watermark via TCPDF and EPUB via ZipArchive with buyer details.
---

The watermarking module automatically adds buyer details to downloadable files (PDF and EPUB) at the moment of download. Each downloaded file contains a personalized watermark identifying the buyer.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. The PHP `ZipArchive` extension is required for EPUB files.
:::

## How it works

1. The customer buys a product with downloadable files
2. At the moment the download link is clicked, the plugin intercepts the request
3. Depending on the file format, the appropriate watermarking mechanism is applied
4. A temporary watermarked file is generated and sent to the customer
5. The temporary file is removed once the process completes (cleanup on shutdown)

Watermarking is applied automatically to all products with downloadable files, no additional per-product configuration is required.

## Supported formats

### PDF (TCPDF)

Watermarking of PDF files uses the TCPDF library:

- The watermark text is overlaid on every page of the document
- The text is semi-transparent and placed diagonally across the page
- The watermark does not affect the readability of the original content
- Multi-page PDF documents are supported

### EPUB (ZipArchive)

Watermarking of EPUB files uses the PHP ZipArchive extension:

- The EPUB file is opened as a ZIP archive
- A `<div>` element with the buyer's details is injected into the HTML files inside the archive
- The injection happens before the closing `</body>` tag
- The original EPUB structure is preserved

## Placeholders

You can use the following placeholders in the watermark content:

| Placeholder | Description | Example |
|-------------|------|---------|
| `[FIRSTNAME]` | Buyer's first name | Jan |
| `[LASTNAME]` | Buyer's last name | Kowalski |
| `[EMAIL]` | Buyer's email address | jan@example.com |
| `[DATE]` | Date the file was downloaded | 2026-04-06 |
| `[ORDER_ID]` | Order number | 12345 |

Example watermark text:

```
Licensed to: [FIRSTNAME] [LASTNAME] ([EMAIL])
Order #[ORDER_ID] from [DATE]
```

## Temporary files

The watermarked file is created as a temporary copy in the `wp-content/uploads/polski-pro-temp/` directory:

- The temporary file is generated with a unique identifier
- After the file is sent to the customer, the temporary file is removed
- Cleanup happens automatically via the `register_shutdown_function` hook
- In case of an error, the temporary files are also removed

## Configuration

Go to **WooCommerce > Settings > Polski PRO > Watermarking**.

| Setting | Description |
|------------|------|
| Enable watermarking | Activates the module for all downloadable files |
| Watermark text | Watermark content with placeholders |
| Font size (PDF) | Size of the watermark text in the PDF |
| Transparency (PDF) | Transparency level of the watermark in the PDF |
| CSS style (EPUB) | CSS style of the watermark div element in the EPUB |

## Enabling the module

The module is controlled by a toggle in the PRO module settings:

```
WooCommerce > Settings > Polski PRO > Modules > Watermarking
```

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Polski PRO for WooCommerce is commercial software provided without warranty.</div>
