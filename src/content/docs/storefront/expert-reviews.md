---
title: Recenzje eksperckie
description: Dedykowany typ postow dla recenzji eksperckich produktow z ocenami i Schema.org.
---

Modul Expert Reviews tworzy osobny typ postu (CPT) do publikowania eksperckich recenzji produktow.

## Wlaczenie

Przejdz do **WooCommerce > Polski > Moduly** i wlacz modul **Expert Reviews** w sekcji "Storefront".

## Tworzenie recenzji

Po wlaczeniu modulu przejdz do **Products > Expert Reviews > Add review**.

| Pole | Opis |
|------|------|
| Title | Tytul recenzji |
| Content | Tresc recenzji (edytor WordPress) |
| Product | Produkt WooCommerce, do ktorego recenzja jest przypisana |
| Rating | Ocena 1-10 (z krokiem 0.5) |
| Verdict | Krotki werdykt (np. "Polecany", "Najlepszy w klasie") |

## Wyswietlanie

Recenzje eksperckie wyswietlaja sie automatycznie na stronie produktu, ponizej opisu. Kazda recenzja zawiera:

- Tytul i autora
- Kolorowa plakietka z ocena (zielona >= 8, zolta >= 5, czerwona < 5)
- Tresc recenzji
- Werdykt (jesli ustawiony)
- Data publikacji

## Schema.org

Modul automatycznie generuje znakowanie Schema.org `Review` z:
- `reviewRating` (1-10)
- `author` (Person)
- `datePublished`
- `reviewBody`

To poprawia widocznosc w wynikach wyszukiwania (rich snippets).
