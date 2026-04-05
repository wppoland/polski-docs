---
title: Affiliate program
description: Dokumentácia affiliate programu Polski PRO for WooCommerce - odkazové odkazy, sledovanie provízií, registrácia afiliantov a panel Môj účet.
---

Modul affiliate programu v Polski PRO for WooCommerce umožňuje prevádzkovanie programu odporúčaní priamo v obchode WooCommerce. Afilianti zdieľajú unikátne odkazové odkazy a plugin sleduje konverzie a pripisuje provízie za objednávky uskutočnené odporučenými zákazníkmi.

## Ako to funguje

1. Zákazník sa zaregistruje ako afiliant v paneli Môj účet
2. Administrátor aktivuje účet afilianta
3. Afiliant dostane unikátny token a odkazový odkaz
4. Afiliant zdieľa odkaz (napr. na sociálnych sieťach, blogu)
5. Návštevník klikne na odkaz - token sa uloží do cookie
6. Návštevník vytvorí objednávku - plugin prepojí objednávku s afiliantom
7. Po uhradení objednávky plugin pripíše províziu

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Moduly PRO > Affiliate program**.

Modul je riadený voľbou:

```
polski_affiliates
```

### Všeobecné nastavenia

| Nastavenie | Popis |
|------------|------|
| Zapnúť affiliate program | Aktivuje modul |
| Sadzba provízie (%) | Percentuálna provízia z hodnoty objednávky (predvolene 10%) |
| Základ provízie | Suma bez DPH / Suma s DPH / Suma bez DPH bez dopravy |
| Doba trvania cookie (dni) | Koľko dní je cookie s tokenom platné (predvolene 30) |
| Automatická aktivácia | Automaticky aktivovať nových afiliantov (predvolene: vypnuté) |
| Minimálna výplata | Minimálna suma provízie na výplatu |
| Parameter URL | Názov parametra v odkazovom odkaze (predvolene `poleca`) |

### Sadzby provízie per produkt

Okrem globálnej sadzby provízie môže administrátor nastaviť individuálnu sadzbu pre vybraný produkt. V úprave produktu v sekcii "Affiliate program":

- **Sadzba provízie (%)** - prepíše globálnu sadzbu
- **Vylúčiť z programu** - produkt negeneruje províziu

Sadzby per kategóriu produktu sú tiež podporované - nastavenie na kategórii sa vzťahuje na všetky produkty v tejto kategórii, pokiaľ produkt nemá vlastnú sadzbu.

## Odkazové odkazy

### Formát odkazu

Odkazový odkaz obsahuje parameter URL s tokenom afilianta:

```
https://example.com/?poleca=abc123def456
```

Parameter `poleca` je konfigurovateľný. Token je unikátny identifikátor afilianta generovaný pri registrácii.

### Sledovanie cookie

Po kliknutí na odkazový odkaz plugin nastaví cookie:

| Parameter | Hodnota |
|----------|---------|
| Názov cookie | `polski_affiliate_token` |
| Hodnota | Token afilianta |
| Doba života | Konfigurovateľná (predvolene 30 dní) |
| Cesta | `/` |
| SameSite | `Lax` |

Cookie je nastavené na strane servera (PHP) s príznakom `HttpOnly`. Pri ďalších návštevách zákazníka plugin kontroluje prítomnosť cookie a prepojí prípadnú objednávku s afiliantom.

### Atribúcia objednávky

Plugin používa model atribúcie "last click" - ak zákazník klikol na odkazy od viacerých afiliantov, províziu dostane posledný. Cookie sa prepíše pri každom kliknutí na nový odkaz.

## Registrácia a aktivácia afiliantov

### Registrácia

Zákazník sa môže zaregistrovať ako afiliant v paneli Môj účet na stránke `/moje-konto/polski-affiliates/`. Registračný formulár obsahuje:

- meno a priezvisko (načítané automaticky z účtu)
- spôsob platby provízie (prevod / zľavový kód)
- číslo bankového účtu (pre prevod)
- súhlas s pravidlami affiliate programu

### Aktivácia

Predvolene nové účty afiliantov vyžadujú manuálnu aktiváciu administrátorom. Administrátor dostane e-mailové upozornenie o novej registrácii a môže:

- aktivovať účet v paneli **WooCommerce > Afilianti**
- odmietnuť registráciu s uvedením dôvodu

Voliteľne je možné zapnúť automatickú aktiváciu - nové účty sa stávajú aktívnymi ihneď po registrácii.

### Stavy afilianta

| Stav | Popis |
|--------|------|
| Pending | Čaká na aktiváciu |
| Active | Aktívny - môže generovať odkazy a zarábať provízie |
| Suspended | Pozastavený administrátorom |
| Rejected | Odmietnutý - registrácia zamietnutá |

## Sledovanie provízií

### Pripísanie provízie

Provízia sa pripisuje automaticky po uhradení objednávky prepojenej s afiliantom. Provízia sa nepripisuje pre:

- zrušené alebo vrátené objednávky
- objednávky uskutočnené samotným afiliantom (self-referral)
- produkty vylúčené z programu

### Stavy provízie

| Stav | Popis |
|--------|------|
| Pending | Pripísaná, čaká na schválenie |
| Approved | Schválená, pripravená na výplatu |
| Paid | Vyplatená |
| Rejected | Odmietnutá (napr. objednávka vrátená) |

### Automatické schvaľovanie

Provízia zmení stav z "Pending" na "Approved" po uplynutí konfigurovateľného obdobia (predvolene 14 dní). Oneskorenie chráni pred províziami z objednávok, ktoré budú vrátené.

