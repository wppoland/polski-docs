---
title: "Promocje i ceny dynamiczne"
description: "Darmowy moduł cen dynamicznych w Polski for WooCommerce - automatyczne rabaty w koszyku: rabat ilościowy na pozycję produktu oraz procent od progu wartości koszyka. Domyślnie wyłączony."
---

Moduł **Promocje i ceny dynamiczne** dodaje dwa automatyczne rabaty w koszyku, konfigurowane w ustawieniach modułu. Jest częścią Polski for WooCommerce, darmowy, opcjonalny i domyślnie wyłączony.

## Co robi moduł

Po włączeniu moduł nalicza rabaty automatycznie podczas przeliczania koszyka, bez kodów rabatowych:

- **Rabat ilościowy (hurtowy)** - procent zniżki na pozycję produktu, gdy jej ilość osiągnie ustalony próg.
- **Rabat od wartości koszyka** - procent zniżki, gdy suma wartości koszyka osiągnie ustalony próg (naliczany jako ujemna opłata koszyka).

Rabaty liczone są za każdym razem od ceny regularnej, idempotentnie, więc są bezpieczne przy wielokrotnym przeliczaniu koszyka przez WooCommerce.

## Włączenie modułu

Moduł jest darmowy, opcjonalny i domyślnie wyłączony.

Przejdź do `WooCommerce › Polski › Modules`, grupa **Merchandising**, i włącz przełącznik **Promotions / dynamic pricing**.

## Ustawienia

Ustawienia modułu znajdują się przy jego karcie w sekcji `Modules`:

| Ustawienie | Opis |
|------------|------|
| **Bulk discount: minimum quantity per product** | Próg ilości na pozycję, od którego naliczany jest rabat ilościowy. Wartość `0` wyłącza rabat ilościowy. |
| **Bulk discount: percent off (%)** | Procent zniżki na pozycję, gdy ilość osiągnie próg. |
| **Cart discount: subtotal threshold** | Próg wartości koszyka, od którego naliczany jest rabat od koszyka. Wartość `0` wyłącza ten rabat. |
| **Cart discount: percent off (%)** | Procent zniżki od wartości koszyka po przekroczeniu progu. |

## Jak działają rabaty

### Rabat ilościowy

Gdy ilość danej pozycji w koszyku osiągnie próg **minimum quantity per product**, cena tej pozycji zostaje obniżona o ustalony procent. Rabat dotyczy każdej kwalifikującej się pozycji osobno.

Przykład: próg `10`, zniżka `15%`. Klient z 10 sztukami produktu otrzymuje 15% zniżki na tę pozycję; przy 9 sztukach rabat się nie nalicza.

### Rabat od wartości koszyka

Gdy suma wartości koszyka osiągnie próg **subtotal threshold**, do koszyka dodawana jest ujemna opłata o wartości ustalonego procentu sumy.

Przykład: próg `500`, zniżka `10%`. Koszyk za 500 i więcej otrzymuje 10% zniżki naliczonej jako rabat koszyka.

## Łączenie rabatów

Oba rabaty działają niezależnie i mogą obowiązywać jednocześnie: rabat ilościowy obniża ceny pozycji, a rabat od koszyka nalicza dodatkową zniżkę od wartości koszyka. Aby wyłączyć jeden z nich, ustaw jego próg na `0`.
