---
title: Блоки Gutenberg
description: Блоки Gutenberg у Polski for WooCommerce - AJAX-пошук, AJAX-фiльтри та слайдер продуктiв з попереднiм переглядом у редакторi.
---

Три блоки Gutenberg для вставки модулiв магазину. Кожен блок має попереднiй перегляд у редакторi (server-side render) та конфiгурацiю в бiчнiй панелi.

## Вимоги

- WordPress 6.0 або новiший
- Блоковий редактор Gutenberg (не класичний редактор)
- Активний вiдповiдний модуль у налаштуваннях Polski for WooCommerce

## Вставка блокiв

Блоки Polski for WooCommerce можна знайти в iнсертерi блокiв (кнопка **+**) у категорii **Polski for WooCommerce**. Також можна знайти iх за назвою, ввiвши "Polski" або назву модуля.

## Блок: AJAX-пошук

**Назва блоку:** `polski/ajax-search`

Вставляє поле пошуку з AJAX-пiдказками. Результати з'являються у dropdown пiд час введення фрази.

### Атрибути блоку

| Атрибут        | Тип    | За замовчуванням     | Опис                          |
| -------------- | ------ | -------------------- | ----------------------------- |
| `placeholder`  | string | `Szukaj produktów…`  | Текст-заповнювач у полi       |
| `width`        | string | `100%`               | Ширина поля                   |
| `showIcon`     | bool   | `true`               | Iконка лупи                   |
| `showCategory` | bool   | `false`              | Dropdown фiльтрацii за категорiєю |
| `limit`        | number | `8`                  | Лiмiт пiдказок                |
| `minChars`     | number | `3`                  | Мiн. символiв для пошуку      |
| `style`        | string | `default`            | Стиль: default, rounded, flat |

### Бiчна панель (Inspector Controls)

Бiчна панель блоку мiстить секцii:

**Налаштування пошуку:**
- Текст-заповнювач (placeholder)
- Мiнiмальна кiлькiсть символiв
- Лiмiт результатiв
- Фiльтр категорiй (так/нi)

**Вигляд:**
- Ширина поля
- Стиль (стандартний, заокруглений, плаский)
- Iконка лупи (так/нi)
- Рамка (так/нi)
- Тiнь (так/нi)

**Додатково:**
- Додатковi CSS-класи
- HTML anchor (якiр)

### Приклад реєстрацii блоку (внутрiшня реалiзацiя)

```php
register_block_type('polski/ajax-search', [
    'api_version'     => 3,
    'editor_script'   => 'polski-blocks-editor',
    'editor_style'    => 'polski-blocks-editor-style',
    'style'           => 'polski-blocks-style',
    'render_callback' => [AjaxSearchBlock::class, 'render'],
    'attributes'      => [
        'placeholder' => [
            'type'    => 'string',
            'default' => __('Szukaj produktów…', 'polski'),
        ],
        'width' => [
            'type'    => 'string',
            'default' => '100%',
        ],
        'showIcon' => [
            'type'    => 'boolean',
            'default' => true,
        ],
        'showCategory' => [
            'type'    => 'boolean',
            'default' => false,
        ],
        'limit' => [
            'type'    => 'number',
            'default' => 8,
        ],
    ],
]);
```

### Фiльтр рендерингу

```php
add_filter('polski/blocks/ajax_search/output', function (string $html, array $attributes): string {
    // Модифікація HTML блоку
    return $html;
}, 10, 2);
```

## Блок: AJAX-фiльтри

**Назва блоку:** `polski/ajax-filters`

Вставляє набiр AJAX-фiльтрiв для фiльтрацii списку продуктiв без перезавантаження сторiнки.

### Атрибути блоку

| Атрибут      | Тип    | За замовчуванням                 | Опис                          |
| ------------ | ------ | -------------------------------- | ----------------------------- |
| `filters`    | array  | `['category', 'price', 'stock']` | Активнi фiльтри               |
| `style`      | string | `expanded`                       | Стиль: expanded, compact, accordion |
| `showCount`  | bool   | `true`                           | Лiчильники продуктiв          |
| `showReset`  | bool   | `true`                           | Кнопка скидання                |
| `columns`    | number | `1`                              | Колонки фiльтрiв              |
| `collapsible`| bool   | `true`                           | Секцii, що згортаються         |

### Бiчна панель

**Вибiр фiльтрiв:**
- Чекбокси для кожного типу фiльтра
- Drag & drop сортування порядку фiльтрiв
- Конфiгурацiя для кожного фiльтра (наприклад, цiновi дiапазони)

**Вигляд:**
- Стиль вiдображення (розгорнутий, компактний, акордеон)
- Кiлькiсть колонок
- Лiчильники (так/нi)
- Кнопка скидання (так/нi)
- За замовчуванням згорнутi/розгорнутi

**Додатково:**
- Режим AJAX / GET fallback
- Додатковi CSS-класи

### Доступнi фiльтри

Блок автоматично виявляє доступнi фiльтри на основi даних продуктiв:

