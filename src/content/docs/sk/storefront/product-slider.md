---
title: Slider produktov
description: Modul slidera produktov v Polski for WooCommerce - scroll-snap, súvisiace produkty, akciové a odporúčané, Gutenberg blok a shortcód.
---

Slider produktov zobrazuje karusel produktov s plynulým posúvaním založeným na CSS scroll-snap. Modul nevyžaduje externé JavaScript knižnice (Slick, Swiper) - využíva výlučne natívne mechanizmy prehliadača.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Obchodné moduly** a aktivujte možnosť **Slider produktov**.

## Technológia scroll-snap

Slider využíva CSS `scroll-snap-type: x mandatory` namiesto tradičných karuselových knižníc. Výhody:

- **Nula JavaScriptu na posúvanie** - plynulé natívne posúvanie
- **Žiadne závislosti** - netreba načítať Slick, Swiper ani Owl Carousel
- **Plná responzivita** - automatické prispôsobenie šírke obrazovky
- **Dotyk a myš** - natívna podpora swipe na dotykových zariadeniach
- **Výkon** - žiadny reflow/repaint pri posúvaní, 60 FPS

Konfigurácia snap:

```css
/* Slider štandardne používa tieto hodnoty */
.polski-slider {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
}

.polski-slider__item {
    scroll-snap-align: start;
}
```

## Typy sliderov

### Súvisiace produkty (related)

Slider zobrazuje produkty súvisiace s aktuálne prezeraným produktom. Súvisiace produkty sa vyberajú na základe kategórií a štítkov.

```html
[polski_product_slider type="related" product_id="123"]
```

### Produkty v akcii (sale)

Zobrazuje produkty s aktívnou akčnou cenou (sale price).

```html
[polski_product_slider type="sale" limit="12"]
```

### Odporúčané produkty (featured)

Zobrazuje produkty označené ako odporúčané (hviezdička v paneli WooCommerce).

```html
[polski_product_slider type="featured" limit="8"]
```

### Bestsellery

Produkty zoradené podľa celkového počtu predajov.

```html
[polski_product_slider type="bestsellers" limit="10"]
```

### Najnovšie

Produkty zoradené podľa dátumu pridania.

```html
[polski_product_slider type="latest" limit="10"]
```

### Z vybranej kategórie

Produkty z konkrétnej kategórie.

```html
[polski_product_slider type="category" category="elektronika" limit="12"]
```

### Vybrané produkty

Konkrétne produkty podané podľa ID.

```html
[polski_product_slider type="ids" ids="12,34,56,78,90"]
```

## Gutenberg blok

Blok **Polski - Slider produktov** dostupný v editore Gutenberg. Náhľad slidera je viditeľný priamo v editore.

Možnosti bloku:

| Možnosť              | Popis                                     | Predvolené     |
| ------------------- | ---------------------------------------- | ------------- |
| Typ                 | Zdroj produktov (related/sale/featured/atď.) | latest    |
| Limit               | Maximálny počet produktov              | 8             |
| Stĺpce             | Počet viditeľných produktov (desktop)    | 4             |
| Stĺpce tablet      | Viditeľné produkty na tablete            | 2             |
| Stĺpce mobile      | Viditeľné produkty na telefóne           | 1             |
| Šípky              | Zobraziť navigačné šípky                 | Áno           |
| Bodky              | Zobraziť paginačné bodky                 | Nie           |
| Automatický posun  | Automatické posúvanie                    | Nie           |
| Medzera (gap)      | Odstup medzi produktmi                   | 16px          |
| Hlavička           | Nadpis nad sliderom                      | (prázdny)     |

## Shortcód `[polski_product_slider]`

### Parametre

