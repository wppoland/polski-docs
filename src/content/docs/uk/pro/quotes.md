---
title: Запити пропозицій (RFQ)
description: Модуль запитів пропозицій Polski PRO for WooCommerce - заміна кнопки кошика на форму пропозиції, логування згод, адміністративна панель та сповіщення e-mail.
---

Модуль запитів пропозицій (RFQ) замінює кнопку "Додати до кошика" на "Запитати ціну". Клієнти подають запити замість того, щоб купувати безпосередньо. Корисний у магазинах B2B та для продуктів з індивідуальною оцінкою.

:::note[Вимоги]
Polski PRO вимагає: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Налаштування

Перейдіть до **WooCommerce > Налаштування > Polski PRO > Запити пропозицій** і увімкніть модуль.

### Базові налаштування

| Налаштування | Опція в базі | Значення за замовчуванням | Опис |
|------------|---------------|------------------|------|
| Увімкнути модуль | `polski_quote` | Ні | Активує функціональність запитів пропозицій |
| Текст кнопки | `polski_quote_button_text` | "Запитати ціну" | Текст, що відображається на кнопці |
| Показувати в списках | `polski_quote_show_on_loops` | Ні | Відображає кнопку запиту на сторінках архіву та категорій |
| Вимагати входу | `polski_quote_require_login` | Ні | Вимагає входу перед надсиланням запиту |
| Згода на обробку | `polski_quote_consent` | Так | Додає чекбокс згоди RODO до форми |

### Поля форми

Форма запиту пропозиції за замовчуванням містить:

- **Ім'я та прізвище** - обов'язкове
- **Адреса e-mail** - обов'язкове, валідація формату
- **Телефон** - опціональне
- **Кількість** - обов'язкове, числова валідація
- **Повідомлення** - опціональне, textarea
- **Згода RODO** - чекбокс, обов'язкове, якщо увімкнено

## Робота на фронтенді

### Заміна кнопки

Після увімкнення модуль замінює кнопку "Додати до кошика" на кнопку запиту. Стосується:

- Сторінки окремого продукту
- Сторінок архіву та категорій (якщо опція `polski_quote_show_on_loops` увімкнена)
- Віджетів та shortcode-ів продуктів

### Shortcode

Кнопку запиту розмістіть у будь-якому місці за допомогою shortcode:

```
[polski_quote_button product_id="123" text="Zapytaj o cenę" class="custom-class"]
```

**Параметри:**

| Параметр | Обов'язковий | Опис |
|----------|----------|------|
| `product_id` | Ні | ID продукту (за замовчуванням поточний продукт) |
| `text` | Ні | Текст кнопки |
| `class` | Ні | Додаткові CSS-класи |

### Надсилання форми (AJAX)

Форма надсилається через AJAX, без перезавантаження сторінки. Клієнт бачить підтвердження з номером запиту.

```php
/**
 * Filtruje dane zapytania ofertowego przed zapisem.
 *
 * @param array    $quote_data Dane zapytania
 * @param int      $product_id ID produktu
 * @param \WP_User $user       Obiekt zalogowanego użytkownika lub pusty
 */
apply_filters('polski_pro/quote/before_save', array $quote_data, int $product_id, $user): array;
```

**Приклад - додавання нестандартного поля:**

```php
add_filter('polski_pro/quote/before_save', function (array $quote_data, int $product_id, $user): array {
    $quote_data['meta']['company_nip'] = sanitize_text_field($_POST['company_nip'] ?? '');
    return $quote_data;
}, 10, 3);
```

## Логування згод

Кожен запит зберігає дані про надані згоди:

- Мітку часу (timestamp) надання згоди
- IP-адресу клієнта (хешована SHA-256)
- Зміст згоди в момент надання
- Версію форми

Дані потрапляють до таблиці `{prefix}_polski_quote_consents` і їх можна експортувати для аудиту RODO.

```php
/**
 * Akcja wywoływana po zapisaniu zgody.
 *
 * @param int    $quote_id   ID zapytania ofertowego
 * @param array  $consent    Dane zgody
 * @param string $ip_hash    Zahashowany adres IP
 */
do_action('polski_pro/quote/consent_logged', int $quote_id, array $consent, string $ip_hash);
```

