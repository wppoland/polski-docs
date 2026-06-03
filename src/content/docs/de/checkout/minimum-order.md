---
title: Mindestwert und Mindestmenge der Bestellung
description: Modul zur Durchsetzung eines Mindestwarenkorbwerts und einer Mindestanzahl von Produkten in einer WooCommerce-Bestellung.
---

Das Modul für Mindestbestellungen blockiert den Übergang zum Checkout, wenn der Warenkorb die erforderlichen Schwellen nicht erfüllt - den Mindestwert oder die Mindestanzahl von Produkten.

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski > Module** und aktiviere das Modul **Mindestbestellung**.

Konfiguriere anschließend die Schwellen unter **WooCommerce > Einstellungen > Polski > Checkout**:

| Einstellung | Beschreibung | Standard |
|------------|------|-----------|
| Mindestwert der Bestellung | Betrag in PLN (0 = deaktiviert) | 0 |
| Mindestanzahl von Produkten | Anzahl der Stücke (0 = deaktiviert) | 0 |
| Produkte im Angebot ausschließen | Produkte im Angebot nicht zum Mindestwert zählen | Nein |
| Wert-Meldung | Fehlertext mit den Tokens `{min_value}` und `{current_value}` | Der Mindestwert der Bestellung beträgt {min_value}. Aktueller Warenkorbwert: {current_value}. |
| Mengen-Meldung | Fehlertext mit den Tokens `{min_quantity}` und `{current_quantity}` | Die Mindestanzahl von Produkten in der Bestellung beträgt {min_quantity}. Aktuelle Anzahl: {current_quantity}. |

## So funktioniert es

Das Modul validiert den Warenkorb an zwei Stellen:

1. **Warenkorbseite** (`woocommerce_check_cart_items`) - zeigt eine Fehlermeldung an
2. **Checkout-Seite** (`woocommerce_checkout_process`) - blockiert die Bestellaufgabe

Wenn der Warenkorb die Anforderung nicht erfüllt, sieht der Kunde eine rote Fehlermeldung und kann nicht zur Zahlung übergehen.

### Beispiele für Meldungen

**Mindestwert:**
> Der Mindestwert der Bestellung beträgt 50,00 PLN. Aktueller Warenkorbwert: 29,99 PLN.

**Mindestmenge:**
> Die Mindestanzahl von Produkten in der Bestellung beträgt 3. Aktuelle Anzahl: 1.

## Ausschluss von Angebotsprodukten

Die Option "Produkte im Angebot ausschließen" erlaubt es, den Wert rabattierter Produkte nicht zum Mindestwarenkorbwert zu zählen. Nützlich, wenn das Minimum nur Produkte zum vollen Preis betreffen soll.

## Anwendungsfälle

| Szenario | Konfiguration |
|------------|-------------|
| Großhandelsshop (B2B) | Mindestwert 200 PLN, Mindestmenge 5 |
| Kostenloser Versand ab Betrag | Mindestwert 100 PLN (Alternative zur Schwelle für kostenlosen Versand) |
| Verhinderung von Mikrobestellungen | Mindestwert 20 PLN |
| Produkte in Paketen | Mindestmenge 3 |

## Kompatibilität

Das Modul funktioniert mit:
- WooCommerce Checkout Blocks
- dem klassischen Checkout (Shortcode)
- allen Zahlungsmethoden
- Multi-Step-Checkout (Polski PRO)
