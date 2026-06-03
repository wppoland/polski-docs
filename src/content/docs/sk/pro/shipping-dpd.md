---
title: Integrácia DPD Polska
description: Modul integrácie DPD Polska v Polski PRO for WooCommerce - generovanie štítkov, sledovanie zásielok a odberné miesta DPD Pickup.
---

Modul DPD integruje WooCommerce s API DPD Polska. Generujte prepravné štítky, sledujte zásielky a umožnite zákazníkom vybrať si odberné miesto DPD Pickup.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Navyše je potrebné aktívne prihlasovacie meno a heslo k DPD Web Service API.
:::

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Doprava**.

### Overenie API

| Nastavenie | Popis |
|------------|------|
| Prihlasovacie meno DPD | Prihlasovacie meno do DPD Web Service API |
| Heslo DPD | Heslo do DPD Web Service API |
| Master FID | Číslo FID odosielateľa (identifikátor zákazníka DPD) |

Prístupové údaje získate z klientskeho panela DPD alebo od svojho obchodného zástupcu.

### Zapnutie modulu

1. Prejdite do **Polski PRO > Moduly**
2. Zapnite modul **DPD Polska**
3. Doplňte údaje API v nastaveniach dopravy

## Generovanie štítkov

Štítky generujete priamo v editore objednávky:

1. Otvorte objednávku v **WooCommerce > Objednávky**
2. V sekcii **Shipment Tracking** vyberte prepravcu **DPD**
3. Kliknite na **Generovať štítok**
4. Systém vytvorí zásielku cez DPD SOAP API a vráti číslo prepravného listu

Štítok sa automaticky priradí k objednávke. Číslo sledovania a odkaz na tracking sa zobrazujú v paneli objednávky a v e-maile pre zákazníka.

### Údaje zásielky

Modul automaticky preberá z objednávky:

- Meno a priezvisko / názov firmy príjemcu
- Adresu doručenia (ulica, mesto, PSČ)
- Telefón a e-mail
- Hmotnosť (z údajov produktov alebo predvolenú)

### Hromadné generovanie

Označte viacero objednávok v zozname a použite hromadnú akciu **Generovať štítky DPD** na spracovanie viacerých objednávok naraz.

## Odberné miesta DPD Pickup

Modul umožňuje vyhľadávanie odberných miest DPD Pickup v blízkosti zákazníka:

- Vyhľadávanie podľa mesta
- Vyhľadávanie podľa GPS súradníc (polomer 5 km)
- Vrátené údaje: názov, adresa, PSČ, súradnice

## Sledovanie zásielok

Po vygenerovaní štítku sa číslo sledovania automaticky uloží do objednávky. Odkaz na tracking DPD sa generuje automaticky.

Zákazník dostane e-mail s číslom sledovania a odkazom pri zmene stavu objednávky na **Odoslané**.

## Kódy chýb

| Kód | Popis | Riešenie |
|-----|------|-------------|
| HTTP 401 | Chybné prihlasovacie údaje | Skontrolujte prihlasovacie meno a heslo v nastaveniach |
| HTTP 500 | Chyba servera DPD | Skúste znova o niekoľko minút |
| Validation error | Nesprávne adresné údaje | Skontrolujte formát PSČ (XX-XXX) |

## Filtre a akcie

```php
// Filtruj údaje zásielky pred odoslaním do DPD
add_filter('polski_pro/shipping/dpd/parcel_data', function (array $data, WC_Order $order): array {
    $data['weight'] = 2.5; // Nastav pevnú hmotnosť
    return $data;
}, 10, 2);
```