## Адміністративна панель

### Список запитів

Перейдіть до **WooCommerce > Запити пропозицій**. Список містить:

- Номер запиту
- Дані клієнта (ім'я, e-mail, телефон)
- Продукт та кількість
- Статус (новий, у процесі, відповіли, закритий)
- Дата подання

### Статуси запитів

| Статус | Опис |
|--------|------|
| `new` | Новий запит, необроблений |
| `in_progress` | У процесі підготовки пропозиції |
| `replied` | Пропозицію надіслано клієнту |
| `accepted` | Клієнт прийняв пропозицію |
| `rejected` | Клієнт відхилив пропозицію |
| `closed` | Запит закрито |

### Відповідь на запит

Адміністратор може:

1. Переглянути деталі запиту
2. Додати внутрішню нотатку
3. Встановити ціну пропозиції
4. Надіслати відповідь e-mail клієнту
5. Перетворити запит на замовлення WooCommerce

## Сповіщення e-mail

Шаблони e-mail модуля:

| E-mail | Одержувач | Тригер |
|--------|----------|-----------|
| Новий запит пропозиції | Адміністратор | Подання запиту клієнтом |
| Підтвердження запиту | Клієнт | Подання запиту |
| Відповідь на запит | Клієнт | Надсилання пропозиції адміністратором |
| Зміна статусу запиту | Клієнт | Зміна статусу запиту |

Шаблони e-mail можна перекрити в темі в каталозі `woocommerce/emails/`:

- `polski-pro-quote-new.php`
- `polski-pro-quote-confirmation.php`
- `polski-pro-quote-reply.php`
- `polski-pro-quote-status.php`

## Хуки

### Фільтр форми

```php
/**
 * Filtruje pola formularza zapytania ofertowego.
 *
 * @param array $fields Tablica pól formularza
 * @param int   $product_id ID produktu
 */
apply_filters('polski_pro/quote/form_fields', array $fields, int $product_id): array;
```

**Приклад - додавання поля NIP:**

```php
add_filter('polski_pro/quote/form_fields', function (array $fields, int $product_id): array {
    $fields['company_nip'] = [
        'type'     => 'text',
        'label'    => 'NIP firmy',
        'required' => false,
        'priority' => 35,
    ];
    return $fields;
}, 10, 2);
```

### Дія після надсилання

```php
/**
 * Akcja wywoływana po zapisaniu zapytania ofertowego.
 *
 * @param int   $quote_id   ID zapytania
 * @param array $quote_data Dane zapytania
 */
do_action('polski_pro/quote/submitted', int $quote_id, array $quote_data);
```

**Приклад - надсилання до CRM:**

```php
add_action('polski_pro/quote/submitted', function (int $quote_id, array $quote_data): void {
    $crm_api = new MyCrmApi();
    $crm_api->create_lead([
        'name'    => $quote_data['name'],
        'email'   => $quote_data['email'],
        'product' => $quote_data['product_name'],
        'qty'     => $quote_data['quantity'],
    ]);
}, 10, 2);
```

## Усунення проблем

**Кнопка "Додати до кошика" все ще відображається**
Перевірте, чи опція `polski_quote` увімкнена. Очистіть кеш плагінів кешування (WP Super Cache, W3 Total Cache, LiteSpeed Cache).

**Форма не надсилається (помилка AJAX)**
Перевірте консоль браузера на наявність помилок JavaScript. Переконайтеся, що скрипт `polski-pro-quote.js` завантажений. Конфлікти з іншими плагінами можуть блокувати AJAX - вимкніть інші плагіни, щоб ідентифікувати конфлікт.

**E-mail-и не надсилаються**
Перевірте конфігурацію e-mail у **WooCommerce > Налаштування > E-mail-и**. Переконайтеся, що шаблони Polski PRO увімкнені.

## Подальші кроки

- Повідомляйте про проблеми: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Інтеграція з каталожним режимом: [Каталожний режим B2B](/pro/catalog-mode)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням проконсультуйтеся з юристом. Polski for WooCommerce це програмне забезпечення з відкритим кодом (GPLv2), що постачається без гарантій.</div>
