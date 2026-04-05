---
title: E-Mail-Adressverifizierung
description: Double-Opt-in bei der Registrierung - Aktivierungslink, Login-Sperre und Nachrichtenkonfiguration in WooCommerce.
---

Double-Opt-in bestaetigt, dass die angegebene E-Mail-Adresse der Person gehoert, die das Konto erstellt. Polski for WooCommerce sendet einen Aktivierungslink und sperrt das Login bis zum Klick auf diesen Link.

## Warum Double-Opt-in verwenden

Double-Opt-in ist nach polnischem Recht nicht vorgeschrieben, wird aber empfohlen wegen:

- **DSGVO** - Identitaetsverifizierung der Person, deren Daten verarbeitet werden
- **Bot-Schutz** - verhindert die Erstellung gefaelschter Konten
- **Kundendatenqualitaet** - garantiert korrekte E-Mail-Adressen
- **E-Mail-Zustellbarkeit** - reduziert das Risiko von Bounces und Spam-Markierungen
- **Konformitaet mit dem Telemediengesetz** - Bestaetigung der Nutzungswilligkeit

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Kasse** und konfigurieren Sie den Abschnitt "E-Mail-Verifizierung".

### Grundeinstellungen

| Einstellung | Standardwert | Beschreibung |
|------------|-----------------|------|
| E-Mail-Verifizierung aktivieren | Nein | Aktiviert den Double-Opt-in-Mechanismus |
| Link-Gueltigkeit | 48 Stunden | Wie lange der Aktivierungslink aktiv ist |
| Nicht-verifizierte automatisch loeschen | 7 Tage | Nach wie vielen Tagen nicht-verifizierte Konten loeschen |
| Kaeufe ohne Verifizierung erlauben | Nein | Ob ein nicht-verifizierter Nutzer Bestellungen aufgeben kann |

### Erweiterte Einstellungen

| Einstellung | Beschreibung |
|------------|------|
| Weiterleitung nach Aktivierung | URL, zu dem der Nutzer nach Klick auf den Link weitergeleitet wird |
| Warteseite | Seite, die statt "Mein Konto" fuer nicht-verifizierte angezeigt wird |
| Link erneut senden | Ob der Button "Aktivierungslink erneut senden" angezeigt wird |
| Limit fuer erneutes Senden | Maximale Anzahl erneuter Link-Sendungen (Missbrauchsschutz) |

## Verifizierungsprozess

### Schritt fuer Schritt

1. Kunde registriert ein Konto in WooCommerce (ueber die Seite "Mein Konto" oder bei der Bestellung)
2. Plugin generiert einen einzigartigen Aktivierungstoken und speichert ihn in der Datenbank
3. E-Mail mit Aktivierungslink wird an die angegebene Adresse gesendet
4. Konto hat den Status "nicht verifiziert" - Login ist gesperrt
5. Kunde klickt auf den Aktivierungslink in der E-Mail
6. Plugin verifiziert den Token, aktiviert das Konto und meldet den Nutzer an
7. Kunde wird zur Seite "Mein Konto" oder konfigurierten URL weitergeleitet

### Registrierung bei der Bestellung

Wenn die Option "Kaeufe ohne Verifizierung erlauben" deaktiviert ist:

- die Bestellung wird nicht aufgegeben, bis der Kunde die E-Mail verifiziert hat
- der Kunde sieht eine Nachricht mit Anweisung, das Postfach zu pruefen

Wenn die Option aktiviert ist:

- die Bestellung wird normal aufgegeben
- das Konto erfordert die Verifizierung beim naechsten Login
- die Aktivierungs-E-Mail wird parallel zur Bestellbestaetigung gesendet

## Login-Sperre

Nicht-verifizierte Nutzer koennen sich nicht einloggen. Beim Login-Versuch sehen sie die Nachricht:

> "Ihr Konto wurde noch nicht verifiziert. Pruefen Sie Ihr E-Mail-Postfach und klicken Sie auf den Aktivierungslink. [Link erneut senden]"

### Sperrnachricht konfigurieren

Die Nachricht kann in den Plugin-Einstellungen angepasst werden. Verfuegbare Variablen:

| Variable | Beschreibung |
|---------|------|
| `{email}` | E-Mail-Adresse des Nutzers |
| `{resend_link}` | Link zum erneuten Senden der Aktivierungs-E-Mail |
| `{expiry}` | Link-Gueltigkeit |

Beispiel einer benutzerdefinierten Nachricht:

```
Das Konto {email} erfordert eine Verifizierung. Klicken Sie auf den Link in der E-Mail, die wir gesendet haben. 
Keine Nachricht erhalten? {resend_link}
```

