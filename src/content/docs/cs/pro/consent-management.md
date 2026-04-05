---
title: Sprava souhlasu
description: Dokumentace pokrocile spravy souhlasu v Polski PRO for WooCommerce - verzovani, audit trail, export GDPR, integrace s Muj ucet.
---

Modul spravy souhlasu pridava verzovani souhlasu, audit trail, export dat a integraci s GDPR. Sleduje historii souhlasu zakazniku a reaguje na zmeny obsahu podminek.

## Verzovani souhlasu

### Automaticka detekce zmen

Plugin monitoruje obsah stitku pravnich checkboxu. Pri kazdem ulozeni nastaveni vypocita hash (SHA-256) obsahu stitku. Pokud se hash zmenil - plugin automaticky vytvori novou verzi souhlasu.

Kazda verze souhlasu obsahuje:

- cislo verze (autoinkrementace)
- hash obsahu stitku
- uplny obsah stitku
- datum vytvoreni verze
- ID uzivatele, ktery provedl zmenu

### Historie verzi

V nastaveni pravnich checkboxu je u kazdeho checkboxu k dispozici tlacitko **Historie verzi**. Zobrazuje seznam vsech verzi s daty a nahledem obsahu.

### Opetovne udeleni souhlasu

Kdyz se obsah souhlasu zmeni (nova verze), plugin muze vyzadovat opetovne udeleni souhlasu zakazniky. Konfigurace:

| Nastaveni | Popis |
|-----------|-------|
| Vyzadovat opetovny souhlas | Zapina vyzvu k opetovnemu udeleni souhlasu po zmene obsahu |
| Zobrazit vyzvu | Na strance pokladny / V panelu Muj ucet / Oboji |
| Text zpravy | Text informujici zakaznika o zmene podminek |

Zakaznik vidi zpravu s informaci o zmene obsahu a musi znovu zaskrtnout checkbox. Predchozi souhlas zustava v historii s oznacenim verze.

## Audit trail

### Registrovane udalosti

Plugin registruje vsechny operace souvisejici se souhlasy:

| Udalost | Data |
|---------|------|
| Souhlas udelen | ID uzivatele, ID souhlasu, verze, datum, IP, user agent |
| Souhlas odwolan | ID uzivatele, ID souhlasu, datum, zdroj (zakaznik/admin) |
| Zmena obsahu souhlasu | ID souhlasu, stara verze, nova verze, datum, ID admina |
| Vyzva k opetovnemu souhlasu | ID uzivatele, ID souhlasu, datum |
| Opetovny souhlas | ID uzivatele, ID souhlasu, nova verze, datum |

### Prohlizeni historie

Prejdete do **WooCommerce > Nastaveni > Polski > Moduly PRO > Souhlasy > Audit trail**. Tabulka obsahuje vsechny udalosti s filtry:

- ID uzivatele nebo e-mail
- typ udalosti
- rozsah dat
- konkretni souhlas

### Export dat

Audit trail lze exportovat ve dvou formatech:

- **CSV** - pro otevreni v tabulkovem procesoru
- **JSON** - pro programove zpracovani nebo import do jineho systemu

Export je dostupny z panelu Audit trail. Lze exportovat uplnou historii nebo filtrovane vysledky.

## Integrace s panelem Muj ucet

### Odvolani souhlasu

V panelu **Muj ucet** zakaznika se objevi sekce "Moje souhlasy" se seznamem udelenych souhlasu. Zakaznik muze:

- prohlizet aktualne udelene souhlasy
- videt datum udeleni kazdeho souhlasu
- odvolat souhlas tlacitkem "Odvolat"

Odvolani souhlasu je zaregistrovano v audit trail. Administrator obdrzi e-mailove oznameni o odvolani souhlasu (konfigurovatelne).

### Vyzva k opetovnemu souhlasu

Pokud se obsah souhlasu zmenil, zakaznik vidi v panelu Muj ucet zpravu s prosbou o seznameni se s novou verzi a opetovne udeleni souhlasu.

## Integrace GDPR

### Export osobnich udaju

