---
title: Panel zhody (compliance dashboard)
description: Panel kontroly pravnych poziadaviek v Polski for WooCommerce - kontrolny zoznam s farebnym statusom pre kazdu poziadavku.
---

Panel zhody je centralne miesto na kontrolu pravnych poziadaviek obchodu. Zobrazuje kontrolny zoznam so statusom kazdej poziadavky - od obchodnych podmienok az po GPSR a DSA.

## Pristup k panelu

Prejdite do **WooCommerce > Polski > Panel zhody**. Vyzaduje opravnenie `manage_woocommerce` (Administrator alebo Spravca obchodu).

## Kontrolny zoznam (checklist)

Pravne poziadavky su zoskupene do kategorii. Kazda ma vizualny status:

### Statusy

| Status | Farba    | Ikona | Popis                                     |
| ------ | -------- | ----- | ----------------------------------------- |
| OK     | Zelena   | ✓     | Poziadavka splnena                        |
| WARN   | Zlta     | !     | Ciastocne splnena, vyzaduje pozornost     |
| FAIL   | Cervena  | ✗     | Nesplnena, vyzaduje okamzitu akciu        |
| OFF    | Siva     | -     | Modul vypnuty                             |

### Kategoria: pravne stranky

| Kontrola                             | Status zeleny ak                        |
| ------------------------------------ | --------------------------------------- |
| Obchodne podmienky                   | Stranka publikovana a priradena         |
| Zasady ochrany sukromia              | Stranka publikovana a priradena         |
| Informacia o odstupeni od zmluvy     | Stranka publikovana s formularom        |
| Zasady cookies                       | Stranka publikovana                     |
| Informacia o dodani a platbach       | Stranka publikovana                     |

### Kategoria: pravne checkboxy

| Kontrola                             | Status zeleny ak                        |
| ------------------------------------ | --------------------------------------- |
| Akceptacia podmienok (pokladna)      | Checkbox aktivny a povinny              |
| Zasady ochrany sukromia (pokladna)   | Checkbox aktivny a povinny              |
| Akceptacia podmienok (registracia)   | Checkbox aktivny a povinny              |
| Marketingovy suhlas                  | Checkbox aktivny (volitelny)            |

### Kategoria: smernica Omnibus

| Kontrola                             | Status zeleny ak                        |
| ------------------------------------ | --------------------------------------- |
| Modul Omnibus aktivny                | Modul zapnuty v nastaveniach            |
| Historia cien sa zaznamenava         | Tabulka historie cien existuje a funguje |
| Najnizsia cena sa zobrazuje          | Cena viditelna na produktoch v akcii    |
| Obdobie 30 dni                       | Nastavene obdobie aspon 30 dni          |

### Kategoria: GPSR

| Kontrola                             | Status zeleny ak                        |
| ------------------------------------ | --------------------------------------- |
| Modul GPSR aktivny                   | Modul zapnuty                           |
| Udaje vyrobcu doplnene               | Aspon 80 % produktov ma udaje GPSR      |
| Udaje zastupcu                       | Doplnene pre produkty mimo EU           |
| Informacie o bezpecnosti             | Doplnene pre produkty, ktore to vyzaduju |

### Kategoria: DSA (Digital Services Act)

| Kontrola                             | Status zeleny ak                        |
| ------------------------------------ | --------------------------------------- |
| Formular nahlaseni DSA               | Formular dostupny na stranke            |
| Kontaktny bod DSA                    | Kontaktny email nastaveny               |
| Register nahlaseni                   | Tabulka nahlaseni existuje              |

### Kategoria: pokladna

| Kontrola                             | Status zeleny ak                        |
| ------------------------------------ | --------------------------------------- |
| Popisok tlacidla objednavky          | Text v sulade so smernicou EU           |
| Zhrnutie objednavky                  | Viditelne pred tlacidlom platby         |
| Informacia o DPH a doruceni          | Zobrazena pri cenach produktov          |

### Kategoria: KSeF

