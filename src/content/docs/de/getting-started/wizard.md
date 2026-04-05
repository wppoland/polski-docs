---
title: Konfigurationsassistent
description: Anleitung zum Konfigurationsassistenten des Plugins Polski for WooCommerce. Firmendaten, Rechtsseiten, Checkboxen und automatische Shop-Konfiguration Schritt fuer Schritt.
---

## Was ist der Konfigurationsassistent?

Der Konfigurationsassistent ist ein Werkzeug, das Sie in wenigen einfachen Schritten durch die wichtigsten Plugin-Einstellungen fuehrt. Statt jedes Modul manuell zu konfigurieren, stellt der Assistent Fragen und setzt die entsprechenden Optionen automatisch.

Der Assistent ist nach der ersten Plugin-Aktivierung verfuegbar. Sie koennen ihn jederzeit erneut starten - gehen Sie zu **WooCommerce > Polski > Einstellungen** und klicken Sie auf **Assistenten erneut starten**.

:::note[Der Assistent ueberschreibt keine vorhandenen Daten]
Wenn Sie den Assistenten erneut starten, sind die Felder mit zuvor gespeicherten Daten gefuellt. Der Assistent loescht oder ueberschreibt keine Daten, die Sie nicht aendern.
:::

---

## Schritt 1: Firmendaten

Der erste Schritt besteht darin, die Grunddaten Ihres Unternehmens zu ergaenzen. Diese Daten werden an vielen Stellen verwendet - auf Rechtsseiten, in der Fusszeile, in GPSR-Daten und auf Rechnungen.

### Pflichtfelder

| Feld | Beschreibung | Beispiel |
|------|------|---------|
| Firmenname | Vollstaendiger Name oder Firma | "Jan Kowalski Online-Shop" |
| Rechtsform | Art der Taetigkeit | Einzelunternehmen, GmbH, KG, AG |
| NIP | Steueridentifikationsnummer | 1234567890 |
| REGON | REGON-Nummer | 123456789 |
| KRS | KRS-Nummer (falls zutreffend) | 0000123456 |
| Adresse | Strasse, Nummer, PLZ, Stadt | ul. Przykladowa 10, 00-001 Warszawa |
| Kontakt-E-Mail | Korrespondenzadresse | kontakt@meinshop.pl |
| Telefon | Telefonnummer | +48 123 456 789 |

### Optionale Felder

- **Bankkontonummer** - zur Anzeige auf Rechnungen und in den AGB
- **Registergericht** - z.B. "Amtsgericht Warszawa"
- **Stammkapital** - erforderlich fuer Kapitalgesellschaften (z.B. "5.000,00 PLN")
- **Name des Vertreters** - zur Vertretung berechtigte Person

### NIP-Validierung

Der Assistent ueberpreuft automatisch die Richtigkeit der Steuernummer (NIP):

- Prueft die Pruefsumme (Gewichtungsalgorithmus)
- Ruft optional Daten von der GUS-API (CEIDG/KRS) zum Vergleich ab

Wenn die Steuernummer ungueltig ist, sehen Sie eine Warnmeldung. Sie koennen fortfahren, es wird jedoch empfohlen, die Nummer zu korrigieren.

### Konfigurationsbeispiel

Fuer ein Einzelunternehmen:

```
Firmenname: Jan Kowalski E-Commerce
Rechtsform: Einzelunternehmen
NIP: 1234567890
REGON: 123456789
KRS: (leer - nicht zutreffend fuer Einzelunternehmen)
Adresse: ul. Handlowa 5/10, 31-001 Krakow
E-Mail: sklep@kowalski-ecommerce.pl
Telefon: +48 500 600 700
```

Fuer eine GmbH (sp. z o.o.):

```
Firmenname: SuperSklep sp. z o.o.
Rechtsform: Gesellschaft mit beschraenkter Haftung
NIP: 9876543210
REGON: 987654321
KRS: 0000654321
Adresse: ul. Biznesowa 22, 00-100 Warszawa
E-Mail: biuro@supersklep.pl
Telefon: +48 22 123 45 67
Stammkapital: 50.000,00 PLN
Registergericht: Amtsgericht Warszawa, XII. Handelsabteilung KRS
```

Klicken Sie auf **Weiter**, um zum naechsten Schritt zu gelangen.

