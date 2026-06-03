---
title: Register für Sicherheitsvorfälle
description: Register für Sicherheitsvorfälle (CRA) in Polski for WooCommerce - Erfassung von Ereignissen, CSV-Export und Konformität mit dem Cyber Resilience Act.
---

Das Vorfallregister ermöglicht es, Sicherheitsereignisse im Shop zu dokumentieren. Es unterstützt die Konformität mit dem Cyber Resilience Act (CRA) - einer EU-Verordnung, die ein Vorfallregister für Produkte mit digitalen Elementen verlangt.

## Was ist der CRA

Der CRA ist eine EU-Verordnung zur Cybersicherheit von Produkten mit digitalen Elementen. Händler müssen:

- Ein Register für Sicherheitsvorfälle führen
- Vorfälle innerhalb von 24 Stunden an die Aufsichtsbehörden melden
- Kunden über entdeckte Schwachstellen informieren
- Korrekturmaßnahmen dokumentieren

## Zugriff auf das Register

Gehe zu **WooCommerce > Polski > Werkzeuge > Sicherheitsvorfälle**. Erfordert die Berechtigung `manage_woocommerce`.

## Vorfall erfassen

Klicke auf **Vorfall hinzufügen** und fülle das Formular aus:

### Formularfelder

| Feld                    | Typ       | Pflicht  | Beschreibung                            |
| ----------------------- | --------- | -------- | --------------------------------------- |
| Titel                   | text      | Ja       | Kurze Beschreibung des Vorfalls         |
| Datum der Entdeckung    | datetime  | Ja       | Wann der Vorfall entdeckt wurde         |
| Datum des Eintritts     | datetime  | Nein     | Wann der Vorfall tatsächlich stattfand  |
| Kategorie               | select    | Ja       | Art des Vorfalls                        |
| Priorität               | select    | Ja       | Kritisch / Hoch / Mittel / Niedrig      |
| Beschreibung            | textarea  | Ja       | Detaillierte Beschreibung des Ereignisses |
| Betroffene Produkte     | multiselect| Nein    | Vom Vorfall betroffene WooCommerce-Produkte |
| Auswirkungsumfang       | select    | Ja       | Anzahl der betroffenen Kunden           |
| Ergriffene Maßnahmen    | textarea  | Nein     | Beschreibung der Korrekturmaßnahmen     |
| Status                  | select    | Ja       | Neu / In Bearbeitung / Gelöst / Geschlossen |
| Verantwortliche Person  | select    | Nein     | Verantwortlicher WordPress-Benutzer     |
| An Behörde gemeldet     | checkbox  | Nein     | Ob der Vorfall an die Aufsichtsbehörde gemeldet wurde |
| Meldedatum              | datetime  | Nein     | Wann an die Behörde gemeldet wurde      |
| Kunden benachrichtigt   | checkbox  | Nein     | Ob die Kunden benachrichtigt wurden     |
| Benachrichtigungsdatum  | datetime  | Nein     | Wann die Kunden benachrichtigt wurden   |
| Anhänge                 | file      | Nein     | Logs, Screenshots, Berichte             |

### Vorfallkategorien

| Kategorie                | Beschreibung                                 |
| ------------------------ | -------------------------------------------- |
| Datenleck                | Unbefugter Zugriff auf personenbezogene Daten |
| Schadsoftware            | Malware, Skimmer, Backdoor                   |
| DDoS-Angriff             | Denial-of-Service-Angriff                    |
| Unbefugter Zugriff       | Einbruch in ein Admin- oder Kundenkonto      |
| Software-Schwachstelle   | Entdeckte Schwachstelle im Plugin oder Theme |
| Phishing                 | Phishing-Angriff auf Shop-Kunden             |
| Datenmanipulation        | Unbefugte Änderung von Daten (Preise, Bestellungen) |
| Sonstiges                | Sonstige Sicherheitsereignisse               |

### Auswirkungsskala

| Umfang                  | Beschreibung                                  |
| ----------------------- | --------------------------------------------- |
| Keine Auswirkung        | Vorfall entdeckt und blockiert                |
| Einzelner Kunde         | Betrifft 1 Kunden                             |
| Wenige Kunden           | Betrifft 2-10 Kunden                          |
| Viele Kunden            | Betrifft 11-100 Kunden                        |
| Massenhaft              | Betrifft mehr als 100 Kunden                  |

## Vorfallliste

Tabelle aller Vorfälle mit den Spalten:

- **ID** - Vorfallnummer
- **Datum** - Datum der Entdeckung
- **Titel** - kurze Beschreibung
- **Kategorie** - Art des Vorfalls
- **Priorität** - farbiges Label (rot/orange/gelb/grau)
- **Status** - aktueller Zustand
- **Verantwortlich** - zugewiesene Person
- **Meldung** - ob an die Aufsichtsbehörde gemeldet wurde

### Filtern und Sortieren

Filtere Vorfälle nach:
- Kategorie
- Priorität
- Status
- Datum (Datumsbereich)
- Verantwortlicher Person

Sortierung nach jeder Spalte (aufsteigend/absteigend).

### Suche

