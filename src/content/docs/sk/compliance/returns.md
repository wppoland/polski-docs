---
title: Vrátenia a reklamácie (RMA)
description: Obsluha vrátení a reklamácií v Polski for WooCommerce - formulár v Môj účet, posúdenie nároku, automatické e-maily, fronta hlásení a nastavenia.
---

Modul "Vrátenia a reklamácie (RMA)" poskytuje jednotný proces, v ktorom zákazník nahlási reklamáciu alebo vrátenie priamo zo svojho účtu. Plugin obsluhuje celý tok - formulár zákazníka, e-mailové potvrdenia, frontu hlásení a zmeny stavov. Modul je súčasťou bezplatnej verzie, je voliteľný a štandardne vypnutý. Poskytuje nástroje a šablóny, nie právne poradenstvo.

## Aktivácia modulu

Modul zapnete v **WooCommerce > Polski > Moduly**, v skupine "Práva spotrebiteľa", prepínačom "Vrátenia a reklamácie (RMA)".

Po aktivácii sa proces sprístupní zákazníkom na stránke Môj účet a administrátorovi pribudne fronta hlásení.

## Proces zákazníka

### Krok 1 - akcia v Môj účet

Prihlásený zákazník otvorí hlásenie na stránke **Môj účet > Objednávky**. Pri objednávke, ktorá sa kvalifikuje, sa zobrazuje akcia "Reklamácia / vrátenie", ktorá otvorí formulár.

### Krok 2 - formulár

Formulár obsahuje polia:

- Typ - "Reklamácia" alebo "Vrátenie"
- Dôvod - textové pole s opisom

### Krok 3 - odoslanie a potvrdenie

Po odoslaní formulára systém:

1. Uloží hlásenie
2. Zašle zákazníkovi potvrdzujúci e-mail
3. Zašle obchodu oznámenie o novom hlásení

Existujúce hlásenia a ich stav sa zobrazujú na stránke s detailmi objednávky, takže zákazník môže sledovať priebeh.

## Posúdenie nároku

Akcia "Reklamácia / vrátenie" sa zobrazí len vtedy, keď:

- objednávka patrí prihlásenému zákazníkovi
- objednávka je v rámci konfigurovateľnej lehoty na hlásenie (počet dní od dátumu objednávky, štandardne 365)

Lehotu môžete upraviť v nastaveniach modulu.

## E-mailové potvrdenia

Pri odoslaní hlásenia sa odosielajú dva e-maily:

- **Zákazníkovi** - potvrdenie prijatia reklamácie alebo vrátenia
- **Obchodu** - oznámenie o novom hlásení na adresu uvedenú v nastaveniach

## Fronta hlásení

Všetky hlásenia nájdete v **WooCommerce > Polski > Vrátenia a reklamácie**. V tomto zozname obchod spravuje hlásenia a mení ich stav:

- Odoslané
- V spracovaní
- Vyriešené
- Zamietnuté

## Nastavenia

Modul má dve nastavenia:

- **Lehota na hlásenie** - počet dní od dátumu objednávky, počas ktorých sa objednávka kvalifikuje (štandardne 365)
- **E-mail na oznámenia** - adresa administrátora, na ktorú prichádzajú oznámenia o nových hláseniach

## Vzťah k odstúpeniu od zmluvy

Modul zrkadlí existujúci tok hlásení o odstúpení od zmluvy. Ak používate oba moduly, zákazník má k dispozícii samostatné akcie pre odstúpenie a pre reklamáciu či vrátenie.

## Ďalšie kroky

- Nahlasovanie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
