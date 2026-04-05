---
title: REST API
description: REST API documentation for Polski for WooCommerce - polski/v1/ namespace, settings endpoints, checkboxes, legal pages, search and wizard.
---

Polski for WooCommerce provides a REST API in the `polski/v1/` namespace. The API allows programmatic management of settings, legal checkboxes, legal pages and product search.

## Authentication

The API requires authentication for data-modifying endpoints (POST, PUT, DELETE). The search endpoint (`/search`) is publicly accessible.

Supported authentication methods:
- **Application Passwords** (WordPress 5.6+) - recommended
- **Cookie + nonce** - for requests from the admin panel
- **Basic Auth** (with the Basic Auth plugin) - for development only

Required permission: `manage_woocommerce` (default Administrator and Shop Manager roles).

## Endpoints

### GET /polski/v1/settings

Retrieves all plugin setting groups.

**Permissions:** `manage_woocommerce`

**Example request:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://yourstore.com/wp-json/polski/v1/settings"
```

**Example response:**

```json
{
  "groups": [
    {
      "id": "general",
      "label": "General settings",
      "description": "Basic plugin configuration"
    },
    {
      "id": "compliance",
      "label": "Legal compliance",
      "description": "EU and Polish law compliance settings"
    },
    {
      "id": "storefront",
      "label": "Storefront modules",
      "description": "Store extension modules"
    },
    {
      "id": "checkout",
      "label": "Checkout and orders",
      "description": "Checkout and order process settings"
    }
  ]
}
```

### GET /polski/v1/settings/{group}

Retrieves settings from a selected group.

**URL parameters:**

| Parameter | Type   | Description       |
| --------- | ------ | ----------------- |
| `group`   | string | Setting group ID  |

**Permissions:** `manage_woocommerce`

**Example request:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://yourstore.com/wp-json/polski/v1/settings/compliance"
```

**Example response:**

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

Updates settings in a selected group.

**Permissions:** `manage_woocommerce`

**Example request:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"omnibus_days": 30, "withdrawal_days": 14}' \
  "https://yourstore.com/wp-json/polski/v1/settings/compliance"
```

**Example response:**

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

Retrieves a list of all legal checkboxes (checkout, registration, contact).

**Permissions:** `manage_woocommerce`

**Example response:**

```json
{
  "checkboxes": [
    {
      "id": 1,
      "label": "I accept the store terms and conditions",
      "required": true,
      "location": "checkout",
      "enabled": true,
      "position": 10,
      "legal_page_id": 45
    },
    {
      "id": 2,
      "label": "I have read the privacy policy",
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

Retrieves checkbox acceptance statistics.

**Permissions:** `manage_woocommerce`

**Example response:**

```json
{
  "stats": [
    {
      "checkbox_id": 1,
      "label": "I accept the store terms and conditions",
      "total_shown": 1250,
      "total_accepted": 1180,
      "acceptance_rate": 94.4
    }
  ]
}
```

### GET /polski/v1/checkboxes/{id}

Retrieves details of a single checkbox.

**URL parameters:**

| Parameter | Type | Description   |
| --------- | --- | ------------- |
| `id`      | int | Checkbox ID   |

**Permissions:** `manage_woocommerce`

**Example response:**

```json
{
  "id": 1,
  "label": "I accept the store terms and conditions",
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

Updates a checkbox.

**Permissions:** `manage_woocommerce`

**Example request:**

```bash
curl -X PUT \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"label": "I accept the terms", "required": true}' \
  "https://yourstore.com/wp-json/polski/v1/checkboxes/1"
```

### GET /polski/v1/legal-pages

Retrieves a list of legal pages (terms, privacy policy, etc.).

**Permissions:** `manage_woocommerce`

**Example response:**

```json
{
  "pages": [
    {
      "id": 45,
      "type": "terms",
      "title": "Store terms and conditions",
      "status": "publish",
      "url": "https://yourstore.com/terms/",
      "last_modified": "2025-06-01T14:00:00",
      "word_count": 3200
    },
    {
      "id": 47,
      "type": "privacy",
      "title": "Privacy policy",
      "status": "publish",
      "url": "https://yourstore.com/privacy-policy/",
      "last_modified": "2025-05-15T09:30:00",
      "word_count": 2800
    }
  ],
  "total": 2
}
```

### POST /polski/v1/legal-pages/generate

Generates a legal page based on a template.

**Permissions:** `manage_woocommerce`

**Body parameters:**

| Parameter      | Type   | Required | Description                              |
| ------------- | ------ | -------- | ---------------------------------------- |
| `type`        | string | Yes      | Page type: terms, privacy, withdrawal, dsa_report |
| `company_name`| string | Yes      | Company name                             |
| `company_address` | string | Yes  | Company address                          |
| `email`       | string | Yes      | Contact email address                    |
| `phone`       | string | No       | Phone number                             |
| `nip`         | string | No       | Company NIP                              |

**Example request:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"type": "terms", "company_name": "My Store Sp. z o.o.", "company_address": "ul. Przykladowa 1, 00-001 Warsaw", "email": "contact@mystore.com"}' \
  "https://yourstore.com/wp-json/polski/v1/legal-pages/generate"
```

**Example response:**

```json
{
  "page_id": 120,
  "type": "terms",
  "title": "Store terms and conditions",
  "url": "https://yourstore.com/terms/",
  "status": "draft"
}
```

### GET /polski/v1/search

Product search (public endpoint).

**Query parameters:**

| Parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| `q`       | string | Yes      | Search phrase               |
| `limit`   | int    | No       | Results limit (default 8)   |
| `cat`     | int    | No       | Category ID                 |

**Permissions:** public (no authentication required)

**Example request:**

```bash
curl "https://yourstore.com/wp-json/polski/v1/search?q=shoes&limit=5"
```

**Example response:**

```json
{
  "results": [
    {
      "id": 456,
      "title": "Nike Sports Shoes",
      "url": "https://yourstore.com/product/nike-sports-shoes/",
      "image": "https://yourstore.com/wp-content/uploads/nike-shoes.jpg",
      "price_html": "<span class=\"amount\">299.00&nbsp;PLN</span>",
      "category": "Footwear",
      "in_stock": true,
      "rating": 4.8
    }
  ],
  "total": 1,
  "query": "shoes"
}
```

### POST /polski/v1/wizard/complete

Marks the configuration wizard as completed.

**Permissions:** `manage_woocommerce`

**Body parameters:**

| Parameter       | Type  | Required | Description                   |
| -------------- | ----- | -------- | ----------------------------- |
| `steps_completed` | array | Yes   | List of completed steps       |

**Example request:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"steps_completed": ["company_info", "legal_pages", "checkboxes", "compliance"]}' \
  "https://yourstore.com/wp-json/polski/v1/wizard/complete"
```

**Example response:**

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

## HTTP response codes

| Code | Description                                       |
| --- | -------------------------------------------------- |
| 200 | Success                                            |
| 201 | Resource created (POST)                            |
| 400 | Bad request (missing parameters)                   |
| 401 | Not authenticated                                  |
| 403 | Insufficient permissions                           |
| 404 | Resource not found                                 |
| 500 | Server error                                       |

## Response filtering

Each endpoint supports a WordPress filter allowing response modification:

```php
add_filter('polski/rest/settings_response', function (array $response, WP_REST_Request $request): array {
    // Modify the response
    return $response;
}, 10, 2);
```

## Rate limiting

The API does not implement its own rate limiting. Using a plugin or server configuration (e.g. Cloudflare, Nginx rate limiting) is recommended for public endpoints.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
