---
title: FAQ (Najčastejšie kladené otázky)
description: Modul FAQ v Polski for WooCommerce - CPT polski_faq, taxonómia faq_category, shortcode, CSS akordeón a Schema.org FAQPage.
---

Modul FAQ umožňuje vytvárať a zobrazovať sekciu najčastejšie kladených otázok v obchode. Otázky sú uložené ako samostatný typ príspevku (CPT) s vlastnou taxonómiou kategórií, čo umožňuje flexibilnú správu a zobrazenie.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Moduly obchodu** a zapnite **FAQ** (ID modulu: `faq`).

Po zapnutí sa v admin menu objaví nová položka **FAQ** s podstránkami na správu otázok a kategórií.

## Administračný panel

Správa FAQ otázok prebieha v **FAQ** (`edit.php?post_type=polski_faq`). Rozhranie funguje rovnako ako štandardné príspevky WordPress.

### Pridanie otázky

1. Prejdite do **FAQ > Pridať novú**
2. Do poľa názvu zadajte obsah otázky
3. Do editora zadajte odpoveď (podporovaný je plný blokový editor)
4. Priraďte kategóriu FAQ (voliteľné)
5. Nastavte poradie zobrazenia v poli **Poradie** (menu_order)
6. Publikujte

### Kategórie FAQ

Taxonómia `faq_category` umožňuje zoskupovať otázky tematicky. Správa kategórií: **FAQ > Kategórie FAQ**.

Príklady kategórií:

- Objednávky a platby
- Doprava a vrátenie
- Účet zákazníka
- Produkty

## Shortcode `[polski_faq]`

Zobrazuje zoznam FAQ otázok vo forme CSS akordeónu.

### Parametre

| Parameter   | Typ    | Predvolene | Popis                                              |
| ---------- | ------ | --------- | ------------------------------------------------- |
| `category` | string | (prázdny)   | Slug kategórie FAQ na zobrazenie                  |
| `limit`    | int    | `-1`      | Maximálny počet otázok (-1 = všetky)              |
| `orderby`  | string | `menu_order` | Pole zoraďovania: `menu_order`, `title`, `date` |
| `order`    | string | `ASC`     | Smer zoraďovania: `ASC` alebo `DESC`              |

### Príklady použitia

Zobraziť všetky otázky:

```html
[polski_faq]
```

Zobraziť otázky z kategórie "doprava":

```html
[polski_faq category="doprava" limit="5"]
```

Zobraziť 10 najnovších otázok:

```html
[polski_faq limit="10" orderby="date" order="DESC"]
```

### Použitie v PHP šablóne

```php
echo do_shortcode('[polski_faq category="objednavky" limit="10"]');
```

## CSS akordeón

Otázky sa zobrazujú ako akordeón, kliknutie na otázku rozbalí odpoveď. Akordeón funguje úplne na CSS (bez JavaScriptu), čo zabezpečuje maximálny výkon.

Mechanizmus je založený na HTML elemente `<details>` s `<summary>`:

```html
<div class="polski-faq">
  <details class="polski-faq__item">
    <summary class="polski-faq__question">Ako zadať objednávku?</summary>
    <div class="polski-faq__answer">
      <p>Ak chcete zadať objednávku, pridajte produkty do košíka...</p>
    </div>
  </details>
</div>
```

### CSS triedy

- `.polski-faq` - kontajner FAQ
- `.polski-faq__item` - jednotlivá otázka (element `<details>`)
- `.polski-faq__question` - obsah otázky (element `<summary>`)
- `.polski-faq__answer` - obsah odpovede
- `.polski-faq__category` - hlavička kategórie (pri zobrazení so zoskupením)

### Prispôsobenie vzhľadu

```css
/* Zmena farby pozadia aktívnej otázky */
.polski-faq__item[open] .polski-faq__question {
    background-color: #f0f0f0;
}

/* Zmena ikony rozbalenia */
.polski-faq__question::marker {
    content: "+";
}

.polski-faq__item[open] .polski-faq__question::marker {
    content: "-";
}
```

## Schema.org FAQPage

Modul automaticky generuje značky Schema.org `FAQPage` vo formáte JSON-LD na stránkach obsahujúcich shortcode `[polski_faq]`:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ako zadať objednávku?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ak chcete zadať objednávku, pridajte produkty do košíka..."
      }
    },
    {
      "@type": "Question",
      "name": "Aký je čas dodania?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Štandardný čas dodania je 2-3 pracovné dni..."
      }
    }
  ]
}
```

Značky FAQPage umožňujú Google zobrazovať otázky a odpovede priamo vo výsledkoch vyhľadávania (rich snippets).

Vypnutie Schema.org:

```php
add_filter('polski/faq/schema_enabled', '__return_false');
```

## Hooky

### Filtre

```php
// Zmena argumentov dopytu FAQ
add_filter('polski/faq/query_args', function (array $args): array {
    $args['posts_per_page'] = 20;
    return $args;
});

// Úprava HTML odpovede pred zobrazením
add_filter('polski/faq/answer_html', function (string $html, int $post_id): string {
    return wp_kses_post($html);
}, 10, 2);
```

### Akcie

```php
// Pridaj vlastný element pred sekciu FAQ
add_action('polski/faq/before', function (): void {
    echo '<h2>Máte otázky? Tu sú odpovede:</h2>';
});

// Pridaj vlastný element po sekcii FAQ
add_action('polski/faq/after', function (): void {
    echo '<p>Nenašli ste odpoveď? <a href="/kontakt">Kontaktujte nás</a>.</p>';
});
```

## Riešenie problémov

**Shortcode zobrazuje prázdny kontajner** - skontrolujte, či máte publikované FAQ otázky. Koncepty a naplánované sa nezobrazujú.

**Akordeón nefunguje** - uistite sa, že šablóna neblokuje element `<details>`. Niektoré resetovacie CSS hárky môžu tento element skryť.

**Schema.org sa nezobrazuje** - overte značky nástrojom [Google Rich Results Test](https://search.google.com/test/rich-results). Uistite sa, že shortcode je na stránke (nie vo widgete sidebar).

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právnu radu. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
