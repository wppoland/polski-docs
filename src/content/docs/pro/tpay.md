---
title: Integracja Tpay
description: Bramka platnosci Tpay (Transferuj.pl) - przelewy bankowe, BLIK, karty platnicze.
---

Modul Tpay integruje WooCommerce z jedna z najpopularniejszych polskich bramek platnosci.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Konto w Tpay.
:::

## Obslugiwane metody

| Metoda | Opis |
|--------|------|
| Przelewy bankowe | Wszystkie polskie banki online |
| BLIK | Platnosc kodem 6-cyfrowym |
| Karty platnicze | Visa, Mastercard |

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Platnosci > Tpay**.

| Ustawienie | Opis |
|------------|------|
| Merchant ID | ID sprzedawcy Tpay (4-5 cyfr) |
| Security code | Kod bezpieczenstwa |
| API key | 40-znakowy klucz API (do zwrotow) |
| API password | Haslo API |
| BLIK | Wlacz platnosci BLIK |
| Lista bankow | Pokaz na checkoucie lub przekieruj do Tpay |

## Doplata za platnosc

Mozna skonfigurowac doplata za korzystanie z bramki:
- Stala kwota (PLN)
- Procent wartosci zamowienia

## Weryfikacja IPN

Powiadomienia IPN sa weryfikowane przez:
1. Suma kontrolna MD5: `md5(merchant_id + transaction_id + amount + crc + security_code)`
2. Biala lista IP Tpay (5 adresow)

## Zwroty

Zwroty przetwarzane przez Tpay Transaction API. Wymaga klucza API i hasla.
