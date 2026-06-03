---
title: Wiederherstellung abgebrochener Warenkörbe
description: Modul zur automatischen Verfolgung, Wiederherstellung und Analyse abgebrochener WooCommerce-Warenkörbe in Polski PRO.
---

Das Modul für abgebrochene Warenkörbe verfolgt aktive WooCommerce-Warenkörbe, erkennt Abbrüche und versendet automatisch Wiederherstellungs-E-Mails mit einem Link, der den Warenkorb mit einem Klick wiederherstellt.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## So funktioniert es

1. Der Kunde legt Produkte in den Warenkorb, das System beginnt mit der Verfolgung des Warenkorbs
2. Verlässt der Kunde den Shop und kehrt nicht innerhalb von 1 Stunde zurück, wird der Warenkorb als **abgebrochen** markiert
3. Das System versendet bis zu 3 Wiederherstellungs-E-Mails (nach 1 h, 24 h und 72 h)
4. Der Kunde klickt auf den Link in der E-Mail, der Warenkorb wird mit Produkten und Gutscheinen wiederhergestellt
5. Schließt der Kunde die Bestellung ab, wird der Warenkorb als **konvertiert** oder **wiederhergestellt** markiert

## Konfiguration

Gehen Sie zu **Polski PRO > Module** und aktivieren Sie das Modul **Abgebrochene Warenkörbe**.

### Allgemeine Einstellungen

| Einstellung | Beschreibung | Standard |
|------------|------|-----------|
| Abbruch-Timeout | Nach welcher Zeit (Sekunden) ein Warenkorb als abgebrochen gilt | 3600 (1 h) |
| Wiederherstellungs-E-Mails | Automatische E-Mails ein-/ausschalten | Ja |
| Datenbereinigung | Nach wie vielen Tagen alte Warenkörbe gelöscht werden | 90 |
| IP ausblenden | Keine Kunden-IP-Adressen speichern (DSGVO) | Nein |

### E-Mail-Einstellungen

Jede der 3 E-Mails ist konfigurierbar:

| Feld | E-Mail 1 | E-Mail 2 | E-Mail 3 |
|------|---------|---------|---------|
| Verzögerung | 1 Stunde | 24 Stunden | 72 Stunden |
| Betreff | Haben Sie Ihren Warenkorb vergessen? | Ihr Warenkorb wartet noch | Letzte Chance |
| Inhalt | Konfigurierbar | Konfigurierbar | Konfigurierbar |

Die E-Mails enthalten:
- Zusammenfassung der Produkte im Warenkorb (Bilder, Namen, Mengen, Preise)
- Gesamtwert des Warenkorbs
- CTA-Schaltfläche mit Wiederherstellungslink

## Warenkorb-Status

| Status | Beschreibung |
|--------|------|
| Active | Der Kunde durchsucht den Shop aktiv |
| Abandoned | Der Kunde hat den Shop verlassen und ist nach dem Timeout nicht zurückgekehrt |
| Converted | Der Kunde hat eine Bestellung aufgegeben (ohne Wiederherstellungs-E-Mail) |
| Recovered | Der Kunde ist über den Wiederherstellungslink zurückgekehrt und hat eine Bestellung aufgegeben |

## Admin-Panel

Das Panel ist unter **WooCommerce > Abandoned Carts** verfügbar.

### Tab: Warenkorbliste

- Filterung nach Status
- Spalten: ID, E-Mail, Status, Produkte, Wert, letzte Aktivität, gesendete E-Mails
- Warenkorbdetails: vollständige Produktliste, Wiederherstellungslink, Kundendaten
- Aktion: **Bestellung aus Warenkorb erstellen** (für abgebrochene)

### Tab: Analyse

Metriken:
- **Gesamtzahl der Warenkörbe** - alle verfolgten Warenkörbe
- **Abbruchquote** - % der Warenkörbe, die abgebrochen wurden
- **Konversionsrate** - % der Warenkörbe, die zu Bestellungen wurden
- **Wiederherstellungsquote** - % der abgebrochenen Warenkörbe, die durch E-Mails wiederhergestellt wurden
- **Wiederhergestellter Umsatz** - Gesamtwert der Bestellungen aus wiederhergestellten Warenkörben

## Wiederherstellungslink

Jeder abgebrochene Warenkorb hat einen eindeutigen 32-stelligen Wiederherstellungsschlüssel. Link:

```
https://twojsklep.pl/koszyk/?recover_cart={schluessel}
```

Nach dem Klick:
1. Der aktuelle Warenkorb wird geleert
2. Die Produkte aus dem abgebrochenen Warenkorb werden hinzugefügt
3. Gutscheine werden wiederhergestellt
4. Der Kunde wird zum Checkout weitergeleitet
5. Der Warenkorb wechselt den Status auf **recovered**

## Zeitplan (Cron)

Das Modul verwendet einen eigenen Cron, der alle 15 Minuten ausgeführt wird (`polski_abandoned_cart_cron`):

1. Markiert Warenkörbe als abgebrochen (nach Timeout)
2. Versendet Wiederherstellungs-E-Mails (gemäß Zeitplan)
3. Löscht alte Warenkörbe (nach X Tagen)

## DSGVO / Datenschutz

- Option zum Ausblenden der Kunden-IP-Adressen
- Automatische Bereinigung alter Daten (konfigurierbar)
- Wiederherstellungs-E-Mails lassen sich global deaktivieren
- Warenkorbdaten werden bei der Deinstallation des Plugins gelöscht (wenn die Option zum Löschen von Daten aktiviert ist)

## Datenbank

Das Modul erstellt zwei Tabellen:

- `wp_polski_carts` - Warenkorbdaten (Status, Wert, E-Mail, Wiederherstellungsschlüssel)
- `wp_polski_cart_contents` - Snapshots des Inhalts (JSON mit Änderungshistorie)

Die Tabellen werden automatisch bei der Migration 1.8.0 erstellt.
