---
title: Bedingte Zahlungsmethoden
description: Zahlungsmethoden basierend auf Versandmethode, Warenkorbwert, Benutzerrolle und Produktkategorien ein- und ausblenden.
---

Das Modul für bedingte Zahlungsmethoden ermöglicht die Steuerung der Verfügbarkeit von Zahlungs-Gateways auf Grundlage von Regeln.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski PRO > Bedingte Zahlungen**.

## Bedingungstypen

| Bedingung | Beschreibung |
|---------|------|
| Versandmethode | Gateway für eine bestimmte Versandmethode aus-/einblenden |
| Warenkorbwert (min) | Gateway ausblenden, wenn der Warenkorb unter dem Betrag liegt |
| Warenkorbwert (max) | Gateway ausblenden, wenn der Warenkorb über dem Betrag liegt |
| Benutzerrolle | Gateway nur für eine bestimmte Rolle (z. B. wholesale) |
| Produktkategorie | Gateway verfügbar, wenn Produkte aus der Kategorie im Warenkorb sind |

## Regeln

Jede Regel besteht aus:
- **Zahlungs-Gateway** - welches Gateway von der Regel betroffen ist
- **Aktion** - `hide` (ausblenden, wenn die Bedingung erfüllt ist) oder `show_only` (nur anzeigen, wenn erfüllt)
- **Bedingungstyp** - einer der oben genannten
- **Bedingungswert** - z. B. ID der Versandmethode, Betrag, Rollen-Slug

### Beispiele

| Gateway | Aktion | Bedingung | Wert | Effekt |
|--------|-------|---------|---------|-------|
| Nachnahme (COD) | hide | Versandmethode | inpost_locker | Nachnahme für Paketautomaten ausblenden |
| Überweisung | show_only | Warenkorbwert min | 200 | Überweisung ab 200 PLN verfügbar |
| PayPal | hide | Benutzerrolle | wholesale | Großhändler sehen kein PayPal |

## Gebühren pro Zahlungsmethode

Sie können für eine gewählte Zahlungsmethode eine zusätzliche Gebühr hinzufügen:

| Einstellung | Beschreibung |
|------------|------|
| Aktiviert | Aktiviert die Gebühr für dieses Gateway |
| Gebührentitel | Im Warenkorb sichtbarer Text |
| Typ | Festbetrag oder Prozent |
| Betrag | Wert der Gebühr |
| Min. Bestellung | Gebühr nur über dem Betrag |
| Max. Bestellung | Gebühr nur unter dem Betrag |
| MwSt.-pflichtig | Ob MwSt. auf die Gebühr berechnet wird |
| Steuerklasse | MwSt.-Klasse für die Gebühr |

Die Gebühr wird beim Wechsel der Zahlungsmethode im Checkout automatisch neu berechnet (AJAX).

## WooCommerce-Filter

Das Modul verwendet den Filter `woocommerce_available_payment_gateways` mit Priorität 100 und `woocommerce_cart_calculate_fees` für die Gebühren.
