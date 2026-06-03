---
title: B2B polia v pokladni
description: Voliteľný prepínač "Nakupujem ako firma" a polia NIP, REGON a IBAN v pokladni WooCommerce. Validácia NIP podľa algoritmu kontrolného súčtu, uloženie do štandardných meta objednávky používaných systémom KSeF a modulom faktúr.
---

Polski 1.13.0 pridáva voliteľnú sadu B2B polí do pokladne WooCommerce: prepínač "Nakupujem ako firma" a polia NIP, REGON a IBAN. Polia sa zobrazujú v klasickej pokladni WooCommerce (filter `woocommerce_billing_fields`), ukladajú sa do štandardných meta objednávky a načítava ich modul KSeF aj fakturácia v PRO bez ďalšej konfigurácie.

## Prepínač "Nakupujem ako firma"

Zaškrtávacie pole `polski_buying_as_company` na začiatku sekcie billing. Predvolene neoznačené - polia NIP, REGON a IBAN sú skryté, kým ho neoznačíte. Stav sa ukladá do meta objednávky `_polski_buying_as_company` (`yes` / `no`).

Logika skrývania je realizovaná inline JavaScriptom - nevyžaduje proces zostavovania ani ďalšie frontendové závislosti. Skript obsluhuje aj udalosť `updated_checkout` z jQuery, takže funguje aj po asynchrónnom znovunačítaní fragmentu pokladne.

## NIP

Pole `billing_nip` s validáciou podľa algoritmu kontrolného súčtu poľského NIP (10 číslic, váhy 6, 5, 7, 2, 3, 4, 5, 6, 7, modulo 11). Povolené vstupné formáty: `1234567890`, `123-456-78-90`, `123 456 78 90`, a s prefixom `PL1234567890` (prefix sa odstráni pred validáciou). Hodnota sa ukladá v normalizovanej podobe (10 číslic) do meta `_billing_nip`.

Validácia v PHP používa novú, statickú triedu `Polski\Util\NipValidator`:

```php
use Polski\Util\NipValidator;

NipValidator::isValid('5260250274');           // true
NipValidator::isValid('PL 526-025-02-74');     // true
NipValidator::normalize('PL 526-025-02-74');   // '5260250274'
NipValidator::format('5260250274');            // '526-025-02-74'
```

Ak je aktívny modul `Polski\Pro\Validation\NipValidator` z polski-pro, FREE vynechá vlastnú registráciu poľa NIP, aby nezdvojoval pole v pokladni. REGON a IBAN sú vždy pridávané verziou FREE.

## REGON

Voliteľné pole `billing_regon` (predvolene vypnuté). Akceptuje 9 alebo 14 číslic (krátky REGON / dlhý REGON). Validácia regex: `/^\d{9}$|^\d{14}$/`. Ukladá sa do meta objednávky `_billing_regon`.

## IBAN

Voliteľné pole `billing_iban` (predvolene vypnuté). Štruktúrna validácia: 2 písmená prefixu krajiny + 2 kontrolné číslice + 11-30 alfanumerických znakov, celková dĺžka 15-34. Striktné mod-97 je zámerne ponechané integrátorom (napr. doplnku platobnej brány). Ukladá sa do meta `_billing_iban`.

## Nastavenia (`polski_b2b`)

| Kľúč | Predvolená hodnota | Popis |
|---|---|---|
| `enabled` | `true` | Hlavný prepínač modulu |
| `show_company_toggle` | `true` | Či zobraziť zaškrtávacie pole "Nakupujem ako firma" |
| `nip` | `true` | Či pridať pole NIP (vynecháva sa, keď je aktívny polski-pro NipValidator) |
| `regon` | `false` | Či pridať pole REGON |
| `iban` | `false` | Či pridať pole IBAN |

Zapnutie REGON a IBAN cez `update_option`:

```php
update_option('polski_b2b', array_merge(
    (array) get_option('polski_b2b', []),
    ['regon' => true, 'iban' => true]
));
```

## Integrácia s ďalšími modulmi

- **Modul KSeF (FREE)** načítava `_billing_nip` z objednávky a automaticky rozpoznáva objednávky vyžadujúce elektronickú faktúru.
- **Modul Faktúry (PRO)** načítava `_billing_nip` ako `nipBuyer` pri generovaní faktúry DPH a opravnej faktúry.
- **AI Feed pre faktúry (PRO)** sprístupňuje faktúry ako Markdown spolu s poliami NIP v sekcii "Parties".

## Zobrazenie v admin paneli

Polia NIP / REGON / IBAN sú pridávané do bloku "Billing details" v zobrazení objednávky v paneli (`woocommerce_admin_billing_fields`). Upravujete ich na tom istom mieste ako fakturačnú adresu zákazníka.

## Kompatibilita s Block checkout

Od verzie Polski 1.14.0 sú polia NIP / REGON / IBAN registrované cez API WooCommerce `woocommerce_register_additional_checkout_field` (WC 8.6+). Jedna registrácia pokrýva tak **klasickú pokladňu**, ako aj **Block checkout (Cart & Checkout Blocks)**. Validácia funguje na oboch stranách.

Hodnoty ukladané týmto API smerujú predvolene pod kľúče meta `_wc_billing/polski/nip`, `_wc_billing/polski/regon`, `_wc_billing/polski/iban`. Polski ich automaticky kopíruje do **starších** kľúčov `_billing_nip`, `_billing_regon`, `_billing_iban` (akcia `woocommerce_set_additional_field_value`), vďaka čomu moduly KSeF a Faktúry v PRO načítavajú údaje bez akýchkoľvek zmien.

Obchody na WooCommerce staršom než 8.6 naďalej využívajú klasickú cestu registrácie polí (`woocommerce_billing_fields`) s prepínačom "Nakupujem ako firma" a inline JavaScriptom.
