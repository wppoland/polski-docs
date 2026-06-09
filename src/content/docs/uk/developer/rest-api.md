---
title: REST API
description: Документація REST API плагіна Polski for WooCommerce - простір імен polski/v1/, ендпоінти налаштувань, чекбоксів, юридичних сторінок, пошуку та майстра.
---

REST API у просторі імен `polski/v1/`. Керуйте налаштуваннями, юридичними чекбоксами, юридичними сторінками та пошуком товарів.

## Автентифікація

Ендпоінти, що змінюють дані (POST, PUT, DELETE), вимагають автентифікації. Ендпоінт `/search` є публічним.

Підтримувані методи автентифікації:
- **Application Passwords** (WordPress 5.6+) - рекомендовано
- **Cookie + nonce** - для запитів з панелі адміністратора
- **Basic Auth** (з плагіном Basic Auth) - лише для розробки

Потрібне право: `manage_woocommerce` (за замовчуванням ролі Адміністратор і Менеджер магазину).

## Ендпоінти

### GET /polski/v1/settings

Отримує всі групи налаштувань плагіна.

**Права:** `manage_woocommerce`

**Приклад запиту:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://tvijmagazyn.pl/wp-json/polski/v1/settings"
```

**Приклад відповіді:**

```json
{
  "groups": [
    {
      "id": "general",
      "label": "Загальні налаштування",
      "description": "Базова конфігурація плагіна"
    },
    {
      "id": "compliance",
      "label": "Юридичні вимоги",
      "description": "Налаштування вимог права ЄС та польського права"
    },
    {
      "id": "storefront",
      "label": "Модулі магазину",
      "description": "Модулі, що розширюють магазин"
    },
    {
      "id": "checkout",
      "label": "Каса та замовлення",
      "description": "Налаштування каси та процесу замовлення"
    }
  ]
}
```

### GET /polski/v1/settings/{group}

Отримує налаштування з обраної групи.

**Параметри URL:**

| Параметр | Тип    | Опис            |
| -------- | ------ | --------------- |
| `group`  | string | ID групи налаштувань |

**Права:** `manage_woocommerce`

**Приклад запиту:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://tvijmagazyn.pl/wp-json/polski/v1/settings/compliance"
```

**Приклад відповіді:**

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

Оновлює налаштування в обраній групі.

**Права:** `manage_woocommerce`

**Приклад запиту:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"omnibus_days": 30, "withdrawal_days": 14}' \
  "https://tvijmagazyn.pl/wp-json/polski/v1/settings/compliance"
