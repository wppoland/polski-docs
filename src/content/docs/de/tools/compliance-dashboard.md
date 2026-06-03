---
title: Compliance-Panel (compliance dashboard)
description: Panel zur Kontrolle rechtlicher Anforderungen in Polski for WooCommerce - Checkliste mit farbigem Status für jede Anforderung.
---

Das Compliance-Panel ist der zentrale Ort zur Prüfung der rechtlichen Anforderungen des Shops. Es zeigt eine Checkliste mit dem Status jeder Anforderung an, von den AGB bis hin zu GPSR und DSA.

## Zugang zum Panel

Gehen Sie zu **WooCommerce > Polski > Compliance-Panel**. Erfordert die Berechtigung `manage_woocommerce` (Administrator oder Shop-Manager).

## Checkliste

Rechtliche Anforderungen, gruppiert nach Kategorien. Jede hat einen visuellen Status:

### Status

| Status | Farbe   | Symbol | Beschreibung                              |
| ------ | ------- | ----- | ----------------------------------------- |
| OK     | Grün    | ✓     | Anforderung erfüllt                       |
| WARN   | Gelb    | !     | Teilweise erfüllt, erfordert Aufmerksamkeit |
| FAIL   | Rot     | ✗     | Nicht erfüllt, erfordert sofortige Maßnahme |
| OFF    | Grau    | -     | Modul deaktiviert                         |

### Kategorie: Rechtsseiten

| Prüfung                              | Grüner Status wenn                      |
| ------------------------------------ | --------------------------------------- |
| AGB des Shops                        | Seite veröffentlicht und zugewiesen     |
| Datenschutzerklärung                 | Seite veröffentlicht und zugewiesen     |
| Widerrufsbelehrung                   | Seite veröffentlicht mit Formular       |
| Cookie-Richtlinie                    | Seite veröffentlicht                     |
| Liefer- und Zahlungsinformationen    | Seite veröffentlicht                     |

### Kategorie: Rechtliche Checkboxen

| Prüfung                              | Grüner Status wenn                      |
| ------------------------------------ | --------------------------------------- |
| AGB-Akzeptanz (Kasse)                | Checkbox aktiv und erforderlich         |
| Datenschutzerklärung (Kasse)         | Checkbox aktiv und erforderlich         |
| AGB-Akzeptanz (Registrierung)        | Checkbox aktiv und erforderlich         |
| Marketing-Einwilligung               | Checkbox aktiv (optional)               |

### Kategorie: Omnibus-Richtlinie

| Prüfung                              | Grüner Status wenn                      |
| ------------------------------------ | --------------------------------------- |
| Omnibus-Modul aktiv                  | Modul in den Einstellungen aktiviert    |
| Preishistorie wird gespeichert       | Preishistorietabelle existiert und funktioniert |
| Niedrigster Preis wird angezeigt     | Preis bei Produkten im Angebot sichtbar |
| 30-Tage-Zeitraum                     | Zeitraum auf mindestens 30 Tage eingestellt |

### Kategorie: GPSR

| Prüfung                              | Grüner Status wenn                      |
| ------------------------------------ | --------------------------------------- |
| GPSR-Modul aktiv                     | Modul aktiviert                         |
| Herstellerdaten ergänzt              | Mindestens 80% der Produkte haben GPSR-Daten |
| Vertreterdaten                       | Für Produkte von außerhalb der EU ergänzt |
| Sicherheitsinformationen             | Für erforderliche Produkte ergänzt      |

### Kategorie: DSA (Digital Services Act)

| Prüfung                              | Grüner Status wenn                      |
| ------------------------------------ | --------------------------------------- |
| DSA-Meldeformular                    | Formular auf einer Seite verfügbar      |
| DSA-Kontaktstelle                    | Kontakt-E-Mail eingestellt              |
| Meldungsregister                     | Meldungstabelle existiert               |

### Kategorie: Kasse

| Prüfung                              | Grüner Status wenn                      |
| ------------------------------------ | --------------------------------------- |
| Beschriftung der Bestellschaltfläche | Text konform mit EU-Richtlinie          |
| Bestellzusammenfassung               | Vor der Zahlungsschaltfläche sichtbar   |
| Information zu MwSt. und Versand     | Bei den Produktpreisen angezeigt        |

