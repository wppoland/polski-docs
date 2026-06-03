---
title: Konfigurationsassistent
description: Anleitung zum Konfigurationsassistenten des Plugins Polski for WooCommerce. Firmendaten, rechtliche Seiten, Checkboxen und automatische Shop-Konfiguration Schritt fuer Schritt.
---

## Was ist der Konfigurationsassistent?

Der Assistent fuehrt dich in wenigen Schritten durch die wichtigsten Einstellungen des Plugins. Statt jedes Modul manuell zu konfigurieren, beantwortest du Fragen - der Assistent richtet alles fuer dich ein.

Der Assistent erscheint nach der ersten Aktivierung des Plugins. Um ihn erneut zu starten, gehe zu **WooCommerce > Polski > Einstellungen** und klicke auf **Assistenten erneut starten**.

:::note[Der Assistent ueberschreibt keine vorhandenen Daten]
Wenn du den Assistenten erneut startest, sind die Felder mit den zuvor gespeicherten Daten ausgefuellt. Der Assistent loescht oder ueberschreibt keine Daten, die du nicht aenderst.
:::

---

## Schritt 1: Firmendaten

Gib die Daten deines Unternehmens ein. Das Plugin verwendet sie auf den rechtlichen Seiten, in der Fusszeile, in den GPSR-Daten und auf Rechnungen.

### Pflichtfelder

| Feld | Beschreibung | Beispiel |
|------|------|---------|
| Firmenname | Vollstaendiger Name oder Firma | "Jan Kowalski Sklep Online" |
| Rechtsform | Art der Taetigkeit | JDG, sp. z o.o., sp.j., S.A. |
| NIP | Steueridentifikationsnummer | 1234567890 |
| REGON | REGON-Nummer | 123456789 |
| KRS | KRS-Nummer (falls zutreffend) | 0000123456 |
| Adresse | Strasse, Nummer, PLZ, Stadt | ul. Przykladowa 10, 00-001 Warszawa |
| Kontakt-E-Mail | Adresse fuer Korrespondenz | kontakt@mojsklep.pl |
| Telefon | Telefonnummer | +48 123 456 789 |

### Optionale Felder

- **Bankkontonummer** - zur Anzeige auf Rechnungen und in den AGB
- **Registergericht** - z. B. "Sad Rejonowy dla m.st. Warszawy"
- **Stammkapital** - erforderlich fuer Gesellschaften (z. B. "5 000,00 zl")
- **Vor- und Nachname des Vertreters** - zur Vertretung befugte Person

### NIP-Validierung

Der Assistent prueft automatisch die Korrektheit der NIP:

- Er prueft die Pruefsumme (Gewichtungsalgorithmus)
- Optional ruft er Daten aus der GUS-API (CEIDG/KRS) zum Abgleich ab

Wenn die NIP ungueltig ist, siehst du eine Warnmeldung. Du kannst fortfahren, wir empfehlen jedoch, die Nummer zu korrigieren.

### Beispielkonfiguration

Fuer ein Einzelunternehmen:

```
Firmenname: Jan Kowalski E-Commerce
Rechtsform: Einzelunternehmen
NIP: 1234567890
REGON: 123456789
KRS: (leer - nicht zutreffend fuer JDG)
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
Stammkapital: 50 000,00 zl
Registergericht: Sad Rejonowy dla m.st. Warszawy, XII Wydzial Gospodarczy KRS
```

Klicke auf **Weiter**, um zum naechsten Schritt zu gelangen.

---

## Schritt 2: Rechtliche Seiten

Der Assistent hilft dir, die erforderlichen rechtlichen Seiten zu erstellen. Jeder polnische Shop sollte mindestens haben:

- **AGB des Shops** - Regeln zur Nutzung des Shops und zum Abschluss von Vertraegen
- **Datenschutzerklaerung** - Informationen zur Verarbeitung personenbezogener Daten (DSGVO)
- **Ruecksendungsrichtlinie** - Verfahren und Formular zum Widerruf des Vertrags

