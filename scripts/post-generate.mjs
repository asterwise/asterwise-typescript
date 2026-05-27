#!/usr/bin/env node
/**
 * Post-generate hook — runs after `npm run generate`.
 *
 * Purpose: re-apply hand-edits to generated files that
 * @hey-api/openapi-ts overwrites on every run. Each block is
 * documented with the finding it closes.
 *
 * Idempotent: safe to run multiple times. Each patch checks for
 * its marker before applying.
 *
 * If this script is removed or broken:
 * - F-43 (createClient/createConfig package-root export) silently
 *   regresses on the next regen
 * - README example
 *     import { createClient, createConfig } from 'asterwise'
 *   starts throwing ReferenceError at runtime
 * - F-138 (src/types/error_codes.ts) silently deleted on every regen
 */
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const INDEX_TS = resolve(REPO_ROOT, "src/index.ts");

// ============================================================
// Patch 1 — F-43: re-export createClient/createConfig from package root
// ============================================================
//
// @hey-api 0.96 generates src/index.ts that re-exports sdk.gen.ts
// and types.gen.ts but NOT src/client. Without this patch, the
// README example
//   import { createClient, createConfig } from 'asterwise'
// resolves at build time but creates an undefined import at
// runtime.

const F43_MARKER = "/* F-43: client re-exports */";
const F43_BLOCK = `
${F43_MARKER}
export { createClient, createConfig } from './client';
export type { Client, Config, CreateClientConfig } from './client';
`;

function applyF43Patch() {
  const original = readFileSync(INDEX_TS, "utf8");

  if (original.includes(F43_MARKER)) {
    console.log("  ✓ F-43 patch already present");
    return false;
  }

  // Append the patch at the end (idempotent location)
  const patched = original.trimEnd() + "\n" + F43_BLOCK;
  writeFileSync(INDEX_TS, patched);
  console.log("  ✓ F-43 patch applied to src/index.ts");
  return true;
}

// ============================================================
// Patch 2 — F-138: regenerate src/types/error_codes.ts
// ============================================================
//
// openapi-ts writes to src/ directly and overwrites any
// hand-managed types files. F-137 surfaced that
// src/types/error_codes.ts and src/types/index.ts (produced
// by asterwise-api/scripts/generate_error_artifacts.py)
// were deleted on every regen.
//
// Run the error_codes generator after openapi-ts to restore
// both files. Generator requires Python 3.10+ and reads from
// asterwise-api/app/core/error_codes.py.

const ASTERWISE_API_ROOT = resolve(REPO_ROOT, "../asterwise-api");
const ERROR_GEN = resolve(
  ASTERWISE_API_ROOT,
  "scripts/generate_error_artifacts.py"
);

function runErrorCodesGenerator() {
  try {
    readFileSync(ERROR_GEN, "utf8");
  } catch {
    console.warn(
      `  ⚠ F-138 SKIP: error codes generator not found at ${ERROR_GEN}\n` +
        "    Manual recovery: cd ../asterwise-api && \n" +
        "    python3 scripts/generate_error_artifacts.py --write --write-sdks"
    );
    return false;
  }

  console.log("  → F-138: regenerating src/types/error_codes.ts...");

  const result = spawnSync(
    "python3",
    [
      ERROR_GEN,
      "--write",
      "--write-sdks",
      "--api-root",
      ASTERWISE_API_ROOT,
      "--typescript-sdk-root",
      REPO_ROOT,
    ],
    {
      cwd: ASTERWISE_API_ROOT,
      encoding: "utf8",
    }
  );

  if (result.status !== 0) {
    console.error(
      `  ✗ F-138 FAILED: error codes generator exited ${result.status}\n` +
        `    stderr: ${result.stderr}\n` +
        "    Manual recovery: cd ../asterwise-api && \n" +
        "    python3 scripts/generate_error_artifacts.py --write --write-sdks"
    );
    return false;
  }

  console.log("  ✓ F-138 patch applied via error codes generator");
  return true;
}

// ============================================================
// Main
// ============================================================

console.log("Post-generate hook starting...");
let changes = 0;

if (applyF43Patch()) changes++;
if (runErrorCodesGenerator()) changes++;

if (changes === 0) {
  console.log("Post-generate hook complete — no changes needed.");
} else {
  console.log(
    `Post-generate hook complete — ${changes} patch(es) applied.`
  );
}
