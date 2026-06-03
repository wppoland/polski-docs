---
title: Odstoupeni od smlouvy - funkce Pro
description: 'Pro rozsireni modulu odstoupeni Polski for WooCommerce - auto-refund, PDF prohlaseni A4, audit log s CSV, reportovaci dashboard, podpora Subscriptions a Bundles, multi-lang Annex I(B).'
---

Verze Pro rozsiruje bezplatny modul odstoupeni o operatorskou podporu refundu, PDF prohlaseni, audit log, reporty a integrace s predplatnymi / sadami produktu. Predpoklada se, ze mate aktivni bezplatnou verzi Polski for WooCommerce a znate [zakladni modul odstoupeni](/compliance/withdrawal/).

## Auto-refund (s potvrzenim operatora)

Nikdy automaticky - refund vyzaduje vyslovnou akci operatora na obrazovce objednavky. V `Editace objednavky › Polski - withdrawal refund` (metabox vpravo) operator vidi:

- Vypocitanou castku refundu na zaklade vybranych polozek prohlaseni
- Tlacitko **Process refund now** (s `confirm()` JS pro dvojite potvrzeni)
- Po procesu: cislo refundu WooCommerce, castku a datum

Logika:

1. Nacita radky z `polski_withdrawal_items` pro dane prohlaseni
2. Mapuje na format `wc_create_refund()` (`qty`, `refund_total`, `refund_tax`)
3. Pricita naklady na dopravu **pouze** pokud se odstoupeni tyka vsech radku objednavky
4. Vola gateway refund (`refund_payment => true`) a restock (`restock_items => true`)
5. Uklada `refund_id` a `refund_amount` do `polski_withdrawals`
6. Spousti `polski_pro/withdrawal/refund_processed` a `WithdrawalService::complete()`

Filtr `polski_pro/withdrawal/refund_payload` umoznuje upravit payload pred `wc_create_refund()` (napr. pridat shipping ve specifickych pripadech nebo zmenit dane).

## PDF prohlaseni A4 - trvaly nosic

`Polski\Pro\Service\WithdrawalPdfGenerator` pouziva TCPDF k vygenerovani A4 PDF s:

- Cislem prohlaseni `POL-WD-NNNNNN` a datem podani
- Adresatem (udaje obchodu z `polski_general` nebo `woocommerce_store_*`)
- Spotrebitelem (billing first/last name, address, email)
- Obsahem prohlaseni s odkazem na cl. 27 zakona o pravech spotrebitele
- Tabulkou polozek (nazev + atributy variant, mnozstvi, hodnota)
- Hodnotou objednavky
- Datem objednavky
- Duvodem (pokud zakaznik uvedl)
- Mistem pro podpis (pouze papirova verze)
- Poznamkou o trvalem nosici

Ulozeni do `wp-content/uploads/polski-withdrawals/YYYY/MM/POL-WD-NNNNNN.pdf` (chraneno `.htaccess deny from all`).

Auto-generovano pri kazdem requested/guest_requested/manual_registered, prilozeno k e-mailu spotrebitele pres filter `woocommerce_email_attachments`. Cesta ulozena v order meta `_polski_withdrawal_pdf` - nasledujici volani `ensurePdf()` jsou idempotentni (regenerace pouze pokud soubor zmizel).

## Overeni poctu stazeni (Art. 16(m) relaxation)

Pro 100% digitalni objednavky, i kdyz jste ziskali Art. 16(m) consent, spotrebitel si zachovava pravo na odstoupeni, pokud **nestahl zadny soubor**. Service `DigitalDownloadVerifier`:

1. Hookuje se do filter `polski/withdrawal/eligible` s prioritou 30 (po DigitalConsentService=20)
2. Iteruje polozky objednavky, pro kazdou downloadable/virtual scita stazeni z `wc_get_customer_download_log` per permission
3. Pokud zadna polozka nema `count > 0`, obnovuje eligibility (vraci `true` misto `false`)
4. Pokud byla aspon jedna stazena, ponechava `false`

Zapinano pres `polski_withdrawal['digital_download_verification'] = '1'` v nastaveni (default off - opt-in v souladu s politikou obchodu).

## WooCommerce Subscriptions

Ve vychozim stavu predplatne **nejsou** vylucovana z odstoupeni (pokud storefront nenastavi filter `polski_pro/subscriptions/treat_as_exempt => true` pro legacy behavior). Logika:

- Kdyz prohlaseni completes (`polski/withdrawal/completed`), service iteruje predplatne propojene s objednavkou pres `wcs_get_subscriptions_for_order` a nastavuje stav `cancelled` (s poznamkou)
- Refund payload je **proporcionalni k nevyuzite casti aktualniho zuctovaciho obdobi** v souladu s Art. 9(2)(b)(iii) smernice
- Vzorec: `ratio = 1 - (elapsed / total_period_length)`, applied per radek v `refund_total` a `refund_tax`
- Bere minimum `ratio` ze vsech predplatnych propojenych s objednavkou

## Product Bundles

