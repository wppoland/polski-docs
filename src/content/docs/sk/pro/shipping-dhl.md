---
title: Integrácia DHL Parcel Poland
description: Modul integrácie DHL Parcel Poland v Polski PRO for WooCommerce - generovanie etikiet, sledovanie zásielok a vyhľadávanie ServicePoint.
---

Modul DHL integruje WooCommerce s REST API DHL Parcel Poland. Generujte etikety, sledujte zásielky a ponúkajte body ServicePoint na pokladni.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Dodatočne je potrebný API kľúč DHL a číslo konta DHL.
:::

## Konfigurácia

Prejdite na **WooCommerce > Nastavenia > Polski PRO > Doprava**.

### Autentifikácia API

| Nastavenie | Popis |
|------------|------|
| API kľúč DHL | Bearer token z DHL Developer Portal |
| Číslo konta DHL | Číslo zákazníckeho konta DHL Parcel Poland |

API kľúč získate registráciou na [developer.dhl.com](https://developer.dhl.com) a vytvorením aplikácie s prístupom k DHL Parcel Poland API.

### Zapnutie modulu

1. Prejdite na **Polski PRO > Moduly**
2. Zapnite modul **DHL Parcel Poland**
3. Doplňte API kľúč a číslo konta v nastaveniach dopravy

## Generovanie etikiet

Etikety generujete z editora objednávky:

1. Otvorte objednávku v **WooCommerce > Objednávky**
2. V sekcii **Shipment Tracking** vyberte prepravcu **DHL**
3. Kliknite na **Generovať etiketu**
4. Systém vytvorí zásielku cez DHL REST API a vráti číslo sledovania + odkaz na PDF etiketu

### Typy služieb

| Typ | Popis |
|-----|------|
| AH | Štandardné doručenie na adresu (predvolené) |
| AP | Doručenie do ServicePoint / DHL paczkomatu |

Pre služby AP (ServicePoint) je potrebné zadať ID odberného miesta.

### Údaje zásielky

Modul automaticky preberá z objednávky údaje príjemcu a hmotnosť produktov. Predvolené rozmery balíka: 40x30x20 cm.

## DHL ServicePoint

Modul umožňuje vyhľadávanie bodov ServicePoint (POP a DHL paczkomaty):

- Vyhľadávanie podľa mesta
- Vyhľadávanie podľa GPS súradníc (polomer 5 km)
- Vrátené údaje: názov, adresa, typ (POP/paczkomat), súradnice

## Sledovanie zásielok

Po vygenerovaní etikety sa číslo sledovania automaticky ukladá. Odkaz na DHL tracking sa generuje vo formáte:

```
https://www.dhl.com/pl-pl/home/sledzenie-przesylek.html?tracking-id={numer}
```

Zákazník dostane e-mail s číslom sledovania pri zmene stavu na **Odoslané**.

## Kódy chýb

| Kód | Popis | Riešenie |
|-----|------|-------------|
| HTTP 401 | Nesprávny API kľúč | Skontrolujte Bearer token v nastaveniach |
| HTTP 400 | Nesprávne údaje zásielky | Skontrolujte adresu, PSČ a číslo konta |
| HTTP 429 | Limit požiadaviek API | Počkajte chvíľu a skúste znova |

## Filtre a akcie

```php
// Filtruj dane przesyłki przed wysłaniem do DHL
add_filter('polski_pro/shipping/dhl/parcel_data', function (array $data, WC_Order $order): array {
    $data['service_type'] = 'AP'; // Wymuś dostawę do ServicePoint
    $data['servicepoint_id'] = 'PL-12345';
    return $data;
}, 10, 2);
```
