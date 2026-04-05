---
title: Overeni e-mailove adresy
description: Double opt-in pri registraci - aktivacni odkaz, blokada prihlaseni a konfigurace zprav ve WooCommerce.
---

Double opt-in potvrzuje, ze zadany e-mail skutecne patri osobe zakladajici ucet. Plugin odesle aktivacni odkaz a blokuje prihlaseni do kliknuti na tento odkaz.

## Proc pouzivat double opt-in

Double opt-in neni vyzadovan polskym pravem, ale je doporucovan z duvodu:

- **GDPR** - overeni totožnosti osoby, jejiz data zpracovavame
- **Ochrana pred boty** - zabranuje vytvareni falsenych uctu
- **Kvalita zakaznicke databaze** - garantuje, ze e-mailove adresy jsou spravne
- **Dorucitelnost e-mailu** - snizuje riziko nedoruceni (bounces) a oznaceni jako spam
- **Soulad se zakonem o poskytovani sluzeb elektronickou cestou** - potvrzeni zameru vyuzivat sluzbu

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Pokladna** a nakonfigurujte sekci "Overeni e-mailu".

### Zakladni nastaveni

| Nastaveni | Vychozi hodnota | Popis |
|------------|-----------------|------|
| Aktivovat overeni e-mailu | Ne | Aktivuje mechanismus double opt-in |
| Doba platnosti odkazu | 48 hodin | Jak dlouho je aktivacni odkaz aktivni |
| Automaticke odstranovani neoverenych | 7 dnu | Po kolika dnech odstranit neoverene ucty |
| Povolit nakupy bez overeni | Ne | Zda neovereny uzivatel muze skladat objednavky |

### Pokrocila nastaveni

| Nastaveni | Popis |
|------------|------|
| Presmerovani po aktivaci | URL, na ktere bude uzivatel presmerovan po kliknuti na odkaz |
| Stranka cekani | Stranka zobrazena misto panelu "Muj ucet" pro neoverene |
| Opetovne odeslani odkazu | Zda zobrazit tlacitko "Odeslat znovu aktivacni odkaz" |
| Limit opetovnych odeslani | Maximalni pocet opetovnych odeslani odkazu (ochrana pred zneuzitim) |

## Proces overeni

### Krok za krokem

1. Zakaznik registruje ucet ve WooCommerce (pres stranku "Muj ucet" nebo pri skladani objednavky)
2. Plugin generuje unikatni aktivacni token a ulozi jej v databazi
3. E-mail s aktivacnim odkazem je odeslan na zadanou adresu
4. Ucet ma stav "neovereny" - prihlaseni je blokovano
5. Zakaznik klikne na aktivacni odkaz v e-mailu
6. Plugin overi token, aktivuje ucet a prihlasi uzivatele
7. Zakaznik je presmerovan na stranku "Muj ucet" nebo nakonfigurovany URL

### Registrace pri skladani objednavky

Pokud je moznost "Povolit nakupy bez overeni" deaktivovana:

- objednavka nebude slozena, dokud zakaznik neoveri e-mail
- zakaznik uvidi zpravu s instrukci zkontrolovat postovni schranku

Pokud je moznost aktivovana:

- objednavka bude slozena normalne
- ucet bude vyzadovat overeni pri prisim prihlaseni
- aktivacni e-mail bude odeslan paralelne s potvrzenim objednavky

## Blokada prihlaseni

Neovereni uzivatele se nemohou prihlasit. Pri pokusu o prihlaseni uvidi zpravu:

> "Twoje konto nie zostało jeszcze zweryfikowane. Sprawdź swoją skrzynkę e-mail i kliknij link aktywacyjny. [Wyślij ponownie link]"

### Konfigurace zpravy blokady

Zpravu lze prizpusobit v nastaveních pluginu. Dostupne promenne:

| Promenna | Popis |
|---------|------|
| `{email}` | E-mailova adresa uzivatele |
| `{resend_link}` | Odkaz na opetovne odeslani aktivacniho e-mailu |
| `{expiry}` | Doba platnosti odkazu |

Priklad vlastni zpravy:

```
Konto {email} wymaga weryfikacji. Kliknij link w e-mailu, który wysłaliśmy. 
Nie otrzymałeś wiadomości? {resend_link}
```

