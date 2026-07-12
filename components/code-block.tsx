"use client";

import { useRef, useState } from "react";

export function CodeBlock({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (e.g. insecure context); silently ignore.
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {title ?? "bash"}
        </span>
        <button
          onClick={() => void copy()}
          className="rounded-md px-2 py-1 text-xs font-semibold text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
