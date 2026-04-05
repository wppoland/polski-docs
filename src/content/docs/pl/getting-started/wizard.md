---
title: Kreator konfiguracji
description: Przewodnik po kreatorze konfiguracji wtyczki Polski for WooCommerce. Dane firmy, strony prawne, checkboxy i automatyczna konfiguracja sklepu krok po kroku.
---

## Czym jest kreator konfiguracji?

Kreator konfiguracji to narzędzie, które przeprowadzi Cię przez najważniejsze ustawienia wtyczki w kilku prostych krokach. Zamiast ręcznie konfigurować każdy moduł, kreator zadaje pytania i automatycznie ustawia odpowiednie opcje.

Kreator jest dostępny po pierwszej aktywacji wtyczki. Możesz go też uruchomić ponownie w dowolnym momencie - przejdź do **WooCommerce > Polski > Ustawienia** i kliknij przycisk **Uruchom kreator ponownie**.

:::note[Kreator nie nadpisuje istniejących danych]
Jeśli uruchamiasz kreator ponownie, pola będą wypełnione wcześniej zapisanymi danymi. Kreator nie usunie ani nie nadpisze danych, których nie zmienisz.
:::

---

## Krok 1: Dane firmy

Pierwszym krokiem jest uzupełnienie podstawowych danych Twojej firmy. Dane te są wykorzystywane w wielu miejscach - na stronach prawnych, w stopce, w danych GPSR i w fakturach.

### Wymagane pola

| Pole | Opis | Przykład |
|------|------|---------|
| Nazwa firmy | Pełna nazwa lub firma | "Jan Kowalski Sklep Online" |
| Forma prawna | Typ działalności | JDG, sp. z o.o., sp.j., S.A. |
| NIP | Numer Identyfikacji Podatkowej | 1234567890 |
| REGON | Numer REGON | 123456789 |
| KRS | Numer KRS (jeśli dotyczy) | 0000123456 |
| Adres | Ulica, numer, kod, miasto | ul. Przykładowa 10, 00-001 Warszawa |
| E-mail kontaktowy | Adres do korespondencji | kontakt@mojsklep.pl |
| Telefon | Numer telefonu | +48 123 456 789 |

### Pola opcjonalne

- **Numer rachunku bankowego** - do wyświetlania na fakturach i w regulaminie
- **Organ rejestrowy** - np. "Sąd Rejonowy dla m.st. Warszawy"
- **Kapitał zakładowy** - wymagany dla spółek (np. "5 000,00 zł")
- **Imię i nazwisko reprezentanta** - osoba upoważniona do reprezentacji

### Walidacja NIP

Kreator automatycznie weryfikuje poprawność numeru NIP:

- Sprawdza sumę kontrolną (algorytm wagowy)
- Opcjonalnie pobiera dane z API GUS (CEIDG/KRS) do porównania

Jeśli NIP jest nieprawidłowy, zobaczysz komunikat ostrzegawczy. Możesz kontynuować, ale zalecamy poprawienie numeru.

### Przykładowa konfiguracja

Dla jednoosobowej działalności gospodarczej:

```
Nazwa firmy: Jan Kowalski E-Commerce
Forma prawna: Jednoosobowa działalność gospodarcza
NIP: 1234567890
REGON: 123456789
KRS: (puste - nie dotyczy JDG)
Adres: ul. Handlowa 5/10, 31-001 Kraków
E-mail: sklep@kowalski-ecommerce.pl
Telefon: +48 500 600 700
```

Dla spółki z o.o.:

```
Nazwa firmy: SuperSklep sp. z o.o.
Forma prawna: Spółka z ograniczoną odpowiedzialnością
NIP: 9876543210
REGON: 987654321
KRS: 0000654321
Adres: ul. Biznesowa 22, 00-100 Warszawa
E-mail: biuro@supersklep.pl
Telefon: +48 22 123 45 67
Kapitał zakładowy: 50 000,00 zł
Organ rejestrowy: Sąd Rejonowy dla m.st. Warszawy, XII Wydział Gospodarczy KRS
```

