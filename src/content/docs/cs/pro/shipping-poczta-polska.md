---
title: Integrace Poczta Polska (eNadawca)
description: Modul integrace Poczta Polska eNadawca v Polski PRO for WooCommerce - generovani stitku, sledovani zasilek a baliciste.
---

Modul Poczta Polska propojuje WooCommerce s API eNadawca. Generujte prepravni stitky, sledujte zasilky a vyhledavejte baliciste.

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+ s rozsirenim SOAP. Navic je vyzadovan login a heslo k eNadawca.
:::

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski PRO > Doprava**.

### Overeni

| Nastaveni | Popis |
|------------|------|
| Login eNadawca | Login do systemu eNadawca |
| Heslo eNadawca | Heslo do systemu eNadawca |
| Prostredi | Production nebo Sandbox (testovaci) |

Pristupove udaje ziskate registraci v systemu eNadawca na strance poczta-polska.pl.

## Dostupne sluzby

| Typ sluzby | Popis |
|------------|------|
| POCZTEX_KURIER_48 | Kuryr Pocztex - doruceni do 48 h (vychozi) |
| PACZKA_POCZTOWA_GABARYT_A | Postovni balik velikost A |

## Generovani stitku

1. Otevrete objednavku v **WooCommerce > Objednavky**
2. V sekci **Shipment Tracking** vyberte dopravce **Poczta Polska**
3. Kliknete na **Generovat stitek**
4. System vytvori zasilku pres eNadawca SOAP API

Udaje prijemce (jmeno, adresa, mesto, PSC, telefon, e-mail) se automaticky nacitaji z objednavky.

## Sledovani zasilek

Po vygenerovani stitku se sledovaci cislo uklada do objednavky. Odkaz na sledovani:

```
https://emonitoring.poczta-polska.pl/?numer={numer}
```

## Baliciste

Modul umoznuje vyhledavat baliciste a pobocky Poczty Polske podle mesta.

## Technicke pozadavky

Modul vyzaduje rozsireni PHP SOAP (`ext-soap`). Zkontrolujte, zda je aktivni:

```php
phpinfo(); // Hledejte sekci "soap"
```

Vetsina PHP hostingu ma SOAP vychozim nastavenim zapnuty.
