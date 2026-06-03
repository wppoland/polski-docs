---
title: Právní stránky
description: Automatické generování právních stránek v Polski for WooCommerce - obchodní podmínky, zásady ochrany osobních údajů, zásady vrácení, reklamace, přílohy e-mailů a informace ODR.
---

Každý internetový obchod v Polsku musí mít právní dokumenty. Plugin generuje čtyři právní stránky, přikládá je k e-mailům a zobrazuje informaci o platformě ODR.

## Generované právní stránky

### 1. Obchodní podmínky

Obchodní podmínky obsahují prvky vyžadované zákonem o právech spotřebitele:

- Identifikační údaje prodejce (název, adresa, NIP, REGON, KRS)
- Postup zadávání objednávek
- Způsoby platby
- Náklady a způsoby doručení
- Právo na odstoupení od smlouvy (14 dnů)
- Postup reklamace
- Mimosoudní způsoby řešení reklamací a uplatňování nároků
- Závěrečná ustanovení

### 2. Zásady ochrany osobních údajů

Zásady ochrany osobních údajů v souladu s GDPR obsahují:

- Údaje správce osobních údajů
- Účely a právní základy zpracování dat
- Kategorie zpracovávaných dat
- Příjemci dat (kurýrní služby, platební brány, hosting)
- Doba uchovávání dat
- Práva subjektů údajů
- Informace o cookies
- Informace o profilování (pokud se týká)

### 3. Zásady vrácení

Zásady vrácení zahrnují:

- Lhůta pro odstoupení od smlouvy (14 dnů)
- Vzor formuláře odstoupení
- Postup vrácení zboží
- Náklady na vrácení (kdo je hradí)
- Lhůta pro vrácení platby
- Výjimky z práva na odstoupení
- Stav vraceného zboží

### 4. Reklamační řád

Reklamační řád obsahuje:

- Právní základ (odpovědnost za vady, záruka)
- Způsoby podání reklamace
- Lhůta pro vyřízení reklamace (14 dnů)
- Práva spotřebitele (oprava, výměna, snížení ceny, odstoupení)
- Formulář reklamace
- Kontaktní údaje pro podání reklamací

## Konfigurace generátoru

Přejděte do **WooCommerce > Nastavení > Polski > Právní stránky** pro generování nebo aktualizaci stránek.

### Údaje prodejce

Nejprve vyplňte údaje firmy:

| Pole | Popis | Příklad |
|------|------|---------|
| Název firmy | Úplný název nebo firma | Sklep XYZ Jan Kowalski |
| Adresa | Ulice, číslo | ul. Przykładowa 1/2 |
| PSČ a město | - | 00-001 Warszawa |
| NIP | Daňové identifikační číslo | 1234567890 |
| REGON | - | 123456789 |
| KRS | Pokud se týká | 0000123456 |
| Kontaktní e-mail | - | kontakt@sklep.pl |
| Telefon | - | +48 123 456 789 |
| Číslo bankovního účtu | Pro vrácení | PL 12 3456 7890 1234 5678 9012 3456 |

### Generování stránek

1. Vyplňte údaje prodejce
2. Klikněte na "Generovat právní stránky"
3. Systém vytvoří 4 stránky WordPress ve stavu "Koncept"
4. Projděte obsah každé stránky
5. Publikujte stránky po ověření

Stránky jsou vytvářeny jako koncepty, projděte je a konzultujte s právníkem před publikací.

### Aktualizace stránek

Po změně údajů firmy klikněte na "Aktualizovat právní stránky". Plugin aktualizuje vygenerované sekce a zachová vaše ruční změny.

Struktura generované stránky:

```
<!-- POLSKI-AUTO-START -->
Automatycznie wygenerowana treść - nie edytuj tego bloku
<!-- POLSKI-AUTO-END -->

Twoja dodatkowa treść - bezpiecznie edytuj poniżej
```

Při aktualizaci plugin přepisuje pouze obsah mezi `POLSKI-AUTO-START` a `POLSKI-AUTO-END`. Obsah mimo tyto značky je zachován.

