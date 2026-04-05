---
title: Einwilligungsverwaltung
description: Dokumentation der erweiterten Einwilligungsverwaltung in Polski PRO for WooCommerce - Versionierung, Audit-Trail, DSGVO-Export, Integration mit Mein Konto.
---

Das Modul fuegt Einwilligungsversionierung, Audit-Trail, Datenexport und DSGVO-Integration hinzu. Verfolgt die Einwilligungshistorie der Kunden und reagiert auf Aenderungen der Regulierungstexte.

## Versionierung von Einwilligungen

### Automatische Aenderungserkennung

Das Plugin ueberwacht den Inhalt der Checkbox-Labels. Bei jedem Speichern der Einstellungen berechnet es einen Hash (SHA-256) des Label-Textes. Wenn sich der Hash geaendert hat, erstellt das Plugin automatisch eine neue Version der Einwilligung.

Jede Einwilligungsversion enthaelt:

- Versionsnummer (Auto-Inkrement)
- Hash des Label-Textes
- Vollstaendigen Label-Text
- Erstellungsdatum der Version
- Benutzer-ID desjenigen, der die Aenderung vorgenommen hat

### Versionsverlauf

In den Einstellungen der rechtlichen Checkboxen steht bei jedem Checkbox die Schaltflaeche **Versionsverlauf** zur Verfuegung. Sie zeigt eine Liste aller Versionen mit Daten und Textvorschau.

### Erneute Einwilligung

Wenn sich der Einwilligungstext aendert (neue Version), kann das Plugin die erneute Einwilligung durch Kunden verlangen. Konfiguration:

| Einstellung | Beschreibung |
|------------|------|
| Erneute Einwilligung verlangen | Aktiviert die Aufforderung zur erneuten Einwilligung nach Textaenderung |
| Aufforderung anzeigen | Auf der Checkout-Seite / Im Mein-Konto-Bereich / Beides |
| Meldungstext | Text, der den Kunden ueber die AGB-Aenderung informiert |

Der Kunde sieht eine Meldung ueber die Textaenderung und muss den Checkbox erneut aktivieren. Die fruehere Einwilligung bleibt in der Historie mit Versionsmarkierung erhalten.

## Audit-Trail

### Aufgezeichnete Ereignisse

Das Plugin zeichnet alle einwilligungsbezogenen Operationen auf:

| Ereignis | Daten |
|-----------|------|
| Einwilligung erteilt | Benutzer-ID, Einwilligungs-ID, Version, Datum, IP, User Agent |
| Einwilligung widerrufen | Benutzer-ID, Einwilligungs-ID, Datum, Quelle (Kunde/Admin) |
| Einwilligungstext geaendert | Einwilligungs-ID, alte Version, neue Version, Datum, Admin-ID |
| Aufforderung zur erneuten Einwilligung | Benutzer-ID, Einwilligungs-ID, Datum |
| Erneute Einwilligung | Benutzer-ID, Einwilligungs-ID, neue Version, Datum |

### Verlauf anzeigen

Gehen Sie zu **WooCommerce > Einstellungen > Polski > PRO-Module > Einwilligungen > Audit-Trail**. Die Tabelle zeigt alle Ereignisse mit Filtern:

- Benutzer-ID oder E-Mail
- Ereignistyp
- Datumsbereich
- Bestimmte Einwilligung

### Datenexport

Der Audit-Trail kann in zwei Formaten exportiert werden:

- **CSV** - zum Oeffnen in Tabellenkalkulationsprogrammen
- **JSON** - zur programmatischen Verarbeitung oder zum Import in andere Systeme

Der Export ist aus dem Audit-Trail-Bereich verfuegbar. Sie koennen den vollstaendigen Verlauf oder gefilterte Ergebnisse exportieren.

## Integration mit dem Mein-Konto-Bereich

### Einwilligung widerrufen

Im **Mein-Konto**-Bereich des Kunden erscheint der Abschnitt "Meine Einwilligungen" mit einer Liste der erteilten Einwilligungen. Der Kunde kann:

- aktuell erteilte Einwilligungen einsehen
- das Datum der Erteilung jeder Einwilligung sehen
- eine Einwilligung mit der Schaltflaeche "Widerrufen" zurueckziehen

Der Widerruf der Einwilligung wird im Audit-Trail aufgezeichnet. Der Administrator erhaelt eine E-Mail-Benachrichtigung ueber den Widerruf (konfigurierbar).

### Aufforderung zur erneuten Einwilligung

Wenn sich der Einwilligungstext geaendert hat, sieht der Kunde im Mein-Konto-Bereich eine Meldung mit der Bitte, sich mit der neuen Version vertraut zu machen und die Einwilligung erneut zu erteilen.

## DSGVO-Integration

### Export personenbezogener Daten

Das Plugin integriert sich mit dem WordPress-Mechanismus zum Export personenbezogener Daten (`wp_privacy_personal_data_exporters`). Bei einer Exportanfrage der Kundendaten fuegt das Plugin hinzu:

- Liste der erteilten Einwilligungen mit Daten und Versionen
- Vollstaendige Historie der Einwilligungsaenderungen (Erteilungen, Widerrufe, erneute Einwilligungen)
- IP-Adressen und Daten, die mit jeder Einwilligung verknuepft sind

