import Link from "next/link";
import { AdaptiveDemo } from "@/components/adaptive-demo";
import { CodeBlock } from "@/components/code-block";
import { nextItemSnippet } from "@/lib/snippets";

const audiences = [
  { number: "01", title: "EdTech products", text: "Add adaptive sequencing to an existing learning experience without building a learner-modelling team." },
  { number: "02", title: "Tutoring platforms", text: "Turn between-session practice into a targeted loop and surface useful skill signals for instructors." },
  { number: "03", title: "Assessment tools", text: "Select relevant items from your bank while preserving your grading rules, content, and reporting workflow." },
  { number: "04", title: "Training systems", text: "Personalize certification and professional learning paths using the same content-agnostic decision layer." },
];

const capabilities = [
  { code: "MODEL", title: "Per-skill mastery", text: "Maintain an evolving estimate for each learner and skill. Difficulty-weighted updates respond to every outcome." },
  { code: "SELECT", title: "Next-item policy", text: "Target gaps, scaffold repeated mistakes, match difficulty, avoid repetition, and schedule spiral review." },
  { code: "TRACE", title: "Explainable decisions", text: "Record the reason, algorithm version, candidate count, and mastery context behind each selection." },
  { code: "ISOLATE", title: "Multi-tenant by design", text: "Every credential, item, learner state, event, and database lookup is scoped to the authenticated tenant." },
  { code: "RETRY", title: "Safe event delivery", text: "Idempotency keys make answer-event retries safe, so a network timeout cannot update mastery twice." },
  { code: "BOUNDARY", title: "Minimal data surface", text: "Send opaque learner IDs, item metadata, and outcomes. Keep question text, answer keys, and direct identity." },
];

export default function Home() {
  return (
    <>
      <section className="marketing-hero">
        <div className="hero-grid section-shell">
          <div className="hero-content">
            <span className="eyebrow eyebrow-light"><i /> Adaptive learning infrastructure</span>
            <h1>The intelligence layer for <em>what comes next.</em></h1>
            <p>Give every learner a path that responds to what they know—without rebuilding your product, moving your content, or handing over learner identity.</p>
            <div className="hero-buttons">
              <Link href="/design-partner" className="button button-lime">Request design-partner access <span>↗</span></Link>
              <Link href="/developers" className="button button-ghost">Explore developer hub</Link>
            </div>
            <div className="hero-proof">
              <span><i>✓</i> Server-to-server API</span>
              <span><i>✓</i> Content agnostic</span>
              <span><i>✓</i> Versioned decisions</span>
            </div>
          </div>
          <div className="hero-demo"><AdaptiveDemo /></div>
        </div>
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      </section>

      <section className="audience-strip">
        <div className="section-shell">
          <span>One adaptive core for</span>
          <div><strong>Education apps</strong><i /> <strong>Tutoring</strong><i /> <strong>Assessment</strong><i /> <strong>Training</strong></div>
        </div>
      </section>

      <section className="statement-section">
        <div className="section-shell statement-grid">
          <span className="eyebrow">The product</span>
          <div><h2>Your application already knows how to teach. We help it decide.</h2><p>Adaptive Engine sits behind your product as a focused recommendation service. Your backend asks for an item ID, your application teaches and grades it, then the outcome updates the learner model before the next decision.</p></div>
        </div>
      </section>

      <section id="how-it-works" className="workflow-section">
        <div className="section-shell">
          <div className="section-heading"><div><span className="eyebrow">A four-step loop</span><h2>One answer changes the next decision.</h2></div><p>The API handles selection and learner state. Your product remains the system of engagement.</p></div>
          <div className="workflow-grid">
            {[
              ["01", "Request", "Send an opaque learner ID plus the skills or grade band eligible for this session."],
              ["02", "Recommend", "The engine selects an item using mastery, difficulty, recency, and error recovery."],
              ["03", "Teach", "Your product retrieves the item, renders the experience, and grades the answer."],
              ["04", "Adapt", "Post correct or incorrect. Mastery updates once, and the next recommendation responds."],
            ].map(([number, title, text]) => <article key={number}><span>{number}</span><div className="workflow-mark"><i /></div><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="capability-section">
        <div className="section-shell">
          <div className="section-heading light"><div><span className="eyebrow eyebrow-light">Capabilities</span><h2>Built for real learning loops—not static personalization theatre.</h2></div><p>A small, composable API surface with the controls required to operate it responsibly.</p></div>
          <div className="capability-grid">{capabilities.map((capability) => <article key={capability.code}><span>{capability.code}</span><h3>{capability.title}</h3><p>{capability.text}</p><i>↗</i></article>)}</div>
        </div>
      </section>

      <section className="data-boundary-section">
        <div className="section-shell boundary-grid">
          <div className="boundary-copy"><span className="eyebrow">A deliberate data boundary</span><h2>Personalization without taking custody of your product.</h2><p>The service only needs enough information to learn from outcomes and recommend item IDs. Everything that makes your experience yours stays in your environment.</p><Link href="/security" className="inline-link">Explore security architecture <span>→</span></Link></div>
          <div className="boundary-board">
            <div className="boundary-column sent"><span>You send</span><strong>Opaque learner ID</strong><strong>Item ID + skill</strong><strong>Difficulty 1–5</strong><strong>Correct / incorrect</strong><strong>Idempotency key</strong></div>
            <div className="boundary-line"><i>API</i></div>
            <div className="boundary-column kept"><span>You keep</span><strong>Learner name + email</strong><strong>Question content</strong><strong>Answer keys</strong><strong>Media and curriculum IP</strong><strong>Authentication</strong></div>
          </div>
        </div>
      </section>

      <section className="solutions-preview">
        <div className="section-shell">
          <div className="section-heading"><div><span className="eyebrow">Use cases</span><h2>One engine. Different learning products.</h2></div><Link href="/solutions" className="inline-link">View all solutions <span>→</span></Link></div>
          <div className="audience-grid">{audiences.map((audience) => <article key={audience.number}><span>{audience.number}</span><h3>{audience.title}</h3><p>{audience.text}</p></article>)}</div>
        </div>
      </section>

      <section className="developer-preview">
        <div className="section-shell developer-preview-grid">
          <div><span className="eyebrow eyebrow-light">Developer experience</span><h2>From empty tenant to first recommendation in three calls.</h2><p>Use cURL today. Generate a client from the OpenAPI contract tomorrow. The integration is ordinary HTTPS, documented failure behaviour, and no browser-side secret.</p><div className="hero-buttons"><Link href="/developers" className="button button-lime">Open developer hub</Link><Link href="/reference" className="button button-ghost">API reference</Link></div></div>
          <CodeBlock code={nextItemSnippet} title="request the next item" />
        </div>
      </section>

      <section className="final-cta">
        <div className="section-shell"><span className="eyebrow">Build the learning loop</span><h2>Your content. Your experience. A smarter next step.</h2><p>Apply for the design-partner programme or start with the technical guide and API contract.</p><div><Link href="/design-partner" className="button button-dark">Request access <span>↗</span></Link><Link href="/guide" className="inline-link">Read integration guide →</Link></div></div>
      </section>
    </>
  );
}
