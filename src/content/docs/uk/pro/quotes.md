---
title: Запити пропозицій (RFQ)
description: Модуль запитів пропозицій Polski PRO for WooCommerce - заміна кнопки кошика формою запиту, логування згод, адміністративна панель та сповіщення електронною поштою.
---

Модуль запитів пропозицій (Request for Quote) замінює стандартну кнопку "Додати до кошика" кнопкою "Запитати ціну", даючи змогу клієнтам подавати запити пропозицій замість прямих покупок. Це рішення особливо корисне у магазинах B2B, для продуктів, що потребують індивідуальної оцінки, або при великих гуртових замовленнях.

:::note[Вимоги]
Polski PRO вимагає: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Налаштування

Перейдіть до **WooCommerce > Налаштування > Polski PRO > Запити пропозицій** та увімкніть модуль.

### Базові налаштування

| Параметр | Опція в базі | Значення за замовчуванням | Опис |
|----------|-------------|--------------------------|------|
| Увімкнути модуль | `polski_quote` | Ні | Активує функціональність запитів пропозицій |
| Текст кнопки | `polski_quote_button_text` | "Zapytaj o cenę" | Текст, що відображається на кнопці |
| Показувати на списках | `polski_quote_show_on_loops` | Ні | Відображає кнопку запиту на сторінках архіву та категорії |
| Вимагати авторизації | `polski_quote_require_login` | Ні | Вимагає авторизації перед надсиланням запиту |
| Згода на обробку | `polski_quote_consent` | Так | Додає чекбокс згоди GDPR до форми |

### Поля форми

Форма запиту пропозиції містить за замовчуванням:

- **Ім'я та прізвище** - обов'язкове
- **Адреса електронної пошти** - обов'язкове, валідація формату
- **Телефон** - необов'язкове
- **Кількість** - обов'язкове, числова валідація
- **Повідомлення** - необов'язкове, textarea
- **Згода GDPR** - чекбокс, обов'язкове якщо увімкнено

## Робота на фронтенді

### Заміна кнопки

Після увімкнення модуля кнопка "Додати до кошика" замінюється кнопкою запиту пропозиції. Це стосується:

- Сторінки окремого продукту
- Сторінок архіву та категорії (якщо опція `polski_quote_show_on_loops` увімкнена)
- Віджетів та шорткодів продуктів

### Шорткод

Кнопку запиту пропозиції можна розмістити в довільному місці за допомогою шорткоду:

```
[polski_quote_button product_id="123" text="Zapytaj o cenę" class="custom-class"]
```

**Параметри:**

| Параметр | Обов'язковий | Опис |
|----------|-------------|------|
| `product_id` | Ні | ID продукту (за замовчуванням поточний продукт) |
| `text` | Ні | Текст кнопки |
| `class` | Ні | Додаткові CSS-класи |

### Надсилання форми (AJAX)

Форма надсилається асинхронно (AJAX), без перезавантаження сторінки. Після надсилання клієнт бачить повідомлення підтвердження з номером запиту.

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

Кожний запит пропозиції зберігає інформацію про надані згоди:

- Мітка часу (timestamp) надання згоди
- IP-адреса клієнта (хешована SHA-256)
- Зміст згоди на момент надання
- Версія форми

Ці дані зберігаються в таблиці `{prefix}_polski_quote_consents` та можуть бути експортовані для цілей аудиту GDPR.

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

Запити пропозицій доступні в меню **WooCommerce > Запити пропозицій**. Список містить:

- Номер запиту
- Дані клієнта (ім'я, електронна пошта, телефон)
- Продукт та кількість
- Статус (новий, в процесі, відповіль надано, закритий)
- Дата подання

### Статуси запитів

| Статус | Опис |
|--------|------|
| `new` | Новий запит, необроблений |
| `in_progress` | В процесі підготовки пропозиції |
| `replied` | Пропозиція надіслана клієнту |
| `accepted` | Клієнт прийняв пропозицію |
| `rejected` | Клієнт відхилив пропозицію |
| `closed` | Запит закритий |

### Відповідь на запит

З адміністративної панелі адміністратор може:

1. Переглянути деталі запиту
2. Додати внутрішню нотатку
3. Встановити ціну пропозиції
4. Надіслати відповідь електронною поштою клієнту
5. Перетворити запит на замовлення WooCommerce

## Сповіщення електронною поштою

Модуль реєструє наступні шаблони листів у WooCommerce:

| Лист | Отримувач | Тригер |
|------|----------|--------|
| Новий запит пропозиції | Адміністратор | Подання запиту клієнтом |
| Підтвердження запиту | Клієнт | Подання запиту |
| Відповідь на запит | Клієнт | Надсилання пропозиції адміністратором |
| Зміна статусу запиту | Клієнт | Зміна статусу запиту |

Шаблони листів можна перевизначити в темі в каталозі `woocommerce/emails/`:

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

## Вирішення проблем

**Кнопка "Додати до кошика" все ще відображається**
Перевірте, чи опція `polski_quote` увімкнена. Очистіть кеш плагінів кешування (WP Super Cache, W3 Total Cache, LiteSpeed Cache).

**Форма не надсилається (помилка AJAX)**
Перевірте консоль браузера на наявність помилок JavaScript. Переконайтеся, що скрипт `polski-pro-quote.js` завантажений. Конфлікти з іншими плагінами можуть блокувати AJAX - вимкніть інші плагіни, щоб виявити конфлікт.

**Листи не надсилаються**
Перевірте конфігурацію електронних листів у **WooCommerce > Налаштування > Електронні листи**. Переконайтеся, що шаблони Polski PRO увімкнені.

## Подальші кроки

- Повідомляйте про проблеми: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Інтеграція з каталоговим режимом: [Каталоговий режим B2B](/pro/catalog-mode)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
