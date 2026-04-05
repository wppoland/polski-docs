---
title: NIP na kasie
description: Walidacja numeru NIP z sumą kontrolną, weryfikacja w API GUS REGON oraz automatyczne pobieranie danych firmy na stronie kasy WooCommerce.
---

Klienci firmowi składający zamówienia w sklepach internetowych potrzebują możliwości podania numeru NIP, aby otrzymać fakturę VAT. Plugin Polski for WooCommerce dodaje pole NIP na stronie kasy z pełną walidacją - od sumy kontrolnej po weryfikację w bazie GUS REGON z automatycznym uzupełnieniem danych firmy.

## Funkcjonalności

Moduł NIP oferuje trzy poziomy weryfikacji:

1. **Walidacja formatu** - sprawdzenie, czy numer składa się z 10 cyfr
2. **Walidacja sumy kontrolnej** - algorytm weryfikacji cyfry kontrolnej NIP
3. **Weryfikacja GUS REGON** - sprawdzenie w bazie Głównego Urzędu Statystycznego z automatycznym pobraniem danych firmy

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Kasa** i skonfiguruj sekcję "NIP".

### Ustawienia podstawowe

| Ustawienie | Domyślna wartość | Opis |
|------------|-----------------|------|
| Włącz pole NIP | Tak | Dodaje pole NIP na stronie kasy |
| Pole wymagane | Nie | Czy NIP jest obowiązkowy |
| Pozycja pola | Po polu firmy | Gdzie wyświetlić pole NIP |
| Walidacja sumy kontrolnej | Tak | Sprawdza poprawność numeru NIP |
| Weryfikacja GUS REGON | Nie | Weryfikuje NIP w bazie GUS |
| Automatyczne uzupełnianie | Tak | Pobiera dane firmy z GUS |

### Wyświetlanie warunkowe

Pole NIP może być wyświetlane:

- **Zawsze** - widoczne dla wszystkich klientów
- **Po zaznaczeniu checkboxa "Chcę fakturę"** - pojawia się po zaznaczeniu
- **Po wpisaniu nazwy firmy** - pojawia się, gdy pole "Firma" jest wypełnione

Zalecana opcja to wyświetlanie po zaznaczeniu checkboxa "Chcę fakturę" - jest to najczytelniejsze dla klienta.

## Walidacja sumy kontrolnej

Algorytm walidacji NIP opiera się na systemie wag. Cyfra kontrolna (ostatnia, dziesiąta cyfra) jest obliczana na podstawie dziewięciu poprzednich cyfr.

### Algorytm

Wagi dla kolejnych cyfr NIP: `6, 5, 7, 2, 3, 4, 5, 6, 7`

```
NIP: 1234567890
Suma = 1*6 + 2*5 + 3*7 + 4*2 + 5*3 + 6*4 + 7*5 + 8*6 + 9*7 = 214
Reszta = 214 mod 11
Jeśli reszta == ostatnia cyfra NIP → NIP poprawny
```

Plugin wykonuje tę walidację zarówno po stronie klienta (JavaScript), jak i po stronie serwera (PHP). Walidacja serwerowa jest zawsze aktywna - nie można jej obejść wyłączając JavaScript.

### Obsługa formatów wejściowych

Plugin akceptuje NIP w różnych formatach:

- `1234567890` - same cyfry
- `123-456-78-90` - z myślnikami
- `123 456 78 90` - ze spacjami
- `PL1234567890` - z prefiksem kraju

Wszystkie formaty są normalizowane do 10 cyfr przed walidacją.

## Weryfikacja GUS REGON

### Konfiguracja API

API GUS REGON wymaga klucza dostępowego. Plugin obsługuje dwa środowiska:

| Środowisko | URL | Klucz | Zastosowanie |
|------------|-----|-------|-------------|
| Testowe | `https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnwordbir.svc` | `abcde12345abcde12345` (publiczny klucz testowy) | Rozwój i testowanie |
| Produkcyjne | `https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnetrzny.svc` | Własny klucz z GUS | Działający sklep |

### Uzyskanie klucza produkcyjnego

