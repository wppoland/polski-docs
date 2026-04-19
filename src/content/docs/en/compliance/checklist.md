---
title: Privacy Policy and Terms compliance checklist
description: Automated structural audit of your shop's legal pages. Checks elements required by GDPR Art. 13, the Polish Act on the Provision of Services by Electronic Means (UŚUDE), consumer law and cookie-consent rules.
---

The **Compliance checklist** module scans two key legal pages of your shop (Privacy Policy and Regulamin, the Polish equivalent of Terms of Service) plus the cookie banner and reports whether they contain the elements required by law. It is a structural heuristic, not legal advice, but it helps you locate missing paragraphs quickly.

:::caution
The check relies on keyword detection. An "OK" result does not guarantee legal compliance. A lawyer review remains necessary.
:::

## How it works

1. The plugin reads the content of the page configured as Privacy Policy or Regulamin (options `polski_privacy_page_id`, `polski_terms_page_id`).
2. The content is normalised: HTML stripped, case unified, Polish diacritics folded to ASCII (a/c/e/l/n/o/s/z).
3. The engine iterates a rule set (17 rules for the Privacy Policy, 15 for the Regulamin) and looks for keyword patterns. A rule passes if any pattern appears in the content.
4. The result is presented as a list with **OK / Missing** markers, severity (Required / Recommended / Optional) and a short hint about what to add.

## Configuration

Go to **Polski > Compliance checklist**. If your legal pages are not yet assigned, configure them first in **Polski > Legal pages**.

The module is enabled by default. To disable it: **Polski > Modules** and uncheck "Compliance checklist".

## Scope of the checks

### Privacy Policy (GDPR Art. 13) - 17 rules

Required:
- Controller identity
- Contact channel (email or form)
- Purposes of processing
- Legal basis (Art. 6(1) GDPR)
- Retention period
- Recipients of data / processors
- Data subject rights: access, rectification, erasure, restriction, portability, objection
- Right to withdraw consent
- Complaint to the President of UODO (the Polish Data Protection Authority)

Recommended:
- Automated decision-making / profiling
- Transfers outside the EEA

Optional:
- DPO contact (if appointed)

### Cookie banner (active consent) - 9 rules

Required:
- Banner presence (cookies / ciasteczka in HTML)
- Accept button
- Reject button with equal visibility
- Category settings / preferences
- Link to Privacy Policy

Recommended:
- Named "Analytics" category
- Named "Marketing / advertising" category
- Mention of the right to withdraw consent

Inverted rule (presence = FAIL):
- "By clicking any link you accept" / "By continuing to use the site you agree" - phrases that imply **implied consent**, which is not compatible with active consent under GDPR and ePrivacy.

The scanner reads `home_url('/')`. The result is cached in a transient for 1 hour. Banners rendered only through JS may be invisible to the scan. This section is a heuristic, not a verdict. It also flags push-notification prompts triggered without a prior opt-in banner.

### Regulamin (Act on the Provision of Services by Electronic Means + Consumer Rights Act) - 15 rules

Required:
- Service provider identification (name, NIP / Polish tax ID, REGON / statistical number)
- Address + contact email
- Type and scope of services
- Technical requirements
- Order placement procedure
- Payment methods
- Delivery methods and times
- Right of withdrawal (14 days)
- Withdrawal form
- Complaint procedure
- Reference to the Privacy Policy / GDPR
- Procedure for amending the Regulamin
- Governing law

Recommended:
- ODR platform (ec.europa.eu)
- Effective date

## Result and scoring

Score 0-100%:
- Required: weight 3
- Recommended: weight 2
- Optional: weight 1

Earned points / maximum * 100. All Required rules must be OK before the shop has a solid starting position.

Score colour:
- green >= 90%
- yellow 70-89%
- red < 70%

## REST API

```
GET /wp-json/polski/v1/compliance/page/privacy
GET /wp-json/polski/v1/compliance/page/terms
GET /wp-json/polski/v1/compliance/cookie-banner
GET /wp-json/polski/v1/compliance/cookie-banner?url=https://example.com/
```

Returns the report as JSON:

```json
{
  "page_type": "privacy",
  "page_id": 42,
  "content_length": 8421,
  "score": 94,
  "has_missing_required": false,
  "results": [
    {
      "id": "controller_identity",
      "label": "Controller identity and contact",
      "severity": "required",
      "passed": true,
      "hint": ""
    }
  ]
}
```

Access: `manage_woocommerce` capability.

## Matching rules

Each rule has a list of patterns (Polish + English). Patterns are pre-normalised (lower case, no diacritics). Examples:

- `"administratorem danych osobowych"` - formal Polish wording
- `"administrator danych"` - short form
- `"data controller"` - English wording

A rule passes if **any** pattern appears in the content. Adding a new pattern is a one-line change in `PrivacyPolicyRules::all()` / `RegulaminRules::all()` - pull requests welcome.

## Accessibility (WCAG heuristics)

The cookie banner scan also flags common WCAG 2.1 regressions:

- Reject button hidden, styled as plain text, or placed outside the visible viewport
- Banner blocks keyboard focus without providing an escape route
- Contrast below 4.5:1 on accept / reject buttons (heuristic based on inline styles)

These are starting points for a manual WCAG audit. A full accessibility audit requires assistive-technology testing.

## Limitations

- Keyword heuristic - a rule can pass even when the paragraph is laconic
- No semantic analysis (it does not check whether a retention period is actually described, only whether the word is present)
- Does not check the Cookies Policy, Returns or Warranty pages (separate modules planned)
- Does not evaluate whether a DPO was actually appointed, only whether the mention exists
