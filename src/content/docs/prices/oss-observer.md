---
title: Obserwator OSS
description: Monitorowanie unijnego progu sprzedaży VAT OSS (10 000 EUR) w WooCommerce dzięki integracji z wtyczką One Stop Shop.
---

Moduł "Obserwator OSS" integruje sklep z samodzielną wtyczką **One Stop Shop for WooCommerce** i pomaga w monitorowaniu progu sprzedaży VAT OSS (procedura One Stop Shop). Gdy roczna sprzedaż B2C do innych krajów UE zbliża się do 10 000 EUR, sklep powinien przystąpić do procedury OSS i od tego momentu rozliczać VAT według stawki kraju kupującego.

## Dla kogo

Jeśli prowadzisz sklep internetowy w Polsce i wysyłasz towary lub świadczysz usługi elektroniczne konsumentom (B2C) w innych krajach UE - dotyczy Cię próg 10 000 EUR. Moduł przyda się każdemu sklepowi wysyłającemu produkty za granicę w ramach Unii Europejskiej.

## Jak to działa

1. Włącz moduł **Obserwator OSS** w panelu `Polski > Moduły` (sekcja "Tax & Pricing").
2. Kliknij ikonę ołówka, aby otworzyć ustawienia modułu.
3. Jeśli wtyczka "One Stop Shop for WooCommerce" nie jest zainstalowana, użyj przycisku **Zainstaluj One Stop Shop**. Wtyczka zostanie pobrana z repozytorium WordPress.org, zainstalowana i aktywowana automatycznie.
4. Po instalacji przejdź do **WooCommerce > Ustawienia > Podatek > OSS**, aby skonfigurować obserwatora progu, procedurę OSS oraz raporty podatkowe.

Dopóki wtyczka OSS nie jest zainstalowana, moduł wyświetla CTA instalacyjne. Po aktywacji pokazywany jest status procedury OSS oraz automatycznego monitorowania progu.

## Powiadomienie w panelu

Jeśli moduł jest włączony, ale zewnętrzna wtyczka OSS nie jest obecna, sklep wyświetla powiadomienie WooCommerce "OSS plugin is missing" z jednoklikowym przyciskiem instalacji. Dzięki temu nie zapomnisz o dokończeniu konfiguracji.

## Integracja z polski-pro

Wtyczka polski-pro udostępnia pomocnik `Polski\Pro\TaxRules\OssHelper::isEnabled()`, który zwraca bieżący stan procedury OSS. Programiści mogą z niego korzystać, aby rozgałęzić logikę faktur, reguł podatkowych lub kalkulacji wysyłki w zależności od tego, czy sklep korzysta z procedury OSS.

Stan jest również filtrowalny w polski przez filtr `polski_tax_oss_enabled`, co umożliwia zewnętrznym wtyczkom obserwowanie lub nadpisanie sygnału.

## Dlaczego osobna wtyczka?

Logika raportowania OSS i obserwacji progu jest utrzymywana w samodzielnej wtyczce "One Stop Shop for WooCommerce" (bezpłatna, dostępna w repozytorium WordPress.org). Polski for WooCommerce działa jako cienki adapter - dodaje widoczny przełącznik w panelu modułów, ułatwia instalację i pozwala innym modułom sklepu (fakturom, regułom podatkowym) reagować na włączenie procedury OSS. Dzięki temu nie duplikujemy funkcji utrzymywanej przez inny zespół i zawsze masz najnowsze zmiany w obsłudze procedury OSS.
