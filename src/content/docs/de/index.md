---
title: Polski for WooCommerce
description: Umfassendes WordPress-Plugin zur Anpassung des WooCommerce-Shops an polnische Rechtsvorschriften und Marktanforderungen.
template: splash
hero:
  tagline: Komplette Loesung zur Unterstuetzung des Betriebs eines Onlineshops in Polen. Rechtliche Anforderungen, lokale Funktionen, polnische E-Commerce-Standards - in der Version FREE und PRO.
  actions:
    - text: Mit FREE starten
      link: /getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: PRO entdecken
      link: /pro/overview/
      icon: star
      variant: secondary
    - text: GitHub
      link: https://github.com/wppoland/polski
      icon: external
      variant: minimal
---

![Polski for WooCommerce - Plugin-Banner](../../../assets/screenshots/banner-772x250.png)

## Zwei Versionen - eine Loesung

Polski for WooCommerce ist eine modulare Plattform, entwickelt von [wppoland.com](https://wppoland.com), die den WooCommerce-Shop an die polnischen Marktanforderungen anpasst. Verfuegbar in zwei Varianten:

| | FREE | PRO |
|---|---|---|
| Lizenz | GPLv2 (Open Source) | Kommerzielle Lizenz |
| Preis | Kostenlos | [wppoland.com/pl/polski-pro](https://wppoland.com/pl/polski-pro/) |
| Rechtliche Anforderungen | GPSR, Omnibus, DSGVO, DSA, KSeF und weitere | Alles aus FREE |
| Preise und Produkte | Grundpreis, MwSt, Lieferzeit | Alles aus FREE |
| Kasse | Bestellbutton, Checkboxen, NIP | + mehrstufiger Warenkorb |
| Shop-Module | Wunschliste, Vergleich, Filter, Slider | Alles aus FREE |
| Rechnungen | - | MwSt-Rechnung, Korrekturrechnung, Quittung, WZ |
| KSeF | Vorbereitung | + vollstaendige Integration mit der API |
| Verkauf | - | Geschenkkarten, Abonnements, Affiliate, Vorbestellungen, Bundling |
| B2B | - | Katalogmodus, Angebotsanfragen |
| Integrationen | - | InPost, wFirma, Fakturownia, iFirma |
| Einwilligungen | Checkboxen + Protokollierung | + Versionierung, Audit-Trail, Re-Consent |
| Support | GitHub Issues | Prioritaer |

### Systemanforderungen

| Anforderung | Mindestversion |
|---|---|
| WordPress | 6.4+ |
| WooCommerce | 8.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

:::tip[Empfehlung]
Fuer beste Leistung empfehlen wir PHP 8.2+ sowie WooCommerce 9.x.
:::

---

## FREE - kostenlose Open-Source-Version

Aktuelle Version: **1.3.2** | Lizenz: GPLv2 | [GitHub](https://github.com/wppoland/polski)

![Modul-Dashboard von Polski for WooCommerce](../../../assets/screenshots/screenshot-1-modules-dashboard.png)

### Rechtliche Anforderungen

- **[GPSR](/compliance/gpsr/)** - Daten zu Hersteller, Importeur und verantwortlicher Person
- **[Omnibus](/compliance/omnibus/)** - niedrigster Preis der letzten 30 Tage vor der Reduzierung
- **[Widerrufsrecht](/compliance/withdrawal/)** - Formulare und Ruecksendeverfahren
- **[DSGVO](/compliance/gdpr/)** - Verwaltung von Einwilligungen, Protokollierung von Einwilligungen
- **[DSA](/compliance/dsa/)** - Kontaktstelle, Meldung von Inhalten
- **[KSeF](/compliance/ksef/)** - Vorbereitung auf die Integration mit den elektronischen Rechnungen
- **[Greenwashing](/compliance/greenwashing/)** - Kontrolle von Umweltaussagen
- **[Rechtliche Seiten](/compliance/legal-pages/)** - Generierung von AGB, Datenschutzerklaerung

### Preise und Produktinformationen

- **[Grundpreise](/prices/unit-prices/)** - zl/kg, zl/l, zl/m
- **[MwSt-Anzeige](/prices/vat-display/)** - MwSt-Satz, Netto/Brutto
- **[Lieferzeit](/prices/delivery-time/)** - geschaetzte Zeit auf der Produktseite
- **[Herstellerdaten](/prices/manufacturer/)** - Hersteller, Marke, GTIN/EAN

### Kasse und Bestellungen

- **[Bestellbutton](/checkout/checkout-button/)** - "Zahlungspflichtig bestellen"
- **[Rechtliche Checkboxen](/checkout/legal-checkboxes/)** - konfigurierbare Einwilligungen
- **[NIP-Suche](/checkout/nip-lookup/)** - automatisches Ausfuellen ueber die GUS-API
- **[Double Opt-in](/checkout/double-opt-in/)** - E-Mail-Verifizierung

### Lebensmittelprodukte

- **[Naehrwerte](/food/nutrients/)** - Tabelle gemaess Verordnung 1169/2011
- **[Allergene](/food/allergens/)** - 14 Hauptallergene
- **[Nutri-Score](/food/nutri-score/)** - Kennzeichnung A-E

### Shop-Module

- **[Wunschliste](/storefront/wishlist/)**, **[Vergleich](/storefront/compare/)**, **[Schnellansicht](/storefront/quick-view/)**
- **[AJAX-Suche](/storefront/ajax-search/)**, **[AJAX-Filter](/storefront/ajax-filters/)**
- **[Produkt-Slider](/storefront/product-slider/)**, **[Badges](/storefront/badges/)**

### Werkzeuge und API

- **[Compliance-Dashboard](/tools/compliance-dashboard/)**, **[Shop-Audit](/tools/site-audit/)**
- **[REST API](/developer/rest-api/)**, **[Hooks](/developer/hooks/)**, **[Shortcodes](/developer/shortcodes/)**
- **[WP-CLI](/developer/wp-cli/)**, **[CSV-Import](/developer/csv-import/)**, **[Gutenberg-Bloecke](/developer/blocks/)**

---

## PRO - erweiterte Version

Aktuelle Version: **1.1.0** | Erfordert: Polski FREE 1.3.0+ | [Auf wppoland.com kaufen](https://wppoland.com/pl/polski-pro/)

:::note[PRO erweitert FREE]
Die PRO-Version ist ein separates Plugin, das neben der kostenlosen Version installiert wird. Alle FREE-Module bleiben verfuegbar - PRO fuegt neue Funktionen hinzu.
:::

### Rechnungen und Finanzen

- **[Rechnungssystem](/pro/invoices/)** - MwSt-Rechnung, Korrekturrechnung, Quittung, WZ mit PDF-Generierung
- **[KSeF-Integration](/pro/ksef/)** - elektronischer Versand von Rechnungen an das Finanzamt
- **[Buchhaltungsintegrationen](/pro/accounting/)** - wFirma, Fakturownia, iFirma

### Kasse und Einwilligungen

- **[Mehrstufiger Warenkorb](/pro/multistep-checkout/)** - Address -> Shipping -> Payment -> Review
- **[Einwilligungsverwaltung](/pro/consent-management/)** - Versionierung, Audit-Trail, GDPR-Export

### Verkauf und Marketing

- **[Geschenkkarten](/pro/gift-cards/)** - Kauf, Einloesung, Verfolgung des Guthabens
- **[Abonnements](/pro/subscriptions/)** - wiederkehrende Kaeufe mit Verlaengerungen
- **[Affiliate-Programm](/pro/affiliates/)** - Empfehlungslinks, Provisionen
- **[Angebotsanfragen](/pro/quotes/)** - RFQ statt Warenkorb
- **[Vorbestellungen](/pro/preorders/)** - Reservierungen mit Erscheinungsdatum
- **[Pakete und Add-ons](/pro/bundles-addons/)** - Bundling, Add-ons, FBT
- **[Katalogmodus](/pro/catalog-mode/)** - B2B ohne Preise

### Integrationen

- **[InPost (Paketstationen)](/pro/shipping-inpost/)** - ShipX-API, Karte der Paketstationen, Etiketten

### PRO-API

- **[PRO REST API](/pro/pro-api/)** - Endpunkte fuer Rechnungen, KSeF, Einstellungen

---

## Schnellstart

1. **[Plugin installieren](/getting-started/installation/)** - ueber das WordPress-Panel oder aus der ZIP-Datei
2. **[Module konfigurieren](/getting-started/configuration/)** - aktiviere die benoetigten Funktionen
3. **[Assistenten durchlaufen](/getting-started/wizard/)** - Firmendaten, rechtliche Seiten, Checkboxen

:::note[Brauchst du Hilfe?]
[GitHub Issues](https://github.com/wppoland/polski/issues) - Melden von Fehlern | [GitHub Discussions](https://github.com/wppoland/polski/discussions) - Fragen und Diskussionen
:::

---

## Kompatibilitaet

- Themes: Storefront, Astra, GeneratePress, Kadence, flavor theme
- Page-Builder: Gutenberg, Elementor, Beaver Builder
- Zahlungen: Przelewy24, PayU, BLIK, tpay
- Versand: InPost, DPD, DHL, Poczta Polska, Orlen Paczka

<div class="disclaimer">Diese Seite dient ausschliesslich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist eine Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
