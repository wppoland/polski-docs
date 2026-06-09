---
title: Numer BDO
description: Wyświetl swój numer rejestrowy BDO (Baza Danych o Odpadach) w Polski dla WooCommerce za pomocą shortcode'u [polski_bdo] lub bloku.
---

BDO (Baza Danych o Odpadach) to rejestr podmiotów wprowadzających produkty i opakowania oraz gospodarujących odpadami. Firmy wprowadzające produkty lub opakowania na rynek polski często prezentują swój numer rejestrowy BDO na stronie, na przykład w stopce, oraz na dokumentach.

Polski dla WooCommerce daje proste miejsce na zapisanie numeru BDO oraz shortcode i blok do jego wyświetlania. Moduł wyświetla wyłącznie numer, który podasz. Nie składa sprawozdań do BDO i nie rozstrzyga, czy Twoja firma ma obowiązek rejestracji, to potwierdź z księgowością.

## Włącz moduł

1. Otwórz **Polski → Moduły** i znajdź **Numer BDO** w sekcji Zgodność prawna.
2. Włącz moduł.
3. Wpisz swój **numer BDO** w ustawieniach modułu i zapisz.

## Wyświetl numer

Użyj jednego z:

- shortcode'u `[polski_bdo]`,
- bloku **Numer BDO** (wpisz "BDO" w wyszukiwarce bloków).

Oba wyświetlają numer BDO z etykietą "BDO:".

### Atrybuty shortcode'u

| Atrybut | Domyślnie | Opis |
|---|---|---|
| `show_label` | `1` | Ustaw `0`, aby ukryć etykietę "BDO:" i pokazać sam numer. |
| `label` | puste | Zmień tekst etykiety. |

Przykłady:

```text
[polski_bdo]
[polski_bdo show_label="0"]
[polski_bdo label="Nr BDO"]
```

## Pokaż w stopce razem z danymi firmy

Jeśli korzystasz z modułu **Dane identyfikacyjne firmy**, możesz pokazać numer BDO obok nazwy firmy, adresu i NIP. Dodaj `show_bdo="1"` do shortcode'u danych firmy:

```text
[polski_business_info show_bdo="1"]
```

## Uwagi

- Numer BDO zapisujesz raz i jest używany wszędzie tam, gdzie go wyświetlasz.
- Gdy pole jest puste, shortcode i blok nic nie wyświetlają.
