---
title: GPSR - Produktsicherheit
description: Konfiguration der GPSR-Felder (General Product Safety Regulation) in Polski for WooCommerce - Hersteller, Importeur, verantwortliche Person in der EU, Identifikatoren, Warnhinweise und Anleitungen.
---

Die GPSR-Verordnung (General Product Safety Regulation, EU 2023/988) gilt seit dem 13. Dezember 2024. Sie verpflichtet Verkaeufer, detaillierte Informationen zur Sicherheit von Produkten, die in der Europaeischen Union verkauft werden, anzugeben. Polski for WooCommerce liefert ein vollstaendiges Set an Produktfeldern, eine Statusspalte sowie CSV-Import/Export-Werkzeuge, die es ermoeglichen, diese Anforderungen ohne zusaetzliche Plugins zu erfuellen.

## GPSR-Anforderungen

Jedes nicht-lebensmittelbezogene Produkt, das in der EU verkauft wird, muss enthalten:

1. **Herstellerdaten** - Name, Adresse, Kontaktdaten
2. **Importeurdaten** - wenn der Hersteller seinen Sitz ausserhalb der EU hat
3. **Verantwortliche Person in der EU** - erforderlich fuer Produkte von ausserhalb der EU
4. **Produktidentifikatoren** - Chargennummer, Seriennummer, EAN/GTIN-Code
5. **Warnhinweise** - Informationen ueber Gefahren und Altersbeschraenkungen
6. **Sicherheitshinweise** - Regeln zur sicheren Verwendung
7. **Fotos/Dokumente** - optionale Anhaenge (Sicherheitsdatenblaetter, Zertifikate)
8. **Risikokategorie** - Klassifizierung des Produktrisikos

## Konfiguration der GPSR-Felder

Die GPSR-Felder finden Sie bei der WooCommerce-Produktbearbeitung im Tab **Polski - GPSR**. Jedes Feld ist optional, aber die Verordnung verlangt das Ausfuellen aller auf das jeweilige Produkt zutreffenden Felder.

### Hersteller

Fuellen Sie die vollstaendigen Herstellerdaten aus:

- Firmenname
- Adresse (Strasse, PLZ, Stadt, Land)
- E-Mail-Adresse
- Telefonnummer
- Website

### Importeur

Pflichtfeld, wenn der Hersteller seinen Sitz ausserhalb der EU hat. Geben Sie dieselben Datenkategorien wie beim Hersteller an.

### Verantwortliche Person in der EU

Seit dem 13. Dezember 2024 muss jedes nicht-lebensmittelbezogene Produkt, das in der EU von einem Unternehmen ausserhalb der EU verkauft wird, eine benannte verantwortliche Person mit Sitz in der Union haben. Geben Sie an:

- Firmenname oder Vor- und Nachname
- Adresse in der EU
- Kontaktdaten (E-Mail, Telefon)

### Produktidentifikatoren

- **Chargennummer (LOT)** - Kennung der Produktionscharge
- **Seriennummer** - eindeutige Kennung des Exemplars
- **EAN/GTIN** - Produktstrichcode
- **Modellnummer** - Modellbezeichnung

### Warnhinweise und Einschraenkungen

Textfeld fuer Informationen zu:

- Nutzungsgefahren
- Altersbeschraenkungen (z.B. "Nicht geeignet fuer Kinder unter 3 Jahren")
- Anforderungen an die Aufsicht durch Erwachsene
- Gefaehrlichen Substanzen

### Sicherheitshinweise

Feld fuer Hinweise zu:

- Korrekter Montage und Installation
- Sicherer Verwendung
- Wartung und Lagerung
- Vorgehen bei Unfaellen

## GPSR-Statusspalte

In der Produktliste im Administrationspanel (**Produkte > Alle Produkte**) fuegt das Plugin eine Spalte **GPSR** hinzu, die den Ausfuellstatus anzeigt:

- Gruenes Symbol - alle erforderlichen Felder ausgefuellt
- Oranges Symbol - teilweise ausgefuellt
- Rotes Symbol - keine GPSR-Daten

Die Spalte ermoeglicht die schnelle Identifizierung von Produkten, deren Daten vor Inkrafttreten der Verordnung ergaenzt werden muessen.

## CSV-Import und -Export

### Export

Beim WooCommerce-Produktexport (**Produkte > Exportieren**) fuegt das Plugin automatisch GPSR-Spalten zur CSV-Datei hinzu:

- `gpsr_manufacturer_name`
- `gpsr_manufacturer_address`
- `gpsr_manufacturer_email`
- `gpsr_manufacturer_phone`
- `gpsr_manufacturer_url`
- `gpsr_importer_name`
- `gpsr_importer_address`
- `gpsr_importer_email`
- `gpsr_eu_responsible_name`
- `gpsr_eu_responsible_address`
- `gpsr_eu_responsible_email`
- `gpsr_identifiers_lot`
- `gpsr_identifiers_serial`
- `gpsr_identifiers_ean`
- `gpsr_identifiers_model`
- `gpsr_warnings`
- `gpsr_instructions`

### Import

Bereiten Sie eine CSV-Datei mit den entsprechenden Spaltenkoepfen vor (identisch wie beim Export). Der Import erfolgt ueber den Standard-WooCommerce-Pfad: **Produkte > Importieren**.

Tipp: Exportieren Sie zuerst einige Produkte, um eine CSV-Vorlage mit korrekten Spaltenkoepfen zu erhalten.

## Shortcode

Verwenden Sie den Shortcode `[polski_gpsr]`, um GPSR-Informationen auf der Produktseite oder an einer beliebigen Stelle der Website anzuzeigen.

### Grundlegende Verwendung

```
[polski_gpsr]
```

Zeigt GPSR-Daten des aktuellen Produkts an (funktioniert auf der WooCommerce-Produktseite).

### Mit Produktangabe

```
[polski_gpsr product_id="123"]
```

Zeigt GPSR-Daten fuer das Produkt mit der angegebenen ID an.

### Beispiel-Ausgabe

Der Shortcode generiert eine formatierte Tabelle mit Abschnitten:

| Abschnitt | Inhalt |
|--------|-----------|
| Hersteller | Name, Adresse, E-Mail, Telefon, Website |
| Importeur | Name, Adresse, E-Mail (falls zutreffend) |
| Verantwortliche Person in der EU | Name, Adresse, Kontaktdaten |
| Identifikatoren | LOT, Seriennummer, EAN, Modell |
| Warnhinweise | Warntext |
| Anleitungen | Sicherheitshinweistext |

## Massenweise Datenpflege

Wenn viele Produkte vom gleichen Hersteller stammen, ist der effizienteste Weg:

1. Produkte als CSV exportieren
2. Herstellerspalten fuer alle Zeilen ausfuellen (Kopieren/Einfuegen in der Tabellenkalkulation)
3. Aktualisierte CSV-Datei importieren

## Fehlerbehebung

**GPSR-Felder erscheinen nicht in der Produktbearbeitung**
Stellen Sie sicher, dass das GPSR-Modul in den Plugin-Einstellungen aktiviert ist: **WooCommerce > Einstellungen > Polski > Module**.

**Statusspalte wird nicht in der Produktliste angezeigt**
Klicken Sie auf "Ansicht anpassen" oben rechts auf der Produktlistenseite und aktivieren Sie die GPSR-Spalte.

**Daten werden nicht aus CSV importiert**
Pruefen Sie, ob die Spaltenkoepfe in der CSV-Datei genau dem Exportformat entsprechen. Spaltennamen sind gross-/kleinschreibungssensitiv.

## Weitere Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
