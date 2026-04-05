#!/usr/bin/env node

/**
 * Documentation Generator for Polski for WooCommerce
 *
 * Reads scan-results.json and updates markdown files that contain
 * AUTO markers (<!-- AUTO:section -->...<!-- /AUTO:section -->) with
 * generated reference tables. Content outside markers is preserved.
 *
 * @author wppoland.com
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const SCAN_RESULTS_FILE = join(DATA_DIR, 'scan-results.json');
const DOCS_ROOT = join(__dirname, '..', 'src', 'content', 'docs');

// ---------------------------------------------------------------------------
// Logging
// ---------------------------------------------------------------------------
const LOG_PREFIX = '[generate-docs]';

function log(message) {
  console.log(`${LOG_PREFIX} ${message}`);
}

function logError(message) {
  console.error(`${LOG_PREFIX} ERROR: ${message}`);
}

// ---------------------------------------------------------------------------
// Load scan results
// ---------------------------------------------------------------------------

function loadScanResults() {
  if (!existsSync(SCAN_RESULTS_FILE)) {
    logError(`Scan results not found at ${SCAN_RESULTS_FILE}. Run scan-repos.mjs first.`);
    process.exit(1);
  }

  try {
    const raw = readFileSync(SCAN_RESULTS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    logError(`Failed to parse scan results: ${error.message}`);
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Content generators
// ---------------------------------------------------------------------------

/**
 * Generate a markdown table for hooks (actions and filters).
 */
