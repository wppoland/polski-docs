---
title: Rueckgaben und Reklamationen (RMA)
description: Handhabung von Reklamationen und Rueckgaben in Polski for WooCommerce - Kundenformular in Mein Konto, Berechtigungsfenster, E-Mail-Bestaetigungen und Bearbeitungswarteschlange im Admin.
---

Das kostenlose Modul "Rueckgaben und Reklamationen (RMA)" stellt Werkzeuge und Vorlagen bereit, mit denen Kunden Reklamationen (reklamacja) und Rueckgaben (zwrot) direkt aus ihrem Konto einreichen koennen. Das Modul ist optional und standardmaessig deaktiviert. Es spiegelt den bestehenden Ablauf fuer Widerrufserklaerungen wider und bietet Werkzeuge und Vorlagen, keine Rechtsberatung.

## Was das Modul leistet

Nach der Aktivierung erhalten angemeldete Kunden in ihrem Konto eine Aktion, mit der sie zu einer berechtigten Bestellung eine Reklamation oder eine Rueckgabe melden koennen. Jede Meldung wird gespeichert, der Kunde und der Shop erhalten eine Bestaetigung per E-Mail, und der Shop verwaltet alle Meldungen in einer zentralen Warteschlange im WooCommerce-Panel.

## Aktivierung

Das Modul ist standardmaessig deaktiviert. Aktivieren Sie es unter **WooCommerce > Polski > Module** in der Gruppe "Verbraucherrechte" ueber den Schalter "Rueckgaben und Reklamationen (RMA)".

## Kundenprozess

### Schritt 1 - Aktion in Mein Konto

Nach Aktivierung des Moduls erscheint auf der Seite **Mein Konto > Bestellungen** bei jeder berechtigten Bestellung die Aktion "Reklamation / Rueckgabe". Ein Klick darauf oeffnet das Meldeformular.

### Schritt 2 - Meldeformular

Das Formular enthaelt:

- Typ (Reklamation oder Rueckgabe)
- Begruendung (Textfeld)

Nach dem Absenden wird die Meldung gespeichert.

### Schritt 3 - E-Mail-Bestaetigung

Nach dem Absenden des Formulars fuehrt das System automatisch folgendes aus:

1. Sendet dem Kunden eine E-Mail mit Bestaetigung des Meldungseingangs
2. Sendet dem Shop eine Benachrichtigung ueber die neue Meldung

Bestehende Meldungen und ihr aktueller Status werden anschliessend auf der Detailseite der Bestellung angezeigt.

## Berechtigung

Eine Bestellung qualifiziert sich fuer eine Meldung, wenn:

1. Die Bestellung dem angemeldeten Kunden gehoert
2. Die Bestellung innerhalb des konfigurierbaren Berechtigungsfensters liegt (Anzahl der Tage ab dem Bestelldatum, Standard 365)

Liegt eine Bestellung ausserhalb des Berechtigungsfensters oder gehoert sie nicht dem Kunden, wird die Aktion "Reklamation / Rueckgabe" nicht angezeigt.

## Bearbeitungswarteschlange im Admin

Alle Meldungen sind im WooCommerce-Panel unter **WooCommerce > Polski > Rueckgaben und Reklamationen** verfuegbar. In dieser Warteschlange aendert der Shop den Status jeder Meldung:

- **Eingereicht** - die Meldung wurde vom Kunden abgesendet
- **In Bearbeitung** - der Shop bearbeitet die Meldung
- **Erledigt** - die Meldung wurde abgeschlossen
- **Abgelehnt** - die Meldung wurde abgelehnt

## Einstellungen

Das Modul bietet folgende Einstellungen:

- **Berechtigungsfenster** - Anzahl der Tage ab dem Bestelldatum, innerhalb derer eine Meldung moeglich ist (Standard 365)
- **Benachrichtigungs-E-Mail** - die Adresse des Administrators, an die Benachrichtigungen ueber neue Meldungen gesendet werden

## Weitere Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
