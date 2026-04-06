---
title: Integracja Poczta Polska (eNadawca)
description: Modul integracji Poczta Polska eNadawca w Polski PRO for WooCommerce - generowanie etykiet, sledzenie przesylek i automaty paczkowe.
---

Modul Poczta Polska integruje WooCommerce z API eNadawca. Generuj etykiety wysylkowe, sledz przesylki i wyszukuj automaty paczkowe.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+ z rozszerzeniem SOAP. Dodatkowo wymagany jest login i haslo do eNadawca.
:::

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Polski PRO > Wysylka**.

### Uwierzytelnianie

| Ustawienie | Opis |
|------------|------|
| Login eNadawca | Login do systemu eNadawca |
| Haslo eNadawca | Haslo do systemu eNadawca |
| Srodowisko | Production lub Sandbox (testowe) |

Dane dostepowe uzyskasz rejestrujac sie w systemie eNadawca na stronie poczta-polska.pl.

## Dostepne uslugi

| Typ uslugi | Opis |
|------------|------|
| POCZTEX_KURIER_48 | Kurier Pocztex - dostawa w 48h (domyslny) |
| PACZKA_POCZTOWA_GABARYT_A | Paczka pocztowa gabaryt A |

## Generowanie etykiet

1. Otworz zamowienie w **WooCommerce > Zamowienia**
2. W sekcji **Shipment Tracking** wybierz przewoznika **Poczta Polska**
3. Kliknij **Generuj etykiete**
4. System utworzy przesylke przez eNadawca SOAP API

Dane odbiorcy (imie, adres, miasto, kod pocztowy, telefon, email) sa pobierane automatycznie z zamowienia.

## Sledzenie przesylek

Po wygenerowaniu etykiety numer sledzenia jest zapisywany w zamowieniu. Link do trackingu:

```
https://emonitoring.poczta-polska.pl/?numer={numer}
```

## Automaty paczkowe

Modul umozliwia wyszukiwanie automatow paczkowych i placowek Poczty Polskiej po miescie.

## Wymagania techniczne

Modul wymaga rozszerzenia PHP SOAP (`ext-soap`). Sprawdz czy jest aktywne:

```php
phpinfo(); // Szukaj sekcji "soap"
```

Wiekszosci hostingow PHP ma SOAP domyslnie wlaczony.
