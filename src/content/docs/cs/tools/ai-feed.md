---
title: AI Feed - viditelnost pro AI agenty
description: Modul AI Feed servíruje jednotlivé příspěvky, stránky a produkty WooCommerce ve formátu Markdown přes negociaci obsahu, takže AI agenti a LLM mohou číst obsah obchodu bez parsování HTML.
---

AI Feed zpřístupňuje obsah obchodu ve formátu **Markdown** optimalizovaném pro jazykové modely a nákupní agenty. HTTP klient odešle hlavičku `Accept: text/markdown` (nebo přidá `?output_format=md` do URL) a místo vykreslené HTML stránky obdrží čistý Markdown s YAML metadaty.

## K čemu to je

AI agenti (ChatGPT shopping, Perplexity, Gemini, vlastní LLM crawlery) stále častěji vynechávají HTML a ptají se rovnou na "čistou" verzi stránky. Tradiční scraping HTML je nespolehlivý, nákladný a ztrácel strukturovaná data. AI Feed vztah obrací: obchod sám publikuje strojově čitelnou verzi na stejné URL jako verzi pro člověka.

## Zapnutí modulu

Modul je standardně aktivní po aktualizaci na verzi 1.11.0. Můžete ho vypnout filtrem:

```php
add_filter('polski/ai_feed/enabled', '__return_false');
```

Nastavení v možnosti `polski_ai_feed`:

| Klíč | Výchozí hodnota | Popis |
|---|---|---|
| `enabled` | `true` | Globální přepínač |
| `post_types` | `['post', 'page', 'product']` | Typy obsahu servírované jako Markdown |

## Jak funguje negociace obsahu

Markdown je vrácen ve dvou případech:

1. **Hlavička `Accept`** obsahuje `text/markdown` (s výjimkou výslovného `q=0`).
2. **URL parametr** `?output_format=md` je přítomen v požadavku.

V obou případech má odpověď hlavičky:

```
Content-Type: text/markdown; charset=UTF-8
Vary: Accept
```

Běžní návštěvníci stále dostávají standardní HTML. Logika oprávnění (`read_post`, ochrana heslem, koncepty) je zachována.

## Detekce verze Markdown

Na HTML stránce jednotlivého příspěvku přidáváme do `<head>`:

```html
<link rel="alternate" type="text/markdown" href="https://obchod.cz/produkt/tricko/?output_format=md" />
```

Crawlery a AI agenti mohou najít verzi Markdown bez nutnosti znát konvence URL.

## Zkratka v adminu

V seznamu příspěvků, stránek a produktů se vedle akce "Zobrazit" objevuje odkaz **"View AI Version"**. Otevírá stejnou verzi Markdown, kterou uvidí AI agent - pohodlné pro testy a náhled.

## Co obsahuje verze Markdown produktu

Pro produkt WooCommerce odpověď obsahuje:

**Hlavička YAML (front matter)**

```yaml
---
title: "Tričko basic"
permalink: "https://obchod.cz/produkt/tricko/"
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
categories: ["Trička"]
---
```

**Sekce "Product details"** s odrážkovým seznamem:

- SKU a GTIN/EAN
- Cena s daní, regulérní cena, akční cena
- Daňová třída DPH
- Nejnižší cena za 30 dní (Omnibus)
- Doba dodání
- Skladový stav a dostupnost
- Hmotnost a rozměry
- Značka, výrobce
- Odpovědná osoba (GPSR)

**Úplný popis produktu** převedený na Markdown.

## Příklad úplné odpovědi

```markdown
---
title: "Tričko basic"
permalink: "https://obchod.cz/produkt/tricko/"
sku: "TS-001"
price: "49,99 zł"
in_stock: "true"
---

# Tričko basic

Bavlněné tričko klasického střihu.

## Product details

- **SKU:** TS-001
- **GTIN/EAN:** 5901234567890
- **Price:** 49,99 zł
- **Tax class:** Standard
- **Lowest price (last 30 days):** 45,00 zł
- **Delivery time:** 1-2 dny
- **Availability:** In stock
- **Weight:** 0.2 kg

## Description

Úplný popis produktu z bloků Gutenberg, včetně seznamů, tabulek a nadpisů.
```

## Manifest /llms.txt

