---
title: Copyright helpers - notice, image credit, Gutenberg block
description: Reusable shortcodes and a Gutenberg block for shop copyright notices (c YYYY Owner - License) and per-image credits (author, source, license).
---

The **Copyright helpers** module exposes three reusable outputs for copyright and attribution notices:

- Shortcode `[polski_copyright]` - standard copyright line
- Shortcode `[polski_image_credit]` - per-image credit footer
- Gutenberg block `polski/copyright` - dynamic block using the same rendering

These are small building blocks, not a full DAM. Use them to attribute stock photography, user submissions and own content consistently across the shop.

## Copyright line

```
[polski_copyright]
[polski_copyright year="2020 - 2026" owner="Przykladowa Firma sp. z o.o." license="CC BY 4.0"]
```

| Attribute   | Default                                                    | Description                                 |
| ----------- | ---------------------------------------------------------- | ------------------------------------------- |
| `year`      | current UTC year                                           | Single year or range                        |
| `owner`     | `polski_general.company_name` or the WordPress site title  | Rights holder                               |
| `license`   | empty                                                      | License identifier (SPDX, Creative Commons) |
| `separator` | ` - `                                                      | Separator between owner and license         |

Output:

```html
<span class="polski-copyright">&copy; 2026 Przykladowa Firma - License: CC BY 4.0</span>
```

## Gutenberg block

Block name: `polski/copyright`. Category: Widgets. Supports wide/full alignment. Attributes: `owner`, `year`, `license`. Rendering is dynamic, so the "current year" auto-updates without re-saving the page.

## Image credit

```
[polski_image_credit image_id="42" credit="Photo: Jan Kowalski" source="https://example.com" license="CC BY-SA 4.0"]
[polski_image_credit credit="Photo by Jan Kowalski"]
```

| Attribute  | Default   | Description                                                                  |
| ---------- | --------- | ---------------------------------------------------------------------------- |
| `image_id` | empty     | WordPress attachment ID. When set, the image is rendered before the caption |
| `credit`   | empty     | Author or credit string (required unless `image_id` is set alone)            |
| `source`   | empty     | URL to the source. Rendered as a "source" link with `rel="nofollow noopener"`|
| `license`  | empty     | License identifier                                                           |
| `size`     | `medium`  | WordPress image size slug                                                    |

Output is a `<figure>` with a `<figcaption>`:

```html
<figure class="polski-image-credit">
  <img src="..." alt="..." />
  <figcaption class="polski-image-credit__caption">Photo: Jan Kowalski - <a href="..." rel="nofollow noopener" target="_blank">source</a> - License: CC BY-SA 4.0</figcaption>
</figure>
```

## Typical uses

- Shop footer copyright line (with current year and company name auto-filled)
- Product gallery credits for stock photography
- Blog post hero image attribution
- Team member portrait credits

## Integration with themes

Most block themes expose a site footer template. Drop the **Copyright notice** block into it and remove hard-coded copyright text - the year updates automatically after the new year, no theme edits required.

## Permissions

- Public (frontend-safe)
- No admin UI

## Limitations

- No DAM - the plugin does not track licenses attached to media items (planned for 2.3.0)
- License field accepts any string - no SPDX validation
- The image credit shortcode does not generate schema.org `Photograph` structured data yet
- Styling is minimal - override `.polski-copyright` and `.polski-image-credit` in theme CSS
