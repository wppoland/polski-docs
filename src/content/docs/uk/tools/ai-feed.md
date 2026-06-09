---
title: AI Feed - видимість для агентів AI
description: Модуль AI Feed подає окремі записи, сторінки та товари WooCommerce у форматі Markdown через узгодження вмісту, завдяки чому агенти AI та LLM можуть читати вміст магазину без парсингу HTML.
---

AI Feed надає вміст магазину у форматі **Markdown**, оптимізованому під мовні моделі та агентів покупок. HTTP-клієнт надсилає заголовок `Accept: text/markdown` (або додає `?output_format=md` до URL) і замість відрендереної HTML-сторінки отримує чистий Markdown з метаданими YAML.

## Навіщо це потрібно

Агенти AI (ChatGPT shopping, Perplexity, Gemini, власні краулери LLM) дедалі частіше оминають HTML і запитують безпосередньо "чисту" версію сторінки. Традиційний скрапінг HTML ненадійний, витратний і втрачав структуровані дані. AI Feed змінює цю залежність: магазин сам публікує читабельну для машин версію за тим самим URL, що й версія для людини.

## Увімкнення модуля

Модуль активний за замовчуванням після оновлення до версії 1.11.0. Ви можете вимкнути його фільтром:

```php
add_filter('polski/ai_feed/enabled', '__return_false');
```

Налаштування в опції `polski_ai_feed`:

| Ключ | Значення за замовчуванням | Опис |
|---|---|---|
| `enabled` | `true` | Глобальний перемикач |
| `post_types` | `['post', 'page', 'product']` | Типи вмісту, що подаються як Markdown |

## Як працює узгодження вмісту

Markdown повертається у двох випадках:

1. **Заголовок `Accept`** містить `text/markdown` (за винятком явного `q=0`).
2. **Параметр URL** `?output_format=md` присутній у запиті.

В обох випадках відповідь має заголовки:

```
Content-Type: text/markdown; charset=UTF-8
Vary: Accept
```

Звичайні відвідувачі надалі отримують стандартний HTML. Логіка дозволів (`read_post`, захист паролем, чернетки) зберігається.

## Виявлення версії Markdown

На HTML-сторінці окремого запису додаємо в `<head>`:

```html
<link rel="alternate" type="text/markdown" href="https://sklep.pl/produkt/koszulka/?output_format=md" />
```

Краулери та агенти AI можуть знайти версію Markdown без потреби знати конвенцію URL.

## Скорочення в панелі адміністратора

У списку записів, сторінок і товарів поруч із дією "Переглянути" з'являється посилання **"View AI Version"**. Воно відкриває ту саму версію Markdown, яку побачить агент AI - зручно для тестів і попереднього перегляду.

## Що містить версія Markdown товару

Для товару WooCommerce відповідь містить:

**Заголовок YAML (front matter)**

```yaml
---
title: "Koszulka basic"
permalink: "https://sklep.pl/produkt/koszulka/"
sku: "TS-001"
gtin: "5901234567890"
product_type: "simple"
currency: "PLN"
price: "49,99 zł"
regular_price: "59,99 zł"
sale_price: "49,99 zł"
in_stock: "true"
on_sale: "true"
modified: "2026-04-30T12:00:00+02:00"
categories: ["Koszulki"]
---
```

**Розділ "Product details"** з маркованим списком:

- SKU і GTIN/EAN
- Ціна брутто, регулярна ціна, акційна ціна
- Податковий клас VAT
- Найнижча ціна за 30 днів (Omnibus)
- Час доставки
- Стан складу та наявність
- Вага і розміри
- Бренд, виробник
- Відповідальна особа (GPSR)

**Повний опис товару**, конвертований у Markdown.

## Приклад повної відповіді

```markdown
---
title: "Koszulka basic"
permalink: "https://sklep.pl/produkt/koszulka/"
sku: "TS-001"
price: "49,99 zł"
in_stock: "true"
---

# Koszulka basic

Bawełniana koszulka klasycznego kroju.

## Product details

- **SKU:** TS-001
- **GTIN/EAN:** 5901234567890
- **Price:** 49,99 zł
- **Tax class:** Standard
- **Lowest price (last 30 days):** 45,00 zł
- **Delivery time:** 1-2 dni
- **Availability:** In stock
- **Weight:** 0.2 kg

## Description

Pełny opis produktu z bloków Gutenberga, w tym listy, tabele i nagłówki.
```

