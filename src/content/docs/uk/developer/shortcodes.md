---
title: Шорткоди
description: Повний список 23 шорткодiв Polski for WooCommerce з параметрами, прикладами використання та PHP-кодом.
---

Polski for WooCommerce надає 23 шорткоди для вiдображення юридичних даних, iнформацii про продукт та модулiв магазину в будь-якому мiсцi магазину.

## Шорткоди юридичної вiдповiдностi

### `[polski_gpsr]`

Вiдображає iнформацiю GPSR (General Product Safety Regulation) для продукту.

**Параметри:**

| Параметр     | Тип    | За замовчуванням | Опис                          |
| ------------ | ------ | ---------------- | ----------------------------- |
| `product_id` | int    | (поточний)       | ID продукту                   |
| `fields`     | string | `all`            | Поля для вiдображення         |
| `layout`     | string | `list`           | Макет: list, table, inline    |

**Приклад:**

```html
[polski_gpsr product_id="123" fields="manufacturer,contact,safety" layout="table"]
```

**У шаблонi PHP:**

```php
echo do_shortcode('[polski_gpsr]'); // На сторінці продукту - автоматично отримує ID
```

### `[polski_omnibus_price]`

Вiдображає найнижчу цiну за останнi 30 днiв (директива Omnibus).

**Параметри:**

| Параметр     | Тип    | За замовчуванням | Опис                          |
| ------------ | ------ | ---------------- | ----------------------------- |
| `product_id` | int    | (поточний)       | ID продукту                   |
| `days`       | int    | `30`             | Кiлькiсть днiв назад          |
| `label`      | string | (стандартний)    | Текст мiтки                   |
| `show_date`  | string | `no`             | Показати дату найнижчої цiни  |

**Приклад:**

```html
[polski_omnibus_price product_id="456" label="Najniższa cena z 30 dni:" show_date="yes"]
```

### `[polski_withdrawal_form]`

Вiдображає форму вiдмови вiд договору.

**Параметри:**

| Параметр    | Тип    | За замовчуванням | Опис                                      |
| ----------- | ------ | ---------------- | ----------------------------------------- |
| `order_id`  | int    | (порожньо)       | Попереднє заповнення номера замовлення     |
| `show_info` | string | `yes`            | Показати iнформацiю про право на вiдмову   |
| `redirect`  | string | (порожньо)       | URL перенаправлення пiсля надсилання       |

**Приклад:**

```html
[polski_withdrawal_form show_info="yes"]
```

**Спецiальна сторiнка вiдмови:**

Створiть сторiнку зi slug `odstapienie-od-umowy` та вставте:

```html
<h2>Formularz odstąpienia od umowy</h2>
<p>Zgodnie z ustawą o prawach konsumenta masz 14 dni na odstąpienie od umowy.</p>
[polski_withdrawal_form]
```

### `[polski_dsa_report]`

Вiдображає форму повiдомлення про незаконний контент (Digital Services Act).

**Параметри:**

| Параметр     | Тип    | За замовчуванням | Опис                          |
| ------------ | ------ | ---------------- | ----------------------------- |
| `product_id` | int    | (порожньо)       | ID продукту для повiдомлення  |
| `categories` | string | `all`            | Категорii повiдомлень         |
| `show_info`  | string | `yes`            | Показати iнформацiю про DSA   |

**Приклад:**

```html
[polski_dsa_report categories="illegal_content,counterfeit,safety"]
```

### `[polski_tax_notice]`

Вiдображає iнформацiю про ПДВ та вартiсть доставки.

**Параметри:**

| Параметр      | Тип    | За замовчуванням                   | Опис                     |
| ------------- | ------ | ---------------------------------- | ------------------------ |
| `text`        | string | `Cena zawiera VAT. Koszty dostawy obliczane przy kasie.` | Змiст iнформацii |
| `link_text`   | string | `Koszty dostawy`                   | Текст посилання          |
| `link_url`    | string | (порожньо)                         | URL сторiнки з витратами |

**Приклад:**

```html
[polski_tax_notice text="Cena brutto zawiera 23% VAT." link_text="Sprawdź koszty dostawy" link_url="/dostawa/"]
```

## Шорткоди iнформацii про продукт

### `[polski_unit_price]`

Вiдображає одиничну цiну продукту (наприклад, цiна за кг, лiтр).

**Параметри:**

| Параметр     | Тип    | За замовчуванням | Опис                          |
| ------------ | ------ | ---------------- | ----------------------------- |
| `product_id` | int    | (поточний)       | ID продукту                   |
| `format`     | string | `auto`           | Формат: auto, per_kg, per_l, per_m, per_unit |

**Приклад:**

```html
[polski_unit_price product_id="789" format="per_kg"]
```

### `[polski_delivery_time]`

Вiдображає орiєнтовний час доставки.

**Параметри:**

