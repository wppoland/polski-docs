---
title: Overené recenzie
description: Systém overených recenzií v Polski for WooCommerce - odznak nákupu, párovanie e-mailov a dôveryhodnosť recenzií.
---

Modul označuje recenzie zákazníkov, ktorí kúpili produkt, odznakom **Overený nákup**. Zvyšuje dôveryhodnosť recenzií a podporuje súlad so smernicou Omnibus.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Nástroje > Overené recenzie** a zapnite modul. Vyžaduje zapnuté recenzie v **WooCommerce > Nastavenia > Produkty > Všeobecné > Zapnúť recenzie produktov**.

## Ako funguje overovanie

### Odznak nákupu (purchase badge)

Recenzie zákazníkov, ktorí kúpili produkt, dostávajú odznak **Overený nákup** vedľa mena recenzenta.

Odznak sa objaví, keď:

1. Autor recenzie je prihlásený ako zákazník
2. Zákazník má aspoň 1 objednávku obsahujúcu recenzovaný produkt
3. Objednávka má stav `completed` (dokončená) alebo `processing` (v realizácii)

### Párovanie e-mailov (email matching)

Pri hosťoch systém porovnáva e-mail z recenzie s e-mailmi z objednávok. Ak sa zhoduje s objednávkou s recenzovaným produktom, recenzia dostane odznak.

Režimy párovania:

| Režim        | Popis                                         | Bezpečnosť     |
| ------------ | --------------------------------------------- | -------------- |
| Presné       | E-mail musí byť identický                     | Vysoká         |
| Normalizované| Ignoruje veľkosť písmen a aliasy Gmail (+)    | Stredná        |

Konfigurácia režimu: **WooCommerce > Polski > Overené recenzie > Režim párovania e-mailov**.

```php
// Zmena režimu programovo
add_filter('polski/verified_reviews/email_matching', function (): string {
    return 'exact'; // 'exact' alebo 'normalized'
});
```

### Proces overovania

```
Zákazník zadá recenziu
        ↓
Systém kontroluje:
  1. Je zákazník prihlásený?
     → ÁNO: skontroluj objednávky podľa user_id
     → NIE: skontroluj objednávky podľa e-mailu
        ↓
  2. Existuje objednávka obsahujúca tento produkt?
     → ÁNO: skontroluj stav objednávky
     → NIE: žiadny odznak
        ↓
  3. Je stav objednávky "completed" alebo "processing"?
     → ÁNO: prideľ odznak "Overený nákup"
     → NIE: žiadny odznak
```

## Konfigurácia odznaku

### Vzhľad

Možnosti konfigurácie odznaku:

