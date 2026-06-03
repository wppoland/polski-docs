---
title: FAQ (Často kladené otázky)
description: Modul FAQ v Polski for WooCommerce - CPT polski_faq, taxonomie faq_category, shortcode, CSS akordeon a Schema.org FAQPage.
---

Modul FAQ umožňuje vytvářet a zobrazovat sekci často kladených otázek v obchodě. Otázky jsou ukládány jako samostatný typ příspěvku (CPT) s vlastní taxonomií kategorií, což umožňuje flexibilní správu a zobrazení.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **FAQ** (ID modulu: `faq`).

Po zapnutí se v admin menu objeví nová položka **FAQ** s podstránkami pro správu otázek a kategorií.

## Administrační panel

Správa otázek FAQ probíhá v **FAQ** (`edit.php?post_type=polski_faq`). Rozhraní funguje stejně jako standardní příspěvky WordPress.

### Přidání otázky

1. Přejděte do **FAQ > Přidat novou**
2. Do pole titulku zadejte text otázky
3. V editoru zadejte odpověď (podporován je plný blokový editor)
4. Přiřaďte kategorii FAQ (volitelně)
5. Nastavte pořadí zobrazení v poli **Pořadí** (menu_order)
6. Publikujte

### Kategorie FAQ

Taxonomie `faq_category` umožňuje seskupovat otázky tematicky. Správa kategorií: **FAQ > Kategorie FAQ**.

Příklady kategorií:

- Objednávky a platby
- Doprava a vrácení
- Zákaznický účet
- Produkty

## Shortcode `[polski_faq]`

Zobrazuje seznam otázek FAQ ve formě CSS akordeonu.

### Parametry

| Parametr   | Typ    | Výchozí   | Popis                                             |
| ---------- | ------ | --------- | ------------------------------------------------- |
| `category` | string | (prázdné) | Slug kategorie FAQ k zobrazení                    |
| `limit`    | int    | `-1`      | Maximální počet otázek (-1 = všechny)             |
| `orderby`  | string | `menu_order` | Pole řazení: `menu_order`, `title`, `date`     |
| `order`    | string | `ASC`     | Směr řazení: `ASC` nebo `DESC`                    |

### Příklady použití

Zobrazit všechny otázky:

```html
[polski_faq]
```

Zobrazit otázky z kategorie "doprava":

```html
[polski_faq category="doprava" limit="5"]
```

Zobrazit 10 nejnovějších otázek:

```html
[polski_faq limit="10" orderby="date" order="DESC"]
```

### Použití v PHP šabloně

```php
echo do_shortcode('[polski_faq category="objednavky" limit="10"]');
```

## CSS akordeon

Otázky se zobrazují jako akordeon, kliknutí na otázku rozbalí odpověď. Akordeon funguje zcela na CSS (bez JavaScriptu), což zajišťuje maximální výkon.

Mechanismus je založen na HTML prvku `<details>` s `<summary>`:

```html
<div class="polski-faq">
  <details class="polski-faq__item">
    <summary class="polski-faq__question">Jak zadat objednávku?</summary>
    <div class="polski-faq__answer">
      <p>Pro zadání objednávky přidejte produkty do košíku...</p>
    </div>
  </details>
</div>
```

### CSS třídy

- `.polski-faq` - kontejner FAQ
- `.polski-faq__item` - jednotlivá otázka (prvek `<details>`)
- `.polski-faq__question` - text otázky (prvek `<summary>`)
- `.polski-faq__answer` - text odpovědi
- `.polski-faq__category` - nadpis kategorie (při zobrazení se seskupením)

### Přizpůsobení vzhledu

```css
/* Změna barvy pozadí aktivní otázky */
.polski-faq__item[open] .polski-faq__question {
    background-color: #f0f0f0;
}

/* Změna ikony rozbalení */
.polski-faq__question::marker {
    content: "+";
}

.polski-faq__item[open] .polski-faq__question::marker {
    content: "-";
}
```

## Schema.org FAQPage

Modul automaticky generuje značky Schema.org `FAQPage` ve formátu JSON-LD na stránkách obsahujících shortcode `[polski_faq]`:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Jak zadat objednávku?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pro zadání objednávky přidejte produkty do košíku..."
      }
    },
    {
      "@type": "Question",
      "name": "Jaká je doba dodání?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standardní doba dodání je 2-3 pracovní dny..."
      }
    }
  ]
}
```

Značky FAQPage umožňují Google zobrazovat otázky a odpovědi přímo ve výsledcích vyhledávání (rich snippets).

Vypnutí Schema.org:

```php
add_filter('polski/faq/schema_enabled', '__return_false');
```

## Hooky

### Filtry

```php
// Změna argumentů dotazu FAQ
add_filter('polski/faq/query_args', function (array $args): array {
    $args['posts_per_page'] = 20;
    return $args;
});

// Úprava HTML odpovědi před zobrazením
add_filter('polski/faq/answer_html', function (string $html, int $post_id): string {
    return wp_kses_post($html);
}, 10, 2);
```

### Akce

```php
// Přidat vlastní prvek před sekci FAQ
add_action('polski/faq/before', function (): void {
    echo '<h2>Máte otázky? Zde jsou odpovědi:</h2>';
});

// Přidat vlastní prvek za sekci FAQ
add_action('polski/faq/after', function (): void {
    echo '<p>Nenašli jste odpověď? <a href="/kontakt">Kontaktujte nás</a>.</p>';
});
```

## Řešení problémů

**Shortcode zobrazuje prázdný kontejner** - zkontrolujte, zda máte publikované otázky FAQ. Koncepty a naplánované otázky se nezobrazují.

**Akordeon nefunguje** - ujistěte se, že šablona neblokuje prvek `<details>`. Některé resetovací CSS soubory mohou tento prvek skrývat.

**Schema.org se neobjevuje** - ověřte značky nástrojem [Google Rich Results Test](https://search.google.com/test/rich-results). Ujistěte se, že shortcode je na stránce (nikoli ve widgetu v postranním panelu).

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Polski for WooCommerce je software s otevřeným zdrojovým kódem (GPLv2) poskytovaný bez záruky.</div>
