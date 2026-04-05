---
title: Instalacja wtyczki
description: Instrukcja instalacji wtyczki Polski for WooCommerce krok po kroku - z panelu WordPress oraz ręcznie z pliku ZIP. Wymagania systemowe i rozwiązywanie problemów.
---

## Wymagania wstępne

Sprawdź, czy Twój serwer spełnia wymagania. Wtyczka **Polski for WooCommerce** 1.3.2 wymaga:

| Komponent | Minimalna wersja | Zalecana wersja |
|-----------|-----------------|-----------------|
| WordPress | 6.4+ | 6.7+ |
| WooCommerce | 8.0+ | 9.x |
| PHP | 8.1+ | 8.2+ |
| MySQL | 5.7+ | 8.0+ |
| MariaDB | 10.3+ | 10.11+ |

### Sprawdzenie wersji PHP

Nie wiesz, jaką masz wersję PHP? Sprawdź w panelu WordPress:

1. Przejdź do **Narzędzia > Zdrowie witryny**
2. Kliknij zakładkę **Informacje**
3. Rozwiń sekcję **Serwer**
4. Znajdź pole **Wersja PHP**

Wersję PHP znajdziesz też w panelu hostingu (cPanel, DirectAdmin) w ustawieniach domeny.

### Sprawdzenie wersji WooCommerce

1. Przejdź do **Wtyczki > Zainstalowane wtyczki**
2. Znajdź **WooCommerce** na liście
3. Wersja jest wyświetlana pod nazwą wtyczki

:::caution[PHP 8.0 i starsze]
Wtyczka nie działa na PHP 7.x ani PHP 8.0. Jeśli Twój hosting nie ma PHP 8.1+, zmień wersję PHP w panelu hostingu lub skontaktuj się z dostawcą.
:::

---

## Metoda 1: Instalacja z panelu WordPress (zalecana)

To najprostsza i zalecana metoda instalacji.

### Krok 1 - otwórz panel wtyczek

Zaloguj się do panelu administracyjnego WordPress i przejdź do **Wtyczki > Dodaj nową wtyczkę**.

### Krok 2 - wyszukaj wtyczkę

W polu wyszukiwania wpisz:

```
Polski for WooCommerce
```

Wtyczka powinna pojawić się jako pierwszy wynik. Autorem jest **wppoland.com**.

### Krok 3 - zainstaluj wtyczkę

Kliknij przycisk **Zainstaluj teraz** przy wtyczce "Polski for WooCommerce". Poczekaj, aż WordPress pobierze i rozpakuje pliki.

### Krok 4 - aktywuj wtyczkę

Po zakończeniu instalacji przycisk zmieni się na **Aktywuj**. Kliknij go, aby aktywować wtyczkę.

### Krok 5 - przejdź do konfiguracji

Po aktywacji pojawi się powiadomienie z linkiem do kreatora konfiguracji. Kliknij **Skonfiguruj wtyczkę** lub przejdź ręcznie do **WooCommerce > Polski**.

---

## Metoda 2: Instalacja ręczna z pliku ZIP

Użyj tej metody, gdy chcesz zainstalować konkretną wersję lub serwer nie łączy się z WordPress.org.

### Krok 1 - pobierz paczkę ZIP

Pobierz najnowszą wersję wtyczki z jednego z poniższych źródeł:

