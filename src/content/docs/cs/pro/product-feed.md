---
title: Produktový feed (Ceneo, Google Merchant)
description: Generování XML feedů pro polské cenové srovnávače a Google Merchant Center.
---

Modul generuje produktové feedy ve formátu XML kompatibilní s Ceneo.pl, Nokaut.pl a Google Merchant Center.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski PRO > Produktový feed**.

| Nastavení | Popis | Výchozí |
|------------|------|-----------|
| Zapnuto | Aktivuje generování feedů | Ne |
| Platformy | Ceneo, Nokaut, Google Merchant | Ceneo |
| Varianty | Exportovat varianty jako samostatné nabídky | Ne |
| Popis | Přidat popis produktu do feedu | Ano |
| Vyloučit nedostupné | Vynechat produkty bez skladového stavu | Ano |

## URL feedů

Po zapnutí modulu jsou dostupné následující URL:

| Platforma | URL |
|-----------|-----|
| Ceneo | `tvujobchod.cz/polski-feed/ceneo.xml` |
| Nokaut | `tvujobchod.cz/polski-feed/nokaut.xml` |
| Google Merchant | `tvujobchod.cz/polski-feed/google.xml` |

:::tip
Po zapnutí modulu přejděte do **Nastavení > Trvalé odkazy** a klikněte na "Uložit", abyste obnovili pravidla URL.
:::

## Struktura feedu Ceneo

```xml
<offers version="1">
  <group name="Kategoria">
    <o id="123" url="..." price="49.99" avail="1" weight="0.5">
      <name><![CDATA[Nazwa produktu]]></name>
      <desc><![CDATA[Opis produktu]]></desc>
      <cat><![CDATA[Kategoria > Podkategoria]]></cat>
      <images>
        <image url="..."/>
      </images>
      <attrs>
        <a name="EAN" value="1234567890123"/>
        <a name="Producent" value="Marka"/>
      </attrs>
    </o>
  </group>
</offers>
```

## Mapování kategorií Ceneo

V editaci kategorie produktu WooCommerce je dostupné pole **Kategorie Ceneo**, kam lze zadat cestu kategorie Ceneo (např. "Elektronika > Smartfony").

## Vylučování produktů

V editaci produktu WooCommerce je dostupné pole **Vyloučit z feedů** - zaškrtněte checkbox, aby se produkt neobjevoval v žádném feedu.

## Atributy ve feedu

Feed automaticky exportuje:
- **EAN** - ze SKU produktu
- **Producent** - z pole GPSR Manufacturer
- **Atributy produktu** - všechny definované ve WooCommerce

## Cache a regenerace

Feedy jsou cachovány po dobu 6 hodin. Automatická regenerace probíhá denně přes cron `polski_daily_maintenance`. Při prvním přístupu se feed generuje za běhu.

Soubory cache: `wp-content/uploads/polski-feeds/`
