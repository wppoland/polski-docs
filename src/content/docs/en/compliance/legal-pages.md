---
title: Legal pages
description: Automatic legal page generation in Polski for WooCommerce - terms and conditions, privacy policy, return policy, complaints, email attachments and ODR information.
---

Every online store in Poland must have legal documents. The plugin generates four legal pages, attaches them to emails and displays the ODR platform information.

## Generated legal pages

### 1. Store terms and conditions

The terms and conditions contain elements required by the Consumer Rights Act:

- Seller identification data (name, address, NIP, REGON, KRS)
- Order placement procedure
- Payment methods
- Delivery costs and methods
- Right of withdrawal from the contract (14 days)
- Complaint procedure
- Out-of-court complaint resolution and claim pursuit methods
- Final provisions

### 2. Privacy policy

GDPR-compliant privacy policy contains:

- Personal data controller information
- Purposes and legal bases for data processing
- Categories of processed data
- Data recipients (couriers, payment gateways, hosting)
- Data retention period
- Rights of data subjects
- Cookie information
- Profiling information (if applicable)

### 3. Return policy

The return policy covers:

- Contract withdrawal period (14 days)
- Withdrawal form template
- Product return procedure
- Return costs (who bears them)
- Payment refund deadline
- Exceptions to the right of withdrawal
- Condition of returned goods

### 4. Complaint policy

The complaint policy contains:

- Legal basis (warranty, guarantee)
- Ways to file a complaint
- Complaint processing deadline (14 days)
- Consumer rights (repair, replacement, price reduction, withdrawal)
- Complaint form
- Contact details for filing complaints

## Generator configuration

Go to **WooCommerce > Settings > Polski > Legal Pages** to generate or update pages.

### Seller data

First fill in company data:

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

Pages are created as drafts - review them and consult with a lawyer before publishing.

### Updating pages

After changing company data, click "Update legal pages". The plugin updates generated sections while preserving your manual changes.

Generated page structure:

```
<!-- POLSKI-AUTO-START -->
Automatically generated content - do not edit this block
<!-- POLSKI-AUTO-END -->

Your additional content - safely edit below
```

During updates, the plugin overwrites only content between `POLSKI-AUTO-START` and `POLSKI-AUTO-END`. Content outside these markers is preserved.

## Email attachments

The plugin attaches legal pages as PDF to WooCommerce transactional emails.

### Configuration

In **WooCommerce > Settings > Polski > Legal Pages > Email Attachments** configure which documents to attach to specific email types:

| Email | Recommended attachments |
|-------|------------------------|
| New order (customer) | Terms and conditions, Privacy policy, Return policy |
| Order completed | Return policy |
| Invoice | Terms and conditions |
| Credit note | Return policy, Complaint policy |

### Attachment format

Documents are converted to PDF with store logo and date. File size is optimized.

| Option | Description | Default value |
|--------|-------------|---------------|
| Format | Attachment type | PDF |
| Header logo | Whether to include store logo | Yes |
| Paper size | - | A4 |
| Margin | Document margin | 20mm |

## ODR information

EU Regulation 524/2013 requires online stores to link to the ODR (Online Dispute Resolution) platform for out-of-court dispute resolution.

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

The plugin records legal page versions:

- Each content change creates a new version
- The last update date is displayed on the page
- GDPR consent logs contain a hash of the document version at the time of consent
- Version history is available in the WordPress page **Revisions**

## Multilingual support

Pages are generated in Polish. With WPML or Polylang, the plugin creates separate pages for each language. Ready translations:

- Polish (default)
- English
- German

For other languages, a Polish version is created for manual translation.

## Troubleshooting

**Pages do not generate**
Check that you filled in all required fields: company name, address, NIP and email.

**PDF attachments are not added to emails**
Check that the server has PHP extensions `mbstring` and `dom`. Check PHP logs for errors.

**ODR information does not display in the footer**
Check that the theme supports footer hooks (`wp_footer` or `woocommerce_after_footer`). Some themes require adding a widget manually.

**Update overwrote my changes**
Edit content only outside the `POLSKI-AUTO-START` / `POLSKI-AUTO-END` markers. Content between these markers is overwritten with each update.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Discussions and questions: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
