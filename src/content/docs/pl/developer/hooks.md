---
title: Hooki (akcje i filtry)
description: Kompletna dokumentacja hooków Polski for WooCommerce - 25 akcji i filtrów z sygnaturami, parametrami i przykładami kodu.
---

Polski for WooCommerce udostępnia zestaw hooków (akcji i filtrów) pozwalających deweloperom rozszerzać i modyfikować zachowanie wtyczki. Wszystkie hooki używają namespace `polski/`.

## Hooki odstąpienia od umowy (withdrawal)

### `polski/withdrawal/days`

Filtruje liczbę dni na odstąpienie od umowy.

```php
/**
 * @param int $days Liczba dni na odstąpienie (domyślnie 14)
 */
apply_filters('polski/withdrawal/days', int $days): int;
```

**Przykład:**

```php
add_filter('polski/withdrawal/days', function (int $days): int {
    return 30; // Wydłużenie do 30 dni
});
```

### `polski/withdrawal/excluded_categories`

Filtruje kategorie produktów wyłączonych z prawa odstąpienia.

```php
/**
 * @param array $categories Tablica ID kategorii
 */
apply_filters('polski/withdrawal/excluded_categories', array $categories): array;
```

**Przykład:**

```php
add_filter('polski/withdrawal/excluded_categories', function (array $categories): array {
    $categories[] = 15; // ID kategorii "Produkty cyfrowe"
    $categories[] = 22; // ID kategorii "Produkty higieniczne"
    return $categories;
});
```

### `polski/withdrawal/form_fields`

Filtruje pola formularza odstąpienia od umowy.

```php
/**
 * @param array $fields Tablica pól formularza
 */
apply_filters('polski/withdrawal/form_fields', array $fields): array;
```

**Przykład:**

```php
add_filter('polski/withdrawal/form_fields', function (array $fields): array {
    $fields['reason'] = [
        'type'     => 'textarea',
        'label'    => 'Powód odstąpienia',
        'required' => false,
    ];
    return $fields;
});
```

### `polski/withdrawal/email_sent`

Akcja wywoływana po wysłaniu potwierdzenia e-mail odstąpienia.

```php
/**
 * @param int   $order_id  ID zamówienia
 * @param array $form_data Dane z formularza
 */
do_action('polski/withdrawal/email_sent', int $order_id, array $form_data): void;
```

**Przykład:**

```php
add_action('polski/withdrawal/email_sent', function (int $order_id, array $form_data): void {
    // Logowanie odstąpień do zewnętrznego systemu
    wp_remote_post('https://api.crm.pl/withdrawals', [
        'body' => wp_json_encode([
            'order_id' => $order_id,
            'date'     => current_time('mysql'),
        ]),
    ]);
}, 10, 2);
```

## Hooki cenowe (price)

### `polski/price/unit_format`

Filtruje format wyświetlania ceny jednostkowej.

```php
/**
 * @param string $format     Format ceny jednostkowej
 * @param float  $unit_price Cena jednostkowa
 * @param string $unit       Jednostka miary (kg, l, m, szt.)
 * @param int    $product_id ID produktu
 */
apply_filters('polski/price/unit_format', string $format, float $unit_price, string $unit, int $product_id): string;
```

**Przykład:**

```php
add_filter('polski/price/unit_format', function (string $format, float $unit_price, string $unit, int $product_id): string {
    return sprintf('%s / %s', wc_price($unit_price), $unit);
}, 10, 4);
```

### `polski/price/vat_label`

Filtruje etykietę VAT wyświetlaną przy cenie.

```php
/**
 * @param string $label      Tekst etykiety
 * @param string $tax_status Status podatkowy produktu
 */
apply_filters('polski/price/vat_label', string $label, string $tax_status): string;
```

**Przykład:**

```php
add_filter('polski/price/vat_label', function (string $label, string $tax_status): string {
    if ($tax_status === 'taxable') {
        return 'brutto (z VAT)';
    }
    return 'zwolniony z VAT';
}, 10, 2);
```

## Hooki Omnibus (omnibus)

### `polski/omnibus/lowest_price`

Filtruje najniższą cenę z ostatnich 30 dni (dyrektywa Omnibus).

```php
/**
 * @param float $price      Najniższa cena
 * @param int   $product_id ID produktu
 * @param int   $days       Liczba dni wstecz
 */
apply_filters('polski/omnibus/lowest_price', float $price, int $product_id, int $days): float;
```

