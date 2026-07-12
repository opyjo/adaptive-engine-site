import type { Metadata } from "next";
import { ScalarReference } from "@/components/scalar-reference";

export const metadata: Metadata = {
  title: "API Reference",
  description:
    "Interactive OpenAPI reference for the Adaptive Engine API: items, events, next-item recommendations, mastery, and health endpoints.",
};

export default function ReferencePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight">API reference</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          All <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-900">/v1</code>{" "}
          endpoints require a bearer API key; the health endpoints are open —
          try <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-900">GET /health/live</code>{" "}
          directly from this page. The raw spec is at{" "}
          <a href="/openapi.yaml" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
            /openapi.yaml
          </a>.
        </p>
        <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
          The “try it” console routes requests through Scalar&apos;s public
          proxy — don&apos;t paste production API keys here. Use test-environment
          keys only.
        </p>
      </div>
      <ScalarReference />
    </div>
  );
}
