import Link from "next/link";
import { GITHUB_URL } from "@/lib/snippets";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="text-indigo-500" aria-hidden>◆</span>
          Adaptive Engine
        </Link>
        <div className="flex items-center gap-1 text-sm font-medium sm:gap-2">
          <Link
            href="/reference"
            className="rounded-lg px-2 py-1.5 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 sm:px-3 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          >
            API Reference
          </Link>
          <Link
            href="/guide"
            className="rounded-lg px-2 py-1.5 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 sm:px-3 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          >
            Integration Guide
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-2 py-1.5 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 sm:px-3 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          >
            GitHub ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