**Przykład:**

```php
add_filter('polski/omnibus/lowest_price', function (float $price, int $product_id, int $days): float {
    // Pomijanie produktów z kategorii "Outlet"
    if (has_term('outlet', 'product_cat', $product_id)) {
        return 0.0; // Nie wyświetlaj ceny Omnibus
    }
    return $price;
}, 10, 3);
```

### `polski/omnibus/display_format`

Filtruje format wyświetlania ceny Omnibus.

```php
/**
 * @param string $html       HTML z ceną
 * @param float  $price      Najniższa cena
 * @param int    $product_id ID produktu
 */
apply_filters('polski/omnibus/display_format', string $html, float $price, int $product_id): string;
```

**Przykład:**

```php
add_filter('polski/omnibus/display_format', function (string $html, float $price, int $product_id): string {
    return sprintf(
        '<small class="omnibus-price">Najniższa cena z 30 dni: %s</small>',
        wc_price($price)
    );
}, 10, 3);
```

### `polski/omnibus/price_recorded`

Akcja wywoływana po zapisaniu ceny do historii Omnibus.

```php
/**
 * @param int   $product_id ID produktu
 * @param float $price      Zapisana cena
 */
do_action('polski/omnibus/price_recorded', int $product_id, float $price): void;
```

## Hooki KSeF (ksef)

### `polski/ksef/invoice_data`

Filtruje dane faktury przed wysłaniem do KSeF.

```php
/**
 * @param array    $data  Dane faktury
 * @param WC_Order $order Obiekt zamówienia
 */
apply_filters('polski/ksef/invoice_data', array $data, WC_Order $order): array;
```

**Przykład:**

```php
add_filter('polski/ksef/invoice_data', function (array $data, WC_Order $order): array {
    $data['additional_info'] = 'Faktura wygenerowana automatycznie';
    return $data;
}, 10, 2);
```

### `polski/ksef/invoice_sent`

Akcja wywoływana po pomyślnym wysłaniu faktury do KSeF.

```php
/**
 * @param int    $order_id   ID zamówienia
 * @param string $ksef_id    Numer referencyjny KSeF
 * @param array  $response   Odpowiedź z API KSeF
 */
do_action('polski/ksef/invoice_sent', int $order_id, string $ksef_id, array $response): void;
```

**Przykład:**

```php
add_action('polski/ksef/invoice_sent', function (int $order_id, string $ksef_id, array $response): void {
    update_post_meta($order_id, '_ksef_reference', $ksef_id);
    $order = wc_get_order($order_id);
    $order->add_order_note(sprintf('Faktura wysłana do KSeF: %s', $ksef_id));
}, 10, 3);
```

## Hooki DSA (dsa)

### `polski/dsa/report_fields`

Filtruje pola formularza zgłoszenia DSA.

```php
/**
 * @param array $fields Pola formularza
 */
apply_filters('polski/dsa/report_fields', array $fields): array;
```

**Przykład:**

```php
add_filter('polski/dsa/report_fields', function (array $fields): array {
    $fields['screenshot'] = [
        'type'     => 'file',
        'label'    => 'Zrzut ekranu',
        'required' => false,
        'accept'   => '.jpg,.png,.pdf',
    ];
    return $fields;
});
```

### `polski/dsa/report_submitted`

Akcja wywoływana po złożeniu zgłoszenia DSA.

```php
/**
 * @param int   $report_id ID zgłoszenia
 * @param array $data      Dane zgłoszenia
 */
do_action('polski/dsa/report_submitted', int $report_id, array $data): void;
```

## Hooki DOI - double opt-in (doi)

### `polski/doi/verification_email`

Filtruje treść e-maila weryfikacyjnego DOI.

```php
/**
 * @param string $message Treść e-maila
 * @param string $email   Adres e-mail do weryfikacji
 * @param string $url     URL weryfikacyjny
 */
apply_filters('polski/doi/verification_email', string $message, string $email, string $url): string;
```

**Przykład:**

```php
add_filter('polski/doi/verification_email', function (string $message, string $email, string $url): string {
    return sprintf(
        'Cześć! Potwierdź rejestrację klikając: <a href="%s">Potwierdź konto</a>',
        esc_url($url)
    );
}, 10, 3);
```

### `polski/doi/verified`

