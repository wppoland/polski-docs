---
title: AJAX vyhľadávanie
description: Modul AJAX vyhľadávania v Polski for WooCommerce - vyhľadávanie podľa SKU, výrobcu, GTIN, REST endpoint, Gutenberg blok, Elementor widget a shortcód.
---

AJAX vyhľadávanie nahrádza predvolené vyhľadávanie WooCommerce. Výsledky sa zobrazujú živé počas písania - bez opätovného načítania stránky.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Obchodné moduly** a aktivujte možnosť **AJAX vyhľadávanie**. Modul automaticky nahradí predvolený widget vyhľadávania WooCommerce.

## Vyhľadávané polia

Vyhľadávač prehľadáva viacero polí produktu súčasne:

### SKU (katalógové číslo)

Zákazník môže zadať číslo SKU produktu alebo jeho fragment. Vyhľadávanie podľa SKU je obzvlášť užitočné v B2B obchodoch, kde zákazníci objednávajú produkty podľa katalógových čísiel.

### Výrobca (manufacturer)

Ak je modul **Výrobca** aktívny, vyhľadávač zohľadňuje názov výrobcu vo výsledkoch. Zadanie napr. "Samsung" zobrazí všetky produkty tohto výrobcu.

### GTIN (EAN/UPC)

Vyhľadávanie podľa čiarových kódov GTIN/EAN/UPC. Zákazník môže zadať úplný čiarový kód alebo jeho fragment na nájdenie produktu.

### Ďalšie polia

- Názov produktu
- Krátky popis
- Kategórie
- Štítky
- Atribúty (farba, veľkosť atď.)

Konfigurácia prehľadávaných polí: **WooCommerce > Polski > Obchodné moduly > AJAX vyhľadávanie > Polia vyhľadávania**.

## Výsledky vyhľadávania

Dropdown s výsledkami zobrazuje:

- Miniatúru produktu
- Názov produktu (so zvýraznením zodpovedajúcich fragmentov)
- Cenu
- Kategóriu
- Hodnotenie (hviezdičky)
- Stav dostupnosti

Štandardne sa zobrazuje až **8 návrhov**. Limit je možné zmeniť:

```php
add_filter('polski/ajax_search/results_limit', function (): int {
    return 12;
});
```

Minimálny počet znakov na začatie vyhľadávania je **3**. Zmena:

```php
add_filter('polski/ajax_search/min_chars', function (): int {
    return 2;
});
```

## REST API endpoint

Vyhľadávač využíva vlastný REST API endpoint namiesto `admin-ajax.php`, čo zabezpečuje lepší výkon.

**Endpoint:** `GET /wp-json/polski/v1/search`

**Parametre:**

| Parameter | Typ    | Povinný | Popis                          |
| -------- | ------ | -------- | ----------------------------- |
| `q`      | string | Áno      | Vyhľadávacia fráza            |
| `limit`  | int    | Nie      | Limit výsledkov (štandardne 8)|
| `cat`    | int    | Nie      | ID kategórie na filtrovanie   |

**Príklad požiadavky:**

```bash
curl "https://tvoj-obchod.pl/wp-json/polski/v1/search?q=koszulka&limit=5"
```

**Príklad odpovede:**

```json
{
  "results": [
    {
      "id": 123,
      "title": "Koszulka bawełniana",
      "url": "https://tvoj-obchod.pl/produkt/koszulka-bawelniana/",
      "image": "https://tvoj-obchod.pl/wp-content/uploads/koszulka.jpg",
      "price_html": "<span class=\"amount\">49,00&nbsp;zł</span>",
      "category": "Odzież",
      "in_stock": true,
      "rating": 4.5
    }
  ],
  "total": 1,
  "query": "koszulka"
}
```

## Gutenberg blok

Modul sprístupňuje blok **Polski - AJAX vyhľadávanie** v editore Gutenberg. Blok je možné umiestniť do ľubovoľného príspevku, stránky alebo widgetu.

Možnosti bloku:

- **Placeholder** - zástupný text v poli vyhľadávania
- **Šírka** - šírka poľa (auto, plná, vlastná v px)
- **Ikona** - zobrazenie/skrytie ikony lupy
- **Filter kategórie** - zobrazenie dropdownu filtrovania podľa kategórie vedľa poľa vyhľadávania
- **Štýl** - zaoblené rohy, orámovanie, tieň

Vloženie bloku: v editore Gutenberg kliknite na **+** a vyhľadajte **Polski** alebo **AJAX vyhľadávanie**.

## Elementor widget

Pre používateľov Elementora je dostupný špeciálny widget **Polski AJAX Search**. Widget sa nachádza v kategórii **Polski for WooCommerce** v bočnom paneli Elementora.

Možnosti widgetu zahŕňajú všetky nastavenia Gutenberg bloku a ďalšie:

- Ovládanie typografie (rodina fontu, veľkosť, hrúbka)
- Farby (pozadie, text, orámovanie, hover)
- Okraje a paddingy
- Animácia zobrazovania výsledkov
- Responzivita (nastavenia per breakpoint)

## Shortcód `[polski_ajax_search]`

### Parametre

| Parameter      | Typ    | Predvolené          | Popis                               |
| ------------- | ------ | ------------------- | ---------------------------------- |
| `placeholder` | string | `Szukaj produktów…` | Zástupný text                      |
| `width`       | string | `100%`              | Šírka poľa                         |
| `show_icon`   | string | `yes`               | Zobraziť ikonu lupy                |
| `show_cat`    | string | `no`                | Zobraziť filter kategórie         |
| `limit`       | int    | `8`                 | Maximálny počet návrhov            |

### Príklad použitia

```html
[polski_ajax_search placeholder="Czego szukasz?" show_cat="yes" limit="10"]
```

### Vloženie do hlavičky témy

```php
// V functions.php témy
add_action('wp_body_open', function (): void {
    echo do_shortcode('[polski_ajax_search placeholder="Szukaj..." width="400px"]');
});
```

## Debouncing a výkon

Vyhľadávač používa debouncing 300 ms - požiadavka na server sa odošle až po 300 ms od posledného stlačenia klávesu. Zabraňuje to nadmernému počtu dopytov počas rýchleho písania.

Výsledky sú cachované na strane klienta v relácii prehliadača. Opätovné zadanie rovnakej frázy negeneruje dopyt na server.

Na strane servera sú výsledky cachované v transient API WordPressu (štandardne 1 hodina). Cache sa automaticky čistí po uložení, pridaní alebo odstránení produktu.

```php
// Zmena času cache
add_filter('polski/ajax_search/cache_ttl', function (): int {
    return 1800; // 30 minút v sekundách
});
```

## Štýlovanie CSS

CSS triedy modulu:

- `.polski-ajax-search` - kontajner vyhľadávača
- `.polski-ajax-search__input` - textové pole
- `.polski-ajax-search__results` - dropdown s výsledkami
- `.polski-ajax-search__item` - jednotlivý výsledok
- `.polski-ajax-search__item--active` - zvýraznený výsledok (klávesová navigácia)
- `.polski-ajax-search__highlight` - zvýraznenie zodpovedajúceho fragmentu
- `.polski-ajax-search__loading` - spinner načítania

## Prístupnosť

Vyhľadávač podporuje plnú klávesovú navigáciu:

- **Šípka nadol/nahor** - navigácia po výsledkoch
- **Enter** - prechod na vybraný produkt
- **Escape** - zatvorenie dropdownu
- ARIA atribúty: `role="combobox"`, `aria-expanded`, `aria-activedescendant`

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