## Маніфест /llms.txt

Відповідно до стандарту [llmstxt.org](https://llmstxt.org) магазин надає файл `/llms.txt` у корені домену. Агенти AI дивляться туди в першу чергу, щоб виявити структуру сайту без знання конвенції URL.

```bash
curl https://sklep.pl/llms.txt
```

Відповідь (Markdown):

```markdown
# Twój sklep

> Sklep z polskimi pamiątkami online.

## Legal

- [Regulamin](https://sklep.pl/regulamin/?output_format=md): Terms and conditions
- [Polityka prywatności](https://sklep.pl/polityka/?output_format=md): Privacy policy
- [Zwroty](https://sklep.pl/zwroty/?output_format=md): Returns and withdrawal policy

## Shop

- [Sklep](https://sklep.pl/sklep/): Storefront

## Product categories

- [Koszulki](https://sklep.pl/kategoria/koszulki/)
- [Bluzy](https://sklep.pl/kategoria/bluzy/)
```

**Що міститься в маніфесті за замовчуванням:**

- Заголовок та опис магазину (`get_bloginfo('name')`, `get_bloginfo('description')`)
- Розділ "Legal" з посиланнями `?output_format=md` на правові сторінки (Регламент, Політика приватності, Повернення, Рекламації) - лише якщо сторінки створено
- Розділ "Shop" з посиланням на сторінку магазину WooCommerce
- Розділ "Product categories" з 20 найпопулярнішими категоріями товарів (відсортовані за кількістю товарів)

**Вимкнення**

```php
add_filter('polski/ai_feed/llms_txt_enabled', '__return_false');
```

**Модифікація розділу**

```php
add_filter('polski/ai_feed/llms_txt_sections', static function (array $sections): array {
    $sections['Resources'] = [
        ['Blog', home_url('/blog/'), 'Najnowsze wpisy'],
        ['FAQ', home_url('/faq/')],
    ];
    return $sections;
});
```

**Ліміт категорій**

```php
add_filter('polski/ai_feed/llms_txt_category_limit', static fn () => 50);
```

## Фільтри для розробників

| Фільтр | Призначення |
|---|---|
| `polski/ai_feed/enabled` | Глобальний перемикач (bool) |
| `polski/ai_feed/post_types` | Список типів вмісту (string[]) |
| `polski/ai_feed/post_markdown` | Кінцевий Markdown запису/сторінки |
| `polski/ai_feed/product_markdown` | Кінцевий Markdown товару |
| `polski/ai_feed/product_facts` | Список пар `[мітка, значення]` у розділі "Product details" |
| `polski/ai_feed/password_required` | Вміст Markdown при захисті паролем |
| `polski/ai_feed/llms_txt_enabled` | Вимикач для `/llms.txt` (bool) |
| `polski/ai_feed/llms_txt_sections` | Мапа розділів `[heading => list]` у маніфесті |
| `polski/ai_feed/llms_txt_category_limit` | Максимальна кількість категорій товарів (int) |

### Приклад - додавання власного CPT

```php
add_filter('polski/ai_feed/post_types', static function (array $types): array {
    $types[] = 'recipe';
    return $types;
});
```

### Приклад - додавання власного поля до товару

```php
add_filter('polski/ai_feed/product_facts', static function (array $facts, WC_Product $product): array {
    $color = $product->get_attribute('pa_kolor');
    if ($color !== '') {
        $facts[] = ['Kolor', $color];
    }
    return $facts;
}, 10, 2);
```

## FAQ

**Чи це замінює тему для звичайних користувачів?**

Ні. HTML повертається за замовчуванням. Markdown потрапляє лише до клієнтів, які про нього попросять через `Accept` або параметр URL.

**Чи витікає вміст, захищений паролем?**

Ні. Коли сторінка вимагає пароля, AI Feed повертає короткий Markdown з інформацією про захист замість повного вмісту.

**Чи підтримуються чернетки?**

Так, для користувачів із дозволами на редагування. Дія "View AI Version" у панелі адміністратора використовує preview URL для чернеток і запланованих записів.

**Чи можу я додати власні типи вмісту?**

Так, через фільтр `polski/ai_feed/post_types`. За замовчуванням підтримуються `post`, `page` і `product`.

**Чи працює з HPOS і Block Checkout?**

Так. Модуль працює на рівні шару подання товару, незалежно від сховища замовлень (HPOS) і checkout (Blocks).
