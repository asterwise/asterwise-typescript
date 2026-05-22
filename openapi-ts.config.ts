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
    // @hey-api 0.96+ deprecated format/lint in favor of postProcess.
    postProcess: ["prettier", "eslint"],
  },
  plugins: [
    "@hey-api/client-fetch",
    "@hey-api/sdk",
    "@hey-api/typescript",
  ],
});
