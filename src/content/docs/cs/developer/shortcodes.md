---
title: Shortcody
description: Kompletní seznam 23 shortcodů Polski for WooCommerce s parametry, příklady použití a PHP kódem.
---

23 shortcodů pro zobrazení právních dat, informací o produktu a modulů obchodu na libovolném místě.

## Shortcody právních požadavků

### `[polski_gpsr]`

Zobrazuje informace GPSR (General Product Safety Regulation) pro produkt.

**Parametry:**

| Parametr     | Typ    | Výchozí    | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuální) | ID produktu                   |
| `fields`     | string | `all`      | Pole k zobrazení              |
| `layout`     | string | `list`     | Rozložení: list, table, inline |

**Příklad:**

```html
[polski_gpsr product_id="123" fields="manufacturer,contact,safety" layout="table"]
```

**V šabloně PHP:**

```php
echo do_shortcode('[polski_gpsr]'); // Na stránce produktu - automaticky získá ID
```

### `[polski_omnibus_price]`

Zobrazuje nejnižší cenu za posledních 30 dní (směrnice Omnibus).

**Parametry:**

| Parametr     | Typ    | Výchozí    | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuální) | ID produktu                   |
| `days`       | int    | `30`       | Počet dní zpět                |
| `label`      | string | (výchozí)  | Text popisku                  |
| `show_date`  | string | `no`       | Zobrazit datum nejnižší ceny  |

**Příklad:**

```html
[polski_omnibus_price product_id="456" label="Nejnižší cena za 30 dní:" show_date="yes"]
```

### `[polski_withdrawal_form]`

Zobrazuje formulář odstoupení od smlouvy.

**Parametry:**

| Parametr    | Typ    | Výchozí   | Popis                           |
| ----------- | ------ | --------- | ------------------------------- |
| `order_id`  | int    | (prázdný) | Předvyplnění čísla objednávky   |
| `show_info` | string | `yes`     | Zobrazit informace o právu na odstoupení |
| `redirect`  | string | (prázdný) | URL přesměrování po odeslání    |

**Příklad:**

```html
[polski_withdrawal_form show_info="yes"]
```

**Vyhrazená stránka odstoupení:**

Vytvořte stránku se slugem `odstapienie-od-umowy` a vložte:

```html
<h2>Formulář odstoupení od smlouvy</h2>
<p>V souladu se zákonem o právech spotřebitele máte 14 dní na odstoupení od smlouvy.</p>
[polski_withdrawal_form]
```

### `[polski_dsa_report]`

Zobrazuje formulář hlášení nelegálního obsahu (Digital Services Act).

**Parametry:**

| Parametr     | Typ    | Výchozí   | Popis                         |
| ------------ | ------ | --------- | ----------------------------- |
| `product_id` | int    | (prázdný) | ID produktu k hlášení         |
| `categories` | string | `all`     | Kategorie hlášení             |
| `show_info`  | string | `yes`     | Zobrazit informace o DSA      |

**Příklad:**

```html
[polski_dsa_report categories="illegal_content,counterfeit,safety"]
```

### `[polski_tax_notice]`

Zobrazuje informaci o DPH a nákladech na doručení.

**Parametry:**

| Parametr      | Typ    | Výchozí                    | Popis                    |
| ------------- | ------ | -------------------------- | ------------------------ |
| `text`        | string | `Cena zahrnuje DPH. Náklady na doručení se počítají při pokladně.` | Obsah informace |
| `link_text`   | string | `Náklady na doručení`      | Text odkazu              |
| `link_url`    | string | (prázdný)                  | URL stránky s náklady    |

**Příklad:**

```html
[polski_tax_notice text="Cena s DPH zahrnuje 23 % DPH." link_text="Zkontrolujte náklady na doručení" link_url="/dostawa/"]
```

## Shortcody informací o produktu

### `[polski_unit_price]`

Zobrazuje jednotkovou cenu produktu (např. cena za kg, litr).

**Parametry:**

| Parametr     | Typ    | Výchozí    | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuální) | ID produktu                   |
| `format`     | string | `auto`     | Formát: auto, per_kg, per_l, per_m, per_unit |

**Příklad:**

```html
[polski_unit_price product_id="789" format="per_kg"]
```

### `[polski_delivery_time]`

Zobrazuje odhadovanou dobu dodání.

**Parametry:**

| Parametr     | Typ    | Výchozí    | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuální) | ID produktu                   |
| `format`     | string | `range`    | Formát: range, exact, text    |
| `label`      | string | `Doba dodání:` | Popisek                   |

