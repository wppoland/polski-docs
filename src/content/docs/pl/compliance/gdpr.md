---
title: RODO - ochrona danych osobowych
description: Konfiguracja zgód RODO w Polski for WooCommerce - 7 checkboxów, logowanie zgód, API shortcode i zgodność z Rozporządzeniem o ochronie danych osobowych.
---

Rozporządzenie o Ochronie Danych Osobowych (RODO/GDPR) wymaga od sklepów internetowych uzyskania wyraźnej zgody na przetwarzanie danych osobowych. Polski for WooCommerce dostarcza 7 konfigurowalnych checkboxów na stronie zamówienia, system logowania zgód oraz narzędzia do zarządzania zgodami klientów.

## Wymagane zgody w polskim e-commerce

Zgodnie z RODO, ustawą o prawach konsumenta i ustawą o świadczeniu usług drogą elektroniczną, sklep internetowy powinien zbierać zgody na:

1. Akceptację regulaminu sklepu
2. Zapoznanie się z polityką prywatności
3. Prawo do odstąpienia od umowy (potwierdzenie zapoznania)
4. Zgoda na dostarczenie treści cyfrowych przed upływem terminu odstąpienia
5. Powiadomienia o dostawie (SMS/e-mail)
6. Przypomnienia o recenzji
7. Marketing (newsletter, oferty handlowe)

## Konfiguracja checkboxów

Przejdź do **WooCommerce > Ustawienia > Polski > RODO** aby skonfigurować poszczególne zgody.

### 1. Regulamin sklepu

Obowiązkowy checkbox linkujący do strony regulaminu.

| Ustawienie | Opis |
|------------|------|
| Tekst | Konfigurowalny, domyślnie: "Zapoznałem/am się z [regulaminem] i akceptuję jego warunki" |
| Wymagany | Tak (zawsze) |
| Strona regulaminu | Wybierz ze stron WordPress |

### 2. Polityka prywatności

Obowiązkowy checkbox linkujący do polityki prywatności.

| Ustawienie | Opis |
|------------|------|
| Tekst | Domyślnie: "Zapoznałem/am się z [polityką prywatności]" |
| Wymagany | Tak (zawsze) |
| Strona polityki | Wybierz ze stron WordPress |

### 3. Prawo do odstąpienia od umowy

Informacja o zapoznaniu się z warunkami odstąpienia.

| Ustawienie | Opis |
|------------|------|
| Tekst | Domyślnie: "Zapoznałem/am się z warunkami [odstąpienia od umowy]" |
| Wymagany | Tak |
| Strona odstąpienia | Wybierz ze stron WordPress |

### 4. Treści cyfrowe

Zgoda wymagana przy sprzedaży treści cyfrowych (np. e-booki, pliki do pobrania).

| Ustawienie | Opis |
|------------|------|
| Tekst | Domyślnie: "Wyrażam zgodę na dostarczenie treści cyfrowych przed upływem terminu do odstąpienia od umowy i przyjmuję do wiadomości utratę prawa do odstąpienia" |
| Wymagany | Tak (gdy koszyk zawiera produkty cyfrowe) |
| Warunek | Wyświetlaj tylko gdy koszyk zawiera produkty wirtualne lub do pobrania |

### 5. Powiadomienia o dostawie

Zgoda na wysyłanie powiadomień SMS/e-mail o statusie przesyłki.

| Ustawienie | Opis |
|------------|------|
| Tekst | Domyślnie: "Wyrażam zgodę na otrzymywanie powiadomień o statusie dostawy" |
| Wymagany | Nie |
| Kanał | E-mail, SMS lub oba |

### 6. Przypomnienie o recenzji

Zgoda na wysłanie e-maila z prośbą o wystawienie recenzji po zakupie.

| Ustawienie | Opis |
|------------|------|
| Tekst | Domyślnie: "Wyrażam zgodę na otrzymanie e-maila z prośbą o wystawienie opinii o zakupionym produkcie" |
| Wymagany | Nie |
| Opóźnienie | Liczba dni po dostawie (domyślnie 7) |

### 7. Marketing

Zgoda na komunikację marketingową.

| Ustawienie | Opis |
|------------|------|
| Tekst | Domyślnie: "Wyrażam zgodę na otrzymywanie informacji handlowych drogą elektroniczną" |
| Wymagany | Nie |
| Zakres | Newsletter, oferty, promocje |

