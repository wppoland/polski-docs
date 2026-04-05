---
title: Filtry AJAX
description: Moduł filtrów AJAX w Polski for WooCommerce - filtrowanie po kategoriach, markach, cenie, stanach magazynowych, wyprzedaży, atrybutach, GET fallback, blok Gutenberg i shortcode.
---

Filtry AJAX pozwalają klientom zawężać listę produktów bez przeładowania strony. Produkty aktualizują się na żywo po wybraniu filtrów.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **Filtry AJAX**. Filtry dostępne są jako blok Gutenberg, shortcode i widget.

![Filtry AJAX, lista życzeń i porównywarka na stronie sklepu](../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

## Dostępne typy filtrów

### Kategorie

Rozwijane drzewo kategorii z liczbą produktów obok każdej. Puste kategorie są domyślnie ukryte.

Opcje:
- Wyświetlanie jako drzewo lub płaska lista
- Wielokrotny wybór (checkboxy) lub pojedynczy (radio)
- Zwijanie/rozwijanie podkategorii

### Marki (producenci)

Filtr po marce. Wymaga aktywnego modułu **Producent**. Wyświetla listę marek z liczbą produktów.

### Cena

Suwak zakresu cen z polami min/max. Zakres dopasowuje się do aktualnie widocznych produktów.

Opcje:
- Suwak (slider)
- Pola tekstowe min/max
- Przedziały cenowe (np. 0-50 zł, 50-100 zł, 100+ zł)

Konfiguracja przedziałów cenowych:

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

### Stan magazynowy

Filtrowanie po dostępności. Opcje:

- **W magazynie** - produkty z `stock_status = instock`
- **Na zamówienie** - produkty z `stock_status = onbackorder`
- **Niedostępne** - produkty z `stock_status = outofstock` (ukryte domyślnie)

### Wyprzedaż

Checkbox **Tylko produkty w promocji** - pokazuje wyłącznie produkty z ceną promocyjną.

### Atrybuty produktów

Filtry generowane automatycznie z atrybutów WooCommerce (kolor, rozmiar, materiał itp.). Każdy atrybut globalny może być filtrem.

Typy wyświetlania atrybutów:
- **Lista checkboxów** - domyślna
- **Swatche kolorów** - dla atrybutu z ustawionymi kolorami
- **Przyciski** - kompaktowy wybór (np. rozmiary S, M, L, XL)
- **Dropdown** - lista rozwijana

## Działanie AJAX

Po zmianie dowolnego filtra:

1. Wysyłane jest żądanie AJAX z wybranymi parametrami
2. Wyświetlany jest delikatny spinner/skeleton na liście produktów
3. Lista produktów aktualizuje się bez przeładowania strony
4. Liczniki produktów w filtrach aktualizują się
5. Niedostępne opcje filtrów zostają wyszarzone (ale nie ukryte)
6. URL w przeglądarce aktualizuje się z parametrami GET (History API)

## Fallback GET (bez JavaScript)

Gdy JavaScript jest wyłączony, filtry działają jako zwykły formularz HTML z parametrami GET. Strona przeładowuje się z przefiltrowaną listą. Parametry zapisują się w URL (np. `?pa_color=red&min_price=50&max_price=200`), co jest SEO-friendly.

Tryb fallback działa automatycznie - bez dodatkowej konfiguracji.

## Blok Gutenberg

Blok **Polski - Filtry AJAX** dostępny w edytorze Gutenberg. Umieść go na pasku bocznym (sidebar) strony sklepu.

Opcje bloku:

- **Typy filtrów** - wybór, które filtry wyświetlać
- **Kolejność filtrów** - drag & drop sortowanie
- **Styl** - kompaktowy, rozwinięty, akordeon
- **Przycisk resetowania** - pokaż/ukryj przycisk "Wyczyść filtry"
- **Liczniki** - pokaż/ukryj liczbę produktów przy każdej opcji
- **Zwijanie** - domyślnie zwinięte/rozwinięte sekcje

## Shortcode `[polski_ajax_filters]`

### Parametry

| Parametr     | Typ    | Domyślnie | Opis                                          |
| ------------ | ------ | --------- | --------------------------------------------- |
| `filters`    | string | `all`     | Typy filtrów (oddzielone przecinkiem)          |
| `style`      | string | `expanded`| Styl: `expanded`, `compact`, `accordion`      |
| `show_count` | string | `yes`     | Pokaż liczniki produktów                      |
| `show_reset` | string | `yes`     | Pokaż przycisk resetowania                    |
| `columns`    | int    | `1`       | Liczba kolumn filtrów                          |
| `ajax`       | string | `yes`     | Tryb AJAX (no = tylko GET)                     |

### Przykład użycia

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion" show_count="yes"]
```

### Filtrowanie tylko po atrybutach

```html
[polski_ajax_filters filters="pa_color,pa_size,pa_material" style="compact"]
```

### Umieszczenie w sidebarze motywu

W pliku `sidebar.php` lub w widgetach:

```php
echo do_shortcode('[polski_ajax_filters filters="category,price,stock,sale"]');
```

## Integracja z paginacją

Filtry współpracują z paginacją WooCommerce. Po zmianie filtra wraca strona 1. Przejście między stronami nie resetuje filtrów.

## Aktywne filtry

Nad listą produktów widoczne są aktywne filtry jako tagi (chips). Kliknij X na tagu, aby usunąć filtr. Przycisk **Wyczyść wszystkie** resetuje wszystkie filtry naraz.

```php
// Zmiana pozycji paska aktywnych filtrów
add_filter('polski/ajax_filters/active_position', function (): string {
    return 'above_products'; // lub 'below_filters', 'both'
});
```

## Wydajność

Filtry korzystają z indeksów bazodanowych WooCommerce (`product_meta_lookup`). Dla sklepów z 10 000+ produktów zalecany jest object cache (Redis/Memcached).

Wyniki cachują się w transient API. Cache czyści się przy zmianie ceny, stanu magazynowego lub atrybutów produktu.

## Stylowanie CSS

- `.polski-ajax-filters` - kontener filtrów
- `.polski-ajax-filters__section` - sekcja pojedynczego filtra
- `.polski-ajax-filters__title` - nagłówek sekcji
- `.polski-ajax-filters__option` - opcja filtra (checkbox/radio)
- `.polski-ajax-filters__count` - licznik produktów
- `.polski-ajax-filters__reset` - przycisk resetowania
- `.polski-ajax-filters__active` - pasek aktywnych filtrów

## Rozwiązywanie problemów

**Filtry nie aktualizują listy produktów** - sprawdź selektor CSS listy produktów. Moduł szuka `.products` lub `ul.products`. Twój motyw może używać innego selektora.

**Liczniki pokazują 0** - sprawdź, czy produkty mają przypisane atrybuty, kategorie i stan magazynowy.

**Suwak ceny nie działa** - możliwy konflikt z jQuery UI z innej wtyczki.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
