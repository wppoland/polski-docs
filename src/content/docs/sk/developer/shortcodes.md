---
title: Shortcódy
description: Kompletný zoznam 23 shortcódov Polski for WooCommerce s parametrami, príkladmi použitia a PHP kódom.
---

23 shortcódov na zobrazovanie právnych údajov, informácií o produkte a modulov obchodu na ľubovoľnom mieste.

## Shortcódy právnych požiadaviek

### `[polski_gpsr]`

Zobrazuje informácie GPSR (General Product Safety Regulation) pre produkt.

**Parametre:**

| Parameter    | Typ    | Predvolene | Popis                         |
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

| Parameter    | Typ    | Predvolene | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuálny) | ID produktu                   |
| `days`       | int    | `30`       | Počet dní dozadu              |
| `label`      | string | (predvolený) | Text označenia              |
| `show_date`  | string | `no`       | Zobraz dátum najnižšej ceny   |

**Príklad:**

```html
[polski_omnibus_price product_id="456" label="Najnižšia cena za 30 dní:" show_date="yes"]
```

### `[polski_withdrawal_form]`

Zobrazuje formulár na odstúpenie od zmluvy.

**Parametre:**

| Parameter   | Typ    | Predvolene | Popis                           |
| ----------- | ------ | --------- | ------------------------------- |
| `order_id`  | int    | (prázdne)  | Predvyplnenie čísla objednávky  |
| `show_info` | string | `yes`     | Zobraz informácie o práve na odstúpenie |
| `redirect`  | string | (prázdne)  | URL presmerovania po odoslaní   |

**Príklad:**

```html
[polski_withdrawal_form show_info="yes"]
```

**Vyhradená stránka odstúpenia:**

Vytvor stránku so slugom `odstupenie-od-zmluvy` a vlož:

```html
<h2>Formulár na odstúpenie od zmluvy</h2>
<p>V súlade so zákonom o ochrane spotrebiteľa máš 14 dní na odstúpenie od zmluvy.</p>
[polski_withdrawal_form]
```

### `[polski_dsa_report]`

Zobrazuje formulár na nahlásenie nelegálneho obsahu (Digital Services Act).

**Parametre:**

| Parameter    | Typ    | Predvolene | Popis                         |
| ------------ | ------ | --------- | ----------------------------- |
| `product_id` | int    | (prázdne)  | ID produktu na nahlásenie     |
| `categories` | string | `all`     | Kategórie hlásení             |
| `show_info`  | string | `yes`     | Zobraz informácie o DSA       |

**Príklad:**

```html
[polski_dsa_report categories="illegal_content,counterfeit,safety"]
```

### `[polski_tax_notice]`

Zobrazuje informáciu o DPH a nákladoch na doručenie.

**Parametre:**

| Parameter     | Typ    | Predvolene                 | Popis                    |
| ------------- | ------ | -------------------------- | ------------------------ |
| `text`        | string | `Cena obsahuje DPH. Náklady na doručenie sa počítajú pri pokladni.` | Obsah informácie |
| `link_text`   | string | `Náklady na doručenie`     | Text odkazu              |
| `link_url`    | string | (prázdne)                   | URL stránky s nákladmi   |

**Príklad:**

```html
[polski_tax_notice text="Cena s DPH obsahuje 20 % DPH." link_text="Pozri náklady na doručenie" link_url="/dorucenie/"]
```

## Shortcódy informácií o produkte

### `[polski_unit_price]`

Zobrazuje jednotkovú cenu produktu (napr. cena za kg, liter).

**Parametre:**

| Parameter    | Typ    | Predvolene | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuálny) | ID produktu                   |
| `format`     | string | `auto`     | Formát: auto, per_kg, per_l, per_m, per_unit |

**Príklad:**

```html
[polski_unit_price product_id="789" format="per_kg"]
```

### `[polski_delivery_time]`

Zobrazuje odhadovaný čas doručenia.

**Parametre:**

| Parameter    | Typ    | Predvolene | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuálny) | ID produktu                   |
| `format`     | string | `range`    | Formát: range, exact, text    |
| `label`      | string | `Čas doručenia:` | Označenie                |

**Príklad:**

```html
[polski_delivery_time label="Odoslanie do:" format="range"]
```

### `[polski_manufacturer]`

Zobrazuje informácie o výrobcovi.

**Parametre:**