Akcja wywoływana po pomyślnej weryfikacji DOI.

```php
/**
 * @param int    $user_id ID użytkownika
 * @param string $email   Adres e-mail
 */
do_action('polski/doi/verified', int $user_id, string $email): void;
```

## Hooki cache (cache)

### `polski/cache/should_flush`

Filtruje decyzję o czyszczeniu cache wtyczki.

```php
/**
 * @param bool   $should_flush Czy czyścić cache
 * @param string $group        Grupa cache (omnibus, badges, search)
 */
apply_filters('polski/cache/should_flush', bool $should_flush, string $group): bool;
```

**Przykład:**

```php
add_filter('polski/cache/should_flush', function (bool $should_flush, string $group): bool {
    // Nie czyść cache wyszukiwania przy imporcie
    if ($group === 'search' && defined('WP_IMPORTING') && WP_IMPORTING) {
        return false;
    }
    return $should_flush;
}, 10, 2);
```

### `polski/cache/ttl`

Filtruje czas życia cache (TTL) w sekundach.

```php
/**
 * @param int    $ttl   Czas w sekundach
 * @param string $group Grupa cache
 */
apply_filters('polski/cache/ttl', int $ttl, string $group): int;
```

## Hooki checkboxów (checkboxes)

### `polski/checkboxes/render`

Filtruje HTML renderowanego checkboxa.

```php
/**
 * @param string $html     HTML checkboxa
 * @param array  $checkbox Dane checkboxa
 * @param string $location Lokalizacja (checkout, registration, contact)
 */
apply_filters('polski/checkboxes/render', string $html, array $checkbox, string $location): string;
```

### `polski/checkboxes/validated`

Akcja wywoływana po walidacji checkboxów.

```php
/**
 * @param array $checkboxes Zwalidowane checkboxy
 * @param bool  $valid      Wynik walidacji
 */
do_action('polski/checkboxes/validated', array $checkboxes, bool $valid): void;
```

## Hooki e-mail (email)

### `polski/email/template`

Filtruje ścieżkę do szablonu e-maila.

```php
/**
 * @param string $template Ścieżka do szablonu
 * @param string $type     Typ e-maila (withdrawal, doi, waitlist)
 */
apply_filters('polski/email/template', string $template, string $type): string;
```

**Przykład:**

```php
add_filter('polski/email/template', function (string $template, string $type): string {
    if ($type === 'withdrawal') {
        return get_stylesheet_directory() . '/polski/emails/withdrawal.php';
    }
    return $template;
}, 10, 2);
```

### `polski/email/headers`

Filtruje nagłówki e-maila.

```php
/**
 * @param array  $headers Nagłówki e-maila
 * @param string $type    Typ e-maila
 */
apply_filters('polski/email/headers', array $headers, string $type): array;
```

## Hooki stron prawnych (legal_page)

### `polski/legal_page/template_data`

Filtruje dane wstawiane do szablonu strony prawnej.

```php
/**
 * @param array  $data Dane szablonu
 * @param string $type Typ strony (terms, privacy, withdrawal, dsa_report)
 */
apply_filters('polski/legal_page/template_data', array $data, string $type): array;
```

**Przykład:**

```php
add_filter('polski/legal_page/template_data', function (array $data, string $type): array {
    if ($type === 'terms') {
        $data['delivery_info'] = 'Dostawa w ciągu 2-5 dni roboczych.';
    }
    return $data;
}, 10, 2);
```

### `polski/legal_page/generated`

Akcja wywoływana po wygenerowaniu strony prawnej.

```php
/**
 * @param int    $page_id ID strony
 * @param string $type    Typ strony
 */
do_action('polski/legal_page/generated', int $page_id, string $type): void;
```

## Najlepsze praktyki

1. **Używaj typów** - deklaruj typy parametrów i zwracanych wartości w callbackach
2. **Priorytet** - domyślny priorytet to 10, używaj wyższego (np. 20) jeśli chcesz nadpisać domyślne zachowanie
3. **Namespace** - nie twórz hooków w namespace `polski/` w swoich wtyczkach, aby uniknąć konfliktów
4. **Kompatybilność** - sprawdzaj istnienie hooków przed użyciem: `has_filter('polski/omnibus/lowest_price')`
5. **Dokumentacja** - dokumentuj własne callbacki komentarzami PHPDoc

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
