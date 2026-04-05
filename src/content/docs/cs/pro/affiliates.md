---
title: Affiliate program
description: Dokumentace affiliate programu Polski PRO for WooCommerce - doporucujici odkazy, sledovani provizi, registrace afiliatu a panel Muj ucet.
---

Modul affiliate programu umoznuje provozovat program doporuceni primo v obchode. Afiliati sdileji jedinecne odkazy a plugin sleduje konverze a pripocitava provize za objednavky od doporucenych zakazniku.

## Jak to funguje

1. Zakaznik se zaregistruje jako afiliat v panelu Muj ucet
2. Administrator aktivuje ucet afiliata
3. Afiliat obdrzi jedinecny token a doporucujici odkaz
4. Afiliat sdili odkaz (napr. na socialnich sitich, na blogu)
5. Navstevnik klikne na odkaz - token je ulozen v cookie
6. Navstevnik vytvori objednavku - plugin spoji objednavku s afiliatem
7. Po zaplaceni objednavky plugin pripocita provizi

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Moduly PRO > Affiliate program**.

Modul je rizen moznosti:

```
polski_affiliates
```

### Obecna nastaveni

| Nastaveni | Popis |
|-----------|-------|
| Zapnout affiliate program | Aktivuje modul |
| Sazba provize (%) | Procentualni provize z hodnoty objednavky (vychozi 10 %) |
| Zaklad provize | Castka bez DPH / Castka s DPH / Castka bez DPH bez dopravy |
| Doba trvani cookie (dny) | Kolik dnu je cookie s tokenem platne (vychozi 30) |
| Automaticka aktivace | Automaticky aktivovat nove afiliaty (vychozi: vypnuto) |
| Minimalni vyplata | Minimalni castka provize k vyplate |
| Parametr URL | Nazev parametru v doporucujicim odkazu (vychozi `poleca`) |

### Sazby provize na produkt

Krome globalni sazby provize administrator muze nastavit individualni sazbu pro vybrany produkt. V uprave produktu v sekci "Affiliate program":

- **Sazba provize (%)** - prepise globalni sazbu
- **Vyloucit z programu** - produkt negeneruje provize

Sazby na kategorii produktu jsou take podporovany - nastaveni na kategorii se tyka vsech produktu v teto kategorii, pokud produkt nema vlastni sazbu.

## Doporucujici odkazy

### Format odkazu

Doporucujici odkaz obsahuje parametr URL s tokenem afiliata:

```
https://example.com/?poleca=abc123def456
```

Parametr `poleca` je konfigurovatelny. Token je jedinecny identifikator afiliata generovany pri registraci.

### Sledovani pomoci cookie

Po kliknuti na doporucujici odkaz plugin nastavi cookie:

| Parametr | Hodnota |
|----------|---------|
| Nazev cookie | `polski_affiliate_token` |
| Hodnota | Token afiliata |
| Doba zivota | Konfigurovatelna (vychozi 30 dnu) |
| Cesta | `/` |
| SameSite | `Lax` |

Cookie je nastaveno na strane serveru (PHP) s priznakem `HttpOnly`. Pri dalsich navstevach zakaznika plugin kontroluje pritomnost cookie a spojuje pripadnou objednavku s afiliatem.

### Atribuce objednavky

Plugin pouziva model atribuce "last click" - pokud zakaznik klikl na odkazy od vice afiliatu, provizi dostane posledni. Cookie je prepsano pri kazdem kliknuti na novy odkaz.

## Registrace a aktivace afiliatu

### Registrace

Zakaznik se muze zaregistrovat jako afiliat v panelu Muj ucet na strance `/moje-konto/polski-affiliates/`. Registracni formular obsahuje:

- jmeno a prijmeni (nacteno automaticky z uctu)
- zpusob vyplaty provize (prevod / slevovy kod)
- cislo bankovniho uctu (pro prevod)
- souhlas s podminkami affiliate programu

### Aktivace

Ve vychozim nastaveni nove ucty afiliatu vyzaduji rucni aktivaci administratorem. Administrator obdrzi e-mailove oznameni o nove registraci a muze:

- aktivovat ucet v panelu **WooCommerce > Afiliati**
- odmitnout registraci s uvedenim duvodu

Volitelne lze zapnout automatickou aktivaci - nove ucty se stanuji aktivnimi ihned po registraci.

### Statusy afiliata

| Status | Popis |
|--------|-------|
| Pending | Cekajici na aktivaci |
| Active | Aktivni - muze generovat odkazy a vydelavat provize |
| Suspended | Pozastaveny administratorem |
| Rejected | Odmitnuty - registrace odmitnuta |

## Sledovani provizi

### Pripocitani provize

Provize je pripocitana automaticky po zaplaceni objednavky spojene s afiliatem. Provize se nepripocitava pro:

- zrusene nebo vracene objednavky
- objednavky zlozene samotnym afiliatem (self-referral)
- produkty vyloucene z programu

### Statusy provize

| Status | Popis |
|--------|-------|
| Pending | Pripocitana, ceka na schvaleni |
| Approved | Schvalena, pripravena k vyplate |
| Paid | Vyplacena |
| Rejected | Odmitnuta (napr. objednavka vracena) |

