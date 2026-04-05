---
title: Vicekrokova pokladna
description: Dokumentace vicekrokove pokladny Polski PRO for WooCommerce - rozdeleni procesu objednavky na kroky, konfigurace, React Checkout Blocks a klasicky fallback.
---

Modul deli pokladnu na ctyri kroky: adresa, doruceni, platba a shrnuti. Zakaznik vidi ukazatel prubehu a prochazi postupne kazdym krokem.

## Kroky pokladny

Vicekrokova pokladna se sklada ze ctyr kroku:

| Krok | Vychozi nazev | Obsah |
|------|---------------|-------|
| 1 | Adresa | Formular fakturacnich udaju a dorucovaci adresy |
| 2 | Doruceni | Vyber zpusobu doruceni a moznosti zasilky |
| 3 | Platba | Vyber zpusobu platby a platebni udaje |
| 4 | Shrnuti | Prehled objednavky, pravni checkboxy, tlacitko "Objednat a zaplatit" |

Zakaznik se muze vracet k predchozim krokum bez ztraty zadanych udaju. Prechod na dalsi krok vyzaduje spravne vyplneni aktualniho formulare.

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Moduly PRO > Pokladna**.

### Zapnuti modulu

Vicekrokova pokladna je rizena moznosti:

```
polski_pro_checkout[multistep_enabled]
```

Hodnota `1` zapina vicekrokove rozlozeni, `0` obnovuje vychozi pokladnu WooCommerce.

### Nazvy kroku

Vychozi nazvy kroku lze zmenit v nastaveni:

| Nastaveni | Vychozi hodnota |
|-----------|-----------------|
| Nazev kroku 1 | Adresa |
| Nazev kroku 2 | Doruceni |
| Nazev kroku 3 | Platba |
| Nazev kroku 4 | Shrnuti |

Nazvy kroku se zobrazuji v ukazateli prubehu nad formularem pokladny.

### Validace mezi kroky

Plugin validuje data po kazdem kroku pred povolenim prechodu na dalsi:

- **Krok 1 (Adresa)** - povinna pole: jmeno, prijmeni, adresa, mesto, PSC, telefon, e-mail
- **Krok 2 (Doruceni)** - povinny vyber zpusobu doruceni
- **Krok 3 (Platba)** - povinny vyber zpusobu platby
- **Krok 4 (Shrnuti)** - povinne zaskrtnuti povinnych pravnich checkboxu

Validacni zpravy se zobrazuji inline pod prislusnym polem.

## Technicka implementace

### WooCommerce Checkout Blocks (React)

Pro obchody vyuzivajici WooCommerce Checkout Blocks (blokovy editor) modul vyuziva React pro rendrovani kroku. Komponenty se integraji s WooCommerce Store API a zachovavaji uplnou kompatibilitu s rozsirenimi Checkout Blocks.

Rendrovani probiha na strane klienta. Plugin se registruje jako rozsireni Checkout Blocks a modifikuje rozlozeni formulare bez zasahu do logiky WooCommerce.

### Klasicky fallback (shortcode)

Pro obchody pouzivajici klasickou pokladnu (shortcode `[woocommerce_checkout]`) modul poskytuje JavaScript fallback. Skript rozdeli stavajici formular na sekce a pridava navigaci mezi nimi.

Klasicky fallback:

- nevyzaduje React
- funguje se stavajicimi motivy a prisposobenimi pokladny
- podporuje stejne ctyri kroky jako verze Blocks
- vyuziva jQuery pro manipulaci s DOM

### Detekce rezimu

Plugin automaticky detekuje, zda pokladna pouziva Checkout Blocks nebo klasicky shortcode, a nacita prislusnou implementaci. Nevyzaduje rucni konfiguraci rezimu.

## Stylizace

### CSS trida body

Kdyz je vicekrokova pokladna aktivni, k elementu `<body>` se pridava trida:

```
polski-multistep-checkout
```

To umoznuje cileni CSS stylu vylucne na stranky s vicekrokovou pokladnou:

```css
body.polski-multistep-checkout .woocommerce-checkout {
    max-width: 720px;
    margin: 0 auto;
}
```

### Tridy kroku

Kazdy krok dostava vlastni CSS tridu:

```css
.polski-checkout-step { /* spolecne styly kroku */ }
.polski-checkout-step--active { /* aktivni krok */ }
.polski-checkout-step--completed { /* dokonceny krok */ }
.polski-checkout-step--address { /* adresni krok */ }
.polski-checkout-step--shipping { /* krok doruceni */ }
.polski-checkout-step--payment { /* krok platby */ }
.polski-checkout-step--review { /* krok shrnuti */ }
```

### Ukazatel prubehu

Ukazatel prubehu je rendrovany jako element `<ol>` s tridou `.polski-checkout-progress`. Kazdy prvek seznamu odpovida jednomu kroku:

```css
.polski-checkout-progress { /* kontejner ukazatele */ }
.polski-checkout-progress__step { /* jednotlivy krok v ukazateli */ }
.polski-checkout-progress__step--active { /* aktivni krok v ukazateli */ }
.polski-checkout-progress__step--done { /* dokonceny krok v ukazateli */ }
```

## Kompatibilita s dalsimi moduly

### Pravni checkboxy

Pravni checkboxy z bezplatne verze Polski for WooCommerce jsou automaticky presunuty do kroku 4 (Shrnuti). Zakaznik je musi zaskrtnout pred odelsanim objednavky.

### Pole DIC

Pole DIC je zobrazeno v kroku 1 (Adresa) v souladu s konfiguraci podmineneho zobrazeni z modulu DIC.

### Vlastni pole

Pole pridana jinymi pluginy (napr. pres hook `woocommerce_checkout_fields`) jsou automaticky prirazena k prislusnemu kroku na zaklade jejich sekce:

- `billing_*` - krok 1
- `shipping_*` - krok 2
- `order_*` - krok 4

## Pristupnost (a11y)

Vicekrokova pokladna podporuje:

- navigaci klavesnici (Tab, Enter, Escape)
- atributy ARIA (`aria-current`, `aria-label`, `role="tablist"`)
- oznamovani zmen kroku cteckami obrazovky
- viditelny fokus na interaktivnich prvcich

## Vykon

Modul nacita skripty a styly pouze na strance pokladny. Na ostatnich strankach obchodu nepridava zadne prostredky. Skripty jsou nacteny s atributem `defer`, aby neblokovaly rendrovani stranky.

## Nejcastejsi problemy

### Pokladna se nedeli na kroky

1. Zkontrolujte, ze moznost `polski_pro_checkout[multistep_enabled]` je nastavena na `1`
2. Vycistete cache (cache pluginy, CDN, cache prohlizece)
3. Zkontrolujte konzoli prohlizece na chyby JavaScriptu
4. Overite, ze nedochazi ke konfliktu s jinymi pluginy upravujicimi pokladnu

### Formular neprechazi na dalsi krok

1. Zkontrolujte, ze vsechna povinna pole jsou vyplnena
2. Overite validacni zpravy pod poli
3. Zkontrolujte konzoli prohlizece - chyby AJAX mohou blokovat validaci

### Styly nefunguji spravne

1. Zkontrolujte, ze trida `polski-multistep-checkout` je pritomna na elementu `<body>`
2. Overite, ze styly pluginu nejsou prepisovany motivem (pouzijte inspektor)
3. Pridejte vlastni styly s vyssi specificitou selektoru

## Souvisejici zdroje

- [Pravni checkboxy](/checkout/legal-checkboxes/)
- [DIC na pokladne](/checkout/nip-lookup/)
- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
