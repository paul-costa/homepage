// Writes the private part of the server menu to Firestore: the admin accounts (admins/{email}) and
// the document private/server (link groups, LLM monitor URL). The data stays out of this public
// repo; keep it in private/server.json (git-ignored). Uses the firebase-tools login on this machine.
// Usage: node scripts/set-private-config.mjs private/server.json
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const PROJECT = JSON.parse(readFileSync(new URL('../.firebaserc', import.meta.url), 'utf8')).projects.default;
const file = process.argv[2];
if (!file) throw new Error('usage: node scripts/set-private-config.mjs <server.json>');
const { admins, server } = JSON.parse(readFileSync(file, 'utf8'));
if (!Array.isArray(admins) || !server?.groups) throw new Error('expected { admins: [...], server: { groups, llmMonitorUrl } }');

const FT = execSync('npm root -g').toString().trim() + '/firebase-tools/lib/';
const require = createRequire(import.meta.url);
const { requireAuth } = require(FT + 'requireAuth.js');
const { getGlobalDefaultAccount } = require(FT + 'auth.js');
const { Client } = require(FT + 'apiv2.js');

function toValue(value) {
  if (value === null) return { nullValue: null };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(toValue) } };
  if (typeof value === 'object') return { mapValue: { fields: toFields(value) } };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  return { stringValue: String(value) };
}

function toFields(object) {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, toValue(value)]));
}

const account = getGlobalDefaultAccount();
await requireAuth({ user: account.user, tokens: account.tokens });
const firestore = new Client({ urlPrefix: 'https://firestore.googleapis.com', apiVersion: 'v1', auth: true });
const documents = `/projects/${PROJECT}/databases/(default)/documents`;

for (const email of admins) {
  await firestore.patch(`${documents}/admins/${encodeURIComponent(email)}`, { fields: { addedAt: { timestampValue: new Date().toISOString() } } });
  console.log('admin', email);
}
await firestore.patch(`${documents}/private/server`, { fields: toFields(server) });
const links = server.groups.reduce((sum, group) => sum + group.links.length, 0);
console.log(`private/server: ${server.groups.length} groups, ${links} links, LLM monitor ${server.llmMonitorUrl ?? 'none'}`);
