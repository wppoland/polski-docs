---
title: Шорткоди
description: Повний список 23 шорткодів Polski for WooCommerce з параметрами, прикладами використання та PHP-кодом.
---

23 шорткоди для відображення юридичних даних, інформації про товар і модулів магазину в будь-якому місці.

## Шорткоди юридичних вимог

### `[polski_gpsr]`

Відображає інформацію GPSR (General Product Safety Regulation) для товару.

**Параметри:**

| Параметр     | Тип    | За замовчуванням  | Опис                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (поточний) | ID товару                     |
| `fields`     | string | `all`      | Поля для відображення         |
| `layout`     | string | `list`     | Макет: list, table, inline    |

**Приклад:**

```html
[polski_gpsr product_id="123" fields="manufacturer,contact,safety" layout="table"]
```

**У шаблоні PHP:**

```php
echo do_shortcode('[polski_gpsr]'); // На сторінці товару - автоматично отримує ID
```

### `[polski_omnibus_price]`

Відображає найнижчу ціну за останні 30 днів (директива Omnibus).

**Параметри:**

| Параметр     | Тип    | За замовчуванням  | Опис                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (поточний) | ID товару                     |
| `days`       | int    | `30`       | Кількість днів назад          |
| `label`      | string | (типовий)  | Текст мітки                   |
| `show_date`  | string | `no`       | Показати дату найнижчої ціни  |

**Приклад:**

```html
[polski_omnibus_price product_id="456" label="Найнижча ціна за 30 днів:" show_date="yes"]
```

### `[polski_withdrawal_form]`

Відображає форму відмови від договору.

**Параметри:**

| Параметр    | Тип    | За замовчуванням | Опис                            |
| ----------- | ------ | --------- | ------------------------------- |
| `order_id`  | int    | (порожній)| Попереднє заповнення номера замовлення |
| `show_info` | string | `yes`     | Показати інформацію про право на відмову |
| `redirect`  | string | (порожній)| URL перенаправлення після надсилання |

**Приклад:**

```html
[polski_withdrawal_form show_info="yes"]
```

**Виділена сторінка відмови:**

Створіть сторінку зі slug `odstapienie-od-umowy` і вставте:

```html
<h2>Форма відмови від договору</h2>
<p>Згідно із законом про права споживача ви маєте 14 днів на відмову від договору.</p>
[polski_withdrawal_form]
```

### `[polski_dsa_report]`

Відображає форму звернення про незаконний вміст (Digital Services Act).

**Параметри:**

| Параметр     | Тип    | За замовчуванням | Опис                          |
| ------------ | ------ | --------- | ----------------------------- |
| `product_id` | int    | (порожній)| ID товару для звернення       |
| `categories` | string | `all`     | Категорії звернень            |
| `show_info`  | string | `yes`     | Показати інформацію про DSA   |

**Приклад:**

```html
[polski_dsa_report categories="illegal_content,counterfeit,safety"]
```

### `[polski_tax_notice]`

Відображає інформацію про ПДВ і вартість доставки.

**Параметри:**

| Параметр      | Тип    | За замовчуванням           | Опис                     |
| ------------- | ------ | -------------------------- | ------------------------ |
| `text`        | string | `Ціна включає ПДВ. Вартість доставки розраховується на касі.` | Текст інформації |
| `link_text`   | string | `Вартість доставки`        | Текст посилання          |
| `link_url`    | string | (порожній)                 | URL сторінки з вартістю  |

**Приклад:**

```html
[polski_tax_notice text="Ціна брутто включає 23% ПДВ." link_text="Перевірте вартість доставки" link_url="/dostawa/"]
```

## Шорткоди інформації про товар

### `[polski_unit_price]`

Відображає ціну за одиницю товару (наприклад, ціна за кг, літр).

**Параметри:**

| Параметр     | Тип    | За замовчуванням  | Опис                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (поточний) | ID товару                     |
| `format`     | string | `auto`     | Формат: auto, per_kg, per_l, per_m, per_unit |

**Приклад:**

```html
[polski_unit_price product_id="789" format="per_kg"]
```

### `[polski_delivery_time]`

Відображає орієнтовний час доставки.

**Параметри:**

| Параметр     | Тип    | За замовчуванням  | Опис                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (поточний) | ID товару                     |
| `format`     | string | `range`    | Формат: range, exact, text    |
| `label`      | string | `Час доставки:` | Мітка                    |

**Приклад:**

```html
[polski_delivery_time label="Відправлення за:" format="range"]
```

