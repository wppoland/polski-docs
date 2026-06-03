---
title: Expertní recenze
description: Vyhrazený typ příspěvku pro expertní recenze produktů s hodnocením a Schema.org.
---

Modul Expert Reviews vytváří samostatný typ příspěvku (CPT) pro publikování expertních recenzí produktů.

## Zapnutí

Přejděte do **WooCommerce > Polski > Moduly** a zapněte modul **Expert Reviews** v sekci "Storefront".

## Vytvoření recenze

Po zapnutí modulu přejděte do **Products > Expert Reviews > Add review**.

| Pole | Popis |
|------|------|
| Title | Titulek recenze |
| Content | Obsah recenze (editor WordPress) |
| Product | Produkt WooCommerce, ke kterému je recenze přiřazena |
| Rating | Hodnocení 1-10 (s krokem 0,5) |
| Verdict | Krátký verdikt (např. "Doporučený", "Nejlepší ve své třídě") |

## Zobrazení

Expertní recenze se zobrazují automaticky na stránce produktu, pod popisem. Každá recenze obsahuje:

- Titulek a autora
- Barevný odznak s hodnocením (zelený >= 8, žlutý >= 5, červený < 5)
- Obsah recenze
- Verdikt (pokud je nastaven)
- Datum publikace

## Schema.org

Modul automaticky generuje značkování Schema.org `Review` s:
- `reviewRating` (1-10)
- `author` (Person)
- `datePublished`
- `reviewBody`

To zlepšuje viditelnost ve výsledcích vyhledávání (rich snippets).
