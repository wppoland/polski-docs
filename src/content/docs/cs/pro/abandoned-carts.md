---
title: Obnova opuštěných košíků
description: Modul automatického sledování, obnovy a analýzy opuštěných košíků WooCommerce v Polski PRO.
---

Modul opuštěných košíků sleduje aktivní košíky WooCommerce, detekuje opuštění a automaticky odesílá obnovovací e-maily s odkazem na obnovení košíku jedním kliknutím.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Jak to funguje

1. Zákazník přidá produkty do košíku - systém začne košík sledovat
2. Pokud zákazník opustí obchod a nevrátí se po dobu 1 hodiny - košík je označen jako **opuštěný**
3. Systém odešle až 3 obnovovací e-maily (po 1h, 24h a 72h)
4. Zákazník klikne na odkaz v e-mailu - košík je obnoven s produkty a kupony
5. Pokud zákazník dokončí objednávku - košík je označen jako **zkonvertovaný** nebo **obnovený**

## Konfigurace

Přejděte na **Polski PRO > Moduly** a zapněte modul **Opuštěné košíky**.

### Obecná nastavení

| Nastavení | Popis | Výchozí |
|------------|------|-----------|
| Timeout opuštění | Po jakém čase (sekundy) považovat košík za opuštěný | 3600 (1h) |
| Obnovovací e-maily | Zapnout/vypnout automatické e-maily | Ano |
| Čištění dat | Po kolika dnech odstranit staré košíky | 90 |
| Skrýt IP | Neukládat IP adresy zákazníků (GDPR) | Ne |

### Nastavení e-mailů

Každý ze 3 e-mailů má konfigurovatelné:

| Pole | E-mail 1 | E-mail 2 | E-mail 3 |
|------|---------|---------|---------|
| Zpoždění | 1 hodina | 24 hodin | 72 hodin |
| Předmět | Zapomněli jste na svůj košík? | Váš košík stále čeká | Poslední šance |
| Obsah | Konfigurovatelný | Konfigurovatelný | Konfigurovatelný |

E-maily obsahují:
- Souhrn produktů v košíku (obrázky, názvy, množství, ceny)
- Celkovou hodnotu košíku
- Tlačítko CTA s obnovovacím odkazem

## Stavy košíků

| Stav | Popis |
|--------|------|
| Active | Zákazník aktivně prochází obchod |
| Abandoned | Zákazník opustil obchod a nevrátil se po timeoutu |
| Converted | Zákazník odeslal objednávku (bez obnovovacího e-mailu) |
| Recovered | Zákazník se vrátil přes obnovovací odkaz a odeslal objednávku |

## Panel administrátora

Panel je dostupný v **WooCommerce > Abandoned Carts**.

### Záložka: Seznam košíků

- Filtrování podle stavu
- Sloupce: ID, e-mail, stav, produkty, hodnota, poslední aktivita, odeslané e-maily
- Detail košíku: úplný seznam produktů, obnovovací odkaz, údaje zákazníka
- Akce: **Vytvořit objednávku z košíku** (pro opuštěné)

### Záložka: Analytika

Metriky:
- **Celkový počet košíků** - všechny sledované košíky
- **Míra opuštění** - % košíků, které byly opuštěny
- **Míra konverze** - % košíků, které se proměnily v objednávky
- **Míra obnovy** - % opuštěných košíků obnovených prostřednictvím e-mailů
- **Obnovené tržby** - celková hodnota objednávek z obnovených košíků

## Obnovovací odkaz

Každý opuštěný košík má jedinečný 32znakový klíč obnovy. Odkaz:

```
https://vasobchod.cz/kosik/?recover_cart={klic}
```

Po kliknutí:
1. Aktuální košík je vyprázdněn
2. Produkty z opuštěného košíku jsou přidány
3. Kupony jsou obnoveny
4. Zákazník je přesměrován na pokladnu
5. Košík změní stav na **recovered**

## Plánovač (Cron)

Modul používá vlastní cron spouštěný každých 15 minut (`polski_abandoned_cart_cron`):

1. Označí košíky jako opuštěné (po timeoutu)
2. Odešle obnovovací e-maily (dle plánu)
3. Odstraní staré košíky (po X dnech)

## GDPR / Soukromí

- Možnost skrytí IP adres zákazníků
- Automatické čištění starých dat (konfigurovatelné)
- Obnovovací e-maily lze globálně vypnout
- Data košíku jsou odstraněna při odinstalaci pluginu (pokud je zapnuta možnost mazání dat)

## Databáze

Modul vytváří dvě tabulky:

- `wp_polski_carts` - data košíků (stav, hodnota, e-mail, klíč obnovy)
- `wp_polski_cart_contents` - snapshoty obsahu (JSON s historií změn)

Tabulky se vytvářejí automaticky při migraci 1.8.0.
