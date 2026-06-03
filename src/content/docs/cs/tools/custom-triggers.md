---
title: Vlastní spouštěče
description: Odesílejte vlastní události dataLayer v Polski for WooCommerce na základě URL adresy stránky nebo kliknutí, volitelně podmíněné souhlasem s danou kategorií.
---

Vlastní spouštěče jsou volitelný modul, který umožňuje odesílat vlastní události do datové vrstvy `window.dataLayer` (té samé, kterou používá modul GA4 DataLayer), když je splněna jednoduchá podmínka na frontendu obchodu. Díky tomu můžete modelovat události specifické pro váš obchod, například návštěvu konkrétní stránky nebo kliknutí na vybrané tlačítko, bez psaní vlastního kódu JavaScript.

Každý spouštěč odesílá pojmenovanou událost (s volitelnými dodatečnými parametry), která míří do té samé datové vrstvy jako události GA4. Další zpracování (např. předání do Google Tag Manageru, Meta Pixel, TikTok nebo Matomo) závisí na vaší konfiguraci tagů. Jde o nástroje, které pomáhají modelovat vlastní události, nikoli o záruku konkrétního právního ani analytického efektu.

## Zapnutí modulu

Modul je **ve výchozím nastavení vypnutý**. Zapněte jej v **WooCommerce > Polski > Moduly** (klíč modulu `custom_triggers`). Po zapnutí a definování alespoň jednoho platného spouštěče modul načítá lehký kontroler na frontendu obchodu. Pokud je seznam spouštěčů prázdný, nepřidává se žádný skript. Kontroler nefunguje v administračním panelu.

## Jak spouštěče fungují

Spouštěč je vyhodnocován v prohlížeči návštěvníka. Dostupné jsou dva typy podmínek:

| Podmínka   | Co spustí událost                                                          |
| ---------- | --------------------------------------------------------------------------- |
| `page_url` | Aktuální cesta nebo parametry URL obsahují zadaný fragment textu.            |
| `click`    | Kliknutí na prvek odpovídající zadanému CSS selektoru.                       |

Každý spouštěč musí mít nastavený název události, jinak je přeskočen. Pokud typ podmínky není nastaven na `click`, modul jej považuje za `page_url`.

## Nastavení spouštěče

Každý řádek v seznamu spouštěčů popisují následující pole:

| Pole       | Popis                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------- |
| Událost    | Název události odesílané do `dataLayer`. Pole je vyžadováno, prázdné spouštěče jsou přeskočeny. |
| Podmínka   | `page_url` nebo `click`. Výchozí je `page_url`.                                                |
| Hodnota    | Fragment textu porovnávaný s cestou/parametry URL (pro podmínku `page_url`).                   |
| Selektor   | CSS selektor prvku, jehož kliknutí spustí událost (pro podmínku `click`).                      |
| Kategorie  | Kategorie souhlasu podmiňující odeslání události. Výchozí je `necessary` (nezbytné).           |
| Parametry  | Volitelné dodatečné parametry události (páry klíč-hodnota, pouze skalární hodnoty).            |

Seznam spouštěčů je uložen jako data zakódovaná v JSON ve volbě `polski_custom_triggers` (klíč `triggers`). Jako parametry jsou zachovány pouze skalární hodnoty, ostatní jsou zahozeny.

## Podmínění souhlasem

Odeslání dat do vrstvy `dataLayer` je first-party činnost, nicméně každému spouštěči lze přiřadit kategorii souhlasu. Kontroler na frontendu odešle spouštěč s přiřazenou kategorií teprve tehdy, když návštěvník udělil souhlas s touto kategorií (uloženou v souboru cookie souhlasu). Spouštěče v kategorii `necessary` (nezbytné) jsou odesílány vždy.

Kontroler znovu kontroluje stav souhlasu po události `polskiConsentChange`, takže změna rozhodnutí návštěvníka (např. přijetí marketingu v banneru) je zohledněna bez načtení stránky. Díky tomu můžete například propojit marketingovou konverzní událost s marketingovým souhlasem.

Pokud přiřazená kategorie není platnou kategorií souhlasu, modul ji vrátí na `necessary`. Názvy cookie, události a nezbytné kategorie kontroler načítá z modulu Správce souhlasu, takže podmínění souhlasem funguje konzistentně s bannerem souhlasu.

Modul poskytuje nástroje pro podmínění událostí souhlasem, nepředstavuje však právní poradenství ani nezaručuje soulad s předpisy. Za správné zařazení událostí vůči kategoriím souhlasu odpovídá vlastník obchodu.

## Integrace s datovou vrstvou

Spouštěče využívají tu samou vrstvu `window.dataLayer` jako modul GA4 DataLayer. Aby byly události přijímány a dále zpracovávány, musí tato datová vrstva existovat na stránce. Samotný modul pouze odesílá události do vrstvy, o jejich dalším osudu rozhoduje vaše konfigurace tagů a analytických nástrojů.

## Řešení problémů

**Události se neobjevují v dataLayer** - ujistěte se, že modul je zapnutý, je definován alespoň jeden spouštěč s názvem události a že na stránce existuje vrstva `window.dataLayer` (modul GA4 DataLayer).

**Spouštěč `click` nereaguje** - zkontrolujte CSS selektor. Musí odpovídat existujícímu prvku na stránce.

**Spouštěč s kategorií jinou než nezbytnou nefunguje** - událost bude odeslána teprve po udělení souhlasu s přiřazenou kategorií. Zkontrolujte konfiguraci Správce souhlasu a rozhodnutí návštěvníka.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
