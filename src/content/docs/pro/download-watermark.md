---
title: Znakowanie wodne plikow do pobrania
description: Dokumentacja modulu znakowania wodnego w Polski PRO for WooCommerce - automatyczny watermark PDF przez TCPDF i EPUB przez ZipArchive z danymi kupujacego.
---

Modul znakowania wodnego automatycznie dodaje dane kupujacego do plikow do pobrania (PDF i EPUB) w momencie pobierania. Kazdy pobrany plik zawiera spersonalizowany watermark identyfikujacy nabywce.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Rozszerzenie PHP `ZipArchive` jest wymagane dla plikow EPUB.
:::

## Jak to dziala

1. Klient kupuje produkt z plikami do pobrania
2. W momencie klikniecia linku pobierania plugin przechwytuje zadanie
3. Na podstawie formatu pliku stosowany jest odpowiedni mechanizm znakowania
4. Plik tymczasowy ze znakiem wodnym jest generowany i wysylany do klienta
5. Plik tymczasowy jest usuwany po zakonczeniu procesu (cleanup na shutdown)

Znakowanie wodne jest stosowane automatycznie do wszystkich produktow z plikami do pobrania - nie wymaga dodatkowej konfiguracji per produkt.

## Obslugiwane formaty

### PDF (TCPDF)

Znakowanie wodne plikow PDF wykorzystuje biblioteke TCPDF:

- Na kazdej stronie dokumentu nakladany jest tekst watermarku
- Tekst jest polprzezroczysty i umieszczony po przekatnej strony
- Watermark nie wplywa na czytelnosc oryginalnej tresci
- Obslugiwane sa wielostronicowe dokumenty PDF

### EPUB (ZipArchive)

Znakowanie wodne plikow EPUB wykorzystuje rozszerzenie PHP ZipArchive:

- Plik EPUB jest otwierany jako archiwum ZIP
- Do plikow HTML wewnatrz archiwum wstrzykiwany jest element `<div>` z danymi kupujacego
- Wstrzykniecie odbywa sie przed zamykajacym tagiem `</body>`
- Oryginalna struktura EPUB jest zachowana

## Placeholdery

W tresci znaku wodnego mozna uzywac nastepujacych placeholderow:

| Placeholder | Opis | Przyklad |
|-------------|------|---------|
| `[FIRSTNAME]` | Imie kupujacego | Jan |
| `[LASTNAME]` | Nazwisko kupujacego | Kowalski |
| `[EMAIL]` | Adres e-mail kupujacego | jan@example.com |
| `[DATE]` | Data pobrania pliku | 2026-04-06 |
| `[ORDER_ID]` | Numer zamowienia | 12345 |

Przyklad tekstu znaku wodnego:

```
Licencjonowano dla: [FIRSTNAME] [LASTNAME] ([EMAIL])
Zamowienie #[ORDER_ID] z dnia [DATE]
```

## Pliki tymczasowe

Znakowany plik jest tworzony jako kopia tymczasowa w katalogu `wp-content/uploads/polski-pro-temp/`:

- Plik tymczasowy jest generowany z unikalnym identyfikatorem
- Po wyslaniu pliku do klienta plik tymczasowy jest usuwany
- Czyszczenie odbywa sie automatycznie przez hook `register_shutdown_function`
- W przypadku bledu pliki tymczasowe sa rowniez usuwane

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Polski PRO > Znakowanie wodne**.

| Ustawienie | Opis |
|------------|------|
| Wlacz znakowanie wodne | Aktywuje modul dla wszystkich plikow do pobrania |
| Tekst znaku wodnego | Tresc watermarku z placeholderami |
| Rozmiar czcionki (PDF) | Rozmiar tekstu znaku wodnego w PDF |
| Przezroczystosc (PDF) | Poziom przezroczystosci watermarku w PDF |
| Styl CSS (EPUB) | Styl CSS elementu div ze znakiem wodnym w EPUB |

## Wlaczanie modulu

Modul jest kontrolowany przelacznikiem w ustawieniach modulow PRO:

```
WooCommerce > Ustawienia > Polski PRO > Moduly > Znakowanie wodne
```

<div class="disclaimer">Ta strona ma wylacznie charakter informacyjny i nie stanowi porady prawnej. Polski PRO for WooCommerce jest oprogramowaniem komercyjnym dostarczanym bez gwarancji.</div>
