---
title: Automatische Bewertungsanfragen
description: Modul zum automatischen Versand von E-Mails mit Bewertungsanfragen nach dem Kauf in Polski for WooCommerce.
---

Das Modul versendet nach Abschluss einer Bestellung automatisch eine E-Mail mit einer Bewertungsanfrage an die Kunden. Jede E-Mail enthält Links zur Bewertung der gekauften Produkte.

## Konfiguration

Gehen Sie zu **Polski > Module** und aktivieren Sie das Modul **Bewertungsanfragen**.

| Einstellung | Beschreibung | Standard |
|------------|------|-----------|
| Verzögerung (Tage) | Nach wie vielen Tagen ab Abschluss die E-Mail gesendet wird | 7 |
| E-Mail-Betreff | Titel der Nachricht (Tokens: `{first_name}`, `{order_number}`) | Wie bewerten Sie Ihren Einkauf? Hinterlassen Sie eine Bewertung |
| Einleitungstext | Begrüßungstext (Token: `{first_name}`) | Hallo {first_name}, vielen Dank für Ihren letzten Einkauf... |
| Schaltflächentext | CTA bei jedem Produkt | Bewertung hinterlassen |
| Abmeldetext | Opt-out-Link am Ende der E-Mail | Bewertungsanfragen abbestellen |

## Funktionsweise

1. Die Bestellung wechselt den Status auf **Abgeschlossen**
2. Das System plant den E-Mail-Versand für X Tage später (standardmäßig 7)
3. Täglich prüft ein Cron-Job die geplanten Anfragen
4. Die E-Mail wird mit einer Produktliste und Schaltflächen "Bewertung hinterlassen" versendet
5. Produkte, die der Kunde bereits bewertet hat, werden ausgelassen

## Inhalt der E-Mail

Die E-Mail enthält:
- Eine personalisierte Begrüßung
- Eine Produktliste mit Bildminiaturen
- Eine CTA-Schaltfläche pro Produkt, die zum Bewertungsbereich führt
- Einen Opt-out-Link am Ende

## Opt-out

Der Kunde kann in der E-Mail den Link "Bewertungsanfragen abbestellen" anklicken. Nach dem Klick:
- wird die Meta `_polski_review_optout` im Benutzerkonto gesetzt
- werden keine zukünftigen Anfragen mehr versendet
- erscheint eine Bestätigung in den WooCommerce-Hinweisen

:::note
Das Opt-out erfordert eine Anmeldung. Gäste (ohne Konto) sehen den Opt-out-Link nicht.
:::

## Integration mit Verified Review

Das Modul für Bewertungsanfragen arbeitet unabhängig vom Modul **Verifizierter Kauf** (Badge). Beide können gleichzeitig aktiviert werden:

- **Bewertungsanfragen** - versendet E-Mails, die zur Bewertung anregen
- **Verifizierter Kauf** - fügt Bewertungen von Personen, die das Produkt gekauft haben, das Badge "Verifizierter Kauf" hinzu

## Vermeidung von Duplikaten

Das System prüft, ob der Kunde das jeweilige Produkt bereits bewertet hat. Falls ja, erscheint das Produkt nicht in der E-Mail. Wenn alle Produkte bereits bewertet wurden, wird keine E-Mail versendet.
