import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Solutions", description: "Adaptive Engine use cases for EdTech applications, tutoring platforms, assessment products, and training systems." };

const solutions = [
  { id: "edtech", number: "01", title: "EdTech applications", headline: "Add personalization without rebuilding the product.", text: "Use the content, lesson structure, and learner experience you already own. Adaptive Engine adds the decision layer behind practice sessions.", uses: ["Daily practice", "Course reinforcement", "Homework paths", "Skill-gap recovery"], metric: "Measure time-to-mastery and retained learning" },
  { id: "tutoring", number: "02", title: "Tutoring platforms", headline: "Make every minute between sessions more useful.", text: "Generate focused practice from tutor-approved skills and bring mastery signals back into the next human session.", uses: ["Between-session practice", "Tutor-assigned skill scope", "Error recovery", "Progress summaries"], metric: "Measure skill recovery and session preparedness" },
  { id: "assessment", number: "03", title: "Assessment products", headline: "Choose better items from the bank you control.", text: "Apply difficulty and skill-state signals without moving question content or answer keys into a third-party content system.", uses: ["Diagnostic checks", "Practice assessment", "Review scheduling", "Item-bank coverage"], metric: "Measure coverage, precision, and repeat exposure" },
  { id: "training", number: "04", title: "Professional training", headline: "Create a responsive path to competence.", text: "Adapt certification and knowledge practice while preserving your existing LMS, compliance rules, and reporting workflow.", uses: ["Certification prep", "Knowledge refresh", "Role-based scope", "Competence tracking"], metric: "Measure time-to-competence and delayed retention" },
];

export default function SolutionsPage() {
  return <>
    <PageHero eyebrow="Solutions" title="Adaptive decisions wherever learning happens." description="The platform is content- and subject-agnostic. If your product has items, skills, outcomes, and a learner loop, it can add adaptive sequencing without replacing the surrounding experience.">
      <div className="page-hero-actions"><Link href="/guide" className="button button-lime">Explore integration</Link></div>
    </PageHero>
    <section className="solution-list section-shell">{solutions.map((solution) => <article id={solution.id} key={solution.id}><div className="solution-number">{solution.number}</div><div className="solution-copy"><span>{solution.title}</span><h2>{solution.headline}</h2><p>{solution.text}</p><div className="solution-tags">{solution.uses.map((use) => <small key={use}>{use}</small>)}</div></div><div className="solution-outcome"><span>Outcome focus</span><strong>{solution.metric}</strong><i>↗</i></div></article>)}</section>
    <section className="fit-section"><div className="section-shell fit-grid"><div><span className="eyebrow">Best-fit customer</span><h2>You already have the learning product. You need the intelligence layer.</h2></div><div><p>Adaptive Engine is strongest when a customer already has:</p><ul><li>A structured item or activity bank</li><li>Stable skill identifiers</li><li>Server-side grading or outcome capture</li><li>Enough learner traffic to evaluate results</li><li>A product team ready to run a controlled rollout</li></ul></div></div></section>
  </>;
}
