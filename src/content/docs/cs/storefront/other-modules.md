---
title: Ostatní moduly obchodu
description: Doplňkové moduly v Polski for WooCommerce - správce záložek, zvýrazněné video, zoom galerie, seznam čekajících, nekonečné scrollování, popup.
---

Doplňkové moduly obchodu. Každý zapnete nezávisle v **WooCommerce > Polski > Moduly obchodu**.

## Správce záložek (tab manager)

Ovládejte záložky na stránce produktu (Popis, Doplňkové informace, Recenze atd.).

### Možnosti

- **Změna pořadí** - přetáhněte a pusťte
- **Skrývání záložek** - skryjte bez odstranění obsahu
- **Změna názvů** - např. "Detaily" místo "Popis"
- **Přidávání záložek** - vlastní záložky s libovolným obsahem
- **Globální záložky** - viditelné na všech produktech
- **Záložky pro produkt** - pouze na vybraném produktu
- **Záložky pro kategorii** - pouze na produktech z dané kategorie

### Přidání vlastní záložky

V nastavení správce záložek klikněte na **Přidat záložku** a vyplňte:

- **Název** - titulek záložky
- **Obsah** - podporuje WYSIWYG editor, shortcody a HTML
- **Priorita** - pozice záložky (nižší = více vlevo)
- **Viditelnost** - globální, vybraná kategorie nebo vybraný produkt

Programově:

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

## Zvýrazněné video (featured video)

Nahraďte nebo doplňte hlavní fotografii produktu videem.

### Podporované zdroje

- **YouTube** - vložte URL videa
- **Vimeo** - vložte URL videa
- **Vlastní video** - nahrajte soubor MP4 do knihovny médií
- **Externí URL** - odkaz na soubor MP4/WebM

### Konfigurace

V editoru produktu v sekci **Fotografie produktu** se objeví dodatečné pole **Video produktu**. Vložte URL videa nebo vyberte z knihovny médií.

Možnosti zobrazení:

| Možnost          | Popis                                 | Výchozí   |
| ---------------- | ------------------------------------- | --------- |
| Pozice           | První v galerii / poslední            | První     |
| Autoplay         | Automatické přehrávání                | Ne        |
| Ztlumení         | Ve výchozím stavu ztlumeno            | Ano       |
| Smyčka           | Přehrávání ve smyčce                  | Ne        |
| Poměr stran      | 16:9 / 4:3 / 1:1                      | 16:9      |
| Ikona play       | Ikona play na miniatuře               | Ano       |

### Lazy loading

Videa YouTube a Vimeo se načítají líně, iframe se vloží teprve po kliknutí na miniaturu. Stránka produktu není zpomalována externími skripty.

## Zoom galerie (gallery zoom)

Zvětšování fotografií produktu po najetí kurzorem nebo kliknutí.

### Režimy zoomu

- **Hover** - zvětšení zobrazené uvnitř fotografie po najetí kurzorem
- **Lens** - lupa následující kurzor
- **Lightbox** - celoobrazovkový náhled po kliknutí

### Konfigurace

```php
// Změna typu zoomu
add_filter('polski/gallery_zoom/type', function (): string {
    return 'lens'; // 'hover', 'lens', 'lightbox'
});

// Změna měřítka zvětšení
add_filter('polski/gallery_zoom/scale', function (): float {
    return 2.5; // výchozí 2.0
});
```

Fotografie by měly mít alespoň 1200x1200 px. Při nižším rozlišení bude zvětšený obraz rozmazaný.

## Seznam čekajících (waitlist)

Zákazníci se mohou přihlásit k e-mailovému oznámení, až nedostupný produkt vrátí do prodeje.

### Jak funguje

1. Zákazník navštíví stránku nedostupného produktu
2. Místo tlačítka **Přidat do košíku** vidí formulář s polem e-mail
3. Zákazník zadá e-mailovou adresu a klikne na **Oznámit mi**
4. Když se produkt vrátí na sklad, systém automaticky odešle oznámení

### Správa seznamu

V admin panelu (**WooCommerce > Polski > Seznam čekajících**) jsou viditelné:

- Seznam produktů s počtem čekajících
- E-mailové adresy přihlášených zákazníků
- Stav oznámení (odeslané / čekající)
- Tlačítko ručního odeslání oznámení

