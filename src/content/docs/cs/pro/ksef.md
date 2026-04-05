---
title: Integrace s KSeF
description: Dokumentace integrace Polski PRO for WooCommerce s Krajovym systemem e-Faktur - odesilani faktur, sledovani statusu, konfigurace API a zpracovani chyb.
---

Modul KSeF v Polski PRO for WooCommerce umoznuje odesilani elektronickych faktur do Krajoweho systemu e-Faktur provozovaneho Ministerstvem financi. Faktury jsou odesilany asynchronne s automatickym opakovanim v pripade chyb.

## Co je KSeF

Krajovy system e-Faktur (KSeF) je platforma Ministerstva financi pro vystavovani, uchovavani a prijimani strukturovanych faktur ve formatu XML. Plugin poskytuje nastroje pro integraci WooCommerce s KSeF - generuje faktury v pozadovanem formatu XML a odesila je do systemu.

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Moduly PRO > KSeF**.

### Nastaveni pripojeni

| Nastaveni | Popis |
|-----------|-------|
| Zapnout integraci KSeF | Aktivuje modul |
| Prostredi | Testovaci (sandbox) nebo Produkcni |
| API klic (token) | Autorizacni token vygenerovany v portalu KSeF |
| DIC vystavce | DIC spojene s uctem KSeF |

### Testovaci prostredi

KSeF poskytuje testovaci prostredi (sandbox) pro overeni integrace. Testovaci prostredi:

- nevyzaduje skutecny autorizacni klic
- prijima faktury ve stejnem formatu jako produkcni prostredi
- neodesila data financnimu uradu
- je doporuceno pro prvni testy integrace

Po uspesnem overeni v testovacim prostredi prepnete na produkcni prostredi a zadejte spravny API klic.

### Ziskani API tokenu

1. Prihaste se do portalu KSeF: https://ksef.mf.gov.pl/
2. Prejdete do sekce spravy tokenu
3. Vygenerujte novy token s opravnenim pro vystavovani faktur
4. Zkopirujte token a vlozte ho do nastaveni pluginu

## Odesilani faktur

### Automaticke odesilani

Po zapnuti moznosti **Automaticke odesilani do KSeF** plugin odesle fakturu do KSeF automaticky po zmene jejiho statusu na "Vystavena" (Issued). Odesilani probiha asynchronne pres Action Scheduler.

### Rucni odesilani

V panelu objednavky v meta boxu "Faktury" je k dispozici tlacitko **Odeslat do KSeF**. Kliknuti prida ulohu odesilani do fronty Action Scheduleru.

### Asynchronni zpracovani

Plugin vyuziva Action Scheduler (vestavenou soucast WooCommerce) pro asynchronni odesilani faktur. To znamena, ze:

- odesilani neblokuje zpracovani objednavky
- faktury jsou odesilany ve fronte, jedna po druhe
- v pripade velkeho poctu faktur je system zpracovava postupne

## Generovani XML

Plugin generuje fakturu ve formatu XML kompatibilnim se schematem KSeF (FA(2)). Dokument XML obsahuje:

- hlavicku s datem a typem faktury
- udaje prodavajiciho (DIC, nazev, adresa)
- udaje kupujiciho (DIC, nazev, adresa)
- polozky faktury (nazev, mnozstvi, cena bez DPH, sazba DPH, hodnota)
- souhrn s rozpisem podle sazeb DPH
- informace o platbe

XML je validovan pred odeslanim. Pokud validace zjisti chyby, faktura nebude odeslana a v logu se objevi podrobna zprava.

## Sledovani statusu

Po odeslani faktury do KSeF plugin sleduje jeji status:

| Status | Popis |
|--------|-------|
| Queued | Faktura pridana do fronty odesilani |
| Submitted | Faktura odeslana do KSeF, ceka na zpracovani |
| Accepted | Faktura prijata KSeF, prideleno cislo KSeF |
| Rejected | Faktura odmitnuta - zkontrolujte chybovou zpravu |
| Error | Chyba komunikace s API KSeF |

