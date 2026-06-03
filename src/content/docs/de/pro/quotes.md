---
title: Angebotsanfragen (RFQ)
description: Modul für Angebotsanfragen von Polski PRO for WooCommerce - Ersetzen des Warenkorb-Buttons durch ein Angebotsformular, Protokollierung von Einwilligungen, Verwaltungspanel und E-Mail-Benachrichtigungen.
---

Das Modul für Angebotsanfragen (RFQ) ersetzt den Button "In den Warenkorb" durch "Preis anfragen". Kunden stellen Anfragen, anstatt direkt zu kaufen. Nützlich in B2B-Shops und bei Produkten mit individueller Preisgestaltung.

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski PRO > Angebotsanfragen** und aktivieren Sie das Modul.

### Grundeinstellungen

| Einstellung | Option in der Datenbank | Standardwert | Beschreibung |
|------------|---------------|------------------|------|
| Modul aktivieren | `polski_quote` | Nein | Aktiviert die Funktion der Angebotsanfragen |
| Button-Text | `polski_quote_button_text` | "Preis anfragen" | Auf dem Button angezeigter Text |
| Auf Listen anzeigen | `polski_quote_show_on_loops` | Nein | Zeigt den Anfrage-Button auf Archiv- und Kategorieseiten an |
| Anmeldung erforderlich | `polski_quote_require_login` | Nein | Erfordert die Anmeldung vor dem Absenden einer Anfrage |
| Einwilligung zur Verarbeitung | `polski_quote_consent` | Ja | Fügt dem Formular eine DSGVO-Einwilligungs-Checkbox hinzu |

### Formularfelder

Das Formular der Angebotsanfrage enthält standardmäßig:

- **Vor- und Nachname** - erforderlich
- **E-Mail-Adresse** - erforderlich, Formatvalidierung
- **Telefon** - optional
- **Menge** - erforderlich, numerische Validierung
- **Nachricht** - optional, textarea
- **DSGVO-Einwilligung** - Checkbox, erforderlich, wenn aktiviert

## Verhalten im Frontend

### Ersetzen des Buttons

Nach der Aktivierung ersetzt das Modul den Button "In den Warenkorb" durch den Anfrage-Button. Das betrifft:

- die Einzelproduktseite
- Archiv- und Kategorieseiten (wenn die Option `polski_quote_show_on_loops` aktiviert ist)
- Produkt-Widgets und -Shortcodes

### Shortcode

Platzieren Sie den Anfrage-Button per Shortcode an beliebiger Stelle:

```
[polski_quote_button product_id="123" text="Zapytaj o cenę" class="custom-class"]
```

**Parameter:**

| Parameter | Erforderlich | Beschreibung |
|----------|----------|------|
| `product_id` | Nein | Produkt-ID (standardmäßig das aktuelle Produkt) |
| `text` | Nein | Button-Text |
| `class` | Nein | Zusätzliche CSS-Klassen |

### Formularversand (AJAX)

Das Formular wird per AJAX gesendet, ohne Neuladen der Seite. Der Kunde sieht eine Bestätigung mit der Anfragenummer.

```php
/**
 * Filtruje dane zapytania ofertowego przed zapisem.
 *
 * @param array    $quote_data Dane zapytania
 * @param int      $product_id ID produktu
 * @param \WP_User $user       Obiekt zalogowanego użytkownika lub pusty
 */
apply_filters('polski_pro/quote/before_save', array $quote_data, int $product_id, $user): array;
```

**Beispiel - benutzerdefiniertes Feld hinzufügen:**

```php
add_filter('polski_pro/quote/before_save', function (array $quote_data, int $product_id, $user): array {
    $quote_data['meta']['company_nip'] = sanitize_text_field($_POST['company_nip'] ?? '');
    return $quote_data;
}, 10, 3);
```

## Protokollierung von Einwilligungen

Jede Anfrage speichert Daten über die erteilten Einwilligungen:

- Zeitstempel (Timestamp) der Einwilligung
- IP-Adresse des Kunden (gehasht, SHA-256)
- Inhalt der Einwilligung zum Zeitpunkt der Erteilung
- Version des Formulars

Die Daten landen in der Tabelle `{prefix}_polski_quote_consents` und können für ein DSGVO-Audit exportiert werden.

```php
/**
 * Akcja wywoływana po zapisaniu zgody.
 *
 * @param int    $quote_id   ID zapytania ofertowego
 * @param array  $consent    Dane zgody
 * @param string $ip_hash    Zahashowany adres IP
 */
do_action('polski_pro/quote/consent_logged', int $quote_id, array $consent, string $ip_hash);
```

