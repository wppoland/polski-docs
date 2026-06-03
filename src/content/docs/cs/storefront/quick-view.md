---
title: Rychlý náhled produktu
description: Modul rychlého náhledu produktu v Polski for WooCommerce - lightbox, varianty, galerie až 4 obrázků.
---

Rychlý náhled otevírá detaily produktu v okně lightbox - bez opuštění stránky kategorie nebo výsledků vyhledávání. Zákazník může produkt rovnou přidat do košíku.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **Rychlý náhled**. Na kartách produktů se objeví ikona oka nebo tlačítko **Rychlý náhled**.

## Lightbox

Okno se otevírá se ztmaveným pozadím. Na desktopu zabírá cca 70 % šířky obrazovky, na mobilu - plnou šířku.

Obsah lightboxu:

- Galerie obrázků (levá strana)
- Název produktu
- Cena (se zohledněním akce Omnibus)
- Krátký popis
- Výběr variant (pro variabilní produkty)
- Pole množství
- Tlačítko **Přidat do košíku**
- Odkaz **Zobrazit úplné detaily** vedoucí na stránku produktu

Lightbox se zavírá přes:
- Kliknutí na tlačítko X
- Kliknutí mimo okno (na overlay)
- Stisknutí klávesy Escape
- Tlačítko zpět v prohlížeči (History API)

## Obsluha variant

U variabilních produktů zobrazuje rychlý náhled rozbalovací nabídky s atributy. Po výběru varianty:

- Cena se aktualizuje na cenu varianty
- Obrázek se změní na obrázek přiřazený k variantě
- Aktualizuje se stav dostupnosti
- Tlačítko **Přidat do košíku** se aktivuje po výběru všech atributů

Data variant se načítají společně s lightboxem - změna varianty nevyžaduje další dotazy na server.

## Galerie obrázků (až 4 obrázky)

Lightbox zobrazuje až **4 obrázky** - hlavní obrázek a až 3 z galerie. Díky tomu se okno načítá rychle.

Navigace po galerii:

- Kliknutí na náhled pod hlavním obrázkem
- Šipky vlevo/vpravo na hlavním obrázku
- Swipe na dotykových zařízeních
- Klávesy šipek na klávesnici

Limit obrázků v galerii lze změnit filtrem:

```php
add_filter('polski/quick_view/gallery_limit', function (): int {
    return 6;
});
```

## Konfigurace

Možnosti dostupné v nastavení modulu:

| Možnost             | Popis                                           | Výchozí     |
| -------------------- | ----------------------------------------------- | ----------- |
| Pozice tlačítka      | Kde zobrazit tlačítko na kartě produktu         | Na náhledu  |
| Typ tlačítka         | Ikona oka nebo text **Rychlý náhled**           | Ikona       |
| Galerie              | Kolik obrázků zobrazit v lightboxu              | 4           |
| Popis                | Zda zobrazovat krátký popis                     | Ano         |
| Hodnocení            | Zda zobrazovat hvězdičky hodnocení              | Ano         |
| Doba dodání          | Zda zobrazovat odhadovanou dobu dodání          | Ano         |
| Animace              | Typ animace otevření (fade/slide/zoom)          | fade        |

## Načítání obsahu přes AJAX

Obsah se načítá přes AJAX po kliknutí na tlačítko. Během načítání je vidět spinner. Data produktu se cachují v prohlížeči - opětovné otevření stejného produktu neodesílá nový požadavek.

```php
// Změna šablony lightboxu
add_filter('polski/quick_view/template', function (string $template): string {
    return get_stylesheet_directory() . '/polski/quick-view-custom.php';
});
```

## Integrace s dalšími moduly

Rychlý náhled spolupracuje s dalšími moduly:

- **Seznam přání** - tlačítko srdce viditelné v lightboxu
- **Porovnávač** - tlačítko porovnání viditelné v lightboxu
- **Štítky** - odznaky (výprodej, novinka, bestseller) zobrazené na obrázku
- **Cena Omnibus** - nejnižší cena za 30 dní viditelná u akční ceny

## Přístupnost (accessibility)

Lightbox podporuje klávesovou navigaci:

- **Tab** - přechod mezi interaktivními prvky
- **Escape** - zavření okna
- **Šipky** - navigace po galerii
- Focus trap - fokus neopouští lightbox, dokud je otevřený
- ARIA atributy: `role="dialog"`, `aria-modal="true"`, `aria-label`

## Stylování CSS

CSS třídy modulu:

- `.polski-quick-view-overlay` - ztmavení pozadí
- `.polski-quick-view-modal` - okno lightbox
- `.polski-quick-view-gallery` - galerie obrázků
- `.polski-quick-view-content` - obsah produktu
- `.polski-quick-view-close` - tlačítko zavření
- `.polski-quick-view-trigger` - tlačítko otevírající na kartě produktu

## Výkon

Skript a styly se načítají líně - pouze když je na stránce produkt s tlačítkem rychlého náhledu. JavaScript váží cca 8 KB (gzip) a neblokuje vykreslování.

## Řešení problémů

**Lightbox se neotevírá** - zkontrolujte konzoli prohlížeče. Častou příčinou je konflikt s jiným pluginem lightbox (např. FancyBox). Vypněte výchozí lightbox WooCommerce.

**Varianty se nenačítají** - zkontrolujte, zda má variabilní produkt nakonfigurované varianty s cenami. Prázdné varianty jsou vynechány.

**Galerie zobrazuje jen 1 obrázek** - přidejte obrázky v sekci **Galerie produktu** v editoru WooCommerce (nejen **Obrázek produktu**).

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
