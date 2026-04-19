---
title: Dokumentacja szkoleniowa RODO
description: Trzy szablony HTML do druku - dziennik szkolen, podsumowanie zasad RODO i playbook reagowania na naruszenia z 72-godzinnym terminem zgloszenia do UODO.
---

Modul **Dokumentacja szkoleniowa RODO** generuje trzy gotowe do wydruku dokumenty HTML pomocne przy wdrazaniu nowych pracownikow sklepu. Wszystkie sa prebrand'owane danymi firmy z kreatora konfiguracji (`polski_general.company_name` + NIP).

:::caution
Sa to generyczne szablony startowe. Adaptuj je do faktycznych procesow przetwarzania danych w Twoim sklepie — nie zastepuja one IOD ani konsultacji prawnej.
:::

## Trzy dokumenty

| Klucz             | Tytul                          | Zawartosc                                                          |
| ----------------- | ------------------------------ | ------------------------------------------------------------------ |
| `logbook`         | Training logbook               | Tabela 6-kolumnowa (data, pracownik, rola, tematy, trener, podpis), 10 pustych wierszy |
| `principles`      | RODO principles summary        | 7 zasad przetwarzania (Art. 5) + 8 praw podmiotu danych (Rozdz. III) + operacyjne przypomnienia |
| `breach_playbook` | Data breach response playbook  | 8-etapowy checklist + tabela dziennika incydentu z linkiem do uodo.gov.pl |

## Pobieranie

Przejdz do **Polski > RODO training docs**. Przy kazdym z trzech dokumentow znajduje sie przycisk **Download HTML**.

Pobrany plik:

- Nazwa: `polski-rodo-<klucz>-<YYYYMMDD>.html`
- Content-Type: `text/html; charset=utf-8`
- Standalone `<!doctype html>` z wbudowanym CSS do druku
- Zabezpieczenie: nonce `polski_rodo_training_download`, capability `manage_woocommerce`

## Naglowek dokumentu

Kazdy pobrany plik otwiera sekcja z danymi firmy:

```html
<div class="header">Sklep Polski Sp. z o.o. - NIP: 123-45-67-890</div>
<h1>Training logbook</h1>
```

Pola pochodza z `polski_general.company_name` i `polski_general.company_nip`.

## Training logbook

Tabela do prowadzenia rejestru szkolen. Jedna osoba = jeden wiersz. Kolumny:

1. Date
2. Employee
3. Role
4. Topics covered
5. Trainer
6. Signature

Dokument zawiera 10 pustych wierszy do recznego wypelnienia. Podpis pracownika potwierdza obecnosc i zrozumienie tresci.

## RODO principles summary

Jednostronicowy przewodnik zawierajacy:

**Siedem zasad przetwarzania (Art. 5):**
Lawfulness / fairness / transparency, purpose limitation, data minimisation, accuracy, storage limitation, integrity and confidentiality, accountability.

**Osiem praw podmiotu danych (Rozdzial III):**
Art. 15 dostep, Art. 16 sprostowanie, Art. 17 usuniecie, Art. 18 ograniczenie, Art. 19 zawiadomienie, Art. 20 przenoszenie, Art. 21 sprzeciw, Art. 22 brak zautomatyzowanego decydowania.

**Operacyjne przypomnienia:**
- Nigdy nie wysylaj tabel z danymi osobowymi przez email - tylko kanaly szyfrowane
- Weryfikuj tozsamosc zglaszajacego przed dostepem / usunieciem
- Loguj kazde ujawnienie do procesorow lub organow
- Zglaszaj podejrzenie naruszenia wewnetrznie w ciagu 24h

## Breach response playbook

Checklist 8-etapowy wynikajacy z Art. 33-34 RODO:

1. **Discovery** — zapisz timestamp, osobe wykrywajaca, dotkniete systemy
2. **Containment** — izoluj konta/systemy w ciagu 1h
3. **Internal notification** — IOD i management w ciagu 24h
4. **Assessment** — kategorie danych, liczba podmiotow, prawdopodobny impact
5. **UODO notification** — wymagane w 72h gdy ryzyko nie jest "mniej niz prawdopodobne"
6. **Subject notification** — "bez zbednej zwloki" gdy ryzyko jest wysokie
7. **Remediation** — patche, rotacja danych uwierzytelniajacych, review logow
8. **Post-mortem** — wnioski i aktualizacja szkolen

:::caution
72 godziny to maksimum — zgloszenie po tym terminie wymaga uzasadnienia opóznienia. UODO kanal: [uodo.gov.pl](https://uodo.gov.pl).
:::

### Tabela dziennika incydentu

Playbook zawiera tabele do uzupelnienia z 11 polami:

| Pole                           | Do wypelnienia                            |
| ------------------------------ | ----------------------------------------- |
| Incident ID                    | Wewnetrzny identyfikator                  |
| Detected at (UTC)              | Timestamp wykrycia                        |
| Detected by                    | Osoba / system                            |
| Affected systems               | Lista systemow                            |
| Affected data categories       | Email, adres, dane bankowe, zdrowotne...  |
| Approximate number of subjects | Szacunek                                  |
| Likely impact                  | Kradziez tozsamosci, fraud, ujawnienie    |
| Containment actions            | Reset hasel, blokada IP, backup           |
| UODO notified at               | Timestamp wyslania zgloszenia             |
| Subjects notified at           | Timestamp powiadomienia podmiotow         |
| Status                         | Open / Under investigation / Resolved     |

## Wlaczenie

Modul aktywny przez flage `rodo_training_docs` w **Polski > Moduly**. Wylaczenie ukrywa strone admin i anuluje handler pobierania.

## Styl druku

Wbudowany CSS:

```css
body { max-width: 820px; margin: 40px auto; line-height: 1.55 }
h1 { font-size: 24px } h2 { font-size: 18px } h3 { font-size: 14px }
table { width: 100%; border-collapse: collapse }
th, td { border: 1px solid #999; padding: 8px; vertical-align: top }
@media print { body { margin: 0 } }
```

## Ograniczenia

- Brak wersjonowania dokumentow — wygenerowany HTML nie ma audit trail
- Brak PDF (tylko HTML - planowany w PRO)
- Brak integracji z systemem HR — dziennik prowadzisz recznie
- Teksty w jezyku angielskim (polskie tlumaczenie wchodzi przez .po jesli wlaczone)
