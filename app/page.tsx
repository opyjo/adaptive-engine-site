import Link from "next/link";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CodeBlock } from "@/components/code-block";
import {
  healthSnippet,
  nextItemSnippet,
  postEventSnippet,
  putItemSnippet,
} from "@/lib/snippets";

const LOOP_STEPS = [
  { step: "1", text: "Your app asks the engine for the next item for a learner." },
  { step: "2", text: "The learner answers; your app grades the answer itself." },
  { step: "3", text: "Your app reports only correct or incorrect back to the engine." },
  { step: "4", text: "The engine updates its per-skill mastery estimate — the next recommendation adapts." },
];

const FEATURES = [
  {
    emoji: "🏢",
    title: "Multi-tenant",
    text: "Each customer has its own API keys and structurally isolated data — every database key and index leads with the tenant.",
  },
  {
    emoji: "📦",
    title: "Content-agnostic",
    text: "The engine never sees question text, choices, media, or answer keys. Only metadata: item ID, skill key, difficulty 1–5, grade band, tags.",
  },
  {
    emoji: "🔒",
    title: "Privacy-first",
    text: "No names, emails, or birthdates — only opaque learner IDs you generate. That keeps the engine outside most PII compliance blast radii.",
  },
  {
    emoji: "📋",
    title: "Auditable",
    text: "Answer events and selection decisions are append-only and versioned by algorithm. “Why was this recommended?” always has a recorded answer.",
  },
];

const ENDPOINTS = [
  ["PUT /v1/items/{id}", "Create or replace one item's metadata"],
  ["POST /v1/items/bulk", "Upsert up to 1,000 items atomically"],
  ["DELETE /v1/items/{id}", "Deactivate an item (history preserved)"],
  ["GET /v1/learners/{id}/next-item", "Recommend the next item, with skill/grade filters"],
  ["POST /v1/learners/{id}/events", "Record one graded outcome; returns updated mastery"],
  ["GET /v1/learners/{id}/mastery", "The learner's full skill profile"],
  ["GET /v1/tenants/self/skills/summary", "Aggregate skill stats for your whole tenant"],
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      {/* Hero */}
      <section className="py-16 text-center sm:py-24">
        <p className="mb-4 inline-block rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
          Adaptive learning as an API
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
          What should this learner practise{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            next?
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          The Adaptive Engine answers that question for any learning product — a
          math tutor, a language app, a corporate training tool — while your app
          keeps full ownership of its content, grading, and users.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/guide"
            className="rounded-full bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
          >
            Integrate your app →
          </Link>
          <Link
            href="/reference"
            className="rounded-full border-2 border-zinc-300 px-6 py-3 font-bold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            API Reference
          </Link>
        </div>
        <div className="mx-auto mt-10 max-w-xl text-left">
          <CodeBlock code={healthSnippet} title="try it right now — no key needed" />
        </div>
      </section>

      {/* Practice loop */}
      <section className="border-t border-zinc-200 py-16 dark:border-zinc-800">
        <h2 className="text-center text-3xl font-bold">The practice loop</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
          It replaces a static, one-size-fits-all question sequence with a
          per-learner loop. Struggling learners get confidence-building material
          on the skill they just missed; strong learners get pushed harder with
          periodic review so skills don&apos;t decay.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LOOP_STEPS.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                {item.step}
              </span>
              <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="border-t border-zinc-200 py-16 dark:border-zinc-800">
        <h2 className="text-center text-3xl font-bold">
          Built to serve more than one product
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <span className="text-2xl" aria-hidden>{feature.emoji}</span>
              <h3 className="mt-2 text-lg font-bold">{feature.title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-zinc-500">
          It is not a quiz platform, a content library, or a learner-facing
          product — it is invisible infrastructure your product calls
          server-to-server.
        </p>
      </section>

      {/* Algorithm */}
      <section className="border-t border-zinc-200 py-16 dark:border-zinc-800">
        <h2 className="text-center text-3xl font-bold">
          How <code className="rounded bg-zinc-100 px-2 dark:bg-zinc-900">adaptive-v1</code> decides
        </h2>
        <div className="mx-auto mt-10 grid max-w-3xl gap-4">
          <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h3 className="font-bold">Mastery tracking</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Each answer nudges an exponentially weighted moving average per
              skill toward 1 (correct) or 0 (incorrect). Harder items move
              mastery up more when answered correctly; easier items move it down
              more when missed. New skills start at 0.5.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h3 className="font-bold">Selection priority</h3>
            <ol className="mt-2 list-inside list-decimal space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Scaffold</strong> — two consecutive wrong answers? Stay on that
                skill but drop a difficulty band. Confidence outranks novelty.
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Weakest skill</strong> — otherwise target the lowest-mastery
                skill below the 0.8 threshold.
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Spiral review</strong> — everything above 0.8? Revisit the
                least-recently-practised skill so it doesn&apos;t decay.
              </li>
            </ol>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h3 className="font-bold">Traceable &amp; idempotent</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Every response carries an <code>algorithmVersion</code>; every
              recommendation records its reason. Answer events carry your
              idempotency key, so network retries can never double-count.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="border-t border-zinc-200 py-16 dark:border-zinc-800">
        <h2 className="text-center text-3xl font-bold">Architecture</h2>
        <div className="mt-10">
          <ArchitectureDiagram />
        </div>
      </section>

      {/* Quickstart */}
      <section className="border-t border-zinc-200 py-16 dark:border-zinc-800">
        <h2 className="text-center text-3xl font-bold">Quickstart</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
          Three calls wire the whole loop. Content and answer keys never leave
          your app.
        </p>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-6">
          <CodeBlock code={putItemSnippet} title="1 — register item metadata" />
          <CodeBlock code={nextItemSnippet} title="2 — ask for the next item" />
          <CodeBlock code={postEventSnippet} title="3 — report the graded outcome" />
        </div>
      </section>

      {/* API surface */}
      <section className="border-t border-zinc-200 py-16 dark:border-zinc-800">
        <h2 className="text-center text-3xl font-bold">The whole API surface</h2>
        <div className="mx-auto mt-10 max-w-3xl overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <tbody>
              {ENDPOINTS.map(([endpoint, purpose]) => (
                <tr key={endpoint} className="border-b border-zinc-200 last:border-0 dark:border-zinc-800">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    <Link href="/reference" className="hover:underline">{endpoint}</Link>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-center">
          <Link href="/reference" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
            Explore the interactive API reference →
          </Link>
        </p>
      </section>
    </div>
  );
}
