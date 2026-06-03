---
title: B2B pole v pokladně
description: Volitelný přepínač "Nakupuji jako firma" a pole NIP, REGON a IBAN ve WooCommerce pokladně. Validace NIP podle kontrolního součtu, ukládání do standardních meta objednávky používaných systémem KSeF a modulem faktur.
---

Polski 1.13.0 přidává volitelnou sadu B2B polí do WooCommerce pokladny: přepínač "Nakupuji jako firma" a pole NIP, REGON a IBAN. Pole se zobrazují v klasické WooCommerce pokladně (filtr `woocommerce_billing_fields`), ukládají se do standardních meta objednávky a načítá je modul KSeF i fakturace v PRO bez další konfigurace.

## Přepínač "Nakupuji jako firma"

Zaškrtávací pole `polski_buying_as_company` na začátku sekce billing. Ve výchozím stavu nezaškrtnuté - pole NIP, REGON a IBAN jsou skryta, dokud se nezaškrtne. Stav se ukládá do meta objednávky `_polski_buying_as_company` (`yes` / `no`).

Logika skrývání je realizována inline JavaScriptem - nevyžaduje build proces ani další frontendové závislosti. Skript obsluhuje také událost `updated_checkout` z jQuery, takže funguje i po asynchronním přenačtení fragmentu pokladny.

## NIP

Pole `billing_nip` s validací podle algoritmu kontrolního součtu polského NIP (10 číslic, váhy 6, 5, 7, 2, 3, 4, 5, 6, 7, modulo 11). Přípustné vstupní formáty: `1234567890`, `123-456-78-90`, `123 456 78 90` a prefixovaný `PL1234567890` (prefix se před validací odstraní). Hodnota se ukládá v normalizované podobě (10 číslic) do meta `_billing_nip`.

Validace v PHP používá novou statickou třídu `Polski\Util\NipValidator`:

```php
use Polski\Util\NipValidator;

NipValidator::isValid('5260250274');           // true
NipValidator::isValid('PL 526-025-02-74');     // true
NipValidator::normalize('PL 526-025-02-74');   // '5260250274'
NipValidator::format('5260250274');            // '526-025-02-74'
```

Pokud je aktivní modul `Polski\Pro\Validation\NipValidator` z polski-pro, FREE vynechá vlastní registraci pole NIP, aby pole v pokladně nedubloval. REGON a IBAN přidává FREE vždy.

## REGON

Volitelné pole `billing_regon` (ve výchozím stavu vypnuté). Akceptuje 9 nebo 14 číslic (krátký REGON / dlouhý REGON). Validace regex: `/^\d{9}$|^\d{14}$/`. Ukládá se do meta objednávky `_billing_regon`.

## IBAN

Volitelné pole `billing_iban` (ve výchozím stavu vypnuté). Strukturální validace: 2 písmena prefixu země + 2 kontrolní číslice + 11-30 alfanumerických znaků, celková délka 15-34. Striktní mod-97 je záměrně ponechán integrátorům (např. zásuvnému modulu platební brány). Ukládá se do meta `_billing_iban`.

## Nastavení (`polski_b2b`)

| Klíč | Výchozí hodnota | Popis |
|---|---|---|
| `enabled` | `true` | Hlavní přepínač modulu |
| `show_company_toggle` | `true` | Zda zobrazit zaškrtávací pole "Nakupuji jako firma" |
| `nip` | `true` | Zda přidat pole NIP (vynecháno, když je aktivní polski-pro NipValidator) |
| `regon` | `false` | Zda přidat pole REGON |
| `iban` | `false` | Zda přidat pole IBAN |

Zapnutí REGON a IBAN přes `update_option`:

```php
update_option('polski_b2b', array_merge(
    (array) get_option('polski_b2b', []),
    ['regon' => true, 'iban' => true]
));
```

## Integrace s ostatními moduly

- **Modul KSeF (FREE)** načítá `_billing_nip` z objednávky a automaticky detekuje objednávky vyžadující elektronickou fakturu.
- **Modul Faktury (PRO)** načítá `_billing_nip` jako `nipBuyer` při generování VAT faktury a opravné faktury.
- **AI Feed pro faktury (PRO)** zpřístupňuje faktury jako Markdown spolu s poli NIP v sekci "Parties".

## Zobrazení v administraci

Pole NIP / REGON / IBAN se přidávají do bloku "Billing details" v zobrazení objednávky v administraci (`woocommerce_admin_billing_fields`). Upravujete je na stejném místě jako fakturační adresu zákazníka.

## Kompatibilita s Block checkout

Od verze Polski 1.14.0 jsou pole NIP / REGON / IBAN registrována přes WooCommerce API `woocommerce_register_additional_checkout_field` (WC 8.6+). Jediná registrace pokrývá jak **klasickou pokladnu**, tak **Block checkout (Cart & Checkout Blocks)**. Validace funguje na obou stranách.

Hodnoty ukládané tímto API se ve výchozím stavu ukládají pod klíče meta `_wc_billing/polski/nip`, `_wc_billing/polski/regon`, `_wc_billing/polski/iban`. Polski je automaticky kopíruje do **starších** klíčů `_billing_nip`, `_billing_regon`, `_billing_iban` (akce `woocommerce_set_additional_field_value`), díky čemuž moduly KSeF a Faktury v PRO načítají data bez jakýchkoli změn.

Obchody na WooCommerce starším než 8.6 nadále využívají klasickou cestu registrace polí (`woocommerce_billing_fields`) s přepínačem "Nakupuji jako firma" a inline JavaScriptem.
