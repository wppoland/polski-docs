---
title: Automatyczne przywracanie stanu magazynowego
description: Przywraca stan magazynowy produktow gdy zamowienie zostanie anulowane, zwrocone lub nieoplacone.
---

WooCommerce zmniejsza stan magazynowy przy skladaniu zamowienia, ale nie zawsze przywraca go przy anulowaniu. Ten modul automatycznie przywraca stan magazynowy.

## Wlaczenie

Przejdz do **WooCommerce > Polski > Moduły** i wlacz modul **Auto Restore Stock** w sekcji "Stock & Cart".

## Obslugiwane przejscia statusow

| Z statusu | Na status | Przywracanie |
|-----------|-----------|-------------|
| Processing | Cancelled | Tak |
| Completed | Cancelled | Tak |
| On-hold | Cancelled | Tak |
| Processing | Refunded | Tak |
| Completed | Refunded | Tak |
| On-hold | Refunded | Tak |
| Processing | Failed | Tak |
| On-hold | Failed | Tak |

## Jak to dziala

1. Zamowienie zmienia status na anulowane/zwrocone/nieoplacone
2. Modul sprawdza kazdy produkt w zamowieniu
3. Dla produktow z wlaczonym zarzadzaniem stanem - przywraca ilosc
4. Dodaje note do zamowienia: "Stock restored: Nazwa produktu (5 -> 8)"
5. Ustawia meta `_polski_stock_restored` aby zapobiec podwojnemu przywroceniu

## Wymagania

- Opcja WooCommerce **Zarzadzaj stanem magazynowym** musi byc wlaczona
- Produkty musza miec wlaczone zarzadzanie stanem

## Hook

| Hook | Typ | Opis |
|------|-----|------|
| `polski/stock/restored` | action | Po przywroceniu stanu dla produktu |
