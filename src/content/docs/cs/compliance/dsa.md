---
title: DSA - Akt o digitalnich sluzbach
description: Nastroje DSA (Digital Services Act) v Polski for WooCommerce - formular hlaseni, administracni panel, sledovani stavu a e-mailova oznameni.
---

Akt o digitalnich sluzbach (Digital Services Act, Narizeni EU 2022/2065) uklada internetovym platformam povinnost umoznit uzivatelum hlasit nelegalni obsah. Polski for WooCommerce dodava kompletni sadu nastroju DSA - formular hlaseni, administracni panel pro spravu hlaseni, sledovani stavu a automaticka e-mailova oznameni.

## Pozadavky DSA pro internetove obchody

Od 17. unora 2024 musi internetove obchody umoznujici publikovani obsahu uzivateli (recenze, komentare, fotografie):

1. Zpristupnit mechanismus hlaseni nelegalniho obsahu
2. Potvrdit prijeti hlaseni
3. Prosetrit hlaseni v primerenem terminu
4. Informovat oznamovatele o rozhodnuti
5. Umoznit odvolani proti rozhodnuti

Povinnost se tyka obchodu, ktere umoznuji uzivatelum publikovat obsah - predevsim recenze produktu.

## Formular hlaseni

### Shortcode

Vlozte formular hlaseni DSA na libovolnou stranku pomoci shortcode:

```
[polski_dsa_report]
```

### S parametry

```
[polski_dsa_report product_id="123" category="illegal_content"]
```

### Parametry shortcode

| Parametr | Popis | Vychozi hodnota |
|----------|------|------------------|
| `product_id` | ID produktu, ktereho se hlaseni tyka | Zadna (uzivatel vybere) |
| `category` | Predem vybrana kategorie hlaseni | Zadna |

### Pole formulare

Formular obsahuje nasledujici pole:

- **Kategorie hlaseni** - vyber ze seznamu (nelegalni obsah, poruseni autorskych prav, falesna recenze, nenavist, osobni udaje, jine)
- **URL nebo identifikator obsahu** - odkaz na hlaseny obsah nebo ID recenze
- **Popis** - podrobny popis problemu
- **Pravni zaklad** - volitelne uvedeni predpisu
- **Kontaktni udaje** - jmeno, e-mailova adresa oznamovatele
- **Prohlaseni** - checkbox potvrzujici, ze hlaseni je podano v dobre vire

### Priklad vlozeni

Vytvorte stranku "Nahlasit obsah" a pridejte shortcode:

```
[polski_dsa_report]
```

Nasledne pridejte odkaz na tuto stranku do paticky obchodu, aby byla snadno dostupna uzivatelum.

## Administracni panel

Hlaseni DSA jsou spravovana v panelu WordPress v **WooCommerce > Hlaseni DSA**.

### Seznam hlaseni

Seznam zobrazuje vsechna hlaseni se sloupci:

- ID hlaseni
- Datum podani
- Kategorie
- Stav (nove, probihajici, vyresene, zamitnute)
- Oznamovatel (jmeno, e-mail)
- Odkaz na obsah

### Podrobnosti hlaseni

Po kliknuti na hlaseni administrator vidi:

- Uplne udaje formulare
- Nahled hlaseneho obsahu (pokud je to recenze - primy odkaz)
- Historii zmen stavu
- Pole pro interni poznamku
- Tlacitka akci (zmenit stav, odstranit obsah, zamitnout)

### Stavy hlaseni

| Stav | Popis |
|--------|------|
| `new` | Nove hlaseni, ceka na vyrizeni |
| `in_progress` | Hlaseni v prubehu analyzy |
| `resolved` | Hlaseni vyrizeno, obsah odstranen nebo provedeno jine opatreni |
| `rejected` | Hlaseni zamitnuto jako bezpredmetne |
| `appealed` | Oznamovatel podal odvolani proti rozhodnuti |

