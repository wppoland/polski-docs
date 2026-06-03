---
title: Polski for WooCommerce
description: Komplexní plugin pro WordPress k přizpůsobení obchodu WooCommerce polským právním předpisům a požadavkům trhu.
template: splash
hero:
  tagline: Kompletní řešení podporující provoz internetového obchodu v Polsku. Právní požadavky, lokální funkce, polské standardy e-commerce - ve verzi FREE a PRO.
  actions:
    - text: Začít s FREE
      link: /getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: Poznat PRO
      link: /pro/overview/
      icon: star
      variant: secondary
    - text: GitHub
      link: https://github.com/wppoland/polski
      icon: external
      variant: minimal
---

![Polski for WooCommerce - banner pluginu](../../../assets/screenshots/banner-772x250.png)

## Dvě verze - jedno řešení

Polski for WooCommerce je modulární platforma vytvořená společností [wppoland.com](https://wppoland.com), která přizpůsobuje obchod WooCommerce polským tržním požadavkům. Dostupná ve dvou variantách:

| | FREE | PRO |
|---|---|---|
| Licence | GPLv2 (open source) | Komerční licence |
| Cena | Zdarma | [wppoland.com/pl/polski-pro](https://wppoland.com/pl/polski-pro/) |
| Právní požadavky | GPSR, Omnibus, GDPR, DSA, KSeF a další | Vše z FREE |
| Ceny a produkty | Jednotková cena, DPH, doba dodání | Vše z FREE |
| Pokladna | Tlačítko objednávky, checkboxy, NIP | + vícekrokový košík |
| Obchodní moduly | Wishlist, porovnávač, filtry, slider | Vše z FREE |
| Faktury | - | Faktura DPH, opravná, paragon, výdejka |
| KSeF | Příprava | + plná integrace s API |
| Prodej | - | Dárkové karty, předplatné, affiliate, předobjednávky, bundling |
| B2B | - | Katalogový režim, poptávky |
| Integrace | - | InPost, wFirma, Fakturownia, iFirma |
| Souhlasy | Checkboxy + logování | + verzování, audit trail, re-consent |
| Podpora | GitHub Issues | Prioritní |

### Systémové požadavky

| Požadavek | Minimální verze |
|---|---|
| WordPress | 6.4+ |
| WooCommerce | 8.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

:::tip[Doporučení]
Pro nejlepší výkon doporučujeme PHP 8.2+ a WooCommerce 9.x.
:::

---

## FREE - bezplatná open source verze

Aktuální verze: **1.3.2** | Licence: GPLv2 | [GitHub](https://github.com/wppoland/polski)

![Dashboard modulů Polski for WooCommerce](../../../assets/screenshots/screenshot-1-modules-dashboard.png)

### Právní požadavky

- **[GPSR](/compliance/gpsr/)** - údaje výrobce, dovozce a odpovědné osoby
- **[Omnibus](/compliance/omnibus/)** - nejnižší cena za 30 dní před zlevněním
- **[Právo na odstoupení](/compliance/withdrawal/)** - formuláře a postupy vrácení zboží
- **[GDPR](/compliance/gdpr/)** - správa souhlasů, logování souhlasů
- **[DSA](/compliance/dsa/)** - kontaktní místo, reportování obsahu
- **[KSeF](/compliance/ksef/)** - příprava na integraci s e-fakturami
- **[Greenwashing](/compliance/greenwashing/)** - kontrola environmentálních prohlášení
- **[Právní stránky](/compliance/legal-pages/)** - generování obchodních podmínek, zásad ochrany osobních údajů

### Ceny a informace o produktu

- **[Jednotkové ceny](/prices/unit-prices/)** - zł/kg, zł/l, zł/m
- **[Zobrazování DPH](/prices/vat-display/)** - sazba DPH, bez/s daní
- **[Doba dodání](/prices/delivery-time/)** - odhadovaná doba na kartě produktu
- **[Údaje výrobce](/prices/manufacturer/)** - výrobce, značka, GTIN/EAN

### Pokladna a objednávky

- **[Tlačítko objednávky](/checkout/checkout-button/)** - "Objednávám s povinností platby"
- **[Právní checkboxy](/checkout/legal-checkboxes/)** - konfigurovatelné souhlasy
- **[Vyhledávání NIP](/checkout/nip-lookup/)** - automatické doplnění z API GUS
- **[Double opt-in](/checkout/double-opt-in/)** - ověření e-mailu

### Potravinové produkty

- **[Výživové hodnoty](/food/nutrients/)** - tabulka dle nařízení 1169/2011
- **[Alergeny](/food/allergens/)** - 14 hlavních alergenů
- **[Nutri-Score](/food/nutri-score/)** - označení A-E

### Obchodní moduly

- **[Seznam přání](/storefront/wishlist/)**, **[Porovnávač](/storefront/compare/)**, **[Rychlý náhled](/storefront/quick-view/)**
- **[Vyhledávač AJAX](/storefront/ajax-search/)**, **[Filtry AJAX](/storefront/ajax-filters/)**
- **[Slider produktů](/storefront/product-slider/)**, **[Odznaky](/storefront/badges/)**

### Nástroje a API

- **[Dashboard souladu](/tools/compliance-dashboard/)**, **[Audit obchodu](/tools/site-audit/)**
- **[REST API](/developer/rest-api/)**, **[Hooky](/developer/hooks/)**, **[Shortcody](/developer/shortcodes/)**
- **[WP-CLI](/developer/wp-cli/)**, **[Import CSV](/developer/csv-import/)**, **[Bloky Gutenberg](/developer/blocks/)**

---

## PRO - rozšířená verze

Aktuální verze: **1.1.0** | Vyžaduje: Polski FREE 1.3.0+ | [Koupit na wppoland.com](https://wppoland.com/pl/polski-pro/)

:::note[PRO rozšiřuje FREE]
Verze PRO je samostatný plugin instalovaný vedle bezplatné verze. Všechny moduly FREE zůstávají dostupné - PRO přidává nové funkce.
:::

### Faktury a finance

- **[Systém faktur](/pro/invoices/)** - Faktura DPH, opravná, paragon, výdejka s generováním PDF
- **[Integrace KSeF](/pro/ksef/)** - elektronické odesílání faktur na finanční úřad
- **[Účetní integrace](/pro/accounting/)** - wFirma, Fakturownia, iFirma

### Pokladna a souhlasy

- **[Vícekrokový košík](/pro/multistep-checkout/)** - Address -> Shipping -> Payment -> Review
- **[Správa souhlasů](/pro/consent-management/)** - verzování, audit trail, GDPR export

### Prodej a marketing

- **[Dárkové karty](/pro/gift-cards/)** - nákup, uplatnění, sledování zůstatku
- **[Předplatné](/pro/subscriptions/)** - opakované nákupy s obnoveními
- **[Affiliate program](/pro/affiliates/)** - doporučovací odkazy, provize
- **[Poptávky](/pro/quotes/)** - RFQ místo košíku
- **[Předobjednávky](/pro/preorders/)** - rezervace s datem vydání
- **[Balíčky a doplňky](/pro/bundles-addons/)** - bundling, add-ons, FBT
- **[Katalogový režim](/pro/catalog-mode/)** - B2B bez cen

### Integrace

- **[InPost (Paczkomaty)](/pro/shipping-inpost/)** - API ShipX, mapa výdejních boxů, štítky

### API PRO

- **[PRO REST API](/pro/pro-api/)** - endpointy faktur, KSeF, nastavení

---

## Rychlý start

1. **[Nainstalujte plugin](/getting-started/installation/)** - z panelu WordPress nebo ze souboru ZIP
2. **[Nakonfigurujte moduly](/getting-started/configuration/)** - zapněte potřebné funkce
3. **[Projděte průvodce](/getting-started/wizard/)** - údaje firmy, právní stránky, checkboxy

:::note[Potřebujete pomoc?]
[GitHub Issues](https://github.com/wppoland/polski/issues) - nahlašování chyb | [GitHub Discussions](https://github.com/wppoland/polski/discussions) - otázky a diskuze
:::

---

## Kompatibilita

- Šablony: Storefront, Astra, GeneratePress, Kadence, flavor theme
- Page buildery: Gutenberg, Elementor, Beaver Builder
- Platby: Przelewy24, PayU, BLIK, tpay
- Doručení: InPost, DPD, DHL, Poczta Polska, Orlen Paczka

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
