---
title: Panel souladu (compliance dashboard)
description: Panel kontroly právních požadavků v Polski for WooCommerce - kontrolní seznam s barevným stavem pro každý požadavek.
---

Panel souladu je centrální místo pro kontrolu právních požadavků obchodu. Zobrazuje kontrolní seznam se stavem každého požadavku - od obchodních podmínek po GPSR a DSA.

## Přístup k panelu

Přejděte do **WooCommerce > Polski > Panel souladu**. Vyžaduje oprávnění `manage_woocommerce` (Administrátor nebo Správce obchodu).

## Kontrolní seznam (checklist)

Právní požadavky seskupené do kategorií. Každý má vizuální stav:

### Stavy

| Stav   | Barva   | Ikona | Popis                                     |
| ------ | ------- | ----- | ----------------------------------------- |
| OK     | Zelená  | ✓     | Požadavek splněn                          |
| WARN   | Žlutá   | !     | Částečně splněno, vyžaduje pozornost      |
| FAIL   | Červená | ✗     | Nesplněno, vyžaduje okamžitou akci        |
| OFF    | Šedá    | -     | Modul vypnut                              |

### Kategorie: právní stránky

| Kontrola                             | Zelený stav když                        |
| ------------------------------------ | --------------------------------------- |
| Obchodní podmínky                    | Stránka publikována a přiřazena         |
| Zásady ochrany soukromí              | Stránka publikována a přiřazena         |
| Informace o odstoupení od smlouvy    | Stránka publikována s formulářem        |
| Zásady cookies                       | Stránka publikována                     |
| Informace o dopravě a platbách       | Stránka publikována                     |

### Kategorie: právní zaškrtávací políčka

| Kontrola                             | Zelený stav když                        |
| ------------------------------------ | --------------------------------------- |
| Souhlas s podmínkami (pokladna)      | Políčko aktivní a vyžadované            |
| Zásady ochrany soukromí (pokladna)   | Políčko aktivní a vyžadované            |
| Souhlas s podmínkami (registrace)    | Políčko aktivní a vyžadované            |
| Marketingový souhlas                 | Políčko aktivní (volitelné)             |

### Kategorie: směrnice Omnibus

| Kontrola                             | Zelený stav když                        |
| ------------------------------------ | --------------------------------------- |
| Modul Omnibus aktivní                | Modul zapnut v nastavení                |
| Historie cen ukládána                | Tabulka historie cen existuje a funguje |
| Nejnižší cena zobrazena              | Cena viditelná u produktů v akci        |
| Období 30 dní                        | Nastaveno období alespoň 30 dní         |

### Kategorie: GPSR

| Kontrola                             | Zelený stav když                        |
| ------------------------------------ | --------------------------------------- |
| Modul GPSR aktivní                   | Modul zapnut                            |
| Údaje výrobce vyplněny               | Alespoň 80 % produktů má údaje GPSR     |
| Údaje zástupce                       | Vyplněno pro produkty mimo EU           |
| Informace o bezpečnosti              | Vyplněno pro produkty, které to vyžadují |

### Kategorie: DSA (Digital Services Act)

| Kontrola                             | Zelený stav když                        |
| ------------------------------------ | --------------------------------------- |
| Formulář hlášení DSA                 | Formulář dostupný na stránce            |
| Kontaktní bod DSA                    | Kontaktní e-mail nastaven               |
| Registr hlášení                      | Tabulka hlášení existuje                |

### Kategorie: pokladna

| Kontrola                             | Zelený stav když                        |
| ------------------------------------ | --------------------------------------- |
| Popisek tlačítka objednávky          | Text odpovídá směrnici EU               |
| Souhrn objednávky                    | Viditelný před tlačítkem platby         |
| Informace o DPH a dopravě            | Zobrazena u cen produktů                |

### Kategorie: KSeF

| Kontrola                             | Zelený stav když                        |
| ------------------------------------ | --------------------------------------- |
| Modul KSeF aktivní                   | Modul zapnut                            |
| NIP firmy nastaven                   | NIP nakonfigurován v nastavení          |
| Spojení s KSeF                       | Test spojení úspěšně dokončen           |

### Kategorie: greenwashing

| Kontrola                             | Zelený stav když                        |
| ------------------------------------ | --------------------------------------- |
| Modul anti-greenwashing aktivní      | Modul zapnut                            |
| Prohlášení s doklady                 | Všechna prohlášení mají odůvodnění      |
| Certifikáty s odkazy                 | Certifikáty mají čísla a URL adresy     |

## Souhrn

V horní části panelu je viditelný souhrn:

- **Celkové skóre** - procento splněných požadavků (např. 85 %)
- **Ukazatel postupu** - vizuální reprezentace výsledku
- **Kritické požadavky** - počet nesplněných požadavků FAIL
- **Varování** - počet částečně splněných požadavků WARN
- **Datum poslední kontroly** - kdy byl panel naposledy aktualizován

## Detaily požadavku

Klikněte na požadavek pro zobrazení detailů:

- **Popis** - co přesně se kontroluje
- **Právní základ** - odkaz na předpis
- **Stav** - podrobný popis stavu
- **Doporučená akce** - co je třeba udělat pro splnění požadavku
- **Odkaz na nastavení** - přímý odkaz na příslušnou stránku nastavení

## Aktualizace stavů

Panel kontroluje stavy živě při každém otevření. Kontroly zahrnují:

- Existenci a stav stránek (publikována / koncept / smazána)
- Existenci a konfiguraci zaškrtávacích políček
- Správnost údajů v meta produktů (sampling - náhodný vzorek 100 produktů)
- Fungování modulů (aktivita, správnost konfigurace)
- Testy spojení s externími API (KSeF)

## Export zprávy

Exportujte zprávu o souladu:

- **PDF** - zpráva ke stažení nebo tisku
- **JSON** - strojově čitelná data (např. pro monitorovací systém)

```php
// Hook po vygenerování zprávy
add_action('polski/compliance/report_generated', function (array $results, string $format): void {
    // Logování data generování zprávy
    update_option('polski_last_compliance_report', current_time('mysql'));
}, 10, 2);
```

## Oznámení

Panel posílá e-mailová oznámení administrátorovi:

- **Týdenní zpráva** - souhrn stavů zasílaný jednou týdně
- **Kritický alert** - okamžité oznámení, když se stav změní na FAIL

Konfigurace oznámení: **WooCommerce > Polski > Panel souladu > Oznámení**.

```php
// Změna frekvence zprávy
add_filter('polski/compliance/report_frequency', function (): string {
    return 'daily'; // 'daily', 'weekly', 'monthly'
});
```

## Filtr požadavků

Můžete přidat vlastní kontroly do panelu:

```php
add_filter('polski/compliance/checks', function (array $checks): array {
    $checks[] = [
        'id'       => 'custom_ssl',
        'category' => 'security',
        'label'    => 'Certyfikat SSL',
        'callback' => function (): array {
            $is_ssl = is_ssl();
            return [
                'status'  => $is_ssl ? 'ok' : 'fail',
                'message' => $is_ssl ? 'SSL aktywny' : 'Brak certyfikatu SSL',
            ];
        },
    ];
    return $checks;
});
```

## Řešení problémů

**Panel zobrazuje zastaralá data** - klikněte na **Obnovit** v horní části panelu. Některá data (např. GPSR sampling) mohou být kešována.

**Stav FAIL pro právní stránku** - zkontrolujte, zda je stránka publikována (ne koncept) a přiřazena v **WooCommerce > Nastavení > Pokročilé > Nastavení stránky**.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
