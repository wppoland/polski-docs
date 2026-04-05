---
title: Rychly nahled produktu
description: Modul rychleho nahledu produktu v Polski for WooCommerce - lightbox, varianty, galerie do 4 obrazku.
---

Rychly nahled (quick view) umoznuje zakaznikum videt podrobnosti produktu bez opusteni stranky kategorie nebo vysledku vyhledavani. Produkt se otevira v okne lightbox s moznosti pridani do kosiku.

## Aktivace modulu

Prejdete do **WooCommerce > Polski > Moduly obchodu** a aktivujte moznost **Rychly nahled**. Na kartach produktu se objevi ikona oka nebo tlacitko **Rychly nahled**.

## Lightbox

Rychly nahled se otevira v modalnim okne (lightbox) se ztmavelym pozadim. Okno je responsivni - na desktopu zabira cca 70 % sirky obrazovky, na mobilnich zarizenich se roztahne na plnou sirku.

Obsah lightboxu:

- Galerie obrazku (leva strana)
- Nazev produktu
- Cena (s ohledem na akce Omnibus)
- Kratky popis
- Vyber variant (pro variantni produkty)
- Pole mnozstvi
- Tlacitko **Pridat do kosiku**
- Odkaz **Zobrazit vsechny podrobnosti** vedouci na stranku produktu

Lightbox se zavira pres:
- Kliknuti na tlacitko X
- Kliknuti mimo okno (na overlay)
- Stisk klavesy Escape
- Tlacitko zpet v prohlizeci (History API)

## Obsluha variant

Pro variantni produkty (variable products) rychly nahled zobrazuje dropdowny s atributy, stejne jako na strance produktu. Po vyberu varianty:

- Cena se aktualizuje na cenu varianty
- Obrazek se meni na obrazek prirazeny k variante
- Stav dostupnosti se aktualizuje
- Tlacitko **Pridat do kosiku** se stava aktivnim teprve po vyberu vsech vyzadovanych atributu

Data variant jsou nactena jednrazove spolu s lightboxem - zmena varianty negeneruje dalsi dotazy na server.

## Galerie obrazku (do 4 obrazku)

Lightbox zobrazuje do **4 obrazku** produktu - hlavni obrazek a az 3 obrazky z galerie. Tento limit zajistuje rychle nacitani a prehledne rozhrani.

Limit obrazku v galerii lze zmenit filtrem:

```php
add_filter('polski/quick_view/gallery_limit', function (): int {
    return 6;
});
```

## Konfigurace

| Moznost | Popis | Vychozi |
| -------------------- | ----------------------------------------------- | ----------- |
| Pozice tlacitka | Kde zobrazit tlacitko na karte produktu | Na minature |
| Typ tlacitka | Ikona oka nebo text **Rychly nahled** | Ikona |
| Galerie | Kolik obrazku ukazat v lightboxu | 4 |
| Popis | Zda ukazat kratky popis | Ano |
| Hodnoceni | Zda ukazat hvezdicky hodnoceni | Ano |
| Doba dodani | Zda ukazat odhadovanou dobu dodani | Ano |
| Animace | Typ animace otevreni (fade/slide/zoom) | fade |

## Nacitani obsahu pres AJAX

Obsah lightboxu je nacitan pres AJAX po kliknuti na tlacitko. Behem nacitani je zobrazovan spinner. Data produktu jsou cachovana na strane klienta.

```php
// Zmena sablony lightboxu
add_filter('polski/quick_view/template', function (string $template): string {
    return get_stylesheet_directory() . '/polski/quick-view-custom.php';
});
```

## Integrace s jinymi moduly

- **Wishlist** - tlacitko srdce viditelne v lightboxu
- **Porovnavac** - tlacitko porovnani viditelne v lightboxu
- **Stitky** - odznaky (vyprodej, novinka, bestseller) zobrazovane na obrazku
- **Cena Omnibus** - nejnizsi cena z 30 dnu viditelna u akcni ceny

## Pristupnost (accessibility)

- **Tab** - prechazeni mezi interaktivnimi elementy
- **Escape** - zavreni okna
- **Sipky** - navigace v galerii
- Focus trap - fokus neopousti lightbox pokud je otevreny
- ARIA atributy: `role="dialog"`, `aria-modal="true"`, `aria-label`

## Stylovani CSS

- `.polski-quick-view-overlay` - ztmaveni pozadi
- `.polski-quick-view-modal` - okno lightbox
- `.polski-quick-view-gallery` - galerie obrazku
- `.polski-quick-view-content` - obsah produktu
- `.polski-quick-view-close` - tlacitko zavreni
- `.polski-quick-view-trigger` - tlacitko otvirajici na karte produktu

## Reseni problemu

**Lightbox se neotevira** - zkontrolujte konzoli prohlizece. Nejcastejsi pricina je konflikt s jinym lightbox pluginem. Deaktivujte vychozi lightbox WooCommerce.

**Varianty se nenacitaji** - ujistete se, ze variantni produkt ma spravne nakonfigurovane varianty s cenami.

**Galerie ukazuje pouze 1 obrazek** - pridejte obrazky do galerie produktu v editoru WooCommerce (sekce **Galerie produktu**).

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
