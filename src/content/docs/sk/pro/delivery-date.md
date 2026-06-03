---
title: Výber dátumu doručenia
description: Modul výberu preferovaného dátumu doručenia na pokladni WooCommerce v Polski PRO.
---

Modul pridáva pole s kalendárom (flatpickr) na stránke objednávky a umožňuje zákazníkom vybrať preferovaný dátum doručenia.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfigurácia

Prejdite do **Polski PRO > Moduly** a zapnite modul **Výber dátumu doručenia**.

| Nastavenie | Popis | Predvolené |
|------------|------|-----------|
| Štítok poľa | Text zobrazený nad kalendárom | Preferovaný dátum doručenia |
| Povinné pole | Či musí zákazník vybrať dátum | Nie |
| Min. dní | Najskorší možný dátum (dni od dnešného dňa) | 1 |
| Max. dní | Najneskorší možný dátum (dni od dnešného dňa) | 30 |
| Zablokované dni v týždni | Ktoré dni sú nedostupné (0=nedeľa, 6=sobota) | 0 (nedele) |
| Zablokované dátumy | Konkrétne nedostupné dátumy (formát: YYYY-MM-DD, oddelené čiarkami) | prázdne |
| Formát zobrazenia | Formát dátumu na objednávke | d.m.Y (l) |

## Ako to funguje

1. Na pokladni sa objaví pole s ikonou kalendára
2. Zákazník klikne a vyberie dátum z flatpickr
3. Zablokované dni (víkendy, sviatky) sú zošednuté
4. Dátum je validovaný na strane servera
5. Ukladá sa do meta objednávky (`_polski_delivery_date`)

## Kde je dátum viditeľný

- Panel administrátora (pod dodacou adresou)
- Stránka s podrobnosťami objednávky (Môj účet)
- E-maily objednávky (HTML a plain text)

## Spracovanie sviatkov

Ak chcete zablokovať sviatky (napr. Vianoce, Veľkú noc), pridajte dátumy vo formáte YYYY-MM-DD oddelené čiarkami:

```
2026-12-25,2026-12-26,2026-04-05,2026-04-06,2026-05-01,2026-05-03
```

## WooCommerce Blocks

Modul podporuje aj pokladňu založenú na blokoch WooCommerce. Dátum je odovzdaný cez Store API v `extensions.polski-pro.delivery_date`.
