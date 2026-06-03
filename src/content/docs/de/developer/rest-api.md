---
title: REST API
description: Dokumentation der REST API des Plugins Polski for WooCommerce - Namespace polski/v1/, Endpunkte für Einstellungen, Checkboxen, Rechtsseiten, Suche und Assistenten.
---

REST API im Namespace `polski/v1/`. Verwalte Einstellungen, rechtliche Checkboxen, Rechtsseiten und die Produktsuche.

## Authentifizierung

Endpunkte, die Daten verändern (POST, PUT, DELETE), erfordern eine Authentifizierung. Der Endpunkt `/search` ist öffentlich.

Unterstützte Authentifizierungsmethoden:
- **Application Passwords** (WordPress 5.6+) - empfohlen
- **Cookie + Nonce** - für Anfragen aus dem Admin-Panel
- **Basic Auth** (mit dem Plugin Basic Auth) - nur für die Entwicklung

Erforderliche Berechtigung: `manage_woocommerce` (standardmäßig die Rollen Administrator und Shop-Manager).

## Endpunkte

### GET /polski/v1/settings

Ruft alle Einstellungsgruppen des Plugins ab.

**Berechtigungen:** `manage_woocommerce`

**Beispielanfrage:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://deinshop.de/wp-json/polski/v1/settings"
```

**Beispielantwort:**

```json
{
  "groups": [
    {
      "id": "general",
      "label": "Allgemeine Einstellungen",
      "description": "Grundlegende Konfiguration des Plugins"
    },
    {
      "id": "compliance",
      "label": "Rechtliche Anforderungen",
      "description": "Einstellungen zu den Anforderungen des EU- und polnischen Rechts"
    },
    {
      "id": "storefront",
      "label": "Shop-Module",
      "description": "Module zur Erweiterung des Shops"
    },
    {
      "id": "checkout",
      "label": "Kasse und Bestellungen",
      "description": "Einstellungen für die Kasse und den Bestellvorgang"
    }
  ]
}
```

### GET /polski/v1/settings/{group}

Ruft die Einstellungen der ausgewählten Gruppe ab.

**URL-Parameter:**

| Parameter | Typ    | Beschreibung      |
| --------- | ------ | ----------------- |
| `group`   | string | ID der Einstellungsgruppe |

**Berechtigungen:** `manage_woocommerce`

**Beispielanfrage:**

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://deinshop.de/wp-json/polski/v1/settings/compliance"
```

**Beispielantwort:**

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

Aktualisiert die Einstellungen in der ausgewählten Gruppe.

**Berechtigungen:** `manage_woocommerce`

**Beispielanfrage:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"omnibus_days": 30, "withdrawal_days": 14}' \
  "https://deinshop.de/wp-json/polski/v1/settings/compliance"
