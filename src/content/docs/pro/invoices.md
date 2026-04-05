---
title: System faktur
description: Dokumentacja systemu faktur Polski PRO for WooCommerce - Faktura VAT, korygująca, paragon, WZ, generowanie PDF, numeracja i REST API.
---

Moduł faktur generuje dokumenty sprzedażowe bezpośrednio w WooCommerce. Obsługuje cztery typy dokumentów, automatyczną numerację i PDF.

## Typy dokumentów

### Faktura VAT

Standardowa faktura VAT z danymi:

- dane sprzedawcy i nabywcy (w tym NIP obu stron)
- pozycje z nazwą, ilością, ceną netto, stawką VAT, kwotą VAT i ceną brutto
- podsumowanie z rozbiciem na stawki VAT
- numer faktury, datę wystawienia i datę sprzedaży
- termin i formę płatności

### Faktura korygująca

Korekta do wcześniejszej faktury. Zawiera:

- numer i datę faktury korygowanej
- pozycje przed korektą i po korekcie
- różnicę wartości
- powód korekty

Wystaw korektę z panelu zamówienia lub przez REST API.

### Paragon

Uproszczony dokument dla klientów bez NIP. Zawiera pozycje z cenami brutto i podsumowanie.

### Dokument WZ (packing slip)

Dokument dołączany do przesyłki. Zawiera listę produktów i ilości, bez cen.

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

Dostępne strategie numeracji:

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

Włącz opcję **Automatyczne generowanie faktury**, aby plugin tworzył fakturę po zmianie statusu na "Zrealizowane".

Możesz też włączyć automatyczne dołączanie PDF faktury do e-maila "Zamówienie zrealizowane".

## Generowanie PDF

PDF jest generowany biblioteką TCPDF. Szablon zawiera:

- logo firmy (opcjonalne, konfigurowalne w ustawieniach)
- dane sprzedawcy i nabywcy
- tabelę pozycji z kolumnami VAT
- podsumowanie z rozbiciem na stawki VAT
- stopkę z danymi firmy

### Czcionki

Plugin używa czcionki DejaVu Sans z obsługą polskich znaków. Dodatkowa konfiguracja nie jest potrzebna.

## Status faktury

Cykl statusów faktury:

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

W panelu zamówienia moduł dodaje meta box "Faktury" z funkcjami:

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

Plugin pobiera stawki VAT z konfiguracji WooCommerce Tax. Obsługuje wiele stawek na jednej fakturze.

## REST API

Endpointy REST API do zarządzania fakturami:

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

Numeracja resetuje się zgodnie ze strategią: roczna - 1 stycznia, miesięczna - 1. dnia miesiąca. Chcesz ciągłą numerację? Wybierz strategię "Ciągła".

### Brak VAT na pozycjach

Sprawdź konfigurację WooCommerce Tax. Upewnij się, że stawki VAT dla Polski są poprawnie ustawione.

## Powiązane zasoby

- [Integracja KSeF](/pro/ksef/)
- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
