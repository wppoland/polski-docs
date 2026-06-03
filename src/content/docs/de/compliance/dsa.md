---
title: DSA - Gesetz über digitale Dienste
description: DSA-Werkzeuge (Digital Services Act) in Polski for WooCommerce - Meldeformular, Verwaltungsbereich, Statusverfolgung und E-Mail-Benachrichtigungen.
---

Das Gesetz über digitale Dienste (Digital Services Act, EU 2022/2065) verlangt, dass Online-Plattformen das Melden illegaler Inhalte ermöglichen. Das Plugin fügt ein Meldeformular, einen Bereich zur Verwaltung der Meldungen, eine Statusverfolgung und automatische E-Mail-Benachrichtigungen hinzu.

## DSA-Anforderungen für Online-Shops

Seit dem 17. Februar 2024 müssen Shops mit nutzergenerierten Inhalten (Bewertungen, Kommentare, Fotos):

1. Einen Mechanismus zum Melden illegaler Inhalte bereitstellen
2. Den Eingang der Meldung bestätigen
3. Die Meldung innerhalb einer angemessenen Frist bearbeiten
4. Die meldende Person über die Entscheidung informieren
5. Einen Widerspruch gegen die Entscheidung ermöglichen

Betrifft Shops, in denen Nutzer Inhalte veröffentlichen können, vor allem Produktbewertungen.

## Meldeformular

### Shortcode

Binden Sie das DSA-Meldeformular auf einer beliebigen Seite mit dem Shortcode ein:

```
[polski_dsa_report]
```

### Mit Parametern

```
[polski_dsa_report product_id="123" category="illegal_content"]
```

### Shortcode-Parameter

| Parameter | Beschreibung | Standardwert |
|----------|------|------------------|
| `product_id` | ID des Produkts, auf das sich die Meldung bezieht | Keiner (Nutzer wählt) |
| `category` | Vorausgewählte Meldekategorie | Keine |

![DSA-Meldeformular auf der Shop-Seite](../../../../assets/screenshots/screenshot-6-dsa-report-form.png)

### Formularfelder

Das Formular enthält folgende Felder:

- **Meldekategorie** - Auswahl aus einer Liste (illegaler Inhalt, Urheberrechtsverletzung, gefälschte Bewertung, Hassrede, personenbezogene Daten, Sonstiges)
- **URL oder Inhaltskennung** - Link zum gemeldeten Inhalt oder Bewertungs-ID
- **Beschreibung** - ausführliche Beschreibung des Problems
- **Rechtsgrundlage** - optionale Angabe der Vorschrift
- **Kontaktdaten** - Name, E-Mail-Adresse der meldenden Person
- **Erklärung** - Checkbox zur Bestätigung, dass die Meldung in gutem Glauben erfolgt

### Beispiel für die Einbindung

Erstellen Sie eine Seite "Inhalt melden" und fügen Sie den Shortcode hinzu:

```
[polski_dsa_report]
```

Fügen Sie einen Link zu dieser Seite in der Shop-Fußzeile hinzu, damit sie leicht zugänglich ist.

## Verwaltungsbereich

DSA-Meldungen verwalten Sie unter **WooCommerce > DSA-Meldungen**.

### Liste der Meldungen

Die Liste zeigt alle Meldungen mit folgenden Spalten:

- Meldungs-ID
- Eingangsdatum
- Kategorie
- Status (neu, in Bearbeitung, bearbeitet, abgelehnt)
- Meldende Person (Name, E-Mail)
- Link zum Inhalt

### Details der Meldung

Nach dem Anklicken einer Meldung sehen Sie:

- Vollständige Formulardaten
- Vorschau des gemeldeten Inhalts (bei einer Bewertung ein direkter Link)
- Verlauf der Statusänderungen
- Feld für eine interne Notiz
- Aktionsschaltflächen (Status ändern, Inhalt entfernen, ablehnen)

### Status der Meldungen

| Status | Beschreibung |
|--------|------|
| `new` | Neue Meldung, wartet auf Bearbeitung |
| `in_progress` | Meldung wird analysiert |
| `resolved` | Meldung bearbeitet, Inhalt entfernt oder andere Maßnahme ergriffen |
| `rejected` | Meldung als unbegründet abgelehnt |
| `appealed` | Die meldende Person hat Widerspruch gegen die Entscheidung eingelegt |

## E-Mail-Benachrichtigungen

Das Plugin versendet in diesen Situationen automatische E-Mails:

| Ereignis | Empfänger | Inhalt |
|-----------|----------|-------|
| Neue Meldung | Administrator | Information über eine neue Meldung mit Daten |
| Bestätigung | Meldende Person | Bestätigung des Eingangs der Meldung mit ID-Nummer |
| Statusänderung | Meldende Person | Information über die Statusänderung mit Begründung |
| Bearbeitung | Meldende Person | Entscheidung mit Begründung und Hinweis auf das Widerspruchsrecht |

