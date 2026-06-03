---
title: OSS Observer
description: Monitoring the EU OSS VAT sales threshold (EUR 10,000) in WooCommerce through integration with the One Stop Shop plugin.
---

The "OSS Observer" module integrates your store with the standalone **One Stop Shop for WooCommerce** plugin and helps you monitor the OSS VAT sales threshold (the One Stop Shop procedure). When annual B2C sales to other EU countries approach EUR 10,000, the store should join the OSS procedure and from that point settle VAT according to the rate of the buyer's country.

## Who is it for

If you run an online store in Poland and ship goods or provide electronic services to consumers (B2C) in other EU countries, the EUR 10,000 threshold applies to you. The module is useful for any store that ships products abroad within the European Union.

## How it works

1. Enable the **OSS Observer** module in the `Polski > Modules` panel (the "Tax & Pricing" section).
2. Click the pencil icon to open the module settings.
3. If the "One Stop Shop for WooCommerce" plugin is not installed, use the **Install One Stop Shop** button. The plugin will be downloaded from the WordPress.org repository, installed, and activated automatically.
4. After installation, go to **WooCommerce > Settings > Tax > OSS** to configure the threshold observer, the OSS procedure, and tax reports.

As long as the OSS plugin is not installed, the module displays an installation CTA. After activation, it shows the status of the OSS procedure and of automatic threshold monitoring.

## In-panel notification

If the module is enabled but the external OSS plugin is not present, the store displays a WooCommerce "OSS plugin is missing" notice with a one-click install button. This way you will not forget to finish the configuration.

## Integration with polski-pro

The polski-pro plugin exposes the helper `Polski\Pro\TaxRules\OssHelper::isEnabled()`, which returns the current state of the OSS procedure. Developers can use it to branch the logic of invoices, tax rules, or shipping calculations depending on whether the store uses the OSS procedure.

The state is also filterable in polski through the `polski_tax_oss_enabled` filter, which allows external plugins to observe or override the signal.

## Why a separate plugin?

The OSS reporting and threshold observation logic is maintained in the standalone "One Stop Shop for WooCommerce" plugin (free, available in the WordPress.org repository). Polski for WooCommerce acts as a thin adapter, it adds a visible toggle in the modules panel, simplifies installation, and lets other store modules (invoices, tax rules) react to the OSS procedure being enabled. This way we do not duplicate a feature maintained by another team, and you always have the latest changes in handling the OSS procedure.
