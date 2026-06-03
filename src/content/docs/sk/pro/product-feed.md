---
title: Produktový feed (Ceneo, Google Merchant)
description: Generovanie XML feedov pre poľské cenové porovnávače a Google Merchant Center.
---

Modul generuje produktové feedy vo formáte XML kompatibilné s Ceneo.pl, Nokaut.pl a Google Merchant Center.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfigurácia

Prejdite na **WooCommerce > Nastavenia > Polski PRO > Produktový feed**.

| Nastavenie | Popis | Predvolene |
|------------|------|-----------|
| Zapnutý | Aktivuje generovanie feedov | Nie |
| Platformy | Ceneo, Nokaut, Google Merchant | Ceneo |
| Varianty | Exportovať varianty ako samostatné ponuky | Nie |
| Popis | Pridať popis produktu do feedu | Áno |
| Vylúčiť nedostupné | Vynechať produkty bez skladu | Áno |

## URL feedov

Po zapnutí modulu sú dostupné nasledujúce URL:

| Platforma | URL |
|-----------|-----|
| Ceneo | `twojsklep.pl/polski-feed/ceneo.xml` |
| Nokaut | `twojsklep.pl/polski-feed/nokaut.xml` |
| Google Merchant | `twojsklep.pl/polski-feed/google.xml` |

:::tip
Po zapnutí modulu prejdite na **Nastavenia > Trvalé odkazy** a kliknite na "Uložiť", aby ste obnovili pravidlá URL.
:::

## Štruktúra Ceneo feedu

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

## Mapovanie kategórií Ceneo

Pri úprave kategórie produktu WooCommerce je dostupné pole **Kategória Ceneo**, kde je možné zadať cestu kategórie Ceneo (napr. "Elektronika > Smartfóny").

## Vylúčenie produktov

Pri úprave produktu WooCommerce je dostupné pole **Vylúčiť z feedov** - zaškrtnite checkbox, aby sa produkt neobjavoval v žiadnom feede.

## Atribúty vo feede

Feed automaticky exportuje:
- **EAN** - zo SKU produktu
- **Výrobca** - z poľa GPSR Manufacturer
- **Atribúty produktu** - všetky definované vo WooCommerce

## Cache a regenerácia

Feedy sú cacheované na 6 hodín. Automatická regenerácia prebieha denne cez cron `polski_daily_maintenance`. Pri prvom prístupe sa feed generuje za behu.

Cache súbory: `wp-content/uploads/polski-feeds/`
