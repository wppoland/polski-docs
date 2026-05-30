---
title: "Aktionen und dynamische Preisgestaltung"
description: "Kostenloses Modul für dynamische Preisgestaltung in Polski for WooCommerce - automatische Warenkorbrabatte: ein Mengenrabatt (Staffelrabatt) auf eine Produktposition und ein prozentualer Nachlass, wenn die Warenkorb-Zwischensumme einen Schwellenwert erreicht. Standardmäßig deaktiviert."
---

Das Modul **Promotions / dynamic pricing** fügt zwei automatische Warenkorbrabatte hinzu, die in den Moduleinstellungen konfiguriert werden. Es ist Teil von Polski for WooCommerce: kostenlos, optional und standardmäßig deaktiviert.

## Was das Modul tut

Sobald es aktiviert ist, wendet das Modul Rabatte automatisch an, während der Warenkorb neu berechnet wird, ohne Gutscheincodes:

- **Mengenrabatt (Staffelrabatt)** - ein prozentualer Nachlass auf eine Produktposition, wenn deren Menge einen Schwellenwert erreicht.
- **Rabatt auf die Warenkorb-Zwischensumme** - ein prozentualer Nachlass, wenn die Warenkorb-Zwischensumme einen Schwellenwert erreicht (angewendet als negative Warenkorbgebühr).

Rabatte werden jedes Mal aus dem regulären Preis neu berechnet, idempotent, sodass sie bei WooCommerces wiederholten Summenberechnungen zuverlässig bleiben.

## Modul aktivieren

Das Modul ist kostenlos, optional und standardmäßig deaktiviert.

Gehen Sie zu `WooCommerce › Polski › Modules`, zur Gruppe **Merchandising**, und schalten Sie den Schalter **Promotions / dynamic pricing** ein.

## Einstellungen

Die Moduleinstellungen befinden sich auf seiner Karte im Bereich `Modules`:

| Einstellung | Beschreibung |
|---------|-------------|
| **Bulk discount: minimum quantity per product** | Mengenschwelle pro Position, die den Mengenrabatt auslöst. `0` deaktiviert den Mengenrabatt. |
| **Bulk discount: percent off (%)** | Prozentualer Nachlass auf eine Position, sobald die Menge den Schwellenwert erreicht. |
| **Cart discount: subtotal threshold** | Warenkorb-Zwischensumme, die den Warenkorbrabatt auslöst. `0` deaktiviert ihn. |
| **Cart discount: percent off (%)** | Prozentualer Nachlass auf die Warenkorb-Zwischensumme, sobald der Schwellenwert erreicht ist. |

## Wie die Rabatte funktionieren

### Mengenrabatt

Wenn die Menge einer Position den Schwellenwert **minimum quantity per product** erreicht, wird der Preis dieser Position um den konfigurierten Prozentsatz reduziert. Der Rabatt wird auf jede qualifizierte Position einzeln angewendet.

Beispiel: Schwellenwert `10`, Rabatt `15%`. Ein Kunde mit 10 Einheiten eines Produkts erhält 15% Nachlass auf diese Position; bei 9 Einheiten wird kein Rabatt angewendet.

### Rabatt auf die Warenkorb-Zwischensumme

Wenn die Warenkorb-Zwischensumme den **subtotal threshold** erreicht, wird dem Warenkorb eine negative Gebühr in Höhe des konfigurierten Prozentsatzes der Zwischensumme hinzugefügt.

Beispiel: Schwellenwert `500`, Rabatt `10%`. Ein Warenkorb von 500 oder mehr erhält 10% Nachlass, angewendet als Warenkorbrabatt.

## Rabatte kombinieren

Beide Rabatte funktionieren unabhängig voneinander und können gleichzeitig angewendet werden: Der Mengenrabatt senkt die Positionspreise, und der Warenkorbrabatt fügt einen weiteren Nachlass auf Basis der Zwischensumme hinzu. Um einen der beiden zu deaktivieren, setzen Sie seinen Schwellenwert auf `0`.
