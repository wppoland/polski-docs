---
title: Abonnements
description: Dokumentation des Abonnement-Moduls von Polski PRO for WooCommerce - wiederkehrende Produkte, Verlaengerungen, E-Mail-Erinnerungen, Cron und das Mein-Konto-Panel.
---

Das Abonnement-Modul fuegt Produkte mit wiederkehrender Zahlung hinzu. Kunden kaufen Abonnements mit manueller Verlaengerung, und der Administrator verwaltet sie in WooCommerce.

## So funktioniert es

1. Der Administrator erstellt ein Produkt vom Typ "Abonnement" mit Zyklus und Preis
2. Der Kunde kauft das Abonnement und bezahlt die erste Bestellung
3. Das Plugin erstellt ein Abonnement mit dem Status "Aktiv"
4. Vor dem Verlaengerungsdatum erhaelt der Kunde eine E-Mail-Erinnerung
5. Am Verlaengerungstag erstellt das Plugin eine Verlaengerungsbestellung
6. Der Kunde bezahlt die Verlaengerungsbestellung (manuelle Verlaengerung)
7. Der Zyklus wiederholt sich bis zur Kuendigung des Abonnements

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski > PRO Module > Abonnements**.

Das Modul wird ueber die Option gesteuert:

```
polski_subscriptions
```

### Allgemeine Einstellungen

| Einstellung | Beschreibung |
|------------|------|
| Abonnements aktivieren | Aktiviert das Modul |
| Verlaengerungsmodus | Manuell (Kunde bezahlt die Bestellung) |
| Erste Erinnerung | Wie viele Tage vor der Verlaengerung die erste Erinnerung gesendet wird (Standard 14) |
| Zweite Erinnerung | Wie viele Tage vor der Verlaengerung die zweite Erinnerung gesendet wird (Standard 7) |
| Kulanzzeitraum | Wie viele Tage nach dem Verlaengerungstermin das Abonnement aktiv bleibt (Standard 7) |
| Automatische Aussetzung | Setzt das Abonnement nach Ablauf des Kulanzzeitraums aus |

### Erstellung eines Abonnementprodukts

1. Gehe zu **Produkte > Neu hinzufuegen**
2. Waehle den Produkttyp: **Abonnement**
3. Konfiguriere Preis und Zyklus:

| Feld | Beschreibung |
|------|------|
| Abonnementpreis | Betrag pro Abrechnungszeitraum |
| Abrechnungszeitraum | Tag / Woche / Monat / Jahr |
| Laenge des Zeitraums | Anzahl der Zeitraeume (z. B. 1 Monat, 3 Monate) |
| Anfangspreis | Optional - anderer Preis fuer den ersten Zeitraum |
| Aktivierungsgebuehr | Optional - einmalige Gebuehr bei der ersten Bestellung |
| Verlaengerungslimit | 0 = unbegrenzt, oder Anzahl der Verlaengerungen |

4. Veroeffentliche das Produkt

### Anfangspreis vs. Verlaengerungspreis

Der Preis fuer den ersten Zeitraum kann sich von dem fuer die folgenden unterscheiden. Anwendungen:

- kostenloser Testzeitraum oder zu reduziertem Preis
- Aktionspreis zum Start
- Aktivierungsgebuehr + niedrigerer wiederkehrender Preis

Der Anfangspreis gilt nur fuer die erste Bestellung. Die folgenden Verlaengerungen haben den Standardpreis.

## Lebenszyklus eines Abonnements

```
Pending → Active → On Hold → Active → ...
                  → Expired
                  → Cancelled
```

| Status | Beschreibung |
|--------|------|
| Pending | Wartet auf die Bezahlung der ersten Bestellung |
| Active | Aktiv - der Kunde hat Zugriff auf das Produkt |
| On Hold | Ausgesetzt - die Verlaengerungsbestellung wartet auf Bezahlung |
| Expired | Abgelaufen - die Anzahl der Verlaengerungen hat das Limit erreicht oder der Kulanzzeitraum ist verstrichen |
| Cancelled | Vom Kunden oder Administrator gekuendigt |

## Verlaengerungen

### Manuelle Verlaengerung

Das Plugin unterstuetzt manuelle Verlaengerungen:

1. Das Plugin erstellt eine Verlaengerungsbestellung mit dem Status "Wartet auf Zahlung"
2. Der Kunde erhaelt eine E-Mail mit einem Link zur Bezahlung der Bestellung
3. Der Kunde bezahlt die Bestellung ueber die gewaehlte Zahlungsmethode
4. Nach der Bezahlung wird das Abonnement um den naechsten Zeitraum verlaengert

### Verlaengerungsprozess

Das Plugin prueft taeglich per WP-Cron die zu verlaengernden Abonnements:

```
polski_daily_maintenance
```

