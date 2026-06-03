---
title: AI popisy produktů
description: Dokumentace modulu AI popisů produktů v Polski PRO for WooCommerce - generování SEO popisů pomocí API kompatibilního s OpenAI, integrace s Yoast a RankMath.
---

Modul AI popisů produktů umožňuje automatické generování popisů produktů WooCommerce pomocí libovolného API kompatibilního s OpenAI. Popisy jsou optimalizovány pro SEO a přizpůsobeny zvolenému tónu komunikace.

:::note[Požadavky]
Je vyžadován API klíč ke službě kompatibilní s OpenAI (např. OpenAI, Azure OpenAI, lokální LLM s endpointem chat/completions).
:::

## Jak to funguje

1. Administrátor otevře editaci produktu WooCommerce
2. V meta boxu "AI popisy" vybere cíl generování a tón
3. Plugin odešle kontext produktu do API
4. Vygenerovaný text se zobrazí v meta boxu k náhledu
5. Administrátor text před uložením akceptuje nebo upraví

## Konfigurace

Přejděte na **WooCommerce > Nastavení > Polski PRO > AI popisy**.

Nastavení jsou uložena v možnosti:

```
polski_pro_ai_descriptions
```

### Nastavení API

| Nastavení | Popis | Výchozí |
|------------|------|-----------|
| API klíč | Autorizační klíč k API | - |
| URL API | Endpoint chat/completions | `https://api.openai.com/v1/chat/completions` |
| Model | AI model pro generování | `gpt-4o-mini` |
| Max tokens | Maximální délka odpovědi | 1024 |

### Nastavení generování

| Nastavení | Popis | Výchozí |
|------------|------|-----------|
| Tón | Styl komunikace | professional |
| Jazyk | Jazyk generovaných popisů | pl |
| SEO klíčová slova | Zohlednit klíčová slova v popisu | Ano |
| Vlastní prompt | Dodatečné instrukce pro AI model | - |

### Dostupné tóny

| Tón | Popis |
|-----|------|
| `professional` | Formální, věcný obchodní styl |
| `casual` | Přátelský, konverzační styl |
| `persuasive` | Přesvědčivý, zaměřený na prodej |
| `technical` | Podrobný, technický popis specifikací |
| `luxurious` | Exkluzivní, aspirační prémiový styl |

## Cíle generování

Meta box na stránce editace produktu umožňuje vybrat, jaký text má být vygenerován:

| Cíl | Popis |
|-----|------|
| Úplný popis | Hlavní popis produktu (post_content) |
| Krátký popis | Upoutávka produktu (post_excerpt) |
| SEO titulek | Meta titulek pro vyhledávače |
| SEO meta popis | Meta description pro vyhledávače |

SEO titulky a popisy jsou automaticky ukládány do polí příslušného SEO pluginu (Yoast SEO nebo RankMath).

## Integrace s SEO pluginy

Modul detekuje nainstalovaný SEO plugin a ukládá vygenerovaná data do příslušných meta polí:

### Yoast SEO

- SEO titulek ukládán do `_yoast_wpseo_title`
- SEO meta popis ukládán do `_yoast_wpseo_metadesc`

### RankMath

- SEO titulek ukládán do `rank_math_title`
- SEO meta popis ukládán do `rank_math_description`

Pokud není aktivní žádný SEO plugin, možnosti generování SEO titulku a meta popisu nejsou dostupné.

## Kontext produktu

Při každém požadavku na generování plugin odešle do API následující data produktu:

- **Název produktu** - titulek produktu
- **SKU** - katalogové číslo
- **Cena** - běžná a akční cena
- **Kategorie** - seznam kategorií produktu
- **Atributy** - všechny atributy a jejich hodnoty
- **Existující popisy** - aktuální úplný a krátký popis (pokud existují)

Tato data umožňují AI modelu vygenerovat výstižný a kontextově správný popis.

## Hromadné generování

Modul podporuje generování popisů pro více produktů najednou:

1. Přejděte na **Produkty > Všechny produkty**
2. Vyberte produkty ke generování
3. Ze seznamu "Hromadné akce" vyberte **Generovat AI popisy**
4. Vyberte cíl a tón generování
5. Klikněte na "Použít"

Hromadné generování funguje asynchronně přes AJAX - každý produkt je zpracován samostatně a panel průběhu ukazuje stav operace. To umožňuje vyhnout se překročení časového limitu serveru při velkém počtu produktů.

### Limity

- Každý úkol je samostatné volání API
- Je třeba zohlednit limity rate-limitingu API služby
- Při velkém počtu produktů může generování trvat několik minut

## Příklad použití

### Generování popisu pro jednotlivý produkt

1. Otevřete editaci produktu
2. Přejděte na meta box **AI popisy**
3. Vyberte cíl: "Úplný popis"
4. Vyberte tón: "persuasive"
5. Klikněte na **Generovat**
6. Zkontrolujte vygenerovaný text
7. Klikněte na **Vložit do popisu** pro přenesení textu do editoru

### Konfigurace vlastního endpointu

Pokud používáte lokální LLM model nebo jiného poskytovatele:

1. Změňte **URL API** na adresu svého endpointu (musí být kompatibilní s formátem OpenAI chat/completions)
2. Nastavte odpovídající **Model** (název modelu rozpoznávaný vaším endpointem)
3. Zadejte **API klíč** (pokud jej váš endpoint vyžaduje)

## Zapnutí modulu

Modul je řízen přepínačem v nastavení modulů PRO:

```
WooCommerce > Nastavení > Polski PRO > Moduly > AI popisy
```

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Polski PRO for WooCommerce je komerční software poskytovaný bez záruky.</div>
