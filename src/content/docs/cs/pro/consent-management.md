---
title: Správa souhlasů
description: Dokumentace pokročilé správy souhlasů v Polski PRO for WooCommerce - verzování, audit trail, export GDPR, integrace s Můj účet.
---

Modul správy souhlasů přidává verzování souhlasů, audit trail, export dat a integraci s GDPR. Sleduje historii souhlasů zákazníků a reaguje na změny obsahu podmínek.

## Verzování souhlasů

### Automatická detekce změn

Plugin sleduje obsah zaškrtávacích políček. Při každém uložení nastavení porovnává hash (SHA-256) obsahu. Když se obsah změní - automaticky vytvoří novou verzi souhlasu.

Každá verze souhlasu obsahuje:

- číslo verze (autoinkrementace)
- hash obsahu popisku
- úplný obsah popisku
- datum vytvoření verze
- ID uživatele, který provedl změnu

### Historie verzí

Klikněte na **Historie verzí** u zaškrtávacího políčka pro zobrazení všech verzí s daty a obsahem.

### Opětovné vyjádření souhlasu

Když se obsah souhlasu změní, plugin může vyžadovat opětovný souhlas. Nastavení:

| Nastavení | Popis |
|------------|------|
| Vyžadovat opětovný souhlas | Zapíná výzvu k opětovnému vyjádření souhlasu po změně obsahu |
| Zobrazovat výzvu | Na stránce pokladny / V panelu Můj účet / Obojí |
| Text zprávy | Text informující zákazníka o změně podmínek |

Zákazník vidí zprávu o změně a musí znovu zaškrtnout políčko. Dřívější souhlas zůstává v historii.

## Audit trail

### Zaznamenávané události

Plugin zaznamenává všechny operace se souhlasy:

| Událost | Data |
|-----------|------|
| Souhlas vyjádřen | ID uživatele, ID souhlasu, verze, datum, IP, user agent |
| Souhlas odvolán | ID uživatele, ID souhlasu, datum, zdroj (zákazník/admin) |
| Změna obsahu souhlasu | ID souhlasu, stará verze, nová verze, datum, ID admina |
| Výzva k opětovnému souhlasu | ID uživatele, ID souhlasu, datum |
| Opětovný souhlas | ID uživatele, ID souhlasu, nová verze, datum |

### Prohlížení historie

Přejděte na **WooCommerce > Nastavení > Polski > Moduly PRO > Souhlasy > Audit trail**. Filtrujte události podle:

- ID uživatele nebo e-mail
- typ události
- rozsah dat
- konkrétní souhlas

### Export dat

Exportujte audit trail ve formátu:

- **CSV** - do tabulkového procesoru
- **JSON** - pro programové zpracování

Exportujte úplnou historii nebo filtrované výsledky z panelu Audit trail.

## Integrace s panelem Můj účet

### Odvolání souhlasu

V **Můj účet** zákazník vidí sekci "Moje souhlasy". Může:

- prohlížet aktuálně vyjádřené souhlasy
- zobrazit datum vyjádření každého souhlasu
- odvolat souhlas tlačítkem "Odvolat"

Odvolání se zaznamenává do audit trail. Administrátor obdrží e-mailové upozornění (konfigurovatelné).

### Výzva k opětovnému souhlasu

Když se obsah souhlasu změní, zákazník vidí v Můj účet žádost o seznámení se s novou verzí a o opětovný souhlas.

## Integrace GDPR

### Export osobních údajů

Plugin se integruje s exportem dat WordPress (`wp_privacy_personal_data_exporters`). Při exportu dat zákazníka přikládá:

- seznam vyjádřených souhlasů s daty a verzemi
- úplnou historii změn souhlasů (vyjádření, odvolání, opětovné souhlasy)
- IP adresy a data spojená s každým souhlasem

```php
/**
 * Registrace exportéru osobních údajů.
 */
add_filter('wp_privacy_personal_data_exporters', function (array $exporters): array {
    $exporters['polski-pro-consents'] = [
        'exporter_friendly_name' => 'Polski PRO - Souhlasy',
        'callback'               => [PolskiPro\Privacy\Exporter::class, 'export'],
    ];
    return $exporters;
});
```

