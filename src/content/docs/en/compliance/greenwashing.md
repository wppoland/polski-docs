---
title: Greenwashing protection
description: Anti-greenwashing product fields in Polski for WooCommerce - environmental claim basis, certificate and expiry date in accordance with Directive 2024/825.
---

EU Directive 2024/825 (Empowering Consumers Directive) prohibits unjustified environmental claims in electronic commerce. From September 27, 2026, sellers cannot use general ecological claims (e.g. "eco", "green", "environmentally friendly") without specific justification and certification. Polski for WooCommerce provides product fields for documenting and displaying the basis of environmental claims.

## What is greenwashing

Greenwashing is the practice of misleading consumers about the environmental properties of a product or company activities. Examples of prohibited practices:

- Using general claims ("eco", "bio", "green") without certification
- Climate neutrality claims based solely on emission offsets
- Suggesting environmental benefits without scientific evidence
- Displaying unofficial eco-labels
- Durability claims without justification

## Product fields

In the WooCommerce product editor, in the **Polski - Environment** tab, three fields are available for documenting environmental claims.

### Claim basis

Text field for describing the scientific or technical basis of the environmental claim.

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

Field for information about the official certificate confirming the environmental claim.

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

Date field specifying until when the certificate or environmental claim remains valid.

After the expiry date:

- The environmental claim is automatically hidden on the product page
- The administrator receives an email notification about the expired certificate
- The product is marked on the product list with a warning icon

This safeguard protects against situations where an expired certificate is still displayed to customers.

## Display on the product page

When environmental fields are filled, the plugin displays an "Environmental information" section on the product page. The section contains:

- Environmental claim content
- Certificate name and number
- Certificate expiry date
- Certificate icon (if recognized - e.g. EU Ecolabel)

The section is displayed in the "Additional information" tab on the product page or as a separate tab (configurable in settings).

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

Environmental data is included in the WooCommerce product export. Additional columns:

- `env_claim_basis` - claim basis
- `env_certificate` - certificate
- `env_expiry_date` - expiry date (format YYYY-MM-DD)

### CSV import

Prepare a CSV file with the appropriate headers and import through the standard WooCommerce path.

### Product filtering

On the product list in the admin panel you can filter products by environmental claim status:

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
Enable the module in **WooCommerce > Settings > Polski > Modules** and make sure the "Enable module" option is checked in environmental settings.

**Claim disappeared from the product page**
Check the certificate expiry date. If the certificate has expired, the claim is automatically hidden. Renew the certificate and update the expiry date.

**Not receiving notifications about expiring certificates**
Check that WP-Cron is working correctly. Notifications are sent by a scheduled cron task. On servers with WP-Cron disabled, configure a system cron.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Discussions and questions: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
