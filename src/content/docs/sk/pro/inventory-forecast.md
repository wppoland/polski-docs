---
title: Prognózovanie skladových zásob
description: Dokumentácia modulu prognózovania skladových zásob v Polski PRO for WooCommerce - predikcia vyčerpania zásob, dashboard s kartami stavu a navrhované množstvá objednávok.
---

Modul prognózovania skladových zásob analyzuje rýchlosť predaja za posledných 90 dní a predpovedá dátum vyčerpania zásob pre každý produkt. Dashboard umožňuje rýchlo identifikovať produkty vyžadujúce doplnenie.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Ako to funguje

1. Plugin načíta dáta o predaji za posledných 90 dní (objednávky so stavom completed a processing)
2. Vypočíta priemerný denný predaj (sales velocity) pre každý produkt
3. Na základe aktuálneho skladového stavu a priemerného predaja predpovedá dátum vyčerpania
4. Produkty sú klasifikované podľa naliehavosti doplnenia
5. Výsledky sú uložené v transient cache na 1 hodinu

## Dashboard

Prejdite do **WooCommerce > Prognóza skladu**, aby ste otvorili dashboard prognózovania.

### Súhrnné karty

V hornej časti dashboardu sa zobrazujú tri karty stavu:

| Karta | Podmienka | Farba |
|-------|---------|-------|
| Kritické | Vyčerpanie do 7 dní | Červená |
| Upozornenie | Vyčerpanie do 30 dní | Žltá |
| Zdravé | Vyčerpanie za 30+ dní | Zelená |

Každá karta zobrazuje počet produktov v danej kategórii.

### Tabuľka produktov

Pod kartami sa zobrazuje tabuľka s podrobnosťami pre každý produkt:

| Stĺpec | Popis |
|---------|------|
| Produkt | Názov produktu s odkazom na úpravu |
| Aktuálny stav | Aktuálne množstvo na sklade |
| Priemerný denný predaj | Priemerný počet predaných kusov denne (za 90 dní) |
| Dni do vyčerpania | Odhadovaný počet dní do nulového stavu |
| Prognózovaný dátum | Predpovedaný dátum vyčerpania zásob |
| Navrhovaná objednávka | Odporúčané množstvo na objednanie (pokrytie na 30 dní) |

Tabuľka je predvolene zoradená podľa stĺpca "Dni do vyčerpania" (vzostupne), vďaka čomu sú produkty vyžadujúce najrýchlejšie doplnenie navrchu.

### Navrhované množstvo objednávky

Navrhované množstvo objednávky sa vypočíta podľa vzorca:

```
navrhovana_objednavka = priemerny_denny_predaj * 30
```

Táto hodnota predstavuje množstvo pokrývajúce dopyt na 30 dní.

## Stĺpec v zozname produktov

Modul pridáva stĺpec **Prognóza** v zozname produktov (**Produkty > Všetky produkty**). Stĺpec zobrazuje odhadovaný počet dní do vyčerpania zásob s farebným ukazovateľom:

- Červený (kritický): menej ako 7 dní
- Žltý (upozornenie): 7-30 dní
- Zelený (zdravý): viac ako 30 dní

Produkty bez sledovania skladových zásob alebo s vypnutým riadením zásob nezobrazujú prognózu.

## Zdroj dát

Dáta o predaji sa načítavajú priamo z databázy pomocou SQL dopytu na tabuľkách:

- `{prefix}woocommerce_order_items` - položky objednávok
- `{prefix}woocommerce_order_itemmeta` - metadáta položiek (množstvo, product_id)

Zohľadňujú sa výlučne objednávky so stavom `wc-completed` a `wc-processing` za posledných 90 dní.

## Cache

Výsledky prognózovania sú uložené vo WordPress transient cache s časom života 1 hodina:

- Kľúč transient: `polski_pro_inventory_forecast`
- Čas vypršania: 3600 sekúnd (1 hodina)
- Cache sa automaticky obnovuje po vypršaní

To umožňuje vyhnúť sa pomalým SQL dopytom pri každom načítaní dashboardu.

## Zapnutie modulu

Modul je ovládaný prepínačom:

```
WooCommerce > Nastavenia > Polski PRO > Moduly > inventory_forecast
```

Po zapnutí modulu sa položka **Prognóza skladu** automaticky objaví v menu WooCommerce.

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Polski PRO for WooCommerce je komerčný softvér dodávaný bez záruky.</div>
