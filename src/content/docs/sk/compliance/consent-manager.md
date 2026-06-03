---
title: Správca súhlasov
description: Natívny banner súhlasov so súbormi cookie s kategóriami, podporou Google Consent Mode v2, podmieneným načítavaním skriptov a prvkov iframe a registrom súhlasov s exportom CSV v Polski for WooCommerce.
---

Správca súhlasov je voliteľný modul, ktorý do obchodu pridáva natívny banner súhlasov so súbormi cookie s kategóriami, signálmi Google Consent Mode v2 a registrom prijatých rozhodnutí. Iné moduly môžu svoje skripty a prvky iframe "blokovať" tak, aby sa spustili až po vyjadrení príslušného súhlasu zo strany návštevníka.

Modul poskytuje nástroje, ktoré pomáhajú zbierať a rešpektovať voľby týkajúce sa súhlasov. Sám osebe nezaručuje žiadny konkrétny právny účinok a nenahrádza právne poradenstvo.

## Zapnutie modulu

Modul je **predvolene vypnutý**. Zapnite ho v ponuke **WooCommerce > Polski > Moduly** (sekcia "Správca súhlasov", kľúč modulu `consent_manager`). Po zapnutí sa banner zobrazí v päte obchodu a v administrácii sa sprístupní zobrazenie **Register súhlasov**. Toto zobrazenie aj export CSV vyžadujú oprávnenie `manage_woocommerce`.

## Kategórie súhlasov

Banner využíva pevnú sadu kategórií. Kategória "Nevyhnutné" je vždy zapnutá a nie je možné ju vypnúť. Zvyšné tri sú voliteľné a návštevník ich môže zapnúť alebo vypnúť.

| Kategória   | Kľúč          | Predvolene | Popis                                                             |
| ----------- | ------------- | ---------- | ----------------------------------------------------------------- |
| Nevyhnutné  | `necessary`   | vždy zap.  | Vyžadované na fungovanie obchodu. Vždy udelené, nedá sa vypnúť.    |
| Analytika   | `analytics`   | zapnutá    | Meranie návštevnosti a štatistiky.                                |
| Marketing   | `marketing`   | zapnutá    | Reklamy a remarketing.                                            |
| Preferencie | `preferences` | zapnutá    | Personalizácia a funkcie zapamätávajúce voľby.                    |

Predvolene sú všetky tri voliteľné kategórie v banneri aktívne. Každú z nich môžete vypnúť v nastaveniach modulu, ak ju obchod nevyužíva.

## Google Consent Mode v2

Keď je podpora Google Consent Mode zapnutá (predvolene), modul vypisuje predvolený stav súhlasov ešte pred kódom gtag/GTM (v `wp_head` s prioritou 0). Všetky signály začínajú ako **odmietnuté** (`denied`), s výnimkou `security_storage`, a následne sa okamžite aktualizujú na základe uloženého súboru cookie, ak už návštevník vykonal voľbu. Vďaka tomu gtag/GTM vidia správny stav už od prvého volania.

Kategórie bannera sa mapujú na signály Consent Mode nasledovne:

| Kategória   | Signály Consent Mode v2                                  |
| ----------- | -------------------------------------------------------- |
| Analytika   | `analytics_storage`                                      |
| Marketing   | `ad_storage`, `ad_user_data`, `ad_personalization`       |
| Preferencie | `functionality_storage`, `personalization_storage`       |

Po vykonaní voľby návštevníkom banner zavolá `gtag('consent', 'update', ...)` s aktuálnym stavom.

## Podmienené načítavanie skriptov a iframe

Modul poskytuje kontrakt, ktorý iným modulom umožňuje spúšťať skripty a prvky iframe až po udelení príslušnej kategórie. Blokovaný kód sa vykresľuje ako `<script type="text/plain" data-polski-consent="KATEGÓRIA">`, takže prehliadač ho pri načítaní stránky nevykonáva. Kontrolér frontendu ho premení na spustiteľný skript až vtedy, keď je kategória udelená (ihneď, ak to umožňuje súbor cookie, alebo po udalosti `polskiConsentChange`).

