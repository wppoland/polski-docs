---
title: Tag-Manager
description: Einheitlicher, einwilligungsgesteuerter Manager für Marketing- und Analyse-Tags in Polski for WooCommerce, in den du deine eigenen Kennungen einträgst und in dem jedes Tag erst nach erteilter Einwilligung ausgelöst wird.
---

Der Tag-Manager ist ein optionales Modul, das an einem Ort die gängigen Marketing-Pixel und Analyse-Tools verwaltet. Statt Snippets in das Theme einzufügen, aktivierst du die benötigten Anbieter und gibst deine eigene Tracking-Kennung oder Domain an. Nichts ist fest verdrahtet, und das Plugin sendet niemals eine HTTP-Anfrage auf der PHP-Seite, jedes Tag ist ein kleines Code-Fragment auf der Browser-Seite, das der Seite hinzugefügt wird.

Das Wichtigste: jedes Tag läuft durch den Einwilligungs-Manager und ist in das Element `<script type="text/plain" data-polski-consent="KATEGORIE">` eingewickelt. Das Skript wird erst dann ausgelöst, wenn der Besucher der passenden Kategorie zugestimmt hat. Werbe- und Remarketing-Pixel werden durch die Kategorie `marketing` geschaltet, Mess-Tools und Heatmaps durch die Kategorie `analytics`.

Dies sind Werkzeuge, die helfen, Tags von Drittanbietern verantwortungsvoll zu laden. Sie stellen keine Rechtsberatung dar und garantieren für sich genommen keine Konformität mit irgendwelchen Vorschriften.

## Modul aktivieren

Das Modul ist **standardmäßig deaktiviert**. Aktiviere es unter **WooCommerce > Polski > Module** (Abschnitt "Tag-Manager"). Nach der Aktivierung findest du die Einstellungen der einzelnen Anbieter auf der Modulkarte. Das Tag eines bestimmten Anbieters erscheint erst dann im Frontend, wenn drei Bedingungen erfüllt sind: das Modul ist aktiviert, der Anbieter ist markiert und seine Kennung ist eingetragen (mit Ausnahme von Simple Analytics, das keine Kennung benötigt).

## Was hier nicht unterstützt wird

GA4 und Google Tag Manager werden in diesem Modul absichtlich **nicht** unterstützt. Sie werden im Modul **GA4 DataLayer** zusammen mit den WooCommerce-E-Commerce-Ereignissen unterstützt, um ein doppeltes Laden derselben Skripte zu vermeiden.

## Unterstützte Anbieter

Jeder Anbieter hat einen eigenen Ein/Aus-Schalter sowie ein Feld für die Kennung. Die Einwilligungskategorie entscheidet darüber, wann das Tag ausgelöst werden darf.

### Kategorie marketing

| Anbieter                          | Feld der Kennung    |
| --------------------------------- | ------------------- |
| Meta Pixel                        | Pixel ID            |
| TikTok Pixel                      | Pixel ID            |
| Microsoft Advertising (Bing UET)  | UET Tag ID          |
| LinkedIn Insight                  | Partner ID          |
| Pinterest Tag                     | Tag ID              |
| X / Twitter Ads                   | Pixel ID            |
| Google Ads                        | AW-XXXXXXXXX        |

### Kategorie analytics

| Anbieter          | Feld der Kennung    |
| ----------------- | ------------------- |
| Microsoft Clarity | Project ID          |
| Matomo            | Site ID (sowie die URL-Adresse der Matomo-Instanz) |
| Plausible         | Domain (z. B. example.com) |
| PostHog           | Project API key     |
| Hotjar            | Site ID             |
| Inspectlet        | WID                 |
| Crazy Egg         | Account ID          |
| Simple Analytics  | ohne Kennung (es genügt der Schalter) |

## Funktionsweise und Ladereihenfolge

- Die Tags werden im Seitenkopf mittels `wp_head` (Priorität 20) ausgegeben, also nach dem Google Consent Mode und dem DataLayer-Modul.
- Hotjar initialisiert sich besser direkt vor `</body>`, daher wird es im Footer mittels `wp_footer` ausgegeben.
- Die Tags werden niemals im Administrationsbereich ausgegeben, sie wirken ausschließlich im Frontend des Shops.
- Matomo erfordert sowohl die Site ID als auch die URL-Adresse der Matomo-Instanz. Ohne URL-Adresse wird das Tag nicht ausgegeben.
- Crazy Egg erfordert eine numerische Account ID mit einer Länge von mindestens 8 Ziffern, andernfalls wird das Tag nicht ausgegeben.

## Einwilligungssteuerung

Die Einwilligungssteuerung arbeitet zusammen mit dem Modul **Einwilligungs-Manager**, das die Einwilligungsebene bereitstellt und die Entscheidungen des Besuchers ausliest. Solange der Besucher der Kategorie `marketing` oder `analytics` nicht zustimmt, bleiben die eingewickelten Skripte inaktiv und laden keinen Drittanbieter-Code. Nach erteilter Einwilligung beginnen die entsprechenden Tags zu wirken.

Beachte, dass die korrekte Einwilligungskonfiguration von deinem rechtlichen Kontext abhängt. Das Plugin stellt einen technischen Mechanismus bereit, die Entscheidung darüber, welche Tags und Kategorien du einsetzt, triffst du selbst.

## Fehlerbehebung

**Das Tag erscheint nicht** - prüfe, ob das Modul aktiviert, der Anbieter markiert und das Kennungsfeld ausgefüllt ist. Für Matomo ist zusätzlich die URL-Adresse der Instanz erforderlich.

**Das Tag ist im Seitencode vorhanden, zählt aber nichts** - das ist das erwartete Verhalten, solange der Besucher der passenden Kategorie im Einwilligungs-Manager nicht zustimmt. Das Skript vom Typ `text/plain` wird erst nach der Einwilligung ausgelöst.

**Ich suche GA4 oder GTM** - die sind im Modul GA4 DataLayer, nicht hier.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
