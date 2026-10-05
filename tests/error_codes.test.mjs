/**
 * Verify the generated error_codes.ts is internally consistent.
 *
 * The expected count is read from the generator's own header comment
 * ("Generated from N codes (hash ...)") in src/types/error_codes.ts so
 * regenerating after the API registry grows needs no test edit.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ALL_ERROR_CODES } from "../dist/types/error_codes.js";

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, "..", "src", "types", "error_codes.ts"), "utf8");
const headerMatch = source.match(/Generated from (\d+) codes/);

describe("Generated error codes", () => {
  it("header line 'Generated from N codes' is present", () => {
    assert.ok(headerMatch, "generator header not found in src/types/error_codes.ts");
  });

  it("ALL_ERROR_CODES length matches the generated header", () => {
    assert.equal(ALL_ERROR_CODES.length, Number(headerMatch[1]));
  });

  it("ALL_ERROR_CODES is a sane size (guards empty/truncated regeneration)", () => {
    assert.ok(ALL_ERROR_CODES.length >= 40 && ALL_ERROR_CODES.length <= 200);
  });

  it("ALL_ERROR_CODES is alphabetically sorted", () => {
    const sortedCopy = [...ALL_ERROR_CODES].sort();
    assert.deepEqual([...ALL_ERROR_CODES], sortedCopy);
  });

  it("ALL_ERROR_CODES contains no duplicates", () => {
    assert.equal(new Set(ALL_ERROR_CODES).size, ALL_ERROR_CODES.length);
  });

  it("well-known codes are present", () => {
    const expectedPresent = [
      "validation_error",
      "api_key_revoked",
      "api_key_invalid",
      "burst_limit_exceeded",
      "internal_error",
      "subscription_expired",
      "resource_not_found",
    ];
    for (const code of expectedPresent) {
      assert.ok(ALL_ERROR_CODES.includes(code));
    }
  });

  it("ALL_ERROR_CODES is a readonly array", () => {
    assert.ok(Array.isArray(ALL_ERROR_CODES));
  });

  it("the ErrorCode type lists exactly the runtime codes, in the same order", () => {
    const union = source.match(/export type ErrorCode =([\s\S]*?);/);
    assert.ok(union, "ErrorCode union not found in src/types/error_codes.ts");
    const typeCodes = [...union[1].matchAll(/"([a-z0-9_]+)"/g)].map((m) => m[1]);
    assert.deepEqual(typeCodes, [...ALL_ERROR_CODES]);
  });
});
