---
title: Поля B2B на сторінці оформлення замовлення
description: 'Опціональний перемикач "Купую як компанія" та поля NIP, REGON і IBAN у WooCommerce checkout. Валідація NIP за алгоритмом контрольної суми, збереження до стандартних мета замовлення, що використовуються KSeF і модулем фактур.'
---

Polski 1.13.0 додає опціональний набір полів B2B до WooCommerce checkout: перемикач "Купую як компанія" та поля NIP, REGON і IBAN. Поля з'являються у класичному checkout WooCommerce (фільтр `woocommerce_billing_fields`), зберігаються до стандартних мета замовлення і зчитуються модулем KSeF та фактуруванням у PRO без додаткового налаштування.

## Перемикач "Купую як компанія"

Чекбокс `polski_buying_as_company` на початку секції billing. За замовчуванням не позначений - поля NIP, REGON і IBAN приховані доти, доки його не позначено. Стан зберігається до мета замовлення `_polski_buying_as_company` (`yes` / `no`).

Логіка приховування реалізована інлайновим JavaScript - вона не вимагає процесу збирання чи додаткових фронтенд-залежностей. Скрипт також обробляє подію `updated_checkout` з jQuery, тож працює після асинхронного перезавантаження фрагмента checkout.

## NIP

Поле `billing_nip` з валідацією за алгоритмом контрольної суми Polish NIP (10 цифр, ваги 6, 5, 7, 2, 3, 4, 5, 6, 7, за модулем 11). Допустимі формати введення: `1234567890`, `123-456-78-90`, `123 456 78 90`, а також з префіксом `PL1234567890` (префікс видаляється перед валідацією). Значення зберігається у нормалізованому вигляді (10 цифр) до мета `_billing_nip`.

Валідація в PHP використовує новий статичний клас `Polski\Util\NipValidator`:

```php
use Polski\Util\NipValidator;

NipValidator::isValid('5260250274');           // true
NipValidator::isValid('PL 526-025-02-74');     // true
NipValidator::normalize('PL 526-025-02-74');   // '5260250274'
NipValidator::format('5260250274');            // '526-025-02-74'
```

Якщо активний модуль `Polski\Pro\Validation\NipValidator` з polski-pro, FREE пропускає власну реєстрацію поля NIP, щоб не дублювати поле у checkout. REGON і IBAN завжди додаються через FREE.

## REGON

Опціональне поле `billing_regon` (за замовчуванням вимкнене). Приймає 9 або 14 цифр (короткий REGON / довгий REGON). Валідація regex: `/^\d{9}$|^\d{14}$/`. Зберігається до мета замовлення `_billing_regon`.

## IBAN

Опціональне поле `billing_iban` (за замовчуванням вимкнене). Структурна валідація: 2 літери префікса країни + 2 контрольні цифри + 11-30 буквено-цифрових символів, загальна довжина 15-34. Строгий mod-97 свідомо залишено інтеграторам (напр. плагіну платіжного шлюзу). Зберігається до мета `_billing_iban`.

## Налаштування (`polski_b2b`)

| Ключ | Значення за замовчуванням | Опис |
|---|---|---|
| `enabled` | `true` | Головний перемикач модуля |
| `show_company_toggle` | `true` | Чи показувати чекбокс "Купую як компанія" |
| `nip` | `true` | Чи додавати поле NIP (пропускається, коли активний polski-pro NipValidator) |
| `regon` | `false` | Чи додавати поле REGON |
| `iban` | `false` | Чи додавати поле IBAN |

Увімкнення REGON та IBAN через `update_option`:

```php
update_option('polski_b2b', array_merge(
    (array) get_option('polski_b2b', []),
    ['regon' => true, 'iban' => true]
));
```

## Інтеграція з іншими модулями

- **Модуль KSeF (FREE)** зчитує `_billing_nip` із замовлення і автоматично виявляє замовлення, що потребують електронної фактури.
- **Модуль Фактури (PRO)** зчитує `_billing_nip` як `nipBuyer` під час генерації Faktury VAT та Faktury korygującej.
- **AI Feed для фактур (PRO)** надає фактури у вигляді Markdown разом із полями NIP у секції "Parties".

## Відображення в панелі адміністратора

Поля NIP / REGON / IBAN додаються до блоку "Billing details" у вигляді замовлення в панелі (`woocommerce_admin_billing_fields`). Редагуєте їх у тому самому місці, що й платіжну адресу клієнта.

## Сумісність з Block checkout

Починаючи з Polski 1.14.0 поля NIP / REGON / IBAN реєструються через WooCommerce API `woocommerce_register_additional_checkout_field` (WC 8.6+). Одна реєстрація покриває як **класичний checkout**, так і **Block checkout (Cart & Checkout Blocks)**. Валідація працює з обох сторін.

Значення, збережені через це API, потрапляють за замовчуванням під ключі мета `_wc_billing/polski/nip`, `_wc_billing/polski/regon`, `_wc_billing/polski/iban`. Polski автоматично копіює їх до **старіших** ключів `_billing_nip`, `_billing_regon`, `_billing_iban` (дія `woocommerce_set_additional_field_value`), завдяки чому модулі KSeF та Фактури в PRO зчитують дані без жодних змін.

Магазини на WooCommerce старішому за 8.6 надалі користуються класичним шляхом реєстрації полів (`woocommerce_billing_fields`) з перемикачем "Купую як компанія" та інлайновим JavaScript.
