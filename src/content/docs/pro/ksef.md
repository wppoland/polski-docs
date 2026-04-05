---
title: Integracja z KSeF
description: Dokumentacja integracji Polski PRO for WooCommerce z Krajowym Systemem e-Faktur - wysyłka faktur, śledzenie statusów, konfiguracja API i obsługa błędów.
---

Moduł KSeF w Polski PRO for WooCommerce umożliwia wysyłkę faktur elektronicznych do Krajowego Systemu e-Faktur prowadzonego przez Ministerstwo Finansów. Faktury są przesyłane asynchronicznie z automatycznym ponawianiem w przypadku błędów.

## Czym jest KSeF

Krajowy System e-Faktur (KSeF) to platforma Ministerstwa Finansów do wystawiania, przechowywania i odbierania faktur ustrukturyzowanych w formacie XML. Plugin zapewnia narzędzia do integracji WooCommerce z KSeF - generuje faktury w wymaganym formacie XML i przesyła je do systemu.

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

KSeF udostępnia środowisko testowe (sandbox) do weryfikacji integracji. Środowisko testowe:

- nie wymaga prawdziwego klucza autoryzacyjnego
- przyjmuje faktury w identycznym formacie jak środowisko produkcyjne
- nie przesyła danych do Urzędu Skarbowego
- jest zalecane do pierwszych testów integracji

Po pozytywnej weryfikacji w środowisku testowym przełącz na środowisko produkcyjne i wprowadź właściwy klucz API.

### Uzyskanie tokena API

1. Zaloguj się do portalu KSeF: https://ksef.mf.gov.pl/
2. Przejdź do sekcji zarządzania tokenami
3. Wygeneruj nowy token z uprawnieniami do wystawiania faktur
4. Skopiuj token i wklej go w ustawieniach pluginu

## Wysyłka faktur

### Automatyczna wysyłka

Po włączeniu opcji **Automatyczna wysyłka do KSeF** plugin wysyła fakturę do KSeF automatycznie po zmianie jej statusu na "Wystawiona" (Issued). Wysyłka odbywa się asynchronicznie przez Action Scheduler.

### Ręczna wysyłka

W panelu zamówienia w meta boxie "Faktury" dostępny jest przycisk **Wyślij do KSeF**. Kliknięcie dodaje zadanie wysyłki do kolejki Action Scheduler.

### Przetwarzanie asynchroniczne

Plugin wykorzystuje Action Scheduler (wbudowany w WooCommerce) do asynchronicznej wysyłki faktur. Oznacza to, że:

- wysyłka nie blokuje obsługi zamówienia
- faktury są wysyłane w kolejce, jedna po drugiej
- w przypadku dużej liczby faktur system przetwarza je stopniowo

## Generowanie XML

Plugin generuje fakturę w formacie XML zgodnym ze schematem KSeF (FA(2)). Dokument XML zawiera:

- nagłówek z datą i typem faktury
- dane sprzedawcy (NIP, nazwa, adres)
- dane nabywcy (NIP, nazwa, adres)
- pozycje faktury (nazwa, ilość, cena netto, stawka VAT, wartość)
- podsumowanie z rozbiciem na stawki VAT
- informacje o płatności

XML jest walidowany przed wysyłką. Jeśli walidacja wykryje błędy, faktura nie zostanie wysłana, a w logu pojawi się szczegółowy komunikat.

## Śledzenie statusu

Po wysłaniu faktury do KSeF plugin śledzi jej status:

| Status | Opis |
|--------|------|
| Queued | Faktura dodana do kolejki wysyłki |
| Submitted | Faktura przesłana do KSeF, oczekuje na przetworzenie |
| Accepted | Faktura zaakceptowana przez KSeF, nadany numer KSeF |
| Rejected | Faktura odrzucona - sprawdź komunikat błędu |
| Error | Błąd komunikacji z API KSeF |

Po zaakceptowaniu faktury plugin zapisuje numer referencyjny KSeF w metadanych faktury. Numer ten jest widoczny w panelu zamówienia i na wydruku PDF.

### Polling statusu

Plugin automatycznie sprawdza status wysłanych faktur. Po przesłaniu faktury do KSeF plugin odpytuje API o status co kilka minut (przez Action Scheduler), aż do otrzymania odpowiedzi "Accepted" lub "Rejected".

## Obsługa błędów i ponawianie

W przypadku błędu komunikacji z API KSeF plugin stosuje mechanizm exponential backoff:

| Próba | Opóźnienie |
|-------|-----------|
| 1. ponowienie | 5 minut |
| 2. ponowienie | 25 minut |
| 3. ponowienie | 125 minut |

Po trzech nieudanych próbach faktura otrzymuje status "Error" i wymaga ręcznej interwencji. Administrator otrzymuje powiadomienie e-mail o nieudanej wysyłce.

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

Plugin loguje wszystkie operacje KSeF w logu WooCommerce. Przejdź do **WooCommerce > Status > Logi** i wybierz źródło `polski-pro-ksef`.

Logowane zdarzenia:

- wysyłka faktury (request/response)
- sprawdzenie statusu
- błędy walidacji XML
- błędy komunikacji z API
- ponowienia wysyłki

### Testowanie połączenia

W ustawieniach modułu KSeF dostępny jest przycisk **Testuj połączenie**. Wysyła on testowe żądanie do API KSeF i weryfikuje:

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
