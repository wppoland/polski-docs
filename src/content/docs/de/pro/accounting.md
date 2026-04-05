---
title: Buchhaltungsintegrationen
description: Integrationen mit den Buchhaltungssystemen wFirma, Fakturownia und iFirma in Polski PRO for WooCommerce - Rechnungssynchronisation, Retry-Logik und Konfiguration pro Anbieter.
---

Das Modul verbindet WooCommerce mit polnischen Fakturierungssystemen: wFirma, Fakturownia und iFirma. Rechnungen werden automatisch gesendet, mit Retry bei API-Fehlern.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Dodatkowo wymagane jest aktywne konto w wybranym systemie księgowym z dostępem API.
:::

## Unterstuetzte Systeme

| System | API-Format | API-Version | Authentifizierung |
|--------|-----------|------------|-------------------|
| wFirma | XML | v2 | API key + API secret |
| Fakturownia | JSON | v3 | API token |
| iFirma | JSON | v1 | Login + API key (klucz faktur) |

Es kann jeweils nur eine Buchhaltungsintegration aktiv sein.

## Konfiguration

Gehen Sie zu **WooCommerce > Ustawienia > Polski PRO > Księgowość**.

### Anbieter waehlen

Waehlen Sie das Buchhaltungssystem und geben Sie die Authentifizierungsdaten ein.

#### wFirma

| Einstellung | Beschreibung |
|------------|------|
| API key | API-Schluessel aus dem wFirma-Panel |
| API secret | API-Geheimschluessel |
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
| Rechnungs-API-Schluessel | API-Schluessel zum Ausstellen von Rechnungen |
| Abonnenten-API-Schluessel | Abonnenten-API-Schluessel (zum Abrufen von Daten) |

### Gemeinsame Einstellungen

| Einstellung | Standardwert | Beschreibung |
|------------|------------------|------|
| Automatisches Ausstellen | Ja | Rechnung automatisch nach Bestellbezahlung ausstellen |
| Ausloesender Status | `processing` | Bestellstatus, der die Rechnungserstellung ausloest |
| Dokumenttyp | MwSt.-Rechnung | MwSt.-Rechnung, Proforma-Rechnung, Quittung |
| Zur E-Mail hinzufuegen | Ja | PDF-Rechnung an die Bestell-E-Mail anhaengen |
| Retry bei Fehler | Ja | Bei API-Fehler erneut versuchen |
| Maximale Versuche | 5 | Limit fuer Wiederholungsversuche |

## Rechnungssynchronisation

### Automatischer Ablauf

1. WooCommerce-Bestellung wechselt in den Status `processing` (oder einen anderen konfigurierten)
2. Das Modul sammelt Bestelldaten und mappt sie auf das Anbieterformat
3. Daten werden asynchron an die API des Buchhaltungssystems gesendet
4. Nach erfolgreicher Erstellung wird die Rechnungs-ID in den Bestellmeta gespeichert
5. Die PDF-Rechnung wird heruntergeladen und an die Kunden-E-Mail angehaengt

### Datenmapping

Das Modul mappt WooCommerce-Bestelldaten automatisch auf das erforderliche API-Format:

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

Wenn die API einen Fehler zurueckgibt (HTTP 5xx, Timeout, Verbindungsfehler), plant das Modul automatisch einen erneuten Versuch mit exponentiellem Backoff:

| Versuch | Verzoegerung | Zeit seit erstem Versuch |
|-------|------------|------------------------|
| 1 | Sofort | 0 s |
| 2 | 30 s | 30 s |
| 3 | 2 min | 2 min 30 s |
| 4 | 8 min | 10 min 30 s |
| 5 | 32 min | 42 min 30 s |

Die Verzoegerung wird nach der Formel berechnet: `delay = base_delay * 2^(attempt - 1)`, wobei `base_delay = 30 Sekunden`.

### Fehler ohne Retry

Client-Fehler (HTTP 4xx) werden nicht automatisch wiederholt, da sie auf ein Datenproblem und nicht auf ein API-Problem hinweisen:

- `400 Bad Request` - ungueltige Daten
- `401 Unauthorized` - fehlerhafter API-Token
- `403 Forbidden` - fehlende Berechtigungen
- `422 Unprocessable Entity` - Datenvalidierung

