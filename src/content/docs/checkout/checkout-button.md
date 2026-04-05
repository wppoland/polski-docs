---
title: Przycisk zamówienia z obowiązkiem zapłaty
description: Konfiguracja przycisku "Zamawiam z obowiązkiem zapłaty" wymaganego przez polskie prawo konsumenckie w WooCommerce.
---

Polska ustawa o prawach konsumenta (art. 17 ust. 3) wymaga, aby przycisk finalizujący zamówienie w sklepie internetowym był jednoznacznie oznaczony słowami "zamówienie z obowiązkiem zapłaty" lub równoznacznym sformułowaniem. Plugin Polski for WooCommerce automatycznie zmienia domyślny tekst przycisku WooCommerce na wymagany przez polskie przepisy.

## Wymagania prawne

Zgodnie z art. 17 ust. 3 ustawy o prawach konsumenta, która implementuje dyrektywę 2011/83/UE:

> "Przedsiębiorca zapewnia, aby konsument w momencie składania zamówienia wyraźnie potwierdził, że wie, iż zamówienie pociąga za sobą obowiązek zapłaty."

Przycisk musi zawierać sformułowanie jednoznacznie wskazujące na obowiązek zapłaty. Akceptowane warianty:

- "Zamawiam z obowiązkiem zapłaty"
- "Zamawiam i płacę"
- "Kupuję i płacę"

Użycie tekstu typu "Złóż zamówienie", "Zamów" czy "Potwierdź" jest niezgodne z prawem i może skutkować karami.

![Strona kasy z checkboxami prawnymi i przyciskiem zamówienia](../../../assets/screenshots/screenshot-3-checkout-checkboxes.png)

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Kasa** i skonfiguruj sekcję "Przycisk zamówienia".

### Ustawienia

| Ustawienie | Domyślna wartość | Opis |
|------------|-----------------|------|
| Tekst przycisku | Zamawiam z obowiązkiem zapłaty | Tekst wyświetlany na przycisku |
| Nadpisuj dla wszystkich metod płatności | Tak | Czy stosować tekst niezależnie od wybranej metody |
| Nadpisuj tekst bramek płatności | Tak | Czy nadpisywać teksty ustawione przez wtyczki bramek płatności |

### Teksty per metoda płatności

Niektóre bramki płatności (np. PayPal, Przelewy24) ustawiają własne teksty przycisków. Plugin pozwala wybrać, czy:

1. **Nadpisywać wszystkie** - zawsze wyświetla ustawiony tekst (zalecane)
2. **Zachować teksty bramek** - pozwala bramkom ustawiać własne teksty (upewnij się, że są zgodne z prawem)

## Implementacja techniczna

Plugin modyfikuje tekst przycisku za pomocą filtra WooCommerce:

```php
add_filter('woocommerce_order_button_text', function (): string {
    return 'Zamawiam z obowiązkiem zapłaty';
});
```

### Kompatybilność z Block Checkout

Plugin obsługuje zarówno klasyczny checkout (shortcode), jak i nowy Block Checkout (Gutenberg). W przypadku Block Checkout modyfikacja odbywa się przez:

- filtr `woocommerce_order_button_text` (klasyczny)
- endpoint Store API (Block Checkout)

### Kompatybilność z popularnymi wtyczkami

Plugin jest kompatybilny z popularnymi bramkami płatności na polskim rynku:

- Przelewy24
- PayU
- Tpay
- Stripe
- PayPal
- BLIK (przez różne bramki)

## Dostosowywanie tekstu

### Zmiana tekstu w ustawieniach

Najprostszy sposób - zmień tekst w **WooCommerce > Ustawienia > Polski > Kasa**. Pamiętaj, że nowy tekst musi nadal zawierać informację o obowiązku zapłaty.

### Zmiana tekstu programistycznie

```php
add_filter('woocommerce_order_button_text', function (string $text): string {
    return 'Kupuję i płacę';
}, 20);
```

Priorytet `20` zapewnia, że filtr zostanie wykonany po filtrze pluginu (priorytet `10`).

### Tekst zależny od metody płatności

```php
add_filter('woocommerce_order_button_text', function (string $text): string {
    $chosen_payment = WC()->session->get('chosen_payment_method');

    if ($chosen_payment === 'bacs') {
        return 'Zamawiam z obowiązkiem zapłaty przelewem';
    }

    if ($chosen_payment === 'cod') {
        return 'Zamawiam z obowiązkiem zapłaty przy odbiorze';
    }

    return 'Zamawiam z obowiązkiem zapłaty';
}, 20);
```

## Stylowanie przycisku

Przycisk zachowuje domyślne klasy CSS WooCommerce. Możesz dostosować jego wygląd:

```css
#place_order {
    background-color: #2e7d32;
    font-size: 1.1em;
    font-weight: 700;
    padding: 0.8em 2em;
    text-transform: none;
}

#place_order:hover {
    background-color: #1b5e20;
}
```

Dla Block Checkout:

```css
.wc-block-components-checkout-place-order-button {
    background-color: #2e7d32;
    font-weight: 700;
}
```

## Testowanie

Po konfiguracji sprawdź przycisk w następujących scenariuszach:

1. Checkout z różnymi metodami płatności
2. Checkout jako gość i zalogowany użytkownik
3. Checkout z kupionem rabatowym (coupon)
4. Checkout z subskrypcją (jeśli używasz WooCommerce Subscriptions)
5. Checkout mobilny - upewnij się, że tekst nie jest obcięty

## Najczęstsze problemy

### Tekst przycisku wraca do domyślnego "Place order"

Sprawdź, czy:

1. Plugin jest aktywny i moduł kasy jest włączony
2. Żadna inna wtyczka nie nadpisuje filtra z wyższym priorytetem
3. Motyw nie hardcoduje tekstu przycisku w szablonie

### Tekst jest obcięty na urządzeniach mobilnych

Długi tekst "Zamawiam z obowiązkiem zapłaty" może nie mieścić się na wąskich ekranach. Rozważ:

- użycie krótszego wariantu: "Kupuję i płacę"
- dostosowanie CSS: `white-space: normal` na przycisku

### Block Checkout nie zmienia tekstu

Upewnij się, że używasz najnowszej wersji pluginu. Starsze wersje mogą nie obsługiwać Block Checkout. Sprawdź również, czy WooCommerce Blocks jest zaktualizowany.

## Powiązane zasoby

- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
