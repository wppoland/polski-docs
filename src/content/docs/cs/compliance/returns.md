---
title: Vraceni a reklamace (RMA)
description: Obsluha vraceni a reklamaci v Polski for WooCommerce - formular zakaznika v Muj ucet, podminky zpusobilosti, potvrzovaci e-maily, fronta hlaseni a nastaveni modulu.
---

Modul "Vraceni a reklamace (RMA)" umoznuje zakaznikum podat reklamaci nebo zadost o vraceni primo z panelu Muj ucet. Hlaseni se ukladaji, zakaznik i obchod dostavaji potvrzeni e-mailem a obchod zpracovava hlaseni ve specialni fronte. Modul zrcadli stavajici proces zadosti o odstoupeni od smlouvy. Poskytuje nastroje a sablony, nikoli pravni poradenstvi.

Modul je zdarma, volitelny a ve vychozim nastaveni **vypnuty**.

## Co modul dela

- Pridava akci "Reklamace / vraceni" u zpusobilych objednavek v panelu Muj ucet.
- Zobrazuje zakaznikovi formular s typem hlaseni a duvodem.
- Uklada hlaseni a posila potvrzeni zakaznikovi i obchodu.
- Zobrazuje existujici hlaseni a jejich stav na strance s detaily objednavky.
- Da k dispozici administrativni frontu se zmenou stavu hlaseni.

## Aktivace modulu

Modul aktivujte v **WooCommerce > Polski > Moduly**, ve skupine "Prava spotrebitele", prepinacem "Vraceni a reklamace (RMA)".

Po aktivaci se akce "Reklamace / vraceni" zacne zobrazovat u zpusobilych objednavek.

## Proces zakaznika

### Krok 1 - akce v Muj ucet

Prihlaseny zakaznik otevre **Muj ucet > Objednavky**. U zpusobile objednavky se zobrazi akce "Reklamace / vraceni", ktera otevre formular.

### Krok 2 - formular hlaseni

Formular obsahuje pole:

- **Typ** - Reklamace nebo Vraceni
- **Duvod** - textove pole s popisem reklamace nebo duvodu vraceni

### Krok 3 - odeslani a potvrzeni

Po odeslani formulare system:

1. Ulozi hlaseni.
2. Odesle zakaznikovi e-mail s potvrzenim prijeti hlaseni.
3. Odesle obchodu oznameni o novem hlaseni.

Existujici hlaseni a jejich aktualni stav se zobrazuji na strance s detaily objednavky.

## Podminky zpusobilosti

Akce "Reklamace / vraceni" se zobrazi pouze tehdy, kdyz:

- Objednavka patri prihlasenemu zakaznikovi.
- Objednavka spada do nastavitelneho okna zpusobilosti, tedy do poctu dnu od data objednavky (vychozi hodnota 365 dnu).

## Potvrzovaci e-maily

Po odeslani hlaseni system odesle dva e-maily:

- Zakaznikovi - potvrzeni prijeti reklamace nebo zadosti o vraceni.
- Obchodu - oznameni o novem hlaseni na adresu uvedenou v nastaveni.

## Administrativa hlaseni

Hlaseni najdete v **WooCommerce > Polski > Vraceni a reklamace**. Fronta uvadi vsechna hlaseni a obchod u kazdeho meni stav:

- **Odeslano** - nove hlaseni cekajici na zpracovani
- **Zpracovava se** - hlaseni je v prubehu reseni
- **Vyrizeno** - hlaseni bylo dokonceno
- **Zamitnuto** - hlaseni bylo zamitnuto

## Nastaveni

Modul ma dve nastaveni:

- **Okno zpusobilosti** - pocet dnu od data objednavky, behem kterych lze hlaseni podat (vychozi 365 dnu).
- **Notifikacni e-mail** - adresa administratora, na kterou chodi oznameni o novych hlasenich.

## Dalsi kroky

- Hlaseni problemu: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a otazky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
