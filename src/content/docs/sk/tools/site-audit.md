---
title: Audit obchodu
description: Nástroj auditu obchodu v Polski for WooCommerce - kontrola právnych stránok, dark patterns, DPA, DSA, KSeF, greenwashingu a bezpečnosti.
---

Audit automaticky skenuje obchod z hľadiska poľského a európskeho e-commerce práva. Na rozdiel od panela súladu audit analyzuje obsah stránok, rozhranie a technickú konfiguráciu.

## Spustenie auditu

Prejdite do **WooCommerce > Polski > Nástroje > Audit obchodu** a kliknite na **Spustiť audit**. Trvanie závisí od počtu produktov a stránok.

Audit možno spustiť aj cez WP-CLI:

```bash
wp polski smoke-test --module=audit --verbose
```

## Rozsah auditu

### Právne stránky

Audit kontroluje obsah právnych stránok:

**Obchodné podmienky:**
- Prítomnosť požadovaných sekcií (údaje firmy, postup objednávky, platby, dodanie, odstúpenie, reklamácia)
- Kontaktné údaje predajcu (názov, adresa, NIP, e-mail, telefón)
- Informácia o mimosúdnom riešení sporov
- Informácia o platforme ODR (Online Dispute Resolution)
- Aktuálnosť údajov (porovnanie NIP s registrom)

**Zásady ochrany osobných údajov:**
- Údaje správcu osobných údajov
- Účely spracúvania údajov
- Právne základy spracúvania
- Informácia o právach dotknutej osoby (prístup, oprava, vymazanie)
- Informácia o súboroch cookies
- Kontaktné údaje DPO (ak je vyžadovaný)

**Informácia o odstúpení:**
- Vzorový formulár odstúpenia od zmluvy
- Lehota na odstúpenie (14 dní)
- Návod na postup
- Informácia o nákladoch na vrátenie

**Informácia o dodaní:**
- Dostupné spôsoby dodania
- Náklady na dodanie
- Odhadované časy dodania
- Informácia o dodaní do krajín EÚ

### Dark patterns

Audit zisťuje manipulatívne vzorce (dark patterns) podľa smernice DSA a poľského práva:

| Vzorec                     | Popis                                          | Úroveň  |
| -------------------------- | ---------------------------------------------- | ------- |
| Preselected checkboxes     | Predvolene začiarknuté checkboxy súhlasov      | FAIL    |
| Hidden costs               | Náklady objavujúce sa až v pokladni            | FAIL    |
| Countdown timers           | Falošné odpočítavacie časovače                 | WARN    |
| Fake scarcity              | Umelé správy o nízkom stave                    | WARN    |
| Forced account creation    | Vynucovanie registrácie pred nákupom           | WARN/FAIL |
| Difficult unsubscribe      | Sťažený proces odhlásenia z newslettera        | FAIL    |
| Confusing button placement | Mätúce rozmiestnenie tlačidiel prijatia/odmietnutia | WARN |
| Nagging popups             | Opakujúce sa, ťažko zatvoriteľné popupy        | WARN    |

**Nové automatické kontroly (1.7.2):**

- **Forced account creation** - kontroluje možnosti WooCommerce: ak `woocommerce_enable_guest_checkout=no` **a** `woocommerce_enable_checkout_login_reminder=yes`, stav FAIL (EU Directive 2023/2673); samotná hodnota guest_checkout=no bez login reminder → WARN.
- **Stale sale countdowns** - sken posledných 100 produktov: produkty s `date_on_sale_to` v minulosti, ktoré stále majú `is_on_sale()=true`, sú označené. Zisťuje falošné „promočné odpočítavania", ktoré sa resetujú po každom obnovení.
- **Misleading "from" price** - sken 100 variantných produktov: ak je minimálna cena < 50 % maximálnej ceny, položka je označená ako potenciálne mätúca (cena od X, ale dostupné len za niekoľkonásobok tejto ceny).
- **Low-stock threshold** - ak `woocommerce_notify_low_stock_amount > 5`, označujeme umelú naliehavosť: správa „zostalo už len X" sa potom zobrazuje na produktoch s veľkým skladovým stavom.

Audit kontroluje:
- Formulár pokladne - predvolené stavy checkboxov
- Cookie popup - či je tlačidlo odmietnutia rovnako viditeľné ako prijatie
- Registračný formulár - povinné vs voliteľné polia
- Košík - či je finálna cena viditeľná od začiatku
- Newsletter - či je odhlásenie jednoduché

### DPA (Data Processing Agreement)

Audit kontroluje zmluvy o spracúvaní osobných údajov:

- Či obchod využíva externé služby spracúvajúce údaje (analytics, e-mail marketing, platobné brány)
- Či pre zistené služby existujú príslušné zmluvy DPA
- Zoznam zistených služieb: Google Analytics, Facebook Pixel, Mailchimp, GetResponse, PayU, Przelewy24, Stripe

