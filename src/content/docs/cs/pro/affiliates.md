---
title: Affiliate program
description: Dokumentace affiliate programu Polski PRO for WooCommerce - doporučující odkazy, sledování provizí, registrace afiliátů a panel Můj účet.
---

Modul affiliate programu umožňuje provozovat program doporučení v obchodě. Afiliáti sdílejí doporučující odkazy a plugin sleduje konverze a počítá provize.

## Jak to funguje

1. Zákazník se zaregistruje jako afiliát v panelu Můj účet
2. Administrátor aktivuje účet afiliáta
3. Afiliát obdrží jedinečný token a doporučující odkaz
4. Afiliát sdílí odkaz (např. na sociálních sítích, na blogu)
5. Návštěvník klikne na odkaz - token je uložen do cookie
6. Návštěvník odešle objednávku - plugin přiřadí objednávku k afiliátovi
7. Po zaplacení objednávky plugin vypočítá provizi

## Konfigurace

Přejděte na **WooCommerce > Nastavení > Polski > Moduly PRO > Affiliate program**.

Modul je řízen možností:

```
polski_affiliates
```

### Obecná nastavení

| Nastavení | Popis |
|------------|------|
| Zapnout affiliate program | Aktivuje modul |
| Sazba provize (%) | Procentní provize z hodnoty objednávky (výchozí 10 %) |
| Základ provize | Částka bez DPH / Částka s DPH / Částka bez DPH bez dopravy |
| Doba platnosti cookie (dny) | Kolik dní je cookie s tokenem platná (výchozí 30) |
| Automatická aktivace | Automaticky aktivovat nové afiliáty (výchozí: vypnuto) |
| Minimální výplata | Minimální částka provize k výplatě |
| Parametr URL | Název parametru v doporučujícím odkazu (výchozí `poleca`) |

### Sazby provize pro jednotlivé produkty

Kromě globální sazby nastavte individuální sazbu pro produkt. V editaci produktu, sekce "Affiliate program":

- **Sazba provize (%)** - přepisuje globální sazbu
- **Vyloučit z programu** - produkt negeneruje provizi

Sazby pro jednotlivé kategorie také fungují - týkají se všech produktů v kategorii, pokud produkt nemá vlastní sazbu.

## Doporučující odkazy

### Formát odkazu

Odkaz obsahuje parametr URL s tokenem afiliáta:

```
https://example.com/?poleca=abc123def456
```

Parametr `poleca` je konfigurovatelný. Token je jedinečný identifikátor afiliáta generovaný při registraci.

### Cookie tracking

Po kliknutí na doporučující odkaz plugin nastaví cookie:

| Parametr | Hodnota |
|----------|---------|
| Název cookie | `polski_affiliate_token` |
| Hodnota | Token afiliáta |
| Doba platnosti | Konfigurovatelná (výchozí 30 dní) |
| Cesta | `/` |
| SameSite | `Lax` |

Cookie je nastavena na straně serveru (PHP) s příznakem `HttpOnly`. Při následujících návštěvách plugin přiřadí objednávku k afiliátovi.

### Atribuce objednávky

Plugin používá model "last click" - provizi obdrží poslední afiliát, na jehož odkaz zákazník klikl.

## Registrace a aktivace afiliátů

### Registrace

Zákazník se zaregistruje jako afiliát v Můj účet (`/muj-ucet/polski-affiliates/`). Formulář obsahuje:

- jméno a příjmení (načítáno automaticky z účtu)
- způsob výplaty provize (převod / slevový kód)
- číslo bankovního účtu (pro převod)
- souhlas s podmínkami affiliate programu

### Aktivace

Ve výchozím nastavení nové účty vyžadují ruční aktivaci. Administrátor obdrží e-mail o registraci a může:

- aktivovat účet v panelu **WooCommerce > Afiliáti**
- zamítnout registraci s uvedením důvodu

Zapněte automatickou aktivaci, aby se účty staly aktivními ihned.

### Stavy afiliáta

| Stav | Popis |
|--------|------|
| Pending | Čeká na aktivaci |
| Active | Aktivní - může generovat odkazy a vydělávat provize |
| Suspended | Pozastaven administrátorem |
| Rejected | Zamítnut - registrace zamítnuta |

## Sledování provizí

### Výpočet provize

Provize se počítá automaticky po zaplacení objednávky. Nepočítá se pro:

- zrušené nebo vrácené objednávky
- objednávky odeslané samotným afiliátem (self-referral)
- produkty vyloučené z programu

### Stavy provize

| Stav | Popis |
|--------|------|
| Pending | Vypočtena, čeká na schválení |
| Approved | Schválena, připravena k výplatě |
| Paid | Vyplacena |
| Rejected | Zamítnuta (např. vrácená objednávka) |

### Automatické schvalování

Provize se mění z "Pending" na "Approved" po 14 dnech (konfigurovatelné). To chrání před provizemi z vrácených objednávek.