Das Suchfeld durchsucht Titel und Beschreibung der Vorfälle.

## Zeitleiste des Vorfalls (Timeline)

Jeder Vorfall hat eine Zeitleiste mit der Chronologie der Maßnahmen:

```
2025-06-15 08:30 - Vorfall vom Überwachungssystem entdeckt
2025-06-15 08:45 - Vorfall an Jan Kowalski zugewiesen
2025-06-15 09:00 - Analyse der Logs begonnen
2025-06-15 10:30 - Quelle identifiziert - unbefugter Zugriff über eine Schwachstelle im Plugin X
2025-06-15 11:00 - Plugin X auf die neueste Version aktualisiert
2025-06-15 11:30 - Passwörter aller Administratoren geändert
2025-06-15 12:00 - Vorfall an UODO gemeldet
2025-06-15 14:00 - Benachrichtigung an betroffene Kunden versendet
2025-06-15 15:00 - Status auf "Gelöst" geändert
```

Einträge werden automatisch (Statusänderung, Zuweisung) oder manuell (Notizen, Maßnahmen) hinzugefügt.

## CSV-Export

Klicke über der Tabelle auf **CSV exportieren**. Der Export enthält:

### Exportspalten

| Spalte                  | Beschreibung                        |
| ----------------------- | ----------------------------------- |
| `incident_id`           | Vorfallnummer                       |
| `title`                 | Titel                               |
| `detection_date`        | Datum der Entdeckung                |
| `occurrence_date`       | Datum des Eintritts                 |
| `category`              | Kategorie                           |
| `priority`              | Priorität                           |
| `description`           | Beschreibung                        |
| `affected_products`     | IDs der betroffenen Produkte        |
| `impact_scope`          | Auswirkungsumfang                   |
| `actions_taken`         | Ergriffene Maßnahmen                |
| `status`                | Status                              |
| `responsible_person`    | Verantwortliche Person              |
| `reported_to_authority` | Ob an die Behörde gemeldet          |
| `report_date`           | Meldedatum                          |
| `customers_notified`    | Ob Kunden benachrichtigt            |
| `notification_date`     | Benachrichtigungsdatum              |
| `resolution_date`       | Datum der Lösung                    |

### Export filtern

Der Export kann eingeschränkt werden auf:
- Einen ausgewählten Datumsbereich
- Eine ausgewählte Kategorie
- Einen ausgewählten Status

```php
// Hook zum Anpassen der Exportdaten
add_filter('polski/security_incidents/export_data', function (array $data): array {
    // Eigene Spalte hinzufügen
    foreach ($data as &$row) {
        $row['custom_field'] = 'wartość';
    }
    return $data;
});
```

## Benachrichtigungen

Automatische Benachrichtigungen:

| Ereignis                           | Empfänger               | Kanal  |
| ---------------------------------- | ----------------------- | ------ |
| Neuer kritischer Vorfall           | Alle Administratoren    | E-Mail |
| Statusänderung eines Vorfalls      | Verantwortliche Person  | E-Mail |
| Vorfall ohne Maßnahmen > 24 h      | Verantwortliche Person  | E-Mail |
| Bevorstehende Meldefrist           | Administratoren         | E-Mail |

Konfiguration der Benachrichtigungen: **WooCommerce > Polski > Werkzeuge > Vorfälle > Benachrichtigungen**.

## Automatische Erkennung

Das Modul erfasst bestimmte Ereignisse automatisch:

- **Fehlgeschlagene Anmeldungen** - eine Serie fehlgeschlagener Anmeldeversuche (Brute Force)
- **Änderung von Core-Dateien** - Modifikation von WordPress-Core-Dateien
- **Neuer Admin-Benutzer** - Anlegen eines Kontos mit Administratorrolle
- **Berechtigungsänderung** - Anhebung der Berechtigungen eines bestehenden Kontos

Erkannte Ereignisse erhalten eine zugewiesene Kategorie und Priorität, erfordern aber eine manuelle Überprüfung (Status "Neu").

```php
// Automatische Erkennung deaktivieren
add_filter('polski/security_incidents/auto_detect', '__return_false');
```

## Vorfälle programmgesteuert hinzufügen

```php
do_action('polski/security_incidents/create', [
    'title'          => 'Wykryto próbę SQL injection',
    'category'       => 'unauthorized_access',
    'priority'       => 'high',
    'description'    => 'Wykryto próbę SQL injection w parametrze product_id.',
    'detection_date' => current_time('mysql'),
    'status'         => 'new',
]);
```

## Fehlerbehebung

**Benachrichtigungen kommen nicht an** - überprüfe die E-Mail-Konfiguration von WordPress. Verwende ein SMTP-Plugin (z. B. WP Mail SMTP) anstelle des standardmäßigen `wp_mail()`.

**Der CSV-Export liefert eine leere Datei** - überprüfe die Filter. Zu restriktives Filtern führt zu einem leeren Ergebnis.

**Zu viele Alerts** - passe die Schwellenwerte in den Einstellungen an. Der Standardschwellenwert für fehlgeschlagene Anmeldungen (5 in 15 Minuten) kann für große Shops zu niedrig sein.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
