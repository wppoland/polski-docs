---
title: REST API
description: Dokumentácia REST API pluginu Polski for WooCommerce - namespace polski/v1/, endpointy nastavení, checkboxov, právnych stránok, vyhľadávania a sprievodcu.
---

Polski for WooCommerce sprístupňuje REST API v namespace `polski/v1/`. API umožňuje programovo spravovať nastavenia, právne checkboxy, právne stránky a vyhľadávanie produktov.

## Autentifikácia

API vyžaduje autentifikáciu pre endpointy upravujúce údaje (POST, PUT, DELETE). Endpoint vyhľadávania (`/search`) je dostupný verejne.

Podporované metódy autentifikácie:
- **Application Passwords** (WordPress 5.6+) - odporúčané
- **Cookie + nonce** - pre požiadavky z admin panelu
- **Basic Auth** (s pluginom Basic Auth) - len pre vývoj

Vyžadované oprávnenie: `manage_woocommerce` (štandardne role Administrator a Manažér obchodu).

## Endpointy

### GET /polski/v1/settings

Získa všetky skupiny nastavení pluginu.

**Oprávnenia:** `manage_woocommerce`

**Príklad požiadavky:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://tvoj-obchod.pl/wp-json/polski/v1/settings"
```

**Príklad odpovede:**

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

Získa nastavenia z vybranej skupiny.

**Parametre URL:**

| Parameter | Typ    | Popis            |
| -------- | ------ | --------------- |
| `group`  | string | ID skupiny nastavení |

**Oprávnenia:** `manage_woocommerce`

### POST /polski/v1/settings/{group}

Aktualizuje nastavenia vo vybranej skupine.

**Oprávnenia:** `manage_woocommerce`

**Príklad požiadavky:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"omnibus_days": 30, "withdrawal_days": 14}' \
  "https://tvoj-obchod.pl/wp-json/polski/v1/settings/compliance"
```

### GET /polski/v1/checkboxes

Získa zoznam všetkých právnych checkboxov (pokladňa, registrácia, kontakt).

**Oprávnenia:** `manage_woocommerce`

### GET /polski/v1/checkboxes/stats

Získa štatistiky akceptácie checkboxov.

**Oprávnenia:** `manage_woocommerce`

### GET /polski/v1/checkboxes/{id}

Získa podrobnosti jednotlivého checkboxu.

### PUT /polski/v1/checkboxes/{id}

Aktualizuje checkbox.

### GET /polski/v1/legal-pages

Získa zoznam právnych stránok (obchodné podmienky, zásady ochrany osobných údajov atď.).

### POST /polski/v1/legal-pages/generate

Generuje právnu stránku na základe šablóny.

**Oprávnenia:** `manage_woocommerce`

**Parametre body:**

| Parameter      | Typ    | Povinný | Popis                                     |
| ------------- | ------ | -------- | ---------------------------------------- |
| `type`        | string | Áno      | Typ stránky: terms, privacy, withdrawal, dsa_report |
| `company_name`| string | Áno      | Názov firmy                              |
| `company_address` | string | Áno  | Adresa firmy                              |
| `email`       | string | Áno      | Kontaktná e-mailová adresa               |
| `phone`       | string | Nie      | Telefónne číslo                          |
| `nip`         | string | Nie      | NIP firmy                                |

### GET /polski/v1/search

Vyhľadávanie produktov (verejný endpoint).

**Parametre query:**

| Parameter | Typ    | Povinný | Popis                        |
| -------- | ------ | -------- | --------------------------- |
| `q`      | string | Áno      | Vyhľadávacia fráza           |
| `limit`  | int    | Nie      | Limit výsledkov (štandardne 8) |
| `cat`    | int    | Nie      | ID kategórie                 |

**Oprávnenia:** verejný (nevyžaduje autentifikáciu)

### POST /polski/v1/wizard/complete

Označí sprievodcu konfiguráciou ako dokončený.

**Oprávnenia:** `manage_woocommerce`

## HTTP kódy odpovedí

| Kód | Popis                                              |
| --- | ------------------------------------------------- |
| 200 | Úspech                                            |
| 201 | Zdroj vytvorený (POST)                            |
| 400 | Nesprávna požiadavka (chýbajúce parametre)        |
| 401 | Chýba autentifikácia                              |
| 403 | Chýbajú oprávnenia                                |
| 404 | Zdroj nebol nájdený                               |
| 500 | Chyba servera                                      |

## Filtrovanie odpovedí

Každý endpoint podporuje WordPress filter umožňujúci upravovať odpoveď:

```php
add_filter('polski/rest/settings_response', function (array $response, WP_REST_Request $request): array {
    // Úprava odpovede
    return $response;
}, 10, 2);
```

## Rate limiting

API neimplementuje vlastný rate limiting. Odporúča sa použitie pluginu alebo konfigurácie servera (napr. Cloudflare, Nginx rate limiting) pre verejné endpointy.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
