---
title: Otázky a odpovede (Q&A)
description: Modul otázok a odpovedí v Polski for WooCommerce - sekcia Q&A na stránkach produktov s hlasovaním a označeniami Schema.org.
---

Modul otázok a odpovedí pridáva na stránky produktov WooCommerce vyhradenú kartu Q&A. Zákazníci môžu klásť otázky týkajúce sa produktu a majiteľ obchodu alebo iní používatelia na ne odpovedajú. Systém podporuje hlasovanie za odpovede a generuje štruktúrované dáta Schema.org.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Moduly obchodu** a zapnite **Otázky a odpovede**. Pri každom produkte sa popri karte recenzií objaví nová karta "Otázky a odpovede".

## Funkcie

- Karta Q&A v tabuľke produktu WooCommerce
- Systém otázok a odpovedí založený na komentároch WordPress
- Vlastné typy komentárov: `product_question` a `product_answer`
- Hlasovanie za odpovede cez AJAX (užitočné/neužitočné)
- E-mailové oznámenia administrátorovi o nových otázkach
- Štruktúrované dáta Schema.org QAPage
- Formulár otázky s validáciou
- Stránkovanie otázok
- Moderovanie otázok pred zverejnením (voliteľné)

## Fungovanie

### Kladenie otázok

Zákazník vyplní formulár na stránke produktu, kde uvedie:

- **Meno** - povinné (predvyplnené pre prihlásených)
- **E-mail** - povinný (predvyplnený pre prihlásených)
- **Text otázky** - povinný

Po odoslaní otázka putuje na moderovanie (ak je zapnuté) alebo sa zverejní okamžite. Administrátor dostane e-mail s oznámením.

### Odpovedanie

Odpovede sa pridávajú priamo pod otázku. Odpovede administrátora/majiteľa obchodu sú označené špeciálnym štítkom "Odpoveď obchodu".

### Hlasovanie

Používatelia môžu hlasovať za odpovede (palec hore/dole). Hlasovanie funguje cez AJAX bez znovunačítania stránky. Najužitočnejšie odpovede sa zobrazujú vyššie.

## Technické detaily

### Typy komentárov

Modul využíva systém komentárov WordPress s vlastnými typmi:

- `product_question` - otázka týkajúca sa produktu
- `product_answer` - odpoveď na otázku

Vďaka tomu sa otázky nemiešajú s recenziami produktov ani s komentármi k príspevkom.

### Schema.org QAPage

Modul automaticky pridáva štruktúrované dáta vo formáte JSON-LD zhodné so schémou `QAPage`. Každá otázka s odpoveďami generuje samostatný objekt `Question` so vnorenými objektmi `Answer`.

```json
{
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
        "@type": "Question",
        "name": "Czy produkt jest wodoodporny?",
        "answerCount": 2,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tak, produkt posiada klasę wodoodporności IP67."
        }
    }
}
```

### Hooky

```php
// Zmeniť názov karty
add_filter('polski/product_qa/tab_title', function (string $title, int $count): string {
    return sprintf('Pytania (%d)', $count);
}, 10, 2);

// Vypnúť e-mailové oznámenia
add_filter('polski/product_qa/send_email', '__return_false');

// Zmeniť počet otázok na stránku
add_filter('polski/product_qa/per_page', function (): int {
    return 20; // predvolene: 10
});

// Filtrovať, kto môže hlasovať
add_filter('polski/product_qa/can_vote', function (bool $can_vote, int $user_id): bool {
    return is_user_logged_in();
}, 10, 2);
```

### AJAX akcie

| Akcia | Popis |
|---|---|
| `polski_qa_submit_question` | Odoslanie novej otázky |
| `polski_qa_submit_answer` | Odoslanie odpovede |
| `polski_qa_vote` | Hlasovanie za odpoveď |

### CSS triedy

- `.polski-qa` - hlavný kontajner
- `.polski-qa__question` - jednotlivá otázka
- `.polski-qa__answer` - odpoveď
- `.polski-qa__answer--shop` - odpoveď obchodu
- `.polski-qa__vote` - tlačidlá hlasovania
- `.polski-qa__vote-count` - počítadlo hlasov
- `.polski-qa__form` - formulár otázky

### ID modulu

`product_qa`

## Riešenie problémov

**Karta Q&A sa nezobrazuje** - skontrolujte, či šablóna podporuje karty WooCommerce (hook `woocommerce_product_tabs`). Niektoré šablóny prepisujú predvolené karty.

**Otázky sa po odoslaní neobjavia** - skontrolujte nastavenia moderovania v **Nastavenia > Diskusia > Komentár musí byť ručne schválený**.

**Schema.org sa nevaliduje** - uistite sa, že otázka má aspoň jednu odpoveď. Google vyžaduje pár otázka-odpoveď na správnu validáciu QAPage.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
