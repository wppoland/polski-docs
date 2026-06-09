---
title: Ідентифікація компанії у футері
description: Відображення даних компанії (назва, NIP, адреса, контакт) у футері магазину за допомогою шорткоду [polski_business_info] або блоку Gutenberg polski/business-info.
---

Модуль **Ідентифікація компанії** відображає дані, що ідентифікують продавця (назва, адреса, NIP, REGON, email, телефон), як цілісний блок у футері магазину, на сторінці товару або в будь-якому місці теми. Дані беруться з налаштувань `polski_general`, що заповнюються у майстрі конфігурації.

:::note
Ст. 12 Закону про права споживача та ст. 206 KSH вимагають від підприємця розкриття ідентифікаційних даних на сторінці магазину. Цей модуль допомагає зібрати їх в одному місці та підтримувати узгодженість на всіх підсторінках.
:::

## Шорткод

```
[polski_business_info]
[polski_business_info format="inline" separator=" • "]
[polski_business_info show_regon="1"]
```

## Блок Gutenberg

Назва блоку: `polski/business-info` (категорія Widgets, іконка `id-alt`).
Підтримує `align: wide | full`, `html: false`.

## Атрибути

| Атрибут     | Тип     | За замовчуванням | Опис                                                                       |
| ----------- | ------- | ---------------- | -------------------------------------------------------------------------- |
| format      | string  | `block`          | `block` (список div) або `inline` (span з роздільником)                    |
| separator   | string  | ` | `            | Роздільник позицій у режимі `inline`                                       |
| show_label  | bool    | `true`           | Показує префікси `NIP:` / `REGON:` біля номерів                            |
| show_regon  | bool    | `false`          | Додає REGON (за замовчуванням прихований, бо рідше потрібен)               |

## Джерело даних

Усі поля беруться з опції `polski_general`:

| Ключ опції          | Поле виводу |
| ------------------- | ----------- |
| `company_name`      | Назва       |
| `company_address`   | Адреса      |
| `company_nip`       | NIP         |
| `company_regon`     | REGON       |
| `company_email`     | Email (mailto + `antispambot`) |
| `company_phone`     | Телефон     |

Email рендериться як посилання `mailto:`, захищене функцією `antispambot()` (конвертує символи в HTML-сутності, ускладнюючи збір ботами).

## Приклади

### Футер магазину

```html
<div class="site-footer">
    [polski_business_info format="block" show_regon="1"]
</div>
```

Рендерить:

```html
<div class="polski-business-info polski-business-info--block">
    <div class="polski-business-info__line polski-business-info__line--name">Sklep Polski Sp. z o.o.</div>
    <div class="polski-business-info__line polski-business-info__line--address">ul. Przykladowa 1, 00-001 Warszawa</div>
    <div class="polski-business-info__line polski-business-info__line--nip">NIP: 123-45-67-890</div>
    <div class="polski-business-info__line polski-business-info__line--regon">REGON: 123456789</div>
    <div class="polski-business-info__line polski-business-info__line--email"><a href="mailto:...">...</a></div>
    <div class="polski-business-info__line polski-business-info__line--phone">+48 123 456 789</div>
</div>
```

### Inline-версія для контактної панелі

```
[polski_business_info format="inline" separator=" • " show_label="0"]
```

## CSS-стилі

Модуль додає класи, не нав'язує вигляд. Стилізація у власній темі:

```css
.polski-business-info--block { line-height: 1.6; }
.polski-business-info__line--name { font-weight: 600; }
.polski-business-info__line--email a { color: inherit; text-decoration: underline; }
```

## Увімкнення / вимкнення

Модуль контролюється прапорцем `business_info` у **Polski > Модулі**. Якщо вимкнено, шорткод і блок не реєструються.

## Обмеження

- Немає підтримки кількох компаній (наприклад, брендів / філій), лише один набір даних з `polski_general`
- Якщо жодне поле не заповнене, шорткод повертає порожній рядок (не рендерить порожній HTML)
- Блок динамічний, його не можна редагувати візуально поза зміною атрибутів
