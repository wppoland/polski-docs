---
title: Shortcody
description: Kompletni seznam 23 shortcodu Polski for WooCommerce s parametry, priklady pouziti a PHP kodem.
---

Polski for WooCommerce zpristupnuje 23 shortcodu pro zobrazovani pravnich dat, informaci o produktu a modulu obchodu na libovolnem miste obchodu.

## Shortcody pravnich pozadavku

### `[polski_gpsr]`

Zobrazuje informace GPSR (General Product Safety Regulation) pro produkt.

| Parametr | Typ | Vychozi | Popis |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int | (aktualni) | ID produktu |
| `fields` | string | `all` | Pole k zobrazeni |
| `layout` | string | `list` | Rozlozeni: list, table, inline |

### `[polski_omnibus_price]`

Zobrazuje nejnizsi cenu z poslednich 30 dnu (smernice Omnibus).

| Parametr | Typ | Vychozi | Popis |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int | (aktualni) | ID produktu |
| `days` | int | `30` | Pocet dnu zpet |
| `show_date` | string | `no` | Zobrazit datum nejnizsi ceny |

### `[polski_withdrawal_form]`

Zobrazuje formular odstoupeni od smlouvy.

### `[polski_dsa_report]`

Zobrazuje formular hlaseni nelegalniho obsahu (Digital Services Act).

### `[polski_tax_notice]`

Zobrazuje informaci o DPH a nakladech na doruceni.

## Shortcody informaci o produktu

### `[polski_unit_price]`

Zobrazuje jednotkovou cenu produktu (napr. cena za kg, litr).

### `[polski_delivery_time]`

Zobrazuje odhadovanou dobu dodani.

### `[polski_manufacturer]`

Zobrazuje informace o vyrobci.

### `[polski_nutrients]`

Zobrazuje tabulku vyzivovych hodnot (pro potraviny).

### `[polski_allergens]`

Zobrazuje seznam alergenu (pro potraviny).

## Shortcody modulu obchodu

### `[polski_wishlist]`

Zobrazuje tabulku wishlistu.

| Parametr | Typ | Vychozi | Popis |
| ----------- | ------ | --------- | ----------------------------- |
| `columns` | string | `all` | Sloupce k zobrazeni |
| `max_items` | int | `50` | Limit produktu |
| `show_empty`| string | `yes` | Zprava prazdneho seznamu |

### `[polski_compare]`

Zobrazuje tabulku porovnani produktu.

### `[polski_ajax_search]`

Zobrazuje AJAX vyhledavac s naseptavanim.

| Parametr | Typ | Vychozi | Popis |
| ------------- | ------ | ------------------- | ------------------------ |
| `placeholder` | string | `Szukaj produktów…` | Zastupny text |
| `width` | string | `100%` | Sirka pole |
| `show_icon` | string | `yes` | Ikona lupy |
| `show_cat` | string | `no` | Filtr kategorie |
| `limit` | int | `8` | Limit napovedi |

### `[polski_ajax_filters]`

Zobrazuje AJAX filtry pro filtrovani produktu.

### `[polski_product_slider]`

Zobrazuje karusel produktu.

| Parametr | Typ | Vychozi | Popis |
| ---------------- | ------ | --------- | ----------------------------- |
| `type` | string | `latest` | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit` | int | `8` | Limit produktu |
| `columns` | int | `4` | Sloupce desktop |
| `arrows` | string | `yes` | Sipky navigace |
| `dots` | string | `no` | Tecky strankovani |
| `autoplay` | string | `no` | Autoplay |
| `title` | string | (prazdny) | Hlavicka |

### `[polski_nutri_score]`

Zobrazuje hodnoceni Nutri-Score potravinoveho produktu.

### `[polski_checkout_button]`

Zobrazuje tlacitko nakupu s pravne shodnym stitkem.

### `[polski_legal_checkboxes]`

Zobrazuje pravni checkboxy mimo pokladnu (napr. na strance registrace).

### `[polski_nip_field]`

Zobrazuje pole NIP s validaci v realnem case.

### `[polski_greenwashing_info]`

Zobrazuje overene environmentalni informace produktu.

### `[polski_security_incident]`

Zobrazuje formular hlaseni bezpecnostniho incidentu (CRA).

### `[polski_verified_badge]`

Zobrazuje odznak overeneho nakupu u recenze.

## Pouziti shortcodu v sablonach PHP

```php
// Jednotlivy shortcode
echo do_shortcode('[polski_omnibus_price]');

// Shortcode s parametry
echo do_shortcode('[polski_product_slider type="featured" limit="6"]');

// Podminene zobrazeni
if (shortcode_exists('polski_gpsr')) {
    echo do_shortcode('[polski_gpsr]');
}
```

## Pouziti shortcodu v Gutenbergu

V editoru Gutenberg pouzijte blok **Shortcode** a vlozte pozadovany shortcode. Alternativne mnohe z techto shortcodu maji vyhrazene Gutenberg bloky s nahledem v editoru.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
