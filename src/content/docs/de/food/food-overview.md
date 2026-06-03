---
title: Lebensmittelmodul
description: Überblick über das Lebensmittelmodul - Nährwerte, Allergene, Zutaten, Nutri-Score, Alkohol und Herkunftsland in WooCommerce.
---

Der Verkauf von Lebensmitteln im Internet erfordert die Angabe von Informationen zur Zusammensetzung, zu Nährwerten, Allergenen und zur Herkunft des Produkts (EU-Verordnung Nr. 1169/2011). Das Plugin Polski for WooCommerce bietet ein vollständiges Modul zur Verwaltung dieser Daten.

## Rechtliche Anforderungen

Ein Lebensmittelverkäufer muss angeben:

| Information | Erforderlich | Rechtsgrundlage |
|-------------|--------------|-----------------|
| Bezeichnung des Lebensmittels | Ja | Art. 9 Abs. 1 lit. a |
| Zutatenverzeichnis | Ja | Art. 9 Abs. 1 lit. b |
| Allergene | Ja | Art. 9 Abs. 1 lit. c |
| Menge bestimmter Zutaten | Bedingt | Art. 9 Abs. 1 lit. d |
| Nettofüllmenge | Ja | Art. 9 Abs. 1 lit. e |
| Mindesthaltbarkeitsdatum | Ja | Art. 9 Abs. 1 lit. f |
| Aufbewahrungsbedingungen | Bedingt | Art. 9 Abs. 1 lit. g |
| Angaben zum Hersteller | Ja | Art. 9 Abs. 1 lit. h |
| Herkunftsland | Bedingt | Art. 9 Abs. 1 lit. i |
| Nährwertdeklaration | Ja | Art. 9 Abs. 1 lit. l |

Im Onlineshop müssen die meisten dieser Informationen vor dem Kauf verfügbar sein. Eine Ausnahme bildet das Mindesthaltbarkeitsdatum - dieses gibst du bei der Lieferung an.

## Bestandteile des Moduls

Das Lebensmittelmodul besteht aus mehreren Submodulen. Jedes aktivierst du einzeln:

### Nährwerte

Nährwerttabelle pro 100 g oder 100 ml. Enthält Energie (kJ/kcal), Fette, Kohlenhydrate, Eiweiß, Salz und weitere Bestandteile.

Details: [Nährwerte](food/nutrients/)

### Allergene

Deklaration der 14 Hauptallergene auf Basis einer WordPress-Taxonomie.

Details: [Allergene](food/allergens/)

### Nutri-Score

Anzeige der Nutri-Score-Kennzeichnung (A-E) mit den entsprechenden Farben und CSS-Klassen.

Details: [Nutri-Score](food/nutri-score/)

### Zutaten (Verzeichnis)

Textfeld für das Zutatenverzeichnis. Allergene im Verzeichnis werden automatisch fett dargestellt.

### Alkohol

Felder zur Verwaltung von Informationen über alkoholische Produkte:

| Feld | Beschreibung |
|------|--------------|
| Alkoholgehalt (% vol.) | Prozentualer Alkoholgehalt |
| Warnhinweis | Hinweis auf das Verkaufsverbot an Minderjährige |
| Altersverifizierung | Checkbox zur Bestätigung der Volljährigkeit beim Hinzufügen zum Warenkorb |

Getränke mit einem Alkoholgehalt über 1,2 % vol. erfordern die Angabe des Alkoholgehalts.

### Herkunftsland

Feld für die Angabe des Herkunftslands oder des Herkunftsorts. Erforderlich für:

- Fleisch (Rind, Schwein, Geflügel, Lamm)
- Obst und Gemüse
- Fisch
- Olivenöl
- Honig
- Produkte, bei denen das Fehlen der Information den Verbraucher irreführen könnte

## Konfiguration

### Aktivierung des Moduls

Gehe zu **WooCommerce > Einstellungen > Polski > Lebensmittel** und aktiviere das Modul sowie die benötigten Submodule.

### Globale Einstellungen

