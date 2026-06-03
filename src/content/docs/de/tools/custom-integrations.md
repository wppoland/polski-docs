---
title: Eigene Integrationen
description: Fügen Sie eigene Code-Snippets im Header oder in der Fußzeile des Shops in Polski for WooCommerce hinzu, mit zugewiesener Einwilligungskategorie, die erst nach der Einwilligung des Besuchers ausgeführt werden.
---

Eigene Integrationen sind ein optionales Modul, mit dem Sie Ihre eigenen Code-Snippets in den Header oder die Fußzeile des Shops einfügen können. Jedes Snippet erhält eine zugewiesene Einwilligungskategorie und wird über das Gate des Einwilligungsmanagers ausgegeben, sodass es erst dann ausgeführt wird, wenn der Besucher in die jeweilige Kategorie eingewilligt hat. Dadurch werden Codes von Werkzeugen wie Meta Pixel, TikTok, Matomo oder Google Consent Mode auf eine Weise geladen, die die Wahl des Nutzers respektiert.

Den Code liefern Sie selbst. Das Plugin führt keinerlei HTTP-Anfragen auf PHP-Ebene aus und enthält keine fest codierten externen Adressen. Dies sind Werkzeuge, die helfen, Ihre eigenen Snippets verantwortungsvoll zu laden, sie stellen keine Rechtsberatung dar und garantieren auch nicht von sich aus einen bestimmten rechtlichen Effekt.

## Aktivierung des Moduls

Das Modul ist **standardmäßig deaktiviert**. Aktivieren Sie es in **WooCommerce > Polski > Module** (Abschnitt "Eigene Integrationen"). Nach der Aktivierung werden die Snippets im Frontend des Shops eingefügt, niemals im Admin-Bereich. Die Verwaltung der Einstellungen erfordert die Berechtigung `manage_woocommerce`.

## Funktionsweise

Jedes Snippet wird durch den Einwilligungsmanager "gegated". Anstelle eines sofort ausführbaren Skripts erscheint auf der Seite ein Platzhalter, den das Frontend des Einwilligungsmanagers erst dann in ein funktionierendes Skript umwandelt, wenn die Einwilligung in die passende Kategorie erteilt wurde. Snippets mit der Kategorie "Notwendig" werden immer ausgeführt.

| Element            | Verhalten                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Ausgabeort         | Header-Snippets gelangen in `wp_head`, Fußzeilen-Snippets in `wp_footer` (Priorität 30).    |
| Nur Frontend       | Snippets werden niemals im Admin-Bereich eingefügt.                                         |
| Einwilligungs-Gate | Jedes Snippet durchläuft das Gate des Einwilligungsmanagers und wartet auf die Einwilligung für seine Kategorie. |
| Notwendig          | Snippets mit der Kategorie "Notwendig" funktionieren immer, ohne auf die Einwilligung zu warten. |
| Kein PHP-Traffic   | Das Plugin sendet keinerlei HTTP-Anfragen vom Server, geladen wird ausschließlich Ihr Code. |

## Felder eines Snippets

Die Liste der Snippets ist wiederholbar, Sie können beliebig viele davon hinzufügen. Jede Zeile hat die folgenden Felder:

| Feld              | Beschreibung                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------- |
| Bezeichnung       | Lesbarer Name des Snippets, hilft beim Erkennen in der Liste. Optional.                        |
| Platzierung       | `head` (Header) oder `footer` (Fußzeile). Standardmäßig Fußzeile.                              |
| Einwilligungskategorie | Kategorie aus dem Einwilligungsmanager, die akzeptiert werden muss, damit das Snippet ausgeführt wird. Ein nicht erkannter Wert wird als "Notwendig" behandelt. |
| Code              | Das Snippet selbst. Zeilen mit leerem Code werden übersprungen.                                |

### Code-Verarbeitung

Wenn Ihr Snippet in ein einzelnes `<script>...</script>`-Tag eingeschlossen ist, wird dessen Inhalt extrahiert und als Skriptinhalt an das Gate übergeben. Wenn Sie reinen JavaScript-Code ohne Tag einfügen, wird er als Inline-Skriptkörper behandelt. Jeglicher Code außerhalb des `<script>`-Tags wird übersprungen, an das Gate gelangt nur der Skriptinhalt (bis zur Erteilung der Einwilligung bleibt der Platzhalter vom Typ `text/plain`).

## Einstellungen

Die Einstellungen befinden sich auf der Modulkarte unter **WooCommerce > Polski > Module**. Die Liste der Snippets wird als eine einzige wiederholbare Einstellung gespeichert.

| Einstellung           | Standard  | Beschreibung                                                         |
| --------------------- | --------- | -------------------------------------------------------------------- |
| Liste der Snippets    | (leer)    | Wiederholbare Liste von Snippets (Bezeichnung, Platzierung, Kategorie, Code). |

## Fehlerbehebung

**Das Snippet wird nicht ausgeführt** - prüfen Sie, ob der Besucher in die dem Snippet zugewiesene Kategorie eingewilligt hat. Snippets, die nicht "Notwendig" sind, warten auf die Einwilligung. Stellen Sie außerdem sicher, dass der Einwilligungsmanager aktiv ist.

**Das Snippet erscheint nicht im Seitencode** - stellen Sie sicher, dass das Code-Feld nicht leer und das Modul aktiviert ist. Snippets werden nicht im Admin-Bereich eingefügt, prüfen Sie sie im Frontend des Shops.

**Ein Teil des Codes verschwindet** - an das Gate gelangt ausschließlich der Skriptinhalt. Tags und Code außerhalb eines einzelnen `<script>...</script>` werden übersprungen. Fügen Sie JavaScript-Code ein oder schließen Sie ihn in ein einzelnes `<script>`-Tag ein.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
