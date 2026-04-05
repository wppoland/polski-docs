---
title: Verifizierte Bewertungen
description: System verifizierter Bewertungen in Polski for WooCommerce - Kaufbadge, E-Mail-Abgleich und Rezensionsglaubwuerdigkeit.
---

Das Modul versieht Bewertungen von Kunden, die das Produkt gekauft haben, mit dem Badge **Verifizierter Kauf**. Erhoet die Glaubwuerdigkeit der Rezensionen und unterstuetzt die Konformitaet mit der Omnibus-Richtlinie.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Werkzeuge > Verifizierte Bewertungen** und aktivieren Sie das Modul. Das Modul erfordert aktivierte Bewertungen in WooCommerce (**WooCommerce > Einstellungen > Produkte > Allgemein > Produktrezensionen aktivieren**).

## Wie die Verifizierung funktioniert

### Kaufbadge

Nach Aktivierung des Moduls erhalten Bewertungen von Kunden, die das Produkt gekauft haben, das Badge **Verifizierter Kauf**. Das Badge wird neben dem Rezensenten-Namen angezeigt.

Das Badge wird vergeben, wenn:

1. Der Bewertungsautor als Kunde angemeldet ist
2. Der Kunde mindestens 1 Bestellung mit dem rezensierten Produkt hat
3. Die Bestellung den Status `completed` (abgeschlossen) oder `processing` (in Bearbeitung) hat

### E-Mail-Abgleich

Fuer Gaeste (nicht angemeldet) vergleicht das System die in der Bewertung angegebene E-Mail-Adresse mit den E-Mail-Adressen aus Bestellungen. Wenn die Adresse zu einer Bestellung mit dem rezensierten Produkt passt, erhaelt die Bewertung das Verifizierungsbadge.

Abgleichmodi:

| Modus         | Beschreibung                                          | Sicherheit |
| ------------ | --------------------------------------------- | -------------- |
| Exakt     | E-Mail muss identisch sein                    | Hoch        |
| Normalisiert| Ignoriert Gross-/Kleinschreibung und Gmail-Aliase (+)   | Mittel        |

```php
// Modus programmatisch aendern
add_filter('polski/verified_reviews/email_matching', function (): string {
    return 'exact'; // 'exact' oder 'normalized'
});
```

## Badge-Konfiguration

### Aussehen

| Option           | Beschreibung                              | Standard              |
| --------------- | --------------------------------- | ---------------------- |
| Text           | Badge-Text                     | Verifizierter Kauf    |
| Symbol           | Symbol neben dem Text                 | Haekchen              |
| Hintergrundfarbe       | Badge-Hintergrundfarbe                 | Gruen (#059669)      |
| Textfarbe    | Textfarbe                      | Weiss (#ffffff)        |
| Position         | Position relativ zum Autorennamen     | Nach dem Namen              |
| Groesse         | Badge-Groesse                   | Klein                   |

### CSS-Styling

```css
.polski-verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    background-color: #059669;
    color: #ffffff;
}

.polski-verified-badge__icon {
    width: 14px;
    height: 14px;
}
```

CSS-Klassen:
- `.polski-verified-badge` - Badge-Container
- `.polski-verified-badge__icon` - Symbol
- `.polski-verified-badge__text` - Badge-Text
- `.polski-verified-badge--large` - Grosse Variante

## Bewertungsfilterung

Das Modul fuegt auf der Produktseite einen Filter hinzu, der Kunden ermoeglicht:

- **Alle Bewertungen** - Standardansicht
- **Nur verifizierte** - Bewertungen mit Badge
- **Nur nicht verifizierte** - Bewertungen ohne Badge

```php
// Filter deaktivieren
add_filter('polski/verified_reviews/show_filter', '__return_false');
```

## Bewertungssortierung

Verifizierte Bewertungen koennen in der Sortierung priorisiert werden:

```php
add_filter('polski/verified_reviews/default_sort', function (): string {
    return 'verified_first'; // 'date', 'verified_first', 'rating_desc', 'rating_asc'
});
```

## Schutz vor gefaelschten Bewertungen

### Bewertungslimit

Ein Kunde kann maximal 1 Bewertung pro Produkt abgeben.

### Mindestzeit

Eine Bewertung kann erst nach X Tagen nach Lieferung abgegeben werden. Standard **3 Tage**.

```php
add_filter('polski/verified_reviews/min_days_after_delivery', function (): int {
    return 7; // 7 Tage nach Lieferung
});
```

### Moderation

Bewertungen koennen vor der Veroeffentlichung eine Moderation erfordern:

- **Ohne Moderation** - Bewertungen sofort veroeffentlicht
- **Moderation nicht-verifizierter** - nur Bewertungen ohne Badge erfordern Genehmigung
- **Moderation aller** - alle Bewertungen erfordern Genehmigung

### Erkennung verdaechtiger Bewertungen

Das System markiert automatisch verdaechtige Bewertungen:

| Signal                              | Beschreibung                                     |
| ------------------------------------ | ---------------------------------------- |
| Viele Bewertungen von einer IP            | Mehr als 3 Bewertungen von derselben IP/Tag |
| Bewertung sofort nach Kauf        | Bewertung innerhalb von Minuten nach Bestellung |
| Identischer Text                     | Gleicher Bewertungstext bei verschiedenen Produkten |
| Verdaechtige E-Mail                    | E-Mail-Adresse von temporaerer Domain        |

## Integration mit Schema.org

Verifizierte Bewertungen generieren strukturierte `Review`-Daten:

```json
{
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Jan K."
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "datePublished": "2025-05-20",
  "reviewBody": "Ausgezeichnete Qualitaet, empfehlenswert.",
  "publisher": {
    "@type": "Organization",
    "name": "Mein Shop"
  }
}
```

Google bevorzugt Bewertungen aus bestaetigten Kaeufen in Rich Snippets.

## E-Mail mit Bewertungsbitte

Das Modul kann automatisch eine E-Mail an den Kunden mit Bitte um eine Bewertung X Tage nach Lieferung senden.

| Option              | Beschreibung                            | Standard |
| ------------------- | ------------------------------- | --------- |
| Aktiviert           | Ob die E-Mail gesendet wird              | Nein       |
| Verzoegerung         | Tage nach Lieferung                 | 7         |
| Vorlage            | E-Mail-Vorlage                 | Standard  |
| Limit              | Max 1 E-Mail pro Bestellung      | Ja       |

```php
// E-Mail-Verzoegerung aendern
add_filter('polski/verified_reviews/email_delay_days', function (): int {
    return 14;
});
```

## Shortcode

```html
[polski_verified_badge text="Bestaetigte Bestellung" icon="shield"]
```

Der Shortcode zeigt das Verifizierungsbadge an. Nuetzlich in benutzerdefinierten Bewertungstemplates.

## Fehlerbehebung

**Badge wird trotz Kauf nicht angezeigt** - pruefen Sie den Bestellstatus. Nur Bestellungen mit Status `completed` oder `processing` qualifizieren sich fuer die Verifizierung. Pruefen Sie auch, ob die E-Mail in der Bewertung zur E-Mail aus der Bestellung passt.

**Alle Bewertungen sind nicht verifiziert** - stellen Sie sicher, dass das Modul aktiv ist und dass WooCommerce bei Bewertungen eine E-Mail-Adresse erfordert.

**E-Mail mit Bewertungsbitte kommt nicht an** - pruefen Sie die WordPress-E-Mail-Konfiguration. Verwenden Sie ein SMTP-Plugin fuer zuverlaessigen E-Mail-Versand.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
