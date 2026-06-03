---
title: Plugin-Konfiguration
description: Erste Schritte nach der Installation des Plugins Polski for WooCommerce. Module aktivieren, Compliance-Dashboard, Einstellungsuebersicht und Anpassung an die Beduerfnisse des Shops.
---

## Hauptpanel des Plugins

Nach der Aktivierung des Plugins gehe zu **WooCommerce > Polski**. Du siehst ein Hauptpanel mit folgenden Bereichen:

- **Compliance-Status** - schneller Ueberblick, welche rechtlichen Anforderungen erfuellt sind
- **Aktive Module** - Liste der aktivierten Module mit Links zu ihren Einstellungen
- **Erforderliche Massnahmen** - Hinweise auf fehlende Konfigurationen
- **Schnelllinks** - Verweise zu den wichtigsten Einstellungen

![Modul-Dashboard von Polski for WooCommerce](../../../../assets/screenshots/screenshot-1-modules-dashboard.png)

:::tip[Konfigurationsassistent]
Wenn du gerade erst anfaengst, nutze den [Konfigurationsassistenten](getting-started/wizard/). Er fuehrt dich Schritt fuer Schritt durch die wichtigsten Einstellungen. Du kannst ihn jederzeit erneut starten.
:::

---

## Module aktivieren und deaktivieren

Das Plugin arbeitet modular - nach der Installation sind alle Module deaktiviert. Du aktivierst nur die, die du brauchst.

### So aktivierst du ein Modul

1. Gehe zu **WooCommerce > Polski > Module**
2. Finde das gewuenschte Modul in der Liste
3. Klicke auf den Schalter neben dem Modulnamen, um es zu aktivieren
4. Klicke unten auf der Seite auf **Aenderungen speichern**

### So deaktivierst du ein Modul

Klicke auf den Schalter bei einem aktiven Modul, um es zu deaktivieren. Das Deaktivieren loescht keine Daten - du kannst das Modul ohne Verlust der Einstellungen wieder aktivieren.

### Empfohlene Module fuer den Start

Fuer einen typischen polnischen Shop aktiviere mindestens diese Module:

| Modul | Warum es wichtig ist |
|-------|-------------------|
| Omnibus | Gesetzlich vorgeschrieben - Anzeige der Preishistorie |
| Bestellbutton | Gesetzlich vorgeschrieben - "Zahlungspflichtig bestellen" |
| Rechtliche Checkboxen | Gesetzlich vorgeschrieben - Einwilligungen bei der Bestellung |
| Rechtliche Seiten | AGB und Datenschutzerklaerung |
| Widerrufsrecht | Gesetzlich vorgeschrieben - Formular und Widerrufsbelehrung |
| Lieferzeit | Empfohlen - geschaetzte Lieferzeit auf der Produktseite |
| GPSR | Vorgeschrieben ab 13.12.2024 - Produktsicherheitsdaten |

---

## Compliance-Dashboard

Hier pruefst du, ob dein Shop die rechtlichen Anforderungen erfuellt. Gehe zu **WooCommerce > Polski > Compliance**.

### Statusindikatoren

Jede rechtliche Anforderung hat einen von drei Status:

- **Konform** (gruen) - Anforderung erfuellt, Konfiguration vollstaendig
- **Erfordert Aufmerksamkeit** (gelb) - Modul aktiviert, aber es fehlen Teile der Einstellungen
- **Nicht konform** (rot) - Modul deaktiviert oder Konfiguration unvollstaendig

### Checkliste

Das Dashboard zeigt eine Checkliste mit den auszufuehrenden Schritten:

```
[x] Bestellbutton - rechtskonformer Text
[x] Omnibus - Anzeige der Preishistorie aktiviert
[ ] AGB - AGB-Seite ist nicht zugewiesen
[ ] Datenschutzerklaerung - Seite ist nicht zugewiesen
[ ] GPSR - fehlende Herstellerdaten bei 12 Produkten
```

Klicke auf ein beliebiges Listenelement, um direkt zu den entsprechenden Einstellungen zu gelangen.

---

## Konfiguration einzelner Modulgruppen

### Rechtliche Anforderungen

Gehe zu **WooCommerce > Polski > Rechtliche Konformitaet**, um Folgendes zu konfigurieren:

**Omnibus (Preisangabenrichtlinie)**

1. Aktiviere das Modul Omnibus
2. Lege den Zeitraum fuer die Preisverfolgung fest (standardmaessig 30 Tage)
3. Waehle das Anzeigeformat des niedrigsten Preises
4. Speichere die Aenderungen

Das Plugin beginnt, die Preishistorie ab dem Moment der Aktivierung des Moduls zu erfassen.

**GPSR (Produktsicherheit)**

1. Aktiviere das Modul GPSR
2. Trage die Daten des Standardherstellers in den globalen Einstellungen ein
3. Fuer einzelne Produkte - bearbeite die Daten im Reiter "GPSR" auf der Produktbearbeitungsseite

**Rechtliche Seiten**

1. Aktiviere das Modul fuer rechtliche Seiten
2. Nutze den Generator zur Erstellung von AGB, Datenschutzerklaerung und Ruecksendungsrichtlinie
3. Weise die generierten Seiten in **WooCommerce > Einstellungen > Erweitert > Seiteneinstellungen** zu

### Preise und Produktinformationen

Gehe zu **WooCommerce > Polski > Preise**, um Folgendes zu konfigurieren:

**Grundpreise**

