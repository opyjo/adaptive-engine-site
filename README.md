# Adaptive Engine — marketing & developer docs site

The public front door for the [Adaptive Engine](https://github.com/opyjo/adaptive-engine)
API. Three pages, fully static, zero runtime dependencies beyond Next.js:

- `/` — landing page: what the engine is, the practice loop, the `adaptive-v1`
  algorithm, architecture, and a copy-paste quickstart
- `/reference` — interactive API reference rendered by
  [Scalar](https://scalar.com) (loaded from CDN) from `public/openapi.yaml`
- `/guide` — step-by-step integration guide (tenant keys → identifier mapping →
  item sync → practice loop → failure handling → shadow-mode rollout)

## Develop

```bash
npm install
npm run dev
```

## Keeping the API spec in sync

`public/openapi.yaml` is a **copy** of `../adaptive-engine/openapi.yaml` with
`servers:` pointed at production. When the engine's API changes, re-run:

```bash
npm run sync:openapi
```

## Deploy

Deployed as its own service on Railway (Railpack auto-detects Next.js). Vercel
works with zero config as an alternative.
