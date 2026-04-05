---
title: Pozostałe moduły sklepowe
description: Dodatkowe moduły w Polski for WooCommerce - menedżer zakładek, wyróżnione wideo, zoom galerii, lista oczekujących, nieskończone przewijanie, popup.
---

Dodatkowe moduły sklepowe. Każdy włączysz niezależnie w **WooCommerce > Polski > Moduły sklepowe**.

## Menedżer zakładek (tab manager)

Kontroluj zakładki na stronie produktu (Opis, Informacje dodatkowe, Opinie itp.).

### Możliwości

- **Zmiana kolejności** - przeciągnij i upuść
- **Ukrywanie zakładek** - ukryj bez usuwania treści
- **Zmiana nazw** - np. "Szczegóły" zamiast "Opis"
- **Dodawanie zakładek** - własne zakładki z dowolną treścią
- **Zakładki globalne** - widoczne na wszystkich produktach
- **Zakładki per produkt** - tylko na wybranym produkcie
- **Zakładki per kategoria** - tylko na produktach z danej kategorii

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

Zastąp lub uzupełnij główne zdjęcie produktu filmem wideo.

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

Filmy YouTube i Vimeo ładują się leniwie - iframe wstawia się dopiero po kliknięciu miniaturki. Strona produktu nie jest spowalniana przez zewnętrzne skrypty.

## Zoom galerii (gallery zoom)

Powiększanie zdjęć produktu po najechaniu kursorem lub kliknięciu.

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

Zdjęcia powinny mieć co najmniej 1200x1200 px. Przy niższej rozdzielczości powiększony obraz będzie rozmyty.

## Lista oczekujących (waitlist)

Klienci mogą zapisać się na powiadomienie e-mail, gdy niedostępny produkt wróci do sprzedaży.

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

Formularz zawiera checkbox zgody RODO. Treść checkboxa zmienisz w ustawieniach modułu.

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

Zastępuje tradycyjną paginację automatycznym ładowaniem produktów przy przewijaniu.

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

Moduł obsługuje parametr `?paged=N` w URL (History API). Wyszukiwarki widzą klasyczną paginację - boty otrzymują paginowane URL-e.

```php
// Wyłączenie infinite scroll na urządzeniach mobilnych
add_filter('polski/infinite_scroll/enabled', function (): bool {
    return ! wp_is_mobile();
});
```

## Popup

Konfigurowalny popup (okno modalne) na stronie sklepu.

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

### Wymogi prawne

Popup nie może utrudniać korzystania ze sklepu (dark patterns). Moduł wymusza:
- Widoczny przycisk zamknięcia (X)
- Możliwość zamknięcia kliknięciem w tło
- Zamknięcie klawiszem Escape
- Brak blokowania przewijania strony pod popupem

## Rozwiązywanie problemów

**Menedżer zakładek nie zapisuje kolejności** - wyczyść cache przeglądarki i WordPressa. Możliwy konflikt z inną wtyczką zakładek.

**Zoom nie działa na mobile** - tryb hover i lens nie działają na dotykowych ekranach. Użyj trybu lightbox.

**Infinite scroll nie ładuje kolejnych stron** - sprawdź, czy motyw używa standardowej paginacji WooCommerce (`woocommerce_pagination()`).

**Popup nie wyświetla się** - jeśli popup już się pojawił, cookie blokuje ponowne wyświetlenie. Wyczyść cookies lub zmień częstotliwość.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