| Параметр     | Тип    | За замовчуванням | Опис                          |
| ------------ | ------ | ---------------- | ----------------------------- |
| `product_id` | int    | (поточний)       | ID продукту                   |
| `format`     | string | `range`          | Формат: range, exact, text    |
| `label`      | string | `Czas dostawy:`  | Мiтка                         |

**Приклад:**

```html
[polski_delivery_time label="Wysyłka w:" format="range"]
```

### `[polski_manufacturer]`

Вiдображає iнформацiю про виробника.

**Параметри:**

| Параметр     | Тип    | За замовчуванням | Опис                          |
| ------------ | ------ | ---------------- | ----------------------------- |
| `product_id` | int    | (поточний)       | ID продукту                   |
| `fields`     | string | `all`            | Поля: name, address, url, logo |
| `link`       | string | `yes`            | Посилання на сторiнку виробника |

**Приклад:**

```html
[polski_manufacturer fields="name,logo" link="yes"]
```

### `[polski_nutrients]`

Вiдображає таблицю харчової цiнностi (для харчових продуктiв).

**Параметри:**

| Параметр     | Тип    | За замовчуванням | Опис                          |
| ------------ | ------ | ---------------- | ----------------------------- |
| `product_id` | int    | (поточний)       | ID продукту                   |
| `per`        | string | `100g`           | Значення на: 100g, 100ml, serving |
| `layout`     | string | `table`          | Макет: table, list, compact   |

**Приклад:**

```html
[polski_nutrients per="serving" layout="compact"]
```

### `[polski_allergens]`

Вiдображає список алергенiв (для харчових продуктiв).

**Параметри:**

| Параметр     | Тип    | За замовчуванням | Опис                          |
| ------------ | ------ | ---------------- | ----------------------------- |
| `product_id` | int    | (поточний)       | ID продукту                   |
| `highlight`  | string | `bold`           | Видiлення: bold, color, icon  |
| `layout`     | string | `inline`         | Макет: inline, list           |

**Приклад:**

```html
[polski_allergens highlight="bold" layout="list"]
```

## Шорткоди модулiв магазину

### `[polski_wishlist]`

Вiдображає таблицю списку бажань.

**Параметри:**

| Параметр    | Тип    | За замовчуванням | Опис                          |
| ----------- | ------ | ---------------- | ----------------------------- |
| `columns`   | string | `all`            | Колонки для вiдображення      |
| `max_items` | int    | `50`             | Лiмiт продуктiв              |
| `show_empty`| string | `yes`            | Повiдомлення порожнього списку |

**Приклад:**

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### `[polski_compare]`

Вiдображає таблицю порiвняння продуктiв.

**Параметри:**

| Параметр       | Тип    | За замовчуванням | Опис                          |
| -------------- | ------ | ---------------- | ----------------------------- |
| `columns`      | string | `all`            | Характеристики для вiдображення |
| `hide_similar` | string | `no`             | Приховати iдентичнi характеристики |
| `show_remove`  | string | `yes`            | Кнопка видалення              |

**Приклад:**

```html
[polski_compare hide_similar="yes"]
```

### `[polski_ajax_search]`

Вiдображає AJAX-пошук з пiдказками.

**Параметри:**

| Параметр      | Тип    | За замовчуванням     | Опис                     |
| ------------- | ------ | -------------------- | ------------------------ |
| `placeholder` | string | `Szukaj produktów…`  | Текст-заповнювач         |
| `width`       | string | `100%`               | Ширина поля              |
| `show_icon`   | string | `yes`                | Iконка лупи              |
| `show_cat`    | string | `no`                 | Фiльтр категорiй        |
| `limit`       | int    | `8`                  | Лiмiт пiдказок           |

**Приклад:**

```html
[polski_ajax_search placeholder="Czego szukasz?" show_cat="yes" limit="10"]
```

### `[polski_ajax_filters]`

Вiдображає AJAX-фiльтри для фiльтрацii продуктiв.

**Параметри:**

| Параметр     | Тип    | За замовчуванням | Опис                          |
| ------------ | ------ | ---------------- | ----------------------------- |
| `filters`    | string | `all`            | Типи фiльтрiв                |
| `style`      | string | `expanded`       | Стиль: expanded, compact, accordion |
| `show_count` | string | `yes`            | Лiчильники продуктiв         |
| `show_reset` | string | `yes`            | Кнопка скидання               |
| `columns`    | int    | `1`              | Колонки фiльтрiв             |
| `ajax`       | string | `yes`            | Режим AJAX                    |

