---
title: InPost Integration (Paketautomaten)
description: InPost ShipX API Integrationsmodul in Polski PRO for WooCommerce - Paketautomaten, Erstellung von Etiketten, Karte der Abholpunkte und Sendungsverfolgung.
---

Das InPost Modul integriert WooCommerce mit der ShipX API. Erstelle Etiketten, lass Kunden einen Paketautomaten auf der Karte auswaehlen und verfolge Sendungen direkt aus dem Admin-Panel.

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Zusaetzlich wird ein aktives InPost ShipX API-Token benoetigt (erhaeltlich im InPost Manager Panel).
:::

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski PRO > InPost**.

### API Authentifizierung

| Einstellung | Beschreibung |
|------------|------|
| API-Token | Autorisierungstoken aus dem InPost Manager Panel |
| Organisations-ID | Kennung der Organisation im InPost System |
| Sandbox-Modus | Nutzt die Testumgebung der ShipX API |

Das Token wird im Header `Authorization: Bearer {token}` uebertragen. Es muss die Berechtigung zum Erstellen von Sendungen und Etiketten haben.

### Einstellungen der Versandmethode

Nach der Konfiguration der API erstelle eine neue Versandmethode:

1. Gehe zu **WooCommerce > Einstellungen > Versand > Versandzonen**
2. Bearbeite die Zone "Polen"
3. Klicke auf "Versandmethode hinzufuegen"
4. Waehle "InPost Paketautomat" oder "InPost Kurier"

| Einstellung der Methode | Standardwert | Beschreibung |
|-------------------|------------------|------|
| Titel der Methode | "InPost Paketautomat" | Name, der dem Kunden angezeigt wird |
| Kosten | 0 | Versandkosten (0 = kostenlos) |
| Kostenloser Versand ab | "" | Bestellbetrag, ab dem der Versand kostenlos ist |
| Standard-Paketgroesse | A | Groesse: `A`, `B`, `C` |
| Versicherung | Nein | Versicherung zur Sendung hinzufuegen |

## Karte der Abholpunkte

### Karten-Widget

Nach der Auswahl von "InPost Paketautomat" an der Kasse wird ein interaktives Karten-Widget angezeigt.

Das Widget bietet:

- **Karte** mit Pins der Paketautomaten
- **Suche nach Stadt** - gib den Stadtnamen ein, um die Karte zu zentrieren
- **Suche nach Koordinaten** - automatische Geolokalisierung (mit Zustimmung des Nutzers)
- **Suche nach Postleitzahl** - finde die naechstgelegenen Paketautomaten
- **Liste der Paketautomaten** - sortiert vom naechstgelegenen aus
- **Punktdetails** - Adresse, Oeffnungszeiten, verfuegbare Fachgroessen

### Suche nach Stadt

Das Widget sendet eine Anfrage an den ShipX API Endpoint:

```
GET /v1/points?type=parcel_locker&city={city}&per_page=25
```

Die Ergebnisse werden 24 Stunden lang in WordPress Transients zwischengespeichert.

### Suche nach Koordinaten

Wenn der Kunde der Geolokalisierung zustimmt:

```
GET /v1/points?type=parcel_locker&relative_point={lat},{lng}&per_page=10
```

### Filterung der Punkte

```php
/**
 * Filtert die Liste der InPost Abholpunkte.
 *
 * @param array  $points  Array der Abholpunkte aus der API
 * @param string $city    Gesuchte Stadt
 * @param array  $coords  Koordinaten [lat, lng] oder leeres Array
 */
apply_filters('polski_pro/inpost/points', array $points, string $city, array $coords): array;
```

**Beispiel - Ausschluss voruebergehend nicht verfuegbarer Punkte:**

```php
add_filter('polski_pro/inpost/points', function (array $points, string $city, array $coords): array {
    $excluded_points = ['KRA123', 'WAW456']; // Voruebergehend deaktiviert
    return array_filter($points, function (array $point) use ($excluded_points): bool {
        return ! in_array($point['name'], $excluded_points, true);
    });
}, 10, 3);
```

## Erstellung von Etiketten

### Aus dem Bestellpanel

Im Panel **InPost** auf der Bestellseite:

1. **Etikett erstellen** - erstellt die Sendung in der ShipX API und generiert ein PDF-Etikett
2. **Etikett herunterladen** - laedt das erstellte Etikett herunter
3. **Etikett drucken** - oeffnet die Druckvorschau