**Příklad:**

```html
[polski_delivery_time label="Odeslání za:" format="range"]
```

### `[polski_manufacturer]`

Zobrazuje informace o výrobci.

**Parametry:**

| Parametr     | Typ    | Výchozí    | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuální) | ID produktu                   |
| `fields`     | string | `all`      | Pole: name, address, url, logo |
| `link`       | string | `yes`      | Odkazovat na stránku výrobce  |

**Příklad:**

```html
[polski_manufacturer fields="name,logo" link="yes"]
```

### `[polski_nutrients]`

Zobrazuje tabulku výživových hodnot (pro potraviny).

**Parametry:**

| Parametr     | Typ    | Výchozí    | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuální) | ID produktu                   |
| `per`        | string | `100g`     | Hodnoty na: 100g, 100ml, serving |
| `layout`     | string | `table`    | Rozložení: table, list, compact |

**Příklad:**

```html
[polski_nutrients per="serving" layout="compact"]
```

### `[polski_allergens]`

Zobrazuje seznam alergenů (pro potraviny).

**Parametry:**

| Parametr     | Typ    | Výchozí    | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuální) | ID produktu                   |
| `highlight`  | string | `bold`     | Zvýraznění: bold, color, icon |
| `layout`     | string | `inline`   | Rozložení: inline, list       |

**Příklad:**

```html
[polski_allergens highlight="bold" layout="list"]
```

## Shortcody modulů obchodu

### `[polski_wishlist]`

Zobrazuje tabulku seznamu přání.

**Parametry:**

| Parametr    | Typ    | Výchozí   | Popis                         |
| ----------- | ------ | --------- | ----------------------------- |
| `columns`   | string | `all`     | Sloupce k zobrazení           |
| `max_items` | int    | `50`      | Limit produktů                |
| `show_empty`| string | `yes`     | Zpráva prázdného seznamu      |

**Příklad:**

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### `[polski_compare]`

Zobrazuje tabulku porovnání produktů.

**Parametry:**

| Parametr       | Typ    | Výchozí   | Popis                         |
| -------------- | ------ | --------- | ----------------------------- |
| `columns`      | string | `all`     | Vlastnosti k zobrazení        |
| `hide_similar` | string | `no`      | Skrýt shodné vlastnosti       |
| `show_remove`  | string | `yes`     | Tlačítko odstranění           |

**Příklad:**

```html
[polski_compare hide_similar="yes"]
```

### `[polski_ajax_search]`

Zobrazuje AJAX vyhledávač s našeptáváním.

**Parametry:**

| Parametr      | Typ    | Výchozí             | Popis                    |
| ------------- | ------ | ------------------- | ------------------------ |
| `placeholder` | string | `Szukaj produktów…` | Zástupný text            |
| `width`       | string | `100%`              | Šířka pole               |
| `show_icon`   | string | `yes`               | Ikona lupy               |
| `show_cat`    | string | `no`                | Filtr kategorie          |
| `limit`       | int    | `8`                 | Limit našeptávání        |

**Příklad:**

```html
[polski_ajax_search placeholder="Co hledáte?" show_cat="yes" limit="10"]
```

### `[polski_ajax_filters]`

Zobrazuje AJAX filtry pro filtrování produktů.

**Parametry:**

| Parametr     | Typ    | Výchozí    | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | string | `all`      | Typy filtrů                   |
| `style`      | string | `expanded` | Styl: expanded, compact, accordion |
| `show_count` | string | `yes`      | Počítadla produktů            |
| `show_reset` | string | `yes`      | Tlačítko resetování           |
| `columns`    | int    | `1`        | Sloupce filtrů                |
| `ajax`       | string | `yes`      | Režim AJAX                    |

**Příklad:**

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion"]
```

### `[polski_product_slider]`

Zobrazuje karusel produktů.

**Parametry:**

| Parametr         | Typ    | Výchozí   | Popis                         |
| ---------------- | ------ | --------- | ----------------------------- |
| `type`           | string | `latest`  | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`          | int    | `8`       | Limit produktů                |
| `columns`        | int    | `4`       | Sloupce desktop               |
| `columns_tablet` | int    | `2`       | Sloupce tablet                |
| `columns_mobile` | int    | `1`       | Sloupce mobil                 |
| `category`       | string | (prázdný) | Slug kategorie                |
| `ids`            | string | (prázdný) | ID produktů                   |
| `arrows`         | string | `yes`     | Šipky navigace                |
| `dots`           | string | `no`      | Tečky stránkování             |
| `autoplay`       | string | `no`      | Autoplay                      |
| `autoplay_speed` | int    | `5000`    | Prodleva v ms                 |
| `title`          | string | (prázdný) | Nadpis                        |
| `orderby`        | string | `date`    | Řazení                        |
| `order`          | string | `DESC`    | Směr                          |

