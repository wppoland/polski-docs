---
title: Import a export CSV
description: Import a export CSV údajov v Polski for WooCommerce - polia GPSR, greenwashing a údaje produktov.
---

Rozšírenie importéra/exportéra CSV WooCommerce o stĺpce právnych údajov, GPSR, environmentálnych vyhlásení a ďalších polí vyžadovaných poľským a európskym právom.

## Podporované polia CSV

### Polia GPSR (General Product Safety Regulation)

| Stĺpec CSV                      | Meta kľúč                        | Typ    | Popis                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `gpsr_manufacturer_name`         | `_polski_gpsr_manufacturer_name` | string | Názov výrobcu                   |
| `gpsr_manufacturer_address`      | `_polski_gpsr_manufacturer_address` | string | Adresa výrobcu               |
| `gpsr_manufacturer_email`        | `_polski_gpsr_manufacturer_email`| string | E-mail výrobcu                  |
| `gpsr_manufacturer_phone`        | `_polski_gpsr_manufacturer_phone`| string | Telefón výrobcu                 |
| `gpsr_manufacturer_url`          | `_polski_gpsr_manufacturer_url`  | string | Webová stránka výrobcu          |
| `gpsr_authorized_rep_name`       | `_polski_gpsr_auth_rep_name`     | string | Názov oprávneného zástupcu      |
| `gpsr_authorized_rep_address`    | `_polski_gpsr_auth_rep_address`  | string | Adresa oprávneného zástupcu     |
| `gpsr_authorized_rep_email`      | `_polski_gpsr_auth_rep_email`    | string | E-mail oprávneného zástupcu     |
| `gpsr_safety_info`               | `_polski_gpsr_safety_info`       | string | Bezpečnostné informácie         |
| `gpsr_warnings`                  | `_polski_gpsr_warnings`          | string | Varovania k produktu            |
| `gpsr_barcode_type`              | `_polski_gpsr_barcode_type`      | string | Typ kódu: EAN, UPC, GTIN        |
| `gpsr_barcode_value`             | `_polski_gpsr_barcode_value`     | string | Hodnota čiarového kódu          |
| `gpsr_product_type`              | `_polski_gpsr_product_type`      | string | Typ produktu podľa GPSR         |
| `gpsr_country_of_origin`         | `_polski_gpsr_country_origin`    | string | Krajina pôvodu (ISO kód)        |

### Polia greenwashing (anti-greenwashing)

| Stĺpec CSV                      | Meta kľúč                        | Typ    | Popis                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `green_claim_text`               | `_polski_green_claim`            | string | Obsah environmentálneho vyhlásenia |
| `green_claim_evidence`           | `_polski_green_evidence`         | string | Dôkazy / odôvodnenie            |
| `green_certification_name`       | `_polski_green_cert_name`        | string | Názov certifikátu               |
| `green_certification_number`     | `_polski_green_cert_number`      | string | Číslo certifikátu               |
| `green_certification_url`        | `_polski_green_cert_url`         | string | Odkaz na certifikát             |
| `green_carbon_footprint`         | `_polski_green_carbon`           | float  | Uhlíková stopa (kg CO2)         |
| `green_recyclable`               | `_polski_green_recyclable`       | bool   | Či je produkt recyklovateľný    |
| `green_durability_years`         | `_polski_green_durability`       | int    | Trvanlivosť produktu v rokoch   |

### Polia údajov produktov

| Stĺpec CSV                      | Meta kľúč                        | Typ    | Popis                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `unit_price`                     | `_polski_unit_price`             | float  | Jednotková cena                 |
| `unit_price_unit`                | `_polski_unit_price_unit`        | string | Jednotka: kg, l, m, ks          |
| `unit_price_base`                | `_polski_unit_price_base`        | float  | Prepočítavací základ            |
| `delivery_time_min`              | `_polski_delivery_min`           | int    | Min. dodacia lehota (dni)       |
| `delivery_time_max`              | `_polski_delivery_max`           | int    | Max. dodacia lehota (dni)       |
| `manufacturer_name`              | `_polski_manufacturer`           | string | Názov výrobcu                   |
| `manufacturer_url`               | `_polski_manufacturer_url`       | string | URL výrobcu                     |
| `gtin`                           | `_polski_gtin`                   | string | Kód GTIN/EAN                    |
| `withdrawal_excluded`            | `_polski_withdrawal_excluded`    | bool   | Vylúčený z práva na odstúpenie  |
| `withdrawal_reason`              | `_polski_withdrawal_reason`      | string | Dôvod vylúčenia z odstúpenia    |

