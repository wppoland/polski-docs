---
title: Wyszukiwarka AJAX
description: Moduł wyszukiwarki AJAX w Polski for WooCommerce - wyszukiwanie po SKU, producencie, GTIN, endpoint REST, blok Gutenberg, widget Elementor i shortcode.
---

Wyszukiwarka AJAX zastępuje domyślne wyszukiwanie WooCommerce. Wyniki pojawiają się na żywo podczas wpisywania - bez przeładowania strony.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **Wyszukiwarka AJAX**. Moduł automatycznie zastąpi domyślny widget wyszukiwania.

![Wyszukiwarka AJAX z podpowiedziami i filtrami na stronie sklepu](../../../assets/screenshots/screenshot-7-storefront-search-filters.png)

## Wyszukiwane pola

Wyszukiwarka przeszukuje wiele pól produktu naraz:

### SKU (numer katalogowy)

Klient może wpisać numer SKU lub jego fragment. Przydatne w sklepach B2B, gdzie klienci zamawiają po numerach katalogowych.

### Producent (manufacturer)

Gdy moduł **Producent** jest aktywny, wyszukiwarka uwzględnia nazwę producenta. Wpisanie "Samsung" pokaże wszystkie produkty tej marki.

### GTIN (EAN/UPC)

Klient może wpisać pełny kod kreskowy GTIN/EAN/UPC lub jego fragment.

### Dodatkowe pola

- Nazwa produktu
- Opis krótki
- Kategorie
- Tagi
- Atrybuty (kolor, rozmiar itp.)

Konfiguracja przeszukiwanych pól: **WooCommerce > Polski > Moduły sklepowe > Wyszukiwarka AJAX > Pola wyszukiwania**.

## Wyniki wyszukiwania

Dropdown z wynikami wyświetla:

- Miniaturkę produktu
- Nazwę produktu (z podświetleniem pasujących fragmentów)
- Cenę
- Kategorię
- Ocenę (gwiazdki)
- Status dostępności

Domyślnie wyświetlanych jest do **8 podpowiedzi**. Limit można zmienić:

```php
add_filter('polski/ajax_search/results_limit', function (): int {
    return 12;
});
```

Minimalna liczba znaków do rozpoczęcia wyszukiwania to **3**. Zmiana:

```php
add_filter('polski/ajax_search/min_chars', function (): int {
    return 2;
});
```

## Endpoint REST API

Wyszukiwarka korzysta z własnego endpointu REST API zamiast `admin-ajax.php`. Dzięki temu działa szybciej.

**Endpoint:** `GET /wp-json/polski/v1/search`

**Parametry:**

| Parametr | Typ    | Wymagany | Opis                          |
| -------- | ------ | -------- | ----------------------------- |
| `q`      | string | Tak      | Fraza wyszukiwania            |
| `limit`  | int    | Nie      | Limit wyników (domyślnie 8)   |
| `cat`    | int    | Nie      | ID kategorii do filtrowania   |

**Przykład żądania:**

```bash
curl "https://twojsklep.pl/wp-json/polski/v1/search?q=koszulka&limit=5"
```

**Przykład odpowiedzi:**

```json
{
  "results": [
    {
      "id": 123,
      "title": "Koszulka bawełniana",
      "url": "https://twojsklep.pl/produkt/koszulka-bawelniana/",
      "image": "https://twojsklep.pl/wp-content/uploads/koszulka.jpg",
      "price_html": "<span class=\"amount\">49,00&nbsp;zł</span>",
      "category": "Odzież",
      "in_stock": true,
      "rating": 4.5
    }
  ],
  "total": 1,
  "query": "koszulka"
}
```

## Blok Gutenberg

Blok **Polski - Wyszukiwarka AJAX** dostępny w edytorze Gutenberg. Umieść go w dowolnym poście, stronie lub widgecie.

Opcje bloku:

- **Placeholder** - tekst zastępczy w polu wyszukiwania
- **Szerokość** - szerokość pola (auto, pełna, niestandardowa w px)
- **Ikona** - pokaż/ukryj ikonę lupy
- **Filtr kategorii** - pokaż dropdown filtrowania po kategorii obok pola wyszukiwania
- **Styl** - zaokrąglone rogi, obramowanie, cień

W edytorze kliknij **+** i wyszukaj **Polski** lub **Wyszukiwarka AJAX**.

## Widget Elementor

Widget **Polski AJAX Search** dostępny w kategorii **Polski for WooCommerce** w panelu Elementora.

Oprócz opcji bloku Gutenberg, widget oferuje:

- Kontrola typografii (rodzina fontu, rozmiar, grubość)
- Kolory (tło, tekst, obramowanie, hover)
- Marginesy i paddingi
- Animacja pojawiania się wyników
- Responsywność (ustawienia per breakpoint)

## Shortcode `[polski_ajax_search]`

### Parametry

| Parametr      | Typ    | Domyślnie          | Opis                               |
| ------------- | ------ | ------------------- | ---------------------------------- |
| `placeholder` | string | `Szukaj produktów…` | Tekst zastępczy                    |
| `width`       | string | `100%`              | Szerokość pola                     |
| `show_icon`   | string | `yes`               | Wyświetl ikonę lupy                |
| `show_cat`    | string | `no`                | Wyświetl filtr kategorii           |
| `limit`       | int    | `8`                 | Maksymalna liczba podpowiedzi      |

### Przykład użycia

```html
[polski_ajax_search placeholder="Czego szukasz?" show_cat="yes" limit="10"]
```

### Wstawienie w nagłówku motywu

```php
// W functions.php motywu
add_action('wp_body_open', function (): void {
    echo do_shortcode('[polski_ajax_search placeholder="Szukaj..." width="400px"]');
});
```

## Debouncing i wydajność

Wyszukiwarka stosuje debouncing 300 ms - żądanie wysyła się dopiero 300 ms po ostatnim naciśnięciu klawisza. Zapobiega to zbyt wielu zapytaniom przy szybkim wpisywaniu.

Wyniki cachują się w przeglądarce. Ponowne wpisanie tej samej frazy nie wysyła zapytania do serwera.

Na serwerze wyniki cachują się w transient API (domyślnie 1 godzina). Cache czyści się automatycznie po zapisaniu, dodaniu lub usunięciu produktu.

```php
// Zmiana czasu cache
add_filter('polski/ajax_search/cache_ttl', function (): int {
    return 1800; // 30 minut w sekundach
});
```

## Stylowanie CSS

Klasy CSS modułu:

- `.polski-ajax-search` - kontener wyszukiwarki
- `.polski-ajax-search__input` - pole tekstowe
- `.polski-ajax-search__results` - dropdown z wynikami
- `.polski-ajax-search__item` - pojedynczy wynik
- `.polski-ajax-search__item--active` - podświetlony wynik (nawigacja klawiaturą)
- `.polski-ajax-search__highlight` - podświetlenie pasującego fragmentu
- `.polski-ajax-search__loading` - spinner ładowania

## Dostępność

Wyszukiwarka obsługuje nawigację klawiaturową:

- **Strzałka w dół/w górę** - nawigacja po wynikach
- **Enter** - przejście do wybranego produktu
- **Escape** - zamknięcie dropdownu
- Atrybuty ARIA: `role="combobox"`, `aria-expanded`, `aria-activedescendant`

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
