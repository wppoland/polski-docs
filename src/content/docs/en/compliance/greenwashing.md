---
title: Greenwashing protection
description: Anti-greenwashing product fields in Polski for WooCommerce - environmental claim basis, certificate and expiry date in accordance with Directive 2024/825.
---

EU Directive 2024/825 prohibits unjustified environmental claims. From September 27, 2026, you cannot use general ecological claims (e.g. "eco", "green") without specific justification and certification. The plugin adds product fields for documenting environmental claims.

## What is greenwashing

Greenwashing means misleading customers about the environmental properties of a product. Examples of prohibited practices:

- Using general claims ("eco", "bio", "green") without certification
- Climate neutrality claims based solely on emission offsets
- Suggesting environmental benefits without scientific evidence
- Displaying unofficial eco-labels
- Durability claims without justification

## Product fields

In the product editor, **Polski - Environment** tab, you will find three fields for documenting environmental claims.

### Claim basis

Field for the scientific or technical basis of the environmental claim.

**What to enter:**

- The specific environmental aspect the claim relates to (e.g. "Product made from 80% recycled materials")
- Research or analysis methodology (e.g. "Product life cycle analysis (LCA) compliant with ISO 14040")
- Measurement or research results (e.g. "Carbon footprint 2.3 kg CO2e per unit - report by company XYZ dated 2025-01-15")
- Comparison with a reference product (if the claim is comparative)

**Example of a correct entry:**

```
Claim: "Packaging made from 100% recycled materials"
Basis: Raw material comes entirely from post-consumer PET recycling.
Raw material supplier: RecyPET Sp. z o.o., EuCertPlast certificate no. 2025/0123.
Production process confirmed by internal audit dated 2025-03-01.
```

### Certificate

Field for certificate information confirming the environmental claim.

**Accepted certificates:**

- Certificates compliant with Regulation (EC) No 66/2010 (EU Ecolabel)
- National certificates recognized by the European Commission
- Industry certificates issued by accredited certification bodies
- FSC, PEFC certificates (for wood/paper products)
- GOTS, OEKO-TEX certificates (for textiles)
- EuCertPlast, RecyClass certificates (for plastics)

**What to enter:**

- Certificate name
- Certificate number
- Certifying body
- Verification link (if available)

**Example:**

```
EU Ecolabel - license number PL/032/005
Certifying body: PCBC S.A.
Verification: https://environment.ec.europa.eu/ecolabel_en
```

### Expiry date

Date until when the certificate or claim is valid.

After the expiry date:

- The environmental claim is automatically hidden on the product page
- The administrator receives an email notification about the expired certificate
- The product is marked on the product list with a warning icon

This protects against an expired certificate being visible to customers.

## Display on the product page

After filling the fields, the plugin displays an "Environmental information" section on the product page with:

- Environmental claim content
- Certificate name and number
- Certificate expiry date
- Certificate icon (if recognized - e.g. EU Ecolabel)

The section appears in the "Additional information" tab or as a separate tab (configurable in settings).

## Configuration

Module settings: **WooCommerce > Settings > Polski > Environment**.

| Option | Description | Default value |
|--------|-------------|---------------|
| Enable module | Activates environmental fields | No |
| Display position | Where to display information on the product page | "Additional information" tab |
| Expiry notification | How many days before expiry to send notification | 30 |
| Automatic hiding | Hide claim after certificate expiry | Yes |

## Bulk management

### CSV export

Environmental data is in the WooCommerce product export. Additional columns:

- `env_claim_basis` - claim basis
- `env_certificate` - certificate
- `env_expiry_date` - expiry date (format YYYY-MM-DD)

### CSV import

Prepare a CSV file with the appropriate headers and import via the standard WooCommerce path.

### Product filtering

On the product list you can filter by claim status:

- All products with a claim
- Products with an expired certificate
- Products with a certificate expiring within 30 days
- Products without a certificate (but with a claim)

## Best practices

1. **Be specific** - instead of "eco packaging" write "packaging made from 100% recycled cardboard, FSC certificate no. XXXX"
2. **Provide sources** - refer to specific studies, reports, certificates
3. **Update data** - set notifications for certificate expiry and renew them on time
4. **Avoid generalities** - the directive prohibits claims that cannot be verified
5. **Comparisons must be fair** - compare the same product categories, use the same methodology

## Troubleshooting

**Environmental fields do not display in the product editor**
Enable the module in **WooCommerce > Settings > Polski > Modules** and check that the "Enable module" option is checked in environmental settings.

**Claim disappeared from the product page**
Check the certificate expiry date. After expiry the claim is automatically hidden. Renew the certificate and update the date.

**Not receiving notifications about expiring certificates**
Check that WP-Cron is working. Notifications are sent via a cron task. On servers with WP-Cron disabled, configure a system cron.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Discussions and questions: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
