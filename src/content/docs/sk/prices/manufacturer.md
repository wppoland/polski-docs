---
title: Výrobca a značka
description: Údaje výrobcu (GPSR), taxonómia značky, čísla GTIN/EAN a shortcód na zobrazenie informácií o výrobcovi vo WooCommerce.
---

Od 13. decembra 2024 nariadenie GPSR vyžaduje uvádzanie údajov výrobcu na stránke produktu. Plugin Polski for WooCommerce umožňuje pridať údaje výrobcu, značku a číslo GTIN/EAN ku každému produktu.

## Požiadavky GPSR

V súlade s nariadením (EÚ) 2023/988 (GPSR) musia byť na stránke produktu uvedené:

- názov výrobcu alebo dovozcu
- poštová adresa výrobcu
- e-mailová adresa alebo webová stránka na kontakt
- v prípade produktov mimo EÚ - údaje zodpovednej osoby na území EÚ

Tieto informácie musia byť ľahko dostupné pre spotrebiteľa pred nákupom.

## Konfigurácia

### Zapnutie modulu

Prejdite do **WooCommerce > Nastavenia > Polski > Výrobca** a aktivujte modul. Po aktivácii sa v editore produktu zobrazia nové polia.

### Údaje výrobcu (GPSR)

V editore produktu, v záložke "Polski" alebo v bočnom paneli, nájdete sekciu "Výrobca (GPSR)":

| Pole | Povinné | Popis |
|------|----------|------|
| Názov výrobcu | Áno | Úplný názov firmy výrobcu |
| Adresa | Áno | Ulica, číslo, PSČ, mesto, krajina |
| E-mail | Áno* | Kontaktná e-mailová adresa |
| Webová stránka | Áno* | URL stránky výrobcu |
| Zodpovedná osoba v EÚ | Podmienečne | Vyžadované pre produkty mimo EÚ |
| Adresa zodpovednej osoby | Podmienečne | Úplná adresa zodpovednej osoby |

*Vyžadovaný je aspoň jeden spôsob elektronického kontaktu (e-mail alebo webová stránka).

### Globálne údaje výrobcu

Ak predávate hlavne produkty vlastnej značky, môžete nastaviť predvolené údaje výrobcu v **WooCommerce > Nastavenia > Polski > Výrobca**. Tieto údaje budú automaticky aplikované na všetky produkty, ktoré nemajú priradené individuálne údaje výrobcu.

## Taxonómia značky

Plugin registruje taxonómiu `polski_brand` umožňujúcu správu značiek produktov.

### Správa značiek

Prejdite do **Produkty > Značky** na vytváranie a úpravu značiek. Každá značka môže obsahovať:

- názov
- slug (URL identifikátor)
- popis
- logo (miniatúra taxonómie)

### Priradenie značky k produktu

V editore produktu, v bočnom paneli, nájdete metabox "Značka" - vyberte značku zo zoznamu alebo pridajte novú.

### Stránky značky

Plugin automaticky generuje archívne stránky pre každú značku. Zákazníci môžu prezerať všetky produkty danej značky na adrese:

```
/marka/nazov-znacky/
```

Slug archívu je možné zmeniť v nastaveniach pluginu.

## GTIN/EAN

Plugin pridáva pole na identifikačné číslo produktu v súlade so štandardmi GS1.

### Podporované formáty

| Formát | Dĺžka | Uplatnenie |
|--------|---------|-------------|
| EAN-13 | 13 číslic | Európsky štandard |
| EAN-8 | 8 číslic | Malé balenia |
| UPC-A | 12 číslic | Americký štandard |
| GTIN-14 | 14 číslic | Zberné balenia |
| ISBN-13 | 13 číslic | Knihy |

### Validácia

Plugin automaticky validuje správnosť čísla GTIN/EAN (kontrolná číslica). Nesprávne číslo bude odmietnuté s chybovým hlásením.

### Štrukturované údaje (Schema.org)

