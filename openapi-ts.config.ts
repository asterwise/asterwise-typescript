/**
 * @hey-api/openapi-ts configuration for asterwise-typescript SDK regeneration.
 *
 * Source spec: https://api.asterwise.com/openapi-sdk.json
 *   (NOT the full /openapi.json — the SDK consumes the curated
 *    contract spec; see asterwise-api/_docs/SDK_CONTRACT.md)
 *
 * Regenerate locally:
 *   npm run generate
 *
 * Procedure for a new SDK release: see asterwise-typescript/README.md
 * "Development" section.
 */
import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://api.asterwise.com/openapi-sdk.json",
  output: {
    path: "src",
    // Emit explicit .js extensions in module specifiers. Required so
    // generated .d.ts files use specifiers like
    //   from './sdk.gen.js'
    // instead of
    //   from './sdk.gen'
    // The former resolves correctly under TypeScript's nodenext
    // module resolution; the latter throws TS2307 / TS2834 for
    // strict + nodenext consumers (the default for new TS projects).
    // See https://github.com/hey-api/openapi-ts docs for the
    // output.module.extension option.
    module: { extension: ".js" },
    // No postProcess: prettier and eslint aren't dependencies here. Before
    // 0.99 the generator skipped them silently; 0.99 fails instead.
  },
  plugins: [
    "@hey-api/client-fetch",
    "@hey-api/sdk",
    "@hey-api/typescript",
  ],
});
