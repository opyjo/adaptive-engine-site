// Copies the engine's OpenAPI spec into public/ and points servers: at
// production. Re-run (npm run sync:openapi) whenever the engine API changes.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, "../../adaptive-engine/openapi.yaml");
const target = path.resolve(here, "../public/openapi.yaml");
const PRODUCTION_URL = "https://adaptive-engine-production-bfa6.up.railway.app";

const spec = readFileSync(source, "utf8").replace(
  "https://api.example.com",
  PRODUCTION_URL,
);
writeFileSync(target, spec);
console.log(`Synced openapi.yaml (servers -> ${PRODUCTION_URL})`);
