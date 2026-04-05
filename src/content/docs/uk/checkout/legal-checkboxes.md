---
title: Правові чекбокси
description: Налаштування, валідація та персоналізація обов'язкових правових чекбоксів на сторінці каси WooCommerce.
---

Перед замовленням клієнт має прийняти регламент та політику конфіденційності. Плагін Polski for WooCommerce додає правові чекбокси з налаштуванням вмісту, валідацією та повідомленнями про помилки.

## Правові вимоги

Магазин має отримати чітку згоду клієнта на:

- регламент магазину (умови договору купівлі-продажу)
- політику конфіденційності (обробку персональних даних)
- право на відмову від договору (інформація про 14-денний термін)

Згоди повинні бути виражені активно (чекбокс не може бути позначений за замовчуванням) та окремо для кожної мети.

![Правові чекбокси на сторінці каси WooCommerce](../../../../assets/screenshots/screenshot-3-checkout-checkboxes.png)

## Налаштування

Перейдіть до **WooCommerce > Налаштування > Polski > Каса** та налаштуйте розділ "Правові чекбокси".

### Чекбокси за замовчуванням

Плагін додає такі чекбокси:

| Чекбокс | Обов'язковий | Текст за замовчуванням |
|---------|-------------|----------------------|
| Регламент | Так | Zapoznałem się z [regulaminem] i akceptuję jego postanowienia. |
| Політика конфіденційності | Так | Zapoznałem się z [polityką prywatności] i wyrażam zgodę na przetwarzanie moich danych osobowych. |
| Право на відмову | Так | Zostałem poinformowany o prawie do odstąpienia od umowy w terminie 14 dni. |
| Маркетингова згода | Ні | Wyrażam zgodę na otrzymywanie informacji handlowych drogą elektroniczną. |

### Додавання власного чекбоксу

У панелі налаштувань натисніть **Додати чекбокс** та заповніть форму:

| Поле | Опис |
|------|------|
| Назва | Внутрішній ідентифікатор (наприклад, `newsletter_consent`) |
| Мітка | Текст, що відображається поряд з чекбоксом |
| Обов'язковий | Чи повинен чекбокс бути позначений для оформлення замовлення |
| Позиція | Порядок відображення (число) |
| Опис | Додатковий текст під чекбоксом (необов'язковий) |
| Повідомлення про помилку | Текст, що відображається, коли обов'язковий чекбокс не позначений |

### Форматування міток

У тексті мітки можна використовувати:

- `[regulamin]` - автоматичне посилання на сторінку регламенту
- `[polityka-prywatnosci]` - автоматичне посилання на політику конфіденційності
- `[odstapienie]` - посилання на сторінку про право на відмову
- `<a href="URL">текст</a>` - власне посилання
- `<strong>текст</strong>` - жирний шрифт

Сторінки регламенту та політики конфіденційності беруться з налаштувань WooCommerce (**WooCommerce > Налаштування > Розширені > Налаштування сторінки**).

## Валідація

### Серверна валідація

Плагін перевіряє чекбокси на стороні сервера за допомогою хука `woocommerce_checkout_process`. Якщо обов'язковий чекбокс не позначений, замовлення не буде оформлено, а клієнт побачить повідомлення про помилку.

### Клієнтська валідація

Необов'язкова JavaScript-валідація відображає повідомлення про помилку одразу після натискання кнопки замовлення, без перезавантаження сторінки. Увімкніть її в налаштуваннях:

**WooCommerce > Налаштування > Polski > Каса > JS-валідація чекбоксів**

### Повідомлення про помилки

Кожен чекбокс має налаштовуване повідомлення про помилку. Повідомлення за замовчуванням:

| Чекбокс | Повідомлення про помилку |
|---------|------------------------|
| Регламент | Aby złożyć zamówienie, musisz zaakceptować regulamin sklepu. |
| Політика конфіденційності | Aby złożyć zamówienie, musisz zaakceptować politykę prywatności. |
| Право на відмову | Musisz potwierdzić zapoznanie się z informacją o prawie odstąpienia. |

## Зберігання згод

Плагін зберігає інформацію про надані згоди:

- як метадані замовлення (`_polski_consent_*`)
- з датою та часом надання згоди
- з версією регламенту/політики конфіденційності (якщо увімкнено відстеження версій)

Ця інформація відображається в адміністративній панелі замовлення та може бути експортована на вимогу (GDPR).

### Перегляд згод у замовленні

У вигляді замовлення в адміністративній панелі, у секції "Правові згоди", ви знайдете список наданих згод з датами.

## Програмне управління чекбоксами

### Додавання чекбоксу програмно

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    $checkboxes['custom_consent'] = [
        'label'         => 'Wyrażam zgodę na przetwarzanie danych w celu realizacji reklamacji.',
        'required'      => true,
        'position'      => 50,
        'error_message' => 'Musisz wyrazić zgodę na przetwarzanie danych.',
        'description'   => '',
    ];

    return $checkboxes;
});
```

### Видалення чекбоксу

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    unset($checkboxes['marketing_consent']);

    return $checkboxes;
});
```

### Модифікація існуючого чекбоксу

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    if (isset($checkboxes['terms'])) {
        $checkboxes['terms']['label'] = 'Akceptuję <a href="/regulamin">regulamin</a> sklepu.';
    }

    return $checkboxes;
});
```

### Умовне відображення чекбоксу

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    $cart_total = WC()->cart->get_total('edit');

    if ($cart_total > 500) {
        $checkboxes['high_value_consent'] = [
            'label'         => 'Potwierdzam zamówienie o wartości powyżej 500 zł.',
            'required'      => true,
            'position'      => 60,
            'error_message' => 'Musisz potwierdzić zamówienie o wysokiej wartości.',
        ];
    }

    return $checkboxes;
});
```

## Стилізація CSS

```css
.polski-legal-checkboxes {
    margin: 1.5em 0;
    padding: 1em;
    background: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
}

.polski-legal-checkbox {
    margin-bottom: 0.8em;
}

.polski-legal-checkbox label {
    font-size: 0.9em;
    line-height: 1.5;
    cursor: pointer;
}

.polski-legal-checkbox__description {
    margin-top: 0.3em;
    font-size: 0.8em;
    color: #666;
}

.polski-legal-checkbox--error label {
    color: #c00;
}
```

## Сумісність з Block Checkout

Плагін підтримує правові чекбокси як у класичному checkout, так і в Block Checkout. У випадку Block Checkout чекбокси рендеряться за допомогою блоку `woocommerce/checkout-terms-block`.

## Найпоширеніші проблеми

### Чекбокси не відображаються

1. Перевірте, чи модуль увімкнено в налаштуваннях
2. Переконайтеся, що сторінки регламенту та політики конфіденційності налаштовані в WooCommerce
3. Перевірте, чи інший плагін не видаляє чекбокси

### Посилання в мітці не працює

Перевірте, чи цільова сторінка опублікована (не в чернетці) та чи шорткод (наприклад, `[regulamin]`) введений правильно.

### Замовлення проходить попри непозначений чекбокс

Перевірте, чи чекбокс позначений як "Обов'язковий". Перевірте консоль браузера на наявність помилок JavaScript, які можуть блокувати клієнтську валідацію.

## Пов'язані ресурси

- [Повідомити про проблему](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
