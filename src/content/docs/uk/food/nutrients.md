---
title: Харчова цінність
description: Таблиця харчової цінності у форматі JSON на 100 г або 100 мл з shortcode для відображення на сторінці продукту WooCommerce.
---

Регламент (ЄС) nr 1169/2011 вимагає, щоб на упаковці (та в інтернет-магазині) харчового продукту була таблиця харчової цінності. Плагін Polski for WooCommerce дозволяє внести повну таблицю харчової цінності для кожного продукту та відобразити її у зрозумілому форматі відповідно до регламенту.

## Обов'язкові поживні речовини

Відповідно до ст. 30 регламенту FIC, таблиця харчової цінності повинна містити щонайменше:

| Речовина | Одиниця | Ключ JSON |
|----------|---------|-----------|
| Енергетична цінність | кДж / ккал | `energy_kj`, `energy_kcal` |
| Жири | г | `fat` |
| в тому числі насичені жирні кислоти | г | `saturated_fat` |
| Вуглеводи | г | `carbohydrates` |
| в тому числі цукри | г | `sugars` |
| Білок | г | `protein` |
| Сіль | г | `salt` |

## Необов'язкові поживні речовини

Додатково можна вказати (ст. 30 п. 2 FIC):

| Речовина | Одиниця | Ключ JSON |
|----------|---------|-----------|
| Мононенасичені жирні кислоти | г | `monounsaturated_fat` |
| Поліненасичені жирні кислоти | г | `polyunsaturated_fat` |
| Багатоатомні спирти (поліоли) | г | `polyols` |
| Крохмаль | г | `starch` |
| Клітковина | г | `fibre` |
| Вітамін A | мкг | `vitamin_a` |
| Вітамін D | мкг | `vitamin_d` |
| Вітамін E | мг | `vitamin_e` |
| Вітамін K | мкг | `vitamin_k` |
| Вітамін C | мг | `vitamin_c` |
| Тіамін (B1) | мг | `thiamine` |
| Рибофлавін (B2) | мг | `riboflavin` |
| Ніацин (B3) | мг | `niacin` |
| Вітамін B6 | мг | `vitamin_b6` |
| Фолієва кислота | мкг | `folic_acid` |
| Вітамін B12 | мкг | `vitamin_b12` |
| Біотин | мкг | `biotin` |
| Пантотенова кислота | мг | `pantothenic_acid` |
| Калій | мг | `potassium` |
| Хлор | мг | `chloride` |
| Кальцій | мг | `calcium` |
| Фосфор | мг | `phosphorus` |
| Магній | мг | `magnesium` |
| Залізо | мг | `iron` |
| Цинк | мг | `zinc` |
| Мідь | мг | `copper` |
| Марганець | мг | `manganese` |
| Фторид | мг | `fluoride` |
| Селен | мкг | `selenium` |
| Хром | мкг | `chromium` |
| Молібден | мкг | `molybdenum` |
| Йод | мкг | `iodine` |

## Налаштування

### Увімкнення модуля

Перейдіть до **WooCommerce > Налаштування > Polski > Харчування** та активуйте підмодуль "Харчова цінність".

### Параметри

| Налаштування | За замовчуванням | Опис |
|--------------|------------------|------|
| Одиниця виміру | на 100 г | Одиниця за замовчуванням: на 100 г або на 100 мл |
| Відображати % РДН | Так | Референтна добова норма (% добової потреби) |
| Позиція таблиці | Вкладка | Де відображати таблицю на сторінці продукту |
| Необов'язкові речовини | Клітковина, вітаміни | Які необов'язкові речовини відображати |

## Введення даних у редакторі продукту

У вкладці "Харчування" в редакторі продукту знаходиться форма харчової цінності. Заповніть поля числовими значеннями на 100 г або 100 мл.

### Одиниця виміру для окремого продукту

Кожен продукт може мати індивідуальну одиницю виміру. Напої повинні мати встановлено "на 100 мл", тверді продукти - "на 100 г". Якщо не встановити, буде використано значення за замовчуванням з налаштувань.

### Порція

Необов'язково можна також вказати розмір порції та харчову цінність на порцію:

| Поле | Опис |
|------|------|
| Розмір порції | наприклад, "30 г", "250 мл", "1 скибочка (25 г)" |
| Кількість порцій в упаковці | наприклад, "10" |

## Формат JSON

Харчова цінність зберігається в базі даних як JSON у мета-полі `_polski_nutrients`. Формат:

```json
{
    "energy_kj": 1046,
    "energy_kcal": 250,
    "fat": 9.5,
    "saturated_fat": 3.2,
    "carbohydrates": 31.0,
    "sugars": 5.4,
    "fibre": 2.1,
    "protein": 8.7,
    "salt": 1.2,
    "ref_unit": "100g",
    "serving_size": "30g",
    "servings_per_package": 10
}
```

### Правила валідації

- Значення повинні бути числами (int або float)
- Десятковий роздільник у JSON: крапка (наприклад, `9.5`)
- Значення не можуть бути від'ємними
- `energy_kj` та `energy_kcal` повинні бути узгоджені (1 ккал = 4.184 кДж)
- Підкомпоненти не можуть перевищувати батьківський компонент (наприклад, `saturated_fat` <= `fat`)

## Shortcode

Використовуйте shortcode `[polski_nutrients]`, щоб відобразити таблицю харчової цінності.

### Параметри

