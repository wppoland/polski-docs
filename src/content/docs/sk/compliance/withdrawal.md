---
title: Právo na odstúpenie od zmluvy (Čl. 11a smernice 2023/2673)
description: 'Plná implementácia práva na odstúpenie od zmluvy v Polski for WooCommerce - formulár pre zákazníkov a hostí, čiastočné vrátenia, vylúčenia, Annex I(A)/(B), súhlas Čl. 16(m), abilities API a hooky.'
---

Od **19. júna 2026** musí každý internetový obchod v EÚ predávajúci spotrebiteľom sprístupniť funkčnú možnosť odstúpenia od zmluvy priamo v obchode - vyžaduje to Čl. 11a smernice 2011/83/EÚ zmenenej smernicou 2023/2673. Modul odstúpení v Polski for WooCommerce poskytuje túto funkcionalitu plus doplnky uľahčujúce každodennú obsluhu.

:::caution
Modul realizuje technickú stránku požiadavky. Obsah obchodných podmienok, zásady vrátenia a komunikácia so zákazníkom zostávajú vašou zodpovednosťou. Toto nie je právne poradenstvo.
:::

## Čo funguje hneď po inštalácii

Po zapnutí modulu máte:

- Tri nové stavy objednávok: `wc-withdrawal-requested`, `wc-withdrawal-partial`, `wc-withdrawal-completed`
- Migráciu databázy `polski_withdrawals` + `polski_withdrawal_items` (Migration 2.2.0)
- Admin tabuľku `Polski > Withdrawals` so zoznamom a filtrom stavu
- Stránku nastavení `Polski > Withdrawal settings`
- Tri dynamické bloky Gutenberg + tri shortcode (lookup, info, form template)
- 16 abilities vo WP 6.9+ Abilities API
- Predvolenú lehotu 14 dní s konfigurovateľným stavom spúšťajúcim beh

## Tri cesty spotrebiteľa

### 1. Prihlásený zákazník - dvojkrokový formulár v Mojom účte

V `Môj účet › Objednávky` sa pri každej objednávke kvalifikujúcej sa na vrátenie zobrazuje akcia **Withdraw from contract** (text konfigurovateľný). Po kliknutí zákazník vidí dvojkrokový formulár:

- **Krok 1: výber položiek.** Tabuľka s každým riadkom objednávky (varianty produktov ako samostatné položky, s atribútmi), stĺpec "Zostáva" zobrazuje, koľko sa ešte dá odstúpiť, stĺpec "Počet kusov na vrátenie" je spinner s `min=0`, `max=remaining_qty`. Pre-fill = úplné zostávajúce množstvo.
- **Krok 2: dôvod a potvrdenie.** Textarea (voliteľná) + submit "Podajte vyhlásenie a odošlite potvrdenie na e-mail".

Funkcionality:

- **Čiastočné odstúpenia** - od jedného kusu, od niekoľkých riadkov, alebo viacero samostatných vyhlásení pre jednu objednávku
- **Pro-rata totals** - `line_total` a `line_tax` sa škálujú proporcionálne k vybranému množstvu
- **Live counter** (JS) - pod tabuľkou správa "Vybraných spolu X kusov" v `role="status" aria-live="polite"`
- **Quick actions** - tlačidlá "Vybrať všetky položky" / "Vymazať výber"
- **Zrušiť a vrátiť sa** - odkaz späť na zoznam objednávok bez odoslania

### 2. Hosť - autorizácia cez e-mail + magic-link

Na stránke so shortcode `[polski_withdrawal_lookup]` hosť zadá číslo objednávky a e-mailovú adresu použitú pri nákupe. Systém:

1. Skontroluje, či `billing_email` objednávky zodpovedá zadanému (case-insensitive)
2. Skontroluje rate-limit (5 pokusov / 15 min na email+IP)
3. Vygeneruje 32-bajtový token, uloží hash v transient s TTL 30 min
4. Odošle magic-link na e-mail (Polish subject + body)
5. Vždy vráti to isté "masked" notice (zabraňuje enumerácii)

Po kliknutí na odkaz ten istý shortcode vykreslí formulár odstúpenia s **úplným zhrnutím objednávky** (tabuľka položiek, množstvá, hodnoty, dátum, total) + voliteľný dôvod + submit.

### 3. Admin - manuálna registrácia vyhlásení off-line

V `Polski > Register withdrawal` operátor zapíše odstúpenie prijaté telefonicky, e-mailom, listom, v obchode. Polia: číslo objednávky, kanál, dôvod. Po uložení má záznam `channel` a `registered_by_user_id`, stav objednávky sa zmení na `wc-withdrawal-requested`.

## Vylúčenia produktov (Čl. 38 zákona o právach spotrebiteľa)

### Na produkt

Na obrazovke úpravy produktu meta pole `_polski_withdrawal_exempt = 'yes'` plus dropdown s hotovými dôvodmi z `Polski\Enum\WithdrawalExemptionReason`:

- `art38_3` - Produkt na individuálnu objednávku / personalizovaný
- `art38_4` - Rýchlo podliehajúci skaze / krátka doba trvanlivosti
- `art38_5` - Zapečatený z dôvodu ochrany zdravia / hygienický
- `art38_6` - Neoddeliteľne spojený s inými vecami
- `art38_7` - Alkoholické nápoje (cena dohodnutá, dodanie neskôr)
- `art38_9` - Audio/video nahrávky / softvér v zapečatenom obale
- `art38_13` - Digitálny obsah plnený pred uplynutím lehoty
- `custom` - Iné (vlastné odôvodnenie)

### Na kategóriu

