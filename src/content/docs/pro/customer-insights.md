---
title: Analiza klientow (Customer Insights)
description: Dokumentacja modulu Customer Insights w Polski PRO for WooCommerce - segmentacja RFM, wartosc klienta CLV, dashboard analityczny i rekomendacje dzialań.
---

Modul Customer Insights zapewnia zaawansowana analize bazy klientow z wykorzystaniem segmentacji RFM (Recency, Frequency, Monetary). Dashboard prezentuje kluczowe metryki, segmenty klientow i rekomendacje dzialań marketingowych.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Jak to dziala

1. Plugin analizuje historie zamowien wszystkich klientow
2. Dla kazdego klienta oblicza trzy wskazniki RFM:
   - **Recency (R)** - ile dni minelo od ostatniego zamowienia
   - **Frequency (F)** - laczna liczba zamowien
   - **Monetary (M)** - laczna wartosc zamowien
3. Na podstawie wskaznikow klient jest przypisywany do jednego z 7 segmentow
4. Wyniki sa cachowane w transient na 1 godzine

## Dashboard

Przejdz do **WooCommerce > Analiza klientow** aby otworzyc dashboard.

### Karty podsumowania

Na gorze dashboardu wyswietlane sa cztery metryki:

| Metryka | Opis |
|---------|------|
| Laczna liczba klientow | Wszyscy klienci z co najmniej jednym zamowieniem |
| Srednie CLV | Srednia wartosc klienta w calym cyklu zycia (Customer Lifetime Value) |
| Srednia liczba zamowien | Srednia liczba zamowien na klienta |
| Ryzyko odejscia | Odsetek klientow bez zamowienia w ostatnich 30 dniach |

### Segmenty RFM

Modul klasyfikuje klientow do 7 segmentow:

| Segment | Charakterystyka | Rekomendacja |
|---------|----------------|--------------|
| Champions | Wysokie R, F i M - kupuja czesto, duzo i niedawno | Nagradzaj ekskluzywnymi ofertami, proponuj program VIP |
| Loyal | Wysokie F - kupuja regularnie | Sprzedaz dodatkowa (upselling), proponuj subskrypcje |
| Potential Loyal | Srednie F, wysokie R - kupili niedawno kilka razy | Zachecaj do kolejnych zakupow, buduj lojalnosc |
| New Customers | Wysokie R, niskie F - swiezy klient z 1-2 zamowieniami | Powitaj, zaoferuj rabat na kolejne zakupy |
| At Risk | Niskie R, wysokie F - kiedys kupowali czesto, teraz przestali | Kampania reaktywacyjna, zapytaj o powod |
| Hibernating | Niskie R, srednie F - dawno nie kupowali | Agresywna oferta win-back, ograniczone czasowo rabaty |
| Lost | Bardzo niskie R, niskie F - jednorazowi klienci sprzed dlugiego czasu | Ostatnia proba kontaktu lub usun z aktywnych kampanii |

### Tabela segmentow

Dashboard wyswietla tabele podsumowujaca kazdy segment:

| Kolumna | Opis |
|---------|------|
| Segment | Nazwa segmentu z kolorowym znacznikiem |
| Liczba klientow | Ilosc klientow w segmencie |
| Udzial % | Procentowy udzial segmentu w calej bazie |
| Sredni przychod | Srednia wartosc zamowien klientow w segmencie |
| Srednia liczba zamowien | Srednia liczba zamowien na klienta w segmencie |
| Rekomendacja | Sugerowane dzialanie marketingowe |

### Top klienci

Ponizej tabeli segmentow wyswietlana jest lista najcenniejszych klientow (Top Customers), sortowana malejaco wedlug lacznej wartosci zamowien. Tabela zawiera:

- Imie i nazwisko klienta
- Adres e-mail
- Segment RFM
- Liczba zamowien
- Laczna wartosc zamowien
- Data ostatniego zamowienia

## Wydajnosc

Modul korzysta z bezposrednich zapytan SQL zamiast WP_Query dla optymalnej wydajnosci przy duzych bazach klientow:

- Zapytania sa wykonywane na tabelach zamowien WooCommerce
- Agregacja danych odbywa sie na poziomie bazy danych
- Wyniki sa cachowane w WordPress transient na 1 godzine
- Klucz transient: `polski_pro_customer_insights`
- Czas wygasniecia: 3600 sekund

## Wlaczanie modulu

Modul jest kontrolowany przelacznikiem w ustawieniach modulow PRO:

```
WooCommerce > Ustawienia > Polski PRO > Moduly > Customer Insights
```

Po wlaczeniu modulu pozycja **Analiza klientow** pojawia sie automatycznie w menu WooCommerce.

<div class="disclaimer">Ta strona ma wylacznie charakter informacyjny i nie stanowi porady prawnej. Polski PRO for WooCommerce jest oprogramowaniem komercyjnym dostarczanym bez gwarancji.</div>
