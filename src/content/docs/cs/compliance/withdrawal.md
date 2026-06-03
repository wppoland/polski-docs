---
title: 'Právo na odstoupení od smlouvy (čl. 11a směrnice 2023/2673)'
description: 'Úplná implementace práva na odstoupení od smlouvy v Polski for WooCommerce - formulář pro zákazníky i hosty, částečná vrácení, výjimky, Annex I(A)/(B), souhlas dle čl. 16(m), abilities API a hooky.'
---

Od **19. června 2026** musí každý internetový obchod v EU prodávající spotřebitelům zpřístupnit funkční možnost odstoupení od smlouvy přímo v obchodě, vyžaduje to čl. 11a směrnice 2011/83/EU ve znění směrnice 2023/2673. Modul odstoupení v Polski for WooCommerce poskytuje tuto funkcionalitu plus doplňky usnadňující každodenní obsluhu.

:::caution
Modul realizuje technickou stránku požadavku. Obsah obchodních podmínek, zásady vrácení a komunikace se zákazníkem zůstávají vaší odpovědností. Toto není právní poradenství.
:::

## Co funguje hned po instalaci

Po zapnutí modulu máte:

- Tři nové stavy objednávek: `wc-withdrawal-requested`, `wc-withdrawal-partial`, `wc-withdrawal-completed`
- Migraci databáze `polski_withdrawals` + `polski_withdrawal_items` (Migration 2.2.0)
- Administrační tabulku `Polski > Withdrawals` se seznamem a filtrem stavu
- Stránku nastavení `Polski > Withdrawal settings`
- Tři dynamické bloky Gutenberg + tři shortcode (lookup, info, form template)
- 16 abilities ve WP 6.9+ Abilities API
- Výchozí lhůtu 14 dnů s konfigurovatelným stavem spouštějícím její běh

## Tři cesty spotřebitele

### 1. Přihlášený zákazník - dvoukrokový formulář v Mém účtu

V `Můj účet › Objednávky` se u každé objednávky kvalifikující se k vrácení objeví akce **Withdraw from contract** (text konfigurovatelný). Po kliknutí zákazník vidí dvoukrokový formulář:

- **Krok 1: výběr položek.** Tabulka s každou položkou objednávky (varianty produktů jako samostatné položky, s atributy), sloupec „Zbývá" ukazuje, kolik lze ještě odstoupit, sloupec „Počet kusů k vrácení" je spinner s `min=0`, `max=remaining_qty`. Předvyplnění = plné zbývající množství.
- **Krok 2: důvod a potvrzení.** Textové pole (volitelné) + odeslat „Podat prohlášení a zaslat potvrzení na e-mail".

Funkcionality:

- **Částečná odstoupení** - od jednoho kusu, z několika položek, nebo více samostatných prohlášení pro jednu objednávku
- **Pro-rata totals** - `line_total` a `line_tax` se škálují úměrně k vybranému množství
- **Live counter** (JS) - pod tabulkou zpráva „Vybráno celkem X kusů" v `role="status" aria-live="polite"`
- **Quick actions** - tlačítka „Vybrat všechny položky" / „Vymazat výběr"
- **Zrušit a vrátit se** - zpětný odkaz na seznam objednávek bez odeslání

### 2. Host - autorizace přes e-mail + magic-link

Na stránce se shortcode `[polski_withdrawal_lookup]` host zadá číslo objednávky a e-mailovou adresu použitou při nákupu. Systém:

1. Zkontroluje, zda `billing_email` objednávky odpovídá zadanému (case-insensitive)
2. Zkontroluje rate-limit (5 pokusů / 15 min na email+IP)
3. Vygeneruje 32bajtový token, uloží hash do transient s TTL 30 min
4. Odešle magic-link na e-mail (polský subject + body)
5. Vždy vrátí stejné „maskované" oznámení (zabraňuje enumeraci)

Po kliknutí na odkaz tentýž shortcode vykreslí formulář odstoupení s **úplným shrnutím objednávky** (tabulka položek, množství, hodnoty, datum, total) + volitelný důvod + odeslání.

### 3. Admin - ruční registrace prohlášení off-line

V `Polski > Register withdrawal` operátor zaznamená odstoupení přijaté telefonicky, mailem, dopisem, v obchodě. Pole: číslo objednávky, kanál, důvod. Po uložení má záznam `channel` a `registered_by_user_id`, stav objednávky se změní na `wc-withdrawal-requested`.

## Výjimky produktů (čl. 38 zákona o právech spotřebitele)

### Per produkt

Na obrazovce editace produktu meta pole `_polski_withdrawal_exempt = 'yes'` plus dropdown s připravenými důvody z `Polski\Enum\WithdrawalExemptionReason`:

