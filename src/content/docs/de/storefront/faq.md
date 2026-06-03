---
title: FAQ (Häufig gestellte Fragen)
description: FAQ-Modul in Polski for WooCommerce - CPT polski_faq, Taxonomie faq_category, Shortcode, CSS-Akkordeon und Schema.org FAQPage.
---

Das FAQ-Modul ermöglicht das Erstellen und Anzeigen eines Bereichs mit häufig gestellten Fragen im Shop. Die Fragen werden als eigener Beitragstyp (CPT) mit einer eigenen Kategorie-Taxonomie gespeichert, was eine flexible Verwaltung und Anzeige erlaubt.

## Modul aktivieren

Gehe zu **WooCommerce > Polski > Shop-Module** und aktiviere **FAQ** (Modul-ID: `faq`).

Nach der Aktivierung erscheint im Admin-Menü ein neuer Eintrag **FAQ** mit Unterseiten zur Verwaltung von Fragen und Kategorien.

## Administrationsbereich

Die Verwaltung der FAQ-Fragen erfolgt unter **FAQ** (`edit.php?post_type=polski_faq`). Die Oberfläche funktioniert genauso wie bei normalen WordPress-Beiträgen.

### Frage hinzufügen

1. Gehe zu **FAQ > Neu hinzufügen**
2. Gib im Titelfeld den Wortlaut der Frage ein
3. Gib im Editor die Antwort ein (der vollständige Block-Editor wird unterstützt)
4. Weise eine FAQ-Kategorie zu (optional)
5. Lege die Anzeigereihenfolge im Feld **Reihenfolge** fest (menu_order)
6. Veröffentlichen

### FAQ-Kategorien

Die Taxonomie `faq_category` erlaubt es, Fragen thematisch zu gruppieren. Verwaltung der Kategorien: **FAQ > FAQ-Kategorien**.

Beispielkategorien:

- Bestellungen und Zahlungen
- Versand und Rücksendungen
- Kundenkonto
- Produkte

## Shortcode `[polski_faq]`

Zeigt eine Liste von FAQ-Fragen als CSS-Akkordeon an.

### Parameter

| Parameter  | Typ    | Standard     | Beschreibung                                      |
| ---------- | ------ | ------------ | ------------------------------------------------- |
| `category` | string | (leer)       | Slug der anzuzeigenden FAQ-Kategorie              |
| `limit`    | int    | `-1`         | Maximale Anzahl an Fragen (-1 = alle)             |
| `orderby`  | string | `menu_order` | Sortierfeld: `menu_order`, `title`, `date`        |
| `order`    | string | `ASC`        | Sortierrichtung: `ASC` oder `DESC`                |

### Anwendungsbeispiele

Alle Fragen anzeigen:

```html
[polski_faq]
```

Fragen der Kategorie "versand" anzeigen:

```html
[polski_faq category="versand" limit="5"]
```

Die 10 neuesten Fragen anzeigen:

```html
[polski_faq limit="10" orderby="date" order="DESC"]
```

### Verwendung in einer PHP-Vorlage

```php
echo do_shortcode('[polski_faq category="bestellungen" limit="10"]');
```

## CSS-Akkordeon

Die Fragen werden als Akkordeon angezeigt, ein Klick auf die Frage klappt die Antwort aus. Das Akkordeon funktioniert vollständig über CSS (ohne JavaScript), was maximale Leistung gewährleistet.

Der Mechanismus basiert auf dem HTML-Element `<details>` mit `<summary>`:

```html
<div class="polski-faq">
  <details class="polski-faq__item">
    <summary class="polski-faq__question">Wie gebe ich eine Bestellung auf?</summary>
    <div class="polski-faq__answer">
      <p>Um eine Bestellung aufzugeben, lege Produkte in den Warenkorb...</p>
    </div>
  </details>
</div>
```

### CSS-Klassen

- `.polski-faq` - FAQ-Container
- `.polski-faq__item` - einzelne Frage (Element `<details>`)
- `.polski-faq__question` - Wortlaut der Frage (Element `<summary>`)
- `.polski-faq__answer` - Inhalt der Antwort
- `.polski-faq__category` - Kategorieüberschrift (bei gruppierter Anzeige)

### Aussehen anpassen

```css
/* Hintergrundfarbe der aktiven Frage ändern */
.polski-faq__item[open] .polski-faq__question {
    background-color: #f0f0f0;
}

/* Aufklapp-Symbol ändern */
.polski-faq__question::marker {
    content: "+";
}

.polski-faq__item[open] .polski-faq__question::marker {
    content: "-";
}
```

## Schema.org FAQPage

Das Modul erzeugt automatisch eine Schema.org-Auszeichnung `FAQPage` im JSON-LD-Format auf Seiten, die den Shortcode `[polski_faq]` enthalten:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie gebe ich eine Bestellung auf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Um eine Bestellung aufzugeben, lege Produkte in den Warenkorb..."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert die Lieferung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Standardlieferzeit beträgt 2-3 Werktage..."
      }
    }
  ]
}
```

Die FAQPage-Auszeichnung erlaubt es Google, Fragen und Antworten direkt in den Suchergebnissen anzuzeigen (Rich Snippets).

Schema.org deaktivieren:

```php
add_filter('polski/faq/schema_enabled', '__return_false');
```

## Hooks

### Filter

```php
// Argumente der FAQ-Abfrage ändern
add_filter('polski/faq/query_args', function (array $args): array {
    $args['posts_per_page'] = 20;
    return $args;
});

// HTML der Antwort vor der Anzeige ändern
add_filter('polski/faq/answer_html', function (string $html, int $post_id): string {
    return wp_kses_post($html);
}, 10, 2);
```

### Aktionen

```php
// Eigenes Element vor dem FAQ-Bereich hinzufügen
add_action('polski/faq/before', function (): void {
    echo '<h2>Hast du Fragen? Hier sind die Antworten:</h2>';
});

// Eigenes Element nach dem FAQ-Bereich hinzufügen
add_action('polski/faq/after', function (): void {
    echo '<p>Keine Antwort gefunden? <a href="/kontakt">Kontaktiere uns</a>.</p>';
});
```

## Fehlerbehebung

**Der Shortcode zeigt einen leeren Container** - prüfe, ob du veröffentlichte FAQ-Fragen hast. Entwürfe und geplante Beiträge werden nicht angezeigt.

**Das Akkordeon funktioniert nicht** - stelle sicher, dass das Theme das Element `<details>` nicht blockiert. Einige CSS-Reset-Stylesheets können dieses Element ausblenden.

**Schema.org erscheint nicht** - prüfe die Auszeichnung mit dem [Google Rich Results Test](https://search.google.com/test/rich-results). Stelle sicher, dass der Shortcode auf der Seite ist (nicht in einem Sidebar-Widget).

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
