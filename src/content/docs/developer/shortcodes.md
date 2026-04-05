---
title: Shortcody
description: Kompletna lista 23 shortcodów Polski for WooCommerce z parametrami, przykładami użycia i kodem PHP.
---

23 shortcody do wyświetlania danych prawnych, informacji o produkcie i modułów sklepowych w dowolnym miejscu.

## Shortcody wymogów prawnych

### `[polski_gpsr]`

Wyświetla informacje GPSR (General Product Safety Regulation) dla produktu.

**Parametry:**

| Parametr     | Typ    | Domyślnie  | Opis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktualny) | ID produktu                   |
| `fields`     | string | `all`      | Pola do wyświetlenia          |
| `layout`     | string | `list`     | Układ: list, table, inline    |

**Przykład:**

```html
[polski_gpsr product_id="123" fields="manufacturer,contact,safety" layout="table"]
```

**W szablonie PHP:**

```php
echo do_shortcode('[polski_gpsr]'); // Na stronie produktu - automatycznie pobiera ID
```

### `[polski_omnibus_price]`

Wyświetla najniższą cenę z ostatnich 30 dni (dyrektywa Omnibus).

**Parametry:**

| Parametr     | Typ    | Domyślnie  | Opis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktualny) | ID produktu                   |
| `days`       | int    | `30`       | Liczba dni wstecz             |
| `label`      | string | (domyślny) | Tekst etykiety                |
| `show_date`  | string | `no`       | Pokaż datę najniższej ceny   |

**Przykład:**

```html
[polski_omnibus_price product_id="456" label="Najniższa cena z 30 dni:" show_date="yes"]
```

### `[polski_withdrawal_form]`

Wyświetla formularz odstąpienia od umowy.

**Parametry:**

| Parametr    | Typ    | Domyślnie | Opis                            |
| ----------- | ------ | --------- | ------------------------------- |
| `order_id`  | int    | (pusty)   | Wstępne wypełnienie nr zamówienia |
| `show_info` | string | `yes`     | Pokaż informacje o prawie odstąpienia |
| `redirect`  | string | (pusty)   | URL przekierowania po wysłaniu  |

**Przykład:**

```html
[polski_withdrawal_form show_info="yes"]
```

**Dedykowana strona odstąpienia:**

Utwórz stronę o slug `odstapienie-od-umowy` i wstaw:

```html
<h2>Formularz odstąpienia od umowy</h2>
<p>Zgodnie z ustawą o prawach konsumenta masz 14 dni na odstąpienie od umowy.</p>
[polski_withdrawal_form]
```

### `[polski_dsa_report]`

Wyświetla formularz zgłoszenia nielegalnych treści (Digital Services Act).

**Parametry:**

| Parametr     | Typ    | Domyślnie | Opis                          |
| ------------ | ------ | --------- | ----------------------------- |
| `product_id` | int    | (pusty)   | ID produktu do zgłoszenia     |
| `categories` | string | `all`     | Kategorie zgłoszeń            |
| `show_info`  | string | `yes`     | Pokaż informacje o DSA        |

**Przykład:**

```html
[polski_dsa_report categories="illegal_content,counterfeit,safety"]
```

### `[polski_tax_notice]`

Wyświetla informację o podatku VAT i kosztach dostawy.

**Parametry:**

| Parametr      | Typ    | Domyślnie                  | Opis                     |
| ------------- | ------ | -------------------------- | ------------------------ |
| `text`        | string | `Cena zawiera VAT. Koszty dostawy obliczane przy kasie.` | Treść informacji |
| `link_text`   | string | `Koszty dostawy`           | Tekst linku              |
| `link_url`    | string | (pusty)                    | URL strony z kosztami    |

**Przykład:**

```html
[polski_tax_notice text="Cena brutto zawiera 23% VAT." link_text="Sprawdź koszty dostawy" link_url="/dostawa/"]
```

## Shortcody informacji o produkcie

### `[polski_unit_price]`

Wyświetla cenę jednostkową produktu (np. cena za kg, litr).

**Parametry:**

| Parametr     | Typ    | Domyślnie  | Opis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktualny) | ID produktu                   |
| `format`     | string | `auto`     | Format: auto, per_kg, per_l, per_m, per_unit |

**Przykład:**

```html
[polski_unit_price product_id="789" format="per_kg"]
```

### `[polski_delivery_time]`

Wyświetla szacowany czas dostawy.

**Parametry:**

| Parametr     | Typ    | Domyślnie  | Opis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktualny) | ID produktu                   |
| `format`     | string | `range`    | Format: range, exact, text    |
| `label`      | string | `Czas dostawy:` | Etykieta                 |