Taeglicher Cron-Job:

- prueft die zu verlaengernden Abonnements
- erstellt Verlaengerungsbestellungen
- setzt Abonnements nach dem Kulanzzeitraum aus
- laesst Abonnements nach Erreichen des Verlaengerungslimits ablaufen

### E-Mail-Erinnerungen

Das Plugin sendet zwei E-Mail-Erinnerungen vor dem Verlaengerungsdatum:

| E-Mail | Wann | Inhalt |
|--------|-------|-------|
| Erste Erinnerung | 14 Tage vor der Verlaengerung (konfigurierbar) | Information ueber die bevorstehende Verlaengerung, Betrag, **Link zur Kuendigung mit einem Klick** |
| Zweite Erinnerung | 7 Tage vor der Verlaengerung (konfigurierbar) | Letzte Erinnerung, Betrag, Kuendigungslink und Link zum Panel |
| Verlaengerungsbestellung | Am Verlaengerungstag | Bestellung zur Bezahlung mit Zahlungslink |
| Abonnement ausgesetzt | Nach Ablauf der Zahlungsfrist | Information ueber die Aussetzung, Link zur Bezahlung |
| Abonnement abgelaufen | Nach Ablauf des Kulanzzeitraums | Information ueber den Ablauf, Link zum erneuten Kauf |

:::tip[Konformitaet mit EU-Recht]
Beide Erinnerungen enthalten einen Link zur Kuendigung des Abonnements mit einem Klick. Dies erfuellt die europaeischen Anforderungen an die einfache Kuendigung wiederkehrender Dienste (u. a. UOKiK, Verbraucherrechte-Richtlinie).
:::

Die E-Mail-Vorlagen koennen unter **WooCommerce > Einstellungen > E-Mails** angepasst werden.

## Mein-Konto-Panel

Das Modul fuegt einen Abschnitt in Mein Konto unter folgender Adresse hinzu:

```
/moje-konto/polski-subscriptions/
```

### Liste der Abonnements

Der Kunde sieht eine Tabelle mit Abonnements:

| Spalte | Beschreibung |
|---------|------|
| Produkt | Name des Abonnementprodukts |
| Status | Aktueller Status des Abonnements |
| Preis | Betrag pro Zeitraum |
| Naechste Verlaengerung | Datum der naechsten Verlaengerung |
| Aktionen | Kuendigen / Verlaengerung bezahlen |

### Details des Abonnements

Nach dem Klick auf ein Abonnement sieht der Kunde:

- die vollstaendigen Abonnementdaten (Produkt, Preis, Zyklus, Daten)
- die Verlaengerungshistorie (Liste der verknuepften Bestellungen)
- die Schaltflaeche zur Kuendigung des Abonnements
- die Schaltflaeche zur Bezahlung der ausstehenden Verlaengerung (falls zutreffend)

### Kuendigung des Abonnements

Der Kunde kann ein aktives Abonnement in Mein Konto kuendigen. Die Kuendigung:

- aendert den Status des Abonnements auf "Cancelled"
- das Abonnement bleibt bis zum Ende des aktuell bezahlten Zeitraums aktiv
- der Kunde wird ueber das Datum des Zugriffsendes informiert

## Hooks

### `polski_pro/subscription/status_changed`

Aktion, die nach einer Statusaenderung des Abonnements ausgeloest wird.

```php
/**
 * @param int    $subscription_id ID des Abonnements
 * @param string $new_status      Neuer Status
 * @param string $old_status      Vorheriger Status
 */
do_action('polski_pro/subscription/status_changed', int $subscription_id, string $new_status, string $old_status);
```

**Beispiel:**

```php
add_action('polski_pro/subscription/status_changed', function (int $subscription_id, string $new_status, string $old_status): void {
    if ($new_status === 'cancelled') {
        $subscription = polski_pro_get_subscription($subscription_id);
        // Versand einer Umfrage zum Kuendigungsgrund
        wp_mail(
            $subscription->get_customer_email(),
            'Schade, dass du gehst',
            'Sag uns, warum du dein Abonnement kuendigst: https://example.com/umfrage'
        );
    }
}, 10, 3);
```

### `polski_pro/subscription/renewal_created`

Aktion, die nach der Erstellung einer Verlaengerungsbestellung ausgeloest wird.

```php
/**
 * @param int $order_id        ID der Verlaengerungsbestellung
 * @param int $subscription_id ID des Abonnements
 */
do_action('polski_pro/subscription/renewal_created', int $order_id, int $subscription_id);
```

**Beispiel:**

```php
add_action('polski_pro/subscription/renewal_created', function (int $order_id, int $subscription_id): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Verlaengerungsbestellung fuer Abonnement #%d', $subscription_id)
    );
}, 10, 2);
```

