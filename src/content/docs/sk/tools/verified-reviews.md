---
title: Overené recenzie
description: Systém overených recenzií v Polski for WooCommerce - odznak nákupu, párovanie e-mailov a dôveryhodnosť recenzií.
---

Modul označuje recenzie zákazníkov, ktorí kúpili produkt, odznakom **Overený nákup**. Zvyšuje dôveryhodnosť recenzií a podporuje súlad so smernicou Omnibus.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Nástroje > Overené recenzie** a aktivujte modul. Modul vyžaduje zapnuté recenzie vo WooCommerce (**WooCommerce > Nastavenia > Produkty > Všeobecné > Zapnúť recenzie produktov**).

## Ako funguje overenie

### Odznak nákupu (purchase badge)

Po zapnutí modulu recenzie zákazníkov, ktorí kúpili produkt, dostávajú odznak **Overený nákup**. Odznak sa zobrazuje vedľa mena recenzenta.

Odznak sa udeľuje, keď:

1. Autor recenzie je prihlásený ako zákazník
2. Zákazník má aspoň 1 objednávku obsahujúcu recenzovaný produkt
3. Objednávka má stav `completed` (zrealizovaná) alebo `processing` (spracovávaná)

### Párovanie e-mailov (email matching)

Pre hostí (neprihlásených) systém porovnáva e-mailovú adresu uvedenú v recenzii s e-mailovými adresami z objednávok. Ak adresa zodpovedá objednávke obsahujúcej recenzovaný produkt, recenzia dostáva odznak overenia.

Párovanie e-mailov funguje v režime:

| Režim        | Popis                                          | Bezpečnosť |
| ------------ | --------------------------------------------- | -------------- |
| Presné       | E-mail musí byť identický                     | Vysoká         |
| Normalizované| Ignoruje veľkosť písmen a aliasy Gmail (+)    | Stredná        |

```php
// Zmena režimu programovo
add_filter('polski/verified_reviews/email_matching', function (): string {
    return 'exact'; // 'exact' alebo 'normalized'
});
```

## Konfigurácia odznaku

### Vzhľad

Možnosti konfigurácie odznaku:

| Možnosť         | Popis                              | Predvolené              |
| --------------- | --------------------------------- | ---------------------- |
| Text            | Obsah odznaku                      | Overený nákup           |
| Ikona           | Ikona vedľa textu                  | Checkmark (✓)          |
| Farba pozadia   | Farba pozadia odznaku              | Zelená (#059669)       |
| Farba textu     | Farba textu                        | Biela (#ffffff)        |
| Pozícia         | Pozícia voči menu autora           | Za menom               |
| Veľkosť         | Veľkosť odznaku                    | Malá                   |

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

Modul pridáva filter na stránke produktu umožňujúci zákazníkom zobraziť:

- **Všetky recenzie** - predvolené zobrazenie
- **Len overené** - recenzie s odznakom
- **Len neoverené** - recenzie bez odznaku

```php
// Vypnutie filtra
add_filter('polski/verified_reviews/show_filter', '__return_false');
```

## Zoradenie recenzií

Overené recenzie môžu byť priorizované v zoradení. Možnosti:

- **Chronologicky** - predvolené zoradenie WooCommerce
- **Overené najskôr** - recenzie s odznakom navrchu
- **Hodnotenie zostupne** - od najvyššieho hodnotenia
- **Hodnotenie vzostupne** - od najnižšieho hodnotenia

```php
add_filter('polski/verified_reviews/default_sort', function (): string {
    return 'verified_first'; // 'date', 'verified_first', 'rating_desc', 'rating_asc'
});
```

## Štatistiky overenia

Admin panel (**WooCommerce > Polski > Overené recenzie > Štatistiky**) zobrazuje:

- **Celkový počet recenzií** - všetky recenzie v obchode
- **Overené** - recenzie s odznakom (počet a percento)
- **Neoverené** - recenzie bez odznaku
- **Priemerné hodnotenie overených** - priemer hviezdičiek overených recenzií
- **Priemerné hodnotenie neoverených** - priemer hviezdičiek neoverených recenzií
- **Mesačný graf** - trend overených vs neoverených recenzií

## Ochrana pred falošnými recenziami

### Limit recenzií

Zákazník môže napísať maximálne 1 recenziu na produkt.

### Minimálny čas

Recenziu je možné napísať až po X dňoch od doručenia. Štandardne **3 dni**.

```php
add_filter('polski/verified_reviews/min_days_after_delivery', function (): int {
    return 7; // 7 dní od doručenia
});
```

### Moderácia

Recenzie môžu vyžadovať moderáciu pred publikáciou:

- **Bez moderácie** - recenzie publikované okamžite
- **Moderácia neoverených** - len recenzie bez odznaku vyžadujú schválenie
- **Moderácia všetkých** - všetky recenzie vyžadujú schválenie

### Detekcia podozrivých recenzií

Systém automaticky označuje podozrivé recenzie:

| Signál                              | Popis                                     |
| ------------------------------------ | ---------------------------------------- |
| Viacero recenzií z jednej IP         | Viac ako 3 recenzie z tej istej IP/deň   |
| Recenzia okamžite po nákupe          | Recenzia napísaná v priebehu minút od objednávky |
| Identický text                       | Rovnaký text recenzie na rôznych produktoch |
| Podozrivý e-mail                     | E-mailová adresa z dočasnej domény       |

## E-mail s požiadavkou na recenziu

Modul môže automaticky zasielať e-mail zákazníkovi s požiadavkou na recenziu po X dňoch od doručenia.

Konfigurácia:

| Možnosť              | Popis                            | Predvolené |
| ------------------- | ------------------------------- | --------- |
| Zapnutý             | Či zasielať e-mail               | Nie       |
| Oneskorenie         | Dni po doručení                  | 7         |
| Šablóna             | Šablóna e-mailu                  | Predvolená |
| Limit               | Max 1 e-mail na objednávku       | Áno       |

```php
// Zmena oneskorenia e-mailu
add_filter('polski/verified_reviews/email_delay_days', function (): int {
    return 14;
});
```

## Shortcód

```html
[polski_verified_badge text="Potwierdzone zamówienie" icon="shield"]
```

Shortcód zobrazuje odznak overenia. Užitočný v vlastných šablónach recenzií.

## Riešenie problémov

**Odznak sa nezobrazuje napriek nákupu** - skontrolujte stav objednávky. Len objednávky so stavom `completed` alebo `processing` sa kvalifikujú na overenie. Skontrolujte tiež, či e-mail v recenzii zodpovedá e-mailu z objednávky.

**Všetky recenzie sú neoverené** - uistite sa, že modul je aktívny a že WooCommerce vyžaduje e-mailovú adresu pri pridávaní recenzií.

**E-mail s požiadavkou na recenziu nedochádza** - skontrolujte konfiguráciu pošty WordPressu. Použite SMTP plugin na spoľahlivé zasielanie e-mailov.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
