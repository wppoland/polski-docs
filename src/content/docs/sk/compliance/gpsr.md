---
title: GPSR - bezpečnosť produktov
description: Konfigurácia polí GPSR (General Product Safety Regulation) v Polski for WooCommerce - výrobca, dovozca, zodpovedná osoba v EÚ, identifikátory, varovania a pokyny.
---

Nariadenie GPSR (General Product Safety Regulation, EU 2023/988) platí od 13. decembra 2024. Vyžaduje uvádzanie informácií o bezpečnosti produktov predávaných v EÚ. Polski for WooCommerce pridáva produktové polia, stĺpec stavu a import/export CSV - všetko, čo potrebujete, bez ďalších pluginov.

## Požiadavky GPSR

Každý nepotravinársky produkt predávaný v EÚ musí obsahovať:

1. **Údaje výrobcu** - názov, adresa, kontaktné údaje
2. **Údaje dovozcu** - ak má výrobca sídlo mimo EÚ
3. **Zodpovedná osoba v EÚ** - vyžadovaná pre produkty mimo EÚ
4. **Identifikátory produktu** - číslo šarže, sériové číslo, kód EAN/GTIN
5. **Varovania** - informácie o rizikách a vekových obmedzeniach
6. **Bezpečnostné pokyny** - pravidlá bezpečného používania
7. **Fotografie/dokumenty** - voliteľné prílohy (bezpečnostné listy, certifikáty)
8. **Kategória rizika** - klasifikácia úrovne rizika produktu

## Konfigurácia polí GPSR

Polia GPSR nájdete v úprave produktu, v záložke **Polski - GPSR**. Každé pole je voliteľné, ale vyplňte všetky, ktoré sa vzťahujú na daný produkt.

![Polia GPSR v editore produktu WooCommerce](../../../../assets/screenshots/screenshot-2-gpsr-product-editor.png)

### Výrobca

Vyplňte úplné údaje výrobcu:

- Názov firmy
- Adresa (ulica, PSČ, mesto, krajina)
- E-mailová adresa
- Telefónne číslo
- Webová stránka

### Dovozca

Vyžadované, keď má výrobca sídlo mimo EÚ. Uveďte rovnaké údaje ako pre výrobcu.

### Zodpovedná osoba v EÚ

Každý nepotravinársky produkt od subjektu mimo EÚ musí mať zodpovednú osobu so sídlom v Únii. Uveďte:

- Názov firmy alebo meno a priezvisko
- Adresa v EÚ
- Kontaktné údaje (e-mail, telefón)

### Identifikátory produktu

- **Číslo šarže (LOT)** - identifikátor výrobnej šarže
- **Sériové číslo** - unikátny identifikátor exemplára
- **EAN/GTIN** - čiarový kód produktu
- **Číslo modelu** - označenie modelu

### Varovania a obmedzenia

Textové pole na informácie o:

- Rizikách spojených s používaním
- Vekových obmedzeniach (napr. "Nevhodné pre deti do 3 rokov")
- Požiadavkách na dohľad dospelej osoby
- Nebezpečných látkach

### Bezpečnostné pokyny

Pole na pokyny týkajúce sa:

- Správnej montáže a inštalácie
- Bezpečného používania
- Údržby a skladovania
- Postupu v prípade nehody

## Stĺpec stavu GPSR

V zozname produktov (**Produkty > Všetky produkty**) plugin pridáva stĺpec **GPSR** so stavom vyplnenia:

- Zelená ikona - všetky povinné polia vyplnené
- Oranžová ikona - čiastočne vyplnené
- Červená ikona - chýbajú údaje GPSR

Stĺpec umožňuje rýchlo nájsť produkty, ktoré vyžadujú doplnenie údajov.

## Import a export CSV

### Export

Pri exporte produktov (**Produkty > Exportovať**) plugin pridáva stĺpce GPSR do súboru CSV:

- `gpsr_manufacturer_name`
- `gpsr_manufacturer_address`
- `gpsr_manufacturer_email`
- `gpsr_manufacturer_phone`
- `gpsr_manufacturer_url`
- `gpsr_importer_name`
- `gpsr_importer_address`
- `gpsr_importer_email`
- `gpsr_eu_responsible_name`
- `gpsr_eu_responsible_address`
- `gpsr_eu_responsible_email`
- `gpsr_identifiers_lot`
- `gpsr_identifiers_serial`
- `gpsr_identifiers_ean`
- `gpsr_identifiers_model`
- `gpsr_warnings`
- `gpsr_instructions`

### Import

Pripravte súbor CSV s rovnakými hlavičkami ako pri exporte. Importujte cez **Produkty > Importovať**.

Tip: najprv exportujte niekoľko produktov - dostanete šablónu CSV so správnymi hlavičkami.

## Shortcód

Použite shortcód `[polski_gpsr]` na zobrazenie informácií GPSR na stránke produktu alebo na ľubovoľnom mieste stránky.

### Základné použitie

```
[polski_gpsr]
```

Zobrazí údaje GPSR aktuálneho produktu (funguje na stránke produktu WooCommerce).

### S určením produktu

```
[polski_gpsr product_id="123"]
```

Zobrazí údaje GPSR pre produkt s uvedeným ID.

### Príklad výstupu

Shortcód generuje formátovanú tabuľku so sekciami:

| Sekcia | Obsah |
|--------|-----------|
| Výrobca | Názov, adresa, e-mail, telefón, webová stránka |
| Dovozca | Názov, adresa, e-mail (ak sa uplatňuje) |
| Zodpovedná osoba v EÚ | Názov, adresa, kontaktné údaje |
| Identifikátory | LOT, sériové číslo, EAN, model |
| Varovania | Text varovaní |
| Pokyny | Text bezpečnostných pokynov |

## Hromadné doplňovanie údajov

Ak veľa produktov má rovnakého výrobcu, najrýchlejší spôsob je:

1. Exportujte produkty do CSV
2. Vyplňte stĺpce výrobcu pre všetky riadky (kopírovať-vložiť v tabuľkovom procesore)
3. Importujte aktualizovaný súbor CSV

## Riešenie problémov

**Polia GPSR sa nezobrazujú v úprave produktu**
Uistite sa, že modul GPSR je zapnutý v nastaveniach pluginu: **WooCommerce > Nastavenia > Polski > Moduly**.

**Stĺpec stavu sa nezobrazuje v zozname produktov**
Kliknite na tlačidlo "Možnosti obrazovky" v pravom hornom rohu stránky so zoznamom produktov a zaškrtnite stĺpec GPSR.

**Údaje sa neimportujú z CSV**
Skontrolujte, či hlavičky stĺpcov v súbore CSV presne zodpovedajú formátu exportu. Názvy stĺpcov sú citlivé na veľkosť písmen.

## Ďalšie kroky

- Nahlasovanie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
