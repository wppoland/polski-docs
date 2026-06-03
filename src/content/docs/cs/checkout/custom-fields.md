---
title: Vlastní pole v pokladně
description: Přidávání, úprava a reorganizace polí objednávkového formuláře s validací a zobrazením v administraci a e-mailech.
---

Modul Custom Checkout Fields umožňuje přidávat vlastní pole do objednávkového formuláře WooCommerce.

## Zapnutí

Přejděte do **WooCommerce > Polski > Moduly** a zapněte modul **Custom Checkout Fields** v sekci "Checkout".

## Správa polí

Po zapnutí modulu přejděte do **WooCommerce > Checkout Fields** pro přidávání a úpravu polí.

## Dostupné typy polí

| Typ | Popis |
|-----|------|
| Text | Textové pole |
| Textarea | Víceřádkové textové pole |
| Select | Rozbalovací seznam |
| Checkbox | Zaškrtávací pole |
| Radio | Přepínače radio |
| Number | Číselné pole |
| Email | Pole e-mail s validací formátu |
| Date | Pole data |
| Phone | Pole telefonu |

## Konfigurace pole

| Možnost | Popis |
|-------|------|
| Zapnuto | Zda je pole aktivní |
| Název (meta key) | Klíč meta, pod kterým se ukládá hodnota |
| Štítek | Text štítku zobrazený nad polem |
| Typ | Typ pole (z výše uvedeného seznamu) |
| Sekce | Billing, Shipping nebo Order notes |
| Povinné | Zda je pole povinné |
| Priorita | Pořadí zobrazení (nižší = dříve) |
| Placeholder | Text nápovědy v poli |
| Možnosti | Pro select/radio: jedna možnost na řádek (hodnota\|štítek) |
| CSS třída | CSS třídy (např. form-row-wide, form-row-first) |
| Zobrazit v e-mailech | Hodnota pole v e-mailech objednávky |
| Zobrazit v administraci | Hodnota pole v administraci objednávky |
| Zobrazit v Můj účet | Hodnota pole na stránce objednávky zákazníka |
| Podmíněné podle dopravy | Zobrazit pole jen pro určitou metodu dopravy |

## Možnosti pro Select/Radio

Zadejte možnosti po jedné na řádek ve formátu:
```
hodnota|Štítek
```

Příklad:
```
firma|Firma
osoba|Soukromá osoba
```

## Zobrazení hodnot

Hodnoty vlastních polí se automaticky zobrazují:
- V administraci objednávky (pod fakturační/dodací adresou)
- V e-mailech objednávky
- Na stránce "Můj účet > Podrobnosti objednávky"

## Validace

- Povinná pole - validace při vytvoření objednávky
- Pole e-mail - validace formátu adresy
- Hodnota se ukládá jako sanitizovaný text v meta objednávky
