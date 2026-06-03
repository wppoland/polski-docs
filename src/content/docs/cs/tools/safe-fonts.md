---
title: Bezpečné fonty
description: Omezení a odklad externích požadavků na Google Fonts v Polski for WooCommerce pro snížení posunů rozvržení a pozdržení stylu fontů do udělení souhlasu.
---

Bezpečné fonty jsou volitelný modul, který snižuje a kontroluje externí požadavky na Google Fonts odesílané vaší šablonou nebo pluginy. Funguje na každém stylu (`<link>`), jehož adresa směřuje na `fonts.googleapis.com`, a nabízí dvě nezávislá chování, která lze zapínat zvlášť: optimalizaci načítání a pozdržení stylu do okamžiku udělení souhlasu.

Modul poskytuje nástroje pro omezení a odklad požadavků na třetí strany. Nejde o právní poradenství a sám o sobě nezaručuje žádný konkrétní právní následek. Plný hosting souborů fontů na vlastním serveru není v rozsahu této verze modulu; modul omezuje a kontroluje externí volání, nepřenáší samotné soubory.

## Zapnutí modulu

Modul je **ve výchozím nastavení vypnutý**. Zapněte jej v **WooCommerce > Polski > Moduly** (klíč modulu `safe_fonts`). Po zapnutí funguje pouze na frontendu obchodu; administrační panel je vynechán. Pokud modul nedokáže rozpoznat nebo přepsat danou značku, vrátí ji beze změny, takže fonty vždy fungují dál (mírná degradace).

## Režimy fungování

| Režim                      | Co dělá                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| Optimalizace               | Přidá `display=swap` k adrese Google Fonts, pokud chybí, a vysílá nápovědy `preconnect` pro `fonts.googleapis.com` a (s `crossorigin`) `fonts.gstatic.com`. Snižuje posuny rozvržení a náklady na spojení, aniž by měnil to, co se načítá. |
| Pozdržení do souhlasu      | Přepíše značku `<link>` Google Fonts na vypnutý zástupný odkaz (se skutečnou adresou v atributu `data`). Drobný kontroler ji znovu zapne teprve tehdy, když návštěvník udělí vybranou kategorii souhlasu. Do té doby není externí požadavek proveden. |

Oba režimy jsou nezávislé. Můžete zapnout jen jeden, oba najednou nebo žádný.

### Optimalizace

Po zapnutí optimalizace modul:

- připíše `display=swap` k adrese stylu Google Fonts, pokud v ní není explicitní hodnota `display`. Adresy mimo Google Fonts zůstávají nedotčené.
- vypíše v `<head>` dvě nápovědy `preconnect`: pro `https://fonts.googleapis.com` a pro `https://fonts.gstatic.com` (s atributem `crossorigin`).

Toto chování neblokuje žádné požadavky, pouze snižuje posuny rozvržení a náklady na navázání spojení.

### Pozdržení do souhlasu

Po zapnutí tohoto režimu modul zamění značku Google Fonts za vypnutý styl (`disabled`, `media="print"`, `href="about:blank"`), který nic nestahuje. Skutečná adresa míří do atributu `data-polski-safefont` a vybraná kategorie souhlasu do `data-polski-consent`. Malý kontroler na frontendu zapne styl teprve tehdy, když návštěvník udělí nakonfigurovanou kategorii souhlasu, a reaguje na událost `polskiConsentChange` ze Správce souhlasu.

Pro jistotu je zachován i varianta `<noscript>` s původní značkou, díky čemuž se fonty načtou i při vypnutém JavaScriptu. Kontroler je připojen pouze tehdy, když byl v daném požadavku skutečně pozdržen nějaký styl fontů.

Tento režim spolupracuje s modulem **Správce souhlasu** (kategorie souhlasu a událost změny souhlasu pocházejí z tohoto modulu). Aby pozdržení mělo smysl, kategorie souhlasu musí být reálně vynucována na straně návštěvníka.

## Nastavení

Nastavení se nachází na kartě modulu v **WooCommerce > Polski > Moduly**.

| Nastavení                | Výchozí       | Popis                                                                |
| ------------------------ | ------------- | -------------------------------------------------------------------- |
| Optimalizace             | zapnuto       | Přidá `display=swap` a nápovědy `preconnect` pro hosty Google Fonts. |
| Pozdržení do souhlasu    | vypnuto       | Pozdrží styl Google Fonts do udělení vybrané kategorie souhlasu.     |
| Kategorie souhlasu       | Preference    | Kategorie souhlasu vyžadovaná pro načtení fontů při pozdržení.       |

## Mírná degradace

Pokud značku nelze parsovat nebo bezpečně rekonstruovat (například není standardním odkazem `rel="stylesheet"`), modul ji vrátí beze změny. To znamená, že nepodporované případy nepoškodí vzhled stránky a fonty se načtou tak jako dříve.

## Řešení problémů

**Fonty se nenačítají po zapnutí pozdržení** - zkontrolujte, zda návštěvník udělil vybranou kategorii souhlasu a zda je modul Správce souhlasu aktivní. Do udělení souhlasu zůstává styl vypnutý.

**`display=swap` se neobjevuje** - týká se výhradně adres směřujících na `fonts.googleapis.com` a pouze tehdy, když adresa již nemá explicitní hodnotu `display`.

**Fonty načítané lokálně ze šablony se nemění** - modul funguje pouze na externích požadavcích na Google Fonts. Lokálně hostované fonty nejsou podporovány.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
