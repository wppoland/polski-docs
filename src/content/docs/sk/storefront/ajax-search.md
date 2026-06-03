---
title: Vyhľadávač AJAX
description: Modul vyhľadávača AJAX v Polski for WooCommerce - vyhľadávanie podľa SKU, výrobcu, GTIN, REST endpoint, blok Gutenberg, widget Elementor a shortcode.
---

Vyhľadávač AJAX nahrádza predvolené vyhľadávanie WooCommerce. Výsledky sa zobrazujú naživo počas písania, bez opätovného načítania stránky.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Moduly obchodu** a zapnite **Vyhľadávač AJAX**. Modul automaticky nahradí predvolený widget vyhľadávania.

![Vyhľadávač AJAX s návrhmi a filtrami na stránke obchodu](../../../../assets/screenshots/screenshot-7-storefront-search-filters.png)

## Prehľadávané polia

Vyhľadávač prehľadáva viac polí produktu naraz:

### SKU (katalógové číslo)

Zákazník môže zadať SKU číslo alebo jeho časť. Užitočné v B2B obchodoch, kde zákazníci objednávajú podľa katalógových čísel.

### Výrobca (manufacturer)

Keď je modul **Výrobca** aktívny, vyhľadávač zohľadňuje názov výrobcu. Zadanie "Samsung" zobrazí všetky produkty tejto značky.

### GTIN (EAN/UPC)

Zákazník môže zadať celý čiarový kód GTIN/EAN/UPC alebo jeho časť.

### Ďalšie polia

- Názov produktu
- Krátky popis
- Kategórie
- Štítky
- Atribúty (farba, veľkosť atď.)

Konfigurácia prehľadávaných polí: **WooCommerce > Polski > Moduly obchodu > Vyhľadávač AJAX > Polia vyhľadávania**.

## Výsledky vyhľadávania

Rozbaľovacie okno s výsledkami zobrazuje:

- Náhľad produktu
- Názov produktu (so zvýraznením zhodných častí)
- Cenu
- Kategóriu
- Hodnotenie (hviezdičky)
- Stav dostupnosti

Predvolene sa zobrazuje až **8 návrhov**. Limit je možné zmeniť:

```php
add_filter('polski/ajax_search/results_limit', function (): int {
    return 12;
});
```

Minimálny počet znakov na spustenie vyhľadávania je **3**. Zmena:

```php
add_filter('polski/ajax_search/min_chars', function (): int {
    return 2;
});
```

## Endpoint REST API

Vyhľadávač používa vlastný REST API endpoint namiesto `admin-ajax.php`. Vďaka tomu funguje rýchlejšie.

**Endpoint:** `GET /wp-json/polski/v1/search`

**Parametre:**

| Parameter | Typ    | Povinný | Popis                          |
| -------- | ------ | -------- | ----------------------------- |
| `q`      | string | Áno      | Hľadaná fráza                  |
| `limit`  | int    | Nie      | Limit výsledkov (predvolene 8) |
| `cat`    | int    | Nie      | ID kategórie na filtrovanie    |

**Príklad požiadavky:**

```bash
curl "https://tvojobchod.sk/wp-json/polski/v1/search?q=tricko&limit=5"
```

**Príklad odpovede:**

```json
{
  "results": [
    {
      "id": 123,
      "title": "Bavlnené tričko",
      "url": "https://tvojobchod.sk/produkt/bavlnene-tricko/",
      "image": "https://tvojobchod.sk/wp-content/uploads/tricko.jpg",
      "price_html": "<span class=\"amount\">49,00&nbsp;zł</span>",
      "category": "Oblečenie",
      "in_stock": true,
      "rating": 4.5
    }
  ],
  "total": 1,
  "query": "tricko"
}
```

## Blok Gutenberg

Blok **Polski - Vyhľadávač AJAX** je dostupný v editore Gutenberg. Umiestnite ho do ľubovoľného príspevku, stránky alebo widgetu.

Možnosti bloku:

- **Placeholder** - zástupný text v poli vyhľadávania
- **Šírka** - šírka poľa (auto, plná, vlastná v px)
- **Ikona** - zobraziť/skryť ikonu lupy
- **Filter kategórií** - zobraziť rozbaľovacie filtrovanie podľa kategórie vedľa poľa vyhľadávania
- **Štýl** - zaoblené rohy, ohraničenie, tieň

V editore kliknite na **+** a vyhľadajte **Polski** alebo **Vyhľadávač AJAX**.

## Widget Elementor

Widget **Polski AJAX Search** je dostupný v kategórii **Polski for WooCommerce** v paneli Elementora.

Okrem možností bloku Gutenberg widget ponúka:

- Ovládanie typografie (rodina písma, veľkosť, hrúbka)
- Farby (pozadie, text, ohraničenie, hover)
- Okraje a odsadenia
- Animácia zobrazenia výsledkov
- Responzívnosť (nastavenia pre jednotlivé breakpointy)

## Shortcode `[polski_ajax_search]`

### Parametre

| Parameter      | Typ    | Predvolene          | Popis                               |
| ------------- | ------ | ------------------- | ---------------------------------- |
| `placeholder` | string | `Hľadať produkty…`  | Zástupný text                       |
| `width`       | string | `100%`              | Šírka poľa                          |
| `show_icon`   | string | `yes`               | Zobraziť ikonu lupy                 |
| `show_cat`    | string | `no`                | Zobraziť filter kategórií           |
| `limit`       | int    | `8`                 | Maximálny počet návrhov             |

### Príklad použitia

```html
[polski_ajax_search placeholder="Čo hľadáte?" show_cat="yes" limit="10"]
```

### Vloženie do hlavičky šablóny

```php
// V functions.php šablóny
add_action('wp_body_open', function (): void {
    echo do_shortcode('[polski_ajax_search placeholder="Hľadať..." width="400px"]');
});
```

## Debouncing a výkon

Vyhľadávač používa debouncing 300 ms, požiadavka sa odošle až 300 ms po poslednom stlačení klávesy. Zabraňuje to nadmernému počtu dopytov pri rýchlom písaní.

Výsledky sa ukladajú do vyrovnávacej pamäte prehliadača. Opätovné zadanie tej istej frázy neodošle dopyt na server.

Na serveri sa výsledky ukladajú do transient API (predvolene 1 hodina). Vyrovnávacia pamäť sa automaticky vyčistí po uložení, pridaní alebo odstránení produktu.

```php
// Zmena času vyrovnávacej pamäte
add_filter('polski/ajax_search/cache_ttl', function (): int {
    return 1800; // 30 minút v sekundách
});
```

## Štýlovanie CSS

CSS triedy modulu:

- `.polski-ajax-search` - kontajner vyhľadávača
- `.polski-ajax-search__input` - textové pole
- `.polski-ajax-search__results` - rozbaľovacie okno s výsledkami
- `.polski-ajax-search__item` - jednotlivý výsledok
- `.polski-ajax-search__item--active` - zvýraznený výsledok (navigácia klávesnicou)
- `.polski-ajax-search__highlight` - zvýraznenie zhodnej časti
- `.polski-ajax-search__loading` - spinner načítavania

## Prístupnosť

Vyhľadávač podporuje navigáciu klávesnicou:

- **Šípka nadol/nahor** - navigácia po výsledkoch
- **Enter** - prechod na vybraný produkt
- **Escape** - zatvorenie rozbaľovacieho okna
- ARIA atribúty: `role="combobox"`, `aria-expanded`, `aria-activedescendant`

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právnu radu. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
