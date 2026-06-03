---
title: Kundenanalyse (Customer Insights)
description: Dokumentation des Customer-Insights-Moduls in Polski PRO for WooCommerce - RFM-Segmentierung, Kundenwert CLV, Analyse-Dashboard und Handlungsempfehlungen.
---

Das Customer-Insights-Modul bietet eine fortgeschrittene Analyse des Kundenstamms mithilfe der RFM-Segmentierung (Recency, Frequency, Monetary). Das Dashboard zeigt Schluesselkennzahlen, Kundensegmente und Empfehlungen fuer Marketingmassnahmen.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## So funktioniert es

1. Das Plugin analysiert die Bestellhistorie aller Kunden
2. Fuer jeden Kunden werden drei RFM-Kennzahlen berechnet:
   - **Recency (R)** - wie viele Tage seit der letzten Bestellung vergangen sind
   - **Frequency (F)** - die Gesamtzahl der Bestellungen
   - **Monetary (M)** - der Gesamtwert der Bestellungen
3. Auf Basis der Kennzahlen wird der Kunde einem von 7 Segmenten zugeordnet
4. Die Ergebnisse werden fuer 1 Stunde im Transient zwischengespeichert

## Dashboard

Gehe zu **WooCommerce > Kundenanalyse**, um das Dashboard zu oeffnen.

### Uebersichtskarten

Oben im Dashboard werden vier Kennzahlen angezeigt:

| Kennzahl | Beschreibung |
|---------|------|
| Gesamtzahl der Kunden | Alle Kunden mit mindestens einer Bestellung |
| Durchschnittlicher CLV | Durchschnittlicher Kundenwert ueber den gesamten Lebenszyklus (Customer Lifetime Value) |
| Durchschnittliche Bestellanzahl | Durchschnittliche Anzahl Bestellungen pro Kunde |
| Abwanderungsrisiko | Anteil der Kunden ohne Bestellung in den letzten 30 Tagen |

### RFM-Segmente

Das Modul klassifiziert Kunden in 7 Segmente:

| Segment | Merkmale | Empfehlung |
|---------|----------------|--------------|
| Champions | Hohes R, F und M - kaufen haeufig, viel und vor kurzem | Mit exklusiven Angeboten belohnen, VIP-Programm anbieten |
| Loyal | Hohes F - kaufen regelmaessig | Zusatzverkauf (Upselling), Abonnements anbieten |
| Potential Loyal | Mittleres F, hohes R - haben vor kurzem mehrfach gekauft | Zu weiteren Kaeufen anregen, Loyalitaet aufbauen |
| New Customers | Hohes R, niedriges F - neuer Kunde mit 1-2 Bestellungen | Begruessen, Rabatt auf weitere Kaeufe anbieten |
| At Risk | Niedriges R, hohes F - kauften frueher haeufig, jetzt nicht mehr | Reaktivierungskampagne, nach dem Grund fragen |
| Hibernating | Niedriges R, mittleres F - haben lange nicht gekauft | Aggressives Win-back-Angebot, zeitlich begrenzte Rabatte |
| Lost | Sehr niedriges R, niedriges F - einmalige Kunden von vor langer Zeit | Letzter Kontaktversuch oder aus aktiven Kampagnen entfernen |

### Segmenttabelle

Das Dashboard zeigt eine Tabelle, die jedes Segment zusammenfasst:

| Spalte | Beschreibung |
|---------|------|
| Segment | Name des Segments mit farbiger Markierung |
| Anzahl der Kunden | Anzahl der Kunden im Segment |
| Anteil % | Prozentualer Anteil des Segments am gesamten Stamm |
| Durchschnittlicher Umsatz | Durchschnittlicher Bestellwert der Kunden im Segment |
| Durchschnittliche Bestellanzahl | Durchschnittliche Anzahl Bestellungen pro Kunde im Segment |
| Empfehlung | Empfohlene Marketingmassnahme |

### Top-Kunden

Unterhalb der Segmenttabelle wird eine Liste der wertvollsten Kunden (Top Customers) angezeigt, absteigend sortiert nach dem Gesamtwert der Bestellungen. Die Tabelle enthaelt:

- Vor- und Nachname des Kunden
- E-Mail-Adresse
- RFM-Segment
- Anzahl der Bestellungen
- Gesamtwert der Bestellungen
- Datum der letzten Bestellung

## Leistung

Das Modul verwendet direkte SQL-Abfragen anstelle von WP_Query, um eine optimale Leistung bei grossen Kundenstaemmen zu erzielen:

- Die Abfragen werden auf den WooCommerce-Bestelltabellen ausgefuehrt
- Die Datenaggregation erfolgt auf Datenbankebene
- Die Ergebnisse werden fuer 1 Stunde im WordPress-Transient zwischengespeichert
- Transient-Schluessel: `polski_pro_customer_insights`
- Ablaufzeit: 3600 Sekunden

## Modul aktivieren

Das Modul wird ueber einen Schalter in den Einstellungen der PRO-Module gesteuert:

```
WooCommerce > Einstellungen > Polski PRO > Module > Customer Insights
```

Nach dem Aktivieren des Moduls erscheint der Menuepunkt **Kundenanalyse** automatisch im WooCommerce-Menue.

<div class="disclaimer">Diese Seite dient ausschliesslich zu Informationszwecken und stellt keine Rechtsberatung dar. Polski PRO for WooCommerce ist kommerzielle Software, die ohne Gewaehrleistung bereitgestellt wird.</div>
