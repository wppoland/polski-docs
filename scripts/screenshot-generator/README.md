# Screenshot generator for Polski for WooCommerce docs

This directory contains a Playwright script designed to run inside the `polski` repository
(which already has Playwright and wp-env configured) to generate documentation screenshots.

## Setup

1. Copy `generate-screenshots.spec.ts` into the polski repo `tests/E2E/` directory
2. Make sure wp-env is running: `npm run env:start`
3. Run: `npx playwright test generate-screenshots`
4. Screenshots are saved to `docs/wporg-assets/`

## How it integrates with the docs

The docs repo scanner (`scripts/scan-repos.mjs`) automatically copies images from
`docs/wporg-assets/` in the polski repo into `src/assets/screenshots/` in this docs project.

The GitHub Actions workflow:
1. polski repo pushes new screenshots to `docs/wporg-assets/`
2. polski repo triggers `repository_dispatch` to the docs repo
3. Docs repo scanner pulls latest images
4. Docs site rebuilds and deploys with updated screenshots

## Adding new screenshots

1. Add a new test case in `generate-screenshots.spec.ts`
2. Name the output file descriptively: `screenshot-N-description.png`
3. Reference it in the docs markdown: `![Alt](../../../assets/screenshots/screenshot-N-description.png)`
