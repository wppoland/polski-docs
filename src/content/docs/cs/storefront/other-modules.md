---
title: Dalsi moduly obchodu
description: Doplnkove moduly v Polski for WooCommerce - spravce zalozek, zvyraznene video, zoom galerie, seznam cekajicich, nekonecne scrollovani, popup.
---

Polski for WooCommerce nabizi radu doplnkovych modulu zlepsujicich fungovani obchodu. Kazdy modul lze aktivovat nezavisle v **WooCommerce > Polski > Moduly obchodu**.

## Spravce zalozek (tab manager)

Spravce zalozek umoznuje kontrolovat zalozky zobrazovane na strance produktu (Popis, Doplnkove informace, Recenze atd.).

### Moznosti

- **Zmena poradi** - pretahnete a pustte zalozky v pozadovanem poradi
- **Skryvani zalozek** - skryjte vybranou zalozku bez odstraneni obsahu
- **Zmena nazvu** - dejte zalozkam vlastni nazvy
- **Pridavani zalozek** - vytvarejte vlastni zalozky s vlastnim obsahem
- **Globalni zalozky** - zalozky viditelne na vsech produktech
- **Zalozky na produkt** - zalozky viditelne pouze na vybranem produktu
- **Zalozky na kategorii** - zalozky viditelne na produktech z dane kategorie

Programove:

```php
add_filter('woocommerce_product_tabs', function (array $tabs): array {
    $tabs['custom_tab'] = [
        'title'    => 'Gwarancja',
        'priority' => 25,
        'callback' => function (): void {
            echo '<p>Produkt objęty 24-miesięczną gwarancją producenta.</p>';
        },
    ];
    return $tabs;
});
```

## Zvyraznene video (featured video)

Modul umoznuje nahradit nebo doplnit hlavni obrazek produktu videem.

### Podporovane zdroje

- **YouTube** - vlozte URL videa
- **Vimeo** - vlozte URL videa
- **Vlastni video** - nahrajte soubor MP4 do knihovny medii
- **Externi URL** - odkaz na soubor MP4/WebM

Videa YouTube a Vimeo jsou nacitana lenive - iframe s prehravcem je vlozen az po kliknuti na miniaturu s ikonou play.

## Zoom galerie (gallery zoom)

Modul pridava zvetsovani obrazku produktu po najeti kurzorem nebo kliknuti.

### Rezimy zoomu

- **Hover** - zvetseni zobrazene uvnitr obrazku po najeti kurzorem
- **Lens** - lupa nasledujici kurzor
- **Lightbox** - celoobrazovkovy nahled po kliknuti

```php
add_filter('polski/gallery_zoom/type', function (): string {
    return 'lens'; // 'hover', 'lens', 'lightbox'
});
```

## Seznam cekajicich (waitlist)

Modul umoznuje zakaznikum zapsat se na e-mailove oznameni o dostupnosti produktu, ktery je docasne nedostupny.

### Jak funguje

1. Zakaznik navstivi stranku nedostupneho produktu
2. Misto tlacitka **Pridat do kosiku** vidi formular s polem e-mail
3. Zakaznik zada e-mailovou adresu a klikne **Oznamit mi**
4. Kdyz se produkt vrati na sklad, system automaticky odesle oznameni

## Nekonecne scrollovani (infinite scroll)

Modul nahrazuje tradicni stankování automatickym nacitanim dalsich stranek produktu pri scrollovani.

### Rezimy

- **Automaticky** - dalsi stranka se nacte automaticky kdyz uzivatel dorazí na konec seznamu
- **Tlacitko** - zobrazuje tlacitko **Nacist dalsi** misto automatickeho nacitani

```php
// Deaktivace infinite scroll na mobilnich zarizenich
add_filter('polski/infinite_scroll/enabled', function (): bool {
    return ! wp_is_mobile();
});
```

## Popup

Modul zobrazuje konfigurovatelny popup (modalni okno) na strance obchodu.

### Typy popup

- **Newsletter** - formular zapisu do newsletteru
- **Informacni** - libovolny HTML obsah/shortcody
- **Produktovy** - propagace vybraneho produktu
- **Odchod** - zobrazovany pri pokusu o opusteni stranky (exit intent)

### Spoustece (triggers)

| Spoustec | Popis |
| ---------------- | ------------------------------------------- |
| Cas | Po X sekundach od vstupu na stranku |
| Scroll | Po prescrollovani X % stranky |
| Exit intent | Kdyz kurzor opusti okno prohlizece |
| Kliknuti | Po kliknuti na element s CSS tridou |
| Pocet navstev | Po N-te navsteve stranky |

### Pravni pozadavky

Popup by nemel ztezovat pouzivani obchodu (dark patterns). Modul vynucuje:
- Viditelne tlacitko zavreni (X)
- Moznost zavreni kliknutim na pozadi
- Zavreni klavesou Escape
- Zadne blokovani scrollovani stranky pod popupem

## Reseni problemu

**Spravce zalozek neuklada poradi** - vymažte cache prohlizece a cache WordPressu.

**Zoom nefunguje na mobilu** - rezim hover a lens nefunguji na dotykovych zarizenich. Pouzijte rezim lightbox pro mobil.

**Infinite scroll nenacita dalsi stranky** - zkontrolujte, zda motiv pouziva standardni strankovani WooCommerce.

**Popup se nezobrazuje** - zkontrolujte nastaveni cookie. Pokud se popup jiz zobrazil, cookie blokuje opetovne zobrazeni.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
