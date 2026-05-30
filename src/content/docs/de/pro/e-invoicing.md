---
title: "E-Rechnung: PEPPOL/UBL und JPK_FA"
description: "Exportieren Sie Rechnungen in Polski PRO for WooCommerce nach PEPPOL/UBL (EN 16931) direkt vom Bestellbildschirm und erstellen Sie einen JPK_FA(3)-Bericht für einen Zeitraum für die Buchhaltung."
---

Polski PRO bietet neben KSeF zwei Exportformate für Rechnungen: **PEPPOL / UBL** (eine strukturierte Rechnung gemäß EN 16931, für den B2B- und öffentlichen Sektor in der EU) und **JPK_FA(3)** (ein Rechnungsbericht für die polnische Steuerverwaltung).

:::caution
Die Dateien werden aus den in Ihrem Shop gespeicherten Rechnungsdaten erzeugt. Validieren Sie vor dem Produktiveinsatz die PEPPOL/UBL-Datei mit dem offiziellen PEPPOL-Validator und die JPK_FA-Datei gegen das XSD-Schema des Finanzministeriums. Das Modul stellt den Export bereit, keine Buchhaltungs- oder Rechtsberatung.
:::

## PEPPOL / UBL (Export aus einer Bestellung)

Der UBL-Export ermöglicht es Ihnen, eine Rechnung als XML-Datei gemäß **EN 16931 / PEPPOL BIS Billing 3.0** herunterzuladen - dem Format, das für die strukturierte Rechnungsstellung im B2B- und öffentlichen Sektor in der gesamten Europäischen Union verwendet wird.

### So laden Sie herunter

Auf dem Bestellbearbeitungsbildschirm (`WooCommerce › Orders › [order]`) erscheint eine **PEPPOL / UBL (XML)**-Metabox. Wenn für die Bestellung bereits eine Rechnung existiert, bietet die Box eine Schaltfläche zum Herunterladen an:

- die Schaltfläche **UBL: [invoice number]** lädt die XML-Datei der Rechnung herunter,
- wenn noch keine Rechnung ausgestellt wurde, zeigt die Box **No invoice yet** an - erstellen Sie zuerst die Rechnung.

### Was die Datei enthält

Die UBL-Datei bildet die Rechnung ab: die Transaktionsparteien (Verkäufer und Käufer mit ihren Steuer-IDs), die nach Steuersatz aufgeschlüsselten Mehrwertsteuer-Zwischensummen, die Geldbeträge und die Rechnungspositionen.

## JPK_FA (Bericht für einen Zeitraum)

Der **JPK_FA(3)**-Bericht erzeugt eine XML-Datei der innerhalb eines ausgewählten Zeitraums ausgestellten Rechnungen, in der von der polnischen Steuerverwaltung geforderten Struktur.

### So erstellen Sie ihn

Gehen Sie zu `WooCommerce › Polski › JPK_FA report`. Das Formular enthält:

- **From** - das Startdatum des Zeitraums,
- **To** - das Enddatum des Zeitraums,
- die Schaltfläche **Download JPK_FA XML** lädt den Bericht herunter.

Der Bericht umfasst die im ausgewählten Zeitraum ausgestellten Rechnungen, mit einem Kopf, Unternehmensdaten, Rechnungen mit nach Steuersatz aufgeschlüsselter Mehrwertsteuer, Kontrollsummen und Positionen.

### Verkäuferdaten

Die Verkäuferdaten im Bericht werden aus den allgemeinen Einstellungen des Plugins gelesen (Steuer-ID, Name und Adresse des Unternehmens). Füllen Sie diese aus, bevor Sie den Bericht erstellen, damit die Datei die korrekten Unternehmensdaten enthält.

:::note
JPK_FA ist ein Rechnungsbericht. Er ist nicht dasselbe wie JPK_V7 (Mehrwertsteueraufzeichnungen) oder die Übermittlung an KSeF - diese werden separat behandelt.
:::
