---
title: Prawo odstąpienia od umowy
description: Obsługa prawa odstąpienia od umowy w Polski for WooCommerce - formularz zwrotu, wykluczenia produktowe, automatyczne e-maile i hooki deweloperskie.
---

Dyrektywa UE 2023/2673 wprowadza nowe obowiązki dotyczące prawa odstąpienia od umowy (od 19 czerwca 2026). Wtyczka obsługuje cały proces - formularz klienta, potwierdzenia e-mail, wykluczenia produktowe i hooki dla deweloperów.

## Wymagania prawne

Konsument może odstąpić od umowy zawartej na odległość w ciągu 14 dni bez podawania przyczyny. Jako sprzedawca musisz:

1. Poinformować konsumenta o prawie do odstąpienia przed zawarciem umowy
2. Udostępnić formularz odstąpienia
3. Potwierdzić otrzymanie oświadczenia o odstąpieniu
4. Zwrócić płatność w ciągu 14 dni od otrzymania oświadczenia

Dyrektywa 2023/2673 dodaje wymóg cyfrowego procesu składania oświadczeń i automatycznych potwierdzeń.

## Proces klienta

### Krok 1 - przycisk w Moje konto

Po włączeniu modułu w **Moje konto > Zamówienia** pojawia się przycisk "Odstąp od umowy" przy zamówieniach, które kwalifikują się do zwrotu. Przycisk widoczny jest przez 14 dni od dostawy.

![Przyciski odstąpienia od umowy w panelu Moje konto](../../../assets/screenshots/screenshot-5-withdrawal-request.png)

### Krok 2 - formularz odstąpienia

Po kliknięciu przycisku klient widzi formularz z polami:

- Numer zamówienia (wypełniony automatycznie)
- Datę zamówienia
- Lista produktów z zamówienia (z możliwością wyboru, od których odstępuje)
- Powód odstąpienia (opcjonalny)
- Dane kontaktowe klienta
- Numer konta bankowego do zwrotu

### Krok 3 - potwierdzenie e-mail

Po złożeniu formularza system automatycznie:

1. Wysyła klientowi e-mail z potwierdzeniem otrzymania oświadczenia
2. Wysyła administratorowi sklepu powiadomienie o nowym zgłoszeniu
3. Zmienia status zgłoszenia na "Oczekujące"

Następnie przetwórz zgłoszenie w panelu WooCommerce i oznacz jako zakończone.

## Wykluczenia produktowe

Niektóre produkty nie podlegają prawu do odstąpienia. Oznacz je jako wykluczone w zakładce **Polski - Odstąpienie** w edycji produktu.

Typowe wykluczenia zgodnie z art. 38 ustawy o prawach konsumenta:

- Produkty wykonane na zamówienie lub spersonalizowane
- Produkty ulegające szybkiemu zepsuciu
- Produkty zapieczętowane ze względów higienicznych (po otwarciu)
- Nagrania dźwiękowe/wizualne w zapieczętowanym opakowaniu (po otwarciu)
- Treści cyfrowe dostarczone online (po rozpoczęciu świadczenia)
- Prasa (dzienniki, periodyki, czasopisma)

Przy wykluczonym produkcie przycisk "Odstąp od umowy" nie pojawia się w panelu klienta.

## Shortcode

Użyj shortcode `[polski_withdrawal_form]` do wyświetlenia formularza odstąpienia w dowolnym miejscu witryny.

### Podstawowe użycie

```
[polski_withdrawal_form]
```

Wyświetla formularz dla zalogowanego klienta. Klient musi wybrać zamówienie z listy.

### Z określeniem zamówienia

```
[polski_withdrawal_form order_id="789"]
```

Wyświetla formularz wypełniony danymi zamówienia o podanym ID. Wtyczka sprawdza, czy zalogowany użytkownik jest właścicielem zamówienia.

### Przykład osadzenia na stronie

Stwórz dedykowaną stronę "Formularz odstąpienia od umowy" i umieść na niej shortcode:

```
[polski_withdrawal_form]
```

W ustawieniach (**WooCommerce > Ustawienia > Polski > Odstąpienie**) wskaż tę stronę jako domyślną stronę formularza.

## Hooki

### polski/withdrawal/requested

Wywoływany, gdy klient złoży formularz odstąpienia.

```php
/**
 * @param int   $withdrawal_id ID zgłoszenia odstąpienia.
 * @param int   $order_id      ID zamówienia WooCommerce.
 * @param array $form_data     Dane z formularza.
 */
add_action('polski/withdrawal/requested', function (int $withdrawal_id, int $order_id, array $form_data): void {
    // Przykład: wyślij powiadomienie do zewnętrznego systemu CRM
    $crm_api = new MyCrmApi();
    $crm_api->notify_withdrawal($order_id, $form_data['reason']);
}, 10, 3);
```

