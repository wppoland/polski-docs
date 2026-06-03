---
title: Register bezpečnostných incidentov
description: Register bezpečnostných incidentov (CRA) v Polski for WooCommerce - evidovanie udalostí, export CSV a súlad s Cyber Resilience Act.
---

Register incidentov umožňuje dokumentovať bezpečnostné udalosti v obchode. Podporuje súlad s Cyber Resilience Act (CRA) - nariadením EÚ, ktoré vyžaduje register incidentov pre produkty s digitálnymi prvkami.

## Čo je CRA

CRA je nariadenie EÚ týkajúce sa kybernetickej bezpečnosti produktov s digitálnymi prvkami. Predajcovia musia:

- Viesť register bezpečnostných incidentov
- Hlásiť incidenty dozorným orgánom do 24 hodín
- Informovať zákazníkov o zistených zraniteľnostiach
- Dokumentovať nápravné opatrenia

## Prístup k registru

Prejdite do **WooCommerce > Polski > Nástroje > Bezpečnostné incidenty**. Vyžaduje oprávnenie `manage_woocommerce`.

## Evidovanie incidentu

Kliknite na **Pridať incident** a vyplňte formulár:

### Polia formulára

| Pole                    | Typ       | Povinné | Popis                                   |
| ----------------------- | --------- | -------- | --------------------------------------- |
| Názov                   | text      | Áno      | Krátky popis incidentu                  |
| Dátum zistenia          | datetime  | Áno      | Kedy bol incident zistený               |
| Dátum výskytu           | datetime  | Nie      | Kedy incident skutočne nastal           |
| Kategória               | select    | Áno      | Typ incidentu                           |
| Priorita                | select    | Áno      | Kritická / Vysoká / Stredná / Nízka     |
| Popis                   | textarea  | Áno      | Podrobný popis udalosti                 |
| Dotknuté produkty       | multiselect| Nie     | Produkty WooCommerce dotknuté incidentom |
| Rozsah dopadu           | select    | Áno      | Počet dotknutých zákazníkov             |
| Vykonané opatrenia      | textarea  | Nie      | Popis nápravných opatrení               |
| Stav                    | select    | Áno      | Nový / Prebieha / Vyriešený / Uzavretý  |
| Zodpovedná osoba        | select    | Nie      | Zodpovedný používateľ WordPress         |
| Nahlásené orgánu        | checkbox  | Nie      | Či bol incident nahlásený dozornému orgánu|
| Dátum nahlásenia        | datetime  | Nie      | Kedy bol nahlásený orgánu               |
| Zákazníci upozornení    | checkbox  | Nie      | Či boli zákazníci upozornení            |
| Dátum upozornenia       | datetime  | Nie      | Kedy boli zákazníci upozornení          |
| Prílohy                 | file      | Nie      | Logy, snímky obrazovky, správy          |

### Kategórie incidentov

| Kategória                | Popis                                        |
| ------------------------ | -------------------------------------------- |
| Únik dát                 | Neautorizovaný prístup k osobným údajom      |
| Škodlivý softvér         | Malware, skimmer, backdoor                   |
| Útok DDoS                | Útok odmietnutia služby                      |
| Neautorizovaný prístup   | Vlámanie do účtu admina alebo zákazníka      |
| Zraniteľnosť softvéru    | Objavená zraniteľnosť v plugine alebo šablóne|
| Phishing                 | Phishingový útok na zákazníkov obchodu       |
| Manipulácia s dátami     | Neautorizovaná zmena údajov (ceny, objednávky) |
| Iné                      | Iné bezpečnostné udalosti                    |

### Škála dopadu

| Rozsah                  | Popis                                         |
| ----------------------- | --------------------------------------------- |
| Bez dopadu              | Incident zistený a zablokovaný                |
| Jeden zákazník          | Týka sa 1 zákazníka                           |
| Niekoľko zákazníkov     | Týka sa 2-10 zákazníkov                       |
| Mnoho zákazníkov        | Týka sa 11-100 zákazníkov                     |
| Masový                  | Týka sa viac ako 100 zákazníkov               |

## Zoznam incidentov

Tabuľka všetkých incidentov so stĺpcami:

- **ID** - číslo incidentu
- **Dátum** - dátum zistenia
- **Názov** - krátky popis
- **Kategória** - typ incidentu
- **Priorita** - farebný štítok (červený/oranžový/žltý/sivý)
- **Stav** - aktuálny stav
- **Zodpovedný** - priradená osoba
- **Nahlásenie** - či bol nahlásený dozornému orgánu

### Filtrovanie a triedenie

Filtrujte incidenty podľa:
- Kategórie
- Priority
- Stavu
- Dátumu (rozsah dátumov)
- Zodpovednej osoby

Triedenie podľa každého stĺpca (vzostupne/zostupne).

### Vyhľadávanie