Tri strategie vraceni (`bundle_refund_mode` v nastaveni nebo filter `polski_pro/withdrawal/bundle_refund_mode`):

| Rezim | Chovani |
|---|---|
| `whole_bundle` (default) | Vraceni se tyka celeho bundle + vsech soucasti (rozsiruje payload o parent a siblings) |
| `proportional` | Vraceni pouze za vybranou soucast (cast ceny bundle proporcionalne k poctu items) |
| `remove_discount` | Vraceni za soucast za cenu standalone (bez slevy bundle) |

Detekce bundle pres `_bundled_by` order item meta nebo product type `bundle`.

## Annex I(B) v 8 jazycich

`AnnexMultiLanguageService` rozsiruje filter `polski/annex/form_html` o preklady pro locales: `pl`, `de`, `de_AT`, `fr`, `nl`, `it`, `es` + generic `eu` (English fallback). Kazdy preklad obsahuje spravne zneni z oficialni verze smernice + narodni pravni odkaz (BGB §355 DE, KSchG §11 AT, Code de la consommation art. L221-18 FR, Burgerlijk Wetboek 6:230o NL, Codice del Consumo art. 52 IT, TRLGDCU art. 102 ES, Zakon o pravech spotrebitele cl. 27 PL).

Vyber jazyka:

- Setting `polski_withdrawal['annex_locale']` (globalni override)
- Auto-detekce z `get_locale()` pokud je setting prazdny
- Shortcode attribute: `[polski_withdrawal_form_template_pro lang="de"]`
- Filter `polski/annex/locale`

## Reportovaci dashboard

`Polski Pro › Withdrawal reports` - scorecards + breakdown s date-range filtrem:

- **Filed** - celkovy pocet podanych
- **Completed** - finalizovane
- **In progress** - requested + confirmed
- **Rejected** - odmitnute
- **Average processing time** - `requested_at → completed_at` (sekundy, formatovano pres `human_time_diff`)
- **Refunded** - pocet × castka
- **Top reasons** - top 10 unikatnich duvodu (group by reason)
- **Channel breakdown** - online / guest / phone / email / letter / in_store

Cache 5 minut per filter tuple (transient).

REST endpoints (parity pro starsi WP):

- `GET /polski-pro/v1/withdrawals/reports/scorecards?from=...&to=...`
- `GET /polski-pro/v1/withdrawals/reports/reasons?limit=10`
- `GET /polski-pro/v1/withdrawals/reports/channels`

Vsechny gated `manage_woocommerce`.

## Audit log s exportem CSV

`polski_pro_withdrawal_audit` (Migration 2.5.0) zapisuje kazdou udalost zivotniho cyklu prohlaseni:

| Pole | Obsah |
|---|---|
| `withdrawal_id` | ID prohlaseni |
| `order_id` | ID objednavky |
| `action` | `requested` / `confirmed` / `completed` / `rejected` / `guest_requested` / `manual_registered` / `refunded` |
| `actor_user_id` | ID uzivatele WP (nebo NULL pro hosta) |
| `actor_role` | Prvni role WP uzivatele |
| `actor_login` | user_login |
| `ip_address` | Z `HTTP_CF_CONNECTING_IP` → `X_FORWARDED_FOR` → `REMOTE_ADDR` |
| `user_agent` | Truncated na 1000 znaku |
| `payload_json` | Snapshot eventu (channel, reason, refund_amount, email atd.) |
| `created_at` | datetime UTC |

Admin `Polski Pro › Withdrawal audit` - tabulka s filtry (action, date range, withdrawal_id, order_id) + button **Export to CSV** (streamed pres admin-post.php s nonce).

REST:

- `GET /polski-pro/v1/withdrawals/audit` - paginated list
- `GET /polski-pro/v1/withdrawals/audit/export` - streamed CSV

## Pro abilities API (WP 6.9+)

4 dalsi abilities v kategorii `polski-pro/withdrawal`:

| ID | Co dela |
|---|---|
| `polski-pro/withdrawal-process-refund` | Sestavuje a provadi refund pro prohlaseni |
| `polski-pro/withdrawal-generate-pdf` | Generuje (nebo vraci cached) PDF prohlaseni |
| `polski-pro/withdrawal-audit-list` | Seznam zaznamu audit log s filtry |
| `polski-pro/withdrawal-report-scorecards` | KPI dashboard |

Vsechny gated `manage_woocommerce`, popsane schematy JSON Schema (input/output).

## Hooky PRO

```php
do_action('polski_pro/withdrawal/refund_processed', int $withdrawalId, WC_Order_Refund $refund);
do_action('polski/pro/withdrawal/pdf_generated', int $withdrawalId, string $filepath);

apply_filters('polski_pro/withdrawal/refund_payload', array $payload, WC_Order, int $withdrawalId);
apply_filters('polski_pro/withdrawal/download_verification_enabled', bool $enabled);
apply_filters('polski_pro/withdrawal/bundle_refund_mode', string $mode);
apply_filters('polski_pro/subscriptions/treat_as_exempt', bool $exempt, WC_Order $order);
```
