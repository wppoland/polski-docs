---
title: Program lojalnosciowy (Punkty)
description: System punktow lojalnosciowych w Polski PRO - klienci zbieraja punkty za zakupy i wymieniaja je na rabaty.
---

Modul programu lojalnosciowego pozwala nagradzac klientow punktami za zakupy i umozliwia wymiane punktow na rabaty w koszyku.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Polski PRO > Lojalnosc**.

### Podstawowe ustawienia

| Ustawienie | Opis | Domyslnie |
|------------|------|-----------|
| Wlaczony | Aktywuje program lojalnosciowy | Nie |
| Punkty za 1 PLN | Ile punktow za kazda zlotowke | 1 |
| Wartosc 1 punktu | Wartosc rabatowa jednego punktu | 0.01 PLN |
| Min. punkty do wymiany | Minimalna liczba punktow do wymiany | 100 |
| Maks. % rabatu | Maksymalny rabat procentowy z punktow | 50% |
| Wygasanie punktow | Po ilu dniach punkty wygasaja | 365 |
| Zaokraglanie | floor (w dol) lub ceil (w gore) | floor |

## Zbieranie punktow

Klienci automatycznie otrzymuja punkty po zrealizowanym zamowieniu.

### Priorytety naliczania

1. **Ustawienie per produkt** - pole "Loyalty points per unit" w edycji produktu
2. **Ustawienie per kategoria** - pole w edycji kategorii produktu
3. **Domyslna kalkulacja** - cena produktu x punkty za 1 PLN

### Informacja na stronie produktu

Na stronie produktu automatycznie wyswietla sie informacja:
> Zdobadz **X punktow** za zakup tego produktu

## Wymiana punktow

Klienci moga wymienic punkty na rabat na stronie koszyka lub checkoutu:
1. System pokazuje aktualne saldo i wartosc rabatu
2. Klient wpisuje liczbe punktow do wymiany
3. Tworzony jest jednorazowy kupon z rabatem
4. Kupon jest automatycznie aplikowany do koszyka

### Ograniczenia wymiany

- Minimalna liczba punktow do wymiany (konfigurowalana)
- Maksymalny rabat jako % wartosci koszyka
- Kupon wazny 24 godziny

## Panel Moje Konto

W sekcji **Moje konto** pojawia sie zakladka **Program lojalnosciowy** z:
- Aktualne saldo punktow i ich wartosc w PLN
- Suma zebranych punktow
- Suma wykorzystanych punktow
- Historia transakcji z datami, typami i szczegolami

## Wygasanie punktow

Punkty wygasaja automatycznie po skonfigurowanym czasie (domyslnie 365 dni). Cron `polski_daily_maintenance` codziennie sprawdza wygasle punkty i odejmuje je z salda.

Ustawienie na 0 = punkty nie wygasaja.

## Zwroty i anulowania

- Przy anulowaniu/zwrocie zamowienia - przyznane punkty sa automatycznie odejmowane
- Zabezpieczenie przed podwojnym naliczaniem i odejmowaniem

## Emaile zamowieniowe

W emailach potwierdzajacych zamowienie klient widzi informacje o liczbie zebranych punktow.

## Hooki

| Hook | Typ | Opis |
|------|-----|------|
| `polski/loyalty/points_awarded` | action | Po przyznaniu punktow za zamowienie |
| `polski/loyalty/order_points` | filter | Modyfikacja liczby punktow za zamowienie |