| Parameter    | Typ    | Predvolene | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuálny) | ID produktu                   |
| `fields`     | string | `all`      | Polia: name, address, url, logo |
| `link`       | string | `yes`      | Odkaz na stránku výrobcu      |

**Príklad:**

```html
[polski_manufacturer fields="name,logo" link="yes"]
```

### `[polski_nutrients]`

Zobrazuje tabuľku výživových hodnôt (pre potravinárske produkty).

**Parametre:**

| Parameter    | Typ    | Predvolene | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuálny) | ID produktu                   |
| `per`        | string | `100g`     | Hodnoty na: 100g, 100ml, serving |
| `layout`     | string | `table`    | Rozloženie: table, list, compact |

**Príklad:**

```html
[polski_nutrients per="serving" layout="compact"]
```

### `[polski_allergens]`

Zobrazuje zoznam alergénov (pre potravinárske produkty).

**Parametre:**

| Parameter    | Typ    | Predvolene | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuálny) | ID produktu                   |
| `highlight`  | string | `bold`     | Zvýraznenie: bold, color, icon |
| `layout`     | string | `inline`   | Rozloženie: inline, list      |

**Príklad:**

```html
[polski_allergens highlight="bold" layout="list"]
```

## Shortcódy modulov obchodu

### `[polski_wishlist]`

Zobrazuje tabuľku zoznamu želaní.

**Parametre:**

| Parameter   | Typ    | Predvolene | Popis                         |
| ----------- | ------ | --------- | ----------------------------- |
| `columns`   | string | `all`     | Stĺpce na zobrazenie          |
| `max_items` | int    | `50`      | Limit produktov               |
| `show_empty`| string | `yes`     | Správa o prázdnom zozname     |

**Príklad:**

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### `[polski_compare]`

Zobrazuje tabuľku porovnania produktov.

**Parametre:**

| Parameter      | Typ    | Predvolene | Popis                         |
| -------------- | ------ | --------- | ----------------------------- |
| `columns`      | string | `all`     | Vlastnosti na zobrazenie      |
| `hide_similar` | string | `no`      | Skry identické vlastnosti     |
| `show_remove`  | string | `yes`     | Tlačidlo odstránenia          |

**Príklad:**

```html
[polski_compare hide_similar="yes"]
```

### `[polski_ajax_search]`

Zobrazuje AJAX vyhľadávač s návrhmi.

**Parametre:**

| Parameter     | Typ    | Predvolene          | Popis                    |
| ------------- | ------ | ------------------- | ------------------------ |
| `placeholder` | string | `Hľadaj produkty…`  | Zástupný text            |
| `width`       | string | `100%`              | Šírka poľa               |
| `show_icon`   | string | `yes`               | Ikona lupy               |
| `show_cat`    | string | `no`                | Filter kategórií         |
| `limit`       | int    | `8`                 | Limit návrhov            |

**Príklad:**

```html
[polski_ajax_search placeholder="Čo hľadáš?" show_cat="yes" limit="10"]
```

### `[polski_ajax_filters]`

Zobrazuje AJAX filtre na filtrovanie produktov.

**Parametre:**

| Parameter    | Typ    | Predvolene | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | string | `all`      | Typy filtrov                  |
| `style`      | string | `expanded` | Štýl: expanded, compact, accordion |
| `show_count` | string | `yes`      | Počítadlá produktov           |
| `show_reset` | string | `yes`      | Tlačidlo resetovania          |
| `columns`    | int    | `1`        | Stĺpce filtrov                |
| `ajax`       | string | `yes`      | Režim AJAX                    |

**Príklad:**

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion"]
```

### `[polski_product_slider]`

Zobrazuje karusel produktov.

**Parametre:**

| Parameter        | Typ    | Predvolene | Popis                         |
| ---------------- | ------ | --------- | ----------------------------- |
| `type`           | string | `latest`  | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`          | int    | `8`       | Limit produktov               |
| `columns`        | int    | `4`       | Stĺpce desktop                |
| `columns_tablet` | int    | `2`       | Stĺpce tablet                 |
| `columns_mobile` | int    | `1`       | Stĺpce mobil                  |
| `category`       | string | (prázdne)  | Slug kategórie                |
| `ids`            | string | (prázdne)  | ID produktov                  |
| `arrows`         | string | `yes`     | Navigačné šípky               |
| `dots`           | string | `no`      | Bodky stránkovania            |
| `autoplay`       | string | `no`      | Autoplay                      |
| `autoplay_speed` | int    | `5000`    | Pauza v ms                    |
| `title`          | string | (prázdne)  | Nadpis                        |
| `orderby`        | string | `date`    | Triedenie                     |
| `order`          | string | `DESC`    | Smer                          |

