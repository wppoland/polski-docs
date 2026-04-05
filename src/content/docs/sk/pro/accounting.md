---
title: Účtovné integrácie
description: Integrácie s účtovnými systémami wFirma, Fakturownia a iFirma v Polski PRO for WooCommerce - synchronizácia faktúr, retry logika a konfigurácia per poskytovateľ.
---

Modul účtovných integrácií prepája WooCommerce s populárnymi poľskými fakturačnými systémami: wFirma, Fakturownia a iFirma. Faktúry sú odosielané automaticky po vytvorení objednávky, s mechanizmom opakovania (retry) a exponenciálnym oneskorením (exponential backoff) v prípade chýb API.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Dodatočne je potrebný aktívny účet vo vybranom účtovnom systéme s prístupom k API.
:::

## Podporované systémy

| Systém | Formát API | Verzia API | Autentifikácia |
|--------|-----------|------------|-------------------|
| wFirma | XML | v2 | API key + API secret |
| Fakturownia | JSON | v3 | API token |
| iFirma | JSON | v1 | Login + API key (kľúč faktúr) |

V danom momente môže byť aktívna iba jedna účtovná integrácia.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Účtovníctvo**.

### Výber poskytovateľa

Vyberte účtovný systém a zadajte autentifikačné údaje.

#### wFirma

| Nastavenie | Popis |
|------------|------|
| API key | Kľúč API z panelu wFirma |
| API secret | Secret API |
| ID firmy | Identifikátor firmy vo wFirma |
| Séria faktúr | Séria číslovania (napr. "FV", "FVS") |

#### Fakturownia

| Nastavenie | Popis |
|------------|------|
| Subdoména | Názov subdomény (napr. `mojafirma.fakturownia.pl`) |
| API token | Token API z nastavení účtu |
| ID oddelenia | Voliteľne - ID oddelenia vystavujúceho faktúry |
| Jazyk faktúry | `pl` alebo `en` |

#### iFirma

| Nastavenie | Popis |
|------------|------|
| Login | Login do účtu iFirma |
| Kľúč API faktúr | Kľúč API na vystavovanie faktúr |
| Kľúč API predplatiteľa | Kľúč API predplatiteľa (na načítavanie dát) |

### Spoločné nastavenia

| Nastavenie | Predvolená hodnota | Popis |
|------------|------------------|------|
| Automatické vystavovanie | Áno | Vystaviť faktúru automaticky po uhradení objednávky |
| Spúšťací stav | `processing` | Stav objednávky spúšťajúci vystavenie faktúry |
| Typ dokumentu | Faktúra s DPH | Faktúra s DPH, Proforma faktúra, Účet |
| Pridať k e-mailu | Áno | Priložiť PDF faktúry k e-mailu objednávky |
| Retry pri chybe | Áno | Opakovať pokus pri chybe API |
| Maximálny počet pokusov | 5 | Limit opakovaných pokusov |

## Synchronizácia faktúr

### Automatický priebeh

1. Objednávka WooCommerce zmení stav na `processing` (alebo iný nakonfigurovaný)
2. Modul zozbiera dáta objednávky a namapuje ich na formát poskytovateľa
3. Dáta sú odoslané asynchrónne na API účtovného systému
4. Po úspešnom vytvorení sa ID faktúry uloží do metadát objednávky
5. PDF faktúry sa stiahne a priloží k e-mailu zákazníka

### Mapovanie dát

Modul automaticky mapuje dáta objednávky WooCommerce na požadovaný formát API:

| Dáta WooCommerce | wFirma (XML) | Fakturownia (JSON) | iFirma (JSON) |
|------------------|-------------|-------------------|---------------|
| Názov firmy | `<contractor><name>` | `buyer_name` | `Kontrahent.Nazwa` |
| IČ DPH | `<contractor><nip>` | `buyer_tax_no` | `Kontrahent.NIP` |
| Adresa | `<contractor><street>` | `buyer_street` | `Kontrahent.Ulica` |
| Položky objednávky | `<invoicecontents>` | `positions` | `Pozycje` |
| Sadzba DPH | `<vat_code>` | `tax` | `StawkaVat` |
| Platobná metóda | `<paymentmethod>` | `payment_type` | `SposobZaplaty` |

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

## Mechanizmus retry

### Exponential backoff

Keď API vráti chybu (HTTP 5xx, timeout, chyba pripojenia), modul automaticky naplánuje opakovaný pokus s exponenciálnym oneskorením:

| Pokus | Oneskorenie | Čas od prvého pokusu |
|-------|------------|------------------------|
| 1 | Okamžite | 0 s |
| 2 | 30 s | 30 s |
| 3 | 2 min | 2 min 30 s |
| 4 | 8 min | 10 min 30 s |
| 5 | 32 min | 42 min 30 s |

Oneskorenie sa počíta vzorcom: `delay = base_delay * 2^(attempt - 1)`, kde `base_delay = 30 sekúnd`.

### Chyby nepodliehajúce retry

Chyby klienta (HTTP 4xx) sa neopakujú automaticky, pretože indikujú problém s dátami, nie s API:

- `400 Bad Request` - neplatné dáta
- `401 Unauthorized` - chybný token API
- `403 Forbidden` - chýbajúce oprávnenia
- `422 Unprocessable Entity` - validácia dát

Tieto chyby sú logované a vyžadujú zásah administrátora.

### Asynchrónne odosielanie

Faktúry sa odosielajú asynchrónne pomocou `WC_Action_Scheduler`, čo znamená, že neblokujú proces skladania objednávky. Zákazník vidí potvrdenie objednávky ihneď a faktúra sa generuje na pozadí.

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

**Príklad - logovanie do externého systému:**

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

**Príklad - notifikácia administrátora:**

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

## Filter dát faktúry

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

**Príklad - pridanie poznámok k faktúre:**

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

## Administračný panel

### Stav synchronizácie

Na zozname objednávok WooCommerce je pridaný stĺpec "Faktúra" zobrazujúci:

- Zelená ikona - faktúra úspešne vystavená
- Žltá ikona - v procese odosielania / retry
- Červená ikona - chyba (kliknite pre podrobnosti)
- Sivá ikona - netýka sa (bez automatického vystavovania)

### Ručné vystavovanie

Na stránke úpravy objednávky, v paneli **Faktúra**, administrátor môže:

1. Vystaviť faktúru ručne (ak automatické vystavovanie zlyhalo)
2. Stiahnuť PDF faktúry
3. Zopakovať odoslanie faktúry
4. Zobraziť log pokusov a chýb

## Riešenie problémov

**Faktúra sa nevystavuje automaticky**
Skontrolujte, či je spúšťací stav správny. Uistite sa, že Action Scheduler funguje (WooCommerce > Stav > Naplánované akcie). Skontrolujte log chýb v **WooCommerce > Stav > Logy**.

**Chyba "Unauthorized" pri pripojení k API**
Overte autentifikačné údaje. V prípade wFirma skontrolujte, či API key a secret sú z hlavného účtu (nie podúčtu). Vo Fakturowni sa uistite, že subdoména je správna.

**Duplikáty faktúr**
Modul chráni pred duplikátmi kontrolou meta `_polski_pro_invoice_id` pred vystavením. Ak duplikáty vznikajú, skontrolujte, či iný plugin nespúšťa ten istý hook objednávky.

## Ďalšie kroky

- Hlásenie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Súvisiace: [PRO REST API](/pro/pro-api)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
