// Copies the public infrastructure maps from the live site into the build, so deploying this app
// keeps them online. They are built and published from the costaserver repo (scripts/hosting/),
// which swaps single files into the live release; this script never changes them.
// Runs as a Firebase predeploy step after `npm run build`.
import { mkdir, writeFile } from 'node:fs/promises';

const SITE = 'https://costapaul.com';
const PAGES = ['/infrastructure/index.html', '/infrastructure/homeassistant/index.html'];
const OUT = new URL('../dist/homepage/browser/', import.meta.url);

for (const path of PAGES) {
  const response = await fetch(SITE + path, { cache: 'no-store' });
  const html = await response.text();
  // A missing page falls back to the Angular index.html; never ship that as the map
  if (!response.ok || html.includes('<app-root')) {
    throw new Error(`${path}: no live copy on ${SITE} (HTTP ${response.status})`);
  }
  const file = new URL('.' + path, OUT);
  await mkdir(new URL('.', file), { recursive: true });
  await writeFile(file, html);
  console.log(`${path}: ${html.length} bytes from ${SITE}`);
}
