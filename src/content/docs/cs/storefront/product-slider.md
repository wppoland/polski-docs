---
title: Slider produktu
description: Modul slideru produktu v Polski for WooCommerce - scroll-snap, souvisejici produkty, akcni a doporucene produkty, Gutenberg blok a shortcode.
---

Slider produktu zobrazuje karusel produktu s plynulym scrollovanim zalozenym na CSS scroll-snap. Modul nevyzaduje externi JavaScriptove knihovny (Slick, Swiper) - vyuziva vyhradne nativni mechanismy prohlizece.

## Aktivace modulu

Prejdete do **WooCommerce > Polski > Moduly obchodu** a aktivujte moznost **Slider produktu**.

## Technologie scroll-snap

Slider vyuziva CSS `scroll-snap-type: x mandatory` misto tradicnich karuselovych knihoven. Vyhody:

- **Nulovy JavaScript pro scrollovani** - plynule nativni scrollovani
- **Zadne zavislosti** - neni treba nacitat Slick, Swiper ani Owl Carousel
- **Uplna responsivita** - automaticke prizpusobeni sirce obrazovky
- **Dotyk a mys** - nativni podpora swipe na dotykovych zarizenich
- **Vykon** - zadny reflow/repaint pri scrollovani, 60 FPS

## Typy slideru

### Souvisejici produkty (related)

```html
[polski_product_slider type="related" product_id="123"]
```

### Produkty v akci (sale)

```html
[polski_product_slider type="sale" limit="12"]
```

### Doporucene produkty (featured)

```html
[polski_product_slider type="featured" limit="8"]
```

### Bestsellery

```html
[polski_product_slider type="bestsellers" limit="10"]
```

### Nejnovejsi

```html
[polski_product_slider type="latest" limit="10"]
```

### Z vybrane kategorie

```html
[polski_product_slider type="category" category="elektronika" limit="12"]
```

### Vybrane produkty

```html
[polski_product_slider type="ids" ids="12,34,56,78,90"]
```

## Gutenberg blok

Blok **Polski - Slider produktu** dostupny v editoru Gutenberg. Nahled slideru viditelny primo v editoru.

## Shortcode `[polski_product_slider]`

### Parametry

| Parametr | Typ | Vychozi | Popis |
| --------------- | ------ | ---------- | ----------------------------------------- |
| `type` | string | `latest` | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit` | int | `8` | Max pocet produktu |
| `columns` | int | `4` | Sloupce na desktopu |
| `columns_tablet`| int | `2` | Sloupce na tabletu |
| `columns_mobile`| int | `1` | Sloupce na telefonu |
| `category` | string | (prazdny) | Slug kategorie (pro type=category) |
| `ids` | string | (prazdny) | ID produktu (pro type=ids) |
| `arrows` | string | `yes` | Zobrazit sipky |
| `dots` | string | `no` | Zobrazit tecky strankovani |
| `autoplay` | string | `no` | Automaticky scroll |
| `autoplay_speed`| int | `5000` | Pauza mezi slajdy (ms) |
| `gap` | string | `16px` | Mezera mezi kartami produktu |
| `title` | string | (prazdny) | Hlavicka nad sliderem |
| `orderby` | string | `date` | Razeni: date, price, rating, rand |
| `order` | string | `DESC` | Smer: ASC nebo DESC |

### Priklady

Slider produktu v akci s hlavickou:

```html
[polski_product_slider type="sale" limit="12" columns="4" title="Aktualne akce" arrows="yes"]
```

Automaticky scrollovany slider bestselleru:

```html
[polski_product_slider type="bestsellers" limit="10" autoplay="yes" autoplay_speed="4000"]
```

## Stylovani CSS

- `.polski-slider` - kontejner slideru
- `.polski-slider__track` - cesta scrollu
- `.polski-slider__item` - karta produktu
- `.polski-slider__arrow` - sipka navigace
- `.polski-slider__arrow--prev` - sipka vlevo
- `.polski-slider__arrow--next` - sipka vpravo
- `.polski-slider__dots` - kontejner tecek strankovani
- `.polski-slider__dot` - jednotliva tecka
- `.polski-slider__dot--active` - aktivni tecka
- `.polski-slider__title` - hlavicka

## Reseni problemu

**Slider nescrolluje plynule** - ujistete se, ze prohlizec podporuje `scroll-snap-type`. Vsechny moderni prohlizece (Chrome 69+, Firefox 68+, Safari 11+) tuto vlastnost podporuji.

**Sipky nefunguji** - zkontrolujte, zda na strance neni CSS konflikt s jinym sliderem.

**Autoplay se nezastavuje** - ujistete se, ze JavaScript neni blokovan optimalizacnim pluginem.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
