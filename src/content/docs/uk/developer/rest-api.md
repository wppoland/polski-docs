---
title: REST API
description: Документацiя REST API плагiна Polski for WooCommerce - namespace polski/v1/, ендпоiнти налаштувань, чекбоксiв, юридичних сторiнок, пошуку та майстра.
---

Polski for WooCommerce надає REST API в namespace `polski/v1/`. API дозволяє програмно керувати налаштуваннями, юридичними чекбоксами, юридичними сторiнками та пошуком продуктiв.

## Автентифiкацiя

API вимагає автентифiкацii для ендпоiнтiв, що змiнюють данi (POST, PUT, DELETE). Ендпоiнт пошуку (`/search`) доступний публiчно.

Пiдтримуванi методи автентифiкацii:
- **Application Passwords** (WordPress 5.6+) - рекомендовано
- **Cookie + nonce** - для запитiв з панелi адмiнiстратора
- **Basic Auth** (з плагiном Basic Auth) - тiльки для розробки

Необхiдний дозвiл: `manage_woocommerce` (за замовчуванням ролi Адмiнiстратор та Менеджер магазину).

## Ендпоiнти

### GET /polski/v1/settings

Отримує всi групи налаштувань плагiна.

**Дозволи:** `manage_woocommerce`

**Приклад запиту:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://twojsklep.pl/wp-json/polski/v1/settings"
```

**Приклад вiдповiдi:**

```json
{
  "groups": [
    {
      "id": "general",
      "label": "Ustawienia ogólne",
      "description": "Podstawowa konfiguracja wtyczki"
    },
    {
      "id": "compliance",
      "label": "Zgodność prawna",
      "description": "Ustawienia zgodności z prawem UE i polskim"
    },
    {
      "id": "storefront",
      "label": "Moduły sklepowe",
      "description": "Moduły rozszerzające sklep"
    },
    {
      "id": "checkout",
      "label": "Kasa i zamówienia",
      "description": "Ustawienia kasy i procesu zamówienia"
    }
  ]
}
```

### GET /polski/v1/settings/{group}

Отримує налаштування з обраної групи.

**Параметри URL:**

| Параметр | Тип    | Опис               |
| -------- | ------ | ------------------ |
| `group`  | string | ID групи налаштувань |

**Дозволи:** `manage_woocommerce`

**Приклад запиту:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://twojsklep.pl/wp-json/polski/v1/settings/compliance"
```

**Приклад вiдповiдi:**

```json
{
  "group": "compliance",
  "settings": {
    "omnibus_enabled": true,
    "omnibus_days": 30,
    "gpsr_enabled": true,
    "withdrawal_enabled": true,
    "withdrawal_days": 14,
    "dsa_enabled": true,
    "ksef_enabled": false,
    "greenwashing_enabled": true
  }
}
```

### POST /polski/v1/settings/{group}

Оновлює налаштування в обранiй групi.

**Дозволи:** `manage_woocommerce`

**Приклад запиту:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"omnibus_days": 30, "withdrawal_days": 14}' \
  "https://twojsklep.pl/wp-json/polski/v1/settings/compliance"
```

**Приклад вiдповiдi:**

```json
{
  "updated": true,
  "group": "compliance",
  "changes": {
    "omnibus_days": 30,
    "withdrawal_days": 14
  }
}
```

### GET /polski/v1/checkboxes

Отримує список усiх юридичних чекбоксiв (каса, реєстрацiя, контакт).

**Дозволи:** `manage_woocommerce`

**Приклад вiдповiдi:**

```json
{
  "checkboxes": [
    {
      "id": 1,
      "label": "Akceptuję regulamin sklepu",
      "required": true,
      "location": "checkout",
      "enabled": true,
      "position": 10,
      "legal_page_id": 45
    },
    {
      "id": 2,
      "label": "Zapoznałem się z polityką prywatności",
      "required": true,
      "location": "checkout",
      "enabled": true,
      "position": 20,
      "legal_page_id": 47
    }
  ],
  "total": 2
}
```

### GET /polski/v1/checkboxes/stats

Отримує статистику прийняття чекбоксiв.

**Дозволи:** `manage_woocommerce`

**Приклад вiдповiдi:**

```json
{
  "stats": [
    {
      "checkbox_id": 1,
      "label": "Akceptuję regulamin sklepu",
      "total_shown": 1250,
      "total_accepted": 1180,
      "acceptance_rate": 94.4
    }
  ]
}
```

### GET /polski/v1/checkboxes/{id}

Отримує деталi окремого чекбокса.

**Параметри URL:**

| Параметр | Тип | Опис          |
| -------- | --- | ------------- |
| `id`     | int | ID чекбокса   |

**Дозволи:** `manage_woocommerce`

**Приклад вiдповiдi:**

```json
{
  "id": 1,
  "label": "Akceptuję regulamin sklepu",
  "required": true,
  "location": "checkout",
  "enabled": true,
  "position": 10,
  "legal_page_id": 45,
  "created_at": "2025-01-15T10:30:00",
  "updated_at": "2025-06-01T14:22:00",
  "stats": {
    "total_shown": 1250,
    "total_accepted": 1180,
    "acceptance_rate": 94.4
  }
}
```

### PUT /polski/v1/checkboxes/{id}

Оновлює чекбокс.

**Дозволи:** `manage_woocommerce`

**Приклад запиту:**

```bash
curl -X PUT \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"label": "Akceptuję regulamin", "required": true}' \
  "https://twojsklep.pl/wp-json/polski/v1/checkboxes/1"
