---
title: Rechtsseiten
description: Automatische Generierung von Rechtsseiten in Polski for WooCommerce - AGB, Datenschutzerklaerung, Widerrufsbelehrung, Reklamationen, E-Mail-Anhaenge und ODR-Information.
---

Jeder Onlineshop in Polen braucht Rechtsdokumente. Das Plugin generiert vier Rechtsseiten, haengt sie an E-Mails an und zeigt die ODR-Information an.

## Generierte Rechtsseiten

### 1. AGB

Die generierten AGB enthalten die vom Verbraucherrechtegesetz geforderten Elemente:

- Identifikationsdaten des Verkaeufers (Name, Adresse, NIP, REGON, KRS)
- Bestellverfahren
- Zahlungsmethoden
- Kosten und Lieferarten
- Widerrufsrecht (14 Tage)
- Reklamationsverfahren
- Aussergerichtliche Streitbeilegung und Anspruchsdurchsetzung
- Schlussbestimmungen

### 2. Datenschutzerklaerung

Die generierte DSGVO-konforme Datenschutzerklaerung enthaelt:

- Daten des Verantwortlichen fuer die Datenverarbeitung
- Zwecke und Rechtsgrundlagen der Verarbeitung
- Kategorien verarbeiteter Daten
- Datenempfaenger (Kuriere, Zahlungsanbieter, Hosting)
- Aufbewahrungsfristen
- Rechte der betroffenen Personen
- Cookie-Information
- Information zum Profiling (falls zutreffend)

### 3. Widerrufsbelehrung

Die generierte Widerrufsbelehrung umfasst:

- Frist fuer den Widerruf (14 Tage)
- Muster-Widerrufsformular
- Verfahren der Warenrueckgabe
- Ruecksendekosten (wer sie traegt)
- Frist fuer die Erstattung
- Ausnahmen vom Widerrufsrecht
- Zustand der zurueckgesandten Ware

### 4. Reklamationsbelehrung

Die generierte Reklamationsbelehrung enthaelt:

- Rechtsgrundlage (Gewaehrleistung, Garantie)
- Wege zur Einreichung einer Reklamation
- Bearbeitungsfrist (14 Tage)
- Verbraucherrechte (Reparatur, Austausch, Preisminderung, Ruecktritt)
- Reklamationsformular
- Kontaktdaten fuer Reklamationen

## Generator-Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Rechtsseiten**, um die Seiten zu generieren oder zu aktualisieren.

### Verkaeufer-Daten

Fuellen Sie vor der Generierung die Firmendaten aus:

| Feld | Beschreibung | Beispiel |
|------|------|---------|
| Firmenname | Vollstaendiger Name oder Firma | Sklep XYZ Jan Kowalski |
| Adresse | Strasse, Nummer | ul. Przykladowa 1/2 |
| PLZ und Stadt | - | 00-001 Warszawa |
| NIP | Steueridentifikationsnummer | 1234567890 |
| REGON | - | 123456789 |
| KRS | Falls zutreffend | 0000123456 |
| Kontakt-E-Mail | - | kontakt@sklep.pl |
| Telefon | - | +48 123 456 789 |
| Bankkontonummer | Fuer Rueckerstattungen | PL 12 3456 7890 1234 5678 9012 3456 |

### Seiten generieren

1. Fuellen Sie die Verkaeufer-Daten aus
2. Klicken Sie auf "Rechtsseiten generieren"
3. Das System erstellt 4 WordPress-Seiten im Status "Entwurf"
4. Ueberpruefen Sie den Inhalt jeder Seite
5. Veroeffentlichen Sie die Seiten nach der Ueberpruefung

Die Seiten werden als Entwuerfe erstellt, da es empfohlen wird, den Inhalt vor der Veroeffentlichung mit einem Anwalt zu konsultieren.

### Seiten aktualisieren

Wenn Sie die Firmendaten aendern, klicken Sie auf "Rechtsseiten aktualisieren". Das System aktualisiert die generierten Abschnitte und bewahrt Ihre manuellen Aenderungen in den markierten Bloecken.

Struktur der generierten Seite:

```
<!-- POLSKI-AUTO-START -->
Automatisch generierter Inhalt - diesen Block nicht bearbeiten
<!-- POLSKI-AUTO-END -->

Ihr zusaetzlicher Inhalt - sicher unterhalb bearbeiten
```

Bei der Aktualisierung ueberschreibt das System nur den Inhalt zwischen den Markierungen `POLSKI-AUTO-START` und `POLSKI-AUTO-END`. Ausserhalb dieser Markierungen hinzugefuegter Inhalt bleibt erhalten.

## E-Mail-Anhaenge