### Polia potravinárskych produktov

| Stĺpec CSV                      | Meta kľúč                        | Typ    | Popis                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `energy_kcal`                    | `_polski_energy_kcal`            | float  | Energia (kcal/100g)             |
| `energy_kj`                      | `_polski_energy_kj`              | float  | Energia (kJ/100g)              |
| `fat`                            | `_polski_fat`                    | float  | Tuky (g/100g)                   |
| `saturated_fat`                  | `_polski_saturated_fat`          | float  | Nasýtené mastné kyseliny        |
| `carbohydrates`                  | `_polski_carbohydrates`          | float  | Sacharidy (g/100g)              |
| `sugars`                         | `_polski_sugars`                 | float  | Cukry (g/100g)                  |
| `protein`                        | `_polski_protein`                | float  | Bielkoviny (g/100g)             |
| `salt`                           | `_polski_salt`                   | float  | Soľ (g/100g)                    |
| `fiber`                          | `_polski_fiber`                  | float  | Vláknina (g/100g)               |
| `allergens`                      | `_polski_allergens`              | string | Alergény (oddelené čiarkou)     |
| `nutri_score`                    | `_polski_nutri_score`            | string | Nutri-Score: A, B, C, D, E      |

## Import CSV

### Cez admin panel

1. Prejdite do **WooCommerce > Produkty > Import**
2. Vyberte CSV súbor
3. V etape mapovania stĺpcov - stĺpce Polski for WooCommerce sa zobrazia automaticky v sekcii **Polski for WooCommerce**
4. Namapujte stĺpce CSV na príslušné polia
5. Spustite import

### Cez WP-CLI

```bash
wp wc product_csv_importer run /cesta/k/suboru.csv --user=admin
```

### Programovo

```php
// Hook na úpravu importovaných údajov
add_filter('polski/csv/import_data', function (array $data, array $raw_row): array {
    // Validácia kódu GTIN
    if (!empty($data['gpsr_barcode_value'])) {
        $gtin = $data['gpsr_barcode_value'];
        if (strlen($gtin) !== 13 && strlen($gtin) !== 8) {
            $data['gpsr_barcode_value'] = ''; // Odmietnuť nesprávny kód
        }
    }
    return $data;
}, 10, 2);
```

## Export CSV

### Cez admin panel

1. Prejdite do **WooCommerce > Produkty > Export**
2. V sekcii **Stĺpce na export** zaškrtnite stĺpce zo skupiny **Polski for WooCommerce**
3. Voliteľne filtrujte podľa kategórie, stavu alebo typu produktu
4. Kliknite na **Generovať CSV**

### Cez WP-CLI

```bash
wp wc product_csv_exporter run --filename=produkty-polski.csv --user=admin
```

## Validácia importu

Import automaticky validuje údaje:

- **GTIN/EAN** - kontrola kontrolnej číslice (algoritmus modulo 10)
- **E-mail** - validácia formátu e-mailovej adresy
- **URL** - validácia formátu URL
- **Krajina** - kontrola kódu ISO 3166-1 alpha-2
- **Alergény** - overenie či hodnoty patria do definovaného zoznamu (14 alergénov EÚ)
- **Nutri-Score** - kontrola či hodnota je A, B, C, D alebo E

Nesprávne hodnoty sú logované a preskakované (neblokujú import). Log je dostupný po importe v sekcii výsledkov.

## Riešenie problémov

**Stĺpce Polski sa nezobrazujú v mapovaní** - uistite sa, že plugin Polski for WooCommerce je aktívny. Stĺpce sa registrujú hookom `woocommerce_csv_product_import_mapping_options`.

**Import končí timeoutom** - zvýšte `max_execution_time` PHP alebo použite WP-CLI na import veľkých súborov.

**Špeciálne znaky sú poškodené** - uistite sa, že CSV súbor je uložený v kódovaní UTF-8 (bez BOM).

**Číselné hodnoty sa neimportujú** - desatinný oddeľovač v CSV súbore by mal byť bodka (.), nie čiarka.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
