---
title: Prognose der Lagerbestaende
description: Dokumentation des Moduls zur Prognose der Lagerbestaende in Polski PRO for WooCommerce - Vorhersage der Bestandserschoepfung, Dashboard mit Statuskarten und vorgeschlagene Bestellmengen.
---

Das Modul zur Prognose der Lagerbestaende analysiert die Verkaufsgeschwindigkeit der letzten 90 Tage und sagt das Datum der Bestandserschoepfung fuer jedes Produkt voraus. Das Dashboard ermoeglicht es, Produkte, die nachbestellt werden muessen, schnell zu identifizieren.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## So funktioniert es

1. Das Plugin ruft die Verkaufsdaten der letzten 90 Tage ab (Bestellungen mit Status completed und processing)
2. Es berechnet den durchschnittlichen Tagesverkauf (Sales Velocity) fuer jedes Produkt
3. Auf Basis des aktuellen Lagerbestands und des durchschnittlichen Verkaufs sagt es das Erschoepfungsdatum voraus
4. Die Produkte werden nach Dringlichkeit der Nachbestellung klassifiziert
5. Die Ergebnisse werden fuer 1 Stunde im Transient zwischengespeichert

## Dashboard

Gehe zu **WooCommerce > Lagerprognose**, um das Prognose-Dashboard zu oeffnen.

### Uebersichtskarten

Oben im Dashboard werden drei Statuskarten angezeigt:

| Karte | Bedingung | Farbe |
|-------|---------|-------|
| Kritisch | Erschoepfung innerhalb von 7 Tagen | Rot |
| Warnung | Erschoepfung innerhalb von 30 Tagen | Gelb |
| Gesund | Erschoepfung in 30+ Tagen | Gruen |

Jede Karte zeigt die Anzahl der Produkte in der jeweiligen Kategorie.

### Produkttabelle

Unterhalb der Karten wird eine Tabelle mit Details zu jedem Produkt angezeigt:

| Spalte | Beschreibung |
|---------|------|
| Produkt | Produktname mit Link zur Bearbeitung |
| Aktueller Bestand | Aktuelle Menge im Lager |
| Durchschnittlicher Tagesverkauf | Durchschnittliche Anzahl verkaufter Stueck pro Tag (aus 90 Tagen) |
| Tage bis zur Erschoepfung | Geschaetzte Anzahl der Tage bis zum Nullbestand |
| Prognostiziertes Datum | Vorhergesagtes Datum der Bestandserschoepfung |
| Vorgeschlagene Bestellung | Empfohlene Bestellmenge (Abdeckung fuer 30 Tage) |

Die Tabelle ist standardmaessig nach der Spalte "Tage bis zur Erschoepfung" (aufsteigend) sortiert, sodass die Produkte, die am schnellsten nachbestellt werden muessen, oben stehen.

### Vorgeschlagene Bestellmenge

Die vorgeschlagene Bestellmenge wird nach folgender Formel berechnet:

```
vorgeschlagene_bestellung = durchschnittlicher_tagesverkauf * 30
```

Dieser Wert entspricht der Menge, die den Bedarf fuer 30 Tage deckt.

## Spalte in der Produktliste

Das Modul fuegt in der Produktliste (**Produkte > Alle Produkte**) eine Spalte **Prognose** hinzu. Die Spalte zeigt die geschaetzte Anzahl der Tage bis zur Bestandserschoepfung mit einem farbigen Indikator:

- Rot (kritisch): weniger als 7 Tage
- Gelb (Warnung): 7-30 Tage
- Gruen (gesund): mehr als 30 Tage

Produkte ohne Bestandsverfolgung oder mit deaktivierter Bestandsverwaltung zeigen keine Prognose an.

## Datenquelle

Die Verkaufsdaten werden direkt aus der Datenbank mittels einer SQL-Abfrage auf folgenden Tabellen abgerufen:

- `{prefix}woocommerce_order_items` - Bestellpositionen
- `{prefix}woocommerce_order_itemmeta` - Metadaten der Positionen (Menge, product_id)

Beruecksichtigt werden ausschliesslich Bestellungen mit Status `wc-completed` und `wc-processing` aus den letzten 90 Tagen.

## Cache

Die Prognoseergebnisse werden im WordPress-Transient-Cache mit einer Lebensdauer von 1 Stunde gespeichert:

- Transient-Schluessel: `polski_pro_inventory_forecast`
- Ablaufzeit: 3600 Sekunden (1 Stunde)
- Der Cache wird nach Ablauf automatisch aktualisiert

So lassen sich langsame SQL-Abfragen bei jedem Laden des Dashboards vermeiden.

## Modul aktivieren

Das Modul wird ueber einen Schalter gesteuert:

```
WooCommerce > Einstellungen > Polski PRO > Module > inventory_forecast
```

Nach dem Aktivieren des Moduls erscheint der Menuepunkt **Lagerprognose** automatisch im WooCommerce-Menue.

<div class="disclaimer">Diese Seite dient ausschliesslich zu Informationszwecken und stellt keine Rechtsberatung dar. Polski PRO for WooCommerce ist kommerzielle Software, die ohne Gewaehrleistung bereitgestellt wird.</div>
