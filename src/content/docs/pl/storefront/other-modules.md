---
title: Pozostałe moduły sklepowe
description: Dodatkowe moduły w Polski for WooCommerce - menedżer zakładek, wyróżnione wideo, zoom galerii, lista oczekujących, nieskończone przewijanie, popup.
---

Polski for WooCommerce oferuje szereg dodatkowych modułów usprawniających działanie sklepu. Każdy moduł można włączyć niezależnie w **WooCommerce > Polski > Moduły sklepowe**.

## Menedżer zakładek (tab manager)

Menedżer zakładek pozwala kontrolować zakładki wyświetlane na stronie produktu (Opis, Informacje dodatkowe, Opinie itp.).

### Możliwości

- **Zmiana kolejności** - przeciągnij i upuść zakładki w żądanej kolejności
- **Ukrywanie zakładek** - ukryj wybraną zakładkę bez usuwania treści
- **Zmiana nazw** - nadaj zakładkom własne nazwy (np. "Szczegóły" zamiast "Opis")
- **Dodawanie zakładek** - twórz niestandardowe zakładki z własną treścią
- **Zakładki globalne** - zakładki widoczne na wszystkich produktach
- **Zakładki per produkt** - zakładki widoczne tylko na wybranym produkcie
- **Zakładki per kategoria** - zakładki widoczne na produktach z danej kategorii

### Dodanie niestandardowej zakładki

W ustawieniach menedżera zakładek kliknij **Dodaj zakładkę** i wypełnij:

- **Nazwa** - tytuł zakładki
- **Treść** - obsługuje edytor WYSIWYG, shortcody i HTML
- **Priorytet** - pozycja zakładki (niższy = bardziej na lewo)
- **Widoczność** - globalna, wybrana kategoria lub wybrany produkt

Programowo:

```php
add_filter('woocommerce_product_tabs', function (array $tabs): array {
    $tabs['custom_tab'] = [
        'title'    => 'Gwarancja',
        'priority' => 25,
        'callback' => function (): void {
            echo '<p>Produkt objęty 24-miesięczną gwarancją producenta.</p>';
        },
    ];
    return $tabs;
});
```

## Wyróżnione wideo (featured video)

Moduł pozwala zastąpić lub uzupełnić główne zdjęcie produktu filmem wideo.

### Obsługiwane źródła

- **YouTube** - wklej URL filmu
- **Vimeo** - wklej URL filmu
- **Własne wideo** - prześlij plik MP4 do biblioteki mediów
- **Zewnętrzny URL** - link do pliku MP4/WebM

### Konfiguracja

W edytorze produktu w sekcji **Zdjęcie produktu** pojawia się dodatkowe pole **Wideo produktu**. Wklej URL filmu lub wybierz z biblioteki mediów.

Opcje wyświetlania:

| Opcja            | Opis                                  | Domyślnie |
| ---------------- | ------------------------------------- | --------- |
| Pozycja          | Pierwsze w galerii / ostatnie         | Pierwsze  |
| Autoplay         | Automatyczne odtwarzanie              | Nie       |
| Wyciszenie       | Domyślnie wyciszone                   | Tak       |
| Pętla            | Odtwarzanie w pętli                   | Nie       |
| Proporcje        | 16:9 / 4:3 / 1:1                     | 16:9      |
| Ikona play       | Ikona play na miniaturce              | Tak       |

### Lazy loading

Filmy YouTube i Vimeo ładowane są leniwie - iframe z odtwarzaczem wstawiany jest dopiero po kliknięciu miniaturki z ikoną play. Dzięki temu strona produktu nie jest spowalniana przez zewnętrzne skrypty odtwarzacza.

## Zoom galerii (gallery zoom)

Moduł dodaje powiększanie zdjęć produktu po najechaniu kursorem lub kliknięciu.

### Tryby zoom

- **Hover** - powiększenie wyświetlane wewnątrz zdjęcia po najechaniu kursorem
- **Lens** - lupka podążająca za kursorem
- **Lightbox** - pełnoekranowy podgląd po kliknięciu

### Konfiguracja

```php
// Zmiana typu zoomu
add_filter('polski/gallery_zoom/type', function (): string {
    return 'lens'; // 'hover', 'lens', 'lightbox'
});

// Zmiana skali powiększenia
add_filter('polski/gallery_zoom/scale', function (): float {
    return 2.5; // domyślnie 2.0
});
```

Wymagania dotyczące zdjęć: aby zoom wyglądał dobrze, zdjęcia produktów powinny mieć rozdzielczość co najmniej 1200x1200 px. Przy niższej rozdzielczości powiększony obraz będzie rozmyty.

## Lista oczekujących (waitlist)

Moduł pozwala klientom zapisać się na powiadomienie e-mail o dostępności produktu, który jest chwilowo niedostępny.

### Jak działa

1. Klient odwiedza stronę niedostępnego produktu
2. Zamiast przycisku **Dodaj do koszyka** widzi formularz z polem e-mail
3. Klient wpisuje adres e-mail i klika **Powiadom mnie**
4. Gdy produkt wróci do magazynu, system automatycznie wysyła powiadomienie