Číslo GTIN je automaticky pridávané do štrukturovaných údajov produktu (JSON-LD), čo zlepšuje viditeľnosť vo výsledkoch vyhľadávania Google:

```json
{
    "@type": "Product",
    "gtin13": "5901234123457",
    "brand": {
        "@type": "Brand",
        "name": "Názov značky"
    },
    "manufacturer": {
        "@type": "Organization",
        "name": "Názov výrobcu",
        "address": "ul. Przykładowa 1, 00-001 Warszawa"
    }
}
```

## Shortcód

Použite shortcód `[polski_manufacturer]` na zobrazenie údajov výrobcu na ľubovoľnom mieste.

### Parametre

| Parameter | Typ | Predvolený | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuálny | ID produktu |
| `fields` | string | `all` | Polia na zobrazenie: `all`, `name`, `address`, `email`, `url`, `gtin`, `brand` |
| `layout` | string | `list` | Rozloženie: `list`, `inline`, `table` |
| `show_label` | bool | `true` | Či zobrazovať štítky polí |
| `wrapper` | string | `div` | Obaľujúci HTML prvok |

### Príklady použitia

Úplné údaje výrobcu:

```html
[polski_manufacturer]
```

Len názov a GTIN:

```html
[polski_manufacturer fields="name,gtin"]
```

Značka produktu v rozložení inline:

```html
[polski_manufacturer fields="brand" layout="inline"]
```

Pre konkrétny produkt:

```html
[polski_manufacturer product_id="789" fields="name,address" layout="table"]
```

V PHP šablóne:

```php
echo do_shortcode('[polski_manufacturer product_id="' . $product->get_id() . '" fields="name,gtin"]');
```

## Programový prístup k údajom

### Získanie údajov výrobcu

```php
$manufacturer_name = get_post_meta($product_id, '_polski_manufacturer_name', true);
$manufacturer_address = get_post_meta($product_id, '_polski_manufacturer_address', true);
$manufacturer_email = get_post_meta($product_id, '_polski_manufacturer_email', true);
$manufacturer_url = get_post_meta($product_id, '_polski_manufacturer_url', true);
$gtin = get_post_meta($product_id, '_polski_gtin', true);
```

### Získanie značky

```php
$brands = wp_get_object_terms($product_id, 'polski_brand');
if (!empty($brands) && !is_wp_error($brands)) {
    $brand_name = $brands[0]->name;
    $brand_logo = get_term_meta($brands[0]->term_id, 'thumbnail_id', true);
}
```

## Import CSV

Údaje výrobcu a GTIN je možné importovať pomocou CSV:

| Stĺpec CSV | Popis |
|-------------|------|
| `polski_manufacturer_name` | Názov výrobcu |
| `polski_manufacturer_address` | Adresa výrobcu |
| `polski_manufacturer_email` | E-mail výrobcu |
| `polski_manufacturer_url` | Webová stránka výrobcu |
| `polski_gtin` | Číslo GTIN/EAN |
| `polski_brand` | Názov značky |

Príklad:

```csv
"Krem nawilżający","ABC Kosmetyki Sp. z o.o.","ul. Kwiatowa 5, 00-100 Warszawa","info@abc.pl","https://abc.pl","5901234123457","ABC Kosmetyki"
```

## Najčastejšie problémy

### Údaje výrobcu sa nezobrazujú na stránke produktu

1. Skontrolujte, či modul výrobcu je zapnutý
2. Uistite sa, že produkt má vyplnené údaje alebo sú nakonfigurované predvolené údaje
3. Overte, či téma podporuje hook `woocommerce_single_product_summary` alebo `woocommerce_product_meta_end`

### GTIN odmietnuté ako nesprávne

Skontrolujte kontrolnú číslicu čísla GTIN. Použite kalkulačku GS1 na overenie: https://www.gs1.org/services/check-digit-calculator

### Značka sa nezobrazuje v Schema.org

Uistite sa, že značka je priradená k produktu cez taxonómiu `polski_brand`, a nielen vpísaná do textového poľa výrobcu.

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
