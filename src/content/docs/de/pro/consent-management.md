---
title: Einwilligungsverwaltung
description: Dokumentation der erweiterten Einwilligungsverwaltung in Polski PRO for WooCommerce - Versionierung, Audit-Trail, DSGVO-Export, Integration mit Mein Konto.
---

Das Modul zur Einwilligungsverwaltung fügt Versionierung von Einwilligungen, einen Audit-Trail, Datenexport und DSGVO-Integration hinzu. Es verfolgt die Einwilligungshistorie der Kunden und reagiert auf Änderungen am Inhalt der Bedingungen.

## Versionierung von Einwilligungen

### Automatische Erkennung von Änderungen

Das Plugin verfolgt den Inhalt der Checkboxen. Bei jedem Speichern der Einstellungen vergleicht es den Hash (SHA-256) des Inhalts. Ändert sich der Inhalt, erstellt es automatisch eine neue Einwilligungsversion.

Jede Einwilligungsversion enthält:

- Versionsnummer (automatische Inkrementierung)
- Hash des Etiketteninhalts
- vollständigen Inhalt des Etiketts
- Erstellungsdatum der Version
- ID des Benutzers, der die Änderung vorgenommen hat

### Versionshistorie

Klicken Sie bei der Checkbox auf **Versionshistorie**, um alle Versionen mit Daten und Inhalten anzuzeigen.

### Erneute Einwilligung

Ändert sich der Inhalt einer Einwilligung, kann das Plugin eine erneute Einwilligung verlangen. Einstellungen:

| Einstellung | Beschreibung |
|------------|------|
| Erneute Einwilligung verlangen | Aktiviert die Aufforderung zur erneuten Einwilligung nach einer Inhaltsänderung |
| Aufforderung anzeigen | Auf der Kassenseite / Im Mein-Konto-Bereich / Beides |
| Inhalt der Mitteilung | Text, der den Kunden über die Änderung der Bedingungen informiert |

Der Kunde sieht eine Mitteilung über die Änderung und muss die Checkbox erneut markieren. Die frühere Einwilligung bleibt in der Historie.

## Audit-Trail

### Aufgezeichnete Ereignisse

Das Plugin protokolliert alle Operationen an Einwilligungen:

| Ereignis | Daten |
|-----------|------|
| Einwilligung erteilt | Benutzer-ID, Einwilligungs-ID, Version, Datum, IP, User Agent |
| Einwilligung widerrufen | Benutzer-ID, Einwilligungs-ID, Datum, Quelle (Kunde/Admin) |
| Änderung des Einwilligungsinhalts | Einwilligungs-ID, alte Version, neue Version, Datum, Admin-ID |
| Aufforderung zur erneuten Einwilligung | Benutzer-ID, Einwilligungs-ID, Datum |
| Erneute Einwilligung | Benutzer-ID, Einwilligungs-ID, neue Version, Datum |

### Historie ansehen

Gehen Sie zu **WooCommerce > Einstellungen > Polski > PRO-Module > Einwilligungen > Audit-Trail**. Filtern Sie Ereignisse nach:

- Benutzer-ID oder E-Mail
- Ereignistyp
- Datumsbereich
- bestimmte Einwilligung

### Datenexport

Exportieren Sie den Audit-Trail im Format:

- **CSV** - für Tabellenkalkulationen
- **JSON** - für die programmatische Verarbeitung

Exportieren Sie die vollständige Historie oder gefilterte Ergebnisse aus dem Audit-Trail-Panel.

## Integration mit dem Mein-Konto-Bereich

### Einwilligung widerrufen

Unter **Mein Konto** sieht der Kunde den Abschnitt "Meine Einwilligungen". Er kann:

- aktuell erteilte Einwilligungen ansehen
- das Datum der Erteilung jeder Einwilligung sehen
- eine Einwilligung mit der Schaltfläche "Widerrufen" widerrufen

Der Widerruf wird im Audit-Trail gespeichert. Der Administrator erhält eine E-Mail-Benachrichtigung (konfigurierbar).

### Aufforderung zur erneuten Einwilligung

Ändert sich der Inhalt einer Einwilligung, sieht der Kunde in Mein Konto die Aufforderung, die neue Version zur Kenntnis zu nehmen und erneut einzuwilligen.

## DSGVO-Integration

### Export personenbezogener Daten

Das Plugin integriert sich in den Datenexport von WordPress (`wp_privacy_personal_data_exporters`). Beim Export der Kundendaten fügt es hinzu:

- die Liste der erteilten Einwilligungen mit Daten und Versionen
- die vollständige Historie der Einwilligungsänderungen (Erteilungen, Widerrufe, erneute Einwilligungen)
- die mit jeder Einwilligung verknüpften IP-Adressen und Daten

