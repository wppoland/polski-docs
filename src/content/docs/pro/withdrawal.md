---
title: Odstąpienie od umowy — funkcje Pro
description: Pro rozszerzenia modułu odstąpień Polski for WooCommerce — auto-refund, PDF deklaracji A4, audit log z CSV, dashboard raportowy, obsługa Subscriptions i Bundles, multi-lang Annex I(B).
---

Wersja Pro rozszerza darmowy moduł odstąpień o operatorską obsługę refundów, PDF deklaracji, audit log, raporty i integracje z subskrypcjami / zestawami produktów. Zakłada się, że masz aktywną darmową wersję Polski for WooCommerce i znasz [podstawowy moduł odstąpień](/compliance/withdrawal/).

## Auto-refund (z potwierdzeniem operatora)

Nigdy automatycznie — refund wymaga jawnej akcji operatora na ekranie zamówienia. W `Edycja zamówienia › Polski — withdrawal refund` (metabox po prawej) operator widzi:

- Obliczoną kwotę refundu na podstawie wybranych pozycji oświadczenia
- Przycisk **Process refund now** (z `confirm()` JS dla podwójnego potwierdzenia)
- Po procesie: numer refund WooCommerce, kwotę i datę

Logika:

1. Pobiera linie z `polski_withdrawal_items` dla danego oświadczenia
2. Mapuje na format `wc_create_refund()` (`qty`, `refund_total`, `refund_tax`)
3. Dodaje koszt wysyłki **tylko** jeśli odstąpienie obejmuje wszystkie linie zamówienia
4. Wywołuje gateway refund (`refund_payment => true`) i restock (`restock_items => true`)
5. Zapisuje `refund_id` i `refund_amount` w `polski_withdrawals`
6. Triggeruje `polski_pro/withdrawal/refund_processed` i `WithdrawalService::complete()`

Filtr `polski_pro/withdrawal/refund_payload` pozwala zmodyfikować payload przed `wc_create_refund()` (np. dodać shipping w specyficznych przypadkach lub zmienić podatki).

## PDF deklaracji A4 — trwały nośnik

`Polski\Pro\Service\WithdrawalPdfGenerator` używa TCPDF do wygenerowania A4 PDF z:

- Numerem deklaracji `POL-WD-NNNNNN` i datą złożenia
- Adresatem (dane sklepu z `polski_general` lub `woocommerce_store_*`)
- Konsumentem (billing first/last name, address, email)
- Treścią oświadczenia z odwołaniem do art. 27 ustawy o prawach konsumenta
- Tabelą pozycji (nazwa + atrybuty wariantów, ilość, wartość)
- Wartością zamówienia
- Datą zamówienia
- Powodem (jeśli klient podał)
- Miejscem na podpis (tylko wersja papierowa)
- Notą o trwałym nośniku

Zapis do `wp-content/uploads/polski-withdrawals/YYYY/MM/POL-WD-NNNNNN.pdf` (chroniony `.htaccess deny from all`).

Auto-generowany przy każdym requested/guest_requested/manual_registered, attach do e-maila konsumenta przez filter `woocommerce_email_attachments`. Ścieżka zapisana w order meta `_polski_withdrawal_pdf` — kolejne wywołania `ensurePdf()` są idempotentne (regeneracja tylko jeśli plik zniknął).

## Weryfikacja liczby pobrań (Art. 16(m) relaxation)

Dla zamówień 100% cyfrowych, nawet gdy zebrałeś Art. 16(m) consent, konsument zachowuje prawo odstąpienia jeśli **żadnego pliku nie pobrał**. Service `DigitalDownloadVerifier`:

1. Hooka się w filter `polski/withdrawal/eligible` przy priorytecie 30 (po DigitalConsentService=20)
2. Iteruje pozycje zamówienia, dla każdej downloadable/virtual sumuje pobrania z `wc_get_customer_download_log` per permission
3. Jeśli żadna pozycja nie ma `count > 0`, przywraca eligibility (zwraca `true` zamiast `false`)
4. Jeśli choć jedna była pobrana, zostawia `false`

Włączane przez `polski_withdrawal['digital_download_verification'] = '1'` w ustawieniach (default off — opt-in zgodnie z polityką sklepu).

## WooCommerce Subscriptions

Domyślnie subskrypcje **nie są** wyłączane z odstąpień (chyba że storefront ustawi filter `polski_pro/subscriptions/treat_as_exempt => true` dla legacy behavior). Logika:

- Gdy oświadczenie completes (`polski/withdrawal/completed`), service iteruje subskrypcje powiązane z zamówieniem przez `wcs_get_subscriptions_for_order` i ustawia status `cancelled` (z notatką)
- Refund payload jest **proporcjonalny do niewykorzystanej części bieżącego okresu rozliczeniowego** zgodnie z Art. 9(2)(b)(iii) dyrektywy
- Wzór: `ratio = 1 - (elapsed / total_period_length)`, applied per linia w `refund_total` i `refund_tax`
- Bierze minimum `ratio` z wszystkich subskrypcji powiązanych z zamówieniem

## Product Bundles

