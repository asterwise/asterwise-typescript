#!/usr/bin/env bash
# Verifies the published artifact compiles under TypeScript strict
# + moduleResolution=nodenext + skipLibCheck=false. Catches the
# bug fixed in 0.2.2 (.d.ts files missing .js extensions) if it
# ever regresses.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRATCH="$(mktemp -d -t asterwise-nodenext-verify.XXXXXX)"

trap 'rm -rf "$SCRATCH"' EXIT

cd "$REPO_ROOT"
if [ ! -d dist ]; then
    echo "ERR: dist/ not built. Run 'npm run build' first." >&2
    exit 1
fi

echo "→ Packing local artifact..."
tarball="$(npm pack --silent 2>/dev/null | tail -1)"
mv "$tarball" "$SCRATCH/asterwise-local.tgz"

cd "$SCRATCH"
npm init -y > /dev/null 2>&1
echo "→ Installing local artifact + typescript..."
npm install ./asterwise-local.tgz typescript@5 --silent

cat > tsconfig.json << 'JSONEOF'
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "strict": true,
    "target": "es2022",
    "esModuleInterop": true,
    "skipLibCheck": false,
    "noEmit": true
  }
}
JSONEOF

cat > test.ts << 'TSEOF'
import {
  createClient,
  createConfig,
  natalChart,
  westernNatalChart,
  lifePath,
  tarotThreeCard,
} from 'asterwise';
const client = createClient(createConfig({
  baseUrl: 'https://api.asterwise.com',
  headers: { Authorization: 'Bearer YOUR_API_KEY' },
}));
void client;
void natalChart;
void westernNatalChart;
void lifePath;
void tarotThreeCard;
TSEOF

echo "→ Running tsc strict + nodenext..."
if npx tsc --noEmit; then
    echo "✓ asterwise compiles cleanly under TypeScript strict + nodenext"
else
    echo "✗ asterwise FAILED nodenext compile. See errors above." >&2
    exit 1
fi
