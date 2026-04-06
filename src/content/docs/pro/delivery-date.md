---
title: Wybor daty dostawy
description: Modul wyboru preferowanej daty dostawy na checkoucie WooCommerce w Polski PRO.
---

Modul dodaje pole z kalendarzem (flatpickr) na stronie zamowienia, umozliwiajac klientom wybor preferowanej daty dostawy.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfiguracja

Przejdz do **Polski PRO > Moduly** i wlacz modul **Wybor daty dostawy**.

| Ustawienie | Opis | Domyslnie |
|------------|------|-----------|
| Etykieta pola | Tekst wyswietlany nad kalendarzem | Preferowana data dostawy |
| Pole wymagane | Czy klient musi wybrac date | Nie |
| Min. dni | Najwczesniejsza mozliwa data (dni od dzisiaj) | 1 |
| Max. dni | Najpozsniejsza mozliwa data (dni od dzisiaj) | 30 |
| Zablokowane dni tygodnia | Ktore dni sa niedostepne (0=niedz, 6=sob) | 0 (niedziele) |
| Zablokowane daty | Konkretne daty niedostepne (format: YYYY-MM-DD, rozdzielone przecinkami) | puste |
| Format wyswietlania | Format daty na zamowieniu | d.m.Y (l) |

## Jak to dziala

1. Na checkoucie pojawia sie pole z ikonka kalendarza
2. Klient klika i wybiera date z flatpickr
3. Zablokowane dni (weekendy, swieta) sa wyszarzone
4. Data jest walidowana po stronie serwera
5. Zapisywana w meta zamowienia (`_polski_delivery_date`)

## Gdzie widoczna jest data

- Panel admina (pod adresem wysylki)
- Strona szczegulow zamowienia (Moje Konto)
- Emaile zamowienia (HTML i plain text)

## Obsluga swiat

Aby zablokowac swieta (np. Boze Narodzenie, Wielkanoc), dodaj daty w formacie YYYY-MM-DD rozdzielone przecinkami:

```
2026-12-25,2026-12-26,2026-04-05,2026-04-06,2026-05-01,2026-05-03
```

## WooCommerce Blocks

Modul obsluguje rowniez checkout oparty na blokach WooCommerce. Data jest przekazywana przez Store API w `extensions.polski-pro.delivery_date`.
