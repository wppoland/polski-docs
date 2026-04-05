---
title: Konfiguracja wtyczki
description: Pierwsze kroki po instalacji wtyczki Polski for WooCommerce. Włączanie modułów, dashboard zgodności, przegląd ustawień i dostosowanie do potrzeb sklepu.
---

## Panel główny wtyczki

Po instalacji i aktywacji wtyczki przejdź do **WooCommerce > Polski** w menu panelu administracyjnego. Zobaczysz panel główny (dashboard) podzielony na kilka sekcji:

- **Status zgodności** - szybki przegląd, które wymagania prawne są spełnione
- **Aktywne moduły** - lista włączonych modułów z linkami do ich ustawień
- **Wymagane działania** - powiadomienia o brakujących konfiguracjach
- **Szybkie linki** - odnośniki do najważniejszych ustawień

![Dashboard modułów Polski for WooCommerce](../../../assets/screenshots/screenshot-1-modules-dashboard.png)

:::tip[Kreator konfiguracji]
Jeśli dopiero zaczynasz, zalecamy skorzystanie z [kreatora konfiguracji](getting-started/wizard/), który przeprowadzi Cię przez najważniejsze ustawienia krok po kroku. Kreator można uruchomić ponownie w dowolnym momencie z poziomu dashboardu.
:::

---

## Włączanie i wyłączanie modułów

Wtyczka działa modułowo - domyślnie po instalacji żaden moduł nie jest aktywny. Dzięki temu wtyczka nie wpływa na wydajność sklepu, dopóki nie włączysz konkretnych funkcji.

### Jak włączyć moduł

1. Przejdź do **WooCommerce > Polski > Moduły**
2. Znajdź interesujący Cię moduł na liście
3. Kliknij przełącznik obok nazwy modułu, aby go włączyć
4. Kliknij **Zapisz zmiany** na dole strony

### Jak wyłączyć moduł

Procedura jest identyczna - kliknij przełącznik przy aktywnym module, aby go wyłączyć. Wyłączenie modułu nie usuwa zapisanych danych, więc możesz go ponownie włączyć bez utraty konfiguracji.

### Zalecane moduły na start

Dla typowego polskiego sklepu internetowego zalecamy włączenie następujących modułów jako minimum:

| Moduł | Dlaczego jest ważny |
|-------|-------------------|
| Omnibus | Wymagany prawnie - wyświetlanie historii cen |
| Przycisk zamówienia | Wymagany prawnie - "Zamawiam z obowiązkiem zapłaty" |
| Checkboxy prawne | Wymagane prawnie - zgody przy składaniu zamówienia |
| Strony prawne | Regulamin i polityka prywatności |
| Prawo do odstąpienia | Wymagane prawnie - formularz i pouczenie o odstąpieniu |
| Czas dostawy | Zalecany - szacowany czas dostawy na karcie produktu |
| GPSR | Wymagany od 13.12.2024 - dane bezpieczeństwa produktu |

---

## Dashboard zgodności

Dashboard zgodności to centralne miejsce, w którym sprawdzisz stan prawny swojego sklepu. Przejdź do **WooCommerce > Polski > Zgodność**, aby zobaczyć:

### Wskaźniki statusu

Każdy wymóg prawny ma jeden z trzech statusów:

- **Zgodny** (zielony) - wymóg jest spełniony, konfiguracja jest kompletna
- **Wymaga uwagi** (żółty) - moduł jest włączony, ale brakuje części konfiguracji
- **Niezgodny** (czerwony) - moduł jest wyłączony lub konfiguracja jest niekompletna

### Lista kontrolna

Dashboard wyświetla listę kontrolną z konkretnymi krokami do wykonania:

```
[x] Przycisk zamówienia - tekst zgodny z prawem
[x] Omnibus - wyświetlanie historii cen włączone
[ ] Regulamin - strona regulaminu nie jest przypisana
[ ] Polityka prywatności - strona nie jest przypisana
[ ] GPSR - brak danych producenta na 12 produktach
```

Kliknij dowolny element listy, aby przejść bezpośrednio do odpowiednich ustawień.

---

## Konfiguracja poszczególnych grup modułów

### Wymogi prawne

Przejdź do **WooCommerce > Polski > Zgodność prawna**, aby skonfigurować:

**Omnibus (dyrektywa cenowa)**

1. Włącz moduł Omnibus
2. Ustaw okres śledzenia cen (domyślnie 30 dni)
3. Wybierz format wyświetlania najniższej ceny
4. Zapisz zmiany

Wtyczka automatycznie zacznie rejestrować historię cen od momentu aktywacji modułu.

**GPSR (bezpieczeństwo produktów)**

1. Włącz moduł GPSR
2. Uzupełnij dane domyślnego producenta w ustawieniach globalnych
3. Dla poszczególnych produktów - edytuj dane w zakładce "GPSR" na stronie edycji produktu

**Strony prawne**

1. Włącz moduł stron prawnych
2. Użyj generatora do utworzenia regulaminu, polityki prywatności i polityki zwrotów
3. Przypisz wygenerowane strony w **WooCommerce > Ustawienia > Zaawansowane > Ustawienia strony**

### Ceny i informacje o produkcie

Przejdź do **WooCommerce > Polski > Ceny**, aby skonfigurować:

**Ceny jednostkowe**

1. Włącz moduł cen jednostkowych
2. Wybierz domyślną jednostkę miary (kg, l, m, szt.)
3. Na karcie produktu uzupełnij pole "Ilość bazowa" i "Jednostka miary"

Przykład konfiguracji w edytorze produktu:

```
Cena produktu: 15,99 zł
Ilość bazowa: 500
Jednostka miary: g
Jednostka referencyjna: kg

Wynik: 15,99 zł / 500g (31,98 zł/kg)
```

**Czas dostawy**

1. Włącz moduł czasu dostawy
2. Ustaw domyślny czas dostawy (np. "1-3 dni robocze")
3. Opcjonalnie - ustaw indywidualny czas dla poszczególnych produktów

### Kasa i zamówienia

Przejdź do **WooCommerce > Polski > Kasa**, aby skonfigurować:

**Przycisk zamówienia**

1. Włącz moduł
2. Domyślny tekst to "Zamawiam z obowiązkiem zapłaty"
3. Możesz dostosować tekst, ale musi spełniać wymogi art. 17 ustawy o prawach konsumenta

**Checkboxy prawne**

1. Włącz moduł checkboxów
2. Dodaj wymagane zgody (regulamin, polityka prywatności)
3. Skonfiguruj treść każdego checkboxa, w tym linki do stron prawnych
4. Oznacz, które checkboxy są obowiązkowe

Przykład konfiguracji checkboxa:

```
Etykieta: regulamin
Treść: Zapoznałem/am się z [regulaminem] i akceptuję jego postanowienia.
Wymagany: Tak
Link: /regulamin/
Pozycja: Przed przyciskiem zamówienia
```

**Wyszukiwanie NIP**

1. Włącz moduł NIP
2. Pole NIP pojawi się automatycznie na stronie kasy
3. Po wpisaniu NIP i kliknięciu "Sprawdź" dane firmy uzupełnią się automatycznie z bazy GUS

### Produkty spożywcze

Te moduły są przeznaczone dla sklepów sprzedających żywność. Przejdź do **WooCommerce > Polski > Żywność**.

1. Włącz potrzebne moduły (wartości odżywcze, alergeny, Nutri-Score)
2. Na stronie edycji produktu pojawią się nowe zakładki do uzupełnienia danych
3. Dane wyświetlą się automatycznie na karcie produktu w sklepie

### Moduły sklepowe

Przejdź do **WooCommerce > Polski > Sklep**, aby włączyć dodatkowe funkcje:

- Lista życzeń, porównywarka, szybki podgląd - włącz i dostosuj wygląd
- Wyszukiwarka AJAX - włącz i skonfiguruj liczbę wyświetlanych wyników
- Filtry AJAX - włącz i wybierz atrybuty do filtrowania
- Slider i odznaki - skonfiguruj styl i zachowanie

---

## Ustawienia globalne

W zakładce **WooCommerce > Polski > Ustawienia** znajdziesz opcje globalne:

### Dane firmy

Uzupełnij podstawowe dane swojej firmy:

- Nazwa firmy
- NIP
- REGON
- Adres siedziby
- Adres e-mail kontaktowy
- Numer telefonu

Te dane są wykorzystywane przez różne moduły (strony prawne, GPSR, DSA).

### Wydajność

- **Ładowanie zasobów** - CSS i JS ładowane tylko na stronach, gdzie są potrzebne
- **Cache** - wtyczka korzysta z Transients API WordPress do cachowania danych
- **Minifikacja** - zasoby front-endowe są zminifikowane

### Kompatybilność

Jeśli używasz niestandardowego motywu lub wtyczek, które powodują konflikty:

1. Przejdź do **WooCommerce > Polski > Ustawienia > Kompatybilność**
2. Włącz tryb kompatybilności dla problematycznych modułów
3. Dostosuj priorytety hooków, jeśli elementy wyświetlają się w złej kolejności

---

## Weryfikacja konfiguracji

Po skonfigurowaniu modułów warto sprawdzić, czy wszystko działa:

1. **Dashboard zgodności** - przejdź do **WooCommerce > Polski > Zgodność** i sprawdź, czy wszystkie wskaźniki są zielone
2. **Strona produktu** - otwórz dowolny produkt w sklepie i sprawdź, czy wyświetlają się nowe elementy (cena Omnibus, czas dostawy, dane GPSR)
3. **Strona kasy** - złóż testowe zamówienie i sprawdź, czy checkboxy i przycisk są prawidłowe
4. **Strony prawne** - otwórz regulamin i politykę prywatności i sprawdź ich treść

Możesz też uruchomić automatyczny audyt: **WooCommerce > Polski > Narzędzia > Audyt strony**.

---

## Następne kroki

- [Kreator konfiguracji](getting-started/wizard/) - automatyczna konfiguracja najważniejszych ustawień
- [Dashboard zgodności](tools/compliance-dashboard/) - monitorowanie stanu wymogów prawnych
- [Audyt strony](tools/site-audit/) - automatyczna weryfikacja konfiguracji

Masz pytanie? Napisz na [GitHub Discussions](https://github.com/wppoland/polski/discussions). Znalazłeś błąd? Zgłoś go na [GitHub Issues](https://github.com/wppoland/polski/issues).

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
