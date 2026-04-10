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

## What's included

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

**PDF Reports** — Kundli, Dasha, Matchmaking, Varshaphal,
Download — 5 endpoints

## Documentation

Full API reference: [docs.asterwise.com](https://docs.asterwise.com)

## Support

support@asterwise.com
