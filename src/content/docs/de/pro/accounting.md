---
title: Buchhaltungsintegrationen
description: Integrationen mit den Buchhaltungssystemen wFirma, Fakturownia und iFirma in Polski PRO for WooCommerce - Rechnungssynchronisation, Retry-Logik und Konfiguration pro Anbieter.
---

Das Modul verbindet WooCommerce mit polnischen Fakturierungssystemen: wFirma, Fakturownia und iFirma. Rechnungen werden automatisch gesendet, mit erneutem Versuch bei API-Fehlern.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Zusätzlich ist ein aktives Konto im gewählten Buchhaltungssystem mit API-Zugang erforderlich.
:::

## Unterstützte Systeme

| System | API-Format | API-Version | Authentifizierung |
|--------|-----------|------------|-------------------|
| wFirma | XML | v2 | API key + API secret |
| Fakturownia | JSON | v3 | API token |
| iFirma | JSON | v1 | Login + API key (Rechnungsschlüssel) |

Es kann jeweils nur eine Integration aktiv sein.

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski PRO > Buchhaltung**.

### Anbieter wählen

Wählen Sie das Buchhaltungssystem und geben Sie die Anmeldedaten ein.

#### wFirma

| Einstellung | Beschreibung |
|------------|------|
| API key | API-Schlüssel aus dem wFirma-Panel |
| API secret | API-Geheimnis |
| Firmen-ID | Firmenkennung in wFirma |
| Rechnungsserie | Nummerierungsserie (z. B. "FV", "FVS") |

#### Fakturownia

| Einstellung | Beschreibung |
|------------|------|
| Subdomain | Subdomainname (z. B. `mojafirma.fakturownia.pl`) |
| API token | API-Token aus den Kontoeinstellungen |
| Abteilungs-ID | Optional - ID der rechnungsausstellenden Abteilung |
| Rechnungssprache | `pl` oder `en` |

#### iFirma

| Einstellung | Beschreibung |
|------------|------|
| Login | Login zum iFirma-Konto |
| Rechnungs-API-Schlüssel | API-Schlüssel zum Ausstellen von Rechnungen |
| Abonnenten-API-Schlüssel | Abonnenten-API-Schlüssel (zum Abrufen von Daten) |

### Gemeinsame Einstellungen

| Einstellung | Standardwert | Beschreibung |
|------------|------------------|------|
| Automatisches Ausstellen | Ja | Rechnung automatisch nach Bezahlung der Bestellung ausstellen |
| Auslösender Status | `processing` | Bestellstatus, der die Rechnungserstellung auslöst |
| Dokumenttyp | MwSt.-Rechnung | MwSt.-Rechnung, Proforma-Rechnung, Quittung |
| Zur E-Mail hinzufügen | Ja | PDF-Rechnung an die Bestell-E-Mail anhängen |
| Retry bei Fehler | Ja | Bei API-Fehler erneut versuchen |
| Maximale Anzahl Versuche | 5 | Limit für Wiederholungsversuche |

## Rechnungssynchronisation

### Automatischer Ablauf

1. Die WooCommerce-Bestellung wechselt in den Status `processing` (oder einen anderen konfigurierten)
2. Das Modul sammelt Bestelldaten und mappt sie auf das Anbieterformat
3. Die Daten werden asynchron an die API des Buchhaltungssystems gesendet
4. Nach erfolgreicher Erstellung wird die Rechnungs-ID in den Bestell-Metadaten gespeichert
5. Die PDF-Rechnung wird heruntergeladen und an die Kunden-E-Mail angehängt

### Datenmapping

Das Modul rechnet die Bestelldaten automatisch in das API-Format um:

