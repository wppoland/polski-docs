---
title: Správce tagů
description: Sjednocený správce marketingových a analytických tagů řízený souhlasem v Polski for WooCommerce, do kterého zadáváte vlastní identifikátory a každý tag se spustí až po udělení souhlasu.
---

Správce tagů je volitelný modul, který na jednom místě spravuje oblíbené marketingové pixely a analytické nástroje. Místo vkládání snippetů do šablony zapnete potřebné poskytovatele a zadáte vlastní sledovací identifikátor nebo doménu. Nic není napevno zakódováno a plugin nikdy neodesílá žádný HTTP požadavek na straně PHP, každý tag je malý fragment kódu na straně prohlížeče přidávaný na stránku.

Nejdůležitější: každý tag prochází Správcem souhlasu a je zabalen do prvku `<script type="text/plain" data-polski-consent="KATEGORIE">`. Skript se spustí až ve chvíli, kdy návštěvník udělí souhlas s odpovídající kategorií. Reklamní a remarketingové pixely jsou hradlovány kategorií `marketing`, zatímco měřicí nástroje a tepelné mapy kategorií `analytics`.

Toto jsou nástroje, které pomáhají načítat tagy třetích stran odpovědným způsobem. Nepředstavují právní poradenství a samy o sobě nezaručují soulad s žádnými předpisy.

## Zapnutí modulu

Modul je **ve výchozím nastavení vypnutý**. Zapněte jej v **WooCommerce > Polski > Moduly** (sekce "Správce tagů"). Po zapnutí najdete nastavení jednotlivých poskytovatelů na kartě modulu. Tag daného poskytovatele se objeví na frontendu až tehdy, když jsou splněny tři podmínky: modul je zapnutý, poskytovatel je zaškrtnutý a je zadán jeho identifikátor (s výjimkou Simple Analytics, který identifikátor nevyžaduje).

## Co zde není podporováno

GA4 a Google Tag Manager zde záměrně **nejsou** podporovány v tomto modulu. Jsou podporovány v modulu **GA4 DataLayer** spolu s e-commerce událostmi WooCommerce, aby se předešlo dvojímu načítání stejných skriptů.

## Podporovaní poskytovatelé

Každý poskytovatel má vlastní přepínač zapnout/vypnout a pole pro identifikátor. Kategorie souhlasu rozhoduje o tom, kdy se tag může spustit.

### Kategorie marketing

| Poskytovatel                      | Pole identifikátoru |
| --------------------------------- | ------------------- |
| Meta Pixel                        | Pixel ID            |
| TikTok Pixel                      | Pixel ID            |
| Microsoft Advertising (Bing UET)  | UET Tag ID          |
| LinkedIn Insight                  | Partner ID          |
| Pinterest Tag                     | Tag ID              |
| X / Twitter Ads                   | Pixel ID            |
| Google Ads                        | AW-XXXXXXXXX        |

### Kategorie analytics

| Poskytovatel      | Pole identifikátoru |
| ----------------- | ------------------- |
| Microsoft Clarity | Project ID          |
| Matomo            | Site ID (a URL adresa instance Matomo) |
| Plausible         | Doména (např. example.com) |
| PostHog           | Project API key     |
| Hotjar            | Site ID             |
| Inspectlet        | WID                 |
| Crazy Egg         | Account ID          |
| Simple Analytics  | bez identifikátoru (stačí přepínač) |

## Fungování a pořadí načítání

- Tagy se vypisují v hlavičce stránky pomocí `wp_head` (priorita 20), tedy po Google Consent Mode a modulu DataLayer.
- Hotjar se inicializuje lépe těsně před `</body>`, takže je vypisován v patičce pomocí `wp_footer`.
- Tagy se nikdy nevypisují v administračním panelu, fungují výhradně na frontendu obchodu.
- Matomo vyžaduje jak Site ID, tak URL adresu instance Matomo. Bez URL adresy se tag nevypíše.
- Crazy Egg vyžaduje numerické Account ID o délce alespoň 8 číslic, jinak se tag nevypíše.

## Hradlování souhlasem

Hradlování souhlasem funguje společně s modulem **Správce souhlasu**, který poskytuje vrstvu souhlasu a načítá volby návštěvníka. Dokud návštěvník neudělí souhlas s kategorií `marketing` nebo `analytics`, zabalené skripty zůstávají neaktivní a nenačítají žádný kód třetí strany. Po udělení souhlasu začnou příslušné tagy fungovat.

Pamatujte, že správná konfigurace souhlasu závisí na vašem právním kontextu. Plugin poskytuje technický mechanismus a rozhodnutí o tom, které tagy a kategorie používáte, činíte sami.

## Řešení problémů

**Tag se neobjevuje** - zkontrolujte, zda je modul zapnutý, poskytovatel zaškrtnutý a pole identifikátoru vyplněné. Pro Matomo je vyžadována také URL adresa instance.

**Tag je v kódu stránky, ale nic nepočítá** - to je očekávané chování, dokud návštěvník neudělí souhlas s odpovídající kategorií ve Správci souhlasu. Skript typu `text/plain` se spustí až po souhlasu.

**Hledám GA4 nebo GTM** - jsou v modulu GA4 DataLayer, ne zde.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
