---
title: Iмпорт та експорт CSV
description: Iмпорт та експорт даних CSV у Polski for WooCommerce - поля GPSR, greenwashing та данi продуктiв.
---

Розширення iмпортера/експортера CSV WooCommerce колонками правових даних, GPSR, екологiчних заяв та iнших полiв, необхiдних за польським та європейським правом.

## Пiдтримуванi поля CSV

### Поля GPSR (General Product Safety Regulation)

| Колонка CSV                      | Meta key                         | Тип    | Опис                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `gpsr_manufacturer_name`         | `_polski_gpsr_manufacturer_name` | string | Назва виробника                |
| `gpsr_manufacturer_address`      | `_polski_gpsr_manufacturer_address` | string | Адреса виробника            |
| `gpsr_manufacturer_email`        | `_polski_gpsr_manufacturer_email`| string | E-mail виробника               |
| `gpsr_manufacturer_phone`        | `_polski_gpsr_manufacturer_phone`| string | Телефон виробника              |
| `gpsr_manufacturer_url`          | `_polski_gpsr_manufacturer_url`  | string | Вебсайт виробника              |
| `gpsr_authorized_rep_name`       | `_polski_gpsr_auth_rep_name`     | string | Назва уповноваженого представника |
| `gpsr_authorized_rep_address`    | `_polski_gpsr_auth_rep_address`  | string | Адреса уповноваженого представника |
| `gpsr_authorized_rep_email`      | `_polski_gpsr_auth_rep_email`    | string | E-mail уповноваженого представника |
| `gpsr_safety_info`               | `_polski_gpsr_safety_info`       | string | Iнформацiя про безпеку          |
| `gpsr_warnings`                  | `_polski_gpsr_warnings`          | string | Попередження щодо продукту      |
| `gpsr_barcode_type`              | `_polski_gpsr_barcode_type`      | string | Тип коду: EAN, UPC, GTIN       |
| `gpsr_barcode_value`             | `_polski_gpsr_barcode_value`     | string | Значення штрих-коду             |
| `gpsr_product_type`              | `_polski_gpsr_product_type`      | string | Тип продукту за GPSR            |
| `gpsr_country_of_origin`         | `_polski_gpsr_country_origin`    | string | Краiна походження (код ISO)     |

### Поля greenwashing (анти-greenwashing)

| Колонка CSV                      | Meta key                         | Тип    | Опис                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `green_claim_text`               | `_polski_green_claim`            | string | Змiст екологiчної заяви        |
| `green_claim_evidence`           | `_polski_green_evidence`         | string | Докази / обгрунтування         |
| `green_certification_name`       | `_polski_green_cert_name`        | string | Назва сертифiкату              |
| `green_certification_number`     | `_polski_green_cert_number`      | string | Номер сертифiкату              |
| `green_certification_url`        | `_polski_green_cert_url`         | string | Посилання на сертифiкат        |
| `green_carbon_footprint`         | `_polski_green_carbon`           | float  | Вуглецевий слiд (кг CO2)       |
| `green_recyclable`               | `_polski_green_recyclable`       | bool   | Чи пiдлягає продукт переробцi  |
| `green_durability_years`         | `_polski_green_durability`       | int    | Довговiчнiсть продукту в роках  |

### Поля даних продуктiв

| Колонка CSV                      | Meta key                         | Тип    | Опис                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `unit_price`                     | `_polski_unit_price`             | float  | Одинична цiна                  |
| `unit_price_unit`                | `_polski_unit_price_unit`        | string | Одиниця: kg, l, m, szt         |
| `unit_price_base`                | `_polski_unit_price_base`        | float  | База перерахунку                |
| `delivery_time_min`              | `_polski_delivery_min`           | int    | Мiн. час доставки (днi)        |
| `delivery_time_max`              | `_polski_delivery_max`           | int    | Макс. час доставки (днi)       |
| `manufacturer_name`              | `_polski_manufacturer`           | string | Назва виробника                |
| `manufacturer_url`               | `_polski_manufacturer_url`       | string | URL виробника                  |
| `gtin`                           | `_polski_gtin`                   | string | Код GTIN/EAN                   |
| `withdrawal_excluded`            | `_polski_withdrawal_excluded`    | bool   | Виключений з права на вiдмову  |
| `withdrawal_reason`              | `_polski_withdrawal_reason`      | string | Причина виключення з вiдмови   |

### Поля харчових продуктiв

| Колонка CSV                      | Meta key                         | Тип    | Опис                           |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `energy_kcal`                    | `_polski_energy_kcal`            | float  | Енергiя (kcal/100g)            |
| `energy_kj`                      | `_polski_energy_kj`              | float  | Енергiя (kJ/100g)              |
| `fat`                            | `_polski_fat`                    | float  | Жири (g/100g)                  |
| `saturated_fat`                  | `_polski_saturated_fat`          | float  | Насиченi жирнi кислоти         |
| `carbohydrates`                  | `_polski_carbohydrates`          | float  | Вуглеводи (g/100g)             |
| `sugars`                         | `_polski_sugars`                 | float  | Цукри (g/100g)                 |
| `protein`                        | `_polski_protein`                | float  | Бiлок (g/100g)                 |
| `salt`                           | `_polski_salt`                   | float  | Сiль (g/100g)                  |
| `fiber`                          | `_polski_fiber`                  | float  | Клiтковина (g/100g)            |
| `allergens`                      | `_polski_allergens`              | string | Алергени (через кому)          |
| `nutri_score`                    | `_polski_nutri_score`            | string | Nutri-Score: A, B, C, D, E     |

