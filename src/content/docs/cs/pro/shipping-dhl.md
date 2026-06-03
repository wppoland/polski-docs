---
title: Integrace DHL Parcel Poland
description: Modul integrace DHL Parcel Poland v Polski PRO for WooCommerce - generování etiket, sledování zásilek a vyhledávání ServicePoint.
---

Modul DHL integruje WooCommerce s REST API DHL Parcel Poland. Generujte etikety, sledujte zásilky a nabízejte výdejní místa ServicePoint na pokladně.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Navíc je vyžadován API klíč DHL a číslo účtu DHL.
:::

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski PRO > Doprava**.

### Autentizace API

| Nastavení | Popis |
|------------|------|
| API klíč DHL | Bearer token z DHL Developer Portal |
| Číslo účtu DHL | Číslo zákaznického účtu DHL Parcel Poland |

API klíč získáte registrací na [developer.dhl.com](https://developer.dhl.com) a vytvořením aplikace s přístupem k DHL Parcel Poland API.

### Zapnutí modulu

1. Přejděte do **Polski PRO > Moduly**
2. Zapněte modul **DHL Parcel Poland**
3. Vyplňte API klíč a číslo účtu v nastavení dopravy

## Generování etiket

Etikety generujete z úrovně editoru objednávky:

1. Otevřete objednávku v **WooCommerce > Objednávky**
2. V sekci **Shipment Tracking** vyberte přepravce **DHL**
3. Klikněte na **Generovat etiketu**
4. Systém vytvoří zásilku přes DHL REST API a vrátí číslo sledování + odkaz na PDF etiketu

### Typy služeb

| Typ | Popis |
|-----|------|
| AH | Standardní doručení na adresu (výchozí) |
| AP | Doručení do ServicePoint / paczkomatu DHL |

Pro služby AP (ServicePoint) je vyžadováno zadání ID výdejního místa.

### Data zásilky

Modul automaticky načítá z objednávky údaje příjemce a hmotnost produktů. Výchozí rozměry balíku: 40x30x20 cm.

## DHL ServicePoint

Modul umožňuje vyhledávání výdejních míst ServicePoint (POP a paczkomaty DHL):

- Vyhledávání podle města
- Vyhledávání podle GPS souřadnic (poloměr 5 km)
- Vrácená data: název, adresa, typ (POP/paczkomat), souřadnice

## Sledování zásilek

Po vygenerování etikety se číslo sledování automaticky uloží. Odkaz na tracking DHL se generuje ve formátu:

```
https://www.dhl.com/pl-pl/home/sledzenie-przesylek.html?tracking-id={numer}
```

Zákazník obdrží e-mail s číslem sledování při změně stavu na **Odesláno**.

## Kódy chyb

| Kód | Popis | Řešení |
|-----|------|-------------|
| HTTP 401 | Nesprávný API klíč | Zkontrolujte Bearer token v nastavení |
| HTTP 400 | Nesprávná data zásilky | Zkontrolujte adresu, PSČ a číslo účtu |
| HTTP 429 | Limit požadavků API | Počkejte chvíli a zkuste znovu |

## Filtry a akce

```php
// Filtruj data zásilky před odesláním do DHL
add_filter('polski_pro/shipping/dhl/parcel_data', function (array $data, WC_Order $order): array {
    $data['service_type'] = 'AP'; // Vynutí doručení do ServicePoint
    $data['servicepoint_id'] = 'PL-12345';
    return $data;
}, 10, 2);
```