| Параметр | Тип | За замовчуванням | Опис |
|----------|-----|------------------|------|
| `product_id` | int | поточний | ID продукту |
| `show_rws` | bool | `true` | Чи відображати % РДН |
| `show_serving` | bool | `false` | Чи відображати колонку на порцію |
| `fields` | string | `all` | Речовини для відображення (через кому) |
| `layout` | string | `table` | Макет: `table`, `list`, `compact` |
| `wrapper` | string | `div` | HTML-елемент обгортки |

### Приклади використання

Повна таблиця харчової цінності:

```html
[polski_nutrients]
```

З показниками на порцію:

```html
[polski_nutrients show_serving="true"]
```

Тільки основні речовини:

```html
[polski_nutrients fields="energy_kcal,fat,carbohydrates,protein,salt"]
```

Компактний макет (без таблиці):

```html
[polski_nutrients layout="compact"]
```

Для конкретного продукту:

```html
[polski_nutrients product_id="123" show_rws="true" show_serving="true"]
```

У шаблоні PHP:

```php
echo do_shortcode('[polski_nutrients product_id="' . $product->get_id() . '"]');
```

## Згенерована HTML-таблиця

Shortcode генерує таблицю, сумісну зі стандартом ЄС:

```html
<div class="polski-nutrients">
    <table class="polski-nutrients__table">
        <thead>
            <tr>
                <th>Wartość odżywcza</th>
                <th>per 100 g</th>
                <th>% RWS*</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Wartość energetyczna</td>
                <td>1046 kJ / 250 kcal</td>
                <td>13%</td>
            </tr>
            <tr>
                <td>Tłuszcz</td>
                <td>9,5 g</td>
                <td>14%</td>
            </tr>
            <tr class="polski-nutrients__sub">
                <td>w tym kwasy tłuszczowe nasycone</td>
                <td>3,2 g</td>
                <td>16%</td>
            </tr>
            <!-- ... -->
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">
                    * Referencyjna wartość spożycia dla przeciętnej osoby dorosłej (8400 kJ / 2000 kcal)
                </td>
            </tr>
        </tfoot>
    </table>
</div>
```

## Референтна добова норма (РДН)

Плагін обчислює % РДН автоматично на основі референтних значень з додатку XIII регламенту FIC:

| Речовина | Референтне значення |
|----------|---------------------|
| Енергія | 8400 кДж / 2000 ккал |
| Жири | 70 г |
| Насичені жирні кислоти | 20 г |
| Вуглеводи | 260 г |
| Цукри | 90 г |
| Білок | 50 г |
| Сіль | 6 г |
| Клітковина | 25 г |

## Програмний доступ

### Отримання харчової цінності

```php
$nutrients_json = get_post_meta($product_id, '_polski_nutrients', true);
$nutrients = json_decode($nutrients_json, true);

if ($nutrients) {
    $energy_kcal = $nutrients['energy_kcal'] ?? 0;
    $protein = $nutrients['protein'] ?? 0;
}
```

### Збереження харчової цінності

```php
$nutrients = [
    'energy_kj'     => 1046,
    'energy_kcal'   => 250,
    'fat'           => 9.5,
    'saturated_fat' => 3.2,
    'carbohydrates' => 31.0,
    'sugars'        => 5.4,
    'protein'       => 8.7,
    'salt'          => 1.2,
    'ref_unit'      => '100g',
];

update_post_meta($product_id, '_polski_nutrients', wp_json_encode($nutrients));
```

### Фільтр значень перед відображенням

```php
add_filter('polski/nutrients/values', function (array $nutrients, int $product_id): array {
    // Округлення значень відповідно до рекомендацій ЄС
    if (isset($nutrients['energy_kcal'])) {
        $nutrients['energy_kcal'] = round($nutrients['energy_kcal']);
    }

    return $nutrients;
}, 10, 2);
```

## Імпорт CSV

Колонка `polski_nutrients` у CSV повинна містити значення у форматі JSON:

```csv
"Musli owocowe","{""energy_kj"":1590,""energy_kcal"":380,""fat"":8.2,""saturated_fat"":1.5,""carbohydrates"":64.0,""sugars"":22.0,""fibre"":7.5,""protein"":9.8,""salt"":0.05,""ref_unit"":""100g""}"
```

Лапки всередині JSON повинні бути подвоєні (`""`) у файлі CSV.

## Стилізація CSS

```css
.polski-nutrients__table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
}

.polski-nutrients__table th,
.polski-nutrients__table td {
    padding: 0.4em 0.8em;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
}

.polski-nutrients__sub td:first-child {
    padding-left: 1.5em;
    font-style: italic;
}

.polski-nutrients__table tfoot td {
    font-size: 0.8em;
    color: #666;
    padding-top: 0.8em;
}
```

## Найпоширеніші проблеми

### Таблиця харчової цінності не відображається

1. Перевірте, чи підмодуль харчової цінності увімкнено
2. Переконайтеся, що продукт має заповнене поле `_polski_nutrients` з коректним JSON
3. Перевірте формат JSON - використовуйте валідатор (наприклад, jsonlint.com)

### Значення відображаються з крапкою замість коми

Плагін автоматично форматує числа відповідно до польських налаштувань (десяткова кома). Якщо ви бачите крапку, перевірте, чи locale WordPress встановлено на `pl_PL`.

### % РДН не відображається

Перевірте, чи опція "Відображати % РДН" увімкнена в налаштуваннях та чи параметр `show_rws` у shortcode не встановлено на `false`.

## Пов'язані ресурси

- [Модуль харчових продуктів](/uk/food/food-overview/)
- [Алергени](/uk/food/allergens/)
- [Повідомити про проблему](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
