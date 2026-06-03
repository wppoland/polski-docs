---
title: Polski for WooCommerce
description: Umfassendes WordPress-Plugin zur Anpassung des WooCommerce-Shops an polnische Rechtsvorschriften und Marktanforderungen. Konformitaet mit Omnibus, GPSR, DSA, DSGVO und weiteren Regelungen.
template: splash
hero:
  tagline: Komplette Loesung zur Unterstuetzung des Betriebs eines Onlineshops in Polen. Rechtliche Anforderungen, lokale Funktionen, polnische E-Commerce-Standards - alles in einem Plugin.
  actions:
    - text: Konfiguration starten
      link: /pl/getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/wppoland/polski
      icon: external
      variant: minimal
---

![Polski for WooCommerce - Plugin-Banner](../../../../assets/screenshots/banner-772x250.png)

## Was ist Polski for WooCommerce?

**Polski for WooCommerce** ist ein kostenloses Open-Source-Plugin (GPLv2) von [wppoland.com](https://wppoland.com). Es passt den WooCommerce-Shop an polnische Vorschriften und E-Commerce-Standards an. Es umfasst ueber 30 Module: rechtliche Anforderungen, Preise, Kasse, Lebensmittel, Shop-Funktionen und Werkzeuge fuer Entwickler.

Aktuelle Version: **1.3.2**

### Systemanforderungen

Stelle vor der Installation sicher, dass dein Server die Mindestanforderungen erfuellt:

| Anforderung | Mindestversion |
|-----------|-----------------|
| WordPress | 6.4 oder neuer |
| WooCommerce | 8.0 oder neuer |
| PHP | 8.1 oder neuer |
| MySQL | 5.7 oder neuer / MariaDB 10.3+ |

:::tip[Empfehlung]
Fuer beste Leistung empfehlen wir PHP 8.2+ sowie WooCommerce 9.x. Das Plugin wird regelmaessig mit den neuesten Versionen von WordPress und WooCommerce getestet.
:::

---

## Modulueberblick

Das Plugin arbeitet modular - du aktivierst nur das, was du brauchst. Nachfolgend findest du eine Beschreibung aller Modulgruppen.

![Modul-Dashboard von Polski for WooCommerce](../../../../assets/screenshots/screenshot-1-modules-dashboard.png)

### Rechtliche Anforderungen

Module zur Erfuellung der Anforderungen des polnischen und EU-Rechts:

- **GPSR (Produktsicherheit)** - Daten zu Hersteller, Importeur und verantwortlicher Person auf den Produktseiten
- **Omnibus** - niedrigster Preis der letzten 30 Tage vor der Reduzierung
- **Widerrufsrecht** - Ruecksendeformulare und Widerrufsdokumente
- **DSGVO** - Einwilligungen, Anonymisierung von Daten, Verarbeitungsverzeichnis
- **DSA (Gesetz ueber digitale Dienste)** - Kontaktstelle, Meldung von Inhalten
- **KSeF** - Vorbereitung auf das Nationale System der elektronischen Rechnungen
- **Greenwashing** - Kontrolle von Umweltaussagen
- **Rechtliche Seiten** - AGB, Datenschutzerklaerung und Ruecksendungsrichtlinie

### Preise und Produktinformationen

Module zur Anzeige von Preisen und Produktdaten:

- **Grundpreise** - automatische Berechnung und Anzeige der Preise pro Masseinheit (zl/kg, zl/l)
- **MwSt-Anzeige** - Information zum MwSt-Satz und Netto-/Bruttopreis
- **Lieferzeit** - geschaetzte Bearbeitungszeit der Bestellung auf der Produktseite
- **Herstellerdaten** - Herstellerfeld, Marke, Katalognummer

### Kasse und Bestellungen

Module fuer die Kassenseite und den Bestellprozess:

- **Bestellbutton** - Aenderung des Button-Texts auf "Zahlungspflichtig bestellen" (rechtliche Anforderung)
- **Rechtliche Checkboxen** - konfigurierbare Einwilligungen zu AGB, Datenschutzerklaerung, Newsletter
- **NIP-Suche** - automatisches Ausfuellen der Firmendaten anhand der NIP-Nummer (GUS-API)
- **Doppelte Bestaetigung** - Verifizierung der E-Mail-Adresse (Double Opt-in)

### Lebensmittelprodukte

Spezialisierte Module fuer Shops mit Lebensmitteln:

- **Uebersicht der Lebensmittelprodukte** - dedizierte Felder fuer Lebensmittelprodukte
- **Naehrwerte** - Naehrwerttabelle gemaess Verordnung 1169/2011
- **Allergene** - hervorgehobene Allergene in der Produktbeschreibung (14 Hauptallergene)
- **Nutri-Score** - Anzeige der Nutri-Score-Kennzeichnung (A-E)

### Shop-Module

Funktionen, die den Kunden den Einkauf erleichtern:

- **Wunschliste** - Produkte fuer spaeter speichern
- **Vergleich** - Produkte nebeneinander vergleichen
- **Schnellansicht** - Produktvorschau, ohne die Kategorieseite zu verlassen
- **AJAX-Suche** - Produktsuche in Echtzeit
- **AJAX-Filter** - dynamisches Filtern von Produkten ohne Neuladen der Seite
- **Produkt-Slider** - Produktkarussells mit konfigurierbaren Einstellungen
- **Produkt-Badges** - Labels wie "Neu", "Bestseller", "Letzte Stuecke"
- **Weitere Module** - zusaetzliche Shop-Funktionen

### Werkzeuge

Module zur Verwaltung des Shops:

- **Compliance-Dashboard** - Ueberblick ueber den Status der rechtlichen Anforderungen des Shops an einem Ort
- **Site-Audit** - automatische Ueberpruefung der Shop-Konfiguration
- **Sicherheitsvorfaelle** - Register und Verwaltung von DSGVO-Vorfaellen
- **Verifizierte Bewertungen** - System fuer verifizierte Kundenbewertungen

### Fuer Entwickler

Werkzeuge und APIs fuer Programmierer:

- **REST API** - Endpunkte zur Verwaltung der Plugin-Daten
- **Hooks (Actions und Filter)** - ueber 100 Hooks zur Erweiterung der Funktionalitaet
- **Shortcodes** - fertige Shortcodes zum Einbetten von Elementen in Inhalte
- **Templates** - Ueberschreiben der Plugin-Templates im Theme
- **WP-CLI** - CLI-Befehle zur Verwaltung des Plugins ueber das Terminal
- **CSV-Import** - Massenimport von Produktdaten
- **Gutenberg-Bloecke** - dedizierte Editor-Bloecke
- **Schema.org** - automatische strukturierte Daten fuer Produkte

---

## Schnellstart

Drei Schritte zu einem rechtskonformen Shop:

1. **[Plugin installieren](getting-started/installation/)** - ueber das WordPress-Panel oder manuell aus der ZIP-Datei
2. **[Grundlagen konfigurieren](getting-started/configuration/)** - aktiviere die benoetigten Module im Einstellungspanel
3. **[Assistenten durchlaufen](getting-started/wizard/)** - trage die Firmendaten ein, generiere die rechtlichen Seiten, konfiguriere die Checkboxen

:::note[Brauchst du Hilfe?]
Wenn du auf ein Problem stoesst, melde es auf [GitHub Issues](https://github.com/wppoland/polski/issues). Hast du eine Frage oder einen Vorschlag? Schreib uns auf [GitHub Discussions](https://github.com/wppoland/polski/discussions).
:::

---

## Warum lohnt es sich?

- **Alles in einem** - statt 10 Plugins eine einheitliche Plattform
- **Modularer Aufbau** - du aktivierst nur das, was du brauchst
- **Rechtliche Anforderungen** - aktualisiert mit den Aenderungen der Vorschriften
- **Open Source** - Quellcode auf GitHub, GPLv2-Lizenz
- **Ohne Abonnement** - alle Funktionen kostenlos verfuegbar
- **Leistung** - Ressourcen werden nur fuer aktive Module geladen
- **Aktive Community** - Support auf GitHub Discussions

---

## Kompatibilitaet

Das Plugin wird mit beliebten WordPress-Themes und -Plugins getestet:

- Themes: Storefront, Astra, GeneratePress, Kadence, Flavor, flavor theme
- Page-Builder: Gutenberg (Bloecke), Elementor, Beaver Builder
- Zahlungs-Plugins: Przelewy24, PayU, BLIK, tpay
- Versand-Plugins: InPost, DPD, DHL, Poczta Polska, Orlen Paczka

---

## Support und Community

- [GitHub Issues](https://github.com/wppoland/polski/issues) - Melden von Fehlern und Funktionsvorschlaegen
- [GitHub Discussions](https://github.com/wppoland/polski/discussions) - Fragen, Diskussionen, Hilfe der Community
- [wppoland.com](https://wppoland.com) - Projektseite und Blog mit Anleitungen

<div class="disclaimer">Diese Seite dient ausschliesslich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist eine Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
