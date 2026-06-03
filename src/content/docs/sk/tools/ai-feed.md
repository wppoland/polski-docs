---
title: AI Feed - viditeľnosť pre AI agentov
description: Modul AI Feed serveruje jednotlivé príspevky, stránky a produkty WooCommerce vo formáte Markdown cez negociáciu obsahu, vďaka čomu AI agenti a LLM môžu čítať obsah obchodu bez parsovania HTML.
---

AI Feed sprístupňuje obsah obchodu vo formáte **Markdown** optimalizovanom pre jazykové modely a nákupných agentov. HTTP klient pošle hlavičku `Accept: text/markdown` (alebo pridá `?output_format=md` k URL) a namiesto vyrenderovanej HTML stránky dostane čistý Markdown s YAML metadátami.

## Načo je to dobré

AI agenti (ChatGPT shopping, Perplexity, Gemini, vlastné LLM crawlery) čoraz častejšie obchádzajú HTML a pýtajú sa rovno na "čistú" verziu stránky. Tradičný scraping HTML je nespoľahlivý, nákladný a strácal štruktúrované dáta. AI Feed obracia vzťah: obchod sám zverejňuje strojovo čitateľnú verziu na rovnakom URL ako verzia pre človeka.

## Zapnutie modulu

Modul je predvolene aktívny po aktualizácii na verziu 1.11.0. Vypnúť ho môžete filtrom:

```php
add_filter('polski/ai_feed/enabled', '__return_false');
```

Nastavenia v možnosti `polski_ai_feed`:

| Kľúč | Predvolená hodnota | Popis |
|---|---|---|
| `enabled` | `true` | Globálny prepínač |
| `post_types` | `['post', 'page', 'product']` | Typy obsahu serverované ako Markdown |

## Ako funguje negociácia obsahu

Markdown sa vracia v dvoch prípadoch:

1. **Hlavička `Accept`** obsahuje `text/markdown` (s výnimkou výslovného `q=0`).
2. **URL parameter** `?output_format=md` je prítomný v požiadavke.

V oboch prípadoch má odpoveď hlavičky:

```
Content-Type: text/markdown; charset=UTF-8
Vary: Accept
```

Bežní návštevníci naďalej dostávajú štandardné HTML. Logika oprávnení (`read_post`, ochrana heslom, pracovné verzie) je zachovaná.

## Zisťovanie Markdown verzie

Na HTML stránke jednotlivého príspevku pridávame do `<head>`:

```html
<link rel="alternate" type="text/markdown" href="https://obchod.sk/produkt/tricko/?output_format=md" />
```

Crawlery a AI agenti môžu nájsť Markdown verziu bez nutnosti poznať konvenciu URL.

## Skratka v admin paneli

V zozname príspevkov, stránok a produktov sa popri akcii "Zobraziť" objavuje odkaz **"View AI Version"**. Otvára tú istú Markdown verziu, ktorú uvidí AI agent - pohodlné na testovanie a náhľad.

## Čo obsahuje Markdown verzia produktu

Pre produkt WooCommerce odpoveď obsahuje:

**YAML hlavička (front matter)**

```yaml
---
title: "Koszulka basic"
permalink: "https://sklep.pl/produkt/koszulka/"
sku: "TS-001"
gtin: "5901234567890"
product_type: "simple"
currency: "PLN"
price: "49,99 zł"
regular_price: "59,99 zł"
sale_price: "49,99 zł"
in_stock: "true"
on_sale: "true"
modified: "2026-04-30T12:00:00+02:00"
categories: ["Koszulki"]
---
```

**Sekcia "Product details"** s odrážkovým zoznamom:

- SKU a GTIN/EAN
- Cena brutto, regulárna cena, akciová cena
- Daňová trieda VAT
- Najnižšia cena za 30 dní (Omnibus)
- Čas doručenia
- Skladový stav a dostupnosť
- Hmotnosť a rozmery
- Značka, výrobca
- Zodpovedná osoba (GPSR)

**Úplný opis produktu** prevedený na Markdown.

## Príklad úplnej odpovede

```markdown
---
title: "Koszulka basic"
permalink: "https://sklep.pl/produkt/koszulka/"
sku: "TS-001"
price: "49,99 zł"
in_stock: "true"
---

# Koszulka basic

Bawełniana koszulka klasycznego kroju.

## Product details

- **SKU:** TS-001
- **GTIN/EAN:** 5901234567890
- **Price:** 49,99 zł
- **Tax class:** Standard
- **Lowest price (last 30 days):** 45,00 zł
- **Delivery time:** 1-2 dni
- **Availability:** In stock
- **Weight:** 0.2 kg

## Description

Pełny opis produktu z bloków Gutenberga, w tym listy, tabele i nagłówki.
```

