---
title: Ochrana před greenwashingem
description: Produktová pole proti greenwashingu v Polski for WooCommerce - základ environmentálního prohlášení, certifikát a datum platnosti podle Směrnice 2024/825.
---

Směrnice EU 2024/825 zakazuje neopodstatněná environmentální prohlášení. Od 27. září 2026 nesmíte používat obecná ekologická tvrzení (např. "eko", "zelený") bez konkrétního odůvodnění a certifikátu. Plugin přidává produktová pole pro dokumentování environmentálních prohlášení.

## Co je greenwashing

Greenwashing je uvádění zákazníků v omyl ohledně ekologických vlastností produktu. Příklady zakázaných praktik:

- Používání obecných prohlášení ("eko", "bio", "zelený") bez certifikace
- Tvrzení o klimatické neutralitě založená výhradně na kompenzaci emisí
- Naznačování environmentálních výhod bez vědeckých důkazů
- Zobrazování neoficiálních ekologických značek
- Tvrzení o trvanlivosti produktu bez odůvodnění

## Produktová pole

V editaci produktu, záložka **Polski - Životní prostředí**, najdete tři pole pro dokumentování environmentálních prohlášení.

### Základ prohlášení

Pole pro popis vědeckého nebo technického základu environmentálního prohlášení.

**Co vyplnit:**

- Konkrétní environmentální aspekt, kterého se prohlášení týká (např. "Produkt vyroben z 80 % recyklovaných materiálů")
- Metodologie výzkumu nebo analýzy (např. "Analýza životního cyklu produktu (LCA) v souladu s ISO 14040")
- Výsledky měření nebo výzkumu (např. "Uhlíková stopa 2,3 kg CO2e na jednotku - zpráva firmy XYZ ze dne 2025-01-15")
- Srovnání s referenčním produktem (pokud je prohlášení srovnávací)

**Příklad správného zápisu:**

```
Deklaracja: "Opakowanie w 100% z materiałów z recyklingu"
Podstawa: Surowiec pochodzi w całości z recyklingu PET post-konsumenckiego.
Dostawca surowca: RecyPET Sp. z o.o., certyfikat EuCertPlast nr 2025/0123.
Proces produkcji potwierdzony audytem wewnętrznym z dnia 2025-03-01.
```

### Certifikát

Pole pro informace o certifikátu potvrzujícím environmentální prohlášení.

**Akceptované certifikáty:**

- Certifikáty v souladu s Nařízením (ES) č. 66/2010 (EU Ecolabel)
- Národní certifikáty uznané Evropskou komisí
- Oborové certifikáty vydané akreditovanými certifikačními orgány
- Certifikáty FSC, PEFC (pro dřevěné/papírové výrobky)
- Certifikáty GOTS, OEKO-TEX (pro textil)
- Certifikáty EuCertPlast, RecyClass (pro plasty)

**Co vyplnit:**

- Název certifikátu
- Číslo certifikátu
- Certifikační orgán
- Odkaz na ověření (pokud je k dispozici)

**Příklad:**

```
EU Ecolabel - numer licencji PL/032/005
Jednostka certyfikująca: PCBC S.A.
Weryfikacja: https://environment.ec.europa.eu/ecolabel_en
```

### Datum platnosti

Datum, do kdy je certifikát nebo prohlášení platné.

Po uplynutí data platnosti:

- Environmentální prohlášení je automaticky skryto na stránce produktu
- Administrátor obdrží e-mailové oznámení o vypršelém certifikátu
- Produkt je na seznamu produktů označen varovnou ikonou

To chrání před situací, kdy je vypršelý certifikát stále viditelný pro zákazníky.

## Zobrazení na stránce produktu

Po vyplnění polí plugin zobrazí sekci "Environmentální informace" na stránce produktu s údaji:

- Obsah environmentálního prohlášení
- Název a číslo certifikátu
- Datum platnosti certifikátu
- Ikonu certifikátu (pokud je rozpoznán, např. EU Ecolabel)

Sekce se zobrazuje v záložce "Doplňkové informace" nebo jako samostatná záložka (nastavitelné v konfiguraci).

## Konfigurace

Nastavení modulu: **WooCommerce > Nastavení > Polski > Životní prostředí**.

| Možnost | Popis | Výchozí hodnota |
|-------|------|------------------|
| Zapnout modul | Aktivuje environmentální pole | Ne |
| Pozice zobrazení | Kde zobrazit informace na stránce produktu | Záložka "Doplňkové informace" |
| Oznámení o vypršení | Kolik dnů před vypršením odeslat oznámení | 30 |
| Automatické skrytí | Skrýt prohlášení po vypršení certifikátu | Ano |

## Hromadná správa

### CSV export

Environmentální data jsou v exportu produktů WooCommerce. Doplňkové sloupce:

- `env_claim_basis` - základ prohlášení
- `env_certificate` - certifikát
- `env_expiry_date` - datum platnosti (formát YYYY-MM-DD)

### CSV import

Připravte soubor CSV s příslušnými hlavičkami a importujte standardní cestou WooCommerce.

### Filtrování produktů

Na seznamu produktů můžete filtrovat podle stavu prohlášení:

- Všechny produkty s prohlášením
- Produkty s vypršelým certifikátem
- Produkty s certifikátem vypršujícím do 30 dnů
- Produkty bez certifikátu (ale s prohlášením)

## Dobré postupy

1. **Buďte konkrétní** - místo "eko obal" napište "obal vyrobený ze 100 % recyklovaného kartonu, certifikát FSC č. XXXX"
2. **Uvádějte zdroje** - odkazujte na konkrétní výzkumy, zprávy, certifikáty
3. **Aktualizujte data** - nastavte oznámení o vypršení certifikátů a obnovujte je včas
4. **Vyhýbejte se obecnostem** - směrnice zakazuje tvrzení, která nelze ověřit
5. **Srovnání musí být férová** - srovnávejte stejné kategorie produktů, používejte stejnou metodologii

## Řešení problémů

**Environmentální pole se nezobrazují v editaci produktu**
Zapněte modul v **WooCommerce > Nastavení > Polski > Moduly** a ujistěte se, že je možnost "Zapnout modul" zaškrtnuta v environmentálních nastaveních.

**Prohlášení zmizelo ze stránky produktu**
Zkontrolujte datum platnosti certifikátu. Po vypršení je prohlášení automaticky skryto. Obnovte certifikát a aktualizujte datum.

**Nedostávám oznámení o vypršujících certifikátech**
Zkontrolujte, zda WP-Cron funguje. Oznámení jsou odesílána prostřednictvím úlohy cron. Na serverech s vypnutým WP-Cron nakonfigurujte systémový cron.

## Další kroky

- Nahlašujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a dotazy: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
