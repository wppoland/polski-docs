---
title: KSeF - Krajowy System e-Faktur
description: Gotowość na KSeF w Polski for WooCommerce - automatyczne wykrywanie zamówień z NIP, kolumna statusu, hooki deweloperskie i integracja z systemami fakturowania.
---

KSeF to platforma Ministerstwa Finansów do faktur ustrukturyzowanych. Wtyczka przygotowuje sklep na integrację z KSeF - wykrywa zamówienia wymagające faktury VAT, dodaje kolumnę statusu i hooki do połączenia z systemami fakturowania.

## Stan prawny KSeF

KSeF jest w fazie wdrażania. Wtyczka nie wystawia faktur w KSeF, ale ułatwia integrację z systemami, które to robią (np. Fakturownia, iFirma, wFirma, InFakt).

Główne funkcje modułu KSeF:

1. Automatyczne wykrywanie zamówień z numerem NIP
2. Kolumna statusu KSeF na liście zamówień
3. Hooki do integracji z zewnętrznymi systemami fakturowania
4. Meta-dane zamówienia gotowe do przekazania do systemu KSeF

## Wykrywanie zamówień z NIP

Gdy klient poda NIP przy składaniu zamówienia (pole NIP jest częścią modułu Checkout), wtyczka automatycznie:

1. Waliduje format NIP (10 cyfr, sprawdzenie sumy kontrolnej)
2. Oznacza zamówienie jako wymagające faktury VAT
3. Zapisuje NIP w meta-danych zamówienia
4. Opcjonalnie pobiera dane firmy z API GUS/CEIDG

### Walidacja NIP

Wtyczka sprawdza poprawność NIP na dwóch poziomach:

- **Format** - 10 cyfr, prawidłowa suma kontrolna (wagi: 6, 5, 7, 2, 3, 4, 5, 6, 7)
- **Weryfikacja online** - opcjonalne sprawdzenie w bazie VIES (dla NIP-ów EU) lub API GUS

## Kolumna statusu KSeF

Na liście zamówień (**WooCommerce > Zamówienia**) pojawia się kolumna **KSeF** z ikonami statusu:

| Ikona | Status | Opis |
|-------|--------|------|
| Szara | Nie dotyczy | Zamówienie bez NIP, faktura nie jest wymagana |
| Niebieska | Oczekuje | Zamówienie z NIP, faktura do wystawienia |
| Zielona | Wystawiona | Faktura została wystawiona (status ustawiony przez hook) |
| Czerwona | Błąd | Wystąpił problem z wystawieniem faktury |

Możesz filtrować zamówienia po statusie KSeF, np. wyświetlić tylko te oczekujące na fakturę.

### Masowe akcje

Na liście zamówień możesz masowo oznaczyć wiele zamówień jako "wystawione w KSeF".

## Hooki

### polski/ksef/invoice_ready

Wywoływany, gdy zamówienie z NIP jest opłacone i gotowe do wystawienia faktury. Główny hook do integracji z systemami fakturowania.

```php
/**
 * @param int      $order_id   ID zamówienia WooCommerce.
 * @param WC_Order $order      Obiekt zamówienia.
 * @param string   $nip        Numer NIP klienta.
 * @param array    $invoice_data Dane do faktury (nazwa firmy, adres, NIP).
 */
add_action('polski/ksef/invoice_ready', function (int $order_id, WC_Order $order, string $nip, array $invoice_data): void {
    // Przykład: wyślij dane do API Fakturowni
    $api_token = get_option('fakturownia_api_token');
    $account = get_option('fakturownia_account');
    
    $invoice_payload = [
        'invoice' => [
            'kind'             => 'vat',
            'number'           => null, // auto-numeracja
            'sell_date'        => $order->get_date_paid()->format('Y-m-d'),
            'issue_date'       => current_time('Y-m-d'),
            'payment_type'     => 'transfer',
            'seller_name'      => get_option('woocommerce_store_name'),
            'buyer_name'       => $invoice_data['company_name'],
            'buyer_tax_no'     => $nip,
            'buyer_street'     => $invoice_data['address'],
            'buyer_city'       => $invoice_data['city'],
            'buyer_post_code'  => $invoice_data['postcode'],
            'positions'        => [],
        ],
    ];
    
    foreach ($order->get_items() as $item) {
        $invoice_payload['invoice']['positions'][] = [
            'name'       => $item->get_name(),
            'quantity'   => $item->get_quantity(),
            'total_price_gross' => $item->get_total() + $item->get_total_tax(),
            'tax'        => round(($item->get_total_tax() / $item->get_total()) * 100),
        ];
    }
    
    $response = wp_remote_post("https://{$account}.fakturownia.pl/invoices.json", [
        'body'    => wp_json_encode($invoice_payload),
        'headers' => [
            'Content-Type' => 'application/json',
            'Authorization' => 'Token token=' . $api_token,
        ],
    ]);
    
    if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 201) {
        $body = json_decode(wp_remote_retrieve_body($response), true);
        update_post_meta($order_id, '_ksef_status', 'issued');
        update_post_meta($order_id, '_ksef_invoice_id', $body['id'] ?? '');
    } else {
        update_post_meta($order_id, '_ksef_status', 'error');
    }
}, 10, 4);
```

