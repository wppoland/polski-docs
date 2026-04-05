---
title: Import a export CSV
description: Import a export dat CSV v Polski for WooCommerce - pole GPSR, greenwashing a data produktu.
---

Rozsireni importeru/exporteru CSV WooCommerce o sloupce pravnich dat, GPSR, environmentalnich prohlaseni a dalsich poli vyzeadovanych polskym a unijnim pravem.

## Podporovana pole CSV

### Pole GPSR (General Product Safety Regulation)

| Sloupec CSV | Meta klic | Typ | Popis |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `gpsr_manufacturer_name` | `_polski_gpsr_manufacturer_name` | string | Nazev vyrobce |
| `gpsr_manufacturer_address` | `_polski_gpsr_manufacturer_address` | string | Adresa vyrobce |
| `gpsr_manufacturer_email` | `_polski_gpsr_manufacturer_email`| string | E-mail vyrobce |
| `gpsr_manufacturer_phone` | `_polski_gpsr_manufacturer_phone`| string | Telefon vyrobce |
| `gpsr_manufacturer_url` | `_polski_gpsr_manufacturer_url` | string | Web vyrobce |
| `gpsr_authorized_rep_name` | `_polski_gpsr_auth_rep_name` | string | Nazev opravneneho zastupce |
| `gpsr_authorized_rep_address` | `_polski_gpsr_auth_rep_address` | string | Adresa opravneneho zastupce |
| `gpsr_authorized_rep_email` | `_polski_gpsr_auth_rep_email` | string | E-mail opravneneho zastupce |
| `gpsr_safety_info` | `_polski_gpsr_safety_info` | string | Bezpecnostni informace |
| `gpsr_warnings` | `_polski_gpsr_warnings` | string | Varovani k produktu |
| `gpsr_barcode_type` | `_polski_gpsr_barcode_type` | string | Typ kodu: EAN, UPC, GTIN |
| `gpsr_barcode_value` | `_polski_gpsr_barcode_value` | string | Hodnota caroveho kodu |
| `gpsr_country_of_origin` | `_polski_gpsr_country_origin` | string | Zeme puvodu (ISO kod) |

### Pole greenwashing (anti-greenwashing)

| Sloupec CSV | Meta klic | Typ | Popis |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `green_claim_text` | `_polski_green_claim` | string | Obsah environmentalniho prohlaseni |
| `green_claim_evidence` | `_polski_green_evidence` | string | Dukazy / zduvodneni |
| `green_certification_name` | `_polski_green_cert_name` | string | Nazev certifikatu |
| `green_certification_number` | `_polski_green_cert_number` | string | Cislo certifikatu |
| `green_certification_url` | `_polski_green_cert_url` | string | Odkaz na certifikat |
| `green_carbon_footprint` | `_polski_green_carbon` | float | Uhlikova stopa (kg CO2) |
| `green_recyclable` | `_polski_green_recyclable` | bool | Zda je produkt recyklovatelny |
| `green_durability_years` | `_polski_green_durability` | int | Trvanlivost produktu v letech |

### Pole dat produktu

| Sloupec CSV | Meta klic | Typ | Popis |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `unit_price` | `_polski_unit_price` | float | Jednotkova cena |
| `unit_price_unit` | `_polski_unit_price_unit` | string | Jednotka: kg, l, m, ks |
| `delivery_time_min` | `_polski_delivery_min` | int | Min. doba dodani (dny) |
| `delivery_time_max` | `_polski_delivery_max` | int | Max. doba dodani (dny) |
| `manufacturer_name` | `_polski_manufacturer` | string | Nazev vyrobce |
| `gtin` | `_polski_gtin` | string | Kod GTIN/EAN |
| `withdrawal_excluded` | `_polski_withdrawal_excluded` | bool | Vyloucen z prava na odstoupeni |

### Pole potravinovych produktu

| Sloupec CSV | Meta klic | Typ | Popis |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `energy_kcal` | `_polski_energy_kcal` | float | Energie (kcal/100g) |
| `energy_kj` | `_polski_energy_kj` | float | Energie (kJ/100g) |
| `fat` | `_polski_fat` | float | Tuky (g/100g) |
| `saturated_fat` | `_polski_saturated_fat` | float | Nasycene mastne kyseliny |
| `carbohydrates` | `_polski_carbohydrates` | float | Sacharidy (g/100g) |
| `sugars` | `_polski_sugars` | float | Cukry (g/100g) |
| `protein` | `_polski_protein` | float | Bilkoviny (g/100g) |
| `salt` | `_polski_salt` | float | Sul (g/100g) |
| `fiber` | `_polski_fiber` | float | Vlaknina (g/100g) |
| `allergens` | `_polski_allergens` | string | Alergeny (oddelene carkou) |
| `nutri_score` | `_polski_nutri_score` | string | Nutri-Score: A, B, C, D, E |

## Prikladny CSV soubor

```csv
ID,SKU,Name,gpsr_manufacturer_name,gpsr_manufacturer_address,gpsr_manufacturer_email,gpsr_barcode_type,gpsr_barcode_value,gpsr_country_of_origin,unit_price,unit_price_unit,delivery_time_min,delivery_time_max,manufacturer_name
123,SKU-001,"Koszulka bawełniana","Producent XYZ Sp. z o.o.","ul. Fabryczna 1, 00-001 Warszawa","kontakt@xyz.pl","EAN","5901234123457","PL",49.99,"szt",2,5,"XYZ"
```

## CSV import

### Pres administracni panel

1. Prejdete do **WooCommerce > Produkty > Importovat**
2. Zvolte soubor CSV
3. V etape mapovani sloupcu - sloupce Polski for WooCommerce se objevi automaticky v sekci **Polski for WooCommerce**
4. Namapujte sloupce CSV na prislusna pole
5. Spustte import

### Pres WP-CLI

```bash
wp wc product_csv_importer run /cesta/k/souboru.csv --user=admin
```

### Programove

```php
add_filter('polski/csv/import_data', function (array $data, array $raw_row): array {
    // Validace kodu GTIN
    if (!empty($data['gpsr_barcode_value'])) {
        $gtin = $data['gpsr_barcode_value'];
        if (strlen($gtin) !== 13 && strlen($gtin) !== 8) {
            $data['gpsr_barcode_value'] = '';
        }
    }
    return $data;
}, 10, 2);
```

## Validace importu

Import automaticky validuje data:

- **GTIN/EAN** - kontrola kontrolni cislice (algoritmus modulo 10)
- **E-mail** - validace formatu e-mailove adresy
- **URL** - validace formatu URL
- **Zeme** - kontrola kodu ISO 3166-1 alpha-2
- **Alergeny** - overeni zda hodnoty patri k definovanemu seznamu (14 alergenu EU)
- **Nutri-Score** - kontrola zda hodnota je A, B, C, D nebo E

Nespravne hodnoty jsou logovany a preskakovany (neblokuji import).

## Reseni problemu

**Sloupce Polski se nezobrazuji v mapovani** - ujistete se, ze plugin Polski for WooCommerce je aktivni.

**Import konci timeoutem** - zvyste `max_execution_time` PHP nebo pouzijte WP-CLI pro import velkych souboru.

**Specialni znaky jsou poskozeny** - ujistete se, ze soubor CSV je ulozen v kodovani UTF-8 (bez BOM).

**Ciselne hodnoty se neimportuji** - oddelovac desetinnych mist v souboru CSV by mel byt tecka (.), ne carka.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
