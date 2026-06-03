---
title: Treueprogramm (Punkte)
description: Punkte-Treueprogramm in Polski PRO - Kunden sammeln Punkte für Einkäufe und tauschen sie gegen Rabatte ein.
---

Das Modul für das Treueprogramm ermöglicht es, Kunden mit Punkten für Einkäufe zu belohnen und den Eintausch von Punkten gegen Rabatte im Warenkorb zu erlauben.

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski PRO > Treue**.

### Grundeinstellungen

| Einstellung | Beschreibung | Standard |
|------------|------|-----------|
| Aktiviert | Aktiviert das Treueprogramm | Nein |
| Punkte pro 1 PLN | Wie viele Punkte pro Złoty | 1 |
| Wert von 1 Punkt | Rabattwert eines Punktes | 0.01 PLN |
| Min. Punkte zum Eintausch | Mindestanzahl Punkte zum Eintausch | 100 |
| Max. Rabatt in % | Maximaler prozentualer Rabatt aus Punkten | 50% |
| Verfall der Punkte | Nach wie vielen Tagen Punkte verfallen | 365 |
| Rundung | floor (abrunden) oder ceil (aufrunden) | floor |

## Punkte sammeln

Kunden erhalten Punkte automatisch nach einer abgeschlossenen Bestellung.

### Prioritäten der Berechnung

1. **Einstellung pro Produkt** - Feld "Loyalty points per unit" in der Produktbearbeitung
2. **Einstellung pro Kategorie** - Feld in der Bearbeitung der Produktkategorie
3. **Standardberechnung** - Produktpreis x Punkte pro 1 PLN

### Information auf der Produktseite

Auf der Produktseite wird automatisch folgende Information angezeigt:
> Erhalten Sie **X Punkte** für den Kauf dieses Produkts

## Punkte einlösen

Kunden können Punkte auf der Warenkorb- oder Checkout-Seite gegen einen Rabatt eintauschen:
1. Das System zeigt das aktuelle Guthaben und den Rabattwert an
2. Der Kunde gibt die einzulösende Punktzahl ein
3. Es wird ein einmaliger Gutschein mit Rabatt erstellt
4. Der Gutschein wird automatisch auf den Warenkorb angewendet

### Einschränkungen beim Eintausch

- Mindestanzahl Punkte zum Eintausch (konfigurierbar)
- Maximaler Rabatt als % des Warenkorbwerts
- Gutschein 24 Stunden gültig

## Bereich Mein Konto

Im Bereich **Mein Konto** erscheint der Reiter **Treueprogramm** mit:
- aktuellem Punkteguthaben und dessen Wert in PLN
- Summe der gesammelten Punkte
- Summe der eingelösten Punkte
- Transaktionsverlauf mit Daten, Typen und Details

## Verfall der Punkte

Punkte verfallen automatisch nach der konfigurierten Zeit (standardmäßig 365 Tage). Der Cron `polski_daily_maintenance` prüft täglich auf verfallene Punkte und zieht sie vom Guthaben ab.

Einstellung auf 0 = Punkte verfallen nicht.

## Rückgaben und Stornierungen

- Bei Stornierung/Rückgabe einer Bestellung werden vergebene Punkte automatisch abgezogen
- Schutz vor doppelter Berechnung und doppeltem Abzug

## Bestell-E-Mails

In den Bestellbestätigungs-E-Mails sieht der Kunde die Information über die Anzahl der gesammelten Punkte.

## Hooks

| Hook | Typ | Beschreibung |
|------|-----|------|
| `polski/loyalty/points_awarded` | action | Nach der Vergabe von Punkten für eine Bestellung |
| `polski/loyalty/order_points` | filter | Anpassung der Punktzahl für eine Bestellung |