```php
/**
 * Rejestracja eksportera danych osobowych.
 */
add_filter('wp_privacy_personal_data_exporters', function (array $exporters): array {
    $exporters['polski-pro-consents'] = [
        'exporter_friendly_name' => 'Polski PRO - Zgody',
        'callback'               => [PolskiPro\Privacy\Exporter::class, 'export'],
    ];
    return $exporters;
});
```

### Loeschung personenbezogener Daten

Das Plugin integriert sich mit dem WordPress-Mechanismus zur Datenloeschung (`wp_privacy_personal_data_erasers`). Bei einer Loeschanfrage:

- werden personenbezogene Daten im Audit-Trail anonymisiert (IP, User Agent)
- werden Einwilligungseintraege als geloescht markiert
- bleibt die Tatsache der Erteilung/des Widerrufs (ohne identifizierende Daten) zu Nachweiszwecken erhalten

```php
/**
 * Rejestracja erasera danych osobowych.
 */
add_filter('wp_privacy_personal_data_erasers', function (array $erasers): array {
    $erasers['polski-pro-consents'] = [
        'eraser_friendly_name' => 'Polski PRO - Zgody',
        'callback'             => [PolskiPro\Privacy\Eraser::class, 'erase'],
    ];
    return $erasers;
});
```

## REST API

Das Modul stellt einen REST-API-Endpunkt zum Anzeigen von Einwilligungen bereit (verfuegbar fuer Administratoren):

### Benutzereinwilligungen auflisten

```
GET /wp-json/polski-pro/v1/consents?user_id={id}
```

Gibt eine Liste der Benutzereinwilligungen mit aktuellem Status und Version zurueck.

### Aenderungshistorie

```
GET /wp-json/polski-pro/v1/consents/audit?user_id={id}
```

Query-Parameter:

| Parameter | Typ | Beschreibung |
|----------|-----|------|
| `user_id` | int | Benutzer-ID |
| `consent_id` | string | ID einer bestimmten Einwilligung |
| `event_type` | string | Ereignistyp (granted, revoked, re_consented) |
| `date_from` | string | Datum von (YYYY-MM-DD) |
| `date_to` | string | Datum bis (YYYY-MM-DD) |
| `per_page` | int | Anzahl der Ergebnisse (Standard 50) |

### Export

```
GET /wp-json/polski-pro/v1/consents/export?format={csv|json}
```

Gibt den vollstaendigen Audit-Trail-Export im gewaehlten Format zurueck.

## Hooks

### `polski_pro/consent/granted`

Aktion, die nach Erteilung einer Einwilligung ausgefuehrt wird.

```php
/**
 * @param int    $user_id    ID użytkownika
 * @param string $consent_id ID zgody
 * @param int    $version    Numer wersji zgody
 */
do_action('polski_pro/consent/granted', int $user_id, string $consent_id, int $version);
```

**Beispiel:**

```php
add_action('polski_pro/consent/granted', function (int $user_id, string $consent_id, int $version): void {
    // Synchronizacja z zewnętrznym CRM
    if ($consent_id === 'marketing') {
        wp_remote_post('https://crm.example.com/api/consent', [
            'body' => wp_json_encode([
                'email'   => get_userdata($user_id)->user_email,
                'consent' => 'marketing',
                'status'  => 'granted',
                'version' => $version,
            ]),
            'headers' => ['Content-Type' => 'application/json'],
        ]);
    }
}, 10, 3);
```

### `polski_pro/consent/revoked`

Aktion, die nach dem Widerruf einer Einwilligung ausgefuehrt wird.

```php
/**
 * @param int    $user_id    ID użytkownika
 * @param string $consent_id ID zgody
 * @param string $source     Źródło wycofania (customer, admin)
 */
do_action('polski_pro/consent/revoked', int $user_id, string $consent_id, string $source);
```

**Beispiel:**

```php
add_action('polski_pro/consent/revoked', function (int $user_id, string $consent_id, string $source): void {
    if ($consent_id === 'newsletter' && $source === 'customer') {
        // Wypisanie z newslettera
        do_action('newsletter_unsubscribe', get_userdata($user_id)->user_email);
    }
}, 10, 3);
```

## Haeufige Probleme

### Aufforderung zur erneuten Einwilligung wird nicht angezeigt

1. Pruefen Sie, ob die Option "Erneute Einwilligung verlangen" aktiviert ist
2. Ueberpruefen Sie, ob sich der Einwilligungstext tatsaechlich geaendert hat (pruefen Sie den Versionsverlauf)
3. Leeren Sie den Cache der Checkout-Seite und des Mein-Konto-Bereichs

### DSGVO-Export enthaelt keine Einwilligungsdaten

1. Stellen Sie sicher, dass das Modul zur Einwilligungsverwaltung aktiv ist
2. Pruefen Sie, ob der Exporter `polski-pro-consents` unter **Werkzeuge > Personenbezogene Daten exportieren** registriert ist
3. Ueberpruefen Sie die Logs auf PHP-Fehler

### Audit-Trail waechst zu schnell

Das Plugin speichert die Einwilligungshistorie in einer separaten Datenbanktabelle. Bei einer grossen Kundenanzahl kann die Tabelle wachsen. Erwaegen Sie:

- regelmaessigen Export und Archivierung aelterer Eintraege
- Einrichtung einer automatischen Bereinigung von Eintraegen, die aelter als eine bestimmte Anzahl von Monaten sind (Option in den Einstellungen)

## Verwandte Ressourcen

- [Rechtliche Checkboxen](/checkout/legal-checkboxes/)
- [DSGVO](/compliance/gdpr/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
