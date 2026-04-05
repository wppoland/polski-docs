---
title: Polski for WooCommerce
description: Kompleksowa wtyczka WordPress do dostosowania sklepu WooCommerce do polskich przepisów prawnych i wymagań rynkowych. Zgodność z Omnibus, GPSR, DSA, RODO i innymi regulacjami.
template: splash
hero:
  tagline: Kompletne rozwiązanie wspierające prowadzenie sklepu internetowego w Polsce. Wymogi prawne, lokalne funkcje, polskie standardy e-commerce - wszystko w jednej wtyczce.
  actions:
    - text: Zacznij konfigurację
      link: /pl/getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/wppoland/polski
      icon: external
      variant: minimal
---

![Polski for WooCommerce - baner wtyczki](../../../assets/screenshots/banner-772x250.png)

## Czym jest Polski for WooCommerce?

**Polski for WooCommerce** to darmowa wtyczka open source (GPLv2) od [wppoland.com](https://wppoland.com). Dostosowuje sklep WooCommerce do polskich przepisów i standardów e-commerce. Zawiera ponad 30 modułów: wymogi prawne, ceny, kasa, żywność, funkcje sklepowe i narzędzia dla deweloperów.

Aktualna wersja: **1.3.2**

### Wymagania systemowe

Przed instalacją upewnij się, że Twój serwer spełnia minimalne wymagania:

| Wymaganie | Minimalna wersja |
|-----------|-----------------|
| WordPress | 6.4 lub nowszy |
| WooCommerce | 8.0 lub nowszy |
| PHP | 8.1 lub nowszy |
| MySQL | 5.7 lub nowszy / MariaDB 10.3+ |

:::tip[Rekomendacja]
Dla najlepszej wydajności zalecamy PHP 8.2+ oraz WooCommerce 9.x. Wtyczka jest regularnie testowana z najnowszymi wersjami WordPress i WooCommerce.
:::

---

## Przegląd modułów

Wtyczka działa modułowo - włączasz tylko to, czego potrzebujesz. Poniżej znajdziesz opis wszystkich grup modułów.

![Dashboard modułów Polski for WooCommerce](../../../assets/screenshots/screenshot-1-modules-dashboard.png)

### Wymogi prawne

Moduły do spełnienia wymogów polskiego i unijnego prawa:

- **GPSR (bezpieczeństwo produktów)** - dane producenta, importera i osoby odpowiedzialnej na kartach produktów
- **Omnibus** - najniższa cena z 30 dni przed obniżką
- **Prawo do odstąpienia** - formularze zwrotów i dokumenty odstąpienia
- **RODO** - zgody, anonimizacja danych, rejestr przetwarzania
- **DSA (Akt o usługach cyfrowych)** - punkt kontaktowy, zgłaszanie treści
- **KSeF** - przygotowanie do Krajowego Systemu e-Faktur
- **Greenwashing** - kontrola deklaracji środowiskowych
- **Strony prawne** - regulamin, polityka prywatności i polityka zwrotów

### Ceny i informacje o produkcie

Moduły do wyświetlania cen i danych produktowych:

- **Ceny jednostkowe** - automatyczne przeliczanie i wyświetlanie cen za jednostkę miary (zł/kg, zł/l)
- **Wyświetlanie VAT** - informacja o stawce VAT i cenie netto/brutto
- **Czas dostawy** - szacowany czas realizacji zamówienia na karcie produktu
- **Dane producenta** - pole producenta, marka, numer katalogowy

### Kasa i zamówienia

Moduły do strony kasy i procesu zamówienia:

- **Przycisk zamówienia** - zmiana tekstu przycisku na "Zamawiam z obowiązkiem zapłaty" (wymóg prawny)
- **Checkboxy prawne** - konfigurowalne zgody na regulamin, politykę prywatności, newsletter
- **Wyszukiwanie NIP** - auto-uzupełnianie danych firmowych po numerze NIP (API GUS)
- **Podwójne potwierdzenie** - weryfikacja adresu e-mail (double opt-in)

### Produkty spożywcze

Specjalistyczne moduły dla sklepów z żywnością:

- **Przegląd produktów spożywczych** - dedykowane pola dla produktów spożywczych
- **Wartości odżywcze** - tabela wartości odżywczych zgodna z rozporządzeniem 1169/2011
- **Alergeny** - wyróżnione alergeny w opisie produktu (14 głównych alergenów)
- **Nutri-Score** - wyświetlanie oznaczenia Nutri-Score (A-E)

### Moduły sklepowe

Funkcje ułatwiające zakupy klientom:

- **Lista życzeń** - zapisywanie produktów na później
- **Porównywarka** - porównywanie produktów obok siebie
- **Szybki podgląd** - podgląd produktu bez opuszczania strony kategorii
- **Wyszukiwarka AJAX** - wyszukiwanie produktów w czasie rzeczywistym
- **Filtry AJAX** - dynamiczne filtrowanie produktów bez przeładowania strony
- **Slider produktów** - karuzele produktów z konfigurowalnymi ustawieniami
- **Odznaki produktów** - etykiety typu "Nowość", "Bestseller", "Ostatnie sztuki"
- **Inne moduły** - dodatkowe funkcje sklepowe

### Narzędzia

Moduły do zarządzania sklepem:

- **Dashboard zgodności** - przegląd stanu wymogów prawnych sklepu w jednym miejscu
- **Audyt strony** - automatyczna weryfikacja konfiguracji sklepu
- **Incydenty bezpieczeństwa** - rejestr i zarządzanie incydentami RODO
- **Zweryfikowane opinie** - system weryfikowanych opinii klientów

### Dla deweloperów

Narzędzia i API dla programistów:

- **REST API** - endpointy do zarządzania danymi wtyczki
- **Hooki (akcje i filtry)** - ponad 100 hooków do rozszerzania funkcjonalności
- **Shortcody** - gotowe shortcody do osadzania elementów w treści
- **Szablony** - nadpisywanie szablonów wtyczki w motywie
- **WP-CLI** - komendy CLI do zarządzania wtyczką z terminala
- **Import CSV** - masowy import danych produktowych
- **Bloki Gutenberg** - dedykowane bloki edytora
- **Schema.org** - automatyczne dane strukturalne dla produktów

---

## Szybki start

Trzy kroki do sklepu zgodnego z przepisami:

1. **[Zainstaluj wtyczkę](getting-started/installation/)** - z poziomu panelu WordPress lub ręcznie z pliku ZIP
2. **[Skonfiguruj podstawy](getting-started/configuration/)** - włącz potrzebne moduły w panelu ustawień
3. **[Przejdź przez kreator](getting-started/wizard/)** - uzupełnij dane firmy, wygeneruj strony prawne, skonfiguruj checkboxy

:::note[Potrzebujesz pomocy?]
Jeśli napotkasz problem, zgłoś go na [GitHub Issues](https://github.com/wppoland/polski/issues). Masz pytanie lub sugestię? Napisz na [GitHub Discussions](https://github.com/wppoland/polski/discussions).
:::

---

## Dlaczego warto?

- **Wszystko w jednym** - zamiast 10 wtyczek, jedna spójna platforma
- **Modułowa budowa** - włączasz tylko to, czego potrzebujesz
- **Wymogi prawne** - aktualizowane wraz ze zmianami przepisów
- **Open source** - kod źródłowy na GitHubie, licencja GPLv2
- **Bez subskrypcji** - wszystkie funkcje dostępne bezpłatnie
- **Wydajność** - zasoby ładowane tylko dla aktywnych modułów
- **Aktywna społeczność** - wsparcie na GitHub Discussions

---

## Kompatybilność

Wtyczka jest testowana z popularnymi motywami i wtyczkami WordPress:

- Motywy: Storefront, Astra, GeneratePress, Kadence, Flavor, flavor theme
- Page buildery: Gutenberg (bloki), Elementor, Beaver Builder
- Wtyczki płatności: Przelewy24, PayU, BLIK, tpay
- Wtyczki wysyłkowe: InPost, DPD, DHL, Poczta Polska, Orlen Paczka

---

## Wsparcie i społeczność

- [GitHub Issues](https://github.com/wppoland/polski/issues) - zgłaszanie błędów i propozycji funkcji
- [GitHub Discussions](https://github.com/wppoland/polski/discussions) - pytania, dyskusje, pomoc społeczności
- [wppoland.com](https://wppoland.com) - strona projektu i blog z poradnikami

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
