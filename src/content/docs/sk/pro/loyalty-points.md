---
title: Vernostný program (Body)
description: Systém vernostných bodov v Polski PRO - zákazníci zbierajú body za nákupy a vymieňajú ich za zľavy.
---

Modul vernostného programu umožňuje odmeňovať zákazníkov bodmi za nákupy a umožňuje výmenu bodov za zľavy v košíku.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfigurácia

Prejdite na **WooCommerce > Nastavenia > Polski PRO > Vernosť**.

### Základné nastavenia

| Nastavenie | Popis | Predvolene |
|------------|------|-----------|
| Zapnutý | Aktivuje vernostný program | Nie |
| Body za 1 PLN | Koľko bodov za každú zlotovku | 1 |
| Hodnota 1 bodu | Zľavová hodnota jedného bodu | 0.01 PLN |
| Min. body na výmenu | Minimálny počet bodov na výmenu | 100 |
| Max. % zľavy | Maximálna percentuálna zľava z bodov | 50% |
| Vypršanie bodov | Po koľkých dňoch body vypršia | 365 |
| Zaokrúhľovanie | floor (nadol) alebo ceil (nahor) | floor |

## Zbieranie bodov

Zákazníci automaticky dostávajú body po dokončenej objednávke.

### Priority pripisovania

1. **Nastavenie pre produkt** - pole "Loyalty points per unit" pri úprave produktu
2. **Nastavenie pre kategóriu** - pole pri úprave kategórie produktu
3. **Predvolený výpočet** - cena produktu x body za 1 PLN

### Informácia na stránke produktu

Na stránke produktu sa automaticky zobrazuje informácia:
> Získajte **X bodov** za nákup tohto produktu

## Výmena bodov

Zákazníci môžu vymeniť body za zľavu na stránke košíka alebo pokladne:
1. Systém zobrazí aktuálny zostatok a hodnotu zľavy
2. Zákazník zadá počet bodov na výmenu
3. Vytvorí sa jednorazový kupón so zľavou
4. Kupón sa automaticky aplikuje na košík

### Obmedzenia výmeny

- Minimálny počet bodov na výmenu (konfigurovateľný)
- Maximálna zľava ako % hodnoty košíka
- Kupón platný 24 hodín

## Panel Môj účet

V sekcii **Môj účet** sa objaví záložka **Vernostný program** s:
- Aktuálny zostatok bodov a ich hodnota v PLN
- Súčet získaných bodov
- Súčet využitých bodov
- História transakcií s dátumami, typmi a podrobnosťami

## Vypršanie bodov

Body vypršia automaticky po nakonfigurovanom čase (predvolene 365 dní). Cron `polski_daily_maintenance` denne kontroluje vypršané body a odpočítava ich zo zostatku.

Nastavenie na 0 = body nevypršia.

## Vrátenia a zrušenia

- Pri zrušení/vrátení objednávky - pridelené body sa automaticky odpočítajú
- Ochrana pred dvojitým pripisovaním a odpočítavaním

## Objednávkové e-maily

V e-mailoch potvrdzujúcich objednávku zákazník vidí informáciu o počte získaných bodov.

## Hooky

| Hook | Typ | Popis |
|------|-----|------|
| `polski/loyalty/points_awarded` | action | Po pridelení bodov za objednávku |
| `polski/loyalty/order_points` | filter | Úprava počtu bodov za objednávku |
