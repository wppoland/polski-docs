---
title: Rechtsseiten
description: Automatische Generierung von Rechtsseiten in Polski for WooCommerce - AGB, Datenschutzerklärung, Rückgaberichtlinie, Reklamationen, E-Mail-Anhänge und ODR-Information.
---

Jeder Online-Shop in Polen muss Rechtsdokumente haben. Das Plugin generiert vier Rechtsseiten, fügt sie E-Mails als Anhang bei und zeigt eine Information über die ODR-Plattform an.

## Generierte Rechtsseiten

### 1. Shop-AGB

Die AGB enthalten die vom Verbraucherrechtegesetz geforderten Elemente:

- Identifikationsdaten des Verkäufers (Name, Adresse, NIP, REGON, KRS)
- Verfahren zur Bestellaufgabe
- Zahlungsarten
- Kosten und Versandarten
- Widerrufsrecht (14 Tage)
- Reklamationsverfahren
- Außergerichtliche Wege zur Bearbeitung von Reklamationen und zur Durchsetzung von Ansprüchen
- Schlussbestimmungen

### 2. Datenschutzerklärung

Die DSGVO-konforme Datenschutzerklärung enthält:

- Daten des Verantwortlichen für die personenbezogenen Daten
- Zwecke und Rechtsgrundlagen der Datenverarbeitung
- Kategorien der verarbeiteten Daten
- Empfänger der Daten (Kuriere, Zahlungsanbieter, Hosting)
- Aufbewahrungsdauer der Daten
- Rechte der betroffenen Personen
- Information über Cookies
- Information über Profiling (falls zutreffend)

### 3. Rückgaberichtlinie

Die Rückgaberichtlinie umfasst:

- Frist für den Widerruf des Vertrags (14 Tage)
- Muster-Widerrufsformular
- Verfahren zur Warenrückgabe
- Rückgabekosten (wer sie trägt)
- Frist für die Rückerstattung der Zahlung
- Ausnahmen vom Widerrufsrecht
- Zustand der zurückgegebenen Ware

### 4. Reklamationsrichtlinie

Die Reklamationsrichtlinie enthält:

- Rechtsgrundlage (Gewährleistung, Garantie)
- Wege zur Einreichung einer Reklamation
- Frist für die Bearbeitung einer Reklamation (14 Tage)
- Rechte des Verbrauchers (Reparatur, Austausch, Preisminderung, Rücktritt)
- Reklamationsformular
- Kontaktdaten zur Einreichung von Reklamationen

## Konfiguration des Generators

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Rechtsseiten**, um die Seiten zu generieren oder zu aktualisieren.

### Verkäuferdaten

Füllen Sie zuerst die Firmendaten aus:

| Feld | Beschreibung | Beispiel |
|------|------|---------|
| Firmenname | Vollständiger Name oder Firma | Shop XYZ Jan Kowalski |
| Adresse | Straße, Nummer | ul. Przykładowa 1/2 |
| Postleitzahl und Stadt | - | 00-001 Warszawa |
| NIP | Steueridentifikationsnummer | 1234567890 |
| REGON | - | 123456789 |
| KRS | Falls zutreffend | 0000123456 |
| Kontakt-E-Mail | - | kontakt@sklep.pl |
| Telefon | - | +48 123 456 789 |
| Bankkontonummer | Für Rückerstattungen | PL 12 3456 7890 1234 5678 9012 3456 |

### Generierung der Seiten

1. Verkäuferdaten ausfüllen
2. Auf "Rechtsseiten generieren" klicken
3. Das System erstellt 4 WordPress-Seiten im Status "Entwurf"
4. Den Inhalt jeder Seite durchsehen
5. Die Seiten nach der Prüfung veröffentlichen

Die Seiten werden als Entwürfe erstellt, prüfen Sie sie und konsultieren Sie vor der Veröffentlichung einen Anwalt.

### Aktualisierung der Seiten

Nach einer Änderung der Firmendaten klicken Sie auf "Rechtsseiten aktualisieren". Das Plugin aktualisiert die generierten Abschnitte und behält Ihre manuellen Änderungen bei.

Struktur der generierten Seite:

```
<!-- POLSKI-AUTO-START -->
Automatisch generierter Inhalt - diesen Block nicht bearbeiten
<!-- POLSKI-AUTO-END -->

Ihr zusätzlicher Inhalt - sicher unterhalb bearbeiten
```

