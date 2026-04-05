---
title: Szybki podgląd produktu
description: Moduł szybkiego podglądu produktu w Polski for WooCommerce - lightbox, warianty, galeria do 4 zdjęć.
---

Szybki podgląd (quick view) pozwala klientom zobaczyć szczegóły produktu bez opuszczania strony kategorii lub wyników wyszukiwania. Produkt otwiera się w oknie lightbox z możliwością dodania do koszyka.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i aktywuj opcję **Szybki podgląd**. Na kartach produktów pojawi się ikona oka lub przycisk **Szybki podgląd**.

## Lightbox

Szybki podgląd otwiera się w modalnym oknie (lightbox) z przyciemnionym tłem. Okno jest responsywne - na desktopie zajmuje ok. 70% szerokości ekranu, na urządzeniach mobilnych rozciąga się na pełną szerokość.

Zawartość lightboxa:

- Galeria zdjęć (lewa strona)
- Nazwa produktu
- Cena (z uwzględnieniem promocji Omnibus)
- Opis krótki
- Wybór wariantów (dla produktów zmiennych)
- Pole ilości
- Przycisk **Dodaj do koszyka**
- Link **Zobacz pełne szczegóły** prowadzący do strony produktu

Lightbox zamyka się przez:
- Kliknięcie przycisku X
- Kliknięcie poza oknem (na overlay)
- Naciśnięcie klawisza Escape
- Przycisk wstecz w przeglądarce (History API)

## Obsługa wariantów

Dla produktów zmiennych (variable products) szybki podgląd wyświetla dropdowny z atrybutami, tak samo jak na stronie produktu. Po wybraniu wariantu:

- Cena aktualizuje się na cenę wariantu
- Zdjęcie zmienia się na zdjęcie przypisane do wariantu
- Status dostępności aktualizuje się
- Przycisk **Dodaj do koszyka** staje się aktywny dopiero po wybraniu wszystkich wymaganych atrybutów

Dane wariantów ładowane są jednorazowo razem z lightboxem - zmiana wariantu nie generuje dodatkowych zapytań do serwera.

## Galeria zdjęć (do 4 obrazów)

Lightbox wyświetla do **4 zdjęć** produktu - zdjęcie główne oraz do 3 zdjęć z galerii. Limit ten zapewnia szybkie ładowanie i czytelny interfejs w oknie podglądu.

Nawigacja po galerii:

- Kliknięcie miniaturki pod głównym zdjęciem
- Strzałki lewo/prawo na zdjęciu głównym
- Swipe na urządzeniach dotykowych
- Klawisze strzałek na klawiaturze

Limit zdjęć w galerii można zmienić filtrem:

```php
add_filter('polski/quick_view/gallery_limit', function (): int {
    return 6;
});
```

## Konfiguracja

Opcje dostępne w ustawieniach modułu:

| Opcja               | Opis                                            | Domyślnie   |
| -------------------- | ----------------------------------------------- | ----------- |
| Pozycja przycisku    | Gdzie wyświetlać przycisk na karcie produktu    | Na miniaturce |
| Typ przycisku        | Ikona oka lub tekst **Szybki podgląd**          | Ikona       |
| Galeria              | Ile zdjęć pokazywać w lightboxie                | 4           |
| Opis                 | Czy pokazywać opis krótki                       | Tak         |
| Oceny                | Czy pokazywać gwiazdki oceny                    | Tak         |
| Czas dostawy         | Czy pokazywać szacowany czas dostawy            | Tak         |
| Animacja             | Typ animacji otwarcia (fade/slide/zoom)         | fade        |

## Ładowanie treści przez AJAX

Zawartość lightboxa ładowana jest przez AJAX po kliknięciu przycisku. Na czas ładowania wyświetlany jest spinner. Dane produktu cachowane są po stronie klienta - ponowne otwarcie tego samego produktu nie generuje kolejnego żądania.

```php
// Zmiana szablonu lightboxa
add_filter('polski/quick_view/template', function (string $template): string {
    return get_stylesheet_directory() . '/polski/quick-view-custom.php';
});
```

## Integracja z innymi modułami

Szybki podgląd integruje się z innymi modułami Polski for WooCommerce:

- **Lista życzeń** - przycisk serca widoczny w lightboxie
- **Porównywarka** - przycisk porównania widoczny w lightboxie
- **Etykiety** - odznaki (wyprzedaż, nowość, bestseller) wyświetlane na zdjęciu
- **Cena Omnibus** - najniższa cena z 30 dni widoczna przy cenie promocyjnej

## Dostępność (accessibility)

Lightbox obsługuje pełną nawigację klawiaturową:

- **Tab** - przechodzenie między interaktywnymi elementami
- **Escape** - zamknięcie okna
- **Strzałki** - nawigacja po galerii
- Focus trap - fokus nie wychodzi poza lightbox podczas gdy jest otwarty
- Atrybuty ARIA: `role="dialog"`, `aria-modal="true"`, `aria-label`

## Stylowanie CSS

Klasy CSS modułu:

- `.polski-quick-view-overlay` - przyciemnienie tła
- `.polski-quick-view-modal` - okno lightbox
- `.polski-quick-view-gallery` - galeria zdjęć
- `.polski-quick-view-content` - treść produktu
- `.polski-quick-view-close` - przycisk zamknięcia
- `.polski-quick-view-trigger` - przycisk otwierający na karcie produktu

## Wydajność

Skrypt i style lightboxa ładowane są leniwie - tylko wtedy, gdy na stronie jest co najmniej jeden produkt z przyciskiem szybkiego podglądu. Kod JavaScript waży ok. 8 KB (gzip) i nie blokuje renderowania strony.

## Rozwiązywanie problemów

**Lightbox nie otwiera się** - sprawdź konsolę przeglądarki. Najczęstsza przyczyna to konflikt z inną wtyczką lightbox (np. WooCommerce Lightbox, FancyBox). Wyłącz domyślny lightbox WooCommerce.

**Warianty nie ładują się** - upewnij się, że produkt zmienny ma poprawnie skonfigurowane warianty z cenami. Puste warianty są pomijane.

**Galeria pokazuje tylko 1 zdjęcie** - dodaj zdjęcia do galerii produktu w edytorze WooCommerce (sekcja **Galeria produktu**, nie tylko **Zdjęcie produktu**).

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