## Konfigurace e-mailove zpravy

### Sablona aktivacniho e-mailu

Plugin pridava novy typ e-mailu v **WooCommerce > Nastaveni > E-maily > Overeni e-mailove adresy**.

Dostupna nastaveni:

| Nastaveni | Popis |
|------------|------|
| Aktivovat/deaktivovat | Aktivuje odesilani e-mailu |
| Predmet | Predmet zpravy (vychozi: "Potwierdź swój adres e-mail") |
| Hlavicka | Hlavicka v obsahu e-mailu |
| Obsah | Doplnkovy text nad aktivacnim odkazem |
| Typ e-mailu | HTML nebo cisty text |

### Promenne v sablone

| Promenna | Popis |
|---------|------|
| `{site_title}` | Nazev obchodu |
| `{customer_name}` | Jmeno zakaznika |
| `{activation_link}` | Aktivacni odkaz (uplny URL) |
| `{activation_button}` | Aktivacni tlacitko (HTML) |
| `{expiry_hours}` | Doba platnosti odkazu v hodinach |

### Prepis sablony e-mailu

Pro prizpusobeni HTML sablony zkopirujte soubor:

```
wp-content/plugins/polski/templates/emails/email-verification.php
```

do:

```
wp-content/themes/twoj-motyw/woocommerce/emails/email-verification.php
```

## Programaticka rozsireni

### Hook pred overenim

```php
add_action('polski/email_verification/before_verify', function (int $user_id, string $token): void {
    // Logika pred aktivaci uctu
    error_log(sprintf('Weryfikacja e-mail dla użytkownika #%d', $user_id));
}, 10, 2);
```

### Hook po overeni

```php
add_action('polski/email_verification/verified', function (int $user_id): void {
    // Logika po aktivaci uctu
    $user = new WP_User($user_id);
    $user->set_role('customer');
}, 10, 1);
```

### Filtr URL presmerovani

```php
add_filter('polski/email_verification/redirect_url', function (string $url, int $user_id): string {
    return wc_get_page_permalink('myaccount') . 'edit-account/';
}, 10, 2);
```

### Filtr doby platnosti tokenu

```php
add_filter('polski/email_verification/token_expiry', function (int $hours): int {
    return 72; // 72 hodin misto vychozich 48
});
```

### Kontrola stavu overeni

```php
$is_verified = get_user_meta($user_id, '_polski_email_verified', true);

if ($is_verified !== 'yes') {
    // Ucet neovereny
}
```

## Ochrana pred zneuzitim

### Limitovani opetovnych odeslani

Plugin omezuje pocet opetovnych odeslani aktivacniho odkazu na 5 za hodinu na e-mailovou adresu. Limit lze zmenit v nastaveních.

### Ochrana tokenu

- Tokeny jsou generovany pomoci `wp_generate_password(32, false)` - kryptograficky bezpecne
- Kazdy token muze byt pouzit pouze jednou
- Tokeny expiruji po nakonfigurovanem case
- Expirovane tokeny jsou automaticky odstranovany pres WP-Cron

## Nejcastejsi problemy

### Aktivacni e-mail nedochazi

1. Zkontrolujte slozku spam/junk
2. Overite konfiguraci SMTP (doporuceno: WP Mail SMTP nebo podobny plugin)
3. Zkontrolujte logy e-mailu v **WooCommerce > Stav > Logy**
4. Ujistete se, ze e-mail neni blokovan postovnim serverem

### Aktivacni odkaz nefunguje

1. Zkontrolujte, zda odkaz nevyprsiel (vychozi 48 hodin)
2. Overite, zda permalink ve WordPress je spravne nakonfiguran
3. Zkontrolujte, zda bezpecnostni plugin neblokuje URL s tokenem

### Zakaznik overil e-mail, ale nemuze se prihlasit

1. Zkontrolujte, zda meta `_polski_email_verified` ma hodnotu `yes` v profilu uzivatele
2. Overite, zda jiny plugin neblokuje prihlaseni
3. Zkontrolujte, zda ucet nebyl oznacen jako spam antispamem

## Souvisejici zdroje

- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
