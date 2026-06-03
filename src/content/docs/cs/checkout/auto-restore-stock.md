---
title: Automatické obnovení skladových zásob
description: Obnoví skladové zásoby produktů, když je objednávka zrušena, vrácena nebo nezaplacena.
---

WooCommerce snižuje skladové zásoby při vytvoření objednávky, ale ne vždy je obnoví při zrušení. Tento modul automaticky obnovuje skladové zásoby.

## Zapnutí

Přejděte do **WooCommerce > Polski > Moduly** a zapněte modul **Auto Restore Stock** v sekci "Stock & Cart".

## Podporované přechody stavů

| Ze stavu | Na stav | Obnovení |
|-----------|-----------|-------------|
| Processing | Cancelled | Ano |
| Completed | Cancelled | Ano |
| On-hold | Cancelled | Ano |
| Processing | Refunded | Ano |
| Completed | Refunded | Ano |
| On-hold | Refunded | Ano |
| Processing | Failed | Ano |
| On-hold | Failed | Ano |

## Jak to funguje

1. Objednávka změní stav na zrušená/vrácená/nezaplacená
2. Modul zkontroluje každý produkt v objednávce
3. U produktů se zapnutou správou skladu obnoví množství
4. Přidá poznámku k objednávce: "Stock restored: Název produktu (5 -> 8)"
5. Nastaví meta `_polski_stock_restored`, aby zabránil dvojímu obnovení

## Požadavky

- Možnost WooCommerce **Spravovat skladové zásoby** musí být zapnutá
- Produkty musí mít zapnutou správu skladu

## Hook

| Hook | Typ | Popis |
|------|-----|------|
| `polski/stock/restored` | action | Po obnovení skladu pro produkt |
