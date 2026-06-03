---
title: Audit obchodu
description: Nástroj auditu obchodu v Polski for WooCommerce - kontrola právních stránek, dark patterns, DPA, DSA, KSeF, greenwashingu a bezpečnosti.
---

Audit automaticky skenuje obchod z hlediska polského a evropského práva e-commerce. Na rozdíl od panelu souladu audit analyzuje obsah stránek, rozhraní a technickou konfiguraci.

## Spuštění auditu

Přejděte na **WooCommerce > Polski > Nástroje > Audit obchodu** a klikněte na **Spustit audit**. Doba trvání závisí na počtu produktů a stránek.

Audit lze spustit také z WP-CLI:

```bash
wp polski smoke-test --module=audit --verbose
```

## Rozsah auditu

### Právní stránky

Audit kontroluje obsah právních stránek:

**Obchodní podmínky:**
- Přítomnost požadovaných sekcí (údaje o firmě, postup objednávky, platby, doručení, odstoupení, reklamace)
- Kontaktní údaje prodejce (název, adresa, NIP, e-mail, telefon)
- Informace o mimosoudním řešení sporů
- Informace o platformě ODR (Online Dispute Resolution)
- Aktuálnost údajů (porovnání NIP s registrem)

**Zásady ochrany osobních údajů:**
- Údaje správce osobních údajů
- Účely zpracování údajů
- Právní základy zpracování
- Informace o právech subjektu údajů (přístup, oprava, výmaz)
- Informace o souborech cookie
- Kontaktní údaje pověřence pro ochranu osobních údajů (pokud je vyžadován)

**Informace o odstoupení:**
- Vzor formuláře pro odstoupení od smlouvy
- Lhůta pro odstoupení (14 dní)
- Návod k postupu
- Informace o nákladech na vrácení

**Informace o doručení:**
- Dostupné způsoby doručení
- Náklady na doručení
- Odhadované doby doručení
- Informace o doručení do zemí EU

### Dark patterns

Audit detekuje manipulativní vzory (dark patterns) podle směrnice DSA a polského práva:

| Vzor                       | Popis                                          | Úroveň  |
| -------------------------- | ---------------------------------------------- | ------- |
| Preselected checkboxes     | Předem zaškrtnutá políčka souhlasů              | FAIL    |
| Hidden costs               | Náklady objevující se až u pokladny              | FAIL    |
| Countdown timers           | Falešné odpočítávací časovače                    | WARN    |
| Fake scarcity              | Umělé zprávy o nízkém stavu zásob               | WARN    |
| Forced account creation    | Vynucení registrace před nákupem                | WARN/FAIL |
| Difficult unsubscribe      | Ztížený proces odhlášení z newsletteru          | FAIL    |
| Confusing button placement | Matoucí rozmístění tlačítek přijetí/odmítnutí   | WARN |
| Nagging popups             | Opakující se, obtížně zavíratelná vyskakovací okna | WARN |

**Nové automatické kontroly (1.7.2):**

- **Forced account creation** - kontroluje možnosti WooCommerce: pokud `woocommerce_enable_guest_checkout=no` **a** `woocommerce_enable_checkout_login_reminder=yes`, stav FAIL (EU Directive 2023/2673); samotná hodnota guest_checkout=no bez login reminder -> WARN.
- **Stale sale countdowns** - sken 100 posledních produktů: produkty s `date_on_sale_to` v minulosti, které stále mají `is_on_sale()=true`, jsou označeny. Detekuje falešná "promoční odpočítávání", která se po každém obnovení resetují.
- **Misleading "from" price** - sken 100 variantních produktů: pokud je minimální cena < 50 % maximální ceny, položka je označena jako potenciálně matoucí (cena od X, ale dostupné pouze za několikanásobek této ceny).
- **Low-stock threshold** - pokud `woocommerce_notify_low_stock_amount > 5`, označíme umělou naléhavost: zpráva "zbývá pouze X" se pak objevuje u produktů s velkým stavem zásob.

Audit kontroluje:
- Formulář pokladny - výchozí stavy zaškrtávacích políček
- Cookie popup - zda je tlačítko odmítnutí stejně viditelné jako přijetí
- Registrační formulář - povinná vs volitelná pole
- Košík - zda je konečná cena viditelná od začátku
- Newsletter - zda je odhlášení snadné

### DPA (Data Processing Agreement)

Audit kontroluje smlouvy o zpracování osobních údajů:

- Zda obchod využívá externí služby zpracovávající data (analytics, e-mail marketing, platební brány)
- Zda k detekovaným službám existují odpovídající smlouvy DPA
- Seznam detekovaných služeb: Google Analytics, Facebook Pixel, Mailchimp, GetResponse, PayU, Przelewy24, Stripe

