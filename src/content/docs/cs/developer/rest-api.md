---
title: REST API
description: Dokumentace REST API pluginu Polski for WooCommerce - namespace polski/v1/, endpointy nastavení, checkboxů, právních stránek, vyhledávání a průvodce.
---

REST API v namespace `polski/v1/`. Spravujte nastavení, právní checkboxy, právní stránky a vyhledávání produktů.

## Autentizace

Endpointy upravující data (POST, PUT, DELETE) vyžadují autentizaci. Endpoint `/search` je veřejný.

Podporované metody autentizace:
- **Application Passwords** (WordPress 5.6+) - doporučeno
- **Cookie + nonce** - pro požadavky z administračního panelu
- **Basic Auth** (s pluginem Basic Auth) - pouze pro vývoj

Vyžadované oprávnění: `manage_woocommerce` (ve výchozím stavu role Administrátor a Správce obchodu).

## Endpointy

### GET /polski/v1/settings

Získá všechny skupiny nastavení pluginu.

**Oprávnění:** `manage_woocommerce`

**Příklad požadavku:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://twojsklep.pl/wp-json/polski/v1/settings"
```

**Příklad odpovědi:**

```json
{
  "groups": [
    {
      "id": "general",
      "label": "Obecná nastavení",
      "description": "Základní konfigurace pluginu"
    },
    {
      "id": "compliance",
      "label": "Právní požadavky",
      "description": "Nastavení požadavků práva EU a polského"
    },
    {
      "id": "storefront",
      "label": "Moduly obchodu",
      "description": "Moduly rozšiřující obchod"
    },
    {
      "id": "checkout",
      "label": "Pokladna a objednávky",
      "description": "Nastavení pokladny a procesu objednávky"
    }
  ]
}
```

### GET /polski/v1/settings/{group}

Získá nastavení z vybrané skupiny.

**Parametry URL:**

| Parametr | Typ    | Popis             |
| -------- | ------ | ----------------- |
| `group`  | string | ID skupiny nastavení |

**Oprávnění:** `manage_woocommerce`

**Příklad požadavku:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://twojsklep.pl/wp-json/polski/v1/settings/compliance"
```

**Příklad odpovědi:**

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

Aktualizuje nastavení ve vybrané skupině.

**Oprávnění:** `manage_woocommerce`

**Příklad požadavku:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"omnibus_days": 30, "withdrawal_days": 14}' \
  "https://twojsklep.pl/wp-json/polski/v1/settings/compliance"