Audit skenuje kód stránky (JavaScript, sledovacie pixely) a rozpoznáva externé služby.

### DSA (Digital Services Act)

Kontrolované požiadavky DSA:

- Formulár hlásenia nelegálneho obsahu - dostupnosť a správnosť polí
- Kontaktný bod - či je kontaktný e-mail zverejnený
- Informácia o moderovaní obsahu - politika moderovania recenzií
- Podmienky používania služby - dostupnosť a úplnosť
- Register hlásení - či systém eviduje a archivuje hlásenia

### KSeF (Krajowy System e-Faktur)

Kontroluje sa pripravenosť na KSeF:

- NIP firmy - správnosť formátu a overenie v registri
- Pripojenie k API KSeF - test connectivity
- Údaje na faktúrach - úplnosť požadovaných polí
- Pole NIP v pokladni - dostupnosť pre firemných zákazníkov
- Automatické generovanie faktúr - konfigurácia modulu

### Greenwashing

Audit kontroluje environmentálne vyhlásenia na produktoch:

- **Vyhlásenia bez dôkazov** - texty typu "ekologický", "zelený", "prírodný" bez certifikátu alebo odôvodnenia
- **Všeobecné tvrdenia** - príliš všeobecné tvrdenia bez detailov (napr. "šetrný k životnému prostrediu")
- **Chýbajúce certifikáty** - odvolanie sa na certifikát bez čísla alebo odkazu
- **Nekonzistentné údaje** - vyhlásenie o recyklovateľnosti bez informácie o materiáli
- **Offsetovanie** - tvrdenia o klimatickej neutralite založené výhradne na kompenzácii

Skenujú sa názvy produktov, popisy, krátky popis a metaúdaje modulu greenwashing.

### Bezpečnosť

Kontrolované aspekty bezpečnosti:

| Kontrola                         | Popis                                 |
| -------------------------------- | ------------------------------------- |
| SSL/HTTPS                        | Či celý obchod beží cez HTTPS         |
| Verzia WordPress                 | Či je aktuálna                        |
| Verzia WooCommerce               | Či je aktuálna                        |
| Verzia PHP                       | Či nie je vyradená (EOL)              |
| Debug mode                       | Či je `WP_DEBUG_DISPLAY` vypnutý na produkcii |
| Predvolený účet admin            | Či neexistuje používateľ "admin"      |
| XML-RPC                          | Či je vypnutý (odporúčané)            |
| Rest API exposure                | Či nie sú endpointy používateľov verejné |
| File editing                     | Či je úprava súborov z panela vypnutá |

## Správa z auditu

Po dokončení auditu sa zobrazí správa:

### Zhrnutie

- **Celkové hodnotenie** - od A (vynikajúce) po F (kritické problémy)
- **Kritické požiadavky** - počet FAIL
- **Upozornenia** - počet WARN
- **Splnené** - počet OK
- **Dátum auditu** - timestamp

### Detaily

Každý nájdený problém obsahuje:

- **Kategória** - do ktorej sekcie auditu patrí
- **Priorita** - FAIL (kritický), WARN (upozornenie), INFO (informácia)
- **Popis** - čo bolo nájdené
- **Lokalizácia** - kde sa problém vyskytuje (URL, stránka, produkt)
- **Odporúčané opatrenie** - čo urobiť na nápravu
- **Právny základ** - odkaz na predpis

### Export správy

Exportujte správu vo formátoch:

- **PDF** - správa na tlač alebo zdieľanie s právnikom
- **CSV** - tabuľkové údaje do tabuľkového procesora
- **JSON** - strojovo čitateľné údaje

```php
// Hook po dokončení auditu
add_action('polski/audit/completed', function (array $results): void {
    if ($results['grade'] === 'F') {
        wp_mail(
            get_option('admin_email'),
            'Audit obchodu - kritické hodnotenie',
            'Audit odhalil kritické problémy. Skontrolujte panel súladu.'
        );
    }
});
```

## Harmonogram auditov

Audit možno spúšťať automaticky:

- **Týždenne** - odporúčané pre aktívne obchody
- **Mesačne** - minimum pre každý obchod
- **Ručne** - na požiadanie

Konfigurácia: **WooCommerce > Polski > Nástroje > Audit obchodu > Harmonogram**.

Výsledky sa ukladajú do histórie a posielajú sa e-mailom administrátorovi.

## Riešenie problémov

**Audit trvá príliš dlho** - pri 10 000+ produktoch môže audit greenwashingu trvať dlhšie. Použite WP-CLI s `--module` pre vybrané sekcie.

**Audit nezisťuje externú službu** - zoznam zisťovaných služieb je obmedzený. Nahláste chýbajúcu na GitHub.

**Falošný poplach dark patterns** - niektoré šablóny môžu generovať falošné poplachy. Nahláste problém a dočasne vypnite konkrétnu kontrolu.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výhradne informačný charakter a nepredstavuje právne poradenstvo. Pred zavedením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
