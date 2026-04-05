---
title: Stitky produktu
description: Modul stitku v Polski for WooCommerce - automaticke odznaky (vyprodej, novinka, nizky sklad, bestseller) a rucni stitky na produkt.
---

Stitky (badges) jsou barevne odznaky zobrazovane na obrazcich produktu. Pomahaji zakaznikum rychle identifikovat produkty v akci, novinky, bestsellery a produkty s nizkym skladem.

## Aktivace modulu

Prejdete do **WooCommerce > Polski > Moduly obchodu** a aktivujte moznost **Stitky produktu**. Modul nahradi vychozi odznak WooCommerce "Vyprodej!" vlastnimi, konfigurovatelnymi stitky.

## Automaticke stitky

Automaticke stitky jsou generovany na zaklade dat produktu. Nevyzaduji rucni konfiguraci.

### Vyprodej (sale)

Zobrazena kdyz produkt ma nastavenou akcni cenu. Ve vychozim stavu ukazuje procento slevy (napr. **-25 %**) misto standardniho textu "Wyprzedaż!".

```php
// Zmena formatu odznaku vyprodeje
add_filter('polski/badges/sale_format', function (): string {
    return 'percentage'; // 'percentage', 'amount', 'text', 'both'
});
```

### Novinka (new)

Zobrazena na produktech pridanych v poslednich X dnech. Vychozi **14 dnu**.

```php
add_filter('polski/badges/new_days', function (): int {
    return 30; // produkty pridane v poslednich 30 dnech
});
```

### Nizky sklad (low stock)

Zobrazena kdyz mnozstvi produktu na sklade klesne pod stanoveny prah.

### Bestseller

Zobrazena na produktech s nejvetsim poctem prodeje. Vychozi top **10 produktu**.

## Rucni stitky (na produkt)

Krome automatickych stitku muzete pridavat vlastni odznaky k jednotlivym produktum v editoru produktu v zalozce **Stitky**.

Moznosti rucniho stitku:

- **Text** - obsah zobrazovany na odznaku (napr. "Doporucujeme", "Eco", "Doprava zdarma")
- **Barva pozadi** - barva odznaku (color picker)
- **Barva textu** - barva textu na odznaku
- **Pozice** - levy horni, pravy horni, levy dolni, pravy dolni
- **Priorita** - poradi zobrazeni kdyz ma produkt vice stitku

Maximalni pocet stitku na jednom produktu je **4** (automaticke + rucni dohromady).

## Stylovani CSS

Tridy CSS:

- `.polski-badge` - bazova trida stitku
- `.polski-badge--sale` - vyprodej
- `.polski-badge--new` - novinka
- `.polski-badge--low-stock` - nizky sklad
- `.polski-badge--bestseller` - bestseller
- `.polski-badge--custom` - rucni stitek
- `.polski-badge--top-left` - pozice levy horni
- `.polski-badge--top-right` - pozice pravy horni
- `.polski-badge--rectangle` - tvar obdelnikovy
- `.polski-badge--circle` - tvar kruhu
- `.polski-badge--ribbon` - tvar stuhy

## Reseni problemu

**Stitek vyprodeje nezobrazuje procento** - zkontrolujte, zda regularni cena produktu je nastavena.

**Rucni stitek se nezobrazuje** - zkontrolujte limit stitku na produktu. Pokud produkt ma jiz 4 automaticke stitky, rucni se nezobrazi.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
