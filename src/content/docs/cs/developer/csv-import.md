---
title: Import a export CSV
description: Import a export dat CSV v Polski for WooCommerce - pole GPSR, greenwashing a data produktů.
---

Rozšíření importéru/exportéru CSV WooCommerce o sloupce právních dat, GPSR, environmentálních prohlášení a dalších polí vyžadovaných polským a unijním právem.

## Podporovaná pole CSV

### Pole GPSR (General Product Safety Regulation)

| Sloupec CSV                      | Meta key                         | Typ    | Popis                          |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `gpsr_manufacturer_name`         | `_polski_gpsr_manufacturer_name` | string | Název výrobce                  |
| `gpsr_manufacturer_address`      | `_polski_gpsr_manufacturer_address` | string | Adresa výrobce              |
| `gpsr_manufacturer_email`        | `_polski_gpsr_manufacturer_email`| string | E-mail výrobce                 |
| `gpsr_manufacturer_phone`        | `_polski_gpsr_manufacturer_phone`| string | Telefon výrobce                |
| `gpsr_manufacturer_url`          | `_polski_gpsr_manufacturer_url`  | string | Web výrobce                    |
| `gpsr_authorized_rep_name`       | `_polski_gpsr_auth_rep_name`     | string | Název zplnomocněného zástupce  |
| `gpsr_authorized_rep_address`    | `_polski_gpsr_auth_rep_address`  | string | Adresa zplnomocněného zástupce |
| `gpsr_authorized_rep_email`      | `_polski_gpsr_auth_rep_email`    | string | E-mail zplnomocněného zástupce |
| `gpsr_safety_info`               | `_polski_gpsr_safety_info`       | string | Bezpečnostní informace         |
| `gpsr_warnings`                  | `_polski_gpsr_warnings`          | string | Varování k produktu            |
| `gpsr_barcode_type`              | `_polski_gpsr_barcode_type`      | string | Typ kódu: EAN, UPC, GTIN       |
| `gpsr_barcode_value`             | `_polski_gpsr_barcode_value`     | string | Hodnota čárového kódu          |
| `gpsr_product_type`              | `_polski_gpsr_product_type`      | string | Typ produktu dle GPSR          |
| `gpsr_country_of_origin`         | `_polski_gpsr_country_origin`    | string | Země původu (kód ISO)          |

### Pole greenwashing (proti greenwashingu)

| Sloupec CSV                      | Meta key                         | Typ    | Popis                          |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `green_claim_text`               | `_polski_green_claim`            | string | Obsah environmentálního prohlášení |
| `green_claim_evidence`           | `_polski_green_evidence`         | string | Důkazy / odůvodnění            |
| `green_certification_name`       | `_polski_green_cert_name`        | string | Název certifikátu              |
| `green_certification_number`     | `_polski_green_cert_number`      | string | Číslo certifikátu              |
| `green_certification_url`        | `_polski_green_cert_url`         | string | Odkaz na certifikát            |
| `green_carbon_footprint`         | `_polski_green_carbon`           | float  | Uhlíková stopa (kg CO2)        |
| `green_recyclable`               | `_polski_green_recyclable`       | bool   | Zda je produkt recyklovatelný  |
| `green_durability_years`         | `_polski_green_durability`       | int    | Trvanlivost produktu v letech  |

### Pole dat produktů

| Sloupec CSV                      | Meta key                         | Typ    | Popis                          |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `unit_price`                     | `_polski_unit_price`             | float  | Jednotková cena                |
| `unit_price_unit`                | `_polski_unit_price_unit`        | string | Jednotka: kg, l, m, ks         |
| `unit_price_base`                | `_polski_unit_price_base`        | float  | Přepočtová báze                |
| `delivery_time_min`              | `_polski_delivery_min`           | int    | Min. doba dodání (dny)         |
| `delivery_time_max`              | `_polski_delivery_max`           | int    | Max. doba dodání (dny)         |
| `manufacturer_name`              | `_polski_manufacturer`           | string | Název výrobce                  |
| `manufacturer_url`               | `_polski_manufacturer_url`       | string | URL výrobce                    |
| `gtin`                           | `_polski_gtin`                   | string | Kód GTIN/EAN                   |
| `withdrawal_excluded`            | `_polski_withdrawal_excluded`    | bool   | Vyloučen z práva na odstoupení |
| `withdrawal_reason`              | `_polski_withdrawal_reason`      | string | Důvod vyloučení z odstoupení   |

### Pole potravinových produktů

