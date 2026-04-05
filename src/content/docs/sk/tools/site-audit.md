---
title: Audit obchodu
description: Nástroj auditu obchodu v Polski for WooCommerce - overenie právnych stránok, dark patterns, DPA, DSA, KSeF, greenwashing a bezpečnosti.
---

Audit obchodu je nástroj automaticky skenujúci obchod WooCommerce z hľadiska požiadaviek poľského a európskeho e-commerce práva. Na rozdiel od panelu súladu (checklist) audit vykonáva hĺbkovú analýzu obsahu stránok, používateľského rozhrania a technickej konfigurácie.

## Spustenie auditu

Prejdite do **WooCommerce > Polski > Nástroje > Audit obchodu** a kliknite na **Spustiť audit**. Audit trvá od niekoľkých sekúnd do niekoľkých minút, v závislosti od počtu produktov a stránok.

Audit je možné spustiť aj z WP-CLI:

```bash
wp polski smoke-test --module=audit --verbose
```

## Rozsah auditu

### Právne stránky

Audit analyzuje obsah právnych stránok z hľadiska:

**Obchodné podmienky:**
- Prítomnosť povinných sekcií (firemné údaje, postup objednávky, platby, doručenie, odstúpenie, reklamácia)
- Kontaktné údaje predajcu (názov, adresa, NIP, e-mail, telefón)
- Informácia o mimosúdnom riešení sporov
- Informácia o platforme ODR (Online Dispute Resolution)

**Zásady ochrany osobných údajov:**
- Údaje správcu osobných údajov
- Účely spracovania údajov
- Právne základy spracovania
- Informácia o právach dotknutej osoby
- Informácia o cookies

**Informácia o odstúpení:**
- Vzor formulára na odstúpenie od zmluvy
- Lehota na odstúpenie (14 dní)
- Návod na postup

### Dark patterns

Audit rozpoznáva návrhové vzory považované za manipulatívne (dark patterns) v súlade so smernicou DSA a poľským právom:

| Vzor                    | Popis                                           | Úroveň  |
| -------------------------- | ---------------------------------------------- | ------- |
| Preselected checkboxes     | Štandardne zaškrtnuté checkboxy súhlasov        | FAIL    |
| Hidden costs               | Náklady objavujúce sa až na pokladni            | FAIL    |
| Countdown timers           | Falošné odpočítavače                            | WARN    |
| Fake scarcity              | Umelé hlásenia o nízkom stave                   | WARN    |
| Forced account creation    | Vynucovanie registrácie pred nákupom            | WARN    |
| Difficult unsubscribe      | Sťažený proces odhlásenia z newslettera         | FAIL    |
| Confusing button placement | Zavádzajúce umiestnenie tlačidiel akceptácie/odmietnutia | WARN |
| Nagging popups             | Opakujúce sa, ťažko zatvoriteľné popupy         | WARN    |

### DPA (Data Processing Agreement)

Audit overuje zmluvy o spracovaní osobných údajov - či obchod využíva externé služby spracúvajúce údaje a či existujú príslušné DPA zmluvy.

### DSA, KSeF, Greenwashing

Audit kontroluje požiadavky DSA (formulár hlásení, kontaktný bod), pripravenosť na KSeF a environmentálne vyhlásenia na produktoch.

### Bezpečnosť

Audit kontroluje základné aspekty bezpečnosti:

| Kontrola                      | Popis                                  |
| -------------------------------- | ------------------------------------- |
| SSL/HTTPS                        | Či celý obchod funguje cez HTTPS       |
| Verzia WordPress                 | Či je aktuálna                         |
| Verzia WooCommerce               | Či je aktuálna                         |
| Verzia PHP                       | Či nie je vyradená (EOL)               |
| Debug mode                       | Či `WP_DEBUG_DISPLAY` je vypnutý na produkcii |
| Predvolené admin konto           | Či neexistuje používateľ "admin"       |
| XML-RPC                          | Či je vypnutý (odporúčané)             |
| Rest API exposure                | Či endpointy používateľov nie sú verejné |
| File editing                     | Či úprava súborov z panelu je vypnutá  |

## Správa z auditu

Po dokončení auditu sa zobrazuje správa s výsledkami:

### Zhrnutie

- **Celkové hodnotenie** - od A (vynikajúce) po F (kritické problémy)
- **Kritické požiadavky** - počet FAIL
- **Varovania** - počet WARN
- **Splnené** - počet OK
- **Dátum auditu** - timestamp

### Export správy

Správu je možné exportovať vo formátoch:

- **PDF** - správa na tlač alebo zdieľanie s právnikom
- **CSV** - tabuľkové údaje pre tabuľkový procesor
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

Audit je možné spúšťať automaticky v stanovených intervaloch:

- **Každý týždeň** - odporúčané pre aktívne obchody
- **Každý mesiac** - minimum pre každý obchod
- **Ručne** - na požiadanie

Konfigurácia: **WooCommerce > Polski > Nástroje > Audit obchodu > Harmonogram**.

## Riešenie problémov

**Audit trvá príliš dlho** - v obchodoch s veľkým počtom produktov (10 000+) môže audit greenwashingu trvať dlhšie. Použite WP-CLI s možnosťou `--module` na spustenie auditu vybraných sekcií.

**Audit nerozpoznáva externú službu** - zoznam rozpoznávaných služieb je obmedzený. Nahláste chýbajúcu službu na GitHub.

**Falošný alarm dark patterns** - niektoré témy môžu generovať falošné alarmy. Nahláste falošný alarm, a medzitým môžete vypnúť konkrétnu kontrolu.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
