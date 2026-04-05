---
title: Ucetni integrace
description: Integrace s ucetnimi systemy wFirma, Fakturownia a iFirma v Polski PRO for WooCommerce - synchronizace faktur, retry logika a konfigurace pro jednotlive poskytovatele.
---

Modul ucetnich integraci propojuje WooCommerce s popularnich polskymi fakturacnimi systemy: wFirma, Fakturownia a iFirma. Faktury jsou odesilany automaticky po zlozeni objednavky, s mechanismem opakovanych pokusu (retry) a exponencialnim zpozdemim (exponential backoff) v pripade chyb API.

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Navic je vyzadovan aktivni ucet ve zvolenem ucetnim systemu s pristupem k API.
:::

## Podporovane systemy

| System | Format API | Verze API | Autentizace |
|--------|-----------|-----------|-------------|
| wFirma | XML | v2 | API key + API secret |
| Fakturownia | JSON | v3 | API token |
| iFirma | JSON | v1 | Login + API key (klic faktur) |

V danem okamziku muze byt aktivni pouze jedna ucetni integrace.

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski PRO > Ucetnictvi**.

### Vyber poskytovatele

Vyberte ucetni system a zadejte autentizacni udaje.

#### wFirma

| Nastaveni | Popis |
|-----------|-------|
| API key | Klic API z panelu wFirma |
| API secret | Secret API |
| ID firmy | Identifikator firmy ve wFirma |
| Serie faktur | Serie cislovani (napr. "FV", "FVS") |

#### Fakturownia

| Nastaveni | Popis |
|-----------|-------|
| Subdomena | Nazev subdomeny (napr. `mojafirma.fakturownia.pl`) |
| API token | Token API z nastaveni uctu |
| ID oddeleni | Volitelne - ID oddeleni vystavujiciho faktury |
| Jazyk faktury | `pl` nebo `en` |

#### iFirma

| Nastaveni | Popis |
|-----------|-------|
| Login | Login k uctu iFirma |
| Klic API faktur | Klic API pro vystavovani faktur |
| Klic API abonenta | Klic API abonenta (pro ziskavani dat) |

### Spolecna nastaveni

| Nastaveni | Vychozi hodnota | Popis |
|-----------|-----------------|-------|
| Automaticke vystavovani | Ano | Vystavit fakturu automaticky po zaplaceni objednavky |
| Spousteci status | `processing` | Status objednavky spoustejici vystaveni faktury |
| Typ dokumentu | Faktura DPH | Faktura DPH, Proforma faktura, Uctenka |
| Pridat do e-mailu | Ano | Prilozit PDF faktury k e-mailu objednavky |
| Retry pri chybe | Ano | Opakovat pokus pri chybe API |
| Maximalni pocet pokusu | 5 | Limit opakovanych pokusu |

## Synchronizace faktur

### Automaticky tok

1. Objednavka WooCommerce zmeni status na `processing` (nebo jiny nastaveny)
2. Modul shromazdi data objednavky a namapuje je na format poskytovatele
3. Data jsou odeslana asynchronne do API ucetniho systemu
4. Po uspesnem vytvoreni je ID faktury ulozeno v meta objednavky
5. PDF faktury je stazeno a prilozeno k e-mailu zakaznika

### Mapovani dat

Modul automaticky mapuje data objednavky WooCommerce na pozadovany format API:

| Data WooCommerce | wFirma (XML) | Fakturownia (JSON) | iFirma (JSON) |
|------------------|-------------|-------------------|---------------|
| Nazev firmy | `<contractor><name>` | `buyer_name` | `Kontrahent.Nazwa` |
| DIC | `<contractor><nip>` | `buyer_tax_no` | `Kontrahent.NIP` |
| Adresa | `<contractor><street>` | `buyer_street` | `Kontrahent.Ulica` |
| Polozky objednavky | `<invoicecontents>` | `positions` | `Pozycje` |
| Sazba DPH | `<vat_code>` | `tax` | `StawkaVat` |
| Zpusob platby | `<paymentmethod>` | `payment_type` | `SposobZaplaty` |

### Format XML (wFirma)

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

### Format JSON (Fakturownia)

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

Kdyz API vraci chybu (HTTP 5xx, timeout, chyba pripojeni), modul automaticky planuje opakovanej pokus s exponencialnim zpozdemim:

| Pokus | Zpozdeni | Cas od prvniho pokusu |
|-------|----------|----------------------|
| 1 | Okamzite | 0 s |
| 2 | 30 s | 30 s |
| 3 | 2 min | 2 min 30 s |
| 4 | 8 min | 10 min 30 s |
| 5 | 32 min | 42 min 30 s |

Zpozdeni je vypocitano vzorcem: `delay = base_delay * 2^(attempt - 1)`, kde `base_delay = 30 sekund`.

