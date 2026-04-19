---
title: Reguly podatkowe
description: Silnik regul do automatycznego przypisywania kodow GTU, JPK_V7 oraz klas podatkowych do produktow WooCommerce.
---

Modul Regul podatkowych pozwala zautomatyzowac przypisywanie kodow GTU, kodow JPK_V7, klas podatkowych oraz kategorii/tagow do produktow WooCommerce na podstawie regul warunek/akcja. Dziala przy zapisie produktu, w codziennym cronie oraz manualnie (dry run + run now).

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.6.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Jak to dziala

1. Tworzysz regule: nazwa, tryb dopasowania (all/any), warunki, akcje, wyzwalacze i priorytet.
2. Silnik sprawdza warunki wobec kazdego produktu i stosuje akcje jesli regula pasuje.
3. Kazde zastosowanie regulujest zapisywane w logu audytu (kto, co, kiedy, dry run czy na zywo).
4. Wyzwalacze:
   - **Przy zapisie produktu** - regula uruchamia sie po utworzeniu lub edycji produktu
   - **Codziennie** - regula dziala w nocnym cronie na calym katalogu
   - **Co tydzien** - regula dziala raz w tygodniu (WP cron)
   - **Co miesiac** - regula dziala raz na 30 dni (WP cron)
   - **Recznie** - regula odpala sie tylko z poziomu panelu (Dry run / Run now)

## Konfiguracja

Przejdz do **WooCommerce > Reguly podatkowe** i kliknij **Dodaj regule**.

### Pola reguly

| Pole | Opis |
|------|------|
| Nazwa | Opisowa nazwa dla zespolu (np. "Ksiazki -> GTU_12") |
| Wlaczona | Mozesz tymczasowo wylaczyc regule bez usuwania |
| Tryb dopasowania | `all` - wszystkie warunki musza pasowac, `any` - wystarczy jeden |
| Wyzwalacze | Kiedy regula dziala (zapis / cron / recznie) |
| Priorytet | Kolejnosc uruchamiania, rosnaco (10 to wartosc domyslna) |

### Warunki

Format: `field | operator | value | key` (ostatnie pole opcjonalne).

Przykladowe pola: `title`, `sku`, `price`, `regular_price`, `stock_quantity`, `stock_status`, `category`, `tag`, `type`, `attribute`, `tax_class`, `meta_field`, `gtu_code`, `jpk_v7_code`, `taxonomy`.

Pole `taxonomy` obsluguje dowolna niestandardowa taksonomie (np. `product_brand`, `pwb-brand`). W polu `key` wpisz slug taksonomii, w `value` liste ID termow:

```
taxonomy | in | 12,34,56 | product_brand
```

Operatory: `equals`, `not_equals`, `contains`, `not_contains`, `starts_with`, `ends_with`, `gt`, `gte`, `lt`, `lte`, `in`, `not_in`, `is_empty`, `is_not_empty`.

Przyklady:

```
title | contains | ksiazka
price | gte | 100
category | in | 42,56,78
meta_field | equals | tak | _polski_tabletka
```

### Akcje

Format: `action_type | value`.

| Akcja | Opis | Przyklad |
|-------|------|---------|
| `set_gtu_code` | Przypisuje kod GTU do produktu | `set_gtu_code \| GTU_06` |
| `remove_gtu_code` | Usuwa kod GTU | `remove_gtu_code \| ` |
| `set_jpk_v7_code` | Przypisuje kod JPK_V7 | `set_jpk_v7_code \| GTU_12` |
| `set_tax_class` | Ustawia klase podatkowa WooCommerce | `set_tax_class \| reduced-rate` |
| `add_category` | Dodaje produkt do kategorii | `add_category \| 42` |
| `add_tag` | Dodaje tag | `add_tag \| 77` |
| `set_meta_field` | Ustawia pole meta | `set_meta_field \| _polski_custom:jakis-znacznik` |
| `mark_receipt_with_nip` | Oznacza produkt jako wymagajacy paragonu z NIP | `mark_receipt_with_nip \| 1` |

### Dry run i Audit log

Kazda regula ma w panelu przyciski:

- **Dry run** - przechodzi po wszystkich produktach i zapisuje w logu co by zmieniono, bez zmian w bazie.
- **Run now** - stosuje regule na calym katalogu i zapisuje zmiany.

Zakladka **Audit log** pokazuje ostatnie 200 zastosowan regul: data, regula, produkt, czy dopasowano, czy dry run, oraz zastosowane akcje.

## Przyklady

### Wszystkie ksiazki -> JPK_V7 `GTU_12`

- Tryb dopasowania: `any`
- Warunek: `category | in | <ID kategorii Ksiazki>`
- Warunek: `title | contains | ksiazka`
- Akcja: `set_jpk_v7_code | GTU_12`

### Leki -> obnizona stawka VAT 8%

- Tryb dopasowania: `all`
- Warunek: `category | equals | <ID kategorii Leki>`
- Akcja: `set_tax_class | reduced-rate`
- Akcja: `set_gtu_code | GTU_09`

