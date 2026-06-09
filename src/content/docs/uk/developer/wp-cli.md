---
title: Команди WP-CLI
description: Команди WP-CLI, доступні в Polski for WooCommerce - міграція даних і перевірка коректності конфігурації.
---

Команди WP-CLI для керування плагіном з командного рядка. Автоматизуйте міграції даних і перевіряйте конфігурацію.

## Вимоги

- WordPress з активним плагіном Polski for WooCommerce
- [WP-CLI](https://wp-cli.org/) версії 2.5 або новішої
- SSH-доступ до сервера або локальне середовище розробки

## wp polski migrate

Міграція даних при оновленні плагіна або перенесенні магазину.

### Синтаксис

```bash
wp polski migrate [<migration>] [--dry-run] [--force] [--batch-size=<number>]
```

### Аргументи

| Аргумент       | Тип    | Обов'язковий | Опис                              |
| -------------- | ------ | -------- | --------------------------------- |
| `<migration>`  | string | Ні       | Назва міграції (пропустіть = усі очікувані) |

### Опції

| Опція            | Опис                                          |
| ---------------- | --------------------------------------------- |
| `--dry-run`      | Показати план міграції без внесення змін      |
| `--force`        | Примусово повторити виконання міграції        |
| `--batch-size=N` | Кількість записів, що обробляються в одній партії (за замовчуванням 100) |

### Доступні міграції

| Назва міграції            | Опис                                         |
| ------------------------- | -------------------------------------------- |
| `omnibus_price_history`   | Міграція історії цін Omnibus до нової таблиці |
| `checkboxes_v2`           | Оновлення структури чекбоксів до v2          |
| `gpsr_meta`               | Міграція даних GPSR до нового формату meta   |
| `wishlist_to_db`          | Перенесення списків бажань з usermeta до виділеної таблиці |
| `delivery_time_format`    | Оновлення формату часу доставки              |
| `badges_cache_rebuild`    | Перебудова кешу значків товарів              |
| `search_index`            | Перебудова індексу AJAX-пошуку               |

### Приклади

Показати очікувані міграції:

```bash
wp polski migrate --dry-run
```

Результат:

```
Очікувані міграції:
  1. omnibus_price_history - Міграція історії цін (бл. 5200 записів)
  2. checkboxes_v2 - Оновлення чекбоксів (3 записи)
Разом: 2 міграції
Режим dry-run - жодних змін не внесено.
```

Виконати всі очікувані міграції:

```bash
wp polski migrate
```

Результат:

```
Виконання міграції: omnibus_price_history...
  Обробка партії 1/52 (100 записів)...
  Обробка партії 2/52 (100 записів)...
  ...
  Міграцію omnibus_price_history завершено. Перенесено 5200 записів.

Виконання міграції: checkboxes_v2...
  Міграцію checkboxes_v2 завершено. Перенесено 3 записи.

Усі міграції завершено успішно.
```

Виконати конкретну міграцію з більшою партією:

```bash
wp polski migrate omnibus_price_history --batch-size=500
```

Примусово повторити виконання міграції:

```bash
wp polski migrate search_index --force
```

### Обробка помилок

Якщо міграція завершиться помилкою, плагін:

1. Покаже детальне повідомлення про помилку
2. Відкотить зміни поточної партії (rollback)
3. Запише лог до `wp-content/debug.log` (якщо `WP_DEBUG_LOG` увімкнено)
4. Запам'ятає точку переривання - наступний запуск продовжить з місця помилки

```bash
wp polski migrate omnibus_price_history
```

Результат при помилці:

```
Виконання міграції: omnibus_price_history...
  Обробка партії 23/52 (100 записів)...
  ПОМИЛКА: Не вдалося зберегти запис #2345 - порушення цілісності даних.
  Rollback партії 23 виконано.
  Міграцію перервано. Виконайте повторно, щоб продовжити з партії 23.
```

## wp polski smoke-test

Тестує конфігурацію магазину: модулі, юридичні сторінки, чекбокси та інтеграції.

### Синтаксис

```bash
wp polski smoke-test [--module=<module>] [--format=<format>] [--verbose]
```

### Опції

| Опція              | Опис                                      |
| ------------------- | ----------------------------------------- |
| `--module=<module>` | Тестувати лише обраний модуль             |
| `--format=<format>` | Формат виводу: table (за замовчуванням), json, csv |
| `--verbose`         | Детальна інформація про кожен тест         |

### Тестовані елементи

| Модуль             | Тести                                              |
| ------------------- | -------------------------------------------------- |
| `compliance`        | Юридичні сторінки, чекбокси, GPSR, Omnibus, DSA    |
| `checkout`          | Кнопка замовлення, поля NIP, DOI                   |
| `prices`            | Ціни за одиницю, ПДВ, час доставки                 |
| `food`              | Харчова цінність, алергени, Nutri-Score            |
| `storefront`        | Список бажань, порівняння, пошук, фільтри, слайдер |
| `integrations`      | REST API, шаблони, кеш, cron                        |

### Приклади

Повний тест:

```bash
wp polski smoke-test
```

Результат:

```
Polski for WooCommerce - Smoke Test
====================================

+---------------------+---------------------------+--------+
| Модуль              | Тест                      | Статус |
+---------------------+---------------------------+--------+
| compliance          | Правила магазину          | OK     |
| compliance          | Політика конфіденційності | OK     |
| compliance          | Чекбокси каси             | OK     |
| compliance          | Дані GPSR                 | WARN   |
| compliance          | Ціна Omnibus              | OK     |
| compliance          | Форма DSA                 | OK     |
| checkout            | Мітка кнопки              | OK     |
| checkout            | Поле NIP                  | OK     |
| checkout            | Double opt-in             | OFF    |
| prices              | Ціна за одиницю           | OK     |
| prices              | Інформація ПДВ            | OK     |
| prices              | Час доставки              | WARN   |
| storefront          | AJAX-пошук                | OK     |
| storefront          | AJAX-фільтри              | OK     |
| integrations        | REST API                  | OK     |
| integrations        | Шаблони теми              | OK     |
| integrations        | Transient-кеш             | OK     |
| integrations        | WP-Cron                   | OK     |
+---------------------+---------------------------+--------+

Результат: 15 OK, 2 WARN, 1 OFF
```

Статуси:
- **OK** - тест пройшов успішно
- **WARN** - попередження, потребує перевірки
- **FAIL** - критична помилка
- **OFF** - модуль вимкнено

Тест конкретного модуля з деталями:

```bash
wp polski smoke-test --module=compliance --verbose
```

Результат:

```
Тест: compliance/regulamin
  ID сторінки: 45
  Статус: publish
  Останнє оновлення: 2025-06-01
  Кількість слів: 3200
  Результат: OK

Тест: compliance/gpsr
  Товари з GPSR: 142/350 (40.6%)
  Немає даних GPSR: 208 товарів
  Результат: WARN - Не всі товари мають заповнені дані GPSR
```

Експорт до JSON (наприклад, для CI/CD):

```bash
wp polski smoke-test --format=json
```

```json
{
  "timestamp": "2025-06-15T12:00:00+02:00",
  "total_tests": 18,
  "passed": 15,
  "warnings": 2,
  "failed": 0,
  "disabled": 1,
  "tests": [
    {
      "module": "compliance",
      "test": "terms_page",
      "status": "ok",
      "message": "Правила магазину опубліковано (ID: 45)"
    }
  ]
}
```

## Інтеграція з CI/CD

Команда `smoke-test` повертає відповідний код виходу:

| Код | Опис                    |
| --- | ----------------------- |
| 0   | Усі тести OK            |
| 1   | Попередження (WARN)     |
| 2   | Критичні помилки (FAIL) |

Приклад використання в GitHub Actions:

```yaml
- name: Polski smoke test
  run: wp polski smoke-test --format=json > smoke-test-results.json
  continue-on-error: false
```

Приклад у bash-скрипті:

```bash
#!/bin/bash
wp polski smoke-test --format=json > /tmp/smoke-test.json

EXIT_CODE=$?
if [ $EXIT_CODE -eq 2 ]; then
    echo "Тести Polski FAILED - перевірте конфігурацію"
    exit 1
elif [ $EXIT_CODE -eq 1 ]; then
    echo "Тести Polski WARN - перевірте попередження"
fi
```

## Multisite

Команди підтримують WordPress Multisite. Вкажіть сайт прапорцем `--url`:

```bash
wp polski smoke-test --url=sklep1.tvojdomen.pl
wp polski migrate --url=sklep2.tvojdomen.pl
```

Повідомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням проконсультуйтеся з юристом. Polski for WooCommerce є програмним забезпеченням з відкритим кодом (GPLv2), що надається без гарантій.</div>