### Chyby nepodlehajici retry

Chyby klienta (HTTP 4xx) nejsou opakovany automaticky, protoze ukazuji na problem s daty, ne s API:

- `400 Bad Request` - neplatna data
- `401 Unauthorized` - chybny API token
- `403 Forbidden` - nedostatecna opravneni
- `422 Unprocessable Entity` - validace dat

Tyto chyby jsou logovany a vyzaduji zasah administratora.

### Asynchronni odesilani

Faktury jsou odesilany asynchronne pomoci `WC_Action_Scheduler`, coz znamena, ze neblokyji proces vytvareni objednavky. Zakaznik vidi potvrzeni objednavky okamzite a faktura je generovana na pozadi.

```php
/**
 * Akcja wywoływana po pomyślnym wystawieniu faktury.
 *
 * @param int    $order_id   ID zamówienia
 * @param string $invoice_id ID faktury w systemie księgowym
 * @param string $provider   Nazwa dostawcy ('wfirma', 'fakturownia', 'ifirma')
 */
do_action('polski_pro/accounting/invoice_created', int $order_id, string $invoice_id, string $provider);
```

**Priklad - logovani do externiho systemu:**

```php
add_action('polski_pro/accounting/invoice_created', function (
    int $order_id,
    string $invoice_id,
    string $provider
): void {
    error_log(sprintf(
        '[Polski PRO] Faktura %s wystawiona w %s dla zamówienia #%d',
        $invoice_id,
        $provider,
        $order_id
    ));
}, 10, 3);
```

### Hook chyby

```php
/**
 * Akcja wywoływana po wyczerpaniu prób wysłania faktury.
 *
 * @param int    $order_id   ID zamówienia
 * @param string $provider   Nazwa dostawcy
 * @param string $error      Komunikat błędu
 * @param int    $attempts   Liczba wykonanych prób
 */
do_action('polski_pro/accounting/invoice_failed', int $order_id, string $provider, string $error, int $attempts);
```

**Priklad - oznameni administratorovi:**

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
        sprintf('Błąd wystawienia faktury - zamówienie #%d', $order_id),
        sprintf(
            "Nie udało się wystawić faktury w %s po %d próbach.\n\nBłąd: %s\n\nSprawdź zamówienie: %s",
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
 * Filtruje dane faktury przed wysłaniem do API.
 *
 * @param array     $invoice_data Dane faktury w formacie dostawcy
 * @param \WC_Order $order        Zamówienie WooCommerce
 * @param string    $provider     Nazwa dostawcy
 */
apply_filters('polski_pro/accounting/invoice_data', array $invoice_data, \WC_Order $order, string $provider): array;
```

**Priklad - pridani poznamek k fakture:**

```php
add_filter('polski_pro/accounting/invoice_data', function (
    array $invoice_data,
    \WC_Order $order,
    string $provider
): array {
    if ($provider === 'fakturownia') {
        $invoice_data['invoice']['description'] = sprintf(
            'Zamówienie internetowe #%s',
            $order->get_order_number()
        );
    }
    return $invoice_data;
}, 10, 3);
```

## Administracni panel

### Status synchronizace

Na seznamu objednavek WooCommerce je pridan sloupec "Faktura" zobrazujici:

- Zelena ikona - faktura uspesne vystavena
- Zluta ikona - probiha odesilani / retry
- Cervena ikona - chyba (kliknete pro zobrazeni detailu)
- Seda ikona - netyka se (bez automatickeho vystavovani)

### Rucni vystavovani

Na strance upravy objednavky, v panelu **Faktura**, administrator muze:

1. Vystavit fakturu rucne (pokud automaticke vystavovani selhalo)
2. Stahnout PDF faktury
3. Opakovat odeslani faktury
4. Zobrazit log pokusu a chyb

## Reseni problemu

**Faktura se nevystavuje automaticky**
Zkontrolujte, ze spousteci status je spravny. Ujistete se, ze Action Scheduler funguje (WooCommerce > Stav > Naplanovane akce). Zkontrolujte log chyb v **WooCommerce > Stav > Logy**.

**Chyba "Unauthorized" pri pripojeni k API**
Overite autentizacni udaje. V pripade wFirma zkontrolujte, ze API key a secret jsou z hlavniho uctu (ne poductu). U Fakturownia se ujistete, ze subdomena je spravna.

**Duplikaty faktur**
Modul zabezpecuje proti duplikatum kontrolou meta `_polski_pro_invoice_id` pred vystavenim. Pokud se duplikaty vyskytuji, zkontrolujte, ze jiny plugin nespousti stejny hook objednavky.

## Dalsi kroky

- Hlaste problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Souvisejici: [PRO REST API](/pro/pro-api)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
