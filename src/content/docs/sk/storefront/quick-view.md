---
title: Rýchly náhľad produktu
description: Modul rýchleho náhľadu produktu v Polski for WooCommerce - lightbox, varianty, galéria do 4 obrázkov.
---

Rýchly náhľad otvára podrobnosti produktu v okne lightbox - bez opustenia stránky kategórie alebo výsledkov vyhľadávania. Zákazník môže okamžite pridať produkt do košíka.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Obchodné moduly** a aktivujte možnosť **Rýchly náhľad**. Na kartách produktov sa zobrazí ikona oka alebo tlačidlo **Rýchly náhľad**.

## Lightbox

Rýchly náhľad sa otvára v modálnom okne (lightbox) so stmaveným pozadím. Okno je responzívne - na desktope zaberá cca 70% šírky obrazovky, na mobilných zariadeniach sa roztiahne na plnú šírku.

Obsah lightboxu:

- Galéria fotografií (ľavá strana)
- Názov produktu
- Cena (s ohľadom na akcie Omnibus)
- Krátky popis
- Výber variantov (pre variantné produkty)
- Pole množstva
- Tlačidlo **Pridať do košíka**
- Odkaz **Zobraziť úplné podrobnosti** vedúci na stránku produktu

Lightbox sa zatvára:
- Kliknutím na tlačidlo X
- Kliknutím mimo okno (na overlay)
- Stlačením klávesu Escape
- Tlačidlom späť v prehliadači (History API)

## Obsluha variantov

Pre variantné produkty (variable products) rýchly náhľad zobrazuje dropdowny s atribútmi, rovnako ako na stránke produktu. Po výbere variantu:

- Cena sa aktualizuje na cenu variantu
- Obrázok sa zmení na obrázok priradený k variantu
- Stav dostupnosti sa aktualizuje
- Tlačidlo **Pridať do košíka** sa stane aktívnym až po výbere všetkých povinných atribútov

Údaje variantov sú načítané jednorazovo spolu s lightboxom - zmena variantu negeneruje ďalšie dopyty na server.

## Galéria fotografií (do 4 obrázkov)

Lightbox zobrazuje až **4 fotografie** produktu - hlavnú fotografiu a až 3 fotografie z galérie. Tento limit zabezpečuje rýchle načítanie a prehľadné rozhranie v okne náhľadu.

Navigácia po galérii:

- Kliknutie na miniatúru pod hlavnou fotografiou
- Šípky vľavo/vpravo na hlavnej fotografii
- Swipe na dotykových zariadeniach
- Klávesy šípok na klávesnici

Limit fotografií v galérii je možné zmeniť filtrom:

```php
add_filter('polski/quick_view/gallery_limit', function (): int {
    return 6;
});
```

## Konfigurácia

Možnosti dostupné v nastaveniach modulu:

| Možnosť               | Popis                                            | Predvolené   |
| -------------------- | ----------------------------------------------- | ----------- |
| Pozícia tlačidla     | Kde zobrazovať tlačidlo na karte produktu        | Na miniatúre |
| Typ tlačidla         | Ikona oka alebo text **Rýchly náhľad**           | Ikona       |
| Galéria              | Koľko fotografií zobrazovať v lightboxe          | 4           |
| Popis                | Či zobrazovať krátky popis                       | Áno         |
| Hodnotenia           | Či zobrazovať hviezdičky hodnotenia              | Áno         |
| Dodacia lehota       | Či zobrazovať odhadovanú dodaciu lehotu           | Áno         |
| Animácia             | Typ animácie otvorenia (fade/slide/zoom)         | fade        |

## Načítanie obsahu cez AJAX

Obsah lightboxu je načítaný cez AJAX po kliknutí na tlačidlo. Počas načítania sa zobrazuje spinner. Údaje produktu sú cachované na strane klienta - opätovné otvorenie rovnakého produktu negeneruje ďalšiu požiadavku.

```php
// Zmena šablóny lightboxu
add_filter('polski/quick_view/template', function (string $template): string {
    return get_stylesheet_directory() . '/polski/quick-view-custom.php';
});
```

## Integrácia s ďalšími modulmi

Rýchly náhľad sa integruje s ďalšími modulmi Polski for WooCommerce:

- **Zoznam prianí** - tlačidlo srdca viditeľné v lightboxe
- **Porovnávač** - tlačidlo porovnania viditeľné v lightboxe
- **Etikety** - odznaky (výpredaj, novinka, bestseller) zobrazené na fotografii
- **Cena Omnibus** - najnižšia cena za 30 dní viditeľná pri akčnej cene

## Prístupnosť (accessibility)

Lightbox podporuje plnú klávesovú navigáciu:

- **Tab** - prechádzanie medzi interaktívnymi prvkami
- **Escape** - zatvorenie okna
- **Šípky** - navigácia po galérii
- Focus trap - fokus neopúšťa lightbox počas jeho otvorenia
- ARIA atribúty: `role="dialog"`, `aria-modal="true"`, `aria-label`

## Štýlovanie CSS

CSS triedy modulu:

- `.polski-quick-view-overlay` - stmavenie pozadia
- `.polski-quick-view-modal` - okno lightbox
- `.polski-quick-view-gallery` - galéria fotografií
- `.polski-quick-view-content` - obsah produktu
- `.polski-quick-view-close` - tlačidlo zatvorenia
- `.polski-quick-view-trigger` - tlačidlo otvárania na karte produktu

## Výkon

Skript a štýly lightboxu sú načítané lenivo - len vtedy, keď na stránke je aspoň jeden produkt s tlačidlom rýchleho náhľadu. JavaScript kód váži cca 8 KB (gzip) a neblokuje renderovanie stránky.

## Riešenie problémov

**Lightbox sa neotvára** - skontrolujte konzolu prehliadača. Najčastejšou príčinou je konflikt s iným lightbox pluginom (napr. WooCommerce Lightbox, FancyBox). Vypnite predvolený lightbox WooCommerce.

**Varianty sa nenačítavajú** - uistite sa, že variantný produkt má správne nakonfigurované varianty s cenami. Prázdne varianty sú preskakované.

**Galéria zobrazuje len 1 fotografiu** - pridajte fotografie do galérie produktu v editore WooCommerce (sekcia **Galéria produktu**, nielen **Fotografia produktu**).

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
