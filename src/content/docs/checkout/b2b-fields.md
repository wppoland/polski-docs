---
title: Pola B2B w checkout
description: Opcjonalny przełącznik "Kupuję jako firma" oraz pola NIP, REGON i IBAN w WooCommerce checkout. Walidacja NIP po algorytmie sumy kontrolnej, zapis do standardowych meta zamówienia używanych przez KSeF i moduł faktur.
---

Polski 1.13.0 dodaje opcjonalny zestaw pól B2B do WooCommerce checkout: przełącznik "Kupuję jako firma" oraz pola NIP, REGON i IBAN. Pola pojawiają się w klasycznym checkoucie WooCommerce (filtr `woocommerce_billing_fields`), są zapisywane do standardowych meta zamówienia i odczytywane przez moduł KSeF oraz fakturowanie w PRO bez dodatkowej konfiguracji.

## Przełącznik "Kupuję jako firma"

Checkbox `polski_buying_as_company` na początku sekcji billing. Domyślnie odznaczony - pola NIP, REGON i IBAN są ukryte aż do zaznaczenia. Stan jest zapisywany do meta zamówienia `_polski_buying_as_company` (`yes` / `no`).

Logika ukrywania jest realizowana inline'owym JavaScript - nie wymaga procesu budowania ani dodatkowych zależności frontendowych. Skrypt obsługuje także zdarzenie `updated_checkout` z jQuery, więc działa po asynchronicznym przeładowaniu fragmentu checkoutu.

## NIP

Pole `billing_nip` z walidacją po algorytmie sumy kontrolnej Polish NIP (10 cyfr, wagi 6, 5, 7, 2, 3, 4, 5, 6, 7, modulo 11). Dopuszczane formaty wejściowe: `1234567890`, `123-456-78-90`, `123 456 78 90`, oraz prefiksowane `PL1234567890` (prefix usuwany przed walidacją). Wartość zapisywana w postaci znormalizowanej (10 cyfr) do meta `_billing_nip`.

Walidacja w PHP używa nowej, statycznej klasy `Polski\Util\NipValidator`:

```php
use Polski\Util\NipValidator;

NipValidator::isValid('5260250274');           // true
NipValidator::isValid('PL 526-025-02-74');     // true
NipValidator::normalize('PL 526-025-02-74');   // '5260250274'
NipValidator::format('5260250274');            // '526-025-02-74'
```

Jeśli aktywny jest moduł `Polski\Pro\Validation\NipValidator` z polski-pro, FREE pomija własną rejestrację pola NIP, żeby nie dublować pola w checkoucie. REGON i IBAN są zawsze dodawane przez FREE.

## REGON

Opcjonalne pole `billing_regon` (domyślnie wyłączone). Akceptuje 9 lub 14 cyfr (REGON krótki / REGON długi). Walidacja regex: `/^\d{9}$|^\d{14}$/`. Zapisywane do meta zamówienia `_billing_regon`.

## IBAN

Opcjonalne pole `billing_iban` (domyślnie wyłączone). Walidacja strukturalna: 2 litery prefiksu kraju + 2 cyfry kontrolne + 11-30 znaków alfanumerycznych, łączna długość 15-34. Strict mod-97 jest świadomie pozostawiona integratorom (np. wtyczce do bramki płatniczej). Zapisywane do meta `_billing_iban`.

## Ustawienia (`polski_b2b`)

| Klucz | Wartość domyślna | Opis |
|---|---|---|
| `enabled` | `true` | Główny przełącznik modułu |
| `show_company_toggle` | `true` | Czy pokazać checkbox "Kupuję jako firma" |
| `nip` | `true` | Czy dodać pole NIP (pomijane gdy aktywne polski-pro NipValidator) |
| `regon` | `false` | Czy dodać pole REGON |
| `iban` | `false` | Czy dodać pole IBAN |

Włączenie REGON i IBAN przez `update_option`:

```php
update_option('polski_b2b', array_merge(
    (array) get_option('polski_b2b', []),
    ['regon' => true, 'iban' => true]
));
```

## Integracja z innymi modułami

- **Moduł KSeF (FREE)** odczytuje `_billing_nip` z zamówienia i automatycznie wykrywa zamówienia wymagające faktury elektronicznej.
- **Moduł Faktury (PRO)** odczytuje `_billing_nip` jako `nipBuyer` przy generowaniu Faktury VAT i Faktury korygującej.
- **AI Feed dla faktur (PRO)** udostępnia faktury jako Markdown wraz z polami NIP w sekcji "Parties".

## Wyświetlanie w panelu admina

Pola NIP / REGON / IBAN są dodawane do bloku "Billing details" w widoku zamówienia w panelu (`woocommerce_admin_billing_fields`). Edytujesz w tym samym miejscu co adres rozliczeniowy klienta.

## Kompatybilność z Block checkout

Od Polski 1.14.0 pola NIP / REGON / IBAN są rejestrowane przez WooCommerce API `woocommerce_register_additional_checkout_field` (WC 8.6+). Jedna rejestracja pokrywa zarówno **klasyczny checkout**, jak i **Block checkout (Cart & Checkout Blocks)**. Walidacja działa po obu stronach.

Wartości zapisywane przez to API trafiają domyślnie pod klucze meta `_wc_billing/polski/nip`, `_wc_billing/polski/regon`, `_wc_billing/polski/iban`. Polski automatycznie kopiuje je do **starszych** kluczy `_billing_nip`, `_billing_regon`, `_billing_iban` (akcja `woocommerce_set_additional_field_value`), dzięki czemu moduły KSeF i Faktury w PRO odczytują dane bez żadnych zmian.

Sklepy na WooCommerce starszym niż 8.6 nadal korzystają z klasycznej ścieżki rejestracji pól (`woocommerce_billing_fields`) z przełącznikiem "Kupuję jako firma" i inline'owym JavaScriptem.
