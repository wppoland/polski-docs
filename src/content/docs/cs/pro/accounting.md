---
title: Účetní integrace
description: Integrace s účetními systémy wFirma, Fakturownia a iFirma v Polski PRO for WooCommerce - synchronizace faktur, retry logika a konfigurace pro jednotlivé poskytovatele.
---

Modul propojuje WooCommerce s polskými fakturačními systémy: wFirma, Fakturownia a iFirma. Faktury se odesílají automaticky, s opakováním při chybách API.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Navíc je vyžadován aktivní účet ve vybraném účetním systému s přístupem k API.
:::

## Podporované systémy

| Systém | Formát API | Verze API | Ověřování |
|--------|-----------|------------|-------------------|
| wFirma | XML | v2 | API key + API secret |
| Fakturownia | JSON | v3 | API token |
| iFirma | JSON | v1 | Login + API key (klíč faktur) |

Současně může být aktivní pouze jedna integrace.

## Konfigurace

Přejděte na **WooCommerce > Nastavení > Polski PRO > Účetnictví**.

### Výběr poskytovatele

Vyberte účetní systém a zadejte přihlašovací údaje.

#### wFirma

| Nastavení | Popis |
|------------|------|
| API key | Klíč API z panelu wFirma |
| API secret | API secret |
| ID firmy | Identifikátor firmy ve wFirma |
| Série faktur | Série číslování (např. "FV", "FVS") |

#### Fakturownia

| Nastavení | Popis |
|------------|------|
| Subdoména | Název subdomény (např. `mojafirma.fakturownia.pl`) |
| API token | Token API z nastavení účtu |
| ID oddělení | Volitelně - ID oddělení vystavujícího faktury |
| Jazyk faktury | `pl` nebo `en` |

#### iFirma

| Nastavení | Popis |
|------------|------|
| Login | Login k účtu iFirma |
| Klíč API faktur | Klíč API pro vystavování faktur |
| Klíč API předplatitele | Klíč API předplatitele (pro načítání dat) |

### Společná nastavení

| Nastavení | Výchozí hodnota | Popis |
|------------|------------------|------|
| Automatické vystavování | Ano | Vystavit fakturu automaticky po zaplacení objednávky |
| Spouštěcí stav | `processing` | Stav objednávky spouštějící vystavení faktury |
| Typ dokumentu | Faktura VAT | Faktura VAT, Proforma faktura, Účet |
| Přidat do e-mailu | Ano | Připojit PDF faktury k e-mailu objednávky |
| Retry při chybě | Ano | Opakovat pokus při chybě API |
| Maximální počet pokusů | 5 | Limit opakovaných pokusů |

## Synchronizace faktur

### Automatický průběh

1. Objednávka WooCommerce změní stav na `processing` (nebo jiný nakonfigurovaný)
2. Modul shromáždí data objednávky a namapuje je na formát poskytovatele
3. Data jsou odeslána asynchronně do API účetního systému
4. Po úspěšném vytvoření je ID faktury uloženo do meta objednávky
5. PDF faktury je staženo a připojeno k e-mailu zákazníka

### Mapování dat

Modul automaticky převádí data objednávky do formátu API:

| Data WooCommerce | wFirma (XML) | Fakturownia (JSON) | iFirma (JSON) |
|------------------|-------------|-------------------|---------------|
| Název firmy | `<contractor><name>` | `buyer_name` | `Kontrahent.Nazwa` |
| NIP | `<contractor><nip>` | `buyer_tax_no` | `Kontrahent.NIP` |
| Adresa | `<contractor><street>` | `buyer_street` | `Kontrahent.Ulica` |
| Položky objednávky | `<invoicecontents>` | `positions` | `Pozycje` |
| Sazba DPH | `<vat_code>` | `tax` | `StawkaVat` |
| Platební metoda | `<paymentmethod>` | `payment_type` | `SposobZaplaty` |

### Formát XML (wFirma)

```xml
<api>
  <invoices>
    <invoice>
      <contractor>
        <name>Firma Testowa Sp. z o.o.</name>
        <nip>1234567890</nip>
        <street>ul. Testowa 1</street>
        <city>Warszawa</city>
        <zip>00-001</zip>
      </contractor>
      <invoicecontents>
        <invoicecontent>
          <name>Produkt testowy</name>
          <unit>szt.</unit>
          <count>2</count>
          <price>100.00</price>
          <vat_code>23</vat_code>
        </invoicecontent>
      </invoicecontents>
      <paymentmethod>transfer</paymentmethod>
      <paymentdate>2026-04-12</paymentdate>
    </invoice>
  </invoices>
</api>
```

### Formát JSON (Fakturownia)

```json
{
  "invoice": {
    "kind": "vat",
    "number": null,
    "buyer_name": "Firma Testowa Sp. z o.o.",
    "buyer_tax_no": "1234567890",
    "buyer_street": "ul. Testowa 1",
    "buyer_city": "Warszawa",
    "buyer_post_code": "00-001",
    "positions": [
      {
        "name": "Produkt testowy",
        "quantity": 2,
        "total_price_gross": "246.00",
        "tax": "23"
      }
    ],
    "payment_type": "transfer",
    "payment_to": "2026-04-12"
  }
}
```

## Mechanismus retry

### Exponential backoff

Při serverových chybách (HTTP 5xx, timeout) modul opakuje pokus s rostoucím zpožděním:

| Pokus | Zpoždění | Čas od prvního pokusu |
|-------|------------|------------------------|
| 1 | Okamžitě | 0 s |
| 2 | 30 s | 30 s |
| 3 | 2 min | 2 min 30 s |
| 4 | 8 min | 10 min 30 s |
| 5 | 32 min | 42 min 30 s |

Zpoždění se počítá vzorcem: `delay = base_delay * 2^(attempt - 1)`, kde `base_delay = 30 sekund`.

### Chyby nepodléhající retry

Klientské chyby (HTTP 4xx) se neopakují - poukazují na problém s daty:

- `400 Bad Request` - nesprávná data
- `401 Unauthorized` - chybný API token
- `403 Forbidden` - chybějící oprávnění
- `422 Unprocessable Entity` - validace dat

Tyto chyby vyžadují ruční opravu.

### Asynchronní odesílání

Faktury jsou odesílány na pozadí pomocí `WC_Action_Scheduler`. Zákazník vidí potvrzení objednávky ihned a faktura se generuje na pozadí.

```php
/**
 * Akce volaná po úspěšném vystavení faktury.
 *
 * @param int    $order_id   ID objednávky
 * @param string $invoice_id ID faktury v účetním systému
 * @param string $provider   Název poskytovatele ('wfirma', 'fakturownia', 'ifirma')
 */
do_action('polski_pro/accounting/invoice_created', int $order_id, string $invoice_id, string $provider);
```

**Příklad - logování do externího systému:**

```php
add_action('polski_pro/accounting/invoice_created', function (
    int $order_id,
    string $invoice_id,
    string $provider
): void {
    error_log(sprintf(
        '[Polski PRO] Faktura %s vystavena v %s pro objednávku #%d',
        $invoice_id,
        $provider,
        $order_id
    ));
}, 10, 3);
```

### Hook chyby

```php
/**
 * Akce volaná po vyčerpání pokusů o odeslání faktury.
 *
 * @param int    $order_id   ID objednávky
 * @param string $provider   Název poskytovatele
 * @param string $error      Chybová zpráva
 * @param int    $attempts   Počet provedených pokusů
 */
do_action('polski_pro/accounting/invoice_failed', int $order_id, string $provider, string $error, int $attempts);
```

**Příklad - upozornění administrátora:**

```php
add_action('polski_pro/accounting/invoice_failed', function (
    int $order_id,
    string $provider,
    string $error,
    int $attempts
): void {
    $admin_email = get_option('admin_email');
    wp_mail(
        $admin_email,
        sprintf('Chyba vystavení faktury - objednávka #%d', $order_id),
        sprintf(
            "Nepodařilo se vystavit fakturu v %s po %d pokusech.\n\nChyba: %s\n\nZkontrolujte objednávku: %s",
            $provider,
            $attempts,
            $error,
            admin_url(sprintf('post.php?post=%d&action=edit', $order_id))
        )
    );
}, 10, 4);
```

## Filtr dat faktury

```php
/**
 * Filtruje data faktury před odesláním do API.
 *
 * @param array     $invoice_data Data faktury ve formátu poskytovatele
 * @param \WC_Order $order        Objednávka WooCommerce
 * @param string    $provider     Název poskytovatele
 */
apply_filters('polski_pro/accounting/invoice_data', array $invoice_data, \WC_Order $order, string $provider): array;
```

**Příklad - přidání poznámky k faktuře:**

```php
add_filter('polski_pro/accounting/invoice_data', function (
    array $invoice_data,
    \WC_Order $order,
    string $provider
): array {
    if ($provider === 'fakturownia') {
        $invoice_data['invoice']['description'] = sprintf(
            'Internetová objednávka #%s',
            $order->get_order_number()
        );
    }
    return $invoice_data;
}, 10, 3);
```

## Panel administrátora

### Stav synchronizace

V seznamu objednávek sloupec "Faktura" zobrazuje:

- Zelená ikona - faktura úspěšně vystavena
- Žlutá ikona - probíhá odesílání / retry
- Červená ikona - chyba (klikněte pro zobrazení detailů)
- Šedá ikona - netýká se (bez automatického vystavování)

### Ruční vystavování

V panelu **Faktura** na stránce objednávky může administrátor:

1. Vystavit fakturu ručně (pokud automatické vystavování selhalo)
2. Stáhnout PDF faktury
3. Znovu odeslat fakturu
4. Zobrazit log pokusů a chyb

## Řešení problémů

**Faktura se nevystavuje automaticky**
Zkontrolujte, zda je spouštěcí stav správný. Ujistěte se, že Action Scheduler funguje (WooCommerce > Stav > Naplánované akce). Zkontrolujte log chyb v **WooCommerce > Stav > Logy**.

**Chyba "Unauthorized" při připojení k API**
Ověřte přihlašovací údaje. V případě wFirma zkontrolujte, zda jsou API key a secret z hlavního účtu (nikoli podúčtu). U Fakturownia se ujistěte, že je subdoména správná.

**Duplicitní faktury**
Modul před vystavením kontroluje meta `_polski_pro_invoice_id`, aby se zabránilo duplicitám. Pokud se duplicity vyskytují, zkontrolujte, zda jiný plugin nespouští stejný hook.

## Další kroky

- Nahlašte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Související: [PRO REST API](/pro/pro-api)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
