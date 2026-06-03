---
title: AJAX filtry
description: Modul AJAX filtru v Polski for WooCommerce - filtrovani podle kategorii, znacek, ceny, skladovych stavu, vyprodeje, atributu, GET fallback, blok Gutenberg a shortcode.
---

AJAX filtry umoznuji zakaznikum zuzovat seznam produktu bez znovunacteni stranky. Produkty se aktualizuji v realnem case po vyberu filtru.

## Zapnuti modulu

Prejdete do **WooCommerce > Polski > Moduly obchodu** a zapnete **AJAX filtry**. Filtry jsou dostupne jako blok Gutenberg, shortcode a widget.

![AJAX filtry, seznam prani a porovnavac na strance obchodu](../../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

## Dostupne typy filtru

### Kategorie

Rozbalovaci strom kategorii s poctem produktu vedle kazde. Prazdne kategorie jsou ve vychozim stavu skryte.

Moznosti:
- Zobrazeni jako strom nebo plochy seznam
- Vicenasobny vyber (checkboxy) nebo jednotlivy (radio)
- Sbalovani/rozbalovani podkategorii

### Znacky (vyrobci)

Filtr podle znacky. Vyzaduje aktivni modul **Vyrobce**. Zobrazuje seznam znacek s poctem produktu.

### Cena

Posuvnik cenoveho rozsahu s poli min/max. Rozsah se prizpusobuje aktualne viditelnym produktum.

Moznosti:
- Posuvnik (slider)
- Textova pole min/max
- Cenove intervaly (napr. 0-50 zl, 50-100 zl, 100+ zl)

Konfigurace cenovych intervalu:

```php
add_filter('polski/ajax_filters/price_ranges', function (): array {
    return [
        ['min' => 0, 'max' => 50, 'label' => 'Do 50 zl'],
        ['min' => 50, 'max' => 100, 'label' => '50 - 100 zl'],
        ['min' => 100, 'max' => 200, 'label' => '100 - 200 zl'],
        ['min' => 200, 'max' => 0, 'label' => 'Nad 200 zl'],
    ];
});
```

### Skladovy stav

Filtrovani podle dostupnosti. Moznosti:

- **Skladem** - produkty s `stock_status = instock`
- **Na objednavku** - produkty s `stock_status = onbackorder`
- **Nedostupne** - produkty s `stock_status = outofstock` (ve vychozim stavu skryte)

### Vyprodej

Checkbox **Pouze produkty v akci** - zobrazuje vyhradne produkty s akcni cenou.

### Atributy produktu

Filtry generovane automaticky z atributu WooCommerce (barva, velikost, material atd.). Kazdy globalni atribut muze byt filtrem.

Typy zobrazeni atributu:
- **Seznam checkboxu** - vychozi
- **Swatche barev** - pro atribut s nastavenymi barvami
- **Tlacitka** - kompaktni vyber (napr. velikosti S, M, L, XL)
- **Dropdown** - rozbalovaci seznam

## Fungovani AJAX

Po zmene libovolneho filtru:

1. Je odeslan AJAX pozadavek s vybranymi parametry
2. Na seznamu produktu se zobrazi jemny spinner/skeleton
3. Seznam produktu se aktualizuje bez znovunacteni stranky
4. Pocitadla produktu ve filtrech se aktualizuji
5. Nedostupne moznosti filtru se zesedi (ale nezustanou skryte)
6. URL v prohlizeci se aktualizuje s parametry GET (History API)

## Fallback GET (bez JavaScriptu)

Kdyz je JavaScript vypnuty, filtry funguji jako bezny HTML formular s parametry GET. Stranka se znovu nacita s vyfiltrovanym seznamem. Parametry se ukladaji v URL (napr. `?pa_color=red&min_price=50&max_price=200`), coz je SEO-friendly.

Rezim fallback funguje automaticky - bez dalsi konfigurace.

## Blok Gutenberg

Blok **Polski - AJAX filtry** dostupny v editoru Gutenberg. Umistete ho do postranniho panelu (sidebar) stranky obchodu.

Moznosti bloku:

- **Typy filtru** - vyber, ktere filtry zobrazit
- **Poradi filtru** - drag & drop razeni
- **Styl** - kompaktni, rozbaleny, akordeon
- **Tlacitko resetovani** - zobrazit/skryt tlacitko "Vymazat filtry"
- **Pocitadla** - zobrazit/skryt pocet produktu u kazde moznosti
- **Sbalovani** - ve vychozim stavu sbalene/rozbalene sekce

## Shortcode `[polski_ajax_filters]`

### Parametry

| Parametr     | Typ    | Vychozi   | Popis                                          |
| ------------ | ------ | --------- | --------------------------------------------- |
| `filters`    | string | `all`     | Typy filtru (oddelene carkou)                  |
| `style`      | string | `expanded`| Styl: `expanded`, `compact`, `accordion`      |
| `show_count` | string | `yes`     | Zobrazit pocitadla produktu                   |
| `show_reset` | string | `yes`     | Zobrazit tlacitko resetovani                  |
| `columns`    | int    | `1`       | Pocet sloupcu filtru                           |
| `ajax`       | string | `yes`     | Rezim AJAX (no = pouze GET)                    |

### Priklad pouziti

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion" show_count="yes"]
```

### Filtrovani pouze podle atributu

```html
[polski_ajax_filters filters="pa_color,pa_size,pa_material" style="compact"]
```

### Umisteni do sidebaru sablony

V souboru `sidebar.php` nebo ve widgetech:

```php
echo do_shortcode('[polski_ajax_filters filters="category,price,stock,sale"]');
```

## Integrace se strankovanim

Filtry spolupracuji se strankovanim WooCommerce. Po zmene filtru se vraci stranka 1. Prechod mezi strankami neresetuje filtry.

## Aktivni filtry

Nad seznamem produktu jsou viditelne aktivni filtry jako tagy (chips). Kliknete na X na tagu pro odstraneni filtru. Tlacitko **Vymazat vse** resetuje vsechny filtry najednou.

```php
// Zmena pozice listy aktivnich filtru
add_filter('polski/ajax_filters/active_position', function (): string {
    return 'above_products'; // nebo 'below_filters', 'both'
});
```

## Vykon

Filtry vyuzivaji databazove indexy WooCommerce (`product_meta_lookup`). Pro obchody s 10 000+ produkty je doporuceno object cache (Redis/Memcached).

Vysledky se kesuji v transient API. Cache se cisti pri zmene ceny, skladoveho stavu nebo atributu produktu.

## Stylovani CSS

- `.polski-ajax-filters` - kontejner filtru
- `.polski-ajax-filters__section` - sekce jednotliveho filtru
- `.polski-ajax-filters__title` - zahlavi sekce
- `.polski-ajax-filters__option` - moznost filtru (checkbox/radio)
- `.polski-ajax-filters__count` - pocitadlo produktu
- `.polski-ajax-filters__reset` - tlacitko resetovani
- `.polski-ajax-filters__active` - lista aktivnich filtru

## Reseni problemu

**Filtry neaktualizuji seznam produktu** - zkontrolujte CSS selektor seznamu produktu. Modul hleda `.products` nebo `ul.products`. Vase sablona muze pouzivat jiny selektor.

**Pocitadla ukazuji 0** - zkontrolujte, zda maji produkty prirazene atributy, kategorie a skladovy stav.

**Posuvnik ceny nefunguje** - mozny konflikt s jQuery UI z jineho pluginu.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stranka ma vyhradne informativni charakter a nepredstavuje pravni poradenstvi. Pred nasazenim se poradte s pravnikem. Polski for WooCommerce je open source software (GPLv2) poskytovany bez zaruky.</div>
