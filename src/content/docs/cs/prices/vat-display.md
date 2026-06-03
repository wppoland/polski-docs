---
title: Zobrazení DPH
description: Konfigurace zobrazení cen s DPH a bez DPH, sazby DPH a osvobození podle čl. 113 polského zákona o DPH ve WooCommerce.
---

Polské právo vyžaduje, aby obchod jasně informoval, zda cena obsahuje DPH. Plugin Polski for WooCommerce umožňuje zobrazit informaci o DPH, od jednoduchého označení "s DPH / bez DPH" až po sazbu daně a důvod osvobození.

## Právní požadavky

Internetový obchod musí:

- jasně informovat, zda cena obsahuje DPH
- uvádět sazbu DPH, pokud prodává jak soukromým osobám, tak firmám
- v případě osvobození od DPH uvést právní základ osvobození

Pokud využíváte osvobození od DPH (čl. 113), informujte zákazníka, že cena neobsahuje DPH.

## Konfigurace

Přejděte na **WooCommerce > Nastavení > Polski > Ceny** a nakonfigurujte sekci "Zobrazení DPH".

### Režimy zobrazení

| Režim | Popis | Příklad |
|------|------|---------|
| S DPH | Cena obsahuje daň | 123,00 zł s DPH |
| Bez DPH | Cena bez daně | 100,00 zł bez DPH |
| Obě | Obě ceny současně | 100,00 zł bez DPH (123,00 zł s DPH) |

### Podrobná nastavení

- **Zobrazit sazbu DPH** - zobrazí procentní sazbu daně vedle ceny (např. "v tom 23 % DPH")
- **Zobrazit informaci o DPH ve výpisu** - řídí viditelnost na stránkách kategorií a ve výsledcích vyhledávání
- **Zobrazit informaci o DPH v košíku** - řídí viditelnost v košíku a souhrnu objednávky
- **Vlastní text** - umožňuje přepsat výchozí text informace o DPH

## Osvobození od DPH (čl. 113)

Pokud jste osvobozeni od DPH na základě čl. 113 odst. 1 nebo odst. 9, nakonfigurujte odpovídající zprávu.

### Konfigurace osvobození

1. Přejděte na **WooCommerce > Nastavení > Polski > Ceny**
2. Zaškrtněte možnost **Osvobození od DPH (čl. 113)**
3. Vyberte základ osvobození:
   - **Čl. 113 odst. 1** - osvobození pro prodej do 200 000 zł ročně
   - **Čl. 113 odst. 9** - osvobození pro poplatníky zahajující činnost během roku
4. Volitelně upravte text zprávy

Výchozí zpráva: "Cena neobsahuje DPH - prodejce využívá osvobození na základě čl. 113 odst. 1 zákona o DPH."

### Vypnutí DPH ve WooCommerce

Při osvobození od DPH nastavte ve WooCommerce:

1. **WooCommerce > Nastavení > Daně** - vypněte výpočet daní NEBO nastavte sazbu 0 %
2. Plugin automaticky přidá příslušnou poznámku k cenám

## Shortcode

Použijte shortcode `[polski_tax_notice]` k zobrazení informace o DPH na libovolném místě.

### Parametry

| Parametr | Typ | Výchozí | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuální | ID produktu |
| `type` | string | `auto` | Typ informace: `auto`, `gross`, `net`, `exempt` |
| `show_rate` | bool | `true` | Zda zobrazovat procentní sazbu |
| `wrapper` | string | `span` | Obalující HTML element |

### Příklady použití

Automatická detekce na stránce produktu:

```html
[polski_tax_notice]
```

Vynucení informace o osvobození:

```html
[polski_tax_notice type="exempt"]
```

Bez procentní sazby:

```html
[polski_tax_notice show_rate="false"]
```

V PHP šabloně:

```php
echo do_shortcode('[polski_tax_notice product_id="' . $product->get_id() . '"]');
```

## Konfigurace pro obchody B2B a B2C

Pokud obsluhujete soukromé zákazníky (B2C) i firemní (B2B), nakonfigurujte samostatné zobrazení cen pro každou roli.

### Ceny bez DPH pro firmy

Plugin využívá systém rolí WooCommerce. Chcete-li zobrazovat ceny bez DPH firmám:

1. Vytvořte dedikovanou roli (např. "firemni_zakaznik") nebo použijte existující
2. V nastavení pluginu přiřaďte zobrazení bez DPH vybrané roli
3. Firemní zákazníci uvidí ceny bez DPH a soukromí s DPH

### Dvojí ceny na stránce produktu

Režim "Obě" zobrazuje cenu bez DPH i s DPH současně. Formát:

```
100,00 zł bez DPH
123,00 zł s DPH (v tom 23 % DPH)
```

Pořadí a formát lze upravit v nastavení.

## Sazby DPH pro různé kategorie produktů

V Polsku platí čtyři sazby DPH:

| Sazba | Použití |
|--------|-------------|
| 23 % | Základní sazba - většina zboží a služeb |
| 8 % | Snížená sazba - bytová výstavba, gastronomické služby |
| 5 % | Snížená sazba - potraviny, knihy, časopisy |
| 0 % | Nulová sazba - vývoz, dodání zboží uvnitř Společenství |

Plugin automaticky načte sazbu přiřazenou k produktu a zobrazí správnou informaci.

## Informace o DPH v e-mailech

Plugin přidává informaci o DPH do e-mailů WooCommerce:

- potvrzení objednávky
- faktura
- změna stavu objednávky

Text zprávy odpovídá nastavení obchodu.

## Stylování CSS

Informace o DPH je obalena v elementech s CSS třídami:

```css
.polski-tax-notice {
    font-size: 0.85em;
    color: #666;
}

.polski-tax-notice--exempt {
    color: #c00;
    font-weight: 600;
}

.polski-tax-notice__rate {
    white-space: nowrap;
}
```

## Nejčastější problémy

### Informace o DPH se zobrazuje dvakrát

Zkontrolujte, zda šablona nepřidává vlastní informaci o DPH. Některé polské šablony mají vestavěnou podporu DPH, jednu z nich vypněte.

### Sazba DPH se zobrazuje nesprávně

Zkontrolujte, zda jsou daňové třídy v **WooCommerce > Nastavení > Daně > Standardní sazby** správně nastaveny. Plugin načítá sazbu z konfigurace WooCommerce.

## Související zdroje

- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
