import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("marketing homepage presents product and developer journeys", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /The intelligence layer for/);
  assert.match(page, /AdaptiveDemo/);
  assert.match(page, /Start integrating/);
  assert.match(page, /Explore security architecture/);
  assert.doesNotMatch(page, /IRAP|advisor meeting|Deepak/i);
});

test("site includes full developer, solutions, and security surfaces", async () => {
  const [developers, solutions, security, guide] = await Promise.all([
    readFile(new URL("../app/developers/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/solutions/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/security/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/guide/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(developers, /Three calls complete the loop/);
  assert.match(solutions, /EdTech applications/);
  assert.match(security, /Pseudonymous learners/);
  assert.match(guide, /Roll out through shadow mode/);
});

test("responsive and accessible presentation rules remain present", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\.mobile-toggle/);
});
