---
title: Správce souhlasů
description: Nativní banner souhlasu s cookies s kategoriemi, podporou Google Consent Mode v2, podmíněným načítáním skriptů a iframe a rejstříkem souhlasů s exportem CSV v Polski for WooCommerce.
---

Správce souhlasů je volitelný modul, který do obchodu přidává nativní banner souhlasu s cookies s kategoriemi, signály Google Consent Mode v2 a rejstříkem učiněných rozhodnutí. Jiné moduly mohou "bránit" svým skriptům a rámcům iframe, aby se spustily až poté, co návštěvník udělí odpovídající souhlas.

Modul poskytuje nástroje, které pomáhají sbírat a respektovat volby týkající se souhlasů. Sám o sobě nezaručuje žádný konkrétní právní účinek a nenahrazuje právní poradenství.

## Zapnutí modulu

Modul je **ve výchozím stavu vypnutý**. Zapněte ho v **WooCommerce > Polski > Moduly** (sekce "Správce souhlasů", klíč modulu `consent_manager`). Po zapnutí se banner objeví v patičce obchodu a v administraci se zpřístupní zobrazení **Rejstřík souhlasů**. Toto zobrazení i export CSV vyžadují oprávnění `manage_woocommerce`.

## Kategorie souhlasů

Banner využívá pevnou sadu kategorií. Kategorie "Nezbytné" je vždy zapnutá a nelze ji vypnout. Zbývající tři jsou volitelné a návštěvník je může zapnout nebo vypnout.

| Kategorie   | Klíč         | Výchozí | Popis                                                              |
| ----------- | ------------- | --------- | ----------------------------------------------------------------- |
| Nezbytné   | `necessary`   | vždy on | Vyžadované pro fungování obchodu. Vždy udělena, nelze vypnout. |
| Analytika   | `analytics`   | zapnutá  | Měření návštěvnosti a statistiky.                                        |
| Marketing   | `marketing`   | zapnutá  | Reklamy a remarketing.                                            |
| Preference | `preferences` | zapnutá  | Personalizace a funkce zapamatovávající volby.                    |

Ve výchozím stavu jsou všechny tři volitelné kategorie v banneru aktivní. Každou z nich můžete vypnout v nastavení modulu, pokud ji obchod nevyužívá.

## Google Consent Mode v2

Když je podpora Google Consent Mode zapnutá (výchozí), modul vypíše výchozí stav souhlasů ještě před kódem gtag/GTM (v `wp_head` s prioritou 0). Všechny signály startují jako **odmítnuté** (`denied`), s výjimkou `security_storage`, a poté jsou okamžitě aktualizovány na základě uloženého cookie, pokud návštěvník již provedl volbu. Díky tomu gtag/GTM vidí správný stav od prvního volání.

Kategorie banneru se mapují na signály Consent Mode takto:

| Kategorie   | Signály Consent Mode v2                                  |
| ----------- | -------------------------------------------------------- |
| Analytika   | `analytics_storage`                                      |
| Marketing   | `ad_storage`, `ad_user_data`, `ad_personalization`       |
| Preference | `functionality_storage`, `personalization_storage`       |

Po provedení volby návštěvníkem banner volá `gtag('consent', 'update', ...)` s aktuálním stavem.

## Podmíněné načítání skriptů a iframe

Modul poskytuje kontrakt, který umožňuje jiným modulům spouštět skripty a rámce iframe až po udělení odpovídající kategorie. Bráněný kód je vykreslen jako `<script type="text/plain" data-polski-consent="KATEGORIE">`, takže ho prohlížeč při načtení stránky nevykoná. Frontendový kontroler ho převede na vykonatelný skript až tehdy, když je kategorie udělena (ihned, pokud to cookie umožňuje, nebo po události `polskiConsentChange`).

Po změně volby banner:

- uloží cookie `polski_consent` se seznamem udělených kategorií,
- volá `gtag('consent', 'update', ...)`,
- emituje událost okna `polskiConsentChange`, na kterou reagují bráněné skripty,
- odešle rozhodnutí do REST registrátoru.

## Rejstřík souhlasů

Každé rozhodnutí uložené z banneru se dostane do rejstříku souhlasů. Je to zobrazení jen pro čtení, dostupné v administraci, když je modul zapnutý, sloužící k dokumentování voleb návštěvníků. Rejstřík nenahrazuje právní poradenství.

| Sloupec           | Popis                                                      |
| ----------------- | --------------------------------------------------------- |
| Datum              | Datum a čas uloženého rozhodnutí.                         |
| Kategorie         | Kategorie, které se rozhodnutí týká.                        |
| Rozhodnutí           | "Uděleno" nebo "Odmítnuto".                              |
| Uživatel        | ID uživatele nebo "Host" pro nepřihlášené.           |
| IP adresa          | IP adresa návštěvníka (pokud je dostupná).                 |
| Verze obsahu     | Otisk obsahu banneru, který návštěvník skutečně viděl. |

Každá uložená volba je provázána s verzí obsahu banneru (otiskem záhlaví, textu a seznamu kategorií), díky čemuž je známo, jaké přesně znění návštěvník akceptoval.

### Export CSV

Tlačítko **Exportovat CSV** stáhne kompletní rejstřík jako soubor CSV. Export obsahuje sloupce: `id`, `created_at`, `category`, `granted`, `user_id`, `ip_address`, `user_agent`, `consent_version`. Export vyžaduje oprávnění `manage_woocommerce` a je chráněn nonce.

## Nastavení

Nastavení se nacházejí na kartě modulu v **WooCommerce > Polski > Moduly**.

| Nastavení                  | Výchozí              | Popis                                                          |
| --------------------------- | ---------------------- | ------------------------------------------------------------- |
| Kategorie: Analytika        | zapnutá               | Zda je kategorie analytiky zobrazena v banneru.            |
| Kategorie: Marketing        | zapnutá               | Zda je kategorie marketingu zobrazena v banneru.           |
| Kategorie: Preference      | zapnutá               | Zda je kategorie preferencí zobrazena v banneru.          |
| Záhlaví                    | (prázdné)                | Volitelné záhlaví banneru.                                   |
| Obsah banneru                | výchozí text         | Hlavní text banneru (umožňuje základní HTML).              |
| Štítek "Přijmout vše"| "Accept all"           | Text tlačítka přijetí všeho.                       |
| Štítek "Odmítnout vše"  | "Reject all"           | Text tlačítka odmítnutí volitelných kategorií.            |
| Štítek "Spravovat"        | "Manage"               | Text tlačítka otevírajícího výběr kategorií.                |
| Štítek "Uložit volby"    | "Save choices"         | Text tlačítka uložení vybraných kategorií.                   |
| Pozice                     | dole                    | Umístění banneru: nahoře, dole nebo uprostřed.                       |
| Google Consent Mode         | zapnutý               | Zda vypisovat signály Google Consent Mode v2.                 |

## Řešení problémů

**Banner se neobjevuje** - ujistěte se, že je modul zapnutý v **WooCommerce > Polski > Moduly** a že motiv volá `wp_footer()`. Banner je vykreslen v patičce.

**Tagy Google nereagují na souhlas** - zkontrolujte, zda je možnost Google Consent Mode zapnutá a zda se kód gtag/GTM načítá po signálech Consent Mode (vypisují se velmi brzy v `wp_head`).

**Bráněný skript se nespustí** - skript startuje až po udělení odpovídající kategorie. Ověřte, že návštěvník udělil kategorii a že byl skript vyemitován kontraktem bránění.

Nahlašování problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
