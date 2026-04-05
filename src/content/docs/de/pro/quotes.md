---
title: Angebotsanfragen (RFQ)
description: Modul fuer Angebotsanfragen in Polski PRO for WooCommerce - Ersetzung der Warenkorb-Schaltflaeche durch ein Angebotsformular, Einwilligungsprotokollierung, Administrationsbereich und E-Mail-Benachrichtigungen.
---

Das Modul fuer Angebotsanfragen (Request for Quote) ersetzt die Standard-Schaltflaeche "In den Warenkorb" durch die Schaltflaeche "Preis anfragen" und ermoeglicht Kunden, Angebotsanfragen statt direkter Kaeufe zu stellen. Diese Loesung ist besonders nuetzlich in B2B-Shops, bei Produkten mit individueller Preisgestaltung oder bei grossen Grosshandelsbestellungen.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfiguration

Gehen Sie zu **WooCommerce > Ustawienia > Polski PRO > Zapytania ofertowe** und aktivieren Sie das Modul.

### Grundeinstellungen

| Einstellung | Option in der Datenbank | Standardwert | Beschreibung |
|------------|---------------|------------------|------|
| Modul aktivieren | `polski_quote` | Nein | Aktiviert die Angebotsanfrage-Funktionalitaet |
| Schaltflaechentext | `polski_quote_button_text` | "Zapytaj o cenę" | Text, der auf der Schaltflaeche angezeigt wird |
| Auf Listen anzeigen | `polski_quote_show_on_loops` | Nein | Zeigt die Anfrageschaltflaeche auf Archiv- und Kategorieseiten |
| Anmeldung erforderlich | `polski_quote_require_login` | Nein | Erfordert Anmeldung vor dem Absenden einer Anfrage |
| Einwilligung zur Verarbeitung | `polski_quote_consent` | Ja | Fuegt dem Formular eine DSGVO-Einwilligungscheckbox hinzu |

### Formularfelder

Das Angebotsformular enthaelt standardmaessig:

- **Vor- und Nachname** - erforderlich
- **E-Mail-Adresse** - erforderlich, Formatvalidierung
- **Telefon** - optional
- **Menge** - erforderlich, numerische Validierung
- **Nachricht** - optional, Textarea
- **DSGVO-Einwilligung** - Checkbox, erforderlich wenn aktiviert

## Frontend-Verhalten

### Schaltflaechen-Ersetzung

Nach Aktivierung des Moduls wird die Schaltflaeche "In den Warenkorb" durch die Angebotsschaltflaeche ersetzt. Dies betrifft:

- Einzelne Produktseiten
- Archiv- und Kategorieseiten (wenn die Option `polski_quote_show_on_loops` aktiviert ist)
- Produkt-Widgets und Shortcodes

### Shortcode

Die Angebotsschaltflaeche kann an beliebiger Stelle per Shortcode eingefuegt werden:

```
[polski_quote_button product_id="123" text="Zapytaj o cenę" class="custom-class"]
```

**Parameter:**

| Parameter | Erforderlich | Beschreibung |
|----------|----------|------|
| `product_id` | Nein | Produkt-ID (Standard: aktuelles Produkt) |
| `text` | Nein | Schaltflaechentext |
| `class` | Nein | Zusaetzliche CSS-Klassen |

### Formularversand (AJAX)

Das Formular wird asynchron (AJAX) ohne Seitenneuladen gesendet. Nach dem Absenden sieht der Kunde eine Bestaetigungsmeldung mit der Anfragenummer.

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

**Beispiel - benutzerdefiniertes Feld hinzufuegen:**

```php
add_filter('polski_pro/quote/before_save', function (array $quote_data, int $product_id, $user): array {
    $quote_data['meta']['company_nip'] = sanitize_text_field($_POST['company_nip'] ?? '');
    return $quote_data;
}, 10, 3);
```

## Einwilligungsprotokollierung

Jede Angebotsanfrage speichert Informationen ueber erteilte Einwilligungen:

- Zeitstempel (Timestamp) der Einwilligungserteilung
- IP-Adresse des Kunden (SHA-256-gehasht)
- Einwilligungstext zum Zeitpunkt der Erteilung
- Formularversion

Diese Daten werden in der Tabelle `{prefix}_polski_quote_consents` gespeichert und koennen zu DSGVO-Auditzwecken exportiert werden.

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

## Administrationsbereich

### Anfragenliste

Angebotsanfragen sind im Menue **WooCommerce > Zapytania ofertowe** verfuegbar. Die Liste enthaelt:

- Anfragenummer
- Kundendaten (Name, E-Mail, Telefon)
- Produkt und Menge
- Status (neu, in Bearbeitung, beantwortet, geschlossen)
- Eingangsdatum

### Anfragestatus

| Status | Beschreibung |
|--------|------|
| `new` | Neue Anfrage, unbearbeitet |
| `in_progress` | Angebot wird vorbereitet |
| `replied` | Angebot an den Kunden gesendet |
| `accepted` | Kunde hat das Angebot angenommen |
| `rejected` | Kunde hat das Angebot abgelehnt |
| `closed` | Anfrage geschlossen |

### Anfrage beantworten

Im Administrationsbereich kann der Administrator:

1. Anfragedetails pruefen
2. Interne Notiz hinzufuegen
3. Angebotspreis festlegen
4. Antwort-E-Mail an den Kunden senden
5. Anfrage in eine WooCommerce-Bestellung umwandeln

## E-Mail-Benachrichtigungen

Das Modul registriert folgende E-Mail-Vorlagen in WooCommerce:

| E-Mail | Empfaenger | Ausloeser |
|--------|----------|-----------|
| Neue Angebotsanfrage | Administrator | Einreichung einer Anfrage durch den Kunden |
| Anfragebestaetigung | Kunde | Einreichung einer Anfrage |
| Antwort auf Anfrage | Kunde | Angebotsversand durch den Administrator |
| Statusaenderung der Anfrage | Kunde | Statusaenderung der Anfrage |

E-Mail-Vorlagen koennen im Theme im Verzeichnis `woocommerce/emails/` ueberschrieben werden:

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

**Beispiel - NIP-Feld hinzufuegen:**

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

### Aktion nach dem Absenden

```php
/**
 * Akcja wywoływana po zapisaniu zapytania ofertowego.
 *
 * @param int   $quote_id   ID zapytania
 * @param array $quote_data Dane zapytania
 */
do_action('polski_pro/quote/submitted', int $quote_id, array $quote_data);
```

**Beispiel - Versand an CRM:**

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

**Schaltflaeche "In den Warenkorb" wird weiterhin angezeigt**
Pruefen Sie, ob die Option `polski_quote` aktiviert ist. Leeren Sie den Cache der Cache-Plugins (WP Super Cache, W3 Total Cache, LiteSpeed Cache).

**Formular wird nicht gesendet (AJAX-Fehler)**
Pruefen Sie die Browserkonsole auf JavaScript-Fehler. Stellen Sie sicher, dass das Skript `polski-pro-quote.js` geladen ist. Konflikte mit anderen Plugins koennen AJAX blockieren - deaktivieren Sie andere Plugins, um den Konflikt zu identifizieren.

**E-Mails werden nicht gesendet**
Pruefen Sie die E-Mail-Konfiguration unter **WooCommerce > Ustawienia > E-maile**. Stellen Sie sicher, dass die Polski-PRO-Vorlagen aktiviert sind.

## Naechste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Integration mit Katalogmodus: [B2B-Katalogmodus](/pro/catalog-mode)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