Na obrazovke úpravy kategórie produktu (`product_cat`) ten istý mechanizmus na term meta `polski_withdrawal_exempt`. Jeden checkbox pre celý sortiment namiesto stoviek produktov.

### Logika priority

Meta produktu vyhráva, fallback na kategóriu. Variant produktu dedí kategórie podľa `parent_id`. Filter `polski/withdrawal/eligible` vráti `false`, ak sú všetky položky exempt.

## Čl. 16(m) - súhlas pre digitálne produkty

Tri režimy (`digital_consent_mode`):

| Režim | Čo sa deje |
|---|---|
| `required` | Checkout sa zablokuje, kým spotrebiteľ nezaškrtne. Každá 100% digitálna objednávka → vylúčená z práva na odstúpenie. |
| `optional` | Checkbox viditeľný, nie povinný. Iba objednávky so zaškrtnutým súhlasom → vylúčené. |
| `hidden` | Žiadny checkbox. Digitálne objednávky si zachovávajú právo na odstúpenie. |

Verzia Pro navyše overuje počet stiahnutí - ak spotrebiteľ nestiahol žiadny súbor, právo na odstúpenie sa obnoví aj po súhlase.

## Konfigurovateľná lehota a spúšťacie stavy

- `period_days` - predvolene 14
- `trigger_statuses` - multi-select stavov WooCommerce (default: `completed`)
- Keď objednávka vstúpi do trigger stavu, `_polski_withdrawal_clock_start` sa uloží cez `$order->update_meta_data()` (HPOS-safe)
- `isEligible()` počíta deadline = `clock_start + period_days`

## Annex I(A) a I(B)

Generátor napájaný údajmi z možnosti `polski_general` (company_name, address, NIP, email, phone) s fallbackom na `woocommerce_store_*`.

| Shortcode | Blok | Čo vykresľuje |
|---|---|---|
| `[polski_withdrawal_info]` | `polski/withdrawal-info` | Annex I(A) - úplná informácia o práve na odstúpenie |
| `[polski_withdrawal_form_template]` | `polski/withdrawal-form` | Annex I(B) - vzor formulára (na tlač) |
| `[polski_withdrawal_lookup]` | `polski/withdrawal-lookup` | Formulár pre hostí |

Pro pridáva preklady Annex I(B) v 8 jazykoch (PL, DE, AT, FR, NL, IT, ES, generic EU) s národnými právnymi odkazmi (BGB §355 DE, KSchG §11 AT, čl. L221-18 FR, atď.).

## Potvrdzujúci e-mail ako trvalý nosič

E-mail obsahuje:

- Číslo deklarácie `POL-WD-NNNNNN`
- Dátum a čas podania (UTC + lokálny)
- Číslo a dátum objednávky
- Tabuľku položiek s atribútmi variantov a hodnotami
- Hodnotu objednávky
- Adresu na odoslanie vrátenia
- Poznámku o trvalom nosiči

Verzie HTML a plain text. Pro pridáva PDF deklarácie A4 ako prílohu.

## Vývojárske hooky

```php
do_action('polski/withdrawal/requested', WithdrawalRequest $request);
do_action('polski/withdrawal/guest_requested', int $id, WC_Order $order, string $email);
do_action('polski/withdrawal/manual_registered', int $id, WC_Order $order, string $channel);
do_action('polski/withdrawal/confirmed', WithdrawalRequest $request);
do_action('polski/withdrawal/completed', WithdrawalRequest $request);
do_action('polski/withdrawal/rejected', WithdrawalRequest $request);

apply_filters('polski/withdrawal/eligible', bool $eligible, WC_Order $order);
apply_filters('polski/withdrawal/period_days', int $days);
apply_filters('polski/withdrawal/trigger_statuses', array $statuses);
apply_filters('polski/withdrawal/order_status_on_request', string $slug, WC_Order, WithdrawalRequest);
apply_filters('polski/withdrawal/order_status_on_complete', string $slug, WC_Order, WithdrawalRequest);
apply_filters('polski/annex/info_html', string $html, array $merchant_data, int $days);
apply_filters('polski/annex/form_html', string $html, array $merchant_data, string $lookup_url);
apply_filters('polski/annex/merchant_data', array $data);
apply_filters('polski/annex/locale', string $locale);
apply_filters('polski/digital_consent/label', string $label);
```

## Abilities API (WP 6.9+)

16 abilities v 4 kategóriách: `polski/withdrawal`, `polski/legal`, `polski/compliance`, `polski/shop`. Volanie cez `/wp-json/wp-abilities/v1/abilities/<id>/execute` alebo `@wordpress/abilities` JS package. Úplný zoznam s input/output schémou v `docs/withdrawal/abilities.md` v repozitári doplnku.

## Ukladanie

Vlastné tabuľky (nie postmeta):

- `polski_withdrawals` - jeden záznam na vyhlásenie (id, order_id, customer_id, status, channel, guest_email, refund_id, refund_amount, clock_started_at, requested/confirmed/completed/rejected_at, language_code)
- `polski_withdrawal_items` - normalizované riadky (id, withdrawal_id, order_item_id, product_id, variation_id, quantity, line_subtotal/total/tax, sku, name, attributes_json)

Pro pridáva `polski_pro_withdrawal_audit` (Migration 2.5.0) s actor/IP/UA + payload snapshot.

## Prístupnosť

Plný súlad s WCAG 2.2 Level AA: `:focus-visible` ring, 44×44 touch targets, `lang="pl"` na každej sekcii, `aria-required` + `aria-invalid` + `aria-describedby` + `aria-busy`, sticky form values, role=alert na error notice s autofocusom, live region s počtom vybraných kusov, scroll-margin pod sticky header, viditeľný FAQ accordion + JSON-LD FAQPage, kontakt fallback.