Das Plugin ermoeglicht das Anhaengen von Rechtsseiten als PDF-Anhaenge an WooCommerce-Transaktions-E-Mails.

### Konfiguration

Unter **WooCommerce > Einstellungen > Polski > Rechtsseiten > E-Mail-Anhaenge** konfigurieren Sie, welche Dokumente an welche E-Mail-Typen angehaengt werden:

| E-Mail | Empfohlene Anhaenge |
|--------|---------------------|
| Neue Bestellung (Kunde) | AGB, Datenschutzerklaerung, Widerrufsbelehrung |
| Bestellung abgeschlossen | Widerrufsbelehrung |
| Rechnung | AGB |
| Gutschrift | Widerrufsbelehrung, Reklamationsbelehrung |

### Anhangsformat

Dokumente werden automatisch in das PDF-Format konvertiert, mit einem Header, der das Shop-Logo und das Generierungsdatum enthaelt. Die Dateigroesse wird optimiert, um den Mailserver nicht zu belasten.

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| Format | Anhangstyp | PDF |
| Logo im Header | Ob das Shop-Logo eingefuegt werden soll | Ja |
| Papierformat | - | A4 |
| Seitenrand | Dokumentenrand | 20mm |

## ODR-Information

Die EU-Verordnung 524/2013 verpflichtet Online-Verkaeufer, einen Link zur ODR-Plattform (Online Dispute Resolution) - der Plattform zur aussergerichtlichen Streitbeilegung - anzugeben.

### Automatische Anzeige

Das Plugin fuegt die ODR-Information automatisch hinzu in:

- **Shop-Fusszeile** - Link zur ODR-Plattform
- **AGB** - Abschnitt zur aussergerichtlichen Streitbeilegung
- **Transaktions-E-Mails** - Fusszeile mit ODR-Link

### Inhalt der ODR-Information

Standard-Text des Plugins:

> Die ODR-Plattform (Online Dispute Resolution) ist unter folgender Adresse verfuegbar: https://ec.europa.eu/consumers/odr/. Die Plattform dient der Beilegung von Streitigkeiten zwischen Verbrauchern und Unternehmern auf EU-Ebene.

### ODR-Konfiguration

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| In Fusszeile anzeigen | ODR-Information zur Shop-Fusszeile hinzufuegen | Ja |
| In E-Mails anzeigen | ODR-Information zu Transaktions-E-Mails hinzufuegen | Ja |
| ODR-Text | Konfigurierbarer Informationstext | Standard-Text |
| Position in der Fusszeile | Anzeigeort | Vor der Copyright-Information |

## Dokumentenversionierung

Das Plugin registriert automatisch Versionen der Rechtsseiten:

- Jede Inhaltsaenderung erstellt eine neue Version
- Das Datum der letzten Aktualisierung wird auf der Seite angezeigt
- DSGVO-Einwilligungsprotokolle enthalten den Hash der Dokumentversion zum Zeitpunkt der Einwilligung
- Die Versionshistorie ist ueber **Revisionen** der WordPress-Seite verfuegbar

## Mehrsprachigkeit

Generierte Seiten sind standardmaessig auf Polnisch. Bei Verwendung von WPML oder Polylang generiert das Plugin separate Seiten fuer jede aktive Sprache. Uebersetzungen werden bereitgestellt fuer:

- Polnisch (Standard)
- Englisch
- Deutsch

Fuer andere Sprachen wird die polnische Version mit der Moeglichkeit zur manuellen Uebersetzung generiert.

## Fehlerbehebung

**Seiten werden nicht generiert**
Pruefen Sie, ob alle erforderlichen Verkaeufer-Datenfelder ausgefuellt sind. Die Felder Firmenname, Adresse, NIP und E-Mail sind obligatorisch.

**PDF-Anhaenge werden nicht an E-Mails angehaengt**
Pruefen Sie, ob auf dem Server die Bibliothek zur PDF-Generierung installiert ist. Das Plugin erfordert die PHP-Erweiterungen `mbstring` und `dom`. Pruefen Sie die PHP-Logs auf Fehler.

**ODR-Information wird nicht in der Fusszeile angezeigt**
Pruefen Sie, ob das Theme die WooCommerce-Fusszeilen-Hooks unterstuetzt (`wp_footer` oder `woocommerce_after_footer`). Einige Themes erfordern das manuelle Hinzufuegen eines Widgets.

**Aktualisierung hat meine Aenderungen ueberschrieben**
Bearbeiten Sie Inhalte nur ausserhalb der Markierungen `POLSKI-AUTO-START` / `POLSKI-AUTO-END`. Der Inhalt zwischen diesen Markierungen wird bei jeder Aktualisierung ueberschrieben.

## Weitere Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
