---
title: Einwilligungsmanager
description: Nativer Cookie-Einwilligungsbanner mit Kategorien, Unterstützung für Google Consent Mode v2, bedingtem Laden von Skripten und iFrames sowie einem Einwilligungsregister mit CSV-Export in Polski for WooCommerce.
---

Der Einwilligungsmanager ist ein optionales Modul, das dem Shop einen nativen Cookie-Einwilligungsbanner mit Kategorien, Signalen für Google Consent Mode v2 sowie einem Register der getroffenen Entscheidungen hinzufügt. Andere Module können ihre Skripte und iFrames "gaten", sodass sie erst ausgeführt werden, nachdem der Besucher die entsprechende Einwilligung erteilt hat.

Das Modul stellt Werkzeuge bereit, die helfen, Einwilligungsentscheidungen zu erfassen und zu respektieren. Es garantiert selbst keine bestimmte rechtliche Wirkung und ersetzt keine Rechtsberatung.

## Aktivierung des Moduls

Das Modul ist **standardmäßig deaktiviert**. Aktiviere es unter **WooCommerce > Polski > Module** (Bereich "Einwilligungsmanager", Modulschlüssel `consent_manager`). Nach der Aktivierung erscheint der Banner in der Fußzeile des Shops, und im Panel wird die Ansicht **Einwilligungsregister** bereitgestellt. Diese Ansicht sowie der CSV-Export erfordern die Berechtigung `manage_woocommerce`.

## Einwilligungskategorien

Der Banner verwendet einen festen Satz von Kategorien. Die Kategorie "Notwendig" ist immer aktiviert und kann nicht deaktiviert werden. Die übrigen drei sind optional und der Besucher kann sie ein- oder ausschalten.

| Kategorie   | Schlüssel     | Standard  | Beschreibung                                                      |
| ----------- | ------------- | --------- | ----------------------------------------------------------------- |
| Notwendig   | `necessary`   | immer an  | Erforderlich für den Betrieb des Shops. Immer erteilt, nicht deaktivierbar. |
| Analytik    | `analytics`   | aktiviert | Messung des Traffics und Statistiken.                             |
| Marketing   | `marketing`   | aktiviert | Werbung und Remarketing.                                          |
| Präferenzen | `preferences` | aktiviert | Personalisierung und Funktionen, die Auswahlen merken.            |

Standardmäßig sind alle drei optionalen Kategorien im Banner aktiv. Jede davon kannst du in den Moduleinstellungen deaktivieren, wenn der Shop sie nicht nutzt.

## Google Consent Mode v2

Wenn die Unterstützung für Google Consent Mode aktiviert ist (Standard), gibt das Modul den Standardzustand der Einwilligungen noch vor dem gtag/GTM-Code aus (in `wp_head` mit Priorität 0). Alle Signale starten als **abgelehnt** (`denied`), mit Ausnahme von `security_storage`, und werden anschließend sofort anhand des gespeicherten Cookies aktualisiert, falls der Besucher bereits eine Auswahl getroffen hat. Dadurch sehen gtag/GTM den richtigen Zustand vom ersten Aufruf an.

Die Banner-Kategorien werden wie folgt auf die Consent-Mode-Signale abgebildet:

| Kategorie   | Signale von Consent Mode v2                              |
| ----------- | -------------------------------------------------------- |
| Analytik    | `analytics_storage`                                      |
| Marketing   | `ad_storage`, `ad_user_data`, `ad_personalization`       |
| Präferenzen | `functionality_storage`, `personalization_storage`       |

Nach der Auswahl durch den Besucher ruft der Banner `gtag('consent', 'update', ...)` mit dem aktuellen Zustand auf.

## Bedingtes Laden von Skripten und iFrames

Das Modul stellt einen Vertrag bereit, der es anderen Modulen erlaubt, Skripte und iFrames erst nach Erteilung der entsprechenden Kategorie auszuführen. Der gegatete Code wird als `<script type="text/plain" data-polski-consent="KATEGORIE">` gerendert, sodass der Browser ihn beim Laden der Seite nicht ausführt. Der Frontend-Controller wandelt ihn erst dann in ein ausführbares Skript um, wenn die Kategorie erteilt ist (sofort, wenn das Cookie es erlaubt, oder nach dem Ereignis `polskiConsentChange`).

Nach einer Änderung der Auswahl tut der Banner Folgendes:

- speichert das Cookie `polski_consent` mit der Liste der erteilten Kategorien,
- ruft `gtag('consent', 'update', ...)` auf,
- löst das Fenster-Ereignis `polskiConsentChange` aus, auf das gegatete Skripte reagieren,
- sendet die Entscheidung an den REST-Recorder.

## Einwilligungsregister

Jede aus dem Banner gespeicherte Entscheidung gelangt in das Einwilligungsregister. Das ist eine reine Leseansicht, die im Panel verfügbar ist, wenn das Modul aktiviert ist, und dazu dient, die Auswahlen der Besucher zu dokumentieren. Das Register ersetzt keine Rechtsberatung.

| Spalte            | Beschreibung                                              |
| ----------------- | --------------------------------------------------------- |
| Datum             | Datum und Uhrzeit der gespeicherten Entscheidung.         |
| Kategorie         | Die Kategorie, die die Entscheidung betrifft.             |
| Entscheidung      | "Erteilt" oder "Abgelehnt".                               |
| Benutzer          | Benutzer-ID oder "Gast" für nicht angemeldete.            |
| IP-Adresse        | IP-Adresse des Besuchers (falls verfügbar).               |
| Inhaltsversion    | Hash des Banner-Inhalts, den der Besucher tatsächlich gesehen hat. |

Jede gespeicherte Auswahl ist mit einer Version des Banner-Inhalts verknüpft (einem Hash aus Überschrift, Text und Kategorienliste), sodass nachvollziehbar ist, welchen genauen Wortlaut der Besucher akzeptiert hat.

### CSV-Export

Der Button **CSV exportieren** lädt das vollständige Register als CSV-Datei herunter. Der Export enthält die Spalten: `id`, `created_at`, `category`, `granted`, `user_id`, `ip_address`, `user_agent`, `consent_version`. Der Export erfordert die Berechtigung `manage_woocommerce` und ist per Nonce geschützt.

## Einstellungen

Die Einstellungen befinden sich auf der Modulkarte unter **WooCommerce > Polski > Module**.

| Einstellung                  | Standard               | Beschreibung                                                  |
| --------------------------- | ---------------------- | ------------------------------------------------------------- |
| Kategorie: Analytik          | aktiviert              | Ob die Analytik-Kategorie im Banner angezeigt wird.           |
| Kategorie: Marketing         | aktiviert              | Ob die Marketing-Kategorie im Banner angezeigt wird.          |
| Kategorie: Präferenzen       | aktiviert              | Ob die Präferenzen-Kategorie im Banner angezeigt wird.        |
| Überschrift                  | (leer)                 | Optionale Überschrift des Banners.                            |
| Banner-Inhalt                | Standardtext           | Haupttext des Banners (erlaubt grundlegendes HTML).           |
| Beschriftung "Alle akzeptieren"| "Accept all"         | Text des Buttons zum Akzeptieren von allem.                   |
| Beschriftung "Alle ablehnen" | "Reject all"           | Text des Buttons zum Ablehnen der optionalen Kategorien.      |
| Beschriftung "Verwalten"     | "Manage"               | Text des Buttons, der die Kategorienauswahl öffnet.           |
| Beschriftung "Auswahl speichern"| "Save choices"      | Text des Buttons zum Speichern der gewählten Kategorien.      |
| Position                     | unten                  | Position des Banners: oben, unten oder mittig.                |
| Google Consent Mode          | aktiviert              | Ob die Signale von Google Consent Mode v2 ausgegeben werden.  |

## Fehlerbehebung

**Der Banner erscheint nicht** - stelle sicher, dass das Modul unter **WooCommerce > Polski > Module** aktiviert ist und dass das Theme `wp_footer()` aufruft. Der Banner wird in der Fußzeile gerendert.

**Die Google-Tags reagieren nicht auf die Einwilligung** - prüfe, ob die Option Google Consent Mode aktiviert ist und ob der gtag/GTM-Code nach den Consent-Mode-Signalen geladen wird (diese werden sehr früh in `wp_head` ausgegeben).

**Das gegatete Skript wird nicht ausgeführt** - das Skript startet erst nach Erteilung der entsprechenden Kategorie. Verifiziere, dass der Besucher die Kategorie erteilt hat und dass das Skript über den Gating-Vertrag ausgegeben wurde.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), bereitgestellt ohne Gewährleistung.</div>
