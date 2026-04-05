---
title: Polski for WooCommerce
description: Komplexny WordPress plugin na prispôsobenie obchodu WooCommerce poľským právnym predpisom a trhovým požiadavkám. Súlad s Omnibus, GPSR, DSA, GDPR a ďalšími reguláciami.
template: splash
hero:
  tagline: Kompletné riešenie podporujúce prevádzkovanie internetového obchodu v Poľsku. Právne nástroje, lokálne funkcie, poľské štandardy e-commerce - všetko v jednom plugine.
  actions:
    - text: Začnite s konfiguráciou
      link: /sk/getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/wppoland/polski
      icon: external
      variant: minimal
---

![Polski for WooCommerce - banner pluginu](../../../../assets/screenshots/banner-772x250.png)

## Čo je Polski for WooCommerce?

**Polski for WooCommerce** je bezplatný open source plugin (GPLv2) od [wppoland.com](https://wppoland.com). Prispôsobuje obchod WooCommerce poľským predpisom a štandardom e-commerce. Obsahuje viac ako 30 modulov: právne požiadavky, ceny, pokladňa, potraviny, obchodné funkcie a nástroje pre vývojárov.

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

Moduly na splnenie požiadaviek poľského a európskeho práva:

- **GPSR (nariadenie o bezpečnosti produktov)** - údaje výrobcu, dovozcu a zodpovednej osoby na kartách produktov
- **Omnibus** - najnižšia cena za 30 dní pred zľavou
- **Právo na odstúpenie** - formuláre vrátenia a dokumenty odstúpenia
- **GDPR** - súhlasy, anonymizácia údajov, register spracovania
- **DSA (Akt o digitálnych službách)** - kontaktný bod, nahlasovanie obsahu
- **KSeF** - príprava na Národný systém e-faktúr
- **Greenwashing** - kontrola environmentálnych vyhlásení
- **Právne stránky** - obchodné podmienky, zásady ochrany osobných údajov a zásady vrátenia

### Ceny a informácie o produkte

Moduly na zobrazovanie cien a údajov o produktoch:

- **Jednotkové ceny** - automatický prepočet a zobrazenie cien za mernú jednotku (PLN/kg, PLN/l)
- **Zobrazenie DPH** - informácia o sadzbe DPH a cene bez/s DPH
- **Dodacia lehota** - odhadovaný čas realizácie objednávky na karte produktu
- **Údaje výrobcu** - pole výrobcu, značka, katalógové číslo

### Pokladňa a objednávky

Moduly na stránku pokladne a proces objednávky:

- **Tlačidlo objednávky** - zmena textu tlačidla na "Objednávam s povinnosťou platby" (právna požiadavka)
- **Právne checkboxy** - konfigurovateľné súhlasy s obchodnými podmienkami, zásadami ochrany osobných údajov, newsletterom
- **Vyhľadávanie IČO** - automatické doplnenie firemných údajov na základe čísla NIP (API GUS)
- **Dvojité potvrdenie** - overenie e-mailovej adresy cez double opt-in

### Potravinárske produkty

Špecializované moduly pre obchody s potravinami:

- **Prehľad potravinárskych produktov** - špeciálne polia pre potravinárske produkty
- **Výživové hodnoty** - tabuľka výživových hodnôt v súlade s nariadením 1169/2011
- **Alergény** - zvýraznené alergény v popise produktu (14 hlavných alergénov)
- **Nutri-Score** - zobrazenie označenia Nutri-Score (A-E)

### Obchodné moduly

Funkcie uľahčujúce nakupovanie zákazníkom:

- **Zoznam prianí** - ukladanie produktov na neskôr
- **Porovnávač** - porovnávanie produktov vedľa seba
- **Rýchly náhľad** - náhľad produktu bez opustenia stránky kategórie
- **AJAX vyhľadávanie** - vyhľadávanie produktov v reálnom čase
- **AJAX filtre** - dynamické filtrovanie produktov bez opätovného načítania stránky
- **Slider produktov** - karusely produktov s konfigurovateľnými nastaveniami
- **Odznaky produktov** - štítky typu "Novinka", "Bestseller", "Posledné kusy"
- **Ostatné moduly** - ďalšie obchodné funkcie

### Nástroje

Moduly na správu obchodu:

- **Dashboard súladu** - prehľad stavu právnych požiadaviek obchodu na jednom mieste
- **Audit stránky** - automatická verifikácia konfigurácie obchodu
- **Bezpečnostné incidenty** - register a správa GDPR incidentov
- **Overené recenzie** - systém overených zákazníckych recenzií

### Pre vývojárov

Nástroje a API pre programátorov:

- **REST API** - endpointy na správu údajov pluginu
- **Hooky (akcie a filtre)** - viac ako 100 hookov na rozšírenie funkcionality
- **Shortcódy** - pripravené shortcódy na vkladanie prvkov do obsahu
- **Šablóny** - prepísanie šablón pluginu v téme
- **WP-CLI** - CLI príkazy na správu pluginu z terminálu
- **Import CSV** - hromadný import produktových údajov
- **Bloky Gutenberg** - špeciálne bloky editora
- **Schema.org** - automatické štrukturované údaje pre produkty

---

## Rýchly štart

Tri kroky k obchodu v súlade s predpismi:

1. **[Nainštalujte plugin](/sk/getting-started/installation/)** - z panelu WordPress alebo ručne zo súboru ZIP
2. **[Nakonfigurujte základy](/sk/getting-started/configuration/)** - aktivujte potrebné moduly v paneli nastavení
3. **[Prejdite sprievodcom](/sk/getting-started/wizard/)** - doplňte firemné údaje, vygenerujte právne stránky, nakonfigurujte checkboxy

:::note[Potrebujete pomoc?]
Ak narazíte na problém, nahláste ho na [GitHub Issues](https://github.com/wppoland/polski/issues). Máte otázku alebo návrh? Napíšte na [GitHub Discussions](https://github.com/wppoland/polski/discussions).
:::

---

## Prečo sa to oplatí?

- **Všetko v jednom** - namiesto 10 pluginov jedna ucelená platforma
- **Modulárna stavba** - aktivujete len to, čo potrebujete
- **Právne nástroje** - aktualizované pri zmenách predpisov
- **Open source** - zdrojový kód na GitHube, licencia GPLv2
- **Bez predplatného** - všetky funkcie dostupné bezplatne
- **Výkon** - zdroje načítané len pre aktívne moduly
- **Aktívna komunita** - podpora na GitHub Discussions

---

## Kompatibilita

Plugin je testovaný s populárnymi témami a pluginmi WordPress:

- Témy: Storefront, Astra, GeneratePress, Kadence, Flavor, flavor theme
- Page buildery: Gutenberg (bloky), Elementor, Beaver Builder
- Platobné pluginy: Przelewy24, PayU, BLIK, tpay
- Doručovacie pluginy: InPost, DPD, DHL, Poczta Polska, Orlen Paczka

---

## Podpora a komunita

- [GitHub Issues](https://github.com/wppoland/polski/issues) - nahlasovanie chýb a návrhov funkcií
- [GitHub Discussions](https://github.com/wppoland/polski/discussions) - otázky, diskusie, pomoc komunity
- [wppoland.com](https://wppoland.com) - stránka projektu a blog s návodmi

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
