---
title: Auftragsabwicklung und Sendungsverfolgung
description: Modul fuer Abwicklungsstatus von Bestellungen in Polski PRO - Status Verpackt/Versendet/Zugestellt, Feld fuer Tracking-Nummer und automatische E-Mail-Benachrichtigungen.
---

Das Modul zur Auftragsabwicklung erweitert die Standardstatus von WooCommerce um drei zusaetzliche Phasen: **Verpackt**, **Versendet** und **Zugestellt**. Jede Statusaenderung sendet automatisch eine E-Mail mit Tracking-Informationen an den Kunden.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Neue Bestellstatus

Nach dem Aktivieren des Moduls koennen Bestellungen die folgenden Status durchlaufen:

```
Wartend > In Bearbeitung > Verpackt > Versendet > Zugestellt > Abgeschlossen
```

| Status | Farbe | Beschreibung |
|--------|-------|------|
| Verpackt (Packed) | Blau | Die Bestellung wurde verpackt und wartet auf die Abholung durch den Kurier |
| Versendet (Shipped) | Gelb | Das Paket wurde dem Kurier uebergeben und befindet sich im Transport |
| Zugestellt (Delivered) | Gruen | Das Paket wurde dem Kunden zugestellt |

Die Status erscheinen im Bestellbereich zwischen "In Bearbeitung" und "Abgeschlossen".

## Konfiguration

1. Gehe zu **Polski PRO > Module**
2. Aktiviere das Modul **Auftragsabwicklung**

Das Modul erfordert keine zusaetzliche Konfiguration, die Status, das Tracking-Feld und die E-Mails sind sofort einsatzbereit.

## Feld zur Sendungsverfolgung

Im Bestelleditor erscheint unter der Versandadresse der Abschnitt **Shipment Tracking**:

| Feld | Beschreibung |
|------|------|
| Versanddienstleister | Auswahl: InPost, DPD, DHL, Poczta Polska, Sonstiger |
| Tracking-Nummer | Nummer des Frachtbriefs |
| Tracking-URL | Wird automatisch auf Basis von Versanddienstleister und Nummer generiert |

Nach Auswahl des Versanddienstleisters und Eingabe der Tracking-Nummer wird der Tracking-Link automatisch generiert. Du kannst auch eine eigene URL manuell eingeben.

### Automatische Tracking-Links

| Versanddienstleister | URL-Format |
|------------|-----------|
| InPost | `inpost.pl/sledzenie-przesylek?number={numer}` |
| DPD | `tracktrace.dpd.com.pl/findPackage?q={numer}` |
| DHL | `dhl.com/pl-pl/home/sledzenie-przesylek.html?tracking-id={numer}` |
| Poczta Polska | `emonitoring.poczta-polska.pl/?numer={numer}` |

## E-Mail-Benachrichtigungen

Bei jeder Statusaenderung sendet das System eine E-Mail an den Kunden mit:

- Bestellnummer
- Neuem Status
- Name des Versanddienstleisters (falls gesetzt)
- Tracking-Nummer (falls gesetzt)
- Link zur Sendungsverfolgung
- Link zur Bestelluebersicht in Mein Konto

Die E-Mails werden automatisch gesendet und erfordern keine manuelle Aktion.

## Massenaktionen

In der Bestellliste stehen Massenaktionen zur Verfuegung:

- **Status auf Verpackt aendern**
- **Status auf Versendet aendern**
- **Status auf Zugestellt aendern**

Markiere mehrere Bestellungen und waehle die Aktion aus dem Dropdown-Menue.

## Kompatibilitaet

Das Modul funktioniert mit:

- WooCommerce HPOS (Custom Order Tables)
- Klassischen WooCommerce-Bestellungen (Posts)
- Allen WooCommerce-Themes
- Den Kurier-Integrationen von Polski PRO (InPost, DPD, DHL)

Die Status sind auch in der WooCommerce REST API und in den Berichten sichtbar.
