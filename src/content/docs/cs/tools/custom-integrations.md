---
title: Vlastní integrace
description: Přidávejte vlastní fragmenty kódu do hlavičky nebo patičky obchodu v Polski for WooCommerce s přiřazenou kategorií souhlasu, které se spustí až po udělení souhlasu návštěvníkem.
---

Vlastní integrace jsou volitelný modul, který umožňuje vložit vaše vlastní fragmenty kódu (snippety) do hlavičky nebo patičky obchodu. Každý fragment dostane přiřazenou kategorii souhlasu a je vysílán bránou Správce souhlasu, takže se spustí teprve tehdy, když návštěvník udělí souhlas s danou kategorií. Díky tomu se kódy nástrojů jako Meta Pixel, TikTok, Matomo nebo Google Consent Mode načítají způsobem, který respektuje volbu uživatele.

Kód dodáváte sami. Plugin neprovádí žádné HTTP požadavky z úrovně PHP a neobsahuje napevno žádné externí adresy. Jde o nástroje, které pomáhají odpovědně načítat vaše vlastní snippety, nepředstavují právní poradenství ani samy o sobě nezaručují žádný konkrétní právní efekt.

## Zapnutí modulu

Modul je **ve výchozím nastavení vypnutý**. Zapněte jej v **WooCommerce > Polski > Moduly** (sekce "Vlastní integrace"). Po zapnutí jsou fragmenty vkládány na frontendu obchodu, nikdy v administračním panelu. Správa nastavení vyžaduje oprávnění `manage_woocommerce`.

## Jak to funguje

Každý fragment je "bránován" Správcem souhlasu. Místo okamžitě spustitelného skriptu se na stránce objeví placeholder, který frontend Správce souhlasu nahradí funkčním skriptem teprve po udělení souhlasu s odpovídající kategorií. Fragmenty s kategorií "Nezbytné" se spouštějí vždy.

| Prvek              | Chování                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Místo vysílání     | Fragmenty z hlavičky míří do `wp_head`, z patičky do `wp_footer` (priorita 30).             |
| Pouze frontend     | Fragmenty se nikdy nevkládají v administračním panelu.                                       |
| Brána souhlasu     | Každý fragment prochází bránou Správce souhlasu a čeká na souhlas pro svou kategorii.        |
| Nezbytné           | Fragmenty s kategorií "Nezbytné" fungují vždy, bez čekání na souhlas.                        |
| Žádný provoz z PHP | Plugin neodesílá žádné HTTP požadavky ze serveru, načítá se výhradně váš kód.                |

## Pole fragmentu

Seznam fragmentů je opakovatelný, můžete jich přidat libovolné množství. Každý řádek má následující pole:

| Pole              | Popis                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------- |
| Popisek           | Čitelný název fragmentu, pomáhá jej rozpoznat v seznamu. Volitelný.                            |
| Umístění          | `head` (hlavička) nebo `footer` (patička). Výchozí je patička.                                 |
| Kategorie souhlasu | Kategorie ze Správce souhlasu, která musí být přijata, aby se fragment spustil. Nerozpoznaná hodnota je považována za "Nezbytné". |
| Kód               | Samotný fragment kódu. Řádky s prázdným kódem jsou přeskočeny.                                  |

### Zpracování kódu

Pokud je váš fragment obalen jedinou značkou `<script>...</script>`, jeho vnitřek je extrahován a předán bráně jako obsah skriptu. Pokud vkládáte samotný kód JavaScript bez značky, je považován za tělo inline skriptu. Veškerý kód mimo značku `<script>` je přeskočen, do brány se dostane pouze obsah skriptu (do okamžiku udělení souhlasu zůstává placeholder typu `text/plain`).

## Nastavení

Nastavení se nachází na kartě modulu v **WooCommerce > Polski > Moduly**. Seznam fragmentů je uložen jako jedno opakovatelné nastavení.

| Nastavení             | Výchozí   | Popis                                                                |
| --------------------- | --------- | -------------------------------------------------------------------- |
| Seznam fragmentů      | (prázdný) | Opakovatelný seznam snippetů (popisek, umístění, kategorie, kód).    |

## Řešení problémů

**Fragment se nespouští** - zkontrolujte, zda návštěvník udělil souhlas s kategorií přiřazenou k tomuto fragmentu. Fragmenty jiné než "Nezbytné" čekají na souhlas. Ujistěte se také, že Správce souhlasu je aktivní.

**Fragment se neobjevuje v kódu stránky** - ujistěte se, že pole kódu není prázdné a že modul je zapnutý. Fragmenty se nevkládají v administračním panelu, kontrolujte je na frontendu obchodu.

**Část kódu mizí** - do brány se dostane výhradně obsah skriptu. Značky a kód mimo jedinou `<script>...</script>` jsou přeskočeny. Vložte kód JavaScript nebo jej obalte jednou značkou `<script>`.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
