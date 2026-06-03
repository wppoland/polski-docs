---
title: Automatische Wiederherstellung des Lagerbestands
description: Stellt den Lagerbestand von Produkten wieder her, wenn eine Bestellung storniert, erstattet oder nicht bezahlt wird.
---

WooCommerce reduziert den Lagerbestand bei der Bestellaufgabe, stellt ihn aber bei einer Stornierung nicht immer wieder her. Dieses Modul stellt den Lagerbestand automatisch wieder her.

## Aktivierung

Gehe zu **WooCommerce > Polski > Module** und aktiviere das Modul **Auto Restore Stock** im Bereich "Stock & Cart".

## Unterstützte Statusübergänge

| Von Status | Auf Status | Wiederherstellung |
|-----------|-----------|-------------|
| Processing | Cancelled | Ja |
| Completed | Cancelled | Ja |
| On-hold | Cancelled | Ja |
| Processing | Refunded | Ja |
| Completed | Refunded | Ja |
| On-hold | Refunded | Ja |
| Processing | Failed | Ja |
| On-hold | Failed | Ja |

## So funktioniert es

1. Die Bestellung wechselt in den Status storniert/erstattet/nicht bezahlt
2. Das Modul prüft jedes Produkt in der Bestellung
3. Für Produkte mit aktivierter Bestandsverwaltung wird die Menge wiederhergestellt
4. Fügt der Bestellung eine Notiz hinzu: "Stock restored: Produktname (5 -> 8)"
5. Setzt das Meta `_polski_stock_restored`, um eine doppelte Wiederherstellung zu verhindern

## Voraussetzungen

- Die WooCommerce-Option **Lagerbestand verwalten** muss aktiviert sein
- Produkte müssen eine aktivierte Bestandsverwaltung haben

## Hook

| Hook | Typ | Beschreibung |
|------|-----|------|
| `polski/stock/restored` | action | Nach Wiederherstellung des Bestands für ein Produkt |