- `art38_3` - Produkt na individuální objednávku / personalizovaný
- `art38_4` - Rychle se kazící / krátká doba trvanlivosti
- `art38_5` - Zapečetěný z důvodu ochrany zdraví / hygienický
- `art38_6` - Neoddělitelně spojený s jinými věcmi
- `art38_7` - Alkoholické nápoje (cena dohodnutá, dodání později)
- `art38_9` - Audio/video nahrávky / software v zapečetěném obalu
- `art38_13` - Digitální obsah plněný před uplynutím lhůty
- `custom` - Jiné (vlastní odůvodnění)

### Per kategorie

Na obrazovce editace kategorie produktu (`product_cat`) tentýž mechanismus na term meta `polski_withdrawal_exempt`. Jeden checkbox pro celý sortiment namísto stovek produktů.

### Logika priority

Meta produktu vyhrává, fallback je kategorie. Varianta produktu dědí kategorie podle `parent_id`. Filtr `polski/withdrawal/eligible` vrací `false`, pokud jsou všechny položky exempt.

## Čl. 16(m) - souhlas pro digitální produkty

Tři režimy (`digital_consent_mode`):

| Režim | Co se děje |
|---|---|
| `required` | Pokladna se blokuje, dokud spotřebitel nezaškrtne. Každá 100% digitální objednávka → vyloučena z práva na odstoupení. |
| `optional` | Checkbox viditelný, nepovinný. Pouze objednávky se zaškrtnutým souhlasem → vyloučeny. |
| `hidden` | Žádný checkbox. Digitální objednávky si zachovávají právo na odstoupení. |

Pro verze navíc ověřuje počet stažení - pokud spotřebitel nestáhl žádný soubor, právo na odstoupení se obnoví i po souhlasu.

## Konfigurovatelná lhůta a spouštěcí stavy

- `period_days` - výchozí 14
- `trigger_statuses` - multi-select stavů WooCommerce (default: `completed`)
- Když objednávka vstoupí do trigger stavu, `_polski_withdrawal_clock_start` se uloží přes `$order->update_meta_data()` (HPOS-safe)
- `isEligible()` počítá deadline = `clock_start + period_days`

## Annex I(A) a I(B)

Generátor napájený daty z možnosti `polski_general` (company_name, address, NIP, email, phone) s fallbackem na `woocommerce_store_*`.

| Shortcode | Blok | Co vykresluje |
|---|---|---|
| `[polski_withdrawal_info]` | `polski/withdrawal-info` | Annex I(A) - úplná informace o právu na odstoupení |
| `[polski_withdrawal_form_template]` | `polski/withdrawal-form` | Annex I(B) - vzor formuláře (k tisku) |
| `[polski_withdrawal_lookup]` | `polski/withdrawal-lookup` | Formulář pro hosty |

Pro přidává překlady Annex I(B) v 8 jazycích (PL, DE, AT, FR, NL, IT, ES, generic EU) s národními právními odkazy (BGB §355 DE, KSchG §11 AT, čl. L221-18 FR, atd.).

## Potvrzovací e-mail jako trvalý nosič

E-mail obsahuje:

- Číslo deklarace `POL-WD-NNNNNN`
- Datum a čas podání (UTC + místní)
- Číslo a datum objednávky
- Tabulku položek s atributy variant a hodnotami
- Hodnotu objednávky
- Adresu pro zaslání vrácení
- Poznámku o trvalém nosiči

Verze HTML a plain text. Pro přidává PDF deklarace A4 jako přílohu.

## Vývojářské hooky

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

16 abilities ve 4 kategoriích: `polski/withdrawal`, `polski/legal`, `polski/compliance`, `polski/shop`. Volání přes `/wp-json/wp-abilities/v1/abilities/<id>/execute` nebo JS balíček `@wordpress/abilities`. Úplný seznam s input/output schema v `docs/withdrawal/abilities.md` v repozitáři pluginu.

## Ukládání

Vlastní tabulky (ne postmeta):

- `polski_withdrawals` - jeden záznam na prohlášení (id, order_id, customer_id, status, channel, guest_email, refund_id, refund_amount, clock_started_at, requested/confirmed/completed/rejected_at, language_code)
- `polski_withdrawal_items` - normalizované položky (id, withdrawal_id, order_item_id, product_id, variation_id, quantity, line_subtotal/total/tax, sku, name, attributes_json)

Pro přidává `polski_pro_withdrawal_audit` (Migration 2.5.0) s actor/IP/UA + payload snapshot.

## Přístupnost

Plný soulad s WCAG 2.2 Level AA: `:focus-visible` ring, 44×44 touch targets, `lang="pl"` na každé sekci, `aria-required` + `aria-invalid` + `aria-describedby` + `aria-busy`, sticky form values, role=alert na error notice s autofocusem, live region s počtem vybraných kusů, scroll-margin pod sticky header, viditelný FAQ accordion + JSON-LD FAQPage, kontaktní fallback.
