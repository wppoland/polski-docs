---
title: InPost-Integration (Paczkomaty)
description: Modul fuer die InPost-ShipX-API-Integration in Polski PRO for WooCommerce - Paczkomaty, Etikettengenerierung, Abholpunktkarte und Sendungsverfolgung.
---

Das InPost-Modul integriert WooCommerce mit der ShipX-API von InPost und ermoeglicht die Generierung von Versandetiketten, die Auswahl eines Abholpunkts durch den Kunden auf einer Karte, die Suche nach Paczkomaty-Standorten und die Sendungsverfolgung direkt aus dem Administrationsbereich.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Dodatkowo wymagany jest aktywny token API InPost ShipX (uzyskiwany z panelu managera InPost).
:::

## Konfiguration

Gehen Sie zu **WooCommerce > Ustawienia > Polski PRO > InPost**.

### API-Authentifizierung

| Einstellung | Beschreibung |
|------------|------|
| API-Token | Autorisierungstoken aus dem InPost-Manager-Panel |
| Organisations-ID | Organisationskennung im InPost-System |
| Sandbox-Modus | Verwendet die ShipX-API-Testumgebung |

Der API-Token wird im Header `Authorization: Bearer {token}` an jede ShipX-API-Anfrage uebergeben. Der Token sollte Berechtigungen zum Erstellen von Sendungen und Generieren von Etiketten haben.

### Versandmethoden-Einstellungen

Nach der API-Konfiguration erstellen Sie eine neue Versandmethode:

1. Gehen Sie zu **WooCommerce > Ustawienia > Wysyłka > Strefy wysyłki**
2. Bearbeiten Sie die Zone "Polska"
3. Klicken Sie auf "Versandmethode hinzufuegen"
4. Waehlen Sie "InPost Paczkomat" oder "InPost Kurier"

| Methodeneinstellung | Standardwert | Beschreibung |
|-------------------|------------------|------|
| Methodentitel | "InPost Paczkomat" | Dem Kunden angezeigter Name |
| Kosten | 0 | Versandkosten (0 = kostenlos) |
| Kostenloser Versand ab | "" | Bestellwert, ab dem der Versand kostenlos ist |
| Standard-Paketgroesse | A | Groesse: `A`, `B`, `C` |
| Versicherung | Nein | Versicherung zur Sendung hinzufuegen |

## Abholpunktkarte

### Karten-Widget

Auf der Checkout-Seite wird nach Auswahl der Versandmethode "InPost Paczkomat" ein interaktives Karten-Widget zur Auswahl eines Paczkomat-Standorts angezeigt.

Das Widget bietet:

- **Karte** mit Paczkomat-Pins
- **Suche nach Stadt** - Stadtname eingeben, um die Karte zu zentrieren
- **Suche nach Koordinaten** - automatische Geolokalisierung (mit Benutzereinwilligung)
- **Suche nach Postleitzahl** - naechstgelegene Paczkomaty finden
- **Paczkomat-Liste** - sortiert nach Naehe
- **Punktdetails** - Adresse, Oeffnungszeiten, verfuegbare Fachgroessen

### Suche nach Stadt

Das Widget sendet eine Anfrage an den ShipX-API-Endpunkt:

```
GET /v1/points?type=parcel_locker&city={city}&per_page=25
```

Ergebnisse werden fuer 24 Stunden in WordPress-Transients gecacht, um die Anzahl der API-Anfragen zu minimieren.

### Suche nach Koordinaten

Wenn der Kunde der Geolokalisierung zustimmt:

```
GET /v1/points?type=parcel_locker&relative_point={lat},{lng}&per_page=10
```

### Punkte filtern

```php
/**
 * Filtruje listę punktów odbioru InPost.
 *
 * @param array  $points  Tablica punktów odbioru z API
 * @param string $city    Wyszukiwane miasto
 * @param array  $coords  Współrzędne [lat, lng] lub pusta tablica
 */
apply_filters('polski_pro/inpost/points', array $points, string $city, array $coords): array;
```

**Beispiel - voruebergehend nicht verfuegbare Punkte ausschliessen:**

```php
add_filter('polski_pro/inpost/points', function (array $points, string $city, array $coords): array {
    $excluded_points = ['KRA123', 'WAW456']; // Tymczasowo wyłączone
    return array_filter($points, function (array $point) use ($excluded_points): bool {
        return ! in_array($point['name'], $excluded_points, true);
    });
}, 10, 3);
```

## Etikettengenerierung

### Aus dem Bestellpanel

Auf der Bestellbearbeitungsseite im Panel **InPost** stehen folgende Optionen zur Verfuegung:

1. **Etikett generieren** - erstellt eine Sendung in der ShipX-API und generiert ein PDF-Etikett
2. **Etikett herunterladen** - laedt das generierte Etikett herunter
3. **Etikett drucken** - oeffnet die Druckvorschau

### Massengenerierung

