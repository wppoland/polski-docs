---
title: Verifizierung der E-Mail-Adresse
description: Double-Opt-in bei der Registrierung - Aktivierungslink, Anmeldesperre und Konfiguration der Nachricht in WooCommerce.
---

Double-Opt-in bestätigt, dass die angegebene E-Mail-Adresse tatsächlich der Person gehört, die das Konto erstellt. Das Plugin Polski for WooCommerce sendet einen Aktivierungslink und sperrt die Anmeldung, bis dieser Link angeklickt wird.

## Warum Double-Opt-in nutzen

Das polnische Recht verlangt kein Double-Opt-in, dennoch lohnt es sich, es aus folgenden Gründen zu aktivieren:

- **DSGVO** - du bestätigst die Identität des Inhabers der E-Mail-Adresse
- **Schutz vor Bots** - blockiert gefälschte Konten
- **Qualität der Datenbank** - du hast die Gewissheit, dass die E-Mail-Adressen echt sind
- **Zustellbarkeit** - weniger abgewiesene Nachrichten und Spam-Markierungen
- **Gesetz über elektronische Dienstleistungen** - Bestätigung des Wunsches, den Dienst zu nutzen

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski > Checkout** und konfiguriere den Bereich "E-Mail-Verifizierung".

### Grundeinstellungen

| Einstellung | Standardwert | Beschreibung |
|------------|-----------------|------|
| E-Mail-Verifizierung aktivieren | Nein | Aktiviert den Double-Opt-in-Mechanismus |
| Gültigkeitsdauer des Links | 48 Stunden | Wie lange der Aktivierungslink aktiv ist |
| Automatisches Löschen nicht verifizierter Konten | 7 Tage | Nach wie vielen Tagen nicht verifizierte Konten gelöscht werden |
| Käufe ohne Verifizierung erlauben | Nein | Ob ein nicht verifizierter Benutzer Bestellungen aufgeben kann |

### Erweiterte Einstellungen

| Einstellung | Beschreibung |
|------------|------|
| Weiterleitung nach Aktivierung | URL, zu der der Benutzer nach dem Klick auf den Link weitergeleitet wird |
| Wartesseite | Seite, die nicht verifizierten Benutzern statt des Panels "Mein Konto" angezeigt wird |
| Link erneut senden | Ob der Button "Aktivierungslink erneut senden" angezeigt wird |
| Limit für erneutes Senden | Maximale Anzahl erneuter Sendungen des Links (Schutz vor Missbrauch) |

## Verifizierungsprozess

### Schritt für Schritt

1. Der Kunde registriert ein Konto (über "Mein Konto" oder bei der Bestellung)
2. Das Plugin generiert ein Aktivierungs-Token und speichert es in der Datenbank
3. Eine E-Mail mit dem Aktivierungslink wird an die angegebene Adresse gesendet
4. Das Konto hat den Status "nicht verifiziert" - die Anmeldung ist gesperrt
5. Der Kunde klickt auf den Link in der E-Mail
6. Das Plugin prüft das Token, aktiviert das Konto und meldet den Kunden an
7. Der Kunde gelangt zur Seite "Mein Konto" oder zur gewählten URL

### Registrierung bei der Bestellaufgabe

Wenn die Option "Käufe ohne Verifizierung erlauben" deaktiviert ist:

- die Bestellung wird nicht aufgegeben, bis der Kunde die E-Mail-Adresse verifiziert
- der Kunde sieht eine Meldung mit der Anweisung, sein Postfach zu prüfen

Wenn die Option aktiviert ist:

- die Bestellung wird normal aufgegeben
- das Konto erfordert eine Verifizierung bei der nächsten Anmeldung
- die Aktivierungs-E-Mail wird parallel zur Bestellbestätigung gesendet

## Anmeldesperre

Nicht verifizierte Benutzer können sich nicht anmelden. Sie sehen die Meldung:

> "Dein Konto wurde noch nicht verifiziert. Prüfe dein E-Mail-Postfach und klicke auf den Aktivierungslink. [Link erneut senden]"

### Konfiguration der Sperrmeldung

Die Meldung änderst du in den Plugin-Einstellungen. Verfügbare Variablen:

| Variable | Beschreibung |
|---------|------|
| `{email}` | E-Mail-Adresse des Benutzers |
| `{resend_link}` | Link zum erneuten Senden der Aktivierungs-E-Mail |
| `{expiry}` | Gültigkeitsdauer des Links |

Beispiel für eine benutzerdefinierte Meldung:

```
Das Konto {email} erfordert eine Verifizierung. Klicke auf den Link in der E-Mail, die wir gesendet haben. 
Du hast die Nachricht nicht erhalten? {resend_link}
```

