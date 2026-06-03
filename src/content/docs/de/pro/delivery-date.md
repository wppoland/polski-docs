---
title: Auswahl des Lieferdatums
description: Modul zur Auswahl des bevorzugten Lieferdatums an der WooCommerce-Kasse in Polski PRO.
---

Das Modul fuegt auf der Bestellseite ein Feld mit einem Kalender (flatpickr) hinzu und ermoeglicht es Kunden, ihr bevorzugtes Lieferdatum auszuwaehlen.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfiguration

Gehe zu **Polski PRO > Module** und aktiviere das Modul **Auswahl des Lieferdatums**.

| Einstellung | Beschreibung | Standard |
|------------|------|-----------|
| Feldbezeichnung | Text, der ueber dem Kalender angezeigt wird | Bevorzugtes Lieferdatum |
| Pflichtfeld | Ob der Kunde ein Datum waehlen muss | Nein |
| Min. Tage | Frueheste moegliche Datum (Tage ab heute) | 1 |
| Max. Tage | Spaeteste moegliche Datum (Tage ab heute) | 30 |
| Gesperrte Wochentage | Welche Tage nicht verfuegbar sind (0=So, 6=Sa) | 0 (Sonntage) |
| Gesperrte Daten | Konkrete nicht verfuegbare Daten (Format: YYYY-MM-DD, durch Kommas getrennt) | leer |
| Anzeigeformat | Datumsformat in der Bestellung | d.m.Y (l) |

## So funktioniert es

1. An der Kasse erscheint ein Feld mit einem Kalendersymbol
2. Der Kunde klickt und waehlt ein Datum aus flatpickr
3. Gesperrte Tage (Wochenenden, Feiertage) sind ausgegraut
4. Das Datum wird serverseitig validiert
5. Es wird in den Bestell-Metadaten gespeichert (`_polski_delivery_date`)

## Wo das Datum sichtbar ist

- Admin-Bereich (unter der Versandadresse)
- Seite mit Bestelldetails (Mein Konto)
- Bestell-E-Mails (HTML und Klartext)

## Umgang mit Feiertagen

Um Feiertage zu sperren (z. B. Weihnachten, Ostern), fuege die Daten im Format YYYY-MM-DD durch Kommas getrennt hinzu:

```
2026-12-25,2026-12-26,2026-04-05,2026-04-06,2026-05-01,2026-05-03
```

## WooCommerce Blocks

Das Modul unterstuetzt auch die blockbasierte WooCommerce-Kasse. Das Datum wird ueber die Store API in `extensions.polski-pro.delivery_date` uebergeben.