| Možnosť         | Popis                             | Predvolene             |
| --------------- | --------------------------------- | ---------------------- |
| Text            | Obsah odznaku                     | Overený nákup          |
| Ikona           | Ikona vedľa textu                 | Checkmark (✓)          |
| Farba pozadia   | Farba pozadia odznaku             | Zelená (#059669)       |
| Farba textu     | Farba textu                       | Biela (#ffffff)        |
| Pozícia         | Pozícia vzhľadom k menu autora    | Za menom               |
| Veľkosť         | Veľkosť odznaku                   | Malá                   |

### Štýlovanie CSS

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

CSS triedy:
- `.polski-verified-badge` - kontajner odznaku
- `.polski-verified-badge__icon` - ikona
- `.polski-verified-badge__text` - text odznaku
- `.polski-verified-badge--large` - veľký variant

## Filtrovanie recenzií

Filter na stránke produktu umožňuje zákazníkom zobraziť:

- **Všetky recenzie** - predvolené zobrazenie
- **Len overené** - recenzie s odznakom
- **Len neoverené** - recenzie bez odznaku

Filter sa zobrazuje ako sada tlačidiel nad zoznamom recenzií.

```php
// Vypnutie filtra
add_filter('polski/verified_reviews/show_filter', '__return_false');
```

## Triedenie recenzií

Overené recenzie sa môžu zobrazovať vyššie. Možnosti triedenia:

- **Chronologicky** - predvolené triedenie WooCommerce
- **Overené najprv** - recenzie s odznakom hore
- **Hodnotenie zostupne** - od najvyššieho hodnotenia
- **Hodnotenie vzostupne** - od najnižšieho hodnotenia

```php
add_filter('polski/verified_reviews/default_sort', function (): string {
    return 'verified_first'; // 'date', 'verified_first', 'rating_desc', 'rating_asc'
});
```

## Štatistiky overovania

V **WooCommerce > Polski > Overené recenzie > Štatistiky** sú viditeľné:

- **Celkový počet recenzií** - všetky recenzie v obchode
- **Overené** - recenzie s odznakom (počet a percento)
- **Neoverené** - recenzie bez odznaku
- **Priemerné hodnotenie overených** - priemer hviezdičiek recenzií s odznakom
- **Priemerné hodnotenie neoverených** - priemer hviezdičiek recenzií bez odznaku
- **Mesačný graf** - trend overených vs neoverených recenzií

## Ochrana pred falošnými recenziami

Dodatočné ochranné mechanizmy:

### Limit recenzií

Zákazník môže vystaviť 1 recenziu na produkt. Pri pokuse o pridanie druhej uvidí správu.

### Minimálny čas

Recenzia je možná až po X dňoch od dodania. Predvolene **3 dni** - zákazník má čas otestovať produkt.

```php
add_filter('polski/verified_reviews/min_days_after_delivery', function (): int {
    return 7; // 7 dní od dodania
});
```

### Moderovanie

Možnosti moderovania pred publikovaním:

- **Bez moderovania** - recenzie publikované okamžite
- **Moderovanie neoverených** - schválenie vyžadujú len recenzie bez odznaku
- **Moderovanie všetkých** - všetky recenzie vyžadujú schválenie

Konfigurácia: **WooCommerce > Polski > Overené recenzie > Moderovanie**.

### Zisťovanie podozrivých recenzií

Automatické označovanie podozrivých recenzií:

| Signál                              | Popis                                    |
| ------------------------------------ | ---------------------------------------- |
| Viacero recenzií z jednej IP         | Viac ako 3 recenzie z tej istej IP/deň   |
| Recenzia okamžite po nákupe          | Recenzia vystavená v priebehu minút od objednávky |
| Identický text                       | Ten istý text recenzie na rôznych produktoch |
| Podozrivý e-mail                     | E-mailová adresa z dočasnej domény       |

Podozrivé recenzie sa dostávajú do fronty moderovania so štítkom **Na skontrolovanie**.

## Integrácia so Schema.org

Overené recenzie generujú štruktúrované dáta `Review`:

```json
{
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Ján K."
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "datePublished": "2025-05-20",
  "reviewBody": "Výborná kvalita, odporúčam.",
  "publisher": {
    "@type": "Organization",
    "name": "Môj obchod"
  }
}
```

Google preferuje recenzie z potvrdených nákupov v rich snippets.

## E-mail so žiadosťou o recenziu

Automatický e-mail so žiadosťou o recenziu po X dňoch od dodania.

Konfigurácia:

| Možnosť            | Popis                           | Predvolene |
| ------------------- | ------------------------------- | --------- |
| Zapnutý            | Či posielať e-mail              | Nie       |
| Oneskorenie        | Dní po dodaní                   | 7         |
| Šablóna            | Šablóna e-mailu                 | Predvolená|
| Limit              | Max 1 e-mail na objednávku      | Áno       |

```php
// Zmena oneskorenia e-mailu
add_filter('polski/verified_reviews/email_delay_days', function (): int {
    return 14;
});
```

## Shortcode

```html
[polski_verified_badge text="Potvrdená objednávka" icon="shield"]
```

Zobrazuje odznak overenia. Užitočný v neštandardných šablónach recenzií.

## Riešenie problémov

**Odznak sa nezobrazuje napriek nákupu** - skontrolujte stav objednávky (vyžadovaný `completed` alebo `processing`). Skontrolujte tiež, či sa e-mail v recenzii zhoduje s e-mailom z objednávky.

**Všetky recenzie sú neoverené** - skontrolujte, či je modul aktívny a WooCommerce vyžaduje e-mail pri pridávaní recenzie.

**E-mail so žiadosťou o recenziu neprichádza** - skontrolujte konfiguráciu pošty WordPressu. Použite plugin SMTP.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výhradne informačný charakter a nepredstavuje právne poradenstvo. Pred zavedením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
