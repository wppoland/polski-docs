---
title: "Akce a dynamické ceny"
description: "Bezplatný modul dynamických cen v Polski for WooCommerce - automatické slevy v košíku: množstevní (hromadná) sleva na řádek produktu a procentní sleva, když mezisoučet košíku dosáhne prahové hodnoty. Ve výchozím nastavení vypnuto."
---

Modul **Promotions / dynamic pricing** přidává dvě automatické slevy v košíku, které se nastavují v nastavení modulu. Je součástí Polski for WooCommerce: bezplatný, volitelný a ve výchozím nastavení vypnutý.

## Co modul dělá

Po zapnutí modul aplikuje slevy automaticky při přepočtu košíku, bez slevových kódů:

- **Hromadná (množstevní) sleva** - procentní sleva na řádek produktu, když jeho množství dosáhne prahové hodnoty.
- **Sleva z mezisoučtu košíku** - procentní sleva, když mezisoučet košíku dosáhne prahové hodnoty (aplikuje se jako záporný poplatek košíku).

Slevy se pokaždé znovu vypočítají z běžné ceny, idempotentně, takže jsou bezpečné i při opakovaných výpočtech součtů ve WooCommerce.

## Zapnutí modulu

Modul je bezplatný, volitelný a ve výchozím nastavení vypnutý.

Přejděte do `WooCommerce › Polski › Modules`, skupina **Merchandising**, a zapněte přepínač **Promotions / dynamic pricing**.

## Nastavení

Nastavení modulu se nacházejí na jeho kartě v sekci `Modules`:

| Nastavení | Popis |
|---------|-------------|
| **Bulk discount: minimum quantity per product** | Prahová hodnota množství na řádek, která spustí hromadnou slevu. `0` hromadnou slevu vypne. |
| **Bulk discount: percent off (%)** | Procentní sleva na řádek, jakmile množství dosáhne prahové hodnoty. |
| **Cart discount: subtotal threshold** | Mezisoučet košíku, který spustí slevu z košíku. `0` ji vypne. |
| **Cart discount: percent off (%)** | Procentní sleva z mezisoučtu košíku, jakmile je prahová hodnota dosažena. |

## Jak slevy fungují

### Hromadná sleva

Když množství na řádku dosáhne prahové hodnoty **minimum quantity per product**, cena tohoto řádku se sníží o nastavené procento. Sleva se aplikuje na každý kvalifikující se řádek samostatně.

Příklad: prahová hodnota `10`, sleva `15%`. Zákazník s 10 kusy produktu získá na tomto řádku slevu 15 %; při 9 kusech se žádná sleva neuplatní.

### Sleva z mezisoučtu košíku

Když mezisoučet košíku dosáhne **subtotal threshold**, do košíku se přidá záporný poplatek rovný nastavenému procentu z mezisoučtu.

Příklad: prahová hodnota `500`, sleva `10%`. Košík s hodnotou 500 nebo více získá slevu 10 %, aplikovanou jako sleva z košíku.

## Kombinování slev

Obě slevy fungují nezávisle a mohou se uplatnit zároveň: hromadná sleva snižuje ceny řádků a sleva z košíku přidává další snížení na základě mezisoučtu. Chcete-li některou z nich vypnout, nastavte její prahovou hodnotu na `0`.
