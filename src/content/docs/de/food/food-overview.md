---
title: Lebensmittelmodul
description: Ueberblick ueber das Lebensmittelmodul - Naehrwerte, Allergene, Zutaten, Nutri-Score, Alkohol und Herkunftsland in WooCommerce.
---

Der Online-Verkauf von Lebensmitteln erfordert Angaben zu Zusammensetzung, Naehrwerten, Allergenen und Herkunft (Verordnung EU Nr. 1169/2011). Polski for WooCommerce bietet ein vollstaendiges Modul zur Verwaltung dieser Daten.

## Rechtliche Anforderungen

Die LMIV verpflichtet Lebensmittelverkaeufer zur Angabe folgender Informationen:

| Information | Erforderlich | Rechtsgrundlage |
|------------|----------|----------------|
| Bezeichnung des Lebensmittels | Ja | Art. 9 Abs. 1 lit. a |
| Zutatenverzeichnis | Ja | Art. 9 Abs. 1 lit. b |
| Allergene | Ja | Art. 9 Abs. 1 lit. c |
| Menge bestimmter Zutaten | Bedingt | Art. 9 Abs. 1 lit. d |
| Nettofuellmenge | Ja | Art. 9 Abs. 1 lit. e |
| Mindesthaltbarkeitsdatum | Ja | Art. 9 Abs. 1 lit. f |
| Aufbewahrungsbedingungen | Bedingt | Art. 9 Abs. 1 lit. g |
| Herstellerdaten | Ja | Art. 9 Abs. 1 lit. h |
| Herkunftsland | Bedingt | Art. 9 Abs. 1 lit. i |
| Naehrwertdeklaration | Ja | Art. 9 Abs. 1 lit. l |

Beim Fernabsatz (Onlineshop) muessen die meisten dieser Informationen vor dem Kauf verfuegbar sein - mit Ausnahme des Mindesthaltbarkeitsdatums, das bei der Lieferung angegeben werden kann.

## Modulkomponenten

Das Lebensmittelmodul besteht aus mehreren Untermodulen, die unabhaengig aktiviert werden koennen:

### Naehrwerte

Naehrwerttabelle pro 100 g oder 100 ml des Produkts. Umfasst Energie (kJ/kcal), Fett, Kohlenhydrate, Protein, Salz und andere Naehrstoffe.

Details: [Naehrwerte](/de/food/nutrients/)

### Allergene

Allergendeklarationssystem basierend auf der WordPress-Taxonomie. 14 Hauptallergene gemaess Anhang II der LMIV.

Details: [Allergene](/de/food/allergens/)

### Nutri-Score

Anzeige der Nutri-Score-Kennzeichnung (A-E) mit entsprechenden Farben und CSS-Klassen.

Details: [Nutri-Score](/de/food/nutri-score/)

### Zutaten (Verzeichnis)

Textfeld fuer das vollstaendige Zutatenverzeichnis des Produkts. Allergene im Verzeichnis werden automatisch durch Fettschrift gemaess LMIV-Anforderungen hervorgehoben.

### Alkohol

Felder zur Verwaltung von Informationen ueber alkoholische Produkte:

| Feld | Beschreibung |
|------|------|
| Alkoholgehalt (% vol.) | Prozentualer Alkoholgehalt |
| Warnung | Meldung ueber das Verkaufsverbot an Minderjaehrige |
| Altersverifizierung | Volljaehrigkeitsbestaetigung beim Hinzufuegen zum Warenkorb |

Fuer Getraenke mit einem Alkoholgehalt ueber 1,2% vol. ist die Angabe des Alkoholgehalts auf dem Etikett erforderlich (Art. 28 LMIV).

### Herkunftsland

Feld fuer die Information zum Herkunftsland oder Herkunftsort. Erforderlich fuer:

- Fleisch (Rind, Schwein, Gefluegel, Lamm)
- Obst und Gemuese
- Fisch
- Olivenoel
- Honig
- Produkte, bei denen fehlende Information den Verbraucher irrefuehren koennte

## Konfiguration

### Modul aktivieren

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Lebensmittel** und aktivieren Sie das Modul sowie die benoetigten Untermodule.

### Globale Einstellungen

| Einstellung | Beschreibung |
|------------|------|
| Referenzeinheit | Standardeinheit: pro 100 g oder pro 100 ml |
| Position auf der Produktseite | Wo die Informationen anzeigen (Tab, unter Beschreibung, im Seitenpanel) |
| Im Listing anzeigen | Ob Kurzinformationen auf Kategorieseiten angezeigt werden |
| Automatische Allergenhervorhebung | Fettschrift der Allergennamen im Zutatenverzeichnis |

