---
title: Odzyskiwanie porzuconych koszykow
description: Modul automatycznego sledzenia, odzyskiwania i analizy porzuconych koszykow WooCommerce w Polski PRO.
---

Modul porzuconych koszykow sledzi aktywne koszyki WooCommerce, wykrywa porzucenia i automatycznie wysyla emaile odzyskujace z linkiem do przywrocenia koszyka jednym kliknieciem.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Jak to dziala

1. Klient dodaje produkty do koszyka - system zaczyna sledzic koszyk
2. Jesli klient opusci sklep i nie wroci przez 1 godzine - koszyk oznaczany jako **porzucony**
3. System wysyla do 3 emaili odzyskujacych (po 1h, 24h i 72h)
4. Klient klika link w emailu - koszyk jest przywracany z produktami i kuponami
5. Jesli klient sfinalizuje zamowienie - koszyk oznaczany jako **skonwertowany** lub **odzyskany**

## Konfiguracja

Przejdz do **Polski PRO > Moduly** i wlacz modul **Porzucone koszyki**.

### Ustawienia ogolne

| Ustawienie | Opis | Domyslnie |
|------------|------|-----------|
| Timeout porzucenia | Po jakim czasie (sekundy) koszyk uznac za porzucony | 3600 (1h) |
| Emaile odzyskujace | Wlacz/wylacz automatyczne emaile | Tak |
| Czyszczenie danych | Po ilu dniach usunac stare koszyki | 90 |
| Ukryj IP | Nie zapisuj adresow IP klientow (RODO) | Nie |

### Ustawienia emaili

Kazdy z 3 emaili ma konfigurowalne:

| Pole | Email 1 | Email 2 | Email 3 |
|------|---------|---------|---------|
| Opoznienie | 1 godzina | 24 godziny | 72 godziny |
| Temat | Zapomniałeś o swoim koszyku? | Twoj koszyk wciaz czeka | Ostatnia szansa |
| Tresc | Konfigurowalna | Konfigurowalna | Konfigurowalna |

Emaile zawieraja:
- Podsumowanie produktow w koszyku (zdjecia, nazwy, ilosci, ceny)
- Laczna wartosc koszyka
- Przycisk CTA z linkiem odzyskujacym

## Statusy koszykow

| Status | Opis |
|--------|------|
| Active | Klient aktywnie przegladza sklep |
| Abandoned | Klient opuscil sklep i nie wrocil po timeout |
| Converted | Klient zlozyl zamowienie (bez emaila odzyskujacego) |
| Recovered | Klient wrocil przez link odzyskujacy i zlozyl zamowienie |

## Panel admina

Panel dostepny w **WooCommerce > Abandoned Carts**.

### Zakladka: Lista koszykow

- Filtrowanie po statusie
- Kolumny: ID, email, status, produkty, wartosc, ostatnia aktywnosc, emaile wyslane
- Szczegoly koszyka: pelna lista produktow, link odzyskujacy, dane klienta
- Akcja: **Utworz zamowienie z koszyka** (dla porzuconych)

### Zakladka: Analityka

Metryki:
- **Laczna liczba koszykow** - wszystkie sledzonde koszyki
- **Wskaznik porzucen** - % koszykow ktore zostaly porzucone
- **Wskaznik konwersji** - % koszykow ktore zamienily sie w zamowienia
- **Wskaznik odzyskan** - % porzuconych koszykow odzyskanych przez emaile
- **Odzyskany przychod** - laczna wartosc zamowien z odzyskanych koszykow

## Link odzyskujacy

Kazdy porzucony koszyk ma unikalny 32-znakowy klucz odzyskiwania. Link:

```
https://twojsklep.pl/koszyk/?recover_cart={klucz}
```

Po kliknieciu:
1. Aktualny koszyk jest czyszczony
2. Produkty z porzuconego koszyka sa dodawane
3. Kupony sa przywracane
4. Klient jest przekierowywany na checkout
5. Koszyk zmienia status na **recovered**

## Harmonogram (Cron)

Modul uzywa wlasnego crona uruchamianego co 15 minut (`polski_abandoned_cart_cron`):

1. Oznacza koszyki jako porzucone (po timeout)
2. Wysyla emaile odzyskujace (wg harmonogramu)
3. Usuwa stare koszyki (po X dniach)

## RODO / Prywatnosc

- Opcja ukrywania adresow IP klientow
- Automatyczne czyszczenie starych danych (konfigurowalne)
- Emaile odzyskujace mozna wylaczyc globalnie
- Dane koszyka sa usuwane przy odinstalowaniu wtyczki (jesli wlaczona opcja usuwania danych)

## Baza danych

Modul tworzy dwie tabele:

- `wp_polski_carts` - dane koszykow (status, wartosc, email, klucz odzyskiwania)
- `wp_polski_cart_contents` - snapshoty zawartosci (JSON z historia zmian)

Tabele tworzone automatycznie przy migracji 1.8.0.
