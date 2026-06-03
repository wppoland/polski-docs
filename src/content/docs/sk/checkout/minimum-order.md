---
title: Minimálna hodnota a počet kusov objednávky
description: Modul vynucovania minimálnej hodnoty košíka a minimálneho počtu produktov v objednávke WooCommerce.
---

Modul minimálnej objednávky blokuje prechod do pokladne, ak košík nespĺňa požadované prahy - minimálnu hodnotu alebo minimálny počet produktov.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Moduly** a zapnite modul **Minimálna objednávka**.

Následne nakonfigurujte prahy v **WooCommerce > Nastavenia > Polski > Checkout**:

| Nastavenie | Popis | Predvolene |
|------------|------|-----------|
| Minimálna hodnota objednávky | Suma v PLN (0 = vypnuté) | 0 |
| Minimálny počet produktov | Počet kusov (0 = vypnuté) | 0 |
| Vylúčiť produkty v akcii | Nezapočítavať produkty v akcii do minimálnej hodnoty | Nie |
| Oznam o hodnote | Chybový text s tokenmi `{min_value}` a `{current_value}` | Minimálna hodnota objednávky je {min_value}. Aktuálna hodnota košíka: {current_value}. |
| Oznam o počte | Chybový text s tokenmi `{min_quantity}` a `{current_quantity}` | Minimálny počet produktov v objednávke je {min_quantity}. Aktuálny počet: {current_quantity}. |

## Ako to funguje

Modul validuje košík na dvoch miestach:

1. **Stránka košíka** (`woocommerce_check_cart_items`) - zobrazuje chybový oznam
2. **Stránka pokladne** (`woocommerce_checkout_process`) - blokuje vytvorenie objednávky

Ak košík nespĺňa požiadavku, zákazník vidí červený chybový oznam a nemôže prejsť k platbe.

### Príklady oznamov

**Minimálna hodnota:**
> Minimálna hodnota objednávky je 50,00 PLN. Aktuálna hodnota košíka: 29,99 PLN.

**Minimálny počet:**
> Minimálny počet produktov v objednávke je 3. Aktuálny počet: 1.

## Vylúčenie akciových produktov

Možnosť "Vylúčiť produkty v akcii" umožňuje nezapočítavať hodnotu zľavnených produktov do minimálnej hodnoty košíka. Užitočné, keď chcete, aby sa minimum vzťahovalo len na produkty v plnej cene.

## Použitia

| Scenár | Konfigurácia |
|------------|-------------|
| Veľkoobchod (B2B) | Min. hodnota 200 PLN, min. počet 5 |
| Doprava zadarmo od sumy | Min. hodnota 100 PLN (alternatíva k prahu dopravy zadarmo) |
| Predchádzanie mikroobjednávkam | Min. hodnota 20 PLN |
| Produkty v baleniach | Min. počet 3 |

## Kompatibilita

Modul funguje s:
- WooCommerce Checkout Blocks
- Klasickou pokladňou (shortcode)
- Všetkými platobnými metódami
- Multi-step checkout (Polski PRO)