**Przykład:**

```html
[polski_delivery_time label="Wysyłka w:" format="range"]
```

### `[polski_manufacturer]`

Wyświetla informacje o producencie.

**Parametry:**

| Parametr     | Typ    | Domyślnie  | Opis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktualny) | ID produktu                   |
| `fields`     | string | `all`      | Pola: name, address, url, logo |
| `link`       | string | `yes`      | Linkuj do strony producenta   |

**Przykład:**

```html
[polski_manufacturer fields="name,logo" link="yes"]
```

### `[polski_nutrients]`

Wyświetla tabelę wartości odżywczych (dla produktów spożywczych).

**Parametry:**

| Parametr     | Typ    | Domyślnie  | Opis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktualny) | ID produktu                   |
| `per`        | string | `100g`     | Wartości na: 100g, 100ml, serving |
| `layout`     | string | `table`    | Układ: table, list, compact   |

**Przykład:**

```html
[polski_nutrients per="serving" layout="compact"]
```

### `[polski_allergens]`

Wyświetla listę alergenów (dla produktów spożywczych).

**Parametry:**

| Parametr     | Typ    | Domyślnie  | Opis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktualny) | ID produktu                   |
| `highlight`  | string | `bold`     | Wyróżnienie: bold, color, icon |
| `layout`     | string | `inline`   | Układ: inline, list           |

**Przykład:**

```html
[polski_allergens highlight="bold" layout="list"]
```

## Shortcody modułów sklepowych

### `[polski_wishlist]`

Wyświetla tabelę listy życzeń.

**Parametry:**

| Parametr    | Typ    | Domyślnie | Opis                          |
| ----------- | ------ | --------- | ----------------------------- |
| `columns`   | string | `all`     | Kolumny do wyświetlenia       |
| `max_items` | int    | `50`      | Limit produktów               |
| `show_empty`| string | `yes`     | Komunikat pustej listy        |

**Przykład:**

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### `[polski_compare]`

Wyświetla tabelę porównania produktów.

**Parametry:**

| Parametr       | Typ    | Domyślnie | Opis                          |
| -------------- | ------ | --------- | ----------------------------- |
| `columns`      | string | `all`     | Cechy do wyświetlenia         |
| `hide_similar` | string | `no`      | Ukryj identyczne cechy        |
| `show_remove`  | string | `yes`     | Przycisk usunięcia            |

**Przykład:**

```html
[polski_compare hide_similar="yes"]
```

### `[polski_ajax_search]`

Wyświetla wyszukiwarkę AJAX z podpowiedziami.

**Parametry:**

| Parametr      | Typ    | Domyślnie          | Opis                     |
| ------------- | ------ | ------------------- | ------------------------ |
| `placeholder` | string | `Szukaj produktów…` | Tekst zastępczy          |
| `width`       | string | `100%`              | Szerokość pola           |
| `show_icon`   | string | `yes`               | Ikona lupy               |
| `show_cat`    | string | `no`                | Filtr kategorii          |
| `limit`       | int    | `8`                 | Limit podpowiedzi        |

**Przykład:**

```html
[polski_ajax_search placeholder="Czego szukasz?" show_cat="yes" limit="10"]
```

### `[polski_ajax_filters]`

Wyświetla filtry AJAX do filtrowania produktów.

**Parametry:**

| Parametr     | Typ    | Domyślnie  | Opis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | string | `all`      | Typy filtrów                  |
| `style`      | string | `expanded` | Styl: expanded, compact, accordion |
| `show_count` | string | `yes`      | Liczniki produktów            |
| `show_reset` | string | `yes`      | Przycisk resetowania          |
| `columns`    | int    | `1`        | Kolumny filtrów               |
| `ajax`       | string | `yes`      | Tryb AJAX                     |

**Przykład:**

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion"]
```

### `[polski_product_slider]`

Wyświetla karuzelę produktów.

**Parametry:**

| Parametr         | Typ    | Domyślnie | Opis                          |
| ---------------- | ------ | --------- | ----------------------------- |
| `type`           | string | `latest`  | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`          | int    | `8`       | Limit produktów               |
| `columns`        | int    | `4`       | Kolumny desktop               |
| `columns_tablet` | int    | `2`       | Kolumny tablet                |
| `columns_mobile` | int    | `1`       | Kolumny mobile                |
| `category`       | string | (pusty)   | Slug kategorii                |
| `ids`            | string | (pusty)   | ID produktów                  |
| `arrows`         | string | `yes`     | Strzałki nawigacji            |
| `dots`           | string | `no`      | Kropki paginacji              |
| `autoplay`       | string | `no`      | Autoplay                      |
| `autoplay_speed` | int    | `5000`    | Przerwa w ms                  |
| `title`          | string | (pusty)   | Nagłówek                      |
| `orderby`        | string | `date`    | Sortowanie                    |
| `order`          | string | `DESC`    | Kierunek                      |

