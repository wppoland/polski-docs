---
title: Інтеграція InPost (Paczkomaty)
description: Модуль інтеграції InPost ShipX API у Polski PRO for WooCommerce - Paczkomaty, генерація етикеток, карта пунктів видачі та відстеження відправлень.
---

Модуль InPost інтегрує WooCommerce з API ShipX InPost, даючи змогу генерувати транспортні етикетки, обирати пункт видачі клієнтом на карті, шукати Paczkomaty та відстежувати відправлення безпосередньо з адміністративної панелі.

:::note[Вимоги]
Polski PRO вимагає: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Додатково потрібен активний токен API InPost ShipX (отримується з панелі менеджера InPost).
:::

## Налаштування

Перейдіть до **WooCommerce > Налаштування > Polski PRO > InPost**.

### Автентифікація API

| Параметр | Опис |
|----------|------|
| Токен API | Токен авторизації з панелі InPost Manager |
| ID організації | Ідентифікатор організації в системі InPost |
| Режим sandbox | Використовує тестове середовище ShipX API |

Токен API передається в заголовку `Authorization: Bearer {token}` до кожного запиту ShipX API. Токен повинен мати права на створення відправлень та генерацію етикеток.

### Налаштування способу доставки

Після налаштування API створіть новий спосіб доставки:

1. Перейдіть до **WooCommerce > Налаштування > Доставка > Зони доставки**
2. Відредагуйте зону "Польща"
3. Натисніть "Додати спосіб доставки"
4. Виберіть "InPost Paczkomat" або "InPost Кур'єр"

| Параметр способу | Значення за замовчуванням | Опис |
|-----------------|--------------------------|------|
| Назва способу | "InPost Paczkomat" | Назва, що відображається клієнту |
| Вартість | 0 | Вартість доставки (0 = безкоштовна) |
| Безкоштовна доставка від | "" | Сума замовлення, від якої доставка безкоштовна |
| Розмір посилки за замовчуванням | A | Розмір: `A`, `B`, `C` |
| Страхування | Ні | Додати страхування до відправлення |

## Карта пунктів видачі

### Віджет карти

На сторінці каси, після вибору способу доставки "InPost Paczkomat", відображається інтерактивний віджет карти для вибору Paczkomat.

Віджет пропонує:

- **Карту** з позначками Paczkomatів
- **Пошук за містом** - введіть назву міста, щоб центрувати карту
- **Пошук за координатами** - автоматична геолокація (за згодою користувача)
- **Пошук за поштовим індексом** - знайти найближчі Paczkomaty
- **Список Paczkomatів** - відсортований від найближчого
- **Деталі пункту** - адреса, години роботи, доступні розміри скриньок

### Пошук за містом

Віджет надсилає запит до ендпоінту ShipX API:

```
GET /v1/points?type=parcel_locker&city={city}&per_page=25
```

Результати кешуються протягом 24 годин у transients WordPress, щоб мінімізувати кількість запитів до API.

### Пошук за координатами

Коли клієнт дає згоду на геолокацію:

```
GET /v1/points?type=parcel_locker&relative_point={lat},{lng}&per_page=10
```

### Фільтрування пунктів

```php
/**
 * Filtruje listę punktów odbioru InPost.
 *
 * @param array  $points  Tablica punktów odbioru z API
 * @param string $city    Wyszukiwane miasto
 * @param array  $coords  Współrzędne [lat, lng] lub pusta tablica
 */
apply_filters('polski_pro/inpost/points', array $points, string $city, array $coords): array;
```

**Приклад - виключення тимчасово недоступних пунктів:**

```php
add_filter('polski_pro/inpost/points', function (array $points, string $city, array $coords): array {
    $excluded_points = ['KRA123', 'WAW456']; // Тимчасово вимкнені
    return array_filter($points, function (array $point) use ($excluded_points): bool {
        return ! in_array($point['name'], $excluded_points, true);
    });
}, 10, 3);
```

## Генерація етикеток

### З панелі замовлення

На сторінці редагування замовлення в панелі **InPost** доступні опції:

1. **Згенерувати етикетку** - створює відправлення в API ShipX та генерує етикетку PDF
2. **Завантажити етикетку** - завантажує згенеровану етикетку
3. **Надрукувати етикетку** - відкриває попередній перегляд друку

### Масова генерація

На списку замовлень позначте кілька замовлень та виберіть масову дію "Згенерувати етикетки InPost". Етикетки генеруються асинхронно - після завершення з'явиться сповіщення з посиланням для завантаження ZIP-файлу.