## Приклад файлу CSV

```csv
ID,SKU,Name,gpsr_manufacturer_name,gpsr_manufacturer_address,gpsr_manufacturer_email,gpsr_barcode_type,gpsr_barcode_value,gpsr_country_of_origin,unit_price,unit_price_unit,delivery_time_min,delivery_time_max,manufacturer_name
123,SKU-001,"Koszulka bawełniana","Producent XYZ Sp. z o.o.","ul. Fabryczna 1, 00-001 Warszawa","kontakt@xyz.pl","EAN","5901234123457","PL",49.99,"szt",2,5,"XYZ"
456,SKU-002,"Olej rzepakowy 1L","Olejarnia ABC","ul. Polna 5, 60-001 Poznań","info@abc.pl","EAN","5901234567890","PL",12.99,"l",1,3,"ABC"
```

## Iмпорт CSV

### Через панель адмiнiстратора

1. Перейдiть до **WooCommerce > Продукти > Iмпорт**
2. Виберiть файл CSV
3. На етапi зiставлення колонок - колонки Polski for WooCommerce з'являться автоматично в секцii **Polski for WooCommerce**
4. Зiставте колонки CSV з вiдповiдними полями
5. Запустiть iмпорт

### Через WP-CLI

```bash
wp wc product_csv_importer run /sciezka/do/pliku.csv --user=admin
```

### Програмно

```php
// Hook для модифікації імпортованих даних
add_filter('polski/csv/import_data', function (array $data, array $raw_row): array {
    // Валідація коду GTIN
    if (!empty($data['gpsr_barcode_value'])) {
        $gtin = $data['gpsr_barcode_value'];
        if (strlen($gtin) !== 13 && strlen($gtin) !== 8) {
            $data['gpsr_barcode_value'] = ''; // Відхилити некоректний код
        }
    }
    return $data;
}, 10, 2);
```

## Експорт CSV

### Через панель адмiнiстратора

1. Перейдiть до **WooCommerce > Продукти > Експорт**
2. У секцii **Колонки для експорту** позначте колонки з групи **Polski for WooCommerce**
3. За бажанням фiльтруйте за категорiєю, статусом або типом продукту
4. Натиснiть **Генерувати CSV**

### Через WP-CLI

```bash
wp wc product_csv_exporter run --filename=produkty-polski.csv --user=admin
```

### Фiльтрацiя колонок експорту

```php
// Додавання власних колонок до експорту
add_filter('polski/csv/export_columns', function (array $columns): array {
    $columns['custom_field'] = 'Власне поле';
    return $columns;
});

// Значення власної колонки
add_filter('polski/csv/export_column_value', function ($value, string $column, WC_Product $product) {
    if ($column === 'custom_field') {
        return $product->get_meta('_my_custom_field');
    }
    return $value;
}, 10, 3);
```

## Валiдацiя iмпорту

Iмпорт автоматично валiдує данi:

- **GTIN/EAN** - перевiрка контрольної цифри (алгоритм модуль 10)
- **E-mail** - валiдацiя формату адреси e-mail
- **URL** - валiдацiя формату URL
- **Краiна** - перевiрка коду ISO 3166-1 alpha-2
- **Алергени** - верифiкацiя чи значення належать до визначеного списку (14 алергенiв ЄС)
- **Nutri-Score** - перевiрка чи значення - A, B, C, D або E

Некоректнi значення логуються та пропускаються (не блокують iмпорт). Лог доступний пiсля iмпорту в секцii результатiв.

## Масовий iмпорт даних GPSR

Для магазинiв з великою кiлькiстю продуктiв, де виробник є спiльним для багатьох продуктiв:

```bash
# Підготуйте CSV з мінімальними даними
# ID,gpsr_manufacturer_name,gpsr_manufacturer_address,gpsr_manufacturer_email
```

Потiм встановiть стандартнi значення GPSR в **WooCommerce > Polski > Юридична вiдповiднiсть > GPSR > Стандартнi значення**. Iмпорт доповнить лише тi продукти, якi мають порожнi поля GPSR.

## Вирiшення проблем

**Колонки Polski не з'являються в зiставленнi** - переконайтеся, що плагiн Polski for WooCommerce активний. Колонки реєструються хуком `woocommerce_csv_product_import_mapping_options`.

**Iмпорт завершується таймаутом** - збiльшiть `max_execution_time` PHP або використовуйте WP-CLI для iмпорту великих файлiв.

**Спецiальнi символи пошкодженi** - переконайтеся, що файл CSV збережений у кодуваннi UTF-8 (без BOM).

**Числовi значення не iмпортуються** - десятковий роздiлювач у файлi CSV повинен бути крапкою (.), а не комою.

Повiдомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
