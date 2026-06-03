---
title: Výrobce a značka
description: Údaje výrobce (GPSR), taxonomie značky, čísla GTIN/EAN a shortcode pro zobrazení informací o výrobci ve WooCommerce.
---

Od 13. prosince 2024 nařízení GPSR vyžaduje uvádění údajů výrobce na stránce produktu. Plugin Polski for WooCommerce umožňuje přidat údaje výrobce, značku a číslo GTIN/EAN ke každému produktu.

## Požadavky GPSR

Na stránce produktu musíte uvést:

- název výrobce nebo dovozce
- poštovní adresu výrobce
- e-mailovou adresu nebo webovou stránku ke kontaktu
- v případě produktů mimo EU - údaje odpovědné osoby na území EU

Zákazník musí mít k těmto údajům přístup před nákupem.

## Konfigurace

### Zapnutí modulu

Přejděte do **WooCommerce > Nastavení > Polski > Výrobce** a zapněte modul. Po zapnutí se v editoru produktu objeví nová pole.

### Údaje výrobce (GPSR)

V editoru produktu, na záložce "Polski" nebo v bočním panelu, najdete sekci "Výrobce (GPSR)":

| Pole | Vyžadováno | Popis |
|------|----------|------|
| Název výrobce | Ano | Plný název firmy výrobce |
| Adresa | Ano | Ulice, číslo, PSČ, město, země |
| E-mail | Ano* | Kontaktní e-mailová adresa |
| Webová stránka | Ano* | URL stránky výrobce |
| Odpovědná osoba v EU | Podmíněně | Vyžadováno pro produkty mimo EU |
| Adresa odpovědné osoby | Podmíněně | Plná adresa odpovědné osoby |

*Je vyžadován alespoň jeden způsob elektronického kontaktu (e-mail nebo webová stránka).

### Globální údaje výrobce

Pokud prodáváte hlavně vlastní produkty, nastavte výchozí údaje výrobce v **WooCommerce > Nastavení > Polski > Výrobce**. Tyto údaje se objeví u produktů bez vlastních údajů výrobce.

## Taxonomie značky

Plugin vytváří taxonomii `polski_brand` pro správu značek produktů.

### Správa značek

Přejděte do **Produkty > Značky**, abyste vytvářeli a upravovali značky. Každá značka může obsahovat:

- název
- slug (identifikátor URL)
- popis
- logo (miniatura taxonomie)

### Přiřazování značky k produktu

V editoru produktu, v bočním panelu, najdete metabox "Značka" - vyberte značku ze seznamu nebo přidejte novou.

### Stránky značky

Plugin vytváří archivní stránku pro každou značku. Zákazníci procházejí produkty značky na adrese:

```
/marka/nazwa-marki/
```

Slug archivu změníte v nastavení pluginu.

## GTIN/EAN

Plugin přidává pole pro identifikační číslo produktu (standard GS1).

### Podporované formáty

| Formát | Délka | Použití |
|--------|---------|-------------|
| EAN-13 | 13 číslic | Evropský standard |
| EAN-8 | 8 číslic | Malá balení |
| UPC-A | 12 číslic | Americký standard |
| GTIN-14 | 14 číslic | Skupinová balení |
| ISBN-13 | 13 číslic | Knihy |

### Validace

Plugin kontroluje správnost čísla GTIN/EAN (kontrolní číslice). Nesprávné číslo bude odmítnuto s chybovou zprávou.

### Structured data (Schema.org)

Číslo GTIN se automaticky dostane do strukturovaných dat (JSON-LD), což zlepšuje viditelnost v Google:

```json
{
    "@type": "Product",
    "gtin13": "5901234123457",
    "brand": {
        "@type": "Brand",
        "name": "Název značky"
    },
    "manufacturer": {
        "@type": "Organization",
        "name": "Název výrobce",
        "address": "ul. Przykładowa 1, 00-001 Warszawa"
    }
}
```

## Shortcode

Použijte shortcode `[polski_manufacturer]` pro zobrazení údajů výrobce na libovolném místě.

### Parametry

| Parametr | Typ | Výchozí | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuální | ID produktu |
| `fields` | string | `all` | Pole k zobrazení: `all`, `name`, `address`, `email`, `url`, `gtin`, `brand` |
| `layout` | string | `list` | Rozložení: `list`, `inline`, `table` |
| `show_label` | bool | `true` | Zda zobrazovat štítky polí |
| `wrapper` | string | `div` | Obalující HTML element |

### Příklady použití

Plné údaje výrobce:

```html
[polski_manufacturer]
```

Výsledek (rozložení list):

```
Výrobce: ABC Sp. z o.o.
Adresa: ul. Fabryczna 10, 00-001 Warszawa
E-mail: kontakt@abc.pl
Stránka: https://abc.pl
```

Pouze název a GTIN:

```html
[polski_manufacturer fields="name,gtin"]
```

Značka produktu v rozložení inline:

```html
[polski_manufacturer fields="brand" layout="inline"]
```

Pro konkrétní produkt:

```html
[polski_manufacturer product_id="789" fields="name,address" layout="table"]
```

V PHP šabloně:

```php
echo do_shortcode('[polski_manufacturer product_id="' . $product->get_id() . '" fields="name,gtin"]');
```

## Programový přístup k datům

### Získání údajů výrobce

```php
$manufacturer_name = get_post_meta($product_id, '_polski_manufacturer_name', true);
$manufacturer_address = get_post_meta($product_id, '_polski_manufacturer_address', true);
$manufacturer_email = get_post_meta($product_id, '_polski_manufacturer_email', true);
$manufacturer_url = get_post_meta($product_id, '_polski_manufacturer_url', true);
$gtin = get_post_meta($product_id, '_polski_gtin', true);
```

### Získání značky

```php
$brands = wp_get_object_terms($product_id, 'polski_brand');
if (!empty($brands) && !is_wp_error($brands)) {
    $brand_name = $brands[0]->name;
    $brand_logo = get_term_meta($brands[0]->term_id, 'thumbnail_id', true);
}
```

## Import CSV

Údaje výrobce a GTIN importujete přes CSV:

| Sloupec CSV | Popis |
|-------------|------|
| `polski_manufacturer_name` | Název výrobce |
| `polski_manufacturer_address` | Adresa výrobce |
| `polski_manufacturer_email` | E-mail výrobce |
| `polski_manufacturer_url` | Webová stránka výrobce |
| `polski_gtin` | Číslo GTIN/EAN |
| `polski_brand` | Název značky |

Příklad:

```csv
"Krem nawilżający","ABC Kosmetyki Sp. z o.o.","ul. Kwiatowa 5, 00-100 Warszawa","info@abc.pl","https://abc.pl","5901234123457","ABC Kosmetyki"
```

## Nejčastější problémy

### Údaje výrobce se nezobrazují na stránce produktu

1. Zkontrolujte, zda je modul výrobce zapnutý
2. Ujistěte se, že produkt má vyplněné údaje nebo jsou nakonfigurovány výchozí údaje
3. Ověřte, zda šablona podporuje hook `woocommerce_single_product_summary` nebo `woocommerce_product_meta_end`

### GTIN odmítán jako nesprávný

Zkontrolujte kontrolní číslici čísla GTIN. Použijte kalkulačku GS1 pro ověření: https://www.gs1.org/services/check-digit-calculator

### Značka se neobjevuje v Schema.org

Ujistěte se, že je značka přiřazena k produktu přes taxonomii `polski_brand`, nikoli pouze zadaná v textovém poli výrobce.

## Související zdroje

- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
