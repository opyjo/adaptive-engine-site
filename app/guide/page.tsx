import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { nextItemSnippet, postEventSnippet } from "@/lib/snippets";

export const metadata: Metadata = {
  title: "Integration Guide",
  description:
    "Wire any learning product to the Adaptive Engine: tenant keys, identifier mapping, item sync, the practice loop, failure handling, and safe rollout.",
};

const ID_MAPPING: Array<[string, string]> = [
  [
    "learnerId",
    "A stable, opaque, pseudonymous ID generated server-side (e.g. an internal UUID). Never a name, email, or auth token.",
  ],
  ["itemId", "Your existing question/exercise ID (e.g. its UUID)."],
  [
    "skill",
    "A stable skill key, ideally hierarchical: mathematics:g4:number:fractions. Mastery is tracked per exact string, so keep it consistent.",
  ],
  [
    "difficulty",
    "Your 1–5 difficulty. If you don't have one, omit it (defaults to 3) and refine later.",
  ],
  [
    "idempotencyKey",
    "The natural unique ID of the answer attempt (e.g. your answer-record UUID).",
  ],
];

const CHECKLIST = [
  "API key stored server-side only, one per environment",
  "Opaque learner IDs (no PII) generated and stored in your app",
  "Item catalogue synced and kept current (create/edit/retire hooks)",
  "Practice loop wired: next-item → render → grade → post event",
  "Idempotency key = your answer attempt ID",
  "Fallback selection path for engine downtime",
  "Shadow-mode comparison before learner-facing rollout",
];

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-zinc-200 py-10 dark:border-zinc-800">
      <h2 className="flex items-center gap-3 text-2xl font-bold">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-base text-white">
          {number}
        </span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-zinc-700 dark:text-zinc-300">{children}</div>
    </section>
  );
}

export default function GuidePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-extrabold tracking-tight">Integration guide</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        The engine is server-to-server only. Your app keeps its own content,
        grading, and user accounts; the engine only learns from outcomes and
        recommends item IDs.
      </p>

      <Step number="0" title="Get a tenant and API key">
        <p>
          The operator provisions a tenant per environment and hands you a key
          (they look like <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-900">ae_test_…</code>{" "}
          or <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-900">ae_live_…</code>).
          The key is shown exactly once — only a hash is stored, so a lost key is
          reissued, never recovered.
        </p>
        <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4 text-sm font-medium text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
          ⚠️ Store the key in your app&apos;s secret manager as a server-only
          variable (e.g. <code>ADAPTIVE_SERVICE_API_KEY</code>). Never ship it
          in a browser, mobile client, or <code>NEXT_PUBLIC_</code> variable —
          anyone holding the key can read and write your tenant&apos;s data.
        </div>
      </Step>

      <Step number="1" title="Decide your identifier mapping">
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
              <tr>
                <th className="px-4 py-3">Engine concept</th>
                <th className="px-4 py-3">Your app should send</th>
              </tr>
            </thead>
            <tbody>
              {ID_MAPPING.map(([concept, guidance]) => (
                <tr key={concept} className="border-b border-zinc-200 last:border-0 dark:border-zinc-800">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    {concept}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{guidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Step>

      <Step number="2" title="Sync item metadata">
        <p>
          Bulk-upsert your item catalogue, then keep it current whenever items
          are created, edited, or retired:
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm">
          <li><code className="font-mono">POST /v1/items/bulk</code> — up to 1,000 per call, atomic</li>
          <li><code className="font-mono">PUT /v1/items/{"{id}"}</code> — single upsert on edit</li>
          <li><code className="font-mono">DELETE /v1/items/{"{id}"}</code> — deactivate on retirement (history preserved)</li>
        </ul>
        <p>
          Only metadata crosses the wire — the engine must never receive
          question text or answer keys.
        </p>
      </Step>

      <Step number="3" title="Wire the practice loop">
        <ol className="list-inside list-decimal space-y-2">
          <li>
            Ask for a recommendation — use <code className="font-mono text-sm">skillScope</code> to
            constrain a session to a lesson&apos;s skills and{" "}
            <code className="font-mono text-sm">gradeBand</code> to keep it age-appropriate:
          </li>
        </ol>
        <CodeBlock code={nextItemSnippet} title="next-item" />
        <ol start={2} className="list-inside list-decimal space-y-2">
          <li>Look up the returned <code className="font-mono text-sm">itemId</code> in <em>your</em> database, render it, grade it.</li>
          <li>Report only the outcome:</li>
        </ol>
        <CodeBlock code={postEventSnippet} title="record the outcome" />
        <p>
          Repeat. <code className="font-mono text-sm">GET /v1/learners/{"{id}"}/mastery</code>{" "}
          powers progress dashboards.
        </p>
      </Step>

      <Step number="4" title="Handle failure like a client should">
        <ul className="space-y-3 text-sm">
          <li>
            <strong>Timeouts / 5xx on next-item</strong> — fall back to your own
            simple selection (e.g. a random unseen item in the current skill) so
            the learner is never blocked. The engine is a recommendation layer,
            not a single point of failure.
          </li>
          <li>
            <strong>Timeouts posting events</strong> — retry with the{" "}
            <em>same</em> <code className="font-mono">idempotencyKey</code>; duplicates are impossible
            by design (<code className="font-mono">replayed: true</code> tells you it was a retry).
          </li>
          <li>
            <strong>429</strong> — the default limit is 600 requests/minute per
            client; back off.
          </li>
          <li>
            <strong>404 on next-item</strong> — no eligible active items match
            the filters. Widen the scope or check your item sync.
          </li>
        </ul>
      </Step>

      <Step number="5" title="Roll out safely">
        <p>
          The recommended migration path for an app that already has its own
          adaptive logic — the shadow-mode rollout:
        </p>
        <ol className="list-inside list-decimal space-y-2 text-sm">
          <li>Sync items and create the test tenant.</li>
          <li>
            <strong>Shadow mode</strong>: call the engine alongside your existing
            logic, log both recommendations, change nothing for learners.
          </li>
          <li>Send graded outcomes to both systems (your answer UUID = idempotency key).</li>
          <li>Compare selection quality, mastery trajectories, latency, and isolation.</li>
          <li>
            Flip test learners to engine-driven selection behind a feature flag,
            then ramp production; keep the old path available as instant rollback.
          </li>
          <li>
            Never rewrite historical learner state during migration — backfill,
            if needed, is a separate versioned import job.
          </li>
        </ol>
      </Step>

      <section className="border-t border-zinc-200 py-10 dark:border-zinc-800">
        <h2 className="text-2xl font-bold">Integration checklist</h2>
        <ul className="mt-4 space-y-2">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
              <span className="mt-0.5 text-emerald-500" aria-hidden>✔</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/reference" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
            Next: explore the full API reference →
          </Link>
        </p>
      </section>
    </div>
  );
}
