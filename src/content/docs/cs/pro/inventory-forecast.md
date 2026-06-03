---
title: Prognózování stavů skladu
description: Dokumentace modulu prognózování stavů skladu v Polski PRO for WooCommerce - predikce vyčerpání zásob, dashboard s kartami stavu a doporučená množství objednávek.
---

Modul prognózování stavů skladu analyzuje rychlost prodeje za posledních 90 dní a předpovídá datum vyčerpání zásob pro každý produkt. Dashboard umožňuje rychle identifikovat produkty vyžadující doplnění.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Jak to funguje

1. Plugin načte data prodeje za posledních 90 dní (objednávky se stavem completed a processing)
2. Vypočítá průměrný denní prodej (sales velocity) pro každý produkt
3. Na základě aktuálního stavu skladu a průměrného prodeje předpoví datum vyčerpání
4. Produkty jsou klasifikovány podle naléhavosti doplnění
5. Výsledky jsou kešovány v transient na 1 hodinu

## Dashboard

Přejděte do **WooCommerce > Prognóza skladu** a otevřete dashboard prognózování.

### Karty souhrnu

V horní části dashboardu se zobrazují tři karty stavu:

| Karta | Podmínka | Barva |
|-------|---------|-------|
| Kritické | Vyčerpání během 7 dní | Červená |
| Varování | Vyčerpání během 30 dní | Žlutá |
| Zdravé | Vyčerpání za 30+ dní | Zelená |

Každá karta ukazuje počet produktů v dané kategorii.

### Tabulka produktů

Pod kartami se zobrazuje tabulka s detaily pro každý produkt:

| Sloupec | Popis |
|---------|------|
| Produkt | Název produktu s odkazem na úpravu |
| Aktuální stav | Aktuální množství na skladě |
| Průměrný denní prodej | Průměrný počet prodaných kusů denně (za 90 dní) |
| Dny do vyčerpání | Odhadovaný počet dní do nulového stavu |
| Prognózované datum | Předpokládané datum vyčerpání zásob |
| Doporučená objednávka | Doporučené množství k objednání (pokrytí na 30 dní) |

Tabulka je výchozím způsobem seřazena podle sloupce "Dny do vyčerpání" (vzestupně), díky čemuž jsou produkty vyžadující nejrychlejší doplnění nahoře.

### Doporučené množství objednávky

Doporučené množství objednávky se vypočítá podle vzorce:

```
doporučená_objednávka = průměrný_denní_prodej * 30
```

Tato hodnota představuje množství pokrývající poptávku na 30 dní.

## Sloupec v seznamu produktů

Modul přidává sloupec **Prognóza** v seznamu produktů (**Produkty > Všechny produkty**). Sloupec zobrazuje odhadovaný počet dní do vyčerpání zásob s barevným ukazatelem:

- Červená (kritický): méně než 7 dní
- Žlutá (varování): 7-30 dní
- Zelená (zdravý): více než 30 dní

Produkty bez sledování stavů skladu nebo s vypnutou správou stavu prognózu nezobrazují.

## Zdroj dat

Data prodeje jsou načítána přímo z databáze pomocí SQL dotazu na tabulkách:

- `{prefix}woocommerce_order_items` - položky objednávek
- `{prefix}woocommerce_order_itemmeta` - metadata položek (množství, product_id)

Zohledňovány jsou výhradně objednávky se stavem `wc-completed` a `wc-processing` za posledních 90 dní.

## Cache

Výsledky prognózování jsou ukládány do WordPress transient cache s dobou života 1 hodiny:

- Klíč transient: `polski_pro_inventory_forecast`
- Doba vypršení: 3600 sekund (1 hodina)
- Cache je automaticky obnovována po vypršení

To umožňuje vyhnout se pomalým SQL dotazům při každém načtení dashboardu.

## Zapnutí modulu

Modul je řízen přepínačem:

```
WooCommerce > Nastavení > Polski PRO > Moduly > inventory_forecast
```

Po zapnutí modulu se položka **Prognóza skladu** objeví automaticky v menu WooCommerce.

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Polski PRO for WooCommerce je komerční software dodávaný bez záruky.</div>
