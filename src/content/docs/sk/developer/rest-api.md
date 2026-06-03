---
title: REST API
description: Dokumentácia REST API pluginu Polski for WooCommerce - namespace polski/v1/, endpointy nastavení, checkboxov, právnych stránok, vyhľadávania a sprievodcu.
---

REST API v namespace `polski/v1/`. Spravuj nastavenia, právne checkboxy, právne stránky a vyhľadávanie produktov.

## Overovanie

Endpointy, ktoré upravujú údaje (POST, PUT, DELETE), vyžadujú overenie. Endpoint `/search` je verejný.

Podporované metódy overovania:
- **Application Passwords** (WordPress 5.6+) - odporúčané
- **Cookie + nonce** - pre požiadavky z admin panela
- **Basic Auth** (s pluginom Basic Auth) - len pre vývoj

Vyžadované oprávnenie: `manage_woocommerce` (predvolene rola Administrátor a Manažér obchodu).

## Endpointy

### GET /polski/v1/settings

Načíta všetky skupiny nastavení pluginu.

**Oprávnenia:** `manage_woocommerce`

**Príklad požiadavky:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://tvojobchod.sk/wp-json/polski/v1/settings"
```

**Príklad odpovede:**

```json
{
  "groups": [
    {
      "id": "general",
      "label": "Všeobecné nastavenia",
      "description": "Základná konfigurácia pluginu"
    },
    {
      "id": "compliance",
      "label": "Právne požiadavky",
      "description": "Nastavenia právnych požiadaviek EÚ a poľského práva"
    },
    {
      "id": "storefront",
      "label": "Moduly obchodu",
      "description": "Moduly rozširujúce obchod"
    },
    {
      "id": "checkout",
      "label": "Pokladňa a objednávky",
      "description": "Nastavenia pokladne a procesu objednávky"
    }
  ]
}
```

### GET /polski/v1/settings/{group}

Načíta nastavenia z vybranej skupiny.

**Parametre URL:**

| Parameter | Typ    | Popis           |
| -------- | ------ | --------------- |
| `group`  | string | ID skupiny nastavení |

**Oprávnenia:** `manage_woocommerce`

**Príklad požiadavky:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://tvojobchod.sk/wp-json/polski/v1/settings/compliance"
```

**Príklad odpovede:**

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

Aktualizuje nastavenia vo vybranej skupine.

**Oprávnenia:** `manage_woocommerce`

**Príklad požiadavky:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"omnibus_days": 30, "withdrawal_days": 14}' \
  "https://tvojobchod.sk/wp-json/polski/v1/settings/compliance"
