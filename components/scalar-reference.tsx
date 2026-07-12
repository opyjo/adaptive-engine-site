"use client";

import { useEffect, useRef } from "react";

// Pinned major version of Scalar's self-contained browser bundle; the page
// works without any npm dependency on Scalar.
const SCALAR_CDN =
  "https://cdn.jsdelivr.net/npm/@scalar/api-reference@1/dist/browser/standalone.min.js";

export function ScalarReference() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const config = document.createElement("script");
    config.id = "api-reference";
    config.type = "application/json";
    config.dataset.url = "/openapi.yaml";
    config.dataset.configuration = JSON.stringify({
      theme: "purple",
      hideModels: false,
    });
    container.appendChild(config);

    const loader = document.createElement("script");
    loader.src = SCALAR_CDN;
    loader.async = true;
    container.appendChild(loader);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return <div ref={containerRef} className="min-h-[70vh]" />;
}
