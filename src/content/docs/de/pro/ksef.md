---
title: KSeF-Integration
description: Dokumentation der Integration von Polski PRO for WooCommerce mit dem nationalen e-Rechnungssystem KSeF - Versand von Rechnungen, Statusverfolgung, API-Konfiguration und Fehlerbehandlung.
---

Das KSeF-Modul sendet elektronische Rechnungen an das nationale e-Rechnungssystem KSeF (polnisches Finanzministerium). Rechnungen werden im Hintergrund versendet, mit automatischer Wiederholung bei Fehlern.

## Was ist KSeF

KSeF ist die Plattform des polnischen Finanzministeriums zur Verarbeitung von Rechnungen im XML-Format. Das Plugin erzeugt Rechnungen im erforderlichen Format und überträgt sie an KSeF.

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > PRO-Module > KSeF**.

### Verbindungseinstellungen

| Einstellung | Beschreibung |
|------------|------|
| KSeF-Integration aktivieren | Aktiviert das Modul |
| Umgebung | Test (Sandbox) oder Produktiv |
| API-Schlüssel (Token) | Im KSeF-Portal erzeugter Autorisierungstoken |
| NIP des Ausstellers | Mit dem KSeF-Konto verknüpfte NIP |

### Testumgebung

KSeF verfügt über eine Testumgebung (Sandbox) zur Überprüfung der Integration. Die Sandbox:

- erfordert keinen echten Autorisierungsschlüssel
- nimmt Rechnungen im identischen Format wie die Produktivumgebung an
- überträgt keine Daten an das Finanzamt
- wird für erste Integrationstests empfohlen

Nach erfolgreichen Tests wechseln Sie in die Produktivumgebung und tragen den korrekten API-Schlüssel ein.

### API-Token erhalten

1. Melden Sie sich im KSeF-Portal an: https://ksef.mf.gov.pl/
2. Wechseln Sie in den Bereich für die Token-Verwaltung
3. Erzeugen Sie einen neuen Token mit Berechtigungen zur Rechnungsausstellung
4. Kopieren Sie den Token und fügen Sie ihn in den Plugin-Einstellungen ein

## Versand von Rechnungen

### Automatischer Versand

Aktivieren Sie **Automatischer Versand an KSeF**, damit das Plugin die Rechnung an KSeF sendet, sobald der Status auf "Ausgestellt" wechselt. Der Versand läuft im Hintergrund über Action Scheduler.

### Manueller Versand

Klicken Sie in der Meta-Box "Rechnungen" auf **An KSeF senden**. Die Aufgabe wird in die Action-Scheduler-Warteschlange eingereiht.

### Asynchrone Verarbeitung

Das Plugin nutzt Action Scheduler (in WooCommerce integriert) für den Versand im Hintergrund:

- der Versand blockiert die Bestellabwicklung nicht
- Rechnungen werden nacheinander versendet
- große Rechnungsmengen werden schrittweise verarbeitet

## XML-Erzeugung

Das Plugin erzeugt die Rechnung im XML-Format gemäß dem KSeF-Schema (FA(2)). Das XML-Dokument enthält:

- Kopfzeile mit Datum und Rechnungstyp
- Verkäuferdaten (NIP, Name, Adresse)
- Käuferdaten (NIP, Name, Adresse)
- Rechnungspositionen (Bezeichnung, Menge, Nettopreis, USt-Satz, Wert)
- Zusammenfassung mit Aufschlüsselung nach USt-Sätzen
- Zahlungsinformationen

Das XML wird vor dem Versand validiert. Bei Validierungsfehlern wird die Rechnung nicht versendet und im Protokoll erscheint eine Meldung.

## Statusverfolgung

Nach dem Versand der Rechnung an KSeF verfolgt das Plugin deren Status:

| Status | Beschreibung |
|--------|------|
| Queued | Rechnung der Versandwarteschlange hinzugefügt |
| Submitted | Rechnung an KSeF übermittelt, wartet auf Verarbeitung |
| Accepted | Rechnung von KSeF akzeptiert, KSeF-Nummer vergeben |
| Rejected | Rechnung abgelehnt, prüfen Sie die Fehlermeldung |
| Error | Kommunikationsfehler mit der KSeF-API |

Nach der Annahme speichert das Plugin die KSeF-Nummer. Sie ist im Bestellpanel und auf dem PDF sichtbar.

### Status-Polling

Das Plugin prüft den Status versendeter Rechnungen automatisch alle paar Minuten (über Action Scheduler), bis es eine Antwort "Accepted" oder "Rejected" erhält.

## Fehlerbehandlung und Wiederholung

Bei API-Fehlern wiederholt das Plugin die Versuche mit steigender Verzögerung (Exponential Backoff):

| Versuch | Verzögerung |
|-------|-----------|
| 1. Wiederholung | 5 Minuten |
| 2. Wiederholung | 25 Minuten |
| 3. Wiederholung | 125 Minuten |

Nach drei fehlgeschlagenen Versuchen erhält die Rechnung den Status "Error". Der Administrator erhält eine E-Mail über den fehlgeschlagenen Versand.

Typische Fehlerursachen:

- ungültiger oder abgelaufener API-Token
- XML-Validierungsfehler (z. B. fehlende Käuferdaten)
- vorübergehende Nichtverfügbarkeit der KSeF-API
- Nichtübereinstimmung der NIP des Ausstellers mit dem Token

## Hooks

### `polski_pro_ksef_submit`

Aktion, die vor dem Versand der Rechnung an KSeF ausgelöst wird.

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

Aktion, die nach der Statusprüfung der Rechnung in KSeF ausgelöst wird.

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

### Protokolle

Alle KSeF-Vorgänge werden im WooCommerce-Protokoll erfasst. Gehen Sie zu **WooCommerce > Status > Protokolle** und wählen Sie `polski-pro-ksef`.

Protokollierte Ereignisse:

- Versand der Rechnung (Request/Response)
- Statusprüfung
- XML-Validierungsfehler
- Kommunikationsfehler mit der API
- Versandwiederholungen

### Verbindungstest

Klicken Sie in den KSeF-Einstellungen auf **Verbindung testen**. Der Test prüft:

- die Korrektheit des Tokens
- die Verbindung zum KSeF-Server
- die Übereinstimmung der NIP mit dem Token

## Häufige Probleme

### Rechnung von KSeF abgelehnt

1. Prüfen Sie die Fehlermeldung im WooCommerce-Protokoll
2. Häufigste Ursachen: fehlende NIP des Käufers, ungültiger USt-Satz, unvollständige Adressdaten
3. Korrigieren Sie die Daten und senden Sie erneut

### API-Token funktioniert nicht

1. Stellen Sie sicher, dass der Token nicht abgelaufen ist
2. Prüfen Sie, ob der Token Berechtigungen zur Rechnungsausstellung hat
3. Überprüfen Sie die Übereinstimmung der NIP in den Plugin-Einstellungen mit der mit dem Token verknüpften NIP

### Action Scheduler verarbeitet die Warteschlange nicht

1. Prüfen Sie, ob WP-Cron korrekt funktioniert
2. Gehen Sie zu **Werkzeuge > Scheduled Actions** und prüfen Sie den Zustand der Warteschlange
3. Überprüfen Sie, ob keine blockierten Aufgaben vorliegen

## Verwandte Ressourcen

- [Rechnungssystem](/pro/invoices/)
- [Informationen zu KSeF](/compliance/ksef/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
