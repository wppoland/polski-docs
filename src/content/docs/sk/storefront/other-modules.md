---
title: Ostatné obchodné moduly
description: Ďalšie moduly v Polski for WooCommerce - manažér záložiek, zvýraznené video, zoom galérie, zoznam čakajúcich, nekonečné posúvanie, popup.
---

Polski for WooCommerce ponúka rad ďalších modulov zlepšujúcich fungovanie obchodu. Každý modul je možné zapnúť nezávisle v **WooCommerce > Polski > Obchodné moduly**.

## Manažér záložiek (tab manager)

Manažér záložiek umožňuje ovládať záložky zobrazované na stránke produktu (Popis, Ďalšie informácie, Recenzie atď.).

### Možnosti

- **Zmena poradia** - ťahaj a pusť záložky v požadovanom poradí
- **Skrývanie záložiek** - skryte vybranú záložku bez odstránenia obsahu
- **Zmena názvov** - dajte záložkám vlastné názvy (napr. "Podrobnosti" namiesto "Popis")
- **Pridávanie záložiek** - tvorte vlastné záložky s vlastným obsahom
- **Globálne záložky** - záložky viditeľné na všetkých produktoch
- **Záložky per produkt** - záložky viditeľné len na vybranom produkte
- **Záložky per kategória** - záložky viditeľné na produktoch z danej kategórie

### Pridanie vlastnej záložky

V nastaveniach manažéra záložiek kliknite na **Pridať záložku** a vyplňte:

- **Názov** - nadpis záložky
- **Obsah** - podporuje WYSIWYG editor, shortcódy a HTML
- **Priorita** - pozícia záložky (nižšia = viac vľavo)
- **Viditeľnosť** - globálna, vybraná kategória alebo vybraný produkt

Programovo:

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

## Zvýraznené video (featured video)

Modul umožňuje nahradiť alebo doplniť hlavnú fotografiu produktu video záznamom.

### Podporované zdroje

- **YouTube** - vložte URL videa
- **Vimeo** - vložte URL videa
- **Vlastné video** - nahrajte MP4 súbor do knižnice médií
- **Externé URL** - odkaz na MP4/WebM súbor

### Konfigurácia

V editore produktu v sekcii **Fotografia produktu** sa zobrazuje ďalšie pole **Video produktu**. Vložte URL videa alebo vyberte z knižnice médií.

Možnosti zobrazovania:

| Možnosť            | Popis                                  | Predvolené |
| ---------------- | ------------------------------------- | --------- |
| Pozícia          | Prvé v galérii / posledné              | Prvé      |
| Autoplay         | Automatické prehrávanie                | Nie       |
| Stlmenie         | Štandardne stlmené                     | Áno       |
| Slučka           | Prehrávanie v slučke                   | Nie       |
| Proporcie        | 16:9 / 4:3 / 1:1                      | 16:9      |
| Ikona play       | Ikona play na miniatúre                | Áno       |

### Lazy loading

Videá YouTube a Vimeo sú načítané lenivo - iframe s prehrávačom sa vloží až po kliknutí na miniatúru s ikonou play. Vďaka tomu stránka produktu nie je spomalená externými skriptami prehrávača.

## Zoom galérie (gallery zoom)

Modul pridáva zväčšovanie fotografií produktu po prejdení kurzorom alebo kliknutí.

### Režimy zoom

- **Hover** - zväčšenie zobrazené vnútri fotografie po prejdení kurzorom
- **Lupa** - lupa nasledujúca kurzor
- **Lightbox** - celoobrazovkový náhľad po kliknutí

### Konfigurácia

```php
// Zmena typu zoomu
add_filter('polski/gallery_zoom/type', function (): string {
    return 'lens'; // 'hover', 'lens', 'lightbox'
});

// Zmena mierky zväčšenia
add_filter('polski/gallery_zoom/scale', function (): float {
    return 2.5; // štandardne 2.0
});
```

Požiadavky na fotografie: aby zoom vyzeral dobre, fotografie produktov by mali mať rozlíšenie aspoň 1200x1200 px. Pri nižšom rozlíšení bude zväčšený obraz rozmazaný.

## Zoznam čakajúcich (waitlist)

Modul umožňuje zákazníkom zapísať sa na e-mailové oznámenie o dostupnosti produktu, ktorý je momentálne nedostupný.

### Ako funguje

1. Zákazník navštívi stránku nedostupného produktu
2. Namiesto tlačidla **Pridať do košíka** vidí formulár s poľom e-mail
3. Zákazník zadá e-mailovú adresu a klikne na **Upozornite ma**
4. Keď sa produkt vráti na sklad, systém automaticky zašle oznámenie

### Správa zoznamu

V paneli admina (**WooCommerce > Polski > Zoznam čakajúcich**) sú viditeľné:

