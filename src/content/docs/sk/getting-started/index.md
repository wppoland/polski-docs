---
title: Polski for WooCommerce
description: Komplexný plugin pre WordPress na prispôsobenie obchodu WooCommerce poľským právnym predpisom a trhovým požiadavkám. Súlad s Omnibus, GPSR, DSA, RODO a ďalšími reguláciami.
template: splash
hero:
  tagline: Kompletné riešenie podporujúce prevádzku internetového obchodu v Poľsku. Právne požiadavky, lokálne funkcie, poľské štandardy e-commerce - všetko v jednom plugine.
  actions:
    - text: Začnite konfiguráciu
      link: /pl/getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/wppoland/polski
      icon: external
      variant: minimal
---

![Polski for WooCommerce - baner pluginu](../../../../assets/screenshots/banner-772x250.png)

## Čo je Polski for WooCommerce?

**Polski for WooCommerce** je bezplatný open source plugin (GPLv2) od [wppoland.com](https://wppoland.com). Prispôsobuje obchod WooCommerce poľským predpisom a štandardom e-commerce. Obsahuje viac ako 30 modulov: právne požiadavky, ceny, pokladňa, potraviny, funkcie obchodu a nástroje pre vývojárov.

Aktuálna verzia: **1.3.2**

### Systémové požiadavky

Pred inštaláciou sa uistite, že váš server spĺňa minimálne požiadavky:

| Požiadavka | Minimálna verzia |
|-----------|-----------------|
| WordPress | 6.4 alebo novší |
| WooCommerce | 8.0 alebo novší |
| PHP | 8.1 alebo novší |
| MySQL | 5.7 alebo novší / MariaDB 10.3+ |

:::tip[Odporúčanie]
Pre najlepší výkon odporúčame PHP 8.2+ a WooCommerce 9.x. Plugin je pravidelne testovaný s najnovšími verziami WordPress a WooCommerce.
:::

---

## Prehľad modulov

Plugin funguje modulárne - zapínate len to, čo potrebujete. Nižšie nájdete popis všetkých skupín modulov.

![Dashboard modulov Polski for WooCommerce](../../../../assets/screenshots/screenshot-1-modules-dashboard.png)

### Právne požiadavky

Moduly na splnenie požiadaviek poľského a únijného práva:

- **GPSR (bezpečnosť produktov)** - údaje výrobcu, dovozcu a zodpovednej osoby na kartách produktov
- **Omnibus** - najnižšia cena za 30 dní pred zľavou
- **Právo na odstúpenie** - formuláre vrátenia tovaru a dokumenty odstúpenia
- **RODO** - súhlasy, anonymizácia údajov, register spracúvania
- **DSA (Akt o digitálnych službách)** - kontaktné miesto, nahlasovanie obsahu
- **KSeF** - príprava na Národný systém e-faktúr
- **Greenwashing** - kontrola environmentálnych vyhlásení
- **Právne stránky** - obchodné podmienky, zásady ochrany osobných údajov a zásady vrátenia tovaru

### Ceny a informácie o produkte

Moduly na zobrazovanie cien a produktových údajov:

- **Jednotkové ceny** - automatický prepočet a zobrazovanie cien za mernú jednotku (zł/kg, zł/l)
- **Zobrazovanie VAT** - informácia o sadzbe VAT a cene netto/brutto
- **Čas dodania** - odhadovaný čas realizácie objednávky na karte produktu
- **Údaje výrobcu** - pole výrobcu, značka, katalógové číslo

### Pokladňa a objednávky

Moduly pre stránku pokladne a proces objednávky:

- **Tlačidlo objednávky** - zmena textu tlačidla na "Objednávam s povinnosťou platby" (právna požiadavka)
- **Právne checkboxy** - konfigurovateľné súhlasy s obchodnými podmienkami, zásadami ochrany osobných údajov, newsletterom
- **Vyhľadávanie NIP** - automatické dopĺňanie firemných údajov podľa čísla NIP (API GUS)
- **Dvojité potvrdenie** - overenie e-mailovej adresy (double opt-in)

### Potravinové produkty

Špecializované moduly pre obchody s potravinami:

- **Prehľad potravinových produktov** - dedikované polia pre potravinové produkty
- **Výživové hodnoty** - tabuľka výživových hodnôt v súlade s nariadením 1169/2011
- **Alergény** - zvýraznené alergény v popise produktu (14 hlavných alergénov)
- **Nutri-Score** - zobrazovanie označenia Nutri-Score (A-E)

### Moduly obchodu

Funkcie uľahčujúce nákupy zákazníkom:

- **Zoznam želaní** - ukladanie produktov na neskôr
- **Porovnávač** - porovnávanie produktov vedľa seba
- **Rýchly náhľad** - náhľad produktu bez opustenia stránky kategórie
- **AJAX vyhľadávač** - vyhľadávanie produktov v reálnom čase
- **AJAX filtre** - dynamické filtrovanie produktov bez znovunačítania stránky
- **Slider produktov** - karusely produktov s konfigurovateľnými nastaveniami
- **Odznaky produktov** - štítky typu "Novinka", "Bestseller", "Posledné kusy"
- **Ďalšie moduly** - dodatočné funkcie obchodu

### Nástroje

Moduly na správu obchodu:

- **Dashboard súladu** - prehľad stavu právnych požiadaviek obchodu na jednom mieste
- **Audit stránky** - automatické overenie konfigurácie obchodu
- **Bezpečnostné incidenty** - register a správa incidentov RODO
- **Overené recenzie** - systém overených recenzií zákazníkov

### Pre vývojárov

Nástroje a API pre programátorov:

- **REST API** - endpointy na správu dát pluginu
- **Hooky (akcie a filtre)** - viac ako 100 hookov na rozšírenie funkcionality
- **Shortcody** - hotové shortcody na vkladanie prvkov do obsahu
- **Šablóny** - prepisovanie šablón pluginu v šablóne
- **WP-CLI** - CLI príkazy na správu pluginu z terminálu
- **Import CSV** - hromadný import produktových dát
- **Bloky Gutenberg** - dedikované bloky editora
- **Schema.org** - automatické štruktúrované dáta pre produkty

---

## Rýchly štart

Tri kroky k obchodu v súlade s predpismi:

1. **[Nainštalujte plugin](getting-started/installation/)** - z úrovne panela WordPress alebo manuálne zo súboru ZIP
2. **[Nakonfigurujte základy](getting-started/configuration/)** - zapnite potrebné moduly v paneli nastavení
3. **[Prejdite sprievodcom](getting-started/wizard/)** - vyplňte údaje firmy, vygenerujte právne stránky, nakonfigurujte checkboxy

:::note[Potrebujete pomoc?]
Ak narazíte na problém, nahláste ho na [GitHub Issues](https://github.com/wppoland/polski/issues). Máte otázku alebo návrh? Napíšte na [GitHub Discussions](https://github.com/wppoland/polski/discussions).
:::

---

## Prečo sa to oplatí?

- **Všetko v jednom** - namiesto 10 pluginov jedna ucelená platforma
- **Modulárna stavba** - zapínate len to, čo potrebujete
- **Právne požiadavky** - aktualizované spolu so zmenami predpisov
- **Open source** - zdrojový kód na GitHube, licencia GPLv2
- **Bez predplatného** - všetky funkcie dostupné bezplatne
- **Výkon** - zdroje načítavané len pre aktívne moduly
- **Aktívna komunita** - podpora na GitHub Discussions

---

## Kompatibilita

Plugin je testovaný s populárnymi šablónami a pluginmi WordPress:

- Šablóny: Storefront, Astra, GeneratePress, Kadence, Flavor, flavor theme
- Page buildery: Gutenberg (bloky), Elementor, Beaver Builder
- Platobné pluginy: Przelewy24, PayU, BLIK, tpay
- Doručovacie pluginy: InPost, DPD, DHL, Poczta Polska, Orlen Paczka

---

## Podpora a komunita

- [GitHub Issues](https://github.com/wppoland/polski/issues) - nahlasovanie chýb a návrhov funkcií
- [GitHub Discussions](https://github.com/wppoland/polski/discussions) - otázky, diskusie, pomoc komunity
- [wppoland.com](https://wppoland.com) - stránka projektu a blog s návodmi

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právnu radu. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
