---
title: Ostatné obchodné moduly
description: Doplnkové moduly v Polski for WooCommerce - manažér záložiek, zvýraznené video, zoom galérie, zoznam čakajúcich, nekonečné posúvanie, popup.
---

Doplnkové obchodné moduly. Každý zapnete nezávisle v **WooCommerce > Polski > Moduly obchodu**.

## Manažér záložiek (tab manager)

Ovládajte záložky na stránke produktu (Popis, Doplňujúce informácie, Recenzie atď.).

### Možnosti

- **Zmena poradia** - presuňte a pustite
- **Skrývanie záložiek** - skryte bez odstránenia obsahu
- **Zmena názvov** - napr. "Detaily" namiesto "Popis"
- **Pridávanie záložiek** - vlastné záložky s ľubovoľným obsahom
- **Globálne záložky** - viditeľné na všetkých produktoch
- **Záložky pre jednotlivé produkty** - len na vybranom produkte
- **Záložky pre jednotlivé kategórie** - len na produktoch z danej kategórie

### Pridanie vlastnej záložky

V nastaveniach manažéra záložiek kliknite na **Pridať záložku** a vyplňte:

- **Názov** - titulok záložky
- **Obsah** - podporuje editor WYSIWYG, shortcody a HTML
- **Priorita** - pozícia záložky (nižšia = viac vľavo)
- **Viditeľnosť** - globálna, vybraná kategória alebo vybraný produkt

Programovo:

```php
add_filter('woocommerce_product_tabs', function (array $tabs): array {
    $tabs['custom_tab'] = [
        'title'    => 'Záruka',
        'priority' => 25,
        'callback' => function (): void {
            echo '<p>Produkt s 24-mesačnou zárukou výrobcu.</p>';
        },
    ];
    return $tabs;
});
```

## Zvýraznené video (featured video)

Nahraďte alebo doplňte hlavnú fotku produktu videom.

### Podporované zdroje

- **YouTube** - vložte URL videa
- **Vimeo** - vložte URL videa
- **Vlastné video** - nahrajte súbor MP4 do knižnice médií
- **Externý URL** - odkaz na súbor MP4/WebM

### Konfigurácia

V editore produktu v sekcii **Fotka produktu** sa objaví dodatočné pole **Video produktu**. Vložte URL videa alebo vyberte z knižnice médií.

Možnosti zobrazenia:

| Možnosť          | Popis                                 | Predvolene |
| ---------------- | ------------------------------------- | --------- |
| Pozícia          | Prvé v galérii / posledné             | Prvé      |
| Autoplay         | Automatické prehrávanie               | Nie       |
| Stlmenie         | Predvolene stlmené                    | Áno       |
| Slučka           | Prehrávanie v slučke                  | Nie       |
| Pomer strán      | 16:9 / 4:3 / 1:1                     | 16:9      |
| Ikona play       | Ikona play na náhľade                 | Áno       |

### Lazy loading

Videá YouTube a Vimeo sa načítavajú lenivo, iframe sa vloží až po kliknutí na náhľad. Stránka produktu nie je spomaľovaná externými skriptmi.

## Zoom galérie (gallery zoom)

Zväčšovanie fotiek produktu po prejdení kurzorom alebo kliknutí.

### Režimy zoom

- **Hover** - zväčšenie zobrazené vnútri fotky po prejdení kurzorom
- **Lens** - lupa sledujúca kurzor
- **Lightbox** - celoobrazovkový náhľad po kliknutí

### Konfigurácia

```php
// Zmena typu zoomu
add_filter('polski/gallery_zoom/type', function (): string {
    return 'lens'; // 'hover', 'lens', 'lightbox'
});

// Zmena mierky zväčšenia
add_filter('polski/gallery_zoom/scale', function (): float {
    return 2.5; // predvolene 2.0
});
```

Fotky by mali mať aspoň 1200x1200 px. Pri nižšom rozlíšení bude zväčšený obraz rozmazaný.

## Zoznam čakajúcich (waitlist)

Zákazníci sa môžu zapísať na e-mailové upozornenie, keď sa nedostupný produkt vráti do predaja.

### Ako funguje

1. Zákazník navštívi stránku nedostupného produktu
2. Namiesto tlačidla **Pridať do košíka** vidí formulár s poľom e-mail
3. Zákazník zadá e-mailovú adresu a klikne na **Upozorniť ma**
4. Keď sa produkt vráti na sklad, systém automaticky odošle upozornenie

### Správa zoznamu

V admin paneli (**WooCommerce > Polski > Zoznam čakajúcich**) sú viditeľné:

