---
title: Legal pages
description: Automatic legal page generation in Polski for WooCommerce - terms and conditions, privacy policy, return policy, complaints, email attachments and ODR information.
---

Every online store in Poland must provide customers with a set of legal documents. Polski for WooCommerce automatically generates four key legal pages adapted to Polish law, allows attaching them to transactional emails and displays the required ODR platform information.

## Generated legal pages

### 1. Store terms and conditions

The generated terms and conditions contain elements required by the Consumer Rights Act:

- Seller identification data (name, address, NIP, REGON, KRS)
- Order placement procedure
- Payment methods
- Delivery costs and methods
- Right of withdrawal from the contract (14 days)
- Complaint procedure
- Out-of-court complaint resolution and claim pursuit methods
- Final provisions

### 2. Privacy policy

The generated GDPR-compliant privacy policy contains:

- Personal data controller information
- Purposes and legal bases for data processing
- Categories of processed data
- Data recipients (couriers, payment gateways, hosting)
- Data retention period
- Rights of data subjects
- Cookie information
- Profiling information (if applicable)

### 3. Return policy

The generated return policy covers:

- Contract withdrawal period (14 days)
- Withdrawal form template
- Product return procedure
- Return costs (who bears them)
- Payment refund deadline
- Exceptions to the right of withdrawal
- Condition of returned goods

### 4. Complaint policy

The generated complaint policy contains:

- Legal basis (warranty, guarantee)
- Ways to file a complaint
- Complaint processing deadline (14 days)
- Consumer rights (repair, replacement, price reduction, withdrawal)
- Complaint form
- Contact details for filing complaints

## Generator configuration

Go to **WooCommerce > Settings > Polski > Legal Pages** to generate or update pages.

### Seller data

Before generating pages, fill in company data:

| Field | Description | Example |
|-------|-------------|---------|
| Company name | Full name or trading name | Store XYZ Jan Kowalski |
| Address | Street, number | ul. Przykladowa 1/2 |
| Postal code and city | - | 00-001 Warsaw |
| NIP | Tax identification number | 1234567890 |
| REGON | - | 123456789 |
| KRS | If applicable | 0000123456 |
| Contact email | - | contact@store.pl |
| Phone | - | +48 123 456 789 |
| Bank account number | For refunds | PL 12 3456 7890 1234 5678 9012 3456 |

### Generating pages

1. Fill in seller data
2. Click "Generate legal pages"
3. The system creates 4 WordPress pages with "Draft" status
4. Review the content of each page
5. Publish pages after verification

Pages are created as drafts because consulting their content with a lawyer is recommended before publishing.

### Updating pages

When you change company data, click "Update legal pages". The system will update generated sections while preserving your manual modifications in marked blocks.

Generated page structure:

```
<!-- POLSKI-AUTO-START -->
Automatically generated content - do not edit this block
<!-- POLSKI-AUTO-END -->

Your additional content - safely edit below
```

During updates, the system overwrites only content between the `POLSKI-AUTO-START` and `POLSKI-AUTO-END` markers. Content added outside these markers is preserved.

## Email attachments

The plugin allows attaching legal pages as PDF attachments to WooCommerce transactional emails.

### Configuration

In **WooCommerce > Settings > Polski > Legal Pages > Email Attachments** configure which documents to attach to specific email types:

| Email | Recommended attachments |
|-------|------------------------|
| New order (customer) | Terms and conditions, Privacy policy, Return policy |
| Order completed | Return policy |
| Invoice | Terms and conditions |
| Credit note | Return policy, Complaint policy |

### Attachment format

Documents are automatically converted to PDF format with a header containing the store logo and generation date. File size is optimized to avoid overloading the mail server.

| Option | Description | Default value |
|--------|-------------|---------------|
| Format | Attachment type | PDF |
| Header logo | Whether to include store logo | Yes |
| Paper size | - | A4 |
| Margin | Document margin | 20mm |

## ODR information

EU Regulation 524/2013 requires online sellers to include a link to the ODR (Online Dispute Resolution) platform - a platform for out-of-court dispute resolution.

### Automatic display

The plugin automatically adds ODR information in:

- **Store footer** - link to the ODR platform
- **Terms and conditions** - section about out-of-court dispute resolution
- **Transactional emails** - footer with ODR link

### ODR information content

Standard content displayed by the plugin:

> The ODR (Online Dispute Resolution) platform is available at: https://ec.europa.eu/consumers/odr/. The platform is used for resolving disputes between consumers and businesses at the EU level.

### ODR configuration

| Option | Description | Default value |
|--------|-------------|---------------|
| Display in footer | Add ODR information to store footer | Yes |
| Display in emails | Add ODR information to transactional emails | Yes |
| ODR text | Configurable information text | Default content |
| Footer position | Display location | Before copyright information |

## Document versioning

The plugin automatically records legal page versions:

- Each content change creates a new version
- The last update date is displayed on the page
- GDPR consent logs contain a hash of the document version that was in effect at the time of consent
- Version history is available in the WordPress page **Revisions**

## Multilingual support

Generated pages are in Polish by default. If you use WPML or Polylang, the plugin generates separate pages for each active language. Translations are provided for:

- Polish (default)
- English
- German

For other languages, a Polish version is generated with the option for manual translation.

## Troubleshooting

**Pages do not generate**
Check that all required seller data fields are filled in. The company name, address, NIP and email fields are mandatory.

**PDF attachments are not added to emails**
Check that the PDF generation library is installed on the server. The plugin requires the PHP `mbstring` and `dom` extensions. Check PHP logs for errors.

**ODR information does not display in the footer**
Check that the theme supports WooCommerce footer hooks (`wp_footer` or `woocommerce_after_footer`). Some themes require manually adding a widget.

**Update overwrote my changes**
Edit content only outside the `POLSKI-AUTO-START` / `POLSKI-AUTO-END` markers. Content between these markers is overwritten with each update.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Discussions and questions: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
