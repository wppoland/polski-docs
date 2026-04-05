---
title: Import i eksport CSV
description: Import i eksport danych CSV w Polski for WooCommerce - pola GPSR, greenwashing i dane produktów.
---

Polski for WooCommerce rozszerza wbudowany importer/eksporter CSV WooCommerce o dodatkowe kolumny dla danych prawnych, GPSR, oświadczeń środowiskowych i innych pól specyficznych dla polskiego i unijnego prawa.

## Obsługiwane pola CSV

### Pola GPSR (General Product Safety Regulation)

| Kolumna CSV                      | Meta key                         | Typ    | Opis                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `gpsr_manufacturer_name`         | `_polski_gpsr_manufacturer_name` | string | Nazwa producenta               |
| `gpsr_manufacturer_address`      | `_polski_gpsr_manufacturer_address` | string | Adres producenta            |
| `gpsr_manufacturer_email`        | `_polski_gpsr_manufacturer_email`| string | E-mail producenta              |
| `gpsr_manufacturer_phone`        | `_polski_gpsr_manufacturer_phone`| string | Telefon producenta             |
| `gpsr_manufacturer_url`          | `_polski_gpsr_manufacturer_url`  | string | Strona www producenta          |
| `gpsr_authorized_rep_name`       | `_polski_gpsr_auth_rep_name`     | string | Nazwa upoważnionego przedstawiciela |
| `gpsr_authorized_rep_address`    | `_polski_gpsr_auth_rep_address`  | string | Adres upoważnionego przedstawiciela |
| `gpsr_authorized_rep_email`      | `_polski_gpsr_auth_rep_email`    | string | E-mail upoważnionego przedstawiciela |
| `gpsr_safety_info`               | `_polski_gpsr_safety_info`       | string | Informacje o bezpieczeństwie    |
| `gpsr_warnings`                  | `_polski_gpsr_warnings`          | string | Ostrzeżenia dotyczące produktu  |
| `gpsr_barcode_type`              | `_polski_gpsr_barcode_type`      | string | Typ kodu: EAN, UPC, GTIN       |
| `gpsr_barcode_value`             | `_polski_gpsr_barcode_value`     | string | Wartość kodu kreskowego         |
| `gpsr_product_type`              | `_polski_gpsr_product_type`      | string | Typ produktu wg GPSR            |
| `gpsr_country_of_origin`         | `_polski_gpsr_country_origin`    | string | Kraj pochodzenia (kod ISO)      |

### Pola greenwashing (anty-greenwashing)

| Kolumna CSV                      | Meta key                         | Typ    | Opis                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `green_claim_text`               | `_polski_green_claim`            | string | Treść oświadczenia środowiskowego |
| `green_claim_evidence`           | `_polski_green_evidence`         | string | Dowody / uzasadnienie          |
| `green_certification_name`       | `_polski_green_cert_name`        | string | Nazwa certyfikatu              |
| `green_certification_number`     | `_polski_green_cert_number`      | string | Numer certyfikatu              |
| `green_certification_url`        | `_polski_green_cert_url`         | string | Link do certyfikatu            |
| `green_carbon_footprint`         | `_polski_green_carbon`           | float  | Ślad węglowy (kg CO2)          |
| `green_recyclable`               | `_polski_green_recyclable`       | bool   | Czy produkt jest recyklingowalny |
| `green_durability_years`         | `_polski_green_durability`       | int    | Trwałość produktu w latach     |

### Pola danych produktów

| Kolumna CSV                      | Meta key                         | Typ    | Opis                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `unit_price`                     | `_polski_unit_price`             | float  | Cena jednostkowa               |
| `unit_price_unit`                | `_polski_unit_price_unit`        | string | Jednostka: kg, l, m, szt       |
| `unit_price_base`                | `_polski_unit_price_base`        | float  | Baza przeliczeniowa            |
| `delivery_time_min`              | `_polski_delivery_min`           | int    | Min. czas dostawy (dni)        |
| `delivery_time_max`              | `_polski_delivery_max`           | int    | Max. czas dostawy (dni)        |
| `manufacturer_name`              | `_polski_manufacturer`           | string | Nazwa producenta               |
| `manufacturer_url`               | `_polski_manufacturer_url`       | string | URL producenta                 |
| `gtin`                           | `_polski_gtin`                   | string | Kod GTIN/EAN                   |
| `withdrawal_excluded`            | `_polski_withdrawal_excluded`    | bool   | Wyłączony z prawa odstąpienia  |
| `withdrawal_reason`              | `_polski_withdrawal_reason`      | string | Powód wyłączenia z odstąpienia |

### Pola produktów spożywczych

| Kolumna CSV                      | Meta key                         | Typ    | Opis                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `energy_kcal`                    | `_polski_energy_kcal`            | float  | Energia (kcal/100g)            |
| `energy_kj`                      | `_polski_energy_kj`              | float  | Energia (kJ/100g)              |
| `fat`                            | `_polski_fat`                    | float  | Tłuszcz (g/100g)              |
| `saturated_fat`                  | `_polski_saturated_fat`          | float  | Kwasy tłuszczowe nasycone      |
| `carbohydrates`                  | `_polski_carbohydrates`          | float  | Węglowodany (g/100g)          |
| `sugars`                         | `_polski_sugars`                 | float  | Cukry (g/100g)                |
| `protein`                        | `_polski_protein`                | float  | Białko (g/100g)               |
| `salt`                           | `_polski_salt`                   | float  | Sól (g/100g)                  |
| `fiber`                          | `_polski_fiber`                  | float  | Błonnik (g/100g)              |
| `allergens`                      | `_polski_allergens`              | string | Alergeny (oddzielone przecinkiem) |
| `nutri_score`                    | `_polski_nutri_score`            | string | Nutri-Score: A, B, C, D, E     |

