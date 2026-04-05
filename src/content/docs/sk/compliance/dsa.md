---
title: DSA - Akt o digitálnych službách
description: Nástroje DSA (Digital Services Act) v Polski for WooCommerce - formulár hlásení, administračný panel, sledovanie stavov a e-mailové oznámenia.
---

Akt o digitálnych službách (Digital Services Act, EU 2022/2065) vyžaduje, aby internetové platformy umožňovali nahlasovanie nezákonného obsahu. Plugin pridáva formulár na nahlásenie, panel na správu hlásení, sledovanie stavov a automatické e-mailové oznámenia.

## Požiadavky DSA pre internetové obchody

Od 17. februára 2024 obchody s obsahom používateľov (recenzie, komentáre, fotografie) musia:

1. Sprístupniť mechanizmus nahlasovania nezákonného obsahu
2. Potvrdiť prijatie hlásenia
3. Preskúmať hlásenie v primeranej lehote
4. Informovať nahlasujúceho o rozhodnutí
5. Umožniť odvolanie sa proti rozhodnutiu

Týka sa obchodov, v ktorých používatelia môžu publikovať obsah - predovšetkým recenzie produktov.

## Formulár na nahlásenie

### Shortcód

Vložte formulár na nahlásenie DSA na ľubovoľnú stránku pomocou shortcódu:

```
[polski_dsa_report]
```

### S parametrami

```
[polski_dsa_report product_id="123" category="illegal_content"]
```

### Parametre shortcódu

| Parameter | Popis | Predvolená hodnota |
|----------|------|------------------|
| `product_id` | ID produktu, ktorého sa hlásenie týka | Žiadna (používateľ vyberá) |
| `category` | Predvolená kategória hlásenia | Žiadna |

![Formulár DSA na stránke obchodu](../../../../assets/screenshots/screenshot-6-dsa-report-form.png)

### Polia formulára

Formulár obsahuje polia:

- **Kategória hlásenia** - výber zo zoznamu (nezákonný obsah, porušenie autorských práv, falošná recenzia, nenávistné prejavy, osobné údaje, iné)
- **URL alebo identifikátor obsahu** - odkaz na nahlasovaný obsah alebo ID recenzie
- **Popis** - podrobný popis problému
- **Právny základ** - voliteľné uvedenie predpisu
- **Kontaktné údaje** - meno, e-mailová adresa nahlasujúceho
- **Prehlásenie** - checkbox potvrdzujúci, že hlásenie je podané v dobrej viere

### Príklad vloženia

Vytvorte stránku "Nahlásenie obsahu" a pridajte shortcód:

```
[polski_dsa_report]
```

Pridajte odkaz na túto stránku do pätičky obchodu, aby bola ľahko dostupná.

## Administračný panel

Hlásenia DSA spravujete v **WooCommerce > Hlásenia DSA**.

### Zoznam hlásení

Zoznam zobrazuje všetky hlásenia so stĺpcami:

- ID hlásenia
- Dátum podania
- Kategória
- Stav (nové, spracovávané, preskúmané, zamietnuté)
- Nahlasujúci (meno, e-mail)
- Odkaz na obsah

### Podrobnosti hlásenia

Po kliknutí na hlásenie vidíte:

- Úplné údaje formulára
- Náhľad nahlasovaného obsahu (ak je to recenzia - priamy odkaz)
- História zmien stavu
- Pole na internú poznámku
- Tlačidlá akcií (zmeniť stav, odstrániť obsah, zamietnuť)

### Stavy hlásení

| Stav | Popis |
|--------|------|
| `new` | Nové hlásenie, čaká na preskúmanie |
| `in_progress` | Hlásenie v procese analýzy |
| `resolved` | Hlásenie preskúmané, obsah odstránený alebo vykonané iné opatrenie |
| `rejected` | Hlásenie zamietnuté ako neopodstatnené |
| `appealed` | Nahlasujúci podal odvolanie proti rozhodnutiu |

## E-mailové oznámenia

Plugin posiela automatické e-maily v týchto situáciách:

| Udalosť | Príjemca | Obsah |
|-----------|----------|-------|
| Nové hlásenie | Administrátor | Informácia o novom hlásení s údajmi |
| Potvrdenie | Nahlasujúci | Potvrdenie prijatia hlásenia s číslom ID |
| Zmena stavu | Nahlasujúci | Informácia o zmene stavu s odôvodnením |
| Preskúmanie | Nahlasujúci | Rozhodnutie s odôvodnením a informáciou o práve na odvolanie |

Šablóny e-mailov prispôsobíte v **WooCommerce > Nastavenia > E-maily**.

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

### Príklad - automatické skrytie recenzie s určitou kategóriou

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

## Reporting

DSA vyžaduje vedenie registra hlásení. Exportujte všetky hlásenia do CSV cez **WooCommerce > Hlásenia DSA > Exportovať**. Export obsahuje:

- ID hlásenia
- Dátum a čas podania
- Kategória
- Stav a dátum preskúmania
- Čas spracovania (v hodinách)
- Vykonané opatrenie

## Konfigurácia

Nastavenia modulu DSA nájdete v **WooCommerce > Nastavenia > Polski > DSA**.

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| Zapnúť formulár DSA | Aktivuje modul | Áno |
| Stránka formulára | Stránka WordPress so shortcódom | Žiadna |
| E-mail administrátora | E-mailová adresa na oznámenia | E-mail administrátora WordPress |
| Lehota na preskúmanie | Počet pracovných dní na preskúmanie | 7 |
| Kategórie hlásení | Zoznam dostupných kategórií | Predvolený zoznam |

## Riešenie problémov

**Formulár sa nezobrazuje na stránke**
Skontrolujte, či shortcód `[polski_dsa_report]` je na stránke a modul DSA je zapnutý v nastaveniach.

**E-mailové oznámenia nedochádzajú**
Skontrolujte konfiguráciu SMTP. Štandardná funkcia `wp_mail()` nefunguje na všetkých serveroch. Nainštalujte SMTP plugin (napr. WP Mail SMTP).

**Hlásenia sa nezobrazujú v paneli**
Skontrolujte oprávnenia. Na správu hlásení DSA potrebujete rolu `shop_manager` alebo `administrator`.

## Ďalšie kroky

- Nahlasovanie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