## Logowanie zgód

Każda udzielona zgoda jest rejestrowana w bazie danych z następującymi informacjami:

| Pole | Opis |
|------|------|
| ID użytkownika | ID klienta WordPress (lub 0 dla gości) |
| ID zamówienia | Numer zamówienia WooCommerce |
| Typ zgody | Identyfikator checkboxa (np. `terms`, `privacy`, `marketing`) |
| Wartość | `granted` lub `denied` |
| Adres IP | Zanonimizowany adres IP klienta |
| User Agent | Przeglądarka i system operacyjny |
| Znacznik czasu | Data i godzina udzielenia zgody (UTC) |
| Wersja dokumentu | Hash wersji regulaminu/polityki w momencie udzielenia zgody |

### Przeglądanie logów zgód

Logi zgód są dostępne w:

- **Zamówienie WooCommerce** - zakładka "Zgody RODO" w panelu bocznym zamówienia
- **Profil użytkownika** - sekcja "Historia zgód" w profilu klienta w panelu administracyjnym
- **Eksport** - możliwość eksportu logów do CSV (**WooCommerce > Ustawienia > Polski > RODO > Eksportuj logi**)

### Anonimizacja IP

Domyślnie wtyczka anonimizuje ostatni oktet adresu IPv4 (np. `192.168.1.xxx`) i ostatnią grupę IPv6. Zachowuje to zgodność z RODO przy jednoczesnym utrzymaniu minimalnej użyteczności logów.

## Shortcode API

### Wyświetlanie statusu zgód klienta

```
[polski_consent_status]
```

Wyświetla zalogowanemu klientowi listę udzielonych zgód z możliwością ich wycofania (tam gdzie to prawnie dopuszczalne - np. zgoda marketingowa).

### Formularz wycofania zgody marketingowej

```
[polski_consent_withdraw type="marketing"]
```

Wyświetla formularz pozwalający klientowi wycofać zgodę marketingową. Po wycofaniu system automatycznie aktualizuje status zgody w bazie danych.

### Parametry shortcode

| Parametr | Opis | Dostępne wartości |
|----------|------|-------------------|
| `type` | Typ zgody | `terms`, `privacy`, `withdrawal_right`, `digital_content`, `delivery_notifications`, `review_reminder`, `marketing` |

## Integracja z WooCommerce Blocks

Checkboxy zgód są automatycznie dodawane do blokowego formularza zamówienia (WooCommerce Blocks Checkout). Nie jest wymagana żadna dodatkowa konfiguracja.

## Prawo do bycia zapomnianym

Wtyczka integruje się z narzędziem WordPress do usuwania danych osobowych (**Narzędzia > Usuń dane osobowe**). Po zatwierdzeniu żądania usunięcia danych system automatycznie:

1. Anonimizuje dane w logach zgód
2. Usuwa dane osobowe z formularzy odstąpienia
3. Zachowuje anonimizowane wpisy do celów rozliczalności

## Prawo do przenoszenia danych

Wtyczka integruje się z narzędziem eksportu danych WordPress (**Narzędzia > Eksportuj dane osobowe**). Eksport zawiera:

- Historię udzielonych zgód
- Dane z formularzy (zanonimizowane)
- Preferencje komunikacyjne

## Rozwiązywanie problemów

**Checkboxy nie wyświetlają się na stronie zamówienia**
Sprawdź, czy moduł RODO jest włączony w **WooCommerce > Ustawienia > Polski > Moduły**. Jeśli używasz blokowego formularza zamówienia, upewnij się, że WooCommerce jest zaktualizowany do wersji 8.0+.

**Klient zgłasza brak możliwości złożenia zamówienia**
Sprawdź, czy wymagane checkboxy nie są zduplikowane przez inną wtyczkę (np. Germanized, WPML). Wyłącz inne wtyczki dodające zgody i używaj wyłącznie modułu Polski for WooCommerce.

**Logi zgód nie zapisują adresu IP**
Sprawdź, czy serwer prawidłowo przekazuje adres IP. Za reverse proxy (np. Cloudflare) może być konieczne skonfigurowanie nagłówka `X-Forwarded-For` w WordPress.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dyskusje i pytania: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
