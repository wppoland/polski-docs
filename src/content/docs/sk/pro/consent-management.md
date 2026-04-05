---
title: Správa súhlasov
description: Dokumentácia pokročilej správy súhlasov v Polski PRO for WooCommerce - verziovanie, audit trail, GDPR export, integrácia s panelom Môj účet.
---

Modul správy súhlasov pridáva verziovanie súhlasov, audit trail, export údajov a integráciu s GDPR. Sleduje históriu súhlasov zákazníkov a reaguje na zmeny obsahu obchodných podmienok.

## Verziovanie súhlasov

### Automatická detekcia zmien

Plugin monitoruje obsah štítkov právnych checkboxov. Pri každom uložení nastavení vypočíta hash (SHA-256) obsahu štítku. Ak sa hash zmenil - plugin automaticky vytvorí novú verziu súhlasu.

Každá verzia súhlasu obsahuje:

- číslo verzie (autoinkrementácia)
- hash obsahu štítku
- úplný obsah štítku
- dátum vytvorenia verzie
- ID používateľa, ktorý vykonal zmenu

### História verzií

V nastaveniach právnych checkboxov je k dispozícii tlačidlo **História verzií** pri každom checkboxe. Zobrazuje zoznam všetkých verzií s dátumami a náhľadom obsahu.

### Opätovné udelenie súhlasu

Keď sa obsah súhlasu zmení (nová verzia), plugin môže vyžadovať opätovné udelenie súhlasu zákazníkmi. Konfigurácia:

| Nastavenie | Popis |
|------------|------|
| Vyžadovať opätovný súhlas | Zapne výzvu na opätovné udelenie súhlasu po zmene obsahu |
| Zobraziť výzvu | Na stránke checkoutu / V paneli Môj účet / Oboje |
| Text správy | Text informujúci zákazníka o zmene obchodných podmienok |

Zákazník vidí správu s informáciou o zmene obsahu a musí znova zaškrtnúť checkbox. Predchádzajúci súhlas zostáva v histórii s označením verzie.

## Audit trail

### Zaznamenávané udalosti

Plugin zaznamenáva všetky operácie súvisiace so súhlasmi:

| Udalosť | Údaje |
|-----------|------|
| Súhlas udelený | ID používateľa, ID súhlasu, verzia, dátum, IP, user agent |
| Súhlas odvolaný | ID používateľa, ID súhlasu, dátum, zdroj (zákazník/admin) |
| Zmena obsahu súhlasu | ID súhlasu, stará verzia, nová verzia, dátum, ID admina |
| Výzva na opätovný súhlas | ID používateľa, ID súhlasu, dátum |
| Opätovný súhlas | ID používateľa, ID súhlasu, nová verzia, dátum |

### Prehliadanie histórie

Prejdite do **WooCommerce > Nastavenia > Polski > Moduly PRO > Súhlasy > Audit trail**. Tabuľka obsahuje všetky udalosti s filtrami:

- ID používateľa alebo e-mail
- typ udalosti
- rozsah dátumov
- konkrétny súhlas

### Export dát

Audit trail je možné exportovať v dvoch formátoch:

- **CSV** - na otvorenie v tabuľkovom procesore
- **JSON** - na programové spracovanie alebo import do iného systému

Export je dostupný z panelu Audit trail. Je možné exportovať kompletnú históriu alebo filtrované výsledky.

## Integrácia s panelom Môj účet

### Odvolanie súhlasu

V paneli **Môj účet** zákazníka sa zobrazuje sekcia "Moje súhlasy" so zoznamom udelených súhlasov. Zákazník môže:

- prehliadať aktuálne udelené súhlasy
- vidieť dátum udelenia každého súhlasu
- odvolať súhlas tlačidlom "Odvolať"

Odvolanie súhlasu je zaznamenané v audit trail. Administrátor dostane e-mailové upozornenie o odvolaní súhlasu (konfigurovateľné).

### Výzva na opätovný súhlas

Ak sa obsah súhlasu zmenil, zákazník vidí v paneli Môj účet správu s výzvou oboznámiť sa s novou verziou a opätovne udeliť súhlas.

## Integrácia GDPR

### Export osobných údajov

Plugin sa integruje s mechanizmom exportu osobných údajov WordPress (`wp_privacy_personal_data_exporters`). Pri žiadosti o export údajov zákazníka plugin priloží:

- zoznam udelených súhlasov s dátumami a verziami
- kompletnú históriu zmien súhlasov (udelenia, odvolania, opätovné súhlasy)
- IP adresy a dátumy spojené s každým súhlasom

```php
/**
 * Rejestracja eksportera danych osobowych.
 */
add_filter('wp_privacy_personal_data_exporters', function (array $exporters): array {
    $exporters['polski-pro-consents'] = [
        'exporter_friendly_name' => 'Polski PRO - Zgody',
        'callback'               => [PolskiPro\Privacy\Exporter::class, 'export'],
    ];
    return $exporters;
});
```