Pokud je objednávka zrušena během čekací doby, provize je automaticky zamítnuta.

## Panel Můj účet

Modul přidává sekci v Můj účet na adrese:

```
/muj-ucet/polski-affiliates/
```

### Dashboard afiliáta

Po aktivaci účtu afiliát vidí dashboard s:

- **Statistiky** - celkový počet kliknutí, objednávek, provizí
- **Doporučující odkaz** - úplný odkaz s tlačítkem kopírování
- **Provize** - seznam provizí s daty, částkami a stavy
- **Výplaty** - historie výplat
- **Měsíční statistiky** - graf kliknutí a konverzí

### Generování odkazů

Afiliát může vygenerovat doporučující odkaz na:

- domovskou stránku obchodu
- konkrétní produkt
- kategorii produktů
- libovolnou stránku v doméně obchodu

Každý odkaz obsahuje parametr `poleca` s tokenem afiliáta.

## Panel administrátora

### Seznam afiliátů

Přejděte na **WooCommerce > Afiliáti**. Tabulka obsahuje:

- jméno a příjmení
- e-mail
- stav
- datum registrace
- počet doporučení
- celková provize
- zůstatek k výplatě

### Správa provizí

Přejděte na **WooCommerce > Afiliáti > Provize**. Administrátor může:

- prohlížet seznam provizí s filtry (afiliát, stav, datum)
- schvalovat nebo zamítat provize
- označovat provize jako vyplacené
- exportovat provize do CSV

### Report

Přejděte na **WooCommerce > Afiliáti > Report**. Report obsahuje:

- celkovou hodnotu objednávek z doporučení
- celkovou částku provizí
- konverzi (kliknutí -> objednávky)
- top 10 afiliátů
- měsíční trend

## Hooky

### `polski_pro/affiliate/commission_created`

Akce volaná po výpočtu provize.

```php
/**
 * @param int   $commission_id ID provize
 * @param int   $affiliate_id  ID afiliáta
 * @param int   $order_id      ID objednávky
 * @param float $amount        Částka provize
 */
do_action('polski_pro/affiliate/commission_created', int $commission_id, int $affiliate_id, int $order_id, float $amount);
```

**Příklad:**

```php
add_action('polski_pro/affiliate/commission_created', function (int $commission_id, int $affiliate_id, int $order_id, float $amount): void {
    // Upozornění afiliáta na novou provizi
    $affiliate = get_userdata($affiliate_id);
    wp_mail(
        $affiliate->user_email,
        'Nová provize v affiliate programu',
        sprintf(
            'Obdrželi jste provizi %.2f zł za objednávku #%d.',
            $amount,
            $order_id
        )
    );
}, 10, 4);
```

### `polski_pro/affiliate/registered`

Akce volaná po registraci nového afiliáta.

```php
/**
 * @param int $user_id ID uživatele
 * @param string $token Vygenerovaný token afiliáta
 */
do_action('polski_pro/affiliate/registered', int $user_id, string $token);
```

**Příklad:**

```php
add_action('polski_pro/affiliate/registered', function (int $user_id, string $token): void {
    // Přiřazení role WordPress
    $user = get_userdata($user_id);
    $user->add_role('affiliate');
}, 10, 2);
```

### `polski_pro/affiliate/validate_referral`

Filtruje validaci doporučení před výpočtem provize.

```php
/**
 * @param bool $is_valid     Zda je doporučení platné
 * @param int  $affiliate_id ID afiliáta
 * @param int  $order_id     ID objednávky
 */
apply_filters('polski_pro/affiliate/validate_referral', bool $is_valid, int $affiliate_id, int $order_id): bool;
```

**Příklad:**

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

## Nejčastější problémy

### Provize se nepočítá

1. Zkontrolujte, zda má afiliát stav "Active"
2. Ověřte, zda je cookie `polski_affiliate_token` nastavena (vývojářské nástroje prohlížeče)
3. Zkontrolujte, zda objednávka nebyla odeslána samotným afiliátem
4. Ověřte, zda produkty v objednávce nejsou vyloučeny z programu

### Cookie se po kliknutí na odkaz nenastavuje

1. Zkontrolujte, zda je parametr URL správný (výchozí `poleca`)
2. Ověřte, zda token afiliáta existuje a je aktivní
3. Zkontrolujte, zda cache pluginy necachují stránku s parametry URL - přidejte parametr `poleca` do seznamu vyloučení cache

### Afiliát nevidí panel v Můj účet

1. Zkontrolujte, zda je affiliate modul zapnutý
2. Přejděte na **Nastavení > Trvalé odkazy** a klikněte na "Uložit" (obnoví rewrite pravidla)
3. Ověřte, zda je endpoint `polski-affiliates` registrován

## Související zdroje

- [Přehled PRO](/pro/overview/)
- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
