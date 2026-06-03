---
title: AJAX Add to Cart
description: Adding products to the cart without reloading the page, including variable products.
---

The AJAX Add to Cart module lets you add products to the cart without reloading the page.

## Features

- Support for simple and variable products on product pages
- Toast notification with a link to the cart
- Automatic cart fragment (mini-cart) updates
- Button animation (loading -> added)
- Compatibility with WooCommerce AJAX fragments

## Enabling

Go to **WooCommerce > Polski > Modules** and enable the **AJAX Add to Cart** module in the "Stock & Cart" section.

## How it works

1. The customer clicks "Add to cart" on the product page
2. The form is submitted via AJAX (without reloading)
3. The button shows a loading animation
4. After adding, a green "Added to cart!" notification appears with a "View cart" link
5. The mini-cart in the header updates automatically

## JavaScript events

| Event | When |
|-----------|-------|
| `polski_adding_to_cart` | Before the AJAX request is sent |
| `polski_added_to_cart` | After a successful add |
| `added_to_cart` | The standard WooCommerce event |

## Notification style

The toast notification appears in the top right corner of the screen and disappears after 4 seconds. You can customize it through the CSS class `.polski-ajax-cart-notice`.
