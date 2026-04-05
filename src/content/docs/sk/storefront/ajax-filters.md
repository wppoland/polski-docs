---
title: AJAX filtre
description: Modul AJAX filtrov v Polski for WooCommerce - filtrovanie podľa kategórií, značiek, ceny, skladových stavov, výpredaja, atribútov, GET fallback, Gutenberg blok a shortcód.
---

AJAX filtre umožňujú zákazníkom zužovať zoznam produktov bez opätovného načítania stránky. Produkty sa aktualizujú živé po výbere filtrov.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Obchodné moduly** a aktivujte možnosť **AJAX filtre**. Modul sprístupní filtre ako Gutenberg blok, shortcód a widget.

## Dostupné typy filtrov

### Kategórie

Hierarchický filter s rozbaľovacím stromom kategórií. Počet produktov sa zobrazuje vedľa každej kategórie. Prázdne kategórie sú štandardne skryté.

Možnosti:
- Zobrazenie ako strom alebo plochý zoznam
- Viacnásobný výber (checkboxy) alebo jednoduchý (radio)
- Zbaľovanie/rozbaľovanie podkategórií

### Značky (výrobcovia)

Filter podľa výrobcu/značky. Vyžaduje aktívny modul **Výrobca** v Polski for WooCommerce. Zobrazuje zoznam značiek s počtom produktov.

### Cena

Posuvník cenového rozsahu (range slider) s poľami min/max. Rozsah sa automaticky prispôsobuje aktuálne zobrazeným produktom.

Možnosti:
- Posuvník (slider)
- Textové polia min/max
- Cenové intervaly (napr. 0-50 PLN, 50-100 PLN, 100+ PLN)

Konfigurácia cenových intervalov:

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

Filter umožňujúci zobraziť len produkty dostupné na sklade. Možnosti:

- **Na sklade** - produkty s `stock_status = instock`
- **Na objednávku** - produkty s `stock_status = onbackorder`
- **Nedostupné** - produkty s `stock_status = outofstock` (štandardne skryté)

### Výpredaj

Checkbox **Len produkty v akcii** - filtruje výlučne produkty s aktívnou akčnou cenou.

### Atribúty produktov

Dynamické filtre generované automaticky na základe atribútov WooCommerce (farba, veľkosť, materiál atď.). Každý globálny atribút môže byť použitý ako filter.

Typy zobrazovania atribútov:
- **Zoznam checkboxov** - predvolený
- **Farebné vzorky** - pre atribút s nastavenými farbami
- **Tlačidlá** - kompaktný výber (napr. veľkosti S, M, L, XL)
- **Dropdown** - rozbaľovací zoznam

## Funkcia AJAX

Po zmene ľubovoľného filtra:

1. Odošle sa AJAX požiadavka s vybranými parametrami
2. Zobrazí sa jemný spinner/skeleton na zozname produktov
3. Zoznam produktov sa aktualizuje bez opätovného načítania stránky
4. Počítadlá produktov vo filtroch sa aktualizujú
5. Nedostupné možnosti filtrov sa zošednú (ale neskryjú)
6. URL v prehliadači sa aktualizuje s GET parametrami (History API)

## Fallback GET (bez JavaScriptu)

Modul podporuje fallback režim bez JavaScriptu. Keď je JS vypnutý alebo nedostupný:

- Filtre fungujú ako štandardný HTML formulár s GET parametrami
- Po potvrdení sa stránka opätovne načíta s prefiltrovaným zoznamom produktov
- Parametre filtrov sú uložené v URL, napr.: `?pa_color=red&min_price=50&max_price=200`
- Filtrované URL sú SEO-friendly a môžu byť indexované vyhľadávačmi

Fallback režim funguje automaticky - nevyžaduje ďalšiu konfiguráciu.

## Gutenberg blok

Blok **Polski - AJAX filtre** dostupný v editore Gutenberg. Umiestnite ho na bočnom paneli (sidebar) stránky obchodu.

