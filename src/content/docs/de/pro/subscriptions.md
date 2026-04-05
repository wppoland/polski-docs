---
title: Abonnements
description: Dokumentation des Abonnementmoduls von Polski PRO for WooCommerce - wiederkehrende Produkte, Verlaengerungen, E-Mail-Erinnerungen, Cron und Mein-Konto-Bereich.
---

Das Modul fuegt Produkte mit wiederkehrender Zahlung hinzu. Kunden kaufen Abonnements mit manueller Verlaengerung, der Administrator verwaltet sie in WooCommerce.

## So funktioniert es

1. Der Administrator erstellt ein Produkt vom Typ "Abonnement" mit Zyklus und Preis
2. Der Kunde kauft ein Abonnement und bezahlt die erste Bestellung
3. Das Plugin erstellt ein Abonnement mit dem Status "Aktiv"
4. Vor dem Verlaengerungsdatum erhaelt der Kunde eine Erinnerungs-E-Mail
5. Am Verlaengerungstag erstellt das Plugin eine Verlaengerungsbestellung
6. Der Kunde bezahlt die Verlaengerungsbestellung (manuelle Verlaengerung)
7. Der Zyklus wiederholt sich bis zur Kuendigung des Abonnements

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > PRO-Module > Abonnements**.

Das Modul wird ueber die Option gesteuert:

```
polski_subscriptions
```

### Allgemeine Einstellungen

| Einstellung | Beschreibung |
|------------|------|
| Abonnements aktivieren | Aktiviert das Modul |
| Verlaengerungsmodus | Manuell (Kunde bezahlt die Bestellung) |
| Erinnerungstage | Wie viele Tage vor der Verlaengerung eine Erinnerung gesendet wird (Standard 3) |
| Karenzzeit | Wie viele Tage nach dem Verlaengerungstermin das Abonnement aktiv bleibt (Standard 7) |
| Automatische Aussetzung | Abonnement nach Ablauf der Karenzzeit aussetzen |

### Abonnementprodukt erstellen

1. Gehen Sie zu **Produkte > Neu hinzufuegen**
2. Waehlen Sie den Produkttyp: **Abonnement**
3. Konfigurieren Sie Preis und Zyklus:

| Feld | Beschreibung |
|------|------|
| Abonnementpreis | Betrag pro Abrechnungszeitraum |
| Abrechnungszeitraum | Tag / Woche / Monat / Jahr |
| Zeitraumlaenge | Anzahl der Zeitraeume (z. B. 1 Monat, 3 Monate) |
| Anfangspreis | Optional - anderer Preis fuer den ersten Zeitraum |
| Aktivierungsgebuehr | Optional - einmalige Gebuehr bei der ersten Bestellung |
| Verlaengerungslimit | 0 = unbegrenzt, oder Anzahl der Verlaengerungen |

4. Veroeffentlichen Sie das Produkt

### Anfangspreis vs. Verlaengerungspreis

Das Plugin unterstuetzt Szenarien, in denen der Preis fuer den ersten Zeitraum vom Preis fuer die folgenden Zeitraeume abweicht. Typische Anwendungsfaelle:

- kostenloser oder ermaessigter Testzeitraum
- Aktionspreis zum Start
- Aktivierungsgebuehr + niedrigerer wiederkehrender Preis

Der Anfangspreis wird nur fuer die erste Bestellung angewendet. Folgende Verlaengerungsbestellungen verwenden den Standard-Abonnementpreis.

## Lebenszyklus des Abonnements

```
Pending → Active → On Hold → Active → ...
                  → Expired
                  → Cancelled
```

| Status | Beschreibung |
|--------|------|
| Pending | Wartet auf Bezahlung der ersten Bestellung |
| Active | Aktiv - Kunde hat Zugang zum Produkt |
| On Hold | Ausgesetzt - Verlaengerungsbestellung wartet auf Bezahlung |
| Expired | Abgelaufen - Verlaengerungslimit erreicht oder Karenzzeit ueberschritten |
| Cancelled | Gekuendigt durch Kunde oder Administrator |

