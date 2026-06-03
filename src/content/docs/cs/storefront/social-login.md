---
title: Přihlášení přes sociální sítě (social login)
description: Modul přihlášení přes sociální sítě v Polski for WooCommerce - přihlášení přes Google a Facebook OAuth2 na stránce účtu, objednávky a přihlášení WordPress.
---

Přihlášení přes sociální sítě umožňuje zákazníkům registraci a přihlášení přes účet Google nebo Facebook. Odstraňuje nutnost vytvářet a pamatovat si heslo, což zrychluje nákupní proces a zvyšuje počet registrací.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **Přihlášení přes sociální sítě**. Poté nakonfigurujte API klíče pro vybrané poskytovatele (Google, Facebook nebo oba).

## Funkce

- Přihlášení a registrace přes Google OAuth2
- Přihlášení a registrace přes Facebook OAuth2
- Tlačítka na stránce Můj účet, objednávky a přihlášení WordPress
- Automatická registrace s rolí "Zákazník" (customer)
- Propojení účtů podle e-mailové adresy nebo identifikátoru poskytovatele
- Bezpečná obsluha tokenů OAuth2
- Žádné ukládání hesel uživatelů přihlašujících se přes sociální sítě

## Nastavení

Konfigurace v **WooCommerce > Polski > Moduly obchodu > Přihlášení přes sociální sítě**.

| Nastavení | Výchozí | Popis |
|---|---|---|
| `google_enabled` | `false` | Zapnout přihlášení přes Google |
| `google_client_id` | - | Client ID z Google Cloud Console |
| `google_client_secret` | - | Client Secret z Google Cloud Console |
| `facebook_enabled` | `false` | Zapnout přihlášení přes Facebook |
| `facebook_app_id` | - | App ID z Meta for Developers |
| `facebook_app_secret` | - | App Secret z Meta for Developers |
| `auto_register` | `true` | Automaticky vytvořit účet při prvním přihlášení |

Možnost v databázi: `polski_social_login`.

## Konfigurace poskytovatelů

### Google

1. Přejděte do [Google Cloud Console](https://console.cloud.google.com/)
2. Vytvořte nový projekt nebo vyberte existující
3. Přejděte do **APIs & Services > Credentials**
4. Klikněte na **Create Credentials > OAuth 2.0 Client ID**
5. Typ aplikace: **Web application**
6. Přidejte autorizovaný URI přesměrování: `https://vasobchod.cz/?polski_social_login=google_callback`
7. Zkopírujte **Client ID** a **Client Secret** do nastavení modulu
8. Ujistěte se, že **Google+ API** nebo **People API** je v projektu zapnuto

### Facebook

1. Přejděte do [Meta for Developers](https://developers.facebook.com/)
2. Vytvořte novou aplikaci typu **Consumer**
3. V nastavení aplikace přejděte do **Facebook Login > Settings**
4. Přidejte platný URI přesměrování OAuth: `https://vasobchod.cz/?polski_social_login=facebook_callback`
5. Zkopírujte **App ID** a **App Secret** do nastavení modulu
6. Nastavte aplikaci do režimu **Live** (ne sandbox)

## Propojení účtů

Modul propojuje účty uživatelů následovně:

1. **Podle e-mailové adresy** - pokud již existuje účet WordPress se stejnou e-mailovou adresou, modul je propojí automaticky (uživatel se přihlásí na existující účet)
2. **Podle identifikátoru poskytovatele** - pokud se uživatel již dříve přihlásil přes stejného poskytovatele, modul ho rozpozná podle uloženého identifikátoru

Data poskytovatele se ukládají do `usermeta`:

- `_polski_social_google_id` - identifikátor Google
- `_polski_social_facebook_id` - identifikátor Facebook

## Technické podrobnosti

### Tok OAuth2

1. Zákazník klikne na tlačítko "Přihlásit přes Google/Facebook"
2. Přesměrování na autorizační stránku poskytovatele
3. Zákazník vyjádří souhlas se sdílením dat
4. Poskytovatel přesměruje zpět do obchodu s autorizačním kódem
5. Modul vymění kód za přístupový token (na straně serveru)
6. Modul načte profil uživatele (jméno, e-mail, identifikátor)
7. Uživatel je přihlášen nebo zaregistrován

### Bezpečnost

- Tokeny OAuth2 se vyměňují na straně serveru (nikdy v prohlížeči)
- Parametr `state` chrání před útoky CSRF
- Nonce WordPress je validován při zahájení přihlášení
- Client Secret není nikdy vystaven v kódu front-endu

### Hooky

```php
// Změna role nově zaregistrovaného uživatele
add_filter('polski/social_login/default_role', function (): string {
    return 'subscriber'; // výchozí: 'customer'
});

// Provedení akce po registraci přes social login
add_action('polski/social_login/user_registered', function (int $user_id, string $provider): void {
    // Odeslání uvítacího e-mailu
    wp_mail(
        get_userdata($user_id)->user_email,
        'Vítejte v obchodě!',
        'Váš účet byl vytvořen.'
    );
}, 10, 2);

// Filtr dat profilu před uložením
add_filter('polski/social_login/profile_data', function (array $data, string $provider): array {
    return $data;
}, 10, 2);

// Vypnutí automatické registrace pro vybraného poskytovatele
add_filter('polski/social_login/auto_register', function (bool $auto, string $provider): bool {
    if ($provider === 'facebook') {
        return false;
    }
    return $auto;
}, 10, 2);
```

### CSS třídy

- `.polski-social-login` - kontejner tlačítek
- `.polski-social-login__button` - tlačítko přihlášení
- `.polski-social-login__button--google` - tlačítko Google
- `.polski-social-login__button--facebook` - tlačítko Facebook
- `.polski-social-login__separator` - oddělovač "nebo"

### ID modulu

`social_login`

## Řešení problémů

**Tlačítko přesměrovává na chybovou stránku poskytovatele** - zkontrolujte, zda URI přesměrování v konzoli poskytovatele přesně odpovídá adrese obchodu (pozor na `https` vs `http` a koncové lomítko).

**Uživatel se po přihlášení nevytváří** - ujistěte se, že je `auto_register` zapnuto. Pokud je vypnuto, přihlášení funguje pouze pro existující účty s odpovídající e-mailovou adresou.

**Chyba "invalid_client"** - zkontrolujte správnost Client ID a Client Secret. Ujistěte se, že nejsou žádné mezery na začátku nebo konci.

**Facebook vyžaduje recenzi aplikace** - pro základní přihlášení (e-mail, jméno) není recenze vyžadována. Pokud je aplikace v režimu sandbox, přihlásit se mohou pouze administrátoři a testeři přidaní v panelu Meta.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