Bei einer Aktualisierung überschreibt das Plugin nur den Inhalt zwischen `POLSKI-AUTO-START` und `POLSKI-AUTO-END`. Inhalt außerhalb dieser Markierungen bleibt erhalten.

## E-Mail-Anhänge

Das Plugin fügt die Rechtsseiten als PDF an die transaktionalen E-Mails von WooCommerce an.

### Konfiguration

Unter **WooCommerce > Einstellungen > Polski > Rechtsseiten > E-Mail-Anhänge** konfigurieren Sie, welche Dokumente den einzelnen E-Mail-Typen beigefügt werden:

| E-Mail | Empfohlene Anhänge |
|--------|---------------------|
| Neue Bestellung (Kunde) | AGB, Datenschutzerklärung, Rückgaberichtlinie |
| Bestellung abgeschlossen | Rückgaberichtlinie |
| Rechnung | AGB |
| Rückgabebeleg | Rückgaberichtlinie, Reklamationsrichtlinie |

### Format der Anhänge

Die Dokumente werden in PDF mit dem Shop-Logo und Datum konvertiert. Die Dateigröße ist optimiert.

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| Format | Anhangstyp | PDF |
| Logo im Kopf | Ob das Shop-Logo beigefügt wird | Ja |
| Papierformat | - | A4 |
| Rand | Dokumentrand | 20mm |

## ODR-Information

Die EU-Verordnung 524/2013 verlangt von Online-Shops einen Link zur ODR-Plattform (Online Dispute Resolution) zur außergerichtlichen Beilegung von Streitigkeiten.

### Automatische Anzeige

Das Plugin fügt die ODR-Information automatisch hinzu in:

- **Shop-Fußzeile** - Link zur ODR-Plattform
- **AGB** - Abschnitt über die außergerichtliche Streitbeilegung
- **Transaktionalen E-Mails** - Fußzeile mit ODR-Link

### Inhalt der ODR-Information

Standardinhalt, der vom Plugin angezeigt wird:

> Die ODR-Plattform (Online Dispute Resolution) ist unter folgender Adresse verfügbar: https://ec.europa.eu/consumers/odr/. Die Plattform dient der Beilegung von Streitigkeiten zwischen Verbrauchern und Unternehmern auf EU-Ebene.

### ODR-Konfiguration

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| In der Fußzeile anzeigen | ODR-Information zur Shop-Fußzeile hinzufügen | Ja |
| In E-Mails anzeigen | ODR-Information zu transaktionalen E-Mails hinzufügen | Ja |
| ODR-Text | Konfigurierbarer Informationstext | Standardinhalt |
| Position in der Fußzeile | Anzeigeort | Vor dem Copyright-Hinweis |

## Versionierung der Dokumente

Das Plugin protokolliert Versionen der Rechtsseiten:

- Jede Inhaltsänderung erstellt eine neue Version
- Das Datum der letzten Aktualisierung wird auf der Seite angezeigt
- Die DSGVO-Einwilligungsprotokolle enthalten den Hash der Dokumentversion zum Zeitpunkt der Einwilligung
- Die Versionshistorie ist in den **Revisionen** der WordPress-Seite verfügbar

## Mehrsprachigkeit

Die Seiten werden auf Polnisch generiert. Mit WPML oder Polylang erstellt das Plugin separate Seiten für jede Sprache. Fertige Übersetzungen:

- Polnisch (Standard)
- Englisch
- Deutsch

Für andere Sprachen wird eine polnische Version zum manuellen Übersetzen erstellt.

## Fehlerbehebung

**Die Seiten werden nicht generiert**
Prüfen Sie, ob Sie alle erforderlichen Felder ausgefüllt haben: Firmenname, Adresse, NIP und E-Mail.

**Die PDF-Anhänge werden nicht an E-Mails angehängt**
Prüfen Sie, ob der Server die PHP-Erweiterungen `mbstring` und `dom` hat. Prüfen Sie die PHP-Logs auf Fehler.

**Die ODR-Information wird nicht in der Fußzeile angezeigt**
Prüfen Sie, ob das Theme Fußzeilen-Hooks unterstützt (`wp_footer` oder `woocommerce_after_footer`). Einige Themes erfordern, dass das Widget manuell hinzugefügt wird.

**Die Aktualisierung hat meine Änderungen überschrieben**
Bearbeiten Sie den Inhalt nur außerhalb der Markierungen `POLSKI-AUTO-START` / `POLSKI-AUTO-END`. Inhalt zwischen diesen Markierungen wird bei jeder Aktualisierung überschrieben.

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