### Дані відправлення

Етикетка генерується на основі:

| Поле | Джерело | Опис |
|------|---------|------|
| Відправник | Налаштування магазину | Адреса та дані компанії з WooCommerce |
| Отримувач | Дані замовлення | Ім'я, прізвище, телефон, електронна пошта |
| Пункт видачі | Вибір клієнта | ID Paczkomat, обраного на касі |
| Розмір посилки | Налаштування способу | Або перевизначення в замовленні |
| Сума накладної | Замовлення COD | Лише для замовлень з оплатою при отриманні |

### Хук генерації етикетки

```php
/**
 * Filtruje dane przesyłki przed wysłaniem do API ShipX.
 *
 * @param array     $shipment_data Dane przesyłki
 * @param \WC_Order $order         Zamówienie WooCommerce
 */
apply_filters('polski_pro/inpost/shipment_data', array $shipment_data, \WC_Order $order): array;
```

**Приклад - додавання референції замовлення:**

```php
add_filter('polski_pro/inpost/shipment_data', function (array $shipment_data, \WC_Order $order): array {
    $shipment_data['reference'] = sprintf('ORDER-%s', $order->get_order_number());
    return $shipment_data;
}, 10, 2);
```

## Відстеження відправлень

### Автоматичне відстеження

Після генерації етикетки модуль автоматично перевіряє статус відправлення кожні 2 години (WP-Cron). Статуси відображаються на статуси замовлень WooCommerce:

| Статус InPost | Статус WooCommerce | Опис |
|---------------|-------------------|------|
| `created` | `processing` | Відправлення створено |
| `dispatched_by_sender` | `processing` | Надіслано відправником |
| `collected_from_sender` | `shipped` | Забрано у відправника |
| `out_for_delivery` | `shipped` | У процесі доставки |
| `ready_to_pickup` | `shipped` | Готове до отримання в Paczkomat |
| `delivered` | `completed` | Доставлено / отримано |

### Сповіщення клієнту

Клієнт отримує електронний лист із посиланням для відстеження відправлення на сторінці InPost. Посилання відстеження додається до:

- Листа "Замовлення в обробці"
- Сторінки "Мій обліковий запис > Замовлення > Деталі"
- Нотаток замовлення (видимих для клієнта)

### Хук відстеження

```php
/**
 * Akcja wywoływana po aktualizacji statusu przesyłki.
 *
 * @param int      $order_id      ID zamówienia
 * @param string   $tracking_number Numer śledzenia
 * @param string   $old_status    Poprzedni status InPost
 * @param string   $new_status    Nowy status InPost
 */
do_action('polski_pro/inpost/status_updated', int $order_id, string $tracking_number, string $old_status, string $new_status);
```

**Приклад - SMS-сповіщення про готовність до отримання:**

```php
add_action('polski_pro/inpost/status_updated', function (
    int $order_id,
    string $tracking_number,
    string $old_status,
    string $new_status
): void {
    if ($new_status === 'ready_to_pickup') {
        $order = wc_get_order($order_id);
        $phone = $order->get_billing_phone();
        send_sms($phone, sprintf(
            'Twoja paczka %s czeka w Paczkomacie. Kod odbioru w e-mailu.',
            $tracking_number
        ));
    }
}, 10, 4);
```

## Розміри посилок

| Розмір | Габарити (см) | Макс. вага |
|--------|-------------|------------|
| A | 8 x 38 x 64 | 25 кг |
| B | 19 x 38 x 64 | 25 кг |
| C | 41 x 38 x 64 | 25 кг |

Розмір посилки може бути встановлений глобально, за способом доставки або перевизначений вручну в замовленні.

## Вирішення проблем

**Карта Paczkomatів не завантажується**
Перевірте, чи токен API правильний та активний. Перевірте консоль браузера на наявність помилок CORS або JavaScript. Переконайтеся, що скрипт `polski-pro-inpost-map.js` завантажений.

**Помилка генерації етикетки "Unauthorized"**
Токен API прострочений або не має прав на створення відправлень. Згенеруйте новий токен у панелі InPost Manager.

**Статус відправлення не оновлюється**
Перевірте, чи WP-Cron працює правильно. Запустіть вручну: `wp cron event run polski_pro_inpost_tracking`.

## Подальші кроки

- Повідомляйте про проблеми: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Документація API ShipX: [https://docs.inpost24.com/](https://docs.inpost24.com/)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
