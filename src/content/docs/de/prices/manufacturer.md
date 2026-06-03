---
title: Hersteller und Marke
description: Herstellerdaten (GPSR), Marken-Taxonomie, GTIN/EAN-Nummern sowie Shortcode zur Anzeige von Herstellerinformationen in WooCommerce.
---

Seit dem 13. Dezember 2024 verlangt die GPSR-Verordnung die Angabe der Herstellerdaten auf der Produktseite. Das Plugin Polski for WooCommerce ermoeglicht es, Herstellerdaten, Marke und GTIN/EAN-Nummer zu jedem Produkt hinzuzufuegen.

## GPSR-Anforderungen

Auf der Produktseite musst du angeben:

- Name des Herstellers oder Importeurs
- Postanschrift des Herstellers
- E-Mail-Adresse oder Webseite zur Kontaktaufnahme
- bei Produkten aus Nicht-EU-Laendern - Daten der verantwortlichen Person im EU-Gebiet

Der Kunde muss vor dem Kauf Zugang zu diesen Daten haben.

## Konfiguration

### Aktivierung des Moduls

Gehe zu **WooCommerce > Einstellungen > Polski > Hersteller** und aktiviere das Modul. Nach der Aktivierung erscheinen im Produkteditor neue Felder.

### Herstellerdaten (GPSR)

Im Produkteditor, im Reiter "Polski" oder im Seitenpanel, findest du den Bereich "Hersteller (GPSR)":

| Feld | Erforderlich | Beschreibung |
|------|----------|------|
| Name des Herstellers | Ja | Vollstaendiger Firmenname des Herstellers |
| Adresse | Ja | Strasse, Nummer, PLZ, Stadt, Land |
| E-Mail | Ja* | Kontakt-E-Mail-Adresse |
| Webseite | Ja* | URL der Herstellerseite |
| Verantwortliche Person in der EU | Bedingt | Erforderlich fuer Produkte aus Nicht-EU-Laendern |
| Adresse der verantwortlichen Person | Bedingt | Vollstaendige Adresse der verantwortlichen Person |

*Erforderlich ist mindestens eine elektronische Kontaktmoeglichkeit (E-Mail oder Webseite).

### Globale Herstellerdaten

Wenn du hauptsaechlich eigene Produkte verkaufst, lege die Standard-Herstellerdaten in **WooCommerce > Einstellungen > Polski > Hersteller** fest. Diese Daten erscheinen bei Produkten ohne eigene Herstellerdaten.

## Marken-Taxonomie

Das Plugin erstellt die Taxonomie `polski_brand` zur Verwaltung der Produktmarken.

### Verwaltung der Marken

Gehe zu **Produkte > Marken**, um Marken zu erstellen und zu bearbeiten. Jede Marke kann enthalten:

- Name
- Slug (URL-Identifikator)
- Beschreibung
- Logo (Vorschaubild der Taxonomie)

### Zuweisung einer Marke zu einem Produkt

Im Produkteditor, im Seitenpanel, findest du die Metabox "Marke" - waehle eine Marke aus der Liste oder fuege eine neue hinzu.

### Markenseiten

Das Plugin erstellt eine Archivseite fuer jede Marke. Kunden durchsuchen die Produkte einer Marke unter der Adresse:

```
/marka/nazwa-marki/
```

Den Archiv-Slug aenderst du in den Plugin-Einstellungen.

## GTIN/EAN

Das Plugin fuegt ein Feld fuer die Produktidentifikationsnummer hinzu (GS1-Standard).

### Unterstuetzte Formate

| Format | Laenge | Anwendung |
|--------|---------|-------------|
| EAN-13 | 13 Ziffern | Europaeischer Standard |
| EAN-8 | 8 Ziffern | Kleine Verpackungen |
| UPC-A | 12 Ziffern | Amerikanischer Standard |
| GTIN-14 | 14 Ziffern | Sammelverpackungen |
| ISBN-13 | 13 Ziffern | Buecher |

### Validierung

Das Plugin prueft die Korrektheit der GTIN/EAN-Nummer (Pruefziffer). Eine ungueltige Nummer wird mit einer Fehlermeldung abgelehnt.

### Structured Data (Schema.org)

Die GTIN-Nummer gelangt automatisch in die strukturierten Daten (JSON-LD), was die Sichtbarkeit in Google verbessert:

