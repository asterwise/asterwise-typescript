# asterwise

Official TypeScript SDK for the 
[Asterwise Vedic Astrology API](https://asterwise.com).

```bash
npm install asterwise
```

## Authentication

Get a free API key at [asterwise.com](https://asterwise.com).

```typescript
import { natalChart, createClient, createConfig } from 'asterwise';

const client = createClient(createConfig({
  baseUrl: 'https://api.asterwise.com',
  headers: {
    Authorization: 'Bearer YOUR_API_KEY',
  },
}));

const result = await natalChart({
  client,
  body: {
    date: '1985-11-12',
    time: '06:45',
    location: 'Mumbai, India',
    ayanamsa: 'lahiri',
  },
});

console.log(result.data);
```

## Requirements

Node.js 18+

## What's included in this SDK (v0.1.4)

The TypeScript SDK currently exposes **59 of 117** asterwise
platform operations organized into four categories:

**Astrology** — Natal chart, Dasha (5 levels), Yogas, Doshas,
Divisional charts (D1–D60), Ashtakavarga, Shadbala, Gochar,
Sade Sati, Dasha-Transit correlation, Matchmaking (Ashtakoota,
Dashakoot, Porutham, Thirumana Porutham, Papasamyam), Panchanga,
Choghadiya, Hora, Rahu Kaal, Muhurta, Varshaphal, Prashna,
Remedies, Gemstones, KP System, Lal Kitab, Atmakaraka,
Ishta Devata, Nakshatra — 38 endpoints

**Numerology** — Profile, Compatibility, Life Path, Personal Year,
Lucky Numbers, Number Meaning, Name Correction, Business Name,
Chaldean, Lo Shu, Mobile Number, Vehicle Number — 14 endpoints

**Horoscope** — Daily, Weekly, Monthly, Yearly × 12 Moon signs
— 4 endpoints

**Utilities** — Geocode (city → coordinates), Timezone lookup
— 2 endpoints

> **Platform scope**: The asterwise platform exposes 117 REST
> operations in total (covering Vedic astrology, Western astrology,
> numerology, horoscope, tarot, crystals, and dreams). The SDK
> regenerates from the OpenAPI specification to align with platform
> scope. For the complete API reference see
> [docs.asterwise.com](https://docs.asterwise.com).
> Coverage gap will close in the next SDK regeneration.

## Documentation

Full API reference: [docs.asterwise.com](https://docs.asterwise.com)

## Development

### Regenerating the SDK

The SDK is generated from the asterwise SDK OpenAPI spec at
`https://api.asterwise.com/openapi-sdk.json`. The contract that
governs which operations are exposed and what their method names
are lives in `asterwise-api/_docs/SDK_CONTRACT.md`.

`npm run generate` runs the OpenAPI generator AND a post-generate
hook (`scripts/post-generate.mjs`) that re-applies hand-edits the
generator would otherwise overwrite (currently: F-43 client re-exports).
The hook is idempotent — safe to run repeatedly.

To regenerate locally:

```bash
npm install
npm run generate
```

This invokes `@hey-api/openapi-ts` using the configuration in
`openapi-ts.config.ts`. It overwrites the generated files in
`src/` (`sdk.gen.ts`, `types.gen.ts`, `client/`).

To see what changed:

```bash
npm run generate:verify
```

To publish a new version after regeneration:

1. Bump `version` in `package.json` (semver — breaking changes
   require major bump after 1.0.0).
2. Update `CHANGELOG.md` with the changes.
3. `npm run build` to verify a clean build.
4. `npm publish` (requires npm credentials).

See `asterwise-api/_docs/audits/REFINE_PLAN_2026_05.md` for the
regeneration roadmap.

## Support

support@asterwise.com
