---
title: Hersteller und Marke
description: Herstellerdaten (GPSR), Markentaxonomie, GTIN/EAN-Nummern sowie Shortcode zur Anzeige von Herstellerinformationen in WooCommerce.
---

Die GPSR-Verordnung (General Product Safety Regulation), gueltig seit dem 13. Dezember 2024, verpflichtet Online-Verkaeufer, Herstellerdaten oder Daten der verantwortlichen Person auf der Produktseite anzugeben. Das Plugin Polski for WooCommerce ermoeglicht das Hinzufuegen vollstaendiger Herstellerdaten, Marke und Produktidentifikatoren (GTIN/EAN) zu jedem Produkt im Shop.

## GPSR-Anforderungen

Gemaess Verordnung (EU) 2023/988 (GPSR) muessen auf der Produktseite angegeben werden:

- Name des Herstellers oder Importeurs
- Postadresse des Herstellers
- E-Mail-Adresse oder Website fuer den Kontakt
- bei Produkten von ausserhalb der EU - Daten der verantwortlichen Person in der EU

Diese Informationen muessen dem Verbraucher vor dem Kauf leicht zugaenglich sein.

## Konfiguration

### Modul aktivieren

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Hersteller** und aktivieren Sie das Modul. Nach der Aktivierung erscheinen neue Felder im Produkteditor.

### Herstellerdaten (GPSR)

Im Produkteditor, im Tab "Polski" oder im Seitenpanel, finden Sie den Abschnitt "Hersteller (GPSR)":

| Feld | Erforderlich | Beschreibung |
|------|----------|------|
| Herstellername | Ja | Vollstaendiger Firmenname des Herstellers |
| Adresse | Ja | Strasse, Nummer, PLZ, Stadt, Land |
| E-Mail | Ja* | Kontakt-E-Mail-Adresse |
| Website | Ja* | URL der Herstellerseite |
| Verantwortliche Person in der EU | Bedingt | Erforderlich fuer Produkte von ausserhalb der EU |
| Adresse der verantwortlichen Person | Bedingt | Vollstaendige Adresse der verantwortlichen Person |

*Es ist mindestens eine elektronische Kontaktmoeglichkeit erforderlich (E-Mail oder Website).

### Globale Herstellerdaten

Wenn Sie hauptsaechlich Produkte der eigenen Marke verkaufen, koennen Sie Standard-Herstellerdaten unter **WooCommerce > Einstellungen > Polski > Hersteller** festlegen. Diese Daten werden automatisch auf alle Produkte angewendet, die keine individuellen Herstellerdaten zugewiesen haben.

## Markentaxonomie

Das Plugin registriert die Taxonomie `polski_brand`, die die Verwaltung von Produktmarken ermoeglicht.

### Markenverwaltung

Gehen Sie zu **Produkte > Marken**, um Marken zu erstellen und zu bearbeiten. Jede Marke kann enthalten:

- Name
- Slug (URL-Kennung)
- Beschreibung
- Logo (Taxonomie-Thumbnail)

### Marke zum Produkt zuweisen

Im Produkteditor, im Seitenpanel, finden Sie die Metabox "Marke" - waehlen Sie eine Marke aus der Liste oder fuegen Sie eine neue hinzu.

### Markenseiten

Das Plugin generiert automatisch Archivseiten fuer jede Marke. Kunden koennen alle Produkte einer Marke unter folgender Adresse ansehen:

```
/marka/markenname/
```

Der Archiv-Slug kann in den Plugin-Einstellungen geaendert werden.

## GTIN/EAN

Das Plugin fuegt ein Feld fuer die Produktidentifikationsnummer gemaess GS1-Standards hinzu.

### Unterstuetzte Formate

| Format | Laenge | Anwendung |
|--------|---------|-------------|
| EAN-13 | 13 Ziffern | Europaeischer Standard |
| EAN-8 | 8 Ziffern | Kleine Verpackungen |
| UPC-A | 12 Ziffern | Amerikanischer Standard |
| GTIN-14 | 14 Ziffern | Sammelverpackungen |
| ISBN-13 | 13 Ziffern | Buecher |

### Validierung