| Sloupec CSV                      | Meta key                         | Typ    | Popis                          |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `energy_kcal`                    | `_polski_energy_kcal`            | float  | Energie (kcal/100g)            |
| `energy_kj`                      | `_polski_energy_kj`              | float  | Energie (kJ/100g)              |
| `fat`                            | `_polski_fat`                    | float  | Tuky (g/100g)                 |
| `saturated_fat`                  | `_polski_saturated_fat`          | float  | Nasycené mastné kyseliny       |
| `carbohydrates`                  | `_polski_carbohydrates`          | float  | Sacharidy (g/100g)            |
| `sugars`                         | `_polski_sugars`                 | float  | Cukry (g/100g)                |
| `protein`                        | `_polski_protein`                | float  | Bílkoviny (g/100g)            |
| `salt`                           | `_polski_salt`                   | float  | Sůl (g/100g)                  |
| `fiber`                          | `_polski_fiber`                  | float  | Vláknina (g/100g)             |
| `allergens`                      | `_polski_allergens`              | string | Alergeny (oddělené čárkou)     |
| `nutri_score`                    | `_polski_nutri_score`            | string | Nutri-Score: A, B, C, D, E     |

## Příklad souboru CSV

```csv
ID,SKU,Name,gpsr_manufacturer_name,gpsr_manufacturer_address,gpsr_manufacturer_email,gpsr_barcode_type,gpsr_barcode_value,gpsr_country_of_origin,unit_price,unit_price_unit,delivery_time_min,delivery_time_max,manufacturer_name
123,SKU-001,"Koszulka bawełniana","Producent XYZ Sp. z o.o.","ul. Fabryczna 1, 00-001 Warszawa","kontakt@xyz.pl","EAN","5901234123457","PL",49.99,"szt",2,5,"XYZ"
456,SKU-002,"Olej rzepakowy 1L","Olejarnia ABC","ul. Polna 5, 60-001 Poznań","info@abc.pl","EAN","5901234567890","PL",12.99,"l",1,3,"ABC"
```

## Import CSV

### Přes administrační panel

1. Přejděte do **WooCommerce > Produkty > Import**
2. Vyberte soubor CSV
3. Ve fázi mapování sloupců se sloupce Polski for WooCommerce objeví automaticky v sekci **Polski for WooCommerce**
4. Namapujte sloupce CSV na příslušná pole
5. Spusťte import

### Přes WP-CLI

```bash
wp wc product_csv_importer run /sciezka/do/pliku.csv --user=admin
```

### Programově

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

## Export CSV

### Přes administrační panel

1. Přejděte do **WooCommerce > Produkty > Export**
2. V sekci **Sloupce k exportu** zaškrtněte sloupce ze skupiny **Polski for WooCommerce**
3. Volitelně filtrujte podle kategorie, stavu nebo typu produktu
4. Klikněte na **Generovat CSV**

### Přes WP-CLI

```bash
wp wc product_csv_exporter run --filename=produkty-polski.csv --user=admin
```

### Filtrování sloupců exportu

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

## Validace importu

Import automaticky validuje data:

- **GTIN/EAN** - kontrola kontrolní číslice (algoritmus modulo 10)
- **E-mail** - validace formátu e-mailové adresy
- **URL** - validace formátu URL
- **Země** - kontrola kódu ISO 3166-1 alpha-2
- **Alergeny** - ověření, zda hodnoty patří do definovaného seznamu (14 alergenů EU)
- **Nutri-Score** - kontrola, zda je hodnota A, B, C, D nebo E

Nesprávné hodnoty jsou přeskakovány a logovány (neblokují import). Log je dostupný ve výsledcích importu.

## Hromadný import dat GPSR

Pro obchody s mnoha produkty od stejného výrobce:

```bash
# Przygotuj CSV z minimalnymi danymi
# ID,gpsr_manufacturer_name,gpsr_manufacturer_address,gpsr_manufacturer_email
```

Nastavte výchozí hodnoty GPSR v **WooCommerce > Polski > Právní soulad > GPSR > Výchozí hodnoty**. Import doplní pouze produkty s prázdnými poli GPSR.

## Řešení problémů

**Sloupce Polski se neobjevují v mapování** - ujistěte se, že je plugin Polski for WooCommerce aktivní. Sloupce jsou registrovány hookem `woocommerce_csv_product_import_mapping_options`.

**Import končí timeoutem** - zvyšte `max_execution_time` PHP nebo použijte WP-CLI pro import velkých souborů.

**Speciální znaky jsou poškozeny** - ujistěte se, že je soubor CSV uložen v kódování UTF-8 (bez BOM).

**Číselné hodnoty se neimportují** - oddělovač desetinných míst v souboru CSV by měl být tečka (.), ne čárka.

Nahlašování problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
