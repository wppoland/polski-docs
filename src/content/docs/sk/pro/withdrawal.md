---
title: Odstúpenie od zmluvy - funkcie Pro
description: Pro rozšírenia modulu odstúpení Polski for WooCommerce - auto-refund, PDF deklarácie A4, audit log s CSV, reportovací dashboard, podpora Subscriptions a Bundles, multi-lang Annex I(B).
---

Verzia Pro rozširuje bezplatný modul odstúpení o operátorskú obsluhu refundov, PDF deklarácie, audit log, reporty a integrácie s predplatným / balíkmi produktov. Predpokladá sa, že máte aktívnu bezplatnú verziu Polski for WooCommerce a poznáte [základný modul odstúpení](/compliance/withdrawal/).

## Auto-refund (s potvrdením operátora)

Nikdy nie automaticky - refund vyžaduje explicitnú akciu operátora na obrazovke objednávky. V `Úprava objednávky › Polski - withdrawal refund` (metabox vpravo) operátor vidí:

- Vypočítanú sumu refundu na základe vybraných položiek vyhlásenia
- Tlačidlo **Process refund now** (s `confirm()` JS pre dvojité potvrdenie)
- Po procese: číslo refundu WooCommerce, sumu a dátum

Logika:

1. Preberá riadky z `polski_withdrawal_items` pre dané vyhlásenie
2. Mapuje na formát `wc_create_refund()` (`qty`, `refund_total`, `refund_tax`)
3. Pridáva náklady na dopravu **iba** ak sa odstúpenie týka všetkých riadkov objednávky
4. Vyvoláva gateway refund (`refund_payment => true`) a restock (`restock_items => true`)
5. Ukladá `refund_id` a `refund_amount` do `polski_withdrawals`
6. Spúšťa `polski_pro/withdrawal/refund_processed` a `WithdrawalService::complete()`

Filter `polski_pro/withdrawal/refund_payload` umožňuje upraviť payload pred `wc_create_refund()` (napr. pridať shipping v špecifických prípadoch alebo zmeniť dane).

## PDF deklarácie A4 - trvalý nosič

`Polski\Pro\Service\WithdrawalPdfGenerator` používa TCPDF na vygenerovanie A4 PDF s:

- Číslom deklarácie `POL-WD-NNNNNN` a dátumom podania
- Adresátom (údaje obchodu z `polski_general` alebo `woocommerce_store_*`)
- Spotrebiteľom (billing first/last name, address, email)
- Obsahom vyhlásenia s odkazom na čl. 27 zákona o právach spotrebiteľa
- Tabuľkou položiek (názov + atribúty variantov, množstvo, hodnota)
- Hodnotou objednávky
- Dátumom objednávky
- Dôvodom (ak zákazník uviedol)
- Miestom na podpis (iba papierová verzia)
- Poznámkou o trvalom nosiči

Ukladá sa do `wp-content/uploads/polski-withdrawals/YYYY/MM/POL-WD-NNNNNN.pdf` (chránené `.htaccess deny from all`).

Auto-generuje sa pri každom requested/guest_requested/manual_registered, prikladá sa k e-mailu spotrebiteľa cez filter `woocommerce_email_attachments`. Cesta uložená v order meta `_polski_withdrawal_pdf` - ďalšie volania `ensurePdf()` sú idempotentné (regenerácia iba ak súbor zmizol).

## Overenie počtu stiahnutí (Art. 16(m) relaxation)

Pre 100% digitálne objednávky, aj keď ste zozbierali Art. 16(m) consent, spotrebiteľ si zachováva právo odstúpenia, ak **nestiahol žiadny súbor**. Service `DigitalDownloadVerifier`:

1. Hookuje sa do filtra `polski/withdrawal/eligible` pri priorite 30 (po DigitalConsentService=20)
2. Iteruje položky objednávky, pre každú downloadable/virtual sumuje stiahnutia z `wc_get_customer_download_log` per permission
3. Ak žiadna položka nemá `count > 0`, obnovuje eligibility (vracia `true` namiesto `false`)
4. Ak bola aspoň jedna stiahnutá, ponecháva `false`

Zapína sa cez `polski_withdrawal['digital_download_verification'] = '1'` v nastaveniach (default off - opt-in v súlade s politikou obchodu).

## WooCommerce Subscriptions

Predvolene predplatné **nie sú** vylúčené z odstúpení (pokiaľ storefront nenastaví filter `polski_pro/subscriptions/treat_as_exempt => true` pre legacy behavior). Logika:

- Keď sa vyhlásenie completes (`polski/withdrawal/completed`), service iteruje predplatné spojené s objednávkou cez `wcs_get_subscriptions_for_order` a nastavuje stav `cancelled` (s poznámkou)
- Refund payload je **proporcionálny k nevyužitej časti aktuálneho zúčtovacieho obdobia** v súlade s Art. 9(2)(b)(iii) smernice
- Vzorec: `ratio = 1 - (elapsed / total_period_length)`, applied per riadok v `refund_total` a `refund_tax`
- Berie minimum `ratio` zo všetkých predplatných spojených s objednávkou