## E-mailova oznameni

System odesila automaticka e-mailova oznameni v nasledujicich situacich:

| Udalost | Prijemce | Obsah |
|-----------|----------|-------|
| Nove hlaseni | Administrator | Informace o novem hlaseni s udaji |
| Potvrzeni | Oznamovatel | Potvrzeni prijeti hlaseni s cislem ID |
| Zmena stavu | Oznamovatel | Informace o zmene stavu s oduvodnenim |
| Vyrizeni | Oznamovatel | Rozhodnuti s oduvodnenim a informaci o pravu na odvolani |

Sablony e-mailu lze prizpusobit v **WooCommerce > Nastaveni > E-maily**.

## Hook

### polski/dsa/report_created

Vyvolan po vytvoreni noveho hlaseni DSA.

```php
/**
 * @param int    $report_id   ID zgłoszenia DSA.
 * @param array  $report_data Dane zgłoszenia.
 * @param string $category    Kategoria zgłoszenia.
 */
add_action('polski/dsa/report_created', function (int $report_id, array $report_data, string $category): void {
    // Priklad: odeslat oznameni pravnimu tymu pres Slack
    $webhook_url = 'https://hooks.slack.com/services/XXXX/YYYY/ZZZZ';
    
    wp_remote_post($webhook_url, [
        'body' => wp_json_encode([
            'text' => sprintf(
                'Nowe zgłoszenie DSA #%d (kategoria: %s) - %s',
                $report_id,
                $category,
                $report_data['description']
            ),
        ]),
        'headers' => ['Content-Type' => 'application/json'],
    ]);
}, 10, 3);
```

### Priklad - automaticke skryti recenzi urcite kategorie

```php
add_action('polski/dsa/report_created', function (int $report_id, array $report_data, string $category): void {
    // Automaticky skryt recenze nahlasene jako nenavistna rec
    if ($category !== 'hate_speech') {
        return;
    }
    
    $comment_id = $report_data['content_id'] ?? 0;
    if ($comment_id > 0) {
        wp_set_comment_status($comment_id, 'hold');
        
        // Zalogovat automatickou akci
        update_post_meta($report_id, '_auto_action', 'comment_held');
    }
}, 10, 3);
```

## Reportovani

DSA vyzaduje vedeni registru hlaseni. Plugin umoznuje export vsech hlaseni do CSV (**WooCommerce > Hlaseni DSA > Exportovat**). Export obsahuje:

- ID hlaseni
- Datum a cas podani
- Kategorii
- Stav a datum vyrizeni
- Dobu obsluhy (v hodinach)
- Provedene opatreni

## Konfigurace

Nastaveni modulu DSA naleznete v **WooCommerce > Nastaveni > Polski > DSA**.

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| Aktivovat formular DSA | Aktivuje modul | Ano |
| Stranka formulare | Stranka WordPress se shortcodem | Zadna |
| E-mail administratora | E-mailova adresa pro oznameni | E-mail administratora WordPress |
| Lhuta pro vyrizeni | Pocet pracovnich dnu na vyrizeni | 7 |
| Kategorie hlaseni | Seznam dostupnych kategorii | Vychozi seznam |

## Reseni problemu

**Formular se nezobrazuje na strance**
Ujistete se, ze shortcode `[polski_dsa_report]` je spravne vlozen na strance a modul DSA je aktivovan v nastaveních.

**E-mailova oznameni nedochazi**
Zkontrolujte konfiguraci SMTP WordPress. Vychozi funkce `wp_mail()` nemusi fungovat na vsech serverech. Zvazite instalaci SMTP pluginu (napr. WP Mail SMTP).

**Hlaseni se nezobrazuji v panelu**
Zkontrolujte opravneni uzivatele. Sprava hlaseni DSA vyzaduje roli `shop_manager` nebo `administrator`.

## Dalsi kroky

- Hlaseni problemu: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a otazky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
