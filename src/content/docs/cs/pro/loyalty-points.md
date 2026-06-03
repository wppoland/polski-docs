---
title: Věrnostní program (Body)
description: Systém věrnostních bodů v Polski PRO - zákazníci sbírají body za nákupy a vyměňují je za slevy.
---

Modul věrnostního programu umožňuje odměňovat zákazníky body za nákupy a umožňuje výměnu bodů za slevy v košíku.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski PRO > Věrnost**.

### Základní nastavení

| Nastavení | Popis | Výchozí |
|------------|------|-----------|
| Zapnuto | Aktivuje věrnostní program | Ne |
| Body za 1 PLN | Kolik bodů za každou zlotovku | 1 |
| Hodnota 1 bodu | Slevová hodnota jednoho bodu | 0.01 PLN |
| Min. body k výměně | Minimální počet bodů k výměně | 100 |
| Max. % slevy | Maximální procentuální sleva z bodů | 50% |
| Vypršení bodů | Po kolika dnech body vyprší | 365 |
| Zaokrouhlování | floor (dolů) nebo ceil (nahoru) | floor |

## Sbírání bodů

Zákazníci automaticky obdrží body po realizované objednávce.

### Priority výpočtu

1. **Nastavení per produkt** - pole "Loyalty points per unit" v editaci produktu
2. **Nastavení per kategorie** - pole v editaci kategorie produktu
3. **Výchozí kalkulace** - cena produktu x body za 1 PLN

### Informace na stránce produktu

Na stránce produktu se automaticky zobrazuje informace:
> Získejte **X bodů** za nákup tohoto produktu

## Výměna bodů

Zákazníci mohou vyměnit body za slevu na stránce košíku nebo pokladny:
1. Systém zobrazuje aktuální zůstatek a hodnotu slevy
2. Zákazník zadá počet bodů k výměně
3. Vytvoří se jednorázový kupón se slevou
4. Kupón je automaticky aplikován do košíku

### Omezení výměny

- Minimální počet bodů k výměně (konfigurovatelný)
- Maximální sleva jako % hodnoty košíku
- Kupón platný 24 hodin

## Panel Můj účet

V sekci **Můj účet** se objeví záložka **Věrnostní program** s:
- Aktuální zůstatek bodů a jejich hodnota v PLN
- Suma nasbíraných bodů
- Suma využitých bodů
- Historie transakcí s daty, typy a detaily

## Vypršení bodů

Body vyprší automaticky po nakonfigurovaném čase (výchozí 365 dní). Cron `polski_daily_maintenance` denně kontroluje vypršelé body a odečítá je ze zůstatku.

Nastavení na 0 = body nevyprší.

## Vrácení a storna

- Při stornu/vrácení objednávky - přidělené body se automaticky odečtou
- Ochrana proti dvojímu výpočtu a odečtu

## Objednávkové e-maily

V e-mailech potvrzujících objednávku zákazník vidí informaci o počtu nasbíraných bodů.

## Hooky

| Hook | Typ | Popis |
|------|-----|------|
| `polski/loyalty/points_awarded` | action | Po přidělení bodů za objednávku |
| `polski/loyalty/order_points` | filter | Úprava počtu bodů za objednávku |