| WooCommerce-Daten | wFirma (XML) | Fakturownia (JSON) | iFirma (JSON) |
|------------------|-------------|-------------------|---------------|
| Firmenname | `<contractor><name>` | `buyer_name` | `Kontrahent.Nazwa` |
| NIP | `<contractor><nip>` | `buyer_tax_no` | `Kontrahent.NIP` |
| Adresse | `<contractor><street>` | `buyer_street` | `Kontrahent.Ulica` |
| Bestellpositionen | `<invoicecontents>` | `positions` | `Pozycje` |
| MwSt.-Satz | `<vat_code>` | `tax` | `StawkaVat` |
| Zahlungsmethode | `<paymentmethod>` | `payment_type` | `SposobZaplaty` |

### XML-Format (wFirma)

```xml
<api>
  <invoices>
    <invoice>
      <contractor>
        <name>Firma Testowa Sp. z o.o.</name>
        <nip>1234567890</nip>
        <street>ul. Testowa 1</street>
        <city>Warszawa</city>
        <zip>00-001</zip>
      </contractor>
      <invoicecontents>
        <invoicecontent>
          <name>Produkt testowy</name>
          <unit>szt.</unit>
          <count>2</count>
          <price>100.00</price>
          <vat_code>23</vat_code>
        </invoicecontent>
      </invoicecontents>
      <paymentmethod>transfer</paymentmethod>
      <paymentdate>2026-04-12</paymentdate>
    </invoice>
  </invoices>
</api>
```

### JSON-Format (Fakturownia)

```json
{
  "invoice": {
    "kind": "vat",
    "number": null,
    "buyer_name": "Firma Testowa Sp. z o.o.",
    "buyer_tax_no": "1234567890",
    "buyer_street": "ul. Testowa 1",
    "buyer_city": "Warszawa",
    "buyer_post_code": "00-001",
    "positions": [
      {
        "name": "Produkt testowy",
        "quantity": 2,
        "total_price_gross": "246.00",
        "tax": "23"
      }
    ],
    "payment_type": "transfer",
    "payment_to": "2026-04-12"
  }
}
```

## Retry-Mechanismus

### Exponentieller Backoff

Bei Serverfehlern (HTTP 5xx, Timeout) wiederholt das Modul den Versuch mit zunehmender Verzögerung:

| Versuch | Verzögerung | Zeit seit dem ersten Versuch |
|-------|------------|------------------------|
| 1 | Sofort | 0 s |
| 2 | 30 s | 30 s |
| 3 | 2 min | 2 min 30 s |
| 4 | 8 min | 10 min 30 s |
| 5 | 32 min | 42 min 30 s |

Die Verzögerung wird nach der Formel berechnet: `delay = base_delay * 2^(attempt - 1)`, wobei `base_delay = 30 Sekunden`.

### Fehler ohne Retry

Client-Fehler (HTTP 4xx) werden nicht wiederholt, da sie auf ein Datenproblem hinweisen:

- `400 Bad Request` - ungültige Daten
- `401 Unauthorized` - fehlerhafter API-Token
- `403 Forbidden` - fehlende Berechtigungen
- `422 Unprocessable Entity` - Datenvalidierung

Diese Fehler erfordern eine manuelle Korrektur.

### Asynchroner Versand

Rechnungen werden im Hintergrund über `WC_Action_Scheduler` gesendet. Der Kunde sieht die Bestellbestätigung sofort, und die Rechnung wird im Hintergrund generiert.

```php
/**
 * Aktion, die nach erfolgreichem Ausstellen einer Rechnung ausgelöst wird.
 *
 * @param int    $order_id   Bestell-ID
 * @param string $invoice_id Rechnungs-ID im Buchhaltungssystem
 * @param string $provider   Anbietername ('wfirma', 'fakturownia', 'ifirma')
 */
do_action('polski_pro/accounting/invoice_created', int $order_id, string $invoice_id, string $provider);
```

**Beispiel - Protokollierung in einem externen System:**

```php
add_action('polski_pro/accounting/invoice_created', function (
    int $order_id,
    string $invoice_id,
    string $provider
): void {
    error_log(sprintf(
        '[Polski PRO] Rechnung %s ausgestellt in %s für Bestellung #%d',
        $invoice_id,
        $provider,
        $order_id
    ));
}, 10, 3);
```

