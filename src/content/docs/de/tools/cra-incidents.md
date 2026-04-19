---
title: CRA-Vorfaelle (Cyber Resilience Act)
description: Register aktiv ausgenutzter Schwachstellen und Sicherheitsvorfaelle. Verfolgt die 24h / 72h Fristen aus Art. 14 des EU Cyber Resilience Act und erzeugt einen JSON-Export kompatibel mit dem Entwurf des ENISA SRP-Schemas.
---

Das Modul **CRA-Vorfaelle** hilft dabei, die Meldepflicht aus Art. 14 des EU Cyber Resilience Act zu erfuellen: Es registriert aktiv ausgenutzte Schwachstellen und schwerwiegende Sicherheitsvorfaelle, ueberwacht die 24-Stunden-Fruehwarnfrist und bereitet einen strukturierten JSON-Export fuer die Einreichung bei der ENISA Single Reporting Platform (SRP) vor.

:::caution
Dieses Werkzeug sendet keine Meldungen direkt an ENISA. Es erzeugt einen JSON-Datensatz im Einklang mit dem SRP-Schemaentwurf und versendet optional einen Webhook oder eine E-Mail an Ihren Datenschutzbeauftragten oder die Rechtsabteilung. Die endgueltige Einreichung bleibt bei Ihnen.
:::

## Meldefenster

CRA Art. 14 definiert drei Meldeschwellen fuer Hersteller digitaler Produkte:

| Schwelle            | Frist   | Umfang                                                   |
| ------------------- | ------- | -------------------------------------------------------- |
| Fruehwarnung        | 24h     | Feststellung, Komponente, vorlaeufige Einschaetzung     |
| Vorfallsbericht     | 72h     | Ursache, Umfang, ergriffene Massnahmen                   |
| Abschlussbericht    | 14 Tage | Vollstaendige Ursache, Abhilfe, Empfehlungen             |

Das Modul berechnet die 24h-Frist automatisch aus `discoveredAt`. Die uebrigen Fristen (72h, 14 Tage) muessen manuell verfolgt werden - sie liegen ausserhalb des FREE-Umfangs.

## Vorfall registrieren

Gehen Sie zu **Polski > CRA-Vorfaelle > Record incident**. Das Formular:

| Feld               | Hinweise                                                                      |
| ------------------ | ----------------------------------------------------------------------------- |
| Title              | Kurztitel (Pflicht)                                                           |
| Affected component | Produkt- oder Modulname (z.B. `polski-free`, `custom-checkout-module`)        |
| Affected versions  | Versionsbereich (z.B. `<= 2.0.4`)                                             |
| Reporter           | Person, die den Vorfall registriert hat                                       |
| External reference | CVE / Bug-Tracker / CVD-Kennung (optional)                                    |
| Kind               | `actively_exploited_vulnerability`, `security_incident`, `near_miss`          |
| Severity           | `critical`, `high`, `medium`, `low`                                           |
| Summary            | Technische Beschreibung (Pflicht)                                             |

Nach dem Speichern hat der Vorfall den Status **Open** und `deadlineAt = discoveredAt + 24h`.

## Benachrichtigungs-Dispatcher

Fuer jeden **Open**-Vorfall bietet die Liste die Aktion **Dispatch notification**. Sie feuert parallel:

- **Webhook** (POST JSON) an die URL aus Option `polski_cra_incident_webhook`
- **E-Mail** mit einer menschenlesbaren Zusammenfassung an die Adresse aus Option `polski_cra_incident_email`

Beide Optionen werden unter **Polski > Einstellungen > CRA-Vorfaelle** konfiguriert. Nach einer 2xx-Antwort vom Webhook oder erfolgreichem E-Mail-Versand wechselt der Vorfall in den Status **Notified** und speichert `notifiedAt`.

:::note
Der Cron `polski_cra_incident_deadline_check` laeuft stuendlich und loest den Action Hook `polski_cra_incident_deadline_approaching` fuer Open-Vorfaelle mit weniger als 2h Restzeit aus. Haengen Sie sich an diesen Hook, um einen Slack- oder PagerDuty-Alarm auszuloesen.
:::

## JSON-Export (ENISA SRP)

Die Aktion **Export JSON** liefert `cra-incident-<id>-<timestamp>.json` mit `Content-Type: application/json`. Die Form folgt dem Entwurf des ENISA Single Reporting Platform Schemas - die Felder decken Herstelleridentitaet, Komponente, Erkennungszeit, Schweregrad, Vorfallsart und Zusammenfassung ab.

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
// Nach Registrierung eines Vorfalls (vor der Benachrichtigung).
add_action('polski_cra_incident_recorded', function (int $id, $incident): void {
    // Integration: Jira, PagerDuty, Slack
}, 10, 2);

// Wenn weniger als 2h bis zur 24h-Frist bleiben.
add_action('polski_cra_incident_deadline_approaching', function ($incident): void {
    // Eskalation an den Datenschutzbeauftragten
});
```

## Migration 2.1.0

Version 2.1.0 fuehrt die Tabelle `{$wpdb->prefix}polski_cra_incidents` ein. Die Migration laeuft automatisch bei der Aktivierung. Sollte sie fehlschlagen, manuell erzwingen:

```bash
wp polski migrate --module=cra
```

## Berechtigungen

- UI und Aktionen: `manage_woocommerce`
- Webhook / E-Mail: frei konfigurierbar (keine Capability-Pruefung - reine Ausgangskanaele)

## Grenzen

- Das Modul verfolgt die 72h-/14-Tage-Schwellen nicht automatisch (nur 24h)
- Vorfallserkennung ist manuell - es werden keine Logs gescannt
- Der Webhook hat keine HMAC-Signatur (fuer PRO geplant)
- Das Formular unterstuetzt keine binaeren Anhaenge - diese muessen in der ENISA SRP-Einreichung manuell angehaengt werden