Kliknij **Dalej**, aby przejść do kolejnego kroku.

---

## Krok 2: Strony prawne

W tym kroku kreator pomoże Ci utworzyć wymagane prawnie strony. Każdy polski sklep internetowy powinien posiadać co najmniej:

- **Regulamin sklepu** - zasady korzystania ze sklepu i zawierania umów
- **Polityka prywatności** - informacje o przetwarzaniu danych osobowych (RODO)
- **Polityka zwrotów** - procedura i formularz odstąpienia od umowy

### Generowanie stron

Kreator oferuje dwa podejścia:

**Opcja A - wygeneruj nowe strony (zalecane dla nowych sklepów)**

1. Zaznacz strony, które chcesz wygenerować
2. Kreator utworzy strony WordPress z wypełnioną treścią na podstawie danych firmy
3. Treść bazuje na szablonach zgodnych z polskim prawem

**Opcja B - przypisz istniejące strony**

1. Jeśli masz już utworzone strony prawne, wybierz je z listy rozwijanej
2. Kreator przypisze je do odpowiednich ustawień WooCommerce

### Szablony stron prawnych

Generowane strony zawierają sekcje wymagane przez polskie prawo. Przykładowa struktura regulaminu:

```
1. Postanowienia ogólne
2. Definicje
3. Zasady korzystania ze sklepu
4. Procedura składania zamówień
5. Ceny i metody płatności
6. Dostawa
7. Prawo do odstąpienia od umowy
8. Reklamacje i gwarancja
9. Dane osobowe
10. Postanowienia końcowe
```

:::caution[Szablony wymagają personalizacji]
Wygenerowane strony to punkt wyjścia, nie gotowy dokument prawny. Przejrzyj treść i dostosuj ją do specyfiki swojego sklepu. W przypadku wątpliwości skonsultuj treść z prawnikiem specjalizującym się w e-commerce.
:::

### Shortcody na stronach prawnych

Na wygenerowanych stronach wykorzystywane są shortcody, które automatycznie wstawiają dane firmy:

```
[polski_company_name]        - nazwa firmy
[polski_company_nip]         - NIP
[polski_company_regon]       - REGON
[polski_company_krs]         - KRS
[polski_company_address]     - adres firmy
[polski_company_email]       - e-mail kontaktowy
[polski_company_phone]       - telefon
[polski_withdrawal_period]   - okres na odstąpienie (domyślnie 14 dni)
```

Dzięki shortcodom, gdy zmienisz dane firmy w ustawieniach wtyczki, strony prawne zaktualizują się automatycznie.

Przykład użycia w treści regulaminu:

```
Właścicielem sklepu internetowego jest [polski_company_name],
NIP: [polski_company_nip], REGON: [polski_company_regon],
z siedzibą pod adresem: [polski_company_address].

Kontakt: [polski_company_email], tel. [polski_company_phone].
```

Wynik na stronie:

```
Właścicielem sklepu internetowego jest Jan Kowalski E-Commerce,
NIP: 1234567890, REGON: 123456789,
z siedzibą pod adresem: ul. Handlowa 5/10, 31-001 Kraków.

Kontakt: sklep@kowalski-ecommerce.pl, tel. +48 500 600 700.
```

Kliknij **Dalej**, aby przejść do konfiguracji checkboxów.

---

## Krok 3: Checkboxy na stronie kasy

W tym kroku skonfigurujesz obowiązkowe checkboxy wyświetlane na stronie kasy (checkout). Polskie prawo wymaga, aby klient wyraził zgodę na regulamin przed złożeniem zamówienia.

### Domyślne checkboxy

Kreator proponuje zestaw checkboxów odpowiadający typowym wymaganiom:

**Checkbox 1 - regulamin (obowiązkowy)**

```
Treść: Przeczytałem/am i akceptuję [regulamin sklepu].
Wymagany: Tak
Link: /regulamin/
Pozycja: Przed przyciskiem zamówienia
```

