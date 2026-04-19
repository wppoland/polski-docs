---
title: Powiadomienia SMS
description: SMS-y o statusie zamowienia przez SMSAPI.pl i SerwerSMS.pl.
---

Modul wysyla automatyczne SMS-y do klientow przy zmianach statusu zamowienia.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Konto w SMSAPI.pl lub SerwerSMS.pl.
:::

## Obslugiwani dostawcy

| Dostawca | API |
|----------|-----|
| SMSAPI.pl | REST API z tokenem Bearer |
| SerwerSMS.pl | REST API z tokenem Bearer |

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Polski PRO > SMS**.

| Ustawienie | Opis |
|------------|------|
| Dostawca | SMSAPI.pl lub SerwerSMS.pl |
| Token API | Klucz autoryzacji |
| Nazwa nadawcy | Pole FROM (max 11 znakow) |
| Statusy | Ktore statusy triggeruja SMS |
| Szablon wiadomosci | Tresc SMS z tokenami |

## Tokeny w wiadomosci

| Token | Opis |
|-------|------|
| `{order_id}` | ID zamowienia |
| `{order_number}` | Numer zamowienia |
| `{first_name}` | Imie klienta |
| `{last_name}` | Nazwisko klienta |
| `{status}` | Nazwa nowego statusu |
| `{tracking_number}` | Numer sledzenia (jesli dostepny) |
| `{tracking_url}` | URL trackingu |
| `{total}` | Kwota zamowienia |
| `{site_name}` | Nazwa sklepu |

## Powiadomienia admina

Opcjonalnie mozna wlaczyc SMS-y do administratora o nowych zamowieniach z osobnym szablonem.

## Normalizacja numeru

System automatycznie normalizuje polskie numery telefonow do formatu miedzynarodowego (48XXXXXXXXX).

## RODO

Numery telefonow sa maskowane w notatkach zamowienia (np. 501***789).
