---
title: Integrácia Poczta Polska (eNadawca)
description: Modul integrácie Poczta Polska eNadawca v Polski PRO for WooCommerce - generovanie štítkov, sledovanie zásielok a balíkomaty.
---

Modul Poczta Polska integruje WooCommerce s API eNadawca. Generujte prepravné štítky, sledujte zásielky a vyhľadávajte balíkomaty.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+ s rozšírením SOAP. Navyše je potrebné prihlasovacie meno a heslo k eNadawca.
:::

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Doprava**.

### Overenie

| Nastavenie | Popis |
|------------|------|
| Prihlasovacie meno eNadawca | Prihlasovacie meno do systému eNadawca |
| Heslo eNadawca | Heslo do systému eNadawca |
| Prostredie | Production alebo Sandbox (testovacie) |

Prístupové údaje získate registráciou v systéme eNadawca na stránke poczta-polska.pl.

## Dostupné služby

| Typ služby | Popis |
|------------|------|
| POCZTEX_KURIER_48 | Kuriér Pocztex - doručenie do 48h (predvolený) |
| PACZKA_POCZTOWA_GABARYT_A | Poštový balík gabarit A |

## Generovanie štítkov

1. Otvorte objednávku v **WooCommerce > Objednávky**
2. V sekcii **Shipment Tracking** vyberte prepravcu **Poczta Polska**
3. Kliknite na **Generovať štítok**
4. Systém vytvorí zásielku cez eNadawca SOAP API

Údaje príjemcu (meno, adresa, mesto, PSČ, telefón, e-mail) sa preberajú automaticky z objednávky.

## Sledovanie zásielok

Po vygenerovaní štítku sa číslo sledovania uloží do objednávky. Odkaz na tracking:

```
https://emonitoring.poczta-polska.pl/?numer={numer}
```

## Balíkomaty

Modul umožňuje vyhľadávanie balíkomatov a pobočiek Poczty Polskej podľa mesta.

## Technické požiadavky

Modul vyžaduje rozšírenie PHP SOAP (`ext-soap`). Skontrolujte, či je aktívne:

```php
phpinfo(); // Hľadaj sekciu "soap"
```

Väčšina hostingov PHP má SOAP predvolene zapnutý.
