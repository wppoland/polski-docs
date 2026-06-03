---
title: KSeF - Národní systém e-faktur
description: Připravenost na KSeF v Polski for WooCommerce - automatická detekce objednávek s NIP, sloupec stavu, vývojářské hooky a integrace s fakturačními systémy.
---

KSeF je platforma polského Ministerstva financí pro strukturované faktury. Plugin připravuje obchod na integraci s KSeF, detekuje objednávky vyžadující fakturu s DPH, přidává sloupec stavu a hooky pro propojení s fakturačními systémy.

## Právní stav KSeF

KSeF je ve fázi zavádění. Plugin nevystavuje faktury v KSeF, ale usnadňuje integraci se systémy, které to dělají (např. Fakturownia, iFirma, wFirma, InFakt).

Hlavní funkce modulu KSeF:

1. Automatická detekce objednávek s číslem NIP
2. Sloupec stavu KSeF na seznamu objednávek
3. Hooky pro integraci s externími fakturačními systémy
4. Meta-data objednávky připravená k předání do systému KSeF

## Detekce objednávek s NIP

Když zákazník při zadávání objednávky uvede NIP (pole NIP je součástí modulu Checkout), plugin automaticky:

1. Validuje formát NIP (10 číslic, kontrola kontrolního součtu)
2. Označí objednávku jako vyžadující fakturu s DPH
3. Uloží NIP do meta-dat objednávky
4. Volitelně stáhne údaje firmy z API GUS/CEIDG

### Validace NIP

Plugin kontroluje správnost NIP na dvou úrovních:

- **Formát** - 10 číslic, správný kontrolní součet (váhy: 6, 5, 7, 2, 3, 4, 5, 6, 7)
- **Online ověření** - volitelná kontrola v databázi VIES (pro NIP z EU) nebo API GUS

## Sloupec stavu KSeF

Na seznamu objednávek (**WooCommerce > Objednávky**) se zobrazuje sloupec **KSeF** s ikonami stavu:

| Ikona | Stav | Popis |
|-------|--------|------|
| Šedá | Netýká se | Objednávka bez NIP, faktura není vyžadována |
| Modrá | Čeká | Objednávka s NIP, faktura k vystavení |
| Zelená | Vystavena | Faktura byla vystavena (stav nastaven přes hook) |
| Červená | Chyba | Vyskytl se problém s vystavením faktury |

Objednávky můžete filtrovat podle stavu KSeF, např. zobrazit pouze čekající na fakturu.

### Hromadné akce

Na seznamu objednávek můžete hromadně označit více objednávek jako "vystaveno v KSeF".

## Hooky

### polski/ksef/invoice_ready

Vyvolán, když je objednávka s NIP zaplacena a připravena k vystavení faktury. Hlavní hook pro integraci s fakturačními systémy.

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

Filtr umožňující programově určit, zda objednávka vyžaduje fakturu KSeF.

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

### Příklad - automatické nastavení stavu po integraci

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

## Meta-data objednávky

Modul KSeF ukládá v objednávce následující meta-data:

| Klíč meta | Popis |
|------------|------|
| `_billing_nip` | Číslo NIP zákazníka |
| `_billing_company` | Název firmy |
| `_ksef_required` | Zda objednávka vyžaduje fakturu (`yes`/`no`) |
| `_ksef_status` | Stav faktury (`pending`, `issued`, `error`) |
| `_ksef_number` | Číslo KSeF faktury (po vystavení) |
| `_ksef_invoice_id` | ID faktury v externím systému |

## Konfigurace

Nastavení modulu KSeF: **WooCommerce > Nastavení > Polski > KSeF**.

| Možnost | Popis | Výchozí hodnota |
|-------|------|------------------|
| Zapnout modul KSeF | Aktivuje detekci a sledování | Ano |
| Online validace NIP | Ověřovat NIP v API GUS/VIES | Ne |
| Auto-stahování údajů firmy | Stahovat data z GUS po zadání NIP | Ne |
| Stav vyvolávající hook | Stav objednávky, při kterém vyvolat `invoice_ready` | `processing` |

## Řešení problémů

**Sloupec KSeF se nezobrazuje na seznamu objednávek**
Klikněte na "Možnosti obrazovky" a zaškrtněte sloupec KSeF. Ujistěte se, že je modul zapnutý v nastavení.

**NIP se neukládá v objednávce**
Zkontrolujte, zda je pole NIP zapnuté v **WooCommerce > Nastavení > Polski > Pokladna**. Pole musí být aktivní, aby jej zákazník mohl vyplnit.

**Hook invoice_ready se nevyvolává**
Zkontrolujte "Stav vyvolávající hook". Ve výchozím stavu hook funguje při stavu "Zpracovává se". Při nestandardních stavech tuto možnost změňte.

## Další kroky

- Nahlašujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a dotazy: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
