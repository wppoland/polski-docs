---
title: Monitor zdravia obchodu
description: Nepretržitý, pasívny monitoring kritických chýb, neúspešných platieb a anomálií predaja v Polski for WooCommerce, s e-mailovými a webhook upozorneniami.
---

Monitor zdravia obchodu je voliteľný modul, ktorý na pozadí sleduje prevádzkové signály obchodu a upozorní, keď niečo prestane fungovať. Na rozdiel od auditu obchodu (kontroly súladu na požiadanie) a registra incidentov (ručný denník) tento modul beží podľa harmonogramu a sám vyhodnocuje tri signály: kritické chyby na frontende, podiel neúspešných platieb a anomáliu predaja ("návštevnosť je, ale objednávky nie").

Detekcia je pasívna: modul sleduje skutočné udalosti WooCommerce a históriu objednávok. Nikdy nezadáva testovacie objednávky, takže nevytvára falošné objednávky ani nezaťažuje karty. Naopak, problém s platbou sa zistí až vtedy, keď naň narazí skutočný zákazník.

## Zapnutie modulu

Modul je **predvolene vypnutý**. Zapnite ho v **WooCommerce > Polski > Moduly** (sekcia "Zdravie obchodu"). Po zapnutí sa kontroly spúšťajú každých 5 minút cez WP-Cron. Pulpit nájdete v **WooCommerce > Polski > Správy a nástroje > Zdravie obchodu**. Vyžaduje oprávnenie `manage_woocommerce`.

## Senzory

| Senzor                   | Čo sleduje                                                                  |
| ------------------------ | --------------------------------------------------------------------------- |
| Kritické chyby (front)   | Fatálne chyby PHP na stránkach obchodu (handler `shutdown`). Chyby v paneli a crone sa preskakujú. Aktívne 15 minút od výskytu. |
| Pokladňa / platby        | Podiel neúspešných finalizácií za posledné 2 hodiny. Sleduje klasickú pokladňu, blokovú pokladňu (Store API) aj stav objednávky "neúspešná". |
| Anomália predaja         | Porovnáva počet objednávok za poslednú celú hodinu s typickým počtom pre rovnaký deň v týždni a hodinu za posledných 8 týždňov. Vyhodnocuje sa najviac raz za hodinu. |

### Stavy

| Stav       | Význam                                                  | Farba        |
| ---------- | ------------------------------------------------------- | ------------ |
| OK         | Všetko funguje v norme                                  | zelený       |
| Degradácia | Hodnoty prekročili prah, ale nie je to plný výpadok     | oranžový     |
| Výpadok    | Vážny problém (napr. kritická chyba alebo žiadny predaj)| červený      |

Celkový stav je najhorší stav spomedzi senzorov.

### Ako sa počítajú prahy

- **Pokladňa / platby:** upozornenie sa objaví, keď podiel neúspešných finalizácií dosiahne prah (predvolene 30 %). Pri prekročení 1,5-násobku prahu sa stav zmení z "Degradácia" na "Výpadok". Podiel sa ignoruje, kým sa nezaznamená minimálny počet finalizácií (predvolene 5).
- **Anomália predaja:** "Výpadok" sa hlási len vtedy, keď sa pre danú hodinu typicky objaví aspoň toľko objednávok, koľko je prah (predvolene 3), a v poslednej celej hodine nebola žiadna.

## Upozornenia

Keď sa stav zhorší oproti predchádzajúcej kontrole, modul odošle upozornenie. Pri pretrvávajúcom probléme sa upozornenie zopakuje až po uplynutí času stíšenia (predvolene 60 minút), aby sa predišlo upozorneniam každých 5 minút.

| Kanál   | Detaily                                                                   |
| ------- | ------------------------------------------------------------------------- |
| E-mail  | Odosielaný na adresu upozornení (predvolene e-mail administrátora obchodu). |
| Webhook | Voliteľný. Odosiela JSON payload `{"text": ...}` kompatibilný so Slack/Discord. |

Pri stave "Výpadok" sa záznam dostáva aj do **registra bezpečnostných incidentov**, ak je tento modul zapnutý, aby mala udalosť audítnu stopu popri ručne evidovaných incidentoch.

## Pulpit

Pulpit "Zdravie obchodu" zobrazuje celkový stav, čas poslednej kontroly (UTC) a tabuľku s každým senzorom, jeho stavom a detailom. Tlačidlo **Spustiť kontrolu teraz** vynúti okamžité vyhodnotenie. Keď stav nie je "OK", v paneli sa objaví príslušné upozornenie s odkazom na pulpit.

## Nastavenia

Nastavenia sú na karte modulu v **WooCommerce > Polski > Moduly**.

| Nastavenie                       | Predvolene              | Popis                                                             |
| -------------------------------- | ----------------------- | ----------------------------------------------------------------- |
| E-mailová adresa upozornení      | e-mail administrátora   | Kam posielať upozornenia o zdraví.                                |
| URL webhooku                     | (prázdne)               | Voliteľný JSON webhook (Slack/Discord).                           |
| Prah neúspešných platieb (%)     | 30                      | Upozorni, keď taký podiel finalizácií zlyhá za posledné 2 h.      |
| Minimálna vzorka finalizácií     | 5                       | Ignoruj podiel, kým nie je aspoň toľko finalizácií.               |
| Prah anomálie predaja            | 3                       | Upozorni len vtedy, keď je pre danú hodinu typicky toľko objednávok, a nie je žiadna. |
| Stíšenie upozornení (minúty)     | 60                      | Minimálny odstup medzi opakovanými upozorneniami pre pretrvávajúci problém. |

## REST API

```
GET /wp-json/polski/v1/store-health
```

Vracia aktuálny stav (celkový stav, senzory, čas kontroly). Vyžaduje oprávnenie `manage_woocommerce`.

## Riešenie problémov

**Upozornenia neprichádzajú** - skontrolujte konfiguráciu e-mailu WordPressu. Zvážte plugin SMTP (napr. WP Mail SMTP) namiesto predvoleného `wp_mail()`.

**Senzor pokladne ukazuje "nedostatok údajov"** - to je normálne pre obchody s malou návštevnosťou. Podiel sa vyhodnotí až po dosiahnutí minimálnej vzorky finalizácií.

**Anomália predaja nereaguje** - modul potrebuje históriu objednávok z predchádzajúcich týždňov pre danú hodinu. V novom obchode bude typická hodnota nízka a prah sa nedosiahne.

**Kontroly sa nespúšťajú** - WP-Cron beží pri návštevnosti na stránke. V obchodoch s malou návštevnosťou zvážte systémový cron (`wp-cron.php` spúšťaný cronom servera).

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výhradne informačný charakter a nepredstavuje právne poradenstvo. Pred zavedením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
