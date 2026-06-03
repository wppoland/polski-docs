---
title: Product feed (Ceneo, Google Merchant)
description: Generating XML feeds for Polish price comparison sites and Google Merchant Center.
---

The module generates product feeds in XML format compatible with Ceneo.pl, Nokaut.pl and Google Merchant Center.

:::note[Requirements]
Polski PRO requires: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Configuration

Go to **WooCommerce > Settings > Polski PRO > Product feed**.

| Setting | Description | Default |
|---------|-------------|---------|
| Enabled | Activates feed generation | No |
| Platforms | Ceneo, Nokaut, Google Merchant | Ceneo |
| Variants | Export variants as separate offers | No |
| Description | Add the product description to the feed | Yes |
| Exclude out of stock | Skip products without stock | Yes |

## Feed URLs

Once the module is enabled, the following URLs are available:

| Platform | URL |
|----------|-----|
| Ceneo | `yourshop.pl/polski-feed/ceneo.xml` |
| Nokaut | `yourshop.pl/polski-feed/nokaut.xml` |
| Google Merchant | `yourshop.pl/polski-feed/google.xml` |

:::tip
After enabling the module, go to **Settings > Permalinks** and click "Save" to refresh the URL rules.
:::

## Ceneo feed structure

```xml
<offers version="1">
  <group name="Category">
    <o id="123" url="..." price="49.99" avail="1" weight="0.5">
      <name><![CDATA[Product name]]></name>
      <desc><![CDATA[Product description]]></desc>
      <cat><![CDATA[Category > Subcategory]]></cat>
      <images>
        <image url="..."/>
      </images>
      <attrs>
        <a name="EAN" value="1234567890123"/>
        <a name="Producent" value="Brand"/>
      </attrs>
    </o>
  </group>
</offers>
```

## Ceneo category mapping

In the WooCommerce product category editor a **Ceneo category** field is available, where you can enter the Ceneo category path (e.g. "Elektronika > Smartfony").

## Excluding products

In the WooCommerce product editor an **Exclude from feeds** field is available, check the checkbox so the product does not appear in any feed.

## Attributes in the feed

The feed automatically exports:
- **EAN** - from the product SKU
- **Manufacturer** - from the GPSR Manufacturer field
- **Product attributes** - all those defined in WooCommerce

## Cache and regeneration

Feeds are cached for 6 hours. Automatic regeneration runs daily via the `polski_daily_maintenance` cron. On first access the feed is generated on the fly.

Cache files: `wp-content/uploads/polski-feeds/`
