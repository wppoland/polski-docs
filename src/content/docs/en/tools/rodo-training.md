---
title: RODO / GDPR training documentation
description: Ready-to-print training templates for shop employees. Includes a training logbook, a one-page RODO principles summary and a data-breach response playbook with the 72-hour UODO notification deadline.
---

The **RODO training docs** module generates three printable HTML documents you can hand to new shop employees during GDPR onboarding. All documents are pre-branded with your shop's business data (name, NIP) and rendered with a print-friendly stylesheet.

:::caution
These are generic starter templates. Adapt them to your actual data-processing workflows, DPIA outcomes and internal incident procedures before handing them to staff.
:::

## Three documents

| Key               | Title                          | Purpose                                                        |
| ----------------- | ------------------------------ | -------------------------------------------------------------- |
| `logbook`         | Training logbook               | Table to record: date, employee, role, topics, trainer, sign  |
| `principles`      | RODO principles summary        | One-pager: 7 processing principles + 8 data subject rights    |
| `breach_playbook` | Data breach response playbook  | 8-step checklist + breach log template + UODO contact         |

## Admin page

Go to **Polski > RODO training docs**. For each document there is a "Download HTML" button. The file is served with:

```
Content-Type: text/html; charset=utf-8
Content-Disposition: attachment; filename="polski-rodo-<key>-<YYYYMMDD>.html"
```

Open the HTML in a browser and use **Print > Save as PDF** to produce a PDF or print directly.

## Training logbook

The logbook renders an empty table with 10 rows and the columns:

- Date
- Employee
- Role
- Topics covered
- Trainer
- Signature

Trainees sign to confirm attendance and understanding. Keep one logbook per calendar year - it is a practical artefact for the accountability principle (Art. 5(2) GDPR).

## RODO principles summary

Content of the one-pager:

1. **Seven principles (Art. 5)**: lawfulness, purpose limitation, minimisation, accuracy, storage limitation, integrity and confidentiality, accountability.
2. **Eight data subject rights (Chapter III)**: access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), notification (Art. 19), portability (Art. 20), objection (Art. 21), protection from automated decision-making (Art. 22).
3. **Operational reminders**: do not email spreadsheets of personal data, verify the requester before acting, log every disclosure, report suspected breaches within 24h internally.

## Breach response playbook

Step-by-step process:

1. **Discovery** - record timestamp, discoverer, affected systems.
2. **Containment** - isolate affected accounts / systems within 1 hour.
3. **Internal notification** - DPO and management within 24 hours.
4. **Assessment** - document data categories, subjects affected, likely impact.
5. **UODO notification** - required within 72 hours when risk to subjects is not unlikely.
6. **Subject notification** - required "without undue delay" when risk is high.
7. **Remediation** - patch, rotate credentials, review logs.
8. **Post-mortem** - document lessons learned and update training.

A breach log template is included:
- Incident ID
- Detected at (UTC)
- Detected by
- Affected systems
- Affected data categories
- Approximate number of subjects
- Likely impact
- Containment actions
- UODO notified at
- Subjects notified at
- Status

The playbook links to [uodo.gov.pl](https://uodo.gov.pl) for the official notification channel.

## Branding

The document header is populated from `polski_general`:

```
Przykladowa Firma sp. z o.o. - NIP: 1234567890
[Document title]
```

Update the details under **Polski > Setup wizard > Business data**.

## Permissions

- UI and downloads: `manage_woocommerce`
- Download nonce: `polski_rodo_training_download`

## Limitations

- Single language (Polish + English via WordPress translations, no per-employee language override)
- No digital signatures - trainees sign on paper or via your e-signature provider
- No audit trail of who downloaded the document (planned for PRO)
- Not a substitute for a proper DPIA or Records of Processing Activities