## Verlaengerungen

### Manuelle Verlaengerung

In der aktuellen Version unterstuetzt das Plugin manuelle Verlaengerungen. Das bedeutet:

1. Das Plugin erstellt eine Verlaengerungsbestellung mit dem Status "Warten auf Zahlung"
2. Der Kunde erhaelt eine E-Mail mit einem Link zur Bezahlung der Bestellung
3. Der Kunde bezahlt die Bestellung mit der gewaehlten Zahlungsmethode
4. Nach der Bezahlung wird das Abonnement fuer den naechsten Zeitraum verlaengert

### Verlaengerungsprozess

Das Plugin prueft Abonnements zur Verlaengerung taeglich mittels WP-Cron:

```
polski_daily_maintenance
```

Die Cron-Aufgabe wird einmal taeglich ausgefuehrt und fuehrt Folgendes durch:

- Pruefung der Abonnements, deren Verlaengerungsdatum auf heute oder frueher faellt
- Erstellung von Verlaengerungsbestellungen fuer Abonnements, die eine Verlaengerung benoetigen
- Aussetzung von Abonnements, die die Karenzzeit ueberschritten haben
- Auslaufen von Abonnements, die das Verlaengerungslimit erreicht haben

### E-Mail-Erinnerungen

Das Plugin sendet E-Mail-Erinnerungen vor dem Verlaengerungsdatum:

| E-Mail | Zeitpunkt | Inhalt |
|--------|-------|-------|
| Verlaengerungserinnerung | X Tage vor der Verlaengerung | Information ueber die bevorstehende Verlaengerung, Betrag, Link zum Panel |
| Verlaengerungsbestellung | Am Verlaengerungstag | Bestellung zur Bezahlung mit Zahlungslink |
| Abonnement ausgesetzt | Nach Ablauf der Zahlungsfrist | Information ueber die Aussetzung, Zahlungslink |
| Abonnement abgelaufen | Nach Ablauf der Karenzzeit | Information ueber den Ablauf, Link zum erneuten Kauf |

E-Mail-Vorlagen koennen unter **WooCommerce > Einstellungen > E-Mails** angepasst werden.

## Mein-Konto-Bereich

Das Modul fuegt den Endpunkt `/polski-subscriptions` zum Mein-Konto-Bereich des Kunden hinzu. Der Endpunkt ist unter folgender Adresse erreichbar:

```
/moje-konto/polski-subscriptions/
```

### Abonnementliste

Der Kunde sieht eine Tabelle mit Abonnements:

| Spalte | Beschreibung |
|---------|------|
| Produkt | Name des Abonnementprodukts |
| Status | Aktueller Abonnementstatus |
| Preis | Betrag pro Zeitraum |
| Naechste Verlaengerung | Datum der naechsten Verlaengerung |
| Aktionen | Kuendigen / Verlaengerung bezahlen |

### Abonnementdetails

Nach Klick auf ein Abonnement sieht der Kunde:

- vollstaendige Abonnementdaten (Produkt, Preis, Zyklus, Daten)
- Verlaengerungshistorie (Liste verknuepfter Bestellungen)
- Schaltflaeche zur Kuendigung des Abonnements
- Schaltflaeche zur Bezahlung einer ausstehenden Verlaengerung (falls zutreffend)

### Abonnement kuendigen

Der Kunde kann ein aktives Abonnement aus dem Mein-Konto-Bereich kuendigen. Die Kuendigung:

- aendert den Abonnementstatus auf "Cancelled"
- das Abonnement bleibt bis zum Ende des aktuellen bezahlten Zeitraums aktiv
- der Kunde wird ueber das Enddatum des Zugangs informiert

## Hooks

### `polski_pro/subscription/status_changed`

