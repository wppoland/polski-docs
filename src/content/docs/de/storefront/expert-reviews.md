---
title: Expertenrezensionen
description: Dedizierter Beitragstyp für Expertenrezensionen von Produkten mit Bewertungen und Schema.org.
---

Das Modul Expert Reviews erstellt einen eigenen Beitragstyp (CPT) zur Veröffentlichung von Expertenrezensionen für Produkte.

## Aktivierung

Gehe zu **WooCommerce > Polski > Module** und aktiviere das Modul **Expert Reviews** im Bereich "Storefront".

## Rezension erstellen

Gehe nach der Aktivierung des Moduls zu **Products > Expert Reviews > Add review**.

| Feld | Beschreibung |
|------|------|
| Title | Titel der Rezension |
| Content | Inhalt der Rezension (WordPress-Editor) |
| Product | WooCommerce-Produkt, dem die Rezension zugeordnet ist |
| Rating | Bewertung 1-10 (in 0,5-Schritten) |
| Verdict | Kurzes Fazit (z. B. "Empfohlen", "Beste der Klasse") |

## Anzeige

Expertenrezensionen werden automatisch auf der Produktseite unterhalb der Beschreibung angezeigt. Jede Rezension enthält:

- Titel und Autor
- Farbige Plakette mit der Bewertung (grün >= 8, gelb >= 5, rot < 5)
- Inhalt der Rezension
- Fazit (falls festgelegt)
- Veröffentlichungsdatum

## Schema.org

Das Modul erzeugt automatisch eine Schema.org-Auszeichnung `Review` mit:
- `reviewRating` (1-10)
- `author` (Person)
- `datePublished`
- `reviewBody`

Das verbessert die Sichtbarkeit in den Suchergebnissen (Rich Snippets).
