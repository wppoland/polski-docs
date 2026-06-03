---
title: AI Bridge
description: KI-Brücke für Polski for WooCommerce - schreibgeschützte Handels- und Compliance-Abilities über die WordPress Abilities API 6.9 sowie KI-unterstützte Entwürfe von Produktzusammenfassungen und GPSR-Sicherheitstexten über den AI Client 7.0.
---

AI Bridge ist ein optionales Modul, das die Daten Ihres Shops auf kontrollierte Weise KI-Assistenten und Werkzeugen zugänglich macht. Es besteht aus zwei Teilen. Der erste ist ein Satz **schreibgeschützter** Abilities, registriert in der **WordPress Abilities API (WP 6.9+)**, sodass die Befehlspalette des Website-Editors, MCP-Server und KI-Assistenten dieselben Fakten lesen können, die auch der Administrator sieht. Der zweite umfasst zwei KI-unterstützte Funktionen im Panel: die Produktzusammenfassung sowie den **Entwurf** von GPSR-Sicherheitstexten, die den **WordPress AI Client (WP 7.0+)** über einen in der Website konfigurierten Anbieter nutzen.

Das Modul ändert nichts automatisch. Die Abilities lesen ausschließlich Daten, und die KI-Funktionen erstellen Vorschläge zur Prüfung, ohne jemals Felder zu überschreiben, die eine manuelle Freigabe erfordern. Das Plugin speichert niemals den Schlüssel des KI-Anbieters. Es ist ein Hilfswerkzeug, keine Rechtsberatung und keine Compliance-Garantie.

## Modul aktivieren

Das Modul ist **standardmäßig deaktiviert**. Aktivieren Sie es unter **WooCommerce > Polski > Module** (Bereich "AI Bridge", Modulschlüssel `ai_bridge`). Nach der Aktivierung:

- werden unter WordPress 6.9+ die Handels-Abilities registriert (sofern die Abilities API verfügbar ist); unter älterem WordPress läuft das Modul ohne Fehler und überspringt schlicht die Registrierung,
- werden die KI-Funktionen (Produktzusammenfassung, GPSR-Entwurf) nur dann verfügbar, wenn in der Website ein KI-Anbieter konfiguriert ist, der die Texterzeugung unterstützt (über WP AI Client / Connector, z. B. Anthropic, Google, OpenAI, Vercel AI Gateway). Ohne konfigurierten Anbieter werden diese Funktionen einfach nicht aktiviert, und der deterministische AI-Feed-Kanal bleibt unangetastet.

## Handels-Abilities (schreibgeschützt)

Alle Abilities gehören zur Kategorie `polski-commerce`, sind als `readonly` und `show_in_rest` gekennzeichnet und durch die WooCommerce-Berechtigungsprüfung `manage_woocommerce` geschützt. Jede ist an einen bestehenden Dienst des Plugins angebunden und dupliziert daher keine Logik. Nichts wird verändert.

| Ability (id)                       | Was zurückgegeben wird                                                                              | Eingabe              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------- |
| `polski/get-omnibus-history`        | Preisverlauf und niedrigster erfasster Preis eines Produkts (wie in der Darstellung gemäß Omnibus-Richtlinie). | `product_id`         |
| `polski/get-gpsr-data`              | Produktsicherheitsdaten (GPSR): Hersteller, Importeur, verantwortliche Person, Kennung, Warnhinweise, Anleitungen. | `product_id`         |
| `polski/list-products-missing-gpsr` | Veröffentlichte Produkte, denen eines oder mehrere GPSR-Felder fehlen, um Lücken zu finden und zu schließen. | `limit` (1-200), `offset` |
| `polski/get-compliance-status`      | Ergebnis heuristischer Prüfungen der konfigurierten Rechtsseiten (AGB, Datenschutz, Rückgabe, Reklamationen) mit Bewertung. | `page_type` (optional) |
| `polski/get-store-health`           | Neuester Snapshot des Shop-Zustands (Gesamtstatus sowie Sensoren für Fehler, Zahlungen und Verkäufe). | (keine)               |
| `polski/get-product-facts`          | Strukturierte Liste der Produktfakten (Paare aus Bezeichnung/Wert), bereitgestellt durch AI Feed: SKU, GTIN, Preis, Kategorien, Lieferzeit und weitere. | `product_id`         |