Markieren Sie auf der Bestellliste mehrere Bestellungen und waehlen Sie die Massenaktion "InPost-Etiketten generieren". Etiketten werden asynchron generiert - nach Abschluss erscheint eine Benachrichtigung mit einem Link zum Herunterladen der ZIP-Datei.

### Sendungsdaten

Das Etikett wird basierend auf folgenden Daten generiert:

| Feld | Quelle | Beschreibung |
|------|--------|------|
| Absender | Shop-Einstellungen | Adresse und Firmendaten aus WooCommerce |
| Empfaenger | Bestelldaten | Vorname, Nachname, Telefon, E-Mail |
| Abholpunkt | Kundenauswahl | ID des im Checkout gewaehlten Paczkomat |
| Paketgroesse | Methodeneinstellung | Oder Ueberschreibung in der Bestellung |
| Nachnahmebetrag | COD-Bestellung | Nur fuer Nachnahmebestellungen |

### Hook fuer Etikettengenerierung

```php
/**
 * Filtruje dane przesyłki przed wysłaniem do API ShipX.
 *
 * @param array     $shipment_data Dane przesyłki
 * @param \WC_Order $order         Zamówienie WooCommerce
 */
apply_filters('polski_pro/inpost/shipment_data', array $shipment_data, \WC_Order $order): array;
```

**Beispiel - Bestellreferenz hinzufuegen:**

```php
add_filter('polski_pro/inpost/shipment_data', function (array $shipment_data, \WC_Order $order): array {
    $shipment_data['reference'] = sprintf('ORDER-%s', $order->get_order_number());
    return $shipment_data;
}, 10, 2);
```

## Sendungsverfolgung

### Automatische Verfolgung

Nach der Etikettengenerierung prueft das Modul automatisch den Sendungsstatus alle 2 Stunden (WP-Cron). Status werden auf WooCommerce-Bestellstatus gemappt:

| InPost-Status | WooCommerce-Status | Beschreibung |
|---------------|-------------------|------|
| `created` | `processing` | Sendung erstellt |
| `dispatched_by_sender` | `processing` | Vom Absender versandt |
| `collected_from_sender` | `shipped` | Vom Absender abgeholt |
| `out_for_delivery` | `shipped` | In Zustellung |
| `ready_to_pickup` | `shipped` | Abholbereit im Paczkomat |
| `delivered` | `completed` | Zugestellt / abgeholt |

### Kundenbenachrichtigungen

Der Kunde erhaelt eine E-Mail mit einem Tracking-Link zur InPost-Seite. Der Tracking-Link wird hinzugefuegt zu:

- E-Mail "Bestellung in Bearbeitung"
- Seite "Mein Konto > Bestellungen > Details"
- Bestellnotizen (fuer den Kunden sichtbar)

### Verfolgungs-Hook

```php
/**
 * Akcja wywoływana po aktualizacji statusu przesyłki.
 *
 * @param int      $order_id      ID zamówienia
 * @param string   $tracking_number Numer śledzenia
 * @param string   $old_status    Poprzedni status InPost
 * @param string   $new_status    Nowy status InPost
 */
do_action('polski_pro/inpost/status_updated', int $order_id, string $tracking_number, string $old_status, string $new_status);
```

**Beispiel - SMS-Benachrichtigung bei Abholbereitschaft:**

```php
add_action('polski_pro/inpost/status_updated', function (
    int $order_id,
    string $tracking_number,
    string $old_status,
    string $new_status
): void {
    if ($new_status === 'ready_to_pickup') {
        $order = wc_get_order($order_id);
        $phone = $order->get_billing_phone();
        send_sms($phone, sprintf(
            'Twoja paczka %s czeka w Paczkomacie. Kod odbioru w e-mailu.',
            $tracking_number
        ));
    }
}, 10, 4);
```

## Paketgroessen

| Groesse | Abmessungen (cm) | Max. Gewicht |
|---------|-------------|----------|
| A | 8 x 38 x 64 | 25 kg |
| B | 19 x 38 x 64 | 25 kg |
| C | 41 x 38 x 64 | 25 kg |

Die Paketgroesse kann global, pro Versandmethode oder manuell in der Bestellung festgelegt werden.

## Fehlerbehebung

**Paczkomat-Karte laedt nicht**
Pruefen Sie, ob der API-Token korrekt und aktiv ist. Pruefen Sie die Browserkonsole auf CORS- oder JavaScript-Fehler. Stellen Sie sicher, dass das Skript `polski-pro-inpost-map.js` geladen ist.

**Fehler bei der Etikettengenerierung "Unauthorized"**
Der API-Token ist abgelaufen oder hat keine Berechtigungen zum Erstellen von Sendungen. Generieren Sie einen neuen Token im InPost-Manager-Panel.

**Sendungsstatus aktualisiert sich nicht**
Pruefen Sie, ob WP-Cron korrekt funktioniert. Fuehren Sie manuell aus: `wp cron event run polski_pro_inpost_tracking`.

## Naechste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- ShipX-API-Dokumentation: [https://docs.inpost24.com/](https://docs.inpost24.com/)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