**Příklad:**

```html
[polski_product_slider type="sale" limit="12" title="Akce" arrows="yes" dots="yes"]
```

### `[polski_nutri_score]`

Zobrazuje hodnocení Nutri-Score potravinového produktu.

**Parametry:**

| Parametr     | Typ    | Výchozí    | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuální) | ID produktu                   |
| `size`       | string | `medium`   | Velikost: small, medium, large |

**Příklad:**

```html
[polski_nutri_score product_id="321" size="large"]
```

### `[polski_checkout_button]`

Zobrazuje tlačítko nákupu s popiskem právně shodným se směrnicí EU.

**Parametry:**

| Parametr | Typ    | Výchozí                      | Popis            |
| -------- | ------ | ---------------------------- | ---------------- |
| `text`   | string | `Objednávka s povinností platby` | Text tlačítka |
| `class`  | string | (prázdný)                    | Dodatečná CSS třída |

**Příklad:**

```html
[polski_checkout_button text="Kupuji a platím" class="my-checkout-btn"]
```

### `[polski_legal_checkboxes]`

Zobrazuje právní checkboxy mimo pokladnu (např. na stránce registrace).

**Parametry:**

| Parametr   | Typ    | Výchozí   | Popis                         |
| ---------- | ------ | --------- | ----------------------------- |
| `location` | string | `custom`  | Umístění: checkout, registration, contact, custom |
| `ids`      | string | (prázdný) | ID checkboxů k zobrazení      |

**Příklad:**

```html
[polski_legal_checkboxes location="registration"]
```

### `[polski_nip_field]`

Zobrazuje pole NIP s validací v reálném čase (API VIES/GUS).

**Parametry:**

| Parametr   | Typ    | Výchozí   | Popis                         |
| ---------- | ------ | --------- | ----------------------------- |
| `required` | string | `no`      | Povinné pole                  |
| `autofill` | string | `yes`     | Automatické doplňování dat firmy |
| `label`    | string | `NIP`     | Popisek pole                  |

**Příklad:**

```html
[polski_nip_field required="yes" autofill="yes" label="Číslo NIP firmy"]
```

### `[polski_greenwashing_info]`

Zobrazuje ověřené environmentální informace produktu (anti-greenwashing).

**Parametry:**

| Parametr     | Typ    | Výchozí    | Popis                         |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuální) | ID produktu                   |
| `fields`     | string | `all`      | Pole: claims, certifications, evidence |

**Příklad:**

```html
[polski_greenwashing_info fields="claims,certifications"]
```

### `[polski_security_incident]`

Zobrazuje formulář hlášení bezpečnostního incidentu (CRA).

**Parametry:**

| Parametr    | Typ    | Výchozí   | Popis                         |
| ----------- | ------ | --------- | ----------------------------- |
| `show_info` | string | `yes`     | Informace o CRA               |

**Příklad:**

```html
[polski_security_incident show_info="yes"]
```

### `[polski_verified_badge]`

Zobrazuje odznak ověřeného nákupu u recenze.

**Parametry:**

| Parametr | Typ    | Výchozí             | Popis                    |
| -------- | ------ | ------------------- | ------------------------ |
| `text`   | string | `Ověřený nákup`     | Text odznaku             |
| `icon`   | string | `checkmark`         | Ikona: checkmark, shield |

**Příklad:**

```html
[polski_verified_badge text="Potvrzená objednávka" icon="shield"]
```

## Použití shortcodů v šablonách PHP

Všechny shortcody lze zavolat v šablonách PHP:

```php
// Jednotlivý shortcode
echo do_shortcode('[polski_omnibus_price]');

// Shortcode s parametry
echo do_shortcode('[polski_product_slider type="featured" limit="6"]');

// Podmíněné zobrazení
if (shortcode_exists('polski_gpsr')) {
    echo do_shortcode('[polski_gpsr]');
}
```

## Použití shortcodů v Gutenbergu

V Gutenbergu použijte blok **Shortcode** a vložte shortcode. Mnoho shortcodů má také vyhrazené bloky s náhledem.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
