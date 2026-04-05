---
title: System faktur
description: Dokumentacja systemu faktur Polski PRO for WooCommerce - Faktura VAT, korygująca, paragon, WZ, generowanie PDF, numeracja i REST API.
---

Moduł faktur w Polski PRO for WooCommerce umożliwia generowanie dokumentów sprzedażowych bezpośrednio z poziomu WooCommerce. Obsługuje cztery typy dokumentów, automatyczną numerację, generowanie PDF i pełny cykl życia faktury.

## Typy dokumentów

### Faktura VAT

Standardowa faktura VAT zawierająca:

- dane sprzedawcy i nabywcy (w tym NIP obu stron)
- pozycje z nazwą, ilością, ceną netto, stawką VAT, kwotą VAT i ceną brutto
- podsumowanie z rozbiciem na stawki VAT
- numer faktury, datę wystawienia i datę sprzedaży
- termin i formę płatności

### Faktura korygująca

Dokument korygujący do wcześniej wystawionej faktury. Zawiera:

- numer i datę faktury korygowanej
- pozycje przed korektą i po korekcie
- różnicę wartości
- powód korekty

Fakturę korygującą można wystawić z poziomu panelu zamówienia lub przez REST API.

### Paragon

Uproszczony dokument sprzedaży dla klientów indywidualnych (bez NIP nabywcy). Zawiera pozycje z cenami brutto i podsumowanie.

### Dokument WZ (packing slip)

Dokument wydania zewnętrznego dołączany do przesyłki. Zawiera listę produktów, ilości i ewentualne uwagi do zamówienia. Nie zawiera cen.

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Moduły PRO > Faktury**.

### Dane sprzedawcy

| Pole | Opis |
|------|------|
| Nazwa firmy | Pełna nazwa firmy sprzedawcy |
| NIP | Numer identyfikacji podatkowej sprzedawcy |
| Adres | Ulica, numer, kod pocztowy, miasto |
| Numer konta bankowego | Numer rachunku do przelewów |
| E-mail kontaktowy | Adres e-mail widoczny na fakturze |

### Numeracja

Plugin oferuje kilka strategii numeracji faktur:

| Strategia | Format | Przykład |
|-----------|--------|---------|
| Roczna | `FV/{numer}/{rok}` | FV/1/2026 |
| Miesięczna | `FV/{numer}/{miesiąc}/{rok}` | FV/1/04/2026 |
| Ciągła | `FV/{numer}` | FV/1 |
| Własny wzorzec | Definiowany przez użytkownika | FV/2026/04/001 |

Dostępne tokeny w formacie własnym:

- `{numer}` - kolejny numer faktury (z zerowaniem wg strategii)
- `{rok}` - rok czterocyfrowy
- `{miesiac}` - miesiąc dwucyfrowy
- `{dzien}` - dzień dwucyfrowy
- `{id_zamowienia}` - ID zamówienia WooCommerce

### Automatyczne generowanie

Plugin może automatycznie generować fakturę po zmianie statusu zamówienia na "Zrealizowane" (completed). Włącz opcję **Automatyczne generowanie faktury** w ustawieniach modułu.

Możesz też skonfigurować automatyczne wysyłanie faktury PDF jako załącznika do e-maila WooCommerce "Zamówienie zrealizowane".

## Generowanie PDF

Faktury PDF są generowane przy użyciu biblioteki TCPDF. Szablon PDF zawiera:

- logo firmy (opcjonalne, konfigurowalne w ustawieniach)
- dane sprzedawcy i nabywcy
- tabelę pozycji z kolumnami VAT
- podsumowanie z rozbiciem na stawki VAT
- stopkę z danymi firmy

### Czcionki

Plugin używa czcionki DejaVu Sans, która obsługuje polskie znaki diakrytyczne. Nie wymaga dodatkowej konfiguracji.

## Status faktury

Każda faktura przechodzi przez cykl statusów:

```
Draft (Szkic) → Issued (Wystawiona) → Sent (Wysłana) → Paid (Opłacona)
                                                      → Cancelled (Anulowana)
```

| Status | Opis |
|--------|------|
| Draft | Faktura utworzona, ale jeszcze nie wystawiona. Można edytować |
| Issued | Faktura wystawiona z nadanym numerem. Nie można edytować |
| Sent | Faktura wysłana do klienta (e-mail lub KSeF) |
| Paid | Faktura opłacona |
| Cancelled | Faktura anulowana. Wymaga wystawienia korekty |

## Panel zamówienia

W panelu administracyjnym zamówienia WooCommerce moduł dodaje meta box "Faktury" z następującymi funkcjami:

- **Wystaw fakturę** - generuje fakturę na podstawie danych zamówienia
- **Pobierz PDF** - pobiera fakturę w formacie PDF
- **Wyślij do klienta** - wysyła fakturę e-mailem
- **Wystaw korektę** - tworzy fakturę korygującą
- **Historia** - lista wszystkich dokumentów powiązanych z zamówieniem

