---
title: Automatyczne prosby o opinie
description: Modul automatycznej wysylki emaili z prosba o opinie po zakupie w Polski for WooCommerce.
---

Modul automatycznie wysyla email z prosba o opinie do klientow po zrealizowaniu zamowienia. Kazdy email zawiera linki do recenzji kupionych produktow.

## Konfiguracja

Przejdz do **Polski > Moduly** i wlacz modul **Prosby o opinie**.

| Ustawienie | Opis | Domyslnie |
|------------|------|-----------|
| Opoznienie (dni) | Po ilu dniach od realizacji wyslac email | 7 |
| Temat emaila | Tytul wiadomosci (tokeny: `{first_name}`, `{order_number}`) | Jak oceniasz swoje zakupy? Zostaw opinie |
| Tresc wstepna | Tekst powitalny (token: `{first_name}`) | Czesc {first_name}, dziekujemy za ostatnie zakupy... |
| Tekst przycisku | CTA przy kazdym produkcie | Zostaw opinie |
| Tekst rezygnacji | Link opt-out na dole emaila | Zrezygnuj z prosb o opinie |

## Jak to dziala

1. Zamowienie zmienia status na **Zakonczone**
2. System planuje wysylke emaila za X dni (domyslnie 7)
3. Codziennie cron sprawdza zaplanowane prosby
4. Email jest wysylany z lista produktow i przyciskami "Zostaw opinie"
5. Produkty, ktore klient juz zrecenzowal, sa pomijane

## Tresc emaila

Email zawiera:
- Spersonalizowane powitanie
- Lista produktow z miniaturkami zdjec
- Przycisk CTA per produkt prowadzacy do sekcji opinii
- Link opt-out na dole

## Opt-out

Klient moze kliknac link "Zrezygnuj z prosb o opinie" w emailu. Po kliknieciu:
- Meta `_polski_review_optout` ustawiana na koncie uzytkownika
- Zadne przyszle prosby nie beda wysylane
- Potwierdzenie w WooCommerce notices

:::note
Opt-out wymaga zalogowania. Goscie (bez konta) nie widza linku opt-out.
:::

## Integracja z Verified Review

Modul prosb o opinie dziala niezaleznie od modulu **Zweryfikowany zakup** (badge). Oba mozna wlaczyc jednoczesnie:

- **Prosby o opinie** - wysyla emaile zachecajace do recenzji
- **Zweryfikowany zakup** - dodaje badge "Zweryfikowany zakup" do opinii osob ktore kupily produkt

## Unikanie duplikatow

System sprawdza, czy klient juz zostawil opinie danego produktu. Jesli tak - produkt nie pojawia sie w emailu. Jesli wszystkie produkty zostaly juz zrecenzowane - email nie jest wysylany.
