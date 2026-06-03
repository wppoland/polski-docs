---
title: Integrácia s KSeF
description: Dokumentácia integrácie Polski PRO for WooCommerce s Krajowym Systemom e-Faktur - odosielanie faktúr, sledovanie stavov, konfigurácia API a spracovanie chýb.
---

Modul KSeF odosiela elektronické faktúry do Krajowego Systemu e-Faktur (poľské Ministerstvo financií). Faktúry sa odosielajú na pozadí, s automatickým opakovaním pri chybách.

## Čo je KSeF

KSeF je platforma poľského Ministerstva financií na spracovanie faktúr vo formáte XML. Plugin generuje faktúry v požadovanom formáte a odosiela ich do KSeF.

## Konfigurácia

Prejdite na **WooCommerce > Nastavenia > Polski > Moduly PRO > KSeF**.

### Nastavenia pripojenia

| Nastavenie | Popis |
|------------|------|
| Zapnúť integráciu KSeF | Aktivuje modul |
| Prostredie | Testovacie (sandbox) alebo Produkčné |
| API kľúč (token) | Autorizačný token vygenerovaný v portáli KSeF |
| NIP vystavovateľa | NIP priradený ku kontu KSeF |

### Testovacie prostredie

KSeF má testovacie prostredie (sandbox) na overenie integrácie. Sandbox:

- nevyžaduje skutočný autorizačný kľúč
- prijíma faktúry v rovnakom formáte ako produkčné prostredie
- neodosiela údaje na daňový úrad
- odporúča sa pre prvé testy integrácie

Po úspešných testoch prepnite na produkčné prostredie a zadajte správny API kľúč.

### Získanie API tokenu

1. Prihláste sa do portálu KSeF: https://ksef.mf.gov.pl/
2. Prejdite do sekcie správy tokenov
3. Vygenerujte nový token s oprávneniami na vystavovanie faktúr
4. Skopírujte token a vložte ho do nastavení pluginu

## Odosielanie faktúr

### Automatické odosielanie

Zapnite **Automatické odosielanie do KSeF**, aby plugin odoslal faktúru do KSeF po zmene stavu na "Vystavená". Odosielanie funguje na pozadí cez Action Scheduler.

### Manuálne odosielanie

V meta boxe "Faktúry" kliknite na **Odoslať do KSeF**. Úloha sa zaradí do fronty Action Scheduler.

### Asynchrónne spracovanie

Plugin používa Action Scheduler (zabudovaný vo WooCommerce) na odosielanie na pozadí:

- odosielanie neblokuje spracovanie objednávky
- faktúry sa odosielajú postupne
- veľké množstvá faktúr sa spracúvajú postupne

## Generovanie XML

Plugin generuje faktúru vo formáte XML kompatibilnom so schémou KSeF (FA(2)). XML dokument obsahuje:

- hlavičku s dátumom a typom faktúry
- údaje predajcu (NIP, názov, adresa)
- údaje odberateľa (NIP, názov, adresa)
- položky faktúry (názov, množstvo, cena netto, sadzba VAT, hodnota)
- súhrn s rozdelením podľa sadzieb VAT
- informácie o platbe

XML sa pred odoslaním validuje. Pri chybách validácie sa faktúra neodošle a v logu sa objaví správa.

## Sledovanie stavu

Po odoslaní faktúry do KSeF plugin sleduje jej stav:

| Stav | Popis |
|--------|------|
| Queued | Faktúra pridaná do fronty na odoslanie |
| Submitted | Faktúra odoslaná do KSeF, čaká na spracovanie |
| Accepted | Faktúra prijatá KSeF, pridelené číslo KSeF |
| Rejected | Faktúra zamietnutá - skontrolujte chybovú správu |
| Error | Chyba komunikácie s API KSeF |

Po prijatí plugin uloží číslo KSeF. Je viditeľné v paneli objednávky a na PDF.

### Polling stavu

Plugin automaticky kontroluje stav odoslaných faktúr každých niekoľko minút (cez Action Scheduler), kým nedostane odpoveď "Accepted" alebo "Rejected".

## Spracovanie chýb a opakovanie

Pri chybách API plugin opakuje pokusy s narastajúcim oneskorením (exponential backoff):

| Pokus | Oneskorenie |
|-------|-----------|
| 1. opakovanie | 5 minút |
| 2. opakovanie | 25 minút |
| 3. opakovanie | 125 minút |

Po troch neúspešných pokusoch dostane faktúra stav "Error". Administrátor dostane e-mail o neúspešnom odoslaní.

Typické príčiny chýb:

- nesprávny alebo expirovaný API token
- chyby validácie XML (napr. chýbajúce údaje odberateľa)
- dočasná nedostupnosť API KSeF
- nezhoda NIP vystavovateľa s tokenom

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

Akcia volaná po skontrolovaní stavu faktúry v KSeF.

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

Všetky operácie KSeF sú v logu WooCommerce. Prejdite na **WooCommerce > Stav > Logy** a vyberte `polski-pro-ksef`.

Logované udalosti:

- odoslanie faktúry (request/response)
- kontrola stavu
- chyby validácie XML
- chyby komunikácie s API
- opakovania odosielania

### Testovanie pripojenia

Kliknite na **Otestovať pripojenie** v nastaveniach KSeF. Test overuje:

- správnosť tokenu
- konektivitu so serverom KSeF
- zhodu NIP s tokenom

## Najčastejšie problémy

### Faktúra zamietnutá KSeF

1. Skontrolujte chybovú správu v logu WooCommerce
2. Najčastejšie príčiny: chýbajúci NIP odberateľa, nesprávna sadzba VAT, neúplné adresné údaje
3. Opravte údaje a odošlite znova

### API token nefunguje

1. Uistite sa, že token neexpiroval
2. Skontrolujte, či má token oprávnenia na vystavovanie faktúr
3. Overte zhodu NIP v nastaveniach pluginu s NIP priradeným k tokenu

### Action Scheduler nespracúva frontu

1. Skontrolujte, či WP-Cron funguje správne
2. Prejdite na **Nástroje > Scheduled Actions** a skontrolujte stav fronty
3. Overte, či nie sú zablokované úlohy

## Súvisiace zdroje

- [Systém faktúr](/pro/invoices/)
- [Informácie o KSeF](/compliance/ksef/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
