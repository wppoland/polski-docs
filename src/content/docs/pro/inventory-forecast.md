---
title: Prognozowanie stanow magazynowych
description: Dokumentacja modulu prognozowania stanow magazynowych w Polski PRO for WooCommerce - predykcja wyczerpania zapasow, dashboard z kartami statusu i sugerowane ilosci zamowien.
---

Modul prognozowania stanow magazynowych analizuje predkosc sprzedazy z ostatnich 90 dni i przewiduje date wyczerpania zapasow dla kazdego produktu. Dashboard pozwala szybko zidentyfikowac produkty wymagajace uzupelnienia.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Jak to dziala

1. Plugin pobiera dane sprzedazy z ostatnich 90 dni (zamowienia o statusie completed i processing)
2. Oblicza srednia dzienna sprzedaz (sales velocity) dla kazdego produktu
3. Na podstawie aktualnego stanu magazynowego i sredniej sprzedazy przewiduje date wyczerpania
4. Produkty sa klasyfikowane wedlug pilnosci uzupelnienia
5. Wyniki sa cachowane w transient na 1 godzine

## Dashboard

Przejdz do **WooCommerce > Prognoza magazynu** aby otworzyc dashboard prognozowania.

### Karty podsumowania

Na gorze dashboardu wyswietlane sa trzy karty statusu:

| Karta | Warunek | Kolor |
|-------|---------|-------|
| Krytyczne | Wyczerpanie w ciagu 7 dni | Czerwony |
| Ostrzezenie | Wyczerpanie w ciagu 30 dni | Zolty |
| Zdrowe | Wyczerpanie za 30+ dni | Zielony |

Kazda karta pokazuje liczbe produktow w danej kategorii.

### Tabela produktow

Ponizej kart wyswietlana jest tabela ze szczegolami dla kazdego produktu:

| Kolumna | Opis |
|---------|------|
| Produkt | Nazwa produktu z linkiem do edycji |
| Aktualny stan | Biezaca ilosc w magazynie |
| Srednia dzienna sprzedaz | Srednia liczba sprzedanych sztuk dziennie (z 90 dni) |
| Dni do wyczerpania | Szacunkowa liczba dni do zerowego stanu |
| Prognozowana data | Przewidywana data wyczerpania zapasow |
| Sugerowane zamowienie | Zalecana ilosc do zamowienia (pokrycie na 30 dni) |

Tabela jest domyslnie sortowana wedlug kolumny "Dni do wyczerpania" (rosnaco), dzieki czemu produkty wymagajace najszybszego uzupelnienia sa na gorze.

### Sugerowana ilosc zamowienia

Sugerowana ilosc zamowienia jest obliczana wedlug wzoru:

```
sugerowane_zamowienie = srednia_dzienna_sprzedaz * 30
```

Wartosc ta reprezentuje ilosc pokrywajaca zapotrzebowanie na 30 dni.

## Kolumna na liscie produktow

Modul dodaje kolumne **Prognoza** na liscie produktow (**Produkty > Wszystkie produkty**). Kolumna wyswietla szacunkowa liczbe dni do wyczerpania zapasow z kolorowym wskaznikiem:

- Czerwony (krytyczny): mniej niz 7 dni
- Zolty (ostrzezenie): 7-30 dni
- Zielony (zdrowy): wiecej niz 30 dni

Produkty bez sledzenia stanow magazynowych lub z wylaczonym zarzadzaniem stanem nie wyswietlaja prognozy.

## Zrodlo danych

Dane sprzedazy sa pobierane bezposrednio z bazy danych za pomoca zapytania SQL na tabelach:

- `{prefix}woocommerce_order_items` - pozycje zamowien
- `{prefix}woocommerce_order_itemmeta` - metadane pozycji (ilosc, product_id)

Uwzgledniane sa wylacznie zamowienia o statusie `wc-completed` i `wc-processing` z ostatnich 90 dni.

## Cache

Wyniki prognozowania sa zapisywane w WordPress transient cache z czasem zycia 1 godziny:

- Klucz transient: `polski_pro_inventory_forecast`
- Czas wygasniecia: 3600 sekund (1 godzina)
- Cache jest automatycznie odswiezany po wygasnieciu

Pozwala to uniknac powolnych zapytan SQL przy kazdym zaladowaniu dashboardu.

## Wlaczanie modulu

Modul jest kontrolowany przelacznikiem:

```
WooCommerce > Ustawienia > Polski PRO > Moduly > inventory_forecast
```

Po wlaczeniu modulu pozycja **Prognoza magazynu** pojawia sie automatycznie w menu WooCommerce.

<div class="disclaimer">Ta strona ma wylacznie charakter informacyjny i nie stanowi porady prawnej. Polski PRO for WooCommerce jest oprogramowaniem komercyjnym dostarczanym bez gwarancji.</div>