Trzy strategie zwrotu (`bundle_refund_mode` w ustawieniach lub filter `polski_pro/withdrawal/bundle_refund_mode`):

| Tryb | Zachowanie |
|---|---|
| `whole_bundle` (default) | Zwrot dotyczy całego bundle + wszystkich składowych (rozszerza payload o parent i siblings) |
| `proportional` | Zwrot tylko za wybraną składową (część ceny bundle proporcjonalnie do liczby items) |
| `remove_discount` | Zwrot za składową po cenie standalone (bez zniżki bundle) |

Wykrywanie bundle przez `_bundled_by` order item meta lub product type `bundle`.

## Annex I(B) w 8 językach

`AnnexMultiLanguageService` rozszerza filter `polski/annex/form_html` o tłumaczenia dla locales: `pl`, `de`, `de_AT`, `fr`, `nl`, `it`, `es` + generic `eu` (English fallback). Każde tłumaczenie zawiera prawidłowe sformułowanie z oficjalnej wersji dyrektywy + krajowe odniesienie prawne (BGB §355 DE, KSchG §11 AT, Code de la consommation art. L221-18 FR, Burgerlijk Wetboek 6:230o NL, Codice del Consumo art. 52 IT, TRLGDCU art. 102 ES, Ustawa o prawach konsumenta art. 27 PL).

Wybór języka:

- Setting `polski_withdrawal['annex_locale']` (override globalny)
- Auto-detekcja z `get_locale()` jeśli setting pusty
- Shortcode attribute: `[polski_withdrawal_form_template_pro lang="de"]`
- Filter `polski/annex/locale`

## Dashboard raportowy

`Polski Pro › Withdrawal reports` — scorecards + breakdown z date-range filtrem:

- **Filed** — łączna liczba zgłoszonych
- **Completed** — sfinalizowane
- **In progress** — requested + confirmed
- **Rejected** — odrzucone
- **Average processing time** — `requested_at → completed_at` (sekundy, formatowane przez `human_time_diff`)
- **Refunded** — liczba × kwota
- **Top reasons** — top 10 unikalnych powodów (group by reason)
- **Channel breakdown** — online / guest / phone / email / letter / in_store

Cache 5 minut per filter tuple (transient).

REST endpoints (parity dla starszych WP):

- `GET /polski-pro/v1/withdrawals/reports/scorecards?from=...&to=...`
- `GET /polski-pro/v1/withdrawals/reports/reasons?limit=10`
- `GET /polski-pro/v1/withdrawals/reports/channels`

Wszystkie gated `manage_woocommerce`.

## Audit log z eksportem CSV

`polski_pro_withdrawal_audit` (Migration 2.5.0) zapisuje każde zdarzenie cyklu życia oświadczenia:

| Pole | Zawartość |
|---|---|
| `withdrawal_id` | ID oświadczenia |
| `order_id` | ID zamówienia |
| `action` | `requested` / `confirmed` / `completed` / `rejected` / `guest_requested` / `manual_registered` / `refunded` |
| `actor_user_id` | ID użytkownika WP (lub NULL dla gościa) |
| `actor_role` | Pierwsza rola WP użytkownika |
| `actor_login` | user_login |
| `ip_address` | Z `HTTP_CF_CONNECTING_IP` → `X_FORWARDED_FOR` → `REMOTE_ADDR` |
| `user_agent` | Truncated do 1000 znaków |
| `payload_json` | Snapshot eventu (channel, reason, refund_amount, email itd.) |
| `created_at` | datetime UTC |

Admin `Polski Pro › Withdrawal audit` — tabela z filtrami (action, date range, withdrawal_id, order_id) + button **Export to CSV** (streamed przez admin-post.php z nonce).

REST:

- `GET /polski-pro/v1/withdrawals/audit` — paginated list
- `GET /polski-pro/v1/withdrawals/audit/export` — streamed CSV

## Pro abilities API (WP 6.9+)

4 dodatkowe abilities w kategorii `polski-pro/withdrawal`:

| ID | Co robi |
|---|---|
| `polski-pro/withdrawal-process-refund` | Buduje i wykonuje refund dla deklaracji |
| `polski-pro/withdrawal-generate-pdf` | Generuje (lub zwraca cached) PDF deklaracji |
| `polski-pro/withdrawal-audit-list` | Lista wpisów audit log z filtrami |
| `polski-pro/withdrawal-report-scorecards` | KPI dashboard |

Wszystkie gated `manage_woocommerce`, opisane schematami JSON Schema (input/output).

## Hooki PRO

```php
do_action('polski_pro/withdrawal/refund_processed', int $withdrawalId, WC_Order_Refund $refund);
do_action('polski/pro/withdrawal/pdf_generated', int $withdrawalId, string $filepath);

apply_filters('polski_pro/withdrawal/refund_payload', array $payload, WC_Order, int $withdrawalId);
apply_filters('polski_pro/withdrawal/download_verification_enabled', bool $enabled);
apply_filters('polski_pro/withdrawal/bundle_refund_mode', string $mode);
apply_filters('polski_pro/subscriptions/treat_as_exempt', bool $exempt, WC_Order $order);
```