### `[polski_manufacturer]`

Відображає інформацію про виробника.

**Параметри:**

| Параметр     | Тип    | За замовчуванням  | Опис                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (поточний) | ID товару                     |
| `fields`     | string | `all`      | Поля: name, address, url, logo |
| `link`       | string | `yes`      | Посилання на сторінку виробника |

**Приклад:**

```html
[polski_manufacturer fields="name,logo" link="yes"]
```

### `[polski_nutrients]`

Відображає таблицю харчової цінності (для харчових продуктів).

**Параметри:**

| Параметр     | Тип    | За замовчуванням  | Опис                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (поточний) | ID товару                     |
| `per`        | string | `100g`     | Значення на: 100g, 100ml, serving |
| `layout`     | string | `table`    | Макет: table, list, compact   |

**Приклад:**

```html
[polski_nutrients per="serving" layout="compact"]
```

### `[polski_allergens]`

Відображає список алергенів (для харчових продуктів).

**Параметри:**

| Параметр     | Тип    | За замовчуванням  | Опис                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (поточний) | ID товару                     |
| `highlight`  | string | `bold`     | Виділення: bold, color, icon  |
| `layout`     | string | `inline`   | Макет: inline, list           |

**Приклад:**

```html
[polski_allergens highlight="bold" layout="list"]
```

## Шорткоди модулів магазину

### `[polski_wishlist]`

Відображає таблицю списку бажань.

**Параметри:**

| Параметр    | Тип    | За замовчуванням | Опис                          |
| ----------- | ------ | --------- | ----------------------------- |
| `columns`   | string | `all`     | Стовпці для відображення      |
| `max_items` | int    | `50`      | Ліміт товарів                 |
| `show_empty`| string | `yes`     | Повідомлення про порожній список |

**Приклад:**

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### `[polski_compare]`

Відображає таблицю порівняння товарів.

**Параметри:**

| Параметр       | Тип    | За замовчуванням | Опис                          |
| -------------- | ------ | --------- | ----------------------------- |
| `columns`      | string | `all`     | Характеристики для відображення |
| `hide_similar` | string | `no`      | Приховати однакові характеристики |
| `show_remove`  | string | `yes`     | Кнопка видалення              |

**Приклад:**

```html
[polski_compare hide_similar="yes"]
```

### `[polski_ajax_search]`

Відображає AJAX-пошук з підказками.

**Параметри:**

| Параметр      | Тип    | За замовчуванням    | Опис                     |
| ------------- | ------ | ------------------- | ------------------------ |
| `placeholder` | string | `Шукати товари…`    | Текст-заповнювач         |
| `width`       | string | `100%`              | Ширина поля              |
| `show_icon`   | string | `yes`               | Іконка лупи              |
| `show_cat`    | string | `no`                | Фільтр категорій         |
| `limit`       | int    | `8`                 | Ліміт підказок           |

**Приклад:**

```html
[polski_ajax_search placeholder="Що ви шукаєте?" show_cat="yes" limit="10"]
```

### `[polski_ajax_filters]`

Відображає AJAX-фільтри для фільтрування товарів.

**Параметри:**

| Параметр     | Тип    | За замовчуванням  | Опис                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | string | `all`      | Типи фільтрів                 |
| `style`      | string | `expanded` | Стиль: expanded, compact, accordion |
| `show_count` | string | `yes`      | Лічильники товарів            |
| `show_reset` | string | `yes`      | Кнопка скидання               |
| `columns`    | int    | `1`        | Стовпці фільтрів              |
| `ajax`       | string | `yes`      | Режим AJAX                    |