- Zoznam produktov s počtom čakajúcich
- E-mailové adresy zapísaných zákazníkov
- Stav oznámenia (zaslané / čakajúce)
- Tlačidlo ručného zaslania oznámenia

### Súhlas GDPR

Formulár zapísania na zoznam obsahuje checkbox súhlasu so spracovaním osobných údajov, v súlade s GDPR. Obsah checkboxu konfigurujete v nastaveniach modulu.

```php
add_filter('polski/waitlist/consent_text', function (): string {
    return 'Wyrażam zgodę na otrzymanie jednorazowego powiadomienia o dostępności produktu.';
});
```

### Automatické čistenie

E-mailové adresy sú odstraňované zo zoznamu po:
- Zaslaní oznámenia
- 90 dňoch od zapísania (konfigurovateľné obdobie)
- Ručnom odstránení administrátorom

## Nekonečné posúvanie (infinite scroll)

Modul nahrádza tradičnú pagináciu automatickým načítaním ďalších stránok produktov pri posúvaní.

### Režimy

- **Automatický** - ďalšia stránka sa načíta automaticky keď používateľ dorazí na koniec zoznamu
- **Tlačidlo** - zobrazuje tlačidlo **Načítať viac** namiesto automatického načítania

### Konfigurácia

| Možnosť              | Popis                              | Predvolené     |
| ------------------- | --------------------------------- | ------------- |
| Režim               | Automatický alebo tlačidlo         | Automatický   |
| Vzdialenosť         | Vzdialenosť od spodku zoznamu (px) | 300           |
| Text tlačidla       | Text na tlačidle                    | Načítať viac  |
| Spinner             | Typ animácie načítania              | Bodky         |
| Limit stránok       | Maximálny počet stránok             | 10            |

### SEO

Nekonečné posúvanie podporuje parameter `?paged=N` v URL (History API). Vyhľadávače stále vidia klasickú pagináciu - modul servíruje paginované URL pre botov.

```php
// Vypnutie infinite scroll na mobilných zariadeniach
add_filter('polski/infinite_scroll/enabled', function (): bool {
    return ! wp_is_mobile();
});
```

## Popup

Modul zobrazuje konfigurovateľný popup (modálne okno) na stránke obchodu.

### Typy popupov

- **Newsletter** - formulár prihlásenia na odber newslettera
- **Informačný** - ľubovoľný HTML obsah/shortcódy
- **Produktový** - propagovanie vybraného produktu
- **Výstupný** - zobrazený pri pokuse o opustenie stránky (exit intent)

### Spúšťače (triggers)

| Spúšťač          | Popis                                        |
| ---------------- | ------------------------------------------- |
| Čas              | Po X sekundách od vstupu na stránku          |
| Posúvanie        | Po posúvaní X% stránky                       |
| Exit intent      | Keď kurzor opustí okno prehliadača           |
| Kliknutie        | Po kliknutí na prvok s CSS triedou           |
| Počet návštev    | Po N-tej návšteve stránky                    |

### Obmedzenia zobrazovania

- **Raz za reláciu** - popup sa zobrazí raz počas návštevy
- **Raz za X dní** - popup sa znova nezobrazí po dobu X dní (cookie)
- **Len noví** - popup viditeľný len pre nových návštevníkov
- **Vybrané stránky** - popup viditeľný len na uvedených stránkach

### Konfigurácia v paneli

Prejdite do **WooCommerce > Polski > Obchodné moduly > Popup** a nakonfigurujte:

- Obsah popupu (WYSIWYG editor s podporou shortcódov)
- Spúšťač a podmienky zobrazovania
- Štýl (farby, veľkosť, animácia)
- Pozícia (centrum, spodok, bok)
- Tlačidlo zatvorenia

### Právne požiadavky

Popup by nemal sťažovať používanie obchodu (dark patterns). Modul vynucuje:
- Viditeľné tlačidlo zatvorenia (X)
- Možnosť zatvorenia kliknutím na pozadie
- Zatvorenie klávesom Escape
- Žiadne blokovanie posúvania stránky pod popupom

## Riešenie problémov

**Manažér záložiek neukladá poradie** - vymažte cache prehliadača a cache WordPressu. Problém môže byť tiež spôsobený konfliktom s pluginom záložiek.

**Zoom nefunguje na mobile** - režim hover a lupa nefungujú na dotykových zariadeniach. Použite režim lightbox pre mobile.

**Infinite scroll nenačítava ďalšie stránky** - skontrolujte, či téma používa štandardnú pagináciu WooCommerce (`woocommerce_pagination()`).

**Popup sa nezobrazuje** - skontrolujte nastavenia cookie. Ak sa popup už zobrazil, cookie blokuje opätovné zobrazenie. Vymažte cookies alebo nastavte inú frekvenciu.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
