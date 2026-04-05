---
title: KSeF - Krajovy system e-faktur
description: Pripravenost na KSeF v Polski for WooCommerce - automaticka detekce objednavek s NIP, sloupec stavu, vyvojarske hooky a integrace s fakturacnimi systemy.
---

Krajovy system e-faktur (KSeF) je platforma Ministerstva financi pro vystavovani a prijem strukturovanych faktur. Polski for WooCommerce pripravuje obchod WooCommerce na integraci s KSeF prostrednictvim automaticke detekce objednavek vyzadujicich fakturu s DPH, sloupce stavu v administracnim panelu a hooku umoznujicich integraci s externimi fakturacnimi systemy.

## Pravni stav KSeF

KSeF je v soucasnosti ve fazi zavadeni. Plugin Polski for WooCommerce nevystavuje faktury primo v KSeF, ale dodava infrastrukturu usnadnujici integraci se systemy, ktere to delaji (napr. Fakturownia, iFirma, wFirma, InFakt).

Hlavni funkce modulu KSeF:

1. Automaticka detekce objednavek s cislem NIP
2. Sloupec stavu KSeF na seznamu objednavek
3. Hooky pro integraci s externimi fakturacnimi systemy
4. Meta-data objednavky pripravena pro predani systemu KSeF

## Detekce objednavek s NIP

Kdyz zakaznik uvede cislo NIP behem skladani objednavky (pole NIP je soucasti modulu Checkout pluginu), system automaticky:

1. Validuje format NIP (10 cislic, kontrola kontrolniho souctu)
2. Oznaci objednavku jako vyzadujici fakturu s DPH
3. Ulozi NIP v meta-datech objednavky
4. Volitelne stahne udaje firmy z API GUS/CEIDG

### Validace NIP

Plugin kontroluje spravnost NIP na dvou urovnich:

- **Format** - 10 cislic, spravny kontrolni soucet (vahy: 6, 5, 7, 2, 3, 4, 5, 6, 7)
- **Online overeni** - volitelna kontrola v databazi VIES (pro NIP-y EU) nebo API GUS

## Sloupec stavu KSeF

Na seznamu objednavek (**WooCommerce > Objednavky**) plugin pridava sloupec **KSeF** s ikonami stavu:

| Ikona | Stav | Popis |
|-------|--------|------|
| Seda | Netyka se | Objednavka bez NIP, faktura neni vyzadovana |
| Modra | Ceka | Objednavka s NIP, faktura k vystaveni |
| Zelena | Vystavena | Faktura byla vystavena (stav nastaven pres hook) |
| Cervena | Chyba | Vyskytl se problem s vystavenim faktury |

Stav lze filtrovat - pouzijte filtr na seznamu objednavek pro zobrazeni napr. pouze objednavek cekajicich na fakturu.

### Hromadne akce

Na seznamu objednavek je dostupna hromadna akce "Oznacit jako vystaveno v KSeF", umoznujici aktualizovat stav vice objednavek soucasne.

## Hooky

### polski/ksef/invoice_ready

Vyvolan, kdyz objednavka s NIP je zaplacena a je pripravena k vystaveni faktury. Toto je hlavni hook pro integraci s externimi fakturacnimi systemy.

```php
/**
 * @param int      $order_id   ID zamówienia WooCommerce.
 * @param WC_Order $order      Obiekt zamówienia.
 * @param string   $nip        Numer NIP klienta.
 * @param array    $invoice_data Dane do faktury (nazwa firmy, adres, NIP).
 */
add_action('polski/ksef/invoice_ready', function (int $order_id, WC_Order $order, string $nip, array $invoice_data): void {
    // Priklad: odeslat data do API Fakturowni
    $api_token = get_option('fakturownia_api_token');
    $account = get_option('fakturownia_account');
    
    $invoice_payload = [
        'invoice' => [
            'kind'             => 'vat',
            'number'           => null, // auto-cislovani
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

Filtr umoznujici programove urcit, zda objednavka vyzaduje fakturu KSeF.

```php
/**
 * @param bool     $is_required Czy faktura KSeF jest wymagana.
 * @param WC_Order $order       Obiekt zamówienia.
 * @return bool
 */
add_filter('polski/ksef/is_required', function (bool $is_required, WC_Order $order): bool {
    // Priklad: vyzadovat fakturu KSeF pro objednavky nad 450 PLN
    if ($order->get_total() > 450) {
        return true;
    }
    
    return $is_required;
}, 10, 2);
```

### Priklad - automaticke nastaveni stavu po integraci

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

## Meta-data objednavky

Modul KSeF uklada nasledujici meta-data v objednavce:

| Klic meta | Popis |
|------------|------|
| `_billing_nip` | Cislo NIP zakaznika |
| `_billing_company` | Nazev firmy |
| `_ksef_required` | Zda objednavka vyzaduje fakturu (`yes`/`no`) |
| `_ksef_status` | Stav faktury (`pending`, `issued`, `error`) |
| `_ksef_number` | Cislo KSeF faktury (po vystaveni) |
| `_ksef_invoice_id` | ID faktury v externim systemu |

## Konfigurace

Nastaveni modulu KSeF: **WooCommerce > Nastaveni > Polski > KSeF**.

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| Aktivovat modul KSeF | Aktivuje detekci a sledovani | Ano |
| Online validace NIP | Overovat NIP v API GUS/VIES | Ne |
| Auto-stahovani udaju firmy | Stahovat data z GUS po zadani NIP | Ne |
| Stav vyvolavajici hook | Stav objednavky, pri kterem vyvolat `invoice_ready` | `processing` |

## Reseni problemu

**Sloupec KSeF se nezobrazuje na seznamu objednavek**
Kliknete "Moznosti obrazovky" a zaznacte sloupec KSeF. Ujistete se, ze modul je aktivovan v nastaveních.

**NIP se neuklada v objednavce**
Zkontrolujte, zda pole NIP je aktivovano v modulu Checkout (**WooCommerce > Nastaveni > Polski > Pokladna**). Pole NIP musi byt aktivni, aby jej zakaznik mohl vyplnit.

**Hook invoice_ready se nevyvolava**
Zkontrolujte nastaveni "Stav vyvolavajici hook". Ve vychozim stavu je hook vyvolan pri zmene stavu objednavky na "Probihajici". Pokud pouzivate nestandardni stavy, zmente tuto moznost.

## Dalsi kroky

- Hlaseni problemu: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a otazky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
