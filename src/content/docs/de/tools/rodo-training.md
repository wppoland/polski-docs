---
title: RODO / DSGVO-Schulungsunterlagen
description: Druckfertige Schulungsvorlagen fuer Shop-Mitarbeiter. Enthaelt ein Schulungsverzeichnis, eine einseitige RODO-Prinzipienuebersicht und ein Incident-Response-Playbook mit der 72-Stunden-Frist fuer UODO-Meldungen.
---

Das Modul **RODO-Schulungsunterlagen** erzeugt drei druckfertige HTML-Dokumente, die Sie neuen Shop-Mitarbeitern im Rahmen des DSGVO-Onboardings aushaendigen koennen. Alle Dokumente sind mit den Unternehmensdaten des Shops (Name, NIP) vorgebrandet und mit einem druckfreundlichen Stylesheet gerendert.

:::caution
Dies sind allgemeine Startvorlagen. Passen Sie sie an Ihre tatsaechlichen Datenverarbeitungsablaeufe, DSFA-Ergebnisse und internen Vorfallsverfahren an, bevor Sie sie an das Personal weitergeben.
:::

## Drei Dokumente

| Schluessel        | Titel                             | Zweck                                                             |
| ----------------- | --------------------------------- | ----------------------------------------------------------------- |
| `logbook`         | Schulungsverzeichnis              | Tabelle: Datum, Mitarbeiter, Rolle, Themen, Trainer, Unterschrift |
| `principles`      | RODO-Prinzipienuebersicht         | Einseiter: 7 Verarbeitungsprinzipien + 8 Betroffenenrechte        |
| `breach_playbook` | Incident-Response-Playbook        | 8-Schritte-Checkliste + Vorfallslog-Vorlage + UODO-Kontakt        |

## Admin-Seite

Gehen Sie zu **Polski > RODO-Schulungsunterlagen**. Fuer jedes Dokument gibt es die Schaltflaeche "Download HTML". Die Datei wird ausgeliefert mit:

```
Content-Type: text/html; charset=utf-8
Content-Disposition: attachment; filename="polski-rodo-<key>-<YYYYMMDD>.html"
```

HTML im Browser oeffnen und per **Drucken > Als PDF speichern** ein PDF erzeugen oder direkt drucken.

## Schulungsverzeichnis

Das Verzeichnis rendert eine leere Tabelle mit 10 Zeilen und den Spalten:

- Datum
- Mitarbeiter
- Rolle
- Behandelte Themen
- Trainer
- Unterschrift

Die Teilnehmer unterschreiben zur Bestaetigung von Teilnahme und Verstaendnis. Fuehren Sie ein Verzeichnis pro Kalenderjahr - es ist ein praktisches Artefakt fuer den Rechenschaftsgrundsatz (Art. 5 Abs. 2 DSGVO).

## RODO-Prinzipienuebersicht

Inhalt des Einseiters:

1. **Sieben Prinzipien (Art. 5)**: Rechtmaessigkeit, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integritaet und Vertraulichkeit, Rechenschaft.
2. **Acht Betroffenenrechte (Kapitel III)**: Auskunft (Art. 15), Berichtigung (Art. 16), Loeschung (Art. 17), Einschraenkung (Art. 18), Mitteilungspflicht (Art. 19), Datenuebertragbarkeit (Art. 20), Widerspruch (Art. 21), automatisierte Entscheidung (Art. 22).
3. **Operative Erinnerungen**: Keine Tabellen mit personenbezogenen Daten per E-Mail versenden, Anfragesteller vor dem Handeln verifizieren, jede Weitergabe an Dritte protokollieren, vermutete Vorfaelle intern innerhalb von 24h melden.

## Incident-Response-Playbook

Schritt-fuer-Schritt-Prozess:

1. **Entdeckung** - Zeitstempel, Entdecker, betroffene Systeme erfassen.
2. **Eindaemmung** - betroffene Konten / Systeme innerhalb 1 Stunde isolieren.
3. **Interne Meldung** - Datenschutzbeauftragter und Management innerhalb 24 Stunden.
4. **Bewertung** - Datenkategorien, betroffene Personen, voraussichtliche Auswirkungen dokumentieren.
5. **UODO-Meldung** - innerhalb 72 Stunden erforderlich, wenn ein Risiko fuer die Betroffenen nicht unwahrscheinlich ist.
6. **Benachrichtigung der Betroffenen** - "unverzueglich" bei hohem Risiko.
7. **Behebung** - patchen, Zugangsdaten rotieren, Logs pruefen.
8. **Post-Mortem** - Lessons Learned dokumentieren und Schulungen aktualisieren.

Eine Vorfallslog-Vorlage ist enthalten:
- Vorfalls-ID
- Erkannt am (UTC)
- Erkannt von
- Betroffene Systeme
- Betroffene Datenkategorien
- Ungefaehre Anzahl Betroffener
- Voraussichtliche Auswirkungen
- Eindaemmungsmassnahmen
- UODO benachrichtigt am
- Betroffene benachrichtigt am
- Status

Das Playbook verlinkt auf [uodo.gov.pl](https://uodo.gov.pl) als offiziellen Meldekanal.

## Branding

Der Dokumentkopf wird aus `polski_general` befuellt:

```
Przykladowa Firma sp. z o.o. - NIP: 1234567890
[Dokumenttitel]
```

Aktualisieren Sie die Angaben unter **Polski > Setup-Assistent > Unternehmensdaten**.

## Berechtigungen

- UI und Downloads: `manage_woocommerce`
- Download-Nonce: `polski_rodo_training_download`

## Grenzen

- Eine Sprache (Polnisch + Englisch ueber WordPress-Uebersetzungen, keine Override pro Mitarbeiter)
- Keine digitalen Signaturen - Teilnehmer unterschreiben auf Papier oder ueber Ihren E-Signatur-Anbieter
- Kein Audit-Trail darueber, wer das Dokument heruntergeladen hat (fuer PRO geplant)
- Kein Ersatz fuer eine ordentliche DSFA oder ein Verzeichnis der Verarbeitungstaetigkeiten