```

**Beispielantwort:**

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

Ruft eine Liste aller rechtlichen Checkboxen ab (Kasse, Registrierung, Kontakt).

**Berechtigungen:** `manage_woocommerce`

**Beispielantwort:**

```json
{
  "checkboxes": [
    {
      "id": 1,
      "label": "Ich akzeptiere die AGB des Shops",
      "required": true,
      "location": "checkout",
      "enabled": true,
      "position": 10,
      "legal_page_id": 45
    },
    {
      "id": 2,
      "label": "Ich habe die Datenschutzerklärung zur Kenntnis genommen",
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

Ruft Statistiken zur Akzeptanz der Checkboxen ab.

**Berechtigungen:** `manage_woocommerce`

**Beispielantwort:**

```json
{
  "stats": [
    {
      "checkbox_id": 1,
      "label": "Ich akzeptiere die AGB des Shops",
      "total_shown": 1250,
      "total_accepted": 1180,
      "acceptance_rate": 94.4
    }
  ]
}
```

### GET /polski/v1/checkboxes/{id}

Ruft die Details einer einzelnen Checkbox ab.

**URL-Parameter:**

| Parameter | Typ | Beschreibung |
| --------- | --- | ------------ |
| `id`      | int | ID der Checkbox |

**Berechtigungen:** `manage_woocommerce`

**Beispielantwort:**

```json
{
  "id": 1,
  "label": "Ich akzeptiere die AGB des Shops",
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

Aktualisiert eine Checkbox.

**Berechtigungen:** `manage_woocommerce`

**Beispielanfrage:**

```bash
curl -X PUT \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"label": "Ich akzeptiere die AGB", "required": true}' \
  "https://deinshop.de/wp-json/polski/v1/checkboxes/1"
```

### GET /polski/v1/legal-pages

Ruft eine Liste der Rechtsseiten ab (AGB, Datenschutzerklärung usw.).

**Berechtigungen:** `manage_woocommerce`

**Beispielantwort:**

```json
{
  "pages": [
    {
      "id": 45,
      "type": "terms",
      "title": "AGB des Shops",
      "status": "publish",
      "url": "https://deinshop.de/agb/",
      "last_modified": "2025-06-01T14:00:00",
      "word_count": 3200
    },
    {
      "id": 47,
      "type": "privacy",
      "title": "Datenschutzerklärung",
      "status": "publish",
      "url": "https://deinshop.de/datenschutz/",
      "last_modified": "2025-05-15T09:30:00",
      "word_count": 2800
    }
  ],
  "total": 2
}
```

### POST /polski/v1/legal-pages/generate

Generiert eine Rechtsseite auf Basis einer Vorlage.

**Berechtigungen:** `manage_woocommerce`

**Body-Parameter:**

| Parameter      | Typ    | Erforderlich | Beschreibung                             |
| -------------- | ------ | ------------ | ---------------------------------------- |
| `type`         | string | Ja           | Seitentyp: terms, privacy, withdrawal, dsa_report |
| `company_name` | string | Ja           | Firmenname                               |
| `company_address` | string | Ja        | Firmenanschrift                          |
| `email`        | string | Ja           | Kontakt-E-Mail-Adresse                   |
| `phone`        | string | Nein         | Telefonnummer                            |
| `nip`          | string | Nein         | NIP des Unternehmens                     |

**Beispielanfrage:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"type": "terms", "company_name": "Mein Shop GmbH", "company_address": "Beispielstraße 1, 10115 Berlin", "email": "kontakt@meinshop.de"}' \
  "https://deinshop.de/wp-json/polski/v1/legal-pages/generate"
```

**Beispielantwort:**

```json
{
  "page_id": 120,
  "type": "terms",
  "title": "AGB des Shops",
  "url": "https://deinshop.de/agb/",
  "status": "draft"
}
```

### GET /polski/v1/search

Produktsuche (öffentlicher Endpunkt).

**Query-Parameter:**

| Parameter | Typ    | Erforderlich | Beschreibung                  |
| --------- | ------ | ------------ | ----------------------------- |
| `q`       | string | Ja           | Suchbegriff                   |
| `limit`   | int    | Nein         | Ergebnislimit (Standard 8)    |
| `cat`     | int    | Nein         | Kategorie-ID                  |

**Berechtigungen:** öffentlich (keine Authentifizierung erforderlich)

**Beispielanfrage:**

```bash
curl "https://deinshop.de/wp-json/polski/v1/search?q=schuhe&limit=5"
```

**Beispielantwort:**

```json
{
  "results": [
    {
      "id": 456,
      "title": "Sportschuhe Nike",
      "url": "https://deinshop.de/produkt/sportschuhe-nike/",
      "image": "https://deinshop.de/wp-content/uploads/schuhe-nike.jpg",
      "price_html": "<span class=\"amount\">299,00&nbsp;zł</span>",
      "category": "Schuhe",
      "in_stock": true,
      "rating": 4.8
    }
  ],
  "total": 1,
  "query": "schuhe"
}
```

### POST /polski/v1/wizard/complete

Markiert den Konfigurationsassistenten als abgeschlossen.

**Berechtigungen:** `manage_woocommerce`

**Body-Parameter:**

| Parameter         | Typ   | Erforderlich | Beschreibung                  |
| ----------------- | ----- | ------------ | ----------------------------- |
| `steps_completed` | array | Ja           | Liste der abgeschlossenen Schritte |

**Beispielanfrage:**

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"steps_completed": ["company_info", "legal_pages", "checkboxes", "compliance"]}' \
  "https://deinshop.de/wp-json/polski/v1/wizard/complete"
```

**Beispielantwort:**

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

## HTTP-Antwortcodes

| Code | Beschreibung                                      |
| ---- | ------------------------------------------------- |
| 200  | Erfolg                                            |
| 201  | Ressource erstellt (POST)                         |
| 400  | Ungültige Anfrage (fehlende Parameter)            |
| 401  | Keine Authentifizierung                           |
| 403  | Keine Berechtigung                                |
| 404  | Ressource nicht gefunden                          |
| 500  | Serverfehler                                      |

## Filterung der Antwort

Jeder Endpunkt verfügt über einen Filter zur Anpassung der Antwort:

```php
add_filter('polski/rest/settings_response', function (array $response, WP_REST_Request $request): array {
    // Anpassung der Antwort
    return $response;
}, 10, 2);
```

## Rate Limiting

Kein integriertes Rate Limiting. Verwende Cloudflare, Nginx oder ein Plugin zum Begrenzen öffentlicher Endpunkte.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
