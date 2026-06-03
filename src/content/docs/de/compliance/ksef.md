---
title: KSeF - Nationales E-Rechnungssystem
description: KSeF-Bereitschaft in Polski for WooCommerce - automatische Erkennung von Bestellungen mit NIP, Statusspalte, Entwickler-Hooks und Integration mit Rechnungssystemen.
---

KSeF ist die Plattform des polnischen Finanzministeriums für strukturierte Rechnungen. Das Plugin bereitet den Shop auf die Integration mit KSeF vor, es erkennt Bestellungen, die eine MwSt-Rechnung erfordern, fügt eine Statusspalte hinzu und bietet Hooks zur Anbindung an Rechnungssysteme.

## Rechtlicher Stand von KSeF

KSeF befindet sich in der Einführungsphase. Das Plugin stellt keine Rechnungen in KSeF aus, erleichtert aber die Integration mit Systemen, die dies tun (z. B. Fakturownia, iFirma, wFirma, InFakt).

Hauptfunktionen des KSeF-Moduls:

1. Automatische Erkennung von Bestellungen mit einer NIP-Nummer
2. KSeF-Statusspalte in der Bestellliste
3. Hooks zur Integration mit externen Rechnungssystemen
4. Bestell-Metadaten bereit zur Übergabe an das KSeF-System

## Erkennung von Bestellungen mit NIP

Wenn ein Kunde bei der Bestellung eine NIP angibt (das NIP-Feld ist Teil des Checkout-Moduls), führt das Plugin automatisch Folgendes aus:

1. Validiert das NIP-Format (10 Ziffern, Prüfsummenkontrolle)
2. Markiert die Bestellung als MwSt-Rechnung erfordernd
3. Speichert die NIP in den Bestell-Metadaten
4. Ruft optional die Firmendaten über die API von GUS/CEIDG ab

### NIP-Validierung

Das Plugin prüft die Korrektheit der NIP auf zwei Ebenen:

- **Format** - 10 Ziffern, korrekte Prüfsumme (Gewichte: 6, 5, 7, 2, 3, 4, 5, 6, 7)
- **Online-Verifizierung** - optionale Prüfung in der VIES-Datenbank (für EU-NIPs) oder über die GUS-API

## KSeF-Statusspalte

In der Bestellliste (**WooCommerce > Bestellungen**) erscheint eine Spalte **KSeF** mit Status-Symbolen:

| Symbol | Status | Beschreibung |
|-------|--------|------|
| Grau | Nicht zutreffend | Bestellung ohne NIP, keine Rechnung erforderlich |
| Blau | Ausstehend | Bestellung mit NIP, Rechnung auszustellen |
| Grün | Ausgestellt | Rechnung wurde ausgestellt (Status per Hook gesetzt) |
| Rot | Fehler | Bei der Rechnungsausstellung ist ein Problem aufgetreten |

Sie können Bestellungen nach KSeF-Status filtern, z. B. nur die anzeigen, die auf eine Rechnung warten.

### Massenaktionen

In der Bestellliste können Sie mehrere Bestellungen massenweise als "in KSeF ausgestellt" markieren.

## Hooks

### polski/ksef/invoice_ready

Wird aufgerufen, wenn eine Bestellung mit NIP bezahlt und bereit zur Rechnungsausstellung ist. Der Haupt-Hook zur Integration mit Rechnungssystemen.

