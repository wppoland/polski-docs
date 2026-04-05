---
title: Polski for WooCommerce
description: Umfassendes WordPress-Plugin zur Anpassung eines WooCommerce-Shops an polnische Rechtsvorschriften und Marktanforderungen. Konformitaet mit Omnibus, GPSR, DSA, DSGVO und weiteren Regulierungen.
template: splash
hero:
  tagline: Die komplette Loesung zur Unterstuetzung des Betriebs eines Onlineshops in Polen. Rechtliche Werkzeuge, lokale Funktionen, polnische E-Commerce-Standards - alles in einem Plugin.
  actions:
    - text: Konfiguration starten
      link: /de/getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/wppoland/polski
      icon: external
      variant: minimal
---

## Was ist Polski for WooCommerce?

**Polski for WooCommerce** ist ein kostenloses Open-Source-Plugin (GPLv2), erstellt von [wppoland.com](https://wppoland.com), das einen WooCommerce-Shop an polnische Rechtsanforderungen und E-Commerce-Standards anpasst. Das Plugin vereint ueber 30 Module fuer rechtliche Anforderungen, Preisanzeige, Kasse, Lebensmittel, Shop-Module und Entwicklerwerkzeuge.

Aktuelle Version: **1.3.2**

### Systemanforderungen

Stellen Sie vor der Installation sicher, dass Ihr Server die Mindestanforderungen erfuellt:

| Anforderung | Mindestversion |
|-----------|-----------------|
| WordPress | 6.4 oder neuer |
| WooCommerce | 8.0 oder neuer |
| PHP | 8.1 oder neuer |
| MySQL | 5.7 oder neuer / MariaDB 10.3+ |

:::tip[Empfehlung]
Fuer die beste Leistung empfehlen wir PHP 8.2+ und WooCommerce 9.x. Das Plugin wird regelmaessig mit den neuesten Versionen von WordPress und WooCommerce getestet.
:::

---

## Moduluebersicht

Das Plugin ist modular aufgebaut - Sie aktivieren nur die Funktionen, die Sie benoetigen. Nachfolgend finden Sie eine Beschreibung aller verfuegbaren Modulgruppen.

### Rechtliche Anforderungen

Module zur Umsetzung polnischer und EU-rechtlicher Anforderungen:

- **GPSR (Verordnung ueber die allgemeine Produktsicherheit)** - Hersteller-, Importeur- und verantwortliche-Person-Daten auf Produktseiten
- **Omnibus** - Anzeige des niedrigsten Preises der letzten 30 Tage vor der Reduzierung gemaess der Omnibus-Richtlinie
- **Widerrufsrecht** - Formulare und Rueckgabeverfahren, Erstellung von Widerrufsdokumenten
- **DSGVO** - Einwilligungsverwaltung, Datenanonymisierung, Verarbeitungsregister
- **DSA (Gesetz ueber digitale Dienste)** - Kontaktstelle, Inhaltsmeldungen, Transparenz
- **KSeF** - Vorbereitung fuer die Integration mit dem Nationalen E-Rechnungssystem
- **Greenwashing** - Ueberpruefung und Kontrolle von Umweltaussagen
- **Rechtsseiten** - Erstellung von AGB, Datenschutzerklaerung und Widerrufsbelehrung

### Preise und Produktinformationen

Module zur Preisanzeige und Produktdaten:

- **Grundpreise** - automatische Berechnung und Anzeige von Preisen pro Mengeneinheit (EUR/kg, EUR/l)
- **MwSt.-Anzeige** - Information ueber MwSt.-Satz und Netto-/Bruttopreis
- **Lieferzeit** - geschaetzte Lieferzeit auf der Produktseite
- **Herstellerdaten** - Herstellerfeld, Marke, Katalognummer

### Kasse und Bestellungen

Module zur Anpassung der Kassenseite und des Bestellprozesses:

- **Bestellbutton** - Aenderung des Button-Textes zu "Zahlungspflichtig bestellen" (gesetzliche Anforderung)
- **Rechtliche Checkboxen** - konfigurierbare Zustimmungen zu AGB, Datenschutz, Newsletter
- **NIP-Suche** - automatische Ergaenzung von Firmendaten anhand der Steuernummer (GUS-API)
- **Double-Opt-in** - E-Mail-Adressverifizierung durch Double-Opt-in

### Lebensmittel

Spezialisierte Module fuer Lebensmittelgeschaefte:

- **Lebensmittelprodukte - Uebersicht** - dedizierte Felder fuer Lebensmittelprodukte
- **Naehrwerte** - Naehrwerttabelle gemaess Verordnung 1169/2011
- **Allergene** - hervorgehobene Allergene in der Produktbeschreibung (14 Hauptallergene)
- **Nutri-Score** - Anzeige der Nutri-Score-Kennzeichnung (A-E)

### Shop-Module

Funktionen zur Verbesserung des Einkaufserlebnisses:

- **Wunschliste** - Produkte fuer spaeter speichern
- **Produktvergleich** - Produkte nebeneinander vergleichen
- **Schnellansicht** - Produktvorschau ohne Verlassen der Kategorieseite
- **AJAX-Suche** - Produktsuche in Echtzeit
- **AJAX-Filter** - dynamische Produktfilterung ohne Seitenneuladen
- **Produktslider** - Produktkarussells mit konfigurierbaren Einstellungen
- **Produktlabels** - Etiketten wie "Neu", "Bestseller", "Letzte Stuecke"
- **Weitere Module** - zusaetzliche Shop-Funktionen

### Werkzeuge

Module zur Erleichterung der Shop-Verwaltung:

- **Compliance-Dashboard** - Uebersicht des Status rechtlicher Anforderungen an einem Ort
- **Shop-Audit** - automatische Ueberpruefung der Shop-Konfiguration
- **Sicherheitsvorfaelle** - Register und Verwaltung von DSGVO-Vorfaellen
- **Verifizierte Bewertungen** - System verifizierter Kundenbewertungen

### Fuer Entwickler

Werkzeuge und APIs fuer Programmierer:

- **REST API** - Endpunkte zur Verwaltung der Plugin-Daten
- **Hooks (Actions und Filter)** - ueber 100 Hooks zur Erweiterung der Funktionalitaet
- **Shortcodes** - fertige Shortcodes zum Einbetten von Elementen in Inhalte
- **Templates** - Ueberschreiben von Plugin-Templates im Theme
- **WP-CLI** - CLI-Befehle zur Plugin-Verwaltung ueber das Terminal
- **CSV-Import** - Massenimport von Produktdaten
- **Gutenberg-Bloecke** - dedizierte Editor-Bloecke
- **Schema.org** - automatische strukturierte Daten fuer Produkte

---

## Schnellstart

Drei Schritte zum funktionierenden Shop, der E-Commerce-Anforderungen erfuellt:

1. **[Plugin installieren](/de/getting-started/installation/)** - ueber das WordPress-Dashboard oder manuell per ZIP-Datei
2. **[Grundlagen konfigurieren](/de/getting-started/configuration/)** - benoetigte Module im Einstellungspanel aktivieren
3. **[Assistenten durchlaufen](/de/getting-started/wizard/)** - Firmendaten ergaenzen, Rechtsseiten generieren, Checkboxen konfigurieren

:::note[Brauchen Sie Hilfe?]
Wenn Sie ein Problem haben, melden Sie es auf [GitHub Issues](https://github.com/wppoland/polski/issues). Haben Sie eine Frage oder einen Vorschlag? Schreiben Sie auf [GitHub Discussions](https://github.com/wppoland/polski/discussions).
:::

---

## Warum es sich lohnt

- **Alles in einem** - statt 10 Plugins eine einheitliche Plattform
- **Modularer Aufbau** - Sie aktivieren nur das, was Sie brauchen
- **Rechtliche Werkzeuge** - aktualisiert bei Aenderungen der Vorschriften
- **Open Source** - Quellcode auf GitHub, GPLv2-Lizenz
- **Kein Abonnement** - alle Funktionen kostenlos verfuegbar
- **Leistung** - minimale Ressourcen werden nur fuer aktive Module geladen
- **Aktive Community** - Unterstuetzung auf GitHub Discussions

---

## Kompatibilitaet

Das Plugin wird mit den beliebtesten WordPress-Themes und -Plugins getestet:

- Themes: Storefront, Astra, GeneratePress, Kadence, Flavor, flavor theme
- Page Builder: Gutenberg (Bloecke), Elementor, Beaver Builder
- Zahlungs-Plugins: Przelewy24, PayU, BLIK, tpay
- Versand-Plugins: InPost, DPD, DHL, Poczta Polska, Orlen Paczka

---

## Support und Community

- [GitHub Issues](https://github.com/wppoland/polski/issues) - Fehlerberichte und Feature-Vorschlaege
- [GitHub Discussions](https://github.com/wppoland/polski/discussions) - Fragen, Diskussionen, Community-Hilfe
- [wppoland.com](https://wppoland.com) - Projektseite und Blog mit Anleitungen

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
