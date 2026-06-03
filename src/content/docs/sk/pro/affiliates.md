---
title: Affiliate program
description: Dokumentácia affiliate programu Polski PRO for WooCommerce - odporúčacie odkazy, sledovanie provízií, registrácia affiliatov a panel Môj účet.
---

Modul affiliate programu umožňuje prevádzkovať odporúčací program v obchode. Affiliati zdieľajú odporúčacie odkazy a doplnok sleduje konverzie a počíta provízie.

## Ako to funguje

1. Zákazník sa zaregistruje ako affiliate v paneli Môj účet
2. Administrátor aktivuje účet affiliata
3. Affiliate dostane jedinečný token a odporúčací odkaz
4. Affiliate zdieľa odkaz (napr. na sociálnych sieťach, na blogu)
5. Návštevník klikne na odkaz, token sa uloží do cookie
6. Návštevník zadá objednávku, doplnok prepojí objednávku s affiliatom
7. Po zaplatení objednávky doplnok pripíše províziu

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Moduly PRO > Affiliate program**.

Modul je riadený možnosťou:

```
polski_affiliates
```

### Všeobecné nastavenia

| Nastavenie | Popis |
|------------|------|
| Zapnúť affiliate program | Aktivuje modul |
| Sadzba provízie (%) | Percentuálna provízia z hodnoty objednávky (predvolene 10 %) |
| Základ provízie | Suma bez DPH / Suma s DPH / Suma bez DPH a bez dopravy |
| Trvanie cookie (dni) | Koľko dní je cookie s tokenom platná (predvolene 30) |
| Automatická aktivácia | Automaticky aktivovať nových affiliatov (predvolene: vypnuté) |
| Minimálna výplata | Minimálna suma provízie na výplatu |
| URL parameter | Názov parametra v odporúčacom odkaze (predvolene `poleca`) |

### Sadzby provízie podľa produktu

Okrem globálnej sadzby nastavte individuálnu sadzbu pre produkt. V editácii produktu, sekcia "Affiliate program":

- **Sadzba provízie (%)** - prepisuje globálnu sadzbu
- **Vylúčiť z programu** - produkt negeneruje províziu

Sadzby podľa kategórie tiež fungujú, týkajú sa všetkých produktov v kategórii, pokiaľ produkt nemá vlastnú sadzbu.

## Odporúčacie odkazy

### Formát odkazu

Odkaz obsahuje URL parameter s tokenom affiliata:

```
https://example.com/?poleca=abc123def456
```

Parameter `poleca` je konfigurovateľný. Token je jedinečný identifikátor affiliata generovaný pri registrácii.

### Cookie tracking

Po kliknutí na odporúčací odkaz doplnok nastaví cookie:

| Parameter | Hodnota |
|----------|---------|
| Názov cookie | `polski_affiliate_token` |
| Hodnota | Token affiliata |
| Doba života | Konfigurovateľná (predvolene 30 dní) |
| Cesta | `/` |
| SameSite | `Lax` |

Cookie sa nastavuje na strane servera (PHP) s príznakom `HttpOnly`. Pri ďalších návštevách doplnok prepojí objednávku s affiliatom.

### Atribúcia objednávky

Doplnok používa model "last click" - províziu dostane posledný affiliate, ktorého odkaz zákazník klikol.

## Registrácia a aktivácia affiliatov

### Registrácia

Zákazník sa registruje ako affiliate v Môj účet (`/moje-konto/polski-affiliates/`). Formulár obsahuje:

- meno a priezvisko (načítava sa automaticky z účtu)
- spôsob výplaty provízie (prevod / zľavový kód)
- číslo bankového účtu (pri prevode)
- súhlas s podmienkami affiliate programu

### Aktivácia

Predvolene nové účty vyžadujú ručnú aktiváciu. Administrátor dostane e-mail o registrácii a môže:

- aktivovať účet v paneli **WooCommerce > Affiliati**
- odmietnuť registráciu s uvedením dôvodu

Zapnite automatickú aktiváciu, aby sa účty stávali aktívnymi okamžite.

### Stavy affiliata

| Stav | Popis |
|--------|------|
| Pending | Čaká na aktiváciu |
| Active | Aktívny - môže generovať odkazy a zarábať provízie |
| Suspended | Pozastavený administrátorom |
| Rejected | Odmietnutý - registrácia odmietnutá |

