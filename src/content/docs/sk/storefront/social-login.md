---
title: Sociálne prihlásenie (social login)
description: Modul sociálneho prihlásenia v Polski for WooCommerce - prihlásenie cez Google a Facebook OAuth2 na stránke účtu, objednávky a prihlásenia WordPress.
---

Sociálne prihlásenie umožňuje zákazníkom registráciu a prihlásenie cez účet Google alebo Facebook. Odstraňuje nutnosť vytvárať a pamätať si heslo, čo zrýchľuje nákupný proces a zvyšuje počet registrácií.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Moduly obchodu** a zapnite **Sociálne prihlásenie**. Následne nakonfigurujte API kľúče pre vybraných poskytovateľov (Google, Facebook alebo oboch).

## Funkcie

- Prihlásenie a registrácia cez Google OAuth2
- Prihlásenie a registrácia cez Facebook OAuth2
- Tlačidlá na stránke Môj účet, objednávky a prihlásenia WordPress
- Automatická registrácia s rolou "Zákazník" (customer)
- Prepojenie účtov podľa e-mailovej adresy alebo identifikátora poskytovateľa
- Bezpečná obsluha tokenov OAuth2
- Žiadne ukladanie hesiel používateľov prihlasujúcich sa sociálne

## Nastavenia

Konfigurácia v **WooCommerce > Polski > Moduly obchodu > Sociálne prihlásenie**.

| Nastavenie | Predvolene | Popis |
|---|---|---|
| `google_enabled` | `false` | Zapnúť prihlásenie cez Google |
| `google_client_id` | - | Client ID z Google Cloud Console |
| `google_client_secret` | - | Client Secret z Google Cloud Console |
| `facebook_enabled` | `false` | Zapnúť prihlásenie cez Facebook |
| `facebook_app_id` | - | App ID z Meta for Developers |
| `facebook_app_secret` | - | App Secret z Meta for Developers |
| `auto_register` | `true` | Automaticky vytvoriť účet pri prvom prihlásení |

Možnosť v databáze: `polski_social_login`.

## Konfigurácia poskytovateľov

### Google

1. Prejdite do [Google Cloud Console](https://console.cloud.google.com/)
2. Vytvorte nový projekt alebo vyberte existujúci
3. Prejdite do **APIs & Services > Credentials**
4. Kliknite na **Create Credentials > OAuth 2.0 Client ID**
5. Typ aplikácie: **Web application**
6. Pridajte autorizované URI presmerovania: `https://tvojobchod.sk/?polski_social_login=google_callback`
7. Skopírujte **Client ID** a **Client Secret** do nastavení modulu
8. Uistite sa, že **Google+ API** alebo **People API** je v projekte zapnuté

### Facebook

1. Prejdite do [Meta for Developers](https://developers.facebook.com/)
2. Vytvorte novú aplikáciu typu **Consumer**
3. V nastaveniach aplikácie prejdite do **Facebook Login > Settings**
4. Pridajte platné URI presmerovania OAuth: `https://tvojobchod.sk/?polski_social_login=facebook_callback`
5. Skopírujte **App ID** a **App Secret** do nastavení modulu
6. Nastavte aplikáciu do režimu **Live** (nie sandbox)

## Prepojenie účtov

Modul prepája používateľské účty nasledujúcim spôsobom:

1. **Podľa e-mailovej adresy** - ak už účet WordPress s rovnakou e-mailovou adresou existuje, modul ich prepojí automaticky (používateľ sa prihlási na existujúci účet)
2. **Podľa identifikátora poskytovateľa** - ak sa používateľ predtým prihlásil cez toho istého poskytovateľa, modul ho rozpozná podľa uloženého identifikátora

Dáta poskytovateľa sa ukladajú v `usermeta`:

- `_polski_social_google_id` - identifikátor Google
- `_polski_social_facebook_id` - identifikátor Facebook

## Technické detaily

### Tok OAuth2

1. Zákazník klikne na tlačidlo "Prihlásiť sa cez Google/Facebook"
2. Presmerovanie na autorizačnú stránku poskytovateľa
3. Zákazník udelí súhlas so zdieľaním dát
4. Poskytovateľ presmeruje späť do obchodu s autorizačným kódom
5. Modul vymení kód za prístupový token (na strane servera)
6. Modul načíta profil používateľa (meno, e-mail, identifikátor)
7. Používateľ je prihlásený alebo zaregistrovaný

### Bezpečnosť

- Tokeny OAuth2 sa vymieňajú na strane servera (nikdy v prehliadači)
- Parameter `state` chráni pred útokmi CSRF
- Nonce WordPress sa validuje pri iniciácii prihlásenia
- Client Secret nie je nikdy vystavený v kóde front-endu

### Hooky

```php
// Zmeniť rolu novo zaregistrovaného používateľa
add_filter('polski/social_login/default_role', function (): string {
    return 'subscriber'; // predvolene: 'customer'
});

// Vykonať akciu po registrácii cez social login
add_action('polski/social_login/user_registered', function (int $user_id, string $provider): void {
    // Poslať privítací e-mail
    wp_mail(
        get_userdata($user_id)->user_email,
        'Witamy w sklepie!',
        'Twoje konto zostało utworzone.'
    );
}, 10, 2);

// Filtrovať dáta profilu pred uložením
add_filter('polski/social_login/profile_data', function (array $data, string $provider): array {
    return $data;
}, 10, 2);

// Vypnúť automatickú registráciu pre vybraného poskytovateľa
add_filter('polski/social_login/auto_register', function (bool $auto, string $provider): bool {
    if ($provider === 'facebook') {
        return false;
    }
    return $auto;
}, 10, 2);
```

### CSS triedy

- `.polski-social-login` - kontajner tlačidiel
- `.polski-social-login__button` - tlačidlo prihlásenia
- `.polski-social-login__button--google` - tlačidlo Google
- `.polski-social-login__button--facebook` - tlačidlo Facebook
- `.polski-social-login__separator` - separátor "alebo"

### ID modulu

`social_login`

## Riešenie problémov

**Tlačidlo presmeruje na stránku chyby poskytovateľa** - skontrolujte, či URI presmerovania v konzole poskytovateľa presne zodpovedá adrese obchodu (pozor na `https` vs `http` a koncovú lomku).

**Používateľ sa po prihlásení nevytvorí** - uistite sa, že `auto_register` je zapnuté. Ak je vypnuté, prihlásenie funguje len pre existujúce účty so zhodnou e-mailovou adresou.

**Chyba "invalid_client"** - skontrolujte správnosť Client ID a Client Secret. Uistite sa, že nie sú žiadne medzery na začiatku alebo konci.

**Facebook vyžaduje recenziu aplikácie** - pre základné prihlásenie (e-mail, meno) recenzia nie je potrebná. Ak je aplikácia v režime sandbox, prihlásiť sa môžu len administrátori a testeri pridaní v paneli Meta.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