| Einstellung | Beschreibung |
|-------------|--------------|
| Referenzeinheit | Standardeinheit: pro 100 g oder pro 100 ml |
| Position auf der Produktseite | Wo die Informationen angezeigt werden (Reiter, unter der Beschreibung, in der Seitenleiste) |
| Im Listing anzeigen | Ob auf den Kategorieseiten Kurzinformationen angezeigt werden |
| Automatische Hervorhebung der Allergene | Fettschrift der Allergennamen im Zutatenverzeichnis |

### Position auf der Produktseite

Die Lebensmitteldaten zeigst du an einem der folgenden Orte an:

1. **Neuer Reiter** (empfohlen) - ein separater Reiter "Lebensmittelinformationen" neben Beschreibung und Bewertungen
2. **Unter der Beschreibung** - direkt unter der Produktbeschreibung
3. **In den Metadaten** - im Abschnitt SKU/Kategorien
4. **Benutzerdefiniert** - mittels Shortcodes an beliebiger Stelle

## Produkteditor

Nach der Aktivierung des Moduls erscheint im Produkteditor ein Reiter "Lebensmittel" mit folgenden Abschnitten:

- **Nährwerte** - Tabelle mit Feldern für alle Bestandteile
- **Zutaten** - Textfeld (WYSIWYG) für das Zutatenverzeichnis
- **Allergene** - Checkbox-Liste der Allergene
- **Nutri-Score** - Auswahl der Stufe A-E
- **Alkohol** - Felder im Zusammenhang mit alkoholischen Getränken
- **Herkunft** - Herkunftsland und Herkunftsort

## CSV-Import

Lebensmitteldaten importierst du massenweise per CSV:

| CSV-Spalte | Beschreibung | Format |
|------------|--------------|--------|
| `polski_nutrients` | Nährwerte | JSON |
| `polski_ingredients` | Zutatenverzeichnis | Text |
| `polski_allergens` | Allergene | Durch Kommas getrennte Slugs |
| `polski_nutri_score` | Nutri-Score | Buchstabe A-E |
| `polski_alcohol_content` | Alkoholgehalt | Zahl (z. B. `5.0`) |
| `polski_country_of_origin` | Herkunftsland | Text |

Beispiel:

```csv
"Orangensaft 1L",'{"energy_kj":180,"energy_kcal":43,"fat":0.1,"carbohydrates":9.8,"sugars":8.4,"protein":0.7,"salt":0.01}',,"",B,,Spanien
```

## Kompatibilität mit Schema.org

Das Modul erstellt automatisch strukturierte Daten nach Schema.org:

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

### Hinzufügen eines benutzerdefinierten Lebensmittelfeldes

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

### Filter zur Anzeige der Lebensmittelinformationen

```php
add_filter('polski/food/display_html', function (string $html, int $product_id): string {
    // Anpassung des HTML vor der Anzeige
    return $html;
}, 10, 2);
```

## Häufige Probleme

### Der Reiter "Lebensmittel" erscheint nicht im Produkteditor

1. Prüfe, ob das Lebensmittelmodul in den Einstellungen aktiviert ist
2. Überprüfe, ob das Produkt nicht vom Typ "extern/affiliate" ist (das Modul unterstützt diesen Typ nicht)
3. Leere den Browser-Cache und lade das Admin-Panel neu

### Allergene werden im Zutatenverzeichnis nicht fett dargestellt

Stelle sicher, dass die Option "Automatische Hervorhebung der Allergene" aktiviert ist und dass die Allergennamen im Verzeichnis den Namen in der Taxonomie entsprechen.

### Nährwerte werden falsch angezeigt

Prüfe das Datenformat - in der Datenbank verwenden die Werte den Punkt als Trennzeichen (z. B. 9.5). Das Plugin zeigt sie automatisch mit dem polnischen Komma an (9,5).

## Verwandte Ressourcen

- [Nährwerte](food/nutrients/)
- [Allergene](food/allergens/)
- [Nutri-Score](food/nutri-score/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