1. Aktiviere das Modul Grundpreise
2. Waehle die Standardmasseinheit (kg, l, m, Stk.)
3. Trage auf der Produktseite die Felder "Basismenge" und "Masseinheit" ein

Beispielkonfiguration im Produkteditor:

```
Produktpreis: 15,99 zl
Basismenge: 500
Masseinheit: g
Referenzeinheit: kg

Ergebnis: 15,99 zl / 500g (31,98 zl/kg)
```

**Lieferzeit**

1. Aktiviere das Modul Lieferzeit
2. Lege die Standardlieferzeit fest (z. B. "1-3 Werktage")
3. Optional - lege eine individuelle Zeit fuer einzelne Produkte fest

### Kasse und Bestellungen

Gehe zu **WooCommerce > Polski > Kasse**, um Folgendes zu konfigurieren:

**Bestellbutton**

1. Aktiviere das Modul
2. Der Standardtext lautet "Zahlungspflichtig bestellen"
3. Du kannst den Text anpassen, er muss jedoch die Anforderungen von Art. 17 des Verbraucherrechtegesetzes erfuellen

**Rechtliche Checkboxen**

1. Aktiviere das Modul Checkboxen
2. Fuege die erforderlichen Einwilligungen hinzu (AGB, Datenschutzerklaerung)
3. Konfiguriere den Inhalt jeder Checkbox, einschliesslich der Links zu den rechtlichen Seiten
4. Markiere, welche Checkboxen verpflichtend sind

Beispielkonfiguration einer Checkbox:

```
Bezeichnung: AGB
Inhalt: Ich habe die [AGB] gelesen und akzeptiere ihre Bestimmungen.
Erforderlich: Ja
Link: /agb/
Position: Vor dem Bestellbutton
```

**NIP-Suche**

1. Aktiviere das Modul NIP
2. Das Feld NIP erscheint automatisch auf der Kassenseite
3. Nach Eingabe der NIP und Klick auf "Pruefen" werden die Firmendaten automatisch aus der GUS-Datenbank ergaenzt

### Lebensmittelprodukte

Module fuer Shops mit Lebensmitteln. Gehe zu **WooCommerce > Polski > Lebensmittel**.

1. Aktiviere die benoetigten Module (Naehrwerte, Allergene, Nutri-Score)
2. In der Produktbearbeitung erscheinen neue auszufuellende Reiter
3. Die Daten werden automatisch auf der Produktseite angezeigt

### Shop-Module

Gehe zu **WooCommerce > Polski > Shop**, um zusaetzliche Funktionen zu aktivieren:

- Wunschliste, Vergleich, Schnellansicht - aktiviere und passe das Aussehen an
- AJAX-Suche - aktiviere und konfiguriere die Anzahl der angezeigten Ergebnisse
- AJAX-Filter - aktiviere und waehle die Attribute zum Filtern aus
- Slider und Badges - konfiguriere Stil und Verhalten

---

## Globale Einstellungen

Im Reiter **WooCommerce > Polski > Einstellungen** findest du globale Optionen:

### Firmendaten

Trage die grundlegenden Daten deines Unternehmens ein:

- Firmenname
- NIP
- REGON
- Adresse des Firmensitzes
- Kontakt-E-Mail-Adresse
- Telefonnummer

Diese Daten werden von verschiedenen Modulen verwendet (rechtliche Seiten, GPSR, DSA).

### Leistung

- **Laden von Ressourcen** - CSS und JS werden nur auf den Seiten geladen, auf denen sie benoetigt werden
- **Cache** - das Plugin nutzt die Transients API von WordPress zum Cachen von Daten
- **Minifizierung** - Frontend-Ressourcen werden minifiziert

### Kompatibilitaet

Wenn das Theme oder ein anderes Plugin einen Konflikt verursacht:

1. Gehe zu **WooCommerce > Polski > Einstellungen > Kompatibilitaet**
2. Aktiviere den Kompatibilitaetsmodus fuer die problematischen Module
3. Passe die Hook-Prioritaeten an, falls Elemente in falscher Reihenfolge angezeigt werden

---

## Ueberpruefung der Konfiguration

Pruefe nach der Konfiguration, ob alles funktioniert:

1. **Compliance-Dashboard** - gehe zu **WooCommerce > Polski > Compliance** und pruefe, ob alle Indikatoren gruen sind
2. **Produktseite** - oeffne ein beliebiges Produkt im Shop und pruefe, ob die neuen Elemente angezeigt werden (Omnibus-Preis, Lieferzeit, GPSR-Daten)
3. **Kassenseite** - gib eine Testbestellung auf und pruefe, ob Checkboxen und Button korrekt sind
4. **Rechtliche Seiten** - oeffne die AGB und die Datenschutzerklaerung und pruefe ihren Inhalt

Du kannst auch ein automatisches Audit durchfuehren: **WooCommerce > Polski > Werkzeuge > Site-Audit**.

---

## Naechste Schritte

- [Konfigurationsassistent](getting-started/wizard/) - automatische Konfiguration der wichtigsten Einstellungen
- [Compliance-Dashboard](tools/compliance-dashboard/) - Ueberwachung des Status der rechtlichen Anforderungen
- [Site-Audit](tools/site-audit/) - automatische Ueberpruefung der Konfiguration

Hast du eine Frage? Schreib uns auf [GitHub Discussions](https://github.com/wppoland/polski/discussions). Hast du einen Fehler gefunden? Melde ihn auf [GitHub Issues](https://github.com/wppoland/polski/issues).

<div class="disclaimer">Diese Seite dient ausschliesslich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist eine Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
