---
title: Алергени
description: Декларування алергенів за допомогою таксономії polski_allergen, автоматичне виділення в інгредієнтах та shortcode для відображення у WooCommerce.
---

Вимоги ЄС зобов'язують позначати 14 алергенів на етикетці харчового продукту. В інтернет-магазині інформація про алергени має бути видима перед покупкою. Плагін Polski for WooCommerce обробляє алергени через таксономію WordPress.

## 14 основних алергенів

Відповідно до додатку II регламенту FIC, обов'язкове декларування охоплює:

| Nr | Алерген | Slug таксономії | Іконка |
|----|---------|-----------------|--------|
| 1 | Зернові, що містять глютен | `gluten` | gluten |
| 2 | Ракоподібні | `crustaceans` | skorupiaki |
| 3 | Яйця | `eggs` | jaja |
| 4 | Риба | `fish` | ryby |
| 5 | Арахіс | `peanuts` | orzeszki |
| 6 | Соя | `soy` | soja |
| 7 | Молоко (лактоза) | `milk` | mleko |
| 8 | Горіхи | `nuts` | orzechy |
| 9 | Селера | `celery` | seler |
| 10 | Гірчиця | `mustard` | gorczyca |
| 11 | Насіння кунжуту | `sesame` | sezam |
| 12 | Діоксид сірки та сульфіти | `sulphites` | siarczyny |
| 13 | Люпин | `lupin` | łubin |
| 14 | Молюски | `molluscs` | mięczaki |

## Таксономія polski_allergen

Плагін реєструє таксономію `polski_allergen`, пов'язану з типом запису `product`. Під час активації плагіна таксономія автоматично заповнюється 14 основними алергенами.

### Управління алергенами

Перейдіть до **Продукти > Алергени**, щоб керувати переліком алергенів. 14 стандартних алергенів створюються автоматично. Ви можете додавати власні алергени, специфічні для вашого асортименту.

Кожен алерген містить:

| Поле | Опис |
|------|------|
| Назва | Відображувана назва алергену (наприклад, "Mleko i produkty pochodne") |
| Slug | Ідентифікатор URL (наприклад, `milk`) |
| Опис | Додаткова інформація про алерген |
| Іконка | Необов'язкова іконка (мініатюра таксономії) |

### Призначення алергенів продукту

У редакторі продукту, у вкладці "Харчування" або в бічній панелі "Алергени", позначте відповідні алергени зі списку чекбоксів.

Доступні три режими декларування:

| Режим | Опис | Приклад |
|-------|------|---------|
| Містить | Продукт містить даний алерген | "Містить: молоко, яйця" |
| Може містити | Ризик перехресного забруднення | "Може містити: горіхи" |
| Не містить | Явне декларування відсутності (необов'язкове) | "Не містить: глютен" |

### Режим "Може містити"

Режим "Може містити" (may contain) призначений для позначення ризику слідових кількостей алергену, що виникають з виробничих процесів. У редакторі продукту кожен алерген можна позначити як:

- **Містить** - алерген є інгредієнтом продукту
- **Може містити** - ризик слідових кількостей

## Налаштування

Перейдіть до **WooCommerce > Налаштування > Polski > Харчування** та налаштуйте розділ "Алергени".

| Налаштування | За замовчуванням | Опис |
|--------------|------------------|------|
| Увімкнути декларування алергенів | Так | Активує систему алергенів |
| Виділяти в інгредієнтах | Так | Автоматичне виділення жирним алергенів у переліку інгредієнтів |
| Показати іконки | Ні | Відображає іконки алергенів |
| Позиція на сторінці | Вкладка харчування | Де відображати алергени |
| Режим "Може містити" | Так | Вмикає опцію декларування слідових кількостей |
| Формат відображення | Список | `список`, `іконки`, `inline` |

## Автоматичне виділення в інгредієнтах

Відповідно до ст. 21 регламенту FIC, алергени у переліку інгредієнтів повинні бути виділені - зазвичай жирним шрифтом або великими літерами. Плагін автоматично шукає назви алергенів у полі "Інгредієнти" та обгортає їх тегом `<strong>`.

Приклад:

Введений текст:
```
Mąka pszenna, cukier, masło, jaja kurze, mleko odtłuszczone w proszku, sól
```

Відображений текст:
```
Mąka pszenna (gluten), cukier, masło (mleko), jaja kurze, mleko odtłuszczone w proszku, sól
```

З HTML-виділенням:
```html
Mąka <strong>pszenna (gluten)</strong>, cukier, masło (<strong>mleko</strong>), 
<strong>jaja</strong> kurze, <strong>mleko</strong> odtłuszczone w proszku, sól
```

### Налаштування виділення

Плагін шукає у переліку інгредієнтів синоніми алергенів. Список синонімів можна налаштувати:

```php
add_filter('polski/allergens/synonyms', function (array $synonyms): array {
    $synonyms['gluten'] = ['pszenica', 'pszenna', 'żyto', 'żytnia', 'owies', 'owsiana', 'jęczmień', 'orkisz'];
    $synonyms['milk'] = ['mleko', 'mleczny', 'mleczna', 'masło', 'śmietana', 'jogurt', 'ser', 'laktoza'];
    $synonyms['eggs'] = ['jaja', 'jajka', 'jajeczny', 'jajeczna'];

    return $synonyms;
});
```

## Shortcode

Використовуйте shortcode `[polski_allergens]`, щоб відобразити декларацію алергенів.

### Параметри

| Параметр | Тип | За замовчуванням | Опис |
|----------|-----|------------------|------|
| `product_id` | int | поточний | ID продукту |
| `format` | string | `list` | Формат: `list`, `icons`, `inline`, `table` |
| `show_may_contain` | bool | `true` | Чи відображати секцію "Може містити" |
| `show_icons` | bool | `false` | Чи відображати іконки алергенів |
| `label` | string | `"Alergeny: "` | Мітка перед списком |
| `wrapper` | string | `div` | HTML-елемент обгортки |

### Приклади використання

Базовий список алергенів:

```html
[polski_allergens]
```

Результат:
```
Alergeny: mleko, jaja, gluten
Może zawierać: orzechy
```

Формат inline з іконками:

```html
[polski_allergens format="inline" show_icons="true"]
```

Без секції "Може містити":

```html
[polski_allergens show_may_contain="false"]
```

Формат таблиці:

```html
[polski_allergens format="table"]
```

Для конкретного продукту:

```html
[polski_allergens product_id="456"]
```

У шаблоні PHP:

```php
echo do_shortcode('[polski_allergens product_id="' . $product->get_id() . '"]');
```

## Програмний доступ

### Отримання алергенів продукту

```php
// Алергени "Містить"
$allergens = wp_get_object_terms($product_id, 'polski_allergen');

foreach ($allergens as $allergen) {
    echo $allergen->name; // наприклад, "Mleko i produkty pochodne"
}

// Алергени "Може містити"
$may_contain = get_post_meta($product_id, '_polski_may_contain_allergens', true);
if ($may_contain) {
    $may_contain_terms = get_terms([
        'taxonomy' => 'polski_allergen',
        'slug'     => $may_contain,
    ]);
}
```

### Програмне призначення алергенів

```php
// Встановлення алергенів "Містить"
wp_set_object_terms($product_id, ['gluten', 'milk', 'eggs'], 'polski_allergen');

// Встановлення алергенів "Може містити"
update_post_meta($product_id, '_polski_may_contain_allergens', ['nuts', 'soy']);
```

### Перевірка, чи продукт містить алерген

```php
if (has_term('gluten', 'polski_allergen', $product_id)) {
    // Продукт містить глютен
}
```

## Імпорт CSV

Алергени можна імпортувати через CSV:

| Колонка CSV | Опис | Формат |
|-------------|------|--------|
| `polski_allergens` | Алергени "Містить" | Slug-и через кому |
| `polski_may_contain` | Алергени "Може містити" | Slug-и через кому |

Приклад:

```csv
"Ciastka maślane","gluten,milk,eggs","nuts,soy"
"Sok pomarańczowy","",""
```

## Стилізація CSS

```css
.polski-allergens {
    margin: 1em 0;
    padding: 0.8em;
    background: #fff3e0;
    border: 1px solid #ffcc02;
    border-radius: 4px;
}

.polski-allergens__label {
    font-weight: 700;
    color: #e65100;
}

.polski-allergens__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
}

.polski-allergens__item {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    padding: 0.2em 0.6em;
    background: #fff;
    border: 1px solid #ffcc02;
    border-radius: 3px;
    font-size: 0.9em;
}

.polski-allergens__may-contain {
    margin-top: 0.5em;
    font-style: italic;
    color: #666;
}

.polski-allergens__icon {
    width: 20px;
    height: 20px;
}
```

## Найпоширеніші проблеми

### Алергени не відображаються на сторінці продукту

1. Перевірте, чи модуль алергенів увімкнено
2. Переконайтеся, що продукт має призначені алергени в редакторі
3. Перевірте, чи таксономія `polski_allergen` правильно зареєстрована (Продукти > Алергени)

### Автоматичне виділення не працює

1. Перевірте, чи опція "Виділяти в інгредієнтах" увімкнена
2. Переконайтеся, що назви алергенів або їх синоніми відповідають тексту у переліку інгредієнтів
3. Розширте список синонімів фільтром `polski/allergens/synonyms`

### Стандартні алергени відсутні після активації

Якщо список 14 алергенів не був створений автоматично, перейдіть до **WooCommerce > Налаштування > Polski > Харчування** та натисніть "Створити стандартні алергени".

## Пов'язані ресурси

- [Модуль харчових продуктів](/uk/food/food-overview/)
- [Харчова цінність](/uk/food/nutrients/)
- [Повідомити про проблему](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