### Zarządzanie listą

W panelu admina (**WooCommerce > Polski > Lista oczekujących**) widoczne są:

- Lista produktów z liczbą oczekujących
- Adresy e-mail zapisanych klientów
- Status powiadomienia (wysłane / oczekujące)
- Przycisk ręcznego wysłania powiadomienia

### Zgoda RODO

Formularz zapisania na listę zawiera checkbox zgody na przetwarzanie danych osobowych, zgodnie z RODO. Treść checkboxa konfigurujesz w ustawieniach modułu.

```php
add_filter('polski/waitlist/consent_text', function (): string {
    return 'Wyrażam zgodę na otrzymanie jednorazowego powiadomienia o dostępności produktu.';
});
```

### Automatyczne czyszczenie

Adresy e-mail usuwane są z listy po:
- Wysłaniu powiadomienia
- 90 dniach od zapisania (konfigurowalny okres)
- Ręcznym usunięciu przez administratora

## Nieskończone przewijanie (infinite scroll)

Moduł zastępuje tradycyjną paginację automatycznym ładowaniem kolejnych stron produktów przy przewijaniu.

### Tryby

- **Automatyczny** - następna strona ładuje się automatycznie gdy użytkownik dotrze do końca listy
- **Przycisk** - wyświetla przycisk **Załaduj więcej** zamiast automatycznego ładowania

### Konfiguracja

| Opcja              | Opis                              | Domyślnie     |
| ------------------- | --------------------------------- | ------------- |
| Tryb                | Automatyczny lub przycisk         | Automatyczny  |
| Odległość           | Odległość od dołu listy (px)      | 300           |
| Tekst przycisku     | Tekst na przycisku                | Załaduj więcej|
| Spinner             | Typ animacji ładowania            | Dots          |
| Limit stron         | Maksymalna liczba stron           | 10            |

### SEO

Nieskończone przewijanie obsługuje parametr `?paged=N` w URL (History API). Wyszukiwarki nadal widzą klasyczną paginację - moduł serwuje paginowane URL-e dla botów.

```php
// Wyłączenie infinite scroll na urządzeniach mobilnych
add_filter('polski/infinite_scroll/enabled', function (): bool {
    return ! wp_is_mobile();
});
```

## Popup

Moduł wyświetla konfigurowalny popup (okno modalne) na stronie sklepu.

### Typy popupów

- **Newsletter** - formularz zapisu do newslettera
- **Informacyjny** - dowolna treść HTML/shortcody
- **Produktowy** - promowanie wybranego produktu
- **Wyjście** - wyświetlany przy próbie opuszczenia strony (exit intent)

### Wyzwalacze (triggers)

| Wyzwalacz        | Opis                                        |
| ---------------- | ------------------------------------------- |
| Czas             | Po X sekundach od wejścia na stronę         |
| Scroll           | Po przewinięciu X% strony                   |
| Exit intent      | Gdy kursor opuści okno przeglądarki         |
| Kliknięcie       | Po kliknięciu elementu z klasą CSS          |
| Liczba wizyt     | Po N-tej wizycie na stronie                 |

### Ograniczenia wyświetlania

- **Raz na sesję** - popup wyświetli się raz podczas wizyty
- **Raz na X dni** - popup nie pokaże się ponownie przez X dni (cookie)
- **Tylko nowi** - popup widoczny tylko dla nowych odwiedzających
- **Wybrane strony** - popup widoczny tylko na wskazanych stronach

### Konfiguracja w panelu

Przejdź do **WooCommerce > Polski > Moduły sklepowe > Popup** i skonfiguruj:

- Treść popupu (edytor WYSIWYG z obsługą shortcodów)
- Wyzwalacz i warunki wyświetlania
- Styl (kolory, rozmiar, animacja)
- Pozycja (centrum, dół, bok)
- Przycisk zamknięcia

### Zgodność z prawem

Popup nie powinien utrudniać korzystania ze sklepu (dark patterns). Moduł wymusza:
- Widoczny przycisk zamknięcia (X)
- Możliwość zamknięcia kliknięciem w tło
- Zamknięcie klawiszem Escape
- Brak blokowania przewijania strony pod popupem

## Rozwiązywanie problemów

**Menedżer zakładek nie zapisuje kolejności** - wyczyść cache przeglądarki i cache WordPressa. Problem może być też spowodowany konfliktem z wtyczką zakładek.

**Zoom nie działa na mobile** - tryb hover i lens nie działają na urządzeniach dotykowych. Użyj trybu lightbox dla mobile.

**Infinite scroll nie ładuje kolejnych stron** - sprawdź, czy motyw korzysta ze standardowej paginacji WooCommerce (`woocommerce_pagination()`).

**Popup nie wyświetla się** - sprawdź ustawienia cookie. Jeśli popup już się wyświetlił, cookie blokuje ponowne wyświetlenie. Wyczyść cookies lub ustaw inną częstotliwość.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