### Mazání osobních údajů

Plugin se integruje s mazáním dat WordPress (`wp_privacy_personal_data_erasers`). Při mazání dat:

- osobní údaje v audit trail jsou anonymizovány (IP, user agent)
- záznamy souhlasů jsou označeny jako smazané
- samotný fakt vyjádření/odvolání souhlasu zůstává (bez identifikujících údajů) pro účely odpovědnosti

```php
/**
 * Registrace eraseru osobních údajů.
 */
add_filter('wp_privacy_personal_data_erasers', function (array $erasers): array {
    $erasers['polski-pro-consents'] = [
        'eraser_friendly_name' => 'Polski PRO - Souhlasy',
        'callback'             => [PolskiPro\Privacy\Eraser::class, 'erase'],
    ];
    return $erasers;
});
```

## REST API

Modul zpřístupňuje endpoint REST API pro prohlížení souhlasů (dostupný administrátorům):

### Seznam souhlasů uživatele

```
GET /wp-json/polski-pro/v1/consents?user_id={id}
```

Vrací seznam souhlasů uživatele s aktuálním stavem a verzí.

### Historie změn

```
GET /wp-json/polski-pro/v1/consents/audit?user_id={id}
```

Query parametry:

| Parametr | Typ | Popis |
|----------|-----|------|
| `user_id` | int | ID uživatele |
| `consent_id` | string | ID konkrétního souhlasu |
| `event_type` | string | Typ události (granted, revoked, re_consented) |
| `date_from` | string | Datum od (YYYY-MM-DD) |
| `date_to` | string | Datum do (YYYY-MM-DD) |
| `per_page` | int | Počet výsledků (výchozí 50) |

### Export

```
GET /wp-json/polski-pro/v1/consents/export?format={csv|json}
```

Vrací úplný export audit trail ve vybraném formátu.

## Hooky

### `polski_pro/consent/granted`

Akce volaná po vyjádření souhlasu.

```php
/**
 * @param int    $user_id    ID uživatele
 * @param string $consent_id ID souhlasu
 * @param int    $version    Číslo verze souhlasu
 */
do_action('polski_pro/consent/granted', int $user_id, string $consent_id, int $version);
```

**Příklad:**

```php
add_action('polski_pro/consent/granted', function (int $user_id, string $consent_id, int $version): void {
    // Synchronizace s externím CRM
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

Akce volaná po odvolání souhlasu.

```php
/**
 * @param int    $user_id    ID uživatele
 * @param string $consent_id ID souhlasu
 * @param string $source     Zdroj odvolání (customer, admin)
 */
do_action('polski_pro/consent/revoked', int $user_id, string $consent_id, string $source);
```

**Příklad:**

```php
add_action('polski_pro/consent/revoked', function (int $user_id, string $consent_id, string $source): void {
    if ($consent_id === 'newsletter' && $source === 'customer') {
        // Odhlášení z newsletteru
        do_action('newsletter_unsubscribe', get_userdata($user_id)->user_email);
    }
}, 10, 3);
```

## Nejčastější problémy

### Výzva k opětovnému souhlasu se nezobrazuje

1. Zkontrolujte, zda je možnost "Vyžadovat opětovný souhlas" zapnutá
2. Ověřte, zda se obsah souhlasu skutečně změnil (zkontrolujte historii verzí)
3. Vyprázdněte cache stránky pokladny a panelu Můj účet

### Export GDPR neobsahuje data souhlasů

1. Ujistěte se, že je modul správy souhlasů aktivní
2. Zkontrolujte, zda je exportér `polski-pro-consents` registrován v **Nástroje > Export osobních údajů**
3. Ověřte logy z hlediska chyb PHP

### Audit trail roste příliš rychle

Historie souhlasů je v samostatné tabulce. Při mnoha zákaznících může růst. Zvažte:

- pravidelné exportování a archivaci starších záznamů
- nastavení automatického čištění záznamů starších než určený počet měsíců (možnost v nastavení)

## Související zdroje

- [Právní zaškrtávací políčka](/checkout/legal-checkboxes/)
- [GDPR](/compliance/gdpr/)
- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
