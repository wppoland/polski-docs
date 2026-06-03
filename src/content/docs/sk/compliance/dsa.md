---
title: DSA - Akt o digitálnych službách
description: Nástroje DSA (Digital Services Act) v Polski for WooCommerce - formulár na nahlasovanie, administračný panel, sledovanie stavov a e-mailové notifikácie.
---

Akt o digitálnych službách (Digital Services Act, EU 2022/2065) vyžaduje, aby online platformy umožňovali nahlasovať nelegálny obsah. Doplnok pridáva formulár na nahlasovanie, panel na správu hlásení, sledovanie stavov a automatické e-mailové notifikácie.

## Požiadavky DSA pre internetové obchody

Od 17. februára 2024 musia obchody s obsahom používateľov (recenzie, komentáre, fotografie):

1. Sprístupniť mechanizmus na nahlasovanie nelegálneho obsahu
2. Potvrdiť prijatie hlásenia
3. Posúdiť hlásenie v primeranej lehote
4. Informovať nahlasujúceho o rozhodnutí
5. Umožniť odvolanie sa proti rozhodnutiu

Týka sa obchodov, v ktorých používatelia môžu publikovať obsah - predovšetkým recenzie produktov.

## Formulár na nahlasovanie

### Shortcode

Vložte formulár na nahlasovanie DSA na ľubovoľnú stránku pomocou shortcode:

```
[polski_dsa_report]
```

### S parametrami

```
[polski_dsa_report product_id="123" category="illegal_content"]
```

### Parametre shortcode

| Parameter | Popis | Predvolená hodnota |
|----------|------|------------------|
| `product_id` | ID produktu, ktorého sa hlásenie týka | Žiadna (používateľ vyberá) |
| `category` | Vopred vybraná kategória hlásenia | Žiadna |

![Formulár na nahlasovanie DSA na stránke obchodu](../../../assets/screenshots/screenshot-6-dsa-report-form.png)

### Polia formulára

Formulár obsahuje nasledujúce polia:

- **Kategória hlásenia** - výber zo zoznamu (nelegálny obsah, porušenie autorských práv, falošná recenzia, nenávistné prejavy, osobné údaje, iné)
- **URL alebo identifikátor obsahu** - odkaz na nahlasovaný obsah alebo ID recenzie
- **Popis** - podrobný opis problému
- **Právny základ** - voliteľné uvedenie predpisu
- **Kontaktné údaje** - meno, e-mailová adresa nahlasujúceho
- **Vyhlásenie** - checkbox potvrdzujúci, že hlásenie sa podáva v dobrej viere

### Príklad vloženia

Vytvorte stránku "Nahlásiť obsah" a pridajte shortcode:

```
[polski_dsa_report]
```

Pridajte odkaz na túto stránku do päty obchodu, aby bola ľahko dostupná.

## Administračný panel

Hlásenia DSA spravujete v **WooCommerce > Hlásenia DSA**.

### Zoznam hlásení

Zoznam zobrazuje všetky hlásenia so stĺpcami:

- ID hlásenia
- Dátum podania
- Kategória
- Stav (nové, prebiehajúce, posúdené, zamietnuté)
- Nahlasujúci (meno, e-mail)
- Odkaz na obsah

### Detaily hlásenia

Po kliknutí na hlásenie uvidíte:

- Kompletné údaje formulára
- Náhľad nahlasovaného obsahu (ak ide o recenziu - priamy odkaz)
- História zmien stavu
- Pole na internú poznámku
- Tlačidlá akcií (zmeniť stav, odstrániť obsah, zamietnuť)

### Stavy hlásení

| Stav | Popis |
|--------|------|
| `new` | Nové hlásenie, čaká na posúdenie |
| `in_progress` | Hlásenie počas analýzy |
| `resolved` | Hlásenie posúdené, obsah odstránený alebo prijaté iné opatrenie |
| `rejected` | Hlásenie zamietnuté ako neopodstatnené |
| `appealed` | Nahlasujúci podal odvolanie proti rozhodnutiu |

## E-mailové notifikácie

Doplnok odosiela automatické e-maily v týchto situáciách:

| Udalosť | Príjemca | Obsah |
|-----------|----------|-------|
| Nové hlásenie | Administrátor | Informácia o novom hlásení s údajmi |
| Potvrdenie | Nahlasujúci | Potvrdenie prijatia hlásenia s číslom ID |
| Zmena stavu | Nahlasujúci | Informácia o zmene stavu s odôvodnením |
| Posúdenie | Nahlasujúci | Rozhodnutie s odôvodnením a informáciou o práve na odvolanie |

