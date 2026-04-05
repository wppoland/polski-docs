---
title: Bloki Gutenberg
description: Bloki Gutenberg w Polski for WooCommerce - wyszukiwarka AJAX, filtry AJAX i slider produktów z podglądem w edytorze.
---

Trzy bloki Gutenberg do wstawiania modułów sklepowych. Każdy blok ma podgląd w edytorze (server-side render) i konfigurację w panelu bocznym.

## Wymagania

- WordPress 6.0 lub nowszy
- Edytor blokowy Gutenberg (nie klasyczny edytor)
- Aktywny odpowiedni moduł w ustawieniach Polski for WooCommerce

## Wstawianie bloków

Znajdź bloki w inserterze (przycisk **+**) w kategorii **Polski for WooCommerce**. Lub wyszukaj wpisując "Polski".

## Blok: wyszukiwarka AJAX

**Nazwa bloku:** `polski/ajax-search`

Pole wyszukiwania z podpowiedziami AJAX. Wyniki pojawiają się w dropdownie podczas wpisywania.

### Atrybuty bloku

| Atrybut        | Typ    | Domyślnie          | Opis                          |
| -------------- | ------ | ------------------- | ----------------------------- |
| `placeholder`  | string | `Szukaj produktów…` | Tekst zastępczy w polu        |
| `width`        | string | `100%`              | Szerokość pola                |
| `showIcon`     | bool   | `true`              | Ikona lupy                    |
| `showCategory` | bool   | `false`             | Dropdown filtrowania po kategorii |
| `limit`        | number | `8`                 | Limit podpowiedzi             |
| `minChars`     | number | `3`                 | Min. znaków do wyszukania     |
| `style`        | string | `default`           | Styl: default, rounded, flat  |

### Panel boczny (Inspector Controls)

Panel boczny bloku zawiera sekcje:

**Ustawienia wyszukiwania:**
- Tekst zastępczy (placeholder)
- Minimalna liczba znaków
- Limit wyników
- Filtr kategorii (tak/nie)

**Wygląd:**
- Szerokość pola
- Styl (domyślny, zaokrąglony, płaski)
- Ikona lupy (tak/nie)
- Obramowanie (tak/nie)
- Cień (tak/nie)

**Zaawansowane:**
- Dodatkowe klasy CSS
- HTML anchor (kotwica)

### Przykład rejestracji bloku (wewnętrzna implementacja)

```php
register_block_type('polski/ajax-search', [
    'api_version'     => 3,
    'editor_script'   => 'polski-blocks-editor',
    'editor_style'    => 'polski-blocks-editor-style',
    'style'           => 'polski-blocks-style',
    'render_callback' => [AjaxSearchBlock::class, 'render'],
    'attributes'      => [
        'placeholder' => [
            'type'    => 'string',
            'default' => __('Szukaj produktów…', 'polski'),
        ],
        'width' => [
            'type'    => 'string',
            'default' => '100%',
        ],
        'showIcon' => [
            'type'    => 'boolean',
            'default' => true,
        ],
        'showCategory' => [
            'type'    => 'boolean',
            'default' => false,
        ],
        'limit' => [
            'type'    => 'number',
            'default' => 8,
        ],
    ],
]);
```

### Filtr renderowania

```php
add_filter('polski/blocks/ajax_search/output', function (string $html, array $attributes): string {
    // Modyfikacja HTML bloku
    return $html;
}, 10, 2);
```

## Blok: filtry AJAX

**Nazwa bloku:** `polski/ajax-filters`

Filtry AJAX do filtrowania produktów bez przeładowania strony.

### Atrybuty bloku

| Atrybut      | Typ    | Domyślnie  | Opis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | array  | `['category', 'price', 'stock']` | Aktywne filtry |
| `style`      | string | `expanded` | Styl: expanded, compact, accordion |
| `showCount`  | bool   | `true`     | Liczniki produktów            |
| `showReset`  | bool   | `true`     | Przycisk resetowania          |
| `columns`    | number | `1`        | Kolumny filtrów               |
| `collapsible`| bool   | `true`     | Zwijane sekcje                |

### Panel boczny

**Wybór filtrów:**
- Checkboxy dla każdego typu filtra
- Drag & drop sortowanie kolejności filtrów
- Konfiguracja per filtr (np. przedziały cenowe)

**Wygląd:**
- Styl wyświetlania (rozwinięty, kompaktowy, akordeon)
- Liczba kolumn
- Liczniki (tak/nie)
- Przycisk resetowania (tak/nie)
- Domyślnie zwinięte/rozwinięte

**Zaawansowane:**
- Tryb AJAX / GET fallback
- Dodatkowe klasy CSS

### Dostępne filtry

Blok automatycznie wykrywa dostępne filtry na podstawie danych produktów:

