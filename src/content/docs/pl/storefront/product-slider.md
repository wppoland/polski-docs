---
title: Slider produktów
description: Moduł slidera produktów w Polski for WooCommerce - scroll-snap, produkty powiązane, promocyjne i polecane, blok Gutenberg i shortcode.
---

Slider produktów wyświetla karuzelę produktów z płynnym przewijaniem opartym na CSS scroll-snap. Moduł nie wymaga zewnętrznych bibliotek JavaScript (Slick, Swiper) - korzysta wyłącznie z natywnych mechanizmów przeglądarki.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i aktywuj opcję **Slider produktów**.

## Technologia scroll-snap

Slider korzysta z CSS `scroll-snap-type: x mandatory` zamiast tradycyjnych bibliotek karuzelowych. Zalety:

- **Zero JavaScript do przewijania** - płynne natywne przewijanie
- **Brak zależności** - nie trzeba ładować Slick, Swiper ani Owl Carousel
- **Pełna responsywność** - automatyczne dostosowanie do szerokości ekranu
- **Dotyk i mysz** - natywne wsparcie dla swipe na urządzeniach dotykowych
- **Wydajność** - brak reflow/repaint przy przewijaniu, 60 FPS

Konfiguracja snap:

```css
/* Slider domyślnie stosuje te wartości */
.polski-slider {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
}

.polski-slider__item {
    scroll-snap-align: start;
}
```

## Typy sliderów

### Produkty powiązane (related)

Slider wyświetla produkty powiązane z aktualnie oglądanym produktem. Produkty powiązane dobierane są na podstawie kategorii i tagów.

```html
[polski_product_slider type="related" product_id="123"]
```

### Produkty w promocji (sale)

Wyświetla produkty z aktywną ceną promocyjną (sale price).

```html
[polski_product_slider type="sale" limit="12"]
```

### Produkty polecane (featured)

Wyświetla produkty oznaczone jako polecane (gwiazdka w panelu WooCommerce).

```html
[polski_product_slider type="featured" limit="8"]
```

### Bestsellery

Produkty posortowane po łącznej liczbie sprzedaży.

```html
[polski_product_slider type="bestsellers" limit="10"]
```

### Najnowsze

Produkty posortowane po dacie dodania.

```html
[polski_product_slider type="latest" limit="10"]
```

### Z wybranej kategorii

Produkty z konkretnej kategorii.

```html
[polski_product_slider type="category" category="elektronika" limit="12"]
```

### Wybrane produkty

Konkretne produkty podane po ID.

```html
[polski_product_slider type="ids" ids="12,34,56,78,90"]
```

## Blok Gutenberg

Blok **Polski - Slider produktów** dostępny w edytorze Gutenberg. Podgląd slidera widoczny bezpośrednio w edytorze.

Opcje bloku:

| Opcja              | Opis                                     | Domyślnie     |
| ------------------- | ---------------------------------------- | ------------- |
| Typ                 | Źródło produktów (related/sale/featured/itp.) | latest    |
| Limit               | Maksymalna liczba produktów              | 8             |
| Kolumny             | Liczba widocznych produktów (desktop)    | 4             |
| Kolumny tablet      | Widoczne produkty na tablecie            | 2             |
| Kolumny mobile      | Widoczne produkty na telefonie           | 1             |
| Strzałki            | Pokaż strzałki nawigacji                 | Tak           |
| Kropki              | Pokaż kropki paginacji                   | Nie           |
| Automatyczny scroll | Automatyczne przewijanie                 | Nie           |
| Przerwa (gap)       | Odstęp między produktami                 | 16px          |
| Nagłówek            | Tytuł nad sliderem                       | (pusty)       |

## Shortcode `[polski_product_slider]`

### Parametry