V souladu se standardem [llmstxt.org](https://llmstxt.org) obchod zpřístupňuje soubor `/llms.txt` v kořeni domény. AI agenti se tam dívají v první řadě, aby objevili strukturu webu bez znalosti konvencí URL.

```bash
curl https://obchod.cz/llms.txt
```

Odpověď (Markdown):

```markdown
# Váš obchod

> Obchod s polskými suvenýry online.

## Legal

- [Obchodní podmínky](https://obchod.cz/podminky/?output_format=md): Terms and conditions
- [Zásady ochrany soukromí](https://obchod.cz/soukromi/?output_format=md): Privacy policy
- [Vrácení](https://obchod.cz/vraceni/?output_format=md): Returns and withdrawal policy

## Shop

- [Obchod](https://obchod.cz/obchod/): Storefront

## Product categories

- [Trička](https://obchod.cz/kategorie/tricka/)
- [Mikiny](https://obchod.cz/kategorie/mikiny/)
```

**Co je v manifestu standardně:**

- Název a popis obchodu (`get_bloginfo('name')`, `get_bloginfo('description')`)
- Sekce "Legal" s odkazy `?output_format=md` na právní stránky (Obchodní podmínky, Zásady ochrany soukromí, Vrácení, Reklamace) - pouze pokud jsou stránky vytvořené
- Sekce "Shop" s odkazem na stránku obchodu WooCommerce
- Sekce "Product categories" s 20 nejpopulárnějšími kategoriemi produktů (řazené podle počtu produktů)

**Vypnutí**

```php
add_filter('polski/ai_feed/llms_txt_enabled', '__return_false');
```

**Úprava sekcí**

```php
add_filter('polski/ai_feed/llms_txt_sections', static function (array $sections): array {
    $sections['Resources'] = [
        ['Blog', home_url('/blog/'), 'Nejnovější příspěvky'],
        ['FAQ', home_url('/faq/')],
    ];
    return $sections;
});
```

**Limit kategorií**

```php
add_filter('polski/ai_feed/llms_txt_category_limit', static fn () => 50);
```

## Vývojářské filtry

| Filtr | Účel |
|---|---|
| `polski/ai_feed/enabled` | Globální přepínač (bool) |
| `polski/ai_feed/post_types` | Seznam typů obsahu (string[]) |
| `polski/ai_feed/post_markdown` | Konečný Markdown příspěvku/stránky |
| `polski/ai_feed/product_markdown` | Konečný Markdown produktu |
| `polski/ai_feed/product_facts` | Seznam dvojic `[štítek, hodnota]` v sekci "Product details" |
| `polski/ai_feed/password_required` | Markdown obsah při ochraně heslem |
| `polski/ai_feed/llms_txt_enabled` | Vypínač pro `/llms.txt` (bool) |
| `polski/ai_feed/llms_txt_sections` | Mapa sekcí `[heading => list]` v manifestu |
| `polski/ai_feed/llms_txt_category_limit` | Maximální počet kategorií produktů (int) |

### Příklad - přidání vlastního CPT

```php
add_filter('polski/ai_feed/post_types', static function (array $types): array {
    $types[] = 'recipe';
    return $types;
});
```

### Příklad - přidání vlastního pole k produktu

```php
add_filter('polski/ai_feed/product_facts', static function (array $facts, WC_Product $product): array {
    $color = $product->get_attribute('pa_kolor');
    if ($color !== '') {
        $facts[] = ['Barva', $color];
    }
    return $facts;
}, 10, 2);
```

## FAQ

**Nahrazuje to šablonu pro běžné uživatele?**

Ne. HTML je vraceno standardně. Markdown se dostane jen ke klientům, kteří si o něj požádají přes `Accept` nebo URL parametr.

**Uniká heslem chráněný obsah?**

Ne. Když stránka vyžaduje heslo, AI Feed vrátí krátký Markdown s informací o ochraně místo úplného obsahu.

**Jsou podporovány koncepty?**

Ano, pro uživatele s oprávněním k editaci. Akce "View AI Version" v adminu používá preview URL pro koncepty a naplánované příspěvky.

**Mohu přidat vlastní typy obsahu?**

Ano, přes filtr `polski/ai_feed/post_types`. Standardně jsou podporovány `post`, `page` a `product`.

**Funguje to s HPOS a Block Checkout?**

Ano. Modul funguje na úrovni zobrazovací vrstvy produktu, nezávisle na úložišti objednávek (HPOS) a checkoutu (Blocks).
