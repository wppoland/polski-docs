---
title: REST API
description: Dokumentace REST API pluginu Polski for WooCommerce - namespace polski/v1/, endpointy nastaveni, checkboxu, pravnich stranek, vyhledavani a pruvodce.
---

REST API v namespace `polski/v1/`. Spravujte nastaveni, pravni checkboxy, pravni stranky a vyhledavani produktu.

## Autentizace

API vyzaduje autentizaci pro endpointy upravujici data (POST, PUT, DELETE). Endpoint vyhledavani (`/search`) je dostupny verejne.

Podporovane metody autentizace:
- **Application Passwords** (WordPress 5.6+) - doporuceno
- **Cookie + nonce** - pro pozadavky z administracniho panelu
- **Basic Auth** (s pluginem Basic Auth) - pouze pro vyvoj

Vyzadovane opravneni: `manage_woocommerce` (ve vychozim stavu role Administrator a Spravce obchodu).

## Endpointy

### GET /polski/v1/settings

Ziska vsechny skupiny nastaveni pluginu.

**Opravneni:** `manage_woocommerce`

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://twojsklep.pl/wp-json/polski/v1/settings"
```

### GET /polski/v1/settings/{group}

Ziska nastaveni z vybrane skupiny.

### POST /polski/v1/settings/{group}

Aktualizuje nastaveni ve vybrane skupine.

### GET /polski/v1/checkboxes

Ziska seznam vsech pravnich checkboxu.

### GET /polski/v1/checkboxes/stats

Ziska statistiky prijeti checkboxu.

### GET /polski/v1/checkboxes/{id}

Ziska podrobnosti jednoho checkboxu.

### PUT /polski/v1/checkboxes/{id}

Aktualizuje checkbox.

### GET /polski/v1/legal-pages

Ziska seznam pravnich stranek.

### POST /polski/v1/legal-pages/generate

Vygeneruje pravni stranku na zaklade sablony.

**Parametry body:**

| Parametr | Typ | Povinny | Popis |
| ------------- | ------ | -------- | ---------------------------------------- |
| `type` | string | Ano | Typ stranky: terms, privacy, withdrawal, dsa_report |
| `company_name`| string | Ano | Nazev firmy |
| `company_address` | string | Ano | Adresa firmy |
| `email` | string | Ano | Kontaktni e-mail |
| `phone` | string | Ne | Telefonni cislo |
| `nip` | string | Ne | NIP firmy |

### GET /polski/v1/search

Vyhledavani produktu (verejny endpoint).

**Parametry query:**

| Parametr | Typ | Povinny | Popis |
| -------- | ------ | -------- | --------------------------- |
| `q` | string | Ano | Faze vyhledavani |
| `limit` | int | Ne | Limit vysledku (vychozi 8) |
| `cat` | int | Ne | ID kategorie |

### POST /polski/v1/wizard/complete

Oznaci pruvodce konfiguraci jako dokonceny.

## Kody odpovedi HTTP

| Kod | Popis |
| --- | ------------------------------------------------- |
| 200 | Uspech |
| 201 | Zdroj vytvoren (POST) |
| 400 | Nespravny pozadavek (chybejici parametry) |
| 401 | Chybi autentizace |
| 403 | Chybi opravneni |
| 404 | Zdroj nenalezen |
| 500 | Chyba serveru |

## Filtrovani odpovedi

Kazdy endpoint podporuje WordPress filtr umoznujici upravit odpoved:

```php
add_filter('polski/rest/settings_response', function (array $response, WP_REST_Request $request): array {
    // Uprava odpovedi
    return $response;
}, 10, 2);
```

## Rate limiting

API neimplementuje vlastni rate limiting. Doporuceno je pouziti pluginu nebo konfigurace serveru (napr. Cloudflare, Nginx rate limiting) pro verejne endpointy.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