```php
/**
 * Registrierung des Exporters für personenbezogene Daten.
 */
add_filter('wp_privacy_personal_data_exporters', function (array $exporters): array {
    $exporters['polski-pro-consents'] = [
        'exporter_friendly_name' => 'Polski PRO - Einwilligungen',
        'callback'               => [PolskiPro\Privacy\Exporter::class, 'export'],
    ];
    return $exporters;
});
```

### Löschung personenbezogener Daten

Das Plugin integriert sich in die Datenlöschung von WordPress (`wp_privacy_personal_data_erasers`). Beim Löschen von Daten:

- werden die personenbezogenen Daten im Audit-Trail anonymisiert (IP, User Agent)
- werden die Einwilligungseinträge als gelöscht markiert
- bleibt die Tatsache der Erteilung/des Widerrufs einer Einwilligung (ohne identifizierende Daten) zu Nachweiszwecken erhalten

```php
/**
 * Registrierung des Erasers für personenbezogene Daten.
 */
add_filter('wp_privacy_personal_data_erasers', function (array $erasers): array {
    $erasers['polski-pro-consents'] = [
        'eraser_friendly_name' => 'Polski PRO - Einwilligungen',
        'callback'             => [PolskiPro\Privacy\Eraser::class, 'erase'],
    ];
    return $erasers;
});
```

## REST API

Das Modul stellt einen REST-API-Endpunkt zum Ansehen der Einwilligungen bereit (für Administratoren verfügbar):

### Liste der Einwilligungen eines Benutzers

```
GET /wp-json/polski-pro/v1/consents?user_id={id}
```

Gibt die Liste der Einwilligungen des Benutzers mit aktuellem Status und Version zurück.

### Änderungshistorie

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

Gibt den vollständigen Export des Audit-Trails im gewählten Format zurück.

## Hooks

### `polski_pro/consent/granted`

Aktion, die nach Erteilung einer Einwilligung ausgelöst wird.

```php
/**
 * @param int    $user_id    Benutzer-ID
 * @param string $consent_id Einwilligungs-ID
 * @param int    $version    Versionsnummer der Einwilligung
 */
do_action('polski_pro/consent/granted', int $user_id, string $consent_id, int $version);
```

**Beispiel:**

```php
add_action('polski_pro/consent/granted', function (int $user_id, string $consent_id, int $version): void {
    // Synchronisation mit externem CRM
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

Aktion, die nach Widerruf einer Einwilligung ausgelöst wird.

```php
/**
 * @param int    $user_id    Benutzer-ID
 * @param string $consent_id Einwilligungs-ID
 * @param string $source     Quelle des Widerrufs (customer, admin)
 */
do_action('polski_pro/consent/revoked', int $user_id, string $consent_id, string $source);
```

**Beispiel:**

```php
add_action('polski_pro/consent/revoked', function (int $user_id, string $consent_id, string $source): void {
    if ($consent_id === 'newsletter' && $source === 'customer') {
        // Abmeldung vom Newsletter
        do_action('newsletter_unsubscribe', get_userdata($user_id)->user_email);
    }
}, 10, 3);
```

## Häufige Probleme

### Die Aufforderung zur erneuten Einwilligung wird nicht angezeigt

1. Prüfen Sie, ob die Option "Erneute Einwilligung verlangen" aktiviert ist
2. Überprüfen Sie, ob sich der Inhalt der Einwilligung tatsächlich geändert hat (prüfen Sie die Versionshistorie)
3. Leeren Sie den Cache der Kassenseite und des Mein-Konto-Bereichs

### Der DSGVO-Export enthält keine Einwilligungsdaten

1. Stellen Sie sicher, dass das Modul zur Einwilligungsverwaltung aktiv ist
2. Prüfen Sie, ob der Exporter `polski-pro-consents` unter **Werkzeuge > Export personenbezogener Daten** registriert ist
3. Überprüfen Sie die Logs auf PHP-Fehler

### Der Audit-Trail wächst zu schnell

Die Einwilligungshistorie befindet sich in einer separaten Tabelle. Bei vielen Kunden kann sie wachsen. Erwägen Sie:

- regelmäßiges Exportieren und Archivieren älterer Einträge
- das Einrichten einer automatischen Bereinigung von Einträgen, die älter als eine bestimmte Anzahl von Monaten sind (Option in den Einstellungen)

## Verwandte Ressourcen

- [Rechtliche Checkboxen](/checkout/legal-checkboxes/)
- [DSGVO](/compliance/gdpr/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
