---
title: Eksport zamówień
description: Moduł eksportu zamówień w Polski for WooCommerce - eksport CSV z ponad 30 konfigurowalnymi polami, filtry daty i statusu.
---

Moduł eksportu zamówień pozwala generować pliki CSV z danymi zamówień WooCommerce. Obsługuje ponad 30 konfigurowalnych pól, filtry zakresu dat i statusów zamówień. Konfiguracja wyboru pól zapisywana jest w opcjach WordPress.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Narzędzia** i włącz **Eksport zamówień** (ID modułu: `order_export`).

## Panel eksportu

Panel eksportu dostępny jest w **WooCommerce > Polski > Narzędzia > Eksport zamówień** (`admin.php?page=polski-order-export`).

### Filtry

#### Zakres dat

Wybierz okres, z którego chcesz eksportować zamówienia:

- **Data od** - początek zakresu (pole date picker)
- **Data do** - koniec zakresu (pole date picker)
- Predefiniowane zakresy: **Dzisiaj**, **Ostatnie 7 dni**, **Ostatnie 30 dni**, **Bieżący miesiąc**, **Poprzedni miesiąc**, **Bieżący rok**

Daty odnoszą się do daty utworzenia zamówienia (`date_created`).

#### Status zamówienia

Wybierz statusy zamówień do eksportu (wielokrotny wybór):

- Oczekujące na płatność (`pending`)
- Przetwarzane (`processing`)
- Wstrzymane (`on-hold`)
- Zakończone (`completed`)
- Anulowane (`cancelled`)
- Zwrócone (`refunded`)
- Nieudane (`failed`)

Domyślnie zaznaczone są: **Przetwarzane** i **Zakończone**.

### Wybór pól

Zaznacz pola, które mają znaleźć się w pliku CSV. Konfiguracja pól zapisywana jest w opcjach WordPress i jest pamiętana między eksportami.

#### Pola zamówienia

| Pole                     | Kolumna CSV              | Opis                           |
| ------------------------ | ------------------------ | ------------------------------ |
| ID zamówienia            | `order_id`               | Numer zamówienia               |
| Data zamówienia          | `order_date`             | Data i godzina utworzenia       |
| Status                   | `order_status`           | Status zamówienia              |
| Waluta                   | `currency`               | Kod waluty (np. PLN)          |
| Metoda płatności         | `payment_method`         | Nazwa metody płatności         |
| Tytuł metody płatności   | `payment_method_title`   | Wyświetlana nazwa płatności    |
| Suma zamówienia          | `order_total`            | Kwota łączna                   |
| Suma produktów           | `order_subtotal`         | Kwota produktów (bez dostawy)  |
| Kwota podatku            | `order_tax`              | Łączna kwota podatku           |
| Koszt dostawy            | `shipping_total`         | Koszt dostawy                  |
| Metoda dostawy           | `shipping_method`        | Nazwa metody dostawy           |
| Rabat                    | `discount_total`         | Łączna kwota rabatów           |
| Kod kuponu               | `coupon_codes`           | Użyte kody kuponów             |
| Notatka klienta          | `customer_note`          | Uwagi klienta do zamówienia    |
| IP klienta               | `customer_ip`            | Adres IP klienta               |

#### Pola adresowe - rozliczeniowe

| Pole                     | Kolumna CSV              |
| ------------------------ | ------------------------ |
| Imię (rozliczeniowe)     | `billing_first_name`     |
| Nazwisko (rozliczeniowe) | `billing_last_name`      |
| Firma                    | `billing_company`        |
| NIP                      | `billing_nip`            |
| Adres linia 1            | `billing_address_1`      |
| Adres linia 2            | `billing_address_2`      |
| Miasto                   | `billing_city`           |
| Kod pocztowy             | `billing_postcode`       |
| Województwo              | `billing_state`          |
| Kraj                     | `billing_country`        |
| E-mail                   | `billing_email`          |
| Telefon                  | `billing_phone`          |

#### Pola adresowe - wysyłkowe

| Pole                     | Kolumna CSV              |
| ------------------------ | ------------------------ |
| Imię (wysyłkowe)        | `shipping_first_name`    |
| Nazwisko (wysyłkowe)    | `shipping_last_name`     |
| Firma (wysyłkowa)       | `shipping_company`       |
| Adres linia 1            | `shipping_address_1`     |
| Adres linia 2            | `shipping_address_2`     |
| Miasto                   | `shipping_city`          |
| Kod pocztowy             | `shipping_postcode`      |
| Województwo              | `shipping_state`         |
| Kraj                     | `shipping_country`       |

#### Pola produktów

| Pole                     | Kolumna CSV              | Opis                           |
| ------------------------ | ------------------------ | ------------------------------ |
| Nazwa produktu           | `product_name`           | Nazwa produktu w zamówieniu    |
| SKU                      | `product_sku`            | Kod SKU produktu               |
| Ilość                    | `product_qty`            | Zamówiona ilość                |
| Cena jednostkowa         | `product_price`          | Cena za sztukę                 |
| Suma pozycji             | `line_total`             | Łączna kwota pozycji           |

Gdy zamówienie zawiera wiele produktów, każdy produkt eksportowany jest jako osobny wiersz z powtórzonymi danymi zamówienia.

## Format pliku CSV

- **Kodowanie**: UTF-8 z BOM (dla poprawnego wyświetlania polskich znaków w Excel)
- **Separator**: średnik (`;`) - standard dla polskiego Excela
- **Separator tekstu**: podwójny cudzysłów (`"`)
- **Końce linii**: `\r\n` (Windows)

## Eksport

Po skonfigurowaniu filtrów i pól kliknij **Eksportuj do CSV**. Plik zostanie pobrany przez przeglądarkę.

Dla dużych zbiorów danych (powyżej 10 000 zamówień) eksport wykonywany jest w tle z paskiem postępu. Po zakończeniu plik dostępny jest do pobrania przez 24 godziny.

## WP-CLI

Eksportuj zamówienia z linii komend:

```bash
wp polski export orders --date-from=2025-01-01 --date-to=2025-12-31 --status=completed --output=/tmp/orders.csv
```

Parametry:

- `--date-from` - data początkowa (YYYY-MM-DD)
- `--date-to` - data końcowa (YYYY-MM-DD)
- `--status` - status zamówień (oddzielone przecinkiem)
- `--fields` - lista pól (oddzielone przecinkiem)
- `--output` - ścieżka pliku wyjściowego

## Hooki

```php
// Dodaj własne pole do eksportu
add_filter('polski/order_export/fields', function (array $fields): array {
    $fields['custom_field'] = [
        'label'    => 'Pole niestandardowe',
        'callback' => function (\WC_Order $order): string {
            return $order->get_meta('_custom_field');
        },
    ];
    return $fields;
});

// Modyfikacja zapytania zamówień
add_filter('polski/order_export/query_args', function (array $args): array {
    $args['meta_key']   = '_billing_nip';
    $args['meta_compare'] = 'EXISTS';
    return $args;
});
```

## Rozwiązywanie problemów

**Polskie znaki wyświetlają się niepoprawnie w Excel** - upewnij się, że opcja BOM jest włączona (domyślnie tak). W starszych wersjach Excela użyj importu danych z ustawieniem kodowania UTF-8.

**Eksport trwa zbyt długo** - przy bardzo dużej liczbie zamówień użyj WP-CLI zamiast interfejsu webowego. Rozważ zawężenie zakresu dat.

**Brak pola NIP w eksporcie** - pole `billing_nip` jest dostępne tylko gdy moduł NIP w kasie jest aktywny.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
