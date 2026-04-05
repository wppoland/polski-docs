---
title: Polski for WooCommerce
description: Komplexny WordPress plugin na prispôsobenie obchodu WooCommerce poľským právnym predpisom a trhovým požiadavkám. Súlad s Omnibus, GPSR, DSA, GDPR a ďalšími reguláciami.
template: splash
hero:
  tagline: Kompletné riešenie na prevádzkovanie legálneho internetového obchodu v Poľsku. Súlad s právom, lokálne funkcie, poľské štandardy e-commerce - všetko v jednom plugine.
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

## Čo je Polski for WooCommerce?

**Polski for WooCommerce** je bezplatný open source plugin (GPLv2) vytvorený spoločnosťou [wppoland.com](https://wppoland.com), ktorý prispôsobuje obchod WooCommerce poľským právnym požiadavkám a štandardom e-commerce. Plugin spája viac ako 30 modulov zahŕňajúcich právny súlad, zobrazovanie cien, pokladňu, potravinárske produkty, obchodné moduly a nástroje pre vývojárov.

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

Plugin je postavený modulárne - aktivujete len tie funkcie, ktoré potrebujete. Nižšie nájdete popis všetkých dostupných skupín modulov.

### Právny súlad

Moduly zabezpečujúce súlad obchodu s poľským a európskym právom:

- **GPSR (nariadenie o bezpečnosti produktov)** - údaje výrobcu, dovozcu a zodpovednej osoby na kartách produktov
- **Omnibus** - zobrazenie najnižšej ceny za 30 dní pred zľavou, v súlade so smernicou Omnibus
- **Právo na odstúpenie** - formuláre a postupy vrátenia, generovanie dokumentov o odstúpení
- **GDPR** - správa súhlasov, anonymizácia údajov, register spracovania
- **DSA (Akt o digitálnych službách)** - kontaktný bod, nahlasovanie obsahu, transparentnosť
- **KSeF** - príprava na integráciu s Národným systémom e-faktúr
- **Greenwashing** - overovanie a kontrola environmentálnych vyhlásení
- **Právne stránky** - generovanie obchodných podmienok, zásad ochrany osobných údajov a zásad vrátenia

### Ceny a informácie o produkte

Moduly súvisiace so zobrazovaním cien a údajov o produktoch:

- **Jednotkové ceny** - automatický prepočet a zobrazenie cien za mernú jednotku (PLN/kg, PLN/l)
- **Zobrazenie DPH** - informácia o sadzbe DPH a cene bez/s DPH
- **Dodacia lehota** - odhadovaný čas realizácie objednávky na karte produktu
- **Údaje výrobcu** - pole výrobcu, značka, katalógové číslo

### Pokladňa a objednávky

Moduly upravujúce stránku pokladne a proces objednávania:

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

Funkcie zlepšujúce nákupný zážitok:

- **Zoznam prianí** - ukladanie produktov na neskôr
- **Porovnávač** - porovnávanie produktov vedľa seba
- **Rýchly náhľad** - náhľad produktu bez opustenia stránky kategórie
- **AJAX vyhľadávanie** - vyhľadávanie produktov v reálnom čase
- **AJAX filtre** - dynamické filtrovanie produktov bez opätovného načítania stránky
- **Slider produktov** - karusely produktov s konfigurovateľnými nastaveniami
- **Odznaky produktov** - štítky typu "Novinka", "Bestseller", "Posledné kusy"
- **Ostatné moduly** - ďalšie obchodné funkcie

### Nástroje

Moduly uľahčujúce správu obchodu:

- **Dashboard súladu** - prehľad stavu právneho súladu obchodu na jednom mieste
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

Tri kroky k funkčnému obchodu v súlade s právom:

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
- **Súlad s právom** - aktualizácie v súlade s aktuálnymi predpismi
- **Open source** - zdrojový kód na GitHube, licencia GPLv2
- **Bez predplatného** - všetky funkcie dostupné bezplatne
- **Výkon** - minimálne zdroje načítané len pre aktívne moduly
- **Aktívna komunita** - podpora na GitHub Discussions

---

## Kompatibilita

Plugin je testovaný s najpopulárnejšími témami a pluginmi WordPress:

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
