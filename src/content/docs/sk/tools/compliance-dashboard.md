---
title: Panel súladu (compliance dashboard)
description: Panel kontroly právnych požiadaviek v Polski for WooCommerce - kontrolný zoznam s farebným stavom pre každú požiadavku.
---

Panel súladu je centrálne miesto na kontrolu právnych požiadaviek obchodu. Zobrazuje kontrolný zoznam so stavom každej požiadavky - od obchodných podmienok po GPSR a DSA.

## Prístup k panelu

Prejdite do **WooCommerce > Polski > Panel súladu**. Panel je dostupný pre používateľov s oprávnením `manage_woocommerce` (role Administrator a Manažér obchodu).

## Kontrolný zoznam (checklist)

Panel zobrazuje zoznam právnych požiadaviek zoskupených do kategórií. Každá požiadavka má vizuálny stav:

### Stavy

| Stav | Farba   | Ikona | Popis                                      |
| ------ | ------- | ----- | ----------------------------------------- |
| OK     | Zelený  | ✓     | Požiadavka splnená                         |
| WARN   | Žltý   | !     | Čiastočne splnená, vyžaduje pozornosť      |
| FAIL   | Červený | ✗     | Nesplnená, vyžaduje okamžitú akciu          |
| OFF    | Šedý   | -     | Modul vypnutý                              |

### Kategória: právne stránky

| Kontrola                             | Zelený stav keď                         |
| ------------------------------------ | --------------------------------------- |
| Obchodné podmienky                   | Stránka publikovaná a priradená          |
| Zásady ochrany osobných údajov       | Stránka publikovaná a priradená          |
| Informácia o odstúpení od zmluvy     | Stránka publikovaná s formulárom         |
| Zásady cookies                       | Stránka publikovaná                      |
| Informácia o doručení a platbách     | Stránka publikovaná                      |

### Kategória: právne checkboxy

| Kontrola                             | Zelený stav keď                         |
| ------------------------------------ | --------------------------------------- |
| Akceptácia obch. podmienok (pokladňa)| Checkbox aktívny a povinný               |
| Zásady ochrany os. údajov (pokladňa) | Checkbox aktívny a povinný               |
| Akceptácia obch. podmienok (registrácia)| Checkbox aktívny a povinný             |
| Marketingový súhlas                   | Checkbox aktívny (voliteľný)             |

### Kategória: smernica Omnibus

| Kontrola                             | Zelený stav keď                         |
| ------------------------------------ | --------------------------------------- |
| Modul Omnibus aktívny                | Modul zapnutý v nastaveniach             |
| História cien ukladaná              | Tabuľka histórie cien existuje a funguje |
| Najnižšia cena zobrazovaná          | Cena viditeľná na produktoch v akcii     |
| Obdobie 30 dní                       | Nastavené obdobie aspoň 30 dní          |

### Kategória: GPSR, DSA, KSeF, greenwashing

Panel obsahuje ďalšie kategórie pre GPSR, DSA, KSeF a greenwashing s príslušnými kontrolami stavu.

## Zhrnutie

V hornej časti panelu sa zobrazuje zhrnutie:

- **Celkový výsledok** - percento splnených požiadaviek (napr. 85%)
- **Progresová lišta** - vizuálna reprezentácia výsledku
- **Kritické požiadavky** - počet nesplnených požiadaviek FAIL
- **Varovania** - počet čiastočne splnených požiadaviek WARN
- **Dátum poslednej kontroly** - kedy bol panel naposledy obnovený

## Podrobnosti požiadavky

Kliknutie na požiadavku rozvinie sekciu s podrobnosťami:

- **Popis** - čo presne sa kontroluje
- **Právny základ** - odkaz na predpis
- **Stav** - podrobný popis stavu
- **Odporúčaná akcia** - čo je treba urobiť na splnenie požiadavky
- **Odkaz na nastavenia** - priamy odkaz na príslušnú stránku nastavení

## Export správy

Panel umožňuje export správy o súlade:

- **PDF** - správa na stiahnutie alebo tlač
- **JSON** - strojovo čitateľné údaje (napr. pre monitorovací systém)

```php
// Hook po vygenerovaní správy
add_action('polski/compliance/report_generated', function (array $results, string $format): void {
    // Logovanie dátumu generovania správy
    update_option('polski_last_compliance_report', current_time('mysql'));
}, 10, 2);
```

## Oznámenia

Panel môže zasielať e-mailové oznámenia administrátorovi:

- **Týždenná správa** - zhrnutie stavov zasielané raz týždenne
- **Kritický alert** - okamžité oznámenie keď sa stav zmení na FAIL

Konfigurácia oznámení: **WooCommerce > Polski > Panel súladu > Oznámenia**.

## Filter požiadaviek

Môžete pridať vlastné kontroly do panelu:

```php
add_filter('polski/compliance/checks', function (array $checks): array {
    $checks[] = [
        'id'       => 'custom_ssl',
        'category' => 'security',
        'label'    => 'Certifikát SSL',
        'callback' => function (): array {
            $is_ssl = is_ssl();
            return [
                'status'  => $is_ssl ? 'ok' : 'fail',
                'message' => $is_ssl ? 'SSL aktívny' : 'Chýba certifikát SSL',
            ];
        },
    ];
    return $checks;
});
```

## Riešenie problémov

**Panel zobrazuje zastarané údaje** - kliknite na tlačidlo **Obnoviť** v hornej časti panelu.

**Stav FAIL pre právnu stránku** - skontrolujte, či stránka je publikovaná (nie v koncepte) a či je priradená v **WooCommerce > Nastavenia > Rozšírené > Nastavenia stránky**.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