### Uslugi > 15 000 PLN -> paragon z NIP wymagany

- Tryb dopasowania: `all`
- Warunek: `type | equals | service`
- Warunek: `price | gte | 15000`
- Akcja: `mark_receipt_with_nip | 1`

## Integracje

Przypisane kody GTU i JPK_V7 zapisywane sa jako meta produktow i moga byc wykorzystane przez:

- modul fakturowania (Faktura VAT PDF + KSeF)
- eksport JPK_VAT
- integracje ksiegowe (wFirma, Fakturownia, iFirma)

## Smart Pickers (pomocnik w edytorze)

Na gorze edytora reguly panel **Insert helper** pozwala dodawac linie warunkow i akcji bez recznego wpisywania ID. Dostepne pickery:

- **Kategoria** - lista wszystkich `product_cat` (Select2, wyszukiwarka). Przyciski: "Append as condition" (dodaje `category | in | <ID>`) i "Append as action" (dodaje `add_category | <ID>`).
- **Tag** - analogicznie dla `product_tag`.
- **Klasa podatkowa** - lista klas podatkowych WooCommerce (Standard + wszystkie dodatkowe). Pickery: `set_tax_class | <slug>` i `tax_class | equals | <slug>`.
- **Kod GTU** - dropdown `GTU_01` - `GTU_13`. Trzy przyciski: dodanie jako `set_gtu_code`, `set_jpk_v7_code` lub warunku `gtu_code | equals | <CODE>`.

Textarea pozostaje zrodlem prawdy - pickery tylko dopisuja gotowe linie.

## Grupy regul

Kazda regula moze miec opcjonalna **etykiete grupy** (pole `group_label` w edytorze). Grupy uzywane sa tylko do organizacji i filtrowania w panelu - nie wplywaja na dzialanie regul. Przyklady grup: "Ksiazki", "Leki", "Zywnosc VAT 5%", "Wyposazenie - GTU_06".

## Wyszukiwanie i filtrowanie

Lista regul w panelu obsluguje:

- **Wyszukiwanie** po nazwie reguly (niezalezne od wielkosci liter)
- **Filtr statusu**: enabled / disabled
- **Filtr wyzwalacza**: on_save / daily / manual
- **Filtr grupy** (widoczny tylko jesli sa przypisane etykiety)

## Import / eksport regul

W zakladce **Import / export**:

- **Export** - pobiera wszystkie reguly jako przenosny plik JSON (format `polski.tax_rules`, v1). Uzywaj do kopii zapasowej lub migracji miedzy sklepami.
- **Import** - wgrywa wczesniej wyeksportowany JSON. Reguly sa zawsze **dopisywane** (nigdy nie nadpisuja istniejacych po ID), wiec mozna bezpiecznie laczyc reguly z wielu sklepow.

Plik JSON ma strukture:

```json
{
  "format": "polski.tax_rules",
  "version": 1,
  "exported_at": "2026-04-19T12:00:00+00:00",
  "rules": [
    {
      "name": "Ksiazki -> GTU_12",
      "group_label": "Ksiazki",
      "enabled": true,
      "match_mode": "all",
      "priority": 10,
      "triggers": ["on_save"],
      "conditions": [
        { "field": "category", "operator": "in", "value": [42], "key": null }
      ],
      "actions": [
        { "type": "set_jpk_v7_code", "value": "GTU_12" }
      ]
    }
  ]
}
```

## WP-CLI

Dla duzych sklepow i automatyzacji:

```bash
# Lista regul
wp polski tax-rules list
wp polski tax-rules list --format=json

# Uruchom regule #3 w trybie dry-run
wp polski tax-rules run 3 --dry-run

# Uruchom regule #3 na zywo (paczki po 100 produktow)
wp polski tax-rules run 3 --batch-size=100

# Export regul do pliku
wp polski tax-rules export --file=/tmp/rules.json

# Import z pliku
wp polski tax-rules import /tmp/rules.json
```

## Bulk action na liscie produktow

Na standardowej liscie produktow WooCommerce (`wp-admin/edit.php?post_type=product`) w dropdown "Akcje hurtowe" dostepne sa dwie pozycje:

- **Apply tax rules** - uruchamia wszystkie aktywne reguly na zaznaczonych produktach.
- **Dry-run tax rules** - raportuje co by sie zmienilo, bez zapisu.

Po wykonaniu panel wyswietla notice z liczba przetworzonych produktow, dopasowan i zmian.

## Limity i wydajnosc

- Cron dzienny przetwarza katalog w paczkach po 50 produktow.
- Log jest ograniczony do 10 000 wierszy - starsze sa automatycznie kasowane.
- Silnik zabezpiecza sie przed rekurencja: regula nie odpala sie wielokrotnie podczas wewnetrznego zapisu produktu.

:::caution
Zawsze przetestuj nowa regule w trybie **Dry run** zanim ja uruchomisz na calym katalogu. Po zmianie klasy podatkowej / kodu JPK nalezy ponownie przeliczyc faktury i eksporty.
:::
