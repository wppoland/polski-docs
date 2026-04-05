---
title: KSeF-Integration
description: Dokumentation der Integration von Polski PRO for WooCommerce mit dem Nationalen e-Rechnungssystem (KSeF) - Rechnungsversand, Statusverfolgung, API-Konfiguration und Fehlerbehandlung.
---

Das KSeF-Modul sendet elektronische Rechnungen an das Nationale e-Rechnungssystem (Finanzministerium). Rechnungen werden im Hintergrund gesendet, mit automatischer Wiederholung bei Fehlern.

## Was ist KSeF

Das Nationale e-Rechnungssystem (KSeF) ist eine Plattform des Finanzministeriums zum Ausstellen, Speichern und Empfangen strukturierter Rechnungen im XML-Format. Das Plugin stellt Werkzeuge zur Integration von WooCommerce mit KSeF bereit - es generiert Rechnungen im erforderlichen XML-Format und uebermittelt sie an das System.

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > PRO-Module > KSeF**.

### Verbindungseinstellungen

| Einstellung | Beschreibung |
|------------|------|
| KSeF-Integration aktivieren | Aktiviert das Modul |
| Umgebung | Test (Sandbox) oder Produktion |
| API-Schluessel (Token) | Autorisierungstoken, generiert im KSeF-Portal |
| NIP des Ausstellers | NIP, der mit dem KSeF-Konto verknuepft ist |

### Testumgebung

KSeF bietet eine Testumgebung (Sandbox) zur Ueberpruefung der Integration. Die Testumgebung:

- erfordert keinen echten Autorisierungsschluessel
- akzeptiert Rechnungen im gleichen Format wie die Produktionsumgebung
- uebermittelt keine Daten an das Finanzamt
- wird fuer erste Integrationstests empfohlen

Nach erfolgreicher Ueberpruefung in der Testumgebung wechseln Sie zur Produktionsumgebung und geben den richtigen API-Schluessel ein.

### API-Token erhalten

1. Melden Sie sich im KSeF-Portal an: https://ksef.mf.gov.pl/
2. Gehen Sie zum Bereich Token-Verwaltung
3. Generieren Sie einen neuen Token mit Berechtigungen zum Ausstellen von Rechnungen
4. Kopieren Sie den Token und fuegen Sie ihn in den Plugin-Einstellungen ein

## Rechnungsversand

### Automatischer Versand

Nach Aktivierung der Option **Automatischer Versand an KSeF** sendet das Plugin die Rechnung automatisch an KSeF, wenn sich ihr Status auf "Ausgestellt" (Issued) aendert. Der Versand erfolgt asynchron ueber den Action Scheduler.

### Manueller Versand

Im Bestellpanel in der Meta-Box "Rechnungen" steht die Schaltflaeche **An KSeF senden** zur Verfuegung. Ein Klick fuegt die Versandaufgabe zur Action-Scheduler-Warteschlange hinzu.

### Asynchrone Verarbeitung

Das Plugin nutzt den Action Scheduler (in WooCommerce integriert) fuer den asynchronen Rechnungsversand. Das bedeutet:

- der Versand blockiert nicht die Bestellbearbeitung
- Rechnungen werden nacheinander in der Warteschlange versendet
- bei einer grossen Anzahl von Rechnungen verarbeitet das System sie schrittweise

## XML-Generierung

Das Plugin generiert die Rechnung im XML-Format gemaess dem KSeF-Schema (FA(2)). Das XML-Dokument enthaelt:

- Header mit Datum und Rechnungstyp
- Verkaeuferdaten (NIP, Name, Adresse)
- Kaeuferdaten (NIP, Name, Adresse)
- Rechnungspositionen (Bezeichnung, Menge, Nettopreis, MwSt.-Satz, Wert)
- Zusammenfassung mit Aufschluesselung nach MwSt.-Saetzen
- Zahlungsinformationen

Das XML wird vor dem Versand validiert. Wenn die Validierung Fehler erkennt, wird die Rechnung nicht gesendet und im Log erscheint eine detaillierte Meldung.

## Statusverfolgung

Nach dem Senden der Rechnung an KSeF verfolgt das Plugin deren Status:

| Status | Beschreibung |
|--------|------|
| Queued | Rechnung zur Versandwarteschlange hinzugefuegt |
| Submitted | Rechnung an KSeF uebermittelt, wartet auf Verarbeitung |
| Accepted | Rechnung von KSeF akzeptiert, KSeF-Nummer zugewiesen |
| Rejected | Rechnung abgelehnt - pruefen Sie die Fehlermeldung |
| Error | Kommunikationsfehler mit der KSeF-API |

Nach der Akzeptanz speichert das Plugin die KSeF-Referenznummer in den Rechnungsmetadaten. Diese Nummer ist im Bestellpanel und auf dem PDF-Ausdruck sichtbar.

### Status-Polling

Das Plugin prueft automatisch den Status gesendeter Rechnungen. Nach der Uebermittlung einer Rechnung an KSeF fragt das Plugin die API alle paar Minuten (ueber den Action Scheduler) nach dem Status ab, bis die Antwort "Accepted" oder "Rejected" erhalten wird.

