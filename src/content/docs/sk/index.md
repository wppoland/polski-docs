---
title: Polski for WooCommerce
description: Komplexný plugin pre WordPress na prispôsobenie obchodu WooCommerce poľským právnym predpisom a trhovým požiadavkám.
template: splash
hero:
  tagline: Kompletné riešenie podporujúce prevádzku internetového obchodu v Poľsku. Právne požiadavky, lokálne funkcie, poľské štandardy e-commerce - vo verzii FREE a PRO.
  actions:
    - text: Začnite s FREE
      link: /getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: Spoznajte PRO
      link: /pro/overview/
      icon: star
      variant: secondary
    - text: GitHub
      link: https://github.com/wppoland/polski
      icon: external
      variant: minimal
---

![Polski for WooCommerce - baner pluginu](../../../assets/screenshots/banner-772x250.png)

## Dve verzie - jedno riešenie

Polski for WooCommerce je modulárna platforma vytvorená spoločnosťou [wppoland.com](https://wppoland.com), ktorá prispôsobuje obchod WooCommerce poľským trhovým požiadavkám. Dostupná v dvoch variantoch:

| | FREE | PRO |
|---|---|---|
| Licencia | GPLv2 (open source) | Komerčná licencia |
| Cena | Bezplatne | [wppoland.com/pl/polski-pro](https://wppoland.com/pl/polski-pro/) |
| Právne požiadavky | GPSR, Omnibus, RODO, DSA, KSeF a ďalšie | Všetko z FREE |
| Ceny a produkty | Jednotková cena, VAT, čas dodania | Všetko z FREE |
| Pokladňa | Tlačidlo objednávky, checkboxy, NIP | + viacstupňový košík |
| Moduly obchodu | Wishlist, porovnávač, filtre, slider | Všetko z FREE |
| Faktúry | - | Faktúra VAT, opravná, doklad, výdajka |
| KSeF | Príprava | + plná integrácia s API |
| Predaj | - | Darčekové karty, predplatné, afiliácia, predobjednávky, bundlovanie |
| B2B | - | Katalógový režim, dopyty na ponuku |
| Integrácie | - | InPost, wFirma, Fakturownia, iFirma |
| Súhlasy | Checkboxy + logovanie | + verziovanie, audit trail, re-consent |
| Podpora | GitHub Issues | Prioritná |

### Systémové požiadavky

| Požiadavka | Minimálna verzia |
|---|---|
| WordPress | 6.4+ |
| WooCommerce | 8.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

:::tip[Odporúčanie]
Pre najlepší výkon odporúčame PHP 8.2+ a WooCommerce 9.x.
:::

---

## FREE - bezplatná open source verzia

Aktuálna verzia: **1.3.2** | Licencia: GPLv2 | [GitHub](https://github.com/wppoland/polski)

![Dashboard modulov Polski for WooCommerce](../../../assets/screenshots/screenshot-1-modules-dashboard.png)

### Právne požiadavky

- **[GPSR](/compliance/gpsr/)** - údaje výrobcu, dovozcu a zodpovednej osoby
- **[Omnibus](/compliance/omnibus/)** - najnižšia cena za 30 dní pred zľavou
- **[Právo na odstúpenie](/compliance/withdrawal/)** - formuláre a postupy vrátenia tovaru
- **[RODO](/compliance/gdpr/)** - správa súhlasov, logovanie súhlasov
- **[DSA](/compliance/dsa/)** - kontaktné miesto, nahlasovanie obsahu
- **[KSeF](/compliance/ksef/)** - príprava na integráciu s e-faktúrami
- **[Greenwashing](/compliance/greenwashing/)** - kontrola environmentálnych vyhlásení
- **[Právne stránky](/compliance/legal-pages/)** - generovanie obchodných podmienok, zásad ochrany osobných údajov

### Ceny a informácie o produkte

- **[Jednotkové ceny](/prices/unit-prices/)** - zł/kg, zł/l, zł/m
- **[Zobrazovanie VAT](/prices/vat-display/)** - sadzba VAT, netto/brutto
- **[Čas dodania](/prices/delivery-time/)** - odhadovaný čas na karte produktu
- **[Údaje výrobcu](/prices/manufacturer/)** - výrobca, značka, GTIN/EAN

### Pokladňa a objednávky

- **[Tlačidlo objednávky](/checkout/checkout-button/)** - "Objednávam s povinnosťou platby"
- **[Právne checkboxy](/checkout/legal-checkboxes/)** - konfigurovateľné súhlasy
- **[Vyhľadávanie NIP](/checkout/nip-lookup/)** - automatické dopĺňanie z API GUS
- **[Double opt-in](/checkout/double-opt-in/)** - overenie e-mailu

### Potravinové produkty

- **[Výživové hodnoty](/food/nutrients/)** - tabuľka podľa nariadenia 1169/2011
- **[Alergény](/food/allergens/)** - 14 hlavných alergénov
- **[Nutri-Score](/food/nutri-score/)** - označenie A-E

### Moduly obchodu

- **[Zoznam želaní](/storefront/wishlist/)**, **[Porovnávač](/storefront/compare/)**, **[Rýchly náhľad](/storefront/quick-view/)**
- **[AJAX vyhľadávač](/storefront/ajax-search/)**, **[AJAX filtre](/storefront/ajax-filters/)**
- **[Slider produktov](/storefront/product-slider/)**, **[Odznaky](/storefront/badges/)**

### Nástroje a API

- **[Dashboard súladu](/tools/compliance-dashboard/)**, **[Audit obchodu](/tools/site-audit/)**
- **[REST API](/developer/rest-api/)**, **[Hooky](/developer/hooks/)**, **[Shortcody](/developer/shortcodes/)**
- **[WP-CLI](/developer/wp-cli/)**, **[Import CSV](/developer/csv-import/)**, **[Bloky Gutenberg](/developer/blocks/)**

---

## PRO - rozšírená verzia

Aktuálna verzia: **1.1.0** | Vyžaduje: Polski FREE 1.3.0+ | [Kúpiť na wppoland.com](https://wppoland.com/pl/polski-pro/)

:::note[PRO rozširuje FREE]
Verzia PRO je samostatný plugin inštalovaný popri bezplatnej verzii. Všetky moduly FREE zostávajú dostupné - PRO pridáva nové funkcie.
:::

### Faktúry a financie

- **[Systém faktúr](/pro/invoices/)** - Faktúra VAT, opravná, doklad, výdajka s generovaním PDF
- **[Integrácia KSeF](/pro/ksef/)** - elektronické odosielanie faktúr na daňový úrad
- **[Účtovné integrácie](/pro/accounting/)** - wFirma, Fakturownia, iFirma

### Pokladňa a súhlasy

- **[Viacstupňový košík](/pro/multistep-checkout/)** - Address -> Shipping -> Payment -> Review
- **[Správa súhlasov](/pro/consent-management/)** - verziovanie, audit trail, GDPR export

### Predaj a marketing

- **[Darčekové karty](/pro/gift-cards/)** - nákup, uplatnenie, sledovanie zostatku
- **[Predplatné](/pro/subscriptions/)** - cyklické nákupy s obnovovaním
- **[Affiliate program](/pro/affiliates/)** - odporúčacie odkazy, provízie
- **[Dopyty na ponuku](/pro/quotes/)** - RFQ namiesto košíka
- **[Predobjednávky](/pro/preorders/)** - rezervácie s dátumom vydania
- **[Balíky a doplnky](/pro/bundles-addons/)** - bundlovanie, add-ons, FBT
- **[Katalógový režim](/pro/catalog-mode/)** - B2B bez cien

### Integrácie

- **[InPost (Paczkomaty)](/pro/shipping-inpost/)** - API ShipX, mapa paczkomatov, etikety

### PRO API

- **[PRO REST API](/pro/pro-api/)** - endpointy faktúr, KSeF, nastavení

---

## Rýchly štart

1. **[Nainštalujte plugin](/getting-started/installation/)** - z panela WordPress alebo zo súboru ZIP
2. **[Nakonfigurujte moduly](/getting-started/configuration/)** - zapnite potrebné funkcie
3. **[Prejdite sprievodcu](/getting-started/wizard/)** - údaje firmy, právne stránky, checkboxy

:::note[Potrebujete pomoc?]
[GitHub Issues](https://github.com/wppoland/polski/issues) - nahlasovanie chýb | [GitHub Discussions](https://github.com/wppoland/polski/discussions) - otázky a diskusie
:::

---

## Kompatibilita

- Šablóny: Storefront, Astra, GeneratePress, Kadence, flavor theme
- Page buildery: Gutenberg, Elementor, Beaver Builder
- Platby: Przelewy24, PayU, BLIK, tpay
- Doručenie: InPost, DPD, DHL, Poczta Polska, Orlen Paczka

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právnu radu. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