### Kategorie: KSeF

| Prüfung                              | Grüner Status wenn                      |
| ------------------------------------ | --------------------------------------- |
| KSeF-Modul aktiv                     | Modul aktiviert                         |
| Firmen-NIP eingestellt               | NIP in den Einstellungen konfiguriert   |
| Verbindung mit KSeF                  | Verbindungstest erfolgreich abgeschlossen |

### Kategorie: Greenwashing

| Prüfung                              | Grüner Status wenn                      |
| ------------------------------------ | --------------------------------------- |
| Anti-Greenwashing-Modul aktiv        | Modul aktiviert                         |
| Aussagen mit Nachweisen              | Alle Aussagen sind belegt               |
| Zertifikate mit Links                | Zertifikate haben Nummern und URLs      |

## Zusammenfassung

Oben im Panel wird eine Zusammenfassung angezeigt:

- **Gesamtergebnis** - Prozentsatz der erfüllten Anforderungen (z. B. 85%)
- **Fortschrittsbalken** - visuelle Darstellung des Ergebnisses
- **Kritische Anforderungen** - Anzahl der nicht erfüllten FAIL-Anforderungen
- **Warnungen** - Anzahl der teilweise erfüllten WARN-Anforderungen
- **Datum der letzten Prüfung** - wann das Panel zuletzt aktualisiert wurde

## Details einer Anforderung

Klicken Sie auf eine Anforderung, um Details zu sehen:

- **Beschreibung** - was genau geprüft wird
- **Rechtsgrundlage** - Verweis auf die Vorschrift
- **Status** - detaillierte Beschreibung des Zustands
- **Empfohlene Maßnahme** - was zu tun ist, um die Anforderung zu erfüllen
- **Link zu den Einstellungen** - direkter Link zur passenden Einstellungsseite

## Aktualisierung der Status

Das Panel prüft die Status live bei jedem Öffnen. Die Prüfungen umfassen:

- Existenz und Status der Seiten (veröffentlicht / Entwurf / gelöscht)
- Existenz und Konfiguration der Checkboxen
- Korrektheit der Daten in den Produkt-Metadaten (Sampling - zufällige Stichprobe von 100 Produkten)
- Funktion der Module (Aktivität, korrekte Konfiguration)
- Verbindungstests mit externen APIs (KSeF)

## Berichtsexport

Exportieren Sie den Compliance-Bericht:

- **PDF** - Bericht zum Herunterladen oder Drucken
- **JSON** - maschinenlesbare Daten (z. B. für ein Monitoring-System)

```php
// Hook nach Generierung des Berichts
add_action('polski/compliance/report_generated', function (array $results, string $format): void {
    // Protokollierung des Generierungsdatums des Berichts
    update_option('polski_last_compliance_report', current_time('mysql'));
}, 10, 2);
```

## Benachrichtigungen

Das Panel sendet E-Mail-Benachrichtigungen an den Administrator:

- **Wochenbericht** - Statuszusammenfassung, einmal pro Woche versendet
- **Kritischer Alarm** - sofortige Benachrichtigung, wenn ein Status auf FAIL wechselt

Konfiguration der Benachrichtigungen: **WooCommerce > Polski > Compliance-Panel > Benachrichtigungen**.

```php
// Häufigkeit des Berichts ändern
add_filter('polski/compliance/report_frequency', function (): string {
    return 'daily'; // 'daily', 'weekly', 'monthly'
});
```

## Filter für Anforderungen

Sie können eigene Prüfungen zum Panel hinzufügen:

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

**Das Panel zeigt veraltete Daten** - klicken Sie oben im Panel auf **Aktualisieren**. Einige Daten (z. B. GPSR-Sampling) können zwischengespeichert sein.

**FAIL-Status für eine Rechtsseite** - prüfen Sie, ob die Seite veröffentlicht ist (nicht Entwurf) und unter **WooCommerce > Einstellungen > Erweitert > Seiteneinstellungen** zugewiesen ist.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
