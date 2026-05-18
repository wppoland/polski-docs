---
title: Prawo odstąpienia od umowy (Art. 11a dyrektywy 2023/2673)
description: Pełna implementacja prawa odstąpienia od umowy w Polski for WooCommerce — formularz dla klientów i gości, częściowe zwroty, wykluczenia, Annex I(A)/(B), zgoda Art. 16(m), abilities API i hooki.
---

Od **19 czerwca 2026** każdy sklep internetowy w UE sprzedający konsumentom musi udostępnić działającą funkcjonalność odstąpienia od umowy bezpośrednio w sklepie — wymaga tego Art. 11a dyrektywy 2011/83/UE zmienionej przez 2023/2673. Moduł odstąpień w Polski for WooCommerce dostarcza tę funkcjonalność plus dodatki ułatwiające codzienną obsługę.

:::caution
Moduł realizuje techniczną stronę wymogu. Treść regulaminu, polityka zwrotów i komunikacja z klientem pozostają Twoją odpowiedzialnością. To nie jest porada prawna.
:::

## Co działa od razu po instalacji

Po włączeniu modułu masz:

- Trzy nowe statusy zamówień: `wc-withdrawal-requested`, `wc-withdrawal-partial`, `wc-withdrawal-completed`
- Migrację bazy `polski_withdrawals` + `polski_withdrawal_items` (Migration 2.2.0)
- Tabelę admin `Polski > Withdrawals` z listą i filtrem statusu
- Stronę ustawień `Polski > Withdrawal settings`
- Trzy dynamiczne bloki Gutenberg + trzy shortcode (lookup, info, form template)
- 16 abilities w WP 6.9+ Abilities API
- Domyślny termin 14 dni z konfigurowalnym statusem uruchamiającym bieg

## Trzy ścieżki konsumenta

### 1. Klient zalogowany — formularz dwustopniowy w Moim koncie

W `Moje konto › Zamówienia` przy każdym zamówieniu kwalifikującym się do zwrotu pojawia się akcja **Withdraw from contract** (tekst konfigurowalny). Po kliknięciu klient widzi formularz dwustopniowy:

- **Krok 1: wybór pozycji.** Tabela z każdą linią zamówienia (waranty produktów jako osobne pozycje, z atrybutami), kolumna „Pozostało" pokazuje ile można jeszcze odstąpić, kolumna „Liczba sztuk do zwrotu" to spinner z `min=0`, `max=remaining_qty`. Pre-fill = pełna pozostała ilość.
- **Krok 2: powód i potwierdzenie.** Textarea (opcjonalna) + submit „Złóż oświadczenie i wyślij potwierdzenie na e-mail".

Funkcjonalności:

- **Częściowe odstąpienia** — od jednej sztuki, od kilku linii, lub wielu osobnych oświadczeń dla jednego zamówienia
- **Pro-rata totals** — `line_total` i `line_tax` skalują się proporcjonalnie do wybranej ilości
- **Live counter** (JS) — pod tabelą komunikat „Wybrano łącznie X sztuk" w `role="status" aria-live="polite"`
- **Quick actions** — przyciski „Wybierz wszystkie pozycje" / „Wyczyść wybór"
- **Anuluj i wróć** — link wstecz do listy zamówień bez wysłania

### 2. Gość — autoryzacja przez e-mail + magic-link

Na stronie z shortcodem `[polski_withdrawal_lookup]` gość podaje numer zamówienia i adres e-mail użyty przy zakupie. System:

1. Sprawdza, czy `billing_email` zamówienia odpowiada wprowadzonemu (case-insensitive)
2. Sprawdza rate-limit (5 prób / 15 min per email+IP)
3. Generuje 32-bajtowy token, zapisuje hash w transient z TTL 30 min
4. Wysyła magic-link na e-mail (Polish subject + body)
5. Zawsze zwraca to samo „masked" notice (zapobiega enumeracji)

Po kliknięciu linku ten sam shortcode renderuje formularz odstąpienia z **pełnym podsumowaniem zamówienia** (tabela pozycji, ilości, wartości, data, total) + opcjonalny powód + submit.

### 3. Admin — ręczna rejestracja oświadczeń off-line

W `Polski > Register withdrawal` operator zapisuje odstąpienie otrzymane telefonicznie, mailowo, listownie, w sklepie. Pola: numer zamówienia, kanał, powód. Po zapisie rekord ma `channel` i `registered_by_user_id`, status zamówienia zmienia się na `wc-withdrawal-requested`.

## Wykluczenia produktów (Art. 38 ustawy o prawach konsumenta)

### Per produkt

Na ekranie edycji produktu pole meta `_polski_withdrawal_exempt = 'yes'` plus dropdown z gotowymi powodami z `Polski\Enum\WithdrawalExemptionReason`:

- `art38_3` — Produkt na zamówienie indywidualne / personalizowany
- `art38_4` — Szybko psujący się / krótki termin przydatności
- `art38_5` — Zapieczętowany ze względu na ochronę zdrowia / higieniczny
- `art38_6` — Nieoddzielnie połączony z innymi rzeczami
- `art38_7` — Napoje alkoholowe (cena uzgodniona, dostarczenie później)
- `art38_9` — Nagrania audio/wideo / oprogramowanie w zapieczętowanym opakowaniu
- `art38_13` — Treści cyfrowe spełniane przed upływem terminu
- `custom` — Inne (własne uzasadnienie)

### Per kategoria

Na ekranie edycji kategorii produktu (`product_cat`) ten sam mechanizm na term meta `polski_withdrawal_exempt`. Jeden checkbox dla całego asortymentu zamiast setek produktów.

### Logika priorytetu

Meta produktu wygrywa, fallback to kategoria. Wariant produktu dziedziczy kategorie po `parent_id`. Filtr `polski/withdrawal/eligible` zwraca `false` jeśli wszystkie pozycje są exempt.

## Art. 16(m) — zgoda dla produktów cyfrowych

Trzy tryby (`digital_consent_mode`):

| Tryb | Co się dzieje |
|---|---|
| `required` | Checkout blokuje się dopóki konsument nie zaznaczy. Każde zamówienie 100% cyfrowe → wyłączone z prawa odstąpienia. |
| `optional` | Checkbox widoczny, nie wymagany. Tylko zamówienia z zaznaczoną zgodą → wyłączone. |
| `hidden` | Brak checkboxa. Zamówienia cyfrowe zachowują prawo odstąpienia. |

Wersja Pro dodatkowo weryfikuje liczbę pobrań — jeśli konsument nie pobrał żadnego pliku, prawo odstąpienia zostaje przywrócone nawet po zgodzie.

## Konfigurowalny termin i statusy uruchamiające

- `period_days` — domyślnie 14
- `trigger_statuses` — multi-select statusów WooCommerce (default: `completed`)
- Gdy zamówienie wchodzi w trigger status, `_polski_withdrawal_clock_start` zapisuje się przez `$order->update_meta_data()` (HPOS-safe)
- `isEligible()` liczy deadline = `clock_start + period_days`

## Annex I(A) i I(B)

Generator zasilany danymi z opcji `polski_general` (company_name, address, NIP, email, phone) z fallbackiem do `woocommerce_store_*`.

| Shortcode | Blok | Co renderuje |
|---|---|---|
| `[polski_withdrawal_info]` | `polski/withdrawal-info` | Annex I(A) — pełna informacja o prawie odstąpienia |
| `[polski_withdrawal_form_template]` | `polski/withdrawal-form` | Annex I(B) — wzór formularza (do druku) |
| `[polski_withdrawal_lookup]` | `polski/withdrawal-lookup` | Formularz dla gości |

Pro dodaje tłumaczenia Annex I(B) w 8 językach (PL, DE, AT, FR, NL, IT, ES, generic EU) z krajowymi odniesieniami prawnymi (BGB §355 DE, KSchG §11 AT, art. L221-18 FR, itd.).

## E-mail potwierdzający jako trwały nośnik

E-mail zawiera:

- Numer deklaracji `POL-WD-NNNNNN`
- Datę i godzinę złożenia (UTC + lokalna)
- Numer i datę zamówienia
- Tabelę pozycji z atrybutami wariantów i wartościami
- Wartość zamówienia
- Adres do wysyłki zwrotu
- Notę o trwałym nośniku

Wersje HTML i plain text. Pro dorzuca PDF deklaracji A4 jako załącznik.

## Hooki deweloperskie

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

16 abilities w 4 kategoriach: `polski/withdrawal`, `polski/legal`, `polski/compliance`, `polski/shop`. Wywołanie przez `/wp-json/wp-abilities/v1/abilities/<id>/execute` lub `@wordpress/abilities` JS package. Pełna lista z input/output schema w `docs/withdrawal/abilities.md` w repozytorium pluginu.

## Magazynowanie

Tabele własne (nie postmeta):

- `polski_withdrawals` — jeden rekord per oświadczenie (id, order_id, customer_id, status, channel, guest_email, refund_id, refund_amount, clock_started_at, requested/confirmed/completed/rejected_at, language_code)
- `polski_withdrawal_items` — znormalizowane linie (id, withdrawal_id, order_item_id, product_id, variation_id, quantity, line_subtotal/total/tax, sku, name, attributes_json)

Pro dodaje `polski_pro_withdrawal_audit` (Migration 2.5.0) z actor/IP/UA + payload snapshot.

## Dostępność

Pełna zgodność WCAG 2.2 Level AA: `:focus-visible` ring, 44×44 touch targets, `lang="pl"` na każdej sekcji, `aria-required` + `aria-invalid` + `aria-describedby` + `aria-busy`, sticky form values, role=alert na error notice z autofocus, live region z liczbą wybranych sztuk, scroll-margin pod sticky header, widoczne FAQ accordion + JSON-LD FAQPage, kontakt fallback.