## Konfiguration der E-Mail-Nachricht

### Aktivierungs-E-Mail-Vorlage

Das Plugin fuegt einen neuen E-Mail-Typ unter **WooCommerce > Einstellungen > E-Mails > E-Mail-Adressverifizierung** hinzu.

Verfuegbare Einstellungen:

| Einstellung | Beschreibung |
|------------|------|
| Aktivieren/Deaktivieren | Aktiviert den E-Mail-Versand |
| Betreff | Nachrichtenbetreff (Standard: "Bestaetigen Sie Ihre E-Mail-Adresse") |
| Kopfzeile | Kopfzeile im E-Mail-Inhalt |
| Inhalt | Zusaetzlicher Text ueber dem Aktivierungslink |
| E-Mail-Typ | HTML oder Klartext |

### Variablen in der Vorlage

| Variable | Beschreibung |
|---------|------|
| `{site_title}` | Shop-Name |
| `{customer_name}` | Kundenname |
| `{activation_link}` | Aktivierungslink (vollstaendige URL) |
| `{activation_button}` | Aktivierungsbutton (HTML) |
| `{expiry_hours}` | Link-Gueltigkeit in Stunden |

### E-Mail-Vorlage ueberschreiben

Um die HTML-Vorlage anzupassen, kopieren Sie die Datei:

```
wp-content/plugins/polski/templates/emails/email-verification.php
```

nach:

```
wp-content/themes/ihr-theme/woocommerce/emails/email-verification.php
```

## Programmatische Erweiterungen

### Hook vor der Verifizierung

```php
add_action('polski/email_verification/before_verify', function (int $user_id, string $token): void {
    // Logik vor der Kontoaktivierung
    // z.B. Ereignisprotokollierung
    error_log(sprintf('E-Mail-Verifizierung fuer Benutzer #%d', $user_id));
}, 10, 2);
```

### Hook nach der Verifizierung

```php
add_action('polski/email_verification/verified', function (int $user_id): void {
    // Logik nach der Kontoaktivierung
    // z.B. Rolle zuweisen, Willkommens-E-Mail senden
    $user = new WP_User($user_id);
    $user->set_role('customer');
}, 10, 1);
```

### Filter fuer Weiterleitungs-URL

```php
add_filter('polski/email_verification/redirect_url', function (string $url, int $user_id): string {
    return wc_get_page_permalink('myaccount') . 'edit-account/';
}, 10, 2);
```

### Filter fuer Token-Gueltigkeit

```php
add_filter('polski/email_verification/token_expiry', function (int $hours): int {
    return 72; // 72 Stunden statt der Standard-48
});
```

### Verifizierungsstatus pruefen

```php
$is_verified = get_user_meta($user_id, '_polski_email_verified', true);

if ($is_verified !== 'yes') {
    // Konto nicht verifiziert
}
```

## Missbrauchsschutz

### Limitierung erneuter Sendungen

Das Plugin begrenzt die Anzahl erneuter Aktivierungslink-Sendungen auf 5 pro Stunde pro E-Mail-Adresse. Das Limit kann in den Einstellungen geaendert werden.

### Token-Schutz

- Token werden mit `wp_generate_password(32, false)` generiert - kryptographisch sicher
- Jeder Token kann nur einmal verwendet werden
- Token laufen nach der konfigurierten Zeit ab
- Abgelaufene Token werden automatisch durch WP-Cron geloescht

## Haeufige Probleme

### Aktivierungs-E-Mail kommt nicht an

1. Pruefen Sie den Spam-/Junk-Ordner
2. Ueberpruefen Sie die SMTP-Konfiguration (empfohlen: WP Mail SMTP oder aehnliches Plugin)
3. Pruefen Sie die E-Mail-Logs unter **WooCommerce > Status > Logs**
4. Stellen Sie sicher, dass die E-Mail nicht vom Mailserver blockiert wird

### Aktivierungslink funktioniert nicht

1. Pruefen Sie, ob der Link nicht abgelaufen ist (Standard 48 Stunden)
2. Ueberpruefen Sie, ob die Permalinks in WordPress korrekt konfiguriert sind
3. Pruefen Sie, ob ein Sicherheits-Plugin die URL mit Token blockiert

### Kunde hat E-Mail verifiziert, kann sich aber nicht einloggen

1. Pruefen Sie, ob das Meta `_polski_email_verified` den Wert `yes` im Nutzerprofil hat
2. Ueberpruefen Sie, ob ein anderes Plugin das Login blockiert
3. Pruefen Sie, ob das Konto nicht von einem Antispam-Plugin als Spam markiert wurde

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