Das Plugin validiert automatisch die Korrektheit der GTIN/EAN-Nummer (Pruefziffer). Eine ungueltige Nummer wird mit einer Fehlermeldung abgelehnt.

### Strukturierte Daten (Schema.org)

Die GTIN-Nummer wird automatisch zu den strukturierten Produktdaten (JSON-LD) hinzugefuegt, was die Sichtbarkeit in den Google-Suchergebnissen verbessert:

```json
{
    "@type": "Product",
    "gtin13": "5901234123457",
    "brand": {
        "@type": "Brand",
        "name": "Markenname"
    },
    "manufacturer": {
        "@type": "Organization",
        "name": "Herstellername",
        "address": "ul. Przykladowa 1, 00-001 Warszawa"
    }
}
```

## Shortcode

Verwenden Sie den Shortcode `[polski_manufacturer]`, um Herstellerdaten an einer beliebigen Stelle anzuzeigen.

### Parameter

| Parameter | Typ | Standard | Beschreibung |
|----------|-----|----------|------|
| `product_id` | int | aktuell | Produkt-ID |
| `fields` | string | `all` | Anzuzeigende Felder: `all`, `name`, `address`, `email`, `url`, `gtin`, `brand` |
| `layout` | string | `list` | Layout: `list`, `inline`, `table` |
| `show_label` | bool | `true` | Ob Feldlabels angezeigt werden sollen |
| `wrapper` | string | `div` | Umschliessendes HTML-Element |

### Verwendungsbeispiele

Vollstaendige Herstellerdaten:

```html
[polski_manufacturer]
```

Ergebnis (Layout list):

```
Hersteller: ABC Sp. z o.o.
Adresse: ul. Fabryczna 10, 00-001 Warszawa
E-Mail: kontakt@abc.pl
Website: https://abc.pl
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

## Programmatischer Datenzugriff

### Herstellerdaten abrufen

```php
$manufacturer_name = get_post_meta($product_id, '_polski_manufacturer_name', true);
$manufacturer_address = get_post_meta($product_id, '_polski_manufacturer_address', true);
$manufacturer_email = get_post_meta($product_id, '_polski_manufacturer_email', true);
$manufacturer_url = get_post_meta($product_id, '_polski_manufacturer_url', true);
$gtin = get_post_meta($product_id, '_polski_gtin', true);
```

### Marke abrufen

```php
$brands = wp_get_object_terms($product_id, 'polski_brand');
if (!empty($brands) && !is_wp_error($brands)) {
    $brand_name = $brands[0]->name;
    $brand_logo = get_term_meta($brands[0]->term_id, 'thumbnail_id', true);
}
```

## CSV-Import

Herstellerdaten und GTIN koennen per CSV importiert werden:

| CSV-Spalte | Beschreibung |
|-------------|------|
| `polski_manufacturer_name` | Herstellername |
| `polski_manufacturer_address` | Herstelleradresse |
| `polski_manufacturer_email` | Hersteller-E-Mail |
| `polski_manufacturer_url` | Hersteller-Website |
| `polski_gtin` | GTIN/EAN-Nummer |
| `polski_brand` | Markenname |

Beispiel:

```csv
"Feuchtigkeitscreme","ABC Kosmetyki Sp. z o.o.","ul. Kwiatowa 5, 00-100 Warszawa","info@abc.pl","https://abc.pl","5901234123457","ABC Kosmetyki"
```

## Haeufige Probleme

### Herstellerdaten werden auf der Produktseite nicht angezeigt

1. Pruefen Sie, ob das Herstellermodul aktiviert ist
2. Stellen Sie sicher, dass das Produkt ausgefuellte Daten oder konfigurierte Standarddaten hat
3. Ueberpruefen Sie, ob das Theme den Hook `woocommerce_single_product_summary` oder `woocommerce_product_meta_end` unterstuetzt

### GTIN wird als ungueltig abgelehnt

Pruefen Sie die Pruefziffer der GTIN-Nummer. Verwenden Sie den GS1-Rechner zur Verifizierung: https://www.gs1.org/services/check-digit-calculator

### Marke erscheint nicht in Schema.org

Stellen Sie sicher, dass die Marke dem Produkt ueber die Taxonomie `polski_brand` zugewiesen ist und nicht nur im Hersteller-Textfeld eingegeben wurde.

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