### Generierung der Seiten

Der Assistent bietet zwei Ansaetze:

**Option A - neue Seiten generieren (empfohlen fuer neue Shops)**

1. Markiere die Seiten, die du generieren moechtest
2. Der Assistent erstellt WordPress-Seiten mit ausgefuelltem Inhalt auf Basis der Firmendaten
3. Der Inhalt basiert auf Vorlagen, die sich an den polnischen Vorschriften orientieren

**Option B - vorhandene Seiten zuweisen**

1. Wenn du bereits rechtliche Seiten erstellt hast, waehle sie aus der Dropdown-Liste
2. Der Assistent weist sie den entsprechenden WooCommerce-Einstellungen zu

### Vorlagen der rechtlichen Seiten

Die generierten Seiten enthalten die vom polnischen Recht geforderten Abschnitte. Beispielhafte Struktur der AGB:

```
1. Allgemeine Bestimmungen
2. Definitionen
3. Regeln zur Nutzung des Shops
4. Verfahren zur Aufgabe von Bestellungen
5. Preise und Zahlungsmethoden
6. Lieferung
7. Recht auf Widerruf des Vertrags
8. Reklamationen und Garantie
9. Personenbezogene Daten
10. Schlussbestimmungen
```

:::caution[Vorlagen erfordern Anpassung]
Die generierten Seiten sind ein Ausgangspunkt, kein fertiges Rechtsdokument. Pruefe den Inhalt und passe ihn an deinen Shop an. Konsultiere im Zweifel einen auf E-Commerce spezialisierten Anwalt.
:::

### Shortcodes auf den rechtlichen Seiten

Die rechtlichen Seiten verwenden Shortcodes, die automatisch die Firmendaten einfuegen:

```
[polski_company_name]        - Firmenname
[polski_company_nip]         - NIP
[polski_company_regon]       - REGON
[polski_company_krs]         - KRS
[polski_company_address]     - Firmenadresse
[polski_company_email]       - Kontakt-E-Mail
[polski_company_phone]       - Telefon
[polski_withdrawal_period]   - Widerrufsfrist (standardmaessig 14 Tage)
```

Wenn du die Firmendaten in den Einstellungen aenderst, aktualisieren sich die rechtlichen Seiten automatisch.

Beispiel zur Verwendung im AGB-Text:

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

Klicke auf **Weiter**, um zur Konfiguration der Checkboxen zu gelangen.

---

## Schritt 3: Checkboxen auf der Kassenseite

Konfiguriere die Checkboxen auf der Kassenseite (Checkout). Das polnische Recht verlangt, dass der Kunde die AGB akzeptiert, bevor er eine Bestellung aufgibt.

### Standard-Checkboxen

Der Assistent schlaegt ein Set von Checkboxen vor, das den typischen Anforderungen entspricht:

**Checkbox 1 - AGB (verpflichtend)**

```
Inhalt: Ich habe die [AGB des Shops] gelesen und akzeptiere sie.
Erforderlich: Ja
Link: /agb/
Position: Vor dem Bestellbutton
```

**Checkbox 2 - Datenschutzerklaerung (verpflichtend)**

```
Inhalt: Ich habe die [Datenschutzerklaerung] gelesen.
Erforderlich: Ja
Link: /datenschutz/
Position: Vor dem Bestellbutton
```

**Checkbox 3 - Widerrufsrecht (verpflichtend)**

```
Inhalt: Ich habe die [Belehrung ueber das Recht auf Widerruf des Vertrags]
         und das [Muster-Widerrufsformular] gelesen.
Erforderlich: Ja
Link: /ruecksendungsrichtlinie/
Position: Vor dem Bestellbutton
```

**Checkbox 4 - Newsletter (optional)**