## Verwaltungspanel

### Liste der Anfragen

Gehen Sie zu **WooCommerce > Angebotsanfragen**. Die Liste enthält:

- Anfragenummer
- Kundendaten (Name, E-Mail, Telefon)
- Produkt und Menge
- Status (neu, in Bearbeitung, beantwortet, geschlossen)
- Einreichungsdatum

### Anfragestatus

| Status | Beschreibung |
|--------|------|
| `new` | Neue Anfrage, nicht bearbeitet |
| `in_progress` | Angebot wird vorbereitet |
| `replied` | Angebot an den Kunden gesendet |
| `accepted` | Kunde hat das Angebot angenommen |
| `rejected` | Kunde hat das Angebot abgelehnt |
| `closed` | Anfrage geschlossen |

### Auf eine Anfrage antworten

Der Administrator kann:

1. die Anfragedetails einsehen
2. eine interne Notiz hinzufügen
3. einen Angebotspreis festlegen
4. eine E-Mail-Antwort an den Kunden senden
5. die Anfrage in eine WooCommerce-Bestellung umwandeln

## E-Mail-Benachrichtigungen

E-Mail-Vorlagen des Moduls:

| E-Mail | Empfänger | Auslöser |
|--------|----------|-----------|
| Neue Angebotsanfrage | Administrator | Einreichung einer Anfrage durch den Kunden |
| Anfragebestätigung | Kunde | Einreichung der Anfrage |
| Antwort auf die Anfrage | Kunde | Versand des Angebots durch den Administrator |
| Statusänderung der Anfrage | Kunde | Statusänderung der Anfrage |

Die E-Mail-Vorlagen lassen sich im Theme im Verzeichnis `woocommerce/emails/` überschreiben:

- `polski-pro-quote-new.php`
- `polski-pro-quote-confirmation.php`
- `polski-pro-quote-reply.php`
- `polski-pro-quote-status.php`

## Hooks

### Formularfilter

```php
/**
 * Filtruje pola formularza zapytania ofertowego.
 *
 * @param array $fields Tablica pól formularza
 * @param int   $product_id ID produktu
 */
apply_filters('polski_pro/quote/form_fields', array $fields, int $product_id): array;
```

**Beispiel - NIP-Feld hinzufügen:**

```php
add_filter('polski_pro/quote/form_fields', function (array $fields, int $product_id): array {
    $fields['company_nip'] = [
        'type'     => 'text',
        'label'    => 'NIP firmy',
        'required' => false,
        'priority' => 35,
    ];
    return $fields;
}, 10, 2);
```

### Aktion nach dem Versand

```php
/**
 * Akcja wywoływana po zapisaniu zapytania ofertowego.
 *
 * @param int   $quote_id   ID zapytania
 * @param array $quote_data Dane zapytania
 */
do_action('polski_pro/quote/submitted', int $quote_id, array $quote_data);
```

**Beispiel - Versand an ein CRM:**

```php
add_action('polski_pro/quote/submitted', function (int $quote_id, array $quote_data): void {
    $crm_api = new MyCrmApi();
    $crm_api->create_lead([
        'name'    => $quote_data['name'],
        'email'   => $quote_data['email'],
        'product' => $quote_data['product_name'],
        'qty'     => $quote_data['quantity'],
    ]);
}, 10, 2);
```

## Fehlerbehebung

**Der Button "In den Warenkorb" wird weiterhin angezeigt**
Prüfen Sie, ob die Option `polski_quote` aktiviert ist. Leeren Sie den Cache von Cache-Plugins (WP Super Cache, W3 Total Cache, LiteSpeed Cache).

**Das Formular wird nicht gesendet (AJAX-Fehler)**
Prüfen Sie die Browser-Konsole auf JavaScript-Fehler. Stellen Sie sicher, dass das Skript `polski-pro-quote.js` geladen ist. Konflikte mit anderen Plugins können AJAX blockieren, deaktivieren Sie die übrigen Plugins, um den Konflikt zu identifizieren.

**E-Mails werden nicht versendet**
Prüfen Sie die E-Mail-Konfiguration unter **WooCommerce > Einstellungen > E-Mails**. Stellen Sie sicher, dass die Polski-PRO-Vorlagen aktiviert sind.

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Integration mit dem Katalogmodus: [Katalogmodus B2B](/pro/catalog-mode)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