Plugin se integruje s mechanismem exportu osobnich udaju WordPressu (`wp_privacy_personal_data_exporters`). Pri zadosti o export dat zakaznika plugin prilozi:

- seznam udelenych souhlasu s daty a verzemi
- uplnou historii zmen souhlasu (udeleni, odvolani, opetovne souhlasy)
- IP adresy a data spojena s kazdym souhlasem

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

### Mazani osobnich udaju

Plugin se integruje s mechanismem mazani dat WordPressu (`wp_privacy_personal_data_erasers`). Pri zadosti o smazani dat:

- osobni udaje v audit trail jsou anonymizovany (IP, user agent)
- zaznamy souhlasu jsou oznaceny jako smazane
- samotny fakt udeleni/odvolani souhlasu zustava (bez identifikujicich udaju) pro ucely zodpovednosti

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

Modul poskytuje endpoint REST API pro prohlizeni souhlasu (dostupny pro administratory):

### Seznam souhlasu uzivatele

```
GET /wp-json/polski-pro/v1/consents?user_id={id}
```

Vraci seznam souhlasu uzivatele s aktualnim statusem a verzi.

### Historie zmen

```
GET /wp-json/polski-pro/v1/consents/audit?user_id={id}
```

Parametry dotazu:

| Parametr | Typ | Popis |
|----------|-----|-------|
| `user_id` | int | ID uzivatele |
| `consent_id` | string | ID konkretniho souhlasu |
| `event_type` | string | Typ udalosti (granted, revoked, re_consented) |
| `date_from` | string | Datum od (YYYY-MM-DD) |
| `date_to` | string | Datum do (YYYY-MM-DD) |
| `per_page` | int | Pocet vysledku (vychozi 50) |

### Export

```
GET /wp-json/polski-pro/v1/consents/export?format={csv|json}
```

Vraci uplny export audit trail ve zvolenem formatu.

## Hooky

### `polski_pro/consent/granted`

Akce volana po udeleni souhlasu.

```php
/**
 * @param int    $user_id    ID użytkownika
 * @param string $consent_id ID zgody
 * @param int    $version    Numer wersji zgody
 */
do_action('polski_pro/consent/granted', int $user_id, string $consent_id, int $version);
```

**Priklad:**

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

Akce volana po odvolani souhlasu.

```php
/**
 * @param int    $user_id    ID użytkownika
 * @param string $consent_id ID zgody
 * @param string $source     Źródło wycofania (customer, admin)
 */
do_action('polski_pro/consent/revoked', int $user_id, string $consent_id, string $source);
```

**Priklad:**

```php
add_action('polski_pro/consent/revoked', function (int $user_id, string $consent_id, string $source): void {
    if ($consent_id === 'newsletter' && $source === 'customer') {
        // Wypisanie z newslettera
        do_action('newsletter_unsubscribe', get_userdata($user_id)->user_email);
    }
}, 10, 3);
```

## Nejcastejsi problemy

### Vyzva k opetovnemu souhlasu se nezobrazuje

1. Zkontrolujte, ze moznost "Vyzadovat opetovny souhlas" je zapnuta
2. Overite, ze se obsah souhlasu skutecne zmenil (zkontrolujte historii verzi)
3. Vycistete cache stranky pokladny a panelu Muj ucet

### Export GDPR neobsahuje data souhlasu

1. Ujistete se, ze modul spravy souhlasu je aktivni
2. Zkontrolujte, ze exporter `polski-pro-consents` je zaregistrovany v **Nastroje > Export osobnich udaju**
3. Overite logy na chyby PHP

### Audit trail roste prilis rychle

Plugin uchovava historii souhlasu v samostatne tabulce databaze. Pri velkem poctu zakazniku muze tabulka rust. Zvazte:

- pravidelny export a archivaci starsich zaznamu
- nastaveni automatickeho cisteni zaznamu starsich nez urcity pocet mesicu (moznost v nastaveni)

## Souvisejici zdroje

- [Pravni checkboxy](/checkout/legal-checkboxes/)
- [GDPR](/compliance/gdpr/)
- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
