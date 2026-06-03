---
title: Registr bezpečnostních incidentů
description: Registr bezpečnostních incidentů (CRA) v Polski for WooCommerce - evidence událostí, export CSV a soulad s Cyber Resilience Act.
---

Registr incidentů umožňuje dokumentovat bezpečnostní události v obchodě. Podporuje soulad s Cyber Resilience Act (CRA), nařízením EU vyžadujícím registr incidentů pro produkty s digitálními prvky.

## Co je CRA

CRA je nařízení EU týkající se kybernetické bezpečnosti produktů s digitálními prvky. Prodejci musí:

- Vést registr bezpečnostních incidentů
- Hlásit incidenty dozorovým orgánům do 24 hodin
- Informovat zákazníky o zjištěných zranitelnostech
- Dokumentovat nápravná opatření

## Přístup k registru

Přejděte na **WooCommerce > Polski > Nástroje > Bezpečnostní incidenty**. Vyžaduje oprávnění `manage_woocommerce`.

## Evidence incidentu

Klikněte na **Přidat incident** a vyplňte formulář:

### Pole formuláře

| Pole                    | Typ       | Povinné | Popis                                   |
| ----------------------- | --------- | -------- | --------------------------------------- |
| Název                   | text      | Ano      | Krátký popis incidentu                  |
| Datum zjištění           | datetime  | Ano      | Kdy byl incident zjištěn                |
| Datum výskytu            | datetime  | Ne       | Kdy incident skutečně nastal            |
| Kategorie               | select    | Ano      | Typ incidentu                           |
| Priorita                | select    | Ano      | Kritická / Vysoká / Střední / Nízká     |
| Popis                   | textarea  | Ano      | Podrobný popis události                 |
| Dotčené produkty         | multiselect| Ne      | Produkty WooCommerce dotčené incidentem |
| Rozsah dopadu           | select    | Ano      | Počet dotčených zákazníků               |
| Provedená opatření      | textarea  | Ne       | Popis nápravných opatření               |
| Stav                    | select    | Ano      | Nový / Probíhá / Vyřešen / Uzavřen      |
| Odpovědná osoba         | select    | Ne       | Odpovědný uživatel WordPress            |
| Nahlášeno orgánu        | checkbox  | Ne       | Zda byl incident nahlášen dozorovému orgánu|
| Datum nahlášení          | datetime  | Ne       | Kdy byl nahlášen orgánu                 |
| Zákazníci informováni   | checkbox  | Ne       | Zda byli zákazníci informováni          |
| Datum informování      | datetime  | Ne       | Kdy byli zákazníci informováni          |
| Přílohy                 | file      | Ne       | Logy, snímky obrazovky, zprávy          |

### Kategorie incidentů

| Kategorie                | Popis                                        |
| ------------------------ | -------------------------------------------- |
| Únik dat                 | Neoprávněný přístup k osobním údajům          |
| Škodlivý software        | Malware, skimmer, backdoor                   |
| Útok DDoS                | Útok odepření služby                          |
| Neoprávněný přístup      | Vniknutí na účet administrátora nebo zákazníka|
| Zranitelnost softwaru    | Objevená zranitelnost v pluginu nebo šabloně |
| Phishing                 | Phishingový útok na zákazníky obchodu         |
| Manipulace s daty        | Neoprávněná změna dat (ceny, objednávky)     |
| Jiné                     | Jiné bezpečnostní události                   |

### Škála dopadu

| Rozsah                  | Popis                                         |
| ----------------------- | --------------------------------------------- |
| Bez dopadu              | Incident zjištěn a zablokován                 |
| Jeden zákazník          | Týká se 1 zákazníka                           |
| Několik zákazníků       | Týká se 2-10 zákazníků                        |
| Mnoho zákazníků         | Týká se 11-100 zákazníků                      |
| Hromadný                | Týká se více než 100 zákazníků                |

## Seznam incidentů

Tabulka všech incidentů se sloupci:

- **ID** - číslo incidentu
- **Datum** - datum zjištění
- **Název** - krátký popis
- **Kategorie** - typ incidentu
- **Priorita** - barevný štítek (červený/oranžový/žlutý/šedý)
- **Stav** - aktuální stav
- **Odpovědný** - přiřazená osoba
- **Nahlášení** - zda bylo nahlášeno dozorovému orgánu

### Filtrování a řazení

Filtrujte incidenty podle:
- Kategorie
- Priority
- Stavu
- Data (rozsah dat)
- Odpovědné osoby

Řazení podle každého sloupce (vzestupně/sestupně).

### Vyhledávání

