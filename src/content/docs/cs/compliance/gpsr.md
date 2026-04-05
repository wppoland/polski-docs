---
title: GPSR - bezpecnost produktu
description: Konfigurace poli GPSR (General Product Safety Regulation) v Polski for WooCommerce - vyrobce, dovozce, odpovedna osoba v EU, identifikatory, varovani a pokyny.
---

Narizeni GPSR (General Product Safety Regulation, EU 2023/988) plati od 13. prosince 2024. Vyzaduje uvadeni informaci o bezpecnosti produktu prodavanych v EU. Polski for WooCommerce pridava produktova pole, sloupec stavu a import/export CSV - vse, co potrebujete, bez dalsich pluginu.

## Pozadavky GPSR

Kazdy nepotravinovy produkt prodavany v EU musi obsahovat:

1. **Udaje vyrobce** - nazev, adresa, kontaktni udaje
2. **Udaje dovozce** - pokud ma vyrobce sidlo mimo EU
3. **Odpovedna osoba v EU** - vyzadovana pro produkty mimo EU
4. **Identifikatory produktu** - cislo serie, seriove cislo, kod EAN/GTIN
5. **Varovani** - informace o rizicich a vekovych omezenich
6. **Bezpecnostni pokyny** - zasady bezpecneho pouzivani
7. **Fotografie/dokumenty** - volitelne prilohy (bezpecnostni listy, certifikaty)
8. **Kategorie rizika** - klasifikace urovne rizika produktu

## Konfigurace poli GPSR

Pole GPSR najdete v editaci produktu, v zalozce **Polski - GPSR**. Kazde pole je volitelne, ale vyplnte vsechna, ktera se tykaji daneho produktu.

![Pole GPSR v editoru produktu WooCommerce](../../../../assets/screenshots/screenshot-2-gpsr-product-editor.png)

### Vyrobce

Vyplnte uplne udaje o vyrobci:

- Nazev firmy
- Adresa (ulice, PSC, mesto, zeme)
- E-mailova adresa
- Telefonni cislo
- Webova stranka

### Dovozce

Vyzadovane, pokud ma vyrobce sidlo mimo EU. Uvedte stejne udaje jako u vyrobce.

### Odpovedna osoba v EU

Kazdy nepotravinovy produkt od subjektu mimo EU musi mit odpovednou osobu se sidlem v Unii. Uvedte:

- Nazev firmy nebo jmeno a prijmeni
- Adresa v EU
- Kontaktni udaje (e-mail, telefon)

### Identifikatory produktu

- **Cislo serie (LOT)** - identifikator vyrobni serie
- **Seriove cislo** - unikatni identifikator kusu
- **EAN/GTIN** - carovy kod produktu
- **Cislo modelu** - oznaceni modelu

### Varovani a omezeni

Textove pole na informace o:

- Rizicich spojenych s pouzivanim
- Vekovych omezenich (napr. "Nevhodne pro deti do 3 let")
- Pozadavcich na dohled dospele osoby
- Nebezpecnych latkach

### Bezpecnostni pokyny

Pole na pokyny tykajici se:

- Spravne montaze a instalace
- Bezpecneho pouzivani
- Udrzby a skladovani
- Postupu v pripade nehody

## Sloupec stavu GPSR

Na seznamu produktu (**Produkty > Vsechny produkty**) plugin pridava sloupec **GPSR** se stavem vyplneni:

- Zelena ikona - vsechna vyzadovana pole vyplnena
- Oranzova ikona - castecne vyplneno
- Cervena ikona - chybi udaje GPSR

Sloupec umoznuje rychle najit produkty, ktere vyzaduji doplneni udaju.

## Import a export CSV

### Export

Pri exportu produktu (**Produkty > Exportovat**) plugin pridava sloupce GPSR do souboru CSV:

- `gpsr_manufacturer_name`
- `gpsr_manufacturer_address`
- `gpsr_manufacturer_email`
- `gpsr_manufacturer_phone`
- `gpsr_manufacturer_url`
- `gpsr_importer_name`
- `gpsr_importer_address`
- `gpsr_importer_email`
- `gpsr_eu_responsible_name`
- `gpsr_eu_responsible_address`
- `gpsr_eu_responsible_email`
- `gpsr_identifiers_lot`
- `gpsr_identifiers_serial`
- `gpsr_identifiers_ean`
- `gpsr_identifiers_model`
- `gpsr_warnings`
- `gpsr_instructions`

### Import

Pripravte soubor CSV se stejnymi zahlavi jako pri exportu. Importujte pres **Produkty > Importovat**.

Tip: nejprve exportujte nekolik produktu - ziskate sablonu CSV se spravnymi zahlavi.

## Shortcode

Pouzijte shortcode `[polski_gpsr]` pro zobrazeni informaci GPSR na strance produktu nebo na libovolnem miste webu.

### Zakladni pouziti

```
[polski_gpsr]
```

Zobrazi data GPSR aktualniho produktu (funguje na strance produktu WooCommerce).

### S urcenim produktu

```
[polski_gpsr product_id="123"]
```

Zobrazi data GPSR pro produkt s zadanym ID.

### Priklad vystupu

Shortcode generuje formatovanou tabulku se sekcemi:

| Sekce | Obsah |
|--------|-----------|
| Vyrobce | Nazev, adresa, e-mail, telefon, web |
| Dovozce | Nazev, adresa, e-mail (pokud se tyka) |
| Odpovedna osoba v EU | Nazev, adresa, kontaktni udaje |
| Identifikatory | LOT, seriove cislo, EAN, model |
| Varovani | Text varovani |
| Pokyny | Text bezpecnostnich pokynu |

## Hromadne doplnovani dat

Pokud ma mnoho produktu stejneho vyrobce, nejrychlejsi metoda je:

1. Exportujte produkty do CSV
2. Vyplnte sloupce vyrobce pro vsechny radky (kopirovat-vlozit v tabulkovem kalkulatoru)
3. Importujte aktualizovany soubor CSV

## Reseni problemu

**Pole GPSR se nezobrazuji v editaci produktu**
Ujistete se, ze modul GPSR je aktivovan v nastaveni pluginu: **WooCommerce > Nastaveni > Polski > Moduly**.

**Sloupec stavu se nezobrazuje na seznamu produktu**
Kliknete na tlacitko "Moznosti obrazovky" v pravem hornim rohu stranky se seznamem produktu a zaznacte sloupec GPSR.

**Data se neimportuji z CSV**
Zkontrolujte, zda zahlavi sloupcu v souboru CSV presne odpovidaji formatu exportu. Nazvy sloupcu jsou citlive na velikost pismen.

## Dalsi kroky

- Hlaseni problemu: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a otazky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