## Manifest /llms.txt

V súlade so štandardom [llmstxt.org](https://llmstxt.org) obchod sprístupňuje súbor `/llms.txt` v koreni domény. AI agenti sa tam pozerajú v prvom rade, aby objavili štruktúru stránky bez znalosti konvencie URL.

```bash
curl https://sklep.pl/llms.txt
```

Odpoveď (Markdown):

```markdown
# Twój sklep

> Sklep z polskimi pamiątkami online.

## Legal

- [Regulamin](https://sklep.pl/regulamin/?output_format=md): Terms and conditions
- [Polityka prywatności](https://sklep.pl/polityka/?output_format=md): Privacy policy
- [Zwroty](https://sklep.pl/zwroty/?output_format=md): Returns and withdrawal policy

## Shop

- [Sklep](https://sklep.pl/sklep/): Storefront

## Product categories

- [Koszulki](https://sklep.pl/kategoria/koszulki/)
- [Bluzy](https://sklep.pl/kategoria/bluzy/)
```

**Čo sa nachádza v manifeste predvolene:**

- Názov a popis obchodu (`get_bloginfo('name')`, `get_bloginfo('description')`)
- Sekcia "Legal" s odkazmi `?output_format=md` na právne stránky (Obchodné podmienky, Zásady ochrany súkromia, Vrátenia, Reklamácie) - len ak sú stránky vytvorené
- Sekcia "Shop" s odkazom na stránku obchodu WooCommerce
- Sekcia "Product categories" s 20 najpopulárnejšími kategóriami produktov (zoradené podľa počtu produktov)

**Vypnutie**

```php
add_filter('polski/ai_feed/llms_txt_enabled', '__return_false');
```

**Úprava sekcií**

```php
add_filter('polski/ai_feed/llms_txt_sections', static function (array $sections): array {
    $sections['Resources'] = [
        ['Blog', home_url('/blog/'), 'Najnowsze wpisy'],
        ['FAQ', home_url('/faq/')],
    ];
    return $sections;
});
```

**Limit kategórií**

```php
add_filter('polski/ai_feed/llms_txt_category_limit', static fn () => 50);
```

## Vývojárske filtre

| Filter | Účel |
|---|---|
| `polski/ai_feed/enabled` | Globálny prepínač (bool) |
| `polski/ai_feed/post_types` | Zoznam typov obsahu (string[]) |
| `polski/ai_feed/post_markdown` | Konečný Markdown príspevku/stránky |
| `polski/ai_feed/product_markdown` | Konečný Markdown produktu |
| `polski/ai_feed/product_facts` | Zoznam párov `[štítok, hodnota]` v sekcii "Product details" |
| `polski/ai_feed/password_required` | Markdown obsah pri ochrane heslom |
| `polski/ai_feed/llms_txt_enabled` | Vypínač pre `/llms.txt` (bool) |
| `polski/ai_feed/llms_txt_sections` | Mapa sekcií `[heading => list]` v manifeste |
| `polski/ai_feed/llms_txt_category_limit` | Maximálny počet kategórií produktov (int) |

### Príklad - pridanie vlastného CPT

```php
add_filter('polski/ai_feed/post_types', static function (array $types): array {
    $types[] = 'recipe';
    return $types;
});
```

### Príklad - pridanie vlastného poľa k produktu

```php
add_filter('polski/ai_feed/product_facts', static function (array $facts, WC_Product $product): array {
    $color = $product->get_attribute('pa_kolor');
    if ($color !== '') {
        $facts[] = ['Kolor', $color];
    }
    return $facts;
}, 10, 2);
```

## FAQ

**Nahrádza to tému pre bežných používateľov?**

Nie. HTML sa vracia predvolene. Markdown putuje len ku klientom, ktorí oň požiadajú cez `Accept` alebo URL parameter.

**Unikajú heslom chránené obsahy?**

Nie. Keď stránka vyžaduje heslo, AI Feed vracia krátky Markdown s informáciou o ochrane namiesto úplného obsahu.

**Sú podporované pracovné verzie?**

Áno, pre používateľov s oprávnením na úpravu. Akcia "View AI Version" v admin paneli používa preview URL pre pracovné a naplánované verzie.

**Môžem pridať vlastné typy obsahu?**

Áno, cez filter `polski/ai_feed/post_types`. Predvolene sú podporované `post`, `page` a `product`.

**Funguje to s HPOS a Block Checkout?**

Áno. Modul funguje na úrovni vrstvy zobrazenia produktu, nezávisle od úložiska objednávok (HPOS) a checkoutu (Blocks).