```json
{
    "@type": "Product",
    "gtin13": "5901234123457",
    "brand": {
        "@type": "Brand",
        "name": "Nazwa marki"
    },
    "manufacturer": {
        "@type": "Organization",
        "name": "Nazwa producenta",
        "address": "ul. Przykladowa 1, 00-001 Warszawa"
    }
}
```

## Shortcode

Verwende den Shortcode `[polski_manufacturer]`, um die Herstellerdaten an beliebiger Stelle anzuzeigen.

### Parameter

| Parameter | Typ | Standard | Beschreibung |
|----------|-----|----------|------|
| `product_id` | int | aktuell | Produkt-ID |
| `fields` | string | `all` | Anzuzeigende Felder: `all`, `name`, `address`, `email`, `url`, `gtin`, `brand` |
| `layout` | string | `list` | Layout: `list`, `inline`, `table` |
| `show_label` | bool | `true` | Ob die Feldbezeichnungen angezeigt werden |
| `wrapper` | string | `div` | Umschliessendes HTML-Element |

### Anwendungsbeispiele

Vollstaendige Herstellerdaten:

```html
[polski_manufacturer]
```

Ergebnis (Layout list):

```
Hersteller: ABC Sp. z o.o.
Adresse: ul. Fabryczna 10, 00-001 Warszawa
E-Mail: kontakt@abc.pl
Webseite: https://abc.pl
```

Nur Name und GTIN:

```html
[polski_manufacturer fields="name,gtin"]
```

Produktmarke im Inline-Layout:

```html
[polski_manufacturer fields="brand" layout="inline"]
```

Fuer ein bestimmtes Produkt:

```html
[polski_manufacturer product_id="789" fields="name,address" layout="table"]
```

Im PHP-Template:

```php
echo do_shortcode('[polski_manufacturer product_id="' . $product->get_id() . '" fields="name,gtin"]');
```

## Programmatischer Zugriff auf die Daten

### Abrufen der Herstellerdaten

```php
$manufacturer_name = get_post_meta($product_id, '_polski_manufacturer_name', true);
$manufacturer_address = get_post_meta($product_id, '_polski_manufacturer_address', true);
$manufacturer_email = get_post_meta($product_id, '_polski_manufacturer_email', true);
$manufacturer_url = get_post_meta($product_id, '_polski_manufacturer_url', true);
$gtin = get_post_meta($product_id, '_polski_gtin', true);
```

### Abrufen der Marke

```php
$brands = wp_get_object_terms($product_id, 'polski_brand');
if (!empty($brands) && !is_wp_error($brands)) {
    $brand_name = $brands[0]->name;
    $brand_logo = get_term_meta($brands[0]->term_id, 'thumbnail_id', true);
}
```

## CSV-Import

Herstellerdaten und GTIN importierst du per CSV:

| CSV-Spalte | Beschreibung |
|-------------|------|
| `polski_manufacturer_name` | Name des Herstellers |
| `polski_manufacturer_address` | Adresse des Herstellers |
| `polski_manufacturer_email` | E-Mail des Herstellers |
| `polski_manufacturer_url` | Webseite des Herstellers |
| `polski_gtin` | GTIN/EAN-Nummer |
| `polski_brand` | Name der Marke |

Beispiel:

```csv
"Krem nawilzajacy","ABC Kosmetyki Sp. z o.o.","ul. Kwiatowa 5, 00-100 Warszawa","info@abc.pl","https://abc.pl","5901234123457","ABC Kosmetyki"
```

## Haeufige Probleme

### Die Herstellerdaten werden auf der Produktseite nicht angezeigt

1. Pruefe, ob das Hersteller-Modul aktiviert ist
2. Stelle sicher, dass das Produkt ausgefuellte Daten hat oder Standarddaten konfiguriert sind
3. Pruefe, ob das Theme den Hook `woocommerce_single_product_summary` oder `woocommerce_product_meta_end` unterstuetzt

### GTIN wird als ungueltig abgelehnt

Pruefe die Pruefziffer der GTIN-Nummer. Verwende den GS1-Rechner zur Pruefung: https://www.gs1.org/services/check-digit-calculator

### Die Marke erscheint nicht in Schema.org

Stelle sicher, dass die Marke dem Produkt ueber die Taxonomie `polski_brand` zugewiesen ist und nicht nur im Textfeld des Herstellers eingetragen wurde.

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschliesslich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist eine Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