| Parametr        | Typ    | Domyślnie  | Opis                                      |
| --------------- | ------ | ---------- | ----------------------------------------- |
| `type`          | string | `latest`   | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | int    | `8`        | Maksymalna liczba produktów               |
| `columns`       | int    | `4`        | Kolumny na desktopie                      |
| `columns_tablet`| int    | `2`        | Kolumny na tablecie                       |
| `columns_mobile`| int    | `1`        | Kolumny na telefonie                      |
| `category`      | string | (pusty)    | Slug kategorii (dla type=category)        |
| `ids`           | string | (pusty)    | ID produktów (dla type=ids)               |
| `product_id`    | int    | (aktualny) | ID produktu (dla type=related)            |
| `arrows`        | string | `yes`      | Pokaż strzałki                            |
| `dots`          | string | `no`       | Pokaż kropki paginacji                    |
| `autoplay`      | string | `no`       | Automatyczny scroll                       |
| `autoplay_speed`| int    | `5000`     | Przerwa między slajdami (ms)              |
| `gap`           | string | `16px`     | Odstęp między kartami produktów           |
| `title`         | string | (pusty)    | Nagłówek nad sliderem                     |
| `orderby`       | string | `date`     | Sortowanie: date, price, rating, rand     |
| `order`         | string | `DESC`     | Kierunek: ASC lub DESC                    |

### Przykłady

Slider produktów w promocji z nagłówkiem:

```html
[polski_product_slider type="sale" limit="12" columns="4" title="Aktualne promocje" arrows="yes"]
```

Slider produktów z kategorii na stronie głównej:

```html
[polski_product_slider type="category" category="nowosci" limit="8" columns="3" dots="yes"]
```

Automatycznie przewijany slider bestsellerów:

```html
[polski_product_slider type="bestsellers" limit="10" autoplay="yes" autoplay_speed="4000"]
```

## Automatyczny scroll

Gdy `autoplay="yes"`, slider automatycznie przewija produkty co określony czas. Przewijanie zatrzymuje się, gdy użytkownik najedzie kursorem na slider lub dotknie go na urządzeniu mobilnym. Po opuszczeniu slidera automatyczny scroll wznawia się.

```php
// Zmiana domyślnego czasu autoplay globalnie
add_filter('polski/product_slider/autoplay_speed', function (): int {
    return 3000; // 3 sekundy
});
```

## Integracja z modułami

Karty produktów w sliderze zawierają elementy z innych modułów:

- **Etykiety** - odznaki wyprzedaży, nowości, bestsellera
- **Lista życzeń** - ikona serca
- **Porównywarka** - przycisk porównania
- **Szybki podgląd** - ikona oka
- **Cena Omnibus** - najniższa cena z 30 dni

## Lazy loading zdjęć

Zdjęcia produktów w sliderze ładowane są leniwie - obrazy poza widocznym obszarem nie są pobierane do momentu przewinięcia. Wykorzystywany jest natywny atrybut `loading="lazy"` oraz `Intersection Observer` dla starszych przeglądarek.

## Stylowanie CSS

- `.polski-slider` - kontener slidera
- `.polski-slider__track` - ścieżka scroll
- `.polski-slider__item` - karta produktu
- `.polski-slider__arrow` - strzałka nawigacji
- `.polski-slider__arrow--prev` - strzałka w lewo
- `.polski-slider__arrow--next` - strzałka w prawo
- `.polski-slider__dots` - kontener kropek paginacji
- `.polski-slider__dot` - pojedyncza kropka
- `.polski-slider__dot--active` - aktywna kropka
- `.polski-slider__title` - nagłówek

## Rozwiązywanie problemów

**Slider nie przewija się płynnie** - upewnij się, że przeglądarka obsługuje `scroll-snap-type`. Wszystkie nowoczesne przeglądarki (Chrome 69+, Firefox 68+, Safari 11+) obsługują tę właściwość.

**Strzałki nie działają** - sprawdź, czy na stronie nie ma konfliktu CSS z innym sliderem. Klasy `.polski-slider__arrow` mogą być nadpisywane przez style motywu.

**Autoplay nie zatrzymuje się** - upewnij się, że JavaScript nie jest blokowany przez wtyczkę optymalizującą. Skrypt slidera musi być załadowany.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