Možnosti bloku:

- **Typy filtrov** - výber, ktoré filtre zobrazovať
- **Poradie filtrov** - drag & drop triedenie
- **Štýl** - kompaktný, rozbalený, akordeón
- **Tlačidlo resetovania** - zobrazenie/skrytie tlačidla "Vyčistiť filtre"
- **Počítadlá** - zobrazenie/skrytie počtu produktov pri každej možnosti
- **Zbaľovanie** - štandardne zbalené/rozbalené sekcie

## Shortcód `[polski_ajax_filters]`

### Parametre

| Parameter     | Typ    | Predvolené | Popis                                          |
| ------------ | ------ | --------- | --------------------------------------------- |
| `filters`    | string | `all`     | Typy filtrov (oddelené čiarkou)               |
| `style`      | string | `expanded`| Štýl: `expanded`, `compact`, `accordion`      |
| `show_count` | string | `yes`     | Zobraziť počítadlá produktov                  |
| `show_reset` | string | `yes`     | Zobraziť tlačidlo resetovania                 |
| `columns`    | int    | `1`       | Počet stĺpcov filtrov                         |
| `ajax`       | string | `yes`     | AJAX režim (no = len GET)                     |

### Príklad použitia

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion" show_count="yes"]
```

### Filtrovanie len podľa atribútov

```html
[polski_ajax_filters filters="pa_color,pa_size,pa_material" style="compact"]
```

### Umiestnenie v sidebari témy

V súbore `sidebar.php` alebo vo widgetoch:

```php
echo do_shortcode('[polski_ajax_filters filters="category,price,stock,sale"]');
```

## Integrácia s pagináciou

AJAX filtre spolupracujú s pagináciou WooCommerce. Po zmene filtra sa používateľ vráti na stránku 1 výsledkov. Paginácia tiež funguje v AJAX režime - prechod medzi stránkami neresetuje vybrané filtre.

## Aktívne filtre

Nad zoznamom produktov sa zobrazujú aktívne filtre vo forme štítkov (chips). Každý štítok má tlačidlo X umožňujúce odstrániť jednotlivý filter. Tlačidlo **Vyčistiť všetky** resetuje všetky filtre súčasne.

```php
// Zmena pozície lišty aktívnych filtrov
add_filter('polski/ajax_filters/active_position', function (): string {
    return 'above_products'; // alebo 'below_filters', 'both'
});
```

## Výkon

Dopyty filtrov využívajú databázové indexy WooCommerce (`product_meta_lookup`). Pre obchody s veľkým počtom produktov (10 000+) sa odporúča použitie object cache (Redis/Memcached).

Výsledky filtrovania sú cachované v transient API s kľúčom založeným na hashi parametrov filtra. Cache sa čistí pri zmene ceny, stavu skladu alebo atribútov produktu.

## Štýlovanie CSS

- `.polski-ajax-filters` - kontajner filtrov
- `.polski-ajax-filters__section` - sekcia jednotlivého filtra
- `.polski-ajax-filters__title` - hlavička sekcie
- `.polski-ajax-filters__option` - možnosť filtra (checkbox/radio)
- `.polski-ajax-filters__count` - počítadlo produktov
- `.polski-ajax-filters__reset` - tlačidlo resetovania
- `.polski-ajax-filters__active` - lišta aktívnych filtrov

## Riešenie problémov

**Filtre neaktualizujú zoznam produktov** - uistite sa, že CSS selektor zoznamu produktov je správny. Štandardne modul hľadá `.products` alebo `ul.products`. Neštandardné témy môžu používať iný selektor.

**Počítadlá zobrazujú 0** - skontrolujte, či produkty majú priradené atribúty, kategórie a stav skladu. Prázdny atribút nebude počítaný.

**Posuvník ceny nefunguje** - skontrolujte, či na stránke nie je konflikt s jQuery UI z iného pluginu.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