---

## Schritt 2: Rechtsseiten

In diesem Schritt hilft Ihnen der Assistent, die gesetzlich vorgeschriebenen Seiten zu erstellen. Jeder polnische Onlineshop sollte mindestens folgende Seiten haben:

- **AGB** - Regeln fuer die Nutzung des Shops und den Vertragsabschluss
- **Datenschutzerklaerung** - Informationen zur Verarbeitung personenbezogener Daten (DSGVO)
- **Widerrufsbelehrung** - Verfahren und Formular zum Widerruf

### Seiten generieren

Der Assistent bietet zwei Ansaetze:

**Option A - neue Seiten generieren (empfohlen fuer neue Shops)**

1. Markieren Sie die Seiten, die Sie generieren moechten
2. Der Assistent erstellt WordPress-Seiten mit Inhalt basierend auf den Firmendaten
3. Der Inhalt basiert auf Vorlagen, die dem polnischen Recht entsprechen

**Option B - vorhandene Seiten zuweisen**

1. Wenn Sie bereits Rechtsseiten erstellt haben, waehlen Sie sie aus der Dropdown-Liste
2. Der Assistent weist sie den entsprechenden WooCommerce-Einstellungen zu

### Vorlagen fuer Rechtsseiten

Die generierten Seiten enthalten vom polnischen Recht geforderte Abschnitte. Beispielstruktur der AGB:

```
1. Allgemeine Bestimmungen
2. Definitionen
3. Nutzungsregeln des Shops
4. Bestellverfahren
5. Preise und Zahlungsmethoden
6. Lieferung
7. Widerrufsrecht
8. Reklamationen und Garantie
9. Personenbezogene Daten
10. Schlussbestimmungen
```

:::caution[Vorlagen erfordern Anpassung]
Die generierten Seiten sind ein Ausgangspunkt, kein fertiges Rechtsdokument. Ueberpruefen Sie den Inhalt und passen Sie ihn an die Besonderheiten Ihres Shops an. Konsultieren Sie bei Zweifeln den Inhalt mit einem auf E-Commerce spezialisierten Anwalt.
:::

### Shortcodes auf Rechtsseiten

Auf den generierten Seiten werden Shortcodes verwendet, die automatisch Firmendaten einfuegen:

```
[polski_company_name]        - Firmenname
[polski_company_nip]         - NIP
[polski_company_regon]       - REGON
[polski_company_krs]         - KRS
[polski_company_address]     - Firmenadresse
[polski_company_email]       - Kontakt-E-Mail
[polski_company_phone]       - Telefon
[polski_withdrawal_period]   - Widerrufsfrist (Standard 14 Tage)
```

Dank der Shortcodes aktualisieren sich die Rechtsseiten automatisch, wenn Sie die Firmendaten in den Plugin-Einstellungen aendern.

Verwendungsbeispiel im AGB-Text:

```
Eigentuemer des Onlineshops ist [polski_company_name],
NIP: [polski_company_nip], REGON: [polski_company_regon],
mit Sitz unter der Adresse: [polski_company_address].

Kontakt: [polski_company_email], Tel. [polski_company_phone].
```

Ergebnis auf der Seite:

```
Eigentuemer des Onlineshops ist Jan Kowalski E-Commerce,
NIP: 1234567890, REGON: 123456789,
mit Sitz unter der Adresse: ul. Handlowa 5/10, 31-001 Krakow.

Kontakt: sklep@kowalski-ecommerce.pl, Tel. +48 500 600 700.
```

Klicken Sie auf **Weiter**, um zur Checkbox-Konfiguration zu gelangen.

---

## Schritt 3: Checkboxen auf der Kassenseite

In diesem Schritt konfigurieren Sie die Pflicht-Checkboxen, die auf der Kassenseite (Checkout) angezeigt werden. Das polnische Recht erfordert, dass der Kunde den AGB vor der Bestellung zustimmt.

### Standard-Checkboxen

Der Assistent schlaegt einen Satz von Checkboxen vor, der den typischen Anforderungen entspricht:

**Checkbox 1 - AGB (obligatorisch)**

```
Inhalt: Ich habe die [AGB] gelesen und akzeptiere deren Bestimmungen.
Erforderlich: Ja
Link: /agb/
Position: Vor dem Bestellbutton
```