| Фiльтр      | Тип          | Опис                          |
| ------------ | ------------ | ----------------------------- |
| `category`   | Iєрархiя     | Категорii продуктiв           |
| `price`      | Range slider | Цiновий дiапазон              |
| `stock`      | Checkbox     | Статус наявностi              |
| `sale`       | Checkbox     | Тiльки зi знижкою             |
| `brand`      | Список       | Виробник/бренд                |
| `pa_*`       | Список/Swatch| Атрибути продуктiв            |
| `rating`     | Зiрки        | Оцiнка клiєнтiв               |

### Фiльтр рендерингу

```php
add_filter('polski/blocks/ajax_filters/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);
```

### Розмiщення в бiчнiй панелi

Блок AJAX-фiльтрiв найкраще працює в бiчнiй панелi сторiнки магазину. У блоковiй темi (FSE) додайте його до шаблону **Archive: Product** в бiчнiй колонцi.

У класичних темах використовуйте блок в областi вiджетiв **Sidebar магазину**.

## Блок: слайдер продуктiв

**Назва блоку:** `polski/product-slider`

Вставляє карусель продуктiв з навiгацiєю стрiлками та опцiональними крапками пагiнацii.

### Атрибути блоку

| Атрибут         | Тип    | За замовчуванням | Опис                          |
| --------------- | ------ | ---------------- | ----------------------------- |
| `type`          | string | `latest`         | Тип: related, sale, featured, bestsellers, latest, category, ids |
| `limit`         | number | `8`              | Лiмiт продуктiв              |
| `columns`       | number | `4`              | Колонки desktop               |
| `columnsTablet` | number | `2`              | Колонки tablet                |
| `columnsMobile` | number | `1`              | Колонки mobile                |
| `category`      | string | ``               | Slug категорii                |
| `productIds`    | array  | `[]`             | ID продуктiв                  |
| `showArrows`    | bool   | `true`           | Стрiлки навiгацii             |
| `showDots`      | bool   | `false`          | Крапки пагiнацii              |
| `autoplay`      | bool   | `false`          | Автоматичне прокручування     |
| `autoplaySpeed` | number | `5000`           | Пауза мiж слайдами (мс)      |
| `gap`           | string | `16px`           | Вiдступ мiж картками          |
| `title`         | string | ``               | Заголовок                     |
| `orderby`       | string | `date`           | Сортування                    |
| `order`         | string | `DESC`           | Напрямок                      |

### Бiчна панель

**Джерело продуктiв:**
- Тип слайдера (dropdown з опцiями)
- Вибiр категорii (для type=category)
- Вибiр продуктiв (для type=ids) - пошук з автозаповненням
- Лiмiт продуктiв
- Сортування

**Вiдображення:**
- Колонки (desktop / tablet / mobile)
- Вiдступ (gap)
- Стрiлки (так/нi)
- Крапки (так/нi)
- Заголовок

**Анiмацiя:**
- Автовiдтворення (так/нi)
- Швидкiсть автовiдтворення (слайдер 1000-10000 мс)
- Пауза при наведеннi

### Попереднiй перегляд у редакторi

Блок рендерить попереднiй перегляд слайдера безпосередньо в редакторi Gutenberg (server-side render). Попереднiй перегляд показує реальнi продукти з бази даних, що дозволяє оцiнити вигляд перед публiкацiєю.

Якщо в магазинi немає продуктiв, що вiдповiдають обраному типу (наприклад, немає продуктiв зi знижкою), блок вiдображає placeholder з повiдомленням.

### Фiльтр рендерингу

```php
add_filter('polski/blocks/product_slider/output', function (string $html, array $attributes): string {
    return $html;
}, 10, 2);

// Модифікація запиту продуктів
add_filter('polski/blocks/product_slider/query_args', function (array $args, array $attributes): array {
    // Виключити продукти з категорії "ukryte"
    $args['tax_query'][] = [
        'taxonomy' => 'product_cat',
        'field'    => 'slug',
        'terms'    => 'ukryte',
        'operator' => 'NOT IN',
    ];
    return $args;
}, 10, 2);
```

## Сумiснiсть з блоковими темами (FSE)

Блоки Polski for WooCommerce повнiстю працюють з блоковими темами (Full Site Editing). Iх можна вставляти в:

- Шаблонах сторiнок (Page Templates)
- Шаблонах архiвiв продуктiв
- Частинах шаблонiв (Template Parts) - заголовок, пiдвал, бiчна панель
- Патернах (Patterns)

## Стилiзацiя блокiв

Кожний блок генерує CSS-класи вiдповiдно до конвенцii BEM. Додатково блоки пiдтримують нативнi налаштування стилiв Gutenberg:

- Кольори (текст, фон)
- Типографiка (розмiр, насиченiсть, сiмейство шрифтiв)
- Вiдступи (spacing)
- Рамка (border)

## Вирiшення проблем

**Блоки не з'являються в iнсертерi** - переконайтеся, що вiдповiдний модуль активний в **WooCommerce > Polski > Модулi магазину**. Блоки вимагають активацii вiдповiдного модуля.

**Попереднiй перегляд блоку порожнiй** - перевiрте, чи в магазинi є продукти, що вiдповiдають обраному типу. Порожня база продуктiв не згенерує попереднiй перегляд.

**Блоки не працюють в Elementor** - цi блоки призначенi для редактора Gutenberg. Для Elementor використовуйте шорткоди або вiдповiднi вiджети Elementor (доступнi для AJAX-пошуку).

Повiдомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