## Sledovanie provízií

### Pripisovanie provízií

Provízia sa pripisuje automaticky po zaplatení objednávky. Nepripisuje sa pri:

- zrušených alebo vrátených objednávkach
- objednávkach zadaných samotným affiliatom (self-referral)
- produktoch vylúčených z programu

### Stavy provízie

| Stav | Popis |
|--------|------|
| Pending | Pripísaná, čaká na schválenie |
| Approved | Schválená, pripravená na výplatu |
| Paid | Vyplatená |
| Rejected | Odmietnutá (napr. objednávka vrátená) |

### Automatické schvaľovanie

Provízia sa zmení z "Pending" na "Approved" po 14 dňoch (konfigurovateľné). To chráni pred províziami z vrátených objednávok.

Ak je objednávka zrušená počas čakacej doby, provízia sa automaticky odmietne.

## Panel Môj účet

Modul pridáva sekciu v Môj účet na adrese:

```
/moje-konto/polski-affiliates/
```

### Dashboard affiliata

Po aktivácii účtu affiliate vidí dashboard s:

- **Štatistiky** - celkový počet kliknutí, objednávok, provízií
- **Odporúčací odkaz** - úplný odkaz s tlačidlom na kopírovanie
- **Provízie** - zoznam provízií s dátumami, sumami a stavmi
- **Výplaty** - história výplat
- **Mesačné štatistiky** - graf kliknutí a konverzií

### Generovanie odkazov

Affiliate môže vygenerovať odporúčací odkaz na:

- domovskú stránku obchodu
- konkrétny produkt
- kategóriu produktov
- ľubovoľnú stránku v doméne obchodu

Každý odkaz obsahuje parameter `poleca` s tokenom affiliata.

## Administrátorský panel

### Zoznam affiliatov

Prejdite do **WooCommerce > Affiliati**. Tabuľka obsahuje:

- meno a priezvisko
- e-mail
- stav
- dátum registrácie
- počet odporúčaní
- celková provízia
- saldo na výplatu

### Správa provízií

Prejdite do **WooCommerce > Affiliati > Provízie**. Administrátor môže:

- prehliadať zoznam provízií s filtrami (affiliate, stav, dátum)
- schvaľovať alebo odmietať provízie
- označovať provízie ako vyplatené
- exportovať provízie do CSV

### Report

Prejdite do **WooCommerce > Affiliati > Report**. Report obsahuje:

- celková hodnota objednávok z odporúčaní
- celková suma provízií
- konverzia (kliknutia -> objednávky)
- top 10 affiliatov
- mesačný trend

## Hooky

### `polski_pro/affiliate/commission_created`

Akcia vyvolaná po pripísaní provízie.

```php
/**
 * @param int   $commission_id ID provízie
 * @param int   $affiliate_id  ID affiliata
 * @param int   $order_id      ID objednávky
 * @param float $amount        Suma provízie
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

Akcia vyvolaná po registrácii nového affiliata.

```php
/**
 * @param int $user_id ID používateľa
 * @param string $token Vygenerovaný token affiliata
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
 * @param bool $is_valid     Či je odporúčanie platné
 * @param int  $affiliate_id ID affiliata
 * @param int  $order_id     ID objednávky
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

1. Skontrolujte, či má affiliate stav "Active"
2. Overte, či je cookie `polski_affiliate_token` nastavená (vývojárske nástroje prehliadača)
3. Skontrolujte, či objednávka nebola zadaná samotným affiliatom
4. Overte, či produkty v objednávke nie sú vylúčené z programu

### Cookie sa nenastavuje po kliknutí na odkaz

1. Skontrolujte, či je URL parameter správny (predvolene `poleca`)
2. Overte, či token affiliata existuje a je aktívny
3. Skontrolujte, či cache doplnky neukladajú do cache stránku s URL parametrami, pridajte parameter `poleca` do zoznamu výnimiek cache

### Affiliate nevidí panel v Môj účet

1. Skontrolujte, či je affiliate modul zapnutý
2. Prejdite do **Nastavenia > Trvalé odkazy** a kliknite "Uložiť" (obnoví rewrite pravidlá)
3. Overte, či je endpoint `polski-affiliates` zaregistrovaný

## Súvisiace zdroje

- [Prehľad PRO](/pro/overview/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