**Checkbox 2 - Datenschutzerklaerung (obligatorisch)**

```
Inhalt: Ich habe die [Datenschutzerklaerung] zur Kenntnis genommen.
Erforderlich: Ja
Link: /datenschutz/
Position: Vor dem Bestellbutton
```

**Checkbox 3 - Widerrufsrecht (obligatorisch)**

```
Inhalt: Ich habe die [Widerrufsbelehrung] und das [Muster-Widerrufsformular]
         zur Kenntnis genommen.
Erforderlich: Ja
Link: /widerruf/
Position: Vor dem Bestellbutton
```

**Checkbox 4 - Newsletter (optional)**

```
Inhalt: Ich moechte Informationen ueber Neuheiten und Aktionen
       per E-Mail erhalten.
Erforderlich: Nein
Position: Nach den Pflicht-Checkboxen
```

### Checkboxen bearbeiten

Jede Checkbox koennen Sie anpassen:

- **Inhalt** - Text neben der Checkbox (unterstuetzt HTML fuer Links)
- **Erforderlich** - ob das Ankreuzen fuer die Bestellung erforderlich ist
- **Position** - wo auf der Kassenseite die Checkbox angezeigt wird
- **Fehlermeldung** - Text, der erscheint, wenn der Kunde eine Pflicht-Checkbox nicht ankreuzt

### Eigene Checkboxen hinzufuegen

Klicken Sie auf **Checkbox hinzufuegen**, um eine weitere zu erstellen. Nuetzliche Szenarien:

- Einwilligung in die Datenverarbeitung zu Marketingzwecken
- Altersbestaetigung (Shops mit Alkohol)
- Einwilligung in telefonischen Kontakt
- Bestaetigung der Kenntnisnahme des Produktdatenblatts (Lebensmittel)

### Checkbox-Positionen

Verfuegbare Positionen auf der Kassenseite:

| Position | Beschreibung |
|---------|------|
| `before_order_button` | Vor dem Button "Zahlungspflichtig bestellen" |
| `after_order_button` | Nach dem Bestellbutton |
| `after_billing_form` | Nach dem Rechnungsadressformular |
| `after_shipping_form` | Nach dem Lieferadressformular |
| `before_payment_methods` | Vor der Zahlungsmethodenwahl |

Klicken Sie auf **Weiter**, um zur Zusammenfassung zu gelangen.

---

## Schritt 4: Modulaktivierung

Basierend auf Ihren Antworten schlaegt der Assistent eine Liste von Modulen zur Aktivierung vor:

### Empfohlene Module (automatisch ausgewaehlt)

- Omnibus - Preisverlaufsverfolgung
- Bestellbutton - gesetzeskonformer Text
- Rechtliche Checkboxen - im vorherigen Schritt konfiguriert
- Rechtsseiten - in Schritt 2 generiert
- Widerrufsrecht - Formular und Belehrung
- Lieferzeit - Information auf der Produktseite
- GPSR - Produktsicherheitsdaten

### Optionale Module (manuell auszuwaehlen)

- NIP-Suche - wenn Sie an Firmen verkaufen (B2B)
- Naehrwerte - wenn Sie Lebensmittel verkaufen
- Allergene - wenn Sie Lebensmittel verkaufen
- Wunschliste - wenn Sie diese Funktion im Shop wuenschen
- Produktvergleich - wenn Sie Produkte zum Vergleichen haben
- DSA - wenn Sie einen Marktplatz betreiben

Markieren Sie die Module, die Sie aktivieren moechten, und klicken Sie auf **Weiter**.

---

## Schritt 5: Zusammenfassung und Anwendung

Der letzte Schritt zeigt eine Zusammenfassung aller Einstellungen:

```
Firmendaten:
  Name: Jan Kowalski E-Commerce
  NIP: 1234567890
  Adresse: ul. Handlowa 5/10, 31-001 Krakow

Rechtsseiten:
  AGB: Wird erstellt (neue Seite)
  Datenschutzerklaerung: Wird erstellt (neue Seite)
  Widerrufsbelehrung: Wird erstellt (neue Seite)

Checkboxen: 4 (3 obligatorisch, 1 optional)

Zu aktivierende Module: 7
  - Omnibus
  - Bestellbutton
  - Rechtliche Checkboxen
  - Rechtsseiten
  - Widerrufsrecht
  - Lieferzeit
  - GPSR
```