### polski/ksef/is_required

Filtr pozwalający programowo określić, czy zamówienie wymaga faktury KSeF.

```php
/**
 * @param bool     $is_required Czy faktura KSeF jest wymagana.
 * @param WC_Order $order       Obiekt zamówienia.
 * @return bool
 */
add_filter('polski/ksef/is_required', function (bool $is_required, WC_Order $order): bool {
    // Przykład: wymagaj faktury KSeF dla zamówień powyżej 450 PLN
    if ($order->get_total() > 450) {
        return true;
    }
    
    return $is_required;
}, 10, 2);
```

### Przykład - automatyczne oznaczanie statusu po integracji

```php
/**
 * Aktualizuj status KSeF po otrzymaniu odpowiedzi z systemu fakturowania.
 */
add_action('my_invoicing/invoice_created', function (int $order_id, string $ksef_number): void {
    $order = wc_get_order($order_id);
    if (!$order) {
        return;
    }
    
    $order->update_meta_data('_ksef_status', 'issued');
    $order->update_meta_data('_ksef_number', $ksef_number);
    $order->add_order_note(
        sprintf('Faktura wystawiona w KSeF. Numer KSeF: %s', $ksef_number)
    );
    $order->save();
}, 10, 2);
```

## Meta-dane zamówienia

Moduł KSeF zapisuje następujące meta-dane w zamówieniu:

| Klucz meta | Opis |
|------------|------|
| `_billing_nip` | Numer NIP klienta |
| `_billing_company` | Nazwa firmy |
| `_ksef_required` | Czy zamówienie wymaga faktury (`yes`/`no`) |
| `_ksef_status` | Status faktury (`pending`, `issued`, `error`) |
| `_ksef_number` | Numer KSeF faktury (po wystawieniu) |
| `_ksef_invoice_id` | ID faktury w zewnętrznym systemie |

## Konfiguracja

Ustawienia modułu KSeF: **WooCommerce > Ustawienia > Polski > KSeF**.

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| Włącz moduł KSeF | Aktywuje wykrywanie i śledzenie | Tak |
| Walidacja NIP online | Sprawdzaj NIP w API GUS/VIES | Nie |
| Auto-pobieranie danych firmy | Pobieraj dane z GUS po wpisaniu NIP | Nie |
| Status wyzwalający hook | Status zamówienia, przy którym wywołać `invoice_ready` | `processing` |

## Rozwiązywanie problemów

**Kolumna KSeF nie wyświetla się na liście zamówień**
Kliknij "Opcje ekranu" i zaznacz kolumnę KSeF. Upewnij się, że moduł jest włączony w ustawieniach.

**NIP nie jest zapisywany w zamówieniu**
Sprawdź, czy pole NIP jest włączone w **WooCommerce > Ustawienia > Polski > Kasa**. Pole musi być aktywne, żeby klient mógł je wypełnić.

**Hook invoice_ready nie jest wywoływany**
Sprawdź "Status wyzwalający hook". Domyślnie hook działa przy statusie "W trakcie realizacji". Przy niestandardowych statusach zmień tę opcję.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dyskusje i pytania: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