### Vymazanie osobných údajov

Plugin sa integruje s mechanizmom vymazania údajov WordPress (`wp_privacy_personal_data_erasers`). Pri žiadosti o vymazanie údajov:

- osobné údaje v audit trail sú anonymizované (IP, user agent)
- záznamy súhlasov sú označené ako vymazané
- samotný fakt udelenia/odvolania súhlasu zostáva (bez identifikačných údajov) pre účely zodpovednosti

```php
/**
 * Rejestracja erasera danych osobowych.
 */
add_filter('wp_privacy_personal_data_erasers', function (array $erasers): array {
    $erasers['polski-pro-consents'] = [
        'eraser_friendly_name' => 'Polski PRO - Zgody',
        'callback'             => [PolskiPro\Privacy\Eraser::class, 'erase'],
    ];
    return $erasers;
});
```

## REST API

Modul sprístupňuje endpoint REST API na prehliadanie súhlasov (dostupný pre administrátorov):

### Zoznam súhlasov používateľa

```
GET /wp-json/polski-pro/v1/consents?user_id={id}
```

Vracia zoznam súhlasov používateľa s aktuálnym stavom a verziou.

### História zmien

```
GET /wp-json/polski-pro/v1/consents/audit?user_id={id}
```

Parametre query:

| Parameter | Typ | Popis |
|----------|-----|------|
| `user_id` | int | ID používateľa |
| `consent_id` | string | ID konkrétneho súhlasu |
| `event_type` | string | Typ udalosti (granted, revoked, re_consented) |
| `date_from` | string | Dátum od (YYYY-MM-DD) |
| `date_to` | string | Dátum do (YYYY-MM-DD) |
| `per_page` | int | Počet výsledkov (predvolene 50) |

### Export

```
GET /wp-json/polski-pro/v1/consents/export?format={csv|json}
```

Vracia kompletný export audit trail vo zvolenom formáte.

## Hooky

### `polski_pro/consent/granted`

Akcia volaná po udelení súhlasu.

```php
/**
 * @param int    $user_id    ID użytkownika
 * @param string $consent_id ID zgody
 * @param int    $version    Numer wersji zgody
 */
do_action('polski_pro/consent/granted', int $user_id, string $consent_id, int $version);
```

**Príklad:**

```php
add_action('polski_pro/consent/granted', function (int $user_id, string $consent_id, int $version): void {
    // Synchronizacja z zewnętrznym CRM
    if ($consent_id === 'marketing') {
        wp_remote_post('https://crm.example.com/api/consent', [
            'body' => wp_json_encode([
                'email'   => get_userdata($user_id)->user_email,
                'consent' => 'marketing',
                'status'  => 'granted',
                'version' => $version,
            ]),
            'headers' => ['Content-Type' => 'application/json'],
        ]);
    }
}, 10, 3);
```

### `polski_pro/consent/revoked`

Akcia volaná po odvolaní súhlasu.

```php
/**
 * @param int    $user_id    ID użytkownika
 * @param string $consent_id ID zgody
 * @param string $source     Źródło wycofania (customer, admin)
 */
do_action('polski_pro/consent/revoked', int $user_id, string $consent_id, string $source);
```

**Príklad:**

```php
add_action('polski_pro/consent/revoked', function (int $user_id, string $consent_id, string $source): void {
    if ($consent_id === 'newsletter' && $source === 'customer') {
        // Wypisanie z newslettera
        do_action('newsletter_unsubscribe', get_userdata($user_id)->user_email);
    }
}, 10, 3);
```

## Najčastejšie problémy

### Výzva na opätovný súhlas sa nezobrazuje

1. Skontrolujte, či je voľba "Vyžadovať opätovný súhlas" zapnutá
2. Overte, či sa obsah súhlasu skutočne zmenil (skontrolujte históriu verzií)
3. Vymažte cache stránky checkoutu a panelu Môj účet

### GDPR export neobsahuje údaje súhlasov

1. Uistite sa, že modul správy súhlasov je aktívny
2. Skontrolujte, či je exportér `polski-pro-consents` zaregistrovaný v **Nástroje > Export osobných údajov**
3. Overte logy na PHP chyby

### Audit trail rastie príliš rýchlo

Plugin uchováva históriu súhlasov v osobitnej tabuľke databázy. Pri veľkom počte zákazníkov môže tabuľka rásť. Zvážte:

- pravidelné exportovanie a archiváciu starších záznamov
- nastavenie automatického čistenia záznamov starších ako určitý počet mesiacov (voľba v nastaveniach)

## Súvisiace zdroje

- [Právne checkboxy](/checkout/legal-checkboxes/)
- [GDPR](/compliance/gdpr/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
