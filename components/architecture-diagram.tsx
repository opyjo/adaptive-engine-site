const LAYERS = [
  {
    label: "Your app — LMS, tutor, quiz product",
    detail: "Owns content, grading, and user accounts",
    accent: "border-sky-300 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/50",
  },
  {
    label: "Fastify HTTP boundary",
    detail: "Bearer API keys · zod validation · rate limiting",
    accent: "border-indigo-300 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/50",
  },
  {
    label: "Pure adaptive core",
    detail: "Mastery math + selection policy, versioned as adaptive-v1",
    accent: "border-violet-300 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/50",
  },
  {
    label: "PostgreSQL persistence",
    detail: "Every key tenant-scoped · append-only event logs",
    accent: "border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/50",
  },
];

const ARROWS = [
  "HTTPS + API key (server-to-server only)",
  "Validated requests",
  "Tenant-scoped SQL",
];

export function ArchitectureDiagram() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-stretch">
      {LAYERS.map((layer, i) => (
        <div key={layer.label} className="flex flex-col items-center">
          <div className={`w-full rounded-xl border-2 p-4 text-center ${layer.accent}`}>
            <p className="font-bold">{layer.label}</p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{layer.detail}</p>
          </div>
          {i < ARROWS.length && (
            <div className="flex flex-col items-center py-1 text-zinc-400">
              <span className="text-xs">{ARROWS[i]}</span>
              <span aria-hidden>↓</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
