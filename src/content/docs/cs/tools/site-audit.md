---
title: Audit obchodu
description: Nastroj auditu obchodu v Polski for WooCommerce - overeni pravnich stranek, dark patterns, DPA, DSA, KSeF, greenwashing a bezpecnosti.
---

Audit obchodu je nastroj automaticky skenujici obchod WooCommerce z hlediska souladu s polskym a unijnim pravem e-commerce. Na rozdil od panelu souladu (checklist) audit provadi hloubkovou analyzu obsahu stranek, uzivatelskeho rozhrani a technicke konfigurace.

## Spusteni auditu

Prejdete do **WooCommerce > Polski > Nastroje > Audit obchodu** a kliknete **Spustit audit**. Audit trva od nekolika sekund do nekolika minut v zavislosti na poctu produktu a stranek.

Audit lze take spustit z WP-CLI:

```bash
wp polski smoke-test --module=audit --verbose
```

## Rozsah auditu

### Pravni stranky

Audit analyzuje obsah pravnich stranek z hlediska:

**Obchodni podminky:**
- Pritomnost vyzadovanych sekci (udaje firmy, postup objednavek, platby, doruceni, odstoupeni, reklamace)
- Kontaktni udaje prodejce (nazev, adresa, NIP, e-mail, telefon)
- Informace o mimosoudnim reseni sporu
- Informace o platforme ODR

**Zasady ochrany osobnich udaju:**
- Udaje spravce osobnich udaju
- Ucely zpracovani dat
- Pravni zaklady zpracovani
- Informace o pravech subjektu udaju
- Informace o cookies

### Dark patterns

Audit detekuje navrhove vzory povazovane za manipulativni (dark patterns) v souladu se smernici DSA a polskym pravem:

| Vzorec | Popis | Uroven |
| -------------------------- | ---------------------------------------------- | ------- |
| Preselected checkboxes | Ve vychozim stavu zaznacene checkboxy souhlasu | FAIL |
| Hidden costs | Naklady objevujici se az na pokladne | FAIL |
| Countdown timers | Falesne odpocitavaci casovace | WARN |
| Fake scarcity | Umelne zpravy o nizkem skladu | WARN |
| Forced account creation | Vynucovani registrace pred nakupem | WARN |
| Difficult unsubscribe | Ztizeny proces odhlaseni z newsletteru | FAIL |

### DPA (Data Processing Agreement)

Audit overuje smlouvy o zpracovani dat:

- Zda obchod vyuziva externi sluzby zpracovavajici data (analytics, e-mail marketing, platebni brany)
- Zda k detekovanym sluzbam existuji prislusne smlouvy DPA
- Seznam detekovaných sluzeb: Google Analytics, Facebook Pixel, Mailchimp, GetResponse, PayU, Przelewy24, Stripe

### DSA (Digital Services Act)

Audit kontroluje pozadavky DSA:

- Formular hlaseni nelegalniho obsahu
- Kontaktni misto
- Informace o moderovani obsahu
- Registr hlaseni

### KSeF

Audit overuje pripravenost na integraci s KSeF:

- NIP firmy - spravnost formatu a overeni v registru
- Pripojeni k API KSeF
- Pole NIP na pokladne

### Greenwashing

Audit analyzuje environmentalni prohlaseni na produktech:

- **Prohlaseni bez dukazu** - texty typu "ekologicky", "zeleny", "prirodni" bez certifikatu
- **Obecna tvrzeni** - prilis obecna tvrzeni bez podrobnosti
- **Chybejici certifikaty** - odkaz na certifikat bez cisla nebo odkazu
- **Offsetovani** - tvrzeni o klimaticke neutralite zalozena vyhradne na kompenzaci

### Bezpecnost

Audit kontroluje zakladni aspekty bezpecnosti:

| Kontrola | Popis |
| -------------------------------- | ------------------------------------- |
| SSL/HTTPS | Zda cely obchod funguje pres HTTPS |
| Verze WordPress | Zda je aktualni |
| Verze WooCommerce | Zda je aktualni |
| Verze PHP | Zda neni ukoncena (EOL) |
| Debug mode | Zda `WP_DEBUG_DISPLAY` je deaktivovan na produkci |
| Vychozi admin ucet | Zda neexistuje uzivatel "admin" |
| XML-RPC | Zda je deaktivovan (doporuceno) |

## Report z auditu

Po dokonceni auditu je zobrazen report s vysledky:

### Souhrn

- **Celkove hodnoceni** - od A (vyborne) do F (kriticke problemy)
- **Kriticke pozadavky** - pocet FAIL
- **Varovani** - pocet WARN
- **Splnene** - pocet OK
- **Datum auditu** - casove razitko

### Export reportu

Report lze exportovat ve formatech:

- **PDF** - report k tisku nebo predani pravnikovi
- **CSV** - tabulkova data pro tabulkovy kalkulator
- **JSON** - strojove citelna data

```php
add_action('polski/audit/completed', function (array $results): void {
    if ($results['grade'] === 'F') {
        wp_mail(
            get_option('admin_email'),
            'Audit obchodu - kriticke hodnoceni',
            'Audit odhalil kriticke problemy. Zkontrolujte panel souladu.'
        );
    }
});
```

## Harmonogram auditu

Audit muze byt spousten automaticky v stanovenych intervalech:

- **Kazdy tyden** - doporuceno pro aktivni obchody
- **Kazdy mesic** - minimum pro kazdy obchod
- **Rucne** - na zadani

Konfigurace: **WooCommerce > Polski > Nastroje > Audit obchodu > Harmonogram**.

## Reseni problemu

**Audit trva prilis dlouho** - v obchodech s velkym poctem produktu (10 000+) muze audit greenwashingu trvat dele. Pouzijte WP-CLI s moznosti `--module` pro spusteni auditu vybranych sekci.

**Audit nedetekuje externi sluzbu** - seznam detekovanych sluzeb je omezeny. Nahlaste chybejici sluzbu na GitHub.

**Falesny alarm dark patterns** - nektere motivy mohou generovat falesne alarmy. Nahlaste falesny alarm, a mezitim muzete deaktivovat konkretni kontrolu.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
