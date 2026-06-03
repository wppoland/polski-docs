---
title: Vodoznak súborov na stiahnutie
description: Dokumentácia modulu vodoznaku v Polski PRO for WooCommerce - automatický watermark PDF cez TCPDF a EPUB cez ZipArchive s údajmi kupujúceho.
---

Modul vodoznaku automaticky pridáva údaje kupujúceho do súborov na stiahnutie (PDF a EPUB) v momente sťahovania. Každý stiahnutý súbor obsahuje personalizovaný watermark identifikujúci nadobúdateľa.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Rozšírenie PHP `ZipArchive` je vyžadované pre súbory EPUB.
:::

## Ako to funguje

1. Zákazník zakúpi produkt so súbormi na stiahnutie
2. V momente kliknutia na odkaz na stiahnutie plugin zachytí požiadavku
3. Na základe formátu súboru sa použije príslušný mechanizmus vodoznaku
4. Dočasný súbor s vodoznakom je vygenerovaný a odoslaný zákazníkovi
5. Dočasný súbor je odstránený po dokončení procesu (cleanup pri shutdown)

Vodoznak sa aplikuje automaticky na všetky produkty so súbormi na stiahnutie - nevyžaduje dodatočnú konfiguráciu per produkt.

## Podporované formáty

### PDF (TCPDF)

Vodoznak súborov PDF využíva knižnicu TCPDF:

- Na každú stranu dokumentu sa nanáša text watermarku
- Text je polopriehľadný a umiestnený po uhlopriečke strany
- Watermark neovplyvňuje čitateľnosť pôvodného obsahu
- Podporované sú viacstranové dokumenty PDF

### EPUB (ZipArchive)

Vodoznak súborov EPUB využíva rozšírenie PHP ZipArchive:

- Súbor EPUB sa otvára ako archív ZIP
- Do HTML súborov vnútri archívu sa vkladá element `<div>` s údajmi kupujúceho
- Vloženie prebieha pred uzatváracím tagom `</body>`
- Pôvodná štruktúra EPUB je zachovaná

## Placeholdery

V obsahu vodoznaku možno použiť nasledujúce placeholdery:

| Placeholder | Popis | Príklad |
|-------------|------|---------|
| `[FIRSTNAME]` | Meno kupujúceho | Jan |
| `[LASTNAME]` | Priezvisko kupujúceho | Kowalski |
| `[EMAIL]` | E-mailová adresa kupujúceho | jan@example.com |
| `[DATE]` | Dátum stiahnutia súboru | 2026-04-06 |
| `[ORDER_ID]` | Číslo objednávky | 12345 |

Príklad textu vodoznaku:

```
Licencované pre: [FIRSTNAME] [LASTNAME] ([EMAIL])
Objednávka #[ORDER_ID] zo dňa [DATE]
```

## Dočasné súbory

Súbor s vodoznakom sa vytvára ako dočasná kópia v adresári `wp-content/uploads/polski-pro-temp/`:

- Dočasný súbor je vygenerovaný s unikátnym identifikátorom
- Po odoslaní súboru zákazníkovi sa dočasný súbor odstráni
- Čistenie prebieha automaticky cez hook `register_shutdown_function`
- V prípade chyby sa dočasné súbory tiež odstránia

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Vodoznak**.

| Nastavenie | Popis |
|------------|------|
| Zapnúť vodoznak | Aktivuje modul pre všetky súbory na stiahnutie |
| Text vodoznaku | Obsah watermarku s placeholdermi |
| Veľkosť písma (PDF) | Veľkosť textu vodoznaku v PDF |
| Priehľadnosť (PDF) | Úroveň priehľadnosti watermarku v PDF |
| Štýl CSS (EPUB) | Štýl CSS elementu div s vodoznakom v EPUB |

## Zapnutie modulu

Modul je ovládaný prepínačom v nastaveniach modulov PRO:

```
WooCommerce > Nastavenia > Polski PRO > Moduly > Vodoznak
```

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Polski PRO for WooCommerce je komerčný softvér dodávaný bez záruky.</div>
