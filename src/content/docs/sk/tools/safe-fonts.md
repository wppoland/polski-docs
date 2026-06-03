---
title: Bezpecne pisma
description: Obmedzovanie a oddialenie externych poziadaviek na Google Fonts v Polski for WooCommerce, aby sa znizili posuny rozlozenia a pozdrzal sa harok pisiem az do udelenia suhlasu.
---

Bezpecne pisma su volitelny modul, ktory znizuje a kontroluje externe poziadavky na Google Fonts odosielane vasou sablonou alebo doplnkami. Funguje na kazdom harku stylov (`<link>`), ktoreho adresa smeruje na `fonts.googleapis.com`, a ponuka dve nezavisle spravania, ktore mozno zapnut samostatne: optimalizaciu nacitavania a pozdrzanie harku az do udelenia suhlasu.

Modul poskytuje nastroje na obmedzovanie a oddialenie poziadaviek na tretie strany. Nie je pravnym poradenstvom a sam o sebe nezarucuje ziadny konkretny pravny ucinok. Plny hosting suborov pisiem na vlastnom serveri nepatri do rozsahu tejto verzie modulu, modul obmedzuje a kontroluje externe volania, neprenasa samotne subory.

## Zapnutie modulu

Modul je **predvolene vypnuty**. Zapnite ho v **WooCommerce > Polski > Moduly** (kluc modulu `safe_fonts`). Po zapnuti funguje iba na frontende obchodu, administracny panel sa preskakuje. Ak modul nedokaze rozpoznat alebo prepisat danu znacku, vrati ju bez zmeny, takze pisma vzdy funguju dalej (jemna degradacia).

## Rezimy fungovania

| Rezim                      | Co robi                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| Optimalizacia              | Pridava `display=swap` k adrese Google Fonts, ak chyba, a emituje podpovede `preconnect` pre `fonts.googleapis.com` a (s `crossorigin`) `fonts.gstatic.com`. Znizuje posuny rozlozenia a naklady na spojenie bez zmeny toho, co sa nacitava. |
| Pozdrzanie do suhlasu      | Prepisuje znacku `<link>` Google Fonts na vypnuty zastupny odkaz (so skutocnou adresou v atribute `data`). Drobny kontroler ho znovu zapne az vtedy, ked navstevnik udeli vybranu kategoriu suhlasu. Do toho casu sa externa poziadavka nevykonava. |

Oba rezimy su nezavisle. Mozete zapnut len jeden, oba naraz alebo ziadny.

### Optimalizacia

Po zapnuti optimalizacie modul:

- dopisuje `display=swap` k adrese harku Google Fonts, pokial v nej nie je explicitna hodnota `display`. Adresy mimo Google Fonts ostavaju nedotknute.
- vypisuje v `<head>` dve podpovede `preconnect`: pre `https://fonts.googleapis.com` a pre `https://fonts.gstatic.com` (s atributom `crossorigin`).

Toto spravanie neblokuje ziadne poziadavky, iba znizuje posuny rozlozenia a naklady na nadviazanie spojenia.

### Pozdrzanie do suhlasu

Po zapnuti tohto rezimu modul zameni znacku Google Fonts za vypnuty harok (`disabled`, `media="print"`, `href="about:blank"`), ktory nic nestahuje. Skutocna adresa sa dostane do atributu `data-polski-safefont` a vybrana kategoria suhlasu do `data-polski-consent`. Maly kontroler na frontende zapne harok az vtedy, ked navstevnik udeli nakonfigurovanu kategoriu suhlasu, a reaguje na udalost `polskiConsentChange` zo Spravcu suhlasov.

Pre istotu sa zachovava aj variant `<noscript>` s povodnou znackou, vdaka comu sa pisma nacitaju aj pri vypnutom JavaScripte. Kontroler sa pripaja iba vtedy, ked sa v danej poziadavke skutocne pozdrzal nejaky harok pisiem.

Tento rezim spolupracuje s modulom **Spravca suhlasov** (kategoria suhlasu a udalost zmeny suhlasu pochadzaju z tohto modulu). Aby malo pozdrzanie zmysel, kategoria suhlasu musi byt realne vynucovana na strane navstevnika.

## Nastavenia

Nastavenia sa nachadzaju na karte modulu v **WooCommerce > Polski > Moduly**.

| Nastavenie               | Predvolene    | Popis                                                                |
| ------------------------ | ------------- | -------------------------------------------------------------------- |
| Optimalizacia            | zapnute       | Pridava `display=swap` a podpovede `preconnect` pre hosty Google Fonts. |
| Pozdrzanie do suhlasu    | vypnute       | Pozdrzava harok Google Fonts az do udelenia vybranej kategorie suhlasu. |
| Kategoria suhlasu        | Preferencie   | Kategoria suhlasu vyzadovana na nacitanie pisiem pri pozdrzani.      |

## Jemna degradacia

Ak sa znacka neda sparsovat alebo bezpecne zrekonstruovat (napriklad nie je standardnym odkazom `rel="stylesheet"`), modul ju vrati bez zmeny. Znamena to, ze nepodporovane pripady nepokazia vzhlad stranky a pisma sa nacitaju tak ako predtym.

## Riesenie problemov

**Pisma sa nenacitavaju po zapnuti pozdrzania** - skontrolujte, ci navstevnik udelil vybranu kategoriu suhlasu a ci je modul Spravca suhlasov aktivny. Do udelenia suhlasu harok ostava vypnuty.

**`display=swap` sa neobjavuje** - tyka sa vylucne adries smerujucich na `fonts.googleapis.com` a iba ked adresa este nema explicitnu hodnotu `display`.

**Pisma nacitavane lokalne zo sablony sa nemenia** - modul funguje iba na externych poziadavkach na Google Fonts. Lokalne hostovane pisma nie su podporovane.

Nahlasovanie problemov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stranka ma vylucne informacny charakter a nepredstavuje pravne poradenstvo. Pred nasadenim sa poradte s pravnikom. Polski for WooCommerce je open source softver (GPLv2) poskytovany bez zaruky.</div>
