---
title: Slider produktů
description: Modul slideru produktů v Polski for WooCommerce - scroll-snap, související, akční a doporučené produkty, blok Gutenberg a shortcode.
---

Slider zobrazuje karusel produktů s plynulým posouváním založeným na CSS scroll-snap. Nevyžaduje externí JS knihovny (Slick, Swiper) - využívá nativní mechanismy prohlížeče.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **Slider produktů**.

## Technologie scroll-snap

Slider používá CSS `scroll-snap-type: x mandatory` namísto karuselových knihoven. Výhody:

- **Žádný JavaScript pro posouvání** - plynulé nativní posouvání
- **Žádné závislosti** - není třeba načítat Slick, Swiper ani Owl Carousel
- **Plná responzivita** - automatické přizpůsobení šířce obrazovky
- **Dotyk a myš** - nativní podpora swipe na dotykových zařízeních
- **Výkon** - žádný reflow/repaint při posouvání, 60 FPS

Konfigurace snap:

```css
/* Slider standardně používá tyto hodnoty */
.polski-slider {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
}

.polski-slider__item {
    scroll-snap-align: start;
}
```

## Typy sliderů

### Související produkty (related)

Produkty související s aktuálně prohlíženým, vybírané na základě kategorií a štítků.

```html
[polski_product_slider type="related" product_id="123"]
```

### Akční produkty (sale)

Produkty s aktivní akční cenou.

```html
[polski_product_slider type="sale" limit="12"]
```

### Doporučené produkty (featured)

Produkty označené jako doporučené (hvězdička v panelu WooCommerce).

```html
[polski_product_slider type="featured" limit="8"]
```

### Bestsellery

Produkty seřazené podle počtu prodejů.

```html
[polski_product_slider type="bestsellers" limit="10"]
```

### Nejnovější

Produkty seřazené podle data přidání.

```html
[polski_product_slider type="latest" limit="10"]
```

### Z vybrané kategorie

Produkty z konkrétní kategorie.

```html
[polski_product_slider type="category" category="elektronika" limit="12"]
```

### Vybrané produkty

Konkrétní produkty zadané podle ID.

```html
[polski_product_slider type="ids" ids="12,34,56,78,90"]
```

## Blok Gutenberg

Blok **Polski - Slider produktů** je dostupný v editoru Gutenberg. Náhled je viditelný okamžitě v editoru.

Možnosti bloku:

| Možnost            | Popis                                     | Výchozí       |
| ------------------- | ---------------------------------------- | ------------- |
| Typ                 | Zdroj produktů (related/sale/featured/atd.) | latest    |
| Limit               | Maximální počet produktů                 | 8             |
| Sloupce             | Počet viditelných produktů (desktop)     | 4             |
| Sloupce tablet      | Viditelné produkty na tabletu            | 2             |
| Sloupce mobil       | Viditelné produkty na telefonu           | 1             |
| Šipky               | Zobrazit navigační šipky                 | Ano           |
| Tečky               | Zobrazit tečky stránkování               | Ne            |
| Automatický scroll  | Automatické posouvání                     | Ne            |
| Mezera (gap)        | Odstup mezi produkty                     | 16px          |
| Nadpis              | Titulek nad sliderem                     | (prázdný)     |

## Shortcode `[polski_product_slider]`

### Parametry

| Parametr        | Typ    | Výchozí    | Popis                                     |
| --------------- | ------ | ---------- | ----------------------------------------- |
| `type`          | string | `latest`   | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | int    | `8`        | Maximální počet produktů                  |
| `columns`       | int    | `4`        | Sloupce na desktopu                       |
| `columns_tablet`| int    | `2`        | Sloupce na tabletu                        |
| `columns_mobile`| int    | `1`        | Sloupce na telefonu                       |
| `category`      | string | (prázdný)  | Slug kategorie (pro type=category)        |
| `ids`           | string | (prázdný)  | ID produktů (pro type=ids)                |
| `product_id`    | int    | (aktuální) | ID produktu (pro type=related)            |
| `arrows`        | string | `yes`      | Zobrazit šipky                            |
| `dots`          | string | `no`       | Zobrazit tečky stránkování                |
| `autoplay`      | string | `no`       | Automatický scroll                        |
| `autoplay_speed`| int    | `5000`     | Odstup mezi snímky (ms)                   |
| `gap`           | string | `16px`     | Odstup mezi kartami produktů              |
| `title`         | string | (prázdný)  | Nadpis nad sliderem                       |
| `orderby`       | string | `date`     | Řazení: date, price, rating, rand         |
| `order`         | string | `DESC`     | Směr: ASC nebo DESC                       |

### Příklady

Slider akčních produktů s nadpisem:

```html
[polski_product_slider type="sale" limit="12" columns="4" title="Aktuální akce" arrows="yes"]
```

Slider produktů z kategorie na hlavní stránce:

```html
[polski_product_slider type="category" category="novinky" limit="8" columns="3" dots="yes"]
```

Automaticky posouvaný slider bestsellerů:

```html
[polski_product_slider type="bestsellers" limit="10" autoplay="yes" autoplay_speed="4000"]
```

## Automatický scroll

Když je `autoplay="yes"`, slider posouvá produkty automaticky. Posouvání se zastaví po najetí kurzorem nebo dotyku na mobilu. Po opuštění slideru se obnoví.

```php
// Změna výchozího času autoplay globálně
add_filter('polski/product_slider/autoplay_speed', function (): int {
    return 3000; // 3 sekundy
});
```

## Integrace s moduly

Karty produktů ve slideru obsahují prvky dalších modulů:

- **Štítky** - odznaky výprodeje, novinky, bestselleru
- **Seznam přání** - ikona srdce
- **Porovnávač** - tlačítko porovnání
- **Rychlý náhled** - ikona oka
- **Cena Omnibus** - nejnižší cena za 30 dní

## Lazy loading obrázků

Obrázky se načítají líně - obrázky mimo viditelnou oblast se stahují až při posunutí. Použit je nativní `loading="lazy"` a `Intersection Observer` pro starší prohlížeče.

## Stylování CSS

- `.polski-slider` - kontejner slideru
- `.polski-slider__track` - dráha scrollu
- `.polski-slider__item` - karta produktu
- `.polski-slider__arrow` - navigační šipka
- `.polski-slider__arrow--prev` - šipka vlevo
- `.polski-slider__arrow--next` - šipka vpravo
- `.polski-slider__dots` - kontejner teček stránkování
- `.polski-slider__dot` - jednotlivá tečka
- `.polski-slider__dot--active` - aktivní tečka
- `.polski-slider__title` - nadpis

## Řešení problémů

**Slider se neposouvá plynule** - zkontrolujte podporu prohlížeče pro `scroll-snap-type` (Chrome 69+, Firefox 68+, Safari 11+).

**Šipky nefungují** - možný konflikt CSS s jiným sliderem. Styly šablony mohou přepisovat třídy `.polski-slider__arrow`.

**Autoplay se nezastavuje** - zkontrolujte, zda optimalizační plugin neblokuje JavaScript. Skript slideru musí být načten.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
