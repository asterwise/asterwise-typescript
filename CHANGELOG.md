# CHANGELOG

## 0.5.0 — 2026-10-04

Regenerated from the API as deployed on 2026-10-04. No function or request
field changed.

### Removed

- `ErrorCode` values `'endpoint_restricted'` and `'invalid_key_name'` (the
  generated type and `ALL_ERROR_CODES`). Both came only from the API's old
  unauthenticated `POST /v1/keys` route, which was retired; the SDK never
  called it. Keys are created in the dashboard.

## 0.4.0 — 2026-10-04

Regenerated from the API as deployed on 2026-10-04. No function or request
field changed. The minor version moves because five error codes were
removed, which can break code that names them.

### Removed

- Five `ErrorCode` values the API never returned:
  `'date_out_of_supported_range'`, `'polar_latitude_unsupported'`,
  `'interpretation_not_found'`, `'insufficient_tier'`,
  `'dependency_unavailable'` (the generated `ErrorCode` type and
  `ALL_ERROR_CODES`). Dates outside 1800-01-01 to 2099-12-31 come back as
  `'validation_error'`, as they already did.

### Fixed

- Natal crystal recommendation doc comment: "the Trikona Trikona
  lordship" and "lordsing" typos.

## 0.3.1 — 2026-09-28

Regenerated from the API as deployed on 2026-09-28 (engine 7d68ba3).
Additive only: no function, field or type was removed or narrowed.

### Added

- `utc_offset?: string | null` (`±HH:MM` or `±HH:MM:SS`) on every
  birth-data request type: an explicit offset that overrides the time
  zone's.
- `NatalResponse.birth_moment?: BirthMoment`: the UTC instant the chart
  used, the offset applied, `offset_basis` (`'iana' | 'local_mean_time' |
  'explicit_offset'`) and `local_time_status` (`'ok' | 'nonexistent' |
  'ambiguous'`).
- `AyanamshaSystemValue.true_value_decimal`: mean ayanamsa plus nutation,
  the offset the API subtracts from apparent positions. `value_decimal`
  stays the mean value.

The API fixes that came with these fields apply to 0.3.0 as well. See
https://docs.asterwise.com/reference/changelog.

## 0.3.0 — 2026-09-28

Regenerated from the API as deployed on 2026-09-28. No function was
removed; 118 functions, as before.

### Changed

- **45 operations now have typed responses instead of `unknown`**:
  `atmakaraka`, `ayanamsha`, `charDasha`, `dashaTransits`, `gemstones`,
  `ghatChakra`, `gochar`, `ishtaDevata`, `matchmakingDashakoot`,
  `matchmakingPapasamyam`, `matchmakingPorutham`,
  `matchmakingThirumanaPorutham`, `muhurta`, `nakshatra`,
  `nakshatraPrediction`, `pitraDosha`, `planetNature`, `pujaSuggestions`,
  `remedies`, `rudraksha`, `varshaphal`, `varshaphalHarshaBala`,
  `varshaphalSaham`, the four Vedic and four Western horoscope functions,
  `kpChart`, `kpRulingPlanets`, `kpSignificators`, `lalKitabChart`,
  `lalKitabRemedies`, `businessName`, `businessNamePost`, `chaldean`,
  `loShu`, `mobileNumber`, `nameCorrection`, `vehicleNumber`, `prashna`
  and `westernBiorhythm`. Runtime behaviour is unchanged; casts you wrote
  for `unknown` can be removed.

### Added