Ueberpruefen Sie die Zusammenfassung und klicken Sie auf **Konfiguration anwenden**. Der Assistent:

1. Speichert die Firmendaten in den Plugin-Einstellungen
2. Erstellt die Rechtsseiten (falls Generierung gewaehlt)
3. Weist die Seiten den WooCommerce-Einstellungen zu
4. Konfiguriert die Checkboxen auf der Kassenseite
5. Aktiviert die ausgewaehlten Module

Nach Abschluss sehen Sie eine Bestaetigungsmeldung und einen Link zum Compliance-Dashboard.

---

## Nach Abschluss des Assistenten

### Produktseite pruefen

Oeffnen Sie ein beliebiges Produkt in Ihrem Shop und pruefen Sie, ob neue Elemente erschienen sind:

- Information zum niedrigsten Preis (Omnibus) - sichtbar bei Produkten mit Reduzierung
- Geschaetzte Lieferzeit
- GPSR-Daten (Hersteller, verantwortliche Person)

### Kassenseite pruefen

Fuegen Sie ein Produkt zum Warenkorb hinzu und gehen Sie zur Kasse:

- Pruefen Sie, ob die Checkboxen korrekt angezeigt werden
- Pruefen Sie, ob der Button den Text "Zamawiam z obowiazkiem zaplaty" traegt
- Versuchen Sie, eine Bestellung ohne Ankreuzen der Checkboxen aufzugeben - es sollte eine Fehlermeldung erscheinen

### Rechtsseiten pruefen

Oeffnen Sie die generierten Seiten und pruefen Sie deren Inhalt:

- Ob die Firmendaten korrekt sind (Shortcodes sollten aktuelle Daten anzeigen)
- Ob die Dokumentstruktur vollstaendig ist
- Ob interne Links funktionieren

### Compliance-Dashboard

Gehen Sie zu **WooCommerce > Polski > Konformitaet** - nach korrekter Konfiguration sollten die meisten Indikatoren gruen sein. Elemente, die zusaetzliche Aufmerksamkeit erfordern, werden mit gelbem Status und einer Anweisung markiert, was zu ergaenzen ist.

---

## Assistenten erneut starten

Der Assistent kann jederzeit erneut gestartet werden:

1. Gehen Sie zu **WooCommerce > Polski > Einstellungen**
2. Klicken Sie auf **Assistenten erneut starten**
3. Die Felder sind mit zuvor gespeicherten Daten gefuellt
4. Aendern Sie, was Sie brauchen, und klicken Sie auf **Konfiguration anwenden**

Der Assistent loescht keine Rechtsseiten und setzt keine Module zurueck, die Sie bereits manuell konfiguriert haben.

---

## Fehlerbehebung

### Rechtsseiten wurden nicht erstellt

- Pruefen Sie, ob Ihr WordPress-Konto Administratorrechte hat
- Pruefen Sie, ob unter **Einstellungen > Permalinks** ein anderes Format als "Einfach" eingestellt ist
- Versuchen Sie, die Seiten manuell zu erstellen und unter **WooCommerce > Einstellungen > Erweitert > Seiteneinstellungen** zuzuweisen

### Checkboxen werden auf der Kasse nicht angezeigt

- Stellen Sie sicher, dass das Modul "Rechtliche Checkboxen" unter **WooCommerce > Polski > Module** aktiv ist
- Wenn Sie ein benutzerdefiniertes Kassen-Template verwenden, pruefen Sie, ob es WooCommerce-Hooks unterstuetzt
- Leeren Sie den Cache von Caching-Plugins (WP Super Cache, W3 Total Cache, LiteSpeed Cache)

### Assistent startet nicht

- Leeren Sie den Browser-Cache und versuchen Sie es erneut
- Pruefen Sie die Browser-Konsole (F12) auf JavaScript-Fehler
- Deaktivieren Sie voruebergehend andere Plugins, die Konflikte verursachen koennten

Wenn das Problem bestehen bleibt, melden Sie es auf [GitHub Issues](https://github.com/wppoland/polski/issues) mit einer Problembeschreibung und einem Screenshot. Die Community hilft gerne auf [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