- Zoznam produktov s počtom čakajúcich
- E-mailové adresy zapísaných zákazníkov
- Stav upozornenia (odoslané / čakajúce)
- Tlačidlo ručného odoslania upozornenia

### Súhlas GDPR

Formulár obsahuje checkbox súhlasu GDPR. Obsah checkboxu zmeníte v nastaveniach modulu.

```php
add_filter('polski/waitlist/consent_text', function (): string {
    return 'Súhlasím s prijatím jednorazového upozornenia o dostupnosti produktu.';
});
```

### Automatické čistenie

E-mailové adresy sa zo zoznamu odstránia po:
- Odoslaní upozornenia
- 90 dňoch od zapísania (konfigurovateľné obdobie)
- Ručnom odstránení administrátorom

## Nekonečné posúvanie (infinite scroll)

Nahrádza tradičné stránkovanie automatickým načítavaním produktov pri posúvaní.

### Režimy

- **Automatický** - ďalšia stránka sa načíta automaticky, keď používateľ dosiahne koniec zoznamu
- **Tlačidlo** - zobrazuje tlačidlo **Načítať viac** namiesto automatického načítania

### Konfigurácia

| Možnosť            | Popis                             | Predvolene    |
| ------------------- | --------------------------------- | ------------- |
| Režim               | Automatický alebo tlačidlo        | Automatický   |
| Vzdialenosť         | Vzdialenosť od spodku zoznamu (px)| 300           |
| Text tlačidla       | Text na tlačidle                  | Načítať viac  |
| Spinner             | Typ animácie načítavania          | Dots          |
| Limit strán         | Maximálny počet strán             | 10            |

### SEO

Modul podporuje parameter `?paged=N` v URL (History API). Vyhľadávače vidia klasické stránkovanie, boti dostávajú stránkované URL.

```php
// Vypnutie infinite scroll na mobilných zariadeniach
add_filter('polski/infinite_scroll/enabled', function (): bool {
    return ! wp_is_mobile();
});
```

## Popup

Konfigurovateľný popup (modálne okno) na stránke obchodu.

### Typy popupov

- **Newsletter** - formulár prihlásenia do newslettera
- **Informačný** - ľubovoľný obsah HTML/shortcody
- **Produktový** - propagácia vybraného produktu
- **Odchod** - zobrazený pri pokuse o opustenie stránky (exit intent)

### Spúšťače (triggers)

| Spúšťač          | Popis                                       |
| ---------------- | ------------------------------------------- |
| Čas              | Po X sekundách od vstupu na stránku         |
| Scroll           | Po posunutí X% stránky                      |
| Exit intent      | Keď kurzor opustí okno prehliadača          |
| Kliknutie        | Po kliknutí na element s CSS triedou        |
| Počet návštev    | Po N-tej návšteve stránky                   |

### Obmedzenia zobrazenia

- **Raz za reláciu** - popup sa zobrazí raz počas návštevy
- **Raz za X dní** - popup sa znova neukáže počas X dní (cookie)
- **Len noví** - popup viditeľný len pre nových návštevníkov
- **Vybrané stránky** - popup viditeľný len na určených stránkach

### Konfigurácia v paneli

Prejdite do **WooCommerce > Polski > Moduly obchodu > Popup** a nakonfigurujte:

- Obsah popupu (editor WYSIWYG s podporou shortcodov)
- Spúšťač a podmienky zobrazenia
- Štýl (farby, veľkosť, animácia)
- Pozícia (centrum, dole, bok)
- Tlačidlo zatvorenia

### Právne požiadavky

Popup nesmie sťažovať používanie obchodu (dark patterns). Modul vynucuje:
- Viditeľné tlačidlo zatvorenia (X)
- Možnosť zatvorenia kliknutím na pozadie
- Zatvorenie klávesom Escape
- Žiadne blokovanie posúvania stránky pod popupom

## Riešenie problémov

**Manažér záložiek neukladá poradie** - vyčistite cache prehliadača a WordPressu. Možný konflikt s iným pluginom záložiek.

**Zoom nefunguje na mobile** - režim hover a lens nefungujú na dotykových obrazovkách. Použite režim lightbox.

**Infinite scroll nenačítava ďalšie stránky** - skontrolujte, či šablóna používa štandardné stránkovanie WooCommerce (`woocommerce_pagination()`).

**Popup sa nezobrazuje** - ak sa popup už objavil, cookie blokuje opätovné zobrazenie. Vyčistite cookies alebo zmeňte frekvenciu.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právnu radu. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
