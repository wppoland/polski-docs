---
title: Gift cards
description: Documentation of gift cards in Polski PRO for WooCommerce - selling, code generation, cart redemption, balance tracking and My Account panel.
---

The gift cards module in Polski PRO for WooCommerce enables selling gift cards as WooCommerce products. Customers can purchase a card, receive a unique code and use it as a payment method for subsequent orders.

## How it works

1. The administrator creates a "Gift card" product type
2. The customer purchases a gift card in the store
3. After the order is paid, the plugin generates a unique card code
4. The code is sent to the customer (or the recipient) via email
5. The recipient enters the code in the cart and receives a discount equal to the card value
6. The card balance decreases by the amount used

## Configuration

Go to **WooCommerce > Settings > Polski > PRO Modules > Gift cards**.

The module is controlled by the option:

```
polski_gift_cards
```

### General settings

| Setting | Description |
|---------|-------------|
| Enable gift cards | Activates the module |
| Code length | Number of characters in the code (default 16) |
| Code format | Code pattern (e.g. `XXXX-XXXX-XXXX-XXXX`) |
| Code prefix | Optional prefix (e.g. `PL-`) |
| Card validity | Number of valid days (0 = no limit) |
| Code field in cart | Position of the code input field |

### Creating a gift card product

1. Go to **Products > Add New**
2. Select product type: **Gift card**
3. Set the price (face value of the card)
4. Optionally: enable "Custom amount" - the customer enters the card value themselves
5. Optionally: set minimum and maximum amount for custom amounts
6. Publish the product

For custom amounts, the customer sees a field to enter the card value instead of a fixed price.

## Code generation

Gift card codes are generated automatically after the order is paid. Algorithm:

- alphanumeric characters (A-Z, 0-9)
- exclusion of ambiguous characters (0, O, I, L, 1)
- uniqueness validation in the database
- formatting with separators (e.g. `ABCD-EFGH-JKMN-PQRS`)

Each code is unique across the entire store. The plugin verifies uniqueness before saving and generates a new code in case of a collision.

## Cart redemption

### Code field

On the cart page (and optionally on the checkout page), a field is displayed for entering the gift card code:

```
[Wpisz kod karty podarunkowej] [Zastosuj]
```

After entering a valid code:

- the card balance is displayed
- the discount amount is subtracted from the order total
- if the card balance is less than the order value - the remainder is paid using other methods
- if the card balance is greater - the remaining amount stays on the card

### Code validation

The plugin validates the card code before applying it:

- checks if the code exists in the database
- checks if the card has not expired
- checks if the balance is greater than zero
- checks if the card has not been blocked

The error message informs the customer about the reason for code rejection.

### Session tracking

The applied card code is stored in the customer's WooCommerce session. This means that:

- the code is remembered even after refreshing the page
- the code is removed after placing an order or logging out
- the customer can manually remove the applied code

## Balance tracking

Each gift card has a balance that decreases with each use. The card transaction history contains:

| Field | Description |
|-------|-------------|
| Date | Transaction date |
| Type | Top-up / Usage / Refund |
| Amount | Operation amount |
| Order | Order ID (for usage and refund) |
| Balance after operation | Current balance after the transaction |

### Admin panel

In the **WooCommerce > Gift cards** panel, the administrator can:

- browse the list of all cards with balances
- check a card's transaction history
- manually top up a card
- block a card
- export the card list (CSV)

## My Account panel

The module adds a `/polski-gift-cards` endpoint to the customer's My Account panel. The endpoint is available at:

```
/moje-konto/polski-gift-cards/
```

In the panel, the customer can see:

- list of owned gift cards
- current balance of each card
- usage history
- card code (with copy option)
- expiration date (if set)

## Hooks

### `polski_pro/gift_card/validate`

Filters the gift card code validation result in the cart.

```php
/**
 * @param bool   $is_valid  Czy kod jest prawidłowy
 * @param string $code      Kod karty podarunkowej
 * @param float  $cart_total Suma koszyka
 */
apply_filters('polski_pro/gift_card/validate', bool $is_valid, string $code, float $cart_total): bool;
```

**Example:**

```php
add_filter('polski_pro/gift_card/validate', function (bool $is_valid, string $code, float $cart_total): bool {
    // Blokowanie kart podarunkowych dla zamówień poniżej 50 zł
    if ($cart_total < 50.00) {
        wc_add_notice('Karty podarunkowe można wykorzystać przy zamówieniach od 50 zł.', 'error');
        return false;
    }
    return $is_valid;
}, 10, 3);
```

### `polski_pro/gift_card/applied`

Action fired after a gift card is applied in the cart.

```php
/**
 * @param string $code    Kod karty
 * @param float  $amount  Kwota do odliczenia
 * @param float  $balance Pozostałe saldo
 */
do_action('polski_pro/gift_card/applied', string $code, float $amount, float $balance);
```

**Example:**

```php
add_action('polski_pro/gift_card/applied', function (string $code, float $amount, float $balance): void {
    // Logowanie użycia karty
    wc_get_logger()->info(
        "Karta {$code}: odliczono {$amount} zł, saldo: {$balance} zł",
        ['source' => 'polski-pro-gift-cards']
    );
}, 10, 3);
```

### `polski_pro/gift_card/order_created`

Action fired after an order is created using a gift card.

```php
/**
 * @param int    $order_id ID zamówienia
 * @param string $code     Kod karty
 * @param float  $amount   Kwota odliczona z karty
 */
do_action('polski_pro/gift_card/order_created', int $order_id, string $code, float $amount);
```

**Example:**

```php
add_action('polski_pro/gift_card/order_created', function (int $order_id, string $code, float $amount): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Użyto kartę podarunkową %s na kwotę %.2f zł', $code, $amount)
    );
}, 10, 3);
```

### `polski_pro/gift_card/calculate_totals`

Filters the amount to deduct from the gift card when recalculating cart totals.

```php
/**
 * @param float  $discount   Kwota rabatu z karty
 * @param string $code       Kod karty
 * @param float  $cart_total Suma koszyka przed rabatem
 */
apply_filters('polski_pro/gift_card/calculate_totals', float $discount, string $code, float $cart_total): float;
```

## Email with code

After an order containing a gift card is paid, the plugin sends an email with the code. The email includes:

- formatted card code
- face value
- expiration date (if applicable)
- usage instructions

The email template can be customized in **WooCommerce > Settings > Emails > Gift card**.

### Email for the recipient

When purchasing a card, the customer can provide the recipient's email address. In that case:

- the code is sent to the recipient's address
- the buyer receives a purchase confirmation (without the code)
- optionally: the buyer can add a message for the recipient

## Common issues

### Code not accepted in the cart

1. Check if the code is entered correctly (no leading/trailing spaces)
2. Verify that the card has not expired
3. Check the card balance in the admin panel
4. Make sure the card is not blocked

### Customer did not receive the code via email

1. Check if the order is paid (status "Processing" or "Completed")
2. Verify the WooCommerce email configuration
3. Check email logs for sending errors

### Balance not decreasing after an order

1. Check if the order was successfully placed (not cancelled)
2. Verify the card transaction history in the admin panel
3. Check logs for PHP errors

## Related resources

- [PRO overview](/pro/overview/)
- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
