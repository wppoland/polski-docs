---
title: Monitor kondice obchodu
description: Průběžný, pasivní monitoring kritických chyb, neúspěšných plateb a anomálií prodeje v Polski for WooCommerce, s e-mailovými a webhook upozorněními.
---

Monitor kondice obchodu je volitelný modul, který na pozadí sleduje provozní signály obchodu a varuje, když něco přestane fungovat. Na rozdíl od auditu obchodu (kontroly souladu na vyžádání) a registru incidentů (ruční deník) tento modul pracuje podle harmonogramu a sám hodnotí tři signály: kritické chyby na frontendu, podíl neúspěšných plateb a anomálii prodeje ("provoz je, ale nejsou objednávky").

Detekce je pasivní: modul sleduje skutečné události WooCommerce a historii objednávek. Nikdy nezadává testovací objednávky, takže nevytváří falešné objednávky ani nezatěžuje karty. Naopak, problém s platbou je detekován až ve chvíli, kdy na něj narazí skutečný zákazník.

## Zapnutí modulu

Modul je **ve výchozím nastavení vypnutý**. Zapněte jej v **WooCommerce > Polski > Moduly** (sekce "Kondice obchodu"). Po zapnutí se kontroly spouštějí každých 5 minut přes WP-Cron. Pulpit najdete v **WooCommerce > Polski > Zprávy a nástroje > Kondice obchodu**. Vyžaduje oprávnění `manage_woocommerce`.

## Snímače

| Snímač                   | Co sleduje                                                                  |
| ------------------------ | --------------------------------------------------------------------------- |
| Kritické chyby (frontend)| Fatální chyby PHP na stránkách obchodu (handler `shutdown`). Chyby v panelu a cronu jsou vynechány. Aktivní 15 minut od výskytu. |
| Pokladna / platby        | Podíl neúspěšných dokončení za poslední 2 hodiny. Sleduje klasickou pokladnu, blokovou pokladnu (Store API) a stav objednávky "neúspěšná". |
| Anomálie prodeje         | Porovnává počet objednávek z poslední celé hodiny s typickým počtem pro stejný den v týdnu a hodinu za posledních 8 týdnů. Hodnoceno nejvýše jednou za hodinu. |

### Stavy

| Stav       | Význam                                                 | Barva        |
| ---------- | ------------------------------------------------------ | ------------ |
| OK         | Vše funguje v normě                                    | zelená       |
| Degradace  | Hodnoty překročily práh, ale nejde o úplný výpadek     | oranžová     |
| Výpadek    | Vážný problém (např. kritická chyba nebo žádný prodej) | červená      |

Celkový stav je nejhorší stav ze všech snímačů.

### Jak se počítají prahy

- **Pokladna / platby:** upozornění se objeví, když podíl neúspěšných dokončení dosáhne prahu (výchozí 30 %). Při překročení 1,5násobku prahu se stav změní z "Degradace" na "Výpadek". Podíl je ignorován, dokud není pozorován minimální počet dokončení (výchozí 5).
- **Anomálie prodeje:** "Výpadek" je hlášen pouze tehdy, když se pro danou hodinu typicky objevuje alespoň tolik objednávek, kolik činí práh (výchozí 3), a v poslední celé hodině nebyla žádná.

## Upozornění

Když se stav zhorší oproti předchozí kontrole, modul odešle upozornění. Při přetrvávajícím problému se upozornění opakuje až po uplynutí doby ztišení (výchozí 60 minut), aby se předešlo oznámením každých 5 minut.

| Kanál   | Detaily                                                                   |
| ------- | ------------------------------------------------------------------------- |
| E-mail  | Odesílán na adresu pro upozornění (výchozí e-mail administrátora obchodu).|
| Webhook | Volitelný. Odesílá JSON load `{"text": ...}` kompatibilní se Slack/Discord. |

Při stavu "Výpadek" se záznam zapíše také do **registru bezpečnostních incidentů**, pokud je tento modul zapnutý, aby měla událost auditní stopu vedle ručně evidovaných incidentů.

## Pulpit

Pulpit "Kondice obchodu" zobrazuje celkový stav, čas poslední kontroly (UTC) a tabulku s každým snímačem, jeho stavem a detailem. Tlačítko **Spustit kontrolu nyní** vynutí okamžité vyhodnocení. Když stav není "OK", v panelu se objeví příslušné oznámení s odkazem na pulpit.

## Nastavení

Nastavení se nacházejí na kartě modulu v **WooCommerce > Polski > Moduly**.

| Nastavení                        | Výchozí                 | Popis                                                             |
| -------------------------------- | ----------------------- | ----------------------------------------------------------------- |
| E-mailová adresa pro upozornění  | e-mail administrátora   | Kam odesílat upozornění o kondici.                               |
| URL webhooku                     | (prázdné)               | Volitelný JSON webhook (Slack/Discord).                          |
| Práh neúspěšných plateb (%)      | 30                      | Upozornění, když takový podíl dokončení selže za poslední 2 h.   |
| Minimální vzorek dokončení       | 5                       | Ignoruj podíl, dokud není alespoň tolik dokončení.               |
| Práh anomálie prodeje            | 3                       | Upozorni jen tehdy, když pro danou hodinu bývá tolik objednávek, a žádná není. |
| Ztišení upozornění (minuty)      | 60                      | Minimální odstup mezi opakovanými upozorněními pro trvající problém. |

## REST API

```
GET /wp-json/polski/v1/store-health
```

Vrací aktuální stav (celkový stav, snímače, čas kontroly). Vyžaduje oprávnění `manage_woocommerce`.

## Řešení problémů

**Upozornění nedorazí** - zkontrolujte konfiguraci e-mailu WordPressu. Zvažte SMTP plugin (např. WP Mail SMTP) místo výchozího `wp_mail()`.

**Snímač pokladny zobrazuje "nedostatečná data"** - to je normální pro obchody s malým provozem. Podíl se hodnotí až po dosažení minimálního vzorku dokončení.

**Anomálie prodeje nereaguje** - modul potřebuje historii objednávek z předchozích týdnů pro danou hodinu. V novém obchodě bude typická hodnota nízká a práh nebude dosažen.

**Kontroly se nespouštějí** - WP-Cron funguje při provozu na stránce. V obchodech s malým provozem zvažte systémový cron (`wp-cron.php` spouštěný serverovým cronem).

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
