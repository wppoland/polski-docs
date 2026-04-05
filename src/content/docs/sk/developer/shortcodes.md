---
title: Shortcódy
description: Kompletný zoznam 23 shortcódov Polski for WooCommerce s parametrami, príkladmi použitia a PHP kódom.
---

Polski for WooCommerce sprístupňuje 23 shortcódov na zobrazovanie právnych údajov, informácií o produkte a obchodných modulov na ľubovoľnom mieste obchodu.

## Shortcódy právneho súladu

### `[polski_gpsr]`

Zobrazuje informácie GPSR (General Product Safety Regulation) pre produkt.

**Parametre:**

| Parameter     | Typ    | Predvolené  | Popis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuálny) | ID produktu                   |
| `fields`     | string | `all`      | Polia na zobrazenie           |
| `layout`     | string | `list`     | Rozloženie: list, table, inline |

**Príklad:**

```html
[polski_gpsr product_id="123" fields="manufacturer,contact,safety" layout="table"]
```

**V PHP šablóne:**

```php
echo do_shortcode('[polski_gpsr]'); // Na stránke produktu - automaticky načíta ID
```

### `[polski_omnibus_price]`

Zobrazuje najnižšiu cenu za posledných 30 dní (smernica Omnibus).

**Parametre:**

| Parameter     | Typ    | Predvolené  | Popis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuálny) | ID produktu                   |
| `days`       | int    | `30`       | Počet dní dozadu              |
| `label`      | string | (predvolený)| Text štítku                  |
| `show_date`  | string | `no`       | Zobraziť dátum najnižšej ceny |

**Príklad:**

```html
[polski_omnibus_price product_id="456" label="Najniższa cena z 30 dni:" show_date="yes"]
```

### `[polski_withdrawal_form]`

Zobrazuje formulár na odstúpenie od zmluvy.

**Parametre:**

| Parameter    | Typ    | Predvolené | Popis                            |
| ----------- | ------ | --------- | ------------------------------- |
| `order_id`  | int    | (prázdny) | Predvyplnenie č. objednávky      |
| `show_info` | string | `yes`     | Zobraziť informácie o práve na odstúpenie |
| `redirect`  | string | (prázdny) | URL presmerovania po odoslaní    |

### `[polski_dsa_report]`

Zobrazuje formulár nahlásenia nezákonného obsahu (Digital Services Act).

### `[polski_tax_notice]`

Zobrazuje informáciu o dani DPH a nákladoch na doručenie.

## Shortcódy informácií o produkte

### `[polski_unit_price]`

Zobrazuje jednotkovú cenu produktu (napr. cena za kg, liter).

### `[polski_delivery_time]`

Zobrazuje odhadovanú dodaciu lehotu.

### `[polski_manufacturer]`

Zobrazuje informácie o výrobcovi.

### `[polski_nutrients]`

Zobrazuje tabuľku výživových hodnôt (pre potravinárske produkty).

### `[polski_allergens]`

Zobrazuje zoznam alergénov (pre potravinárske produkty).

## Shortcódy obchodných modulov

### `[polski_wishlist]`

Zobrazuje tabuľku zoznamu prianí.

**Parametre:**

| Parameter    | Typ    | Predvolené | Popis                          |
| ----------- | ------ | --------- | ----------------------------- |
| `columns`   | string | `all`     | Stĺpce na zobrazenie          |
| `max_items` | int    | `50`      | Limit produktov                |
| `show_empty`| string | `yes`     | Hlásenie prázdneho zoznamu     |

### `[polski_compare]`

Zobrazuje tabuľku porovnania produktov.

### `[polski_ajax_search]`

Zobrazuje AJAX vyhľadávač s návrhmi.

### `[polski_ajax_filters]`

Zobrazuje AJAX filtre na filtrovanie produktov.

### `[polski_product_slider]`

Zobrazuje karusel produktov.

**Parametre:**

| Parameter         | Typ    | Predvolené | Popis                          |
| ---------------- | ------ | --------- | ----------------------------- |
| `type`           | string | `latest`  | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`          | int    | `8`       | Limit produktov                |
| `columns`        | int    | `4`       | Stĺpce desktop                |
| `columns_tablet` | int    | `2`       | Stĺpce tablet                 |
| `columns_mobile` | int    | `1`       | Stĺpce mobile                 |
| `arrows`         | string | `yes`     | Navigačné šípky                |
| `dots`           | string | `no`      | Paginačné bodky                |
| `autoplay`       | string | `no`      | Autoplay                       |
| `title`          | string | (prázdny) | Hlavička                       |

**Príklad:**

```html
[polski_product_slider type="sale" limit="12" title="Promocje" arrows="yes" dots="yes"]
```

### `[polski_nutri_score]`

Zobrazuje hodnotenie Nutri-Score potravinárskeho produktu.

### `[polski_checkout_button]`

Zobrazuje nákupné tlačidlo s právne súladným štítkom.

### `[polski_legal_checkboxes]`

Zobrazuje právne checkboxy mimo pokladne (napr. na stránke registrácie).

### `[polski_nip_field]`

Zobrazuje pole NIP s validáciou v reálnom čase (API VIES/GUS).

### `[polski_greenwashing_info]`

Zobrazuje overené environmentálne informácie produktu (anti-greenwashing).

### `[polski_security_incident]`

Zobrazuje formulár nahlásenia bezpečnostného incidentu (CRA).

### `[polski_verified_badge]`

Zobrazuje odznak overeného nákupu pri recenzii.

**Príklad:**

```html
[polski_verified_badge text="Potwierdzone zamówienie" icon="shield"]
```

## Použitie shortcódov v PHP šablónach

Všetky shortcódy je možné volať v PHP šablónach:

```php
// Jednotlivý shortcód
echo do_shortcode('[polski_omnibus_price]');

// Shortcód s parametrami
echo do_shortcode('[polski_product_slider type="featured" limit="6"]');

// Podmienené zobrazovanie
if (shortcode_exists('polski_gpsr')) {
    echo do_shortcode('[polski_gpsr]');
}
```

## Použitie shortcódov v Gutenbergu

V editore Gutenberg použite blok **Shortcód** a vložte požadovaný shortcód. Alternatívne, mnohé z týchto shortcódov majú špeciálne Gutenberg bloky s náhľadom v editore.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