- **WordPress.org**: [https://wordpress.org/plugins/polski-for-woocommerce/](https://wordpress.org/plugins/polski-for-woocommerce/)
- **GitHub Releases**: [https://github.com/wppoland/polski/releases](https://github.com/wppoland/polski/releases)

### Krok 2 - prześlij plik ZIP

1. Przejdź do **Wtyczki > Dodaj nową wtyczkę**
2. Kliknij przycisk **Prześlij wtyczkę** u góry strony
3. Kliknij **Wybierz plik** i wskaż pobrany plik ZIP
4. Kliknij **Zainstaluj teraz**

### Krok 3 - aktywuj wtyczkę

Po przesłaniu i rozpakowaniu plików kliknij **Aktywuj wtyczkę**.

---

## Metoda 3: Instalacja przez FTP/SFTP

Użyj tej metody, gdy panel WordPress nie pozwala przesyłać plików (np. przez limit rozmiaru).

### Krok 1 - rozpakuj archiwum

Rozpakuj pobrany plik ZIP na swoim komputerze. Otrzymasz folder `polski-for-woocommerce`.

### Krok 2 - prześlij na serwer

Połącz się z serwerem przez FTP/SFTP i prześlij cały folder `polski-for-woocommerce` do katalogu:

```
/wp-content/plugins/
```

Struktura po przesłaniu powinna wyglądać tak:

```
wp-content/
  plugins/
    polski-for-woocommerce/
      polski-for-woocommerce.php
      includes/
      assets/
      ...
```

### Krok 3 - aktywuj w panelu

Przejdź do **Wtyczki > Zainstalowane wtyczki** w panelu WordPress i kliknij **Aktywuj** przy "Polski for WooCommerce".

---

## Instalacja przez WP-CLI

Jeśli masz dostęp do terminala serwera, możesz zainstalować wtyczkę jedną komendą:

```bash
wp plugin install polski-for-woocommerce --activate
```

Aby zaktualizować wtyczkę do najnowszej wersji:

```bash
wp plugin update polski-for-woocommerce
```

Sprawdzenie aktualnej wersji:

```bash
wp plugin get polski-for-woocommerce --fields=name,version,status
```

---

## Weryfikacja instalacji

Po aktywacji wtyczki sprawdź, czy wszystko działa poprawnie:

1. **Nowa pozycja w menu** - w menu WooCommerce powinien pojawić się element **Polski**
2. **Dashboard zgodności** - przejdź do **WooCommerce > Polski**, aby zobaczyć panel główny
3. **Brak błędów** - sprawdź, czy na stronie nie pojawiły się komunikaty o błędach PHP

### Sprawdzenie za pomocą shortcode

Aby sprawdzić, czy wtyczka jest aktywna, wstaw shortcode na dowolnej stronie:

```
[polski_version]
```

Shortcode pokaże wersję wtyczki (np. "1.3.2") - to znaczy, że instalacja działa.

---

## Rozwiązywanie problemów

### Wtyczka nie pojawia się w wyszukiwarce

- Sprawdź, czy Twój WordPress ma połączenie z repozytorium WordPress.org
- Upewnij się, że szukasz dokładnie "Polski for WooCommerce"
- Spróbuj instalacji ręcznej z pliku ZIP

### Błąd "Wtyczka wymaga nowszej wersji PHP"

Twój serwer używa nieobsługiwanej wersji PHP. Rozwiązanie:

1. Zaloguj się do panelu hostingowego
2. Znajdź ustawienia PHP (zazwyczaj w sekcji "Domeny" lub "Hosting")
3. Zmień wersję PHP na 8.1 lub nowszą
4. Poczekaj kilka minut na zastosowanie zmian
5. Spróbuj ponownie aktywować wtyczkę

### Błąd "WooCommerce jest wymagane"

Wtyczka wymaga aktywnego WooCommerce w wersji 8.0 lub nowszej:

1. Upewnij się, że WooCommerce jest zainstalowany i aktywny
2. Zaktualizuj WooCommerce do najnowszej wersji
3. Ponownie aktywuj wtyczkę Polski for WooCommerce

### Biały ekran po aktywacji

Jeśli po aktywacji widzisz biały ekran:

1. Włącz tryb debugowania WordPress - dodaj do `wp-config.php`:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

2. Sprawdź plik logów: `wp-content/debug.log`
3. Jeśli problem dotyczy konfliktu z inną wtyczką, dezaktywuj pozostałe wtyczki i aktywuj je pojedynczo

### Problemy z uprawnieniami plików

Jeśli instalacja ręczna nie działa, sprawdź uprawnienia:

```bash
# Zalecane uprawnienia dla katalogów
chmod 755 wp-content/plugins/polski-for-woocommerce/

# Zalecane uprawnienia dla plików
chmod 644 wp-content/plugins/polski-for-woocommerce/*.php
```

---

## Aktualizacja wtyczki

Wtyczka aktualizuje się przez standardowy mechanizm WordPress. Gdy pojawi się nowa wersja:

1. Zobaczysz powiadomienie w **Wtyczki > Zainstalowane wtyczki**
2. Kliknij **Zaktualizuj teraz** lub użyj masowej aktualizacji
3. Po aktualizacji sprawdź, czy sklep działa poprawnie

:::tip[Kopia zapasowa]
Przed aktualizacją zrób kopię zapasową bazy danych i plików. Hosting często robi to automatycznie, ale ręczna kopia daje pewność.
:::

---

## Następne kroki

Po instalacji przejdź do [konfiguracji wtyczki](getting-started/configuration/), aby włączyć moduły i dostosować ustawienia.

Masz problem, którego tu nie ma? Zgłoś go na [GitHub Issues](https://github.com/wppoland/polski/issues) lub zapytaj na [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