**Príklad:**

```html
[polski_product_slider type="sale" limit="12" title="Akcie" arrows="yes" dots="yes"]
```

### `[polski_nutri_score]`

Zobrazuje hodnotenie Nutri-Score potravinárskeho produktu.

**Parametre:**

| Parameter    | Typ    | Predvolene | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuálny) | ID produktu                   |
| `size`       | string | `medium`   | Veľkosť: small, medium, large |

**Príklad:**

```html
[polski_nutri_score product_id="321" size="large"]
```

### `[polski_checkout_button]`

Zobrazuje tlačidlo nákupu s označením v súlade so smernicou EÚ.

**Parametre:**

| Parameter | Typ    | Predvolene                   | Popis            |
| -------- | ------ | ---------------------------- | ---------------- |
| `text`   | string | `Objednávka s povinnosťou platby` | Text tlačidla |
| `class`  | string | (prázdne)                     | Doplnková CSS trieda |

**Príklad:**

```html
[polski_checkout_button text="Kupujem a platím" class="my-checkout-btn"]
```

### `[polski_legal_checkboxes]`

Zobrazuje právne checkboxy mimo pokladne (napr. na registračnej stránke).

**Parametre:**

| Parameter  | Typ    | Predvolene | Popis                         |
| ---------- | ------ | --------- | ----------------------------- |
| `location` | string | `custom`  | Umiestnenie: checkout, registration, contact, custom |
| `ids`      | string | (prázdne)  | ID checkboxov na zobrazenie   |

**Príklad:**

```html
[polski_legal_checkboxes location="registration"]
```

### `[polski_nip_field]`

Zobrazuje pole NIP s validáciou v reálnom čase (API VIES/GUS).

**Parametre:**

| Parameter  | Typ    | Predvolene | Popis                         |
| ---------- | ------ | --------- | ----------------------------- |
| `required` | string | `no`      | Povinné pole                  |
| `autofill` | string | `yes`     | Automatické dopĺňanie údajov firmy |
| `label`    | string | `NIP`     | Označenie poľa                |

**Príklad:**

```html
[polski_nip_field required="yes" autofill="yes" label="NIP číslo firmy"]
```

### `[polski_greenwashing_info]`

Zobrazuje overené environmentálne informácie produktu (anti-greenwashing).

**Parametre:**

| Parameter    | Typ    | Predvolene | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuálny) | ID produktu                   |
| `fields`     | string | `all`      | Polia: claims, certifications, evidence |

**Príklad:**

```html
[polski_greenwashing_info fields="claims,certifications"]
```

### `[polski_security_incident]`

Zobrazuje formulár na nahlásenie bezpečnostného incidentu (CRA).

**Parametre:**

| Parameter   | Typ    | Predvolene | Popis                         |
| ----------- | ------ | --------- | ----------------------------- |
| `show_info` | string | `yes`     | Informácie o CRA              |

**Príklad:**

```html
[polski_security_incident show_info="yes"]
```

### `[polski_verified_badge]`

Zobrazuje odznak overeného nákupu pri recenzii.

**Parametre:**

| Parameter | Typ    | Predvolene          | Popis                    |
| -------- | ------ | -------------------- | ------------------------ |
| `text`   | string | `Overený nákup`      | Text odznaku             |
| `icon`   | string | `checkmark`          | Ikona: checkmark, shield |

**Príklad:**

```html
[polski_verified_badge text="Potvrdená objednávka" icon="shield"]
```

## Použitie shortcódov v PHP šablónach

Všetky shortcódy možno vyvolať v PHP šablónach:

```php
// Jednotlivý shortcód
echo do_shortcode('[polski_omnibus_price]');

// Shortcód s parametrami
echo do_shortcode('[polski_product_slider type="featured" limit="6"]');

// Podmienené zobrazenie
if (shortcode_exists('polski_gpsr')) {
    echo do_shortcode('[polski_gpsr]');
}
```

## Použitie shortcódov v Gutenberg

V Gutenbergu použi blok **Shortcode** a vlož shortcód. Mnohé shortcódy majú aj vyhradené bloky s náhľadom.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