Diese Fehler werden protokolliert und erfordern Eingriff des Administrators.

### Asynchroner Versand

Rechnungen werden asynchron ueber `WC_Action_Scheduler` gesendet, was bedeutet, dass der Bestellvorgang nicht blockiert wird. Der Kunde sieht die Bestellbestaetigung sofort, und die Rechnung wird im Hintergrund generiert.

```php
/**
 * Akcja wywoływana po pomyślnym wystawieniu faktury.
 *
 * @param int    $order_id   ID zamówienia
 * @param string $invoice_id ID faktury w systemie księgowym
 * @param string $provider   Nazwa dostawcy ('wfirma', 'fakturownia', 'ifirma')
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
        '[Polski PRO] Faktura %s wystawiona w %s dla zamówienia #%d',
        $invoice_id,
        $provider,
        $order_id
    ));
}, 10, 3);
```

### Fehler-Hook

```php
/**
 * Akcja wywoływana po wyczerpaniu prób wysłania faktury.
 *
 * @param int    $order_id   ID zamówienia
 * @param string $provider   Nazwa dostawcy
 * @param string $error      Komunikat błędu
 * @param int    $attempts   Liczba wykonanych prób
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
        sprintf('Błąd wystawienia faktury - zamówienie #%d', $order_id),
        sprintf(
            "Nie udało się wystawić faktury w %s po %d próbach.\n\nBłąd: %s\n\nSprawdź zamówienie: %s",
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
 * Filtruje dane faktury przed wysłaniem do API.
 *
 * @param array     $invoice_data Dane faktury w formacie dostawcy
 * @param \WC_Order $order        Zamówienie WooCommerce
 * @param string    $provider     Nazwa dostawcy
 */
apply_filters('polski_pro/accounting/invoice_data', array $invoice_data, \WC_Order $order, string $provider): array;
```

**Beispiel - Anmerkungen zur Rechnung hinzufuegen:**

```php
add_filter('polski_pro/accounting/invoice_data', function (
    array $invoice_data,
    \WC_Order $order,
    string $provider
): array {
    if ($provider === 'fakturownia') {
        $invoice_data['invoice']['description'] = sprintf(
            'Zamówienie internetowe #%s',
            $order->get_order_number()
        );
    }
    return $invoice_data;
}, 10, 3);
```

## Administrationsbereich

### Synchronisationsstatus

Auf der WooCommerce-Bestellliste wird eine Spalte "Rechnung" hinzugefuegt, die Folgendes anzeigt:

- Gruenes Symbol - Rechnung erfolgreich ausgestellt
- Gelbes Symbol - wird gesendet / Retry
- Rotes Symbol - Fehler (klicken fuer Details)
- Graues Symbol - nicht zutreffend (kein automatisches Ausstellen)

### Manuelles Ausstellen

Auf der Bestellbearbeitungsseite kann der Administrator im Panel **Rechnung**:

1. Rechnung manuell ausstellen (wenn das automatische Ausstellen fehlgeschlagen ist)
2. PDF-Rechnung herunterladen
3. Rechnungsversand wiederholen
4. Versuchs- und Fehlerprotokoll anzeigen

## Fehlerbehebung

**Rechnung wird nicht automatisch ausgestellt**
Pruefen Sie, ob der ausloesende Status korrekt ist. Stellen Sie sicher, dass der Action Scheduler funktioniert (WooCommerce > Status > Geplante Aktionen). Pruefen Sie das Fehlerprotokoll unter **WooCommerce > Status > Logs**.

**Fehler "Unauthorized" bei API-Verbindung**
Ueberpruefen Sie die Authentifizierungsdaten. Bei wFirma pruefen Sie, ob API key und secret vom Hauptkonto (nicht Unterkonto) stammen. Bei Fakturownia stellen Sie sicher, dass die Subdomain korrekt ist.

**Doppelte Rechnungen**
Das Modul schuetzt vor Duplikaten durch Pruefung des Meta `_polski_pro_invoice_id` vor dem Ausstellen. Wenn Duplikate auftreten, pruefen Sie, ob ein anderes Plugin denselben Bestell-Hook ausloest.

## Naechste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Verwandt: [PRO REST API](/pro/pro-api)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
