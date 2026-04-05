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

## Co je Polski for WooCommerce?

**Polski for WooCommerce** je bezplatny open source plugin (GPLv2) vytvoreny spolecnosti [wppoland.com](https://wppoland.com), ktery prizpusobuje obchod WooCommerce polskym pravnim pozadavkum a standardum e-commerce. Plugin kombinuje vice nez 30 modulu zahrnujicich pravni pozadavky, zobrazovani cen, pokladnu, potravinarstvi, moduly obchodu a nastroje pro vyvojare.

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

Plugin je postaven modularne - aktivujete pouze ty funkce, ktere potrebujete. Nize naleznete popis vsech dostupnych skupin modulu.

### Pravni pozadavky

Moduly pomahajici implementovat pozadavky polskeho a unijniho prava:

- **GPSR (narizeni o bezpecnosti vyrobku)** - udaje vyrobce, dovozce a odpovedne osoby na strankach vyrobku
- **Omnibus** - zobrazovani nejnizsi ceny za 30 dni pred slevou podle smernice Omnibus
- **Pravo na odstoupeni** - formulare a postupy pro vraceni zbozi, generovani dokumentu o odstoupeni
- **GDPR** - sprava souhlasu, anonymizace dat, registr zpracovani
- **DSA (akt o digitalnich sluzbach)** - kontaktni misto, hlaseni obsahu, transparentnost
- **KSeF** - priprava na integraci s Krajovym systemem e-faktur
- **Greenwashing** - overovani a kontrola environmentalnich prohlaseni
- **Pravni stranky** - generovani obchodnich podminek, zasad ochrany osobnich udaju a zasad vraceni zbozi

### Ceny a informace o produktu

Moduly souvisejici se zobrazovanim cen a udaju o produktech:

- **Jednotkove ceny** - automaticky prepocet a zobrazovani cen za mernou jednotku (PLN/kg, PLN/l)
- **Zobrazovani DPH** - informace o sazbe DPH a cene bez/s DPH
- **Doba dodani** - odhadovana doba vyrizeni objednavky na strance produktu
- **Udaje o vyrobci** - pole vyrobce, znacka, katalogove cislo

### Pokladna a objednavky

Moduly upravujici stranku pokladny a proces objednavek:

- **Tlacitko objednavky** - zmena textu tlacitka na "Objednavka se zavazkem platby" (zakonny pozadavek)
- **Pravni checkboxy** - konfigurovatelne souhlasy s obchodnimi podminkami, zasadami ochrany osobnich udaju, newsletterem
- **Vyhledavani DIC** - automaticke doplneni firemních udaju na zaklade cisla NIP (API GUS)
- **Dvojite potvrzeni** - overeni e-mailove adresy pomoci double opt-in

### Potraviny

Specializovane moduly pro obchody s potravinami:

- **Prehled potravinovych produktu** - vyhrazena pole pro potravinarsky sortiment
- **Vyzivove hodnoty** - tabulka vyzivovych hodnot v souladu s narizenim 1169/2011
- **Alergeny** - zvyraznene alergeny v popisu produktu (14 hlavnich alergenu)
- **Nutri-Score** - zobrazovani oznaceni Nutri-Score (A-E)

### Moduly obchodu

Funkce zlepsujici nakupni zazitek:

- **Wishlist** - ukladani produktu na pozdeji
- **Porovnavac** - porovnavani produktu vedle sebe
- **Rychly nahled** - nahled produktu bez opusteni stranky kategorie
- **AJAX vyhledavac** - vyhledavani produktu v realnem case
- **AJAX filtry** - dynamicke filtrovani produktu bez opetovneho nacitani stranky
- **Slider produktu** - karusely produktu s konfigurovatelnymi nastavenimi
- **Stitky produktu** - stitky typu "Novinka", "Bestseller", "Posledni kusy"
- **Dalsi moduly** - doplnkove funkce obchodu

### Nastroje

Moduly usnadnujici spravu obchodu:

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

Tri kroky k funkcnimu obchodu splnujicimu pozadavky e-commerce:

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
- **Pravni nastroje** - aktualizovano pri zmenach predpisu
- **Open source** - zdrojovy kod na GitHubu, licence GPLv2
- **Bez predplatneho** - vsechny funkce dostupne zdarma
- **Vykon** - minimalni zdroje nacitane pouze pro aktivni moduly
- **Aktivni komunita** - podpora na GitHub Discussions

---

## Kompatibilita

Plugin je testovan s nejpopularnejsimi motivy a pluginy WordPress:

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
