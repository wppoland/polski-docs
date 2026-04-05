---
title: Zobrazovani DPH
description: Konfigurace zobrazovani cen s DPH a bez DPH, sazby DPH a osvobozeni podle cl. 113 zakona o DPH ve WooCommerce.
---

Polske pravo uklada internetovym prodejcum povinnost jednoznacne informovat o tom, zda prezentovana cena obsahuje dan z pridane hodnoty. Plugin Polski for WooCommerce umoznuje flexibilni spravu zpusobu zobrazovani informaci o DPH - od jednoducheho oznaceni "s DPH/bez DPH" po uplnou informaci o sazbe dane a duvodu osvobozeni.

## Pravni pozadavky

Podle zakona o informovani o cenach zbozi a sluzeb a zakona o DPH musi internetovy obchod:

- zretelne informovat, zda cena obsahuje DPH
- uvadel sazbu DPH, pokud prodava jak individualnm zakaznikum, tak firmam
- v pripade osvobozeni od DPH - ukazat na pravni zaklad osvobozeni

Prodejci vyuzivajici subjektove osvobozeni (cl. 113 zakona o DPH) musi informovat zakaznika, ze cena neobsahuje DPH z duvodu osvobozeni.

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Ceny** a nakonfigurujte sekci "Zobrazovani DPH".

### Rezimy zobrazeni

| Rezim | Popis | Priklad |
|------|------|---------|
| S DPH (brutto) | Cena obsahuje dan | 123,00 PLN s DPH |
| Bez DPH (netto) | Cena bez dane | 100,00 PLN bez DPH |
| Oba | Obe ceny soucasne | 100,00 PLN bez DPH (123,00 PLN s DPH) |

### Podrobna nastaveni

- **Zobrazit sazbu DPH** - zobrazuje procentualni sazbu dane vedle ceny (napr. "vcetne 23 % DPH")
- **Zobrazit informaci o DPH na listingu** - ovlada viditelnost na strankach kategorii a vysledcich vyhledavani
- **Zobrazit informaci o DPH v kosiku** - ovlada viditelnost v kosiku a souhrnu objednavky
- **Vlastni text** - umoznuje prepsat vychozi text informace o DPH

## Osvobozeni od DPH (cl. 113)

Prodejci osvobozeni od DPH na zaklade cl. 113 odst. 1 nebo odst. 9 zakona o dani ze zbozi a sluzeb mohou nakonfigurovat prislusnou zpravu.

### Konfigurace osvobozeni

1. Prejdete do **WooCommerce > Nastaveni > Polski > Ceny**
2. Zaznacte moznost **Osvobozeni od DPH (cl. 113)**
3. Vyberte zaklad osvobozeni:
   - **Cl. 113 odst. 1** - osvobozeni pro prodej do 200 000 PLN rocne
   - **Cl. 113 odst. 9** - osvobozeni pro danovych poplatniku zahajujicich cinnost v prubehu roku
4. Volitelne prizpusobte obsah zpravy

Vychozi zprava: "Cena nie zawiera podatku VAT - sprzedawca korzysta ze zwolnienia na podstawie art. 113 ust. 1 ustawy o VAT."

### Deaktivace DPH ve WooCommerce

Pri osvobozeni od DPH nastavte ve WooCommerce:

1. **WooCommerce > Nastaveni > Dane** - deaktivujte vypocet dani NEBO nastavte sazbu 0 %
2. Plugin automaticky prida prislusnou poznamku k cenam

## Shortcode

Pouzijte shortcode `[polski_tax_notice]` pro zobrazeni informace o DPH na libovolnem miste.

### Parametry

| Parametr | Typ | Vychozi | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktualni | ID produktu |
| `type` | string | `auto` | Typ informace: `auto`, `gross`, `net`, `exempt` |
| `show_rate` | bool | `true` | Zda zobrazit procentualni sazbu |
| `wrapper` | string | `span` | Obalujici HTML element |

### Priklady pouziti

Automaticka detekce na strance produktu:

```html
[polski_tax_notice]
```

Vynuceni informace o osvobozeni:

```html
[polski_tax_notice type="exempt"]
```

Bez procentualni sazby:

```html
[polski_tax_notice show_rate="false"]
```

V sablone PHP:

```php
echo do_shortcode('[polski_tax_notice product_id="' . $product->get_id() . '"]');
```

## Konfigurace pro obchody B2B a B2C

Obchody obsluhujici jak individualni zakazniky (B2C), tak firemni (B2B) mohou nakonfigurovat ruzne zobrazeni cen v zavislosti na roli uzivatele.

### Ceny bez DPH pro firmy

Plugin spolupraucje se systemem roli WooCommerce. Pro zobrazeni cen bez DPH pro firemni zakazniky:

1. Vytvorte vyhrazenou roli (napr. "firemni_zakaznik") nebo pouzijte existujici
2. V nastaveni pluginu priradte zobrazeni bez DPH ke zvolene roli
3. Firemni zakaznici uvidi ceny bez DPH, individualni - s DPH

### Dvojite ceny na strance produktu

Aktivace rezimu "Oba" zobrazuje cenu bez DPH i s DPH soucasne. Format prezentace:

```
100,00 PLN bez DPH
123,00 PLN s DPH (vcetne 23 % DPH)
```

Poradi a format lze prizpusobit v nastaveních.

## Sazby DPH pro ruzne kategorie produktu

V Polsku plati ctyri sazby DPH:

| Sazba | Pouziti |
|--------|-------------|
| 23 % | Zakladni sazba - vetsina zbozi a sluzeb |
| 8 % | Snizena sazba - bytova vystavba, gastronomicke sluzby |
| 5 % | Snizena sazba - potraviny, knihy, casopisy |
| 0 % | Nulova sazba - export, dodani uvnitr Spolecenstvi |

Plugin automaticky rozpozna sazbu prirazenou k produktu ve WooCommerce a zobrazi prislusnou informaci.

## Informace o DPH v e-mailech

Plugin pridava informaci o DPH take do transakcnich e-mailu WooCommerce:

- potvrzeni objednavky
- faktura
- zmena stavu objednavky

Obsah zpravy je v souladu s nastavenimi obchodu.

## Stylovani CSS

Informace o DPH je obalena do elementu s vyhrazenymi tridami CSS:

```css
.polski-tax-notice {
    font-size: 0.85em;
    color: #666;
}

.polski-tax-notice--exempt {
    color: #c00;
    font-weight: 600;
}

.polski-tax-notice__rate {
    white-space: nowrap;
}
```

## Nejcastejsi problemy

### Informace o DPH se zobrazuje dvakrat

Zkontrolujte, zda motiv nepridava vlastni informaci o DPH. Nektere motivy urcene pro polsky trh maji vestavenu obsluhu DPH - v takovem pripade deaktivujte jednu z implementaci.

### Sazba DPH se zobrazuje nespravne

Ujistete se, ze danove tridy v **WooCommerce > Nastaveni > Dane > Standardni sazby** jsou spravne nakonfigurovany. Plugin nacita sazbu primo z konfigurace WooCommerce.

## Souvisejici zdroje

- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
