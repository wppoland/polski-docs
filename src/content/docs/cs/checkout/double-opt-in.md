---
title: Ověření e-mailové adresy
description: Double opt-in při registraci - aktivační odkaz, blokování přihlášení a konfigurace zpráv ve WooCommerce.
---

Double opt-in potvrzuje, že zadaný e-mail skutečně patří osobě zakládající účet. Zásuvný modul Polski for WooCommerce odešle aktivační odkaz a blokuje přihlášení do okamžiku kliknutí na tento odkaz.

## Proč používat double opt-in

Polské právo double opt-in nevyžaduje, ale vyplatí se ho zapnout kvůli:

- **GDPR** - potvrzujete totožnost vlastníka e-mailu
- **Ochrana před boty** - blokuje falešné účty
- **Kvalita databáze** - máte jistotu, že e-maily jsou pravé
- **Doručitelnost** - méně vrácených zpráv a označení jako spam
- **Zákon o elektronických službách** - potvrzení ochoty využívat službu

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Pokladna** a nakonfigurujte sekci "Ověření e-mailu".

### Základní nastavení

| Nastavení | Výchozí hodnota | Popis |
|------------|-----------------|------|
| Zapnout ověření e-mailu | Ne | Aktivuje mechanismus double opt-in |
| Doba platnosti odkazu | 48 hodin | Jak dlouho je aktivační odkaz platný |
| Automatické mazání neověřených | 7 dní | Po kolika dnech smazat neověřené účty |
| Povolit nákupy bez ověření | Ne | Zda může neověřený uživatel vytvářet objednávky |

### Pokročilá nastavení

| Nastavení | Popis |
|------------|------|
| Přesměrování po aktivaci | URL, na kterou bude uživatel přesměrován po kliknutí na odkaz |
| Stránka čekání | Stránka zobrazená místo panelu "Můj účet" pro neověřené |
| Opětovné odeslání odkazu | Zda zobrazit tlačítko "Odeslat aktivační odkaz znovu" |
| Limit opětovných odeslání | Maximální počet opětovných odeslání odkazu (ochrana před zneužitím) |

## Proces ověření

### Krok za krokem

1. Zákazník zaregistruje účet (přes "Můj účet" nebo při objednávce)
2. Zásuvný modul vygeneruje aktivační token a uloží ho do databáze
3. E-mail s aktivačním odkazem dorazí na zadanou adresu
4. Účet má stav "neověřený" - přihlášení zablokováno
5. Zákazník klikne na odkaz v e-mailu
6. Zásuvný modul ověří token, aktivuje účet a přihlásí zákazníka
7. Zákazník se dostane na stránku "Můj účet" nebo zvolenou URL

### Registrace při vytváření objednávky

Pokud je možnost "Povolit nákupy bez ověření" vypnutá:

- objednávka nebude vytvořena, dokud zákazník neověří e-mail
- zákazník uvidí zprávu s pokynem ke kontrole e-mailové schránky

Pokud je možnost zapnutá:

- objednávka bude vytvořena normálně
- účet bude vyžadovat ověření při příštím přihlášení
- aktivační e-mail bude odeslán souběžně s potvrzením objednávky

## Blokování přihlášení

Neověření uživatelé se nemohou přihlásit. Vidí zprávu:

> "Váš účet ještě nebyl ověřen. Zkontrolujte svou e-mailovou schránku a klikněte na aktivační odkaz. [Odeslat odkaz znovu]"

### Konfigurace zprávy o blokování

Zprávu změníte v nastavení zásuvného modulu. Dostupné proměnné:

| Proměnná | Popis |
|---------|------|
| `{email}` | E-mailová adresa uživatele |
| `{resend_link}` | Odkaz na opětovné odeslání aktivačního e-mailu |
| `{expiry}` | Doba platnosti odkazu |

Příklad vlastní zprávy:

```
Účet {email} vyžaduje ověření. Klikněte na odkaz v e-mailu, který jsme odeslali. 
Zprávu jste neobdrželi? {resend_link}
```

## Konfigurace e-mailových zpráv

