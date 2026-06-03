---
title: Social Login (Anmeldung über soziale Netzwerke)
description: Social-Login-Modul in Polski for WooCommerce - Anmeldung über Google und Facebook OAuth2 auf der Kontoseite, im Checkout und beim WordPress-Login.
---

Social Login ermöglicht es Kunden, sich über ihr Google- oder Facebook-Konto zu registrieren und anzumelden. Es erübrigt das Erstellen und Merken eines Passworts, beschleunigt den Kaufprozess und erhöht die Zahl der Registrierungen.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie **Social Login**. Konfigurieren Sie anschließend die API-Schlüssel für die gewünschten Anbieter (Google, Facebook oder beide).

## Funktionen

- Anmeldung und Registrierung über Google OAuth2
- Anmeldung und Registrierung über Facebook OAuth2
- Schaltflächen auf der Seite Mein Konto, im Checkout und beim WordPress-Login
- Automatische Registrierung mit der Rolle "Kunde" (customer)
- Verknüpfung von Konten über die E-Mail-Adresse oder die Anbieter-Kennung
- Sichere Verarbeitung von OAuth2-Tokens
- Keine Speicherung von Passwörtern der über Social Login angemeldeten Nutzer

## Einstellungen

Konfiguration unter **WooCommerce > Polski > Shop-Module > Social Login**.

| Einstellung | Standard | Beschreibung |
|---|---|---|
| `google_enabled` | `false` | Anmeldung über Google aktivieren |
| `google_client_id` | - | Client ID aus der Google Cloud Console |
| `google_client_secret` | - | Client Secret aus der Google Cloud Console |
| `facebook_enabled` | `false` | Anmeldung über Facebook aktivieren |
| `facebook_app_id` | - | App ID aus Meta for Developers |
| `facebook_app_secret` | - | App Secret aus Meta for Developers |
| `auto_register` | `true` | Bei der ersten Anmeldung automatisch ein Konto erstellen |

Option in der Datenbank: `polski_social_login`.

## Konfiguration der Anbieter

### Google

1. Gehen Sie zur [Google Cloud Console](https://console.cloud.google.com/)
2. Erstellen Sie ein neues Projekt oder wählen Sie ein bestehendes aus
3. Gehen Sie zu **APIs & Services > Credentials**
4. Klicken Sie auf **Create Credentials > OAuth 2.0 Client ID**
5. Anwendungstyp: **Web application**
6. Fügen Sie die autorisierte Weiterleitungs-URI hinzu: `https://ihrshop.de/?polski_social_login=google_callback`
7. Kopieren Sie **Client ID** und **Client Secret** in die Moduleinstellungen
8. Stellen Sie sicher, dass die **Google+ API** oder **People API** im Projekt aktiviert ist

### Facebook

1. Gehen Sie zu [Meta for Developers](https://developers.facebook.com/)
2. Erstellen Sie eine neue Anwendung vom Typ **Consumer**
3. Gehen Sie in den App-Einstellungen zu **Facebook Login > Settings**
4. Fügen Sie eine gültige OAuth-Weiterleitungs-URI hinzu: `https://ihrshop.de/?polski_social_login=facebook_callback`
5. Kopieren Sie **App ID** und **App Secret** in die Moduleinstellungen
6. Schalten Sie die Anwendung in den Modus **Live** (nicht Sandbox)

## Verknüpfung von Konten

Das Modul verknüpft Benutzerkonten auf folgende Weise:

1. **Über die E-Mail-Adresse** - existiert bereits ein WordPress-Konto mit derselben E-Mail-Adresse, verknüpft das Modul sie automatisch (der Nutzer meldet sich am bestehenden Konto an)
2. **Über die Anbieter-Kennung** - hat sich der Nutzer zuvor über denselben Anbieter angemeldet, erkennt ihn das Modul anhand der gespeicherten Kennung

Die Anbieterdaten werden in der `usermeta` gespeichert:

- `_polski_social_google_id` - Google-Kennung
- `_polski_social_facebook_id` - Facebook-Kennung

## Technische Details

### OAuth2-Ablauf

1. Der Kunde klickt auf die Schaltfläche "Über Google/Facebook anmelden"
2. Weiterleitung zur Autorisierungsseite des Anbieters
3. Der Kunde stimmt der Weitergabe der Daten zu
4. Der Anbieter leitet mit einem Autorisierungscode zurück zum Shop
5. Das Modul tauscht den Code gegen einen Zugriffstoken ein (serverseitig)
6. Das Modul ruft das Nutzerprofil ab (Name, E-Mail, Kennung)
7. Der Nutzer wird angemeldet oder registriert

### Sicherheit

- OAuth2-Tokens werden serverseitig ausgetauscht (niemals im Browser)
- Der Parameter `state` schützt vor CSRF-Angriffen
- Eine WordPress-Nonce wird bei der Initiierung der Anmeldung validiert
- Das Client Secret wird niemals im Frontend-Code offengelegt

### Hooks

```php
// Rolle des neu registrierten Nutzers ändern
add_filter('polski/social_login/default_role', function (): string {
    return 'subscriber'; // Standard: 'customer'
});

// Aktion nach der Registrierung per Social Login ausführen
add_action('polski/social_login/user_registered', function (int $user_id, string $provider): void {
    // Willkommens-E-Mail senden
    wp_mail(
        get_userdata($user_id)->user_email,
        'Witamy w sklepie!',
        'Twoje konto zostało utworzone.'
    );
}, 10, 2);

// Profildaten vor dem Speichern filtern
add_filter('polski/social_login/profile_data', function (array $data, string $provider): array {
    return $data;
}, 10, 2);

// Automatische Registrierung für einen bestimmten Anbieter deaktivieren
add_filter('polski/social_login/auto_register', function (bool $auto, string $provider): bool {
    if ($provider === 'facebook') {
        return false;
    }
    return $auto;
}, 10, 2);
```

### CSS-Klassen

- `.polski-social-login` - Container der Schaltflächen
- `.polski-social-login__button` - Anmeldeschaltfläche
- `.polski-social-login__button--google` - Google-Schaltfläche
- `.polski-social-login__button--facebook` - Facebook-Schaltfläche
- `.polski-social-login__separator` - Trenner "oder"

### Modul-ID

`social_login`

## Fehlerbehebung

**Die Schaltfläche leitet auf eine Fehlerseite des Anbieters weiter** - prüfen Sie, ob die Weiterleitungs-URI in der Anbieter-Konsole exakt der Shop-Adresse entspricht (achten Sie auf `https` vs. `http` und den abschließenden Slash).

**Der Nutzer wird nach der Anmeldung nicht angelegt** - stellen Sie sicher, dass `auto_register` aktiviert ist. Ist es deaktiviert, funktioniert die Anmeldung nur für bestehende Konten mit passender E-Mail-Adresse.

**Fehler "invalid_client"** - prüfen Sie die Richtigkeit von Client ID und Client Secret. Stellen Sie sicher, dass keine zusätzlichen Leerzeichen am Anfang oder Ende stehen.

**Facebook verlangt eine App-Prüfung** - für die grundlegende Anmeldung (E-Mail, Name) ist keine Prüfung erforderlich. Befindet sich die App im Sandbox-Modus, können sich nur Administratoren und im Meta-Panel hinzugefügte Tester anmelden.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