Pole vyhľadávania prehľadáva názov a popis incidentov.

## Časová os incidentu (timeline)

Každý incident má časovú os s chronológiou činností:

```
2025-06-15 08:30 - Incident zistený monitorovacím systémom
2025-06-15 08:45 - Incident priradený Jánovi Kováčovi
2025-06-15 09:00 - Začatá analýza logov
2025-06-15 10:30 - Identifikovaný zdroj - neautorizovaný prístup cez zraniteľnosť v plugine X
2025-06-15 11:00 - Plugin X aktualizovaný na najnovšiu verziu
2025-06-15 11:30 - Heslá všetkých administrátorov zmenené
2025-06-15 12:00 - Incident nahlásený úradu na ochranu osobných údajov
2025-06-15 14:00 - Upozornenie odoslané dotknutým zákazníkom
2025-06-15 15:00 - Stav zmenený na "Vyriešený"
```

Záznamy sa pridávajú automaticky (zmena stavu, priradenie) alebo ručne (poznámky, opatrenia).

## Export CSV

Kliknite na **Exportovať CSV** nad tabuľkou. Export obsahuje:

### Stĺpce exportu

| Stĺpec                  | Popis                               |
| ----------------------- | ----------------------------------- |
| `incident_id`           | Číslo incidentu                     |
| `title`                 | Názov                               |
| `detection_date`        | Dátum zistenia                      |
| `occurrence_date`       | Dátum výskytu                       |
| `category`              | Kategória                           |
| `priority`              | Priorita                            |
| `description`           | Popis                               |
| `affected_products`     | ID dotknutých produktov             |
| `impact_scope`          | Rozsah dopadu                       |
| `actions_taken`         | Vykonané opatrenia                  |
| `status`                | Stav                                |
| `responsible_person`    | Zodpovedná osoba                    |
| `reported_to_authority` | Či bol nahlásený orgánu             |
| `report_date`           | Dátum nahlásenia                    |
| `customers_notified`    | Či boli zákazníci upozornení        |
| `notification_date`     | Dátum upozornenia                   |
| `resolution_date`       | Dátum vyriešenia                    |

### Filtrovanie exportu

Export možno obmedziť na:
- Zvolený rozsah dátumov
- Zvolenú kategóriu
- Zvolený stav

```php
// Hook na úpravu údajov exportu
add_filter('polski/security_incidents/export_data', function (array $data): array {
    // Pridanie vlastného stĺpca
    foreach ($data as &$row) {
        $row['custom_field'] = 'hodnota';
    }
    return $data;
});
```

## Upozornenia

Automatické upozornenia:

| Udalosť                            | Príjemcovia             | Kanál  |
| ---------------------------------- | ----------------------- | ------ |
| Nový kritický incident             | Všetci administrátori   | E-mail |
| Zmena stavu incidentu              | Zodpovedná osoba        | E-mail |
| Incident bez opatrení > 24 h       | Zodpovedná osoba        | E-mail |
| Blížiaci sa termín nahlásenia      | Administrátori          | E-mail |

Konfigurácia upozornení: **WooCommerce > Polski > Nástroje > Incidenty > Upozornenia**.

## Automatické zisťovanie

Modul automaticky eviduje niektoré udalosti:

- **Neúspešné prihlásenia** - séria neúspešných pokusov o prihlásenie (brute force)
- **Zmena súborov jadra** - úprava súborov WordPress core
- **Nový používateľ admin** - vytvorenie účtu s rolou administrátora
- **Zmena oprávnení** - zvýšenie oprávnení existujúceho účtu

Zistené udalosti majú priradenú kategóriu a prioritu, ale vyžadujú ručné overenie (stav "Nový").

```php
// Vypnutie automatického zisťovania
add_filter('polski/security_incidents/auto_detect', '__return_false');
```

## Programové pridávanie incidentov

```php
do_action('polski/security_incidents/create', [
    'title'          => 'Zistený pokus o SQL injection',
    'category'       => 'unauthorized_access',
    'priority'       => 'high',
    'description'    => 'Zistený pokus o SQL injection v parametri product_id.',
    'detection_date' => current_time('mysql'),
    'status'         => 'new',
]);
```

## Riešenie problémov

**Upozornenia neprichádzajú** - skontrolujte konfiguráciu e-mailu WordPressu. Použite plugin SMTP (napr. WP Mail SMTP) namiesto predvoleného `wp_mail()`.

**Export CSV vracia prázdny súbor** - skontrolujte filtre. Príliš reštriktívne filtrovanie dáva prázdny výsledok.

**Príliš veľa upozornení** - upravte prahy v nastaveniach. Predvolený prah neúspešných prihlásení (5 za 15 minút) môže byť príliš nízky pre veľké obchody.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výhradne informačný charakter a nepredstavuje právne poradenstvo. Pred zavedením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
