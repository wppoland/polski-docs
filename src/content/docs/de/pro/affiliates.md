---
title: Partnerprogramm
description: Dokumentation des Partnerprogramms von Polski PRO for WooCommerce - Empfehlungslinks, Provisionsverfolgung, Partnerregistrierung und Mein-Konto-Bereich.
---

Das Partnerprogramm-Modul ermöglicht ein Empfehlungsprogramm im Shop. Partner teilen Empfehlungslinks, das Plugin verfolgt Konversionen und berechnet Provisionen.

## So funktioniert es

1. Der Kunde registriert sich als Partner im Mein-Konto-Bereich
2. Der Administrator aktiviert das Partnerkonto
3. Der Partner erhält einen eindeutigen Token und einen Empfehlungslink
4. Der Partner teilt den Link (z. B. in sozialen Medien, auf einem Blog)
5. Ein Besucher klickt auf den Link, der Token wird im Cookie gespeichert
6. Der Besucher gibt eine Bestellung auf, das Plugin verknüpft die Bestellung mit dem Partner
7. Nach Bezahlung der Bestellung berechnet das Plugin die Provision

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > PRO-Module > Partnerprogramm**.

Das Modul wird über folgende Option gesteuert:

```
polski_affiliates
```

### Allgemeine Einstellungen

| Einstellung | Beschreibung |
|------------|------|
| Partnerprogramm aktivieren | Aktiviert das Modul |
| Provisionssatz (%) | Prozentuale Provision vom Bestellwert (Standard 10%) |
| Provisionsbasis | Nettobetrag / Bruttobetrag / Nettobetrag ohne Versand |
| Cookie-Dauer (Tage) | Wie viele Tage das Cookie mit dem Token gültig ist (Standard 30) |
| Automatische Aktivierung | Neue Partner automatisch aktivieren (Standard: deaktiviert) |
| Mindestauszahlung | Mindestprovisionsbetrag für die Auszahlung |
| URL-Parameter | Name des Parameters im Empfehlungslink (Standard `poleca`) |

### Provisionssätze pro Produkt

Neben dem globalen Satz können Sie einen individuellen Satz für ein Produkt festlegen. In der Produktbearbeitung, Abschnitt "Partnerprogramm":

- **Provisionssatz (%)** - überschreibt den globalen Satz
- **Vom Programm ausschließen** - das Produkt generiert keine Provision

Sätze pro Kategorie funktionieren ebenfalls, sie gelten für alle Produkte in der Kategorie, es sei denn, ein Produkt hat einen eigenen Satz.

## Empfehlungslinks

### Link-Format

Der Link enthält einen URL-Parameter mit dem Partner-Token:

```
https://example.com/?poleca=abc123def456
```

Der Parameter `poleca` ist konfigurierbar. Der Token ist eine eindeutige Partnerkennung, die bei der Registrierung generiert wird.

### Cookie-Tracking

Nach dem Klick auf den Empfehlungslink setzt das Plugin ein Cookie:

| Parameter | Wert |
|----------|---------|
| Cookie-Name | `polski_affiliate_token` |
| Wert | Partner-Token |
| Lebensdauer | Konfigurierbar (Standard 30 Tage) |
| Pfad | `/` |
| SameSite | `Lax` |

Das Cookie wird serverseitig (PHP) mit dem Flag `HttpOnly` gesetzt. Bei späteren Besuchen verknüpft das Plugin die Bestellung mit dem Partner.

### Bestellzuordnung

Das Plugin verwendet das "Last Click"-Modell, die Provision erhält der letzte Partner, dessen Link der Kunde geklickt hat.

## Registrierung und Aktivierung von Partnern

### Registrierung

Der Kunde registriert sich als Partner unter Mein Konto (`/moje-konto/polski-affiliates/`). Das Formular enthält:

- Vor- und Nachname (automatisch vom Konto übernommen)
- Provisionszahlungsmethode (Überweisung / Rabattcode)
- Bankkontonummer (für Überweisung)
- Zustimmung zu den Bedingungen des Partnerprogramms

### Aktivierung

Standardmäßig erfordern neue Konten eine manuelle Aktivierung. Der Administrator erhält eine E-Mail über die Registrierung und kann:

- das Konto im Bereich **WooCommerce > Partner** aktivieren
- die Registrierung mit Angabe eines Grundes ablehnen

Aktivieren Sie die automatische Aktivierung, damit Konten sofort aktiv werden.

### Partnerstatus

| Status | Beschreibung |
|--------|------|
| Pending | Wartet auf Aktivierung |
| Active | Aktiv - kann Links generieren und Provisionen verdienen |
| Suspended | Vom Administrator ausgesetzt |
| Rejected | Abgelehnt - Registrierung abgelehnt |

## Provisionsverfolgung

### Provisionsberechnung

Die Provision wird automatisch nach Bezahlung der Bestellung berechnet. Keine Provision wird berechnet für:

- stornierte oder zurückgegebene Bestellungen
- vom Partner selbst aufgegebene Bestellungen (Self-Referral)
- vom Programm ausgeschlossene Produkte

### Provisionsstatus

| Status | Beschreibung |
|--------|------|
| Pending | Berechnet, wartet auf Genehmigung |
| Approved | Genehmigt, bereit zur Auszahlung |
| Paid | Ausgezahlt |
| Rejected | Abgelehnt (z. B. Bestellung zurückgegeben) |

### Automatische Genehmigung

Die Provision wechselt nach 14 Tagen (konfigurierbar) von "Pending" auf "Approved". Das schützt vor Provisionen aus zurückgegebenen Bestellungen.

Wird die Bestellung innerhalb der Wartezeit storniert, wird die Provision automatisch abgelehnt.

## Mein-Konto-Bereich

