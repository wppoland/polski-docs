---
title: Custom Triggers
description: Push custom dataLayer events in Polski for WooCommerce based on page URL or click conditions, optionally gated by a consent category.
---

Custom Triggers is an optional module that lets you push your own events into the `window.dataLayer` (the same layer used by the GA4 DataLayer module) when a simple front-end condition matches. This way you can model events that are specific to your store, for example a visit to a particular page or a click on a chosen button, without writing your own JavaScript.

Each trigger pushes a named event (with optional extra parameters) into the same data layer as the GA4 events. What happens next (for example forwarding to Google Tag Manager, Meta Pixel, TikTok or Matomo) depends on your tag configuration. These are tools that help you model your own events, not a guarantee of any particular legal or analytics outcome.

## Enabling the module

The module is **off by default**. Enable it in **WooCommerce > Polski > Modules** (module key `custom_triggers`). Once enabled and at least one valid trigger is defined, the module loads a lightweight controller on the store front end. If the trigger list is empty, no script is enqueued. The controller never runs in the admin area.

## How triggers work

A trigger is evaluated in the visitor's browser. Two condition types are available:

| Condition  | What fires the event                                                        |
| ---------- | --------------------------------------------------------------------------- |
| `page_url` | The current URL path or query contains a given substring.                   |
| `click`    | A click on an element matching a given CSS selector.                        |

Each trigger must have an event name set, otherwise it is skipped. If the condition type is not set to `click`, the module treats it as `page_url`.

## Trigger settings

Each row in the trigger list is described by the following fields:

| Field      | Description                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------- |
| Event      | The event name pushed to `dataLayer`. Required, empty triggers are skipped.                    |
| Condition  | `page_url` or `click`. Defaults to `page_url`.                                                 |
| Value      | The substring compared against the URL path/query (for the `page_url` condition).              |
| Selector   | The CSS selector of the element whose click fires the event (for the `click` condition).       |
| Category   | The consent category that gates the event. Defaults to `necessary`.                            |
| Parameters | Optional extra event parameters (key-value pairs, scalar values only).                          |

The trigger list is stored as JSON-encoded data in the `polski_custom_triggers` option (key `triggers`). Only scalar values are kept as parameters, anything else is discarded.

## Consent gating

A dataLayer push is a first-party action, but each trigger can be assigned a consent category. The front-end controller only fires a categorised trigger once the visitor has granted that category (recorded in the consent cookie). Triggers in the `necessary` category always fire.

The controller re-checks consent on the `polskiConsentChange` event, so a change in the visitor's decision (for example accepting marketing in the consent banner) is honoured without a page reload. This lets you, for example, gate a marketing conversion event behind marketing consent.

If the assigned category is not a valid consent category, the module falls back to `necessary`. The cookie name, event name and the necessary category are taken from the Consent Manager module, so consent gating stays consistent with the consent banner.

The module provides tools to gate events by consent, it does not provide legal advice and does not guarantee regulatory compliance. Classifying events against the correct consent category is the store owner's responsibility.

## Data layer integration

Triggers use the same `window.dataLayer` as the GA4 DataLayer module. For events to be received and processed further, this data layer must exist on the page. The module itself only pushes events into the layer, what happens to them next is decided by your tag and analytics configuration.

## Troubleshooting

**Events do not appear in dataLayer** - make sure the module is enabled, at least one trigger with an event name is defined, and that `window.dataLayer` exists on the page (the GA4 DataLayer module).

**A `click` trigger does not respond** - check the CSS selector. It must match an element that exists on the page.

**A trigger with a non-necessary category does nothing** - the event is only sent after consent is granted for its assigned category. Check the Consent Manager configuration and the visitor's decision.

Reporting issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before deployment. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