## Konfiguration der E-Mail-Nachricht

### Vorlage der Aktivierungs-E-Mail

Das Plugin fügt einen neuen E-Mail-Typ unter **WooCommerce > Einstellungen > E-Mails > Verifizierung der E-Mail-Adresse** hinzu.

Verfügbare Einstellungen:

| Einstellung | Beschreibung |
|------------|------|
| Aktivieren/Deaktivieren | Aktiviert den Versand der E-Mail |
| Betreff | Betreff der Nachricht (standardmäßig: "Bestätige deine E-Mail-Adresse") |
| Überschrift | Überschrift im E-Mail-Inhalt |
| Inhalt | Zusätzlicher Text über dem Aktivierungslink |
| E-Mail-Typ | HTML oder reiner Text |

### Variablen in der Vorlage

| Variable | Beschreibung |
|---------|------|
| `{site_title}` | Name des Shops |
| `{customer_name}` | Vorname des Kunden |
| `{activation_link}` | Aktivierungslink (vollständige URL) |
| `{activation_button}` | Aktivierungsbutton (HTML) |
| `{expiry_hours}` | Gültigkeitsdauer des Links in Stunden |

### Überschreiben der E-Mail-Vorlage

Um die HTML-Vorlage anzupassen, kopiere die Datei:

```
wp-content/plugins/polski/templates/emails/email-verification.php
```

nach:

```
wp-content/themes/dein-theme/woocommerce/emails/email-verification.php
```

## Programmatische Erweiterungen

### Hook vor der Verifizierung

```php
add_action('polski/email_verification/before_verify', function (int $user_id, string $token): void {
    // Logik vor der Aktivierung des Kontos
    // z. B. Protokollierung eines Ereignisses
    error_log(sprintf('E-Mail-Verifizierung für Benutzer #%d', $user_id));
}, 10, 2);
```

### Hook nach der Verifizierung

```php
add_action('polski/email_verification/verified', function (int $user_id): void {
    // Logik nach der Aktivierung des Kontos
    // z. B. Zuweisung einer Rolle, Senden einer Willkommens-E-Mail
    $user = new WP_User($user_id);
    $user->set_role('customer');
}, 10, 1);
```

### Filter für die Weiterleitungs-URL

```php
add_filter('polski/email_verification/redirect_url', function (string $url, int $user_id): string {
    return wc_get_page_permalink('myaccount') . 'edit-account/';
}, 10, 2);
```

### Filter für die Gültigkeitsdauer des Tokens

```php
add_filter('polski/email_verification/token_expiry', function (int $hours): int {
    return 72; // 72 Stunden statt der standardmäßigen 48
});
```

### Prüfung des Verifizierungsstatus

```php
$is_verified = get_user_meta($user_id, '_polski_email_verified', true);

if ($is_verified !== 'yes') {
    // Konto nicht verifiziert
}
```

## Schutz vor Missbrauch

### Begrenzung des erneuten Sendens

Das Plugin erlaubt es, den Aktivierungslink maximal 5 Mal pro Stunde pro E-Mail-Adresse erneut zu senden. Das Limit änderst du in den Einstellungen.

### Schutz der Tokens

- Tokens werden über `wp_generate_password(32, false)` generiert - kryptografisch sicher
- Jedes Token funktioniert nur einmal
- Tokens laufen nach der eingestellten Zeit ab
- WP-Cron entfernt abgelaufene Tokens automatisch

## Häufige Probleme

### Die Aktivierungs-E-Mail kommt nicht an

1. Prüfe den Spam-/Junk-Ordner
2. Verifiziere die SMTP-Konfiguration (empfohlen: WP Mail SMTP oder ein ähnliches Plugin)
3. Prüfe die E-Mail-Protokolle unter **WooCommerce > Status > Protokolle**
4. Stelle sicher, dass die E-Mail nicht vom Mailserver blockiert wird

### Der Aktivierungslink funktioniert nicht

1. Prüfe, ob der Link nicht abgelaufen ist (standardmäßig 48 Stunden)
2. Verifiziere, ob die Permalinks in WordPress korrekt konfiguriert sind
3. Prüfe, ob ein Sicherheits-Plugin die URL mit dem Token nicht blockiert

### Der Kunde hat die E-Mail verifiziert, kann sich aber nicht anmelden

1. Prüfe, ob das Meta `_polski_email_verified` im Benutzerprofil den Wert `yes` hat
2. Verifiziere, ob ein anderes Plugin die Anmeldung nicht blockiert
3. Prüfe, ob das Konto nicht von einem Antispam als Spam markiert wurde

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), bereitgestellt ohne Gewährleistung.</div>
