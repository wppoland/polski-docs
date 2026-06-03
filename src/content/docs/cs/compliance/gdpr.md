---
title: GDPR - ochrana osobních údajů
description: Konfigurace souhlasů GDPR v Polski for WooCommerce - 7 zaškrtávacích políček, logování souhlasů, API shortcode a soulad s Nařízením o ochraně osobních údajů.
---

GDPR vyžaduje od obchodů získání výslovného souhlasu se zpracováním osobních údajů. Plugin přidává 7 konfigurovatelných zaškrtávacích políček na stránce objednávky, logování souhlasů a nástroje pro správu souhlasů.

## Vyžadované souhlasy v polském e-commerce

Internetový obchod by měl získávat souhlasy s:

1. Přijetím obchodních podmínek obchodu
2. Seznámením se zásadami ochrany osobních údajů
3. Právem na odstoupení od smlouvy (potvrzení seznámení)
4. Dodáním digitálního obsahu před uplynutím lhůty pro odstoupení
5. Oznámeními o dodání (SMS/e-mail)
6. Připomínkou recenze
7. Marketingem (newsletter, obchodní nabídky)

## Konfigurace zaškrtávacích políček

Přejděte do **WooCommerce > Nastavení > Polski > GDPR** a nakonfigurujte souhlasy.

### 1. Obchodní podmínky

Povinné zaškrtávací políčko odkazující na stránku obchodních podmínek.

| Nastavení | Popis |
|------------|------|
| Text | Konfigurovatelný, výchozí: "Seznámil/a jsem se s [obchodními podmínkami] a přijímám jejich podmínky" |
| Povinný | Ano (vždy) |
| Stránka podmínek | Vyberte ze stránek WordPress |

### 2. Zásady ochrany osobních údajů

Povinné zaškrtávací políčko odkazující na zásady ochrany osobních údajů.

| Nastavení | Popis |
|------------|------|
| Text | Výchozí: "Seznámil/a jsem se se [zásadami ochrany osobních údajů]" |
| Povinný | Ano (vždy) |
| Stránka zásad | Vyberte ze stránek WordPress |

### 3. Právo na odstoupení od smlouvy

Informace o seznámení s podmínkami odstoupení.

| Nastavení | Popis |
|------------|------|
| Text | Výchozí: "Seznámil/a jsem se s podmínkami [odstoupení od smlouvy]" |
| Povinný | Ano |
| Stránka odstoupení | Vyberte ze stránek WordPress |

### 4. Digitální obsah

Souhlas vyžadovaný při prodeji digitálního obsahu (např. e-knihy, soubory ke stažení).

| Nastavení | Popis |
|------------|------|
| Text | Výchozí: "Souhlasím s dodáním digitálního obsahu před uplynutím lhůty pro odstoupení od smlouvy a beru na vědomí ztrátu práva na odstoupení" |
| Povinný | Ano (když košík obsahuje digitální produkty) |
| Podmínka | Zobrazit pouze když košík obsahuje virtuální produkty nebo produkty ke stažení |

### 5. Oznámení o dodání

Souhlas s odesíláním oznámení SMS/e-mail o stavu zásilky.

| Nastavení | Popis |
|------------|------|
| Text | Výchozí: "Souhlasím s přijímáním oznámení o stavu dodání" |
| Povinný | Ne |
| Kanál | E-mail, SMS nebo oba |

### 6. Připomínka recenze

Souhlas s odesláním e-mailu s žádostí o napsání recenze po nákupu.

| Nastavení | Popis |
|------------|------|
| Text | Výchozí: "Souhlasím s přijetím e-mailu s žádostí o napsání recenze na zakoupený produkt" |
| Povinný | Ne |
| Zpoždění | Počet dnů po dodání (výchozí 7) |

### 7. Marketing

Souhlas s marketingovou komunikací.