### Souhlas GDPR

Formulář obsahuje checkbox souhlasu GDPR. Text checkboxu změníte v nastavení modulu.

```php
add_filter('polski/waitlist/consent_text', function (): string {
    return 'Souhlasím s přijetím jednorázového oznámení o dostupnosti produktu.';
});
```

### Automatické čištění

E-mailové adresy se ze seznamu odstraňují po:
- Odeslání oznámení
- 90 dnech od přihlášení (konfigurovatelné období)
- Ručním odstranění administrátorem

## Nekonečné scrollování (infinite scroll)

Nahrazuje tradiční stránkování automatickým načítáním produktů při scrollování.

### Režimy

- **Automatický** - další stránka se načte automaticky, když uživatel dorazí na konec seznamu
- **Tlačítko** - zobrazuje tlačítko **Načíst více** místo automatického načítání

### Konfigurace

| Možnost            | Popis                             | Výchozí       |
| ------------------- | --------------------------------- | ------------- |
| Režim               | Automatický nebo tlačítko         | Automatický   |
| Vzdálenost          | Vzdálenost od konce seznamu (px)  | 300           |
| Text tlačítka       | Text na tlačítku                  | Načíst více   |
| Spinner             | Typ animace načítání              | Dots          |
| Limit stránek       | Maximální počet stránek           | 10            |

### SEO

Modul podporuje parametr `?paged=N` v URL (History API). Vyhledávače vidí klasické stránkování, boti dostávají stránkované URL.

```php
// Vypnutí infinite scroll na mobilních zařízeních
add_filter('polski/infinite_scroll/enabled', function (): bool {
    return ! wp_is_mobile();
});
```

## Popup

Konfigurovatelný popup (modální okno) na stránce obchodu.

### Typy popupů

- **Newsletter** - formulář přihlášení k newsletteru
- **Informační** - libovolný HTML obsah/shortcody
- **Produktový** - propagace vybraného produktu
- **Odchod** - zobrazovaný při pokusu o opuštění stránky (exit intent)

### Spouštěče (triggers)

| Spouštěč         | Popis                                       |
| ---------------- | ------------------------------------------- |
| Čas              | Po X sekundách od vstupu na stránku         |
| Scroll           | Po prescrollování X% stránky                |
| Exit intent      | Když kurzor opustí okno prohlížeče          |
| Kliknutí         | Po kliknutí na prvek s CSS třídou           |
| Počet návštěv    | Po N-té návštěvě stránky                    |

### Omezení zobrazení

- **Jednou za relaci** - popup se zobrazí jednou během návštěvy
- **Jednou za X dní** - popup se znovu neukáže po X dní (cookie)
- **Pouze noví** - popup viditelný pouze pro nové návštěvníky
- **Vybrané stránky** - popup viditelný pouze na určených stránkách

### Konfigurace v panelu

Přejděte do **WooCommerce > Polski > Moduly obchodu > Popup** a nakonfigurujte:

- Obsah popupu (WYSIWYG editor s podporou shortcodů)
- Spouštěč a podmínky zobrazení
- Styl (barvy, velikost, animace)
- Pozice (střed, dole, bok)
- Tlačítko zavření

### Právní požadavky

Popup nesmí ztěžovat používání obchodu (dark patterns). Modul vynucuje:
- Viditelné tlačítko zavření (X)
- Možnost zavření kliknutím na pozadí
- Zavření klávesou Escape
- Žádné blokování scrollování stránky pod popupem

## Řešení problémů

**Správce záložek neukládá pořadí** - vymažte mezipaměť prohlížeče a WordPressu. Možný konflikt s jiným pluginem záložek.

**Zoom nefunguje na mobilu** - režim hover a lens nefungují na dotykových obrazovkách. Použijte režim lightbox.

**Infinite scroll nenačítá další stránky** - zkontrolujte, zda šablona používá standardní stránkování WooCommerce (`woocommerce_pagination()`).

**Popup se nezobrazuje** - pokud se popup již objevil, cookie blokuje opětovné zobrazení. Vymažte cookies nebo změňte frekvenci.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je software s otevřeným zdrojovým kódem (GPLv2) poskytovaný bez záruky.</div>