Die E-Mail-Vorlagen lassen sich unter **WooCommerce > Einstellungen > E-Mails** anpassen.

## Hook

### polski/dsa/report_created

Wird nach dem Erstellen einer neuen DSA-Meldung aufgerufen.

```php
/**
 * @param int    $report_id   ID der DSA-Meldung.
 * @param array  $report_data Daten der Meldung.
 * @param string $category    Meldekategorie.
 */
add_action('polski/dsa/report_created', function (int $report_id, array $report_data, string $category): void {
    // Beispiel: Benachrichtigung an das Rechtsteam über Slack senden
    $webhook_url = 'https://hooks.slack.com/services/XXXX/YYYY/ZZZZ';
    
    wp_remote_post($webhook_url, [
        'body' => wp_json_encode([
            'text' => sprintf(
                'Neue DSA-Meldung #%d (Kategorie: %s) - %s',
                $report_id,
                $category,
                $report_data['description']
            ),
        ]),
        'headers' => ['Content-Type' => 'application/json'],
    ]);
}, 10, 3);
```

### Beispiel - automatisches Entfernen von Bewertungen einer bestimmten Kategorie

```php
add_action('polski/dsa/report_created', function (int $report_id, array $report_data, string $category): void {
    // Bewertungen, die als Hassrede gemeldet wurden, automatisch ausblenden
    if ($category !== 'hate_speech') {
        return;
    }
    
    $comment_id = $report_data['content_id'] ?? 0;
    if ($comment_id > 0) {
        wp_set_comment_status($comment_id, 'hold');
        
        // Automatische Aktion protokollieren
        update_post_meta($report_id, '_auto_action', 'comment_held');
    }
}, 10, 3);
```

## Berichterstattung

Der DSA verlangt das Führen eines Meldungsregisters. Exportieren Sie alle Meldungen als CSV über **WooCommerce > DSA-Meldungen > Exportieren**. Der Export enthält:

- Meldungs-ID
- Datum und Uhrzeit der Einreichung
- Kategorie
- Status und Bearbeitungsdatum
- Bearbeitungszeit (in Stunden)
- Ergriffene Maßnahme

## Konfiguration

Die Einstellungen des DSA-Moduls finden Sie unter **WooCommerce > Einstellungen > Polski > DSA**.

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| DSA-Formular aktivieren | Aktiviert das Modul | Ja |
| Formularseite | WordPress-Seite mit dem Shortcode | Keine |
| Administrator-E-Mail | E-Mail-Adresse für Benachrichtigungen | E-Mail des WordPress-Administrators |
| Bearbeitungsfrist | Anzahl der Werktage für die Bearbeitung | 7 |
| Meldekategorien | Liste der verfügbaren Kategorien | Standardliste |

## Widget auf der Produktseite (Polski 1.14.0+)

Ab Version 1.14.0 können Sie ein optionales Melde-Widget direkt auf der Produktseite aktivieren. Der Kunde klickt auf "Illegale Inhalte melden (DSA)" und klappt ein Formular mit **vorausgefüllter Produkt-URL** und Namen auf, ohne den Link abtippen zu müssen.

```php
update_option('polski_dsa', array_merge(
    (array) get_option('polski_dsa', []),
    [
        'product_widget_enabled' => true,
        'product_widget_position' => 'after_summary', // oder 'product_meta'
    ]
));
```

Das Widget nutzt das HTML-Element `<details>`, funktioniert ohne JavaScript und ist über Tastatur sowie Screenreader zugänglich. Das Formular wird an denselben Handler (`polski_dsa_report`) gesendet, sodass die Meldungen in derselben Warteschlange im Admin-Bereich landen.

| Schlüssel in `polski_dsa` | Wert | Beschreibung |
|---|---|---|
| `product_widget_enabled` | `false` (Standard) | Aktiviert das Widget auf Produktseiten |
| `product_widget_position` | `after_summary` \| `product_meta` | Position auf der Produktseite |

Entwicklerfilter:

| Filter | Zweck |
|---|---|
| `polski/dsa/product_widget_enabled` | Hauptschalter des Widgets |

## Fehlerbehebung

**Das Formular wird auf der Seite nicht angezeigt**
Prüfen Sie, ob der Shortcode `[polski_dsa_report]` auf der Seite steht und das DSA-Modul in den Einstellungen aktiviert ist.

**E-Mail-Benachrichtigungen kommen nicht an**
Prüfen Sie die SMTP-Konfiguration. Die Standardfunktion `wp_mail()` funktioniert nicht auf allen Servern. Installieren Sie ein SMTP-Plugin (z. B. WP Mail SMTP).

**Meldungen erscheinen nicht im Bereich**
Prüfen Sie die Berechtigungen. Zur Verwaltung von DSA-Meldungen benötigen Sie die Rolle `shop_manager` oder `administrator`.

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
