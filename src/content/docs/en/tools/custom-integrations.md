---
title: Custom Integrations
description: Add your own header or footer snippets in Polski for WooCommerce, each assigned a consent category so it runs only after the visitor grants that category.
---

Custom Integrations is an optional module that lets you add your own inline code snippets to the head or footer of your store. Each snippet is assigned a consent category and is emitted through the Consent Manager gate, so it runs only after the visitor has granted that category. This lets you load codes for tools such as Meta Pixel, TikTok, Matomo or Google Consent Mode in a way that respects the visitor's choice.

You supply the code yourself. The plugin makes no outbound HTTP request from PHP and hardcodes no third-party endpoints. These are tools that help you load your own snippets responsibly, they are not legal advice and do not by themselves guarantee any particular legal outcome.

## Enabling the module

The module is **off by default**. Enable it in **WooCommerce > Polski > Modules** (the "Custom Integrations" section). Once enabled, snippets are emitted on the store front end, never in the admin area. Managing the settings requires the `manage_woocommerce` capability.

## How it works

Every snippet is gated by the Consent Manager. Instead of an immediately executable script, a placeholder is printed on the page, and the Consent Manager front-end controller swaps it for a working script only after the matching category has been granted. Snippets in the "Necessary" category always activate.

| Aspect            | Behaviour                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------ |
| Placement         | Head snippets are printed in `wp_head`, footer snippets in `wp_footer` (priority 30).      |
| Front end only    | Snippets are never printed in the admin area.                                              |
| Consent gate      | Each snippet passes through the Consent Manager gate and waits for its category to be granted. |
| Necessary         | Snippets in the "Necessary" category always run, without waiting for consent.              |
| No PHP traffic    | The plugin sends no HTTP request from the server, only your own code is loaded.            |

## Snippet fields

The snippet list is repeatable, so you can add as many snippets as you need. Each row has the following fields:

| Field            | Description                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------- |
| Label            | A human-readable name for the snippet, to help you recognise it in the list. Optional.       |
| Placement        | `head` or `footer`. Defaults to footer.                                                       |
| Consent category | The Consent Manager category that must be granted before the snippet runs. An unrecognised value is treated as "Necessary". |
| Code             | The snippet itself. Rows with empty code are skipped.                                         |

### How the code is handled

If your snippet is wrapped in a single `<script>...</script>` tag, its inner body is extracted and passed to the gate as the script content. If you paste bare JavaScript without a tag, it is treated as an inline script body. Any markup outside the `<script>` tag is dropped, so only the script content reaches the gate (the placeholder stays `text/plain` until consent is granted).

## Settings

Settings live on the module card in **WooCommerce > Polski > Modules**. The snippet list is stored as a single repeatable setting.

| Setting        | Default | Description                                                          |
| -------------- | ------- | -------------------------------------------------------------------- |
| Snippet list   | (empty) | A repeatable list of snippets (label, placement, category, code).    |

## Troubleshooting

**A snippet does not run** - check whether the visitor has granted the consent category assigned to that snippet. Snippets other than "Necessary" wait for consent. Make sure the Consent Manager is also active.

**A snippet does not appear in the page source** - make sure the code field is not empty and that the module is enabled. Snippets are not printed in the admin area, so check the store front end.

**Part of the code disappears** - only the script content reaches the gate. Markup and code outside a single `<script>...</script>` tag are dropped. Paste JavaScript or wrap it in one `<script>` tag.

Reporting issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before deployment. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
