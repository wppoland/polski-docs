---
title: "Akcie a dynamické ceny"
description: "Bezplatný modul dynamických cien v Polski for WooCommerce - automatické zľavy v košíku: množstevná (objemová) zľava na riadku produktu a percentuálna zľava, keď medzisúčet košíka dosiahne prahovú hodnotu. Štandardne vypnutý."
---

Modul **Promotions / dynamic pricing** pridáva dve automatické zľavy v košíku, ktoré sa nastavujú v nastaveniach modulu. Je súčasťou Polski for WooCommerce: bezplatný, voliteľný a štandardne vypnutý.

## Čo modul robí

Po zapnutí modul aplikuje zľavy automaticky počas prepočtu košíka, bez kupónových kódov:

- **Množstevná (objemová) zľava** - percentuálna zľava na riadku produktu, keď jeho množstvo dosiahne prahovú hodnotu.
- **Zľava z medzisúčtu košíka** - percentuálna zľava, keď medzisúčet košíka dosiahne prahovú hodnotu (aplikovaná ako záporný poplatok košíka).

Zľavy sa zakaždým prepočítavajú z bežnej ceny, idempotentne, takže sú bezpečné pri opakovaných výpočtoch súčtov vo WooCommerce.

## Zapnutie modulu

Modul je bezplatný, voliteľný a štandardne vypnutý.

Prejdite na `WooCommerce › Polski › Modules`, do skupiny **Merchandising**, a zapnite prepínač **Promotions / dynamic pricing**.

## Nastavenia

Nastavenia modulu nájdete na jeho karte v sekcii `Modules`:

| Nastavenie | Popis |
|---------|-------------|
| **Bulk discount: minimum quantity per product** | Prahová hodnota množstva na riadok, ktorá spustí množstevnú zľavu. `0` vypne množstevnú zľavu. |
| **Bulk discount: percent off (%)** | Percentuálna zľava na riadku, keď množstvo dosiahne prahovú hodnotu. |
| **Cart discount: subtotal threshold** | Medzisúčet košíka, ktorý spustí zľavu košíka. `0` ju vypne. |
| **Cart discount: percent off (%)** | Percentuálna zľava z medzisúčtu košíka, keď sa dosiahne prahová hodnota. |

## Ako zľavy fungujú

### Množstevná zľava

Keď množstvo na riadku dosiahne prahovú hodnotu **minimum quantity per product**, cena tohto riadku sa zníži o nastavené percento. Zľava sa uplatňuje na každý vyhovujúci riadok samostatne.

Príklad: prahová hodnota `10`, zľava `15%`. Zákazník s 10 kusmi produktu dostane na tomto riadku zľavu 15%; pri 9 kusoch sa žiadna zľava neuplatní.

### Zľava z medzisúčtu košíka

Keď medzisúčet košíka dosiahne **subtotal threshold**, do košíka sa pridá záporný poplatok rovný nastavenému percentu z medzisúčtu.

Príklad: prahová hodnota `500`, zľava `10%`. Košík vo výške 500 alebo viac dostane zľavu 10%, uplatnenú ako zľava košíka.

## Kombinovanie zliav

Obe zľavy fungujú nezávisle a môžu sa uplatniť súčasne: množstevná zľava znižuje ceny na riadkoch a zľava košíka pridáva ďalšie zníženie na základe medzisúčtu. Ak chcete ktorúkoľvek z nich vypnúť, nastavte jej prahovú hodnotu na `0`.
