---
title: Eigene Trigger
description: Senden Sie eigene dataLayer-Events in Polski for WooCommerce auf Basis der Seiten-URL oder eines Klicks, optional an die Einwilligung in eine bestimmte Kategorie geknüpft.
---

Eigene Trigger sind ein optionales Modul, mit dem Sie eigene Events an die Datenschicht `window.dataLayer` (dieselbe, die das Modul GA4 DataLayer verwendet) senden können, wenn im Frontend des Shops eine einfache Bedingung erfüllt ist. Dadurch können Sie shopspezifische Events modellieren, zum Beispiel den Besuch einer bestimmten Seite oder den Klick auf eine ausgewählte Schaltfläche, ohne eigenen JavaScript-Code zu schreiben.

Jeder Trigger sendet ein benanntes Event (mit optionalen zusätzlichen Parametern), das in dieselbe Datenschicht wie die GA4-Events gelangt. Die weitere Verarbeitung (z. B. die Weitergabe an Google Tag Manager, Meta Pixel, TikTok oder Matomo) hängt von Ihrer Tag-Konfiguration ab. Dies sind Werkzeuge, die helfen, eigene Events zu modellieren, und keine Garantie für einen bestimmten rechtlichen oder analytischen Effekt.

## Aktivierung des Moduls

Das Modul ist **standardmäßig deaktiviert**. Aktivieren Sie es in **WooCommerce > Polski > Module** (Modulschlüssel `custom_triggers`). Nach der Aktivierung und der Definition mindestens eines gültigen Triggers lädt das Modul einen leichten Controller im Frontend des Shops. Ist die Liste der Trigger leer, wird kein Skript hinzugefügt. Der Controller läuft nicht im Admin-Bereich.

## Funktionsweise der Trigger

Ein Trigger wird im Browser des Besuchers ausgewertet. Es gibt zwei Bedingungstypen:

| Bedingung  | Was das Event auslöst                                                       |
| ---------- | --------------------------------------------------------------------------- |
| `page_url` | Der aktuelle Pfad oder die URL-Parameter enthalten den angegebenen Textausschnitt. |
| `click`    | Klick auf ein Element, das dem angegebenen CSS-Selektor entspricht.         |

Jeder Trigger muss einen Eventnamen gesetzt haben, andernfalls wird er übersprungen. Wenn der Bedingungstyp nicht auf `click` gesetzt ist, behandelt das Modul ihn als `page_url`.

## Einstellungen eines Triggers

Jede Zeile in der Triggerliste wird durch die folgenden Felder beschrieben:

| Feld       | Beschreibung                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------- |
| Event      | Name des an `dataLayer` gesendeten Events. Pflichtfeld, leere Trigger werden übersprungen.     |
| Bedingung  | `page_url` oder `click`. Standardmäßig `page_url`.                                             |
| Wert       | Textausschnitt, der mit dem Pfad/den Parametern der URL verglichen wird (für die Bedingung `page_url`). |
| Selektor   | CSS-Selektor des Elements, dessen Klick das Event auslöst (für die Bedingung `click`).         |
| Kategorie  | Einwilligungskategorie, die das Senden des Events bedingt. Standardmäßig `necessary` (notwendig). |
| Parameter  | Optionale zusätzliche Event-Parameter (Schlüssel-Wert-Paare, nur skalare Werte).               |

Die Liste der Trigger wird als JSON-kodierte Daten in der Option `polski_custom_triggers` (Schlüssel `triggers`) gespeichert. Nur skalare Werte werden als Parameter beibehalten, die übrigen werden verworfen.

## Bedingung durch Einwilligung

Das Senden von Daten an die Schicht `dataLayer` ist eine First-Party-Aktion, dennoch kann jedem Trigger eine Einwilligungskategorie zugewiesen werden. Der Controller im Frontend sendet einen Trigger mit zugewiesener Kategorie erst dann, wenn der Besucher in diese Kategorie eingewilligt hat (gespeichert im Einwilligungs-Cookie). Trigger in der Kategorie `necessary` (notwendig) werden immer gesendet.

Der Controller prüft den Einwilligungsstatus nach dem Event `polskiConsentChange` erneut, sodass eine Änderung der Entscheidung des Besuchers (z. B. die Akzeptanz von Marketing im Banner) ohne Neuladen der Seite berücksichtigt wird. Dadurch können Sie zum Beispiel ein Marketing-Konversionsevent an die Marketing-Einwilligung knüpfen.

Ist die zugewiesene Kategorie keine gültige Einwilligungskategorie, setzt das Modul sie auf `necessary` zurück. Die Namen des Cookies, des Events sowie der notwendigen Kategorie bezieht der Controller aus dem Modul Einwilligungsmanager, sodass die Bedingung durch Einwilligung konsistent mit dem Einwilligungsbanner funktioniert.

Das Modul stellt Werkzeuge zur Bedingung von Events durch Einwilligung bereit, es stellt jedoch keine Rechtsberatung dar und garantiert keine Konformität mit Vorschriften. Für die korrekte Klassifizierung der Events bezüglich der Einwilligungskategorien ist der Shop-Inhaber verantwortlich.

## Integration mit der Datenschicht

Die Trigger verwenden dieselbe Schicht `window.dataLayer` wie das Modul GA4 DataLayer. Damit die Events empfangen und weiterverarbeitet werden, muss diese Datenschicht auf der Seite existieren. Das Modul selbst sendet die Events lediglich an die Schicht, über ihr weiteres Schicksal entscheiden Ihre Tag-Konfiguration und Ihre Analysewerkzeuge.

## Fehlerbehebung

**Events erscheinen nicht im dataLayer** - stellen Sie sicher, dass das Modul aktiviert ist, mindestens ein Trigger mit Eventnamen definiert wurde und auf der Seite die Schicht `window.dataLayer` existiert (Modul GA4 DataLayer).

**Der `click`-Trigger reagiert nicht** - prüfen Sie den CSS-Selektor. Er muss zu einem auf der Seite existierenden Element passen.

**Ein Trigger mit einer anderen Kategorie als notwendig funktioniert nicht** - das Event wird erst nach der Einwilligung in die zugewiesene Kategorie gesendet. Prüfen Sie die Konfiguration des Einwilligungsmanagers und die Entscheidung des Besuchers.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