```

**Příklad odpovědi:**

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

Získá seznam všech právních checkboxů (pokladna, registrace, kontakt).

**Oprávnění:** `manage_woocommerce`

**Příklad odpovědi:**

```json
{
  "checkboxes": [
    {
      "id": 1,
      "label": "Souhlasím s obchodními podmínkami",
      "required": true,
      "location": "checkout",
      "enabled": true,
      "position": 10,
      "legal_page_id": 45
    },
    {
      "id": 2,
      "label": "Seznámil/a jsem se se zásadami ochrany osobních údajů",
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

Získá statistiky přijetí checkboxů.

**Oprávnění:** `manage_woocommerce`

**Příklad odpovědi:**

```json
{
  "stats": [
    {
      "checkbox_id": 1,
      "label": "Souhlasím s obchodními podmínkami",
      "total_shown": 1250,
      "total_accepted": 1180,
      "acceptance_rate": 94.4
    }
  ]
}
```

### GET /polski/v1/checkboxes/{id}

Získá podrobnosti jednoho checkboxu.

**Parametry URL:**

| Parametr | Typ | Popis        |
| -------- | --- | ------------ |
| `id`     | int | ID checkboxu |

**Oprávnění:** `manage_woocommerce`

**Příklad odpovědi:**

```json
{
  "id": 1,
  "label": "Souhlasím s obchodními podmínkami",
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

**Oprávnění:** `manage_woocommerce`

**Příklad požadavku:**

```bash
curl -X PUT \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"label": "Souhlasím s podmínkami", "required": true}' \
  "https://twojsklep.pl/wp-json/polski/v1/checkboxes/1"
```

### GET /polski/v1/legal-pages

Získá seznam právních stránek (obchodní podmínky, zásady ochrany osobních údajů atd.).

**Oprávnění:** `manage_woocommerce`

**Příklad odpovědi:**

```json
{
  "pages": [
    {
      "id": 45,
      "type": "terms",
      "title": "Obchodní podmínky",
      "status": "publish",
      "url": "https://twojsklep.pl/regulamin/",
      "last_modified": "2025-06-01T14:00:00",
      "word_count": 3200
    },
    {
      "id": 47,
      "type": "privacy",
      "title": "Zásady ochrany osobních údajů",
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

Vygeneruje právní stránku na základě šablony.

**Oprávnění:** `manage_woocommerce`

**Parametry body:**

| Parametr      | Typ    | Povinný | Popis                                    |
| ------------- | ------ | ------- | ---------------------------------------- |
| `type`        | string | Ano     | Typ stránky: terms, privacy, withdrawal, dsa_report |
| `company_name`| string | Ano     | Název firmy                              |
| `company_address` | string | Ano | Adresa firmy                             |
| `email`       | string | Ano     | Kontaktní e-mail                         |
| `phone`       | string | Ne      | Telefonní číslo                          |
| `nip`         | string | Ne      | NIP firmy                                |

**Příklad požadavku:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"type": "terms", "company_name": "Můj Obchod s.r.o.", "company_address": "ul. Przykładowa 1, 00-001 Warszawa", "email": "kontakt@mojsklep.pl"}' \
  "https://twojsklep.pl/wp-json/polski/v1/legal-pages/generate"
```

**Příklad odpovědi:**

```json
{
  "page_id": 120,
  "type": "terms",
  "title": "Obchodní podmínky",
  "url": "https://twojsklep.pl/regulamin/",
  "status": "draft"
}
```

### GET /polski/v1/search

Vyhledávání produktů (veřejný endpoint).

**Parametry query:**

| Parametr | Typ    | Povinný | Popis                       |
| -------- | ------ | ------- | --------------------------- |
| `q`      | string | Ano     | Vyhledávací fráze           |
| `limit`  | int    | Ne      | Limit výsledků (výchozí 8)  |
| `cat`    | int    | Ne      | ID kategorie                |

**Oprávnění:** veřejný (nevyžaduje autentizaci)

**Příklad požadavku:**

```bash
curl "https://twojsklep.pl/wp-json/polski/v1/search?q=boty&limit=5"
```

**Příklad odpovědi:**

```json
{
  "results": [
    {
      "id": 456,
      "title": "Sportovní boty Nike",
      "url": "https://twojsklep.pl/produkt/buty-sportowe-nike/",
      "image": "https://twojsklep.pl/wp-content/uploads/buty-nike.jpg",
      "price_html": "<span class=\"amount\">299,00&nbsp;zł</span>",
      "category": "Obuv",
      "in_stock": true,
      "rating": 4.8
    }
  ],
  "total": 1,
  "query": "boty"
}
```

### POST /polski/v1/wizard/complete

Označí konfiguračního průvodce jako dokončeného.

**Oprávnění:** `manage_woocommerce`

**Parametry body:**

| Parametr       | Typ   | Povinný | Popis                         |
| -------------- | ----- | ------- | ----------------------------- |
| `steps_completed` | array | Ano  | Seznam dokončených kroků      |

**Příklad požadavku:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"steps_completed": ["company_info", "legal_pages", "checkboxes", "compliance"]}' \
  "https://twojsklep.pl/wp-json/polski/v1/wizard/complete"
```

**Příklad odpovědi:**

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

## Kódy odpovědí HTTP

| Kód | Popis                                             |
| --- | ------------------------------------------------- |
| 200 | Úspěch                                            |
| 201 | Zdroj vytvořen (POST)                             |
| 400 | Neplatný požadavek (chybějící parametry)          |
| 401 | Chybí autentizace                                |
| 403 | Chybí oprávnění                                  |
| 404 | Zdroj nenalezen                                  |
| 500 | Chyba serveru                                    |

## Filtrování odpovědi

Každý endpoint má filtr pro úpravu odpovědi:

```php
add_filter('polski/rest/settings_response', function (array $response, WP_REST_Request $request): array {
    // Úprava odpovědi
    return $response;
}, 10, 2);
```

## Rate limiting

Žádný vestavěný rate limiting. Použijte Cloudflare, Nginx nebo plugin pro omezení veřejných endpointů.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