```

**Príklad odpovede:**

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

Načíta zoznam všetkých právnych checkboxov (pokladňa, registrácia, kontakt).

**Oprávnenia:** `manage_woocommerce`

**Príklad odpovede:**

```json
{
  "checkboxes": [
    {
      "id": 1,
      "label": "Súhlasím s obchodnými podmienkami",
      "required": true,
      "location": "checkout",
      "enabled": true,
      "position": 10,
      "legal_page_id": 45
    },
    {
      "id": 2,
      "label": "Oboznámil som sa so zásadami ochrany osobných údajov",
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

Načíta štatistiky akceptácie checkboxov.

**Oprávnenia:** `manage_woocommerce`

**Príklad odpovede:**

```json
{
  "stats": [
    {
      "checkbox_id": 1,
      "label": "Súhlasím s obchodnými podmienkami",
      "total_shown": 1250,
      "total_accepted": 1180,
      "acceptance_rate": 94.4
    }
  ]
}
```

### GET /polski/v1/checkboxes/{id}

Načíta podrobnosti jednotlivého checkboxu.

**Parametre URL:**

| Parameter | Typ | Popis        |
| -------- | --- | ------------ |
| `id`     | int | ID checkboxu |

**Oprávnenia:** `manage_woocommerce`

**Príklad odpovede:**

```json
{
  "id": 1,
  "label": "Súhlasím s obchodnými podmienkami",
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

**Oprávnenia:** `manage_woocommerce`

**Príklad požiadavky:**

```bash
curl -X PUT \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"label": "Súhlasím s podmienkami", "required": true}' \
  "https://tvojobchod.sk/wp-json/polski/v1/checkboxes/1"
```

### GET /polski/v1/legal-pages

Načíta zoznam právnych stránok (obchodné podmienky, zásady ochrany osobných údajov atď.).

**Oprávnenia:** `manage_woocommerce`

**Príklad odpovede:**

```json
{
  "pages": [
    {
      "id": 45,
      "type": "terms",
      "title": "Obchodné podmienky",
      "status": "publish",
      "url": "https://tvojobchod.sk/obchodne-podmienky/",
      "last_modified": "2025-06-01T14:00:00",
      "word_count": 3200
    },
    {
      "id": 47,
      "type": "privacy",
      "title": "Zásady ochrany osobných údajov",
      "status": "publish",
      "url": "https://tvojobchod.sk/ochrana-osobnych-udajov/",
      "last_modified": "2025-05-15T09:30:00",
      "word_count": 2800
    }
  ],
  "total": 2
}
```

### POST /polski/v1/legal-pages/generate

Vygeneruje právnu stránku na základe šablóny.

**Oprávnenia:** `manage_woocommerce`

**Parametre body:**

| Parameter      | Typ    | Vyžadovaný | Popis                                    |
| ------------- | ------ | -------- | ---------------------------------------- |
| `type`        | string | Áno      | Typ stránky: terms, privacy, withdrawal, dsa_report |
| `company_name`| string | Áno      | Názov firmy                              |
| `company_address` | string | Áno  | Adresa firmy                             |
| `email`       | string | Áno      | Kontaktná e-mailová adresa               |
| `phone`       | string | Nie      | Telefónne číslo                          |
| `nip`         | string | Nie      | NIP firmy                                |

**Príklad požiadavky:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"type": "terms", "company_name": "Môj Obchod s.r.o.", "company_address": "Príkladová 1, 811 01 Bratislava", "email": "kontakt@mojobchod.sk"}' \
  "https://tvojobchod.sk/wp-json/polski/v1/legal-pages/generate"
```

**Príklad odpovede:**

```json
{
  "page_id": 120,
  "type": "terms",
  "title": "Obchodné podmienky",
  "url": "https://tvojobchod.sk/obchodne-podmienky/",
  "status": "draft"
}
```

### GET /polski/v1/search

Vyhľadávanie produktov (verejný endpoint).

**Parametre query:**

| Parameter | Typ    | Vyžadovaný | Popis                        |
| -------- | ------ | -------- | --------------------------- |
| `q`      | string | Áno      | Vyhľadávacia fráza          |
| `limit`  | int    | Nie      | Limit výsledkov (predvolene 8) |
| `cat`    | int    | Nie      | ID kategórie                |

**Oprávnenia:** verejný (nevyžaduje overenie)

**Príklad požiadavky:**

```bash
curl "https://tvojobchod.sk/wp-json/polski/v1/search?q=topanky&limit=5"
```

**Príklad odpovede:**

```json
{
  "results": [
    {
      "id": 456,
      "title": "Športové topánky Nike",
      "url": "https://tvojobchod.sk/produkt/sportove-topanky-nike/",
      "image": "https://tvojobchod.sk/wp-content/uploads/topanky-nike.jpg",
      "price_html": "<span class=\"amount\">29,90&nbsp;EUR</span>",
      "category": "Obuv",
      "in_stock": true,
      "rating": 4.8
    }
  ],
  "total": 1,
  "query": "topanky"
}
```

### POST /polski/v1/wizard/complete

Označí konfiguračného sprievodcu ako dokončeného.

**Oprávnenia:** `manage_woocommerce`

**Parametre body:**

| Parameter       | Typ   | Vyžadovaný | Popis                         |
| -------------- | ----- | -------- | ----------------------------- |
| `steps_completed` | array | Áno   | Zoznam dokončených krokov     |

**Príklad požiadavky:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"steps_completed": ["company_info", "legal_pages", "checkboxes", "compliance"]}' \
  "https://tvojobchod.sk/wp-json/polski/v1/wizard/complete"
```

**Príklad odpovede:**

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

## HTTP kódy odpovedí

| Kód | Popis                                             |
| --- | ------------------------------------------------- |
| 200 | Úspech                                            |
| 201 | Zdroj vytvorený (POST)                            |
| 400 | Nesprávna požiadavka (chýbajúce parametre)         |
| 401 | Chýba overenie                                    |
| 403 | Chýbajú oprávnenia                                |
| 404 | Zdroj nenájdený                                   |
| 500 | Chyba servera                                     |

## Filtrovanie odpovedí

Každý endpoint má filter na úpravu odpovede:

```php
add_filter('polski/rest/settings_response', function (array $response, WP_REST_Request $request): array {
    // Úprava odpovede
    return $response;
}, 10, 2);
```

## Rate limiting

Žiadny zabudovaný rate limiting. Použi Cloudflare, Nginx alebo plugin na limitovanie verejných endpointov.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
