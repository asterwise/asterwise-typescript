/**
 * getMyUsage is written by hand (the SDK spec leaves out /v1/keys/), so it is
 * tested against a real HTTP server rather than trusted to the generator.
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createClient, createConfig, getMyUsage } from "../dist/index.js";

const USAGE = {
  calls_used: 1234, calls_limit: 50000, calls_remaining: 48766, percent_used: 2.47, tier: "starter",
  burst_limit: 60, reset_date: "2026-11-01", period_start: "2026-10-01", period_end: "2026-10-31",
};

let server;
let baseUrl;
const seen = {};

before(async () => {
  server = createServer((req, res) => {
    seen.path = req.url;
    seen.auth = req.headers.authorization;
    const ok = seen.auth === "Bearer good";
    res.writeHead(ok ? 200 : 401, { "Content-Type": "application/json" });
    res.end(JSON.stringify(ok ? { success: true, message: "success", data: USAGE } : { success: false, error: "invalid_api_key" }));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

const clientFor = (key) => createClient(createConfig({ baseUrl, auth: key }));

describe("getMyUsage", () => {
  it("returns the data block with the key as a Bearer token", async () => {
    const res = await getMyUsage({ client: clientFor("good") });
    assert.deepEqual(res.data.data, USAGE);
    assert.equal(seen.path, "/v1/keys/me/usage");
    assert.equal(seen.auth, "Bearer good");
  });

  it("returns the error body for a bad key, or throws with throwOnError", async () => {
    const res = await getMyUsage({ client: clientFor("bad") });
    assert.equal(res.response.status, 401);
    assert.equal(res.error.error, "invalid_api_key");
    await assert.rejects(getMyUsage({ client: clientFor("bad"), throwOnError: true }));
  });
});
