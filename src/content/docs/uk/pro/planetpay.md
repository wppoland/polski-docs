---
title: Інтеграція PlanetPay
description: Платіжний шлюз PlanetPay у Polski PRO - BLIK, картки, банківські перекази, Google Pay, Apple Pay.
---

Модуль PlanetPay інтегрує WooCommerce з платіжним шлюзом PlanetPay. Підтримує BLIK, платіжні картки, банківські перекази, Google Pay та Apple Pay.

:::note[Вимоги]
Polski PRO вимагає: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Обліковий запис у PlanetPay.
:::

## Налаштування

Перейдіть до **WooCommerce > Налаштування > Платежі > PlanetPay**.

### Дані доступу

| Налаштування | Опис |
|------------|------|
| Merchant ID | Ідентифікатор продавця |
| Merchant Secret | Секретний ключ продавця |
| Ключ підпису | Ключ SHA256 HMAC для верифікації webhook-ів |
| Режим sandbox | Тестування без реальних транзакцій |

### Способи оплати

| Спосіб | Опис |
|--------|------|
| BLIK | Оплата 6-значним кодом, миттєво |
| Картки | Visa, Mastercard, інші |
| Банківські перекази | Przelewy24 та традиційні |
| Google Pay | Оплата Google Pay |
| Apple Pay | Оплата Apple Pay |

## Процес оплати

### BLIK
1. Клієнт вибирає BLIK і вводить 6-значний код
2. Платіж обробляється миттєво через API
3. Замовлення позначається як оплачене

### Інші способи
1. Клієнт вибирає спосіб оплати
2. Перенаправлення на paywall PlanetPay
3. Webhook оновлює статус замовлення

## Повернення коштів

Повернення можна ініціювати з панелі замовлення WooCommerce. API PlanetPay обробляє повернення та надсилає сповіщення webhook.

## Webhook-и

| Endpoint | Опис |
|----------|------|
| `/wp-json/polski-pro/v1/planetpay/payment` | Сповіщення про статус платежу |
| `/wp-json/polski-pro/v1/planetpay/refund` | Сповіщення про статус повернення |

Webhook-и верифікуються підписом SHA256 HMAC у заголовку `X-Planetpay-Signature`.
