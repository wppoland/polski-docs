---
title: Integracje księgowe
description: Integracje z systemami księgowymi wFirma, Fakturownia i iFirma w Polski PRO for WooCommerce - synchronizacja faktur, retry logic i konfiguracja per dostawca.
---

Moduł łączy WooCommerce z polskimi systemami fakturowania: wFirma, Fakturownia i iFirma. Faktury wysyłane są automatycznie, z ponawianiem przy błędach API.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Dodatkowo wymagane jest aktywne konto w wybranym systemie księgowym z dostępem API.
:::

## Obsługiwane systemy

| System | Format API | Wersja API | Uwierzytelnianie |
|--------|-----------|------------|-------------------|
| wFirma | XML | v2 | API key + API secret |
| Fakturownia | JSON | v3 | API token |
| iFirma | JSON | v1 | Login + API key (klucz faktur) |

Tylko jedna integracja może być aktywna jednocześnie.

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski PRO > Księgowość**.

### Wybór dostawcy

Wybierz system księgowy i wpisz dane logowania.

#### wFirma

| Ustawienie | Opis |
|------------|------|
| API key | Klucz API z panelu wFirma |
| API secret | Sekret API |
| ID firmy | Identyfikator firmy w wFirma |
| Seria faktur | Seria numeracji (np. "FV", "FVS") |

#### Fakturownia

| Ustawienie | Opis |
|------------|------|
| Subdomena | Nazwa subdomeny (np. `mojafirma.fakturownia.pl`) |
| API token | Token API z ustawień konta |
| ID działu | Opcjonalnie - ID działu wystawiającego faktury |
| Język faktury | `pl` lub `en` |

#### iFirma

| Ustawienie | Opis |
|------------|------|
| Login | Login do konta iFirma |
| Klucz API faktur | Klucz API do wystawiania faktur |
| Klucz API abonenta | Klucz API abonenta (do pobierania danych) |

### Ustawienia wspólne

| Ustawienie | Domyślna wartość | Opis |
|------------|------------------|------|
| Automatyczne wystawianie | Tak | Wystawiaj fakturę automatycznie po opłaceniu zamówienia |
| Status wyzwalający | `processing` | Status zamówienia wyzwalający wystawienie faktury |
| Typ dokumentu | Faktura VAT | Faktura VAT, Faktura proforma, Rachunek |
| Dodaj do e-maila | Tak | Dołącz PDF faktury do e-maila zamówienia |
| Retry przy błędzie | Tak | Ponów próbę przy błędzie API |
| Maksymalna liczba prób | 5 | Limit ponownych prób |

## Synchronizacja faktur

### Przepływ automatyczny

1. Zamówienie WooCommerce zmienia status na `processing` (lub inny skonfigurowany)
2. Moduł zbiera dane zamówienia i mapuje je na format dostawcy
3. Dane są wysyłane asynchronicznie do API systemu księgowego
4. Po pomyślnym utworzeniu, ID faktury jest zapisywane w meta zamówienia
5. PDF faktury jest pobierany i dołączany do e-maila klienta

### Mapowanie danych

Moduł automatycznie przelicza dane zamówienia na format API:

| Dane WooCommerce | wFirma (XML) | Fakturownia (JSON) | iFirma (JSON) |
|------------------|-------------|-------------------|---------------|
| Nazwa firmy | `<contractor><name>` | `buyer_name` | `Kontrahent.Nazwa` |
| NIP | `<contractor><nip>` | `buyer_tax_no` | `Kontrahent.NIP` |
| Adres | `<contractor><street>` | `buyer_street` | `Kontrahent.Ulica` |
| Pozycje zamówienia | `<invoicecontents>` | `positions` | `Pozycje` |
| Stawka VAT | `<vat_code>` | `tax` | `StawkaVat` |
| Metoda płatności | `<paymentmethod>` | `payment_type` | `SposobZaplaty` |

### Format XML (wFirma)

```xml
<api>
  <invoices>
    <invoice>
      <contractor>
        <name>Firma Testowa Sp. z o.o.</name>
        <nip>1234567890</nip>
        <street>ul. Testowa 1</street>
        <city>Warszawa</city>
        <zip>00-001</zip>
      </contractor>
      <invoicecontents>
        <invoicecontent>
          <name>Produkt testowy</name>
          <unit>szt.</unit>
          <count>2</count>
          <price>100.00</price>
          <vat_code>23</vat_code>
        </invoicecontent>
      </invoicecontents>
      <paymentmethod>transfer</paymentmethod>
      <paymentdate>2026-04-12</paymentdate>
    </invoice>
  </invoices>
</api>
```

### Format JSON (Fakturownia)

```json
{
  "invoice": {
    "kind": "vat",
    "number": null,
    "buyer_name": "Firma Testowa Sp. z o.o.",
    "buyer_tax_no": "1234567890",
    "buyer_street": "ul. Testowa 1",
    "buyer_city": "Warszawa",
    "buyer_post_code": "00-001",
    "positions": [
      {
        "name": "Produkt testowy",
        "quantity": 2,
        "total_price_gross": "246.00",
        "tax": "23"
      }
    ],
    "payment_type": "transfer",
    "payment_to": "2026-04-12"
  }
}
```

## Mechanizm retry

### Exponential backoff

Przy błędach serwera (HTTP 5xx, timeout) moduł ponawia próbę z rosnącym opóźnieniem:

| Próba | Opóźnienie | Czas od pierwszej próby |
|-------|------------|------------------------|
| 1 | Natychmiast | 0 s |
| 2 | 30 s | 30 s |
| 3 | 2 min | 2 min 30 s |
| 4 | 8 min | 10 min 30 s |
| 5 | 32 min | 42 min 30 s |

Opóźnienie obliczane jest wzorem: `delay = base_delay * 2^(attempt - 1)`, gdzie `base_delay = 30 sekund`.

### Błędy niepodlegające retry

Błędy klienta (HTTP 4xx) nie są ponawiane - wskazują na problem z danymi:

- `400 Bad Request` - nieprawidłowe dane
- `401 Unauthorized` - błędny token API
- `403 Forbidden` - brak uprawnień
- `422 Unprocessable Entity` - walidacja danych

Te błędy wymagają ręcznej poprawki.

### Asynchroniczne wysyłanie

Faktury wysyłane są w tle przez `WC_Action_Scheduler`. Klient widzi potwierdzenie zamówienia od razu, a faktura generuje się w tle.

```php
/**
 * Akcja wywoływana po pomyślnym wystawieniu faktury.
 *
 * @param int    $order_id   ID zamówienia
 * @param string $invoice_id ID faktury w systemie księgowym
 * @param string $provider   Nazwa dostawcy ('wfirma', 'fakturownia', 'ifirma')
 */
do_action('polski_pro/accounting/invoice_created', int $order_id, string $invoice_id, string $provider);
```

**Przykład - logowanie do zewnętrznego systemu:**

```php
add_action('polski_pro/accounting/invoice_created', function (
    int $order_id,
    string $invoice_id,
    string $provider
): void {
    error_log(sprintf(
        '[Polski PRO] Faktura %s wystawiona w %s dla zamówienia #%d',
        $invoice_id,
        $provider,
        $order_id
    ));
}, 10, 3);
```

### Hook błędu

```php
/**
 * Akcja wywoływana po wyczerpaniu prób wysłania faktury.
 *
 * @param int    $order_id   ID zamówienia
 * @param string $provider   Nazwa dostawcy
 * @param string $error      Komunikat błędu
 * @param int    $attempts   Liczba wykonanych prób
 */
do_action('polski_pro/accounting/invoice_failed', int $order_id, string $provider, string $error, int $attempts);
```

**Przykład - powiadomienie administratora:**

```php
add_action('polski_pro/accounting/invoice_failed', function (
    int $order_id,
    string $provider,
    string $error,
    int $attempts
): void {
    $admin_email = get_option('admin_email');
    wp_mail(
        $admin_email,
        sprintf('Błąd wystawienia faktury - zamówienie #%d', $order_id),
        sprintf(
            "Nie udało się wystawić faktury w %s po %d próbach.\n\nBłąd: %s\n\nSprawdź zamówienie: %s",
            $provider,
            $attempts,
            $error,
            admin_url(sprintf('post.php?post=%d&action=edit', $order_id))
        )
    );
}, 10, 4);
```

## Filtr danych faktury

```php
/**
 * Filtruje dane faktury przed wysłaniem do API.
 *
 * @param array     $invoice_data Dane faktury w formacie dostawcy
 * @param \WC_Order $order        Zamówienie WooCommerce
 * @param string    $provider     Nazwa dostawcy
 */
apply_filters('polski_pro/accounting/invoice_data', array $invoice_data, \WC_Order $order, string $provider): array;
```

**Przykład - dodanie uwag do faktury:**

```php
add_filter('polski_pro/accounting/invoice_data', function (
    array $invoice_data,
    \WC_Order $order,
    string $provider
): array {
    if ($provider === 'fakturownia') {
        $invoice_data['invoice']['description'] = sprintf(
            'Zamówienie internetowe #%s',
            $order->get_order_number()
        );
    }
    return $invoice_data;
}, 10, 3);
```

## Panel administracyjny

### Status synchronizacji

Na liście zamówień kolumna "Faktura" pokazuje:

- Zielona ikona - faktura wystawiona pomyślnie
- Żółta ikona - w trakcie wysyłania / retry
- Czerwona ikona - błąd (kliknij, aby zobaczyć szczegóły)
- Szara ikona - nie dotyczy (brak automatycznego wystawiania)

### Ręczne wystawianie

W panelu **Faktura** na stronie zamówienia administrator może:

1. Wystawić fakturę ręcznie (jeśli automatyczne wystawianie zawiodło)
2. Pobrać PDF faktury
3. Ponowić wysłanie faktury
4. Wyświetlić log prób i błędów

## Rozwiązywanie problemów

**Faktura nie jest wystawiana automatycznie**
Sprawdź, czy status wyzwalający jest poprawny. Upewnij się, że Action Scheduler działa (WooCommerce > Status > Zaplanowane akcje). Sprawdź log błędów w **WooCommerce > Status > Logi**.

**Błąd "Unauthorized" przy połączeniu z API**
Zweryfikuj dane uwierzytelniające. W przypadku wFirma sprawdź, czy API key i secret są z konta głównego (nie subkonta). W Fakturowni upewnij się, że subdomena jest poprawna.

**Duplikaty faktur**
Moduł sprawdza meta `_polski_pro_invoice_id` przed wystawieniem, aby uniknąć duplikatów. Jeśli duplikaty występują, sprawdź, czy inna wtyczka nie wyzwala tego samego hooka.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Powiązane: [PRO REST API](/pro/pro-api)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
