---
title: Plugin-Konfiguration
description: Erste Schritte nach der Installation des Plugins Polski for WooCommerce. Module aktivieren, Compliance-Dashboard, Einstellungsuebersicht und Anpassung an die Shop-Beduerfnisse.
---

## Hauptpanel des Plugins

Gehen Sie nach der Installation und Aktivierung des Plugins zu **WooCommerce > Polski** im Menue des Administrationspanels. Sie sehen das Hauptpanel (Dashboard), das in mehrere Bereiche unterteilt ist:

- **Konformitaetsstatus** - schnelle Uebersicht, welche rechtlichen Anforderungen erfuellt sind
- **Aktive Module** - Liste der aktivierten Module mit Links zu ihren Einstellungen
- **Erforderliche Massnahmen** - Benachrichtigungen ueber fehlende Konfigurationen
- **Schnelllinks** - Verweise auf die wichtigsten Einstellungen

:::tip[Konfigurationsassistent]
Wenn Sie gerade erst anfangen, empfehlen wir die Nutzung des [Konfigurationsassistenten](/de/getting-started/wizard/), der Sie Schritt fuer Schritt durch die wichtigsten Einstellungen fuehrt. Der Assistent kann jederzeit vom Dashboard aus erneut gestartet werden.
:::

---

## Module aktivieren und deaktivieren

Das Plugin arbeitet modular - standardmaessig ist nach der Installation kein Modul aktiv. Dadurch beeinflusst das Plugin die Shop-Leistung nicht, bis Sie bestimmte Funktionen aktivieren.

### Modul aktivieren

1. Gehen Sie zu **WooCommerce > Polski > Module**
2. Suchen Sie das gewuenschte Modul in der Liste
3. Klicken Sie auf den Schalter neben dem Modulnamen, um es zu aktivieren
4. Klicken Sie unten auf der Seite auf **Aenderungen speichern**

### Modul deaktivieren

Das Verfahren ist identisch - klicken Sie auf den Schalter bei einem aktiven Modul, um es zu deaktivieren. Das Deaktivieren eines Moduls loescht keine gespeicherten Daten, sodass Sie es ohne Konfigurationsverlust erneut aktivieren koennen.

### Empfohlene Module fuer den Start

Fuer einen typischen polnischen Onlineshop empfehlen wir die Aktivierung folgender Module als Minimum:

| Modul | Warum es wichtig ist |
|-------|-------------------|
| Omnibus | Gesetzlich vorgeschrieben - Anzeige der Preishistorie |
| Bestellbutton | Gesetzlich vorgeschrieben - "Zahlungspflichtig bestellen" |
| Rechtliche Checkboxen | Gesetzlich vorgeschrieben - Zustimmungen bei der Bestellung |
| Rechtsseiten | AGB und Datenschutzerklaerung |
| Widerrufsrecht | Gesetzlich vorgeschrieben - Widerrufsformular und -belehrung |
| Lieferzeit | Empfohlen - geschaetzte Lieferzeit auf der Produktseite |
| GPSR | Vorgeschrieben seit 13.12.2024 - Produktsicherheitsdaten |

---

## Compliance-Dashboard

Das Compliance-Dashboard ist der zentrale Ort, an dem Sie den rechtlichen Status Ihres Shops pruefen koennen. Gehen Sie zu **WooCommerce > Polski > Konformitaet**, um zu sehen:

### Statusanzeigen

Jede rechtliche Anforderung hat einen von drei Status:

- **Konform** (gruen) - Anforderung erfuellt, Konfiguration vollstaendig
- **Erfordert Aufmerksamkeit** (gelb) - Modul ist aktiviert, aber ein Teil der Konfiguration fehlt
- **Nicht konform** (rot) - Modul ist deaktiviert oder Konfiguration unvollstaendig

### Checkliste

Das Dashboard zeigt eine Checkliste mit konkreten auszufuehrenden Schritten:

