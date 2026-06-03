---
title: Reklamationsformular zum Ausdrucken
description: Druckfertiges Reklamationsformular - der Verkäuferabschnitt wird automatisch aus den Daten des Assistenten ausgefüllt, die Abschnitte für Käufer und Mangel bleiben zum Ausfüllen leer.
---

Das Modul **Reklamationsformular** erzeugt ein druckfertiges Reklamationsdokument (Reklamationsformular), das der vom Verbraucherrechtegesetz geforderten Struktur entspricht und dem allgemein verwendeten UOKiK-Muster folgt. Der Verkäuferabschnitt wird vorab mit den Daten aus dem Konfigurationsassistenten ausgefüllt, die Abschnitte für Käufer, Produkt, Mangelbeschreibung und gewünschte Lösung bleiben leer.

:::caution
Dies ist eine generische Startvorlage. Sie hilft, die Informationspflichten zu erfüllen, ersetzt aber keine rechtliche Beratung für Shops mit untypischer Branche (z. B. digitale Dienste, Lebensmittel, B2B).
:::

## Entry points

| Verwendungsweise | Wo                                                     |
| ---------------- | ------------------------------------------------------ |
| Shortcode        | `[polski_complaint_template]` - bettet in den Seiteninhalt ein |
| Admin preview    | **Polski > Complaint template** - Vorschau und Download |
| HTML-Download    | Schaltfläche **Download as HTML** - `text/html` mit Header `Content-Disposition: attachment` |

## Abschnitte des Formulars

Das gerenderte Dokument besteht aus den folgenden Abschnitten:

| Abschnitt             | Quelle                                             | Bearbeitbar |
| --------------------- | -------------------------------------------------- | ---------- |
| Seller                | `polski_general.company_name/address/nip/email`    | Auto       |
| Customer              | Vor- und Nachname, Adresse, E-Mail, Telefon        | Leere Felder |
| Order and product     | Bestellnummer, Kaufdatum, Produktname              | Leere Felder |
| Defect                | Mangelbeschreibung, Entdeckungsdatum               | Leere Felder |
| Requested remedy      | Checkboxen: Reparatur, Austausch, Minderung, Rücktritt | Anzukreuzen |
| Bank account          | IBAN für die Rückerstattung                        | Leeres Feld |
| Signature             | Datum und Unterschrift                             | Leeres Feld |

## Automatisch ausgefüllter Verkäuferabschnitt

Aus der Option `polski_general` werden vier Felder bezogen:

| Optionsschlüssel  | Dokumentfeld          |
| ----------------- | --------------------- |
| `company_name`    | Name des Verkäufers   |
| `company_address` | Adresse               |
| `company_nip`     | NIP (mit Präfix)      |
| `company_email`   | Kontakt-E-Mail        |

Wenn keiner dieser Schlüssel ausgefüllt ist, enthält der Abschnitt Seller eine leere Zeile zum manuellen Ausfüllen, das Dokument bleibt strukturell trotzdem korrekt.

## Gewünschte Lösung

Der Käufer kreuzt eines von vier Rechten an, die sich aus Art. 43a-43g des Verbraucherrechtegesetzes ergeben:

- Reparatur (repair)
- Austausch (replacement)
- Preisminderung (price reduction) mit dem gewünschten Betrag
- Rücktritt vom Vertrag (withdrawal) mit Erstattung des vollen Preises

Alle vier Checkboxen werden als Zeichen `&#9744;` (leeres Unicode-Quadrat) gerendert, der Käufer füllt sie auf dem Ausdruck aus.

## Shortcode

```
[polski_complaint_template]
```

Eingebettet auf der Seite **Reklamationen** im Shop, der Kunde kann direkt über CSS `@media print` drucken. Der Shortcode nimmt keine Attribute an (alle Daten stammen aus `polski_general`).

## Download als eigenständiges HTML

Der Administrator kann das Formular als vollständige `.html`-Datei herunterladen (inklusive `<!doctype>`, druckfreundlichem Stil und meta charset). Nützlich, um es per E-Mail zu versenden oder als statische Datei auf einem Server abzulegen.

- Name: `polski-complaint-template-<YYYYMMDD>.html`
- Content-Type: `text/html; charset=utf-8`
- Schutz: Nonce `polski_complaint_download`, Capability `manage_woocommerce`

## Druckstil

Eingebettetes CSS im eigenständigen HTML:

```css
body { max-width: 780px; margin: 40px auto; line-height: 1.5; }
.field { border-bottom: 1px solid #999; padding: 6px 0; }
.row { display: flex; gap: 24px; }
@media print { body { margin: 0 } .no-print { display: none } }
```

## Aktivierung

Das Modul wird über das Flag `complaint_template` in **Polski > Module** aktiviert. Ist es deaktiviert, werden Shortcode und Admin-Seite nicht registriert.

## Einschränkungen

- Keine Auswahl der Formularsprache (immer pl)
- Keine automatische Integration mit WooCommerce-Bestellungen (der Käufer trägt die Nummer manuell ein)
- Kein PDF, nur HTML (PDF in PRO geplant)
- Die Vorlage unterstützt kein Ersetzen des Shop-Logos
