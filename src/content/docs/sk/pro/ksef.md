---
title: Integrácia s KSeF
description: Dokumentácia integrácie Polski PRO for WooCommerce s Krajovým systémom e-faktúr - odosielanie faktúr, sledovanie stavov, konfigurácia API a spracovanie chýb.
---

Modul KSeF odosiela elektronické faktúry do Krajového systému e-faktúr (Ministerstvo financií). Faktúry sa odosielajú na pozadí, s automatickým opakovaním pri chybách.

## Čo je KSeF

KSeF je platforma Ministerstva financií na štrukturované faktúry vo formáte XML. Plugin generuje faktúry v požadovanom formáte a odosiela ich do systému.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Moduly PRO > KSeF**.

### Nastavenia pripojenia

| Nastavenie | Popis |
|------------|------|
| Zapnúť integráciu KSeF | Aktivuje modul |
| Prostredie | Testovacie (sandbox) alebo Produkčné |
| Kľúč API (token) | Autorizačný token vygenerovaný na portáli KSeF |
| IČ DPH vystaviteľa | IČ DPH prepojené s účtom KSeF |

### Testovacie prostredie

KSeF sprístupňuje testovacie prostredie (sandbox) na overenie integrácie. Testovacie prostredie:

- nevyžaduje skutočný autorizačný kľúč
- prijíma faktúry v identicky formáte ako produkčné prostredie
- neodosiela údaje na daňový úrad
- je odporúčané na prvé testy integrácie

Po úspešnom overení v testovacom prostredí prepnite na produkčné prostredie a zadajte príslušný kľúč API.

### Získanie tokena API

1. Prihláste sa na portál KSeF: https://ksef.mf.gov.pl/
2. Prejdite do sekcie správy tokenov
3. Vygenerujte nový token s oprávneniami na vystavovanie faktúr
4. Skopírujte token a vložte ho do nastavení pluginu

## Odosielanie faktúr

### Automatické odosielanie

Po zapnutí možnosti **Automatické odosielanie do KSeF** plugin odosiela faktúru do KSeF automaticky po zmene jej stavu na "Vystavená" (Issued). Odosielanie prebieha asynchrónne cez Action Scheduler.

### Ručné odosielanie

V paneli objednávky v meta boxe "Faktúry" je k dispozícii tlačidlo **Odoslať do KSeF**. Kliknutie pridá úlohu odosielania do fronty Action Scheduler.

### Asynchrónne spracovanie

Plugin využíva Action Scheduler (zabudovaný vo WooCommerce) na asynchrónne odosielanie faktúr. To znamená, že:

- odosielanie neblokuje spracovanie objednávky
- faktúry sa odosielajú vo fronte, jedna po druhej
- v prípade veľkého počtu faktúr systém ich spracováva postupne

## Generovanie XML

Plugin generuje faktúru vo formáte XML kompatibilnom so schémou KSeF (FA(2)). Dokument XML obsahuje:

- hlavičku s dátumom a typom faktúry
- údaje predávajúceho (IČ DPH, názov, adresa)
- údaje kupujúceho (IČ DPH, názov, adresa)
- položky faktúry (názov, množstvo, cena bez DPH, sadzba DPH, hodnota)
- zhrnutie s rozpisom podľa sadzieb DPH
- informácie o platbe

XML je validovaný pred odoslaním. Ak validácia odhalí chyby, faktúra nebude odoslaná a v logu sa zobrazí podrobná správa.

## Sledovanie stavu

Po odoslaní faktúry do KSeF plugin sleduje jej stav:

| Stav | Popis |
|--------|------|
| Queued | Faktúra pridaná do fronty odosielania |
| Submitted | Faktúra odoslaná do KSeF, čaká na spracovanie |
| Accepted | Faktúra prijatá KSeF, pridelené číslo KSeF |
| Rejected | Faktúra odmietnutá - skontrolujte správu chyby |
| Error | Chyba komunikácie s API KSeF |

Po prijatí faktúry plugin uloží referenčné číslo KSeF do metadát faktúry. Toto číslo je viditeľné v paneli objednávky a na výtlačku PDF.

### Polling stavu

Plugin automaticky kontroluje stav odoslaných faktúr. Po odoslaní faktúry do KSeF plugin dopytuje API na stav každých niekoľko minút (cez Action Scheduler), kým nedostane odpoveď "Accepted" alebo "Rejected".

## Spracovanie chýb a opakovanie

V prípade chyby komunikácie s API KSeF plugin uplatňuje mechanizmus exponential backoff:

| Pokus | Oneskorenie |
|-------|-----------|
| 1. opakovanie | 5 minút |
| 2. opakovanie | 25 minút |
| 3. opakovanie | 125 minút |

Po troch neúspešných pokusoch faktúra získa stav "Error" a vyžaduje manuálny zásah. Administrátor dostane e-mailové upozornenie o neúspešnom odoslaní.

Typické príčiny chýb:

- neplatný alebo expirovaný token API
- chyby validácie XML (napr. chýbajúce údaje kupujúceho)
- dočasná nedostupnosť API KSeF
- nesúlad IČ DPH vystaviteľa s tokenom

## Hooky

### `polski_pro_ksef_submit`

Akcia volaná pred odoslaním faktúry do KSeF.

```php
/**
 * @param int    $invoice_id ID faktury
 * @param string $xml        Wygenerowany XML faktury
 */
do_action('polski_pro_ksef_submit', int $invoice_id, string $xml);
```

**Príklad:**

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

Akcia volaná po kontrole stavu faktúry v KSeF.

```php
/**
 * @param int    $invoice_id    ID faktury
 * @param string $status        Nowy status (accepted, rejected, error)
 * @param string $ksef_number   Numer referencyjny KSeF (tylko dla accepted)
 */
do_action('polski_pro_ksef_check_status', int $invoice_id, string $status, string $ksef_number);
```

**Príklad:**

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

Plugin loguje všetky operácie KSeF v logu WooCommerce. Prejdite do **WooCommerce > Stav > Logy** a vyberte zdroj `polski-pro-ksef`.

Logované udalosti:

- odosielanie faktúry (request/response)
- kontrola stavu
- chyby validácie XML
- chyby komunikácie s API
- opakovanie odosielania

### Testovanie pripojenia

V nastaveniach modulu KSeF je k dispozícii tlačidlo **Testovať pripojenie**. Odošle testovaciu požiadavku na API KSeF a overí:

- správnosť tokena
- konektivitu so serverom KSeF
- súlad IČ DPH s tokenom

## Najčastejšie problémy

### Faktúra odmietnutá KSeF

1. Skontrolujte správu chyby v logu WooCommerce
2. Najčastejšie príčiny: chýbajúce IČ DPH kupujúceho, neplatná sadzba DPH, neúplné adresné údaje
3. Opravte údaje a odošlite znova

### Token API nefunguje

1. Uistite sa, že token nevypršal
2. Skontrolujte, či má token oprávnenia na vystavovanie faktúr
3. Overte súlad IČ DPH v nastaveniach pluginu s IČ DPH prepojeným s tokenom

### Action Scheduler nespracováva frontu

1. Skontrolujte, či WP-Cron funguje správne
2. Prejdite do **Nástroje > Scheduled Actions** a skontrolujte stav fronty
3. Overte, či nie sú zablokované úlohy

## Súvisiace zdroje

- [Systém faktúr](/pro/invoices/)
- [Informácie o KSeF](/compliance/ksef/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
