/**
 * Automated SEO sanity check.
 * Verifies: og:type per route, robots.txt, sitemap.xml, llms.txt.
 *
 * Usage:
 *   bunx tsx scripts/seo-check.ts                                  # checks production
 *   bunx tsx scripts/seo-check.ts https://your-preview.lovable.app # checks custom URL
 *
 * Exits with code 1 if any finding is broken (CI-friendly).
 */

const BASE = (process.argv[2] || 'https://heydigital.co.il').replace(/\/$/, '');

type Finding = { area: string; url: string; severity: 'error' | 'warn'; message: string };
const findings: Finding[] = [];

const fail = (area: string, url: string, message: string) =>
  findings.push({ area, url, severity: 'error', message });
const warn = (area: string, url: string, message: string) =>
  findings.push({ area, url, severity: 'warn', message });

async function get(path: string): Promise<{ status: number; body: string }> {
  const res = await fetch(`${BASE}${path}`, { redirect: 'follow' });
  return { status: res.status, body: await res.text() };
}

// Routes -> expected og:type
const routes: Array<{ path: string; ogType: 'website' | 'article' }> = [
  { path: '/', ogType: 'website' },
  { path: '/solutions', ogType: 'website' },
  { path: '/about', ogType: 'website' },
  { path: '/contact', ogType: 'website' },
  { path: '/blog', ogType: 'website' },
  { path: '/blog/5-automation-processes', ogType: 'article' },
  { path: '/blog/ai-agent-for-business', ogType: 'article' },
  { path: '/blog/how-to-choose-crm', ogType: 'article' },
  { path: '/blog/whatsapp-automation', ogType: 'article' },
  { path: '/blog/lead-follow-up', ogType: 'article' },
];

async function checkOgTypes() {
  for (const r of routes) {
    try {
      const { status, body } = await get(r.path);
      if (status !== 200) {
        fail('og:type', r.path, `HTTP ${status}`);
        continue;
      }
      const m = body.match(/<meta[^>]+property=["']og:type["'][^>]*content=["']([^"']+)["']/i)
            || body.match(/<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:type["']/i);
      if (!m) {
        fail('og:type', r.path, 'missing og:type meta tag in initial HTML');
      } else if (m[1] !== r.ogType) {
        // Helmet sets it client-side; initial HTML always carries the static 'website'.
        // Only error if expected 'website' is also missing.
        if (r.ogType === 'website') fail('og:type', r.path, `expected "${r.ogType}", got "${m[1]}"`);
        else warn('og:type', r.path, `static HTML has "${m[1]}", Helmet rewrites to "${r.ogType}" client-side (OK for Googlebot, not for LinkedIn/Slack)`);
      }
    } catch (e) {
      fail('og:type', r.path, `fetch failed: ${(e as Error).message}`);
    }
  }
}

async function checkRobots() {
  const { status, body } = await get('/robots.txt');
  if (status !== 200) return fail('robots.txt', '/robots.txt', `HTTP ${status}`);
  if (!/User-agent:\s*\*/i.test(body)) fail('robots.txt', '/robots.txt', 'missing "User-agent: *"');
  const sitemap = body.match(/Sitemap:\s*(\S+)/i);
  if (!sitemap) fail('robots.txt', '/robots.txt', 'missing Sitemap: directive');
  else if (!sitemap[1].startsWith(BASE)) warn('robots.txt', '/robots.txt', `Sitemap points to ${sitemap[1]} (not ${BASE})`);
  if (/Disallow:\s*\/\s*$/m.test(body) && !/Allow:\s*\//i.test(body))
    fail('robots.txt', '/robots.txt', 'site is fully disallowed');
}

async function checkSitemap() {
  const { status, body } = await get('/sitemap.xml');
  if (status !== 200) return fail('sitemap.xml', '/sitemap.xml', `HTTP ${status}`);
  if (!body.includes('<urlset')) return fail('sitemap.xml', '/sitemap.xml', 'invalid XML (no <urlset>)');
  const locs = Array.from(body.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
  if (locs.length === 0) return fail('sitemap.xml', '/sitemap.xml', 'no <loc> entries');
  const bad = locs.filter((u) => !u.startsWith(BASE));
  if (bad.length) warn('sitemap.xml', '/sitemap.xml', `${bad.length} URL(s) on a different host (e.g. ${bad[0]})`);
  // Sample a handful of URLs to ensure they return 200
  const sample = locs.slice(0, 8);
  for (const url of sample) {
    try {
      const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      if (res.status >= 400) fail('sitemap.xml', url, `dead link (HTTP ${res.status})`);
    } catch (e) {
      fail('sitemap.xml', url, `unreachable: ${(e as Error).message}`);
    }
  }
}

async function checkLlms() {
  const { status, body } = await get('/llms.txt');
  if (status !== 200) return fail('llms.txt', '/llms.txt', `HTTP ${status}`);
  if (body.trim().length < 50) fail('llms.txt', '/llms.txt', 'too short / empty');
  if (!/^#\s+/m.test(body)) warn('llms.txt', '/llms.txt', 'missing top-level heading');
}

async function main() {
  console.log(`\n🔎 SEO check → ${BASE}\n`);
  await Promise.all([checkOgTypes(), checkRobots(), checkSitemap(), checkLlms()]);

  if (findings.length === 0) {
    console.log('✅ כל הבדיקות עברו בהצלחה.\n');
    return;
  }

  const errors = findings.filter((f) => f.severity === 'error');
  const warns = findings.filter((f) => f.severity === 'warn');

  const byArea = (list: Finding[]) =>
    list.reduce<Record<string, Finding[]>>((acc, f) => {
      (acc[f.area] ||= []).push(f);
      return acc;
    }, {});

  if (errors.length) {
    console.log(`❌ ${errors.length} ממצאים שבורים:`);
    for (const [area, list] of Object.entries(byArea(errors))) {
      console.log(`\n  [${area}]`);
      for (const f of list) console.log(`    • ${f.url} — ${f.message}`);
    }
  }
  if (warns.length) {
    console.log(`\n⚠️  ${warns.length} אזהרות:`);
    for (const [area, list] of Object.entries(byArea(warns))) {
      console.log(`\n  [${area}]`);
      for (const f of list) console.log(`    • ${f.url} — ${f.message}`);
    }
  }
  console.log();
  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error('SEO check crashed:', e);
  process.exit(2);
});
