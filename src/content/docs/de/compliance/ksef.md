---
title: KSeF - Nationales E-Rechnungssystem
description: KSeF-Bereitschaft in Polski for WooCommerce - automatische Erkennung von Bestellungen mit Steuernummer, Statusspalte, Entwickler-Hooks und Integration mit Fakturierungssystemen.
---

Das Nationale E-Rechnungssystem (KSeF) ist eine Plattform des Finanzministeriums zur Ausstellung und zum Empfang strukturierter Rechnungen. Polski for WooCommerce bereitet den WooCommerce-Shop auf die KSeF-Integration vor, indem es Bestellungen mit Rechnungspflicht automatisch erkennt, eine Statusspalte im Administrationspanel bereitstellt und Hooks zur Integration mit externen Fakturierungssystemen anbietet.

## Rechtlicher Status von KSeF

KSeF befindet sich derzeit in der Einfuehrungsphase. Das Plugin Polski for WooCommerce stellt keine Rechnungen direkt in KSeF aus, sondern liefert die Infrastruktur, die die Integration mit Systemen erleichtert, die dies tun (z.B. Fakturownia, iFirma, wFirma, InFakt).

Hauptfunktionen des KSeF-Moduls:

1. Automatische Erkennung von Bestellungen mit Steuernummer (NIP)
2. KSeF-Statusspalte in der Bestellliste
3. Hooks zur Integration mit externen Fakturierungssystemen
4. Bestellmetadaten bereit zur Uebergabe an das KSeF-System

## Erkennung von Bestellungen mit NIP

Wenn ein Kunde bei der Bestellung eine Steuernummer (NIP) angibt (das NIP-Feld ist Teil des Checkout-Moduls), fuehrt das System automatisch folgendes aus:

1. Validierung des NIP-Formats (10 Ziffern, Pruefsummencheck)
2. Markierung der Bestellung als rechnungspflichtig
3. Speicherung der Steuernummer in den Bestellmetadaten
4. Optional Abruf der Firmendaten von der GUS/CEIDG-API

### NIP-Validierung

Das Plugin prueft die NIP-Korrektheit auf zwei Ebenen:

- **Format** - 10 Ziffern, korrekte Pruefsumme (Gewichte: 6, 5, 7, 2, 3, 4, 5, 6, 7)
- **Online-Verifizierung** - optionale Pruefung in der VIES-Datenbank (fuer EU-NIPs) oder GUS-API

## KSeF-Statusspalte

In der Bestellliste (**WooCommerce > Bestellungen**) fuegt das Plugin eine Spalte **KSeF** mit Statussymbolen hinzu:

| Symbol | Status | Beschreibung |
|-------|--------|------|
| Grau | Nicht zutreffend | Bestellung ohne NIP, Rechnung nicht erforderlich |
| Blau | Ausstehend | Bestellung mit NIP, Rechnung auszustellen |
| Gruen | Ausgestellt | Rechnung wurde ausgestellt (Status durch Hook gesetzt) |
| Rot | Fehler | Problem bei der Rechnungsausstellung |

Der Status kann gefiltert werden - verwenden Sie den Filter in der Bestellliste, um z.B. nur Bestellungen anzuzeigen, die auf eine Rechnung warten.

### Massenaktionen

In der Bestellliste ist die Massenaktion "Als in KSeF ausgestellt markieren" verfuegbar, mit der der Status mehrerer Bestellungen gleichzeitig aktualisiert werden kann.

## Hooks

### polski/ksef/invoice_ready

Wird aufgerufen, wenn eine Bestellung mit NIP bezahlt und bereit zur Rechnungsausstellung ist. Dies ist der Haupt-Hook fuer die Integration mit externen Fakturierungssystemen.

```php
/**
 * @param int      $order_id   WooCommerce-Bestell-ID.
 * @param WC_Order $order      Bestellungsobjekt.
 * @param string   $nip        Steuernummer des Kunden.
 * @param array    $invoice_data Rechnungsdaten (Firmenname, Adresse, NIP).
 */
add_action('polski/ksef/invoice_ready', function (int $order_id, WC_Order $order, string $nip, array $invoice_data): void {
    // Beispiel: Daten an die Fakturownia-API senden
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

Filter zum programmatischen Festlegen, ob eine Bestellung eine KSeF-Rechnung erfordert.

```php
/**
 * @param bool     $is_required Ob eine KSeF-Rechnung erforderlich ist.
 * @param WC_Order $order       Bestellungsobjekt.
 * @return bool
 */
add_filter('polski/ksef/is_required', function (bool $is_required, WC_Order $order): bool {
    // Beispiel: KSeF-Rechnung fuer Bestellungen ueber 450 PLN verlangen
    if ($order->get_total() > 450) {
        return true;
    }
    
    return $is_required;
}, 10, 2);
```

### Beispiel - automatische Statusaktualisierung nach Integration

```php
/**
 * KSeF-Status nach Antwort vom Fakturierungssystem aktualisieren.
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

## Bestellmetadaten

Das KSeF-Modul speichert folgende Metadaten in der Bestellung:

| Meta-Schluessel | Beschreibung |
|------------|------|
| `_billing_nip` | Steuernummer des Kunden |
| `_billing_company` | Firmenname |
| `_ksef_required` | Ob die Bestellung eine Rechnung erfordert (`yes`/`no`) |
| `_ksef_status` | Rechnungsstatus (`pending`, `issued`, `error`) |
| `_ksef_number` | KSeF-Rechnungsnummer (nach Ausstellung) |
| `_ksef_invoice_id` | Rechnungs-ID im externen System |

## Konfiguration

KSeF-Moduleinstellungen: **WooCommerce > Einstellungen > Polski > KSeF**.

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| KSeF-Modul aktivieren | Aktiviert Erkennung und Tracking | Ja |
| Online-NIP-Validierung | NIP in der GUS/VIES-API pruefen | Nein |
| Auto-Firmendatenabruf | Daten von GUS nach NIP-Eingabe abrufen | Nein |
| Hook-ausloesender Status | Bestellstatus, bei dem `invoice_ready` aufgerufen wird | `processing` |

## Fehlerbehebung

**KSeF-Spalte wird nicht in der Bestellliste angezeigt**
Klicken Sie auf "Ansicht anpassen" und aktivieren Sie die KSeF-Spalte. Stellen Sie sicher, dass das Modul in den Einstellungen aktiviert ist.

**NIP wird nicht in der Bestellung gespeichert**
Pruefen Sie, ob das NIP-Feld im Checkout-Modul aktiviert ist (**WooCommerce > Einstellungen > Polski > Kasse**). Das NIP-Feld muss aktiv sein, damit der Kunde es ausfuellen kann.

**Hook invoice_ready wird nicht aufgerufen**
Pruefen Sie die Einstellung "Hook-ausloesender Status". Standardmaessig wird der Hook bei Aenderung des Bestellstatus auf "In Bearbeitung" aufgerufen. Wenn Sie benutzerdefinierte Status verwenden, aendern Sie diese Option.

## Weitere Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
