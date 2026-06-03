---
title: Sichere Schriften
description: Begrenzen und Verzögern externer Anfragen an Google Fonts in Polski for WooCommerce, um Layoutverschiebungen zu verringern und das Schriften-Stylesheet bis zur Einwilligung zurückzuhalten.
---

Sichere Schriften sind ein optionales Modul, das externe Anfragen an Google Fonts, die von Ihrem Theme oder Ihren Plugins gesendet werden, verringert und kontrolliert. Es wirkt auf jedes Stylesheet (`<link>`), dessen Adresse auf `fonts.googleapis.com` verweist, und bietet zwei unabhängige Verhaltensweisen, die einzeln aktiviert werden können: die Optimierung des Ladens sowie das Zurückhalten des Stylesheets bis zur Erteilung der Einwilligung.

Das Modul stellt Werkzeuge zur Begrenzung und Verzögerung von Anfragen an Dritte bereit. Es ist keine Rechtsberatung und garantiert von sich aus keinen bestimmten rechtlichen Effekt. Das vollständige Hosten der Schriftdateien auf dem eigenen Server gehört nicht zum Umfang dieser Modulversion, das Modul begrenzt und kontrolliert die externen Aufrufe, verschiebt aber nicht die Dateien selbst.

## Aktivierung des Moduls

Das Modul ist **standardmäßig deaktiviert**. Aktivieren Sie es in **WooCommerce > Polski > Module** (Modulschlüssel `safe_fonts`). Nach der Aktivierung wirkt es nur im Frontend des Shops, der Admin-Bereich wird ausgelassen. Wenn das Modul ein bestimmtes Tag nicht erkennen oder umschreiben kann, gibt es es unverändert zurück, sodass die Schriften immer weiter funktionieren (sanfte Degradation).

## Betriebsmodi

| Modus                      | Was er tut                                                              |
| -------------------------- | ----------------------------------------------------------------------- |
| Optimierung                | Fügt der Google-Fonts-Adresse `display=swap` hinzu, falls es fehlt, und gibt `preconnect`-Hinweise für `fonts.googleapis.com` und (mit `crossorigin`) `fonts.gstatic.com` aus. Verringert Layoutverschiebungen und Verbindungskosten, ohne zu ändern, was geladen wird. |
| Zurückhalten bis Einwilligung | Schreibt das `<link>`-Tag von Google Fonts in einen deaktivierten Ersatzverweis um (mit der echten Adresse im `data`-Attribut). Ein kleiner Controller aktiviert es erst dann wieder, wenn der Besucher in die gewählte Einwilligungskategorie eingewilligt hat. Bis dahin wird die externe Anfrage nicht ausgeführt. |

Beide Modi sind unabhängig. Sie können nur einen, beide gleichzeitig oder keinen aktivieren.

### Optimierung

Nach der Aktivierung der Optimierung:

- ergänzt das Modul die Adresse des Google-Fonts-Stylesheets um `display=swap`, sofern dort kein expliziter `display`-Wert vorhanden ist. Adressen außerhalb von Google Fonts bleiben unberührt.
- gibt im `<head>` zwei `preconnect`-Hinweise aus: für `https://fonts.googleapis.com` sowie für `https://fonts.gstatic.com` (mit dem Attribut `crossorigin`).

Dieses Verhalten blockiert keine Anfragen, es verringert lediglich Layoutverschiebungen und die Kosten des Verbindungsaufbaus.

### Zurückhalten bis Einwilligung

Nach der Aktivierung dieses Modus ersetzt das Modul das Google-Fonts-Tag durch ein deaktiviertes Stylesheet (`disabled`, `media="print"`, `href="about:blank"`), das nichts lädt. Die echte Adresse gelangt in das Attribut `data-polski-safefont`, die gewählte Einwilligungskategorie in `data-polski-consent`. Ein kleiner Controller im Frontend aktiviert das Stylesheet erst dann, wenn der Besucher in die konfigurierte Einwilligungskategorie eingewilligt hat, und reagiert auf das Event `polskiConsentChange` aus dem Einwilligungsmanager.

Zur Sicherheit wird außerdem eine `<noscript>`-Variante mit dem ursprünglichen Tag beibehalten, sodass die Schriften auch bei deaktiviertem JavaScript geladen werden. Der Controller wird nur dann eingebunden, wenn in der jeweiligen Anfrage tatsächlich ein Schriften-Stylesheet zurückgehalten wurde.

Dieser Modus arbeitet mit dem Modul **Einwilligungsmanager** zusammen (die Einwilligungskategorie und das Event der Einwilligungsänderung stammen aus diesem Modul). Damit das Zurückhalten Sinn ergibt, muss die Einwilligungskategorie auf der Seite des Besuchers tatsächlich durchgesetzt werden.

## Einstellungen

Die Einstellungen befinden sich auf der Modulkarte unter **WooCommerce > Polski > Module**.

| Einstellung               | Standard      | Beschreibung                                                         |
| ------------------------- | ------------- | -------------------------------------------------------------------- |
| Optimierung               | aktiviert     | Fügt `display=swap` und `preconnect`-Hinweise für die Google-Fonts-Hosts hinzu. |
| Zurückhalten bis Einwilligung | deaktiviert | Hält das Google-Fonts-Stylesheet bis zur Erteilung der gewählten Einwilligungskategorie zurück. |
| Einwilligungskategorie    | Präferenzen   | Einwilligungskategorie, die zum Laden der Schriften beim Zurückhalten erforderlich ist. |

## Sanfte Degradation

Wenn ein Tag nicht geparst oder nicht sicher rekonstruiert werden kann (zum Beispiel kein standardmäßiger Verweis vom Typ `rel="stylesheet"` ist), gibt das Modul es unverändert zurück. Das bedeutet, dass nicht unterstützte Fälle das Aussehen der Seite nicht beeinträchtigen und die Schriften wie zuvor geladen werden.

## Fehlerbehebung

**Die Schriften werden nach Aktivierung des Zurückhaltens nicht geladen** - prüfen Sie, ob der Besucher in die gewählte Einwilligungskategorie eingewilligt hat und ob das Modul Einwilligungsmanager aktiv ist. Bis zur Einwilligung bleibt das Stylesheet deaktiviert.

**`display=swap` erscheint nicht** - betrifft ausschließlich Adressen, die auf `fonts.googleapis.com` verweisen, und nur dann, wenn die Adresse nicht bereits einen expliziten `display`-Wert hat.

**Lokal vom Theme geladene Schriften ändern sich nicht** - das Modul wirkt nur auf externe Anfragen an Google Fonts. Lokal gehostete Schriften werden nicht unterstützt.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
