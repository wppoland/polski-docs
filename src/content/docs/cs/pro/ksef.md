---
title: Integrace s KSeF
description: Dokumentace integrace Polski PRO for WooCommerce s Krajowym Systemem e-Faktur - odesílání faktur, sledování stavů, konfigurace API a zpracování chyb.
---

Modul KSeF odesílá elektronické faktury do Krajowego Systemu e-Faktur (polské Ministerstvo financí). Faktury se odesílají na pozadí, s automatickým opakováním při chybách.

## Co je KSeF

KSeF je platforma polského Ministerstva financí pro zpracování faktur ve formátu XML. Plugin generuje faktury v požadovaném formátu a odesílá je do KSeF.

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Moduly PRO > KSeF**.

### Nastavení připojení

| Nastavení | Popis |
|------------|------|
| Zapnout integraci KSeF | Aktivuje modul |
| Prostředí | Testovací (sandbox) nebo Produkční |
| API klíč (token) | Autorizační token vygenerovaný v portálu KSeF |
| NIP vystavitele | NIP propojený s účtem KSeF |

### Testovací prostředí

KSeF má testovací prostředí (sandbox) pro ověření integrace. Sandbox:

- nevyžaduje skutečný autorizační klíč
- přijímá faktury ve stejném formátu jako produkční prostředí
- neodesílá data na finanční úřad
- je doporučeno pro první testy integrace

Po úspěšných testech přepněte na produkční prostředí a zadejte správný API klíč.

### Získání API tokenu

1. Přihlaste se do portálu KSeF: https://ksef.mf.gov.pl/
2. Přejděte do sekce správy tokenů
3. Vygenerujte nový token s oprávněním k vystavování faktur
4. Zkopírujte token a vložte jej do nastavení pluginu

## Odesílání faktur

### Automatické odesílání

Zapněte **Automatické odesílání do KSeF**, aby plugin odeslal fakturu do KSeF po změně stavu na "Vystavena". Odesílání běží na pozadí přes Action Scheduler.

### Ruční odesílání

V meta boxu "Faktury" klikněte na **Odeslat do KSeF**. Úloha se zařadí do fronty Action Scheduler.

### Asynchronní zpracování

Plugin používá Action Scheduler (vestavěný do WooCommerce) k odesílání na pozadí:

- odesílání neblokuje zpracování objednávky
- faktury se odesílají postupně
- velké množství faktur se zpracovává postupně

## Generování XML

Plugin generuje fakturu ve formátu XML kompatibilním se schématem KSeF (FA(2)). Dokument XML obsahuje:

- záhlaví s datem a typem faktury
- údaje prodávajícího (NIP, název, adresa)
- údaje kupujícího (NIP, název, adresa)
- položky faktury (název, množství, cena bez DPH, sazba DPH, hodnota)
- souhrn s rozčleněním podle sazeb DPH
- informace o platbě

XML se před odesláním validuje. Při chybách validace nebude faktura odeslána a v logu se objeví zpráva.

## Sledování stavu

Po odeslání faktury do KSeF plugin sleduje její stav:

| Stav | Popis |
|--------|------|
| Queued | Faktura přidána do fronty odesílání |
| Submitted | Faktura odeslána do KSeF, čeká na zpracování |
| Accepted | Faktura přijata systémem KSeF, přiděleno číslo KSeF |
| Rejected | Faktura odmítnuta - zkontrolujte chybovou zprávu |
| Error | Chyba komunikace s API KSeF |

Po přijetí plugin uloží číslo KSeF. Je viditelné v panelu objednávky a na PDF.

### Polling stavu

Plugin automaticky kontroluje stav odeslaných faktur každých několik minut (přes Action Scheduler), dokud neobdrží odpověď "Accepted" nebo "Rejected".

## Zpracování chyb a opakování

Při chybách API plugin opakuje pokusy s rostoucím zpožděním (exponential backoff):

| Pokus | Zpoždění |
|-------|-----------|
| 1. opakování | 5 minut |
| 2. opakování | 25 minut |
| 3. opakování | 125 minut |

Po třech neúspěšných pokusech dostane faktura stav "Error". Administrátor obdrží e-mail o neúspěšném odeslání.

Typické příčiny chyb:

- nesprávný nebo vypršený API token
- chyby validace XML (např. chybějící údaje kupujícího)
- dočasná nedostupnost API KSeF
- nesoulad NIP vystavitele s tokenem

## Hooky

### `polski_pro_ksef_submit`

Akce volaná před odesláním faktury do KSeF.

```php
/**
 * @param int    $invoice_id ID faktury
 * @param string $xml        Vygenerovaný XML faktury
 */
do_action('polski_pro_ksef_submit', int $invoice_id, string $xml);
```

**Příklad:**

```php
add_action('polski_pro_ksef_submit', function (int $invoice_id, string $xml): void {
    // Uložení kopie XML před odesláním
    $upload_dir = wp_upload_dir();
    $xml_path = $upload_dir['basedir'] . '/polski-pro/ksef-xml/';
    
    if (! is_dir($xml_path)) {
        wp_mkdir_p($xml_path);
    }
    
    file_put_contents(
        $xml_path . "invoice-{$invoice_id}.xml",
        $xml
    );
}, 10, 2);
```

### `polski_pro_ksef_check_status`

Akce volaná po kontrole stavu faktury v KSeF.

```php
/**
 * @param int    $invoice_id    ID faktury
 * @param string $status        Nový stav (accepted, rejected, error)
 * @param string $ksef_number   Referenční číslo KSeF (pouze pro accepted)
 */
do_action('polski_pro_ksef_check_status', int $invoice_id, string $status, string $ksef_number);
```

**Příklad:**

```php
add_action('polski_pro_ksef_check_status', function (int $invoice_id, string $status, string $ksef_number): void {
    if ($status === 'accepted') {
        // Oznámení externího systému o přijetí faktury
        wp_remote_post('https://erp.example.com/api/ksef-update', [
            'body' => wp_json_encode([
                'invoice_id'  => $invoice_id,
                'ksef_number' => $ksef_number,
            ]),
            'headers' => ['Content-Type' => 'application/json'],
        ]);
    }
}, 10, 3);
```

## Diagnostika

### Logy

Všechny operace KSeF jsou v logu WooCommerce. Přejděte do **WooCommerce > Stav > Logy** a vyberte `polski-pro-ksef`.

Logované události:

- odeslání faktury (request/response)
- kontrola stavu
- chyby validace XML
- chyby komunikace s API
- opakování odeslání

### Testování připojení

Klikněte na **Otestovat připojení** v nastavení KSeF. Test ověří:

- správnost tokenu
- konektivitu se serverem KSeF
- shodu NIP s tokenem

## Nejčastější problémy

### Faktura odmítnuta systémem KSeF

1. Zkontrolujte chybovou zprávu v logu WooCommerce
2. Nejčastější příčiny: chybějící NIP kupujícího, nesprávná sazba DPH, neúplné adresní údaje
3. Opravte údaje a odešlete znovu

### API token nefunguje

1. Ujistěte se, že token nevypršel
2. Zkontrolujte, zda má token oprávnění k vystavování faktur
3. Ověřte shodu NIP v nastavení pluginu s NIP propojeným s tokenem

### Action Scheduler nezpracovává frontu

1. Zkontrolujte, zda WP-Cron funguje správně
2. Přejděte do **Nástroje > Scheduled Actions** a zkontrolujte stav fronty
3. Ověřte, zda nejsou zablokované úlohy

## Související zdroje

- [Systém faktur](/pro/invoices/)
- [Informace o KSeF](/compliance/ksef/)
- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