```php
/**
 * @param int      $order_id   ID der WooCommerce-Bestellung.
 * @param WC_Order $order      Bestellobjekt.
 * @param string   $nip        NIP-Nummer des Kunden.
 * @param array    $invoice_data Rechnungsdaten (Firmenname, Adresse, NIP).
 */
add_action('polski/ksef/invoice_ready', function (int $order_id, WC_Order $order, string $nip, array $invoice_data): void {
    // Beispiel: Daten an die API von Fakturownia senden
    $api_token = get_option('fakturownia_api_token');
    $account = get_option('fakturownia_account');
    
    $invoice_payload = [
        'invoice' => [
            'kind'             => 'vat',
            'number'           => null, // Auto-Nummerierung
            'sell_date'        => $order->get_date_paid()->format('Y-m-d'),
            'issue_date'       => current_time('Y-m-d'),
            'payment_type'     => 'transfer',
            'seller_name'      => get_option('woocommerce_store_name'),
            'buyer_name'       => $invoice_data['company_name'],
            'buyer_tax_no'     => $nip,
            'buyer_street'     => $invoice_data['address'],
            'buyer_city'       => $invoice_data['city'],
            'buyer_post_code'  => $invoice_data['postcode'],
            'positions'        => [],
        ],
    ];
    
    foreach ($order->get_items() as $item) {
        $invoice_payload['invoice']['positions'][] = [
            'name'       => $item->get_name(),
            'quantity'   => $item->get_quantity(),
            'total_price_gross' => $item->get_total() + $item->get_total_tax(),
            'tax'        => round(($item->get_total_tax() / $item->get_total()) * 100),
        ];
    }
    
    $response = wp_remote_post("https://{$account}.fakturownia.pl/invoices.json", [
        'body'    => wp_json_encode($invoice_payload),
        'headers' => [
            'Content-Type' => 'application/json',
            'Authorization' => 'Token token=' . $api_token,
        ],
    ]);
    
    if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 201) {
        $body = json_decode(wp_remote_retrieve_body($response), true);
        update_post_meta($order_id, '_ksef_status', 'issued');
        update_post_meta($order_id, '_ksef_invoice_id', $body['id'] ?? '');
    } else {
        update_post_meta($order_id, '_ksef_status', 'error');
    }
}, 10, 4);
```

### polski/ksef/is_required

Filter, mit dem sich programmatisch festlegen lässt, ob eine Bestellung eine KSeF-Rechnung erfordert.

```php
/**
 * @param bool     $is_required Ob eine KSeF-Rechnung erforderlich ist.
 * @param WC_Order $order       Bestellobjekt.
 * @return bool
 */
add_filter('polski/ksef/is_required', function (bool $is_required, WC_Order $order): bool {
    // Beispiel: KSeF-Rechnung für Bestellungen über 450 PLN verlangen
    if ($order->get_total() > 450) {
        return true;
    }
    
    return $is_required;
}, 10, 2);
```

### Beispiel - automatisches Setzen des Status nach der Integration

```php
/**
 * KSeF-Status nach Erhalt der Antwort vom Rechnungssystem aktualisieren.
 */
add_action('my_invoicing/invoice_created', function (int $order_id, string $ksef_number): void {
    $order = wc_get_order($order_id);
    if (!$order) {
        return;
    }
    
    $order->update_meta_data('_ksef_status', 'issued');
    $order->update_meta_data('_ksef_number', $ksef_number);
    $order->add_order_note(
        sprintf('Rechnung in KSeF ausgestellt. KSeF-Nummer: %s', $ksef_number)
    );
    $order->save();
}, 10, 2);
```

## Bestell-Metadaten

Das KSeF-Modul speichert folgende Metadaten in der Bestellung:

| Meta-Schlüssel | Beschreibung |
|------------|------|
| `_billing_nip` | NIP-Nummer des Kunden |
| `_billing_company` | Firmenname |
| `_ksef_required` | Ob die Bestellung eine Rechnung erfordert (`yes`/`no`) |
| `_ksef_status` | Rechnungsstatus (`pending`, `issued`, `error`) |
| `_ksef_number` | KSeF-Nummer der Rechnung (nach Ausstellung) |
| `_ksef_invoice_id` | ID der Rechnung im externen System |

## Konfiguration

Einstellungen des KSeF-Moduls: **WooCommerce > Einstellungen > Polski > KSeF**.

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| KSeF-Modul aktivieren | Aktiviert Erkennung und Verfolgung | Ja |
| NIP-Online-Validierung | NIP über GUS/VIES-API prüfen | Nein |
| Automatischer Abruf der Firmendaten | Daten von GUS nach NIP-Eingabe abrufen | Nein |
| Status, der den Hook auslöst | Bestellstatus, bei dem `invoice_ready` aufgerufen wird | `processing` |

## Fehlerbehebung

**Die KSeF-Spalte wird nicht in der Bestellliste angezeigt**
Klicken Sie auf "Optionen anzeigen" und markieren Sie die Spalte KSeF. Stellen Sie sicher, dass das Modul in den Einstellungen aktiviert ist.

**Die NIP wird nicht in der Bestellung gespeichert**
Prüfen Sie, ob das NIP-Feld unter **WooCommerce > Einstellungen > Polski > Kasse** aktiviert ist. Das Feld muss aktiv sein, damit der Kunde es ausfüllen kann.

**Der Hook invoice_ready wird nicht aufgerufen**
Prüfen Sie den "Status, der den Hook auslöst". Standardmäßig funktioniert der Hook beim Status "In Bearbeitung". Bei benutzerdefinierten Status ändern Sie diese Option.

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