**Checkbox 2 - polityka prywatności (obowiązkowy)**

```
Treść: Zapoznałem/am się z [polityką prywatności].
Wymagany: Tak
Link: /polityka-prywatnosci/
Pozycja: Przed przyciskiem zamówienia
```

**Checkbox 3 - prawo do odstąpienia (obowiązkowy)**

```
Treść: Zapoznałem/am się z [pouczeniem o prawie do odstąpienia od umowy]
         i [wzorem formularza odstąpienia].
Wymagany: Tak
Link: /polityka-zwrotow/
Pozycja: Przed przyciskiem zamówienia
```

**Checkbox 4 - newsletter (opcjonalny)**

```
Treść: Chcę otrzymywać informacje o nowościach i promocjach
       na podany adres e-mail.
Wymagany: Nie
Pozycja: Po checkboxach obowiązkowych
```

### Edycja checkboxów

Każdy checkbox możesz dostosować:

- **Treść** - tekst wyświetlany obok checkboxa (obsługuje HTML do linków)
- **Wymagany** - czy zaznaczenie jest konieczne do złożenia zamówienia
- **Pozycja** - gdzie na stronie kasy wyświetlić checkbox
- **Komunikat błędu** - tekst wyświetlany, gdy klient nie zaznaczy wymaganego checkboxa

### Dodawanie własnych checkboxów

Kliknij **Dodaj checkbox**, aby utworzyć dodatkowy. Przydatne scenariusze:

- Zgoda na przetwarzanie danych w celach marketingowych
- Oświadczenie o ukończeniu 18 lat (sklepy z alkoholem)
- Zgoda na kontakt telefoniczny
- Potwierdzenie zapoznania się z kartą produktu (produkty spożywcze)

### Pozycje checkboxów

Dostępne pozycje na stronie kasy:

| Pozycja | Opis |
|---------|------|
| `before_order_button` | Przed przyciskiem "Zamawiam z obowiązkiem zapłaty" |
| `after_order_button` | Po przycisku zamówienia |
| `after_billing_form` | Po formularzu danych płatności |
| `after_shipping_form` | Po formularzu danych dostawy |
| `before_payment_methods` | Przed wyborem metody płatności |

Kliknij **Dalej**, aby przejść do podsumowania.

---

## Krok 4: Aktywacja modułów

Na podstawie Twoich odpowiedzi kreator zaproponuje listę modułów do aktywacji:

### Moduły zalecane (automatycznie zaznaczone)

- Omnibus - śledzenie historii cen
- Przycisk zamówienia - tekst zgodny z prawem
- Checkboxy prawne - skonfigurowane w poprzednim kroku
- Strony prawne - wygenerowane w kroku 2
- Prawo do odstąpienia - formularz i pouczenie
- Czas dostawy - informacja na karcie produktu
- GPSR - dane bezpieczeństwa produktu

### Moduły opcjonalne (do zaznaczenia ręcznie)

- Wyszukiwanie NIP - jeśli sprzedajesz firmom (B2B)
- Wartości odżywcze - jeśli sprzedajesz żywność
- Alergeny - jeśli sprzedajesz żywność
- Lista życzeń - jeśli chcesz tę funkcję w sklepie
- Porównywarka - jeśli masz produkty do porównywania
- DSA - jeśli prowadzisz marketplace

Zaznacz moduły, które chcesz włączyć, i kliknij **Dalej**.

---

## Krok 5: Podsumowanie i zastosowanie

Ostatni krok wyświetla podsumowanie wszystkich ustawień:

```
Dane firmy:
  Nazwa: Jan Kowalski E-Commerce
  NIP: 1234567890
  Adres: ul. Handlowa 5/10, 31-001 Kraków

Strony prawne:
  Regulamin: Zostanie utworzony (nowa strona)
  Polityka prywatności: Zostanie utworzona (nowa strona)
  Polityka zwrotów: Zostanie utworzona (nowa strona)

Checkboxy: 4 (3 obowiązkowe, 1 opcjonalny)

Moduły do aktywacji: 7
  - Omnibus
  - Przycisk zamówienia
  - Checkboxy prawne
  - Strony prawne
  - Prawo do odstąpienia
  - Czas dostawy
  - GPSR
```

