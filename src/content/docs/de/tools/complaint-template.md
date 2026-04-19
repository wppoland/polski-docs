---
title: Reklamationsformular (formularz reklamacyjny)
description: Druckfertiges Reklamationsformular kompatibel mit dem polnischen Verbraucherrechtegesetz. Verkaeuferabschnitt automatisch aus dem Setup-Assistenten befuellt, Kunden-, Produkt-, Mangel- und Abhilfeabschnitte bleiben fuer den Kunden leer.
---

Das Modul **Reklamationsformular** rendert ein druckfertiges Reklamationsformular (polnisch: formularz reklamacyjny). Die Struktur folgt den Erwartungen des polnischen Verbraucherrechtegesetzes und der weit verbreiteten Vorlage der UOKiK (Amt fuer Wettbewerb und Verbraucherschutz). Der Verkaeuferabschnitt wird automatisch aus den Daten des Setup-Assistenten befuellt; Kunden-, Produkt-, Mangel- und Abhilfeabschnitte bleiben fuer den Kunden leer.

:::caution
Dies ist eine allgemeine Startvorlage, keine Rechtsberatung. Fuer shopspezifische Klauseln (digitale Dienste, Abonnements, branchenspezifische Regeln) konsultieren Sie einen Anwalt.
:::

## Abschnitte

1. **Verkaeufer** - Name, Adresse, NIP, E-Mail (aus `polski_general`)
2. **Kunde** - Name, Adresse, E-Mail, Telefon (leere Felder)
3. **Bestellung und Produkt** - Bestellnummer, Kaufdatum, Produktname
4. **Mangel / Nichtkonformitaet** - Beschreibung, Erkennungsdatum
5. **Gewuenschte Abhilfe** - Checkbox-Liste: Reparatur / Ersatz / Preisminderung / Ruecktritt
6. **Bankkonto fuer Rueckerstattung** - IBAN
7. **Datum und Unterschrift**

## Drei Zugriffswege

| Kanal       | Nutzung                                                                           |
| ----------- | --------------------------------------------------------------------------------- |
| Shortcode   | `[polski_complaint_template]` auf beliebiger Seite oder in einem Beitrag          |
| Admin-Seite | **Polski > Reklamationsformular** - Vorschau + Ein-Klick-HTML-Download            |
| Frontend    | Einbindung per Shortcode auf einer "Reklamationen"-Seite, die vom Regulamin aus verlinkt ist |

## Admin-Download

**Polski > Reklamationsformular > Download as HTML** liefert:

```
Content-Type: text/html; charset=utf-8
Content-Disposition: attachment; filename="polski-complaint-template-YYYYMMDD.html"
```

Die heruntergeladene Datei ist ein eigenstaendiges HTML-Dokument mit eingebettetem druckfreundlichem Stylesheet. Im Browser oeffnen und per **Drucken > Als PDF speichern** entsteht ein PDF, das der Kunde digital oder auf Papier ausfuellen kann.

## Layout

Druckfreundliches CSS:
- Max. Breite 780 px
- 14 px Grundschriftgroesse
- `@media print` entfernt Seitenraender, damit das Formular auf A4 passt
- Checkboxen gerendert per Unicode `&#9744;` - keine Bilder, keine externen Assets

## Rechtlicher Rahmen

Das Template enthaelt einen Kopftext:

> Reichen Sie dieses Formular innerhalb der gesetzlichen Gewaehrleistungsfrist ein. Der Verkaeufer ist verpflichtet, innerhalb von 14 Tagen zu antworten.

Die 14-Tage-Frist ist die uebliche Antwortfrist nach dem polnischen Verbraucherrechtegesetz - nach deren Ablauf gilt die Reklamation ohne Antwort als akzeptiert.

## Anpassung

Die gesamte Vorlage ueberschreiben, indem der Shortcode im Theme ueberladen wird:

```php
remove_shortcode('polski_complaint_template');
add_shortcode('polski_complaint_template', function (): string {
    ob_start();
    include get_stylesheet_directory() . '/complaint-template.php';
    return (string) ob_get_clean();
});
```

Die mitgelieferte Variante ist bewusst minimal, damit Sie sie erweitern koennen (Logo, digitale Unterschrift, QR-Code-Link zum Online-Reklamationsformular).

## Berechtigungen

- Shortcode-Rendering: oeffentlich
- Admin-Download: `manage_woocommerce`
- Download-Nonce: `polski_complaint_download`

## Grenzen

- Einzige Sprache (standardmaessig Polnisch, Englisch ueber WordPress-Uebersetzungen)
- Kein Link zur ODR-Plattform - falls relevant, manuell hinzufuegen
- Keine CRM-/HelpDesk-Integration - der Kunde sendet das Formular per E-Mail oder Post zurueck
- Kein Ersatz fuer eine massgeschneiderte Reklamationsrichtlinie in Ihrem Regulamin