### Position auf der Produktseite

Lebensmittelinformationen koennen an mehreren Stellen angezeigt werden:

1. **Neuer Tab** (empfohlen) - separater Tab "Lebensmittelinformationen" neben Beschreibung und Bewertungen
2. **Unter der Beschreibung** - direkt unter der Produktbeschreibung
3. **In den Metadaten** - im Bereich SKU/Kategorien
4. **Benutzerdefiniert** - per Shortcodes an beliebiger Stelle

## Produkteditor

Nach Aktivierung des Lebensmittelmoduls erscheint im Produkteditor ein neuer Tab "Lebensmittel" mit folgenden Abschnitten:

- **Naehrwerte** - Tabelle mit Feldern fuer alle Naehrstoffe
- **Zutaten** - Textfeld (WYSIWYG) fuer das Zutatenverzeichnis
- **Allergene** - Checkbox-Liste der Allergene
- **Nutri-Score** - Auswahl der Stufe A-E
- **Alkohol** - Felder fuer alkoholische Getraenke
- **Herkunft** - Herkunftsland und Herkunftsort

## CSV-Import

Alle Lebensmitteldaten koennen per CSV massenimportiert werden:

| CSV-Spalte | Beschreibung | Format |
|-------------|------|--------|
| `polski_nutrients` | Naehrwerte | JSON |
| `polski_ingredients` | Zutatenverzeichnis | Text |
| `polski_allergens` | Allergene | Slugs durch Komma getrennt |
| `polski_nutri_score` | Nutri-Score | Buchstabe A-E |
| `polski_alcohol_content` | Alkoholgehalt | Zahl (z.B. `5.0`) |
| `polski_country_of_origin` | Herkunftsland | Text |

Beispiel:

```csv
"Orangensaft 1L",'{"energy_kj":180,"energy_kcal":43,"fat":0.1,"carbohydrates":9.8,"sugars":8.4,"protein":0.7,"salt":0.01}',,"",B,,Spanien
```

## Schema.org-Kompatibilitaet

Das Modul generiert automatisch Schema.org-konforme strukturierte Daten:

```json
{
    "@type": "Product",
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "Energiewert",
            "value": "250 kcal / 1046 kJ"
        }
    ],
    "hasAllergen": ["gluten", "milch"],
    "countryOfOrigin": {
        "@type": "Country",
        "name": "Polen"
    }
}
```

## Programmatische Erweiterungen

### Benutzerdefiniertes Lebensmittelfeld hinzufuegen

```php
add_filter('polski/food/custom_fields', function (array $fields): array {
    $fields['organic_certified'] = [
        'label'   => 'Bio-Zertifikat',
        'type'    => 'select',
        'options' => [
            ''       => 'Keines',
            'eu_bio' => 'EU Bio',
            'demeter' => 'Demeter',
        ],
    ];

    return $fields;
});
```

### Filter fuer Lebensmittelinformationsanzeige

```php
add_filter('polski/food/display_html', function (string $html, int $product_id): string {
    // HTML vor der Anzeige aendern
    return $html;
}, 10, 2);
```

## Haeufige Probleme

### Tab "Lebensmittel" erscheint nicht im Produkteditor

1. Pruefen Sie, ob das Lebensmittelmodul in den Einstellungen aktiviert ist
2. Ueberpruefen Sie, ob das Produkt nicht vom Typ "extern/Affiliate" ist (das Modul unterstuetzt diesen Typ nicht)
3. Leeren Sie den Browser-Cache und laden Sie das Administrationspanel neu

### Allergene werden im Zutatenverzeichnis nicht fett hervorgehoben

Stellen Sie sicher, dass die Option "Automatische Allergenhervorhebung" aktiviert ist und die Allergennamen oder deren Synonyme dem Text im Zutatenverzeichnis entsprechen.

### Naehrwerte werden falsch angezeigt

Pruefen Sie das Datenformat - Werte muessen Zahlen sein (mit Punkt als Dezimaltrennzeichen in der Datenbank). Das Plugin formatiert die Anzeige automatisch gemaess polnischen Regionaleinstellungen (Komma).

## Verwandte Ressourcen

- [Naehrwerte](/de/food/nutrients/)
- [Allergene](/de/food/allergens/)
- [Nutri-Score](/de/food/nutri-score/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
