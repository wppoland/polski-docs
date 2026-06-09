---
title: FAQ (Часті запитання)
description: Модуль FAQ у Polski for WooCommerce - CPT polski_faq, таксономія faq_category, шорткод, CSS-акордеон та Schema.org FAQPage.
---

Модуль FAQ дозволяє створювати та відображати секцію часто заданих запитань у магазині. Запитання зберігаються як окремий тип запису (CPT) із власною таксономією категорій, що дозволяє гнучко керувати ними та відображати їх.

## Увімкнення модуля

Перейдіть до **WooCommerce > Polski > Магазинні модулі** та увімкніть **FAQ** (ID модуля: `faq`).

Після увімкнення в меню адміна з'явиться новий пункт **FAQ** з підсторінками для керування запитаннями та категоріями.

## Адміністративна панель

Керування запитаннями FAQ відбувається у **FAQ** (`edit.php?post_type=polski_faq`). Інтерфейс працює так само, як стандартні записи WordPress.

### Додавання запитання

1. Перейдіть до **FAQ > Додати нове**
2. У полі заголовка введіть текст запитання
3. У редакторі введіть відповідь (підтримується повний блоковий редактор)
4. Призначте категорію FAQ (опціонально)
5. Встановіть порядок відображення в полі **Порядок** (menu_order)
6. Опублікуйте

### Категорії FAQ

Таксономія `faq_category` дозволяє групувати запитання за темами. Керування категоріями: **FAQ > Категорії FAQ**.

Приклади категорій:

- Замовлення та оплата
- Доставка та повернення
- Обліковий запис клієнта
- Товари

## Шорткод `[polski_faq]`

Відображає список запитань FAQ у формі CSS-акордеону.

### Параметри

| Параметр   | Тип    | За замовчуванням | Опис                                              |
| ---------- | ------ | --------- | ------------------------------------------------- |
| `category` | string | (порожній) | Slug категорії FAQ для відображення              |
| `limit`    | int    | `-1`      | Максимальна кількість запитань (-1 = усі)         |
| `orderby`  | string | `menu_order` | Поле сортування: `menu_order`, `title`, `date` |
| `order`    | string | `ASC`     | Напрямок сортування: `ASC` або `DESC`             |

### Приклади використання

Відобразити всі запитання:

```html
[polski_faq]
```

Відобразити запитання з категорії "dostawa":

```html
[polski_faq category="dostawa" limit="5"]
```

Відобразити 10 найновіших запитань:

```html
[polski_faq limit="10" orderby="date" order="DESC"]
```

### Використання в шаблоні PHP

```php
echo do_shortcode('[polski_faq category="zamowienia" limit="10"]');
```

## CSS-акордеон

Запитання відображаються як акордеон, клік на запитанні розгортає відповідь. Акордеон працює повністю на CSS (без JavaScript), що забезпечує максимальну продуктивність.

Механізм базується на HTML-елементі `<details>` з `<summary>`:

```html
<div class="polski-faq">
  <details class="polski-faq__item">
    <summary class="polski-faq__question">Jak złożyć zamówienie?</summary>
    <div class="polski-faq__answer">
      <p>Aby złożyć zamówienie, dodaj produkty do koszyka...</p>
    </div>
  </details>
</div>
```

### CSS-класи

- `.polski-faq`, контейнер FAQ
- `.polski-faq__item`, окреме запитання (елемент `<details>`)
- `.polski-faq__question`, текст запитання (елемент `<summary>`)
- `.polski-faq__answer`, текст відповіді
- `.polski-faq__category`, заголовок категорії (під час відображення з групуванням)

### Налаштування вигляду

```css
/* Зміна кольору фону активного запитання */
.polski-faq__item[open] .polski-faq__question {
    background-color: #f0f0f0;
}

/* Зміна іконки розгортання */
.polski-faq__question::marker {
    content: "+";
}

.polski-faq__item[open] .polski-faq__question::marker {
    content: "-";
}
```

## Schema.org FAQPage

Модуль автоматично генерує розмітку Schema.org `FAQPage` у форматі JSON-LD на сторінках, що містять шорткод `[polski_faq]`:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Jak złożyć zamówienie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aby złożyć zamówienie, dodaj produkty do koszyka..."
      }
    },
    {
      "@type": "Question",
      "name": "Jaki jest czas dostawy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standardowy czas dostawy to 2-3 dni robocze..."
      }
    }
  ]
}
```

Розмітка FAQPage дозволяє Google відображати запитання та відповіді безпосередньо в результатах пошуку (rich snippets).

Вимкнути Schema.org:

```php
add_filter('polski/faq/schema_enabled', '__return_false');
```

## Хуки

### Фільтри

```php
// Зміна аргументів запиту FAQ
add_filter('polski/faq/query_args', function (array $args): array {
    $args['posts_per_page'] = 20;
    return $args;
});

// Модифікація HTML відповіді перед відображенням
add_filter('polski/faq/answer_html', function (string $html, int $post_id): string {
    return wp_kses_post($html);
}, 10, 2);
```

### Дії

```php
// Додати власний елемент перед секцією FAQ
add_action('polski/faq/before', function (): void {
    echo '<h2>Masz pytania? Oto odpowiedzi:</h2>';
});

// Додати власний елемент після секції FAQ
add_action('polski/faq/after', function (): void {
    echo '<p>Nie znalazłeś odpowiedzi? <a href="/kontakt">Skontaktuj się z nami</a>.</p>';
});
```

## Усунення проблем

**Шорткод відображає порожній контейнер**, перевірте, чи маєте опубліковані запитання FAQ. Чернетки та заплановані не відображаються.

**Акордеон не працює**, переконайтеся, що тема не блокує елемент `<details>`. Деякі reset-таблиці стилів CSS можуть приховувати цей елемент.

**Schema.org не з'являється**, перевірте розмітку інструментом [Google Rich Results Test](https://search.google.com/test/rich-results). Переконайтеся, що шорткод на сторінці (не у віджеті sidebar).

Повідомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Polski for WooCommerce, це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