Aktion, die nach Aenderung des Abonnementstatus ausgefuehrt wird.

```php
/**
 * @param int    $subscription_id ID subskrypcji
 * @param string $new_status      Nowy status
 * @param string $old_status      Poprzedni status
 */
do_action('polski_pro/subscription/status_changed', int $subscription_id, string $new_status, string $old_status);
```

**Beispiel:**

```php
add_action('polski_pro/subscription/status_changed', function (int $subscription_id, string $new_status, string $old_status): void {
    if ($new_status === 'cancelled') {
        $subscription = polski_pro_get_subscription($subscription_id);
        // Wysłanie ankiety o powód rezygnacji
        wp_mail(
            $subscription->get_customer_email(),
            'Szkoda, że odchodzisz',
            'Powiedz nam, dlaczego anulujesz subskrypcję: https://example.com/ankieta'
        );
    }
}, 10, 3);
```

### `polski_pro/subscription/renewal_created`

Aktion, die nach Erstellung einer Verlaengerungsbestellung ausgefuehrt wird.

```php
/**
 * @param int $order_id        ID zamówienia odnowienia
 * @param int $subscription_id ID subskrypcji
 */
do_action('polski_pro/subscription/renewal_created', int $order_id, int $subscription_id);
```

**Beispiel:**

```php
add_action('polski_pro/subscription/renewal_created', function (int $order_id, int $subscription_id): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Zamówienie odnowienia dla subskrypcji #%d', $subscription_id)
    );
}, 10, 2);
```

### `polski_pro/subscription/renewal_paid`

Aktion, die nach Bezahlung einer Verlaengerungsbestellung ausgefuehrt wird.

```php
/**
 * @param int $order_id        ID zamówienia odnowienia
 * @param int $subscription_id ID subskrypcji
 */
do_action('polski_pro/subscription/renewal_paid', int $order_id, int $subscription_id);
```

## Administrationsbereich

### Abonnementliste

Gehen Sie zu **WooCommerce > Abonnements**. Die Tabelle enthaelt:

- Abonnement-ID
- Kunde (Vorname, Nachname, E-Mail)
- Produkt
- Status
- Preis und Zyklus
- Datum der naechsten Verlaengerung
- Erstellungsdatum

Verfuegbare Filter: Status, Produkt, Erstellungsdatum.

### Abonnement bearbeiten

Der Administrator kann:

- Abonnementstatus aendern
- Datum der naechsten Verlaengerung aendern
- Preis aendern (wirkt sich auf zukuenftige Verlaengerungen aus)
- Notiz hinzufuegen
- Statushistorie und verknuepfte Bestellungen anzeigen

## Haeufige Probleme

### Verlaengerungsbestellungen werden nicht erstellt

1. Pruefen Sie, ob WP-Cron korrekt funktioniert (`wp_cron` wird aufgerufen)
2. Gehen Sie zu **Werkzeuge > Scheduled Actions** und pruefen Sie, ob die Aufgabe `polski_daily_maintenance` geplant ist
3. Ueberpruefen Sie, ob das Abonnement den Status "Active" und ein korrektes Verlaengerungsdatum hat

### Kunde erhaelt keine Erinnerungen

1. Pruefen Sie die WooCommerce-E-Mail-Konfiguration
2. Ueberpruefen Sie, ob die Erinnerungs-E-Mail-Vorlage aktiviert ist
3. Pruefen Sie die Einstellung "Erinnerungstage" - ob sie groesser als 0 ist

### Abonnement aendert den Status nach Bezahlung nicht

1. Pruefen Sie, ob die Verlaengerungsbestellung korrekt mit dem Abonnement verknuepft ist
2. Ueberpruefen Sie die WooCommerce-Logs auf Fehler
3. Pruefen Sie, ob das Zahlungsgateway den Bestellstatus korrekt aendert

## Verwandte Ressourcen

- [PRO-Uebersicht](/pro/overview/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