### Massenerstellung

Markiere mehrere Bestellungen in der Liste und waehle "InPost Etiketten erstellen". Die Etiketten werden im Hintergrund erstellt. Nach Abschluss lade die ZIP-Datei herunter.

### Sendungsdaten

Das Etikett wird erstellt auf Basis von:

| Feld | Quelle | Beschreibung |
|------|--------|------|
| Absender | Shop-Einstellungen | Adresse und Firmendaten aus WooCommerce |
| Empfaenger | Bestelldaten | Vorname, Nachname, Telefon, E-Mail |
| Abholpunkt | Kundenauswahl | ID des an der Kasse gewaehlten Paketautomaten |
| Paketgroesse | Einstellung der Methode | Oder Ueberschreibung in der Bestellung |
| Nachnahmebetrag | COD-Bestellung | Nur bei Nachnahmebestellungen |

### Hook zur Etikettenerstellung

```php
/**
 * Filtert die Sendungsdaten vor dem Senden an die ShipX API.
 *
 * @param array     $shipment_data Sendungsdaten
 * @param \WC_Order $order         WooCommerce Bestellung
 */
apply_filters('polski_pro/inpost/shipment_data', array $shipment_data, \WC_Order $order): array;
```

**Beispiel - Hinzufuegen einer Bestellreferenz:**

```php
add_filter('polski_pro/inpost/shipment_data', function (array $shipment_data, \WC_Order $order): array {
    $shipment_data['reference'] = sprintf('ORDER-%s', $order->get_order_number());
    return $shipment_data;
}, 10, 2);
```

## Sendungsverfolgung

### Automatische Verfolgung

Nach der Erstellung des Etiketts prueft das Modul den Sendungsstatus alle 2 Stunden (WP-Cron). Die Status werden auf WooCommerce-Status abgebildet:

| InPost Status | WooCommerce Status | Beschreibung |
|---------------|-------------------|------|
| `created` | `processing` | Sendung erstellt |
| `dispatched_by_sender` | `processing` | Vom Absender aufgegeben |
| `collected_from_sender` | `shipped` | Vom Absender abgeholt |
| `out_for_delivery` | `shipped` | In Zustellung |
| `ready_to_pickup` | `shipped` | Abholbereit im Paketautomaten |
| `delivered` | `completed` | Zugestellt / abgeholt |

### Kundenbenachrichtigungen

Der Kunde erhaelt eine E-Mail mit einem Tracking-Link auf der InPost Seite. Der Link wird hinzugefuegt zu:

- der E-Mail "Bestellung in Bearbeitung"
- der Seite "Mein Konto > Bestellungen > Details"
- den Bestellnotizen (fuer den Kunden sichtbar)

### Tracking-Hook

```php
/**
 * Aktion, die nach der Aktualisierung des Sendungsstatus ausgeloest wird.
 *
 * @param int      $order_id      Bestell-ID
 * @param string   $tracking_number Sendungsnummer
 * @param string   $old_status    Vorheriger InPost Status
 * @param string   $new_status    Neuer InPost Status
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
            'Dein Paket %s wartet im Paketautomaten. Der Abholcode steht in der E-Mail.',
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

Die Paketgroesse kann global, pro Versandmethode oder manuell in der Bestellung ueberschrieben werden.

## Fehlerbehebung

**Die Karte der Paketautomaten laedt nicht**
Pruefe, ob das API-Token korrekt und aktiv ist. Pruefe die Browser-Konsole auf CORS- oder JavaScript-Fehler. Stelle sicher, dass das Skript `polski-pro-inpost-map.js` geladen ist.

**Fehler bei der Etikettenerstellung "Unauthorized"**
Das API-Token ist abgelaufen oder hat keine Berechtigung zum Erstellen von Sendungen. Erstelle ein neues Token im InPost Manager Panel.

**Der Sendungsstatus aktualisiert sich nicht**
Pruefe, ob WP-Cron korrekt funktioniert. Manuell ausfuehren: `wp cron event run polski_pro_inpost_tracking`.

## Weitere Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- ShipX API Dokumentation: [https://docs.inpost24.com/](https://docs.inpost24.com/)

<div class="disclaimer">Diese Seite dient ausschliesslich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