Ak je objednávka zrušená alebo vrátená v období čakania, provízia je automaticky odmietnutá.

## Panel Môj účet

Modul pridáva endpoint `/polski-affiliates` do panelu Môj účet. Endpoint je dostupný na adrese:

```
/moje-konto/polski-affiliates/
```

### Dashboard afilianta

Po aktivácii účtu afiliant vidí dashboard s:

- **Štatistiky** - celkový počet kliknutí, objednávok, provízií
- **Odkazový odkaz** - úplný odkaz s tlačidlom kopírovania
- **Provízie** - zoznam provízií s dátumami, sumami a stavmi
- **Výplaty** - história výplat
- **Mesačné štatistiky** - graf kliknutí a konverzií

### Generovanie odkazov

Afiliant môže vygenerovať odkazový odkaz na:

- hlavnú stránku obchodu
- konkrétny produkt
- kategóriu produktov
- ľubovoľnú stránku v doméne obchodu

Každý odkaz obsahuje parameter `poleca` s tokenom afilianta.

## Administračný panel

### Zoznam afiliantov

Prejdite do **WooCommerce > Afilianti**. Tabuľka obsahuje:

- meno a priezvisko
- e-mail
- stav
- dátum registrácie
- počet odporúčaní
- celková provízia
- zostatok na výplatu

### Správa provízií

Prejdite do **WooCommerce > Afilianti > Provízie**. Administrátor môže:

- prehliadať zoznam provízií s filtrami (afiliant, stav, dátum)
- schvaľovať alebo odmietať provízie
- označovať provízie ako vyplatené
- exportovať provízie do CSV

### Správa

Prejdite do **WooCommerce > Afilianti > Správa**. Správa obsahuje:

- celková hodnota objednávok z odporúčaní
- celková suma provízií
- konverzia (kliknutia -> objednávky)
- top 10 afiliantov
- mesačný trend

## Hooky

### `polski_pro/affiliate/commission_created`

Akcia volaná po pripísaní provízie.

```php
/**
 * @param int   $commission_id ID prowizji
 * @param int   $affiliate_id  ID afilianta
 * @param int   $order_id      ID zamówienia
 * @param float $amount        Kwota prowizji
 */
do_action('polski_pro/affiliate/commission_created', int $commission_id, int $affiliate_id, int $order_id, float $amount);
```

**Príklad:**

```php
add_action('polski_pro/affiliate/commission_created', function (int $commission_id, int $affiliate_id, int $order_id, float $amount): void {
    // Powiadomienie afilianta o nowej prowizji
    $affiliate = get_userdata($affiliate_id);
    wp_mail(
        $affiliate->user_email,
        'Nowa prowizja w programie afiliacyjnym',
        sprintf(
            'Otrzymałeś prowizję %.2f zł za zamówienie #%d.',
            $amount,
            $order_id
        )
    );
}, 10, 4);
```

### `polski_pro/affiliate/registered`

Akcia volaná po registrácii nového afilianta.

```php
/**
 * @param int $user_id ID użytkownika
 * @param string $token Wygenerowany token afilianta
 */
do_action('polski_pro/affiliate/registered', int $user_id, string $token);
```

**Príklad:**

```php
add_action('polski_pro/affiliate/registered', function (int $user_id, string $token): void {
    // Przypisanie roli WordPress
    $user = get_userdata($user_id);
    $user->add_role('affiliate');
}, 10, 2);
```

### `polski_pro/affiliate/validate_referral`

Filtruje validáciu odporúčania pred pripísaním provízie.

```php
/**
 * @param bool $is_valid     Czy polecenie jest prawidłowe
 * @param int  $affiliate_id ID afilianta
 * @param int  $order_id     ID zamówienia
 */
apply_filters('polski_pro/affiliate/validate_referral', bool $is_valid, int $affiliate_id, int $order_id): bool;
```

**Príklad:**

```php
add_filter('polski_pro/affiliate/validate_referral', function (bool $is_valid, int $affiliate_id, int $order_id): bool {
    $order = wc_get_order($order_id);
    
    // Blokowanie self-referral po adresie e-mail
    $affiliate_email = get_userdata($affiliate_id)->user_email;
    if ($order->get_billing_email() === $affiliate_email) {
        return false;
    }
    
    return $is_valid;
}, 10, 3);
```

## Najčastejšie problémy

### Provízia sa nepripisuje

1. Skontrolujte, či má afiliant stav "Active"
2. Overte, či je cookie `polski_affiliate_token` nastavené (vývojárske nástroje prehliadača)
3. Skontrolujte, či objednávku nevytvoril samotný afiliant
4. Overte, či produkty v objednávke nie sú vylúčené z programu

### Cookie sa nenastavuje po kliknutí na odkaz

1. Skontrolujte, či je parameter URL správny (predvolene `poleca`)
2. Overte, či token afilianta existuje a je aktívny
3. Skontrolujte, či pluginy cache nekešujú stránku s parametrami URL - pridajte parameter `poleca` do zoznamu výnimiek cache

### Afiliant nevidí panel v Môj účet

1. Skontrolujte, či je affiliate modul zapnutý
2. Prejdite do **Nastavenia > Trvalé odkazy** a kliknite "Uložiť" (obnoví rewrite pravidlá)
3. Overte, či je endpoint `polski-affiliates` zaregistrovaný

## Súvisiace zdroje

- [Prehľad PRO](/pro/overview/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
