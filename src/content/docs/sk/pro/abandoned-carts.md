---
title: Obnovenie opustených košíkov
description: Modul automatického sledovania, obnovenia a analýzy opustených košíkov WooCommerce v Polski PRO.
---

Modul opustených košíkov sleduje aktívne košíky WooCommerce, deteguje opustenia a automaticky odosiela obnovovacie e-maily s odkazom na obnovenie košíka jedným kliknutím.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Ako to funguje

1. Zákazník pridá produkty do košíka, systém začne sledovať košík
2. Ak zákazník opustí obchod a nevráti sa do 1 hodiny, košík sa označí ako **opustený**
3. Systém odošle až 3 obnovovacie e-maily (po 1 h, 24 h a 72 h)
4. Zákazník klikne na odkaz v e-maile, košík sa obnoví s produktmi a kupónmi
5. Ak zákazník dokončí objednávku, košík sa označí ako **skonvertovaný** alebo **obnovený**

## Konfigurácia

Prejdite do **Polski PRO > Moduly** a zapnite modul **Opustené košíky**.

### Všeobecné nastavenia

| Nastavenie | Popis | Predvolené |
|------------|------|-----------|
| Časový limit opustenia | Po akom čase (sekundy) sa košík považuje za opustený | 3600 (1 h) |
| Obnovovacie e-maily | Zapnúť/vypnúť automatické e-maily | Áno |
| Čistenie dát | Po koľkých dňoch odstrániť staré košíky | 90 |
| Skryť IP | Neukladať IP adresy zákazníkov (GDPR) | Nie |

### Nastavenia e-mailov

Každý z 3 e-mailov má konfigurovateľné:

| Pole | E-mail 1 | E-mail 2 | E-mail 3 |
|------|---------|---------|---------|
| Oneskorenie | 1 hodina | 24 hodín | 72 hodín |
| Predmet | Zabudli ste na svoj košík? | Váš košík stále čaká | Posledná šanca |
| Obsah | Konfigurovateľný | Konfigurovateľný | Konfigurovateľný |

E-maily obsahujú:
- Zhrnutie produktov v košíku (fotky, názvy, množstvá, ceny)
- Celkovú hodnotu košíka
- CTA tlačidlo s obnovovacím odkazom

## Stavy košíkov

| Stav | Popis |
|--------|------|
| Active | Zákazník aktívne prehliada obchod |
| Abandoned | Zákazník opustil obchod a nevrátil sa po vypršaní limitu |
| Converted | Zákazník zadal objednávku (bez obnovovacieho e-mailu) |
| Recovered | Zákazník sa vrátil cez obnovovací odkaz a zadal objednávku |

## Panel administrátora

Panel dostupný v **WooCommerce > Abandoned Carts**.

### Záložka: Zoznam košíkov

- Filtrovanie podľa stavu
- Stĺpce: ID, e-mail, stav, produkty, hodnota, posledná aktivita, odoslané e-maily
- Podrobnosti košíka: úplný zoznam produktov, obnovovací odkaz, údaje zákazníka
- Akcia: **Vytvoriť objednávku z košíka** (pre opustené)

### Záložka: Analytika

Metriky:
- **Celkový počet košíkov** - všetky sledované košíky
- **Miera opustenia** - % košíkov, ktoré boli opustené
- **Miera konverzie** - % košíkov, ktoré sa premenili na objednávky
- **Miera obnovenia** - % opustených košíkov obnovených cez e-maily
- **Obnovený príjem** - celková hodnota objednávok z obnovených košíkov

## Obnovovací odkaz

Každý opustený košík má jedinečný 32-znakový obnovovací kľúč. Odkaz:

```
https://tvojobchod.sk/kosik/?recover_cart={kluc}
```

Po kliknutí:
1. Aktuálny košík sa vyčistí
2. Produkty z opusteného košíka sa pridajú
3. Kupóny sa obnovia
4. Zákazník je presmerovaný na pokladňu
5. Košík zmení stav na **recovered**

## Harmonogram (Cron)

Modul používa vlastný cron spúšťaný každých 15 minút (`polski_abandoned_cart_cron`):

1. Označí košíky ako opustené (po vypršaní limitu)
2. Odošle obnovovacie e-maily (podľa harmonogramu)
3. Odstráni staré košíky (po X dňoch)

## GDPR / Súkromie

- Možnosť skrytia IP adries zákazníkov
- Automatické čistenie starých dát (konfigurovateľné)
- Obnovovacie e-maily je možné globálne vypnúť
- Dáta košíka sa odstránia pri odinštalovaní doplnku (ak je zapnutá možnosť odstránenia dát)

## Databáza

Modul vytvára dve tabuľky:

- `wp_polski_carts` - dáta košíkov (stav, hodnota, e-mail, obnovovací kľúč)
- `wp_polski_cart_contents` - snímky obsahu (JSON s históriou zmien)

Tabuľky sa vytvárajú automaticky pri migrácii 1.8.0.
