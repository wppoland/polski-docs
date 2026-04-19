---
title: Identyfikacja firmy w stopce
description: Wyswietlanie danych firmy (nazwa, NIP, adres, kontakt) w stopce sklepu poprzez shortcode [polski_business_info] lub blok Gutenberga polski/business-info.
---

Modul **Identyfikacja firmy** wyswietla dane identyfikujace sprzedawce (nazwa, adres, NIP, REGON, email, telefon) jako spojny blok w stopce sklepu, na karcie produktu lub w dowolnym miejscu motywu. Dane pobierane sa z ustawien `polski_general` wypelnianych w kreatorze konfiguracji.

:::note
Art. 12 Ustawy o prawach konsumenta oraz Art. 206 KSH wymagaja od przedsiebiorcy ujawnienia danych identyfikacyjnych na stronie sklepu. Ten modul pomaga zebrac je w jednym miejscu i utrzymac spojnosc na wszystkich podstronach.
:::

## Shortcode

```
[polski_business_info]
[polski_business_info format="inline" separator=" • "]
[polski_business_info show_regon="1"]
```

## Blok Gutenberga

Nazwa bloku: `polski/business-info` (kategoria Widgets, ikona `id-alt`).
Obsluguje `align: wide | full`, `html: false`.

## Atrybuty

| Atrybut     | Typ     | Domyslnie | Opis                                                                       |
| ----------- | ------- | --------- | -------------------------------------------------------------------------- |
| format      | string  | `block`   | `block` (lista divow) lub `inline` (span z separatorem)                    |
| separator   | string  | ` | `     | Separator pozycji w trybie `inline`                                        |
| show_label  | bool    | `true`    | Pokazuje prefiksy `NIP:` / `REGON:` przy numerach                          |
| show_regon  | bool    | `false`   | Dolacza REGON (domyslnie ukryty, bo rzadziej wymagany)                     |

## Zrodlo danych

Wszystkie pola pobierane sa z opcji `polski_general`:

| Klucz opcji         | Pole wyjscia |
| ------------------- | ------------ |
| `company_name`      | Nazwa        |
| `company_address`   | Adres        |
| `company_nip`       | NIP          |
| `company_regon`     | REGON        |
| `company_email`     | Email (mailto + `antispambot`) |
| `company_phone`     | Telefon      |

Email jest renderowany jako link `mailto:` zabezpieczony funkcja `antispambot()` (konwertuje znaki na encje HTML, utrudniajac zbieranie przez boty).

## Przyklady

### Stopka sklepu

```html
<div class="site-footer">
    [polski_business_info format="block" show_regon="1"]
</div>
```

Renderuje:

```html
<div class="polski-business-info polski-business-info--block">
    <div class="polski-business-info__line polski-business-info__line--name">Sklep Polski Sp. z o.o.</div>
    <div class="polski-business-info__line polski-business-info__line--address">ul. Przykladowa 1, 00-001 Warszawa</div>
    <div class="polski-business-info__line polski-business-info__line--nip">NIP: 123-45-67-890</div>
    <div class="polski-business-info__line polski-business-info__line--regon">REGON: 123456789</div>
    <div class="polski-business-info__line polski-business-info__line--email"><a href="mailto:...">...</a></div>
    <div class="polski-business-info__line polski-business-info__line--phone">+48 123 456 789</div>
</div>
```

### Wersja inline dla pasku kontaktowego

```
[polski_business_info format="inline" separator=" • " show_label="0"]
```

## Style CSS

Modul dodaje klasy — nie wymusza wygladu. Stylowanie we wlasnym motywie:

```css
.polski-business-info--block { line-height: 1.6; }
.polski-business-info__line--name { font-weight: 600; }
.polski-business-info__line--email a { color: inherit; text-decoration: underline; }
```

## Wlaczenie / wylaczenie

Modul kontrolowany jest flaga `business_info` w **Polski > Moduly**. Jesli wylaczony, shortcode i blok nie sa rejestrowane.

## Ograniczenia

- Brak wsparcia dla wielu firm (np. marek / oddzialow) — tylko jeden zestaw danych z `polski_general`
- Jesli zadne pole nie jest wypelnione, shortcode zwraca pusty string (nie renderuje pustego HTML)
- Blok dynamiczny — nie mozna go edytowac wizualnie poza zmiana atrybutow
