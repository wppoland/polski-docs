---
title: Flexible Shipping (Table Rate)
description: Erweiterte Versandregeln basierend auf Gewicht, Warenkorbwert, Produktanzahl und Zielland.
---

Die Versandmethode Flexible Shipping ermoeglicht die Definition komplexer Regeln fuer Versandkosten.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Versand > [Zone] > Methode hinzufuegen > Flexible Shipping**.

## Regelbedingungen

| Bedingung | Beschreibung |
|---------|------|
| Min/Max Warenkorbwert | Kosten haengen vom Bestellwert ab |
| Min/Max Gewicht | Kosten haengen vom Warenkorbgewicht (kg) ab |
| Min/Max Produktanzahl | Kosten haengen von der Menge ab |
| Laender | Regel nur fuer bestimmte Laender |

## Berechnungsmodi der Kosten

| Modus | Beschreibung |
|------|------|
| fixed | Fester Betrag pro Bestellung |
| per_item | Betrag x Produktanzahl |
| per_kg | Betrag x Gewicht in kg |
| percent | Prozentsatz des Warenkorbwerts |

## Zusatzkosten pro Gewicht

Es koennen Zusatzkosten fuer jedes kg ueber einem Schwellenwert konfiguriert werden:
- `extra_kg_above`: Gewichtsschwelle (kg)
- `extra_kg_cost`: Kosten pro zusaetzlichem kg

## Kostenloser Versand

Feld "Free shipping above" - nach Ueberschreiten des Warenkorbwerts ist der Versand kostenlos.

## Regeln im JSON-Format

Die Regeln werden als JSON gespeichert. Beispiel:

```json
[
  {
    "label": "Standard (do 5 kg)",
    "min_weight": 0,
    "max_weight": 5,
    "cost_type": "fixed",
    "cost": 12.99
  },
  {
    "label": "Ciezka paczka",
    "min_weight": 5,
    "max_weight": 30,
    "cost_type": "fixed",
    "cost": 19.99,
    "extra_kg_above": 10,
    "extra_kg_cost": 2
  }
]
```