| Nastavení | Popis |
|------------|------|
| Text | Výchozí: "Souhlasím s přijímáním obchodních informací elektronickou cestou" |
| Povinný | Ne |
| Rozsah | Newsletter, nabídky, akce |

## Logování souhlasů

Každý souhlas se zapisuje do databáze s údaji:

| Pole | Popis |
|------|------|
| ID uživatele | ID zákazníka WordPress (nebo 0 pro hosty) |
| ID objednávky | Číslo objednávky WooCommerce |
| Typ souhlasu | Identifikátor políčka (např. `terms`, `privacy`, `marketing`) |
| Hodnota | `granted` nebo `denied` |
| IP adresa | Anonymizovaná IP adresa zákazníka |
| User Agent | Prohlížeč a operační systém |
| Časové razítko | Datum a čas udělení souhlasu (UTC) |
| Verze dokumentu | Hash verze podmínek/zásad v okamžiku udělení souhlasu |

### Prohlížení logů souhlasů

Logy souhlasů jsou dostupné v:

- **Objednávka WooCommerce** - záložka "Souhlasy GDPR" v bočním panelu objednávky
- **Profil uživatele** - sekce "Historie souhlasů" v profilu zákazníka v administračním panelu
- **Export** - možnost exportu logů do CSV (**WooCommerce > Nastavení > Polski > GDPR > Exportovat logy**)

### Anonymizace IP

Plugin anonymizuje poslední oktet adresy IPv4 (např. `192.168.1.xxx`) a poslední skupinu IPv6. To zajišťuje soulad s GDPR a zachovává základní použitelnost logů.

## Shortcode API

### Zobrazení stavu souhlasů zákazníka

```
[polski_consent_status]
```

Ukáže přihlášenému zákazníkovi seznam souhlasů s možností jejich odvolání (např. marketingový souhlas).

### Formulář odvolání marketingového souhlasu

```
[polski_consent_withdraw type="marketing"]
```

Formulář pro odvolání marketingového souhlasu. Po odvolání plugin automaticky aktualizuje stav souhlasu v databázi.

### Parametry shortcode

| Parametr | Popis | Dostupné hodnoty |
|----------|------|-------------------|
| `type` | Typ souhlasu | `terms`, `privacy`, `withdrawal_right`, `digital_content`, `delivery_notifications`, `review_reminder`, `marketing` |

## Integrace s WooCommerce Blocks

Zaškrtávací políčka souhlasů fungují také s blokovým formulářem objednávky (WooCommerce Blocks Checkout). Není třeba nic konfigurovat.

## Právo být zapomenut

Plugin spolupracuje s nástrojem WordPress **Nástroje > Odstranit osobní údaje**. Po schválení žádosti o odstranění plugin automaticky:

1. Anonymizuje data v logách souhlasů
2. Odstraní osobní údaje z formulářů odstoupení
3. Zachová anonymizované záznamy pro účely odpovědnosti

## Právo na přenositelnost dat

Plugin spolupracuje s **Nástroje > Exportovat osobní údaje**. Export obsahuje:

- Historii udělených souhlasů
- Data z formulářů (anonymizovaná)
- Komunikační preference

## Řešení problémů

**Zaškrtávací políčka se nezobrazují na stránce objednávky**
Zkontrolujte, zda je modul GDPR zapnutý v **WooCommerce > Nastavení > Polski > Moduly**. Při blokovém formuláři objednávky potřebujete WooCommerce 8.0+.

**Zákazník hlásí, že nemůže odeslat objednávku**
Zkontrolujte, zda jiný plugin (např. Germanized, WPML) nepřidává stejná zaškrtávací políčka. Vypněte souhlasy z jiných pluginů a používejte pouze modul Polski for WooCommerce.

**Logy souhlasů neukládají IP adresu**
Zkontrolujte, zda server předává IP adresu. Za reverse proxy (např. Cloudflare) nakonfigurujte hlavičku `X-Forwarded-For` ve WordPress.

## Další kroky

- Nahlašujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a dotazy: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
