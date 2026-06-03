---
title: RODO-Schulungsunterlagen
description: Drei druckfertige HTML-Vorlagen - Schulungsverzeichnis, Zusammenfassung der RODO-Prinzipien und ein Playbook zur Reaktion auf Verletzungen mit der 72-Stunden-Frist für die Meldung an UODO.
---

Das Modul **RODO-Schulungsunterlagen** erzeugt drei druckfertige HTML-Dokumente, die beim Onboarding neuer Shop-Mitarbeiter helfen. Alle sind mit den Firmendaten aus dem Konfigurationsassistenten vorgebrandet (`polski_general.company_name` + NIP).

:::caution
Dies sind generische Startvorlagen. Passen Sie sie an die tatsächlichen Datenverarbeitungsprozesse in Ihrem Shop an, sie ersetzen weder den Datenschutzbeauftragten (IOD) noch eine rechtliche Beratung.
:::

## Drei Dokumente

| Schlüssel         | Titel                          | Inhalt                                                             |
| ----------------- | ------------------------------ | ------------------------------------------------------------------ |
| `logbook`         | Training logbook               | 6-spaltige Tabelle (Datum, Mitarbeiter, Rolle, Themen, Trainer, Unterschrift), 10 leere Zeilen |
| `principles`      | RODO principles summary        | 7 Verarbeitungsprinzipien (Art. 5) + 8 Betroffenenrechte (Kap. III) + operative Erinnerungen |
| `breach_playbook` | Data breach response playbook  | 8-stufige Checkliste + Vorfallslog-Tabelle mit Link zu uodo.gov.pl |

## Herunterladen

Gehen Sie zu **Polski > RODO training docs**. Bei jedem der drei Dokumente befindet sich eine Schaltfläche **Download HTML**.

Die heruntergeladene Datei:

- Name: `polski-rodo-<klucz>-<YYYYMMDD>.html`
- Content-Type: `text/html; charset=utf-8`
- Eigenständiges `<!doctype html>` mit eingebettetem Druck-CSS
- Schutz: Nonce `polski_rodo_training_download`, Capability `manage_woocommerce`

## Dokumentenkopf

Jede heruntergeladene Datei beginnt mit einem Abschnitt mit den Firmendaten:

```html
<div class="header">Sklep Polski Sp. z o.o. - NIP: 123-45-67-890</div>
<h1>Training logbook</h1>
```

Die Felder stammen aus `polski_general.company_name` und `polski_general.company_nip`.

## Training logbook

Tabelle zur Führung eines Schulungsverzeichnisses. Eine Person = eine Zeile. Spalten:

1. Date
2. Employee
3. Role
4. Topics covered
5. Trainer
6. Signature

Das Dokument enthält 10 leere Zeilen zum manuellen Ausfüllen. Die Unterschrift des Mitarbeiters bestätigt Teilnahme und Verständnis des Inhalts.

## RODO principles summary

Ein einseitiger Leitfaden mit:

**Sieben Verarbeitungsprinzipien (Art. 5):**
Lawfulness / fairness / transparency, purpose limitation, data minimisation, accuracy, storage limitation, integrity and confidentiality, accountability.

**Acht Betroffenenrechte (Kapitel III):**
Art. 15 Auskunft, Art. 16 Berichtigung, Art. 17 Löschung, Art. 18 Einschränkung, Art. 19 Mitteilung, Art. 20 Übertragbarkeit, Art. 21 Widerspruch, Art. 22 keine automatisierte Entscheidung.

**Operative Erinnerungen:**
- Versenden Sie niemals Tabellen mit personenbezogenen Daten per E-Mail, nur über verschlüsselte Kanäle
- Verifizieren Sie die Identität des Anfragestellers vor Auskunft / Löschung
- Protokollieren Sie jede Offenlegung an Auftragsverarbeiter oder Behörden
- Melden Sie den Verdacht einer Verletzung intern innerhalb von 24h

## Breach response playbook

8-stufige Checkliste aus Art. 33-34 RODO:

1. **Discovery** - Zeitstempel, entdeckende Person, betroffene Systeme erfassen
2. **Containment** - Konten/Systeme innerhalb von 1h isolieren
3. **Internal notification** - IOD und Management innerhalb von 24h
4. **Assessment** - Datenkategorien, Anzahl der Betroffenen, voraussichtliche Auswirkung
5. **UODO notification** - innerhalb von 72h erforderlich, wenn das Risiko nicht "weniger als wahrscheinlich" ist
6. **Subject notification** - "ohne unnötige Verzögerung", wenn das Risiko hoch ist
7. **Remediation** - Patches, Rotation der Authentifizierungsdaten, Prüfung der Logs
8. **Post-mortem** - Schlussfolgerungen und Aktualisierung der Schulungen

:::caution
72 Stunden sind das Maximum, eine Meldung nach Ablauf dieser Frist erfordert eine Begründung der Verzögerung. UODO-Kanal: [uodo.gov.pl](https://uodo.gov.pl).
:::

### Vorfallslog-Tabelle

Das Playbook enthält eine auszufüllende Tabelle mit 11 Feldern:

| Feld                           | Auszufüllen                               |
| ------------------------------ | ----------------------------------------- |
| Incident ID                    | Interne Kennung                           |
| Detected at (UTC)              | Zeitstempel der Erkennung                 |
| Detected by                    | Person / System                           |
| Affected systems               | Liste der Systeme                         |
| Affected data categories       | E-Mail, Adresse, Bankdaten, Gesundheit... |
| Approximate number of subjects | Schätzung                                 |
| Likely impact                  | Identitätsdiebstahl, Fraud, Offenlegung   |
| Containment actions            | Passwort-Reset, IP-Sperre, Backup         |
| UODO notified at               | Zeitstempel des Versands der Meldung      |
| Subjects notified at           | Zeitstempel der Benachrichtigung der Betroffenen |
| Status                         | Open / Under investigation / Resolved     |

## Aktivierung

Das Modul wird über das Flag `rodo_training_docs` in **Polski > Module** aktiviert. Die Deaktivierung blendet die Admin-Seite aus und annulliert den Download-Handler.

## Druckstil

Eingebettetes CSS:

```css
body { max-width: 820px; margin: 40px auto; line-height: 1.55 }
h1 { font-size: 24px } h2 { font-size: 18px } h3 { font-size: 14px }
table { width: 100%; border-collapse: collapse }
th, td { border: 1px solid #999; padding: 8px; vertical-align: top }
@media print { body { margin: 0 } }
```

## Einschränkungen

- Keine Versionierung der Dokumente, das erzeugte HTML hat keinen audit trail
- Kein PDF (nur HTML - für PRO geplant)
- Keine Integration mit einem HR-System, das Verzeichnis führen Sie manuell
- Texte in englischer Sprache (die polnische Übersetzung kommt über .po, falls aktiviert)
