---
title: Tag Manager
description: A unified, consent-gated manager for marketing and analytics tags in Polski for WooCommerce, where you enter your own tracking IDs and every tag fires only after consent is granted.
---

Tag Manager is an optional module that manages common marketing pixels and analytics tools in one place. Instead of pasting snippets into your theme, you enable the providers you use and enter your own tracking ID or domain. Nothing is hardcoded, and the plugin never makes any outbound HTTP request from PHP; every tag is a small, client-side snippet emitted into the page.

Crucially, every tag is routed through the Consent Manager and wrapped in a `<script type="text/plain" data-polski-consent="CATEGORY">` element. The script runs only once the visitor has granted the matching consent category. Advertising and remarketing pixels are gated under `marketing`, while measurement and heatmap tools are gated under `analytics`.

These are tools that help you load third-party tags responsibly. They are not legal advice and do not by themselves guarantee any particular legal outcome.

## Enabling the module

The module is **off by default**. Enable it in **WooCommerce > Polski > Modules** (the "Tag Manager" section). Once enabled, you will find each provider's settings on the module card. A provider's tag appears on the storefront only when three conditions are met: the module is enabled, the provider is toggled on, and its ID is entered (except for Simple Analytics, which needs no ID).

## What is not handled here

GA4 and Google Tag Manager are intentionally **not** handled in this module. They live in the **GA4 DataLayer** module together with the WooCommerce ecommerce events, to avoid loading the same scripts twice.

## Supported providers

Each provider has its own on/off toggle and an ID field. The consent category determines when the tag is allowed to run.

### Marketing category

| Provider                          | ID field      |
| --------------------------------- | ------------- |
| Meta Pixel                        | Pixel ID      |
| TikTok Pixel                      | Pixel ID      |
| Microsoft Advertising (Bing UET)  | UET Tag ID    |
| LinkedIn Insight                  | Partner ID    |
| Pinterest Tag                     | Tag ID        |
| X / Twitter Ads                   | Pixel ID      |
| Google Ads                        | AW-XXXXXXXXX  |

### Analytics category

| Provider          | ID field      |
| ----------------- | ------------- |
| Microsoft Clarity | Project ID    |
| Matomo            | Site ID (plus the Matomo instance URL) |
| Plausible         | Domain (e.g. example.com) |
| PostHog           | Project API key |
| Hotjar            | Site ID       |
| Inspectlet        | WID           |
| Crazy Egg         | Account ID    |
| Simple Analytics  | no ID (toggle alone is enough) |

## Behavior and load order

- Tags are printed in the page head via `wp_head` (priority 20), that is, after Google Consent Mode and the DataLayer module.
- Hotjar initialises better just before `</body>`, so it is printed in the footer via `wp_footer`.
- Tags are never printed in the admin area; they run on the storefront only.
- Matomo requires both a Site ID and the Matomo instance URL. Without the URL, no tag is printed.
- Crazy Egg requires a numeric Account ID of at least 8 digits, otherwise no tag is printed.

## Consent gating

Consent gating works together with the **Consent Manager** module, which provides the consent layer and reads the visitor's choices. Until the visitor grants the `marketing` or `analytics` category, the wrapped scripts stay inert and load no third-party code. Once consent is granted, the matching tags begin to run.

Keep in mind that the correct consent setup depends on your legal context. The plugin provides the technical mechanism; deciding which tags and categories you use is up to you.

## Troubleshooting

**A tag does not appear** - check that the module is enabled, the provider is toggled on, and the ID field is filled in. Matomo also requires the instance URL.

**The tag is in the page source but nothing is recorded** - this is expected until the visitor grants the matching category in the Consent Manager. A `text/plain` script runs only after consent.

**Looking for GA4 or GTM** - they are in the GA4 DataLayer module, not here.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and is not legal advice. Consult a lawyer before deployment. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
