# asterwise-sdks + crawler facts — Migration Runbook (alignment)

> Deploy target: this runbook governs **`asterwise-python`**, **`asterwise-typescript`**,
> and the three **`llms.txt`** / **`platform-stats.json`** fact surfaces. Keep a copy in
> each SDK repo root as `MIGRATION.md` if you touch it.
> Prereq: **`TRUTH-RECONCILIATION.md` GATE 0 green.** This runbook **finishes before** the
> web and docs deploys, because both embed the numbers it governs.
>
> **Mental model:** the SDKs are **generated from the OpenAPI spec** — there is **no
> design migration** in them. The only work here is **fact alignment**: versions, endpoint
> counts, and making the machine-readable surfaces (`llms.txt`, `platform-stats.json`,
> README badges, package descriptions) all agree with `FACTS.md` and the **live spec** —
> and stay that way (generated, not hand-edited).

---

## 0. Verified facts

- **Python SDK** `asterwise-python` — v**0.2.3** on PyPI; covers **118/118** product
  operations (`sdk_contract.py` has 118 map entries). Generated via OpenAPI SDK contract.
- **TypeScript SDK** `asterwise-typescript` — v**0.2.3** on npm; **118/118**
  (`sdk.gen.ts` has 118 exports). Generated via `openapi-ts` + post-generate.
- **SDKs exclude** the 56 internal routes (`/v1/auth`, `/oauth`, `/billing`, `/account`,
  `/keys`, `/internal`) — correct; do not document those publicly.
- **Three `llms.txt` surfaces** exist and currently disagree:
  - design project root `llms.txt` — **richest + correct (118, 0.2.3, pricing ✓)** → the
    **canonical source**.
  - `asterwise-web/llms.txt` — deployed, says **"115+"**, links the ugly
    `…/pages/pricing.html`.
  - `asterwise-docs/static/llms.txt` — separate copy.
- **`asterwise-web/src/_data/platform-stats.json`** — says endpoints **115**, Numerology
  **24**, total mismatched vs FACTS (118 ops / 115 paths, Numerology tag rollup 26).
- Background + open questions: design project `HANDOVER-ask-your-assistant.md` and
  `CLAUDE.md §11`.

---

## 1. PHASE 1 — Canonicalize `llms.txt` (one source, deployed twice)

1. Adopt the **design project root `llms.txt`** as canonical (it already leads with Vedic
   **AND** Western, lists ayanamsas + house systems, has the Accuracy & methodology
   section, and states **118 / 103 / 0.2.3**).
2. **Apply Gate-0 fixes** to it before shipping:
   - [ ] Endpoint phrasing matches the chosen count (T-3).
   - [ ] Soften the BPHS line — "rules cited to classical sources" not "cited
         chapter-and-verse per interpretation in the JSON" (the yoga route returns
         `modern_summary` only) (T-4).
   - [ ] Pricing URL → the final clean web URL (`/pricing`) not `…/pages/pricing.html`.
   - [ ] CIN: keep only if you accept it's web/llms-only (UNVERIFIED in API code) — phrase
         as company registration, don't imply API-verified.
3. **Deploy to both:**
   - `asterwise-web/llms.txt` (root — `.eleventy.js` passthrough-copies it to `_site/`).
   - `asterwise-docs/static/llms.txt` (Docusaurus serves `static/` at root; config already
     advertises `/llms.txt` via `headTags`).
4. Keep `asterwise-docs/static/errors-llms.md` consistent with it.

**Verify**
- [ ] `diff` the two deployed `llms.txt` — identical (or intentionally docs-scoped).
- [ ] No banned values (grep from Truth §2). Endpoint/tool/version counts all canonical.

---

## 2. PHASE 2 — Regenerate `platform-stats.json`

This file feeds web `_data`. Regenerate from the **live spec + tools count**, don't
hand-edit (hand-edits drift).

```bash
curl -s https://api.asterwise.com/openapi.json -o /tmp/openapi.json
# endpoints = operations; paths = path count; tags = rollup; mcp_tools = @mcp.tool count
```
Target values: `endpoints: 118`, `paths: 115`, `mcp_tools: 103`, and `endpoints_by_tag`
matching FACTS §A.2 (Astrology 38, Numerology 26*, Western Astrology 16, Tarot 9,
Advanced 6, Western 5, Crystals 5, Horoscope 4, KP 3, Lal Kitab 2, Dreams 2, Utilities 2,
Prashna 1). Set `endpoints_marketing` to the chosen phrasing.

**Verify**
- [ ] `jq '.totals' platform-stats.json` shows 118 / 115 / 103.
- [ ] Sum of `endpoints_by_tag` == 118 (note the Numerology double-tag footnote).
- [ ] Any web page reading `platform-stats` now renders the canonical numbers.

---

## 3. PHASE 3 — SDK fact surfaces (no code changes, just metadata)

The SDK **code** is generated and correct (118/118, 0.2.3). Only fix the **human-readable
metadata**:

| Surface | Fix |
|---|---|
| `asterwise-python/README.md`, `pyproject.toml` description | "118 endpoints" (not 115+/100+); version 0.2.3 |
| `asterwise-typescript/README.md`, `package.json` description | same |
| PyPI / npm long descriptions | re-publish only if a release is already planned; otherwise queue with next version bump |
| Any "115+ endpoints" / "0.1.x" badge | → 118 / 0.2.3 (T-2/T-7) |

> Do **not** cut a new SDK release solely for description copy unless the team wants one.
> If endpoints changed in the API, regenerate the SDK from the spec instead of hand-editing.

**Verify**
- [ ] `pip index versions asterwise` and `npm view asterwise version` both report 0.2.3.
- [ ] READMEs cite 118 and 0.2.3; no stale counts.

---

## 4. PHASE 4 — Drift guard (so this never breaks again)

- [ ] `llms.txt` and `platform-stats.json` are **generated from OpenAPI** (wire/keep a
      script; the `_docs`/`scripts` generators referenced in `platform-stats.json.sources`).
- [ ] Add the **automated endpoint check** from Truth §3b to CI (live spec == FACTS ==
      Python contract == TS exports == 118). Fail the build on drift.
- [ ] (Roadmap, from `CLAUDE.md §11` / `HANDOVER-ask-your-assistant.md`) make docs
      crawlable (static HTML + an `llms-full.txt` inlining the reference) and publish an
      "Accuracy & validation" page with worked reference charts — improves the
      "ask your assistant" verdicts. Track separately; not a cutover blocker.

---

## 5. ⛔ SIGN-OFF GATE — SDK + crawler facts

- [ ] Canonical `llms.txt` deployed to web root **and** docs `static/` (identical, Gate-0 clean).
- [ ] `platform-stats.json` regenerated to 118 / 115 / 103; tag sum verified.
- [ ] SDK READMEs/descriptions cite 118 + 0.2.3; published versions confirmed 0.2.3/0.2.3.
- [ ] Automated endpoint-count check passes and is wired into CI.
- [ ] This gate completed **before** the web and docs deploys (they embed these numbers).
- [ ] **Human sign-off:** __________________ (name / date).
