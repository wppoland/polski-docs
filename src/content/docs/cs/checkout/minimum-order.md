---
title: Minimální hodnota a počet kusů objednávky
description: Modul vynucení minimální hodnoty košíku a minimálního počtu produktů v objednávce WooCommerce.
---

Modul minimální objednávky blokuje přechod do pokladny, pokud košík nesplňuje požadované prahy - minimální hodnotu nebo minimální počet produktů.

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Moduly** a zapněte modul **Minimální objednávka**.

Poté nakonfigurujte prahy v **WooCommerce > Nastavení > Polski > Checkout**:

| Nastavení | Popis | Výchozí |
|------------|------|-----------|
| Minimální hodnota objednávky | Částka v PLN (0 = vypnuto) | 0 |
| Minimální počet produktů | Počet kusů (0 = vypnuto) | 0 |
| Vyloučit produkty v akci | Nepočítat produkty v akci do minimální hodnoty | Ne |
| Zpráva o hodnotě | Text chyby s tokeny `{min_value}` a `{current_value}` | Minimální hodnota objednávky je {min_value}. Aktuální hodnota košíku: {current_value}. |
| Zpráva o počtu | Text chyby s tokeny `{min_quantity}` a `{current_quantity}` | Minimální počet produktů v objednávce je {min_quantity}. Aktuální počet: {current_quantity}. |

## Jak to funguje

Modul validuje košík na dvou místech:

1. **Stránka košíku** (`woocommerce_check_cart_items`) - zobrazí chybovou zprávu
2. **Stránka checkout** (`woocommerce_checkout_process`) - blokuje vytvoření objednávky

Pokud košík nesplňuje požadavek, zákazník vidí červenou chybovou zprávu a nemůže přejít k platbě.

### Příklady zpráv

**Minimální hodnota:**
> Minimální hodnota objednávky je 50,00 PLN. Aktuální hodnota košíku: 29,99 PLN.

**Minimální počet:**
> Minimální počet produktů v objednávce je 3. Aktuální počet: 1.

## Vyloučení akčních produktů

Možnost "Vyloučit produkty v akci" umožňuje nepočítat hodnotu produktů se slevou do minimální hodnoty košíku. Užitečné, když chcete, aby se minimum týkalo jen produktů v plné ceně.

## Použití

| Scénář | Konfigurace |
|------------|-------------|
| Velkoobchod (B2B) | Min. hodnota 200 PLN, min. počet 5 |
| Doprava zdarma od částky | Min. hodnota 100 PLN (alternativa k prahu dopravy zdarma) |
| Zabránění mikroobjednávkám | Min. hodnota 20 PLN |
| Produkty v balíčcích | Min. počet 3 |

## Kompatibilita

Modul funguje s:
- WooCommerce Checkout Blocks
- Klasickou pokladnou (shortcode)
- Všemi platebními metodami
- Multi-step checkout (Polski PRO)
