---
title: Vlastne integracie
description: Pridavajte vlastne fragmenty kodu v hlavicke alebo paticke obchodu v Polski for WooCommerce, s priradenou kategoriou suhlasu, ktore sa spustia az po udeleni suhlasu navstevnika.
---

Vlastne integracie su volitelny modul, ktory umoznuje vlozit vase vlastne fragmenty kodu (snippety) do hlavicky alebo paticky obchodu. Kazdy fragment dostane priradenu kategoriu suhlasu a je emitovany cez branu Spravcu suhlasov, takze sa spusti az vtedy, ked navstevnik udeli suhlas s danou kategoriou. Vdaka tomu sa kody nastrojov ako Meta Pixel, TikTok, Matomo ci Google Consent Mode nacitaju sposobom, ktory respektuje volbu pouzivatela.

Kod dodavate sami. Doplnok nevykonava ziadne HTTP poziadavky z urovne PHP a neobsahuje natvrdo ziadne externe adresy. Su to nastroje, ktore pomahaju zodpovedne nacitavat vase vlastne snippety, nepredstavuju pravne poradenstvo ani samy o sebe nezarucuju ziadny konkretny pravny ucinok.

## Zapnutie modulu

Modul je **predvolene vypnuty**. Zapnite ho v **WooCommerce > Polski > Moduly** (sekcia "Vlastne integracie"). Po zapnuti sa fragmenty vkladaju na frontende obchodu, nikdy nie v administracnom paneli. Sprava nastaveni vyzaduje opravnenie `manage_woocommerce`.

## Ako to funguje

Kazdy fragment je "branovany" cez Spravcu suhlasov. Namiesto okamzite spustitelneho skriptu sa na stranke objavi placeholder, ktory front-end Spravcu suhlasov zmeni na funkcny skript az po udeleni suhlasu s pasujucou kategoriou. Fragmenty s kategoriou "Nevyhnutne" sa spustaju vzdy.

| Prvok              | Spravanie                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Miesto emisie      | Fragmenty z hlavicky idu do `wp_head`, z paticky do `wp_footer` (priorita 30).              |
| Iba frontend       | Fragmenty sa nikdy nevkladaju v administracnom paneli.                                       |
| Brana suhlasu      | Kazdy fragment prechadza branou Spravcu suhlasov a caka na suhlas pre svoju kategoriu.       |
| Nevyhnutne         | Fragmenty s kategoriou "Nevyhnutne" funguju vzdy, bez cakania na suhlas.                      |
| Ziadna prevadzka z PHP | Doplnok neposiela ziadne HTTP poziadavky zo servera, nacitava sa vylucne vas kod.       |

## Polia fragmentu

Zoznam fragmentov je opakovatelny, mozete pridat lubovolny ich pocet. Kazdy riadok ma nasledujuce polia:

| Pole              | Popis                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------- |
| Popisok           | Citatelny nazov fragmentu, pomaha ho rozpoznat v zozname. Volitelny.                           |
| Umiestnenie       | `head` (hlavicka) alebo `footer` (paticka). Predvolene paticka.                               |
| Kategoria suhlasu | Kategoria zo Spravcu suhlasov, ktora musi byt akceptovana, aby sa fragment spustil. Nerozpoznana hodnota sa povazuje za "Nevyhnutne". |
| Kod               | Samotny fragment kodu. Riadky s prazdnym kodom sa preskakuju.                                  |

### Spracovanie kodu

Ak je vas fragment obaleny v jedinom znacke `<script>...</script>`, jeho vnutro sa extrahuje a odovzda brane ako obsah skriptu. Ak vkladate samotny kod JavaScript bez znacky, povazuje sa za telo inline skriptu. Vsetok kod nachadzajuci sa mimo znacky `<script>` sa preskakuje, do brany sa dostane iba obsah skriptu (do momentu udelenia suhlasu placeholder ostava typu `text/plain`).

## Nastavenia

Nastavenia sa nachadzaju na karte modulu v **WooCommerce > Polski > Moduly**. Zoznam fragmentov je ulozeny ako jedno opakovatelne nastavenie.

| Nastavenie            | Predvolene | Popis                                                                |
| --------------------- | --------- | -------------------------------------------------------------------- |
| Zoznam fragmentov     | (prazdny) | Opakovatelny zoznam snippetov (popisok, umiestnenie, kategoria, kod). |

## Riesenie problemov

**Fragment sa nespusta** - skontrolujte, ci navstevnik udelil suhlas s kategoriou priradenou k tomuto fragmentu. Fragmenty ine ako "Nevyhnutne" cakaju na suhlas. Uistite sa tiez, ze Spravca suhlasov je aktivny.

**Fragment sa neobjavuje v kode stranky** - uistite sa, ze pole kodu nie je prazdne a ze modul je zapnuty. Fragmenty sa nevkladaju v administracnom paneli, kontrolujte ich na frontende obchodu.

**Cast kodu mizne** - do brany sa dostane vylucne obsah skriptu. Znacky a kod mimo jedineho `<script>...</script>` sa preskakuju. Vlozte kod JavaScript alebo ho obalte do jednej znacky `<script>`.

Nahlasovanie problemov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stranka ma vylucne informacny charakter a nepredstavuje pravne poradenstvo. Pred nasadenim sa poradte s pravnikom. Polski for WooCommerce je open source softver (GPLv2) poskytovany bez zaruky.</div>
