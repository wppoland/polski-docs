---
title: Správca tagov
description: Jednotný správca marketingových a analytických tagov riadený súhlasom v Polski for WooCommerce, do ktorého zadávate vlastné identifikátory a každý tag sa spúšťa až po udelení súhlasu.
---

Správca tagov je voliteľný modul, ktorý na jednom mieste spravuje populárne marketingové pixely a analytické nástroje. Namiesto vkladania snippetov do šablóny zapnete potrebných poskytovateľov a zadáte vlastný sledovací identifikátor alebo doménu. Nič nie je natvrdo zakódované a plugin nikdy neodosiela žiadny HTTP dopyt na strane PHP, každý tag je malý fragment kódu na strane prehliadača pridaný na stránku.

Najdôležitejšie: každý tag prechádza cez Správcu súhlasov a je zabalený v elemente `<script type="text/plain" data-polski-consent="KATEGÓRIA">`. Skript sa spustí až vtedy, keď návštevník udelí súhlas pre zodpovedajúcu kategóriu. Reklamné a remarketingové pixely sú bránené kategóriou `marketing` a meracie nástroje a teplotné mapy kategóriou `analytics`.

Toto sú nástroje, ktoré pomáhajú načítavať tagy tretích strán zodpovedným spôsobom. Nepredstavujú právne poradenstvo a samy o sebe nezaručujú súlad so žiadnymi predpismi.

## Zapnutie modulu

Modul je **predvolene vypnutý**. Zapnite ho v **WooCommerce > Polski > Moduly** (sekcia "Správca tagov"). Po zapnutí nájdete nastavenia jednotlivých poskytovateľov na karte modulu. Tag daného poskytovateľa sa objaví na frontende až vtedy, keď sú splnené tri podmienky: modul je zapnutý, poskytovateľ je začiarknutý a je zadaný jeho identifikátor (s výnimkou Simple Analytics, ktorý identifikátor nevyžaduje).

## Čo tu nie je podporované

GA4 a Google Tag Manager **nie** sú v tomto module zámerne podporované. Sú podporované v module **GA4 DataLayer** spolu s e-commerce udalosťami WooCommerce, aby sa predišlo dvojitému načítaniu tých istých skriptov.

## Podporovaní poskytovatelia

Každý poskytovateľ má vlastný prepínač zapnúť/vypnúť a pole na identifikátor. Kategória súhlasu rozhoduje o tom, kedy sa tag môže spustiť.

### Kategória marketing

| Poskytovateľ                      | Pole identifikátora |
| --------------------------------- | ------------------- |
| Meta Pixel                        | Pixel ID            |
| TikTok Pixel                      | Pixel ID            |
| Microsoft Advertising (Bing UET)  | UET Tag ID          |
| LinkedIn Insight                  | Partner ID          |
| Pinterest Tag                     | Tag ID              |
| X / Twitter Ads                   | Pixel ID            |
| Google Ads                        | AW-XXXXXXXXX        |

### Kategória analytics

| Poskytovateľ      | Pole identifikátora |
| ----------------- | ------------------- |
| Microsoft Clarity | Project ID          |
| Matomo            | Site ID (a URL adresa inštancie Matomo) |
| Plausible         | Doména (napr. example.com) |
| PostHog           | Project API key     |
| Hotjar            | Site ID             |
| Inspectlet        | WID                 |
| Crazy Egg         | Account ID          |
| Simple Analytics  | bez identifikátora (stačí prepínač) |

## Fungovanie a poradie načítania

- Tagy sa vypisujú v hlavičke stránky pomocou `wp_head` (priorita 20), teda po Google Consent Mode a module DataLayer.
- Hotjar sa lepšie inicializuje tesne pred `</body>`, preto sa vypisuje v päte pomocou `wp_footer`.
- Tagy sa nikdy nevypisujú v administračnom paneli, fungujú výhradne na frontende obchodu.
- Matomo vyžaduje tak Site ID, ako aj URL adresu inštancie Matomo. Bez URL adresy sa tag nevypíše.
- Crazy Egg vyžaduje numerické Account ID s dĺžkou aspoň 8 číslic, inak sa tag nevypíše.

## Bránenie súhlasom

Bránenie súhlasom funguje spolu s modulom **Správca súhlasov**, ktorý poskytuje vrstvu súhlasu a načítava voľby návštevníka. Kým návštevník neudelí súhlas pre kategóriu `marketing` alebo `analytics`, zabalené skripty zostávajú neaktívne a nenačítavajú žiadny kód tretej strany. Po udelení súhlasu príslušné tagy začnú fungovať.

Pamätajte, že správna konfigurácia súhlasu závisí od vášho právneho kontextu. Plugin poskytuje technický mechanizmus a rozhodnutie o tom, ktoré tagy a kategórie použijete, robíte sami.

## Riešenie problémov

**Tag sa neobjavuje** - skontrolujte, či je modul zapnutý, poskytovateľ začiarknutý a pole identifikátora vyplnené. Pre Matomo je vyžadovaná aj URL adresa inštancie.

**Tag je v kóde stránky, ale nič nepočíta** - to je očakávané správanie, kým návštevník neudelí súhlas pre zodpovedajúcu kategóriu v Správcovi súhlasov. Skript typu `text/plain` sa spustí až po súhlase.

**Hľadám GA4 alebo GTM** - sú v module GA4 DataLayer, nie tu.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výhradne informačný charakter a nepredstavuje právne poradenstvo. Pred zavedením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