| Parameter        | Typ    | Predvolené  | Popis                                      |
| --------------- | ------ | ---------- | ----------------------------------------- |
| `type`          | string | `latest`   | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | int    | `8`        | Maximálny počet produktov               |
| `columns`       | int    | `4`        | Stĺpce na desktope                      |
| `columns_tablet`| int    | `2`        | Stĺpce na tablete                       |
| `columns_mobile`| int    | `1`        | Stĺpce na telefóne                      |
| `category`      | string | (prázdny)  | Slug kategórie (pre type=category)       |
| `ids`           | string | (prázdny)  | ID produktov (pre type=ids)              |
| `product_id`    | int    | (aktuálny) | ID produktu (pre type=related)           |
| `arrows`        | string | `yes`      | Zobraziť šípky                           |
| `dots`          | string | `no`       | Zobraziť paginačné bodky                 |
| `autoplay`      | string | `no`       | Automatický posun                        |
| `autoplay_speed`| int    | `5000`     | Pauza medzi slajdmi (ms)                 |
| `gap`           | string | `16px`     | Odstup medzi kartami produktov           |
| `title`         | string | (prázdny)  | Hlavička nad sliderom                    |
| `orderby`       | string | `date`     | Zoradenie: date, price, rating, rand     |
| `order`         | string | `DESC`     | Smer: ASC alebo DESC                     |

### Príklady

Slider produktov v akcii s hlavičkou:

```html
[polski_product_slider type="sale" limit="12" columns="4" title="Aktualne promocje" arrows="yes"]
```

Slider produktov z kategórie na hlavnej stránke:

```html
[polski_product_slider type="category" category="nowosci" limit="8" columns="3" dots="yes"]
```

Automaticky posúvaný slider bestsellerov:

```html
[polski_product_slider type="bestsellers" limit="10" autoplay="yes" autoplay_speed="4000"]
```

## Automatický posun

Keď `autoplay="yes"`, slider automaticky posúva produkty každý nastavený čas. Posúvanie sa zastaví, keď používateľ prejde kurzorom nad slider alebo sa ho dotkne na mobilnom zariadení. Po opustení slidera sa automatický posun obnoví.

```php
// Zmena predvoleného času autoplay globálne
add_filter('polski/product_slider/autoplay_speed', function (): int {
    return 3000; // 3 sekundy
});
```

## Integrácia s modulmi

Karty produktov v slideri obsahujú prvky z ďalších modulov:

- **Etikety** - odznaky výpredaja, novinky, bestsellera
- **Zoznam prianí** - ikona srdca
- **Porovnávač** - tlačidlo porovnania
- **Rýchly náhľad** - ikona oka
- **Cena Omnibus** - najnižšia cena za 30 dní

## Lazy loading fotografií

Fotografie produktov v slideri sú načítané lenivo - obrázky mimo viditeľného priestoru nie sú sťahované do momentu posúvania. Využívaný je natívny atribút `loading="lazy"` a `Intersection Observer` pre staršie prehliadače.

## Štýlovanie CSS

- `.polski-slider` - kontajner slidera
- `.polski-slider__track` - posúvacia dráha
- `.polski-slider__item` - karta produktu
- `.polski-slider__arrow` - navigačná šípka
- `.polski-slider__arrow--prev` - šípka vľavo
- `.polski-slider__arrow--next` - šípka vpravo
- `.polski-slider__dots` - kontajner paginačných bodiek
- `.polski-slider__dot` - jednotlivá bodka
- `.polski-slider__dot--active` - aktívna bodka
- `.polski-slider__title` - hlavička

## Riešenie problémov

**Slider sa neposúva plynulo** - uistite sa, že prehliadač podporuje `scroll-snap-type`. Všetky moderné prehliadače (Chrome 69+, Firefox 68+, Safari 11+) túto vlastnosť podporujú.

**Šípky nefungujú** - skontrolujte, či na stránke nie je CSS konflikt s iným sliderom. Triedy `.polski-slider__arrow` môžu byť prepísané štýlmi témy.

**Autoplay sa nezastavuje** - uistite sa, že JavaScript nie je blokovaný optimalizačným pluginom. Skript slidera musí byť načítaný.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
