---
title: Otázky a odpovědi (Q&A)
description: Modul otázek a odpovědí v Polski for WooCommerce - sekce Q&A na stránkách produktů s hlasováním a značkami Schema.org.
---

Modul otázek a odpovědí přidává na stránky produktů WooCommerce vyhrazenou záložku Q&A. Zákazníci mohou klást dotazy k produktu a majitel obchodu nebo ostatní uživatelé na ně odpovídají. Systém podporuje hlasování o odpovědích a generuje strukturovaná data Schema.org.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **Otázky a odpovědi**. U každého produktu se vedle záložky recenzí objeví nová záložka "Otázky a odpovědi".

## Funkce

- Záložka Q&A v tabulce produktu WooCommerce
- Systém otázek a odpovědí založený na komentářích WordPress
- Vlastní typy komentářů: `product_question` a `product_answer`
- Hlasování o odpovědích přes AJAX (užitečné/neužitečné)
- E-mailová oznámení administrátorovi o nových dotazech
- Strukturovaná data Schema.org QAPage
- Formulář dotazu s validací
- Stránkování dotazů
- Moderace dotazů před zveřejněním (volitelně)

## Fungování

### Kladení dotazů

Zákazník vyplní formulář na stránce produktu a uvede:

- **Jméno** - povinné (automaticky doplněné u přihlášených)
- **E-mail** - povinný (automaticky doplněný u přihlášených)
- **Text dotazu** - povinný

Po odeslání jde dotaz do moderace (pokud je zapnutá) nebo se zveřejní ihned. Administrátor obdrží e-mailové oznámení.

### Odpovídání

Odpovědi se přidávají přímo pod dotaz. Odpovědi administrátora/majitele obchodu jsou označeny speciálním štítkem "Odpověď obchodu".

### Hlasování

Uživatelé mohou hlasovat o odpovědích (palec nahoru/dolů). Hlasování funguje přes AJAX bez znovunačtení stránky. Nejužitečnější odpovědi se zobrazují výše.

## Technické podrobnosti

### Typy komentářů

Modul využívá systém komentářů WordPress s vlastními typy:

- `product_question` - dotaz týkající se produktu
- `product_answer` - odpověď na dotaz

Díky tomu se dotazy nemíchají s recenzemi produktů ani s komentáři k příspěvkům.

### Schema.org QAPage

Modul automaticky přidává strukturovaná data ve formátu JSON-LD podle schématu `QAPage`. Každý dotaz s odpověďmi generuje samostatný objekt `Question` se vnořenými objekty `Answer`.

```json
{
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
        "@type": "Question",
        "name": "Je produkt vodotěsný?",
        "answerCount": 2,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ano, produkt má třídu vodotěsnosti IP67."
        }
    }
}
```

### Hooky

```php
// Změna názvu záložky
add_filter('polski/product_qa/tab_title', function (string $title, int $count): string {
    return sprintf('Dotazy (%d)', $count);
}, 10, 2);

// Vypnutí e-mailových oznámení
add_filter('polski/product_qa/send_email', '__return_false');

// Změna počtu dotazů na stránku
add_filter('polski/product_qa/per_page', function (): int {
    return 20; // výchozí: 10
});

// Filtr, kdo může hlasovat
add_filter('polski/product_qa/can_vote', function (bool $can_vote, int $user_id): bool {
    return is_user_logged_in();
}, 10, 2);
```

### AJAX akce

| Akce | Popis |
|---|---|
| `polski_qa_submit_question` | Odeslání nového dotazu |
| `polski_qa_submit_answer` | Odeslání odpovědi |
| `polski_qa_vote` | Hlasování o odpovědi |

### CSS třídy

- `.polski-qa` - hlavní kontejner
- `.polski-qa__question` - jednotlivý dotaz
- `.polski-qa__answer` - odpověď
- `.polski-qa__answer--shop` - odpověď obchodu
- `.polski-qa__vote` - tlačítka hlasování
- `.polski-qa__vote-count` - počítadlo hlasů
- `.polski-qa__form` - formulář dotazu

### ID modulu

`product_qa`

## Řešení problémů

**Záložka Q&A se nezobrazuje** - zkontrolujte, zda šablona podporuje záložky WooCommerce (hook `woocommerce_product_tabs`). Některé šablony výchozí záložky přepisují.

**Dotazy se po odeslání neobjevují** - zkontrolujte nastavení moderace v **Nastavení > Diskuse > Komentář musí být ručně schválen**.

**Schema.org se nevaliduje** - ujistěte se, že dotaz má alespoň jednu odpověď. Google vyžaduje k správné validaci QAPage dvojici dotaz-odpověď.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
