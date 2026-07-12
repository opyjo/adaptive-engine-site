import type { Metadata } from "next";
import { ScalarReference } from "@/components/scalar-reference";

export const metadata: Metadata = { title: "API Reference", description: "Interactive OpenAPI reference for Adaptive Engine items, recommendations, learning events, mastery, and health endpoints." };

export default function ReferencePage() {
  return <div className="reference-page"><div className="reference-intro"><span className="eyebrow">API reference</span><h1>Explore the complete contract.</h1><p>All <code>/v1</code> endpoints require a bearer API key. Health endpoints are public. Download the raw <a href="/openapi.yaml">OpenAPI 3.1 specification</a> for code generation or local tooling.</p><div className="reference-warning"><strong>Use test credentials only.</strong> The embedded console may route requests through third-party documentation infrastructure. Never paste a production API key into a browser-based explorer.</div></div><div className="reference-frame"><ScalarReference /></div></div>;
}
