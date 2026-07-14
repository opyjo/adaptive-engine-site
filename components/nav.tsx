"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/developers", label: "Developers" },
  { href: "/security", label: "Security" },
  { href: "/reference", label: "API reference" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-symbol"><i /><i /><i /></span>
          <span><strong>Adaptive</strong><small>Engine</small></span>
        </Link>

        <button className="mobile-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
          <span /><span />
        </button>

        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : ""} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/design-partner" className="nav-cta">Request access <span>↗</span></Link>
      </nav>
    </header>
  );
}