## Fehlerbehandlung und Wiederholung

Bei einem Kommunikationsfehler mit der KSeF-API wendet das Plugin einen Exponential-Backoff-Mechanismus an:

| Versuch | Verzoegerung |
|-------|-----------|
| 1. Wiederholung | 5 Minuten |
| 2. Wiederholung | 25 Minuten |
| 3. Wiederholung | 125 Minuten |

Nach drei fehlgeschlagenen Versuchen erhaelt die Rechnung den Status "Error" und erfordert manuelles Eingreifen. Der Administrator erhaelt eine E-Mail-Benachrichtigung ueber den fehlgeschlagenen Versand.

Typische Fehlerursachen:

- ungueltiger oder abgelaufener API-Token
- XML-Validierungsfehler (z. B. fehlende Kaeuferdaten)
- voruebergehende Nichtverfuegbarkeit der KSeF-API
- Nichtueberinstimmung des Aussteller-NIP mit dem Token

## Hooks

### `polski_pro_ksef_submit`

Aktion, die vor dem Senden der Rechnung an KSeF ausgefuehrt wird.

```php
/**
 * @param int    $invoice_id ID faktury
 * @param string $xml        Wygenerowany XML faktury
 */
do_action('polski_pro_ksef_submit', int $invoice_id, string $xml);
```

**Beispiel:**

```php
add_action('polski_pro_ksef_submit', function (int $invoice_id, string $xml): void {
    // Zapisanie kopii XML przed wysyłką
    $upload_dir = wp_upload_dir();
    $xml_path = $upload_dir['basedir'] . '/polski-pro/ksef-xml/';
    
    if (! is_dir($xml_path)) {
        wp_mkdir_p($xml_path);
    }
    
    file_put_contents(
        $xml_path . "invoice-{$invoice_id}.xml",
        $xml
    );
}, 10, 2);
```

### `polski_pro_ksef_check_status`

Aktion, die nach der Statuspruefung der Rechnung bei KSeF ausgefuehrt wird.

```php
/**
 * @param int    $invoice_id    ID faktury
 * @param string $status        Nowy status (accepted, rejected, error)
 * @param string $ksef_number   Numer referencyjny KSeF (tylko dla accepted)
 */
do_action('polski_pro_ksef_check_status', int $invoice_id, string $status, string $ksef_number);
```

**Beispiel:**

```php
add_action('polski_pro_ksef_check_status', function (int $invoice_id, string $status, string $ksef_number): void {
    if ($status === 'accepted') {
        // Powiadomienie zewnętrznego systemu o zaakceptowaniu faktury
        wp_remote_post('https://erp.example.com/api/ksef-update', [
            'body' => wp_json_encode([
                'invoice_id'  => $invoice_id,
                'ksef_number' => $ksef_number,
            ]),
            'headers' => ['Content-Type' => 'application/json'],
        ]);
    }
}, 10, 3);
```

## Diagnose

### Logs

Das Plugin protokolliert alle KSeF-Operationen im WooCommerce-Log. Gehen Sie zu **WooCommerce > Status > Logs** und waehlen Sie die Quelle `polski-pro-ksef`.

Protokollierte Ereignisse:

- Rechnungsversand (Request/Response)
- Statuspruefung
- XML-Validierungsfehler
- API-Kommunikationsfehler
- Versandwiederholungen

### Verbindung testen

In den KSeF-Moduleinstellungen steht die Schaltflaeche **Verbindung testen** zur Verfuegung. Sie sendet eine Testanfrage an die KSeF-API und ueberprueft:

- Korrektheit des Tokens
- Verbindung zum KSeF-Server
- Uebereinstimmung des NIP mit dem Token

## Haeufige Probleme

### Rechnung von KSeF abgelehnt

1. Pruefen Sie die Fehlermeldung im WooCommerce-Log
2. Haeufigste Ursachen: fehlender Kaeufer-NIP, ungueltiger MwSt.-Satz, unvollstaendige Adressdaten
3. Korrigieren Sie die Daten und senden Sie erneut

### API-Token funktioniert nicht

1. Stellen Sie sicher, dass der Token nicht abgelaufen ist
2. Pruefen Sie, ob der Token Berechtigungen zum Ausstellen von Rechnungen hat
3. Ueberpruefen Sie die Uebereinstimmung des NIP in den Plugin-Einstellungen mit dem NIP, der mit dem Token verknuepft ist

### Action Scheduler verarbeitet die Warteschlange nicht

1. Pruefen Sie, ob WP-Cron korrekt funktioniert
2. Gehen Sie zu **Werkzeuge > Scheduled Actions** und pruefen Sie den Warteschlangenstatus
3. Ueberpruefen Sie, ob keine blockierten Aufgaben vorhanden sind

## Verwandte Ressourcen

- [Rechnungssystem](/pro/invoices/)
- [Informationen zu KSeF](/compliance/ksef/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
