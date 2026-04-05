---
title: Registr bezpecnostnich incidentu
description: Registr bezpecnostnich incidentu (CRA) v Polski for WooCommerce - zaznamenavani udalosti, CSV export a soulad s Cyber Resilience Act.
---

Registr incidentu umoznuje dokumentovat bezpecnostni udalosti v obchode. Podporuje soulad s Cyber Resilience Act (CRA) - unijnim narizenim vyzadujicim registr incidentu pro produkty s digitalnimi elementy.

## Co je CRA

Cyber Resilience Act (CRA) je narizeni Evropske unie stanovujici pozadavky kyberneticke bezpecnosti pro produkty s digitalnimi elementy. Prodejci jsou povinni:

- Vest registr bezpecnostnich incidentu
- Hlasit incidenty dozorovym organum do 24 hodin
- Informovat zakazniky o odhalanych bezpecnostnich mezerach
- Dokumentovat napravna opatreni

## Pristup k registru

Prejdete do **WooCommerce > Polski > Nastroje > Bezpecnostni incidenty**. Registr je dostupny pro uzivatele s opravnenim `manage_woocommerce`.

## Zaznamenavani incidentu

Kliknete **Pridat incident** a vyplnte formular:

### Pole formulare

| Pole | Typ | Povinne | Popis |
| ----------------------- | --------- | -------- | --------------------------------------- |
| Nazev | text | Ano | Kratky popis incidentu |
| Datum detekce | datetime | Ano | Kdy byl incident odhalen |
| Datum vyskytu | datetime | Ne | Kdy incident skutecne nastal |
| Kategorie | select | Ano | Typ incidentu |
| Priorita | select | Ano | Kriticka / Vysoka / Stredni / Nizka |
| Popis | textarea | Ano | Podrobny popis udalosti |
| Dotcene produkty | multiselect| Ne | Produkty WooCommerce dotcene incidentem |
| Rozsah dopadu | select | Ano | Pocet dotcenych zakazniku |
| Provedena opatreni | textarea | Ne | Popis napravnych opatreni |
| Stav | select | Ano | Novy / Probiha / Vyresen / Uzavren |
| Odpovedna osoba | select | Ne | Uzivatel WordPress odpovědny |
| Nahlaseno organu | checkbox | Ne | Zda byl incident nahlasen dozoroveho organu |
| Zakaznici informovani | checkbox | Ne | Zda byli zakaznici informovani |

### Kategorie incidentu

| Kategorie | Popis |
| ------------------------ | -------------------------------------------- |
| Unik dat | Neopravneny pristup k osobnim udajum |
| Skodlivy software | Malware, skimmer, backdoor |
| DDoS utok | Utok odmitnutim sluzby |
| Neopravneny pristup | Prolomeni uctu admina nebo zakaznika |
| Zranitelnost softwaru | Objevenena zranitelnost v pluginu nebo motivu |
| Phishing | Phishingovy utok na zakazniky obchodu |
| Manipulace s daty | Neopravnena zmena dat (ceny, objednavky) |
| Jine | Jine bezpecnostni udalosti |

## CSV export

Kliknete **Exportovat CSV** nad tabulkou incidentu. Export obsahuje vsechna pole vcetne ID, data, kategorie, priority, stavu, odpovědne osoby a dat nahlaseni.

## Oznameni

System odesila automaticka oznameni:

| Udalost | Prijemci | Kanal |
| ---------------------------------- | ----------------------- | ------ |
| Novy kriticky incident | Vsichni administratori | E-mail |
| Zmena stavu incidentu | Odpovedna osoba | E-mail |
| Incident bez opatreni > 24h | Odpovedna osoba | E-mail |
| Blizici se termin nahlaseni | Administratori | E-mail |

## Automaticka detekce

Modul muze automaticky zaznamenavat nektere udalosti:

- **Neuspesne prihlaseni** - serie neuspesnych pokusu o prihlaseni (brute force)
- **Zmena souboru jadra** - modifikace souboru WordPress core
- **Novy admin uzivatel** - vytvoreni uctu s roli administratora
- **Zmena opravneni** - zvyseni opravneni existujiciho uctu

```php
// Deaktivace automaticke detekce
add_filter('polski/security_incidents/auto_detect', '__return_false');
```

## Programove pridavani incidentu

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

## Reseni problemu

**Oznameni nedochazi** - zkontrolujte konfiguraci e-mailu WordPressu. Doporuceno je pouziti SMTP pluginu.

**CSV export vraci prazdny soubor** - zkontrolujte filtrovani. Prilis restriktivni filtry mohou vracet prazdny vysledek.

**Automaticka detekce generuje prilis mnoho alertu** - prizpusobte prahy v nastaveních modulu.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
