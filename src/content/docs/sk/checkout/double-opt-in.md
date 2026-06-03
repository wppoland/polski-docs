---
title: Overenie e-mailovej adresy
description: Double opt-in pri registrácii - aktivačný odkaz, blokovanie prihlásenia a konfigurácia správ vo WooCommerce.
---

Double opt-in potvrdzuje, že zadaný e-mail skutočne patrí osobe, ktorá zakladá účet. Doplnok Polski for WooCommerce odošle aktivačný odkaz a zablokuje prihlásenie až do kliknutia na tento odkaz.

## Prečo používať double opt-in

Poľské právo double opt-in nevyžaduje, ale oplatí sa ho zapnúť vzhľadom na:

- **GDPR** - potvrdzujete totožnosť vlastníka e-mailu
- **Ochrana pred botmi** - blokuje falošné účty
- **Kvalita databázy** - máte istotu, že e-maily sú skutočné
- **Doručiteľnosť** - menej vrátených správ a označení ako spam
- **Zákon o elektronických službách** - potvrdenie záujmu o využívanie služby

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Pokladňa** a nakonfigurujte sekciu "Overenie e-mailu".

### Základné nastavenia

| Nastavenie | Predvolená hodnota | Popis |
|------------|-----------------|------|
| Zapnúť overenie e-mailu | Nie | Aktivuje mechanizmus double opt-in |
| Doba platnosti odkazu | 48 hodín | Ako dlho je aktivačný odkaz platný |
| Automatické odstránenie neoverených | 7 dní | Po koľkých dňoch odstrániť neoverené účty |
| Povoliť nákupy bez overenia | Nie | Či neoverený používateľ môže vytvárať objednávky |

### Pokročilé nastavenia

| Nastavenie | Popis |
|------------|------|
| Presmerovanie po aktivácii | URL, na ktorú bude používateľ presmerovaný po kliknutí na odkaz |
| Stránka čakania | Stránka zobrazená namiesto panela "Môj účet" pre neoverených |
| Opätovné odoslanie odkazu | Či zobrazovať tlačidlo "Odoslať aktivačný odkaz znova" |
| Limit opätovných odoslaní | Maximálny počet opätovných odoslaní odkazu (ochrana pred zneužitím) |

## Proces overenia

### Krok za krokom

1. Zákazník zaregistruje účet (cez "Môj účet" alebo pri objednávke)
2. Doplnok vygeneruje aktivačný token a uloží ho do databázy
3. E-mail s aktivačným odkazom príde na zadanú adresu
4. Účet má stav "neoverený" - prihlásenie je zablokované
5. Zákazník klikne na odkaz v e-maile
6. Doplnok overí token, aktivuje účet a prihlási zákazníka
7. Zákazník sa dostane na stránku "Môj účet" alebo zvolenú URL

### Registrácia pri vytváraní objednávky

Ak je možnosť "Povoliť nákupy bez overenia" vypnutá:

- objednávka nebude vytvorená, kým zákazník neoverí e-mail
- zákazník uvidí oznam s pokynom skontrolovať poštovú schránku

Ak je možnosť zapnutá:

- objednávka bude vytvorená normálne
- účet bude vyžadovať overenie pri ďalšom prihlásení
- aktivačný e-mail sa odošle súbežne s potvrdením objednávky

## Blokovanie prihlásenia

Neoverení používatelia sa nemôžu prihlásiť. Vidia oznam:

> "Váš účet zatiaľ nebol overený. Skontrolujte svoju e-mailovú schránku a kliknite na aktivačný odkaz. [Odoslať odkaz znova]"

### Konfigurácia oznamu o blokovaní

Oznam zmeníte v nastaveniach doplnku. Dostupné premenné:

| Premenná | Popis |
|---------|------|
| `{email}` | E-mailová adresa používateľa |
| `{resend_link}` | Odkaz na opätovné odoslanie aktivačného e-mailu |
| `{expiry}` | Doba platnosti odkazu |

Príklad vlastného oznamu:

```
Účet {email} vyžaduje overenie. Kliknite na odkaz v e-maile, ktorý sme odoslali. 
Nedostali ste správu? {resend_link}
```

## Konfigurácia e-mailových správ

### Šablóna aktivačného e-mailu

Doplnok pridáva nový typ e-mailu v **WooCommerce > Nastavenia > E-maily > Overenie e-mailovej adresy**.

Dostupné nastavenia:

| Nastavenie | Popis |
|------------|------|
| Zapnúť/vypnúť | Aktivuje odosielanie e-mailu |
| Predmet | Predmet správy (predvolene: "Potvrďte svoju e-mailovú adresu") |
| Hlavička | Hlavička v obsahu e-mailu |
| Obsah | Doplnkový text nad aktivačným odkazom |
| Typ e-mailu | HTML alebo obyčajný text |

### Premenné v šablóne

| Premenná | Popis |
|---------|------|
| `{site_title}` | Názov obchodu |
| `{customer_name}` | Meno zákazníka |
| `{activation_link}` | Aktivačný odkaz (úplná URL) |
| `{activation_button}` | Aktivačné tlačidlo (HTML) |
| `{expiry_hours}` | Doba platnosti odkazu v hodinách |

### Prepísanie šablóny e-mailu

Ak chcete prispôsobiť HTML šablónu, skopírujte súbor:

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
    // napr. priradenie roly, odoslanie uvítacieho e-mailu
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

### Filter doby platnosti tokenu

```php
add_filter('polski/email_verification/token_expiry', function (int $hours): int {
    return 72; // 72 hodín namiesto predvolených 48
});
```

### Kontrola stavu overenia

```php
$is_verified = get_user_meta($user_id, '_polski_email_verified', true);

if ($is_verified !== 'yes') {
    // Účet je neoverený
}
```

## Ochrana pred zneužitím

### Obmedzenie opätovných odoslaní

Doplnok umožňuje odoslať aktivačný odkaz znova maximálne 5-krát za hodinu na jeden e-mail. Limit zmeníte v nastaveniach.

### Ochrana tokenov

- Tokeny sú generované cez `wp_generate_password(32, false)` - kryptograficky bezpečné
- Každý token funguje len raz
- Tokeny vypršia po nastavenom čase
- WP-Cron automaticky odstraňuje vypršané tokeny

## Najčastejšie problémy

### Aktivačný e-mail neprichádza

1. Skontrolujte priečinok spam/junk
2. Overte konfiguráciu SMTP (odporúčané: WP Mail SMTP alebo podobný doplnok)
3. Skontrolujte logy e-mailov v **WooCommerce > Stav > Logy**
4. Uistite sa, že e-mail nie je blokovaný poštovým serverom

### Aktivačný odkaz nefunguje

1. Skontrolujte, či odkaz nevypršal (predvolene 48 hodín)
2. Overte, či je permalink vo WordPress správne nakonfigurovaný
3. Skontrolujte, či bezpečnostný doplnok neblokuje URL s tokenom

### Zákazník overil e-mail, ale nemôže sa prihlásiť

1. Skontrolujte, či má meta `_polski_email_verified` hodnotu `yes` v profile používateľa
2. Overte, či iný doplnok neblokuje prihlásenie
3. Skontrolujte, či účet nebol označený ako spam antispamom

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