| Filtr       | Typ          | Opis                          |
| ----------- | ------------ | ----------------------------- |
| `category`  | Hierarchia   | Kategorie produktów           |
| `price`     | Range slider | Zakres cenowy                 |
| `stock`     | Checkbox     | Status magazynowy             |
| `sale`      | Checkbox     | Tylko w promocji              |
| `brand`     | Lista        | Producent/marka               |
| `pa_*`      | Lista/Swatch | Atrybuty produktów            |
| `rating`    | Gwiazdki     | Ocena klientów                |

### Filtr renderowania

```php
add_filter('polski/blocks/ajax_filters/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);
```

### Umieszczenie w sidebarze

Najlepiej działa w sidebarze. W motywie blokowym (FSE) dodaj go do szablonu **Archive: Product**. W motywach klasycznych użyj w widgetach **Sidebar sklepu**.

## Blok: slider produktów

**Nazwa bloku:** `polski/product-slider`

Karuzela produktów z nawigacją strzałkami i opcjonalnymi kropkami paginacji.

### Atrybuty bloku

| Atrybut         | Typ    | Domyślnie | Opis                          |
| --------------- | ------ | --------- | ----------------------------- |
| `type`          | string | `latest`  | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | number | `8`       | Limit produktów               |
| `columns`       | number | `4`       | Kolumny desktop               |
| `columnsTablet` | number | `2`       | Kolumny tablet                |
| `columnsMobile` | number | `1`       | Kolumny mobile                |
| `category`      | string | ``        | Slug kategorii                |
| `productIds`    | array  | `[]`      | ID produktów                  |
| `showArrows`    | bool   | `true`    | Strzałki nawigacji            |
| `showDots`      | bool   | `false`   | Kropki paginacji              |
| `autoplay`      | bool   | `false`   | Automatyczne przewijanie      |
| `autoplaySpeed` | number | `5000`    | Przerwa między slajdami (ms)  |
| `gap`           | string | `16px`    | Odstęp między kartami         |
| `title`         | string | ``        | Nagłówek                      |
| `orderby`       | string | `date`    | Sortowanie                    |
| `order`         | string | `DESC`    | Kierunek                      |

### Panel boczny

**Źródło produktów:**
- Typ slidera (dropdown z opcjami)
- Wybór kategorii (dla type=category)
- Wybór produktów (dla type=ids) - wyszukiwarka z autouzupełnianiem
- Limit produktów
- Sortowanie

**Wyświetlanie:**
- Kolumny (desktop / tablet / mobile)
- Odstęp (gap)
- Strzałki (tak/nie)
- Kropki (tak/nie)
- Nagłówek

**Animacja:**
- Autoplay (tak/nie)
- Prędkość autoplay (slider 1000-10000 ms)
- Pauza przy hover

### Podgląd w edytorze

Podgląd w edytorze pokazuje rzeczywiste produkty z bazy. Bez pasujących produktów blok wyświetla placeholder.

### Filtr renderowania

```php
add_filter('polski/blocks/product_slider/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);

// Modyfikacja zapytania produktów
add_filter('polski/blocks/product_slider/query_args', function (array $args, array $attributes): array {
    // Wyklucz produkty z kategorii "ukryte"
    $args['tax_query'][] = [
        'taxonomy' => 'product_cat',
        'field'    => 'slug',
        'terms'    => 'ukryte',
        'operator' => 'NOT IN',
    ];
    return $args;
}, 10, 2);
```

## Kompatybilność z motywami blokowymi (FSE)

Bloki w pełni wspierają motywy blokowe (FSE). Wstawiaj je w:

- Szablonach stron (Page Templates)
- Szablonach archiwów produktów
- Częściach szablonów (Template Parts) - nagłówek, stopka, sidebar
- Wzorcach (Patterns)

## Stylowanie bloków

Klasy CSS zgodne z konwencją BEM. Bloki obsługują natywne ustawienia stylów Gutenberg:

- Kolory (tekst, tło)
- Typografia (rozmiar, grubość, rodzina fontu)
- Marginesy i paddingi (spacing)
- Obramowanie (border)

## Rozwiązywanie problemów

**Bloki nie pojawiają się w inserterze** - upewnij się, że odpowiedni moduł jest aktywny w **WooCommerce > Polski > Moduły sklepowe**. Bloki wymagają aktywacji odpowiedniego modułu.

**Podgląd bloku jest pusty** - sprawdź, czy sklep ma produkty pasujące do wybranego typu. Pusta baza produktów nie wygeneruje podglądu.

**Bloki nie działają w Elementorze** - te bloki są przeznaczone dla edytora Gutenberg. Dla Elementora użyj shortcodów lub dedykowanych widgetów Elementor (dostępnych dla wyszukiwarki AJAX).

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