Audit skenuje kód stránky (JavaScript, sledovací pixely) a rozpoznává externí služby.

### DSA (Digital Services Act)

Kontrolované požadavky DSA:

- Formulář pro nahlášení nelegálního obsahu - dostupnost a správnost polí
- Kontaktní místo - zda je kontaktní e-mail zveřejněn
- Informace o moderaci obsahu - politika moderování recenzí
- Podmínky používání služby - dostupnost a úplnost
- Registr hlášení - zda systém eviduje a archivuje hlášení

### KSeF (Krajowy System e-Faktur)

Kontroluje se připravenost na KSeF:

- NIP firmy - správnost formátu a ověření v registru
- Připojení k API KSeF - test connectivity
- Údaje na fakturách - úplnost požadovaných polí
- Pole NIP u pokladny - dostupnost pro firemní zákazníky
- Automatické generování faktur - konfigurace modulu

### Greenwashing

Audit kontroluje environmentální tvrzení u produktů:

- **Tvrzení bez důkazů** - texty typu "ekologický", "zelený", "přírodní" bez certifikátu nebo odůvodnění
- **Obecná tvrzení** - příliš obecná tvrzení bez detailů (např. "šetrný k životnímu prostředí")
- **Chybějící certifikáty** - odkaz na certifikát bez čísla nebo odkazu
- **Nesoulad údajů** - tvrzení o recyklovatelnosti bez informace o materiálu
- **Offsetování** - tvrzení o klimatické neutralitě založená výhradně na kompenzaci

Skenují se názvy produktů, popisy, krátký popis a metadata modulu greenwashing.

### Bezpečnost

Kontrolované bezpečnostní aspekty:

| Kontrola                         | Popis                                 |
| -------------------------------- | ------------------------------------- |
| SSL/HTTPS                        | Zda celý obchod běží přes HTTPS       |
| Verze WordPress                  | Zda je aktuální                       |
| Verze WooCommerce                | Zda je aktuální                       |
| Verze PHP                        | Zda není ukončena (EOL)               |
| Debug mode                       | Zda je `WP_DEBUG_DISPLAY` vypnutý na produkci |
| Výchozí admin účet               | Zda neexistuje uživatel "admin"       |
| XML-RPC                          | Zda je vypnutý (doporučeno)           |
| Rest API exposure                | Zda nejsou endpointy uživatelů veřejné |
| File editing                     | Zda je úprava souborů z panelu vypnutá |

## Zpráva z auditu

Po dokončení auditu se zobrazí zpráva:

### Souhrn

- **Celkové hodnocení** - od A (vynikající) po F (kritické problémy)
- **Kritické požadavky** - počet FAIL
- **Varování** - počet WARN
- **Splněno** - počet OK
- **Datum auditu** - timestamp

### Detaily

Každý nalezený problém obsahuje:

- **Kategorie** - do které sekce auditu patří
- **Priorita** - FAIL (kritický), WARN (varování), INFO (informace)
- **Popis** - co bylo nalezeno
- **Umístění** - kde se problém vyskytuje (URL, stránka, produkt)
- **Doporučená akce** - co udělat pro nápravu
- **Právní základ** - odkaz na předpis

### Export zprávy

Zprávu exportujte ve formátech:

- **PDF** - zpráva k tisku nebo sdílení s právníkem
- **CSV** - tabulková data do tabulkového procesoru
- **JSON** - strojově čitelná data

```php
// Hook po dokončení auditu
add_action('polski/audit/completed', function (array $results): void {
    if ($results['grade'] === 'F') {
        wp_mail(
            get_option('admin_email'),
            'Audit obchodu - kritické hodnocení',
            'Audit odhalil kritické problémy. Zkontrolujte panel souladu.'
        );
    }
});
```

## Harmonogram auditů

Audit lze spouštět automaticky:

- **Každý týden** - doporučeno pro aktivní obchody
- **Každý měsíc** - minimum pro každý obchod
- **Ručně** - na vyžádání

Konfigurace: **WooCommerce > Polski > Nástroje > Audit obchodu > Harmonogram**.

Výsledky se ukládají do historie a zasílají se e-mailem administrátorovi.

## Řešení problémů

**Audit trvá příliš dlouho** - při 10 000+ produktech může audit greenwashingu trvat déle. Použijte WP-CLI s `--module` pro vybrané sekce.

**Audit nedetekuje externí službu** - seznam detekovaných služeb je omezený. Nahlaste chybějící na GitHub.

**Falešný poplach dark patterns** - některé šablony mohou generovat falešné poplachy. Nahlaste problém a dočasně vypněte konkrétní kontrolu.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