```

### GET /polski/v1/legal-pages

Отримує список юридичних сторiнок (регламент, полiтика конфiденцiйностi тощо).

**Дозволи:** `manage_woocommerce`

**Приклад вiдповiдi:**

```json
{
  "pages": [
    {
      "id": 45,
      "type": "terms",
      "title": "Regulamin sklepu",
      "status": "publish",
      "url": "https://twojsklep.pl/regulamin/",
      "last_modified": "2025-06-01T14:00:00",
      "word_count": 3200
    },
    {
      "id": 47,
      "type": "privacy",
      "title": "Polityka prywatności",
      "status": "publish",
      "url": "https://twojsklep.pl/polityka-prywatnosci/",
      "last_modified": "2025-05-15T09:30:00",
      "word_count": 2800
    }
  ],
  "total": 2
}
```

### POST /polski/v1/legal-pages/generate

Генерує юридичну сторiнку на основi шаблону.

**Дозволи:** `manage_woocommerce`

**Параметри body:**

| Параметр          | Тип    | Обов'язковий | Опис                              |
| ----------------- | ------ | ------------ | --------------------------------- |
| `type`            | string | Так          | Тип сторiнки: terms, privacy, withdrawal, dsa_report |
| `company_name`    | string | Так          | Назва компанii                    |
| `company_address` | string | Так          | Адреса компанii                   |
| `email`           | string | Так          | Контактна електронна адреса       |
| `phone`           | string | Нi           | Номер телефону                    |
| `nip`             | string | Нi           | NIP компанii                      |

**Приклад запиту:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"type": "terms", "company_name": "Mój Sklep Sp. z o.o.", "company_address": "ul. Przykładowa 1, 00-001 Warszawa", "email": "kontakt@mojsklep.pl"}' \
  "https://twojsklep.pl/wp-json/polski/v1/legal-pages/generate"
```

**Приклад вiдповiдi:**

```json
{
  "page_id": 120,
  "type": "terms",
  "title": "Regulamin sklepu",
  "url": "https://twojsklep.pl/regulamin/",
  "status": "draft"
}
```

### GET /polski/v1/search

Пошук продуктiв (публiчний ендпоiнт).

**Параметри query:**

| Параметр | Тип    | Обов'язковий | Опис                              |
| -------- | ------ | ------------ | --------------------------------- |
| `q`      | string | Так          | Пошукова фраза                    |
| `limit`  | int    | Нi           | Лiмiт результатiв (за замовчуванням 8) |
| `cat`    | int    | Нi           | ID категорii                      |

**Дозволи:** публiчний (не вимагає автентифiкацii)

**Приклад запиту:**

```bash
curl "https://twojsklep.pl/wp-json/polski/v1/search?q=buty&limit=5"
```

**Приклад вiдповiдi:**

```json
{
  "results": [
    {
      "id": 456,
      "title": "Buty sportowe Nike",
      "url": "https://twojsklep.pl/produkt/buty-sportowe-nike/",
      "image": "https://twojsklep.pl/wp-content/uploads/buty-nike.jpg",
      "price_html": "<span class=\"amount\">299,00&nbsp;zł</span>",
      "category": "Obuwie",
      "in_stock": true,
      "rating": 4.8
    }
  ],
  "total": 1,
  "query": "buty"
}
```

### POST /polski/v1/wizard/complete

Позначає майстер конфiгурацii як завершений.

**Дозволи:** `manage_woocommerce`

**Параметри body:**

| Параметр           | Тип   | Обов'язковий | Опис                          |
| ------------------ | ----- | ------------ | ----------------------------- |
| `steps_completed`  | array | Так          | Список завершених крокiв      |

**Приклад запиту:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"steps_completed": ["company_info", "legal_pages", "checkboxes", "compliance"]}' \
  "https://twojsklep.pl/wp-json/polski/v1/wizard/complete"
```

**Приклад вiдповiдi:**

```json
{
  "completed": true,
  "completed_at": "2025-06-15T12:00:00",
  "steps": {
    "company_info": true,
    "legal_pages": true,
    "checkboxes": true,
    "compliance": true
  }
}
```

## Коди HTTP-вiдповiдей

| Код | Опис                                              |
| --- | ------------------------------------------------- |
| 200 | Успiх                                             |
| 201 | Ресурс створено (POST)                            |
| 400 | Некоректний запит (вiдсутнi параметри)             |
| 401 | Вiдсутня автентифiкацiя                           |
| 403 | Вiдсутнi дозволи                                  |
| 404 | Ресурс не знайдено                                |
| 500 | Помилка сервера                                   |

## Фiльтрацiя вiдповiдей

Кожний ендпоiнт пiдтримує фiльтр WordPress, що дозволяє модифiкувати вiдповiдь:

```php
add_filter('polski/rest/settings_response', function (array $response, WP_REST_Request $request): array {
    // Модифікація відповіді
    return $response;
}, 10, 2);
```

## Rate limiting

API не реалiзує власного rate limiting. Рекомендується використовувати плагiн або конфiгурацiю сервера (наприклад, Cloudflare, Nginx rate limiting) для публiчних ендпоiнтiв.

Повiдомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
