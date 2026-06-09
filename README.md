<p align="center">
  <img src="https://asterwise.com/public/logo.svg" alt="Asterwise" width="120" />
</p>

# asterwise

[![npm version](https://img.shields.io/npm/v/asterwise)](https://www.npmjs.com/package/asterwise)
[![Node](https://img.shields.io/node/v/asterwise)](https://www.npmjs.com/package/asterwise)

The official TypeScript library for **[Asterwise](https://asterwise.com)** — Vedic + Western astrology, numerology, tarot, crystals, and dreams. 118 endpoints. Ships in days.

[Documentation](https://docs.asterwise.com) · [API Reference](https://docs.asterwise.com) · [Pricing](https://asterwise.com/pages/pricing.html) · [MCP server](https://mcp.asterwise.com)

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

*118 typed SDK methods across 13 API classes covering **118 REST endpoints**.*

## What makes Asterwise different

- **Structured classical interpretations** on every response
- **5-level Vimshottari Dasha** (Maha → Antar → Pratyantar → Sookshma → Prana) — most APIs return two
- **Rajju and Vedha as hard vetoes** in matchmaking — not just point scores
- **HMAC-signed responses** for auditability
- **MCP server** with **103 tools** for Claude and Cursor integration

## Examples

```typescript
import {
  createClient,
  createConfig,
  westernNatalChart,
  lifePath,
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

const path = await lifePath({
  client,
  query: { date: '1985-11-12' },
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

**Versioning:** regenerate → bump `version` in `package.json` → `npm install` (sync lockfile) → update `CHANGELOG.md` → `npm run build` → `npm publish`.

## Support

support@asterwise.com

## License

Commercial. See [LICENSE](LICENSE).
