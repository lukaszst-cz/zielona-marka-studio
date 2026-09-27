import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("strona główna renderuje ofertę Zielonej Marki", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /cyfrowe miejsca/i);
  assert.match(html, /OFERTA I CENNIK/i);
  assert.match(html, /SZYBKA WYCENA/i);
  assert.match(html, /kontakt/i);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/i);
});

test("Studio korzysta z kontroli dostępu właściciela", async () => {
  const [page, auth, session] = await Promise.all([
    readFile(new URL("../app/studio/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/studio/auth.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/studio/session.ts", import.meta.url), "utf8"),
  ]);
  assert.match(page, /requireStudioOwner/);
  assert.match(page, /PRYWATNE ZAPLECZE/);
  assert.match(auth, /owner/i);
  assert.match(session, /session/i);
});

test("projekt deklaruje bazę D1 i nie zawiera starterowego preview", async () => {
  const [wrangler, packageJson] = await Promise.all([
    readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(wrangler, /"binding":\s*"DB"/);
  assert.match(wrangler, /"database_name":\s*"zielona-marka-db"/);
  assert.match(packageJson, /"name":\s*"zielona-marka-studio"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(packageJson, /@cloudflare\/workers-types/);
});
