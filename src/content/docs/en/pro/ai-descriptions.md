---
title: AI Product Descriptions
description: Documentation for the AI product descriptions module in Polski PRO for WooCommerce - generating SEO descriptions using an OpenAI-compatible API, with Yoast and RankMath integration.
---

The AI product descriptions module enables automatic generation of WooCommerce product descriptions using any OpenAI-compatible API. The descriptions are optimized for SEO and tailored to the chosen tone of communication.

:::note[Requirements]
An API key for an OpenAI-compatible service is required (e.g. OpenAI, Azure OpenAI, a local LLM with a chat/completions endpoint).
:::

## How it works

1. The administrator opens the WooCommerce product edit screen
2. In the "AI Descriptions" meta box, they select a generation target and tone
3. The plugin sends the product context to the API
4. The generated text appears in the meta box for preview
5. The administrator accepts or edits the text before saving

## Configuration

Go to **WooCommerce > Settings > Polski PRO > AI Descriptions**.

The settings are stored in the option:

```
polski_pro_ai_descriptions
```

### API settings

| Setting | Description | Default |
|------------|------|-----------|
| API key | Authorization key for the API | - |
| API URL | The chat/completions endpoint | `https://api.openai.com/v1/chat/completions` |
| Model | The AI model used for generation | `gpt-4o-mini` |
| Max tokens | Maximum response length | 1024 |

### Generation settings

| Setting | Description | Default |
|------------|------|-----------|
| Tone | Communication style | professional |
| Language | Language of generated descriptions | pl |
| SEO keywords | Include keywords in the description | Yes |
| Custom prompt | Additional instructions for the AI model | - |

### Available tones

| Tone | Description |
|-----|------|
| `professional` | Formal, matter-of-fact business style |
| `casual` | Friendly, conversational style |
| `persuasive` | Convincing, sales-oriented |
| `technical` | Detailed, technical description of specifications |
| `luxurious` | Exclusive, aspirational premium style |

## Generation targets

The meta box on the product edit screen lets you choose what text should be generated:

| Target | Description |
|-----|------|
| Full description | The main product description (post_content) |
| Short description | The product excerpt (post_excerpt) |
| SEO title | The meta title for search engines |
| SEO meta description | The meta description for search engines |

SEO titles and descriptions are automatically saved in the fields of the relevant SEO plugin (Yoast SEO or RankMath).

## Integration with SEO plugins

The module detects the installed SEO plugin and saves the generated data in the appropriate meta fields:

### Yoast SEO

- SEO title saved in `_yoast_wpseo_title`
- SEO meta description saved in `_yoast_wpseo_metadesc`

### RankMath

- SEO title saved in `rank_math_title`
- SEO meta description saved in `rank_math_description`

If no SEO plugin is active, the options for generating the SEO title and meta description are unavailable.

## Product context

With each generation request, the plugin sends the following product data to the API:

- **Product name** - the product title
- **SKU** - the catalog number
- **Price** - the regular and sale price
- **Categories** - the list of product categories
- **Attributes** - all attributes and their values
- **Existing descriptions** - the current full and short description (if they exist)

This data allows the AI model to generate an accurate and contextually correct description.

## Bulk generation

The module supports generating descriptions for multiple products at once:

1. Go to **Products > All Products**
2. Select the products to generate for
3. From the "Bulk actions" list, choose **Generate AI descriptions**
4. Choose the generation target and tone
5. Click "Apply"

Bulk generation runs asynchronously via AJAX, each product is processed separately, and a progress bar shows the operation status. This helps avoid exceeding the server time limit with a large number of products.

### Limits

- Each task is a separate API call
- You should account for the API service's rate-limiting limits
- With a large number of products, generation may take several minutes

## Usage example

### Generating a description for a single product

1. Open the product edit screen
2. Scroll to the **AI Descriptions** meta box
3. Choose the target: "Full description"
4. Choose the tone: "persuasive"
5. Click **Generate**
6. Review the generated text
7. Click **Insert into description** to move the text to the editor

### Configuring a custom endpoint

If you use a local LLM model or another provider:

1. Change the **API URL** to your endpoint's address (it must be compatible with the OpenAI chat/completions format)
2. Set the appropriate **Model** (a model name recognized by your endpoint)
3. Provide the **API key** (if required by your endpoint)

## Enabling the module

The module is controlled by a toggle in the PRO module settings:

```
WooCommerce > Settings > Polski PRO > Modules > AI Descriptions
```

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Polski PRO for WooCommerce is commercial software provided without warranty.</div>
