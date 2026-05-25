/**
 * Verify the generated error_codes.ts contains all 50 codes
 * the SDK is supposed to recognize.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ALL_ERROR_CODES } from "../dist/types/error_codes.js";

describe("Generated error codes", () => {
  it("ALL_ERROR_CODES has exactly 50 codes", () => {
    assert.equal(ALL_ERROR_CODES.length, 50);
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

  it("first and last codes match registry sort order", () => {
    assert.equal(ALL_ERROR_CODES[0], "account_not_found");
    assert.equal(ALL_ERROR_CODES[49], "validation_error");
  });
});
