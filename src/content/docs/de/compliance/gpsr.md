---
title: GPSR - Produktsicherheit
description: Konfiguration der GPSR-Felder (General Product Safety Regulation) in Polski for WooCommerce - Hersteller, Importeur, verantwortliche Person in der EU, Kennungen, Warnungen und Anleitungen.
---

Die Verordnung GPSR (General Product Safety Regulation, EU 2023/988) gilt seit dem 13. Dezember 2024. Sie verlangt die Angabe von Informationen zur Sicherheit von Produkten, die in der EU verkauft werden. Polski for WooCommerce fügt Produktfelder, eine Statusspalte und CSV-Import/-Export hinzu, alles was Sie brauchen, ohne zusätzliche Plugins.

## GPSR-Anforderungen

Jedes Non-Food-Produkt, das in der EU verkauft wird, muss enthalten:

1. **Herstellerdaten** - Name, Adresse, Kontaktdaten
2. **Importeurdaten** - falls der Hersteller seinen Sitz außerhalb der EU hat
3. **Verantwortliche Person in der EU** - erforderlich für Produkte von außerhalb der EU
4. **Produktkennungen** - Chargennummer, Seriennummer, EAN/GTIN-Code
5. **Warnungen** - Informationen über Gefahren und Altersbeschränkungen
6. **Sicherheitshinweise** - Regeln für die sichere Nutzung
7. **Bilder/Dokumente** - optionale Anhänge (Sicherheitsdatenblätter, Zertifikate)
8. **Risikokategorie** - Klassifizierung des Risikoniveaus des Produkts

## Konfiguration der GPSR-Felder

Die GPSR-Felder finden Sie in der Produktbearbeitung, im Reiter **Polski - GPSR**. Jedes Feld ist optional, füllen Sie aber alle aus, die das jeweilige Produkt betreffen.

![GPSR-Felder im WooCommerce-Produkteditor](../../../../assets/screenshots/screenshot-2-gpsr-product-editor.png)

### Hersteller

Füllen Sie die vollständigen Herstellerdaten aus:

- Firmenname
- Adresse (Straße, Postleitzahl, Stadt, Land)
- E-Mail-Adresse
- Telefonnummer
- Website

### Importeur

Erforderlich, wenn der Hersteller seinen Sitz außerhalb der EU hat. Geben Sie dieselben Daten wie für den Hersteller an.

### Verantwortliche Person in der EU

Jedes Non-Food-Produkt von einem Akteur außerhalb der EU muss eine verantwortliche Person mit Sitz in der Union haben. Geben Sie an:

- Firmenname oder Vor- und Nachname
- Adresse in der EU
- Kontaktdaten (E-Mail, Telefon)

### Produktkennungen

- **Chargennummer (LOT)** - Kennung der Produktionscharge
- **Seriennummer** - eindeutige Kennung des Exemplars
- **EAN/GTIN** - Barcode des Produkts
- **Modellnummer** - Modellbezeichnung

### Warnungen und Einschränkungen

Textfeld für Informationen über:

- Gefahren bei der Nutzung
- Altersbeschränkungen (z. B. "Nicht geeignet für Kinder unter 3 Jahren")
- Anforderungen an die Aufsicht durch Erwachsene
- Gefährliche Substanzen

### Sicherheitshinweise

Feld für Anweisungen zu:

- Korrekter Montage und Installation
- Sicherer Nutzung
- Wartung und Lagerung
- Vorgehen im Falle eines Unfalls

## GPSR-Statusspalte

In der Produktliste (**Produkte > Alle Produkte**) fügt das Plugin eine Spalte **GPSR** mit dem Ausfüllstatus hinzu:

- Grünes Symbol - alle erforderlichen Felder ausgefüllt
- Oranges Symbol - teilweise ausgefüllt
- Rotes Symbol - keine GPSR-Daten

Die Spalte ermöglicht es, Produkte schnell zu finden, deren Daten ergänzt werden müssen.

## CSV-Import und -Export

### Export

Beim Produktexport (**Produkte > Exportieren**) fügt das Plugin GPSR-Spalten zur CSV-Datei hinzu:

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

Bereiten Sie eine CSV-Datei mit denselben Kopfzeilen wie beim Export vor. Importieren Sie über **Produkte > Importieren**.

Tipp: Exportieren Sie zuerst einige Produkte, Sie erhalten eine CSV-Vorlage mit den korrekten Kopfzeilen.

## Shortcode

Verwenden Sie den Shortcode `[polski_gpsr]`, um GPSR-Informationen auf der Produktseite oder an einer beliebigen Stelle der Website anzuzeigen.

### Grundlegende Verwendung

```
[polski_gpsr]
```

Zeigt die GPSR-Daten des aktuellen Produkts an (funktioniert auf der WooCommerce-Produktseite).

### Mit Produktangabe

```
[polski_gpsr product_id="123"]
```

Zeigt die GPSR-Daten für das Produkt mit der angegebenen ID an.

### Beispielergebnis

Der Shortcode erzeugt eine formatierte Tabelle mit Abschnitten:

| Abschnitt | Inhalt |
|--------|-----------|
| Hersteller | Name, Adresse, E-Mail, Telefon, Website |
| Importeur | Name, Adresse, E-Mail (falls zutreffend) |
| Verantwortliche Person in der EU | Name, Adresse, Kontaktdaten |
| Kennungen | LOT, Seriennummer, EAN, Modell |
| Warnungen | Warntext |
| Anleitungen | Text der Sicherheitshinweise |

## Massenweise Datenergänzung

Wenn viele Produkte denselben Hersteller haben, ist die schnellste Methode:

1. Produkte als CSV exportieren
2. Die Herstellerspalten für alle Zeilen ausfüllen (Kopieren-Einfügen in der Tabellenkalkulation)
3. Die aktualisierte CSV-Datei importieren

## Fehlerbehebung

**Die GPSR-Felder erscheinen nicht in der Produktbearbeitung**
Stellen Sie sicher, dass das GPSR-Modul in den Plugin-Einstellungen aktiviert ist: **WooCommerce > Einstellungen > Polski > Module**.

**Die Statusspalte wird nicht in der Produktliste angezeigt**
Klicken Sie auf die Schaltfläche "Optionen anzeigen" oben rechts auf der Produktlistenseite und markieren Sie die Spalte GPSR.

**Daten werden nicht aus der CSV importiert**
Prüfen Sie, ob die Spaltenüberschriften in der CSV-Datei genau dem Exportformat entsprechen. Die Spaltennamen unterscheiden Groß- und Kleinschreibung.

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
