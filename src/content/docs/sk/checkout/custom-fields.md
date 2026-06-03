---
title: Vlastné polia v pokladni
description: Pridávanie, úprava a reorganizácia polí formulára objednávky s validáciou a zobrazením v admin paneli a e-mailoch.
---

Modul Custom Checkout Fields umožňuje pridávať vlastné polia do formulára objednávky WooCommerce.

## Zapnutie

Prejdite do **WooCommerce > Polski > Moduly** a zapnite modul **Custom Checkout Fields** v sekcii "Checkout".

## Správa polí

Po zapnutí modulu prejdite do **WooCommerce > Checkout Fields**, aby ste pridávali a upravovali polia.

## Dostupné typy polí

| Typ | Popis |
|-----|------|
| Text | Textové pole |
| Textarea | Viacriadkové textové pole |
| Select | Rozbaľovací zoznam |
| Checkbox | Zaškrtávacie pole |
| Radio | Prepínacie tlačidlá |
| Number | Číselné pole |
| Email | E-mailové pole s validáciou formátu |
| Date | Pole dátumu |
| Phone | Telefónne pole |

## Konfigurácia poľa

| Možnosť | Popis |
|-------|------|
| Zapnuté | Či je pole aktívne |
| Názov (meta key) | Meta kľúč, pod ktorým sa ukladá hodnota |
| Štítok | Text štítku zobrazený nad poľom |
| Typ | Typ poľa (z vyššie uvedeného zoznamu) |
| Sekcia | Billing, Shipping alebo Order notes |
| Povinné | Či je pole povinné |
| Priorita | Poradie zobrazenia (nižšia = skôr) |
| Placeholder | Text nápovedy v poli |
| Možnosti | Pre select/radio: jedna možnosť na riadok (hodnota\|štítok) |
| CSS trieda | CSS triedy (napr. form-row-wide, form-row-first) |
| Zobraziť v e-mailoch | Hodnota poľa v e-mailoch objednávky |
| Zobraziť v admine | Hodnota poľa v paneli objednávky |
| Zobraziť v Môj účet | Hodnota poľa na stránke objednávky zákazníka |
| Podmienená doprava | Zobraziť pole len pre určenú metódu dopravy |

## Možnosti pre Select/Radio

Zadajte možnosti, jednu na riadok, vo formáte:
```
hodnota|Štítok
```

Príklad:
```
firma|Firma
osoba|Súkromná osoba
```

## Zobrazenie hodnôt

Hodnoty vlastných polí sa zobrazujú automaticky:
- V admin paneli objednávky (pod fakturačnou/dodacou adresou)
- V e-mailoch objednávky
- Na stránke "Môj účet > Detaily objednávky"

## Validácia

- Povinné polia - validácia pri vytváraní objednávky
- E-mailové polia - validácia formátu adresy
- Hodnota sa ukladá ako sanitizovaný text v meta objednávky
