---
title: AJAX filtry
description: Modul AJAX filtru v Polski for WooCommerce - filtrovani podle kategorii, znacek, ceny, skladu, vyprodeje, atributu, GET fallback, Gutenberg blok a shortcode.
---

AJAX filtry umoznuji zakaznikum zuzit seznam produktu bez znovunacteni stranky. Produkty se aktualizuji v realnem case po vyberu filtru.

## Aktivace modulu

Prejdete do **WooCommerce > Polski > Moduly obchodu** a aktivujte moznost **AJAX filtry**. Modul zpristupni filtry jako Gutenberg blok, shortcode a widget.

## Dostupne typy filtru

### Kategorie

Hierarchicky filtr s rozbalovacim stromem kategorii. Pocet produktu je zobrazen u kazde kategorie. Prazdne kategorie jsou ve vychozim stavu skryty.

### Znacky (vyrobci)

Filtr podle vyrobce/znacky. Vyzaduje aktivni modul **Vyrobce** v Polski for WooCommerce.

### Cena

Posuvnik cenoveho rozsahu (range slider) s poli min/max. Rozsah se automaticky prizpusobuje aktualne zobrazovanym produktum.

Konfigurace cenovych rozsahu:

```php
add_filter('polski/ajax_filters/price_ranges', function (): array {
    return [
        ['min' => 0, 'max' => 50, 'label' => 'Do 50 zł'],
        ['min' => 50, 'max' => 100, 'label' => '50 - 100 zł'],
        ['min' => 100, 'max' => 200, 'label' => '100 - 200 zł'],
        ['min' => 200, 'max' => 0, 'label' => 'Powyżej 200 zł'],
    ];
});
```

### Stav skladu

Filtr umoznujici zobrazit pouze produkty dostupne na sklade.

### Vyprodej

Checkbox **Pouze produkty v akci** - filtruje vyhradne produkty s aktivni akcni cenou.

### Atributy produktu

Dynamicke filtry generovane automaticky na zaklade atributu WooCommerce (barva, velikost, material atd.).

## AJAX chovani

Po zmene libovolneho filtru:

1. Odesle se AJAX pozadavek s vybranymi parametry
2. Zobrazi se jemny spinner/skeleton na seznamu produktu
3. Seznam produktu se aktualizuje bez znovunacteni stranky
4. Pocitadla produktu ve filtrech se aktualizuji
5. Nedostupne moznosti filtru se vyredi (ale neskryji)
6. URL v prohlizeci se aktualizuje s GET parametry (History API)

## GET fallback (bez JavaScriptu)

Modul podporuje fallback rezim bez JavaScriptu. Kdyz je JS deaktivovan:

- Filtry funguji jako standardni HTML formular s GET parametry
- Po odeslani se stranka znovu nacte s prefiltrovamym seznamem produktu
- Parametry filtru jsou ulozeny v URL
- Filtrovane URL jsou SEO-friendly a mohou byt indexovany vyhledavaci

## Gutenberg blok

Blok **Polski - AJAX filtry** dostupny v editoru Gutenberg. Umistete jej do postranniho panelu (sidebar) stranky obchodu.

## Shortcode `[polski_ajax_filters]`

### Parametry

| Parametr | Typ | Vychozi | Popis |
| ------------ | ------ | --------- | --------------------------------------------- |
| `filters` | string | `all` | Typy filtru (oddelene carkou) |
| `style` | string | `expanded`| Styl: `expanded`, `compact`, `accordion` |
| `show_count` | string | `yes` | Zobrazit pocitadla produktu |
| `show_reset` | string | `yes` | Zobrazit tlacitko resetovani |
| `columns` | int | `1` | Pocet sloupcu filtru |
| `ajax` | string | `yes` | AJAX rezim (no = pouze GET) |

### Priklad pouziti

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion" show_count="yes"]
```

## Stylovani CSS

- `.polski-ajax-filters` - kontejner filtru
- `.polski-ajax-filters__section` - sekce jednotliveho filtru
- `.polski-ajax-filters__title` - hlavicka sekce
- `.polski-ajax-filters__option` - moznost filtru (checkbox/radio)
- `.polski-ajax-filters__count` - pocitadlo produktu
- `.polski-ajax-filters__reset` - tlacitko resetovani
- `.polski-ajax-filters__active` - panel aktivnich filtru

## Reseni problemu

**Filtry neaktualizuji seznam produktu** - ujistete se, ze CSS selektor seznamu produktu je spravny. Ve vychozim stavu modul hleda `.products` nebo `ul.products`.

**Pocitadla ukazuji 0** - zkontrolujte, zda produkty maji prirazene atributy, kategorie a stav skladu.

**Posuvnik ceny nefunguje** - zkontrolujte, zda na strance neni konflikt s jQuery UI z jineho pluginu.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
