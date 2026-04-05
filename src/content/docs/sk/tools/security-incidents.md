---
title: Register bezpečnostných incidentov
description: Register bezpečnostných incidentov (CRA) v Polski for WooCommerce - zaznamenávanie udalostí, export CSV a súlad s Cyber Resilience Act.
---

Register bezpečnostných incidentov umožňuje dokumentovať a spravovať bezpečnostné udalosti v obchode WooCommerce. Funkcia podporuje súlad s Cyber Resilience Act (CRA) - európskym nariadením vyžadujúcim od predajcov vedenie registra incidentov týkajúcich sa produktov s digitálnymi prvkami.

## Čo je CRA

Cyber Resilience Act (CRA) je nariadenie Európskej únie ustanovujúce požiadavky na kybernetickú bezpečnosť produktov s digitálnymi prvkami. Predajcovia sú povinní:

- Viesť register bezpečnostných incidentov
- Hlásiť incidenty dozorným orgánom v lehote 24 hodín
- Informovať zákazníkov o zistených bezpečnostných zraniteľnostiach
- Dokumentovať nápravné opatrenia

## Prístup k registru

Prejdite do **WooCommerce > Polski > Nástroje > Bezpečnostné incidenty**. Register je dostupný pre používateľov s oprávnením `manage_woocommerce`.

## Zaznamenávanie incidentu

Kliknite na **Pridať incident** a vyplňte formulár:

### Polia formulára

| Pole                    | Typ       | Povinné | Popis                                    |
| ----------------------- | --------- | -------- | --------------------------------------- |
| Nadpis                  | text      | Áno      | Krátky popis incidentu                   |
| Dátum zistenia          | datetime  | Áno      | Kedy bol incident zistený                |
| Dátum výskytu           | datetime  | Nie      | Kedy incident skutočne nastal            |
| Kategória               | select    | Áno      | Typ incidentu                            |
| Priorita                | select    | Áno      | Kritická / Vysoká / Stredná / Nízka      |
| Popis                   | textarea  | Áno      | Podrobný popis udalosti                  |
| Dotknuté produkty       | multiselect| Nie     | WooCommerce produkty dotknuté incidentom  |
| Rozsah dopadu           | select    | Áno      | Počet dotknutých zákazníkov              |
| Vykonané opatrenia      | textarea  | Nie      | Popis nápravných opatrení                |
| Stav                    | select    | Áno      | Nový / Spracovávaný / Vyriešený / Uzavretý |
| Zodpovedná osoba        | select    | Nie      | WordPress používateľ zodpovedný           |
| Nahlásené orgánu        | checkbox  | Nie      | Či bol incident nahlásený dozornému orgánu|
| Zákazníci upovedomení   | checkbox  | Nie      | Či boli zákazníci upovedomení            |

### Kategórie incidentov

| Kategória                | Popis                                         |
| ------------------------ | -------------------------------------------- |
| Únik údajov              | Neautorizovaný prístup k osobným údajom       |
| Škodlivý softvér         | Malware, skimmer, backdoor                     |
| DDoS útok                | Útok odmietnutia služby                        |
| Neautorizovaný prístup   | Nabúranie na admin alebo zákaznícky účet       |
| Zraniteľnosť softvéru    | Objavená zraniteľnosť v plugine alebo téme     |
| Phishing                 | Phishingový útok na zákazníkov obchodu         |
| Manipulácia údajov       | Neautorizovaná zmena údajov (ceny, objednávky) |
| Iné                      | Iné bezpečnostné udalosti                      |

## Zoznam incidentov

Register zobrazuje tabuľku všetkých incidentov so stĺpcami:

- **ID** - číslo incidentu
- **Dátum** - dátum zistenia
- **Nadpis** - krátky popis
- **Kategória** - typ incidentu
- **Priorita** - farebná etiketa (červená/oranžová/žltá/šedá)
- **Stav** - aktuálny stav
- **Zodpovedný** - priradená osoba
- **Hlásenie** - či bolo nahlásené dozornému orgánu

## Časová os incidentu (timeline)

Každý incident má časovú os dokumentujúcu chronológiu akcií:

```
2025-06-15 08:30 - Incident zistený monitorovacím systémom
2025-06-15 08:45 - Incident priradený Jánovi Kowalskému
2025-06-15 09:00 - Začatá analýza logov
2025-06-15 10:30 - Identifikovaný zdroj - neautorizovaný prístup cez zraniteľnosť v plugine X
2025-06-15 11:00 - Plugin X aktualizovaný na najnovšiu verziu
2025-06-15 11:30 - Heslá všetkých administrátorov zmenené
2025-06-15 12:00 - Incident nahlásený UODO
2025-06-15 14:00 - Oznámenie zaslané dotknutým zákazníkom
2025-06-15 15:00 - Stav zmenený na "Vyriešený"
```

## Export CSV

Kliknite na **Exportovať CSV** nad tabuľkou incidentov. Export obsahuje všetky stĺpce incidentu s možnosťou filtrovania podľa rozsahu dátumov, kategórie a stavu.

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

## Oznámenia

Systém zasiela automatické oznámenia:

| Udalosť                           | Príjemcovia             | Kanál  |
| ---------------------------------- | ----------------------- | ------ |
| Nový kritický incident             | Všetci administrátori   | E-mail |
| Zmena stavu incidentu              | Zodpovedná osoba        | E-mail |
| Incident bez akcií > 24h           | Zodpovedná osoba        | E-mail |
| Blížiaci sa termín hlásenia        | Administrátori          | E-mail |

## Automatická detekcia

Modul môže automaticky zaznamenávať niektoré udalosti:

- **Neúspešné prihlásenia** - séria neúspešných pokusov o prihlásenie (brute force)
- **Zmena súborov jadra** - modifikácia súborov WordPress core
- **Nový admin používateľ** - vytvorenie účtu s rolou administrátora
- **Zmena oprávnení** - zvýšenie oprávnení existujúceho účtu

```php
// Vypnutie automatickej detekcie
add_filter('polski/security_incidents/auto_detect', '__return_false');
```

## Programové pridávanie incidentov

```php
do_action('polski/security_incidents/create', [
    'title'          => 'Wykryto próbę SQL injection',
    'category'       => 'unauthorized_access',
    'priority'       => 'high',
    'description'    => 'Wykryto próbę SQL injection w parametrze product_id.',
    'detection_date' => current_time('mysql'),
    'status'         => 'new',
]);
```

## Riešenie problémov

**Oznámenia nedochádzajú** - skontrolujte konfiguráciu e-mailu WordPressu. Odporúča sa použitie SMTP pluginu (napr. WP Mail SMTP).

**Export CSV vracia prázdny súbor** - skontrolujte filtrovanie. Ak sú filtre nastavené príliš reštriktívne, výsledok môže byť prázdny.

**Automatická detekcia generuje príliš veľa alertov** - prispôsobte prahy v nastaveniach modulu.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
