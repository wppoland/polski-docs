---
title: Integracja z KSeF
description: Dokumentacja integracji Polski PRO for WooCommerce z Krajowym Systemem e-Faktur - wysyłka faktur, śledzenie statusów, konfiguracja API i obsługa błędów.
---

Moduł KSeF wysyła faktury elektroniczne do Krajowego Systemu e-Faktur (Ministerstwo Finansów). Faktury wysyłane są w tle, z automatycznym ponawianiem przy błędach.

## Czym jest KSeF

KSeF to platforma Ministerstwa Finansów do obsługi faktur w formacie XML. Plugin generuje faktury w wymaganym formacie i przesyła je do KSeF.

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Moduły PRO > KSeF**.

### Ustawienia połączenia

| Ustawienie | Opis |
|------------|------|
| Włącz integrację KSeF | Aktywuje moduł |
| Środowisko | Testowe (sandbox) lub Produkcyjne |
| Klucz API (token) | Token autoryzacyjny wygenerowany w portalu KSeF |
| NIP wystawcy | NIP powiązany z kontem KSeF |

### Środowisko testowe

KSeF ma środowisko testowe (sandbox) do sprawdzenia integracji. Sandbox:

- nie wymaga prawdziwego klucza autoryzacyjnego
- przyjmuje faktury w identycznym formacie jak środowisko produkcyjne
- nie przesyła danych do Urzędu Skarbowego
- jest zalecane do pierwszych testów integracji

Po udanych testach przełącz na środowisko produkcyjne i wpisz właściwy klucz API.

### Uzyskanie tokena API

1. Zaloguj się do portalu KSeF: https://ksef.mf.gov.pl/
2. Przejdź do sekcji zarządzania tokenami
3. Wygeneruj nowy token z uprawnieniami do wystawiania faktur
4. Skopiuj token i wklej go w ustawieniach pluginu

## Wysyłka faktur

### Automatyczna wysyłka

Włącz **Automatyczna wysyłka do KSeF**, aby plugin wysyłał fakturę do KSeF po zmianie statusu na "Wystawiona". Wysyłka działa w tle przez Action Scheduler.

### Ręczna wysyłka

W meta boxie "Faktury" kliknij **Wyślij do KSeF**. Zadanie trafia do kolejki Action Scheduler.

### Przetwarzanie asynchroniczne

Plugin używa Action Scheduler (wbudowanego w WooCommerce) do wysyłki w tle:

- wysyłka nie blokuje obsługi zamówienia
- faktury wysyłane są kolejno
- duże ilości faktur przetwarzane są stopniowo

## Generowanie XML

Plugin generuje fakturę w formacie XML zgodnym ze schematem KSeF (FA(2)). Dokument XML zawiera:

- nagłówek z datą i typem faktury
- dane sprzedawcy (NIP, nazwa, adres)
- dane nabywcy (NIP, nazwa, adres)
- pozycje faktury (nazwa, ilość, cena netto, stawka VAT, wartość)
- podsumowanie z rozbiciem na stawki VAT
- informacje o płatności

XML jest walidowany przed wysyłką. Przy błędach walidacji faktura nie zostanie wysłana, a w logu pojawi się komunikat.

## Śledzenie statusu

Po wysłaniu faktury do KSeF plugin śledzi jej status:

| Status | Opis |
|--------|------|
| Queued | Faktura dodana do kolejki wysyłki |
| Submitted | Faktura przesłana do KSeF, oczekuje na przetworzenie |
| Accepted | Faktura zaakceptowana przez KSeF, nadany numer KSeF |
| Rejected | Faktura odrzucona - sprawdź komunikat błędu |
| Error | Błąd komunikacji z API KSeF |

Po zaakceptowaniu plugin zapisuje numer KSeF. Jest widoczny w panelu zamówienia i na PDF.

### Polling statusu

Plugin automatycznie sprawdza status wysłanych faktur co kilka minut (przez Action Scheduler), aż otrzyma odpowiedź "Accepted" lub "Rejected".

## Obsługa błędów i ponawianie

