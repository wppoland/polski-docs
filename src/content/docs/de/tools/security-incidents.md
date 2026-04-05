---
title: Register der Sicherheitsvorfaelle
description: Register der Sicherheitsvorfaelle (CRA) in Polski for WooCommerce - Ereignisregistrierung, CSV-Export und Konformitaet mit dem Cyber Resilience Act.
---

Das Register ermoeglicht die Dokumentation von Sicherheitsereignissen im Shop. Unterstuetzt die Konformitaet mit dem Cyber Resilience Act (CRA) - EU-Verordnung, die ein Vorfallregister fuer Produkte mit digitalen Elementen verlangt.

## Was ist CRA

Der Cyber Resilience Act (CRA) ist eine EU-Verordnung, die Cybersicherheitsanforderungen fuer Produkte mit digitalen Elementen festlegt. Verkaeufer sind verpflichtet:

- Ein Register der Sicherheitsvorfaelle zu fuehren
- Vorfaelle innerhalb von 24 Stunden an Aufsichtsbehoerden zu melden
- Kunden ueber entdeckte Sicherheitsluecken zu informieren
- Abhilfemassnahmen zu dokumentieren

## Zugang zum Register

Gehen Sie zu **WooCommerce > Polski > Werkzeuge > Sicherheitsvorfaelle**. Das Register ist fuer Benutzer mit der Berechtigung `manage_woocommerce` zugaenglich.

## Vorfall registrieren

Klicken Sie auf **Vorfall hinzufuegen** und fuellen Sie das Formular aus:

### Formularfelder

| Feld                    | Typ       | Erforderlich | Beschreibung                                    |
| ----------------------- | --------- | -------- | --------------------------------------- |
| Titel                   | text      | Ja      | Kurze Vorfallbeschreibung                   |
| Entdeckungsdatum            | datetime  | Ja      | Wann der Vorfall entdeckt wurde           |
| Vorfalldatum         | datetime  | Nein      | Wann der Vorfall tatsaechlich stattfand  |
| Kategorie               | select    | Ja      | Vorfalltyp                           |
| Prioritaet               | select    | Ja      | Kritisch / Hoch / Mittel / Niedrig     |
| Beschreibung                    | textarea  | Ja      | Detaillierte Ereignisbeschreibung              |
| Betroffene Produkte       | multiselect| Nein     | Vom Vorfall betroffene WooCommerce-Produkte |
| Auswirkungsumfang           | select    | Ja      | Anzahl betroffener Kunden             |
| Ergriffene Massnahmen       | textarea  | Nein      | Beschreibung der Abhilfemassnahmen                |
| Status                  | select    | Ja      | Neu / In Bearbeitung / Geloest / Geschlossen |
| Verantwortliche Person    | select    | Nein      | Verantwortlicher WordPress-Benutzer     |
| An Behoerde gemeldet     | checkbox  | Nein      | Ob der Vorfall an die Aufsichtsbehoerde gemeldet wurde|
| Kunden benachrichtigt    | checkbox  | Nein      | Ob Kunden benachrichtigt wurden        |

### Vorfallkategorien

| Kategorie                | Beschreibung                                         |
| ------------------------ | -------------------------------------------- |
| Datenleck            | Unbefugter Zugriff auf personenbezogene Daten   |
| Schadsoftware  | Malware, Skimmer, Backdoor                   |
| DDoS-Angriff                | Denial-of-Service-Angriff                           |
| Unbefugter Zugriff   | Einbruch in Admin- oder Kundenkonto         |
| Softwareluecke    | Entdeckte Schwachstelle in Plugin oder Theme      |
| Phishing                 | Phishing-Angriff auf Shop-Kunden          |
| Datenmanipulation       | Unbefugte Datenaenderung (Preise, Bestellungen) |
| Sonstige                     | Andere Sicherheitsereignisse                |

## CSV-Export

Klicken Sie auf **CSV exportieren** ueber der Vorfallstabelle. Der Export enthaelt alle registrierten Vorfaelle mit Details wie ID, Titel, Datum, Kategorie, Prioritaet, Status, ergriffene Massnahmen und Meldungsstatus.

## Automatische Erkennung

Das Modul kann bestimmte Ereignisse automatisch registrieren:

- **Fehlgeschlagene Logins** - Serie fehlgeschlagener Loginversuche (Brute Force)
- **Core-Dateiaenderungen** - Aenderung von WordPress-Core-Dateien
- **Neuer Admin-Benutzer** - Erstellung eines Kontos mit Administratorrolle
- **Berechtigungsaenderung** - Erhoehung der Berechtigungen eines bestehenden Kontos

```php
// Automatische Erkennung deaktivieren
add_filter('polski/security_incidents/auto_detect', '__return_false');
```

## Programmatisches Hinzufuegen von Vorfaellen

```php
do_action('polski/security_incidents/create', [
    'title'          => 'SQL-Injection-Versuch erkannt',
    'category'       => 'unauthorized_access',
    'priority'       => 'high',
    'description'    => 'SQL-Injection-Versuch im Parameter product_id erkannt.',
    'detection_date' => current_time('mysql'),
    'status'         => 'new',
]);
```

## Fehlerbehebung

**Benachrichtigungen kommen nicht an** - pruefen Sie die WordPress-E-Mail-Konfiguration. Die Verwendung eines SMTP-Plugins (z.B. WP Mail SMTP) wird empfohlen.

**CSV-Export gibt leere Datei zurueck** - pruefen Sie die Filterung. Zu restriktive Filter koennen ein leeres Ergebnis liefern.

**Automatische Erkennung generiert zu viele Alarme** - passen Sie die Schwellenwerte in den Moduleinstellungen an.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
