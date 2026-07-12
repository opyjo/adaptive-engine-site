import Link from "next/link";
import { API_BASE_URL, GITHUB_URL } from "@/lib/snippets";

const groups = [
  { title: "Product", links: [["Solutions", "/solutions"], ["Security", "/security"], ["How it works", "/#how-it-works"]] },
  { title: "Developers", links: [["Developer hub", "/developers"], ["Integration guide", "/guide"], ["API reference", "/reference"], ["OpenAPI spec", "/openapi.yaml"]] },
  { title: "Resources", links: [["GitHub", GITHUB_URL], ["API status", `${API_BASE_URL}/health/live`], ["Architecture", "/developers#architecture"]] },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <Link href="/" className="brand brand-light">
            <span className="brand-symbol"><i /><i /><i /></span>
            <span><strong>Adaptive</strong><small>Engine</small></span>
          </Link>
          <p>Adaptive-learning infrastructure for products that want personalization without surrendering content, identity, or control.</p>
          <span className="footer-status"><i /> API documentation available</span>
        </div>
        <div className="footer-links">
          {groups.map((group) => (
            <div key={group.title}><strong>{group.title}</strong>{group.links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
          ))}
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Opyjo Consulting Inc.</span><span>Built in Canada · Designed for server-to-server integration</span></div>
    </footer>
  );
}
