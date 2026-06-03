---
title: Monitor für die Shop-Gesundheit
description: Kontinuierliches, passives Monitoring kritischer Fehler, fehlgeschlagener Zahlungen und Verkaufsanomalien in Polski for WooCommerce, mit E-Mail- und Webhook-Alerts.
---

Der Monitor für die Shop-Gesundheit ist ein optionales Modul, das im Hintergrund die betrieblichen Signale des Shops beobachtet und warnt, wenn etwas nicht mehr funktioniert. Im Unterschied zum Shop-Audit (Konformitätsprüfungen auf Anforderung) und zum Vorfallregister (manuelles Journal) arbeitet dieses Modul nach einem Zeitplan und bewertet selbst drei Signale: kritische Fehler im Frontend, den Anteil fehlgeschlagener Zahlungen sowie eine Verkaufsanomalie ("es gibt Traffic, aber keine Bestellungen").

Die Erkennung ist passiv: das Modul beobachtet echte WooCommerce-Ereignisse und den Bestellverlauf. Es gibt niemals Testbestellungen auf, erzeugt also weder falsche Bestellungen noch belastet es Karten. Im Gegenzug wird ein Zahlungsproblem erst dann erkannt, wenn ein echter Kunde darauf stößt.

## Modul aktivieren

Das Modul ist **standardmäßig deaktiviert**. Aktiviere es unter **WooCommerce > Polski > Module** (Abschnitt "Shop-Gesundheit"). Nach der Aktivierung laufen die Prüfungen alle 5 Minuten über WP-Cron. Das Dashboard findest du unter **WooCommerce > Polski > Berichte und Werkzeuge > Shop-Gesundheit**. Erfordert die Berechtigung `manage_woocommerce`.

## Sensoren

| Sensor                   | Was er beobachtet                                                           |
| ------------------------ | --------------------------------------------------------------------------- |
| Kritische Fehler (Front) | Fatale PHP-Fehler auf den Shop-Seiten (`shutdown`-Handler). Fehler im Panel und im Cron werden ausgeklammert. Aktiv für 15 Minuten ab dem Auftreten. |
| Kasse / Zahlungen        | Anteil fehlgeschlagener Abschlüsse in den letzten 2 Stunden. Beobachtet die klassische Kasse, die Block-Kasse (Store API) sowie den Bestellstatus "fehlgeschlagen". |
| Verkaufsanomalie         | Vergleicht die Anzahl der Bestellungen der letzten vollen Stunde mit der typischen Anzahl für denselben Wochentag und dieselbe Stunde der letzten 8 Wochen. Wird höchstens einmal pro Stunde bewertet. |

### Status

| Status     | Bedeutung                                              | Farbe        |
| ---------- | ------------------------------------------------------ | ------------ |
| OK         | Alles funktioniert normal                              | grün         |
| Degradation| Werte haben den Schwellenwert überschritten, aber es ist kein vollständiger Ausfall | orange |
| Ausfall    | Schwerwiegendes Problem (z. B. kritischer Fehler oder keine Verkäufe) | rot     |

Der Gesamtstatus ist der schlechteste Status unter den Sensoren.

### Wie die Schwellenwerte berechnet werden

- **Kasse / Zahlungen:** Der Alert erscheint, wenn der Anteil fehlgeschlagener Abschlüsse den Schwellenwert erreicht (standardmäßig 30 %). Bei Überschreitung des 1,5-fachen Schwellenwerts wechselt der Status von "Degradation" zu "Ausfall". Der Anteil wird ignoriert, solange nicht eine Mindestanzahl an Abschlüssen beobachtet wurde (standardmäßig 5).
- **Verkaufsanomalie:** "Ausfall" wird nur dann gemeldet, wenn für die betreffende Stunde typischerweise mindestens so viele Bestellungen auftreten, wie der Schwellenwert beträgt (standardmäßig 3), und in der letzten vollen Stunde keine einzige vorlag.