Jeder Aufruf durchläuft ein `permission_callback`, das `manage_woocommerce` prüft. Ein Nutzer ohne diese Berechtigung erhält keine Daten. Die Abilities sind über REST (`/wp-json/wp-abilities/v1/...`) verfügbar, sofern die Abilities API aktiv ist.

## Produktzusammenfassung (KI)

Eine auf Anforderung des Administrators erzeugte, faktenbasierte Zusammenfassung des Produkts. Sie funktioniert nur, wenn das Modul aktiviert ist und ein textfähiger KI-Anbieter konfiguriert wurde. Beim Laden der Seite entsteht nichts.

| Aspekt              | Verhalten                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Datenquelle         | Name, Kurz- und Langbeschreibung des Produkts sowie die AI-Feed-Faktenliste - nur bereits vom Shop veröffentlichte Daten. |
| Modell              | Angewiesen, ausschließlich die angegebenen Fakten zu verwenden, keine Spezifikationen oder Preise zu erfinden, ohne Marketingformulierungen und ohne rechtliche Aussagen. |
| Länge               | Kurz, 1-3 Sätze; die Speicherung ist auf 600 Zeichen begrenzt.                                  |
| Speicherung         | In der Produkt-Meta (`_polski_ai_summary`) gespeichert, ausschließlich nach ausdrücklicher Auslösung durch den Administrator. |
| Kein Anbieter       | Die Funktion ist nicht verfügbar; es passiert nichts, und die übrigen Pfade arbeiten unverändert weiter. |

## Entwurf von GPSR-Sicherheitstexten (KI)

Ein Helfer, der einen **Entwurf** von Sicherheitswarnungen und Gebrauchsanweisungen eines Produkts als Ausgangspunkt für eine manuelle Prüfung erstellt. Es ist eine redaktionelle Hilfe, keine Rechtsberatung und keine Compliance-Garantie.

| Aspekt              | Verhalten                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Datenquelle         | Öffentliche Produktbeschreibung sowie bereits (durch einen Menschen) eingetragene GPSR-Felder, damit der Entwurf bestehenden Daten nicht widerspricht. |
| Modell              | Angewiesen, ausschließlich die angegebenen Fakten zu verwenden, keine Gefahren oder Zertifikate zu erfinden und keine rechtliche Konformität zu suggerieren. |
| Speicherung         | Ausschließlich in einer separaten, eindeutig benannten Entwurfs-Meta (`_polski_ai_gpsr_draft`). Überschreibt **niemals** die echten GPSR-Felder. |
| Prüfung             | Der Administrator muss den Entwurf lesen und den Inhalt nach Prüfung manuell in die richtigen Felder übertragen. Jeder Entwurf enthält einen Hinweis, dass er nur zur Prüfung dient und keine Compliance-Garantie darstellt. |
| Länge               | Jedes Entwurfsfeld ist auf 1500 Zeichen begrenzt.                                               |

## Datenschutz und Schlüssel

Das Plugin **speichert niemals den Schlüssel des KI-Anbieters** und führt selbst keine Netzwerkanfragen an den Anbieter aus. Die Zugangsdaten und der Netzwerkaufruf gehören zum in WordPress konfigurierten KI-Connector (Modell "Bring your own key"). An das Modell gelangen ausschließlich Daten, die der Shop ohnehin bereits veröffentlicht oder speichert.

## Fehlerbehebung

**Die Abilities erscheinen nicht** - stellen Sie sicher, dass Sie WordPress 6.9+ mit aktiver Abilities API verwenden und dass das AI-Bridge-Modul aktiviert ist. Unter älterem WordPress wird die Registrierung ohne Fehler übersprungen.

**Die KI-Funktionen sind ausgegraut** - konfigurieren Sie einen KI-Anbieter, der die Texterzeugung über WP AI Client / Connector unterstützt. Ohne Anbieter bleiben Zusammenfassung und GPSR-Entwurf inaktiv.

**Keine Daten aus den Abilities** - prüfen Sie, ob der aktuelle Nutzer die Berechtigung `manage_woocommerce` besitzt.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
