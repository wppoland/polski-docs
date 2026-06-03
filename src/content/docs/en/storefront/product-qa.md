---
title: Questions and Answers (Q&A)
description: Questions and answers module in Polski for WooCommerce - a Q&A section on product pages with voting and Schema.org markup.
---

The questions and answers module adds a dedicated Q&A tab to WooCommerce product pages. Customers can ask questions about the product, and the store owner or other users answer them. The system supports voting on answers and generates Schema.org structured data.

## Enabling the module

Go to **WooCommerce > Polski > Store modules** and enable **Questions and answers**. A new "Questions and answers" tab appears on every product next to the reviews tab.

## Features

- Q&A tab in the WooCommerce product tabs
- Question and answer system based on WordPress comments
- Custom comment types: `product_question` and `product_answer`
- Voting on answers via AJAX (helpful/not helpful)
- Email notifications to the administrator about new questions
- Schema.org QAPage structured data
- Question form with validation
- Question pagination
- Moderation of questions before publication (optional)

## How it works

### Asking questions

The customer fills in a form on the product page providing:

- **Name** - required (auto-filled for logged-in users)
- **Email** - required (auto-filled for logged-in users)
- **Question text** - required

After submission, the question goes to moderation (if enabled) or is published immediately. The administrator receives a notification email.

### Answering

Answers are added directly below the question. Answers from the administrator/store owner are marked with a special "Store answer" label.

### Voting

Users can vote on answers (thumbs up/down). Voting works via AJAX without reloading the page. The most helpful answers appear higher.

## Technical details

### Comment types

The module uses the WordPress comment system with custom types:

- `product_question` - a question about the product
- `product_answer` - an answer to a question

This keeps questions from mixing with product reviews or post comments.

### Schema.org QAPage

The module automatically adds structured data in JSON-LD format compliant with the `QAPage` schema. Each question with answers generates a separate `Question` object with nested `Answer` objects.

```json
{
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
        "@type": "Question",
        "name": "Is the product waterproof?",
        "answerCount": 2,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the product has an IP67 waterproof rating."
        }
    }
}
```

### Hooks

```php
// Change the tab title
add_filter('polski/product_qa/tab_title', function (string $title, int $count): string {
    return sprintf('Questions (%d)', $count);
}, 10, 2);

// Disable email notifications
add_filter('polski/product_qa/send_email', '__return_false');

// Change the number of questions per page
add_filter('polski/product_qa/per_page', function (): int {
    return 20; // default: 10
});

// Filter who can vote
add_filter('polski/product_qa/can_vote', function (bool $can_vote, int $user_id): bool {
    return is_user_logged_in();
}, 10, 2);
```

### AJAX actions

| Action | Description |
|---|---|
| `polski_qa_submit_question` | Submit a new question |
| `polski_qa_submit_answer` | Submit an answer |
| `polski_qa_vote` | Vote on an answer |

### CSS classes

- `.polski-qa` - main container
- `.polski-qa__question` - single question
- `.polski-qa__answer` - answer
- `.polski-qa__answer--shop` - store answer
- `.polski-qa__vote` - voting buttons
- `.polski-qa__vote-count` - vote counter
- `.polski-qa__form` - question form

### Module ID

`product_qa`

## Troubleshooting

**The Q&A tab does not display** - check whether the theme supports WooCommerce tabs (hook `woocommerce_product_tabs`). Some themes override the default tabs.

**Questions do not appear after submission** - check the moderation settings in **Settings > Discussion > Comment must be manually approved**.

**Schema.org does not validate** - make sure the question has at least one answer. Google requires a question-answer pair for proper QAPage validation.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
