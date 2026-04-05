---
title: AJAX vyhledavac
description: Modul AJAX vyhledavace v Polski for WooCommerce - vyhledavani podle SKU, vyrobce, GTIN, REST endpoint, Gutenberg blok, Elementor widget a shortcode.
---

AJAX vyhledavac nahrazuje vychozi vyhledavani WooCommerce inteligentnim vyhledavacem s naseptavanim v realnem case. Vysledky se zobrazuji okamzite behem psani fraze - bez znovunacteni stranky.

## Aktivace modulu

Prejdete do **WooCommerce > Polski > Moduly obchodu** a aktivujte moznost **AJAX vyhledavac**. Modul automaticky nahradi vychozi vyhledavaci widget WooCommerce.

## Prohledavana pole

Vyhledavac prohledava vice poli produktu soucasne:

### SKU (katalogove cislo)

Zakaznik muze zadat cislo SKU produktu nebo jeho cast. Vyhledavani podle SKU je obzvlaste uzitecne v B2B obchodech.

### Vyrobce (manufacturer)

Pokud je modul **Vyrobce** aktivni, vyhledavac zohlednuje nazev vyrobce ve vysledcich.

### GTIN (EAN/UPC)

Vyhledavani podle carovych kodu GTIN/EAN/UPC.

### Doplnkova pole

- Nazev produktu
- Kratky popis
- Kategorie
- Tagy
- Atributy (barva, velikost atd.)

## Vysledky vyhledavani

Dropdown s vysledky zobrazuje:

- Miniaturu produktu
- Nazev produktu (se zvyraznenim odpovidajicich fragmentu)
- Cenu
- Kategorii
- Hodnoceni (hvezdicky)
- Stav dostupnosti

Ve vychozim stavu se zobrazuje az **8 napovedi**. Limit lze zmenit:

```php
add_filter('polski/ajax_search/results_limit', function (): int {
    return 12;
});
```

## REST API endpoint

**Endpoint:** `GET /wp-json/polski/v1/search`

**Parametry:**

| Parametr | Typ | Povinny | Popis |
| -------- | ------ | -------- | ----------------------------- |
| `q` | string | Ano | Faze vyhledavani |
| `limit` | int | Ne | Limit vysledku (vychozi 8) |
| `cat` | int | Ne | ID kategorie k filtrovani |

**Priklad odpovedi:**

```json
{
  "results": [
    {
      "id": 123,
      "title": "Koszulka bawełniana",
      "url": "https://twojsklep.pl/produkt/koszulka-bawelniana/",
      "image": "https://twojsklep.pl/wp-content/uploads/koszulka.jpg",
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

Blok **Polski - AJAX vyhledavac** dostupny v editoru Gutenberg.

## Shortcode `[polski_ajax_search]`

### Parametry

| Parametr | Typ | Vychozi | Popis |
| ------------- | ------ | ------------------- | ---------------------------------- |
| `placeholder` | string | `Szukaj produktów…` | Zastupny text |
| `width` | string | `100%` | Sirka pole |
| `show_icon` | string | `yes` | Zobrazit ikonu lupy |
| `show_cat` | string | `no` | Zobrazit filtr kategorie |
| `limit` | int | `8` | Maximalni pocet napovedi |

### Priklad pouziti

```html
[polski_ajax_search placeholder="Czego szukasz?" show_cat="yes" limit="10"]
```

## Debouncing a vykon

Vyhledavac pouziva debouncing 300 ms - pozadavek na server je odeslan teprve po 300 ms od posledniho stisknuti klavesy. Vysledky jsou cachovany na strane klienta v sezeni prohlizece.

Na strane serveru jsou vysledky cachovany v transient API WordPressu (vychozi 1 hodina).

```php
// Zmena doby cache
add_filter('polski/ajax_search/cache_ttl', function (): int {
    return 1800; // 30 minut v sekundach
});
```

## Stylovani CSS

- `.polski-ajax-search` - kontejner vyhledavace
- `.polski-ajax-search__input` - textove pole
- `.polski-ajax-search__results` - dropdown s vysledky
- `.polski-ajax-search__item` - jednotlivy vysledek
- `.polski-ajax-search__item--active` - zvyrazneny vysledek (klavesova navigace)
- `.polski-ajax-search__highlight` - zvyrazneni odpovidajiciho fragmentu
- `.polski-ajax-search__loading` - spinner nacitani

## Pristupnost

Vyhledavac podporuje uplnou klavesovou navigaci:

- **Sipka dolu/nahoru** - navigace po vysledcich
- **Enter** - prechod k vybranemu produktu
- **Escape** - zavreni dropdown
- ARIA atributy: `role="combobox"`, `aria-expanded`, `aria-activedescendant`

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