```
[x] Bestellbutton - gesetzeskonformer Text
[x] Omnibus - Anzeige der Preishistorie aktiviert
[ ] AGB - AGB-Seite nicht zugewiesen
[ ] Datenschutzerklaerung - Seite nicht zugewiesen
[ ] GPSR - Herstellerdaten bei 12 Produkten fehlen
```

Klicken Sie auf ein beliebiges Listenelement, um direkt zu den entsprechenden Einstellungen zu gelangen.

---

## Konfiguration einzelner Modulgruppen

### Rechtskonformitaet

Gehen Sie zu **WooCommerce > Polski > Rechtskonformitaet**, um zu konfigurieren:

**Omnibus (Preisrichtlinie)**

1. Aktivieren Sie das Omnibus-Modul
2. Stellen Sie den Preisverfolgungszeitraum ein (Standard 30 Tage)
3. Waehlen Sie das Anzeigeformat fuer den niedrigsten Preis
4. Speichern Sie die Aenderungen

Das Plugin beginnt automatisch mit der Aufzeichnung der Preishistorie ab dem Moment der Modulaktivierung.

**GPSR (Produktsicherheit)**

1. Aktivieren Sie das GPSR-Modul
2. Ergaenzen Sie die Standard-Herstellerdaten in den globalen Einstellungen
3. Fuer einzelne Produkte - bearbeiten Sie die Daten im Tab "GPSR" auf der Produktbearbeitungsseite

**Rechtsseiten**

1. Aktivieren Sie das Rechtsseiten-Modul
2. Verwenden Sie den Generator zum Erstellen von AGB, Datenschutzerklaerung und Widerrufsbelehrung
3. Weisen Sie die generierten Seiten unter **WooCommerce > Einstellungen > Erweitert > Seiteneinstellungen** zu

### Preise und Produktinformationen

Gehen Sie zu **WooCommerce > Polski > Preise**, um zu konfigurieren:

**Grundpreise**

1. Aktivieren Sie das Grundpreismodul
2. Waehlen Sie die Standard-Mengeneinheit (kg, l, m, Stk.)
3. Fuellen Sie auf der Produktseite das Feld "Basismenge" und "Mengeneinheit" aus

Konfigurationsbeispiel im Produkteditor:

```
Produktpreis: 15,99 PLN
Basismenge: 500
Mengeneinheit: g
Referenzeinheit: kg

Ergebnis: 15,99 PLN / 500g (31,98 PLN/kg)
```

**Lieferzeit**

1. Aktivieren Sie das Lieferzeitmodul
2. Stellen Sie die Standard-Lieferzeit ein (z.B. "1-3 Werktage")
3. Optional - stellen Sie individuelle Zeiten fuer einzelne Produkte ein

### Kasse und Bestellungen

Gehen Sie zu **WooCommerce > Polski > Kasse**, um zu konfigurieren:

**Bestellbutton**

1. Aktivieren Sie das Modul
2. Der Standardtext lautet "Zamawiam z obowiazkiem zaplaty" (Zahlungspflichtig bestellen)
3. Sie koennen den Text anpassen, er muss jedoch die Anforderungen des Art. 17 des Verbraucherrechtegesetzes erfuellen

**Rechtliche Checkboxen**

1. Aktivieren Sie das Checkbox-Modul
2. Fuegen Sie die erforderlichen Zustimmungen hinzu (AGB, Datenschutzerklaerung)
3. Konfigurieren Sie den Inhalt jeder Checkbox, einschliesslich Links zu Rechtsseiten
4. Markieren Sie, welche Checkboxen obligatorisch sind

Konfigurationsbeispiel fuer eine Checkbox:

```
Label: agb
Inhalt: Ich habe die [AGB] gelesen und akzeptiere deren Bestimmungen.
Erforderlich: Ja
Link: /agb/
Position: Vor dem Bestellbutton
```

**NIP-Suche**

