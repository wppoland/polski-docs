---
title: Filtry AJAX
description: Moduł filtrów AJAX w Polski for WooCommerce - filtrowanie po kategoriach, markach, cenie, stanach magazynowych, wyprzedaży, atrybutach, GET fallback, blok Gutenberg i shortcode.
---

Filtry AJAX pozwalają klientom zawężać listę produktów bez przeładowania strony. Filtrowanie odbywa się natychmiast - produkty aktualizują się w czasie rzeczywistym po wybraniu kryteriów.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i aktywuj opcję **Filtry AJAX**. Moduł udostępni filtry jako blok Gutenberg, shortcode oraz widget.

![Filtry AJAX, lista życzeń i porównywarka na stronie sklepu](../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

## Dostępne typy filtrów

### Kategorie

Filtr hierarchiczny z rozwijanym drzewem kategorii. Liczba produktów wyświetlana jest obok każdej kategorii. Puste kategorie są domyślnie ukryte.

Opcje:
- Wyświetlanie jako drzewo lub płaska lista
- Wielokrotny wybór (checkboxy) lub pojedynczy (radio)
- Zwijanie/rozwijanie podkategorii

### Marki (producenci)

Filtr po producencie/marce. Wymaga aktywnego modułu **Producent** w Polski for WooCommerce. Wyświetla listę marek z liczbą produktów.

### Cena

Suwak zakresu cen (range slider) z polami min/max. Zakres automatycznie dostosowuje się do aktualnie wyświetlanych produktów.

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

Filtr pozwalający pokazać tylko produkty dostępne w magazynie. Opcje:

- **W magazynie** - produkty z `stock_status = instock`
- **Na zamówienie** - produkty z `stock_status = onbackorder`
- **Niedostępne** - produkty z `stock_status = outofstock` (ukryte domyślnie)

### Wyprzedaż

Checkbox **Tylko produkty w promocji** - filtruje wyłącznie produkty z aktywną ceną promocyjną.

### Atrybuty produktów

Dynamiczne filtry generowane automatycznie na podstawie atrybutów WooCommerce (kolor, rozmiar, materiał itp.). Każdy atrybut globalny może być użyty jako filtr.

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

Moduł obsługuje tryb fallback bez JavaScript. Gdy JS jest wyłączony lub niedostępny:

- Filtry działają jako standardowy formularz HTML z parametrami GET
- Po zatwierdzeniu strona przeładowuje się z przefiltrowaną listą produktów
- Parametry filtrów zapisywane są w URL, np.: `?pa_color=red&min_price=50&max_price=200`
- Filtrowane URL-e są SEO-friendly i mogą być indeksowane przez wyszukiwarki

Tryb fallback działa automatycznie - nie wymaga dodatkowej konfiguracji.

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

Filtry AJAX współpracują z paginacją WooCommerce. Po zmianie filtra użytkownik wraca na stronę 1 wyników. Paginacja również działa w trybie AJAX - przejście między stronami nie resetuje wybranych filtrów.

## Aktywne filtry

Nad listą produktów wyświetlane są aktywne filtry w formie tagów (chips). Każdy tag ma przycisk X pozwalający usunąć pojedynczy filtr. Przycisk **Wyczyść wszystkie** resetuje wszystkie filtry jednocześnie.

```php
// Zmiana pozycji paska aktywnych filtrów
add_filter('polski/ajax_filters/active_position', function (): string {
    return 'above_products'; // lub 'below_filters', 'both'
});
```

## Wydajność

Zapytania filtrów korzystają z indeksów bazodanowych WooCommerce (`product_meta_lookup`). Dla sklepów z dużą liczbą produktów (10 000+) zalecane jest użycie object cache (Redis/Memcached).

Wyniki filtrowania cachowane są w transient API z kluczem opartym na hashie parametrów filtra. Cache jest czyszczony przy zmianie ceny, stanu magazynowego lub atrybutów produktu.

## Stylowanie CSS

- `.polski-ajax-filters` - kontener filtrów
- `.polski-ajax-filters__section` - sekcja pojedynczego filtra
- `.polski-ajax-filters__title` - nagłówek sekcji
- `.polski-ajax-filters__option` - opcja filtra (checkbox/radio)
- `.polski-ajax-filters__count` - licznik produktów
- `.polski-ajax-filters__reset` - przycisk resetowania
- `.polski-ajax-filters__active` - pasek aktywnych filtrów

## Rozwiązywanie problemów

**Filtry nie aktualizują listy produktów** - upewnij się, że selektor CSS listy produktów jest poprawny. Domyślnie moduł szuka `.products` lub `ul.products`. Niestandardowe motywy mogą używać innego selektora.

**Liczniki pokazują 0** - sprawdź, czy produkty mają przypisane atrybuty, kategorie i stan magazynowy. Pusty atrybut nie będzie liczony.

**Suwak ceny nie działa** - sprawdź, czy na stronie nie ma konfliktu z jQuery UI z innej wtyczki.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
