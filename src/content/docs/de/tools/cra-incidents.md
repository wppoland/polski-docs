---
title: CRA-Vorfälle (Cyber Resilience Act)
description: Register aktiv ausgenutzter Schwachstellen und Sicherheitsvorfälle, 24h/72h-Fristen aus Art. 14 CRA, JSON-Export konform mit dem Entwurf des ENISA-SRP-Schemas.
---

Das Modul **CRA-Vorfälle** hilft, die Meldepflicht aus Art. 14 des EU Cyber Resilience Act zu erfüllen: Es registriert aktiv ausgenutzte Schwachstellen und schwerwiegende Vorfälle, überwacht die 24-Stunden-Frühwarnfrist und bereitet einen strukturierten JSON-Export für die Einreichung bei der ENISA SRP (Single Reporting Platform) vor.

:::caution
Dieses Werkzeug sendet keine Meldungen direkt an ENISA. Es erzeugt einen JSON-Datensatz konform mit dem Entwurf des SRP-Schemas und versendet optional einen Webhook/eine E-Mail an Ihren DPO oder die Rechtsabteilung. Die endgültige Einreichung der Meldung bleibt bei Ihnen.
:::

## Zeitrahmen

CRA Art. 14 unterscheidet drei Meldeschwellen für Hersteller digitaler Produkte:

| Schwelle            | Frist   | Umfang                                          |
| ------------------- | ------- | ----------------------------------------------- |
| Frühwarnung         | 24h     | Feststellung, Komponente, vorläufige Einschätzung |
| Vorfallsbericht     | 72h     | Beschreibung der Ursache, Umfang, ergriffene Maßnahmen |
| Abschlussbericht    | 14 Tage | Vollständige Ursache, Abhilfemaßnahmen, Empfehlungen |

Das Modul berechnet die 24h-Frist automatisch ab `discoveredAt`. Die übrigen Fristen (72h, 14 Tage) verfolgen Sie manuell, sie liegen außerhalb des FREE-Umfangs.

## Registrierung eines Vorfalls

Gehen Sie zu **Polski > CRA-Vorfälle > Record incident**. Das Formular:

| Feld                | Hinweise                                                                       |
| ------------------- | ------------------------------------------------------------------------------ |
| Title               | Kurztitel (Pflicht)                                                            |
| Affected component  | Produkt- / Modulname (z. B. `polski-free`, `custom-checkout-module`)           |
| Affected versions   | Versionsbereich (z. B. `<= 2.0.4`)                                             |
| Reporter            | Person, die den Vorfall registriert hat                                        |
| External reference  | Kennung aus CVE / Bug-Tracker / CVD (optional)                                 |
| Kind                | `actively_exploited_vulnerability`, `security_incident`, `near_miss`           |
| Severity            | `critical`, `high`, `medium`, `low`                                            |
| Summary             | Technische Beschreibung (Pflicht)                                              |

Nach dem Speichern hat der Vorfall den Status **Open** und das berechnete `deadlineAt = discoveredAt + 24h`.

## Benachrichtigungs-Dispatcher

Für jeden **Open**-Vorfall ist die Schaltfläche **Dispatch notification** verfügbar. Sie sendet parallel:

- **Webhook** (POST JSON) an die URL aus der Option `polski_cra_incident_webhook`
- **E-Mail** mit einer Zusammenfassung an die Adresse aus der Option `polski_cra_incident_email`

Beide Optionen konfigurieren Sie unter **Polski > Settings > CRA incidents**. Nach Erhalt einer 2xx-Antwort vom Webhook oder erfolgreichem E-Mail-Versand wechselt der Vorfall in den Status **Notified** und speichert `notifiedAt`.

:::note
Der Cron `polski_cra_incident_deadline_check` läuft stündlich und löst den Action Hook `polski_cra_incident_deadline_approaching` für `Open`-Vorfälle mit weniger als 2h bis zur Frist aus. Hängen Sie sich an diesen Hook, um einen Slack- / PagerDuty-Alarm zu versenden.
:::

## JSON-Export (ENISA SRP)

Die Aktion **Export JSON** in der Liste liefert die Datei `cra-incident-<id>-<timestamp>.json` mit dem Header `Content-Type: application/json`. Die Form entspricht dem Entwurf des ENISA-Single-Reporting-Platform-Schemas, die Felder decken ab: Identifikation des Herstellers, der Komponente, der Erkennungszeit, die Bewertung des Schweregrads, die Vorfallskategorie sowie die Beschreibung.

Beispiel:

```json
{
  "reference_id": "CVE-2026-1234",
  "kind": "actively_exploited_vulnerability",
  "severity": "high",
  "title": "Stored XSS in checkout notes",
  "affected_component": "polski-free",
  "affected_versions": "<= 2.0.4",
  "discovered_at": "2026-04-19T08:12:00+00:00",
  "deadline_at": "2026-04-20T08:12:00+00:00",
  "summary": "..."
}
```

## Hooks

```php
// Nach der Registrierung eines Vorfalls (vor der Benachrichtigung).
add_action('polski_cra_incident_recorded', function (int $id, $incident): void {
    // eigene Integration: Jira, PagerDuty, Slack
}, 10, 2);

// Wenn weniger als 2h bis zur 24h-Frist verbleiben.
add_action('polski_cra_incident_deadline_approaching', function ($incident): void {
    // Eskalation an den DPO
});
```

## Migration 2.1.0

Version 2.1.0 legt die Tabelle `{$wpdb->prefix}polski_cra_incidents` an. Die Migration läuft automatisch bei der Aktivierung, falls sie nicht funktioniert, erzwingen Sie sie manuell:

```bash
wp polski migrate --module=cra
```

## Berechtigungen

- UI und Aktionen: `manage_woocommerce`
- Webhook/E-Mail: frei konfigurierbar (keine Berechtigungspflicht, das sind Ausgangskanäle)

## Einschränkungen

- Das Modul verfolgt die Schwellen 72h / 14 Tage nicht automatisch (nur 24h)
- Die Vorfallserkennung erfolgt manuell, wir scannen keine Logs
- Der Webhook hat keine HMAC-Signatur (für PRO geplant)
- Das Formular unterstützt keine binären Anhänge, fügen Sie diese der ENISA-SRP-Einreichung manuell hinzu