### Fehler-Hook

```php
/**
 * Aktion, die nach Ausschöpfung der Versandversuche ausgelöst wird.
 *
 * @param int    $order_id   Bestell-ID
 * @param string $provider   Anbietername
 * @param string $error      Fehlermeldung
 * @param int    $attempts   Anzahl der durchgeführten Versuche
 */
do_action('polski_pro/accounting/invoice_failed', int $order_id, string $provider, string $error, int $attempts);
```

**Beispiel - Administrator benachrichtigen:**

```php
add_action('polski_pro/accounting/invoice_failed', function (
    int $order_id,
    string $provider,
    string $error,
    int $attempts
): void {
    $admin_email = get_option('admin_email');
    wp_mail(
        $admin_email,
        sprintf('Fehler beim Ausstellen der Rechnung - Bestellung #%d', $order_id),
        sprintf(
            "Die Rechnung konnte in %s nach %d Versuchen nicht ausgestellt werden.\n\nFehler: %s\n\nBestellung prüfen: %s",
            $provider,
            $attempts,
            $error,
            admin_url(sprintf('post.php?post=%d&action=edit', $order_id))
        )
    );
}, 10, 4);
```

## Rechnungsdaten-Filter

```php
/**
 * Filtert die Rechnungsdaten vor dem Senden an die API.
 *
 * @param array     $invoice_data Rechnungsdaten im Anbieterformat
 * @param \WC_Order $order        WooCommerce-Bestellung
 * @param string    $provider     Anbietername
 */
apply_filters('polski_pro/accounting/invoice_data', array $invoice_data, \WC_Order $order, string $provider): array;
```

**Beispiel - Anmerkungen zur Rechnung hinzufügen:**

```php
add_filter('polski_pro/accounting/invoice_data', function (
    array $invoice_data,
    \WC_Order $order,
    string $provider
): array {
    if ($provider === 'fakturownia') {
        $invoice_data['invoice']['description'] = sprintf(
            'Onlinebestellung #%s',
            $order->get_order_number()
        );
    }
    return $invoice_data;
}, 10, 3);
```

## Administrationsbereich

### Synchronisationsstatus

In der Bestellliste zeigt die Spalte "Rechnung" Folgendes an:

- Grünes Symbol - Rechnung erfolgreich ausgestellt
- Gelbes Symbol - wird gesendet / Retry
- Rotes Symbol - Fehler (klicken Sie, um Details anzuzeigen)
- Graues Symbol - nicht zutreffend (kein automatisches Ausstellen)

### Manuelles Ausstellen

Im Panel **Rechnung** auf der Bestellseite kann der Administrator:

1. Rechnung manuell ausstellen (wenn das automatische Ausstellen fehlgeschlagen ist)
2. PDF-Rechnung herunterladen
3. Rechnungsversand wiederholen
4. Versuchs- und Fehlerprotokoll anzeigen

## Fehlerbehebung

**Die Rechnung wird nicht automatisch ausgestellt**
Prüfen Sie, ob der auslösende Status korrekt ist. Stellen Sie sicher, dass der Action Scheduler funktioniert (WooCommerce > Status > Geplante Aktionen). Prüfen Sie das Fehlerprotokoll unter **WooCommerce > Status > Logs**.

**Fehler "Unauthorized" bei der Verbindung zur API**
Überprüfen Sie die Authentifizierungsdaten. Prüfen Sie bei wFirma, ob API key und secret vom Hauptkonto (nicht vom Unterkonto) stammen. Stellen Sie bei Fakturownia sicher, dass die Subdomain korrekt ist.

**Doppelte Rechnungen**
Das Modul prüft vor dem Ausstellen das Meta `_polski_pro_invoice_id`, um Duplikate zu vermeiden. Wenn Duplikate auftreten, prüfen Sie, ob ein anderes Plugin denselben Hook auslöst.

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Verwandt: [PRO REST API](/pro/pro-api)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
