import type { Metadata } from "next";
import Link from "next/link";
import { DesignPartnerForm } from "@/components/design-partner-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Design Partner Programme", description: "Apply to pilot Adaptive Engine with direct integration support and a shared outcome-measurement plan." };

export default function DesignPartnerPage() {
  return <>
    <PageHero eyebrow="Design partner programme" title="Build the first measurable adaptive loop together." description="For learning products with real content, a clear learner problem, and a team ready to evaluate outcomes. Early partners receive direct integration support and help shaping the platform’s commercial roadmap." />
    <section className="partner-overview"><div className="section-shell partner-grid"><div className="partner-copy"><span className="eyebrow">What the programme includes</span><h2>A focused pilot—not an open-ended experiment.</h2><div className="partner-benefits"><article><span>01</span><div><strong>Architecture session</strong><p>Map learner IDs, skills, item metadata, grading, fallbacks, and the safest rollout path.</p></div></article><article><span>02</span><div><strong>Guided integration</strong><p>Test tenant, catalog synchronization, practice-loop implementation, and technical review.</p></div></article><article><span>03</span><div><strong>Shadow-mode comparison</strong><p>Compare existing and engine recommendations before the service changes learner experience.</p></div></article><article><span>04</span><div><strong>Outcome plan</strong><p>Define useful product and learning measures, guardrails, and the evidence needed for a rollout decision.</p></div></article></div><div className="partner-fit"><span>Best fit</span><p>Products with a structured item bank, stable skills, server-side outcomes, learner traffic, and an owner who can run a controlled pilot.</p><Link href="/pricing">Review commercial model →</Link></div></div><div className="partner-form-shell"><div className="partner-form-heading"><span>Request access</span><h2>Tell us about your learning product.</h2><p>We use these details only to assess technical and pilot fit.</p></div><DesignPartnerForm /></div></div></section>
  </>;
}