Po zmene voľby banner:

- ukladá súbor cookie `polski_consent` so zoznamom udelených kategórií,
- volá `gtag('consent', 'update', ...)`,
- vyvoláva udalosť okna `polskiConsentChange`, na ktorú reagujú blokované skripty,
- odosiela rozhodnutie do registrátora REST.

## Register súhlasov

Každé rozhodnutie uložené z bannera sa zapíše do registra súhlasov. Je to zobrazenie len na čítanie, dostupné v administrácii, keď je modul zapnutý, slúžiace na zdokumentovanie volieb návštevníkov. Register nenahrádza právne poradenstvo.

| Stĺpec            | Popis                                                     |
| ----------------- | --------------------------------------------------------- |
| Dátum             | Dátum a čas uloženého rozhodnutia.                        |
| Kategória         | Kategória, ktorej sa rozhodnutie týka.                    |
| Rozhodnutie       | "Udelené" alebo "Odmietnuté".                             |
| Používateľ        | ID používateľa alebo "Hosť" pre neprihlásených.           |
| IP adresa         | IP adresa návštevníka (ak je dostupná).                   |
| Verzia obsahu     | Skrátený obsah bannera, ktorý návštevník skutočne videl.  |

Každá uložená voľba je prepojená s verziou obsahu bannera (skrátením nadpisu, textu a zoznamu kategórií), takže je známe, aké presné znenie návštevník akceptoval.

### Export CSV

Tlačidlo **Exportovať CSV** stiahne celý register ako súbor CSV. Export obsahuje stĺpce: `id`, `created_at`, `category`, `granted`, `user_id`, `ip_address`, `user_agent`, `consent_version`. Export vyžaduje oprávnenie `manage_woocommerce` a je chránený pomocou nonce.

## Nastavenia

Nastavenia nájdete na karte modulu v ponuke **WooCommerce > Polski > Moduly**.

| Nastavenie                  | Predvolene             | Popis                                                         |
| --------------------------- | ---------------------- | ------------------------------------------------------------- |
| Kategória: Analytika        | zapnutá                | Či sa kategória analytiky zobrazuje v banneri.                |
| Kategória: Marketing        | zapnutá                | Či sa kategória marketingu zobrazuje v banneri.               |
| Kategória: Preferencie      | zapnutá                | Či sa kategória preferencií zobrazuje v banneri.              |
| Nadpis                      | (prázdne)              | Voliteľný nadpis bannera.                                     |
| Text bannera                | predvolený text        | Hlavný text bannera (umožňuje základný HTML).                 |
| Označenie "Prijať všetko"   | "Accept all"           | Text tlačidla na prijatie všetkého.                           |
| Označenie "Odmietnuť všetko"| "Reject all"           | Text tlačidla na odmietnutie voliteľných kategórií.           |
| Označenie "Spravovať"       | "Manage"               | Text tlačidla otvárajúceho výber kategórií.                   |
| Označenie "Uložiť voľby"    | "Save choices"         | Text tlačidla na uloženie vybraných kategórií.                |
| Pozícia                     | dole                   | Umiestnenie bannera: hore, dole alebo v strede.               |
| Google Consent Mode         | zapnutý                | Či sa majú vypisovať signály Google Consent Mode v2.          |

## Riešenie problémov

**Banner sa nezobrazuje** - uistite sa, že modul je zapnutý v ponuke **WooCommerce > Polski > Moduly** a že téma volá `wp_footer()`. Banner sa vykresľuje v päte.

**Tagy Google nereagujú na súhlas** - skontrolujte, či je možnosť Google Consent Mode zapnutá a či sa kód gtag/GTM načítava po signáloch Consent Mode (vypisujú sa veľmi skoro v `wp_head`).

**Blokovaný skript sa nespúšťa** - skript sa spustí až po udelení príslušnej kategórie. Overte, že návštevník kategóriu udelil a že skript bol vyemitovaný cez kontrakt blokovania.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
