import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, extname } from 'path';

function fixFile(filePath) {
  let content = readFileSync(filePath, 'utf8');
  // Fix relative imports that don't have .js extension
  // But skip if it already ends in .js or points to a directory (./client -> ./client/index.js)
  content = content.replace(
    /from ['"](\.[^'"]+)['"]/g,
    (match, p) => {
      if (p.endsWith('.js') || p.endsWith('.json')) return match;
      const quote = match.includes("'") ? "'" : '"';
      // Check if it resolves to a directory
      const base = filePath.replace(/\/[^/]+$/, '');
      const resolved = join(base, p);
      try {
        const stat = statSync(resolved);
        if (stat.isDirectory()) {
          return `from ${quote}${p}/index.js${quote}`;
        }
      } catch {}
      return `from ${quote}${p}.js${quote}`;
    }
  );
  writeFileSync(filePath, content);
}

function walkDir(dir) {
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (statSync(full).isDirectory()) walkDir(full);
    else if (extname(f) === '.js') fixFile(full);
  }
}

walkDir('./dist');
console.log('ESM imports fixed');
