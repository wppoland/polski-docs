---
title: Analýza zákazníkov (Customer Insights)
description: Dokumentácia modulu Customer Insights v Polski PRO for WooCommerce - RFM segmentácia, hodnota zákazníka CLV, analytický dashboard a odporúčania akcií.
---

Modul Customer Insights poskytuje pokročilú analýzu databázy zákazníkov s využitím RFM segmentácie (Recency, Frequency, Monetary). Dashboard prezentuje kľúčové metriky, segmenty zákazníkov a odporúčania marketingových akcií.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Ako to funguje

1. Plugin analyzuje históriu objednávok všetkých zákazníkov
2. Pre každého zákazníka vypočíta tri ukazovatele RFM:
   - **Recency (R)** - koľko dní uplynulo od poslednej objednávky
   - **Frequency (F)** - celkový počet objednávok
   - **Monetary (M)** - celková hodnota objednávok
3. Na základe ukazovateľov je zákazník priradený k jednému zo 7 segmentov
4. Výsledky sú uložené v transient cache na 1 hodinu

## Dashboard

Prejdite do **WooCommerce > Analýza zákazníkov**, aby ste otvorili dashboard.

### Súhrnné karty

V hornej časti dashboardu sa zobrazujú štyri metriky:

| Metrika | Popis |
|---------|------|
| Celkový počet zákazníkov | Všetci zákazníci s aspoň jednou objednávkou |
| Priemerné CLV | Priemerná hodnota zákazníka počas celého životného cyklu (Customer Lifetime Value) |
| Priemerný počet objednávok | Priemerný počet objednávok na zákazníka |
| Riziko odchodu | Podiel zákazníkov bez objednávky za posledných 30 dní |

### RFM segmenty

Modul klasifikuje zákazníkov do 7 segmentov:

| Segment | Charakteristika | Odporúčanie |
|---------|----------------|--------------|
| Champions | Vysoké R, F a M - nakupujú často, veľa a nedávno | Odmeňujte exkluzívnymi ponukami, ponúknite VIP program |
| Loyal | Vysoké F - nakupujú pravidelne | Predaj navyše (upselling), ponúknite predplatné |
| Potential Loyal | Stredné F, vysoké R - nedávno nakúpili niekoľkokrát | Povzbudzujte k ďalším nákupom, budujte lojalitu |
| New Customers | Vysoké R, nízke F - nový zákazník s 1-2 objednávkami | Privítajte, ponúknite zľavu na ďalšie nákupy |
| At Risk | Nízke R, vysoké F - kedysi nakupovali často, teraz prestali | Reaktivačná kampaň, opýtajte sa na dôvod |
| Hibernating | Nízke R, stredné F - dávno nenakupovali | Agresívna win-back ponuka, časovo obmedzené zľavy |
| Lost | Veľmi nízke R, nízke F - jednorazoví zákazníci spred dlhého času | Posledný pokus o kontakt alebo odstránenie z aktívnych kampaní |

### Tabuľka segmentov

Dashboard zobrazuje tabuľku, ktorá sumarizuje každý segment:

| Stĺpec | Popis |
|---------|------|
| Segment | Názov segmentu s farebným označením |
| Počet zákazníkov | Množstvo zákazníkov v segmente |
| Podiel % | Percentuálny podiel segmentu v celej databáze |
| Priemerný príjem | Priemerná hodnota objednávok zákazníkov v segmente |
| Priemerný počet objednávok | Priemerný počet objednávok na zákazníka v segmente |
| Odporúčanie | Navrhovaná marketingová akcia |

### Top zákazníci

Pod tabuľkou segmentov sa zobrazuje zoznam najhodnotnejších zákazníkov (Top Customers), zoradený zostupne podľa celkovej hodnoty objednávok. Tabuľka obsahuje:

- Meno a priezvisko zákazníka
- E-mailovú adresu
- RFM segment
- Počet objednávok
- Celkovú hodnotu objednávok
- Dátum poslednej objednávky

## Výkon

Modul využíva priame SQL dopyty namiesto WP_Query pre optimálny výkon pri veľkých databázach zákazníkov:

- Dopyty sa vykonávajú na tabuľkách objednávok WooCommerce
- Agregácia dát prebieha na úrovni databázy
- Výsledky sú uložené vo WordPress transient cache na 1 hodinu
- Kľúč transient: `polski_pro_customer_insights`
- Čas vypršania: 3600 sekúnd

## Zapnutie modulu

Modul je ovládaný prepínačom v nastaveniach modulov PRO:

```
WooCommerce > Nastavenia > Polski PRO > Moduly > Customer Insights
```

Po zapnutí modulu sa položka **Analýza zákazníkov** automaticky objaví v menu WooCommerce.

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Polski PRO for WooCommerce je komerčný softvér dodávaný bez záruky.</div>
