---
title: SMS-Benachrichtigungen
description: SMS zum Bestellstatus ueber SMSAPI.pl und SerwerSMS.pl.
---

Das Modul sendet automatische SMS an Kunden bei Aenderungen des Bestellstatus.

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Ein Konto bei SMSAPI.pl oder SerwerSMS.pl.
:::

## Unterstuetzte Anbieter

| Anbieter | API |
|----------|-----|
| SMSAPI.pl | REST API mit Bearer-Token |
| SerwerSMS.pl | REST API mit Bearer-Token |

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski PRO > SMS**.

| Einstellung | Beschreibung |
|------------|------|
| Anbieter | SMSAPI.pl oder SerwerSMS.pl |
| API-Token | Autorisierungsschluessel |
| Absendername | Feld FROM (max. 11 Zeichen) |
| Status | Welche Status eine SMS ausloesen |
| Nachrichtenvorlage | SMS-Inhalt mit Tokens |

## Tokens in der Nachricht

| Token | Beschreibung |
|-------|------|
| `{order_id}` | Bestell-ID |
| `{order_number}` | Bestellnummer |
| `{first_name}` | Vorname des Kunden |
| `{last_name}` | Nachname des Kunden |
| `{status}` | Name des neuen Status |
| `{tracking_number}` | Sendungsnummer (falls verfuegbar) |
| `{tracking_url}` | Tracking-URL |
| `{total}` | Bestellbetrag |
| `{site_name}` | Name des Shops |

## Admin-Benachrichtigungen

Optional koennen SMS an den Administrator ueber neue Bestellungen mit einer separaten Vorlage aktiviert werden.

## Normalisierung der Nummer

Das System normalisiert polnische Telefonnummern automatisch in das internationale Format (48XXXXXXXXX).

## DSGVO

Telefonnummern werden in den Bestellnotizen maskiert (z. B. 501***789).
