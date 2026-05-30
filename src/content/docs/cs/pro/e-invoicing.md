---
title: "Elektronická fakturace: PEPPOL/UBL a JPK_FA"
description: "Export faktur v Polski PRO for WooCommerce do formátu PEPPOL/UBL (EN 16931) z obrazovky objednávky a generování reportu JPK_FA(3) pro rozsah dat pro účetnictví."
---

Polski PRO nabízí vedle KSeF dva formáty exportu faktur: **PEPPOL / UBL** (strukturovaná faktura podle normy EN 16931, pro B2B a obchod s veřejným sektorem v EU) a **JPK_FA(3)** (report faktur pro polskou daňovou správu).

:::caution
Soubory se generují z fakturačních dat uložených ve vašem obchodě. Před produkčním použitím ověřte soubor PEPPOL/UBL oficiálním validátorem PEPPOL a soubor JPK_FA podle XSD schématu Ministerstva financí. Modul poskytuje export, nikoli účetní nebo právní poradenství.
:::

## PEPPOL / UBL (export z objednávky)

Export UBL umožňuje stáhnout fakturu jako soubor XML podle **EN 16931 / PEPPOL BIS Billing 3.0** - formátu používaného pro strukturovanou fakturaci B2B a veřejného sektoru v celé Evropské unii.

### Jak stáhnout

Na obrazovce úprav objednávky (`WooCommerce › Orders › [order]`) se zobrazí meta box **PEPPOL / UBL (XML)**. Pokud již pro objednávku existuje faktura, box nabízí tlačítko ke stažení:

- tlačítko **UBL: [invoice number]** stáhne soubor XML s fakturou,
- pokud ještě nebyla vystavena žádná faktura, box zobrazí **No invoice yet** - nejprve fakturu vygenerujte.

### Co soubor obsahuje

Soubor UBL mapuje fakturu: strany transakce (prodávající a kupující s jejich daňovými identifikačními čísly), mezisoučty DPH rozdělené podle sazby, peněžní součty a řádky faktury.

## JPK_FA (report za období)

Report **JPK_FA(3)** generuje soubor XML s fakturami vystavenými ve zvoleném rozsahu dat, ve struktuře vyžadované polskou daňovou správou.

### Jak generovat

Přejděte do `WooCommerce › Polski › JPK_FA report`. Formulář obsahuje:

- **From** - počáteční datum období,
- **To** - koncové datum období,
- tlačítko **Download JPK_FA XML** stáhne report.

Report zahrnuje faktury vystavené ve zvoleném období, s hlavičkou, údaji o subjektu, fakturami s rozpisem DPH podle sazby, kontrolními součty a položkami.

### Údaje o prodávajícím

Údaje o prodávajícím v reportu se načítají z obecných nastavení pluginu (daňové identifikační číslo firmy, název a adresa). Vyplňte je před generováním reportu, aby soubor obsahoval správné údaje o subjektu.

:::note
JPK_FA je report faktur. Není totéž jako JPK_V7 (evidence DPH) nebo odeslání do KSeF - ty se zpracovávají samostatně.
:::
