---
title: Flexible Shipping (Table Rate)
description: Zaawansowane reguly wysylki oparte na wadze, wartosci koszyka, liczbie produktow i kraju docelowym.
---

Metoda wysylki Flexible Shipping pozwala definiowac zlozone reguly kosztow wysylki.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Wysylka > [Strefa] > Dodaj metode > Flexible Shipping**.

## Warunki regul

| Warunek | Opis |
|---------|------|
| Min/max wartosc koszyka | Koszt zalezy od wartosci zamowienia |
| Min/max waga | Koszt zalezy od wagi koszyka (kg) |
| Min/max liczba produktow | Koszt zalezy od ilosci |
| Kraje | Reguła tylko dla okreslonych krajow |

## Tryby kalkulacji kosztu

| Tryb | Opis |
|------|------|
| fixed | Stala kwota za zamowienie |
| per_item | Kwota x liczba produktow |
| per_kg | Kwota x waga w kg |
| percent | Procent wartosci koszyka |

## Dodatkowy koszt za wage

Mozna skonfigurowac dodatkowy koszt za kazdy kg powyzej progu:
- `extra_kg_above`: Prog wagowy (kg)
- `extra_kg_cost`: Koszt za dodatkowy kg

## Darmowa wysylka

Pole "Free shipping above" - po przekroczeniu wartosci koszyka wysylka jest darmowa.

## Reguly JSON

Reguly sa przechowywane jako JSON. Przyklad:

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