## Product Bundles

Tri stratégie vrátenia (`bundle_refund_mode` v nastaveniach alebo filter `polski_pro/withdrawal/bundle_refund_mode`):

| Režim | Správanie |
|---|---|
| `whole_bundle` (default) | Vrátenie sa týka celého bundle + všetkých zložiek (rozširuje payload o parent a siblings) |
| `proportional` | Vrátenie iba za vybranú zložku (časť ceny bundle proporcionálne k počtu items) |
| `remove_discount` | Vrátenie za zložku v cene standalone (bez zľavy bundle) |

Detekcia bundle cez `_bundled_by` order item meta alebo product type `bundle`.

## Annex I(B) v 8 jazykoch

`AnnexMultiLanguageService` rozširuje filter `polski/annex/form_html` o preklady pre locales: `pl`, `de`, `de_AT`, `fr`, `nl`, `it`, `es` + generic `eu` (English fallback). Každý preklad obsahuje správnu formuláciu z oficiálnej verzie smernice + národný právny odkaz (BGB §355 DE, KSchG §11 AT, Code de la consommation art. L221-18 FR, Burgerlijk Wetboek 6:230o NL, Codice del Consumo art. 52 IT, TRLGDCU art. 102 ES, Zákon o právach spotrebiteľa čl. 27 PL).

Výber jazyka:

- Setting `polski_withdrawal['annex_locale']` (globálny override)
- Auto-detekcia z `get_locale()` ak je setting prázdny
- Shortcode attribute: `[polski_withdrawal_form_template_pro lang="de"]`
- Filter `polski/annex/locale`

## Reportovací dashboard

`Polski Pro › Withdrawal reports` - scorecards + breakdown s date-range filtrom:

- **Filed** - celkový počet podaných
- **Completed** - sfinalizované
- **In progress** - requested + confirmed
- **Rejected** - odmietnuté
- **Average processing time** - `requested_at → completed_at` (sekundy, formátované cez `human_time_diff`)
- **Refunded** - počet × suma
- **Top reasons** - top 10 unikátnych dôvodov (group by reason)
- **Channel breakdown** - online / guest / phone / email / letter / in_store

Cache 5 minút per filter tuple (transient).

REST endpoints (parity pre staršie WP):

- `GET /polski-pro/v1/withdrawals/reports/scorecards?from=...&to=...`
- `GET /polski-pro/v1/withdrawals/reports/reasons?limit=10`
- `GET /polski-pro/v1/withdrawals/reports/channels`

Všetky gated `manage_woocommerce`.

## Audit log s exportom CSV

`polski_pro_withdrawal_audit` (Migration 2.5.0) zaznamenáva každú udalosť životného cyklu vyhlásenia:

| Pole | Obsah |
|---|---|
| `withdrawal_id` | ID vyhlásenia |
| `order_id` | ID objednávky |
| `action` | `requested` / `confirmed` / `completed` / `rejected` / `guest_requested` / `manual_registered` / `refunded` |
| `actor_user_id` | ID používateľa WP (alebo NULL pre hosťa) |
| `actor_role` | Prvá rola WP používateľa |
| `actor_login` | user_login |
| `ip_address` | Z `HTTP_CF_CONNECTING_IP` → `X_FORWARDED_FOR` → `REMOTE_ADDR` |
| `user_agent` | Truncated na 1000 znakov |
| `payload_json` | Snapshot eventu (channel, reason, refund_amount, email atď.) |
| `created_at` | datetime UTC |

Admin `Polski Pro › Withdrawal audit` - tabuľka s filtrami (action, date range, withdrawal_id, order_id) + button **Export to CSV** (streamed cez admin-post.php s nonce).

REST:

- `GET /polski-pro/v1/withdrawals/audit` - paginated list
- `GET /polski-pro/v1/withdrawals/audit/export` - streamed CSV

## Pro abilities API (WP 6.9+)

4 dodatočné abilities v kategórii `polski-pro/withdrawal`:

| ID | Čo robí |
|---|---|
| `polski-pro/withdrawal-process-refund` | Buduje a vykonáva refund pre deklaráciu |
| `polski-pro/withdrawal-generate-pdf` | Generuje (alebo vracia cached) PDF deklarácie |
| `polski-pro/withdrawal-audit-list` | Zoznam záznamov audit log s filtrami |
| `polski-pro/withdrawal-report-scorecards` | KPI dashboard |

Všetky gated `manage_woocommerce`, opísané schémami JSON Schema (input/output).

## Hooky PRO

```php
do_action('polski_pro/withdrawal/refund_processed', int $withdrawalId, WC_Order_Refund $refund);
do_action('polski/pro/withdrawal/pdf_generated', int $withdrawalId, string $filepath);

apply_filters('polski_pro/withdrawal/refund_payload', array $payload, WC_Order, int $withdrawalId);
apply_filters('polski_pro/withdrawal/download_verification_enabled', bool $enabled);
apply_filters('polski_pro/withdrawal/bundle_refund_mode', string $mode);
apply_filters('polski_pro/subscriptions/treat_as_exempt', bool $exempt, WC_Order $order);
```