**Приклад:**

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion"]
```

### `[polski_product_slider]`

Вiдображає карусель продуктiв.

**Параметри:**

| Параметр         | Тип    | За замовчуванням | Опис                          |
| ---------------- | ------ | ---------------- | ----------------------------- |
| `type`           | string | `latest`         | Тип: related, sale, featured, bestsellers, latest, category, ids |
| `limit`          | int    | `8`              | Лiмiт продуктiв              |
| `columns`        | int    | `4`              | Колонки desktop               |
| `columns_tablet` | int    | `2`              | Колонки tablet                |
| `columns_mobile` | int    | `1`              | Колонки mobile                |
| `category`       | string | (порожньо)       | Slug категорii                |
| `ids`            | string | (порожньо)       | ID продуктiв                  |
| `arrows`         | string | `yes`            | Стрiлки навiгацii             |
| `dots`           | string | `no`             | Крапки пагiнацii              |
| `autoplay`       | string | `no`             | Автовiдтворення               |
| `autoplay_speed` | int    | `5000`           | Пауза в мс                   |
| `title`          | string | (порожньо)       | Заголовок                     |
| `orderby`        | string | `date`           | Сортування                    |
| `order`          | string | `DESC`           | Напрямок                      |

**Приклад:**

```html
[polski_product_slider type="sale" limit="12" title="Promocje" arrows="yes" dots="yes"]
```

### `[polski_nutri_score]`

Вiдображає оцiнку Nutri-Score харчового продукту.

**Параметри:**

| Параметр     | Тип    | За замовчуванням | Опис                          |
| ------------ | ------ | ---------------- | ----------------------------- |
| `product_id` | int    | (поточний)       | ID продукту                   |
| `size`       | string | `medium`         | Розмiр: small, medium, large  |

**Приклад:**

```html
[polski_nutri_score product_id="321" size="large"]
```

### `[polski_checkout_button]`

Вiдображає кнопку замовлення з юридично вiдповiдною мiткою згiдно з директивою ЄС.

**Параметри:**

| Параметр | Тип    | За замовчуванням                     | Опис             |
| -------- | ------ | ------------------------------------ | ---------------- |
| `text`   | string | `Zamówienie z obowiązkiem zapłaty`    | Текст кнопки     |
| `class`  | string | (порожньо)                           | Додатковий CSS-клас |

**Приклад:**

```html
[polski_checkout_button text="Kupuję i płacę" class="my-checkout-btn"]
```

### `[polski_legal_checkboxes]`

Вiдображає юридичнi чекбокси поза касою (наприклад, на сторiнцi реєстрацii).

**Параметри:**

| Параметр   | Тип    | За замовчуванням | Опис                          |
| ---------- | ------ | ---------------- | ----------------------------- |
| `location` | string | `custom`         | Розташування: checkout, registration, contact, custom |
| `ids`      | string | (порожньо)       | ID чекбоксiв для вiдображення |

**Приклад:**

```html
[polski_legal_checkboxes location="registration"]
```

### `[polski_nip_field]`

Вiдображає поле NIP з валiдацiєю в реальному часi (API VIES/GUS).

**Параметри:**

| Параметр   | Тип    | За замовчуванням | Опис                          |
| ---------- | ------ | ---------------- | ----------------------------- |
| `required` | string | `no`             | Обов'язкове поле              |
| `autofill` | string | `yes`            | Автоматичне заповнення даних компанii |
| `label`    | string | `NIP`            | Мiтка поля                    |

**Приклад:**

```html
[polski_nip_field required="yes" autofill="yes" label="Numer NIP firmy"]
```

### `[polski_greenwashing_info]`

Вiдображає перевiрену екологiчну iнформацiю про продукт (анти-greenwashing).

**Параметри:**

| Параметр     | Тип    | За замовчуванням | Опис                          |
| ------------ | ------ | ---------------- | ----------------------------- |
| `product_id` | int    | (поточний)       | ID продукту                   |
| `fields`     | string | `all`            | Поля: claims, certifications, evidence |

**Приклад:**

```html
[polski_greenwashing_info fields="claims,certifications"]
```

### `[polski_security_incident]`

Вiдображає форму повiдомлення про iнцидент безпеки (CRA).

**Параметри:**

| Параметр    | Тип    | За замовчуванням | Опис                          |
| ----------- | ------ | ---------------- | ----------------------------- |
| `show_info` | string | `yes`            | Iнформацiя про CRA            |

**Приклад:**

```html
[polski_security_incident show_info="yes"]
```

### `[polski_verified_badge]`

Вiдображає значок верифiкованої покупки бiля вiдгуку.

**Параметри:**

| Параметр | Тип    | За замовчуванням      | Опис                     |
| -------- | ------ | --------------------- | ------------------------ |
| `text`   | string | `Zweryfikowany zakup` | Текст значка             |
| `icon`   | string | `checkmark`           | Iконка: checkmark, shield |

**Приклад:**

```html
[polski_verified_badge text="Potwierdzone zamówienie" icon="shield"]
```

## Використання шорткодiв у шаблонах PHP

Всi шорткоди можна викликати в шаблонах PHP:

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

## Використання шорткодiв у Gutenberg

У редакторi Gutenberg використовуйте блок **Shortcode** та вставте потрiбний шорткод. Альтернативно, багато з цих шорткодiв мають вiдповiднi блоки Gutenberg з попереднiм переглядом у редакторi.

Повiдомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
