---
title: Produkt-Feed (Ceneo, Google Merchant)
description: Erzeugung von XML-Feeds für polnische Preisvergleichsportale und Google Merchant Center.
---

Das Modul erzeugt Produkt-Feeds im XML-Format, kompatibel mit Ceneo.pl, Nokaut.pl und Google Merchant Center.

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski PRO > Produkt-Feed**.

| Einstellung | Beschreibung | Standard |
|------------|------|-----------|
| Aktiviert | Aktiviert die Erzeugung von Feeds | Nein |
| Plattformen | Ceneo, Nokaut, Google Merchant | Ceneo |
| Varianten | Varianten als separate Angebote exportieren | Nein |
| Beschreibung | Produktbeschreibung zum Feed hinzufügen | Ja |
| Nicht verfügbare ausschließen | Produkte ohne Lagerbestand überspringen | Ja |

## Feed-URLs

Nach Aktivierung des Moduls sind folgende URLs verfügbar:

| Plattform | URL |
|-----------|-----|
| Ceneo | `twojsklep.pl/polski-feed/ceneo.xml` |
| Nokaut | `twojsklep.pl/polski-feed/nokaut.xml` |
| Google Merchant | `twojsklep.pl/polski-feed/google.xml` |

:::tip
Nach Aktivierung des Moduls gehen Sie zu **Einstellungen > Permalinks** und klicken auf "Speichern", um die URL-Regeln zu erneuern.
:::

## Struktur des Ceneo-Feeds

```xml
<offers version="1">
  <group name="Kategoria">
    <o id="123" url="..." price="49.99" avail="1" weight="0.5">
      <name><![CDATA[Nazwa produktu]]></name>
      <desc><![CDATA[Opis produktu]]></desc>
      <cat><![CDATA[Kategoria > Podkategoria]]></cat>
      <images>
        <image url="..."/>
      </images>
      <attrs>
        <a name="EAN" value="1234567890123"/>
        <a name="Producent" value="Marka"/>
      </attrs>
    </o>
  </group>
</offers>
```

## Zuordnung der Ceneo-Kategorien

In der Bearbeitung der WooCommerce-Produktkategorie steht das Feld **Ceneo-Kategorie** zur Verfügung, in das der Ceneo-Kategoriepfad eingetragen werden kann (z. B. "Elektronika > Smartfony").

## Produkte ausschließen

In der Bearbeitung des WooCommerce-Produkts steht das Feld **Aus Feeds ausschließen** zur Verfügung, aktivieren Sie die Checkbox, damit das Produkt in keinem Feed erscheint.

## Attribute im Feed

Der Feed exportiert automatisch:
- **EAN** - aus der SKU des Produkts
- **Hersteller** - aus dem Feld GPSR Manufacturer
- **Produktattribute** - alle in WooCommerce definierten

## Cache und Regeneration

Feeds werden 6 Stunden lang gecacht. Die automatische Regeneration erfolgt täglich über den Cron `polski_daily_maintenance`. Beim ersten Zugriff wird der Feed on-the-fly erzeugt.

Cache-Dateien: `wp-content/uploads/polski-feeds/`
