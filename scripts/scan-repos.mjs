#!/usr/bin/env node

/**
 * Repository Scanner for Polski for WooCommerce
 *
 * Clones/pulls wppoland/polski and wppoland/polski-pro repositories,
 * scans PHP files for hooks, shortcodes, REST routes, WP-CLI commands,
 * constants, and version numbers. Outputs structured JSON.
 *
 * @author wppoland.com
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from 'node:fs';
import { join, relative, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const REPOS_DIR = join(__dirname, '.repos');
const DATA_DIR = join(__dirname, 'data');
const OUTPUT_FILE = join(DATA_DIR, 'scan-results.json');

const PROJECT_ROOT = join(__dirname, '..');
const ASSETS_DIR = join(PROJECT_ROOT, 'src', 'assets');
const SCREENSHOTS_DIR = join(ASSETS_DIR, 'screenshots');
const PUBLIC_DIR = join(PROJECT_ROOT, 'public');

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico'];

/**
 * Directories inside the repos that may contain images worth syncing.
 */
const IMAGE_SOURCE_DIRS = [
  'docs/wporg-assets',
  'assets/images',
  'assets/img',
  '.wordpress-org',
  'docs/images',
  'docs/screenshots',
];

const REPOS = [
  {
    name: 'polski',
    url: 'https://github.com/wppoland/polski.git',
    path: join(REPOS_DIR, 'polski'),
  },
  {
    name: 'polski-pro',
    url: 'https://github.com/wppoland/polski-pro.git',
    path: join(REPOS_DIR, 'polski-pro'),
  },
];

// ---------------------------------------------------------------------------
// Logging
// ---------------------------------------------------------------------------
const LOG_PREFIX = '[scan-repos]';

function log(message) {
  console.log(`${LOG_PREFIX} ${message}`);
}

function logError(message) {
  console.error(`${LOG_PREFIX} ERROR: ${message}`);
}

// ---------------------------------------------------------------------------
// Git operations
// ---------------------------------------------------------------------------

/**
 * Clone a repository or pull latest changes if it already exists.
 * Returns true on success, false on failure.
 */
function syncRepo(repo) {
  try {
    // Use GH_TOKEN for private repo access in CI
    const ghToken = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';
    const cloneUrl = ghToken
      ? repo.url.replace('https://github.com/', `https://x-access-token:${ghToken}@github.com/`)
      : repo.url;

    if (existsSync(join(repo.path, '.git'))) {
      log(`Pulling latest changes for ${repo.name}...`);
      if (ghToken) {
        execSync(`git remote set-url origin ${cloneUrl}`, {
          cwd: repo.path,
          stdio: 'pipe',
        });
      }
      execSync('git fetch --all && git reset --hard origin/HEAD', {
        cwd: repo.path,
        stdio: 'pipe',
        timeout: 120_000,
      });
    } else {
      log(`Cloning ${repo.name} from ${repo.url}...`);
      mkdirSync(repo.path, { recursive: true });
      execSync(`git clone --depth 1 ${cloneUrl} ${repo.path}`, {
        stdio: 'pipe',
        timeout: 120_000,
      });
    }
    return true;
  } catch (error) {
    logError(`Failed to sync ${repo.name}: ${error.message}`);
    return false;
  }
}

/**
 * Get the current commit hash of a repository.
 */
function getCommitHash(repoPath) {
  try {
    return execSync('git rev-parse HEAD', { cwd: repoPath, stdio: 'pipe' })
      .toString()
      .trim();
  } catch {
    return 'unknown';
  }
}

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

/**
 * Recursively collect all PHP files from a directory.
 */