function generateHooksTable(data) {
  const { hooks, metadata } = data;

  if (hooks.length === 0) {
    return '_No hooks found in the scanned repositories._\n';
  }

  const lines = [];
  const scannedDate = new Date(metadata.scannedAt).toISOString().split('T')[0];

  lines.push(`> Last scanned: ${scannedDate} | Hooks found: ${hooks.length}`);
  lines.push('');

  // Actions
  const actions = hooks.filter((h) => h.type === 'action');
  if (actions.length > 0) {
    lines.push('### Actions');
    lines.push('');
    lines.push('| Hook name | File | Line | Repo | Description |');
    lines.push('|-----------|------|------|------|-------------|');

    for (const hook of actions) {
      const description = hook.description ? escapeMarkdownCell(hook.description) : '-';
      const fileName = escapeMarkdownCell(hook.file);
      lines.push(`| \`${hook.name}\` | \`${fileName}\` | ${hook.line} | ${hook.repo} | ${description} |`);
    }

    lines.push('');
  }

  // Filters
  const filters = hooks.filter((h) => h.type === 'filter');
  if (filters.length > 0) {
    lines.push('### Filters');
    lines.push('');
    lines.push('| Hook name | File | Line | Repo | Description |');
    lines.push('|-----------|------|------|------|-------------|');

    for (const hook of filters) {
      const description = hook.description ? escapeMarkdownCell(hook.description) : '-';
      const fileName = escapeMarkdownCell(hook.file);
      lines.push(`| \`${hook.name}\` | \`${fileName}\` | ${hook.line} | ${hook.repo} | ${description} |`);
    }

    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Generate a markdown listing for shortcodes.
 */
function generateShortcodesTable(data) {
  const { shortcodes, metadata } = data;

  if (shortcodes.length === 0) {
    return '_No shortcodes found in the scanned repositories._\n';
  }

  const lines = [];
  const scannedDate = new Date(metadata.scannedAt).toISOString().split('T')[0];

  lines.push(`> Last scanned: ${scannedDate} | Shortcodes found: ${shortcodes.length}`);
  lines.push('');
  lines.push('| Shortcode | Callback | File | Line | Repo | Description |');
  lines.push('|-----------|----------|------|------|------|-------------|');

  for (const sc of shortcodes) {
    const description = sc.description ? escapeMarkdownCell(sc.description) : '-';
    lines.push(`| \`[${sc.name}]\` | \`${sc.callback}\` | \`${escapeMarkdownCell(sc.file)}\` | ${sc.line} | ${sc.repo} | ${description} |`);
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Generate markdown for REST API endpoints.
 */
function generateRestTable(data) {
  const { restRoutes, metadata } = data;

  if (restRoutes.length === 0) {
    return '_No REST API routes found in the scanned repositories._\n';
  }

  const lines = [];
  const scannedDate = new Date(metadata.scannedAt).toISOString().split('T')[0];

  lines.push(`> Last scanned: ${scannedDate} | REST endpoints found: ${restRoutes.length}`);
  lines.push('');
  lines.push('| Method | Endpoint | Callback | File | Repo | Description |');
  lines.push('|--------|----------|----------|------|------|-------------|');

  for (const route of restRoutes) {
    const description = route.description ? escapeMarkdownCell(route.description) : '-';
    lines.push(`| \`${route.method}\` | \`${route.endpoint}\` | \`${route.callback}\` | \`${escapeMarkdownCell(route.file)}\` | ${route.repo} | ${description} |`);
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Generate markdown for WP-CLI commands.
 */
function generateWpCliTable(data) {
  const { wpCliCommands, metadata } = data;

  if (wpCliCommands.length === 0) {
    return '_No WP-CLI commands found in the scanned repositories._\n';
  }

  const lines = [];
  const scannedDate = new Date(metadata.scannedAt).toISOString().split('T')[0];

  lines.push(`> Last scanned: ${scannedDate} | WP-CLI commands found: ${wpCliCommands.length}`);
  lines.push('');
  lines.push('| Command | Handler | File | Repo | Description |');
  lines.push('|---------|---------|------|------|-------------|');

  for (const cmd of wpCliCommands) {
    const description = cmd.description ? escapeMarkdownCell(cmd.description) : '-';
    lines.push(`| \`wp ${cmd.command}\` | \`${cmd.handler}\` | \`${escapeMarkdownCell(cmd.file)}\` | ${cmd.repo} | ${description} |`);
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Generate markdown for constants.
 */
function generateConstantsTable(data) {
  const { constants, metadata } = data;

  if (constants.length === 0) {
    return '_No constants found in the scanned repositories._\n';
  }

  const lines = [];
  const scannedDate = new Date(metadata.scannedAt).toISOString().split('T')[0];

  lines.push(`> Last scanned: ${scannedDate} | Constants found: ${constants.length}`);
  lines.push('');
  lines.push('| Constant | Value | File | Repo |');
  lines.push('|----------|-------|------|------|');

  for (const constant of constants) {
    lines.push(`| \`${constant.name}\` | \`${escapeMarkdownCell(constant.value)}\` | \`${escapeMarkdownCell(constant.file)}\` | ${constant.repo} |`);
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Generate a combined stats summary.
 */
function generateStatsTable(data) {
  const { stats, metadata } = data;
  const scannedDate = new Date(metadata.scannedAt).toISOString().split('T')[0];

  const lines = [];
  lines.push(`> Last scanned: ${scannedDate}`);
  lines.push('');
  lines.push('| Metric | Count |');
  lines.push('|--------|-------|');
  lines.push(`| PHP files scanned | ${stats.totalFiles} |`);
  lines.push(`| Actions | ${stats.totalActions || 0} |`);
  lines.push(`| Filters | ${stats.totalFilters || 0} |`);
  lines.push(`| Shortcodes | ${stats.totalShortcodes} |`);
  lines.push(`| REST endpoints | ${stats.totalRestRoutes} |`);
  lines.push(`| WP-CLI commands | ${stats.totalWpCliCommands} |`);
  lines.push(`| Constants | ${stats.totalConstants} |`);
  lines.push('');

  const repoEntries = Object.entries(metadata.repos);
  if (repoEntries.length > 0) {
    lines.push('**Repositories:**');
    lines.push('');
    for (const [name, info] of repoEntries) {
      if (info.status === 'ok') {
        lines.push(`- **${name}**: \`${info.commitHash.substring(0, 8)}\``);
      } else {
        lines.push(`- **${name}**: _not available_`);
      }
    }
    lines.push('');
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Markdown helpers
// ---------------------------------------------------------------------------

/**
 * Escape pipe characters inside a markdown table cell.
 */
function escapeMarkdownCell(text) {
  return String(text).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

/**
 * Map of AUTO section names to their generator functions.
 */
const SECTION_GENERATORS = {
  hooks: generateHooksTable,
  shortcodes: generateShortcodesTable,
  rest: generateRestTable,
  'rest-api': generateRestTable,
  'wp-cli': generateWpCliTable,
  wpcli: generateWpCliTable,
  constants: generateConstantsTable,
  stats: generateStatsTable,
};

/**
 * Process a markdown file: find AUTO markers and replace their content.
 * Returns true if the file was modified, false otherwise.
 */
function processMarkdownFile(filePath, data) {
  let content;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch (error) {
    logError(`Cannot read ${filePath}: ${error.message}`);
    return false;
  }

  // Find all AUTO markers
  const markerPattern = /<!-- AUTO:(\w[\w-]*) -->([\s\S]*?)<!-- \/AUTO:\1 -->/g;
  let hasMatch = false;
  let modified = false;

  const newContent = content.replace(markerPattern, (fullMatch, sectionName, existingContent) => {
    hasMatch = true;

    const generator = SECTION_GENERATORS[sectionName];
    if (!generator) {
      logError(`Unknown AUTO section "${sectionName}" in ${filePath}. Skipping.`);
      return fullMatch;
    }

    const generatedContent = generator(data);
    const replacement = `<!-- AUTO:${sectionName} -->\n${generatedContent}\n<!-- /AUTO:${sectionName} -->`;

    if (replacement !== fullMatch) {
      modified = true;
    }

    return replacement;
  });

  if (!hasMatch) {
    return false;
  }

  if (modified) {
    writeFileSync(filePath, newContent, 'utf-8');
    log(`Updated: ${filePath}`);
  }

  return modified;
}

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

/**
 * Recursively find all markdown files in a directory.
 */
function collectMarkdownFiles(dirPath, fileList = []) {
  if (!existsSync(dirPath)) {
    return fileList;
  }

  const entries = readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      collectMarkdownFiles(fullPath, fileList);
    } else if (entry.isFile() && (extname(entry.name) === '.md' || extname(entry.name) === '.mdx')) {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  log('Starting documentation generation...');

  const data = loadScanResults();
  log(`Loaded scan results from ${data.metadata.scannedAt}`);
  log(`Stats: ${data.stats.totalHooks} hooks, ${data.stats.totalShortcodes} shortcodes, ${data.stats.totalRestRoutes} REST routes`);

  const markdownFiles = collectMarkdownFiles(DOCS_ROOT);
  log(`Found ${markdownFiles.length} markdown files to process.`);

  let updatedCount = 0;

  for (const mdFile of markdownFiles) {
    const wasUpdated = processMarkdownFile(mdFile, data);
    if (wasUpdated) {
      updatedCount++;
    }
  }

  log(`Generation complete. ${updatedCount} file(s) updated.`);
}

main().catch((error) => {
  logError(`Unhandled error: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});