## Alerts

Wenn sich der Status gegenüber der vorherigen Prüfung verschlechtert, sendet das Modul einen Alert. Bei einem anhaltenden Problem wiederholt sich der Alert erst nach Ablauf der Stummschaltungszeit (standardmäßig 60 Minuten), um Benachrichtigungen alle 5 Minuten zu vermeiden.

| Kanal   | Details                                                                   |
| ------- | ------------------------------------------------------------------------- |
| E-Mail  | Wird an die Alert-Adresse gesendet (standardmäßig die E-Mail des Shop-Administrators). |
| Webhook | Optional. Sendet ein JSON-Payload `{"text": ...}`, kompatibel mit Slack/Discord. |

Beim Status "Ausfall" gelangt der Eintrag außerdem in das **Register für Sicherheitsvorfälle**, sofern dieses Modul aktiviert ist, damit das Ereignis neben den manuell erfassten Vorfällen eine Audit-Spur hat.

## Dashboard

Das Dashboard "Shop-Gesundheit" zeigt den Gesamtstatus, den Zeitpunkt der letzten Prüfung (UTC) sowie eine Tabelle mit jedem Sensor, seinem Status und dem Detail. Der Button **Prüfung jetzt ausführen** erzwingt eine sofortige Bewertung. Wenn der Status nicht "OK" ist, erscheint im Panel ein entsprechender Hinweis mit einem Link zum Dashboard.

## Einstellungen

Die Einstellungen befinden sich auf der Modulkarte unter **WooCommerce > Polski > Module**.

| Einstellung                      | Standard                | Beschreibung                                                      |
| -------------------------------- | ----------------------- | ----------------------------------------------------------------- |
| Alert-E-Mail-Adresse             | E-Mail des Administrators | Wohin die Gesundheits-Alerts gesendet werden.                    |
| Webhook-URL                      | (leer)                  | Optionaler JSON-Webhook (Slack/Discord).                          |
| Schwelle für fehlgeschlagene Zahlungen (%) | 30            | Alert, wenn dieser Anteil der Abschlüsse in den letzten 2 h fehlschlägt. |
| Mindeststichprobe der Abschlüsse | 5                       | Anteil ignorieren, solange nicht mindestens so viele Abschlüsse vorliegen. |
| Schwelle für Verkaufsanomalie    | 3                       | Nur alarmieren, wenn für die betreffende Stunde typischerweise so viele Bestellungen vorliegen, aber keine vorhanden ist. |
| Stummschaltung der Alerts (Minuten) | 60                   | Mindestabstand zwischen wiederholten Alerts für ein anhaltendes Problem. |

## REST API

```
GET /wp-json/polski/v1/store-health
```

Gibt den aktuellen Zustand zurück (Gesamtstatus, Sensoren, Zeitpunkt der Prüfung). Erfordert die Berechtigung `manage_woocommerce`.

## Fehlerbehebung

**Alerts kommen nicht an** - überprüfe die E-Mail-Konfiguration von WordPress. Erwäge ein SMTP-Plugin (z. B. WP Mail SMTP) anstelle des standardmäßigen `wp_mail()`.

**Der Kassensensor zeigt "unzureichende Daten"** - das ist bei Shops mit wenig Traffic normal. Der Anteil wird erst nach Erreichen der Mindeststichprobe an Abschlüssen bewertet.

**Die Verkaufsanomalie reagiert nicht** - das Modul benötigt einen Bestellverlauf aus den vorherigen Wochen für die betreffende Stunde. In einem neuen Shop ist der typische Wert niedrig und der Schwellenwert wird nicht erreicht.

**Die Prüfungen laufen nicht** - WP-Cron läuft bei Traffic auf der Seite. Erwäge bei Shops mit wenig Traffic einen systemseitigen Cron (`wp-cron.php` ausgelöst durch den Server-Cron).

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
