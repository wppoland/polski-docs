---
title: Wasserzeichen fuer Download-Dateien
description: Dokumentation des Wasserzeichen-Moduls in Polski PRO for WooCommerce - automatisches Wasserzeichen fuer PDF ueber TCPDF und EPUB ueber ZipArchive mit Kaeuferdaten.
---

Das Wasserzeichen-Modul fuegt Download-Dateien (PDF und EPUB) automatisch die Daten des Kaeufers hinzu, sobald sie heruntergeladen werden. Jede heruntergeladene Datei enthaelt ein personalisiertes Wasserzeichen, das den Erwerber identifiziert.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Die PHP-Erweiterung `ZipArchive` ist fuer EPUB-Dateien erforderlich.
:::

## So funktioniert es

1. Der Kunde kauft ein Produkt mit Download-Dateien
2. Beim Klick auf den Download-Link faengt das Plugin die Anfrage ab
3. Je nach Dateiformat wird der entsprechende Wasserzeichen-Mechanismus angewendet
4. Eine temporaere Datei mit Wasserzeichen wird erzeugt und an den Kunden gesendet
5. Die temporaere Datei wird nach Abschluss des Vorgangs geloescht (Cleanup beim Shutdown)

Das Wasserzeichen wird automatisch auf alle Produkte mit Download-Dateien angewendet, eine zusaetzliche Konfiguration pro Produkt ist nicht erforderlich.

## Unterstuetzte Formate

### PDF (TCPDF)

Das Wasserzeichen fuer PDF-Dateien nutzt die TCPDF-Bibliothek:

- Auf jede Seite des Dokuments wird der Wasserzeichentext aufgebracht
- Der Text ist halbtransparent und diagonal auf der Seite platziert
- Das Wasserzeichen beeintraechtigt die Lesbarkeit des Originalinhalts nicht
- Mehrseitige PDF-Dokumente werden unterstuetzt

### EPUB (ZipArchive)

Das Wasserzeichen fuer EPUB-Dateien nutzt die PHP-Erweiterung ZipArchive:

- Die EPUB-Datei wird als ZIP-Archiv geoeffnet
- In die HTML-Dateien innerhalb des Archivs wird ein `<div>`-Element mit den Kaeuferdaten eingefuegt
- Das Einfuegen erfolgt vor dem schliessenden Tag `</body>`
- Die urspruengliche EPUB-Struktur bleibt erhalten

## Platzhalter

Im Inhalt des Wasserzeichens koennen folgende Platzhalter verwendet werden:

| Platzhalter | Beschreibung | Beispiel |
|-------------|------|---------|
| `[FIRSTNAME]` | Vorname des Kaeufers | Jan |
| `[LASTNAME]` | Nachname des Kaeufers | Kowalski |
| `[EMAIL]` | E-Mail-Adresse des Kaeufers | jan@example.com |
| `[DATE]` | Datum des Downloads | 2026-04-06 |
| `[ORDER_ID]` | Bestellnummer | 12345 |

Beispiel fuer einen Wasserzeichentext:

```
Lizenziert fuer: [FIRSTNAME] [LASTNAME] ([EMAIL])
Bestellung #[ORDER_ID] vom [DATE]
```

## Temporaere Dateien

Die Datei mit Wasserzeichen wird als temporaere Kopie im Verzeichnis `wp-content/uploads/polski-pro-temp/` erstellt:

- Die temporaere Datei wird mit einer eindeutigen Kennung erzeugt
- Nach dem Senden der Datei an den Kunden wird die temporaere Datei geloescht
- Die Bereinigung erfolgt automatisch ueber den Hook `register_shutdown_function`
- Im Fehlerfall werden die temporaeren Dateien ebenfalls geloescht

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski PRO > Wasserzeichen**.

| Einstellung | Beschreibung |
|------------|------|
| Wasserzeichen aktivieren | Aktiviert das Modul fuer alle Download-Dateien |
| Wasserzeichentext | Inhalt des Wasserzeichens mit Platzhaltern |
| Schriftgroesse (PDF) | Groesse des Wasserzeichentextes im PDF |
| Transparenz (PDF) | Transparenzstufe des Wasserzeichens im PDF |
| CSS-Stil (EPUB) | CSS-Stil des div-Elements mit Wasserzeichen im EPUB |

## Modul aktivieren

Das Modul wird ueber einen Schalter in den Einstellungen der PRO-Module gesteuert:

```
WooCommerce > Einstellungen > Polski PRO > Module > Wasserzeichen
```

<div class="disclaimer">Diese Seite dient ausschliesslich zu Informationszwecken und stellt keine Rechtsberatung dar. Polski PRO for WooCommerce ist kommerzielle Software, die ohne Gewaehrleistung bereitgestellt wird.</div>