### Automaticke schvalovani

Provize meni status z "Pending" na "Approved" po uplynutu konfigurovatelneho obdobi (vychozi 14 dnu). Zpozdeni chrani pred provizemi z objednavek, ktere budou vraceny.

Pokud je objednavka zrusena nebo vracena v obdobi cekani, provize je automaticky odmitnuta.

## Panel Muj ucet

Modul pridava endpoint `/polski-affiliates` do panelu Muj ucet. Endpoint je dostupny na adrese:

```
/moje-konto/polski-affiliates/
```

### Dashboard afiliata

Po aktivaci uctu afiliat vidi dashboard s:

- **Statistiky** - celkovy pocet kliknuti, objednavek, provizi
- **Doporucujici odkaz** - uplny odkaz s tlacitkem kopirovani
- **Provize** - seznam provizi s daty, castkami a statusy
- **Vyplaty** - historie vyplat
- **Mesicni statistiky** - graf kliknuti a konverzi

### Generovani odkazu

Afiliat muze vygenerovat doporucujici odkaz na:

- hlavni stranku obchodu
- konkretni produkt
- kategorii produktu
- jakoukoli stranku v domene obchodu

Kazdy odkaz obsahuje parametr `poleca` s tokenem afiliata.

## Administracni panel

### Seznam afiliatu

Prejdete do **WooCommerce > Afiliati**. Tabulka obsahuje:

- jmeno a prijmeni
- e-mail
- status
- datum registrace
- pocet doporuceni
- celkova provize
- zustatek k vyplate

### Sprava provizi

Prejdete do **WooCommerce > Afiliati > Provize**. Administrator muze:

- prohlizet seznam provizi s filtry (afiliat, status, datum)
- schvalovat nebo odmitnout provize
- oznacovat provize jako vyplacene
- exportovat provize do CSV

### Report

Prejdete do **WooCommerce > Afiliati > Report**. Report obsahuje:

- celkova hodnota objednavek z doporuceni
- celkova castka provizi
- konverze (kliknuti -> objednavky)
- top 10 afiliatu
- mesicni trend

## Hooky

### `polski_pro/affiliate/commission_created`

Akce volana po pripocitani provize.

```php
/**
 * @param int   $commission_id ID prowizji
 * @param int   $affiliate_id  ID afilianta
 * @param int   $order_id      ID zamówienia
 * @param float $amount        Kwota prowizji
 */
do_action('polski_pro/affiliate/commission_created', int $commission_id, int $affiliate_id, int $order_id, float $amount);
```

**Priklad:**

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

Akce volana po registraci noveho afiliata.

```php
/**
 * @param int $user_id ID użytkownika
 * @param string $token Wygenerowany token afilianta
 */
do_action('polski_pro/affiliate/registered', int $user_id, string $token);
```

**Priklad:**

```php
add_action('polski_pro/affiliate/registered', function (int $user_id, string $token): void {
    // Przypisanie roli WordPress
    $user = get_userdata($user_id);
    $user->add_role('affiliate');
}, 10, 2);
```

### `polski_pro/affiliate/validate_referral`

Filtruje validaci doporuceni pred pripocitanim provize.

```php
/**
 * @param bool $is_valid     Czy polecenie jest prawidłowe
 * @param int  $affiliate_id ID afilianta
 * @param int  $order_id     ID zamówienia
 */
apply_filters('polski_pro/affiliate/validate_referral', bool $is_valid, int $affiliate_id, int $order_id): bool;
```

**Priklad:**

```php
add_filter('polski_pro/affiliate/validate_referral', function (bool $is_valid, int $affiliate_id, int $order_id): bool {
    $order = wc_get_order($order_id);
    
    // Blokování self-referral podle e-mailové adresy
    $affiliate_email = get_userdata($affiliate_id)->user_email;
    if ($order->get_billing_email() === $affiliate_email) {
        return false;
    }
    
    return $is_valid;
}, 10, 3);
```

## Nejcastejsi problemy

### Provize se nepripocitava

1. Zkontrolujte, ze afiliat ma status "Active"
2. Overite, ze cookie `polski_affiliate_token` je nastaveno (vyvojarske nastroje prohlizece)
3. Zkontrolujte, ze objednavka nebyla zlozena samotnym afiliatem
4. Overite, ze produkty v objednavce nejsou vylouceny z programu

### Cookie se nenastavuje po kliknuti na odkaz

1. Zkontrolujte, ze parametr URL je spravny (vychozi `poleca`)
2. Overite, ze token afiliata existuje a je aktivni
3. Zkontrolujte, ze cache pluginy necachuji stranku s parametry URL - pridejte parametr `poleca` do seznamu vylouceni cache

### Afiliat nevidi panel v Muj ucet

1. Zkontrolujte, ze modul affiliate je zapnuty
2. Prejdete do **Nastaveni > Permalinky** a kliknete "Ulozit" (obnovi pravidla rewrite)
3. Overite, ze endpoint `polski-affiliates` je zaregistrovany

## Souvisejici zdroje

- [Prehled PRO](/pro/overview/)
- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
