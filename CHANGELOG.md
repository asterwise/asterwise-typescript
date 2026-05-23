# CHANGELOG

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