Po prijeti faktury plugin ulozi referencni cislo KSeF do metadat faktury. Toto cislo je viditelne v panelu objednavky a na PDF vytisknuti.

### Dotazovani na status

Plugin automaticky kontroluje status odeslenych faktur. Po odeslani faktury do KSeF plugin dotazuje API na status kazdych nekolik minut (pres Action Scheduler), dokud neobdrzi odpoved "Accepted" nebo "Rejected".

## Zpracovani chyb a opakovani

V pripade chyby komunikace s API KSeF plugin pouziva mechanismus exponential backoff:

| Pokus | Zpozdeni |
|-------|----------|
| 1. opakovani | 5 minut |
| 2. opakovani | 25 minut |
| 3. opakovani | 125 minut |

Po trech neuspesnych pokusech faktura obdrzi status "Error" a vyzaduje rucni zasah. Administrator obdrzi e-mailove oznameni o neuspesnem odeslani.

Typicke priciny chyb:

- neplatny nebo propadly API token
- chyby validace XML (napr. chybejici udaje kupujiciho)
- docasna nedostupnost API KSeF
- neshoda DIC vystavce s tokenem

## Hooky

### `polski_pro_ksef_submit`

Akce volana pred odeslanim faktury do KSeF.

```php
/**
 * @param int    $invoice_id ID faktury
 * @param string $xml        Wygenerowany XML faktury
 */
do_action('polski_pro_ksef_submit', int $invoice_id, string $xml);
```

**Priklad:**

```php
add_action('polski_pro_ksef_submit', function (int $invoice_id, string $xml): void {
    // Zapisanie kopii XML przed wysyłką
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

Akce volana po kontrole statusu faktury v KSeF.

```php
/**
 * @param int    $invoice_id    ID faktury
 * @param string $status        Nowy status (accepted, rejected, error)
 * @param string $ksef_number   Numer referencyjny KSeF (tylko dla accepted)
 */
do_action('polski_pro_ksef_check_status', int $invoice_id, string $status, string $ksef_number);
```

**Priklad:**

```php
add_action('polski_pro_ksef_check_status', function (int $invoice_id, string $status, string $ksef_number): void {
    if ($status === 'accepted') {
        // Powiadomienie zewnętrznego systemu o zaakceptowaniu faktury
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

Plugin loguje vsechny operace KSeF do logu WooCommerce. Prejdete do **WooCommerce > Stav > Logy** a vyberte zdroj `polski-pro-ksef`.

Logovane udalosti:

- odeslani faktury (request/response)
- kontrola statusu
- chyby validace XML
- chyby komunikace s API
- opakovani odeslani

### Testovani pripojeni

V nastaveni modulu KSeF je k dispozici tlacitko **Otestovat pripojeni**. Odesle testovaci pozadavek do API KSeF a overi:

- spravnost tokenu
- pripojeni k serveru KSeF
- shodu DIC s tokenem

## Nejcastejsi problemy

### Faktura odmitnuta KSeF

1. Zkontrolujte chybovou zpravu v logu WooCommerce
2. Nejcastejsi priciny: chybejici DIC kupujiciho, neplatna sazba DPH, neuplne adresni udaje
3. Opravte data a odeslate znovu

### API token nefunguje

1. Ujistete se, ze token nevyprsel
2. Zkontrolujte, ze token ma opravneni pro vystavovani faktur
3. Overite shodu DIC v nastaveni pluginu s DIC spojenym s tokenem

### Action Scheduler nezpracovava frontu

1. Zkontrolujte, ze WP-Cron funguje spravne
2. Prejdete do **Nastroje > Scheduled Actions** a zkontrolujte stav fronty
3. Overite, ze nejsou zablokovane ulohy

## Souvisejici zdroje

- [System faktur](/pro/invoices/)
- [Informace o KSeF](/compliance/ksef/)
- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
