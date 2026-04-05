---
title: Polski for WooCommerce
description: Komplexni plugin pro WordPress k prizpusobeni obchodu WooCommerce polskym pravnim predpisum a pozadavkum trhu. Soulad s Omnibus, GPSR, DSA, GDPR a dalsimi regulacemi.
template: splash
hero:
  tagline: Kompletni reseni podporujici provozovani internetoveho obchodu v Polsku. Pravni nastroje, lokalni funkce, polske standardy e-commerce - vse v jednom pluginu.
  actions:
    - text: Zacnete s konfiguraci
      link: /cs/getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/wppoland/polski
      icon: external
      variant: minimal
---

![Polski for WooCommerce - banner pluginu](../../../../assets/screenshots/banner-772x250.png)

## Co je Polski for WooCommerce?

**Polski for WooCommerce** je bezplatny open source plugin (GPLv2) od [wppoland.com](https://wppoland.com). Prizpusobuje obchod WooCommerce polskym predpisum a standardum e-commerce. Obsahuje vice nez 30 modulu: pravni pozadavky, ceny, pokladna, potraviny, funkce obchodu a nastroje pro vyvojare.

Aktualni verze: **1.3.2**

### Systemove pozadavky

Pred instalaci se ujistete, ze vas server splnuje minimalni pozadavky:

| Pozadavek | Minimalni verze |
|-----------|-----------------|
| WordPress | 6.4 nebo novejsi |
| WooCommerce | 8.0 nebo novejsi |
| PHP | 8.1 nebo novejsi |
| MySQL | 5.7 nebo novejsi / MariaDB 10.3+ |

:::tip[Doporuceni]
Pro nejlepsi vykon doporucujeme PHP 8.2+ a WooCommerce 9.x. Plugin je pravidelne testovan s nejnovejsimi verzemi WordPress a WooCommerce.
:::

---

## Prehled modulu

Plugin funguje modularne - aktivujete pouze to, co potrebujete. Nize najdete popis vsech skupin modulu.

![Dashboard modulu Polski for WooCommerce](../../../../assets/screenshots/screenshot-1-modules-dashboard.png)

### Pravni pozadavky

Moduly pro splneni pozadavku polskeho a unijniho prava:

- **GPSR (bezpecnost produktu)** - udaje vyrobce, dovozce a odpovedne osoby na strankach produktu
- **Omnibus** - nejnizsi cena za 30 dni pred slevou
- **Pravo na odstoupeni** - formulare a dokumenty pro odstoupeni
- **GDPR** - souhlasy, anonymizace dat, registr zpracovani
- **DSA (akt o digitalnich sluzbach)** - kontaktni misto, hlaseni obsahu
- **KSeF** - priprava na Krajovy system e-faktur
- **Greenwashing** - kontrola environmentalnich prohlaseni
- **Pravni stranky** - obchodni podminky, zasady ochrany udaju a vraceni zbozi

### Ceny a informace o produktu

Moduly pro zobrazovani cen a udaju o produktech:

- **Jednotkove ceny** - automaticky prepocet a zobrazovani cen za jednotku miry (PLN/kg, PLN/l)
- **Zobrazovani DPH** - informace o sazbe DPH a cene bez/s DPH
- **Doba dodani** - odhadovana doba vyrizeni objednavky na strance produktu
- **Udaje o vyrobci** - pole vyrobce, znacka, katalogove cislo

### Pokladna a objednavky

Moduly pro stranku pokladny a proces objednavek:

- **Tlacitko objednavky** - zmena textu tlacitka na "Objednavka se zavazkem platby" (zakonny pozadavek)
- **Pravni checkboxy** - konfigurovatelne souhlasy s obchodnimi podminkami, ochranou udaju, newsletterem
- **Vyhledavani NIP** - automaticke doplneni firemnich udaju podle cisla NIP (API GUS)
- **Dvojite potvrzeni** - overeni e-mailove adresy (double opt-in)

### Potraviny

Specializovane moduly pro obchody s potravinami:

- **Prehled potravinovych produktu** - vyhrazena pole pro potravinarsky sortiment
- **Vyzivove hodnoty** - tabulka vyzivovych hodnot v souladu s narizenim 1169/2011
- **Alergeny** - zvyraznene alergeny v popisu produktu (14 hlavnich alergenu)
- **Nutri-Score** - zobrazovani oznaceni Nutri-Score (A-E)

### Moduly obchodu

Funkce usnadnujici nakupovani zakaznikum:

- **Wishlist** - ukladani produktu na pozdeji
- **Porovnavac** - porovnavani produktu vedle sebe
- **Rychly nahled** - nahled produktu bez opusteni stranky kategorie
- **AJAX vyhledavac** - vyhledavani produktu v realnem case
- **AJAX filtry** - dynamicke filtrovani produktu bez opetovneho nacitani stranky
- **Slider produktu** - karusely produktu s konfigurovatelnymi nastavenimi
- **Stitky produktu** - stitky typu "Novinka", "Bestseller", "Posledni kusy"
- **Dalsi moduly** - doplnkove funkce obchodu

### Nastroje

Moduly pro spravu obchodu:

- **Dashboard souladu** - prehled stavu pravnich pozadavku obchodu na jednom miste
- **Audit webu** - automaticka kontrola konfigurace obchodu
- **Bezpecnostni incidenty** - registr a sprava incidentu GDPR
- **Overene recenze** - system overenych zakaznickych recenzi

### Pro vyvojare

Nastroje a API pro programatory:

- **REST API** - endpointy pro spravu dat pluginu
- **Hooky (akce a filtry)** - vice nez 100 hooku pro rozsireni funkcnosti
- **Shortcody** - pripravene shortcody pro vkladani elementu do obsahu
- **Sablony** - prepis sablon pluginu v motivu
- **WP-CLI** - CLI prikazy pro spravu pluginu z terminalu
- **CSV import** - hromadny import produktovych dat
- **Gutenberg bloky** - vyhrazene bloky editoru
- **Schema.org** - automaticka strukturovana data pro produkty

---

## Rychly start

Tri kroky k obchodu v souladu s predpisy:

1. **[Nainstalujte plugin](/cs/getting-started/installation/)** - z panelu WordPress nebo rucne ze souboru ZIP
2. **[Nakonfigurujte zaklady](/cs/getting-started/configuration/)** - aktivujte potrebne moduly v panelu nastaveni
3. **[Projdete pruvodcem](/cs/getting-started/wizard/)** - doplnte udaje firmy, vygenerujte pravni stranky, nakonfigurujte checkboxy

:::note[Potrebujete pomoc?]
Pokud narazite na problem, nahlaste jej na [GitHub Issues](https://github.com/wppoland/polski/issues). Mate otazku nebo navrh? Napiste na [GitHub Discussions](https://github.com/wppoland/polski/discussions).
:::

---

## Proc se to vyplati?

- **Vse v jednom** - misto 10 pluginu jedna souvisla platforma
- **Modularni stavba** - aktivujete pouze to, co potrebujete
- **Pravni pozadavky** - aktualizovano spolu se zmenami predpisu
- **Open source** - zdrojovy kod na GitHubu, licence GPLv2
- **Bez predplatneho** - vsechny funkce dostupne zdarma
- **Vykon** - zdroje nacitane pouze pro aktivni moduly
- **Aktivni komunita** - podpora na GitHub Discussions

---

## Kompatibilita

Plugin je testovan s popularnymi motivy a pluginy WordPress:

- Motivy: Storefront, Astra, GeneratePress, Kadence, Flavor, flavor theme
- Page buildery: Gutenberg (bloky), Elementor, Beaver Builder
- Platebni pluginy: Przelewy24, PayU, BLIK, tpay
- Dopravni pluginy: InPost, DPD, DHL, Poczta Polska, Orlen Paczka

---

## Podpora a komunita

- [GitHub Issues](https://github.com/wppoland/polski/issues) - hlaseni chyb a navrhu funkci
- [GitHub Discussions](https://github.com/wppoland/polski/discussions) - otazky, diskuse, pomoc komunity
- [wppoland.com](https://wppoland.com) - web projektu a blog s navody

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