function collectPhpFiles(dirPath, fileList = []) {
  if (!existsSync(dirPath)) {
    return fileList;
  }

  const entries = readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // Skip vendor, node_modules, .git directories
      if (['vendor', 'node_modules', '.git', 'tests'].includes(entry.name)) {
        continue;
      }
      collectPhpFiles(fullPath, fileList);
    } else if (entry.isFile() && extname(entry.name) === '.php') {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

// ---------------------------------------------------------------------------
// Docblock extraction
// ---------------------------------------------------------------------------

/**
 * Extract the docblock comment directly above a given line index.
 */
function extractDocblock(lines, lineIndex) {
  let endLine = lineIndex - 1;

  // Skip blank lines between docblock and the target line
  while (endLine >= 0 && lines[endLine].trim() === '') {
    endLine--;
  }

  if (endLine < 0 || !lines[endLine].trim().endsWith('*/')) {
    return '';
  }

  let startLine = endLine;
  while (startLine >= 0 && !lines[startLine].trim().startsWith('/**')) {
    startLine--;
  }

  if (startLine < 0) {
    return '';
  }

  const docblockLines = lines.slice(startLine, endLine + 1);
  return docblockLines
    .map((line) => line.trim())
    .join('\n');
}

/**
 * Extract the first line description from a docblock.
 */
function extractDocblockDescription(docblock) {
  if (!docblock) {
    return '';
  }

  const lines = docblock.split('\n');
  const descriptionLines = [];

  for (const line of lines) {
    const cleaned = line.replace(/^\/\*\*\s*/, '').replace(/^\*\/\s*$/, '').replace(/^\*\s?/, '').trim();
    if (cleaned.startsWith('@')) {
      break;
    }
    if (cleaned) {
      descriptionLines.push(cleaned);
    }
  }

  return descriptionLines.join(' ');
}

/**
 * Extract @param tags from a docblock.
 */
function extractDocblockParams(docblock) {
  if (!docblock) {
    return [];
  }

  const params = [];
  const paramRegex = /@param\s+(\S+)\s+(\$\S+)\s*(.*)/g;
  let match;

  while ((match = paramRegex.exec(docblock)) !== null) {
    params.push({
      type: match[1],
      name: match[2],
      description: match[3].trim(),
    });
  }

  return params;
}

// ---------------------------------------------------------------------------
// Scanners
// ---------------------------------------------------------------------------

/**
 * Scan a single PHP file for all patterns.
 */
function scanFile(filePath, repoName, repoPath) {
  let content;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch (error) {
    logError(`Cannot read ${filePath}: ${error.message}`);
    return { hooks: [], shortcodes: [], restRoutes: [], wpCliCommands: [], constants: [] };
  }

  const lines = content.split('\n');
  const relativePath = relative(repoPath, filePath);

  const result = {
    hooks: [],
    shortcodes: [],
    restRoutes: [],
    wpCliCommands: [],
    constants: [],
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    // --- Hooks: do_action / apply_filters ---
    const hookPatterns = [
      /do_action\(\s*['"]([^'"]+)['"]/,
      /do_action_ref_array\(\s*['"]([^'"]+)['"]/,
      /apply_filters\(\s*['"]([^'"]+)['"]/,
      /apply_filters_ref_array\(\s*['"]([^'"]+)['"]/,
    ];

    for (const pattern of hookPatterns) {
      const hookMatch = line.match(pattern);
      if (hookMatch) {
        const hookName = hookMatch[1];
        const hookType = pattern.source.startsWith('do_action') ? 'action' : 'filter';
        const docblock = extractDocblock(lines, i);

        result.hooks.push({
          name: hookName,
          type: hookType,
          file: relativePath,
          line: lineNumber,
          repo: repoName,
          description: extractDocblockDescription(docblock),
          params: extractDocblockParams(docblock),
          docblock: docblock || undefined,
        });
      }
    }

    // --- Shortcodes: add_shortcode ---
    const shortcodeMatch = line.match(/add_shortcode\(\s*['"]([^'"]+)['"],\s*(?:['"]([^'"]+)['"]|\[.*?,\s*['"]([^'"]+)['"]\]|(?:\$this,\s*['"]([^'"]+)['"])|\$([a-zA-Z_]+))/);
    if (shortcodeMatch) {
      const shortcodeName = shortcodeMatch[1];
      const callback = shortcodeMatch[2] || shortcodeMatch[3] || shortcodeMatch[4] || shortcodeMatch[5] || 'unknown';
      const docblock = extractDocblock(lines, i);

      result.shortcodes.push({
        name: shortcodeName,
        callback,
        file: relativePath,
        line: lineNumber,
        repo: repoName,
        description: extractDocblockDescription(docblock),
      });
    }

    // --- REST Routes: register_rest_route ---
    const restMatch = line.match(/register_rest_route\(\s*['"]([^'"]+)['"],\s*['"]([^'"]+)['"]/);
    if (restMatch) {
      const namespace = restMatch[1];
      const route = restMatch[2];

      // Try to find method and callback in the next lines
      let method = 'GET';
      let callback = 'unknown';
      const blockEnd = Math.min(i + 15, lines.length);

      for (let j = i; j < blockEnd; j++) {
        const methodMatch = lines[j].match(/['"]methods['"]\s*=>\s*(?:WP_REST_Server::(\w+)|['"](\w+)['"])/);
        if (methodMatch) {
          const methodConst = methodMatch[1] || methodMatch[2];
          const METHOD_MAP = {
            READABLE: 'GET',
            CREATABLE: 'POST',
            EDITABLE: 'PUT',
            DELETABLE: 'DELETE',
            ALLMETHODS: 'ALL',
          };
          method = METHOD_MAP[methodConst] || methodConst;
        }

        const callbackMatch = lines[j].match(/['"]callback['"]\s*=>\s*(?:\[.*?,\s*['"]([^'"]+)['"]\]|['"]([^'"]+)['"])/);
        if (callbackMatch) {
          callback = callbackMatch[1] || callbackMatch[2];
        }
      }

      const docblock = extractDocblock(lines, i);

      result.restRoutes.push({
        namespace,
        route,
        endpoint: `/${namespace}${route}`,
        method,
        callback,
        file: relativePath,
        line: lineNumber,
        repo: repoName,
        description: extractDocblockDescription(docblock),
      });
    }

    // --- WP-CLI Commands ---
    const cliMatch = line.match(/WP_CLI::add_command\(\s*['"]([^'"]+)['"],\s*(?:['"]([^'"]+)['"]|new\s+([a-zA-Z_\\]+)|([a-zA-Z_\\]+)::class)/);
    if (cliMatch) {
      const commandName = cliMatch[1];
      const handler = cliMatch[2] || cliMatch[3] || cliMatch[4] || 'unknown';
      const docblock = extractDocblock(lines, i);

      result.wpCliCommands.push({
        command: commandName,
        handler: handler.replace(/\\\\/g, '\\'),
        file: relativePath,
        line: lineNumber,
        repo: repoName,
        description: extractDocblockDescription(docblock),
      });
    }

    // --- Constants: define() ---
    const defineMatch = line.match(/define\(\s*['"]([A-Z_]+)['"],\s*['"]?([^'")]+)['"]?\s*\)/);
    if (defineMatch) {
      const constantName = defineMatch[1];
      const constantValue = defineMatch[2].trim();

      result.constants.push({
        name: constantName,
        value: constantValue,
        file: relativePath,
        line: lineNumber,
        repo: repoName,
      });
    }

    // --- Version numbers in plugin header ---
    const versionHeaderMatch = line.match(/^\s*\*?\s*Version:\s*(.+)/i);
    if (versionHeaderMatch && i < 40) {
      result.constants.push({
        name: `${repoName.toUpperCase().replace(/-/g, '_')}_VERSION`,
        value: versionHeaderMatch[1].trim(),
        file: relativePath,
        line: lineNumber,
        repo: repoName,
        isPluginHeader: true,
      });
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Image sync
// ---------------------------------------------------------------------------

/**
 * Recursively collect all image files from a directory.
 */
function collectImageFiles(dirPath, fileList = []) {
  if (!existsSync(dirPath)) {
    return fileList;
  }
  const entries = readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collectImageFiles(fullPath, fileList);
    } else if (entry.isFile() && IMAGE_EXTENSIONS.includes(extname(entry.name).toLowerCase())) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

/**
 * Sync images from repo asset directories into the docs project.
 * Copies icons, banners, and screenshots.
 */
function syncImages(repo) {
  const synced = [];

  mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  for (const dir of IMAGE_SOURCE_DIRS) {
    const srcDir = join(repo.path, dir);
    if (!existsSync(srcDir)) {
      continue;
    }

    log(`Syncing images from ${repo.name}/${dir}...`);
    const images = collectImageFiles(srcDir);

    for (const imgPath of images) {
      const fileName = basename(imgPath);
      const destPath = join(SCREENSHOTS_DIR, fileName);

      try {
        copyFileSync(imgPath, destPath);
        synced.push(fileName);
      } catch (error) {
        logError(`Failed to copy ${fileName}: ${error.message}`);
      }
    }
  }

  // Copy icon files as favicon and logo
  const icon256 = join(SCREENSHOTS_DIR, 'icon-256x256.png');
  const icon128 = join(SCREENSHOTS_DIR, 'icon-128x128.png');

  if (existsSync(icon256)) {
    copyFileSync(icon256, join(ASSETS_DIR, 'icon.png'));
    log('Updated logo from icon-256x256.png');
  }
  if (existsSync(icon128)) {
    copyFileSync(icon128, join(PUBLIC_DIR, 'favicon.png'));
    log('Updated favicon from icon-128x128.png');
  }

  // Copy banner
  const banner = join(SCREENSHOTS_DIR, 'banner-772x250.png');
  if (existsSync(banner)) {
    copyFileSync(banner, join(ASSETS_DIR, 'banner.png'));
    log('Updated banner from banner-772x250.png');
  }
  const bannerLarge = join(SCREENSHOTS_DIR, 'banner-1544x500.png');
  if (existsSync(bannerLarge)) {
    copyFileSync(bannerLarge, join(ASSETS_DIR, 'banner-large.png'));
    log('Updated large banner from banner-1544x500.png');
  }

  if (synced.length > 0) {
    log(`Synced ${synced.length} images from ${repo.name}.`);
  }

  return synced;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  log('Starting repository scan...');

  // Ensure directories exist
  mkdirSync(REPOS_DIR, { recursive: true });
  mkdirSync(DATA_DIR, { recursive: true });

  const scanResults = {
    metadata: {
      scannedAt: new Date().toISOString(),
      generator: 'scan-repos.mjs',
      generatorVersion: '1.0.0',
      repos: {},
    },
    hooks: [],
    shortcodes: [],
    restRoutes: [],
    wpCliCommands: [],
    constants: [],
    stats: {
      totalFiles: 0,
      totalHooks: 0,
      totalShortcodes: 0,
      totalRestRoutes: 0,
      totalWpCliCommands: 0,
      totalConstants: 0,
    },
  };

  let totalFilesScanned = 0;
  let reposScanned = 0;

  for (const repo of REPOS) {
    const synced = syncRepo(repo);

    if (!synced || !existsSync(repo.path)) {
      logError(`Skipping ${repo.name} - repository not available.`);
      scanResults.metadata.repos[repo.name] = {
        status: 'error',
        message: 'Repository not available or clone failed.',
      };
      continue;
    }

    reposScanned++;
    const commitHash = getCommitHash(repo.path);
    scanResults.metadata.repos[repo.name] = {
      status: 'ok',
      commitHash,
      url: repo.url,
    };

    log(`Scanning PHP files in ${repo.name} (commit: ${commitHash.substring(0, 8)})...`);
    const phpFiles = collectPhpFiles(repo.path);
    log(`Found ${phpFiles.length} PHP files in ${repo.name}.`);

    totalFilesScanned += phpFiles.length;

    for (const phpFile of phpFiles) {
      const fileResults = scanFile(phpFile, repo.name, repo.path);

      scanResults.hooks.push(...fileResults.hooks);
      scanResults.shortcodes.push(...fileResults.shortcodes);
      scanResults.restRoutes.push(...fileResults.restRoutes);
      scanResults.wpCliCommands.push(...fileResults.wpCliCommands);
      scanResults.constants.push(...fileResults.constants);
    }

    // Sync images from this repo
    const syncedImages = syncImages(repo);
    scanResults.metadata.repos[repo.name].syncedImages = syncedImages.length;
  }

  // Sort hooks by name for consistent output
  scanResults.hooks.sort((a, b) => a.name.localeCompare(b.name));
  scanResults.shortcodes.sort((a, b) => a.name.localeCompare(b.name));
  scanResults.restRoutes.sort((a, b) => a.endpoint.localeCompare(b.endpoint));
  scanResults.wpCliCommands.sort((a, b) => a.command.localeCompare(b.command));
  scanResults.constants.sort((a, b) => a.name.localeCompare(b.name));

  // Update stats
  scanResults.stats = {
    totalFiles: totalFilesScanned,
    totalHooks: scanResults.hooks.length,
    totalActions: scanResults.hooks.filter((h) => h.type === 'action').length,
    totalFilters: scanResults.hooks.filter((h) => h.type === 'filter').length,
    totalShortcodes: scanResults.shortcodes.length,
    totalRestRoutes: scanResults.restRoutes.length,
    totalWpCliCommands: scanResults.wpCliCommands.length,
    totalConstants: scanResults.constants.length,
    reposScanned,
  };

  // Write output
  writeFileSync(OUTPUT_FILE, JSON.stringify(scanResults, null, 2), 'utf-8');
  log(`Scan complete. Results written to ${OUTPUT_FILE}`);
  log(`Stats: ${scanResults.stats.totalFiles} files, ${scanResults.stats.totalHooks} hooks, ${scanResults.stats.totalShortcodes} shortcodes, ${scanResults.stats.totalRestRoutes} REST routes, ${scanResults.stats.totalWpCliCommands} WP-CLI commands, ${scanResults.stats.totalConstants} constants.`);

  if (reposScanned === 0) {
    logError('No repositories were scanned successfully. Check network access and repository URLs.');
    process.exit(1);
  }
}

main().catch((error) => {
  logError(`Unhandled error: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});