```

**Приклад відповіді:**

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

Отримує список усіх юридичних чекбоксів (каса, реєстрація, контакт).

**Права:** `manage_woocommerce`

**Приклад відповіді:**

```json
{
  "checkboxes": [
    {
      "id": 1,
      "label": "Приймаю правила магазину",
      "required": true,
      "location": "checkout",
      "enabled": true,
      "position": 10,
      "legal_page_id": 45
    },
    {
      "id": 2,
      "label": "Я ознайомився з політикою конфіденційності",
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

Отримує статистику прийняття чекбоксів.

**Права:** `manage_woocommerce`

**Приклад відповіді:**

```json
{
  "stats": [
    {
      "checkbox_id": 1,
      "label": "Приймаю правила магазину",
      "total_shown": 1250,
      "total_accepted": 1180,
      "acceptance_rate": 94.4
    }
  ]
}
```

### GET /polski/v1/checkboxes/{id}

Отримує деталі окремого чекбокса.

**Параметри URL:**

| Параметр | Тип | Опис         |
| -------- | --- | ------------ |
| `id`     | int | ID чекбокса  |

**Права:** `manage_woocommerce`

**Приклад відповіді:**

```json
{
  "id": 1,
  "label": "Приймаю правила магазину",
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

**Права:** `manage_woocommerce`

**Приклад запиту:**

```bash
curl -X PUT \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"label": "Приймаю правила", "required": true}' \
  "https://tvijmagazyn.pl/wp-json/polski/v1/checkboxes/1"
```

### GET /polski/v1/legal-pages

Отримує список юридичних сторінок (правила, політика конфіденційності тощо).

**Права:** `manage_woocommerce`

**Приклад відповіді:**

```json
{
  "pages": [
    {
      "id": 45,
      "type": "terms",
      "title": "Правила магазину",
      "status": "publish",
      "url": "https://tvijmagazyn.pl/regulamin/",
      "last_modified": "2025-06-01T14:00:00",
      "word_count": 3200
    },
    {
      "id": 47,
      "type": "privacy",
      "title": "Політика конфіденційності",
      "status": "publish",
      "url": "https://tvijmagazyn.pl/polityka-prywatnosci/",
      "last_modified": "2025-05-15T09:30:00",
      "word_count": 2800
    }
  ],
  "total": 2
}
```

### POST /polski/v1/legal-pages/generate

Генерує юридичну сторінку на основі шаблону.

**Права:** `manage_woocommerce`

**Параметри body:**

| Параметр      | Тип    | Обов'язковий | Опис                                     |
| ------------- | ------ | -------- | ---------------------------------------- |
| `type`        | string | Так      | Тип сторінки: terms, privacy, withdrawal, dsa_report |
| `company_name`| string | Так      | Назва компанії                           |
| `company_address` | string | Так  | Адреса компанії                          |
| `email`       | string | Так      | Контактна електронна пошта               |
| `phone`       | string | Ні       | Номер телефону                           |
| `nip`         | string | Ні       | NIP компанії                             |

**Приклад запиту:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"type": "terms", "company_name": "Mój Sklep Sp. z o.o.", "company_address": "ul. Przykładowa 1, 00-001 Warszawa", "email": "kontakt@mojsklep.pl"}' \
  "https://tvijmagazyn.pl/wp-json/polski/v1/legal-pages/generate"
```

**Приклад відповіді:**

```json
{
  "page_id": 120,
  "type": "terms",
  "title": "Правила магазину",
  "url": "https://tvijmagazyn.pl/regulamin/",
  "status": "draft"
}
```

### GET /polski/v1/search

Пошук товарів (публічний ендпоінт).

**Параметри query:**

| Параметр | Тип    | Обов'язковий | Опис                        |
| -------- | ------ | -------- | --------------------------- |
| `q`      | string | Так      | Пошукова фраза              |
| `limit`  | int    | Ні       | Ліміт результатів (за замовчуванням 8) |
| `cat`    | int    | Ні       | ID категорії                |

**Права:** публічний (не вимагає автентифікації)

**Приклад запиту:**

```bash
curl "https://tvijmagazyn.pl/wp-json/polski/v1/search?q=buty&limit=5"
```

**Приклад відповіді:**

```json
{
  "results": [
    {
      "id": 456,
      "title": "Спортивне взуття Nike",
      "url": "https://tvijmagazyn.pl/produkt/buty-sportowe-nike/",
      "image": "https://tvijmagazyn.pl/wp-content/uploads/buty-nike.jpg",
      "price_html": "<span class=\"amount\">299,00&nbsp;zł</span>",
      "category": "Взуття",
      "in_stock": true,
      "rating": 4.8
    }
  ],
  "total": 1,
  "query": "buty"
}
```

### POST /polski/v1/wizard/complete

Позначає майстер конфігурації як завершений.

**Права:** `manage_woocommerce`

**Параметри body:**

| Параметр       | Тип   | Обов'язковий | Опис                          |
| -------------- | ----- | -------- | ----------------------------- |
| `steps_completed` | array | Так   | Список завершених кроків      |

**Приклад запиту:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"steps_completed": ["company_info", "legal_pages", "checkboxes", "compliance"]}' \
  "https://tvijmagazyn.pl/wp-json/polski/v1/wizard/complete"
```

**Приклад відповіді:**

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

## Коди HTTP-відповідей

| Код | Опис                                              |
| --- | ------------------------------------------------- |
| 200 | Успіх                                             |
| 201 | Ресурс створено (POST)                            |
| 400 | Некоректний запит (відсутні параметри)            |
| 401 | Немає автентифікації                              |
| 403 | Немає прав                                        |
| 404 | Ресурс не знайдено                                |
| 500 | Помилка сервера                                   |

## Фільтрування відповідей

Кожен ендпоінт має фільтр для зміни відповіді:

```php
add_filter('polski/rest/settings_response', function (array $response, WP_REST_Request $request): array {
    // Зміна відповіді
    return $response;
}, 10, 2);
```

## Rate limiting

Вбудованого rate limiting немає. Використовуйте Cloudflare, Nginx або плагін для обмеження публічних ендпоінтів.

Повідомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням проконсультуйтеся з юристом. Polski for WooCommerce є програмним забезпеченням з відкритим кодом (GPLv2), що надається без гарантій.</div>