Vyhledávací pole prohledává název a popis incidentů.

## Časová osa incidentu (timeline)

Každý incident má časovou osu s chronologií akcí:

```
2025-06-15 08:30 - Incident zjištěn monitorovacím systémem
2025-06-15 08:45 - Incident přiřazen Janu Kowalskému
2025-06-15 09:00 - Zahájena analýza logů
2025-06-15 10:30 - Identifikován zdroj - neoprávněný přístup přes zranitelnost v pluginu X
2025-06-15 11:00 - Plugin X aktualizován na nejnovější verzi
2025-06-15 11:30 - Hesla všech administrátorů změněna
2025-06-15 12:00 - Incident nahlášen úřadu pro ochranu osobních údajů
2025-06-15 14:00 - Oznámení odesláno dotčeným zákazníkům
2025-06-15 15:00 - Stav změněn na "Vyřešen"
```

Záznamy se přidávají automaticky (změna stavu, přiřazení) nebo ručně (poznámky, akce).

## Export CSV

Klikněte na **Exportovat CSV** nad tabulkou. Export obsahuje:

### Sloupce exportu

| Sloupec                 | Popis                               |
| ----------------------- | ----------------------------------- |
| `incident_id`           | Číslo incidentu                     |
| `title`                 | Název                               |
| `detection_date`        | Datum zjištění                      |
| `occurrence_date`       | Datum výskytu                       |
| `category`              | Kategorie                           |
| `priority`              | Priorita                            |
| `description`           | Popis                               |
| `affected_products`     | ID dotčených produktů               |
| `impact_scope`          | Rozsah dopadu                       |
| `actions_taken`         | Provedená opatření                  |
| `status`                | Stav                                |
| `responsible_person`    | Odpovědná osoba                     |
| `reported_to_authority` | Zda bylo nahlášeno orgánu           |
| `report_date`           | Datum nahlášení                     |
| `customers_notified`    | Zda byli zákazníci informováni      |
| `notification_date`     | Datum informování                   |
| `resolution_date`       | Datum vyřešení                      |

### Filtrování exportu

Export lze omezit na:
- Vybraný rozsah dat
- Vybranou kategorii
- Vybraný stav

```php
// Hook pro úpravu dat exportu
add_filter('polski/security_incidents/export_data', function (array $data): array {
    // Přidání vlastního sloupce
    foreach ($data as &$row) {
        $row['custom_field'] = 'hodnota';
    }
    return $data;
});
```

## Oznámení

Automatická oznámení:

| Událost                            | Příjemci                | Kanál  |
| ---------------------------------- | ----------------------- | ------ |
| Nový kritický incident             | Všichni administrátoři  | E-mail |
| Změna stavu incidentu              | Odpovědná osoba         | E-mail |
| Incident bez akcí > 24h            | Odpovědná osoba         | E-mail |
| Blížící se termín nahlášení        | Administrátoři          | E-mail |

Konfigurace oznámení: **WooCommerce > Polski > Nástroje > Incidenty > Oznámení**.

## Automatická detekce

Modul automaticky eviduje některé události:

- **Neúspěšná přihlášení** - série neúspěšných pokusů o přihlášení (brute force)
- **Změna souborů jádra** - úprava souborů WordPress core
- **Nový admin uživatel** - vytvoření účtu s rolí administrátora
- **Změna oprávnění** - povýšení oprávnění stávajícího účtu

Zjištěné události mají přiřazenou kategorii a prioritu, ale vyžadují ruční ověření (stav "Nový").

```php
// Vypnutí automatické detekce
add_filter('polski/security_incidents/auto_detect', '__return_false');
```

## Programové přidávání incidentů

```php
do_action('polski/security_incidents/create', [
    'title'          => 'Zjištěn pokus o SQL injection',
    'category'       => 'unauthorized_access',
    'priority'       => 'high',
    'description'    => 'Zjištěn pokus o SQL injection v parametru product_id.',
    'detection_date' => current_time('mysql'),
    'status'         => 'new',
]);
```

## Řešení problémů

**Oznámení nedorazí** - zkontrolujte konfiguraci e-mailu WordPressu. Použijte SMTP plugin (např. WP Mail SMTP) místo výchozího `wp_mail()`.

**Export CSV vrací prázdný soubor** - zkontrolujte filtry. Příliš restriktivní filtrování dává prázdný výsledek.

**Příliš mnoho upozornění** - upravte prahové hodnoty v nastavení. Výchozí práh neúspěšných přihlášení (5 za 15 minut) může být pro velké obchody příliš nízký.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
