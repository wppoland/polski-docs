---
title: Expertné recenzie
description: Vyhradený typ príspevkov pre expertné recenzie produktov s hodnoteniami a Schema.org.
---

Modul Expert Reviews vytvára samostatný typ príspevku (CPT) na publikovanie expertných recenzií produktov.

## Zapnutie

Prejdite do **WooCommerce > Polski > Moduly** a zapnite modul **Expert Reviews** v sekcii "Storefront".

## Vytvorenie recenzie

Po zapnutí modulu prejdite do **Products > Expert Reviews > Add review**.

| Pole | Popis |
|------|------|
| Title | Názov recenzie |
| Content | Obsah recenzie (editor WordPress) |
| Product | Produkt WooCommerce, ku ktorému je recenzia priradená |
| Rating | Hodnotenie 1-10 (s krokom 0,5) |
| Verdict | Krátky verdikt (napr. "Odporúčaný", "Najlepší v triede") |

## Zobrazenie

Expertné recenzie sa zobrazujú automaticky na stránke produktu, pod popisom. Každá recenzia obsahuje:

- Názov a autora
- Farebnú plaketu s hodnotením (zelená >= 8, žltá >= 5, červená < 5)
- Obsah recenzie
- Verdikt (ak je nastavený)
- Dátum publikovania

## Schema.org

Modul automaticky generuje značkovanie Schema.org `Review` s:
- `reviewRating` (1-10)
- `author` (Person)
- `datePublished`
- `reviewBody`

To zlepšuje viditeľnosť vo výsledkoch vyhľadávania (rich snippets).
