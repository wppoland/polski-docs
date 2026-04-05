---
title: KSeF - Národný systém e-faktúr
description: Pripravenosť na KSeF v Polski for WooCommerce - automatická detekcia objednávok s NIP, stĺpec stavu, vývojárske hooky a integrácia so systémami fakturácie.
---

Národný systém e-faktúr (KSeF) je platforma Ministerstva financií na vystavovanie a prijímanie štrukturovaných faktúr. Polski for WooCommerce pripravuje obchod WooCommerce na integráciu s KSeF prostredníctvom automatickej detekcie objednávok vyžadujúcich faktúru s DPH, stĺpca stavu v administračnom paneli a hookov umožňujúcich integráciu s externými systémami fakturácie.

## Právny stav KSeF

KSeF je v súčasnosti vo fáze implementácie. Plugin Polski for WooCommerce nevystavuje faktúry priamo v KSeF, ale poskytuje infraštruktúru uľahčujúcu integráciu so systémami, ktoré to robia (napr. Fakturownia, iFirma, wFirma, InFakt).

Hlavné funkcie modulu KSeF:

1. Automatická detekcia objednávok s číslom NIP
2. Stĺpec stavu KSeF v zozname objednávok
3. Hooky na integráciu s externými systémami fakturácie
4. Meta-údaje objednávky pripravené na odovzdanie do systému KSeF

## Detekcia objednávok s NIP

Keď zákazník uvedie číslo NIP pri zadávaní objednávky (pole NIP je súčasťou modulu Checkout pluginu), systém automaticky:

1. Validuje formát NIP (10 číslic, kontrola kontrolného súčtu)
2. Označí objednávku ako vyžadujúcu faktúru s DPH
3. Uloží NIP do meta-údajov objednávky
4. Voliteľne stiahne firemné údaje z API GUS/CEIDG

### Validácia NIP

Plugin kontroluje správnosť NIP na dvoch úrovniach:

- **Formát** - 10 číslic, správny kontrolný súčet (váhy: 6, 5, 7, 2, 3, 4, 5, 6, 7)
- **Online overenie** - voliteľná kontrola v databáze VIES (pre EÚ NIP) alebo API GUS

## Stĺpec stavu KSeF

V zozname objednávok (**WooCommerce > Objednávky**) plugin pridáva stĺpec **KSeF** s ikonami stavu:

| Ikona | Stav | Popis |
|-------|--------|------|
| Šedá | Netýka sa | Objednávka bez NIP, faktúra nie je vyžadovaná |
| Modrá | Čaká | Objednávka s NIP, faktúra na vystavenie |
| Zelená | Vystavená | Faktúra bola vystavená (stav nastavený hookom) |
| Červená | Chyba | Vyskytol sa problém s vystavením faktúry |

Stav je možné filtrovať - použite filter v zozname objednávok na zobrazenie napr. len objednávok čakajúcich na faktúru.

### Hromadné akcie

V zozname objednávok je dostupná hromadná akcia "Označiť ako vystavené v KSeF", umožňujúca aktualizovať stav viacerých objednávok súčasne.

## Hooky

### polski/ksef/invoice_ready

Volaný, keď je objednávka s NIP zaplatená a pripravená na vystavenie faktúry. Toto je hlavný hook na integráciu s externými systémami fakturácie.

