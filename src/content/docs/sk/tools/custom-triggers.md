---
title: Vlastne spustace
description: Posielajte vlastne udalosti dataLayer v Polski for WooCommerce na zaklade adresy URL stranky alebo kliknutia, volitelne podmienene suhlasom s danou kategoriou.
---

Vlastne spustace su volitelny modul, ktory umoznuje posielat vlastne udalosti do datovej vrstvy `window.dataLayer` (tej istej, ktoru pouziva modul GA4 DataLayer), ked je splnena jednoducha podmienka na frontende obchodu. Vdaka tomu mozete modelovat udalosti specificke pre vas obchod, napriklad navstevu konkretnej stranky alebo kliknutie na vybrane tlacidlo, bez pisania vlastneho kodu JavaScript.

Kazdy spustac posiela pomenovanu udalost (s volitelnymi dodatocnymi parametrami), ktora sa dostane do tej istej datovej vrstvy ako udalosti GA4. Dalsie spracovanie (napr. odovzdanie do Google Tag Managera, Meta Pixel, TikTok ci Matomo) zavisi od vasej konfiguracie tagov. Su to nastroje, ktore pomahaju modelovat vlastne udalosti, nie zaruka konkretneho pravneho ani analytickeho ucinku.

## Zapnutie modulu

Modul je **predvolene vypnuty**. Zapnite ho v **WooCommerce > Polski > Moduly** (kluc modulu `custom_triggers`). Po zapnuti a definovani aspon jedneho spravneho spustaca, modul nacita lahky kontroler na frontende obchodu. Ak je zoznam spustacov prazdny, ziadny skript sa nepridava. Kontroler nefunguje v administracnom paneli.

## Ako funguju spustace

Spustac je vyhodnocovany v prehliadaci navstevnika. Dostupne su dva typy podmienok:

| Podmienka  | Co spusta udalost                                                          |
| ---------- | --------------------------------------------------------------------------- |
| `page_url` | Aktualna cesta alebo parametre URL obsahuju zadany fragment textu.          |
| `click`    | Kliknutie na prvok zodpovedajuci zadanemu CSS selektoru.                     |

Kazdy spustac musi mat nastaveny nazov udalosti, inak sa preskoci. Ak typ podmienky nie je nastaveny na `click`, modul ho povazuje za `page_url`.

## Nastavenia spustaca

Kazdy riadok v zozname spustacov popisuju nasledujuce polia:

| Pole       | Popis                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------- |
| Udalost    | Nazov udalosti posielanej do `dataLayer`. Pole povinne, prazdne spustace sa preskakuju.       |
| Podmienka  | `page_url` alebo `click`. Predvolene `page_url`.                                               |
| Hodnota    | Fragment textu porovnavany s cestou/parametrami URL (pre podmienku `page_url`).               |
| Selektor   | CSS selektor prvku, ktoreho kliknutie spusta udalost (pre podmienku `click`).                 |
| Kategoria  | Kategoria suhlasu podmienujuca odoslanie udalosti. Predvolene `necessary` (nevyhnutne).       |
| Parametre  | Volitelne dodatocne parametre udalosti (pary kluc-hodnota, iba skalarne hodnoty).             |

Zoznam spustacov je ulozeny ako data zakodovane v JSON v moznosti `polski_custom_triggers` (kluc `triggers`). Ako parametre sa zachovavaju iba skalarne hodnoty, ostatne sa odmietaju.

## Podmienenie suhlasom

Odoslanie udajov do vrstvy `dataLayer` je first-party cinnost, no kazdemu spustacu je mozne priradit kategoriu suhlasu. Kontroler na frontende posle spustac s priradenou kategoriou az vtedy, ked navstevnik udelil suhlas s touto kategoriou (ulozenou v cookie suhlasu). Spustace v kategorii `necessary` (nevyhnutne) sa posielaju vzdy.

Kontroler znovu kontroluje stav suhlasu po udalosti `polskiConsentChange`, takze zmena rozhodnutia navstevnika (napr. akceptacia marketingu v baneri) sa zohladnuje bez prenacitania stranky. Vdaka tomu mozete napriklad zviazat marketingovu konverznu udalost s marketingovym suhlasom.

Ak priradena kategoria nie je platnou kategoriou suhlasu, modul ju vrati na `necessary`. Nazvy cookie, udalosti a nevyhnutnej kategorie kontroler nacita z modulu Spravcu suhlasov, takze podmienenie suhlasom funguje konzistentne s banerom suhlasu.

Modul poskytuje nastroje na podmienenie udalosti suhlasom, nepredstavuje vsak pravne poradenstvo ani nezarucuje sulad s predpismi. Za spravnu klasifikaciu udalosti voci kategoriam suhlasu zodpoveda vlastnik obchodu.

## Integracia s datovou vrstvou

Spustace vyuzivaju tu istu vrstvu `window.dataLayer` ako modul GA4 DataLayer. Aby boli udalosti prijimane a dalej spracovane, tato datova vrstva musi existovat na stranke. Samotny modul iba posiela udalosti do vrstvy a o ich dalsom osude rozhoduje vasa konfiguracia tagov a analytickych nastrojov.

## Riesenie problemov

**Udalosti sa neobjavuju v dataLayer** - uistite sa, ze modul je zapnuty, ze je definovany aspon jeden spustac s nazvom udalosti a ze na stranke existuje vrstva `window.dataLayer` (modul GA4 DataLayer).

**Spustac `click` nereaguje** - skontrolujte CSS selektor. Musi zodpovedat existujucemu prvku na stranke.

**Spustac s kategoriou inou ako nevyhnutna nefunguje** - udalost sa posle az po udeleni suhlasu s priradenou kategoriou. Skontrolujte konfiguraciu Spravcu suhlasov a rozhodnutie navstevnika.

Nahlasovanie problemov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stranka ma vylucne informacny charakter a nepredstavuje pravne poradenstvo. Pred nasadenim sa poradte s pravnikom. Polski for WooCommerce je open source softver (GPLv2) poskytovany bez zaruky.</div>
