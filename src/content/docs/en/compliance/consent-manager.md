---
title: Consent Manager
description: A native cookie-consent banner with categories, Google Consent Mode v2 signalling, consent-gated script and iframe loading, and a records-of-consent log with CSV export in Polski for WooCommerce.
---

Consent Manager is an optional module that adds a native cookie-consent banner with categories, Google Consent Mode v2 signalling, and a log of the decisions visitors made. Other modules can "gate" their scripts and iframes so they only run once the visitor grants the matching category.

The module provides tools that help you collect and honour consent choices. It does not by itself guarantee any particular legal outcome and is not a substitute for legal advice.

## Enabling the module

The module is **off by default**. Enable it in **WooCommerce > Polski > Modules** (the "Consent Manager" section, module key `consent_manager`). Once enabled, the banner is rendered in the storefront footer and a **Consent records** view becomes available in the admin. That view and the CSV export require the `manage_woocommerce` capability.

## Consent categories

The banner uses a fixed set of categories. The "Necessary" category is always granted and cannot be switched off. The other three are optional and the visitor can toggle them on or off.

| Category    | Key           | Default   | Description                                                       |
| ----------- | ------------- | --------- | ----------------------------------------------------------------- |
| Necessary   | `necessary`   | always on | Required for the store to work. Always granted, cannot be disabled. |
| Analytics   | `analytics`   | on        | Traffic measurement and statistics.                               |
| Marketing   | `marketing`   | on        | Advertising and remarketing.                                      |
| Preferences | `preferences` | on        | Personalisation and features that remember choices.              |

By default all three optional categories are active in the banner. You can disable any of them in the module settings if your store does not use it.

## Google Consent Mode v2

When Google Consent Mode is enabled (the default), the module prints the default consent state before any gtag/GTM code (on `wp_head` at priority 0). All signals start **denied**, except `security_storage`, and are then updated immediately from the stored cookie if the visitor has already decided. This guarantees gtag/GTM see the correct state from their first call.

The banner categories map onto Consent Mode signals as follows:

| Category    | Consent Mode v2 signals                                  |
| ----------- | -------------------------------------------------------- |
| Analytics   | `analytics_storage`                                      |
| Marketing   | `ad_storage`, `ad_user_data`, `ad_personalization`       |
| Preferences | `functionality_storage`, `personalization_storage`       |

Once the visitor makes a choice, the banner calls `gtag('consent', 'update', ...)` with the current state.

## Consent-gated scripts and iframes

The module exposes a contract that lets other modules run scripts and iframes only after the matching category is granted. Gated code is rendered as `<script type="text/plain" data-polski-consent="CATEGORY">`, so the browser never executes it on load. The front-end controller rewrites it into an executable script once the category is granted (immediately if the cookie already allows it, otherwise on the `polskiConsentChange` event).

When the choice changes, the banner:

- writes the `polski_consent` cookie with the list of granted categories,
- calls `gtag('consent', 'update', ...)`,
- fires the `polskiConsentChange` window event that gated scripts react to,
- POSTs the decision to the REST recorder.

## Consent records

Every decision saved from the banner is written to the consent log. It is a read-only admin view, available while the module is enabled, for documenting the choices visitors made. The log is not a substitute for legal advice.

| Column          | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| Date            | Date and time of the stored decision.                         |
| Category        | The category the decision applies to.                         |
| Decision        | "Granted" or "Denied".                                        |
| User            | The user ID, or "Guest" for logged-out visitors.              |
| IP address      | The visitor's IP address (when available).                    |
| Wording version | A hash of the banner wording the visitor actually saw.        |

Each stored choice is tied to the banner wording version (a hash of the heading, text, and category list), so you can tell exactly which wording the visitor accepted.

### CSV export

The **Export CSV** button downloads the full log as a CSV file. The export includes the columns: `id`, `created_at`, `category`, `granted`, `user_id`, `ip_address`, `user_agent`, `consent_version`. The export requires the `manage_woocommerce` capability and is protected by a nonce.

## Settings

Settings live on the module card in **WooCommerce > Polski > Modules**.

| Setting               | Default            | Description                                                   |
| --------------------- | ------------------ | ------------------------------------------------------------- |
| Category: Analytics   | on                 | Whether the analytics category is shown in the banner.        |
| Category: Marketing   | on                 | Whether the marketing category is shown in the banner.        |
| Category: Preferences | on                 | Whether the preferences category is shown in the banner.      |
| Heading               | (empty)            | Optional banner heading.                                      |
| Banner text           | default text       | The main banner text (allows basic HTML).                     |
| Accept-all label      | "Accept all"       | Text of the accept-everything button.                         |
| Reject-all label      | "Reject all"       | Text of the reject-optional-categories button.                |
| Manage label          | "Manage"           | Text of the button that opens the category choices.           |
| Save-choices label    | "Save choices"     | Text of the button that saves the selected categories.        |
| Position              | bottom             | Banner placement: top, bottom, or center.                     |
| Google Consent Mode   | on                 | Whether to print Google Consent Mode v2 signals.              |

## Troubleshooting

**The banner does not appear** - make sure the module is enabled in **WooCommerce > Polski > Modules** and that the theme calls `wp_footer()`. The banner is rendered in the footer.

**Google tags do not react to consent** - check that Google Consent Mode is enabled and that your gtag/GTM code loads after the Consent Mode signals (they are printed very early in `wp_head`).

**A gated script does not run** - the script only starts after the matching category is granted. Verify that the visitor granted the category and that the script was emitted through the gating contract.

Reporting issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for information only and is not legal advice. Consult a lawyer before deploying. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
