---
title: AI popisy produktov
description: Dokumentácia modulu AI popisov produktov v Polski PRO for WooCommerce - generovanie SEO popisov s využitím API kompatibilného s OpenAI, integrácia s Yoast a RankMath.
---

Modul AI popisov produktov umožňuje automatické generovanie popisov produktov WooCommerce s využitím ľubovoľného API kompatibilného s OpenAI. Popisy sú optimalizované pre SEO a prispôsobené vybranému tónu komunikácie.

:::note[Požiadavky]
Vyžaduje sa API kľúč k službe kompatibilnej s OpenAI (napr. OpenAI, Azure OpenAI, lokálne LLM s endpointom chat/completions).
:::

## Ako to funguje

1. Administrátor otvorí editáciu produktu WooCommerce
2. V meta boxe "AI popisy" vyberie cieľ generovania a tón
3. Doplnok odošle kontext produktu do API
4. Vygenerovaný text sa zobrazí v meta boxe na náhľad
5. Administrátor schváli alebo upraví text pred uložením

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > AI popisy**.

Nastavenia sa ukladajú v možnosti:

```
polski_pro_ai_descriptions
```

### Nastavenia API

| Nastavenie | Popis | Predvolené |
|------------|------|-----------|
| API kľúč | Autorizačný kľúč k API | - |
| URL API | Endpoint chat/completions | `https://api.openai.com/v1/chat/completions` |
| Model | AI model na generovanie | `gpt-4o-mini` |
| Max tokens | Maximálna dĺžka odpovede | 1024 |

### Nastavenia generovania

| Nastavenie | Popis | Predvolené |
|------------|------|-----------|
| Tón | Štýl komunikácie | professional |
| Jazyk | Jazyk generovaných popisov | pl |
| SEO kľúčové slová | Zahrňte kľúčové slová do popisu | Áno |
| Vlastný prompt | Doplnkové inštrukcie pre AI model | - |

### Dostupné tóny

| Tón | Popis |
|-----|------|
| `professional` | Formálny, vecný obchodný štýl |
| `casual` | Priateľský, konverzačný štýl |
| `persuasive` | Presvedčivý, zameraný na predaj |
| `technical` | Podrobný, technický popis špecifikácií |
| `luxurious` | Exkluzívny, aspiračný premium štýl |

## Ciele generovania

Meta box na stránke editácie produktu umožňuje vybrať, aký text sa má vygenerovať:

| Cieľ | Popis |
|-----|------|
| Plný popis | Hlavný popis produktu (post_content) |
| Krátky popis | Anotácia produktu (post_excerpt) |
| SEO titulok | Meta titulok pre vyhľadávače |
| SEO meta popis | Meta description pre vyhľadávače |

SEO titulky a popisy sa automaticky ukladajú do polí príslušného SEO doplnku (Yoast SEO alebo RankMath).

## Integrácia s SEO doplnkami

Modul deteguje nainštalovaný SEO doplnok a ukladá vygenerované dáta do príslušných meta polí:

### Yoast SEO

- SEO titulok sa ukladá do `_yoast_wpseo_title`
- SEO meta popis sa ukladá do `_yoast_wpseo_metadesc`

### RankMath

- SEO titulok sa ukladá do `rank_math_title`
- SEO meta popis sa ukladá do `rank_math_description`

Ak nie je aktívny žiadny SEO doplnok, možnosti generovania SEO titulku a meta popisu sú nedostupné.

## Kontext produktu

Pri každej úlohe generovania doplnok odošle do API nasledujúce dáta produktu:

- **Názov produktu** - titulok produktu
- **SKU** - katalógové číslo
- **Cena** - bežná a akciová cena
- **Kategórie** - zoznam kategórií produktu
- **Atribúty** - všetky atribúty a ich hodnoty
- **Existujúce popisy** - aktuálny plný a krátky popis (ak existujú)

Tieto dáta umožňujú AI modelu vygenerovať trefný a kontextovo správny popis.

## Hromadné generovanie

Modul podporuje generovanie popisov pre viacero produktov súčasne:

1. Prejdite do **Produkty > Všetky produkty**
2. Vyberte produkty na generovanie
3. Zo zoznamu "Hromadné akcie" vyberte **Generovať AI popisy**
4. Vyberte cieľ a tón generovania
5. Kliknite "Použiť"

Hromadné generovanie funguje asynchrónne cez AJAX - každý produkt sa spracováva samostatne a indikátor priebehu ukazuje stav operácie. To umožňuje vyhnúť sa prekročeniu časového limitu servera pri veľkom počte produktov.

### Limity

- Každá úloha je samostatné volanie API
- Treba zohľadniť limity rate-limiting služby API
- Pri veľkom počte produktov môže generovanie trvať niekoľko minút

## Príklad použitia

### Generovanie popisu pre jeden produkt

1. Otvorte editáciu produktu
2. Prejdite na meta box **AI popisy**
3. Vyberte cieľ: "Plný popis"
4. Vyberte tón: "persuasive"
5. Kliknite **Generovať**
6. Prejdite vygenerovaný text
7. Kliknite **Vložiť do popisu** na prenesenie textu do editora

### Konfigurácia vlastného endpointu

Ak používate lokálny LLM model alebo iného poskytovateľa:

1. Zmeňte **URL API** na adresu svojho endpointu (musí byť kompatibilný s formátom OpenAI chat/completions)
2. Nastavte príslušný **Model** (názov modelu rozpoznávaný vaším endpointom)
3. Zadajte **API kľúč** (ak ho váš endpoint vyžaduje)

## Zapnutie modulu

Modul je riadený prepínačom v nastaveniach PRO modulov:

```
WooCommerce > Nastavenia > Polski PRO > Moduly > AI popisy
```

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Polski PRO for WooCommerce je komerčný softvér poskytovaný bez záruky.</div>
