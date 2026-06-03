---
title: Vodoznak souborů ke stažení
description: Dokumentace modulu vodoznaku v Polski PRO for WooCommerce - automatický watermark PDF přes TCPDF a EPUB přes ZipArchive s údaji kupujícího.
---

Modul vodoznaku automaticky přidává údaje kupujícího do souborů ke stažení (PDF a EPUB) v okamžiku stahování. Každý stažený soubor obsahuje personalizovaný watermark identifikující nabyvatele.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Rozšíření PHP `ZipArchive` je vyžadováno pro soubory EPUB.
:::

## Jak to funguje

1. Zákazník koupí produkt se soubory ke stažení
2. V okamžiku kliknutí na odkaz ke stažení plugin zachytí požadavek
3. Na základě formátu souboru je použit odpovídající mechanismus vodoznaku
4. Dočasný soubor s vodoznakem je vygenerován a odeslán zákazníkovi
5. Dočasný soubor je odstraněn po dokončení procesu (cleanup při shutdown)

Vodoznak je aplikován automaticky na všechny produkty se soubory ke stažení, nevyžaduje dodatečnou konfiguraci u jednotlivých produktů.

## Podporované formáty

### PDF (TCPDF)

Vodoznak souborů PDF využívá knihovnu TCPDF:

- Na každou stránku dokumentu je nanesen text watermarku
- Text je poloprůhledný a umístěný po diagonále stránky
- Watermark neovlivňuje čitelnost původního obsahu
- Podporovány jsou vícestránkové dokumenty PDF

### EPUB (ZipArchive)

Vodoznak souborů EPUB využívá rozšíření PHP ZipArchive:

- Soubor EPUB je otevřen jako archiv ZIP
- Do HTML souborů uvnitř archivu je vložen element `<div>` s údaji kupujícího
- Vložení probíhá před uzavírací značkou `</body>`
- Původní struktura EPUB je zachována

## Placeholdery

V obsahu vodoznaku lze používat následující placeholdery:

| Placeholder | Popis | Příklad |
|-------------|------|---------|
| `[FIRSTNAME]` | Jméno kupujícího | Jan |
| `[LASTNAME]` | Příjmení kupujícího | Kowalski |
| `[EMAIL]` | E-mailová adresa kupujícího | jan@example.com |
| `[DATE]` | Datum stažení souboru | 2026-04-06 |
| `[ORDER_ID]` | Číslo objednávky | 12345 |

Příklad textu vodoznaku:

```
Licencováno pro: [FIRSTNAME] [LASTNAME] ([EMAIL])
Objednávka #[ORDER_ID] ze dne [DATE]
```

## Dočasné soubory

Soubor s vodoznakem je vytvořen jako dočasná kopie v adresáři `wp-content/uploads/polski-pro-temp/`:

- Dočasný soubor je generován s jedinečným identifikátorem
- Po odeslání souboru zákazníkovi je dočasný soubor odstraněn
- Čištění probíhá automaticky přes hook `register_shutdown_function`
- V případě chyby jsou dočasné soubory rovněž odstraněny

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski PRO > Vodoznak**.

| Nastavení | Popis |
|------------|------|
| Zapnout vodoznak | Aktivuje modul pro všechny soubory ke stažení |
| Text vodoznaku | Obsah watermarku s placeholdery |
| Velikost písma (PDF) | Velikost textu vodoznaku v PDF |
| Průhlednost (PDF) | Úroveň průhlednosti watermarku v PDF |
| Styl CSS (EPUB) | Styl CSS elementu div s vodoznakem v EPUB |

## Zapnutí modulu

Modul je řízen přepínačem v nastavení modulů PRO:

```
WooCommerce > Nastavení > Polski PRO > Moduly > Vodoznak
```

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Polski PRO for WooCommerce je komerční software dodávaný bez záruky.</div>
