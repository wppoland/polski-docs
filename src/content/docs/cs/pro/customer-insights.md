---
title: Analýza zákazníků (Customer Insights)
description: Dokumentace modulu Customer Insights v Polski PRO for WooCommerce - segmentace RFM, hodnota zákazníka CLV, analytický dashboard a doporučení akcí.
---

Modul Customer Insights poskytuje pokročilou analýzu zákaznické báze s využitím segmentace RFM (Recency, Frequency, Monetary). Dashboard zobrazuje klíčové metriky, segmenty zákazníků a doporučení marketingových akcí.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Jak to funguje

1. Plugin analyzuje historii objednávek všech zákazníků
2. Pro každého zákazníka vypočítá tři ukazatele RFM:
   - **Recency (R)** - kolik dní uplynulo od poslední objednávky
   - **Frequency (F)** - celkový počet objednávek
   - **Monetary (M)** - celková hodnota objednávek
3. Na základě ukazatelů je zákazník přiřazen do jednoho ze 7 segmentů
4. Výsledky jsou kešovány v transient na 1 hodinu

## Dashboard

Přejděte do **WooCommerce > Analýza zákazníků** a otevřete dashboard.

### Karty souhrnu

V horní části dashboardu se zobrazují čtyři metriky:

| Metrika | Popis |
|---------|------|
| Celkový počet zákazníků | Všichni zákazníci s alespoň jednou objednávkou |
| Průměrné CLV | Průměrná hodnota zákazníka za celý životní cyklus (Customer Lifetime Value) |
| Průměrný počet objednávek | Průměrný počet objednávek na zákazníka |
| Riziko odchodu | Podíl zákazníků bez objednávky za posledních 30 dní |

### Segmenty RFM

Modul klasifikuje zákazníky do 7 segmentů:

| Segment | Charakteristika | Doporučení |
|---------|----------------|--------------|
| Champions | Vysoké R, F i M - nakupují často, hodně a nedávno | Odměňujte exkluzivními nabídkami, navrhněte VIP program |
| Loyal | Vysoké F - nakupují pravidelně | Doplňkový prodej (upselling), navrhněte předplatné |
| Potential Loyal | Střední F, vysoké R - nakoupili nedávno několikrát | Povzbuzujte k dalším nákupům, budujte loajalitu |
| New Customers | Vysoké R, nízké F - čerstvý zákazník s 1-2 objednávkami | Přivítejte, nabídněte slevu na další nákupy |
| At Risk | Nízké R, vysoké F - dříve nakupovali často, teď přestali | Reaktivační kampaň, zeptejte se na důvod |
| Hibernating | Nízké R, střední F - dlouho nenakoupili | Agresivní win-back nabídka, časově omezené slevy |
| Lost | Velmi nízké R, nízké F - jednorázoví zákazníci z dávné minulosti | Poslední pokus o kontakt nebo odstraňte z aktivních kampaní |

### Tabulka segmentů

Dashboard zobrazuje tabulku shrnující každý segment:

| Sloupec | Popis |
|---------|------|
| Segment | Název segmentu s barevným označením |
| Počet zákazníků | Počet zákazníků v segmentu |
| Podíl % | Procentuální podíl segmentu na celé bázi |
| Průměrný příjem | Průměrná hodnota objednávek zákazníků v segmentu |
| Průměrný počet objednávek | Průměrný počet objednávek na zákazníka v segmentu |
| Doporučení | Navrhovaná marketingová akce |

### Top zákazníci

Pod tabulkou segmentů se zobrazuje seznam nejcennějších zákazníků (Top Customers), seřazený sestupně podle celkové hodnoty objednávek. Tabulka obsahuje:

- Jméno a příjmení zákazníka
- E-mailovou adresu
- Segment RFM
- Počet objednávek
- Celkovou hodnotu objednávek
- Datum poslední objednávky

## Výkon

Modul využívá přímé SQL dotazy namísto WP_Query pro optimální výkon u velkých zákaznických bází:

- Dotazy jsou prováděny na tabulkách objednávek WooCommerce
- Agregace dat probíhá na úrovni databáze
- Výsledky jsou kešovány ve WordPress transient na 1 hodinu
- Klíč transient: `polski_pro_customer_insights`
- Doba vypršení: 3600 sekund

## Zapnutí modulu

Modul je řízen přepínačem v nastavení modulů PRO:

```
WooCommerce > Nastavení > Polski PRO > Moduly > Customer Insights
```

Po zapnutí modulu se položka **Analýza zákazníků** objeví automaticky v menu WooCommerce.

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Polski PRO for WooCommerce je komerční software dodávaný bez záruky.</div>
