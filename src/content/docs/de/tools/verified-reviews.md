---
title: Verifizierte Bewertungen
description: System verifizierter Bewertungen in Polski for WooCommerce - Kauf-Badge, E-Mail-Abgleich und Glaubwürdigkeit der Rezensionen.
---

Das Modul versieht Bewertungen von Kunden, die das Produkt gekauft haben, mit dem Badge **Verifizierter Kauf**. Es erhöht die Glaubwürdigkeit der Rezensionen und unterstützt die Konformität mit der Omnibus-Richtlinie.

## Modul aktivieren

Gehe zu **WooCommerce > Polski > Werkzeuge > Verifizierte Bewertungen** und aktiviere das Modul. Erfordert aktivierte Rezensionen unter **WooCommerce > Einstellungen > Produkte > Allgemein > Produktrezensionen aktivieren**.

## Wie die Verifizierung funktioniert

### Kauf-Badge (purchase badge)

Bewertungen von Kunden, die das Produkt gekauft haben, erhalten das Badge **Verifizierter Kauf** neben dem Namen des Rezensenten.

Das Badge erscheint, wenn:

1. Der Autor der Bewertung als Kunde angemeldet ist
2. Der Kunde mindestens 1 Bestellung mit dem rezensierten Produkt hat
3. Die Bestellung den Status `completed` (abgeschlossen) oder `processing` (in Bearbeitung) hat

### E-Mail-Abgleich (email matching)

Bei Gästen vergleicht das System die E-Mail aus der Bewertung mit den E-Mails aus den Bestellungen. Passt sie zu einer Bestellung mit dem rezensierten Produkt, erhält die Bewertung das Badge.

Abgleichmodi:

| Modus         | Beschreibung                                  | Sicherheit     |
| ------------ | --------------------------------------------- | -------------- |
| Exakt        | Die E-Mail muss identisch sein                | Hoch           |
| Normalisiert | Ignoriert Groß-/Kleinschreibung und Gmail-Aliase (+) | Mittel  |

Konfiguration des Modus: **WooCommerce > Polski > Verifizierte Bewertungen > E-Mail-Abgleichmodus**.

```php
// Modus programmgesteuert ändern
add_filter('polski/verified_reviews/email_matching', function (): string {
    return 'exact'; // 'exact' lub 'normalized'
});
```

### Verifizierungsprozess

```
Kunde gibt eine Bewertung ab
        ↓
Das System prüft:
  1. Ist der Kunde angemeldet?
     → JA: Bestellungen nach user_id prüfen
     → NEIN: Bestellungen nach E-Mail prüfen
        ↓
  2. Gibt es eine Bestellung mit diesem Produkt?
     → JA: Bestellstatus prüfen
     → NEIN: kein Badge
        ↓
  3. Ist der Bestellstatus "completed" oder "processing"?
     → JA: Badge "Verifizierter Kauf" vergeben
     → NEIN: kein Badge
```

## Badge-Konfiguration

### Aussehen

Optionen zur Konfiguration des Badges:

| Option          | Beschreibung                      | Standard               |
| --------------- | --------------------------------- | ---------------------- |
| Text            | Inhalt des Badges                 | Verifizierter Kauf     |
| Symbol          | Symbol neben dem Text             | Häkchen (✓)            |
| Hintergrundfarbe | Hintergrundfarbe des Badges      | Grün (#059669)         |
| Textfarbe       | Textfarbe                         | Weiß (#ffffff)         |
| Position        | Position relativ zum Autorennamen | Nach dem Namen         |
| Größe           | Größe des Badges                  | Klein                  |

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
- `.polski-verified-badge` - Container des Badges
- `.polski-verified-badge__icon` - Symbol
- `.polski-verified-badge__text` - Text des Badges
- `.polski-verified-badge--large` - große Variante

## Bewertungen filtern

Der Filter auf der Produktseite ermöglicht es Kunden, anzuzeigen:

- **Alle Bewertungen** - Standardansicht
- **Nur verifizierte** - Bewertungen mit Badge
- **Nur nicht verifizierte** - Bewertungen ohne Badge

Der Filter wird als Buttonset über der Bewertungsliste angezeigt.

```php
// Filter deaktivieren
add_filter('polski/verified_reviews/show_filter', '__return_false');
```

## Bewertungen sortieren

Verifizierte Bewertungen können weiter oben angezeigt werden. Sortieroptionen:

- **Chronologisch** - Standardsortierung von WooCommerce
- **Verifizierte zuerst** - Bewertungen mit Badge oben
- **Bewertung absteigend** - von der höchsten Bewertung
- **Bewertung aufsteigend** - von der niedrigsten Bewertung

```php
add_filter('polski/verified_reviews/default_sort', function (): string {
    return 'verified_first'; // 'date', 'verified_first', 'rating_desc', 'rating_asc'
});
```

## Verifizierungsstatistiken

Unter **WooCommerce > Polski > Verifizierte Bewertungen > Statistiken** sind sichtbar:

- **Gesamtzahl der Bewertungen** - alle Bewertungen im Shop
- **Verifizierte** - Bewertungen mit Badge (Anzahl und Prozentsatz)
- **Nicht verifizierte** - Bewertungen ohne Badge
- **Durchschnittsbewertung der verifizierten** - durchschnittliche Sternebewertung der Bewertungen mit Badge
- **Durchschnittsbewertung der nicht verifizierten** - durchschnittliche Sternebewertung der Bewertungen ohne Badge
- **Monatsdiagramm** - Trend der verifizierten vs. nicht verifizierten Bewertungen

## Schutz vor gefälschten Bewertungen

Zusätzliche Schutzmechanismen:

### Bewertungslimit

Ein Kunde kann 1 Bewertung pro Produkt abgeben. Beim Versuch, eine zweite hinzuzufügen, sieht er eine Meldung.

### Mindestzeit

Eine Bewertung ist erst nach X Tagen ab der Lieferung möglich. Standardmäßig **3 Tage** - der Kunde hat Zeit, das Produkt zu testen.

```php
add_filter('polski/verified_reviews/min_days_after_delivery', function (): int {
    return 7; // 7 dni od dostawy
});
```

### Moderation

Moderationsoptionen vor der Veröffentlichung:

- **Ohne Moderation** - Bewertungen werden sofort veröffentlicht
- **Moderation der nicht verifizierten** - nur Bewertungen ohne Badge erfordern eine Genehmigung
- **Moderation aller** - alle Bewertungen erfordern eine Genehmigung

Konfiguration: **WooCommerce > Polski > Verifizierte Bewertungen > Moderation**.

### Erkennung verdächtiger Bewertungen

Automatische Markierung verdächtiger Bewertungen:

| Signal                              | Beschreibung                             |
| ------------------------------------ | ---------------------------------------- |
| Viele Bewertungen von einer IP       | Mehr als 3 Bewertungen von derselben IP/Tag |
| Bewertung sofort nach dem Kauf       | Bewertung innerhalb von Minuten nach der Bestellung abgegeben |
| Identischer Text                     | Derselbe Bewertungstext bei verschiedenen Produkten |
| Verdächtige E-Mail                   | E-Mail-Adresse von einer Wegwerf-Domain  |

Verdächtige Bewertungen gelangen mit dem Label **Zu prüfen** in die Moderationswarteschlange.

## Integration mit Schema.org

Verifizierte Bewertungen erzeugen strukturierte Daten `Review`:

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
  "reviewBody": "Świetna jakość, polecam.",
  "publisher": {
    "@type": "Organization",
    "name": "Mój Sklep"
  }
}
```

Google bevorzugt Bewertungen aus bestätigten Käufen in Rich Snippets.

## E-Mail mit Bewertungsbitte

Automatische E-Mail mit der Bitte um eine Bewertung X Tage nach der Lieferung.

Konfiguration:

| Option             | Beschreibung                    | Standard  |
| ------------------- | ------------------------------- | --------- |
| Aktiviert          | Ob die E-Mail gesendet wird     | Nein      |
| Verzögerung        | Tage nach der Lieferung         | 7         |
| Vorlage            | E-Mail-Vorlage                  | Standard  |
| Limit              | Max. 1 E-Mail pro Bestellung    | Ja        |

```php
// Verzögerung der E-Mail ändern
add_filter('polski/verified_reviews/email_delay_days', function (): int {
    return 14;
});
```

## Shortcode

```html
[polski_verified_badge text="Potwierdzone zamówienie" icon="shield"]
```

Zeigt das Verifizierungs-Badge an. Nützlich in benutzerdefinierten Bewertungs-Templates.

## Fehlerbehebung

**Das Badge wird trotz Kauf nicht angezeigt** - prüfe den Bestellstatus (erforderlich ist `completed` oder `processing`). Prüfe außerdem, ob die E-Mail in der Bewertung zur E-Mail aus der Bestellung passt.

**Alle Bewertungen sind nicht verifiziert** - prüfe, ob das Modul aktiv ist und ob WooCommerce beim Hinzufügen einer Bewertung eine E-Mail erfordert.

**Die E-Mail mit der Bewertungsbitte kommt nicht an** - prüfe die E-Mail-Konfiguration von WordPress. Verwende ein SMTP-Plugin.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
