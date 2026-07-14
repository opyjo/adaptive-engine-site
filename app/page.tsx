import Link from "next/link";
import { AdaptiveDemo } from "@/components/adaptive-demo";

const models = [
  { number: "01", title: "Curriculum model", text: "Versioned Ontario expectations, concepts, prerequisites, and publisher extensions—built as a graph, not a flat list.", tone: "blue" },
  { number: "02", title: "Learner model", text: "Probabilistic mastery, confidence, evidence, and retention risk for every curriculum concept.", tone: "violet" },
  { number: "03", title: "Content model", text: "Map every item to one or more concepts, then learn its real difficulty, discrimination, and quality over time.", tone: "coral" },
];

const trust = [
  ["CA", "Canadian-region ready", "Give customers a Canadian hosting option with explicit retention, export, and deletion controls."],
  ["FR", "Bilingual by design", "English and French labels, explanations, and curriculum metadata are part of the contract from day one."],
  ["AI", "Explainable decisions", "Every recommendation includes its reason, confidence, model version, and the evidence behind it."],
  ["HI", "Humans stay in control", "Tenant and educator constraints can narrow, override, or reject any recommendation."],
];

export default function Home() {
  return (
    <>
      <section className="ae-hero">
        <div className="ae-hero-glow" />
        <div className="section-shell ae-hero-grid">
          <div className="ae-hero-copy">
            <span className="ae-kicker"><i /> Adaptive learning infrastructure · Built in Canada</span>
            <h1>The intelligence layer for <em>what comes next.</em></h1>
            <p>Turn the learning products and content you already own into adaptive experiences—aligned to Canadian curricula, explainable by design, and integrated through one focused API.</p>
            <div className="hero-buttons">
              <Link href="/design-partner" className="button ae-button-primary">Request design-partner access <span>↗</span></Link>
              <Link href="/developers" className="button ae-button-secondary">Explore the API <span>→</span></Link>
            </div>
            <div className="ae-hero-meta"><span>Ontario-first</span><span>Content agnostic</span><span>Pseudonymous learners</span></div>
          </div>
          <AdaptiveDemo />
        </div>
      </section>

      <section className="ae-proofbar">
        <div className="section-shell"><small>Designed for the teams building</small><strong>K–8 courseware</strong><i /><strong>EdTech platforms</strong><i /><strong>Educational publishing</strong><i /><strong>Assessment products</strong></div>
      </section>

      <section className="ae-intro">
        <div className="section-shell ae-intro-grid">
          <span className="ae-section-index">01 — THE OPPORTUNITY</span>
          <div><h2>Your learning product already has the content. Now give it a sense of direction.</h2><p>Most digital learning products serve every learner the same path. Adaptive Engine sits behind your experience, learns from every interaction, and returns the most useful next action—while you keep the interface, identity, grading, and intellectual property.</p></div>
        </div>
      </section>

      <section className="ae-models">
        <div className="section-shell">
          <div className="ae-heading"><span className="ae-section-index light">02 — HOW IT THINKS</span><div><h2>Three living models.<br />One better decision.</h2><p>The engine connects curriculum structure, content evidence, and learner state in real time.</p></div></div>
          <div className="ae-model-grid">{models.map((model) => <article className={`ae-model-card ${model.tone}`} key={model.title}><span>{model.number}</span><div className="ae-model-orbit"><i /><i /><i /></div><h3>{model.title}</h3><p>{model.text}</p></article>)}</div>
        </div>
      </section>

      <section className="ae-loop">
        <div className="section-shell">
          <div className="ae-heading dark"><span className="ae-section-index">03 — INTEGRATION</span><div><h2>From learning event to next action.</h2><p>A simple server-to-server loop makes your existing product adaptive.</p></div></div>
          <div className="ae-loop-grid">
            <article><span>1</span><small>PREPARE</small><h3>Connect your curriculum</h3><p>Import an Ontario curriculum version and map your content to its concepts.</p></article>
            <article><span>2</span><small>STREAM</small><h3>Send learning evidence</h3><p>Post outcomes, response time, hints, attempts, and optional misconception codes.</p></article>
            <article><span>3</span><small>RECEIVE</small><h3>Get the next best action</h3><p>Receive an item, target concept, explanation, confidence, and model version.</p></article>
            <article><span>4</span><small>IMPROVE</small><h3>Learn what works</h3><p>Compare strategies offline and activate a new model only when the evidence supports it.</p></article>
          </div>
          <div className="ae-loop-cta"><p>Your platform stays the system of engagement. <strong>Adaptive Engine becomes the system of decision.</strong></p><Link href="/guide">See the integration guide <span>↗</span></Link></div>
        </div>
      </section>

      <section className="ae-ontario">
        <div className="section-shell ae-ontario-grid">
          <div className="ae-ontario-copy"><span className="ae-section-index">04 — ONTARIO FIRST</span><h2>Curriculum intelligence, not just content tags.</h2><p>Start with Grades 1–8 mathematics and a graph that understands how expectations, concepts, and prerequisites connect across years.</p><Link href="/solutions" className="ae-text-link">Explore the Ontario-first roadmap <span>→</span></Link></div>
          <div className="ae-curriculum-card">
            <div className="ae-card-head"><span>Ontario Mathematics</span><small>2020 · Grades 1–8</small></div>
            <div className="ae-curriculum-body"><div className="ae-grade-rail"><span>G3</span><span className="active">G4</span><span>G5</span></div><div className="ae-concept-panel"><small>STRAND B · NUMBER</small><h3>Fractions and proportional reasoning</h3><div className="ae-node-row"><span className="mastered">Equivalent fractions <b>92%</b></span><i>→</i><span className="learning">Compare fractions <b>67%</b></span><i>→</i><span>Ratios <b>Next</b></span></div><div className="ae-recommendation"><i>↳</i><div><small>RECOMMENDED ACTION</small><strong>Practise comparing unlike denominators</strong></div><b>88% confidence</b></div></div></div>
          </div>
        </div>
      </section>

      <section className="ae-trust">
        <div className="section-shell"><div className="ae-heading dark"><span className="ae-section-index">05 — THE CANADIAN TRUST LAYER</span><div><h2>Responsible adaptation is a product feature.</h2><p>Privacy, accountability, and human agency belong inside the architecture—not in a policy added later.</p></div></div><div className="ae-trust-grid">{trust.map(([code,title,text]) => <article key={code}><span>{code}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="ae-trust-link"><Link href="/security">Explore security architecture <span>↗</span></Link></div></div>
      </section>

      <section className="ae-final"><div className="section-shell"><span className="ae-kicker dark"><i /> Now accepting Ontario design partners</span><h2>Build a learning product that responds.</h2><p>Bring your platform, curriculum, and content. We’ll bring the adaptive intelligence—and validate it together.</p><div className="hero-buttons"><Link href="/design-partner" className="button ae-button-dark">Request design-partner access <span>↗</span></Link><Link href="/developers" className="ae-text-link">Visit the developer hub <span>→</span></Link></div></div></section>
    </>
  );
}
