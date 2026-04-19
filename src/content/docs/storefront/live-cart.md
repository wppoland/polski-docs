---
title: Koszyk boczny (live cart)
description: Moduł koszyka bocznego w Polski for WooCommerce - wysuwany panel koszyka z paskiem darmowej dostawy i aktualizacją w czasie rzeczywistym.
---

Koszyk boczny to wysuwany panel (drawer), który pojawia się po dodaniu produktu do koszyka. Klient widzi zawartość koszyka bez opuszczania strony produktu, co skraca ścieżkę zakupową i zmniejsza porzucanie koszyków.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **Koszyk boczny**. Po dodaniu produktu do koszyka panel wysunie się automatycznie z wybranej strony ekranu.

## Funkcje

- Wysuwany panel koszyka po dodaniu produktu (slide-in drawer)
- Aktualizacja w czasie rzeczywistym przez WooCommerce Cart Fragments
- Pasek postępu darmowej dostawy z animacją
- Zmiana ilości produktów bez przeładowania strony
- Usuwanie produktów z koszyka w panelu
- Podsumowanie wartości koszyka
- Overlay przyciemniający tło strony
- Wybór strony wyświetlania (lewa/prawa)

## Ustawienia

Konfiguracja w **WooCommerce > Polski > Moduły sklepowe > Koszyk boczny**.

| Ustawienie | Domyślnie | Opis |
|---|---|---|
| `auto_open` | `true` | Automatycznie otwieraj panel po dodaniu produktu |
| `show_subtotal` | `true` | Wyświetlaj podsumowanie wartości koszyka |
| `show_shipping_notice` | `true` | Wyświetlaj pasek postępu darmowej dostawy |
| `free_shipping_threshold` | `200` | Próg darmowej dostawy w walucie sklepu |
| `position` | `right` | Strona ekranu: `right` lub `left` |
| `overlay` | `true` | Przyciemnienie tła gdy panel jest otwarty |

Opcja w bazie danych: `polski_live_cart`.

## Pasek darmowej dostawy

Pasek pokazuje ile brakuje do darmowej dostawy. Po przekroczeniu progu wyświetla komunikat potwierdzający. Próg pobierany jest z ustawienia `free_shipping_threshold` lub automatycznie z metody wysyłki WooCommerce (jeśli skonfigurowana).

Przykład komunikatów:

- "Do darmowej dostawy brakuje **45,00 zł**"
- "Gratulacje! Twoje zamówienie kwalifikuje się do **darmowej dostawy**"

## Szczegóły techniczne

### Pliki

- CSS: `assets/css/live-cart.css`
- JavaScript: `assets/js/live-cart.js`

Oba pliki ładowane są warunkowo - tylko gdy moduł jest aktywny. Skrypt zależy od `jquery` i `wc-cart-fragments`.

### Cart Fragments

Moduł wykorzystuje mechanizm WooCommerce Cart Fragments do aktualizacji zawartości panelu w czasie rzeczywistym. Po każdej zmianie koszyka (dodanie, usunięcie, zmiana ilości) panel odświeża się bez przeładowania strony.

### Hooki

```php
// Zmień próg darmowej dostawy dynamicznie
add_filter('polski/live_cart/free_shipping_threshold', function (float $threshold): float {
    return 300.00;
});

// Dodaj własną treść pod listą produktów
add_action('polski/live_cart/after_items', function (): void {
    echo '<p class="live-cart-promo">Kod rabatowy: WELCOME10</p>';
});

// Wyłącz automatyczne otwieranie na mobile
add_filter('polski/live_cart/auto_open', function (bool $auto_open): bool {
    if (wp_is_mobile()) {
        return false;
    }
    return $auto_open;
});
```

### Klasy CSS

- `.polski-live-cart` - kontener główny panelu
- `.polski-live-cart--open` - stan otwarty
- `.polski-live-cart--left` / `.polski-live-cart--right` - pozycja
- `.polski-live-cart__overlay` - overlay tła
- `.polski-live-cart__header` - nagłówek panelu
- `.polski-live-cart__items` - lista produktów
- `.polski-live-cart__item` - pojedynczy produkt
- `.polski-live-cart__subtotal` - podsumowanie
- `.polski-live-cart__shipping-bar` - pasek darmowej dostawy
- `.polski-live-cart__shipping-progress` - wypełnienie paska

### ID modułu

`live_cart`

## Rozwiązywanie problemów

**Panel nie otwiera się po dodaniu produktu** - sprawdź, czy AJAX dodawanie do koszyka jest włączone w **WooCommerce > Ustawienia > Produkty > Włącz dodawanie do koszyka przyciskiem AJAX**. Sprawdź też, czy nie ma konfliktu z inną wtyczką koszyka.

**Pasek darmowej dostawy nie wyświetla się** - upewnij się, że masz skonfigurowaną metodę wysyłki z darmową dostawą powyżej określonego progu lub ustaw próg ręcznie w ustawieniach modułu.

**Panel wyświetla się po złej stronie** - zmień ustawienie `position` na `left` lub `right`.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
