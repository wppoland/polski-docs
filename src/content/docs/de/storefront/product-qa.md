---
title: Fragen und Antworten (Q&A)
description: Fragen-und-Antworten-Modul in Polski for WooCommerce - Q&A-Bereich auf Produktseiten mit Abstimmung und Schema.org-Auszeichnung.
---

Das Fragen-und-Antworten-Modul fügt einen eigenen Q&A-Tab auf den Produktseiten von WooCommerce hinzu. Kunden können Fragen zum Produkt stellen, und der Shop-Inhaber oder andere Nutzer antworten darauf. Das System unterstützt das Abstimmen über Antworten und erzeugt strukturierte Daten nach Schema.org.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie **Fragen und Antworten**. Bei jedem Produkt erscheint neben dem Bewertungs-Tab ein neuer Tab "Fragen und Antworten".

## Funktionen

- Q&A-Tab in der Produkt-Tableiste von WooCommerce
- Frage-und-Antwort-System auf Basis der WordPress-Kommentare
- Benutzerdefinierte Kommentartypen: `product_question` und `product_answer`
- Abstimmung über Antworten per AJAX (hilfreich/nicht hilfreich)
- E-Mail-Benachrichtigungen an den Administrator über neue Fragen
- Strukturierte Daten Schema.org QAPage
- Frageformular mit Validierung
- Seitennummerierung der Fragen
- Moderation der Fragen vor der Veröffentlichung (optional)

## Funktionsweise

### Fragen stellen

Der Kunde füllt auf der Produktseite ein Formular aus und gibt an:

- **Name** - erforderlich (für angemeldete Nutzer automatisch ausgefüllt)
- **E-Mail** - erforderlich (für angemeldete Nutzer automatisch ausgefüllt)
- **Inhalt der Frage** - erforderlich

Nach dem Absenden gelangt die Frage in die Moderation (falls aktiviert) oder wird sofort veröffentlicht. Der Administrator erhält eine Benachrichtigung per E-Mail.

### Antworten

Antworten werden direkt unter der Frage hinzugefügt. Antworten des Administrators bzw. Shop-Inhabers werden mit einer speziellen Kennzeichnung "Antwort des Shops" versehen.

### Abstimmen

Nutzer können über Antworten abstimmen (Daumen hoch/runter). Die Abstimmung läuft per AJAX ohne Neuladen der Seite. Die hilfreichsten Antworten werden weiter oben angezeigt.

## Technische Details

### Kommentartypen

Das Modul nutzt das Kommentarsystem von WordPress mit benutzerdefinierten Typen:

- `product_question` - Frage zu einem Produkt
- `product_answer` - Antwort auf eine Frage

Dadurch vermischen sich die Fragen nicht mit Produktbewertungen oder Beitragskommentaren.

### Schema.org QAPage

Das Modul fügt automatisch strukturierte Daten im JSON-LD-Format gemäß dem Schema `QAPage` hinzu. Jede Frage mit Antworten erzeugt ein eigenes `Question`-Objekt mit verschachtelten `Answer`-Objekten.

```json
{
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
        "@type": "Question",
        "name": "Czy produkt jest wodoodporny?",
        "answerCount": 2,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tak, produkt posiada klasę wodoodporności IP67."
        }
    }
}
```

### Hooks

```php
// Tab-Titel ändern
add_filter('polski/product_qa/tab_title', function (string $title, int $count): string {
    return sprintf('Pytania (%d)', $count);
}, 10, 2);

// E-Mail-Benachrichtigungen deaktivieren
add_filter('polski/product_qa/send_email', '__return_false');

// Anzahl der Fragen pro Seite ändern
add_filter('polski/product_qa/per_page', function (): int {
    return 20; // Standard: 10
});

// Filtern, wer abstimmen darf
add_filter('polski/product_qa/can_vote', function (bool $can_vote, int $user_id): bool {
    return is_user_logged_in();
}, 10, 2);
```

### AJAX-Aktionen

| Aktion | Beschreibung |
|---|---|
| `polski_qa_submit_question` | Neue Frage absenden |
| `polski_qa_submit_answer` | Antwort absenden |
| `polski_qa_vote` | Über eine Antwort abstimmen |

### CSS-Klassen

- `.polski-qa` - Hauptcontainer
- `.polski-qa__question` - einzelne Frage
- `.polski-qa__answer` - Antwort
- `.polski-qa__answer--shop` - Antwort des Shops
- `.polski-qa__vote` - Abstimmungsschaltflächen
- `.polski-qa__vote-count` - Stimmenzähler
- `.polski-qa__form` - Frageformular

### Modul-ID

`product_qa`

## Fehlerbehebung

**Der Q&A-Tab wird nicht angezeigt** - prüfen Sie, ob Ihr Theme WooCommerce-Tabs unterstützt (Hook `woocommerce_product_tabs`). Manche Themes überschreiben die Standard-Tabs.

**Fragen erscheinen nach dem Absenden nicht** - prüfen Sie die Moderationseinstellungen unter **Einstellungen > Diskussion > Ein Kommentar muss manuell freigegeben werden**.

**Schema.org wird nicht validiert** - stellen Sie sicher, dass die Frage mindestens eine Antwort hat. Google verlangt ein Frage-Antwort-Paar für eine korrekte Validierung der QAPage.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
