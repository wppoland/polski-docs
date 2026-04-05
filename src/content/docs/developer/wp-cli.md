---
title: Komendy WP-CLI
description: Komendy WP-CLI dostępne w Polski for WooCommerce - migracja danych i test poprawności konfiguracji.
---

Komendy WP-CLI do zarządzania wtyczką z wiersza poleceń. Automatyzuj migracje danych i weryfikuj konfigurację.

## Wymagania

- WordPress z aktywną wtyczką Polski for WooCommerce
- [WP-CLI](https://wp-cli.org/) w wersji 2.5 lub nowszej
- Dostęp SSH do serwera lub lokalne środowisko deweloperskie

## wp polski migrate

Migracja danych przy aktualizacji wtyczki lub przenoszeniu sklepu.

### Składnia

```bash
wp polski migrate [<migration>] [--dry-run] [--force] [--batch-size=<number>]
```

### Argumenty

| Argument       | Typ    | Wymagany | Opis                              |
| -------------- | ------ | -------- | --------------------------------- |
| `<migration>`  | string | Nie      | Nazwa migracji (pomiń = wszystkie oczekujące) |

### Opcje

| Opcja            | Opis                                          |
| ---------------- | --------------------------------------------- |
| `--dry-run`      | Wyświetl plan migracji bez wykonywania zmian  |
| `--force`        | Wymuś ponowne wykonanie migracji             |
| `--batch-size=N` | Liczba rekordów przetwarzanych w jednej partii (domyślnie 100) |

### Dostępne migracje

| Nazwa migracji            | Opis                                         |
| ------------------------- | -------------------------------------------- |
| `omnibus_price_history`   | Migracja historii cen Omnibus do nowej tabeli |
| `checkboxes_v2`           | Aktualizacja struktury checkboxów do v2      |
| `gpsr_meta`               | Migracja danych GPSR do nowego formatu meta  |
| `wishlist_to_db`          | Przeniesienie list życzeń z usermeta do dedykowanej tabeli |
| `delivery_time_format`    | Aktualizacja formatu czasu dostawy           |
| `badges_cache_rebuild`    | Odbudowa cache etykiet produktów             |
| `search_index`            | Przebudowa indeksu wyszukiwania AJAX         |

### Przykłady

Wyświetl oczekujące migracje:

```bash
wp polski migrate --dry-run
```

Wynik:

```
Oczekujące migracje:
  1. omnibus_price_history - Migracja historii cen (ok. 5200 rekordów)
  2. checkboxes_v2 - Aktualizacja checkboxów (3 rekordy)
Razem: 2 migracje
Tryb dry-run - żadne zmiany nie zostały wykonane.
```

Wykonaj wszystkie oczekujące migracje:

```bash
wp polski migrate
```

Wynik:

```
Wykonywanie migracji: omnibus_price_history...
  Przetwarzanie partii 1/52 (100 rekordów)...
  Przetwarzanie partii 2/52 (100 rekordów)...
  ...
  Migracja omnibus_price_history zakończona. Zmigrowano 5200 rekordów.

Wykonywanie migracji: checkboxes_v2...
  Migracja checkboxes_v2 zakończona. Zmigrowano 3 rekordy.

Wszystkie migracje zakończone pomyślnie.
```

Wykonaj konkretną migrację z większą partią:

```bash
wp polski migrate omnibus_price_history --batch-size=500
```

Wymuś ponowne wykonanie migracji:

```bash
wp polski migrate search_index --force
```

### Obsługa błędów

Jeśli migracja zakończy się błędem, wtyczka:

1. Wyświetli szczegółowy komunikat błędu
2. Cofnie zmiany z bieżącej partii (rollback)
3. Zapisze log do `wp-content/debug.log` (jeśli `WP_DEBUG_LOG` jest włączony)
4. Zapamiętuje punkt przerwania - kolejne uruchomienie kontynuuje od miejsca błędu

```bash
wp polski migrate omnibus_price_history
```

Wynik przy błędzie:

```
Wykonywanie migracji: omnibus_price_history...
  Przetwarzanie partii 23/52 (100 rekordów)...
  BŁĄD: Nie można zapisać rekordu #2345 - naruszenie integralności danych.
  Rollback partii 23 wykonany.
  Migracja przerwana. Wykonaj ponownie, aby kontynuować od partii 23.
```

## wp polski smoke-test

Testuje konfigurację sklepu: moduły, strony prawne, checkboxy i integracje.

### Składnia

```bash
wp polski smoke-test [--module=<module>] [--format=<format>] [--verbose]
```

### Opcje

| Opcja              | Opis                                      |
| ------------------- | ----------------------------------------- |
| `--module=<module>` | Testuj tylko wybrany moduł                |
| `--format=<format>` | Format wyjścia: table (domyślnie), json, csv |
| `--verbose`         | Szczegółowe informacje o każdym teście    |

### Testowane elementy

| Moduł              | Testy                                              |
| ------------------- | -------------------------------------------------- |
| `compliance`        | Strony prawne, checkboxy, GPSR, Omnibus, DSA       |
| `checkout`          | Przycisk zamówienia, pola NIP, DOI                 |
| `prices`            | Ceny jednostkowe, VAT, czas dostawy                |
| `food`              | Wartości odżywcze, alergeny, Nutri-Score            |
| `storefront`        | Wishlist, porównywarka, wyszukiwarka, filtry, slider |
| `integrations`      | REST API, szablony, cache, cron                     |

### Przykłady

Pełny test:

```bash
wp polski smoke-test
```

Wynik:

```
Polski for WooCommerce - Smoke Test
====================================

+---------------------+---------------------------+--------+
| Moduł               | Test                      | Status |
+---------------------+---------------------------+--------+
| compliance          | Regulamin sklepu          | OK     |
| compliance          | Polityka prywatności      | OK     |
| compliance          | Checkboxy kasy            | OK     |
| compliance          | Dane GPSR                 | WARN   |
| compliance          | Cena Omnibus              | OK     |
| compliance          | Formularz DSA             | OK     |
| checkout            | Etykieta przycisku        | OK     |
| checkout            | Pole NIP                  | OK     |
| checkout            | Double opt-in             | OFF    |
| prices              | Cena jednostkowa          | OK     |
| prices              | Informacja VAT            | OK     |
| prices              | Czas dostawy              | WARN   |
| storefront          | Wyszukiwarka AJAX         | OK     |
| storefront          | Filtry AJAX               | OK     |
| integrations        | REST API                  | OK     |
| integrations        | Szablony motywu           | OK     |
| integrations        | Cache transient           | OK     |
| integrations        | WP-Cron                   | OK     |
+---------------------+---------------------------+--------+

Wynik: 15 OK, 2 WARN, 1 OFF
```

Statusy:
- **OK** - test przeszedł pomyślnie
- **WARN** - ostrzeżenie, wymaga sprawdzenia
- **FAIL** - błąd krytyczny
- **OFF** - moduł wyłączony

Test konkretnego modułu ze szczegółami:

```bash
wp polski smoke-test --module=compliance --verbose
```

Wynik:

```
Test: compliance/regulamin
  Strona ID: 45
  Status: publish
  Ostatnia aktualizacja: 2025-06-01
  Liczba słów: 3200
  Wynik: OK

Test: compliance/gpsr
  Produkty z GPSR: 142/350 (40.6%)
  Brak danych GPSR: 208 produktów
  Wynik: WARN - Nie wszystkie produkty mają uzupełnione dane GPSR
```

Eksport do JSON (np. dla CI/CD):

```bash
wp polski smoke-test --format=json
```

```json
{
  "timestamp": "2025-06-15T12:00:00+02:00",
  "total_tests": 18,
  "passed": 15,
  "warnings": 2,
  "failed": 0,
  "disabled": 1,
  "tests": [
    {
      "module": "compliance",
      "test": "terms_page",
      "status": "ok",
      "message": "Regulamin sklepu opublikowany (ID: 45)"
    }
  ]
}
```

## Integracja z CI/CD

Komenda `smoke-test` zwraca odpowiedni kod wyjścia:

| Kod | Opis                    |
| --- | ----------------------- |
| 0   | Wszystkie testy OK      |
| 1   | Ostrzeżenia (WARN)     |
| 2   | Błędy krytyczne (FAIL) |

Przykład użycia w GitHub Actions:

```yaml
- name: Polski smoke test
  run: wp polski smoke-test --format=json > smoke-test-results.json
  continue-on-error: false
```

Przykład w skrypcie bash:

```bash
#!/bin/bash
wp polski smoke-test --format=json > /tmp/smoke-test.json

EXIT_CODE=$?
if [ $EXIT_CODE -eq 2 ]; then
    echo "Testy Polski FAILED - sprawdź konfigurację"
    exit 1
elif [ $EXIT_CODE -eq 1 ]; then
    echo "Testy Polski WARN - sprawdź ostrzeżenia"
fi
```

## Multisite

Komendy obsługują WordPress Multisite. Wskaż stronę flagą `--url`:

```bash
wp polski smoke-test --url=sklep1.twojadomena.pl
wp polski migrate --url=sklep2.twojadomena.pl
```

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