Das Modul fügt einen Abschnitt in Mein Konto unter folgender Adresse hinzu:

```
/moje-konto/polski-affiliates/
```

### Partner-Dashboard

Nach der Kontoaktivierung sieht der Partner ein Dashboard mit:

- **Statistiken** - Gesamtzahl der Klicks, Bestellungen, Provisionen
- **Empfehlungslink** - vollständiger Link mit Kopierschaltfläche
- **Provisionen** - Liste der Provisionen mit Daten, Beträgen und Status
- **Auszahlungen** - Auszahlungshistorie
- **Monatsstatistiken** - Diagramm der Klicks und Konversionen

### Link-Generierung

Der Partner kann einen Empfehlungslink generieren zu:

- der Startseite des Shops
- einem bestimmten Produkt
- einer Produktkategorie
- einer beliebigen Seite in der Shop-Domain

Jeder Link enthält den Parameter `poleca` mit dem Partner-Token.

## Administrationsbereich

### Partnerliste

Gehen Sie zu **WooCommerce > Partner**. Die Tabelle enthält:

- Vor- und Nachname
- E-Mail
- Status
- Registrierungsdatum
- Anzahl der Empfehlungen
- Gesamtprovision
- Auszahlungssaldo

### Provisionsverwaltung

Gehen Sie zu **WooCommerce > Partner > Provisionen**. Der Administrator kann:

- die Provisionsliste mit Filtern anzeigen (Partner, Status, Datum)
- Provisionen genehmigen oder ablehnen
- Provisionen als ausgezahlt markieren
- Provisionen nach CSV exportieren

### Bericht

Gehen Sie zu **WooCommerce > Partner > Bericht**. Der Bericht enthält:

- Gesamtwert der Empfehlungsbestellungen
- Gesamtprovisionsbetrag
- Konversion (Klicks -> Bestellungen)
- Top 10 Partner
- Monatstrend

## Hooks

### `polski_pro/affiliate/commission_created`

Aktion, die nach Berechnung einer Provision ausgelöst wird.

```php
/**
 * @param int   $commission_id Provisions-ID
 * @param int   $affiliate_id  Partner-ID
 * @param int   $order_id      Bestell-ID
 * @param float $amount        Provisionsbetrag
 */
do_action('polski_pro/affiliate/commission_created', int $commission_id, int $affiliate_id, int $order_id, float $amount);
```

**Beispiel:**

```php
add_action('polski_pro/affiliate/commission_created', function (int $commission_id, int $affiliate_id, int $order_id, float $amount): void {
    // Partner über neue Provision benachrichtigen
    $affiliate = get_userdata($affiliate_id);
    wp_mail(
        $affiliate->user_email,
        'Neue Provision im Partnerprogramm',
        sprintf(
            'Sie haben eine Provision von %.2f zł für die Bestellung #%d erhalten.',
            $amount,
            $order_id
        )
    );
}, 10, 4);
```

### `polski_pro/affiliate/registered`

Aktion, die nach Registrierung eines neuen Partners ausgelöst wird.

```php
/**
 * @param int $user_id Benutzer-ID
 * @param string $token Generierter Partner-Token
 */
do_action('polski_pro/affiliate/registered', int $user_id, string $token);
```

**Beispiel:**

```php
add_action('polski_pro/affiliate/registered', function (int $user_id, string $token): void {
    // WordPress-Rolle zuweisen
    $user = get_userdata($user_id);
    $user->add_role('affiliate');
}, 10, 2);
```

### `polski_pro/affiliate/validate_referral`

Filtert die Validierung einer Empfehlung vor der Provisionsberechnung.

```php
/**
 * @param bool $is_valid     Ob die Empfehlung gültig ist
 * @param int  $affiliate_id Partner-ID
 * @param int  $order_id     Bestell-ID
 */
apply_filters('polski_pro/affiliate/validate_referral', bool $is_valid, int $affiliate_id, int $order_id): bool;
```

**Beispiel:**

```php
add_filter('polski_pro/affiliate/validate_referral', function (bool $is_valid, int $affiliate_id, int $order_id): bool {
    $order = wc_get_order($order_id);
    
    // Self-Referral anhand der E-Mail-Adresse blockieren
    $affiliate_email = get_userdata($affiliate_id)->user_email;
    if ($order->get_billing_email() === $affiliate_email) {
        return false;
    }
    
    return $is_valid;
}, 10, 3);
```

## Häufige Probleme

### Die Provision wird nicht berechnet

1. Prüfen Sie, ob der Partner den Status "Active" hat
2. Überprüfen Sie, ob das Cookie `polski_affiliate_token` gesetzt ist (Browser-Entwicklertools)
3. Prüfen Sie, ob die Bestellung nicht vom Partner selbst aufgegeben wurde
4. Überprüfen Sie, ob die Produkte in der Bestellung nicht vom Programm ausgeschlossen sind

### Das Cookie wird nach dem Klick auf den Link nicht gesetzt

1. Prüfen Sie, ob der URL-Parameter korrekt ist (Standard `poleca`)
2. Überprüfen Sie, ob der Partner-Token existiert und aktiv ist
3. Prüfen Sie, ob Cache-Plugins die Seite mit URL-Parametern cachen, fügen Sie den Parameter `poleca` zur Cache-Ausschlussliste hinzu

### Der Partner sieht das Panel in Mein Konto nicht

1. Prüfen Sie, ob das Partnermodul aktiviert ist
2. Gehen Sie zu **Einstellungen > Permalinks** und klicken Sie auf "Speichern" (aktualisiert die Rewrite-Regeln)
3. Überprüfen Sie, ob der Endpunkt `polski-affiliates` registriert ist

## Verwandte Ressourcen

- [PRO-Übersicht](/pro/overview/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
