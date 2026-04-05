---
title: Lista życzeń (wishlist)
description: Moduł listy życzeń w Polski for WooCommerce - obsługa gości i zalogowanych użytkowników, konto klienta, AJAX i shortcode.
---

Lista życzeń pozwala klientom zapisywać produkty na później. Działa zarówno dla zalogowanych klientów, jak i gości.

![Lista życzeń, porównywarka i szybki podgląd na stronie sklepu](../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **Lista życzeń**. Na każdym produkcie pojawi się ikona serca.

## Obsługa gości i zalogowanych użytkowników

### Goście (niezalogowani)

Lista zapisuje się w `localStorage` przeglądarki. Dane są dostępne od razu, bez zapytań do serwera. Po zalogowaniu lista automatycznie synchronizuje się z bazą danych - produkty nie znikają.

### Zalogowani użytkownicy

Dane zapisują się w tabeli `wp_usermeta` z kluczem `_polski_wishlist`. Lista jest dostępna na każdym urządzeniu po zalogowaniu.

## Konto klienta

Moduł dodaje zakładkę **Lista życzeń** w **Moje konto**. Klient widzi tam:

- Miniaturkę produktu
- Nazwę z linkiem do strony produktu
- Cenę (aktualną, z uwzględnieniem promocji)
- Status dostępności (w magazynie / brak)
- Przycisk **Dodaj do koszyka**
- Przycisk **Usuń z listy**

Zakładka widoczna jest tylko gdy moduł jest aktywny. Endpoint w URL: `wishlist` - np. `twojsklep.pl/moje-konto/wishlist/`.

## Działanie AJAX

Dodawanie i usuwanie produktów działa przez AJAX - strona się nie przeładowuje. Po kliknięciu ikony serca:

1. Ikona zmienia stan (pusta/wypełniona) z animacją CSS
2. Wysyłane jest żądanie AJAX do `admin-ajax.php`
3. Licznik na ikonie w nagłówku aktualizuje się w czasie rzeczywistym

Akcje AJAX obsługiwane przez moduł:

| Akcja                          | Opis                        |
| ------------------------------ | --------------------------- |
| `polski_wishlist_add`          | Dodanie produktu do listy   |
| `polski_wishlist_remove`       | Usunięcie produktu z listy  |
| `polski_wishlist_get`          | Pobranie całej listy        |
| `polski_wishlist_clear`        | Wyczyszczenie całej listy   |

## Shortcode `[polski_wishlist]`

Wyświetla tabelę listy życzeń w dowolnym miejscu sklepu.

### Parametry

| Parametr    | Typ    | Domyślnie | Opis                                        |
| ----------- | ------ | --------- | -------------------------------------------- |
| `columns`   | string | `all`     | Kolumny do wyświetlenia (oddzielone przecinkiem) |
| `max_items` | int    | `50`      | Maksymalna liczba produktów na liście        |
| `show_empty`| string | `yes`     | Czy pokazywać komunikat gdy lista jest pusta |

### Przykład użycia

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### Użycie w szablonie PHP

```php
echo do_shortcode('[polski_wishlist columns="image,name,price,add_to_cart"]');
```

### Dostępne kolumny

- `image` - miniaturka produktu
- `name` - nazwa produktu z linkiem
- `price` - cena
- `stock` - status magazynowy
- `add_to_cart` - przycisk dodania do koszyka
- `remove` - przycisk usunięcia z listy
- `date_added` - data dodania

## Przycisk na stronie produktu

Przycisk wyświetla się domyślnie pod **Dodaj do koszyka**. Zmień pozycję filtrem:

```php
add_filter('polski/wishlist/button_position', function (): string {
    return 'before_add_to_cart'; // lub 'after_add_to_cart', 'after_summary'
});
```

## Przycisk na liście produktów

Na stronach kategorii i archiwów przycisk serca pojawia się w rogu miniaturki. Wyłącz go w ustawieniach modułu.

## Nagłówek sklepu

Moduł dodaje ikonę serca z licznikiem do nagłówka (obok koszyka). Kliknięcie otwiera dropdown z zapisanymi produktami. Pozycję ikony zmień hookiem:

```php
add_action('polski/wishlist/header_icon', function (): void {
    // Własna pozycja ikony w nagłówku
});
```

## Stylowanie CSS

Klasy CSS mają prefiks `.polski-wishlist-`. Główne klasy:

- `.polski-wishlist-button` - przycisk dodania/usunięcia
- `.polski-wishlist-button--active` - stan aktywny (produkt na liście)
- `.polski-wishlist-table` - tabela listy
- `.polski-wishlist-count` - licznik w nagłówku
- `.polski-wishlist-empty` - komunikat pustej listy

## Wydajność

Dane listy dla zalogowanych klientów są cachowane w object cache (jeśli dostępny). HTML przycisku cachowany jest przez `wp_cache_set()` z grupą `polski_wishlist`. Cache czyści się automatycznie po dodaniu lub usunięciu produktu.

## Rozwiązywanie problemów

**Przycisk nie pojawia się na produkcie** - sprawdź, czy motyw obsługuje hook `woocommerce_single_product_summary`. Niektóre motywy nadpisują szablony WooCommerce.

**Lista nie synchronizuje się po zalogowaniu** - sprawdź, czy wtyczka cache nie buforuje strony logowania. Wyłącz cache dla strony `moje-konto`.

**Ikona w nagłówku nie wyświetla się** - motyw musi obsługiwać hook `wp_nav_menu_items` lub `storefront_header`. W niestandardowym motywie dodaj ikonę ręcznie w szablonie.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