### polski/withdrawal/confirmed

Wywoływany, gdy administrator potwierdzi otrzymanie zgłoszenia.

```php
/**
 * @param int $withdrawal_id ID zgłoszenia odstąpienia.
 * @param int $order_id      ID zamówienia WooCommerce.
 */
add_action('polski/withdrawal/confirmed', function (int $withdrawal_id, int $order_id): void {
    // Przykład: zmień status zamówienia
    $order = wc_get_order($order_id);
    if ($order) {
        $order->update_status('withdrawal-confirmed', 'Odstąpienie potwierdzone.');
    }
}, 10, 2);
```

### polski/withdrawal/completed

Wywoływany, gdy cały proces odstąpienia zostanie zakończony (zwrot przetworzony).

```php
/**
 * @param int   $withdrawal_id ID zgłoszenia odstąpienia.
 * @param int   $order_id      ID zamówienia WooCommerce.
 * @param float $refund_amount Kwota zwrotu.
 */
add_action('polski/withdrawal/completed', function (int $withdrawal_id, int $order_id, float $refund_amount): void {
    // Przykład: zarejestruj zwrot w systemie księgowym
    do_action('my_accounting/register_refund', $order_id, $refund_amount);
}, 10, 3);
```

### polski/withdrawal/eligible

Filtr pozwalający na programowe określenie, czy zamówienie kwalifikuje się do odstąpienia.

```php
/**
 * @param bool     $is_eligible Czy zamówienie kwalifikuje się do odstąpienia.
 * @param WC_Order $order       Obiekt zamówienia WooCommerce.
 * @return bool
 */
add_filter('polski/withdrawal/eligible', function (bool $is_eligible, WC_Order $order): bool {
    // Przykład: wyklucz zamówienia z kategorii "usługi"
    foreach ($order->get_items() as $item) {
        $product = $item->get_product();
        if ($product && has_term('uslugi', 'product_cat', $product->get_id())) {
            return false;
        }
    }
    return $is_eligible;
}, 10, 2);
```

### polski/withdrawal/period_days

Filtr pozwalający zmienić okres odstąpienia (domyślnie 14 dni).

```php
/**
 * @param int      $days  Liczba dni na odstąpienie.
 * @param WC_Order $order Obiekt zamówienia WooCommerce.
 * @return int
 */
add_filter('polski/withdrawal/period_days', function (int $days, WC_Order $order): int {
    // Przykład: wydłuż okres do 30 dni w okresie świątecznym
    $order_date = $order->get_date_created();
    if ($order_date) {
        $month = (int) $order_date->format('m');
        if ($month === 12) {
            return 30;
        }
    }
    return $days;
}, 10, 2);
```

### polski/withdrawal/form_fields

Filtr pozwalający modyfikować pola formularza odstąpienia.

```php
/**
 * @param array $fields Tablica pól formularza.
 * @return array
 */
add_filter('polski/withdrawal/form_fields', function (array $fields): array {
    // Przykład: dodaj pole na preferowany sposób zwrotu
    $fields['refund_method'] = [
        'type'     => 'select',
        'label'    => 'Preferowany sposób zwrotu',
        'required' => true,
        'options'  => [
            'bank_transfer' => 'Przelew bankowy',
            'original'      => 'Tym samym sposobem płatności',
        ],
    ];
    return $fields;
}, 10, 1);
```

## Administracja zgłoszeniami

Zgłoszenia znajdziesz w **WooCommerce > Odstąpienia**. Każde zgłoszenie zawiera:

- Numer zamówienia i link do zamówienia
- Datę złożenia formularza
- Status (oczekujące, potwierdzone, zakończone, odrzucone)
- Dane klienta
- Lista produktów objętych odstąpieniem
- Powód (jeśli podany)

Możesz zmienić status zgłoszenia, dodać notatkę lub przetworzyć zwrot bezpośrednio z panelu.

## Rozwiązywanie problemów

**Przycisk "Odstąp od umowy" nie wyświetla się**
Sprawdź, czy: (1) moduł jest włączony, (2) zamówienie jest w statusie "Zrealizowane", (3) nie minął okres odstąpienia, (4) żaden produkt w zamówieniu nie jest wykluczony.

**Klient nie otrzymuje e-maila potwierdzającego**
Sprawdź konfigurację e-maili WooCommerce w **WooCommerce > Ustawienia > E-maile** i upewnij się, że szablon "Potwierdzenie odstąpienia" jest włączony.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dyskusje i pytania: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
