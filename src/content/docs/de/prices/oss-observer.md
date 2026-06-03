---
title: OSS-Beobachter
description: Ueberwachung der EU-Umsatzschwelle fuer VAT OSS (10 000 EUR) in WooCommerce dank der Integration mit dem Plugin One Stop Shop.
---

Das Modul "OSS-Beobachter" integriert den Shop mit dem eigenstaendigen Plugin **One Stop Shop for WooCommerce** und hilft bei der Ueberwachung der Umsatzschwelle fuer VAT OSS (One-Stop-Shop-Verfahren). Wenn sich der jaehrliche B2C-Umsatz in andere EU-Laender der Grenze von 10 000 EUR naehert, sollte der Shop am OSS-Verfahren teilnehmen und von diesem Zeitpunkt an die Umsatzsteuer nach dem Satz des Landes des Kaeufers abrechnen.

## Fuer wen

Wenn du einen Onlineshop in Polen betreibst und Waren versendest oder elektronische Dienstleistungen an Verbraucher (B2C) in anderen EU-Laendern erbringst - betrifft dich die Schwelle von 10 000 EUR. Das Modul ist fuer jeden Shop nuetzlich, der Produkte innerhalb der Europaeischen Union ins Ausland versendet.

## Wie es funktioniert

1. Aktiviere das Modul **OSS-Beobachter** im Panel `Polski > Module` (Bereich "Tax & Pricing").
2. Klicke auf das Stift-Symbol, um die Moduleinstellungen zu oeffnen.
3. Wenn das Plugin "One Stop Shop for WooCommerce" nicht installiert ist, nutze den Button **One Stop Shop installieren**. Das Plugin wird aus dem WordPress.org-Repository heruntergeladen, installiert und automatisch aktiviert.
4. Gehe nach der Installation zu **WooCommerce > Einstellungen > Steuer > OSS**, um den Schwellenwert-Beobachter, das OSS-Verfahren sowie die Steuerberichte zu konfigurieren.

Solange das OSS-Plugin nicht installiert ist, zeigt das Modul ein Installations-CTA an. Nach der Aktivierung wird der Status des OSS-Verfahrens sowie der automatischen Ueberwachung der Schwelle angezeigt.

## Hinweis im Panel

Wenn das Modul aktiviert ist, das externe OSS-Plugin jedoch nicht vorhanden ist, zeigt der Shop den WooCommerce-Hinweis "OSS plugin is missing" mit einem Ein-Klick-Installationsbutton an. So vergisst du nicht, die Konfiguration abzuschliessen.

## Integration mit polski-pro

Das Plugin polski-pro stellt den Helfer `Polski\Pro\TaxRules\OssHelper::isEnabled()` bereit, der den aktuellen Stand des OSS-Verfahrens zurueckgibt. Entwickler koennen ihn nutzen, um die Logik von Rechnungen, Steuerregeln oder Versandberechnungen davon abhaengig zu verzweigen, ob der Shop das OSS-Verfahren nutzt.

Der Status ist in polski auch ueber den Filter `polski_tax_oss_enabled` filterbar, was es externen Plugins ermoeglicht, das Signal zu beobachten oder zu ueberschreiben.

## Warum ein separates Plugin?

Die Logik der OSS-Berichterstattung und der Schwellenwertbeobachtung wird in dem eigenstaendigen Plugin "One Stop Shop for WooCommerce" gepflegt (kostenlos, verfuegbar im WordPress.org-Repository). Polski for WooCommerce fungiert als duenner Adapter - es fuegt einen sichtbaren Schalter im Modul-Panel hinzu, erleichtert die Installation und ermoeglicht es anderen Shop-Modulen (Rechnungen, Steuerregeln), auf die Aktivierung des OSS-Verfahrens zu reagieren. Dadurch duplizieren wir keine Funktion, die von einem anderen Team gepflegt wird, und du hast stets die neuesten Aenderungen bei der Handhabung des OSS-Verfahrens.