## VAT na pozycjach

Każda pozycja faktury zawiera szczegółowe dane VAT:

- cena netto jednostkowa
- stawka VAT (23%, 8%, 5%, 0%, zw., np., oo.)
- kwota VAT jednostkowa
- wartość netto
- wartość brutto

Plugin automatycznie rozpoznaje stawkę VAT z konfiguracji WooCommerce Tax. Obsługuje wiele stawek VAT na jednej fakturze z prawidłowym podsumowaniem.

## REST API

Moduł udostępnia endpointy REST API do zarządzania fakturami programowo.

### Lista faktur

```
GET /wp-json/polski-pro/v1/invoices
```

Parametry query:

| Parametr | Typ | Opis |
|----------|-----|------|
| `order_id` | int | Filtruj po ID zamówienia |
| `status` | string | Filtruj po statusie (draft, issued, sent, paid, cancelled) |
| `type` | string | Filtruj po typie (invoice, correction, receipt, packing_slip) |
| `date_from` | string | Data od (YYYY-MM-DD) |
| `date_to` | string | Data do (YYYY-MM-DD) |
| `per_page` | int | Liczba wyników na stronę (domyślnie 20) |
| `page` | int | Numer strony |

### Tworzenie faktury

```
POST /wp-json/polski-pro/v1/invoices
```

```json
{
    "order_id": 123,
    "type": "invoice",
    "auto_number": true
}
```

### Pobieranie PDF

```
GET /wp-json/polski-pro/v1/invoices/{id}/pdf
```

Zwraca plik PDF jako `application/pdf` z nagłówkiem `Content-Disposition: attachment`.

### Wystawianie korekty

```
POST /wp-json/polski-pro/v1/invoices/{id}/correction
```

```json
{
    "reason": "Zmiana danych nabywcy",
    "items": [
        {
            "product_id": 45,
            "quantity": 1,
            "net_price": 100.00,
            "vat_rate": 23
        }
    ]
}
```

### Statystyki

```
GET /wp-json/polski-pro/v1/invoices/stats
```

Zwraca statystyki faktur: łączna liczba, wartości netto/brutto, rozbicie na statusy.

## Hooki

### `polski_pro/invoices/before_generate`

Akcja wywoływana przed wygenerowaniem faktury.

```php
/**
 * @param int    $order_id ID zamówienia
 * @param string $type     Typ dokumentu (invoice, correction, receipt, packing_slip)
 */
do_action('polski_pro/invoices/before_generate', int $order_id, string $type);
```

**Przykład:**

```php
add_action('polski_pro/invoices/before_generate', function (int $order_id, string $type): void {
    if ($type === 'invoice') {
        // Logowanie generowania faktury
        error_log("Generowanie faktury dla zamówienia #{$order_id}");
    }
}, 10, 2);
```

### `polski_pro/invoices/number_format`

Filtruje format numeru faktury.

```php
/**
 * @param string $number    Wygenerowany numer faktury
 * @param string $type      Typ dokumentu
 * @param int    $order_id  ID zamówienia
 */
apply_filters('polski_pro/invoices/number_format', string $number, string $type, int $order_id): string;
```

**Przykład:**

```php
add_filter('polski_pro/invoices/number_format', function (string $number, string $type, int $order_id): string {
    if ($type === 'correction') {
        return 'KOR/' . $number;
    }
    return $number;
}, 10, 3);
```

### `polski_pro/invoices/pdf_content`

Filtruje dane przekazywane do szablonu PDF.

```php
/**
 * @param array  $data     Dane faktury (seller, buyer, items, totals)
 * @param int    $invoice_id ID faktury
 */
apply_filters('polski_pro/invoices/pdf_content', array $data, int $invoice_id): array;
```

**Przykład:**

```php
add_filter('polski_pro/invoices/pdf_content', function (array $data, int $invoice_id): array {
    $data['footer_note'] = 'Dziękujemy za zakupy!';
    return $data;
}, 10, 2);
```

## Najczęstsze problemy

### PDF generuje puste strony

1. Sprawdź, czy rozszerzenie PHP `mbstring` jest zainstalowane
2. Upewnij się, że katalog `wp-content/uploads/polski-pro/invoices/` ma uprawnienia do zapisu (755)
3. Zweryfikuj, czy dane sprzedawcy są uzupełnione w ustawieniach

### Numeracja się resetuje

Numeracja resetuje się zgodnie z wybraną strategią - roczna resetuje się 1 stycznia, miesięczna 1. dnia każdego miesiąca. Jeśli chcesz ciągłą numerację, wybierz strategię "Ciągła".

### Brak VAT na pozycjach

Sprawdź konfigurację WooCommerce Tax. Plugin pobiera stawki VAT z ustawień podatkowych WooCommerce. Upewnij się, że stawki są poprawnie skonfigurowane dla Polski.

## Powiązane zasoby

- [Integracja KSeF](/pro/ksef/)
- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
