---
title: Eksport stanów magazynowych
description: Moduł eksportu stanów magazynowych w Polski for WooCommerce - eksport CSV z filtrem progowym, obsługa wariacji, podgląd HTML i format Excel.
---

Moduł eksportu stanów magazynowych generuje pliki CSV z danymi o stanach magazynowych produktów WooCommerce. Obsługuje 10 konfigurowalnych pól, filtrowanie po progu ilości, pełną obsługę produktów wariantowych oraz tryb podglądu w tabeli HTML.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Narzędzia** i włącz **Eksport stanów magazynowych** (ID modułu: `stock_export`).

## Panel eksportu

Panel eksportu dostępny jest w **Produkty > Eksport stanów magazynowych** (`edit.php?post_type=product&page=polski-stock-export`).

### Filtr progowy

Filtruj produkty po ilości w magazynie:

| Operator | Opis                            | Przykład                        |
| -------- | ------------------------------- | ------------------------------- |
| `<=`     | Mniej lub równo                 | `<= 5` - produkty z zapasem do 5 sztuk |
| `>=`     | Więcej lub równo                | `>= 100` - produkty z dużym zapasem    |
| `=`      | Dokładnie równo                 | `= 0` - produkty bez zapasu            |

Filtr progowy pozwala szybko identyfikować produkty wymagające uzupełnienia lub produkty z nadmiernym zapasem.

Pozostaw pole progu puste, aby eksportować wszystkie produkty niezależnie od stanu magazynowego.

### Wybór pól

Zaznacz pola, które mają znaleźć się w eksporcie. Konfiguracja jest zapisywana w opcjach WordPress.

| Pole                     | Kolumna CSV              | Opis                                      |
| ------------------------ | ------------------------ | ----------------------------------------- |
| ID produktu              | `product_id`             | ID wpisu produktu (post ID)               |
| SKU                      | `sku`                    | Kod SKU produktu                          |
| Nazwa produktu           | `product_name`           | Pełna nazwa produktu                      |
| Status magazynowy        | `stock_status`           | `instock`, `outofstock`, `onbackorder`    |
| Ilość w magazynie        | `stock_quantity`         | Aktualna ilość (null jeśli nie zarządzany) |
| Zarządzanie magazynem    | `manage_stock`           | `yes` lub `no`                            |
| Próg niskiego stanu      | `low_stock_threshold`    | Próg powiadomienia o niskim stanie        |
| Dozwolone zamówienia wsteczne | `backorders`        | `no`, `notify`, `yes`                     |
| Kategoria                | `category`               | Kategorie produktu (oddzielone przecinkiem)|
| Cena                     | `price`                  | Aktualna cena produktu                    |

## Obsługa wariacji

Produkty zmienne (variable products) eksportowane są z pełną obsługą wariacji:

- **Produkt nadrzędny** - eksportowany z sumarycznym stanem magazynowym (jeśli zarządzanie magazynem jest na poziomie produktu)
- **Wariacje** - każda wariacja eksportowana jest jako osobny wiersz z własnymi danymi magazynowymi

Nazwa wariacji zawiera atrybuty w nawiasie, np. `Koszulka polo (Czerwony, XL)`.

Gdy zarządzanie magazynem jest ustawione na poziomie wariacji, produkt nadrzędny wyświetla łączny stan wszystkich wariacji.

## Tryb podglądu

Kliknij **Podgląd** zamiast **Eksportuj**, aby wyświetlić dane w tabeli HTML bezpośrednio w panelu admina. Podgląd pozwala:

- Sprawdzić dane przed eksportem
- Zweryfikować poprawność filtrów
- Szybko przejrzeć stany magazynowe bez pobierania pliku

Tabela podglądu jest sortowalna po każdej kolumnie (kliknij nagłówek). Wiersze z zerowym stanem magazynowym są podświetlone na czerwono. Wiersze z niskim stanem (poniżej progu) są podświetlone na żółto.

## Format pliku CSV

Plik CSV jest zoptymalizowany pod kątem otwierania w Microsoft Excel z polskimi ustawieniami regionalnymi:

- **BOM (Byte Order Mark)** - plik zaczyna się od znacznika UTF-8 BOM (`\xEF\xBB\xBF`), dzięki czemu Excel poprawnie rozpoznaje kodowanie
- **Separator**: średnik (`;`) - Excel z polskimi ustawieniami regionalnymi domyślnie rozpoznaje średnik jako separator kolumn
- **Kodowanie**: UTF-8
- **Separator tekstu**: podwójny cudzysłów (`"`)
- **Końce linii**: `\r\n` (Windows)

Dzięki BOM i średnikowi plik CSV można otworzyć w Excel podwójnym kliknięciem - bez konieczności importu z ustawieniem kodowania.

## Eksport

Po skonfigurowaniu filtrów i pól kliknij **Eksportuj do CSV**. Plik zostanie pobrany przez przeglądarkę z nazwą `stock-export-YYYY-MM-DD.csv`.

## WP-CLI

Eksportuj stany magazynowe z linii komend:

```bash
wp polski export stock --threshold="<=5" --output=/tmp/low-stock.csv
```

Parametry:

- `--threshold` - filtr progowy (np. `<=5`, `>=100`, `=0`)
- `--fields` - lista pól (oddzielone przecinkiem)
- `--include-variations` - uwzględnij wariacje (domyślnie `yes`)
- `--output` - ścieżka pliku wyjściowego

## Hooki

```php
// Dodaj własne pole do eksportu
add_filter('polski/stock_export/fields', function (array $fields): array {
    $fields['warehouse_location'] = [
        'label'    => 'Lokalizacja w magazynie',
        'callback' => function (\WC_Product $product): string {
            return $product->get_meta('_warehouse_location');
        },
    ];
    return $fields;
});

// Modyfikacja zapytania produktów
add_filter('polski/stock_export/query_args', function (array $args): array {
    $args['category'] = ['elektronika'];
    return $args;
});

// Zmiana separatora CSV
add_filter('polski/stock_export/csv_separator', function (): string {
    return ','; // przecinek zamiast średnika
});
```

## Rozwiązywanie problemów

**Excel wyświetla polskie znaki jako krzaczki** - upewnij się, że eksport generuje plik z BOM (domyślnie włączony). W starszych wersjach Excela (przed 2016) użyj funkcji importu danych z ręcznym ustawieniem kodowania UTF-8.

**Wariacje nie pojawiają się w eksporcie** - sprawdź, czy wariacje mają status "Opublikowane". Wariacje w wersji roboczej są pomijane.

**Filtr progowy nie działa** - filtr działa tylko na produktach z włączonym zarządzaniem magazynem (`manage_stock = yes`). Produkty bez zarządzania magazynem mają `stock_quantity = null`.

**Podgląd ładuje się zbyt długo** - przy ponad 5 000 produktów podgląd może być wolny. Użyj filtra progowego, aby ograniczyć liczbę wyników, lub eksportuj bezpośrednio do CSV.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
