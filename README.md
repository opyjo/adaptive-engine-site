# Adaptive Engine marketing and developer site

The public product and developer experience for the Adaptive Engine API.

## Routes

- `/` — product marketing, interactive policy simulation, capabilities, data
  boundary, use cases, and developer quickstart
- `/solutions` — EdTech, tutoring, assessment, and training use cases
- `/developers` — technical quickstart, architecture, endpoint surface, and
  reliability guidance
- `/security` — data boundary, implemented controls, and production operations
- `/guide` — complete integration and rollout guide
- `/reference` — interactive API reference generated from `openapi.yaml`

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run build
npm run lint
npm test
npm audit --omit=dev
```

## API contract

`public/openapi.yaml` is synchronized from the standalone service repository.
Run `npm run sync:openapi` whenever the service contract changes.
