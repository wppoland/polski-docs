---
title: "E-faktury: PEPPOL/UBL i JPK_FA"
description: "Eksport faktur w Polski PRO for WooCommerce do formatu PEPPOL/UBL (EN 16931) z poziomu zamówienia oraz raport JPK_FA(3) za wybrany okres dla księgowości."
---

Polski PRO udostępnia dwa formaty eksportu faktur poza KSeF: **PEPPOL / UBL** (faktura ustrukturyzowana zgodna z EN 16931, do obrotu B2B i z administracją w UE) oraz **JPK_FA(3)** (raport faktur dla polskiej administracji skarbowej).

:::caution
Pliki generowane są na podstawie danych faktury w sklepie. Przed użyciem produkcyjnym zweryfikuj plik PEPPOL/UBL w oficjalnym walidatorze PEPPOL, a plik JPK_FA wobec schematu XSD Ministerstwa Finansów. Moduł dostarcza eksport, a nie poradę księgową ani prawną.
:::

## PEPPOL / UBL (eksport z zamówienia)

Eksport UBL pozwala pobrać fakturę jako plik XML zgodny z **EN 16931 / PEPPOL BIS Billing 3.0** - format używany w fakturowaniu ustrukturyzowanym B2B i z sektorem publicznym w Unii Europejskiej.

### Jak pobrać

Na ekranie edycji zamówienia (`WooCommerce › Zamówienia › [zamówienie]`) pojawia się panel **PEPPOL / UBL (XML)**. Jeśli dla zamówienia istnieje już faktura, panel udostępnia przycisk pobrania:

- przycisk **UBL: [numer faktury]** pobiera plik XML faktury,
- jeśli faktura nie została jeszcze wystawiona, panel pokazuje informację **No invoice yet** - najpierw wygeneruj fakturę.

### Co zawiera plik

Plik UBL odwzorowuje fakturę: strony transakcji (sprzedawca i nabywca wraz z NIP), podsumowania VAT w rozbiciu na stawki, sumy kwotowe oraz pozycje faktury.

## JPK_FA (raport za okres)

Raport **JPK_FA(3)** generuje plik XML z fakturami wystawionymi w wybranym przedziale dat, w strukturze wymaganej przez polską administrację skarbową.

### Jak wygenerować

Przejdź do `WooCommerce › Polski › JPK_FA report`. Formularz zawiera:

- **From** - data początkowa okresu,
- **To** - data końcowa okresu,
- przycisk **Download JPK_FA XML** pobiera raport.

Raport obejmuje faktury wystawione w wybranym okresie, z nagłówkiem, danymi podmiotu, fakturami z rozbiciem VAT na stawki, sumami kontrolnymi oraz wierszami pozycji.

### Dane wystawcy

Dane sprzedawcy w raporcie pobierane są z ustawień ogólnych wtyczki (NIP, nazwa i adres firmy). Uzupełnij je przed wygenerowaniem raportu, aby plik zawierał poprawne dane podmiotu.

:::note
JPK_FA to raport faktur. To nie jest to samo co JPK_V7 (ewidencja VAT) ani wysyłka do KSeF - te obsługiwane są osobno.
:::
