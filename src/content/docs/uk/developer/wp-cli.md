---
title: Команди WP-CLI
description: Команди WP-CLI, доступнi в Polski for WooCommerce - мiграцiя даних та тестування правильностi конфiгурацii.
---

Команди WP-CLI для управлiння плагiном з командного рядка. Автоматизуйте мiграцiї даних та перевiряйте конфiгурацiю.

## Вимоги

- WordPress з активним плагiном Polski for WooCommerce
- [WP-CLI](https://wp-cli.org/) версii 2.5 або новiшої
- Доступ SSH до сервера або локальне середовище розробки

## wp polski migrate

Команда мiграцii даних при оновленнi плагiна або перенесеннi магазину.

### Синтаксис

```bash
wp polski migrate [<migration>] [--dry-run] [--force] [--batch-size=<number>]
```

### Аргументи

| Аргумент       | Тип    | Обов'язковий | Опис                                         |
| -------------- | ------ | ------------ | -------------------------------------------- |
| `<migration>`  | string | Нi           | Назва мiграцii (пропустити = всi очiкуванi)   |

### Опцii

| Опцiя            | Опис                                          |
| ---------------- | --------------------------------------------- |
| `--dry-run`      | Показати план мiграцii без виконання змiн      |
| `--force`        | Примусово повторити мiграцiю                   |
| `--batch-size=N` | Кiлькiсть записiв, що обробляються в однiй партii (за замовчуванням 100) |

### Доступнi мiграцii

| Назва мiграцii            | Опис                                         |
| ------------------------- | -------------------------------------------- |
| `omnibus_price_history`   | Мiграцiя iсторii цiн Omnibus до новоi таблицi |
| `checkboxes_v2`           | Оновлення структури чекбоксiв до v2           |
| `gpsr_meta`               | Мiграцiя даних GPSR до нового формату meta    |
| `wishlist_to_db`          | Перенесення спискiв бажань з usermeta до видiленоi таблицi |
| `delivery_time_format`    | Оновлення формату часу доставки               |
| `badges_cache_rebuild`    | Перебудова кешу мiток продуктiв               |
| `search_index`            | Перебудова iндексу AJAX-пошуку                |

### Приклади

Показати очiкуванi мiграцii:

```bash
wp polski migrate --dry-run
```

Результат:

```
Oczekujące migracje:
  1. omnibus_price_history - Migracja historii cen (ok. 5200 rekordów)
  2. checkboxes_v2 - Aktualizacja checkboxów (3 rekordy)
Razem: 2 migracje
Tryb dry-run - żadne zmiany nie zostały wykonane.
```

Виконати всi очiкуванi мiграцii:

```bash
wp polski migrate
```

Результат:

```
Wykonywanie migracji: omnibus_price_history...
  Przetwarzanie partii 1/52 (100 rekordów)...
  Przetwarzanie partii 2/52 (100 rekordów)...
  ...
  Migracja omnibus_price_history zakończona. Zmigrowano 5200 rekordów.

Wykonywanie migracji: checkboxes_v2...
  Migracja checkboxes_v2 zakończona. Zmigrowano 3 rekordy.

Wszystkie migracje zakończone pomyślnie.
```

Виконати конкретну мiграцiю з бiльшою партiєю:

```bash
wp polski migrate omnibus_price_history --batch-size=500
```

Примусово повторити мiграцiю:

```bash
wp polski migrate search_index --force
```

### Обробка помилок

Якщо мiграцiя завершиться помилкою, плагiн:

1. Покаже детальне повiдомлення про помилку
2. Скасує змiни з поточної партii (rollback)
3. Запише лог до `wp-content/debug.log` (якщо `WP_DEBUG_LOG` увiмкнено)
4. Запам'ятає точку зупинки - наступний запуск продовжить з мiсця помилки

```bash
wp polski migrate omnibus_price_history
```

Результат при помилцi:

```
Wykonywanie migracji: omnibus_price_history...
  Przetwarzanie partii 23/52 (100 rekordów)...
  BŁĄD: Nie można zapisać rekordu #2345 - naruszenie integralności danych.
  Rollback partii 23 wykonany.
  Migracja przerwana. Wykonaj ponownie, aby kontynuować od partii 23.
```

## wp polski smoke-test

Команда тестування правильностi конфiгурацii магазину. Перевiряє всi модулi плагiна, юридичнi сторiнки, чекбокси та iнтеграцii.

### Синтаксис

```bash
wp polski smoke-test [--module=<module>] [--format=<format>] [--verbose]
```

### Опцii

| Опцiя               | Опис                                      |
| -------------------- | ----------------------------------------- |
| `--module=<module>`  | Тестувати лише обраний модуль              |
| `--format=<format>`  | Формат виводу: table (за замовчуванням), json, csv |
| `--verbose`          | Детальна iнформацiя про кожний тест        |

### Елементи, що тестуються

| Модуль              | Тести                                              |
| -------------------- | -------------------------------------------------- |
| `compliance`         | Юридичнi сторiнки, чекбокси, GPSR, Omnibus, DSA    |
| `checkout`           | Кнопка замовлення, поля NIP, DOI                   |
| `prices`             | Одиничнi цiни, ПДВ, час доставки                   |
| `food`               | Харчова цiннiсть, алергени, Nutri-Score             |
| `storefront`         | Wishlist, порiвняння, пошук, фiльтри, слайдер       |
| `integrations`       | REST API, шаблони, кеш, cron                        |

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
| Moduł               | Test                      | Status |
+---------------------+---------------------------+--------+
| compliance          | Regulamin sklepu          | OK     |
| compliance          | Polityka prywatności      | OK     |
| compliance          | Checkboxy kasy            | OK     |
| compliance          | Dane GPSR                 | WARN   |
| compliance          | Cena Omnibus              | OK     |
| compliance          | Formularz DSA             | OK     |
| checkout            | Etykieta przycisku        | OK     |
| checkout            | Pole NIP                  | OK     |
| checkout            | Double opt-in             | OFF    |
| prices              | Cena jednostkowa          | OK     |
| prices              | Informacja VAT            | OK     |
| prices              | Czas dostawy              | WARN   |
| storefront          | Wyszukiwarka AJAX         | OK     |
| storefront          | Filtry AJAX               | OK     |
| integrations        | REST API                  | OK     |
| integrations        | Szablony motywu           | OK     |
| integrations        | Cache transient           | OK     |
| integrations        | WP-Cron                   | OK     |
+---------------------+---------------------------+--------+

Wynik: 15 OK, 2 WARN, 1 OFF
```

Статуси:
- **OK** - тест пройшов успiшно
- **WARN** - попередження, потребує перевiрки
- **FAIL** - критична помилка
- **OFF** - модуль вимкнено

Тест конкретного модуля з деталями:

```bash
wp polski smoke-test --module=compliance --verbose
```

Результат:

```
Test: compliance/regulamin
  Strona ID: 45
  Status: publish
  Ostatnia aktualizacja: 2025-06-01
  Liczba słów: 3200
  Wynik: OK

Test: compliance/gpsr
  Produkty z GPSR: 142/350 (40.6%)
  Brak danych GPSR: 208 produktów
  Wynik: WARN - Nie wszystkie produkty mają uzupełnione dane GPSR
```

Експорт у JSON (наприклад, для CI/CD):

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
      "message": "Regulamin sklepu opublikowany (ID: 45)"
    }
  ]
}
```

## Iнтеграцiя з CI/CD

Команда `smoke-test` повертає вiдповiдний код завершення:

| Код | Опис                    |
| --- | ----------------------- |
| 0   | Всi тести OK            |
| 1   | Попередження (WARN)     |
| 2   | Критичнi помилки (FAIL) |

Приклад використання в GitHub Actions:

```yaml
- name: Polski smoke test
  run: wp polski smoke-test --format=json > smoke-test-results.json
  continue-on-error: false
```

Приклад у скриптi bash:

```bash
#!/bin/bash
wp polski smoke-test --format=json > /tmp/smoke-test.json

EXIT_CODE=$?
if [ $EXIT_CODE -eq 2 ]; then
    echo "Testy Polski FAILED - sprawdź konfigurację"
    exit 1
elif [ $EXIT_CODE -eq 1 ]; then
    echo "Testy Polski WARN - sprawdź ostrzeżenia"
fi
```

## Multisite

Команди WP-CLI пiдтримують iнсталяцii WordPress Multisite. Використовуйте прапорець `--url` для вказання конкретного сайту:

```bash
wp polski smoke-test --url=sklep1.twojadomena.pl
wp polski migrate --url=sklep2.twojadomena.pl
```

Повiдомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
