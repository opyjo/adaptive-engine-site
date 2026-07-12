import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("marketing homepage presents product and developer journeys", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /The intelligence layer for/);
  assert.match(page, /AdaptiveDemo/);
  assert.match(page, /Request design-partner access/);
  assert.match(page, /Explore security architecture/);
  assert.doesNotMatch(page, /IRAP|advisor meeting|Deepak/i);
});

test("site includes full developer, solutions, and security surfaces", async () => {
  const [developers, solutions, security, guide, pricing, partner] = await Promise.all([
    readFile(new URL("../app/developers/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/solutions/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/security/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/guide/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/pricing/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/design-partner/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(developers, /Three calls complete the loop/);
  assert.match(solutions, /EdTech applications/);
  assert.match(security, /Pseudonymous learners/);
  assert.match(guide, /Roll out through shadow mode/);
  assert.match(pricing, /Start with evidence/);
  assert.match(partner, /DesignPartnerForm/);
  assert.match(developers, /typescriptClientSnippet/);
});

test("design-partner handoff validates input and requires configured email delivery", async () => {
  const route = await readFile(new URL("../app/api/design-partner/route.ts", import.meta.url), "utf8");
  assert.match(route, /RESEND_API_KEY/);
  assert.match(route, /DESIGN_PARTNER_TO_EMAIL/);
  assert.match(route, /idempotency|companyFax|isRateLimited/);
  assert.match(route, /Invalid request origin/);
});

test("responsive and accessible presentation rules remain present", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\.mobile-toggle/);
});
