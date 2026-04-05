---
title: Overenie e-mailovej adresy
description: Double opt-in pri registrácii - aktivačný odkaz, blokovanie prihlásenia a konfigurácia správy vo WooCommerce.
---

Overenie e-mailovej adresy (double opt-in) je mechanizmus potvrdzovania, že uvedená e-mailová adresa pri registrácii skutočne patrí osobe zakladajúcej účet. Plugin Polski for WooCommerce pridáva proces overenia e-mailu do WooCommerce, zasielaním aktivačného odkazu a blokovaním prihlásenia do momentu potvrdenia.

## Prečo sa oplatí používať double opt-in

Double opt-in nie je vyžadovaný poľským právom, ale je odporúčaný z dôvodov:

- **GDPR** - overenie totožnosti osoby, ktorej údaje spracúvame
- **Ochrana pred botmi** - zabraňuje vytváraniu falošných účtov
- **Kvalita zákazníckej databázy** - garantuje, že e-mailové adresy sú správne
- **Doručiteľnosť e-mailov** - znižuje riziko odrazov (bounces) a označení ako spam
- **Súlad so zákonom o poskytovaní služieb elektronickou cestou** - potvrdenie záujmu o využívanie služby

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Pokladňa** a nakonfigurujte sekciu "Overenie e-mailu".

### Základné nastavenia

| Nastavenie | Predvolená hodnota | Popis |
|------------|-----------------|------|
| Zapnúť overenie e-mailu | Nie | Aktivuje mechanizmus double opt-in |
| Platnosť odkazu | 48 hodín | Ako dlho je aktivačný odkaz aktívny |
| Automatické odstránenie neoverených | 7 dní | Po koľkých dňoch odstrániť neoverené účty |
| Povoliť nákupy bez overenia | Nie | Či neoverený používateľ môže zadávať objednávky |

### Rozšírené nastavenia

| Nastavenie | Popis |
|------------|------|
| Presmerovanie po aktivácii | URL, na ktorý bude používateľ presmerovaný po kliknutí na odkaz |
| Stránka čakania | Stránka zobrazená namiesto panelu "Môj účet" pre neoverených |
| Opätovné zaslanie odkazu | Či zobrazovať tlačidlo "Zaslať znova aktivačný odkaz" |
| Limit opätovných zaslaní | Maximálny počet opätovných zaslaní odkazu (ochrana pred zneužitím) |

## Proces overenia

### Krok po kroku

1. Zákazník zaregistruje účet vo WooCommerce (cez stránku "Môj účet" alebo pri zadávaní objednávky)
2. Plugin generuje unikátny aktivačný token a uloží ho do databázy
3. E-mail s aktivačným odkazom je zaslaný na uvedenú adresu
4. Účet má stav "neoverený" - prihlásenie je zablokované
5. Zákazník klikne na aktivačný odkaz v e-maili
6. Plugin overí token, aktivuje účet a prihlási používateľa
7. Zákazník je presmerovaný na stránku "Môj účet" alebo nakonfigurované URL

### Registrácia pri zadávaní objednávky

Ak je možnosť "Povoliť nákupy bez overenia" vypnutá:

- objednávka nebude zadaná, kým zákazník neoverí e-mail
- zákazník uvidí hlásenie s návodom na skontrolovanie e-mailovej schránky

Ak je možnosť zapnutá:

- objednávka bude zadaná normálne
- účet bude vyžadovať overenie pri ďalšom prihlásení
- aktivačný e-mail bude zaslaný súbežne s potvrdením objednávky

## Blokovanie prihlásenia

Neoverení používatelia sa nemôžu prihlásiť. Pri pokuse o prihlásenie vidia hlásenie:

> "Váš účet ešte nebol overený. Skontrolujte svoju e-mailovú schránku a kliknite na aktivačný odkaz. [Zaslať znova odkaz]"

### Konfigurácia hlásenia blokovania

Hlásenie je možné prispôsobiť v nastaveniach pluginu. Dostupné premenné:

| Premenná | Popis |
|---------|------|
| `{email}` | E-mailová adresa používateľa |
| `{resend_link}` | Odkaz na opätovné zaslanie aktivačného e-mailu |
| `{expiry}` | Platnosť odkazu |

Príklad vlastného hlásenia:

```
Konto {email} wymaga weryfikacji. Kliknij link w e-mailu, który wysłaliśmy. 
Nie otrzymałeś wiadomości? {resend_link}
```

## Konfigurácia e-mailovej správy

### Šablóna aktivačného e-mailu

Plugin pridáva nový typ e-mailu v **WooCommerce > Nastavenia > E-maily > Overenie e-mailovej adresy**.

Dostupné nastavenia:

| Nastavenie | Popis |
|------------|------|
| Zapnúť/vypnúť | Aktivuje zasielanie e-mailu |
| Predmet | Predmet správy (štandardne: "Potvrďte svoju e-mailovú adresu") |
| Hlavička | Hlavička v obsahu e-mailu |
| Obsah | Ďalší text nad aktivačným odkazom |
| Typ e-mailu | HTML alebo čistý text |

### Premenné v šablóne

| Premenná | Popis |
|---------|------|
| `{site_title}` | Názov obchodu |
| `{customer_name}` | Meno zákazníka |
| `{activation_link}` | Aktivačný odkaz (úplné URL) |
| `{activation_button}` | Aktivačné tlačidlo (HTML) |
| `{expiry_hours}` | Platnosť odkazu v hodinách |

### Prepísanie šablóny e-mailu

Na prispôsobenie HTML šablóny skopírujte súbor:

```
wp-content/plugins/polski/templates/emails/email-verification.php
```

do:

```
wp-content/themes/tvoja-tema/woocommerce/emails/email-verification.php
```

## Programové rozšírenia

### Hook pred overením

```php
add_action('polski/email_verification/before_verify', function (int $user_id, string $token): void {
    // Logika pred aktiváciou účtu
    // napr. logovanie udalosti
    error_log(sprintf('Weryfikacja e-mail dla użytkownika #%d', $user_id));
}, 10, 2);
```

### Hook po overení

```php
add_action('polski/email_verification/verified', function (int $user_id): void {
    // Logika po aktivácii účtu
    // napr. priradenie role, zaslanie uvítacieho e-mailu
    $user = new WP_User($user_id);
    $user->set_role('customer');
}, 10, 1);
```

### Filter URL presmerovania

```php
add_filter('polski/email_verification/redirect_url', function (string $url, int $user_id): string {
    return wc_get_page_permalink('myaccount') . 'edit-account/';
}, 10, 2);
```

### Filter platnosti tokenu

```php
add_filter('polski/email_verification/token_expiry', function (int $hours): int {
    return 72; // 72 hodín namiesto štandardných 48
});
```

### Kontrola stavu overenia

```php
$is_verified = get_user_meta($user_id, '_polski_email_verified', true);

if ($is_verified !== 'yes') {
    // Účet neoverený
}
```

## Ochrana pred zneužitím

### Limitovanie opätovných zaslaní

Plugin obmedzuje počet opätovných zaslaní aktivačného odkazu na 5 za hodinu na e-mailovú adresu. Limit je možné zmeniť v nastaveniach.

### Ochrana tokenov

- Tokeny sú generované pomocou `wp_generate_password(32, false)` - kryptograficky bezpečné
- Každý token je možné použiť len raz
- Tokeny vyprchajú po nakonfigurovanom čase
- Vypršané tokeny sú automaticky odstraňované cez WP-Cron

## Najčastejšie problémy

### Aktivačný e-mail nedochádza

1. Skontrolujte priečinok spam/junk
2. Overte konfiguráciu SMTP (odporúčané: WP Mail SMTP alebo podobný plugin)
3. Skontrolujte logy e-mailov v **WooCommerce > Stav > Logy**
4. Uistite sa, že e-mail nie je blokovaný poštovým serverom

### Aktivačný odkaz nefunguje

1. Skontrolujte, či odkaz nevypršal (štandardne 48 hodín)
2. Overte, či permalink vo WordPress je správne nakonfigurovaný
3. Skontrolujte, či bezpečnostný plugin neblokuje URL s tokenom

### Zákazník overil e-mail, ale nemôže sa prihlásiť

1. Skontrolujte, či meta `_polski_email_verified` má hodnotu `yes` v profile používateľa
2. Overte, či iný plugin neblokuje prihlásenie
3. Skontrolujte, či účet nebol označený ako spam antispamom

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
