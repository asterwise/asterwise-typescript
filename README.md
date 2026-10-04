<p align="center">
  <img src="https://asterwise.com/public/logo.svg" alt="Asterwise" width="120" />
</p>

# asterwise

[![npm version](https://img.shields.io/npm/v/asterwise)](https://www.npmjs.com/package/asterwise)
[![Node](https://img.shields.io/node/v/asterwise)](https://www.npmjs.com/package/asterwise)

The official TypeScript library for **[Asterwise](https://asterwise.com)** — Vedic + Western astrology, numerology, tarot, crystals, and dreams. 117 endpoints, generated from the API's OpenAPI document so the types match what the server sends. Every position is [checked against NASA JPL Horizons](https://asterwise.com/accuracy/), median 0.046 arcseconds over 80 positions from 1950 to 2050. Compared row by row with seven other astrology APIs, every claim sourced, at [asterwise.com/compare](https://asterwise.com/compare/).

[Documentation](https://docs.asterwise.com) · [API Reference](https://docs.asterwise.com) · [Pricing](https://asterwise.com/pricing/) · [MCP server](https://asterwise.com/mcp/) · [Postman collection](https://documenter.getpostman.com/view/58005543/2sBYAvwr1u)

## Installation

```bash
npm install asterwise
```

## Quickstart

```typescript
import { createClient, createConfig, natalChart } from 'asterwise';

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

Get a free API key at [asterwise.com](https://asterwise.com).

## What you can build

| Domain | Operations |
|--------|------------|
| Vedic astrology | 40 |
| Matchmaking | 5 |
| Western astrology | 17 |
| Horoscope | 8 |
| Numerology | 24 |
| KP + Lal Kitab | 5 |
| Tarot | 9 |
| Crystals & dreams | 7 |
| Utilities | 2 |

*122 typed SDK methods across 13 API classes covering **117 REST endpoints** (5 endpoints keep a deprecated GET method next to the POST one).*

## What makes Asterwise different

- **Classical interpretation text** alongside the calculations on chart endpoints (natal chart, dasha, yogas, doshas)
- **5-level Vimshottari Dasha** (Maha → Antar → Pratyantar → Sookshma → Prana) — most APIs return two
- **Rajju and Vedha as hard vetoes** in matchmaking — not just point scores
- **HMAC-signed responses** for auditability
- **Panchanga as printed panchangs show it**: every tithi, nakshatra, yoga and karana of the day with start and end times, the festival and vrat calendar, and muhurta search with exact ISO times
- **Typed responses** for every operation, generated from the OpenAPI document
- **MCP server** with **104 tools** for Claude and Cursor integration

## Examples

```typescript
import {
  createClient,
  createConfig,
  westernNatalChart,
  lifePathPost,
  tarotThreeCard,
} from 'asterwise';

const client = createClient(createConfig({
  baseUrl: 'https://api.asterwise.com',
  headers: { Authorization: 'Bearer YOUR_API_KEY' },
}));

const western = await westernNatalChart({
  client,
  body: {
    date: '1985-11-12',
    time: '06:45',
    location: 'Mumbai, India',
  },
});

const path = await lifePathPost({
  client,
  body: { date: '1985-11-12' },
});

const spread = await tarotThreeCard({
  client,
  body: { question: 'What should I focus on this month?' },
});
```

## Requirements

Node.js 18+. An API key from [asterwise.com](https://asterwise.com).

## Documentation

Full API reference: [docs.asterwise.com](https://docs.asterwise.com)

## Development

Regenerate from `https://api.asterwise.com/openapi-sdk.json`:

```bash
npm run generate
```

The `scripts/post-generate.mjs` hook re-exports `createClient` and `createConfig` from the package root after each generation.

**Releasing:** `npm run generate` → bump `version` in `package.json` → `npm install` (syncs the lockfile) → update `CHANGELOG.md` → `npm test` and `npm run verify:nodenext` → commit → push a `typescript-v<version>` tag. The publish workflow checks the tag against `package.json`, runs the tests and the nodenext check, builds and publishes with provenance.

## Support

support@asterwise.com

## License

Commercial. See [LICENSE](LICENSE).