Šablóny e-mailov možno prispôsobiť v **WooCommerce > Nastavenia > E-maily**.

## Hook

### polski/dsa/report_created

Volaný po vytvorení nového hlásenia DSA.

```php
/**
 * @param int    $report_id   ID zgłoszenia DSA.
 * @param array  $report_data Dane zgłoszenia.
 * @param string $category    Kategoria zgłoszenia.
 */
add_action('polski/dsa/report_created', function (int $report_id, array $report_data, string $category): void {
    // Przykład: wyślij powiadomienie do zespołu prawnego przez Slack
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

### Príklad - automatické odstraňovanie recenzií určitej kategórie

```php
add_action('polski/dsa/report_created', function (int $report_id, array $report_data, string $category): void {
    // Automatycznie ukryj recenzje zgłoszone jako mowa nienawiści
    if ($category !== 'hate_speech') {
        return;
    }
    
    $comment_id = $report_data['content_id'] ?? 0;
    if ($comment_id > 0) {
        wp_set_comment_status($comment_id, 'hold');
        
        // Zaloguj automatyczną akcję
        update_post_meta($report_id, '_auto_action', 'comment_held');
    }
}, 10, 3);
```

## Reportovanie

DSA vyžaduje vedenie registra hlásení. Exportujte všetky hlásenia do CSV cez **WooCommerce > Hlásenia DSA > Exportovať**. Export obsahuje:

- ID hlásenia
- Dátum a čas podania
- Kategória
- Stav a dátum posúdenia
- Čas vybavenia (v hodinách)
- Prijaté opatrenie

## Konfigurácia

Nastavenia modulu DSA nájdete v **WooCommerce > Nastavenia > Polski > DSA**.

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| Zapnúť formulár DSA | Aktivuje modul | Áno |
| Stránka formulára | Stránka WordPress so shortcode | Žiadna |
| E-mail administrátora | E-mailová adresa na notifikácie | E-mail administrátora WordPress |
| Lehota na posúdenie | Počet pracovných dní na posúdenie | 7 |
| Kategórie hlásení | Zoznam dostupných kategórií | Predvolený zoznam |

## Widget na stránke produktu (Polski 1.14.0+)

Od verzie 1.14.0 môžete zapnúť voliteľný widget na nahlasovanie priamo na karte produktu. Zákazník klikne na "Nahlásiť nelegálny obsah (DSA)" a rozbalí formulár s **predvyplneným URL produktu** a názvom - nemusí prepisovať odkaz.

```php
update_option('polski_dsa', array_merge(
    (array) get_option('polski_dsa', []),
    [
        'product_widget_enabled' => true,
        'product_widget_position' => 'after_summary', // lub 'product_meta'
    ]
));
```

Widget používa HTML element `<details>` - funguje bez JavaScriptu, je prístupný z klávesnice a čítačiek obrazovky. Formulár sa odosiela do toho istého handlera (`polski_dsa_report`), takže hlásenia smerujú do tej istej fronty v administračnom paneli.

| Kľúč v `polski_dsa` | Hodnota | Popis |
|---|---|---|
| `product_widget_enabled` | `false` (predvolene) | Zapína widget na stránkach produktov |
| `product_widget_position` | `after_summary` \| `product_meta` | Pozícia na stránke produktu |

Vývojárske filtre:

| Filter | Účel |
|---|---|
| `polski/dsa/product_widget_enabled` | Hlavný prepínač widgetu |

## Riešenie problémov

**Formulár sa nezobrazuje na stránke**
Skontrolujte, či je shortcode `[polski_dsa_report]` na stránke a modul DSA je zapnutý v nastaveniach.

**E-mailové notifikácie neprichádzajú**
Skontrolujte konfiguráciu SMTP. Predvolená funkcia `wp_mail()` nefunguje na všetkých serveroch. Nainštalujte doplnok SMTP (napr. WP Mail SMTP).

**Hlásenia sa nezobrazujú v paneli**
Skontrolujte oprávnenia. Na správu hlásení DSA potrebujete rolu `shop_manager` alebo `administrator`.

## Ďalšie kroky

- Nahlasujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