```
Inhalt: Ich moechte Informationen ueber Neuheiten und Aktionen
       an die angegebene E-Mail-Adresse erhalten.
Erforderlich: Nein
Position: Nach den verpflichtenden Checkboxen
```

### Bearbeitung der Checkboxen

Jede Checkbox kannst du anpassen:

- **Inhalt** - der neben der Checkbox angezeigte Text (unterstuetzt HTML fuer Links)
- **Erforderlich** - ob die Markierung zur Aufgabe der Bestellung notwendig ist
- **Position** - wo auf der Kassenseite die Checkbox angezeigt wird
- **Fehlermeldung** - der Text, der angezeigt wird, wenn der Kunde eine erforderliche Checkbox nicht markiert

### Hinzufuegen eigener Checkboxen

Klicke auf **Checkbox hinzufuegen**, um eine zusaetzliche zu erstellen. Nuetzliche Szenarien:

- Einwilligung in die Verarbeitung von Daten zu Marketingzwecken
- Erklaerung der Volljaehrigkeit (Shops mit Alkohol)
- Einwilligung in telefonische Kontaktaufnahme
- Bestaetigung, die Produktseite gelesen zu haben (Lebensmittelprodukte)

### Positionen der Checkboxen

Verfuegbare Positionen auf der Kassenseite:

| Position | Beschreibung |
|---------|------|
| `before_order_button` | Vor dem Button "Zahlungspflichtig bestellen" |
| `after_order_button` | Nach dem Bestellbutton |
| `after_billing_form` | Nach dem Formular der Zahlungsdaten |
| `after_shipping_form` | Nach dem Formular der Lieferdaten |
| `before_payment_methods` | Vor der Auswahl der Zahlungsmethode |

Klicke auf **Weiter**, um zur Zusammenfassung zu gelangen.

---

## Schritt 4: Aktivierung der Module

Der Assistent schlaegt auf Basis deiner Antworten Module zur Aktivierung vor:

### Empfohlene Module (automatisch markiert)

- Omnibus - Verfolgung der Preishistorie
- Bestellbutton - rechtskonformer Text
- Rechtliche Checkboxen - im vorherigen Schritt konfiguriert
- Rechtliche Seiten - in Schritt 2 generiert
- Widerrufsrecht - Formular und Belehrung
- Lieferzeit - Information auf der Produktseite
- GPSR - Produktsicherheitsdaten

### Optionale Module (manuell zu markieren)

- NIP-Suche - wenn du an Unternehmen verkaufst (B2B)
- Naehrwerte - wenn du Lebensmittel verkaufst
- Allergene - wenn du Lebensmittel verkaufst
- Wunschliste - wenn du diese Funktion im Shop willst
- Vergleich - wenn du Produkte zum Vergleichen hast
- DSA - wenn du einen Marketplace betreibst

Markiere die Module, die du aktivieren moechtest, und klicke auf **Weiter**.

---

## Schritt 5: Zusammenfassung und Anwendung

Der letzte Schritt zeigt eine Zusammenfassung der Einstellungen:

```
Firmendaten:
  Name: Jan Kowalski E-Commerce
  NIP: 1234567890
  Adresse: ul. Handlowa 5/10, 31-001 Krakow

Rechtliche Seiten:
  AGB: Wird erstellt (neue Seite)
  Datenschutzerklaerung: Wird erstellt (neue Seite)
  Ruecksendungsrichtlinie: Wird erstellt (neue Seite)

Checkboxen: 4 (3 verpflichtend, 1 optional)

Zu aktivierende Module: 7
  - Omnibus
  - Bestellbutton
  - Rechtliche Checkboxen
  - Rechtliche Seiten
  - Widerrufsrecht
  - Lieferzeit
  - GPSR
```

Pruefe die Zusammenfassung und klicke auf **Konfiguration anwenden**. Der Assistent:

