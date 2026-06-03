---
title: AJAX In den Warenkorb
description: Hinzufuegen von Produkten in den Warenkorb ohne Neuladen der Seite, einschliesslich Variantenprodukten.
---

Das Modul AJAX Add to Cart ermoeglicht das Hinzufuegen von Produkten in den Warenkorb ohne Neuladen der Seite.

## Funktionen

- Unterstuetzung einfacher und variabler Produkte auf den Produktseiten
- Toast-Benachrichtigung mit Link zum Warenkorb
- Automatische Aktualisierung der Warenkorb-Fragmente (Mini-Cart)
- Button-Animation (loading -> added)
- Kompatibilitaet mit WooCommerce AJAX fragments

## Aktivierung

Gehe zu **WooCommerce > Polski > Module** und aktiviere das Modul **AJAX Add to Cart** im Abschnitt "Stock & Cart".

## So funktioniert es

1. Der Kunde klickt auf der Produktseite auf "In den Warenkorb"
2. Das Formular wird per AJAX gesendet (ohne Neuladen)
3. Der Button zeigt eine Ladeanimation
4. Nach dem Hinzufuegen erscheint eine gruene Benachrichtigung "In den Warenkorb gelegt!" mit dem Link "Warenkorb ansehen"
5. Der Mini-Cart im Header aktualisiert sich automatisch

## JavaScript-Ereignisse

| Ereignis | Wann |
|-----------|-------|
| `polski_adding_to_cart` | Vor dem Senden der AJAX-Anfrage |
| `polski_added_to_cart` | Nach erfolgreichem Hinzufuegen |
| `added_to_cart` | Standard-Ereignis von WooCommerce |

## Stil der Benachrichtigung

Die Toast-Benachrichtigung erscheint oben rechts auf dem Bildschirm und verschwindet nach 4 Sekunden. Sie kann ueber die CSS-Klasse `.polski-ajax-cart-notice` angepasst werden.
