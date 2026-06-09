---
title: Правила автоматизації
description: Рушій правил автоматизації з trigger-filter-action, REST API, dry run, журналом аудиту та географічними фільтрами (PL/ЄС/ЄЕЗ).
---

Модуль **Правила автоматизації** запускає дії (email, SMS, зміна статусу, примітка, тег клієнта, webhook) на основі подій у магазині. Правила ви визначаєте в панелі **WooCommerce > Automation Rules** через React SPA, а рушій виконує їх у відповідь на trigger.

:::note[Вимоги]
Polski PRO вимагає: Polski (free) v1.6.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Архітектура

| Елемент              | Опис                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Trigger**          | Подія WooCommerce, що запускає правило (`new_order`, `order_status_changed`, ...) |
| **Filter**           | Логічна умова (`order_total > 100`, `geo_scope in eu`, ...)                        |
| **Action**           | Операція до виконання (`send_email`, `add_order_note`, `webhook`, ...)                |
| **Match mode**       | `all` — усі фільтри виконані, `any` — достатньо одного                           |
| **Priority**         | Порядок виконання (менше = раніше)                                          |

Правила зберігаються в таблиці `wp_polski_pro_automation_rules`. Виконання (matched/skipped, dry run, результат дії, помилка) потрапляють до `wp_polski_pro_automation_logs`.

## Тригери

| Значення                 | Коли спрацьовує                                  |
| ----------------------- | ---------------------------------------------------- |
| `new_order`             | `woocommerce_new_order`                              |
| `order_status_changed`  | `woocommerce_order_status_changed`                   |
| `new_customer`          | `user_register`                                      |
| `cart_abandoned`        | (резерв - інтеграція з `AbandonedCartService`)      |
| `product_saved`         | `save_post_product`                                  |

## Фільтри

Поля, доступні у фільтрах (`FilterField`):

| Поле                | Джерело                                         | Оператори                          |
| ------------------- | ---------------------------------------------- | ---------------------------------- |
| `order_total`       | `WC_Order::get_total()`                        | `equals`, `gt`, `lt`, `not_equals` |
| `order_status`      | `WC_Order::get_status()`                       | `equals`, `in`, `not_in`           |
| `item_count`        | `WC_Order::get_item_count()`                   | `gt`, `lt`, `equals`               |
| `billing_country`   | ISO 3166-1 alpha-2                             | `equals`, `in`, `not_in`           |
| `shipping_country`  | ISO 3166-1 alpha-2 (fallback до billing)       | `equals`, `in`, `not_in`           |
| `geo_scope`         | `pl`, `eu`, `eea`, `non_eu`                    | `equals`                           |
| `customer_email`    | `WC_Order::get_billing_email()`                | `equals`, `contains`               |
| `payment_method`    | `WC_Order::get_payment_method()`               | `equals`, `in`                     |
| `shipping_method`   | Список методів з позицій доставки                  | `in`, `not_in`                     |
| `product_id`        | Список ID продуктів у замовленні                | `in`, `not_in`                     |
| `category`          | Список ID `product_cat` з позицій замовлення    | `in`, `not_in`                     |

Оператор `in` / `not_in` приймає список, розділений комами (`PL,DE,FR`).

### Географічні фільтри

Поле `geo_scope` повертає одне з чотирьох значень для замовлення/користувача:

| Значення  | Діапазон                                        |
| -------- | --------------------------------------------- |
| `pl`     | Польща (PL)                                   |
| `eu`     | Країни ЄС (27 держав-членів)            |
| `eea`    | ЄЕЗ = ЄС + Норвегія, Ісландія, Ліхтенштейн  |
| `non_eu` | Решта світу                                 |

Приклад використання: правило надсилає інший шаблон маркетингового листа клієнтам з ЄС (з приміткою RODO), ніж тим, хто поза ЄС.

## Дії

| Тип                  | Параметри                                                                            |
| -------------------- | ------------------------------------------------------------------------------------ |
| `send_email`         | `to` (опціонально), `subject`, `body`, `marketing` (boolean, що вимагає згоди)        |
| `send_sms`           | Делеговано до `polski_pro/automation/send_sms` (вимагає `SmsNotificationService`)     |
| `change_order_status`| `status`, `note`                                                                     |
| `add_order_note`     | `note`, `customer_note` (boolean)                                                    |
| `add_customer_tag`   | `tag` (зберігає в user_meta `polski_customer_tags`)                                 |
| `webhook`            | `url` — POST з `{subject_type, subject_id}`                                          |

### Маркетингова згода

Дії з `params.marketing = true` пропускаються, якщо клієнт не має чинної маркетингової згоди в `polski_consent_log`. Фільтр `polski_pro/automation/has_marketing_consent` дозволяє замінити стандартну логіку перевірки згоди.

### Розширення дій

Щоб додати власну дію (наприклад, інтеграцію з FreshMail/GetResponse), використайте фільтр:

```php
add_filter('polski_pro/automation/action', function ($override, $action, $subject, $dryRun) {
    if ($action->type->value === 'send_email' && ($action->params['provider'] ?? '') === 'freshmail') {
        if ($dryRun) {
            return ['dry_run' => true, 'provider' => 'freshmail'];
        }
        // ... wywolanie API FreshMail ...
        return ['provider' => 'freshmail', 'sent' => true];
    }

    return $override;
}, 10, 4);
```

## REST API

Усі endpoint вимагають `manage_woocommerce` + заголовка `X-WP-Nonce`.

| Метод  | Шлях                                          | Опис                            |
| ------- | ------------------------------------------------ | ------------------------------- |
| GET     | `/polski-pro/v1/automation/rules`                | Список правил                     |
| POST    | `/polski-pro/v1/automation/rules`                | Створення правила               |
| GET     | `/polski-pro/v1/automation/rules/{id}`           | Отримання одного правила     |
| PUT     | `/polski-pro/v1/automation/rules/{id}`           | Оновлення правила             |
| DELETE  | `/polski-pro/v1/automation/rules/{id}`           | Видалення + очищення журналів   |
| POST    | `/polski-pro/v1/automation/rules/{id}/dry-run`   | Симуляція на замовленні/користувачі (`order_id` або `user_id`) |
| GET     | `/polski-pro/v1/automation/logs?limit=200`       | Журнал аудиту (max 500)       |
| GET     | `/polski-pro/v1/automation/schema`               | Схема тригерів/фільтрів/дій |

## Dry run

У редакторі правила вкажіть `Order ID` і натисніть **Run dry run**. Рушій:

1. Оцінює фільтри щодо вказаного замовлення.
2. Перевіряє маркетингову згоду.
3. Виконує дії в режимі dry-run (не модифікує стан) і повертає запланований результат.
4. Записує запис у журнал аудиту з прапором `dry_run = 1`.

## Ліміти та продуктивність

- Індекси на `enabled`, `trigger_type`, `priority`, `group_label` — рушій отримує лише правила, що відповідають тригеру.
- `recent($limit)` в `AutomationLogRepository` обмежено до 500 записів на запит.
- Webhook мають тайм-аут 10 с.
