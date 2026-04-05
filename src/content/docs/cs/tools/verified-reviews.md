---
title: Overene recenze
description: System overenych recenzi v Polski for WooCommerce - odznak nakupu, parovani e-mailu a duveryhodnost recenzi.
---

Modul oznacuje recenze zakazniku, kteri nakoupili produkt, odznakem **Overeny nakup**. Zvysuje duveryhodnost recenzi a podporuje soulad se smernici Omnibus.

## Aktivace modulu

Prejdete do **WooCommerce > Polski > Nastroje > Overene recenze** a aktivujte modul. Modul vyzaduje aktivovane recenze ve WooCommerce (**WooCommerce > Nastaveni > Produkty > Obecne > Aktivovat recenze produktu**).

## Jak funguje overeni

### Odznak nakupu (purchase badge)

Po aktivaci modulu recenze zakazniku, kteri nakoupili produkt, dostavaji odznak **Overeny nakup**. Odznak se zobrazuje u jmena recenzenta.

Odznak je prirazen, kdyz:

1. Autor recenze je prihlasen jako zakaznik
2. Zakaznik ma alespon 1 objednavku obsahujici recenzovany produkt
3. Objednavka ma stav `completed` (vyrizena) nebo `processing` (probihajici)

### Parovani e-mailu (email matching)

Pro hosty (neprihlasene) system porovnava e-mailovou adresu zadanou v recenzi s e-mailovymi adresami z objednavek. Pokud adresa odpovida objednavce obsahujici recenzovany produkt, recenze obdrzi odznak overeni.

Parovani e-mailu funguje v rezimu:

| Rezim | Popis | Bezpecnost |
| ------------ | --------------------------------------------- | -------------- |
| Presne | E-mail musi byt identicky | Vysoka |
| Normalizovane | Ignoruje velikost pismen a Gmail aliasy (+) | Stredni |

```php
add_filter('polski/verified_reviews/email_matching', function (): string {
    return 'exact'; // 'exact' nebo 'normalized'
});
```

## Konfigurace odznaku

### Vzhled

| Moznost | Popis | Vychozi |
| --------------- | --------------------------------- | ---------------------- |
| Text | Obsah odznaku | Overeny nakup |
| Ikona | Ikona u textu | Checkmark |
| Barva pozadi | Barva pozadi odznaku | Zelena (#059669) |
| Barva textu | Barva textu | Bila (#ffffff) |
| Pozice | Pozice vuci jmenu autora | Za jmenem |
| Velikost | Velikost odznaku | Mala |

### Stylovani CSS

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

CSS tridy:
- `.polski-verified-badge` - kontejner odznaku
- `.polski-verified-badge__icon` - ikona
- `.polski-verified-badge__text` - text odznaku
- `.polski-verified-badge--large` - varianta velka

## Filtrovani recenzi

Modul pridava filtr na strance produktu umoznujici zakaznikum zobrazit:

- **Vsechny recenze** - vychozi zobrazeni
- **Pouze overene** - recenze s odznakem
- **Pouze neoverene** - recenze bez odznaku

```php
// Deaktivace filtru
add_filter('polski/verified_reviews/show_filter', '__return_false');
```

## Razeni recenzi

Overene recenze mohou byt priorizovany v razeni:

```php
add_filter('polski/verified_reviews/default_sort', function (): string {
    return 'verified_first'; // 'date', 'verified_first', 'rating_desc', 'rating_asc'
});
```

## Statistiky overeni

Panel admina (**WooCommerce > Polski > Overene recenze > Statistiky**) zobrazuje:

- **Celkovy pocet recenzi** - vsechny recenze v obchode
- **Overene** - recenze s odznakem (pocet a procento)
- **Neoverene** - recenze bez odznaku
- **Prumerne hodnoceni overenych** - prumerne hvezdicke hodnoceni recenzi s odznakem
- **Mesicni graf** - trend overenych vs neoverenych recenzi

## Ochrana pred falsenymi recenzemi

### Limit recenzi

Zakaznik muze vystavit maximalne 1 recenzi na produkt.

### Minimalni cas

Recenze muze byt vystavena teprve po X dnech od doruceni. Vychozi **3 dny**.

```php
add_filter('polski/verified_reviews/min_days_after_delivery', function (): int {
    return 7; // 7 dnu od doruceni
});
```

### Moderace

Recenze mohou vyzadovat moderaci pred publikaci:

- **Bez moderace** - recenze publikovany okamzite
- **Moderace neoverenych** - pouze recenze bez odznaku vyzaduji schvaleni
- **Moderace vsech** - vsechny recenze vyzaduji schvaleni

### Detekce podezrelych recenzi

System automaticky oznacuje podezrele recenze:

| Signal | Popis |
| ------------------------------------ | ---------------------------------------- |
| Vice recenzi z jedne IP | Vice nez 3 recenze ze stejne IP/den |
| Recenze okamzite po nakupu | Recenze vystavena behem minut od objednavky |
| Identicky text | Stejny text recenze na ruznych produktech |
| Podezrely e-mail | E-mailova adresa z docasne domeny |

## Integrace se Schema.org

Overene recenze generuji strukturovana data `Review` s odznakem vydavatele:

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
  "reviewBody": "Skvela kvalita, doporucuji.",
  "publisher": {
    "@type": "Organization",
    "name": "Muj obchod"
  }
}
```

## E-mail s zadosti o recenzi

Modul muze automaticky odesilat e-mail zakaznikovi s zadosti o recenzi po X dnech od doruceni.

| Moznost | Popis | Vychozi |
| ------------------- | ------------------------------- | --------- |
| Aktivovano | Zda odesilat e-mail | Ne |
| Zpozdeni | Dnu po doruceni | 7 |
| Sablona | Sablona e-mailu | Vychozi |
| Limit | Max 1 e-mail na objednavku | Ano |

```php
add_filter('polski/verified_reviews/email_delay_days', function (): int {
    return 14;
});
```

## Shortcode

```html
[polski_verified_badge text="Potvrzena objednavka" icon="shield"]
```

Shortcode zobrazuje odznak overeni. Uzitecny v nestandardnich sablonach recenzi.

## Reseni problemu

**Odznak se nezobrazuje pres nakup** - zkontrolujte stav objednavky. Pouze objednavky se stavem `completed` nebo `processing` se kvalifikuji pro overeni. Zkontrolujte take, zda e-mail v recenzi odpovida e-mailu z objednavky.

**Vsechny recenze jsou neoverene** - ujistete se, ze modul je aktivni a ze WooCommerce vyzaduje e-mailovou adresu pri pridavani recenzi.

**E-mail s zadosti o recenzi nedochazi** - zkontrolujte konfiguraci posty WordPressu. Pouzijte SMTP plugin pro spolehlive odesilani e-mailu.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