1. Wejdź na stronę: https://api.stat.gov.pl/Home/BirIndex
2. Zarejestruj się i zaloguj
3. Złóż wniosek o dostęp do API REGON
4. Klucz zostanie przesłany na podany adres e-mail (czas oczekiwania: 1-3 dni robocze)

### Konfiguracja w pluginie

1. Przejdź do **WooCommerce > Ustawienia > Polski > Kasa > NIP**
2. Włącz **Weryfikacja GUS REGON**
3. Wybierz środowisko: **Testowe** lub **Produkcyjne**
4. Wklej klucz API (dla środowiska produkcyjnego)
5. Zapisz ustawienia

### Tryb testowy

W trybie testowym plugin używa publicznego klucza testowego GUS. Baza testowa zawiera fikcyjne dane - nie służy do weryfikacji prawdziwych numerów NIP. Używaj go wyłącznie podczas rozwoju i testowania integracji.

## Automatyczne pobieranie danych firmy

Po weryfikacji NIP w GUS REGON plugin automatycznie uzupełnia pola formularza:

| Pole WooCommerce | Dane z GUS |
|-----------------|------------|
| Firma (company) | Nazwa firmy |
| Adres 1 | Ulica i numer |
| Miasto | Miejscowość |
| Kod pocztowy | Kod pocztowy |
| Województwo | Województwo |

Klient widzi uzupełnione dane i może je skorygować przed złożeniem zamówienia.

### Zachowanie przy automatycznym uzupełnianiu

- Pola są uzupełniane tylko jeśli są puste lub zawierają wcześniej pobrane dane z GUS
- Jeśli klient ręcznie zmienił dane, plugin nie nadpisuje zmian
- Klient jest informowany komunikatem o pobraniu danych

## Przechowywanie NIP

Numer NIP jest zapisywany jako metadane zamówienia:

- klucz: `_billing_nip`
- widoczny w panelu administracyjnym zamówienia
- dostępny w szablonach e-maili
- eksportowalny w raportach

### Wyświetlanie NIP w zamówieniu

NIP jest automatycznie wyświetlany:

- w szczegółach zamówienia (panel administracyjny)
- w e-mailu potwierdzenia zamówienia
- na stronie "Moje konto > Zamówienia"

## Programistyczny dostęp

### Pobieranie NIP z zamówienia

```php
$order = wc_get_order($order_id);
$nip = $order->get_meta('_billing_nip');
```

### Walidacja NIP w PHP

```php
function validate_nip(string $nip): bool {
    $nip = preg_replace('/[^0-9]/', '', $nip);

    if (strlen($nip) !== 10) {
        return false;
    }

    $weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    $sum = 0;

    for ($i = 0; $i < 9; $i++) {
        $sum += (int) $nip[$i] * $weights[$i];
    }

    return ($sum % 11) === (int) $nip[9];
}
```

### Hook walidacji

```php
add_filter('polski/checkout/validate_nip', function (bool $is_valid, string $nip): bool {
    // Dodatkowa logika walidacji
    // np. sprawdzenie na liście zablokowanych NIP-ów
    $blocked_nips = ['0000000000'];

    if (in_array($nip, $blocked_nips, true)) {
        return false;
    }

    return $is_valid;
}, 10, 2);
```

## Najczęstsze problemy

### Weryfikacja GUS zwraca błąd

1. Sprawdź, czy klucz API jest poprawny i aktywny
2. Zweryfikuj, czy serwer może nawiązać połączenie HTTPS z api.stat.gov.pl
3. API GUS bywa niedostępne - plugin obsługuje timeout i wyświetla odpowiedni komunikat
4. Upewnij się, że rozszerzenie PHP SOAP jest zainstalowane na serwerze

### Pole NIP nie wyświetla się

1. Sprawdź, czy moduł NIP jest włączony
2. Zweryfikuj ustawienie wyświetlania warunkowego
3. Wyczyść cache (wtyczki cache mogą cachować formularz kasy)

### Dane firmy nie uzupełniają się automatycznie

1. Sprawdź konsolę przeglądarki pod kątem błędów AJAX
2. Zweryfikuj, czy endpoint REST API pluginu jest dostępny
3. Upewnij się, że NIP jest poprawny i firma istnieje w bazie GUS

## Powiązane zasoby

- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
