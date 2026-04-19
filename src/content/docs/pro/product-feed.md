---
title: Feed produktowy (Ceneo, Google Merchant)
description: Generowanie feedow XML dla polskich porównywarek cenowych i Google Merchant Center.
---

Modul generuje feedy produktowe w formacie XML kompatybilne z Ceneo.pl, Nokaut.pl i Google Merchant Center.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Polski PRO > Feed produktowy**.

| Ustawienie | Opis | Domyslnie |
|------------|------|-----------|
| Wlaczony | Aktywuje generowanie feedow | Nie |
| Platformy | Ceneo, Nokaut, Google Merchant | Ceneo |
| Warianty | Eksportuj warianty jako osobne oferty | Nie |
| Opis | Dodaj opis produktu do feedu | Tak |
| Wyklucz niedostepne | Pomin produkty bez stanu magazynowego | Tak |

## URL-e feedow

Po wlaczeniu modulu dostepne sa nastepujace URL-e:

| Platforma | URL |
|-----------|-----|
| Ceneo | `twojsklep.pl/polski-feed/ceneo.xml` |
| Nokaut | `twojsklep.pl/polski-feed/nokaut.xml` |
| Google Merchant | `twojsklep.pl/polski-feed/google.xml` |

:::tip
Po wlaczeniu modulu przejdz do **Ustawienia > Bezposrednie odnośniki** i kliknij "Zapisz", aby odnowic reguly URL.
:::

## Struktura feedu Ceneo

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

## Mapowanie kategorii Ceneo

W edycji kategorii produktu WooCommerce dostepne jest pole **Kategoria Ceneo**, gdzie mozna wpisac sciezke kategorii Ceneo (np. "Elektronika > Smartfony").

## Wykluczanie produktow

W edycji produktu WooCommerce dostepne jest pole **Wyklucz z feedow** - zaznacz checkbox aby produkt nie pojawial sie w zadnym feedzie.

## Atrybuty w feedzie

Feed automatycznie eksportuje:
- **EAN** - ze SKU produktu
- **Producent** - z pola GPSR Manufacturer
- **Atrybuty produktu** - wszystkie zdefiniowane w WooCommerce

## Cache i regeneracja

Feedy sa cachowane na 6 godzin. Automatyczna regeneracja odbywa sie codziennie przez cron `polski_daily_maintenance`. Przy pierwszym dostepie feed jest generowany w locie.

Pliki cache: `wp-content/uploads/polski-feeds/`