Sprawdź podsumowanie i kliknij **Zastosuj konfigurację**. Kreator:

1. Zapisze dane firmy w ustawieniach wtyczki
2. Utworzy strony prawne (jeśli wybrano generowanie)
3. Przypisze strony do ustawień WooCommerce
4. Skonfiguruje checkboxy na stronie kasy
5. Aktywuje wybrane moduły

Po zakończeniu zobaczysz komunikat potwierdzający i link do dashboardu zgodności.

---

## Po zakończeniu kreatora

### Sprawdź stronę produktu

Otwórz dowolny produkt w swoim sklepie i sprawdź, czy pojawiły się nowe elementy:

- Informacja o najniższej cenie (Omnibus) - widoczna przy produktach z obniżką
- Szacowany czas dostawy
- Dane GPSR (producent, osoba odpowiedzialna)

### Sprawdź stronę kasy

Dodaj produkt do koszyka i przejdź do kasy:

- Sprawdź, czy checkboxy wyświetlają się prawidłowo
- Sprawdź, czy przycisk ma tekst "Zamawiam z obowiązkiem zapłaty"
- Spróbuj złożyć zamówienie bez zaznaczania checkboxów - powinien pojawić się komunikat o błędzie

### Sprawdź strony prawne

Otwórz wygenerowane strony i sprawdź ich treść:

- Czy dane firmy są prawidłowe (shortcody powinny wyświetlać aktualne dane)
- Czy struktura dokumentu jest kompletna
- Czy linki wewnętrzne działają

### Dashboard zgodności

Przejdź do **WooCommerce > Polski > Zgodność** - po poprawnej konfiguracji większość wskaźników powinna być zielona. Elementy wymagające dodatkowej uwagi będą oznaczone żółtym statusem z instrukcją, co należy uzupełnić.

---

## Ponowne uruchomienie kreatora

Kreator można uruchomić ponownie w dowolnym momencie:

1. Przejdź do **WooCommerce > Polski > Ustawienia**
2. Kliknij **Uruchom kreator ponownie**
3. Pola będą wypełnione wcześniej zapisanymi danymi
4. Zmień to, co potrzebujesz, i kliknij **Zastosuj konfigurację**

Kreator nie usunie stron prawnych ani nie zresetuje modułów, które już skonfigurowałeś ręcznie.

---

## Rozwiązywanie problemów

### Strony prawne nie zostały utworzone

- Sprawdź, czy Twoje konto WordPress ma uprawnienia administratora
- Sprawdź, czy w **Ustawienia > Bezpośrednie odnośniki** jest ustawiony format inny niż "Zwykły"
- Spróbuj utworzyć strony ręcznie i przypisać je w **WooCommerce > Ustawienia > Zaawansowane > Ustawienia strony**

### Checkboxy nie wyświetlają się na kasie

- Upewnij się, że moduł "Checkboxy prawne" jest aktywny w **WooCommerce > Polski > Moduły**
- Jeśli używasz niestandardowego szablonu kasy, sprawdź czy obsługuje hooki WooCommerce
- Wyczyść cache wtyczek cachujących (WP Super Cache, W3 Total Cache, LiteSpeed Cache)

### Kreator się nie uruchamia

- Wyczyść cache przeglądarki i spróbuj ponownie
- Sprawdź konsolę przeglądarki (F12) pod kątem błędów JavaScript
- Dezaktywuj tymczasowo inne wtyczki, które mogą powodować konflikt

Jeśli problem nie ustępuje, zgłoś go na [GitHub Issues](https://github.com/wppoland/polski/issues) z opisem problemu i zrzutem ekranu. Społeczność chętnie pomoże na [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
