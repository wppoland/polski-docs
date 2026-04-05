---
title: Partnerprogramm
description: Dokumentation des Partnerprogramms von Polski PRO for WooCommerce - Empfehlungslinks, Provisionsverfolgung, Partnerregistrierung und Mein-Konto-Bereich.
---

Das Partnerprogramm-Modul ermoeglicht ein Empfehlungsprogramm im Shop. Partner teilen Empfehlungslinks, das Plugin verfolgt Konversionen und berechnet Provisionen.

## So funktioniert es

1. Der Kunde registriert sich als Partner im Mein-Konto-Bereich
2. Der Administrator aktiviert das Partnerkonto
3. Der Partner erhaelt einen einzigartigen Token und Empfehlungslink
4. Der Partner teilt den Link (z. B. in sozialen Medien, auf einem Blog)
5. Ein Besucher klickt auf den Link - der Token wird im Cookie gespeichert
6. Der Besucher gibt eine Bestellung auf - das Plugin verknuepft die Bestellung mit dem Partner
7. Nach Bezahlung der Bestellung berechnet das Plugin die Provision

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > PRO-Module > Partnerprogramm**.

Das Modul wird ueber die Option gesteuert:

```
polski_affiliates
```

### Allgemeine Einstellungen

| Einstellung | Beschreibung |
|------------|------|
| Partnerprogramm aktivieren | Aktiviert das Modul |
| Provisionssatz (%) | Prozentuale Provision vom Bestellwert (Standard 10%) |
| Provisionsbasis | Nettobetrag / Bruttobetrag / Nettobetrag ohne Versand |
| Cookie-Dauer (Tage) | Wie viele Tage das Cookie mit dem Token gueltig ist (Standard 30) |
| Automatische Aktivierung | Neue Partner automatisch aktivieren (Standard: deaktiviert) |
| Mindestauszahlung | Mindestprovisionsbetrag fuer die Auszahlung |
| URL-Parameter | Name des Parameters im Empfehlungslink (Standard `poleca`) |

### Provisionssaetze pro Produkt

Neben dem globalen Provisionssatz kann der Administrator einen individuellen Satz fuer ein bestimmtes Produkt festlegen. In der Produktbearbeitung im Abschnitt "Partnerprogramm":

- **Provisionssatz (%)** - ueberschreibt den globalen Satz
- **Vom Programm ausschliessen** - Produkt generiert keine Provision

Saetze pro Produktkategorie werden ebenfalls unterstuetzt - eine Einstellung auf Kategorieebene gilt fuer alle Produkte in dieser Kategorie, es sei denn, ein Produkt hat einen eigenen Satz.

## Empfehlungslinks

### Link-Format

Der Empfehlungslink enthaelt einen URL-Parameter mit dem Partner-Token:

```
https://example.com/?poleca=abc123def456
```

Der Parameter `poleca` ist konfigurierbar. Der Token ist eine einzigartige Partnerkennung, die bei der Registrierung generiert wird.

### Cookie-Tracking

Nach Klick auf den Empfehlungslink setzt das Plugin ein Cookie:

| Parameter | Wert |
|----------|---------|
| Cookie-Name | `polski_affiliate_token` |
| Wert | Partner-Token |
| Lebensdauer | Konfigurierbar (Standard 30 Tage) |
| Pfad | `/` |
| SameSite | `Lax` |

Das Cookie wird serverseitig (PHP) mit dem Flag `HttpOnly` gesetzt. Bei spaeteren Besuchen des Kunden prueft das Plugin das Vorhandensein des Cookies und verknuepft eine eventuelle Bestellung mit dem Partner.

### Bestellzuordnung

Das Plugin verwendet das "Last Click"-Zuordnungsmodell - wenn der Kunde auf Links von mehreren Partnern geklickt hat, erhaelt der letzte die Provision. Das Cookie wird bei jedem Klick auf einen neuen Link ueberschrieben.

## Registrierung und Aktivierung von Partnern

### Registrierung

Der Kunde kann sich als Partner im Mein-Konto-Bereich auf der Seite `/moje-konto/polski-affiliates/` registrieren. Das Registrierungsformular enthaelt:

