---
title: Formularz reklamacji do druku
description: Gotowy do wydruku formularz reklamacyjny - sekcja sprzedawcy wypelniana automatycznie z danych kreatora, sekcje kupujacego i wady puste do wypelnienia.
---

Modul **Formularz reklamacji** generuje gotowy do wydruku dokument reklamacji (formularz reklamacyjny) zgodny ze struktura wymagana przez Ustawe o prawach konsumenta i powszechnie uzywany wzor UOKiK. Sekcja sprzedawcy jest wstepnie wypelniana danymi z kreatora konfiguracji, sekcje kupujacego, produktu, opisu wady i zadanego rozwiazania pozostaja puste.

:::caution
To jest generyczny szablon startowy. Pomaga spelnic wymogi informacyjne, ale nie zastepuje konsultacji prawnej dla sklepow o nietypowej branzy (np. uslugi cyfrowe, produkty spozywcze, B2B).
:::

## Entry points

| Sposob uzycia    | Gdzie                                                  |
| ---------------- | ------------------------------------------------------ |
| Shortcode        | `[polski_complaint_template]` - osadza w tresci strony |
| Admin preview    | **Polski > Complaint template** - podglad i pobranie   |
| Pobranie HTML    | Przycisk **Download as HTML** - `text/html` z nagłowkiem `Content-Disposition: attachment` |

## Sekcje formularza

Renderowany dokument sklada sie z nastepujacych sekcji:

| Sekcja                | Zrodlo                                             | Edytowalna |
| --------------------- | -------------------------------------------------- | ---------- |
| Seller                | `polski_general.company_name/address/nip/email`    | Auto       |
| Customer              | Imie i nazwisko, adres, email, telefon             | Puste pola |
| Order and product     | Numer zamowienia, data zakupu, nazwa produktu      | Puste pola |
| Defect                | Opis wady, data wykrycia                           | Puste pola |
| Requested remedy      | Checkboxy: naprawa, wymiana, obnizka, odstapienie  | Do zaznaczenia |
| Bank account          | Numer IBAN do zwrotu                               | Puste pole |
| Signature             | Data i podpis                                      | Puste pole |

## Auto-uzupelniana sekcja sprzedawcy

Z opcji `polski_general` pobierane sa cztery pola:

| Klucz opcji       | Pole dokumentu        |
| ----------------- | --------------------- |
| `company_name`    | Nazwa sprzedawcy      |
| `company_address` | Adres                 |
| `company_nip`     | NIP (z prefiksem)     |
| `company_email`   | Email kontaktowy      |

Jesli zaden z tych kluczy nie jest wypelniony, sekcja Seller zawiera pusty wiersz do recznego uzupelnienia — dokument i tak jest poprawny strukturalnie.

## Zadane rozwiazanie

Kupujacy zaznacza jedno z czterech uprawnien wynikajacych z Art. 43a-43g Ustawy o prawach konsumenta:

- Naprawa (repair)
- Wymiana (replacement)
- Obnizenie ceny (price reduction) z pozadana kwota
- Odstapienie od umowy (withdrawal) ze zwrotem pelnej ceny

Wszystkie cztery checkboxy renderowane sa jako znaki `&#9744;` (pusty kwadrat Unicode) — kupujacy wypelnia na wydruku.

## Shortcode

```
[polski_complaint_template]
```

Osadzony na stronie **Reklamacje** w sklepie — klient moze wydrukowac bezposrednio z CSS `@media print`. Shortcode nie przyjmuje atrybutow (wszystkie dane sa z `polski_general`).

## Pobranie standalone HTML

Administrator moze pobrac formularz jako kompletny plik `.html` (wraz z `<!doctype>`, stylem print-friendly i meta charset). Przydatne do wyslania mailem lub zamieszczenia na serwerze jako statyczny plik.

- Nazwa: `polski-complaint-template-<YYYYMMDD>.html`
- Content-Type: `text/html; charset=utf-8`
- Zabezpieczenie: nonce `polski_complaint_download`, capability `manage_woocommerce`

## Styl druku

Wbudowany CSS w standalone HTML:

```css
body { max-width: 780px; margin: 40px auto; line-height: 1.5; }
.field { border-bottom: 1px solid #999; padding: 6px 0; }
.row { display: flex; gap: 24px; }
@media print { body { margin: 0 } .no-print { display: none } }
```

## Wlaczenie

Modul aktywny jest flaga `complaint_template` w **Polski > Moduly**. Wylaczony - shortcode i strona admin sie nie rejestruja.

## Ograniczenia

- Brak wyboru jezyka formularza (zawsze pl)
- Brak automatycznej integracji z zamowieniami WooCommerce (kupujacy wpisuje numer recznie)
- Brak PDF - tylko HTML (PDF planowany w PRO)
- Szablon nie wspiera podmiany logo sklepu