**Przykład:**

```html
[polski_product_slider type="sale" limit="12" title="Promocje" arrows="yes" dots="yes"]
```

### `[polski_nutri_score]`

Wyświetla ocenę Nutri-Score produktu spożywczego.

**Parametry:**

| Parametr     | Typ    | Domyślnie  | Opis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktualny) | ID produktu                   |
| `size`       | string | `medium`   | Rozmiar: small, medium, large |

**Przykład:**

```html
[polski_nutri_score product_id="321" size="large"]
```

### `[polski_checkout_button]`

Wyświetla przycisk zakupu z etykietą prawnie zgodną z dyrektywą UE.

**Parametry:**

| Parametr | Typ    | Domyślnie                    | Opis             |
| -------- | ------ | ---------------------------- | ---------------- |
| `text`   | string | `Zamówienie z obowiązkiem zapłaty` | Tekst przycisku |
| `class`  | string | (pusty)                      | Dodatkowa klasa CSS |

**Przykład:**

```html
[polski_checkout_button text="Kupuję i płacę" class="my-checkout-btn"]
```

### `[polski_legal_checkboxes]`

Wyświetla checkboxy prawne poza kasą (np. na stronie rejestracji).

**Parametry:**

| Parametr   | Typ    | Domyślnie | Opis                          |
| ---------- | ------ | --------- | ----------------------------- |
| `location` | string | `custom`  | Lokalizacja: checkout, registration, contact, custom |
| `ids`      | string | (pusty)   | ID checkboxów do wyświetlenia |

**Przykład:**

```html
[polski_legal_checkboxes location="registration"]
```

### `[polski_nip_field]`

Wyświetla pole NIP z walidacją w czasie rzeczywistym (API VIES/GUS).

**Parametry:**

| Parametr   | Typ    | Domyślnie | Opis                          |
| ---------- | ------ | --------- | ----------------------------- |
| `required` | string | `no`      | Pole wymagane                 |
| `autofill` | string | `yes`     | Automatyczne uzupełnianie danych firmy |
| `label`    | string | `NIP`     | Etykieta pola                 |

**Przykład:**

```html
[polski_nip_field required="yes" autofill="yes" label="Numer NIP firmy"]
```

### `[polski_greenwashing_info]`

Wyświetla zweryfikowane informacje środowiskowe produktu (anty-greenwashing).

**Parametry:**

| Parametr     | Typ    | Domyślnie  | Opis                          |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktualny) | ID produktu                   |
| `fields`     | string | `all`      | Pola: claims, certifications, evidence |

**Przykład:**

```html
[polski_greenwashing_info fields="claims,certifications"]
```

### `[polski_security_incident]`

Wyświetla formularz zgłoszenia incydentu bezpieczeństwa (CRA).

**Parametry:**

| Parametr    | Typ    | Domyślnie | Opis                          |
| ----------- | ------ | --------- | ----------------------------- |
| `show_info` | string | `yes`     | Informacje o CRA              |

**Przykład:**

```html
[polski_security_incident show_info="yes"]
```

### `[polski_verified_badge]`

Wyświetla odznakę zweryfikowanego zakupu przy opinii.

**Parametry:**

| Parametr | Typ    | Domyślnie           | Opis                     |
| -------- | ------ | -------------------- | ------------------------ |
| `text`   | string | `Zweryfikowany zakup`| Tekst odznaki            |
| `icon`   | string | `checkmark`          | Ikona: checkmark, shield |

**Przykład:**

```html
[polski_verified_badge text="Potwierdzone zamówienie" icon="shield"]
```

## Użycie shortcodów w szablonach PHP

Wszystkie shortcody można wywołać w szablonach PHP:

```php
// Pojedynczy shortcode
echo do_shortcode('[polski_omnibus_price]');

// Shortcode z parametrami
echo do_shortcode('[polski_product_slider type="featured" limit="6"]');

// Warunkowe wyświetlanie
if (shortcode_exists('polski_gpsr')) {
    echo do_shortcode('[polski_gpsr]');
}
```

## Użycie shortcodów w Gutenberg

W Gutenbergu użyj bloku **Shortcode** i wklej shortcode. Wiele shortcodów ma też dedykowane bloki z podglądem.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