**Приклад:**

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion"]
```

### `[polski_product_slider]`

Відображає карусель товарів.

**Параметри:**

| Параметр         | Тип    | За замовчуванням | Опис                          |
| ---------------- | ------ | --------- | ----------------------------- |
| `type`           | string | `latest`  | Тип: related, sale, featured, bestsellers, latest, category, ids |
| `limit`          | int    | `8`       | Ліміт товарів                 |
| `columns`        | int    | `4`       | Стовпці desktop               |
| `columns_tablet` | int    | `2`       | Стовпці tablet                |
| `columns_mobile` | int    | `1`       | Стовпці mobile                |
| `category`       | string | (порожній)| Slug категорії                |
| `ids`            | string | (порожній)| ID товарів                    |
| `arrows`         | string | `yes`     | Стрілки навігації             |
| `dots`           | string | `no`      | Крапки пагінації              |
| `autoplay`       | string | `no`      | Autoplay                      |
| `autoplay_speed` | int    | `5000`    | Пауза в мс                    |
| `title`          | string | (порожній)| Заголовок                     |
| `orderby`        | string | `date`    | Сортування                    |
| `order`          | string | `DESC`    | Напрямок                      |

**Приклад:**

```html
[polski_product_slider type="sale" limit="12" title="Акції" arrows="yes" dots="yes"]
```

### `[polski_nutri_score]`

Відображає оцінку Nutri-Score харчового продукту.

**Параметри:**

| Параметр     | Тип    | За замовчуванням  | Опис                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (поточний) | ID товару                     |
| `size`       | string | `medium`   | Розмір: small, medium, large  |

**Приклад:**

```html
[polski_nutri_score product_id="321" size="large"]
```

### `[polski_checkout_button]`

Відображає кнопку покупки з міткою, юридично відповідною директиві ЄС.

**Параметри:**

| Параметр | Тип    | За замовчуванням             | Опис             |
| -------- | ------ | ---------------------------- | ---------------- |
| `text`   | string | `Замовлення з обов'язком оплати` | Текст кнопки |
| `class`  | string | (порожній)                   | Додатковий клас CSS |

**Приклад:**

```html
[polski_checkout_button text="Купую і плачу" class="my-checkout-btn"]
```

### `[polski_legal_checkboxes]`

Відображає юридичні чекбокси поза касою (наприклад, на сторінці реєстрації).

**Параметри:**

| Параметр   | Тип    | За замовчуванням | Опис                          |
| ---------- | ------ | --------- | ----------------------------- |
| `location` | string | `custom`  | Розташування: checkout, registration, contact, custom |
| `ids`      | string | (порожній)| ID чекбоксів для відображення |

**Приклад:**

```html
[polski_legal_checkboxes location="registration"]
```

### `[polski_nip_field]`

Відображає поле NIP з валідацією в реальному часі (API VIES/GUS).

**Параметри:**

| Параметр   | Тип    | За замовчуванням | Опис                          |
| ---------- | ------ | --------- | ----------------------------- |
| `required` | string | `no`      | Обов'язкове поле              |
| `autofill` | string | `yes`     | Автоматичне заповнення даних компанії |
| `label`    | string | `NIP`     | Мітка поля                    |

**Приклад:**

```html
[polski_nip_field required="yes" autofill="yes" label="Номер NIP компанії"]
```

### `[polski_greenwashing_info]`

Відображає перевірену екологічну інформацію про товар (анти-greenwashing).

**Параметри:**

| Параметр     | Тип    | За замовчуванням  | Опис                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (поточний) | ID товару                     |
| `fields`     | string | `all`      | Поля: claims, certifications, evidence |

**Приклад:**

```html
[polski_greenwashing_info fields="claims,certifications"]
```

### `[polski_security_incident]`

Відображає форму звернення про інцидент безпеки (CRA).

**Параметри:**

| Параметр    | Тип    | За замовчуванням | Опис                          |
| ----------- | ------ | --------- | ----------------------------- |
| `show_info` | string | `yes`     | Інформація про CRA            |

**Приклад:**

```html
[polski_security_incident show_info="yes"]
```

### `[polski_verified_badge]`

Відображає значок перевіреної покупки біля відгуку.

**Параметри:**

| Параметр | Тип    | За замовчуванням    | Опис                     |
| -------- | ------ | -------------------- | ------------------------ |
| `text`   | string | `Перевірена покупка` | Текст значка             |
| `icon`   | string | `checkmark`          | Іконка: checkmark, shield |

**Приклад:**

```html
[polski_verified_badge text="Підтверджене замовлення" icon="shield"]
```

## Використання шорткодів у шаблонах PHP

Усі шорткоди можна викликати в шаблонах PHP:

```php
// Окремий шорткод
echo do_shortcode('[polski_omnibus_price]');

// Шорткод з параметрами
echo do_shortcode('[polski_product_slider type="featured" limit="6"]');

// Умовне відображення
if (shortcode_exists('polski_gpsr')) {
    echo do_shortcode('[polski_gpsr]');
}
```

## Використання шорткодів у Gutenberg

У Gutenberg використайте блок **Shortcode** і вставте шорткод. Багато шорткодів також мають виділені блоки з попереднім переглядом.

Повідомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням проконсультуйтеся з юристом. Polski for WooCommerce є програмним забезпеченням з відкритим кодом (GPLv2), що надається без гарантій.</div>
