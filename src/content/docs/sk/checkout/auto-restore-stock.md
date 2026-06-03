---
title: Automatické obnovenie skladových zásob
description: Obnoví skladové zásoby produktov, keď je objednávka zrušená, vrátená alebo nezaplatená.
---

WooCommerce znižuje skladové zásoby pri vytvorení objednávky, ale nie vždy ich obnoví pri zrušení. Tento modul automaticky obnoví skladové zásoby.

## Zapnutie

Prejdite do **WooCommerce > Polski > Moduly** a zapnite modul **Auto Restore Stock** v sekcii "Stock & Cart".

## Podporované prechody stavov

| Zo stavu | Na stav | Obnovenie |
|-----------|-----------|-------------|
| Processing | Cancelled | Áno |
| Completed | Cancelled | Áno |
| On-hold | Cancelled | Áno |
| Processing | Refunded | Áno |
| Completed | Refunded | Áno |
| On-hold | Refunded | Áno |
| Processing | Failed | Áno |
| On-hold | Failed | Áno |

## Ako to funguje

1. Objednávka zmení stav na zrušenú/vrátenú/nezaplatenú
2. Modul skontroluje každý produkt v objednávke
3. Pre produkty so zapnutým spravovaním zásob obnoví množstvo
4. Pridá poznámku k objednávke: "Stock restored: Názov produktu (5 -> 8)"
5. Nastaví meta `_polski_stock_restored`, aby zabránil dvojitému obnoveniu

## Požiadavky

- Možnosť WooCommerce **Spravovať skladové zásoby** musí byť zapnutá
- Produkty musia mať zapnuté spravovanie zásob

## Hook

| Hook | Typ | Popis |
|------|-----|------|
| `polski/stock/restored` | action | Po obnovení zásob pre produkt |
