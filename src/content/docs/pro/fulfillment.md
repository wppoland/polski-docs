---
title: Realizacja zamowien i sledzenie
description: Modul statusow realizacji zamowien w Polski PRO - statusy Spakowane/Wyslane/Dostarczone, pole numeru sledzenia i automatyczne powiadomienia email.
---

Modul realizacji zamowien rozszerza domyslne statusy WooCommerce o trzy dodatkowe etapy: **Spakowane**, **Wyslane** i **Dostarczone**. Kazda zmiana statusu wysyla automatyczny email do klienta z informacja o sledzeniu.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Nowe statusy zamowien

Po wlaczeniu modulu, zamowienia moga przechodzic przez nastepujace statusy:

```
Oczekujace > Przetwarzane > Spakowane > Wyslane > Dostarczone > Zakonczone
```

| Status | Kolor | Opis |
|--------|-------|------|
| Spakowane (Packed) | Niebieski | Zamowienie zostalo spakowane i czeka na odbiór przez kuriera |
| Wyslane (Shipped) | Zolty | Paczka przekazana kurierowi, w transporcie |
| Dostarczone (Delivered) | Zielony | Paczka doreczona do klienta |

Statusy pojawiaja sie w panelu zamowien miedzy "Przetwarzane" a "Zakonczone".

## Konfiguracja

1. Przejdz do **Polski PRO > Moduly**
2. Wlacz modul **Realizacja zamowien**

Modul nie wymaga dodatkowej konfiguracji - statusy, pole sledzenia i emaile sa gotowe od razu.

## Pole sledzenia przesylki

W edytorze zamowienia, pod adresem wysylki, pojawia sie sekcja **Shipment Tracking**:

| Pole | Opis |
|------|------|
| Przewoznik | Wybor: InPost, DPD, DHL, Poczta Polska, Inny |
| Numer sledzenia | Numer listu przewozowego |
| URL sledzenia | Generowany automatycznie na podstawie przewoznika i numeru |

Po wybraniu przewoznika i wpisaniu numeru sledzenia, link do trackingu jest generowany automatycznie. Mozesz tez wpisac wlasny URL reczne.

### Automatyczne linki do sledzenia

| Przewoznik | Format URL |
|------------|-----------|
| InPost | `inpost.pl/sledzenie-przesylek?number={numer}` |
| DPD | `tracktrace.dpd.com.pl/findPackage?q={numer}` |
| DHL | `dhl.com/pl-pl/home/sledzenie-przesylek.html?tracking-id={numer}` |
| Poczta Polska | `emonitoring.poczta-polska.pl/?numer={numer}` |

## Powiadomienia email

Przy kazdej zmianie statusu system wysyla email do klienta z:

- Numerem zamowienia
- Nowym statusem
- Nazwa przewoznika (jesli ustawiona)
- Numerem sledzenia (jesli ustawiony)
- Linkiem do sledzenia przesylki
- Linkiem do podgladu zamowienia w Moje Konto

Emaile sa wysylane automatycznie - nie wymagaja recznej akcji.

## Akcje masowe

Na liscie zamowien dostepne sa akcje masowe:

- **Zmien status na Spakowane**
- **Zmien status na Wyslane**
- **Zmien status na Dostarczone**

Zaznacz wiele zamowien i wybierz akcje z menu rozwijanego.

## Kompatybilnosc

Modul dziala z:

- WooCommerce HPOS (Custom Order Tables)
- WooCommerce klasyczne zamowienia (posts)
- Wszystkimi motywami WooCommerce
- Integracjami kurierskimi Polski PRO (InPost, DPD, DHL)

Statusy sa widoczne rowniez w REST API WooCommerce i w raportach.
