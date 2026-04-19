---
title: Wlasne statusy zamowien
description: Tworzenie wlasnych statusow zamowien z kolorami, ikonami i powiadomieniami email.
---

Modul pozwala tworzyc dowolne statusy zamowien WooCommerce z konfigurowalnym wyglad i automatycznymi emailami.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfiguracja

Przejdz do **WooCommerce > Order Statuses**.

## Tworzenie statusu

| Pole | Opis |
|------|------|
| Slug | Identyfikator statusu (max 17 znakow, np. quality_check) |
| Label | Wyswietlana nazwa (np. "Kontrola jakosci") |
| Color | Kolor tla badge statusu (hex) |
| Icon | Klasa dashicon (np. dashicons-yes) |
| Email | Czy wysylac email przy zmianie na ten status |
| Email subject | Temat emaila (obsluguje tokeny) |
| Email body | Tresc emaila HTML (obsluguje tokeny) |

## Tokeny w emailach

| Token | Opis |
|-------|------|
| `{order_id}` | ID zamowienia |
| `{order_number}` | Numer zamowienia |
| `{first_name}` | Imie klienta |
| `{last_name}` | Nazwisko klienta |
| `{status_from}` | Poprzedni status |
| `{status_to}` | Nowy status |
| `{site_title}` | Nazwa sklepu |

## Funkcje

- Statusy widoczne w dropdownie zmian statusu zamowienia
- Kolorowe badge w liscie zamowien
- Akcje masowe (bulk actions) dla kazdego statusu
- Automatyczne emaile WooCommerce (owinięte w szablon)
- Nieograniczona liczba statusow
