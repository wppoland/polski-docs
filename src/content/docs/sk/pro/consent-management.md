---
title: Správa súhlasov
description: Dokumentácia pokročilej správy súhlasov v Polski PRO for WooCommerce - verziovanie, audit trail, GDPR export, integrácia s Môj účet.
---

Modul správy súhlasov pridáva verziovanie súhlasov, audit trail, export dát a integráciu s GDPR. Sleduje históriu súhlasov zákazníkov a reaguje na zmeny obsahu podmienok.

## Verziovanie súhlasov

### Automatická detekcia zmien

Doplnok sleduje obsah checkboxov. Pri každom uložení nastavení porovnáva hash (SHA-256) obsahu. Keď sa obsah zmení, automaticky vytvorí novú verziu súhlasu.

Každá verzia súhlasu obsahuje:

- číslo verzie (autoinkrementácia)
- hash obsahu menovky
- úplný obsah menovky
- dátum vytvorenia verzie
- ID používateľa, ktorý vykonal zmenu

### História verzií

Kliknite **História verzií** pri checkboxe, aby ste videli všetky verzie s dátumami a obsahom.

### Opätovné vyjadrenie súhlasu

Keď sa obsah súhlasu zmení, doplnok môže vyžadovať opätovný súhlas. Nastavenia:

| Nastavenie | Popis |
|------------|------|
| Vyžadovať opätovný súhlas | Zapína výzvu na opätovné vyjadrenie súhlasu po zmene obsahu |
| Zobrazovať výzvu | Na stránke pokladne / V paneli Môj účet / Oboje |
| Obsah správy | Text informujúci zákazníka o zmene podmienok |

Zákazník vidí správu o zmene a musí znovu zaškrtnúť checkbox. Skorší súhlas zostáva v histórii.

## Audit trail

### Zaznamenávané udalosti

Doplnok zaznamenáva všetky operácie so súhlasmi:

| Udalosť | Dáta |
|-----------|------|
| Súhlas vyjadrený | ID používateľa, ID súhlasu, verzia, dátum, IP, user agent |
| Súhlas odvolaný | ID používateľa, ID súhlasu, dátum, zdroj (zákazník/admin) |
| Zmena obsahu súhlasu | ID súhlasu, stará verzia, nová verzia, dátum, ID admina |
| Výzva na opätovný súhlas | ID používateľa, ID súhlasu, dátum |
| Opätovný súhlas | ID používateľa, ID súhlasu, nová verzia, dátum |

### Prehliadanie histórie

Prejdite do **WooCommerce > Nastavenia > Polski > Moduly PRO > Súhlasy > Audit trail**. Filtrujte udalosti podľa:

- ID používateľa alebo e-mail
- typ udalosti
- rozsah dátumov
- konkrétny súhlas

### Export dát

Exportujte audit trail vo formáte:

- **CSV** - do tabuľkového procesora
- **JSON** - na programové spracovanie

Exportujte úplnú históriu alebo prefiltrované výsledky z panela Audit trail.

## Integrácia s panelom Môj účet

### Odvolanie súhlasu

V **Môj účet** zákazník vidí sekciu "Moje súhlasy". Môže:

- prehliadať aktuálne vyjadrené súhlasy
- vidieť dátum vyjadrenia každého súhlasu
- odvolať súhlas tlačidlom "Odvolať"

Odvolanie sa zaznamená v audit trail. Administrátor dostane e-mailové upozornenie (konfigurovateľné).

### Výzva na opätovný súhlas

Keď sa obsah súhlasu zmení, zákazník vidí v Môj účet žiadosť o oboznámenie sa s novou verziou a opätovný súhlas.

## GDPR integrácia

### Export osobných údajov

Doplnok sa integruje s exportom dát WordPress (`wp_privacy_personal_data_exporters`). Pri exporte dát zákazníka pripája:

- zoznam vyjadrených súhlasov s dátumami a verziami
- úplnú históriu zmien súhlasov (vyjadrenia, odvolania, opätovné súhlasy)
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

### Odstránenie osobných údajov

Doplnok sa integruje s odstránením dát WordPress (`wp_privacy_personal_data_erasers`). Pri odstránení dát:

- osobné údaje v audit trail sa anonymizujú (IP, user agent)
- záznamy súhlasov sa označia ako odstránené
- samotný fakt vyjadrenia/odvolania súhlasu zostáva (bez identifikačných údajov) na účely zúčtovateľnosti

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

Modul poskytuje REST API endpoint na prehliadanie súhlasov (dostupný pre administrátorov):

### Zoznam súhlasov používateľa

```
GET /wp-json/polski-pro/v1/consents?user_id={id}
```

Vracia zoznam súhlasov používateľa s aktuálnym stavom a verziou.

### História zmien

```
GET /wp-json/polski-pro/v1/consents/audit?user_id={id}
```

Query parametre:

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

Vracia úplný export audit trail vo vybranom formáte.

## Hooky

### `polski_pro/consent/granted`

Akcia vyvolaná po vyjadrení súhlasu.

```php
/**
 * @param int    $user_id    ID používateľa
 * @param string $consent_id ID súhlasu
 * @param int    $version    Číslo verzie súhlasu
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

Akcia vyvolaná po odvolaní súhlasu.

```php
/**
 * @param int    $user_id    ID používateľa
 * @param string $consent_id ID súhlasu
 * @param string $source     Zdroj odvolania (customer, admin)
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

1. Skontrolujte, či je možnosť "Vyžadovať opätovný súhlas" zapnutá
2. Overte, či sa obsah súhlasu skutočne zmenil (skontrolujte históriu verzií)
3. Vyčistite cache stránky pokladne a panela Môj účet

### GDPR export neobsahuje dáta súhlasov

1. Uistite sa, že modul správy súhlasov je aktívny
2. Skontrolujte, či je exportér `polski-pro-consents` zaregistrovaný v **Nástroje > Export osobných údajov**
3. Overte logy z hľadiska PHP chýb

### Audit trail rastie príliš rýchlo

História súhlasov je v samostatnej tabuľke. Pri mnohých zákazníkoch môže rásť. Zvážte:

- pravidelné exportovanie a archivovanie starších záznamov
- nastavenie automatického čistenia záznamov starších než určený počet mesiacov (možnosť v nastaveniach)

## Súvisiace zdroje

- [Právne checkboxy](/checkout/legal-checkboxes/)
- [GDPR](/compliance/gdpr/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