## Przykładowy plik CSV

```csv
ID,SKU,Name,gpsr_manufacturer_name,gpsr_manufacturer_address,gpsr_manufacturer_email,gpsr_barcode_type,gpsr_barcode_value,gpsr_country_of_origin,unit_price,unit_price_unit,delivery_time_min,delivery_time_max,manufacturer_name
123,SKU-001,"Koszulka bawełniana","Producent XYZ Sp. z o.o.","ul. Fabryczna 1, 00-001 Warszawa","kontakt@xyz.pl","EAN","5901234123457","PL",49.99,"szt",2,5,"XYZ"
456,SKU-002,"Olej rzepakowy 1L","Olejarnia ABC","ul. Polna 5, 60-001 Poznań","info@abc.pl","EAN","5901234567890","PL",12.99,"l",1,3,"ABC"
```

## Import CSV

### Przez panel admina

1. Przejdź do **WooCommerce > Produkty > Import**
2. Wybierz plik CSV
3. Na etapie mapowania kolumn - kolumny Polski for WooCommerce pojawią się automatycznie w sekcji **Polski for WooCommerce**
4. Zmapuj kolumny CSV na odpowiednie pola
5. Uruchom import

### Przez WP-CLI

```bash
wp wc product_csv_importer run /sciezka/do/pliku.csv --user=admin
```

### Programowo

```php
// Hook do modyfikacji importowanych danych
add_filter('polski/csv/import_data', function (array $data, array $raw_row): array {
    // Walidacja kodu GTIN
    if (!empty($data['gpsr_barcode_value'])) {
        $gtin = $data['gpsr_barcode_value'];
        if (strlen($gtin) !== 13 && strlen($gtin) !== 8) {
            $data['gpsr_barcode_value'] = ''; // Odrzuć nieprawidłowy kod
        }
    }
    return $data;
}, 10, 2);
```

## Eksport CSV

### Przez panel admina

1. Przejdź do **WooCommerce > Produkty > Eksport**
2. W sekcji **Kolumny do eksportu** zaznacz kolumny z grupy **Polski for WooCommerce**
3. Opcjonalnie filtruj po kategorii, statusie lub typie produktu
4. Kliknij **Generuj CSV**

### Przez WP-CLI

```bash
wp wc product_csv_exporter run --filename=produkty-polski.csv --user=admin
```

### Filtrowanie kolumn eksportu

```php
// Dodanie własnych kolumn do eksportu
add_filter('polski/csv/export_columns', function (array $columns): array {
    $columns['custom_field'] = 'Własne pole';
    return $columns;
});

// Wartość własnej kolumny
add_filter('polski/csv/export_column_value', function ($value, string $column, WC_Product $product) {
    if ($column === 'custom_field') {
        return $product->get_meta('_my_custom_field');
    }
    return $value;
}, 10, 3);
```

## Walidacja importu

Import automatycznie waliduje dane:

- **GTIN/EAN** - sprawdzenie cyfry kontrolnej (algorytm modulo 10)
- **E-mail** - walidacja formatu adresu e-mail
- **URL** - walidacja formatu URL
- **Kraj** - sprawdzenie kodu ISO 3166-1 alpha-2
- **Alergeny** - weryfikacja czy wartości należą do zdefiniowanej listy (14 alergenów UE)
- **Nutri-Score** - sprawdzenie czy wartość to A, B, C, D lub E

Nieprawidłowe wartości są logowane i pomijane (nie blokują importu). Log dostępny po imporcie w sekcji wyników.

## Import masowy danych GPSR

Dla sklepów z dużą liczbą produktów, gdzie producent jest wspólny dla wielu produktów:

```bash
# Przygotuj CSV z minimalnymi danymi
# ID,gpsr_manufacturer_name,gpsr_manufacturer_address,gpsr_manufacturer_email
```

Następnie ustaw domyślne wartości GPSR w **WooCommerce > Polski > Zgodność prawna > GPSR > Domyślne wartości**. Import uzupełni tylko te produkty, które mają puste pola GPSR.

## Rozwiązywanie problemów

**Kolumny Polski nie pojawiają się w mapowaniu** - upewnij się, że wtyczka Polski for WooCommerce jest aktywna. Kolumny rejestrowane są hookiem `woocommerce_csv_product_import_mapping_options`.

**Import kończy się timeout** - zwiększ `max_execution_time` PHP lub użyj WP-CLI do importu dużych plików.

**Znaki specjalne są uszkodzone** - upewnij się, że plik CSV jest zapisany w kodowaniu UTF-8 (bez BOM).

**Wartości liczbowe nie importują się** - separator dziesiętny w pliku CSV powinien być kropką (.), nie przecinkiem.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
