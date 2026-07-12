"use client";

import { useState } from "react";

const initial = {
  name: "", email: "", company: "", companyUrl: "", productType: "", learnerVolume: "",
  itemBankSize: "", timeline: "", useCase: "", consent: false, companyFax: "", startedAt: Date.now(),
};

export function DesignPartnerForm() {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(name: string, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("sending"); setMessage("");
    try {
      const response = await fetch("/api/design-partner", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Application could not be sent.");
      setState("success");
    } catch (error) {
      setState("error"); setMessage(error instanceof Error ? error.message : "Application could not be sent.");
    }
  }

  if (state === "success") return <div className="form-success"><span>✓</span><h2>Application received.</h2><p>Thank you for sharing your product and use case. We will review the fit and reply using the work email you provided.</p></div>;

  return <form className="partner-form" onSubmit={submit}>
    <div className="form-grid">
      <label><span>Your name *</span><input required maxLength={100} autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} /></label>
      <label><span>Work email *</span><input required type="email" maxLength={180} autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} /></label>
      <label><span>Company *</span><input required maxLength={160} autoComplete="organization" value={form.company} onChange={(event) => update("company", event.target.value)} /></label>
      <label><span>Company website</span><input type="url" maxLength={300} placeholder="https://" value={form.companyUrl} onChange={(event) => update("companyUrl", event.target.value)} /></label>
      <label><span>Product type *</span><select required value={form.productType} onChange={(event) => update("productType", event.target.value)}><option value="">Select one</option><option>EdTech application</option><option>Tutoring platform</option><option>Assessment product</option><option>Professional training</option><option>Other learning product</option></select></label>
      <label><span>Monthly active learners</span><select value={form.learnerVolume} onChange={(event) => update("learnerVolume", event.target.value)}><option value="">Select range</option><option>Pre-launch</option><option>1–1,000</option><option>1,001–10,000</option><option>10,001–100,000</option><option>100,000+</option></select></label>
      <label><span>Item bank size</span><select value={form.itemBankSize} onChange={(event) => update("itemBankSize", event.target.value)}><option value="">Select range</option><option>Under 500</option><option>500–5,000</option><option>5,001–50,000</option><option>50,000+</option></select></label>
      <label><span>Preferred pilot timeline</span><select value={form.timeline} onChange={(event) => update("timeline", event.target.value)}><option value="">Select timeline</option><option>Within 30 days</option><option>1–3 months</option><option>3–6 months</option><option>Exploring for later</option></select></label>
    </div>
    <label className="form-wide"><span>What learning problem should the engine help solve? *</span><textarea required minLength={30} maxLength={2000} value={form.useCase} onChange={(event) => update("useCase", event.target.value)} placeholder="Describe your learner loop, current selection approach, skills or content structure, and the outcome you want to improve." /></label>
    <label className="honeypot" aria-hidden="true"><span>Company fax</span><input tabIndex={-1} autoComplete="off" value={form.companyFax} onChange={(event) => update("companyFax", event.target.value)} /></label>
    <label className="consent"><input required type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} /><span>I agree that Opyjo may use this information to evaluate and respond to this design-partner request.</span></label>
    {state === "error" && <p className="form-error" role="alert">{message}</p>}
    <button className="button button-lime" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Submit application ↗"}</button>
    <p className="form-privacy">Do not include API keys, learner data, credentials, or confidential content.</p>
  </form>;
}
