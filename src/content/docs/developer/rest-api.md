---
title: REST API
description: Dokumentacja REST API wtyczki Polski for WooCommerce - namespace polski/v1/, endpointy ustawień, checkboxów, stron prawnych, wyszukiwania i kreatora.
---

Polski for WooCommerce udostępnia REST API w namespace `polski/v1/`. API pozwala programowo zarządzać ustawieniami, checkboxami prawymi, stronami prawnymi oraz wyszukiwaniem produktów.

## Uwierzytelnianie

API wymaga uwierzytelnienia dla endpointów modyfikujących dane (POST, PUT, DELETE). Endpoint wyszukiwania (`/search`) jest dostępny publicznie.

Obsługiwane metody uwierzytelniania:
- **Application Passwords** (WordPress 5.6+) - zalecane
- **Cookie + nonce** - dla żądań z panelu admina
- **Basic Auth** (z wtyczką Basic Auth) - tylko dla developmentu

Wymagane uprawnienie: `manage_woocommerce` (domyślnie rola Administrator i Menedżer sklepu).

## Endpointy

### GET /polski/v1/settings

Pobiera wszystkie grupy ustawień wtyczki.

**Uprawnienia:** `manage_woocommerce`

**Przykład żądania:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://twojsklep.pl/wp-json/polski/v1/settings"
```

**Przykład odpowiedzi:**

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
      "label": "Wymogi prawne",
      "description": "Ustawienia wymogów prawa UE i polskiego"
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

Pobiera ustawienia z wybranej grupy.

**Parametry URL:**

| Parametr | Typ    | Opis            |
| -------- | ------ | --------------- |
| `group`  | string | ID grupy ustawień |

**Uprawnienia:** `manage_woocommerce`

**Przykład żądania:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://twojsklep.pl/wp-json/polski/v1/settings/compliance"
```

**Przykład odpowiedzi:**

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

Aktualizuje ustawienia w wybranej grupie.

**Uprawnienia:** `manage_woocommerce`

**Przykład żądania:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"omnibus_days": 30, "withdrawal_days": 14}' \
  "https://twojsklep.pl/wp-json/polski/v1/settings/compliance"
```

**Przykład odpowiedzi:**

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

Pobiera listę wszystkich checkboxów prawnych (kasa, rejestracja, kontakt).

**Uprawnienia:** `manage_woocommerce`

**Przykład odpowiedzi:**

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

Pobiera statystyki akceptacji checkboxów.

**Uprawnienia:** `manage_woocommerce`

**Przykład odpowiedzi:**

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

Pobiera szczegóły pojedynczego checkboxa.

**Parametry URL:**

| Parametr | Typ | Opis         |
| -------- | --- | ------------ |
| `id`     | int | ID checkboxa |

**Uprawnienia:** `manage_woocommerce`

**Przykład odpowiedzi:**

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

Aktualizuje checkbox.

**Uprawnienia:** `manage_woocommerce`

**Przykład żądania:**

```bash
curl -X PUT \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"label": "Akceptuję regulamin", "required": true}' \
  "https://twojsklep.pl/wp-json/polski/v1/checkboxes/1"
```

### GET /polski/v1/legal-pages

Pobiera listę stron prawnych (regulamin, polityka prywatności itp.).

**Uprawnienia:** `manage_woocommerce`

**Przykład odpowiedzi:**

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

Generuje stronę prawną na podstawie szablonu.

**Uprawnienia:** `manage_woocommerce`

**Parametry body:**

| Parametr      | Typ    | Wymagany | Opis                                     |
| ------------- | ------ | -------- | ---------------------------------------- |
| `type`        | string | Tak      | Typ strony: terms, privacy, withdrawal, dsa_report |
| `company_name`| string | Tak      | Nazwa firmy                              |
| `company_address` | string | Tak  | Adres firmy                              |
| `email`       | string | Tak      | Adres e-mail kontaktowy                  |
| `phone`       | string | Nie      | Numer telefonu                           |
| `nip`         | string | Nie      | NIP firmy                                |

**Przykład żądania:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"type": "terms", "company_name": "Mój Sklep Sp. z o.o.", "company_address": "ul. Przykładowa 1, 00-001 Warszawa", "email": "kontakt@mojsklep.pl"}' \
  "https://twojsklep.pl/wp-json/polski/v1/legal-pages/generate"
```

**Przykład odpowiedzi:**

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

Wyszukiwanie produktów (endpoint publiczny).

**Parametry query:**

| Parametr | Typ    | Wymagany | Opis                        |
| -------- | ------ | -------- | --------------------------- |
| `q`      | string | Tak      | Fraza wyszukiwania          |
| `limit`  | int    | Nie      | Limit wyników (domyślnie 8) |
| `cat`    | int    | Nie      | ID kategorii                |

**Uprawnienia:** publiczny (nie wymaga uwierzytelnienia)

**Przykład żądania:**

```bash
curl "https://twojsklep.pl/wp-json/polski/v1/search?q=buty&limit=5"
```

**Przykład odpowiedzi:**

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

Oznacza kreator konfiguracji jako ukończony.

**Uprawnienia:** `manage_woocommerce`

**Parametry body:**

| Parametr       | Typ   | Wymagany | Opis                          |
| -------------- | ----- | -------- | ----------------------------- |
| `steps_completed` | array | Tak   | Lista ukończonych kroków      |

**Przykład żądania:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"steps_completed": ["company_info", "legal_pages", "checkboxes", "compliance"]}' \
  "https://twojsklep.pl/wp-json/polski/v1/wizard/complete"
```

**Przykład odpowiedzi:**

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

## Kody odpowiedzi HTTP

| Kod | Opis                                              |
| --- | ------------------------------------------------- |
| 200 | Sukces                                            |
| 201 | Zasób utworzony (POST)                             |
| 400 | Nieprawidłowe żądanie (brakujące parametry)        |
| 401 | Brak uwierzytelnienia                             |
| 403 | Brak uprawnień                                    |
| 404 | Zasób nie znaleziony                              |
| 500 | Błąd serwera                                      |

## Filtrowanie odpowiedzi

Każdy endpoint obsługuje filtr WordPress pozwalający modyfikować odpowiedź:

```php
add_filter('polski/rest/settings_response', function (array $response, WP_REST_Request $request): array {
    // Modyfikacja odpowiedzi
    return $response;
}, 10, 2);
```

## Rate limiting

API nie implementuje własnego rate limitingu. Zalecane jest użycie wtyczki lub konfiguracji serwera (np. Cloudflare, Nginx rate limiting) dla endpointów publicznych.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
