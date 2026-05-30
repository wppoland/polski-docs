---
title: Zwroty i reklamacje (RMA)
description: Darmowy moduł zwrotów i reklamacji w Polski for WooCommerce - zgłoszenie z poziomu Mojego konta, kwalifikacja zamówienia, e-maile potwierdzające, kolejka zgłoszeń w panelu i statusy oraz ustawienia.
---

Moduł **Zwroty i reklamacje (RMA)** daje klientom prosty sposób na złożenie reklamacji (`reklamacja`) lub zgłoszenie zwrotu (`zwrot`) bezpośrednio w Twoim sklepie, a Tobie jedno miejsce do obsługi tych zgłoszeń. Jest częścią Polski for WooCommerce, opcjonalny i domyślnie wyłączony.

:::caution
Moduł dostarcza narzędzia i szablony do obsługi zwrotów i reklamacji. Treść regulaminu, polityka zwrotów oraz decyzje merytoryczne pozostają Twoją odpowiedzialnością. To nie jest porada prawna.
:::

## Co robi moduł

Po włączeniu klient zalogowany może z poziomu `Moje konto › Zamówienia` złożyć reklamację lub zgłosić zwrot dla kwalifikującego się zamówienia. Każde zgłoszenie zostaje zapisane, klient i sklep otrzymują e-mail potwierdzający, a Ty obsługujesz całość z jednej kolejki w panelu administratora. Przepływ odwzorowuje istniejący moduł odstąpień od umowy.

## Włączenie modułu

Moduł jest darmowy, opcjonalny i domyślnie wyłączony.

Przejdź do `WooCommerce › Polski › Modules`, grupa **Consumer Rights**, i włącz przełącznik **Returns & complaints (RMA)**.

## Jak klient składa zgłoszenie

Klient musi być zalogowany. W `Moje konto › Zamówienia` przy każdym kwalifikującym się zamówieniu pojawia się akcja **Reklamacja / zwrot**, która otwiera formularz.

Formularz zawiera:

- **Typ** - `Reklamacja` (complaint) lub `Zwrot` (return)
- **Powód** - pole tekstowe z opisem zgłoszenia

Po wysłaniu formularza zgłoszenie zostaje zapisane. Istniejące zgłoszenia wraz z ich aktualnym statusem są widoczne na stronie szczegółów zamówienia, więc klient w każdej chwili sprawdzi, na jakim etapie jest jego sprawa.

## Kwalifikacja zamówienia

Akcja **Reklamacja / zwrot** pojawia się tylko wtedy, gdy zamówienie spełnia oba warunki:

- należy do zalogowanego klienta,
- mieści się w konfigurowalnym oknie kwalifikacji liczonym w dniach od daty zamówienia (domyślnie 365 dni).

## E-maile potwierdzające

Po wysłaniu zgłoszenia wysyłane są dwa e-maile potwierdzające:

- do **klienta** - potwierdzenie przyjęcia zgłoszenia,
- do **sklepu** - powiadomienie o nowym zgłoszeniu na adres skonfigurowany w ustawieniach.

## Kolejka zgłoszeń i statusy

Wszystkie zgłoszenia trafiają do jednej kolejki w `WooCommerce › Polski › Returns & complaints`. Sklep zmienia status każdego zgłoszenia, wybierając jeden z czterech:

- **Submitted** - zgłoszenie złożone, oczekuje na obsługę
- **In progress** - zgłoszenie w trakcie rozpatrywania
- **Resolved** - zgłoszenie rozpatrzone
- **Rejected** - zgłoszenie odrzucone

## Ustawienia

Moduł ma dwa ustawienia:

- **Eligibility window** - okno kwalifikacji w dniach od daty zamówienia (domyślnie 365)
- **Notification email** - adres e-mail administratora, na który trafiają powiadomienia o nowych zgłoszeniach
