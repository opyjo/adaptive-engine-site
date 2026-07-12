import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageHero } from "@/components/page-hero";
import { healthSnippet, nextItemSnippet, postEventSnippet, putItemSnippet } from "@/lib/snippets";

export const metadata: Metadata = { title: "Developer Hub", description: "Technical architecture, quickstart, API lifecycle, failure handling, and integration resources for Adaptive Engine." };

const endpoints = [
  ["PUT", "/v1/items/{id}", "Upsert one item metadata record"],
  ["POST", "/v1/items/bulk", "Synchronize up to 1,000 metadata records"],
  ["GET", "/v1/learners/{id}/next-item", "Request the next recommendation"],
  ["POST", "/v1/learners/{id}/events", "Record one graded answer outcome"],
  ["GET", "/v1/learners/{id}/mastery", "Read a learner skill profile"],
  ["GET", "/v1/tenants/self/skills/summary", "Read tenant-level skill aggregates"],
];

export default function DevelopersPage() {
  return <>
    <PageHero eyebrow="Developer hub" title="A small API surface with a clear operational contract." description="Integrate through ordinary server-to-server HTTPS. Keep your existing content, learner authentication, UI, and grading while the engine owns recommendation state and selection logic.">
      <div className="page-hero-actions"><Link href="/guide" className="button button-lime">Read integration guide</Link><Link href="/reference" className="button button-ghost-dark">API reference</Link></div>
    </PageHero>

    <section className="developer-start"><div className="section-shell">
      <div className="section-heading"><div><span className="eyebrow">Quickstart</span><h2>Three calls complete the loop.</h2></div><p>Provision a test key, register metadata, ask for an item, and post the outcome after your application grades it.</p></div>
      <div className="quickstart-stack"><div className="quickstart-step"><span>01</span><div><h3>Check service availability</h3><p>Health endpoints require no API key.</p><CodeBlock code={healthSnippet} title="health check" /></div></div><div className="quickstart-step"><span>02</span><div><h3>Register item metadata</h3><p>Content and answer keys never cross the boundary.</p><CodeBlock code={putItemSnippet} title="upsert item" /></div></div><div className="quickstart-step"><span>03</span><div><h3>Request a recommendation</h3><p>Scope the bank by grade band or eligible skills.</p><CodeBlock code={nextItemSnippet} title="next item" /></div></div><div className="quickstart-step"><span>04</span><div><h3>Post the graded outcome</h3><p>Reuse the same idempotency key whenever a network retry occurs.</p><CodeBlock code={postEventSnippet} title="answer event" /></div></div></div>
    </div></section>

    <section id="architecture" className="architecture-section"><div className="section-shell">
      <div className="section-heading light"><div><span className="eyebrow eyebrow-light">Architecture</span><h2>Your backend is the trust broker.</h2></div><p>The browser never receives an engine key and never calls the service directly.</p></div>
      <div className="architecture-flow"><div><span>01 · Learner surface</span><strong>Your web or mobile app</strong><small>Render content · collect answer</small></div><i>→</i><div><span>02 · Tenant boundary</span><strong>Your application backend</strong><small>Authenticate · grade · scope</small></div><i>→</i><div className="active"><span>03 · Adaptive API</span><strong>Fastify + pure core</strong><small>Authorize · select · update</small></div><i>→</i><div><span>04 · State</span><strong>PostgreSQL</strong><small>Tenant state · audit events</small></div></div>
    </div></section>

    <section className="api-surface"><div className="section-shell">
      <div className="section-heading"><div><span className="eyebrow">API surface</span><h2>Versioned, typed, and intentionally compact.</h2></div><Link href="/openapi.yaml" className="inline-link">Download OpenAPI 3.1 ↗</Link></div>
      <div className="endpoint-table">{endpoints.map(([method, path, purpose]) => <div key={path}><b className={`method-${method.toLowerCase()}`}>{method}</b><code>{path}</code><span>{purpose}</span></div>)}</div>
    </div></section>

    <section className="reliability-section"><div className="section-shell reliability-grid"><div><span className="eyebrow">Failure behaviour</span><h2>Recommendation failure should never block a learner.</h2><p>Treat the engine as a decision layer. Your application should retain a simple local fallback and deliver learning events asynchronously when necessary.</p></div><div className="reliability-list"><article><span>Timeout / 5xx</span><strong>Use a local unseen-item fallback</strong><p>Keep the session moving, capture telemetry, and retry later.</p></article><article><span>Event delivery timeout</span><strong>Retry the same idempotency key</strong><p>The original result is replayed without a second mastery update.</p></article><article><span>429</span><strong>Back off and respect limits</strong><p>Rate limits protect tenant and service reliability.</p></article><article><span>404 bank exhausted</span><strong>Widen scope or repair metadata sync</strong><p>No active item matched the requested filters.</p></article></div></div></section>
  </>;
}
