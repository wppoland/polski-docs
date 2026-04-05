---
title: Vyrobce a znacka
description: Udaje vyrobce (GPSR), taxonomie znacky, cisla GTIN/EAN a shortcode pro zobrazeni informaci o vyrobci ve WooCommerce.
---

Od 13. prosince 2024 narizeni GPSR vyzaduje udaje vyrobce na strance produktu. Plugin umoznuje pridat udaje vyrobce, znacku a cislo GTIN/EAN ke kazdemu produktu.

## Pozadavky GPSR

Na strance produktu musite uvest:

- nazev vyrobce nebo dovozce
- postovni adresa vyrobce
- e-mailova adresa nebo webova stranka pro kontakt
- v pripade produktu mimo EU - udaje odpovedne osoby na uzemi EU

Tyto informace musi byt spotrebiteli snadno dostupne pred nakupem.

## Konfigurace

### Aktivace modulu

Prejdete do **WooCommerce > Nastaveni > Polski > Vyrobce** a aktivujte modul. Po aktivaci se v editoru produktu objevi nova pole.

### Udaje vyrobce (GPSR)

V editoru produktu, v zalozce "Polski" nebo v bocnim panelu, naleznete sekci "Vyrobce (GPSR)":

| Pole | Povinne | Popis |
|------|----------|------|
| Nazev vyrobce | Ano | Uplny nazev firmy vyrobce |
| Adresa | Ano | Ulice, cislo, PSC, mesto, zeme |
| E-mail | Ano* | Kontaktni e-mailova adresa |
| Web | Ano* | URL stranky vyrobce |
| Odpovedna osoba v EU | Podminecne | Vyzadovano pro produkty mimo EU |
| Adresa odpovedne osoby | Podminecne | Uplna adresa odpovedne osoby |

*Vyzadovan je alespon jeden zpusob elektronickeho kontaktu (e-mail nebo web).

### Globalni udaje vyrobce

Pokud prodavate predevsim produkty vlastni znacky, muzete nastavit vychozi udaje vyrobce v **WooCommerce > Nastaveni > Polski > Vyrobce**. Tyto udaje budou automaticky pouzity na vsechny produkty, ktere nemaji prirazeny individualni udaje vyrobce.

## Taxonomie znacky

Plugin registruje taxonomii `polski_brand` umoznujici spravu znacek produktu.

### Sprava znacek

Prejdete do **Produkty > Znacky** pro vytvareni a editaci znacek. Kazda znacka muze obsahovat:

- nazev
- slug (URL identifikator)
- popis
- logo (miniatura taxonomie)

### Prirazeni znacky k produktu

V editoru produktu, v bocnim panelu, naleznete metabox "Znacka" - vyberte znacku ze seznamu nebo pridejte novou.

### Stranky znacek

Plugin automaticky generuje stranky archivu pro kazdou znacku. Zakaznici mohou prochazet vsechny produkty dane znacky na adrese:

```
/marka/nazev-znacky/
```

Slug archivu lze zmenit v nastaveni pluginu.

## GTIN/EAN

Plugin pridava pole na identifikacni cislo produktu v souladu se standardy GS1.

### Podporovane formaty

| Format | Delka | Vyuziti |
|--------|---------|-------------|
| EAN-13 | 13 cislic | Evropsky standard |
| EAN-8 | 8 cislic | Male baleni |
| UPC-A | 12 cislic | Americky standard |
| GTIN-14 | 14 cislic | Souhrnna baleni |
| ISBN-13 | 13 cislic | Knihy |

### Validace

Plugin automaticky validuje spravnost cisla GTIN/EAN (kontrolni cislice). Nespravne cislo bude odmitnuto s chybovou zpravou.

### Strukturovana data (Schema.org)

Cislo GTIN je automaticky pridavano do strukturovanych dat produktu (JSON-LD), coz zlepsuje viditelnost ve vysledcich vyhledavani Google:

```json
{
    "@type": "Product",
    "gtin13": "5901234123457",
    "brand": {
        "@type": "Brand",
        "name": "Nazev znacky"
    },
    "manufacturer": {
        "@type": "Organization",
        "name": "Nazev vyrobce",
        "address": "ul. Przykładowa 1, 00-001 Warszawa"
    }
}
```

## Shortcode

Pouzijte shortcode `[polski_manufacturer]` pro zobrazeni udaju vyrobce na libovolnem miste.

### Parametry

| Parametr | Typ | Vychozi | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktualni | ID produktu |
| `fields` | string | `all` | Pole k zobrazeni: `all`, `name`, `address`, `email`, `url`, `gtin`, `brand` |
| `layout` | string | `list` | Rozlozeni: `list`, `inline`, `table` |
| `show_label` | bool | `true` | Zda zobrazit stitky poli |
| `wrapper` | string | `div` | Obalujici HTML element |

### Priklady pouziti

Uplne udaje vyrobce:

```html
[polski_manufacturer]
```

Pouze nazev a GTIN:

```html
[polski_manufacturer fields="name,gtin"]
```

Znacka produktu v inline rozlozeni:

```html
[polski_manufacturer fields="brand" layout="inline"]
```

Pro konkretni produkt:

```html
[polski_manufacturer product_id="789" fields="name,address" layout="table"]
```

V sablone PHP:

```php
echo do_shortcode('[polski_manufacturer product_id="' . $product->get_id() . '" fields="name,gtin"]');
```

## Programaticky pristup k datum

### Ziskani udaju vyrobce

```php
$manufacturer_name = get_post_meta($product_id, '_polski_manufacturer_name', true);
$manufacturer_address = get_post_meta($product_id, '_polski_manufacturer_address', true);
$manufacturer_email = get_post_meta($product_id, '_polski_manufacturer_email', true);
$manufacturer_url = get_post_meta($product_id, '_polski_manufacturer_url', true);
$gtin = get_post_meta($product_id, '_polski_gtin', true);
```

### Ziskani znacky

```php
$brands = wp_get_object_terms($product_id, 'polski_brand');
if (!empty($brands) && !is_wp_error($brands)) {
    $brand_name = $brands[0]->name;
    $brand_logo = get_term_meta($brands[0]->term_id, 'thumbnail_id', true);
}
```

## CSV import

Udaje vyrobce a GTIN lze importovat pomoci CSV:

| Sloupec CSV | Popis |
|-------------|------|
| `polski_manufacturer_name` | Nazev vyrobce |
| `polski_manufacturer_address` | Adresa vyrobce |
| `polski_manufacturer_email` | E-mail vyrobce |
| `polski_manufacturer_url` | Web vyrobce |
| `polski_gtin` | Cislo GTIN/EAN |
| `polski_brand` | Nazev znacky |

Priklad:

```csv
"Krem nawilżający","ABC Kosmetyki Sp. z o.o.","ul. Kwiatowa 5, 00-100 Warszawa","info@abc.pl","https://abc.pl","5901234123457","ABC Kosmetyki"
```

## Nejcastejsi problemy

### Udaje vyrobce se nezobrazuji na strance produktu

1. Zkontrolujte, zda je modul vyrobce aktivovan
2. Ujistete se, ze produkt ma vyplnene udaje nebo jsou nakonfigurovany vychozi udaje
3. Overite, zda motiv podporuje hook `woocommerce_single_product_summary` nebo `woocommerce_product_meta_end`

### GTIN odmitnut jako nespravny

Zkontrolujte kontrolni cislici cisla GTIN. Pouzijte kalkulator GS1 pro overeni: https://www.gs1.org/services/check-digit-calculator

### Znacka se nezobrazuje v Schema.org

Ujistete se, ze znacka je prirazena k produktu pres taxonomii `polski_brand`, a ne pouze zapsana v textovem poli vyrobce.

## Souvisejici zdroje

- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
