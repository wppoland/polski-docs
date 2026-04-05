---
title: Panel souladu (compliance dashboard)
description: Panel kontroly pravnich pozadavku v Polski for WooCommerce - kontrolni seznam s barevnym stavem pro kazdy pozadavek.
---

Panel souladu je centralni misto pro kontrolu pravnich pozadavku obchodu. Zobrazuje kontrolni seznam se stavem kazdeho pozadavku - od obchodnich podminek po GPSR a DSA.

## Pristup k panelu

Prejdete do **WooCommerce > Polski > Panel souladu**. Panel je dostupny pro uzivatele s opravnenim `manage_woocommerce` (role Administrator a Spravce obchodu).

## Kontrolni seznam (checklist)

Panel zobrazuje seznam pravnich pozadavku seskupenych do kategorii. Kazdy pozadavek ma vizualni stav:

### Stavy

| Stav | Barva | Ikona | Popis |
| ------ | ------- | ----- | ----------------------------------------- |
| OK | Zelena | ✓ | Pozadavek splnen |
| WARN | Zluta | ! | Castecne splneny, vyzaduje pozornost |
| FAIL | Cervena| ✗ | Nesplneny, vyzaduje okamzitou akci |
| OFF | Seda | - | Modul deaktivovan |

### Kategorie: pravni stranky

| Kontrola | Zeleny stav kdyz |
| ------------------------------------ | --------------------------------------- |
| Obchodni podminky | Stranka publikovana a prirazena |
| Zasady ochrany osobnich udaju | Stranka publikovana a prirazena |
| Informace o odstoupeni od smlouvy | Stranka publikovana s formularem |
| Zasady cookies | Stranka publikovana |
| Informace o doruceni a platbach | Stranka publikovana |

### Kategorie: pravni checkboxy

| Kontrola | Zeleny stav kdyz |
| ------------------------------------ | --------------------------------------- |
| Prijeti obchodnich podminek (pokladna) | Checkbox aktivni a povinny |
| Zasady ochrany osobnich udaju (pokladna) | Checkbox aktivni a povinny |
| Marketingovy souhlas | Checkbox aktivni (volitelny) |

### Kategorie: smernice Omnibus

| Kontrola | Zeleny stav kdyz |
| ------------------------------------ | --------------------------------------- |
| Modul Omnibus aktivni | Modul aktivovan v nastaveních |
| Historie cen ukladana | Tabulka historie cen existuje a funguje |
| Nejnizsi cena zobrazovana | Cena viditelna na produktech v akci |
| Obdobi 30 dnu | Nastavene obdobi alespon 30 dnu |

### Kategorie: GPSR

| Kontrola | Zeleny stav kdyz |
| ------------------------------------ | --------------------------------------- |
| Modul GPSR aktivni | Modul aktivovan |
| Udaje vyrobce doplneny | Alespon 80 % produktu ma GPSR data |
| Udaje zastupce | Doplneny pro produkty mimo EU |

### Kategorie: DSA

| Kontrola | Zeleny stav kdyz |
| ------------------------------------ | --------------------------------------- |
| Formular hlaseni DSA | Formular dostupny na strance |
| Kontaktni misto DSA | Kontaktni e-mail nastaven |
| Registr hlaseni | Tabulka hlaseni existuje |

## Souhrn

V horni casti panelu je zobrazen souhrn:

- **Celkovy vysledek** - procento splnenych pozadavku (napr. 85 %)
- **Ukazatel postupu** - vizualni reprezentace vysledku
- **Kriticke pozadavky** - pocet nesplnenych pozadavku FAIL
- **Varovani** - pocet castecne splnenych pozadavku WARN
- **Datum posledni kontroly** - kdy byl panel naposledy obnoven

## Podrobnosti pozadavku

Kliknuti na pozadavek rozvine sekci s podrobnostmi:

- **Popis** - co presne je kontrolovano
- **Pravni zaklad** - odkaz na predpis
- **Stav** - podrobny popis stavu
- **Doporucena akce** - co je treba udelat pro splneni pozadavku
- **Odkaz na nastaveni** - primy odkaz na prislusnou stranku nastaveni

## Export reportu

Panel umoznuje export reportu souladu:

- **PDF** - report ke stazeni nebo tisku
- **JSON** - strojove citelna data (napr. pro monitorovaci system)

```php
add_action('polski/compliance/report_generated', function (array $results, string $format): void {
    update_option('polski_last_compliance_report', current_time('mysql'));
}, 10, 2);
```

## Oznameni

Panel muze odesilat e-mailova oznameni administratorovi:

- **Tydenni report** - souhrn stavu odesilan jednou tydne
- **Kriticky alert** - okamzite oznameni kdyz se stav zmeni na FAIL

```php
add_filter('polski/compliance/report_frequency', function (): string {
    return 'daily'; // 'daily', 'weekly', 'monthly'
});
```

## Filtr pozadavku

Muzete pridat vlastni kontroly do panelu:

```php
add_filter('polski/compliance/checks', function (array $checks): array {
    $checks[] = [
        'id'       => 'custom_ssl',
        'category' => 'security',
        'label'    => 'Certifikat SSL',
        'callback' => function (): array {
            $is_ssl = is_ssl();
            return [
                'status'  => $is_ssl ? 'ok' : 'fail',
                'message' => $is_ssl ? 'SSL aktivni' : 'Chybi certifikat SSL',
            ];
        },
    ];
    return $checks;
});
```

## Reseni problemu

**Panel ukazuje zastarale data** - kliknete na tlacitko **Obnovit** v horni casti panelu.

**Stav FAIL pro pravni stranku** - zkontrolujte, zda stranka je publikovana (ne v konceptu) a zda je prirazena v **WooCommerce > Nastaveni > Pokrocile > Nastaveni stranky**.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
