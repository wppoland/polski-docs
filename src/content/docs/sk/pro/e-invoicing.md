---
title: "Elektronická fakturácia: PEPPOL/UBL a JPK_FA"
description: "Export faktúr v Polski PRO for WooCommerce do formátu PEPPOL/UBL (EN 16931) z obrazovky objednávky a generovanie výkazu JPK_FA(3) za zvolené obdobie pre účtovníctvo."
---

Polski PRO ponúka dva formáty exportu faktúr popri KSeF: **PEPPOL / UBL** (štruktúrovaná faktúra v súlade s EN 16931, pre B2B a obchod s verejným sektorom v EÚ) a **JPK_FA(3)** (výkaz faktúr pre poľskú daňovú správu).

:::caution
Súbory sa generujú z údajov faktúr uložených vo vašom obchode. Pred produkčným použitím overte súbor PEPPOL/UBL pomocou oficiálneho validátora PEPPOL a súbor JPK_FA oproti XSD schéme ministerstva financií. Modul poskytuje export, nie účtovné ani právne poradenstvo.
:::

## PEPPOL / UBL (export z objednávky)

Export UBL vám umožňuje stiahnuť faktúru ako XML súbor v súlade s **EN 16931 / PEPPOL BIS Billing 3.0** - formátom používaným pre štruktúrovanú fakturáciu B2B a vo verejnom sektore v celej Európskej únii.

### Ako stiahnuť

Na obrazovke úpravy objednávky (`WooCommerce › Orders › [order]`) sa zobrazí meta box **PEPPOL / UBL (XML)**. Ak pre objednávku už existuje faktúra, box ponúka tlačidlo na stiahnutie:

- tlačidlo **UBL: [invoice number]** stiahne XML súbor faktúry,
- ak ešte nebola vystavená žiadna faktúra, box zobrazí **No invoice yet** - najprv vygenerujte faktúru.

### Čo súbor obsahuje

Súbor UBL mapuje faktúru: strany transakcie (predávajúci a kupujúci s ich daňovými identifikačnými číslami), medzisúčty DPH rozdelené podľa sadzby, peňažné súčty a riadky faktúry.

## JPK_FA (výkaz za obdobie)

Výkaz **JPK_FA(3)** generuje XML súbor faktúr vystavených v zvolenom časovom rozsahu, v štruktúre vyžadovanej poľskou daňovou správou.

### Ako generovať

Prejdite na `WooCommerce › Polski › JPK_FA report`. Formulár obsahuje:

- **From** - dátum začiatku obdobia,
- **To** - dátum konca obdobia,
- tlačidlo **Download JPK_FA XML** stiahne výkaz.

Výkaz pokrýva faktúry vystavené v zvolenom období, s hlavičkou, údajmi o subjekte, faktúrami s rozpisom DPH podľa sadzby, kontrolnými súčtami a položkami.

### Údaje predávajúceho

Údaje predávajúceho vo výkaze sa načítavajú zo všeobecných nastavení pluginu (daňové identifikačné číslo spoločnosti, názov a adresa). Vyplňte ich pred generovaním výkazu, aby súbor obsahoval správne údaje o subjekte.

:::note
JPK_FA je výkaz faktúr. Nie je to to isté ako JPK_V7 (evidencia DPH) ani odoslanie do KSeF - tie sa spracúvajú samostatne.
:::
