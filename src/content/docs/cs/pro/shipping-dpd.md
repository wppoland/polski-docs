---
title: Integrace DPD Polska
description: Modul integrace DPD Polska v Polski PRO for WooCommerce - generovani stitku, sledovani zasilek a vydejni mista DPD Pickup.
---

Modul DPD propojuje WooCommerce s API DPD Polska. Generujte prepravni stitky, sledujte zasilky a umoznete zakaznikum vybrat vydejni misto DPD Pickup.

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Navic je vyzadovan aktivni login a heslo k DPD Web Service API.
:::

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski PRO > Doprava**.

### Overeni API

| Nastaveni | Popis |
|------------|------|
| Login DPD | Login k DPD Web Service API |
| Heslo DPD | Heslo k DPD Web Service API |
| Master FID | Cislo FID odesilatele (identifikator zakaznika DPD) |

Pristupove udaje ziskate z klientskeho panelu DPD nebo od sveho obchodniho zastupce.

### Zapnuti modulu

1. Prejdete do **Polski PRO > Moduly**
2. Zapnete modul **DPD Polska**
3. Vyplnte udaje API v nastaveni dopravy

## Generovani stitku

Stitky generujete primo z editoru objednavky:

1. Otevrete objednavku v **WooCommerce > Objednavky**
2. V sekci **Shipment Tracking** vyberte dopravce **DPD**
3. Kliknete na **Generovat stitek**
4. System vytvori zasilku pres DPD SOAP API a vrati cislo prepravniho listu

Stitek je automaticky priraz k objednavce. Sledovaci cislo a odkaz na sledovani se zobrazuji v panelu objednavky a v e-mailu zakaznikovi.

### Udaje zasilky

Modul automaticky nacita z objednavky:

- Jmeno a prijmeni / nazev firmy prijemce
- Dorucovaci adresu (ulice, mesto, PSC)
- Telefon a e-mail
- Hmotnost (z udaju produktu nebo vychozi)

### Hromadne generovani

Oznacte vice objednavek v seznamu a pouzijte hromadnou akci **Generovat stitky DPD** pro zpracovani nekolika objednavek najednou.

## Vydejni mista DPD Pickup

Modul umoznuje vyhledavat vydejni mista DPD Pickup v blizkosti zakaznika:

- Vyhledavani podle mesta
- Vyhledavani podle GPS souradnic (polomer 5 km)
- Vracena data: nazev, adresa, PSC, souradnice

## Sledovani zasilek

Po vygenerovani stitku se sledovaci cislo automaticky uklada do objednavky. Odkaz na sledovani DPD je generovan automaticky.

Zakaznik obdrzi e-mail se sledovacim cislem a odkazem pri zmene stavu objednavky na **Odeslano**.

## Chybove kody

| Kod | Popis | Reseni |
|-----|------|-------------|
| HTTP 401 | Chybne prihlasovaci udaje | Zkontrolujte login a heslo v nastaveni |
| HTTP 500 | Chyba serveru DPD | Zkuste to znovu za nekolik minut |
| Validation error | Nespravne adresni udaje | Zkontrolujte format PSC (XX-XXX) |

## Filtry a akce

```php
// Filtruj data zasilky pred odeslanim do DPD
add_filter('polski_pro/shipping/dpd/parcel_data', function (array $data, WC_Order $order): array {
    $data['weight'] = 2.5; // Nastav pevnou hmotnost
    return $data;
}, 10, 2);
```