Przy błędach API plugin ponawia próby z rosnącym opóźnieniem (exponential backoff):

| Próba | Opóźnienie |
|-------|-----------|
| 1. ponowienie | 5 minut |
| 2. ponowienie | 25 minut |
| 3. ponowienie | 125 minut |

Po trzech nieudanych próbach faktura dostaje status "Error". Administrator otrzymuje e-mail o nieudanej wysyłce.

Typowe przyczyny błędów:

- nieprawidłowy lub wygasły token API
- błędy walidacji XML (np. brakujące dane nabywcy)
- czasowa niedostępność API KSeF
- niezgodność NIP wystawcy z tokenem

## Hooki

### `polski_pro_ksef_submit`

Akcja wywoływana przed wysłaniem faktury do KSeF.

```php
/**
 * @param int    $invoice_id ID faktury
 * @param string $xml        Wygenerowany XML faktury
 */
do_action('polski_pro_ksef_submit', int $invoice_id, string $xml);
```

**Przykład:**

```php
add_action('polski_pro_ksef_submit', function (int $invoice_id, string $xml): void {
    // Zapisanie kopii XML przed wysyłką
    $upload_dir = wp_upload_dir();
    $xml_path = $upload_dir['basedir'] . '/polski-pro/ksef-xml/';
    
    if (! is_dir($xml_path)) {
        wp_mkdir_p($xml_path);
    }
    
    file_put_contents(
        $xml_path . "invoice-{$invoice_id}.xml",
        $xml
    );
}, 10, 2);
```

### `polski_pro_ksef_check_status`

Akcja wywoływana po sprawdzeniu statusu faktury w KSeF.

```php
/**
 * @param int    $invoice_id    ID faktury
 * @param string $status        Nowy status (accepted, rejected, error)
 * @param string $ksef_number   Numer referencyjny KSeF (tylko dla accepted)
 */
do_action('polski_pro_ksef_check_status', int $invoice_id, string $status, string $ksef_number);
```

**Przykład:**

```php
add_action('polski_pro_ksef_check_status', function (int $invoice_id, string $status, string $ksef_number): void {
    if ($status === 'accepted') {
        // Powiadomienie zewnętrznego systemu o zaakceptowaniu faktury
        wp_remote_post('https://erp.example.com/api/ksef-update', [
            'body' => wp_json_encode([
                'invoice_id'  => $invoice_id,
                'ksef_number' => $ksef_number,
            ]),
            'headers' => ['Content-Type' => 'application/json'],
        ]);
    }
}, 10, 3);
```

## Diagnostyka

### Logi

Wszystkie operacje KSeF są w logu WooCommerce. Przejdź do **WooCommerce > Status > Logi** i wybierz `polski-pro-ksef`.

Logowane zdarzenia:

- wysyłka faktury (request/response)
- sprawdzenie statusu
- błędy walidacji XML
- błędy komunikacji z API
- ponowienia wysyłki

### Testowanie połączenia

Kliknij **Testuj połączenie** w ustawieniach KSeF. Test sprawdza:

- poprawność tokena
- łączność z serwerem KSeF
- zgodność NIP z tokenem

## Najczęstsze problemy

### Faktura odrzucona przez KSeF

1. Sprawdź komunikat błędu w logu WooCommerce
2. Najczęstsze przyczyny: brakujący NIP nabywcy, nieprawidłowa stawka VAT, niekompletne dane adresowe
3. Popraw dane i wyślij ponownie

### Token API nie działa

1. Upewnij się, że token nie wygasł
2. Sprawdź, czy token ma uprawnienia do wystawiania faktur
3. Zweryfikuj zgodność NIP w ustawieniach pluginu z NIP powiązanym z tokenem

### Action Scheduler nie przetwarza kolejki

1. Sprawdź, czy WP-Cron działa poprawnie
2. Przejdź do **Narzędzia > Scheduled Actions** i sprawdź stan kolejki
3. Zweryfikuj, czy nie ma zablokowanych zadań

## Powiązane zasoby

- [System faktur](/pro/invoices/)
- [Informacje o KSeF](/compliance/ksef/)
- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
