---
title: Safe Fonts
description: Reduce and defer external Google Fonts requests in Polski for WooCommerce to cut layout shift and hold the font stylesheet until consent is granted.
---

Safe Fonts is an optional module that reduces and controls the external Google Fonts requests made by your theme or other plugins. It acts on any enqueued stylesheet (`<link>`) whose URL points at `fonts.googleapis.com`, and offers two independent behaviours you can toggle separately: load optimisation and holding the stylesheet until consent is granted.

The module provides tools to cut and defer third-party font requests. It is not legal advice and does not by itself guarantee any particular legal outcome. True self-hosting of the font files is out of scope for this version of the module; it reduces and gates the external calls rather than moving the files.

## Enabling the module

The module is **off by default**. Enable it in **WooCommerce > Polski > Modules** (module key `safe_fonts`). Once enabled it only acts on the storefront; the admin area is skipped. If the module cannot recognise or rewrite a given tag, it returns it untouched, so fonts always keep working (graceful degradation).

## Modes

| Mode                  | What it does                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| Optimise              | Appends `display=swap` to the Google Fonts URL when missing, and emits `preconnect` resource hints for `fonts.googleapis.com` and (with `crossorigin`) `fonts.gstatic.com`. This trims layout shift and the connection cost without changing what is loaded. |
| Gate until consent    | Rewrites the Google Fonts `<link>` into a disabled placeholder link (the real URL is kept in a `data` attribute). A tiny controller re-enables it only once the visitor has granted the chosen consent category. Until then the external request is not made. |

The two modes are independent. You can enable one, both, or neither.

### Optimise

When optimisation is on, the module:

- appends `display=swap` to the Google Fonts stylesheet URL when it lacks an explicit `display` value. Non-font URLs are left untouched.
- prints two `preconnect` hints in `<head>`: one for `https://fonts.googleapis.com` and one for `https://fonts.gstatic.com` (with the `crossorigin` attribute).

This behaviour does not block any requests; it only reduces layout shift and the cost of opening the connection.

### Gate until consent

When this mode is on, the module turns the Google Fonts tag into a disabled stylesheet (`disabled`, `media="print"`, `href="about:blank"`) that fetches nothing. The real URL is stored in `data-polski-safefont` and the chosen consent category in `data-polski-consent`. A small frontend controller re-enables the stylesheet only once the visitor has granted the configured consent category, and it also reacts to the Consent Manager's `polskiConsentChange` event.

A `<noscript>` fallback containing the original tag is preserved, so fonts still load when JavaScript is disabled. The controller is enqueued only when a font was actually gated on the current request.

This mode works together with the **Consent Manager** module (the consent category and the consent-change event come from it). For gating to be meaningful, the consent category must be genuinely enforced on the visitor's side.

## Settings

Settings live on the module card in **WooCommerce > Polski > Modules**.

| Setting             | Default       | Description                                                          |
| ------------------- | ------------- | -------------------------------------------------------------------- |
| Optimise            | on            | Appends `display=swap` and prints `preconnect` hints for the Google Fonts hosts. |
| Gate until consent  | off           | Holds the Google Fonts stylesheet until the chosen consent category is granted. |
| Consent category    | Preferences   | The consent category required to load fonts when gating is on.       |

## Graceful degradation

If a tag cannot be parsed or safely reconstructed (for example, it is not a standard `rel="stylesheet"` link), the module returns it unchanged. This means unsupported cases never break the page, and fonts load as they did before.

## Troubleshooting

**Fonts do not load after enabling gating** - check that the visitor has granted the chosen consent category and that the Consent Manager module is active. Until consent is given, the stylesheet stays disabled.

**`display=swap` does not appear** - this applies only to URLs pointing at `fonts.googleapis.com`, and only when the URL does not already carry an explicit `display` value.

**Locally hosted theme fonts do not change** - the module acts only on external Google Fonts requests. Locally hosted fonts are not affected.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before deploying. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
