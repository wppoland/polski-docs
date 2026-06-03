---
title: Eigene Felder im Checkout
description: Hinzufügen, Ändern und Neuanordnen von Feldern des Bestellformulars mit Validierung und Anzeige im Admin-Panel und in E-Mails.
---

Das Modul Custom Checkout Fields ermöglicht es, eigene Felder zum Bestellformular von WooCommerce hinzuzufügen.

## Aktivierung

Gehe zu **WooCommerce > Polski > Module** und aktiviere das Modul **Custom Checkout Fields** im Bereich "Checkout".

## Felder verwalten

Gehe nach der Aktivierung des Moduls zu **WooCommerce > Checkout Fields**, um Felder hinzuzufügen und zu bearbeiten.

## Verfügbare Feldtypen

| Typ | Beschreibung |
|-----|------|
| Text | Textfeld |
| Textarea | Mehrzeiliges Textfeld |
| Select | Dropdown-Liste |
| Checkbox | Auswahlfeld |
| Radio | Radio-Buttons |
| Number | Zahlenfeld |
| Email | E-Mail-Feld mit Formatvalidierung |
| Date | Datumsfeld |
| Phone | Telefonfeld |

## Konfiguration eines Felds

| Option | Beschreibung |
|-------|------|
| Aktiviert | Ob das Feld aktiv ist |
| Name (Meta-Key) | Der Meta-Schlüssel, unter dem der Wert gespeichert wird |
| Beschriftung | Der über dem Feld sichtbare Beschriftungstext |
| Typ | Feldtyp (aus der obigen Liste) |
| Bereich | Billing, Shipping oder Order notes |
| Erforderlich | Ob das Feld Pflicht ist |
| Priorität | Anzeigereihenfolge (niedriger = früher) |
| Platzhalter | Hinweistext im Feld |
| Optionen | Für select/radio: eine Option pro Zeile (Wert\|Beschriftung) |
| CSS-Klasse | CSS-Klassen (z. B. form-row-wide, form-row-first) |
| In E-Mails anzeigen | Feldwert in den Bestell-E-Mails |
| Im Admin anzeigen | Feldwert im Bestell-Panel |
| In Mein Konto anzeigen | Feldwert auf der Bestellseite des Kunden |
| Bedingt nach Versand | Feld nur für eine bestimmte Versandmethode anzeigen |

## Optionen für Select/Radio

Gib die Optionen eine pro Zeile im folgenden Format ein:
```
wert|Beschriftung
```

Beispiel:
```
firma|Unternehmen
osoba|Privatperson
```

## Anzeige der Werte

Die Werte eigener Felder werden automatisch angezeigt:
- Im Administrations-Panel der Bestellung (unter der Rechnungs-/Versandadresse)
- In den Bestell-E-Mails
- Auf der Seite "Mein Konto > Bestelldetails"

## Validierung

- Pflichtfelder - Validierung bei der Bestellaufgabe
- E-Mail-Felder - Validierung des Adressformats
- Der Wert wird als bereinigter Text im Bestellmeta gespeichert