1. Speichert die Firmendaten in den Plugin-Einstellungen
2. Erstellt die rechtlichen Seiten (falls die Generierung gewaehlt wurde)
3. Weist die Seiten den WooCommerce-Einstellungen zu
4. Konfiguriert die Checkboxen auf der Kassenseite
5. Aktiviert die ausgewaehlten Module

Nach Abschluss siehst du eine Bestaetigungsmeldung und einen Link zum Compliance-Dashboard.

---

## Nach Abschluss des Assistenten

### Pruefe die Produktseite

Oeffne ein beliebiges Produkt in deinem Shop und pruefe, ob die neuen Elemente erschienen sind:

- Information ueber den niedrigsten Preis (Omnibus) - sichtbar bei reduzierten Produkten
- Geschaetzte Lieferzeit
- GPSR-Daten (Hersteller, verantwortliche Person)

### Pruefe die Kassenseite

Lege ein Produkt in den Warenkorb und gehe zur Kasse:

- Pruefe, ob die Checkboxen korrekt angezeigt werden
- Pruefe, ob der Button den Text "Zahlungspflichtig bestellen" hat
- Versuche, eine Bestellung ohne Markierung der Checkboxen aufzugeben - es sollte eine Fehlermeldung erscheinen

### Pruefe die rechtlichen Seiten

Oeffne die generierten Seiten und pruefe ihren Inhalt:

- Ob die Firmendaten korrekt sind (die Shortcodes sollten die aktuellen Daten anzeigen)
- Ob die Struktur des Dokuments vollstaendig ist
- Ob die internen Links funktionieren

### Compliance-Dashboard

Gehe zu **WooCommerce > Polski > Compliance** - nach korrekter Konfiguration sollten die meisten Indikatoren gruen sein. Elemente, die zusaetzliche Aufmerksamkeit erfordern, sind mit gelbem Status und einer Anweisung gekennzeichnet, was zu ergaenzen ist.

---

## Erneutes Starten des Assistenten

Der Assistent kann jederzeit erneut gestartet werden:

1. Gehe zu **WooCommerce > Polski > Einstellungen**
2. Klicke auf **Assistenten erneut starten**
3. Die Felder sind mit den zuvor gespeicherten Daten ausgefuellt
4. Aendere, was du brauchst, und klicke auf **Konfiguration anwenden**

Der Assistent loescht keine rechtlichen Seiten und setzt keine manuell konfigurierten Module zurueck.

---

## Fehlerbehebung

### Die rechtlichen Seiten wurden nicht erstellt

- Pruefe, ob dein WordPress-Konto Administratorrechte hat
- Pruefe, ob in **Einstellungen > Permalinks** ein anderes Format als "Einfach" eingestellt ist
- Versuche, die Seiten manuell zu erstellen und sie in **WooCommerce > Einstellungen > Erweitert > Seiteneinstellungen** zuzuweisen

### Die Checkboxen werden an der Kasse nicht angezeigt

- Stelle sicher, dass das Modul "Rechtliche Checkboxen" in **WooCommerce > Polski > Module** aktiv ist
- Wenn du ein benutzerdefiniertes Kassen-Template verwendest, pruefe, ob es die WooCommerce-Hooks unterstuetzt
- Leere den Cache von Caching-Plugins (WP Super Cache, W3 Total Cache, LiteSpeed Cache)

### Der Assistent startet nicht

- Leere den Browser-Cache und versuche es erneut
- Pruefe die Browser-Konsole (F12) auf JavaScript-Fehler
- Deaktiviere voruebergehend andere Plugins, die einen Konflikt verursachen koennten

Bleibt das Problem bestehen? Melde es auf [GitHub Issues](https://github.com/wppoland/polski/issues) mit Beschreibung und Screenshot. Du kannst auch auf [GitHub Discussions](https://github.com/wppoland/polski/discussions) fragen.

<div class="disclaimer">Diese Seite dient ausschliesslich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist eine Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
