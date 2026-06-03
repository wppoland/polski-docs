---
title: Eigene Bestellstatus
description: Erstellen eigener Bestellstatus mit Farben, Symbolen und E-Mail-Benachrichtigungen.
---

Das Modul ermoeglicht das Erstellen beliebiger WooCommerce-Bestellstatus mit konfigurierbarem Aussehen und automatischen E-Mails.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfiguration

Gehe zu **WooCommerce > Order Statuses**.

## Status erstellen

| Feld | Beschreibung |
|------|------|
| Slug | Statuskennung (max. 17 Zeichen, z. B. quality_check) |
| Label | Angezeigter Name (z. B. "Qualitaetskontrolle") |
| Color | Hintergrundfarbe des Status-Badges (hex) |
| Icon | Dashicon-Klasse (z. B. dashicons-yes) |
| Email | Ob bei Wechsel zu diesem Status eine E-Mail gesendet wird |
| Email subject | Betreff der E-Mail (unterstuetzt Tokens) |
| Email body | HTML-Inhalt der E-Mail (unterstuetzt Tokens) |

## Tokens in E-Mails

| Token | Beschreibung |
|-------|------|
| `{order_id}` | Bestell-ID |
| `{order_number}` | Bestellnummer |
| `{first_name}` | Vorname des Kunden |
| `{last_name}` | Nachname des Kunden |
| `{status_from}` | Vorheriger Status |
| `{status_to}` | Neuer Status |
| `{site_title}` | Name des Shops |

## Funktionen

- Status sichtbar im Dropdown fuer Statusaenderungen der Bestellung
- Farbige Badges in der Bestellliste
- Massenaktionen (Bulk Actions) fuer jeden Status
- Automatische WooCommerce-E-Mails (in das Template eingebettet)
- Unbegrenzte Anzahl an Status
