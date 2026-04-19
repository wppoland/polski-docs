---
title: Opisy produktow AI
description: Dokumentacja modulu opisow produktow AI w Polski PRO for WooCommerce - generowanie opisow SEO z wykorzystaniem API kompatybilnego z OpenAI, integracja z Yoast i RankMath.
---

Modul opisow produktow AI umozliwia automatyczne generowanie opisow produktow WooCommerce z wykorzystaniem dowolnego API kompatybilnego z OpenAI. Opisy sa zoptymalizowane pod SEO i dostosowane do wybranego tonu komunikacji.

:::note[Wymagania]
Wymagany jest klucz API do uslugi kompatybilnej z OpenAI (np. OpenAI, Azure OpenAI, lokalne LLM z endpointem chat/completions).
:::

## Jak to dziala

1. Administrator otwiera edycje produktu WooCommerce
2. W meta boxie "Opisy AI" wybiera cel generowania i ton
3. Plugin wysyla kontekst produktu do API
4. Wygenerowany tekst pojawia sie w meta boxie do podgladu
5. Administrator akceptuje lub edytuje tekst przed zapisaniem

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Polski PRO > Opisy AI**.

Ustawienia sa przechowywane w opcji:

```
polski_pro_ai_descriptions
```

### Ustawienia API

| Ustawienie | Opis | Domyslnie |
|------------|------|-----------|
| Klucz API | Klucz autoryzacji do API | - |
| URL API | Endpoint chat/completions | `https://api.openai.com/v1/chat/completions` |
| Model | Model AI do generowania | `gpt-4o-mini` |
| Max tokens | Maksymalna dlugosc odpowiedzi | 1024 |

### Ustawienia generowania

| Ustawienie | Opis | Domyslnie |
|------------|------|-----------|
| Ton | Styl komunikacji | professional |
| Jezyk | Jezyk generowanych opisow | pl |
| Slowa kluczowe SEO | Uwzgledniaj slowa kluczowe w opisie | Tak |
| Wlasny prompt | Dodatkowe instrukcje dla modelu AI | - |

### Dostepne tony

| Ton | Opis |
|-----|------|
| `professional` | Formalny, rzeczowy styl biznesowy |
| `casual` | Przyjazny, konwersacyjny styl |
| `persuasive` | Przekonujacy, nastawiony na sprzedaz |
| `technical` | Szczegolowy, techniczny opis specyfikacji |
| `luxurious` | Ekskluzywny, aspiracyjny styl premium |

## Cele generowania

Meta box na stronie edycji produktu pozwala wybrac, jaki tekst ma zostac wygenerowany:

| Cel | Opis |
|-----|------|
| Pelny opis | Glowny opis produktu (post_content) |
| Krotki opis | Zajawka produktu (post_excerpt) |
| Tytul SEO | Tytul meta dla wyszukiwarek |
| Opis meta SEO | Meta description dla wyszukiwarek |

Tytuly i opisy SEO sa automatycznie zapisywane w polach odpowiedniego pluginu SEO (Yoast SEO lub RankMath).

## Integracja z pluginami SEO

Modul wykrywa zainstalowany plugin SEO i zapisuje wygenerowane dane w odpowiednich polach meta:

### Yoast SEO

- Tytul SEO zapisywany w `_yoast_wpseo_title`
- Opis meta SEO zapisywany w `_yoast_wpseo_metadesc`

### RankMath

- Tytul SEO zapisywany w `rank_math_title`
- Opis meta SEO zapisywany w `rank_math_description`

Jesli zaden plugin SEO nie jest aktywny, opcje generowania tytulu i opisu meta SEO sa niedostepne.

## Kontekst produktu

Przy kazdym zadaniu generowania plugin wysyla do API nastepujace dane produktu:

- **Nazwa produktu** - tytul produktu
- **SKU** - numer katalogowy
- **Cena** - cena regularna i promocyjna
- **Kategorie** - lista kategorii produktu
- **Atrybuty** - wszystkie atrybuty i ich wartosci
- **Istniejace opisy** - aktualny pelny i krotki opis (jesli istnieja)

Dane te pozwalaja modelowi AI wygenerowac trafny i kontekstowo poprawny opis.

## Generowanie zbiorcze

Modul obsluguje generowanie opisow dla wielu produktow jednoczesnie:

1. Przejdz do **Produkty > Wszystkie produkty**
2. Zaznacz produkty do generowania
3. Z listy "Akcje zbiorcze" wybierz **Generuj opisy AI**
4. Wybierz cel i ton generowania
5. Kliknij "Zastosuj"

Generowanie zbiorcze dziala asynchronicznie przez AJAX - kazdy produkt jest przetwarzany osobno, a pasek postepu pokazuje stan operacji. Pozwala to uniknac przekroczenia limitu czasu serwera przy duzej liczbie produktow.

### Limity

- Kazde zadanie to osobne wywolanie API
- Nalezy uwzglednic limity rate-limiting uslugi API
- Przy duzej liczbie produktow generowanie moze zajac kilka minut

## Przyklad uzycia

### Generowanie opisu dla pojedynczego produktu

1. Otworz edycje produktu
2. Przewin do meta boxa **Opisy AI**
3. Wybierz cel: "Pelny opis"
4. Wybierz ton: "persuasive"
5. Kliknij **Generuj**
6. Przejrzyj wygenerowany tekst
7. Kliknij **Wstaw do opisu** aby przeniesc tekst do edytora

### Konfiguracja wlasnego endpointu

Jesli korzystasz z lokalnego modelu LLM lub innego dostawcy:

1. Zmien **URL API** na adres swojego endpointu (musi byc kompatybilny z formatem OpenAI chat/completions)
2. Ustaw odpowiedni **Model** (nazwa modelu rozpoznawana przez Twoj endpoint)
3. Podaj **Klucz API** (jesli wymagany przez Twoj endpoint)

## Wlaczanie modulu

Modul jest kontrolowany przez przelacznik w ustawieniach modulow PRO:

```
WooCommerce > Ustawienia > Polski PRO > Moduly > Opisy AI
```

<div class="disclaimer">Ta strona ma wylacznie charakter informacyjny i nie stanowi porady prawnej. Polski PRO for WooCommerce jest oprogramowaniem komercyjnym dostarczanym bez gwarancji.</div>
