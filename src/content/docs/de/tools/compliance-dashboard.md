---
title: Compliance-Panel
description: Panel zur Kontrolle rechtlicher Anforderungen in Polski for WooCommerce - Checkliste mit farbigem Status fuer jede Anforderung.
---

Das Compliance-Panel ist der zentrale Ort zur Pruefung der rechtlichen Anforderungen des Shops. Es zeigt eine Checkliste mit Status fuer jede Anforderung - von den AGB bis GPSR und DSA.

## Zugang zum Panel

Gehen Sie zu **WooCommerce > Polski > Compliance-Panel**. Das Panel ist fuer Benutzer mit der Berechtigung `manage_woocommerce` (Rollen Administrator und Shop-Manager) zugaenglich.

## Checkliste

Das Panel zeigt eine Liste rechtlicher Anforderungen, gruppiert nach Kategorien. Jede Anforderung hat einen visuellen Status:

### Status

| Status | Farbe   | Symbol | Beschreibung                                      |
| ------ | ------- | ----- | ----------------------------------------- |
| OK     | Gruen | Haken     | Anforderung erfuellt                       |
| WARN   | Gelb   | !     | Teilweise erfuellt, erfordert Aufmerksamkeit         |
| FAIL   | Rot| X     | Nicht erfuellt, erfordert sofortige Massnahme |
| OFF    | Grau   | -     | Modul deaktiviert                           |

### Kategorie: Rechtsseiten

| Pruefung                          | Gruen wenn                      |
| ------------------------------------ | --------------------------------------- |
| AGB                     | Seite veroeffentlicht und zugewiesen        |
| Datenschutzerklaerung                 | Seite veroeffentlicht und zugewiesen        |
| Widerrufsbelehrung    | Seite veroeffentlicht mit Formular       |
| Cookie-Richtlinie                     | Seite veroeffentlicht                     |
| Liefer- und Zahlungsinformation | Seite veroeffentlicht                     |

### Kategorie: Rechtliche Checkboxen

| Pruefung                          | Gruen wenn                      |
| ------------------------------------ | --------------------------------------- |
| AGB-Akzeptanz (Kasse)         | Checkbox aktiv und erforderlich             |
| Datenschutzerklaerung (Kasse)          | Checkbox aktiv und erforderlich             |
| AGB-Akzeptanz (Registrierung)  | Checkbox aktiv und erforderlich             |
| Marketing-Einwilligung                   | Checkbox aktiv (optional)           |

### Kategorie: Omnibus-Richtlinie

| Pruefung                          | Gruen wenn                      |
| ------------------------------------ | --------------------------------------- |
| Omnibus-Modul aktiv               | Modul in Einstellungen aktiviert           |
| Preishistorie wird gespeichert              | Preishistorietabelle existiert und funktioniert   |
| Niedrigster Preis wird angezeigt           | Preis bei Produkten im Angebot sichtbar  |
| 30-Tage-Zeitraum                         | Zeitraum auf mindestens 30 Tage eingestellt      |

### Kategorie: GPSR

| Pruefung                          | Gruen wenn                      |
| ------------------------------------ | --------------------------------------- |
| GPSR-Modul aktiv                  | Modul aktiviert                          |
| Herstellerdaten ergaenzt          | Mindestens 80% der Produkte haben GPSR-Daten  |
| Vertreterdaten                 | Fuer Produkte von ausserhalb der EU ergaenzt      |
| Sicherheitsinformationen         | Fuer erforderliche Produkte ergaenzt  |

### Kategorie: DSA

| Pruefung                          | Gruen wenn                      |
| ------------------------------------ | --------------------------------------- |
| DSA-Meldeformular              | Formular auf einer Seite verfuegbar           |
| DSA-Kontaktstelle                 | Kontakt-E-Mail eingestellt             |
| Meldungsregister                     | Meldungstabelle existiert                |

## Zusammenfassung

Oben im Panel wird eine Zusammenfassung angezeigt:

- **Gesamtergebnis** - Prozentsatz erfuellter Anforderungen (z.B. 85%)
- **Fortschrittsbalken** - visuelle Darstellung des Ergebnisses
- **Kritische Anforderungen** - Anzahl nicht erfuellter FAIL-Anforderungen
- **Warnungen** - Anzahl teilweise erfuellter WARN-Anforderungen
- **Datum der letzten Pruefung** - wann das Panel zuletzt aktualisiert wurde

## Berichtsexport

Das Panel ermoeglicht den Export des Konformitaetsberichts:

- **PDF** - Bericht zum Herunterladen oder Drucken
- **JSON** - maschinenlesbare Daten (z.B. fuer Monitoring-Systeme)

```php
// Hook nach Berichtsgenerierung
add_action('polski/compliance/report_generated', function (array $results, string $format): void {
    update_option('polski_last_compliance_report', current_time('mysql'));
}, 10, 2);
```

## Benachrichtigungen

Das Panel kann E-Mail-Benachrichtigungen an den Administrator senden:

- **Wochenbericht** - Statuszusammenfassung einmal pro Woche
- **Kritischer Alarm** - sofortige Benachrichtigung bei Statuswechsel auf FAIL

```php
// Berichtshaeufigkeit aendern
add_filter('polski/compliance/report_frequency', function (): string {
    return 'daily'; // 'daily', 'weekly', 'monthly'
});
```

## Eigene Pruefungen hinzufuegen

```php
add_filter('polski/compliance/checks', function (array $checks): array {
    $checks[] = [
        'id'       => 'custom_ssl',
        'category' => 'security',
        'label'    => 'SSL-Zertifikat',
        'callback' => function (): array {
            $is_ssl = is_ssl();
            return [
                'status'  => $is_ssl ? 'ok' : 'fail',
                'message' => $is_ssl ? 'SSL aktiv' : 'Kein SSL-Zertifikat',
            ];
        },
    ];
    return $checks;
});
```

## Fehlerbehebung

**Panel zeigt veraltete Daten** - klicken Sie auf den Button **Aktualisieren** oben im Panel.

**FAIL-Status fuer Rechtsseite** - pruefen Sie, ob die Seite veroeffentlicht ist (nicht im Entwurf) und ob sie unter **WooCommerce > Einstellungen > Erweitert > Seiteneinstellungen** zugewiesen ist.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
