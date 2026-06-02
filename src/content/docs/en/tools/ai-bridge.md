---
title: AI Bridge
description: An AI bridge for Polski for WooCommerce - read-only commerce and compliance abilities via the WordPress Abilities API 6.9, plus AI-assisted product summaries and GPSR safety-text drafts via the AI Client 7.0.
---

AI Bridge is an optional module that exposes your store's data to AI assistants and tools in a controlled way. It has two parts. The first is a set of **read-only** abilities registered with the **WordPress Abilities API (WP 6.9+)**, so the Site Editor command palette, MCP servers, and AI assistants can read the same facts a human admin would. The second is two AI-assisted helpers in the admin: a product summary and a **draft** of GPSR safety text, both using the **WordPress AI Client (WP 7.0+)** through the site-configured provider.

The module never changes anything automatically. The abilities only read data, and the AI helpers produce proposals for review, never overwriting fields that require manual authorisation. The plugin never stores an AI provider key. This is a helper tool, not legal advice and not a guarantee of compliance.

## Enabling the module

The module is **disabled by default**. Enable it in **WooCommerce > Polski > Modules** (the "AI Bridge" section, module key `ai_bridge`). Once enabled:

- on WordPress 6.9+ the commerce abilities are registered (when the Abilities API is available); on older WordPress the module no-ops gracefully and simply skips registration,
- the AI helpers (product summary, GPSR draft) become available only when the site has an AI provider configured for text generation (via the WP AI Client / connector, e.g. Anthropic, Google, OpenAI, Vercel AI Gateway). With no provider configured these helpers simply stay inactive, and the deterministic AI Feed path is unaffected.

## Commerce abilities (read-only)

All abilities belong to the `polski-commerce` category, are marked `readonly` and `show_in_rest`, and are guarded by the WooCommerce `manage_woocommerce` capability. Each is wired to an existing plugin service, so it does not re-implement logic. Nothing is changed.

| Ability (id)                        | What it returns                                                                                    | Input                |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------- |
| `polski/get-omnibus-history`        | Price history and the lowest recorded price for a product (as used for the Omnibus Directive display). | `product_id`         |
| `polski/get-gpsr-data`              | Product safety (GPSR) data: manufacturer, importer, responsible person, identifier, warnings, instructions. | `product_id`         |
| `polski/list-products-missing-gpsr` | Published products missing one or more GPSR fields, so gaps can be found and filled.               | `limit` (1-200), `offset` |
| `polski/get-compliance-status`      | The result of the heuristic checks for the configured legal pages (Terms, Privacy, Returns, Complaints) with a score. | `page_type` (optional) |
| `polski/get-store-health`           | The latest store health snapshot (overall status plus the fatal-error, payments, and sales sensors). | (none)               |
| `polski/get-product-facts`          | The structured product fact list (label/value pairs) the AI Feed surfaces: SKU, GTIN, price, categories, delivery time, and more. | `product_id`         |

Every call passes through a `permission_callback` that checks `manage_woocommerce`. A user without that capability gets no data. The abilities are reachable over REST (`/wp-json/wp-abilities/v1/...`) when the Abilities API is active.

## Product summary (AI)

An on-demand, admin-triggered factual summary of a product. It only works when the module is enabled and a text-capable AI provider is configured. Nothing is generated on page load.

| Aspect              | Behaviour                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Source data         | The product name, short and long description, plus the AI Feed fact list - only data the shop already publishes. |
| Model               | Instructed to use only the provided facts, not to invent specifications or prices, with no marketing language and no legal claims. |
| Length              | Short, 1-3 sentences; the stored summary is capped at 600 characters.                            |
| Storage             | Stored in product meta (`_polski_ai_summary`) only after an admin explicitly triggers generation. |
| No provider         | The feature is unavailable; nothing happens, and other paths keep working unchanged.             |

## GPSR safety-text draft (AI)

A helper that produces a **draft** of product safety warnings and usage instructions as a starting point for human review. It is editorial assistance, not legal advice and not a guarantee of compliance.

| Aspect              | Behaviour                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Source data         | The product's public description plus the already human-entered GPSR fields, so the draft does not contradict existing data. |
| Model               | Instructed to use only the provided facts, not to invent hazards or certifications, and not to state or imply legal compliance. |
| Storage             | Written only to a separate, clearly named draft meta (`_polski_ai_gpsr_draft`). It **never** overwrites the real GPSR fields. |
| Review              | An admin must read the draft and manually copy it into the real fields after verification. Each draft carries a note that it is for review only and is not a guarantee of compliance. |
| Length              | Each draft field is capped at 1500 characters.                                                   |

## Privacy and keys

The plugin **never stores an AI provider key** and never makes the outbound request to the provider itself. The credentials and the network call belong to the AI connector configured in WordPress (a bring-your-own-key model). Only data the shop already publishes or holds is sent to the model.

## Troubleshooting

**Abilities do not appear** - make sure you are on WordPress 6.9+ with the Abilities API active and that the AI Bridge module is enabled. On older WordPress, registration is skipped without error.

**AI helpers are greyed out** - configure an AI provider capable of text generation via the WP AI Client / connector. Without a provider, the summary and GPSR draft stay inactive.

**No data from an ability** - check that the current user has the `manage_woocommerce` capability.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and is not legal advice. Consult a lawyer before deployment. Polski for WooCommerce is open-source software (GPLv2) provided without warranty.</div>
