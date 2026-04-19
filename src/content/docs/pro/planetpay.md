---
title: Integracja PlanetPay
description: Bramka platnosci PlanetPay w Polski PRO - BLIK, karty, przelewy, Google Pay, Apple Pay.
---

Modul PlanetPay integruje WooCommerce z bramka platnosci PlanetPay. Obsluguje BLIK, karty platnicze, przelewy bankowe, Google Pay i Apple Pay.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Konto w PlanetPay.
:::

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Platnosci > PlanetPay**.

### Dane dostepu

| Ustawienie | Opis |
|------------|------|
| Merchant ID | Identyfikator sprzedawcy |
| Merchant Secret | Klucz tajny sprzedawcy |
| Klucz podpisywania | Klucz SHA256 HMAC do weryfikacji webhookow |
| Tryb sandbox | Testowanie bez realnych transakcji |

### Metody platnosci

| Metoda | Opis |
|--------|------|
| BLIK | Platnosc kodem 6-cyfrowym, instant |
| Karty | Visa, Mastercard, inne |
| Przelewy bankowe | Przelewy24 i tradycyjne |
| Google Pay | Platnosc Google Pay |
| Apple Pay | Platnosc Apple Pay |

## Przeplyw platnosci

### BLIK
1. Klient wybiera BLIK i wpisuje 6-cyfrowy kod
2. Platnosc przetwarzana natychmiastowo przez API
3. Zamowienie oznaczane jako oplacone

### Inne metody
1. Klient wybiera metode platnosci
2. Przekierowanie do paywall PlanetPay
3. Webhook aktualizuje status zamowienia

## Zwroty

Zwroty mozna inicjowac z panelu zamowienia WooCommerce. API PlanetPay przetwarza zwrot i wysyla powiadomienie webhook.

## Webhooki

| Endpoint | Opis |
|----------|------|
| `/wp-json/polski-pro/v1/planetpay/payment` | Powiadomienia o statusie platnosci |
| `/wp-json/polski-pro/v1/planetpay/refund` | Powiadomienia o statusie zwrotu |

Webhooki sa weryfikowane podpisem SHA256 HMAC w naglowku `X-Planetpay-Signature`.
