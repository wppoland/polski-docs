---
title: Výběr data dodání
description: Modul výběru preferovaného data dodání na pokladně WooCommerce v Polski PRO.
---

Modul přidává pole s kalendářem (flatpickr) na stránku objednávky a umožňuje zákazníkům vybrat preferované datum dodání.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfigurace

Přejděte do **Polski PRO > Moduly** a zapněte modul **Výběr data dodání**.

| Nastavení | Popis | Výchozí |
|------------|------|-----------|
| Popisek pole | Text zobrazený nad kalendářem | Preferované datum dodání |
| Povinné pole | Zda zákazník musí vybrat datum | Ne |
| Min. dní | Nejbližší možné datum (dní od dneška) | 1 |
| Max. dní | Nejvzdálenější možné datum (dní od dneška) | 30 |
| Zablokované dny v týdnu | Které dny jsou nedostupné (0=ne, 6=so) | 0 (neděle) |
| Zablokovaná data | Konkrétní nedostupná data (formát: YYYY-MM-DD, oddělená čárkami) | prázdné |
| Formát zobrazení | Formát data na objednávce | d.m.Y (l) |

## Jak to funguje

1. Na pokladně se objeví pole s ikonou kalendáře
2. Zákazník klikne a vybere datum z flatpickr
3. Zablokované dny (víkendy, svátky) jsou zašedlé
4. Datum je validováno na straně serveru
5. Ukládá se do meta objednávky (`_polski_delivery_date`)

## Kde je datum viditelné

- Panel administrátora (pod doručovací adresou)
- Stránka detailů objednávky (Můj účet)
- E-maily objednávky (HTML i plain text)

## Obsluha svátků

Pro zablokování svátků (např. Vánoce, Velikonoce) přidejte data ve formátu YYYY-MM-DD oddělená čárkami:

```
2026-12-25,2026-12-26,2026-04-05,2026-04-06,2026-05-01,2026-05-03
```

## WooCommerce Blocks

Modul podporuje také pokladnu založenou na blocích WooCommerce. Datum je předáváno přes Store API v `extensions.polski-pro.delivery_date`.