- Vor- und Nachname (automatisch vom Konto uebernommen)
- Provisionszahlungsmethode (Ueberweisung / Rabattcode)
- Bankkontonummer (fuer Ueberweisung)
- Zustimmung zu den Bedingungen des Partnerprogramms

### Aktivierung

Standardmaessig erfordern neue Partnerkonten die manuelle Aktivierung durch den Administrator. Der Administrator erhaelt eine E-Mail-Benachrichtigung ueber neue Registrierungen und kann:

- das Konto im Bereich **WooCommerce > Partner** aktivieren
- die Registrierung mit Angabe eines Grundes ablehnen

Optional kann die automatische Aktivierung eingeschaltet werden - neue Konten werden sofort nach der Registrierung aktiv.

### Partnerstatus

| Status | Beschreibung |
|--------|------|
| Pending | Wartet auf Aktivierung |
| Active | Aktiv - kann Links generieren und Provisionen verdienen |
| Suspended | Vom Administrator ausgesetzt |
| Rejected | Abgelehnt - Registrierung wurde abgelehnt |

## Provisionsverfolgung

### Provisionsberechnung

Die Provision wird automatisch nach Bezahlung einer mit einem Partner verknuepften Bestellung berechnet. Keine Provision wird berechnet fuer:

- stornierte oder zurueckgegebene Bestellungen
- vom Partner selbst aufgegebene Bestellungen (Self-Referral)
- vom Programm ausgeschlossene Produkte

### Provisionsstatus

| Status | Beschreibung |
|--------|------|
| Pending | Berechnet, wartet auf Genehmigung |
| Approved | Genehmigt, bereit zur Auszahlung |
| Paid | Ausgezahlt |
| Rejected | Abgelehnt (z. B. Bestellung zurueckgegeben) |

### Automatische Genehmigung

Die Provision wechselt nach Ablauf eines konfigurierbaren Zeitraums (Standard 14 Tage) vom Status "Pending" auf "Approved". Die Verzoegerung schuetzt vor Provisionen aus Bestellungen, die zurueckgegeben werden koennten.

Wird die Bestellung innerhalb der Wartezeit storniert oder zurueckgegeben, wird die Provision automatisch abgelehnt.

## Mein-Konto-Bereich

Das Modul fuegt den Endpunkt `/polski-affiliates` zum Mein-Konto-Bereich hinzu. Der Endpunkt ist unter folgender Adresse erreichbar:

```
/moje-konto/polski-affiliates/
```

### Partner-Dashboard

Nach der Kontoaktivierung sieht der Partner ein Dashboard mit:

- **Statistiken** - Gesamtzahl der Klicks, Bestellungen, Provisionen
- **Empfehlungslink** - vollstaendiger Link mit Kopierschaltflaeche
- **Provisionen** - Liste der Provisionen mit Daten, Betraegen und Status
- **Auszahlungen** - Auszahlungshistorie
- **Monatsstatistiken** - Diagramm der Klicks und Konversionen

### Link-Generierung

Der Partner kann einen Empfehlungslink generieren zu:

- Startseite des Shops
- bestimmtem Produkt
- Produktkategorie
- beliebiger Seite in der Shop-Domain

Jeder Link enthaelt den Parameter `poleca` mit dem Partner-Token.

## Administrationsbereich

### Partnerliste

Gehen Sie zu **WooCommerce > Partner**. Die Tabelle enthaelt:

- Vor- und Nachname
- E-Mail
- Status
- Registrierungsdatum
- Anzahl der Empfehlungen
- Gesamtprovision
- Auszahlungssaldo

### Provisionsverwaltung

Gehen Sie zu **WooCommerce > Partner > Provisionen**. Der Administrator kann:

- Provisionsliste mit Filtern anzeigen (Partner, Status, Datum)
- Provisionen genehmigen oder ablehnen
- Provisionen als ausgezahlt markieren
- Provisionen nach CSV exportieren

### Bericht

Gehen Sie zu **WooCommerce > Partner > Bericht**. Der Bericht enthaelt:

- Gesamtwert der Empfehlungsbestellungen
- Gesamtprovisionsbetrag
- Konversion (Klicks -> Bestellungen)
- Top 10 Partner
- Monatstrend

## Hooks

### `polski_pro/affiliate/commission_created`

Aktion, die nach Berechnung einer Provision ausgefuehrt wird.

```php
/**
 * @param int   $commission_id ID prowizji
 * @param int   $affiliate_id  ID afilianta
 * @param int   $order_id      ID zamówienia
 * @param float $amount        Kwota prowizji
 */
do_action('polski_pro/affiliate/commission_created', int $commission_id, int $affiliate_id, int $order_id, float $amount);
```

**Beispiel:**

```php
add_action('polski_pro/affiliate/commission_created', function (int $commission_id, int $affiliate_id, int $order_id, float $amount): void {
    // Powiadomienie afilianta o nowej prowizji
    $affiliate = get_userdata($affiliate_id);
    wp_mail(
        $affiliate->user_email,
        'Nowa prowizja w programie afiliacyjnym',
        sprintf(
            'Otrzymałeś prowizję %.2f zł za zamówienie #%d.',
            $amount,
            $order_id
        )
    );
}, 10, 4);
```

### `polski_pro/affiliate/registered`

Aktion, die nach Registrierung eines neuen Partners ausgefuehrt wird.

```php
/**
 * @param int $user_id ID użytkownika
 * @param string $token Wygenerowany token afilianta
 */
do_action('polski_pro/affiliate/registered', int $user_id, string $token);
```

**Beispiel:**

```php
add_action('polski_pro/affiliate/registered', function (int $user_id, string $token): void {
    // Przypisanie roli WordPress
    $user = get_userdata($user_id);
    $user->add_role('affiliate');
}, 10, 2);
```

### `polski_pro/affiliate/validate_referral`

Filtert die Validierung einer Empfehlung vor der Provisionsberechnung.

```php
/**
 * @param bool $is_valid     Czy polecenie jest prawidłowe
 * @param int  $affiliate_id ID afilianta
 * @param int  $order_id     ID zamówienia
 */
apply_filters('polski_pro/affiliate/validate_referral', bool $is_valid, int $affiliate_id, int $order_id): bool;
```

**Beispiel:**

```php
add_filter('polski_pro/affiliate/validate_referral', function (bool $is_valid, int $affiliate_id, int $order_id): bool {
    $order = wc_get_order($order_id);
    
    // Blokowanie self-referral po adresie e-mail
    $affiliate_email = get_userdata($affiliate_id)->user_email;
    if ($order->get_billing_email() === $affiliate_email) {
        return false;
    }
    
    return $is_valid;
}, 10, 3);
```

## Haeufige Probleme

### Provision wird nicht berechnet

1. Pruefen Sie, ob der Partner den Status "Active" hat
2. Ueberpruefen Sie, ob das Cookie `polski_affiliate_token` gesetzt ist (Browser-Entwicklertools)
3. Pruefen Sie, ob die Bestellung nicht vom Partner selbst aufgegeben wurde
4. Ueberpruefen Sie, ob die Produkte in der Bestellung nicht vom Programm ausgeschlossen sind

### Cookie wird nach Klick auf den Link nicht gesetzt

1. Pruefen Sie, ob der URL-Parameter korrekt ist (Standard `poleca`)
2. Ueberpruefen Sie, ob der Partner-Token existiert und aktiv ist
3. Pruefen Sie, ob Cache-Plugins nicht die Seite mit URL-Parametern cachen - fuegen Sie den Parameter `poleca` zur Cache-Ausschlussliste hinzu

### Partner sieht den Bereich in Mein Konto nicht

1. Pruefen Sie, ob das Partnermodul aktiviert ist
2. Gehen Sie zu **Einstellungen > Permalinks** und klicken Sie auf "Speichern" (aktualisiert die Rewrite-Regeln)
3. Ueberpruefen Sie, ob der Endpunkt `polski-affiliates` registriert ist

## Verwandte Ressourcen

- [PRO-Uebersicht](/pro/overview/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