## Přílohy e-mailů

Plugin přikládá právní stránky jako PDF k transakčním e-mailům WooCommerce.

### Konfigurace

V **WooCommerce > Nastavení > Polski > Právní stránky > Přílohy e-mailů** nakonfigurujte, které dokumenty přikládat k jednotlivým typům e-mailů:

| E-mail | Doporučené přílohy |
|--------|---------------------|
| Nová objednávka (zákazník) | Obchodní podmínky, Zásady ochrany osobních údajů, Zásady vrácení |
| Objednávka vyřízena | Zásady vrácení |
| Faktura | Obchodní podmínky |
| Dobropis | Zásady vrácení, Reklamační řád |

### Formát příloh

Dokumenty se konvertují do PDF s logem obchodu a datem. Velikost souboru je optimalizována.

| Možnost | Popis | Výchozí hodnota |
|-------|------|------------------|
| Formát | Typ přílohy | PDF |
| Logo v hlavičce | Zda přiložit logo obchodu | Ano |
| Velikost papíru | - | A4 |
| Okraj | Okraj dokumentu | 20mm |

## Informace ODR

Nařízení EU 524/2013 vyžaduje od internetových obchodů odkaz na platformu ODR (Online Dispute Resolution) pro mimosoudní řešení sporů.

### Automatické zobrazení

Plugin automaticky přidává informaci ODR v:

- **Patičce obchodu** - odkaz na platformu ODR
- **Obchodních podmínkách** - sekce o mimosoudním řešení sporů
- **Transakčních e-mailech** - patička s odkazem ODR

### Obsah informace ODR

Standardní obsah zobrazovaný pluginem:

> Platforma ODR (Online Dispute Resolution) dostępna jest pod adresem: https://ec.europa.eu/consumers/odr/. Platforma służy rozstrzyganiu sporów pomiędzy konsumentami i przedsiębiorcami na szczeblu unijnym.

### Konfigurace ODR

| Možnost | Popis | Výchozí hodnota |
|-------|------|------------------|
| Zobrazit v patičce | Přidat informaci ODR do patičky obchodu | Ano |
| Zobrazit v e-mailech | Přidat informaci ODR do transakčních e-mailů | Ano |
| Text ODR | Konfigurovatelný text informace | Výchozí obsah |
| Pozice v patičce | Místo zobrazení | Před informací o autorských právech |

## Verzování dokumentů

Plugin zaznamenává verze právních stránek:

- Každá změna obsahu vytvoří novou verzi
- Datum poslední aktualizace je zobrazeno na stránce
- Logy souhlasů GDPR obsahují hash verze dokumentu z okamžiku udělení souhlasu
- Historie verzí je dostupná v **Revizích** stránky WordPress

## Vícejazyčnost

Stránky se generují v polštině. Při WPML nebo Polylang plugin vytváří samostatné stránky pro každý jazyk. Připravené překlady:

- Polština (výchozí)
- Angličtina
- Němčina

Pro ostatní jazyky se vytvoří polská verze k ručnímu překladu.

## Řešení problémů

**Stránky se negenerují**
Zkontrolujte, zda jste vyplnili všechna povinná pole: název firmy, adresu, NIP a e-mail.

**Přílohy PDF nejsou přikládány k e-mailům**
Zkontrolujte, zda má server rozšíření PHP `mbstring` a `dom`. Zkontrolujte logy PHP na chyby.

**Informace ODR se nezobrazuje v patičce**
Zkontrolujte, zda motiv podporuje hooky patičky (`wp_footer` nebo `woocommerce_after_footer`). Některé motivy vyžadují ruční přidání widgetu.

**Aktualizace přepsala moje změny**
Editujte obsah pouze mimo značky `POLSKI-AUTO-START` / `POLSKI-AUTO-END`. Obsah mezi těmito značkami je přepsán při každé aktualizaci.

## Další kroky

- Nahlašujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a dotazy: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