1. Aktivieren Sie das NIP-Modul
2. Das NIP-Feld erscheint automatisch auf der Kassenseite
3. Nach Eingabe der Steuernummer und Klick auf "Pruefen" werden die Firmendaten automatisch aus der GUS-Datenbank ergaenzt

### Lebensmittel

Diese Module sind fuer Shops gedacht, die Lebensmittel verkaufen. Gehen Sie zu **WooCommerce > Polski > Lebensmittel**.

1. Aktivieren Sie die benoetigten Module (Naehrwerte, Allergene, Nutri-Score)
2. Auf der Produktbearbeitungsseite erscheinen neue Tabs zum Ergaenzen der Daten
3. Die Daten werden automatisch auf der Produktseite im Shop angezeigt

### Shop-Module

Gehen Sie zu **WooCommerce > Polski > Shop**, um zusaetzliche Funktionen zu aktivieren:

- Wunschliste, Produktvergleich, Schnellansicht - aktivieren und Aussehen anpassen
- AJAX-Suche - aktivieren und Anzahl der angezeigten Ergebnisse konfigurieren
- AJAX-Filter - aktivieren und Filterattribute auswaehlen
- Slider und Labels - Stil und Verhalten konfigurieren

---

## Globale Einstellungen

Im Tab **WooCommerce > Polski > Einstellungen** finden Sie globale Optionen:

### Firmendaten

Ergaenzen Sie die Grunddaten Ihres Unternehmens:

- Firmenname
- Steuernummer (NIP)
- REGON-Nummer
- Sitzadresse
- Kontakt-E-Mail-Adresse
- Telefonnummer

Diese Daten werden von verschiedenen Modulen verwendet (Rechtsseiten, GPSR, DSA).

### Leistung

- **Ressourcenladen** - CSS und JS werden nur auf Seiten geladen, wo sie benoetigt werden
- **Cache** - das Plugin nutzt die WordPress Transients API zum Cachen von Daten
- **Minifizierung** - Frontend-Ressourcen sind minifiziert

### Kompatibilitaet

Wenn Sie ein nicht-standardmaessiges Theme oder Plugins verwenden, die Konflikte verursachen:

1. Gehen Sie zu **WooCommerce > Polski > Einstellungen > Kompatibilitaet**
2. Aktivieren Sie den Kompatibilitaetsmodus fuer problematische Module
3. Passen Sie die Hook-Prioritaeten an, wenn Elemente in der falschen Reihenfolge angezeigt werden

---

## Konfigurationsverifizierung

Pruefen Sie nach der Modulkonfiguration, ob alles funktioniert:

1. **Compliance-Dashboard** - gehen Sie zu **WooCommerce > Polski > Konformitaet** und pruefen Sie, ob alle Indikatoren gruen sind
2. **Produktseite** - oeffnen Sie ein beliebiges Produkt im Shop und pruefen Sie, ob neue Elemente angezeigt werden (Omnibus-Preis, Lieferzeit, GPSR-Daten)
3. **Kassenseite** - geben Sie eine Testbestellung auf und pruefen Sie, ob Checkboxen und Button korrekt sind
4. **Rechtsseiten** - oeffnen Sie AGB und Datenschutzerklaerung und pruefen Sie deren Inhalt

Sie koennen auch ein automatisches Audit starten: **WooCommerce > Polski > Werkzeuge > Shop-Audit**.

---

## Naechste Schritte

- [Konfigurationsassistent](/de/getting-started/wizard/) - automatische Konfiguration der wichtigsten Einstellungen
- [Compliance-Dashboard](/de/tools/compliance-dashboard/) - Ueberwachung des Rechtskonformitaetsstatus
- [Shop-Audit](/de/tools/site-audit/) - automatische Konfigurationspruefung

Haben Sie eine Frage? Schreiben Sie auf [GitHub Discussions](https://github.com/wppoland/polski/discussions). Haben Sie einen Fehler gefunden? Melden Sie ihn auf [GitHub Issues](https://github.com/wppoland/polski/issues).

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