```php
/**
 * @param int      $order_id   ID zamówienia WooCommerce.
 * @param WC_Order $order      Obiekt zamówienia.
 * @param string   $nip        Numer NIP klienta.
 * @param array    $invoice_data Dane do faktury (nazwa firmy, adres, NIP).
 */
add_action('polski/ksef/invoice_ready', function (int $order_id, WC_Order $order, string $nip, array $invoice_data): void {
    // Przykład: wyślij dane do API Fakturowni
    $api_token = get_option('fakturownia_api_token');
    $account = get_option('fakturownia_account');
    
    $invoice_payload = [
        'invoice' => [
            'kind'             => 'vat',
            'number'           => null, // auto-numeracja
            'sell_date'        => $order->get_date_paid()->format('Y-m-d'),
            'issue_date'       => current_time('Y-m-d'),
            'payment_type'     => 'transfer',
            'seller_name'      => get_option('woocommerce_store_name'),
            'buyer_name'       => $invoice_data['company_name'],
            'buyer_tax_no'     => $nip,
            'buyer_street'     => $invoice_data['address'],
            'buyer_city'       => $invoice_data['city'],
            'buyer_post_code'  => $invoice_data['postcode'],
            'positions'        => [],
        ],
    ];
    
    foreach ($order->get_items() as $item) {
        $invoice_payload['invoice']['positions'][] = [
            'name'       => $item->get_name(),
            'quantity'   => $item->get_quantity(),
            'total_price_gross' => $item->get_total() + $item->get_total_tax(),
            'tax'        => round(($item->get_total_tax() / $item->get_total()) * 100),
        ];
    }
    
    $response = wp_remote_post("https://{$account}.fakturownia.pl/invoices.json", [
        'body'    => wp_json_encode($invoice_payload),
        'headers' => [
            'Content-Type' => 'application/json',
            'Authorization' => 'Token token=' . $api_token,
        ],
    ]);
    
    if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 201) {
        $body = json_decode(wp_remote_retrieve_body($response), true);
        update_post_meta($order_id, '_ksef_status', 'issued');
        update_post_meta($order_id, '_ksef_invoice_id', $body['id'] ?? '');
    } else {
        update_post_meta($order_id, '_ksef_status', 'error');
    }
}, 10, 4);
```

### polski/ksef/is_required

Filter umožňujúci programovo určiť, či objednávka vyžaduje faktúru KSeF.

```php
/**
 * @param bool     $is_required Czy faktura KSeF jest wymagana.
 * @param WC_Order $order       Obiekt zamówienia.
 * @return bool
 */
add_filter('polski/ksef/is_required', function (bool $is_required, WC_Order $order): bool {
    // Przykład: wymagaj faktury KSeF dla zamówień powyżej 450 PLN
    if ($order->get_total() > 450) {
        return true;
    }
    
    return $is_required;
}, 10, 2);
```

### Príklad - automatické označenie stavu po integrácii

```php
/**
 * Aktualizuj status KSeF po otrzymaniu odpowiedzi z systemu fakturowania.
 */
add_action('my_invoicing/invoice_created', function (int $order_id, string $ksef_number): void {
    $order = wc_get_order($order_id);
    if (!$order) {
        return;
    }
    
    $order->update_meta_data('_ksef_status', 'issued');
    $order->update_meta_data('_ksef_number', $ksef_number);
    $order->add_order_note(
        sprintf('Faktura wystawiona w KSeF. Numer KSeF: %s', $ksef_number)
    );
    $order->save();
}, 10, 2);
```

## Meta-údaje objednávky

Modul KSeF ukladá nasledujúce meta-údaje v objednávke:

| Kľúč meta | Popis |
|------------|------|
| `_billing_nip` | Číslo NIP zákazníka |
| `_billing_company` | Názov firmy |
| `_ksef_required` | Či objednávka vyžaduje faktúru (`yes`/`no`) |
| `_ksef_status` | Stav faktúry (`pending`, `issued`, `error`) |
| `_ksef_number` | Číslo KSeF faktúry (po vystavení) |
| `_ksef_invoice_id` | ID faktúry v externom systéme |

## Konfigurácia

Nastavenia modulu KSeF: **WooCommerce > Nastavenia > Polski > KSeF**.

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| Zapnúť modul KSeF | Aktivuje detekciu a sledovanie | Áno |
| Online validácia NIP | Kontrolovať NIP v API GUS/VIES | Nie |
| Auto-sťahovanie firemných údajov | Sťahovať údaje z GUS po zadaní NIP | Nie |
| Stav spúšťajúci hook | Stav objednávky, pri ktorom vyvolať `invoice_ready` | `processing` |

## Riešenie problémov

**Stĺpec KSeF sa nezobrazuje v zozname objednávok**
Kliknite na "Možnosti obrazovky" a zaškrtnite stĺpec KSeF. Uistite sa, že modul je zapnutý v nastaveniach.

**NIP sa neukladá do objednávky**
Skontrolujte, či pole NIP je zapnuté v module Checkout (**WooCommerce > Nastavenia > Polski > Pokladňa**). Pole NIP musí byť aktívne, aby ho zákazník mohol vyplniť.

**Hook invoice_ready sa nevolá**
Skontrolujte nastavenie "Stav spúšťajúci hook". Štandardne je hook volaný pri zmene stavu objednávky na "Spracovávaná". Ak používate neštandardné stavy, zmeňte túto možnosť.

## Ďalšie kroky

- Nahlasovanie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
