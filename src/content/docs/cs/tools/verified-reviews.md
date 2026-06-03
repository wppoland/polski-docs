---
title: Ověřené recenze
description: Systém ověřených recenzí v Polski for WooCommerce - odznak nákupu, párování e-mailů a věrohodnost recenzí.
---

Modul označuje recenze zákazníků, kteří produkt zakoupili, odznakem **Ověřený nákup**. Zvyšuje věrohodnost recenzí a podporuje soulad se směrnicí Omnibus.

## Zapnutí modulu

Přejděte na **WooCommerce > Polski > Nástroje > Ověřené recenze** a zapněte modul. Vyžaduje zapnuté recenze v **WooCommerce > Nastavení > Produkty > Obecné > Zapnout recenze produktů**.

## Jak funguje ověřování

### Odznak nákupu (purchase badge)

Recenze zákazníků, kteří produkt zakoupili, získávají odznak **Ověřený nákup** vedle jména recenzenta.

Odznak se objeví, když:

1. Autor recenze je přihlášen jako zákazník
2. Zákazník má alespoň 1 objednávku obsahující recenzovaný produkt
3. Objednávka má stav `completed` (dokončeno) nebo `processing` (zpracovává se)

### Párování e-mailů (email matching)

U hostů systém porovnává e-mail z recenze s e-maily z objednávek. Pokud odpovídá objednávce s recenzovaným produktem, recenze dostane odznak.

Režimy párování:

| Režim         | Popis                                         | Bezpečnost     |
| ------------ | --------------------------------------------- | -------------- |
| Přesné       | E-mail musí být identický                     | Vysoká         |
| Normalizované| Ignoruje velikost písmen a aliasy Gmail (+)   | Střední        |

Konfigurace režimu: **WooCommerce > Polski > Ověřené recenze > Režim párování e-mailů**.

```php
// Změna režimu programově
add_filter('polski/verified_reviews/email_matching', function (): string {
    return 'exact'; // 'exact' nebo 'normalized'
});
```

### Proces ověření

```
Zákazník zadá recenzi
        ↓
Systém kontroluje:
  1. Je zákazník přihlášen?
     → ANO: zkontroluj objednávky podle user_id
     → NE: zkontroluj objednávky podle e-mailu
        ↓
  2. Existuje objednávka obsahující tento produkt?
     → ANO: zkontroluj stav objednávky
     → NE: žádný odznak
        ↓
  3. Je stav objednávky "completed" nebo "processing"?
     → ANO: udělit odznak "Ověřený nákup"
     → NE: žádný odznak
```

## Konfigurace odznaku

### Vzhled

Možnosti konfigurace odznaku:

| Možnost         | Popis                             | Výchozí                |
| --------------- | --------------------------------- | ---------------------- |
| Text            | Obsah odznaku                     | Ověřený nákup          |
| Ikona           | Ikona vedle textu                 | Checkmark (✓)          |
| Barva pozadí    | Barva pozadí odznaku              | Zelená (#059669)       |
| Barva textu     | Barva textu                       | Bílá (#ffffff)         |
| Pozice          | Pozice vzhledem ke jménu autora   | Za jménem              |
| Velikost        | Velikost odznaku                  | Malá                   |

### Stylování CSS

```css
.polski-verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    background-color: #059669;
    color: #ffffff;
}

.polski-verified-badge__icon {
    width: 14px;
    height: 14px;
}
```

CSS třídy:
- `.polski-verified-badge` - kontejner odznaku
- `.polski-verified-badge__icon` - ikona
- `.polski-verified-badge__text` - text odznaku
- `.polski-verified-badge--large` - velká varianta

## Filtrování recenzí

Filtr na stránce produktu umožňuje zákazníkům zobrazit:

- **Všechny recenze** - výchozí zobrazení
- **Pouze ověřené** - recenze s odznakem
- **Pouze neověřené** - recenze bez odznaku

Filtr se zobrazuje jako sada tlačítek nad seznamem recenzí.

```php
// Vypnutí filtru
add_filter('polski/verified_reviews/show_filter', '__return_false');
```

## Řazení recenzí

Ověřené recenze se mohou zobrazovat výše. Možnosti řazení:

- **Chronologicky** - výchozí řazení WooCommerce
- **Ověřené první** - recenze s odznakem nahoře
- **Hodnocení sestupně** - od nejvyššího hodnocení
- **Hodnocení vzestupně** - od nejnižšího hodnocení

```php
add_filter('polski/verified_reviews/default_sort', function (): string {
    return 'verified_first'; // 'date', 'verified_first', 'rating_desc', 'rating_asc'
});
```

## Statistiky ověření

V **WooCommerce > Polski > Ověřené recenze > Statistiky** jsou viditelné:

- **Celkový počet recenzí** - všechny recenze v obchodě
- **Ověřené** - recenze s odznakem (počet a procento)
- **Neověřené** - recenze bez odznaku
- **Průměrné hodnocení ověřených** - průměr hvězdiček recenzí s odznakem
- **Průměrné hodnocení neověřených** - průměr hvězdiček recenzí bez odznaku
- **Měsíční graf** - trend ověřených vs neověřených recenzí

## Ochrana před falešnými recenzemi

Doplňkové ochranné mechanismy:

### Limit recenzí

Zákazník může napsat 1 recenzi na produkt. Při pokusu o přidání druhé uvidí zprávu.

### Minimální doba

Recenze je možná až po X dnech od doručení. Výchozí **3 dny** - zákazník má čas produkt vyzkoušet.

```php
add_filter('polski/verified_reviews/min_days_after_delivery', function (): int {
    return 7; // 7 dní od doručení
});
```

### Moderace

Možnosti moderace před publikací:

- **Bez moderace** - recenze publikovány okamžitě
- **Moderace neověřených** - schválení vyžadují pouze recenze bez odznaku
- **Moderace všech** - všechny recenze vyžadují schválení

Konfigurace: **WooCommerce > Polski > Ověřené recenze > Moderace**.

### Detekce podezřelých recenzí

Automatické označování podezřelých recenzí:

| Signál                              | Popis                                    |
| ------------------------------------ | ---------------------------------------- |
| Více recenzí z jedné IP              | Více než 3 recenze ze stejné IP/den      |
| Recenze ihned po nákupu              | Recenze napsaná v řádu minut od objednávky |
| Identický text                       | Stejný text recenze na různých produktech |
| Podezřelý e-mail                     | E-mailová adresa z dočasné domény        |

Podezřelé recenze se dostávají do fronty moderace se štítkem **Ke kontrole**.

## Integrace se Schema.org

Ověřené recenze generují strukturovaná data `Review`:

```json
{
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Jan K."
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "datePublished": "2025-05-20",
  "reviewBody": "Skvělá kvalita, doporučuji.",
  "publisher": {
    "@type": "Organization",
    "name": "Můj obchod"
  }
}
```

Google preferuje recenze z potvrzených nákupů v rich snippets.

## E-mail s žádostí o recenzi

Automatický e-mail s žádostí o recenzi po X dnech od doručení.

Konfigurace:

| Možnost            | Popis                           | Výchozí   |
| ------------------- | ------------------------------- | --------- |
| Zapnuto            | Zda odesílat e-mail             | Ne        |
| Zpoždění           | Dní po doručení                 | 7         |
| Šablona            | Šablona e-mailu                 | Výchozí   |
| Limit              | Max 1 e-mail na objednávku      | Ano       |

```php
// Změna zpoždění e-mailu
add_filter('polski/verified_reviews/email_delay_days', function (): int {
    return 14;
});
```

## Shortcode

```html
[polski_verified_badge text="Potvrzená objednávka" icon="shield"]
```

Zobrazuje odznak ověření. Užitečný ve vlastních šablonách recenzí.

## Řešení problémů

**Odznak se nezobrazuje navzdory nákupu** - zkontrolujte stav objednávky (vyžadován `completed` nebo `processing`). Zkontrolujte také, zda e-mail v recenzi odpovídá e-mailu z objednávky.

**Všechny recenze jsou neověřené** - zkontrolujte, zda je modul aktivní a WooCommerce vyžaduje e-mail při přidávání recenze.

**E-mail s žádostí o recenzi nedorazí** - zkontrolujte konfiguraci pošty WordPressu. Použijte SMTP plugin.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