### `polski_pro/subscription/renewal_paid`

Aktion, die nach der Bezahlung einer Verlaengerungsbestellung ausgeloest wird.

```php
/**
 * @param int $order_id        ID der Verlaengerungsbestellung
 * @param int $subscription_id ID des Abonnements
 */
do_action('polski_pro/subscription/renewal_paid', int $order_id, int $subscription_id);
```

### Hooks fuer Verlaengerungserinnerungen (1.8.2+)

Die Erinnerungs-Engine (14 Tage + 7 Tage vor der Verlaengerung) stellt Filter und Aktionen fuer eine vollstaendige Personalisierung bereit:

```php
// Aendere die Erinnerungsfenster (in Tagen)
add_filter('polski_subscription_reminder_windows', fn ($w) => ['first' => 21, 'second' => 7, 'last' => 1]);

// Aendere den Betreff der E-Mail
add_filter('polski_subscription_reminder_subject', fn ($subject, $sub, $type) => "[$type] $subject", 10, 3);

// Aendere den Inhalt der E-Mail
add_filter('polski_subscription_reminder_body', fn ($body, $sub, $type) => $body . "\n\nDanke!", 10, 3);

// Zusaetzliche Header (z. B. HTML-Modus)
add_filter('polski_subscription_reminder_headers', fn () => ['Content-Type: text/html; charset=UTF-8']);

// Erinnerung fuer ein bestimmtes Abonnement ueberspringen
add_filter('polski_subscription_skip_reminder', fn ($skip, $sub) => $sub->productId === 42, 10, 2);

// Versandvorgaenge beobachten
add_action('polski_subscription_reminder_sent', fn ($sub, $type, $days) => error_log("Sent $type to $sub->email"), 10, 3);
add_action('polski_subscription_reminder_failed', fn ($sub, $type) => error_log("Failed $type"), 10, 2);
```

### Benachrichtigungen ueber Preisaenderungen (1.8.3+)

`SubscriptionRepository::updateRecurringAmount()` erkennt eine Betragsaenderung und sendet automatisch eine E-Mail an den Kunden mit:
- altem und neuem Betrag,
- Datum des Inkrafttretens der Aenderung (naechster Abrechnungszyklus),
- One-Click-Cancel-Link (Anforderungen des EU-Verbraucherschutzes).

Hooks:

```php
// Betragsaenderung beobachten
add_action('polski_subscription_amount_changed', function (int $id, float $previous, float $next) {
    error_log("Subscription $id: $previous -> $next");
}, 10, 3);

// Inhalt der E-Mail personalisieren
add_filter('polski_subscription_amount_change_body', fn ($body, $sub, $prev, $next) => $body, 10, 4);

// Ergebnis des Versands beobachten
add_action('polski_subscription_amount_change_notified', fn ($sub, $prev, $next, $sent) => null, 10, 4);
```

## Admin-Panel

### Liste der Abonnements

Gehe zu **WooCommerce > Abonnements**. Die Tabelle enthaelt:

- ID des Abonnements
- Kunde (Vorname, Nachname, E-Mail)
- Produkt
- Status
- Preis und Zyklus
- Datum der naechsten Verlaengerung
- Erstellungsdatum

Verfuegbare Filter: Status, Produkt, Erstellungsdatum.

### Bearbeitung des Abonnements

Der Administrator kann:

- den Status des Abonnements aendern
- das Datum der naechsten Verlaengerung aendern
- den Preis aendern (wirkt sich auf die folgenden Verlaengerungen aus)
- eine Notiz hinzufuegen
- die Statushistorie und die verknuepften Bestellungen einsehen

## Haeufigste Probleme

### Verlaengerungsbestellungen werden nicht erstellt

1. Pruefe, ob WP-Cron korrekt funktioniert (`wp_cron` wird aufgerufen)
2. Gehe zu **Werkzeuge > Scheduled Actions** und pruefe, ob der Job `polski_daily_maintenance` eingeplant ist
3. Verifiziere, ob das Abonnement den Status "Active" und ein korrektes Verlaengerungsdatum hat

### Der Kunde erhaelt keine Erinnerungen

1. Pruefe die Konfiguration der WooCommerce E-Mails
2. Verifiziere, ob die Vorlage der Erinnerungs-E-Mail aktiviert ist
3. Pruefe die Einstellung "Erinnerungstage" - ist sie groesser als 0

### Das Abonnement aendert nach der Bezahlung nicht den Status

1. Pruefe, ob die Verlaengerungsbestellung korrekt mit dem Abonnement verknuepft ist
2. Verifiziere die WooCommerce-Logs auf Fehler
3. Pruefe, ob das Zahlungsgateway den Bestellstatus korrekt aendert

## Verwandte Ressourcen

- [PRO Uebersicht](/pro/overview/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschliesslich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