### Šablona aktivačního e-mailu

Zásuvný modul přidává nový typ e-mailu v **WooCommerce > Nastavení > E-maily > Ověření e-mailové adresy**.

Dostupná nastavení:

| Nastavení | Popis |
|------------|------|
| Zapnout/vypnout | Aktivuje odesílání e-mailu |
| Předmět | Předmět zprávy (výchozí: "Potvrďte svou e-mailovou adresu") |
| Záhlaví | Záhlaví v obsahu e-mailu |
| Obsah | Doplňkový text nad aktivačním odkazem |
| Typ e-mailu | HTML nebo prostý text |

### Proměnné v šabloně

| Proměnná | Popis |
|---------|------|
| `{site_title}` | Název obchodu |
| `{customer_name}` | Jméno zákazníka |
| `{activation_link}` | Aktivační odkaz (úplná URL) |
| `{activation_button}` | Aktivační tlačítko (HTML) |
| `{expiry_hours}` | Doba platnosti odkazu v hodinách |

### Přepsání e-mailové šablony

Pro úpravu HTML šablony zkopírujte soubor:

```
wp-content/plugins/polski/templates/emails/email-verification.php
```

do:

```
wp-content/themes/tvuj-motiv/woocommerce/emails/email-verification.php
```

## Programová rozšíření

### Hook před ověřením

```php
add_action('polski/email_verification/before_verify', function (int $user_id, string $token): void {
    // Logika před aktivací účtu
    // např. logování události
    error_log(sprintf('Weryfikacja e-mail dla użytkownika #%d', $user_id));
}, 10, 2);
```

### Hook po ověření

```php
add_action('polski/email_verification/verified', function (int $user_id): void {
    // Logika po aktivaci účtu
    // např. přiřazení role, odeslání uvítacího e-mailu
    $user = new WP_User($user_id);
    $user->set_role('customer');
}, 10, 1);
```

### Filtr URL přesměrování

```php
add_filter('polski/email_verification/redirect_url', function (string $url, int $user_id): string {
    return wc_get_page_permalink('myaccount') . 'edit-account/';
}, 10, 2);
```

### Filtr doby platnosti tokenu

```php
add_filter('polski/email_verification/token_expiry', function (int $hours): int {
    return 72; // 72 hodin místo výchozích 48
});
```

### Kontrola stavu ověření

```php
$is_verified = get_user_meta($user_id, '_polski_email_verified', true);

if ($is_verified !== 'yes') {
    // Účet neověřen
}
```

## Ochrana před zneužitím

### Omezení opětovných odeslání

Zásuvný modul umožňuje odeslat aktivační odkaz znovu maximálně 5krát za hodinu na jeden e-mail. Limit změníte v nastavení.

### Ochrana tokenů

- Tokeny jsou generovány funkcí `wp_generate_password(32, false)` - kryptograficky bezpečné
- Každý token funguje jen jednou
- Tokeny vyprší po nastavené době
- WP-Cron automaticky maže prošlé tokeny

## Nejčastější problémy

### Aktivační e-mail nedorazí

1. Zkontrolujte složku spam/junk
2. Ověřte konfiguraci SMTP (doporučeno: WP Mail SMTP nebo podobný zásuvný modul)
3. Zkontrolujte logy e-mailů v **WooCommerce > Stav > Logy**
4. Ujistěte se, že e-mail neblokuje poštovní server

### Aktivační odkaz nefunguje

1. Zkontrolujte, zda odkaz nevypršel (výchozí 48 hodin)
2. Ověřte, zda jsou permalinky ve WordPress správně nakonfigurovány
3. Zkontrolujte, zda bezpečnostní zásuvný modul neblokuje URL s tokenem

### Zákazník ověřil e-mail, ale nemůže se přihlásit

1. Zkontrolujte, zda meta `_polski_email_verified` má hodnotu `yes` v profilu uživatele
2. Ověřte, zda jiný zásuvný modul neblokuje přihlášení
3. Zkontrolujte, zda účet nebyl označen jako spam antispamem

## Související zdroje

- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
