---
title: REST API
description: REST-API-Dokumentation des Plugins Polski for WooCommerce - Namespace polski/v1/, Endpunkte fuer Einstellungen, Checkboxen, Rechtsseiten, Suche und Assistent.
---

Polski for WooCommerce stellt eine REST API im Namespace `polski/v1/` bereit. Die API ermoeglicht die programmatische Verwaltung von Einstellungen, rechtlichen Checkboxen, Rechtsseiten und der Produktsuche.

## Authentifizierung

Die API erfordert Authentifizierung fuer datenveraendernde Endpunkte (POST, PUT, DELETE). Der Such-Endpunkt (`/search`) ist oeffentlich zugaenglich.

Unterstuetzte Authentifizierungsmethoden:
- **Application Passwords** (WordPress 5.6+) - empfohlen
- **Cookie + Nonce** - fuer Anfragen aus dem Admin-Panel
- **Basic Auth** (mit Basic Auth Plugin) - nur fuer die Entwicklung

Erforderliche Berechtigung: `manage_woocommerce` (standardmaessig Rollen Administrator und Shop-Manager).

## Endpunkte

### GET /polski/v1/settings

Ruft alle Einstellungsgruppen des Plugins ab.

**Berechtigung:** `manage_woocommerce`

```bash
curl -u admin:XXXX-XXXX-XXXX-XXXX \
  "https://ihrshop.pl/wp-json/polski/v1/settings"
```

### GET /polski/v1/settings/{group}

Ruft Einstellungen einer gewaehlten Gruppe ab.

### POST /polski/v1/settings/{group}

Aktualisiert Einstellungen in einer gewaehlten Gruppe.

```bash
curl -X POST \
  -u admin:XXXX-XXXX-XXXX-XXXX \
  -H "Content-Type: application/json" \
  -d '{"omnibus_days": 30, "withdrawal_days": 14}' \
  "https://ihrshop.pl/wp-json/polski/v1/settings/compliance"
```

### GET /polski/v1/checkboxes

Ruft die Liste aller rechtlichen Checkboxen ab (Kasse, Registrierung, Kontakt).

### GET /polski/v1/checkboxes/stats

Ruft Checkbox-Akzeptanzstatistiken ab.

### GET /polski/v1/checkboxes/{id}

Ruft Details einer einzelnen Checkbox ab.

### PUT /polski/v1/checkboxes/{id}

Aktualisiert eine Checkbox.

### GET /polski/v1/legal-pages

Ruft die Liste der Rechtsseiten ab (AGB, Datenschutzerklaerung usw.).

### POST /polski/v1/legal-pages/generate

Generiert eine Rechtsseite basierend auf einer Vorlage.

**Parameter:**

| Parameter      | Typ    | Erforderlich | Beschreibung                                     |
| ------------- | ------ | -------- | ---------------------------------------- |
| `type`        | string | Ja      | Seitentyp: terms, privacy, withdrawal, dsa_report |
| `company_name`| string | Ja      | Firmenname                              |
| `company_address` | string | Ja  | Firmenadresse                              |
| `email`       | string | Ja      | Kontakt-E-Mail-Adresse                  |
| `phone`       | string | Nein      | Telefonnummer                           |
| `nip`         | string | Nein      | Steuernummer                                |

### GET /polski/v1/search

Produktsuche (oeffentlicher Endpunkt).

**Parameter:**

| Parameter | Typ    | Erforderlich | Beschreibung                        |
| -------- | ------ | -------- | --------------------------- |
| `q`      | string | Ja      | Suchbegriff          |
| `limit`  | int    | Nein      | Ergebnislimit (Standard 8) |
| `cat`    | int    | Nein      | Kategorie-ID                |

```bash
curl "https://ihrshop.pl/wp-json/polski/v1/search?q=schuhe&limit=5"
```

### POST /polski/v1/wizard/complete

Markiert den Konfigurationsassistenten als abgeschlossen.

## HTTP-Antwortcodes

| Code | Beschreibung                                              |
| --- | ------------------------------------------------- |
| 200 | Erfolg                                            |
| 201 | Ressource erstellt (POST)                             |
| 400 | Ungueltige Anfrage (fehlende Parameter)        |
| 401 | Keine Authentifizierung                             |
| 403 | Keine Berechtigung                                    |
| 404 | Ressource nicht gefunden                              |
| 500 | Serverfehler                                      |

## Antwortfilterung

Jeder Endpunkt unterstuetzt einen WordPress-Filter zur Aenderung der Antwort:

```php
add_filter('polski/rest/settings_response', function (array $response, WP_REST_Request $request): array {
    // Antwort aendern
    return $response;
}, 10, 2);
```

## Rate Limiting

Die API implementiert kein eigenes Rate Limiting. Es wird empfohlen, ein Plugin oder eine Serverkonfiguration (z.B. Cloudflare, Nginx Rate Limiting) fuer oeffentliche Endpunkte zu verwenden.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
