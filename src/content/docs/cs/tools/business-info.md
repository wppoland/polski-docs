---
title: Identifikace firmy v patičce
description: Zobrazení údajů o firmě (název, NIP, adresa, kontakt) v patičce obchodu pomocí shortcode [polski_business_info] nebo bloku Gutenberg polski/business-info.
---

Modul **Identifikace firmy** zobrazuje údaje identifikující prodejce (název, adresa, NIP, REGON, e-mail, telefon) jako jednotný blok v patičce obchodu, na kartě produktu nebo na libovolném místě šablony. Údaje se načítají z nastavení `polski_general`, které vyplňujete v průvodci konfigurací.

:::note
Čl. 12 zákona o právech spotřebitele a čl. 206 KSH vyžadují od podnikatele zveřejnění identifikačních údajů na stránce obchodu. Tento modul pomáhá shromáždit je na jednom místě a udržet konzistenci na všech podstránkách.
:::

## Shortcode

```
[polski_business_info]
[polski_business_info format="inline" separator=" • "]
[polski_business_info show_regon="1"]
```

## Blok Gutenberg

Název bloku: `polski/business-info` (kategorie Widgets, ikona `id-alt`).
Podporuje `align: wide | full`, `html: false`.

## Atributy

| Atribut     | Typ     | Výchozí   | Popis                                                                      |
| ----------- | ------- | --------- | -------------------------------------------------------------------------- |
| format      | string  | `block`   | `block` (seznam divů) nebo `inline` (span se separátorem)                  |
| separator   | string  | ` | `     | Separátor položek v režimu `inline`                                        |
| show_label  | bool    | `true`    | Zobrazuje prefixy `NIP:` / `REGON:` u čísel                                |
| show_regon  | bool    | `false`   | Připojí REGON (ve výchozím nastavení skrytý, protože je vyžadován méně často) |

## Zdroj dat

Všechna pole se načítají z volby `polski_general`:

| Klíč volby          | Výstupní pole |
| ------------------- | ------------- |
| `company_name`      | Název        |
| `company_address`   | Adresa       |
| `company_nip`       | NIP          |
| `company_regon`     | REGON        |
| `company_email`     | E-mail (mailto + `antispambot`) |
| `company_phone`     | Telefon      |

E-mail je vykreslen jako odkaz `mailto:` zabezpečený funkcí `antispambot()` (převádí znaky na HTML entity a ztěžuje sběr boty).

## Příklady

### Patička obchodu

```html
<div class="site-footer">
    [polski_business_info format="block" show_regon="1"]
</div>
```

Vykreslí:

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

### Inline verze pro kontaktní lištu

```
[polski_business_info format="inline" separator=" • " show_label="0"]
```

## CSS styly

Modul přidává třídy, nevynucuje vzhled. Stylování ve vlastní šabloně:

```css
.polski-business-info--block { line-height: 1.6; }
.polski-business-info__line--name { font-weight: 600; }
.polski-business-info__line--email a { color: inherit; text-decoration: underline; }
```

## Zapnutí / vypnutí

Modul je řízen příznakem `business_info` v **Polski > Moduly**. Pokud je vypnutý, shortcode a blok se neregistrují.

## Omezení

- Žádná podpora více firem (např. značek / poboček), pouze jedna sada údajů z `polski_general`
- Pokud není vyplněno žádné pole, shortcode vrací prázdný řetězec (nevykresluje prázdné HTML)
- Dynamický blok, nelze jej upravovat vizuálně mimo změnu atributů