| Kontrola                             | Status zeleny ak                        |
| ------------------------------------ | --------------------------------------- |
| Modul KSeF aktivny                   | Modul zapnuty                           |
| NIP firmy nastaveny                  | NIP nakonfigurovany v nastaveniach      |
| Spojenie s KSeF                      | Test spojenia uspesne ukonceny          |

### Kategoria: greenwashing

| Kontrola                             | Status zeleny ak                        |
| ------------------------------------ | --------------------------------------- |
| Modul anti-greenwashing aktivny      | Modul zapnuty                           |
| Vyhlasenia s dokazmi                 | Vsetky vyhlasenia maju odovodnenie      |
| Certifikaty s odkazmi                | Certifikaty maju cisla a URL adresy     |

## Zhrnutie

V hornej casti panela je viditelne zhrnutie:

- **Celkovy vysledok** - percento splnenych poziadaviek (napr. 85 %)
- **Lista priebehu** - vizualna reprezentacia vysledku
- **Kriticke poziadavky** - pocet nesplnenych poziadaviek FAIL
- **Upozornenia** - pocet ciastocne splnenych poziadaviek WARN
- **Datum poslednej kontroly** - kedy bol panel naposledy obnoveny

## Detaily poziadavky

Kliknite na poziadavku, aby ste videli detaily:

- **Popis** - co presne sa kontroluje
- **Pravny zaklad** - odkaz na predpis
- **Status** - podrobny popis stavu
- **Odporucana akcia** - co treba urobit na splnenie poziadavky
- **Odkaz na nastavenia** - priamy odkaz na prislusnu stranku nastaveni

## Obnovovanie statusov

Panel kontroluje statusy naopak pri kazdom otvoreni. Kontroly zahrnaju:

- Existenciu a status stranok (publikovana / koncept / odstranena)
- Existenciu a konfiguraciu checkboxov
- Spravnost udajov v meta produktov (sampling - nahodna vzorka 100 produktov)
- Fungovanie modulov (aktivita, spravnost konfiguracie)
- Testy spojeni s externymi API (KSeF)

## Export reportu

Exportujte report zhody:

- **PDF** - report na stiahnutie alebo tlac
- **JSON** - strojovo citatelne udaje (napr. pre monitorovaci system)

```php
// Hook po vygenerovani reportu
add_action('polski/compliance/report_generated', function (array $results, string $format): void {
    // Logovanie datumu generovania reportu
    update_option('polski_last_compliance_report', current_time('mysql'));
}, 10, 2);
```

## Notifikacie

Panel posiela emailove notifikacie administratorovi:

- **Tyzdenny report** - zhrnutie statusov posielane raz tyzdenne
- **Kriticky alert** - okamzita notifikacia, ked sa status zmeni na FAIL

Konfiguracia notifikacii: **WooCommerce > Polski > Panel zhody > Notifikacie**.

```php
// Zmena frekvencie reportu
add_filter('polski/compliance/report_frequency', function (): string {
    return 'daily'; // 'daily', 'weekly', 'monthly'
});
```

## Filter poziadaviek

Mozete pridat vlastne kontroly do panela:

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
                'message' => $is_ssl ? 'SSL aktivny' : 'Chyba certifikat SSL',
            ];
        },
    ];
    return $checks;
});
```

## Riesenie problemov

**Panel zobrazuje zastarane udaje** - kliknite na **Obnovit** v hornej casti panela. Niektore udaje (napr. GPSR sampling) mozu byt cachovane.

**Status FAIL pre pravnu stranku** - skontrolujte, ci je stranka publikovana (nie koncept) a priradena v **WooCommerce > Nastavenia > Pokrocile > Nastavenia stranok**.

Nahlasovanie problemov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stranka ma vylucne informacny charakter a nepredstavuje pravne poradenstvo. Pred nasadenim sa poradte s pravnikom. Polski for WooCommerce je open source softver (GPLv2) poskytovany bez zaruky.</div>