- Panchanga: the whole panchanga day (every tithi, nakshatra, yoga and
  karana with start and end times and kshaya/vriddhi flags; sunrise,
  sunset, moonrise, moonset; masa, samvat, ritu, ayana; the day's timings).
- Festival calendar: `categories` query parameter and per-entry `masa`,
  `tithi`, `rule`, `observance_window`,
  `end_date`, `sankranti` and `eclipse`.
- Muhurta: six more activities, `location`, `participants`,
  `max_windows_per_day`, `min_duration_minutes`; windows add `start_at`,
  `end_at`, `civil_date`, `panchanga_day`, `grade`, `reasons`, `cautions`.
- Divisional charts: `dignity`, `is_vargottama`, `house`, `houses`;
  nakshatra prediction: Tarabala cycles and `transit_nakshatras`.
- 208 more exported types.

### Fixed

- `PlanetNatureEntry.tattva` is `string | null` (null for Rahu and Ketu).

## 0.2.4 — 2026-09-05

### Changed

- License: the SDK is now MIT licensed (LICENSE file added; package.json
  previously pointed at a LICENSE file that did not exist). Use of the API
  itself remains governed by the Asterwise terms.
- Package description and keywords now state that the SDK is generated
  from the OpenAPI document, that positions are checked against NASA JPL
  Horizons (https://asterwise.com/accuracy/), and that an MCP server is
  available; README lead links the accuracy page; pricing URL fixed.
- No code changes.

## 0.2.3 — 2026-05-27

### Changed (cleanup — content provenance)

- SDK regenerated from post-F-130 asterwise-api OpenAPI.
  Generated files (src/sdk.gen.ts, src/types.gen.ts) no
  longer contain BPHS chapter citations, Phaladeepika /
  Robert Hand / classical text attributions in route
  descriptions or schema documentation.
- **Wire response shape changed (pitra-dosha endpoint):**
  `bphs_combinations_triggered` renamed to
  `combinations_triggered`; `bphs_combinations_count`
  renamed to `combinations_count`. Update any TypeScript
  code that reads these response fields.
- **Wire response shape changed:** `classical_source`,
  `classical_sources`, and `classical_note` fields removed
  from pitra-dosha, ghat-chakra, prediction, crystal, and
  sade-sati endpoint responses. Update any TypeScript code
  that reads these fields.

### Fixed

- README no longer claims "Classical accuracy" or "Classical
  BPHS source citations" — removed promotional language per
  asterwise-api/AUTHORING_RULES.md Rule 5 and Rule 2.
- `src/types/error_codes.ts` now regenerates correctly via
  `npm run generate` (previously deleted on every regen
  because openapi-ts overwrote files it didn't author).
  F-137/F-138 hardening.

## 0.2.2 — 2026-05-23

### Fixed

- **TypeScript nodenext compatibility**: published `.d.ts` files
  now include explicit `.js` extensions on all relative module
  specifiers. Previously, consumers with `moduleResolution:
  "nodenext"` + `skipLibCheck: false` (default for new TS
  projects) saw compile errors `TS2307` and `TS2834` when
  importing `asterwise`. Fixed at two levels:
  1. `openapi-ts.config.ts` sets `output.module.extension: ".js"`
     so the generator emits extension-correct sources.
  2. `fix-esm.mjs` now rewrites both `.js` and `.d.ts` files as
     a defense-in-depth safety net.
- **README domain table arithmetic**: the previous 8-row table
  double-counted matchmaking methods (5 inside AstrologyApi)
  and Western horoscope methods (4 inside WesternApi). Replaced
  with a disjoint 9-row partition that sums correctly to 117:
  Vedic 40, Matchmaking 5, Western 17, Horoscope 8, Numerology 24,
  KP+Lal Kitab 5, Tarot 9, Crystals & dreams 7, Utilities 2.

### Added

- `scripts/verify-nodenext.sh` — runs `tsc --strict --module
  nodenext` against the local `npm pack` output. Use after every
  regen or before publish to catch `.d.ts` extension regressions.
- `npm run verify:nodenext` script entry.

### Internal

- SDK regenerated from `https://api.asterwise.com/openapi-sdk.json`
  with the new module.extension config. No API surface changes —
  same 117 typed methods, same names, fully backward-compatible.

## 0.2.1 — 2026-05-23

### Docs

- World-class README rewrite, peer-SDK pattern
- Removed stale '59 of 117', 'Coverage gap', 'v0.1.4' language
- Updated to 'Vedic + Western + numerology + tarot + crystals + dreams' framing

### Metadata

- package.json description rewritten
- package.json keywords expanded from 8 to 13

### No code changes

- Docs-only patch. All 117 ops preserved. Upgrading from 0.2.0 is a
  no-op for code; useful for the corrected npm landing page metadata.

## 0.2.0 — 2026-05-22

### Added

- **58 new SDK operations** covering product domains absent from
  0.1.4: Western astrology (21 operations including natal, synastry,
  transits, returns, progressions, moon phase/calendar, biorhythm,
  horoscope by sun sign), Tarot (9 operations: card draws, spreads,
  suit references, card of the day), Numerology Pythagorean numbers
  and angel numbers (10 operations: expression_number,
  soul_urge_number, personality_number, maturity_number,
  balance_number, karmic_lessons, personal_cycles, angel_number,
  angel_today, angel_personal), Crystals (5 operations:
  crystals_list, crystal, crystals_by_planet, crystals_recommend,
  crystals_recommend_natal), Astrology gap-fills (11 operations:
  ayanamsha, ghat_chakra, nakshatra_prediction, panchanga_tamil,
  panchanga_festivals, pitra_dosha, planet_nature, puja_suggestions,
  rudraksha, varshaphal_harsha_bala, varshaphal_saham), Dreams
  (2 operations: dream_symbols, dream_symbol).

- **`./client` subpath export** in package.json's exports map.
  `import { createClient, createConfig } from 'asterwise/client'`
  is now a stable supported path. Closes F-74.

- **`createClient` and `createConfig` re-exported from the package
  root.** The README example
  `import { createClient, createConfig } from 'asterwise'`
  works out of the box. Closes F-43.

### Fixed

- **F-43**: createClient and createConfig were missing from the
  package entry in 0.1.4; the published README example caused
  `ReferenceError` at runtime. Now exported from `src/index.ts`.

- **F-36**: package-lock.json was at 0.1.3 while package.json was
  at 0.1.4 in the previous release. Both are now synced at 0.2.0.

### Changed

- **No breaking changes** for asterwise@0.1.4 consumers. All 59
  existing SDK method names preserved exactly per the curated
  contract in asterwise-api `_SDK_OPERATION_ID_MAP`. Existing
  calls (natalChart, dasha, numerologyProfile, horoscopeDaily,
  etc.) continue to work unchanged.

### Internal

- SDK is regenerated from `https://api.asterwise.com/openapi-sdk.json`
  via the in-repo `npm run generate` pipeline (introduced in 0.1.x
  era, hardened in Session 3 of REFINE_PLAN_2026_05.md).
- The SDK contract that governs operation surface and naming is
  documented in asterwise-api `_docs/SDK_CONTRACT.md`.
- CI guard in asterwise-api makes drift between platform and SDK
  contract mechanically impossible going forward.

## 0.1.4 — 2026-Q1

Initial public release. 59 curated operations.
